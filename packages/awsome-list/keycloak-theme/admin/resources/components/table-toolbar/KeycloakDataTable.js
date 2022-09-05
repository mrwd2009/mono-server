import React, {
  isValidElement,
  useEffect,
  useMemo,
  useState
} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Table,
  TableBody,
  TableHeader,
  TableVariant
} from "../../_snowpack/pkg/@patternfly/react-table.js";
import {get, cloneDeep, differenceBy} from "../../_snowpack/pkg/lodash-es.js";
import {PaginatingTableToolbar} from "./PaginatingTableToolbar.js";
import {ListEmptyState} from "../list-empty-state/ListEmptyState.js";
import {KeycloakSpinner} from "../keycloak-spinner/KeycloakSpinner.js";
import {useFetch} from "../../context/auth/AdminClient.js";
import {ButtonVariant} from "../../_snowpack/pkg/@patternfly/react-core.js";
function DataTable({
  columns,
  rows,
  actions,
  actionResolver,
  ariaLabelKey,
  onSelect,
  onCollapse,
  canSelectAll,
  isNotCompact,
  isRadio,
  ...props
}) {
  const {t} = useTranslation();
  return /* @__PURE__ */ React.createElement(Table, {
    ...props,
    variant: isNotCompact ? void 0 : TableVariant.compact,
    onSelect: onSelect ? (_, isSelected, rowIndex) => onSelect(isSelected, rowIndex) : void 0,
    onCollapse: onCollapse ? (_, rowIndex, isOpen) => onCollapse(isOpen, rowIndex) : void 0,
    selectVariant: isRadio ? "radio" : "checkbox",
    canSelectAll,
    cells: columns.map((column) => {
      return {...column, title: t(column.displayKey || column.name)};
    }),
    rows,
    actions,
    actionResolver,
    "aria-label": t(ariaLabelKey)
  }, /* @__PURE__ */ React.createElement(TableHeader, null), /* @__PURE__ */ React.createElement(TableBody, null));
}
export function KeycloakDataTable({
  ariaLabelKey,
  searchPlaceholderKey,
  isPaginated = false,
  onSelect,
  canSelectAll = false,
  isNotCompact,
  isRadio,
  detailColumns,
  isRowDisabled,
  loader,
  columns,
  actions,
  actionResolver,
  searchTypeComponent,
  toolbarItem,
  subToolbar,
  emptyState,
  icon,
  isSearching = false,
  ...props
}) {
  const {t} = useTranslation();
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState();
  const [unPaginatedData, setUnPaginatedData] = useState();
  const [loading, setLoading] = useState(false);
  const [max, setMax] = useState(10);
  const [first, setFirst] = useState(0);
  const [search, setSearch] = useState("");
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  const renderCell = (columns2, value) => {
    return columns2.map((col) => {
      if (col.cellRenderer) {
        return {title: col.cellRenderer(value)};
      }
      return get(value, col.name);
    });
  };
  const convertToColumns = (data2) => {
    const isDetailColumnsEnabled = (value) => detailColumns?.[0]?.enabled?.(value);
    return data2.map((value, index) => {
      const disabledRow = isRowDisabled ? isRowDisabled(value) : false;
      const row = [
        {
          data: value,
          disableSelection: disabledRow,
          disableActions: disabledRow,
          selected: !!selected.find((v) => get(v, "id") === get(value, "id")),
          isOpen: isDetailColumnsEnabled(value) ? false : void 0,
          cells: renderCell(columns, value)
        }
      ];
      if (isDetailColumnsEnabled(value)) {
        row.push({
          parent: index * 2,
          cells: renderCell(detailColumns, value)
        });
      }
      return row;
    }).flat();
  };
  const getNodeText = (node) => {
    if (["string", "number"].includes(typeof node)) {
      return node.toString();
    }
    if (node instanceof Array) {
      return node.map(getNodeText).join("");
    }
    if (typeof node === "object") {
      return getNodeText(isValidElement(node.title) ? node.title.props?.children : node.props?.children);
    }
    return "";
  };
  const filteredData = useMemo(() => search === "" || isPaginated ? void 0 : convertToColumns(unPaginatedData || []).filter((row) => row.cells.some((cell) => cell && getNodeText(cell).toLowerCase().includes(search.toLowerCase()))), [search]);
  useEffect(() => {
    if (canSelectAll) {
      const checkboxes = document.getElementsByClassName("pf-c-table__check").item(0);
      if (checkboxes) {
        const checkAllCheckbox = checkboxes.children.item(0);
        checkAllCheckbox.indeterminate = selected.length > 0 && selected.length < (filteredData || rows).length;
      }
    }
  }, [selected]);
  useFetch(async () => {
    setLoading(true);
    return typeof loader === "function" ? unPaginatedData || await loader(first, max + 1, search) : loader;
  }, (data2) => {
    if (!isPaginated) {
      setUnPaginatedData(data2);
      if (data2.length > first) {
        data2 = data2.slice(first, first + max + 1);
      } else {
        setFirst(0);
      }
    }
    const result = convertToColumns(data2);
    setRows(result);
    setLoading(false);
  }, [key, first, max, search, typeof loader !== "function" ? loader : void 0]);
  const convertAction = () => actions && cloneDeep(actions).map((action, index) => {
    delete action.onRowClick;
    action.onClick = async (_, rowIndex) => {
      const result = await actions[index].onRowClick((filteredData || rows)[rowIndex].data);
      if (result) {
        if (!isPaginated) {
          setSearch("");
        }
        refresh();
      }
    };
    return action;
  });
  const Loading = () => /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  const _onSelect = (isSelected, rowIndex) => {
    const data2 = filteredData || rows;
    if (rowIndex === -1) {
      setRows(data2.map((row) => {
        row.selected = isSelected;
        return row;
      }));
    } else {
      data2[rowIndex].selected = isSelected;
      setRows([...rows]);
    }
    const difference = differenceBy(selected, data2.map((row) => row.data), "id");
    const selectedRows = [
      ...difference,
      ...data2.filter((row) => row.selected).map((row) => row.data)
    ];
    setSelected(selectedRows);
    onSelect(selectedRows);
  };
  const onCollapse = (isOpen, rowIndex) => {
    data[rowIndex].isOpen = isOpen;
    setRows([...data]);
  };
  const data = filteredData || rows;
  const noData = !data || data.length === 0;
  const searching = search !== "" || isSearching;
  const maxRows = detailColumns ? max * 2 : max;
  const rowLength = detailColumns ? (data?.length || 0) / 2 : data?.length || 0;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, (loading || !noData || searching) && /* @__PURE__ */ React.createElement(PaginatingTableToolbar, {
    count: rowLength,
    first,
    max,
    onNextClick: setFirst,
    onPreviousClick: setFirst,
    onPerPageSelect: (first2, max2) => {
      setFirst(first2);
      setMax(max2);
    },
    inputGroupName: searchPlaceholderKey ? `${ariaLabelKey}input` : void 0,
    inputGroupOnEnter: setSearch,
    inputGroupPlaceholder: t(searchPlaceholderKey || ""),
    searchTypeComponent,
    toolbarItem,
    subToolbar
  }, !loading && !noData && /* @__PURE__ */ React.createElement(DataTable, {
    ...props,
    canSelectAll,
    onSelect: onSelect ? _onSelect : void 0,
    onCollapse: detailColumns ? onCollapse : void 0,
    actions: convertAction(),
    actionResolver,
    rows: data.slice(0, maxRows),
    columns,
    isNotCompact,
    isRadio,
    ariaLabelKey
  }), !loading && noData && searching && /* @__PURE__ */ React.createElement(ListEmptyState, {
    hasIcon: true,
    icon,
    isSearchVariant: true,
    message: t("noSearchResults"),
    instructions: t("noSearchResultsInstructions"),
    secondaryActions: !isSearching ? [
      {
        text: t("clearAllFilters"),
        onClick: () => setSearch(""),
        type: ButtonVariant.link
      }
    ] : []
  }), loading && /* @__PURE__ */ React.createElement(Loading, null)), !loading && noData && !searching && emptyState);
}
