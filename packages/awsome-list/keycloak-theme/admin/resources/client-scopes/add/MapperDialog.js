import React, {useMemo, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Button,
  ButtonVariant,
  DataList,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Modal,
  ModalVariant,
  Text,
  TextContent,
  TextVariants
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useServerInfo} from "../../context/server-info/ServerInfoProvider.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../../components/table-toolbar/KeycloakDataTable.js";
import useLocaleSort, {mapByKey} from "../../utils/useLocaleSort.js";
export const AddMapperDialog = (props) => {
  const {t} = useTranslation("client-scopes");
  const serverInfo = useServerInfo();
  const protocol = props.protocol;
  const protocolMappers = serverInfo.protocolMapperTypes[protocol];
  const builtInMappers = serverInfo.builtinProtocolMappers[protocol];
  const [filter, setFilter] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const localeSort = useLocaleSort();
  const allRows = useMemo(() => localeSort(builtInMappers, mapByKey("name")).map((mapper) => {
    const mapperType = protocolMappers.filter((type) => type.id === mapper.protocolMapper)[0];
    return {
      item: mapper,
      name: mapper.name,
      description: mapperType.helpText
    };
  }), [builtInMappers, protocolMappers]);
  const [rows, setRows] = useState(allRows);
  if (props.filter && props.filter.length !== filter.length) {
    setFilter(props.filter);
    const nameFilter = props.filter.map((f) => f.name);
    setRows([...allRows.filter((row) => !nameFilter.includes(row.item.name))]);
  }
  const sortedProtocolMappers = useMemo(() => localeSort(protocolMappers, mapByKey("name")), [protocolMappers]);
  const isBuiltIn = !!props.filter;
  const header = [t("common:name"), t("common:description")];
  return /* @__PURE__ */ React.createElement(Modal, {
    "aria-label": isBuiltIn ? t("addPredefinedMappers") : t("emptySecondaryAction"),
    variant: ModalVariant.medium,
    header: /* @__PURE__ */ React.createElement(TextContent, {
      role: "dialog",
      "aria-label": isBuiltIn ? t("addPredefinedMappers") : t("emptySecondaryAction")
    }, /* @__PURE__ */ React.createElement(Text, {
      component: TextVariants.h1
    }, isBuiltIn ? t("addPredefinedMappers") : t("emptySecondaryAction")), /* @__PURE__ */ React.createElement(Text, null, isBuiltIn ? t("predefinedMappingDescription") : t("configureMappingDescription"))),
    isOpen: props.open,
    onClose: props.toggleDialog,
    actions: isBuiltIn ? [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-confirm",
        "data-testid": "confirm",
        key: "confirm",
        isDisabled: rows.length === 0 || selectedRows.length === 0,
        onClick: () => {
          props.onConfirm(selectedRows.map(({item}) => item));
          props.toggleDialog();
        }
      }, t("common:add")),
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-cancel",
        "data-testid": "cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: () => {
          props.toggleDialog();
        }
      }, t("common:cancel"))
    ] : []
  }, !isBuiltIn && /* @__PURE__ */ React.createElement(DataList, {
    onSelectDataListItem: (id) => {
      const mapper = protocolMappers.find((mapper2) => mapper2.id === id);
      props.onConfirm(mapper);
      props.toggleDialog();
    },
    "aria-label": t("addPredefinedMappers"),
    isCompact: true
  }, /* @__PURE__ */ React.createElement(DataListItem, {
    "aria-label": t("headerName"),
    id: "header"
  }, /* @__PURE__ */ React.createElement(DataListItemRow, null, /* @__PURE__ */ React.createElement(DataListItemCells, {
    dataListCells: header.map((name) => /* @__PURE__ */ React.createElement(DataListCell, {
      style: {fontWeight: 700},
      key: name
    }, name))
  }))), sortedProtocolMappers.map((mapper) => /* @__PURE__ */ React.createElement(DataListItem, {
    "aria-label": mapper.name,
    key: mapper.id,
    id: mapper.id
  }, /* @__PURE__ */ React.createElement(DataListItemRow, null, /* @__PURE__ */ React.createElement(DataListItemCells, {
    dataListCells: [
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: `name-${mapper.id}`
      }, mapper.name),
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: `helpText-${mapper.id}`
      }, mapper.helpText)
    ]
  }))))), isBuiltIn && /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    loader: rows,
    onSelect: setSelectedRows,
    canSelectAll: true,
    ariaLabelKey: "client-scopes:addPredefinedMappers",
    searchPlaceholderKey: "common:searchForMapper",
    columns: [
      {
        name: "name",
        displayKey: "common:name"
      },
      {
        name: "description",
        displayKey: "common:description"
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("common:emptyMappers"),
      instructions: t("client-scopes:emptyBuiltInMappersInstructions")
    })
  }));
};
