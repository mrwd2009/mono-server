import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  DataList,
  DataListAction,
  DataListCell,
  DataListCheck,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Modal,
  ModalVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {AngleRightIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {ListEmptyState} from "../list-empty-state/ListEmptyState.js";
import {PaginatingTableToolbar} from "../table-toolbar/PaginatingTableToolbar.js";
import {GroupPath} from "./GroupPath.js";
export const GroupPickerDialog = ({
  id,
  type,
  filterGroups,
  text,
  onClose,
  onConfirm
}) => {
  const {t} = useTranslation();
  const {adminClient} = useAdminClient();
  const [selectedRows, setSelectedRows] = useState([]);
  const [navigation, setNavigation] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filter, setFilter] = useState("");
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [groupId, setGroupId] = useState();
  const [max, setMax] = useState(10);
  const [first, setFirst] = useState(0);
  const currentGroup = () => navigation[navigation.length - 1];
  useFetch(async () => {
    let group;
    let groups2;
    let existingUserGroups;
    if (!groupId) {
      groups2 = await adminClient.groups.find({
        first,
        max: max + 1,
        search: filter
      });
    } else {
      group = await adminClient.groups.findOne({id: groupId});
      if (!group) {
        throw new Error(t("common:notFound"));
      }
      groups2 = group.subGroups;
    }
    if (id) {
      existingUserGroups = await adminClient.users.listGroups({
        id
      });
    }
    return {group, groups: groups2, existingUserGroups};
  }, async ({group: selectedGroup, groups: groups2, existingUserGroups}) => {
    setJoinedGroups(existingUserGroups || []);
    if (selectedGroup) {
      setNavigation([...navigation, selectedGroup]);
    }
    groups2.forEach((group) => {
      group.checked = !!selectedRows.find((r) => r.id === group.id);
    });
    setGroups(groups2);
  }, [groupId, filter, first, max]);
  const isRowDisabled = (row) => {
    return [
      ...joinedGroups.map((item) => item.name),
      ...filterGroups || []
    ].some((group) => group === row?.name);
  };
  const hasSubgroups = (group) => {
    return group.subGroups.length !== 0;
  };
  const findSubGroup = (group, name) => {
    if (group.name?.includes(name)) {
      return group;
    }
    if (group.subGroups) {
      for (const g of group.subGroups) {
        const found = findSubGroup(g, name);
        return found;
      }
    }
    return group;
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.small,
    title: t(text.title, {
      group1: filterGroups?.[0],
      group2: navigation.length ? currentGroup().name : t("root")
    }),
    isOpen: true,
    onClose,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": `${text.ok}-button`,
        key: "confirm",
        variant: "primary",
        form: "group-form",
        onClick: () => {
          onConfirm(type === "selectMany" ? selectedRows : navigation.length ? [currentGroup()] : void 0);
        },
        isDisabled: type === "selectMany" && selectedRows.length === 0
      }, t(text.ok))
    ]
  }, /* @__PURE__ */ React.createElement(PaginatingTableToolbar, {
    count: groups.length,
    first,
    max,
    onNextClick: setFirst,
    onPreviousClick: setFirst,
    onPerPageSelect: (first2, max2) => {
      setFirst(first2);
      setMax(max2);
    },
    inputGroupName: "common:search",
    inputGroupOnEnter: (search) => {
      setFilter(search);
      setFirst(0);
      setMax(10);
      setNavigation([]);
    },
    inputGroupPlaceholder: t("users:searchForGroups")
  }, /* @__PURE__ */ React.createElement(Breadcrumb, null, navigation.length > 0 && /* @__PURE__ */ React.createElement(BreadcrumbItem, {
    key: "home"
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: () => {
      setGroupId(void 0);
      setNavigation([]);
    }
  }, t("groups"))), navigation.map((group, i) => /* @__PURE__ */ React.createElement(BreadcrumbItem, {
    key: i
  }, navigation.length - 1 !== i && /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: () => {
      setGroupId(group.id);
      setNavigation([...navigation].slice(0, i));
    }
  }, group.name), navigation.length - 1 === i && group.name))), /* @__PURE__ */ React.createElement(DataList, {
    "aria-label": t("groups"),
    isCompact: true
  }, groups.slice(0, max).map((group) => /* @__PURE__ */ React.createElement(DataListItem, {
    className: `join-group-dialog-row-${isRowDisabled(group) ? "disabled" : ""}`,
    "aria-labelledby": group.name,
    key: group.id,
    id: group.id,
    onClick: (e) => {
      const g = filter !== "" ? findSubGroup(group, filter) : group;
      if (isRowDisabled(g))
        return;
      if (type === "selectOne") {
        setGroupId(g.id);
      } else if (hasSubgroups(group) && filter === "" && e.target.type !== "checkbox") {
        setGroupId(group.id);
      }
    }
  }, /* @__PURE__ */ React.createElement(DataListItemRow, {
    className: `join-group-dialog-row-${isRowDisabled(group) ? "m-disabled" : ""}`,
    "data-testid": group.name
  }, type === "selectMany" && /* @__PURE__ */ React.createElement(DataListCheck, {
    className: "kc-join-group-modal-check",
    "data-testid": `${group.name}-check`,
    "aria-label": group.name,
    checked: group.checked,
    isDisabled: isRowDisabled(group),
    onChange: (checked) => {
      group.checked = checked;
      let newSelectedRows = [];
      if (!group.checked) {
        newSelectedRows = selectedRows.filter((r) => r.id !== group.id);
      } else {
        newSelectedRows = [
          ...selectedRows,
          filter === "" ? group : findSubGroup(group, filter)
        ];
      }
      setSelectedRows(newSelectedRows);
    },
    "aria-labelledby": `select-${group.name}`
  }), /* @__PURE__ */ React.createElement(DataListItemCells, {
    dataListCells: [
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: `name-${group.id}`
      }, filter === "" ? /* @__PURE__ */ React.createElement("span", {
        id: `select-${group.name}`
      }, group.name) : /* @__PURE__ */ React.createElement(GroupPath, {
        id: `select-${group.name}`,
        group: findSubGroup(group, filter)
      }))
    ]
  }), /* @__PURE__ */ React.createElement(DataListAction, {
    id: "actions",
    "aria-labelledby": `select-${group.name}`,
    "aria-label": t("groupName"),
    isPlainButtonAction: true
  }, (hasSubgroups(group) && filter === "" || type === "selectOne") && /* @__PURE__ */ React.createElement(Button, {
    isDisabled: true,
    variant: "link",
    "aria-label": t("common:select")
  }, /* @__PURE__ */ React.createElement(AngleRightIcon, null)))))), groups.length === 0 && filter === "" && /* @__PURE__ */ React.createElement(ListEmptyState, {
    hasIcon: false,
    message: t("groups:moveGroupEmpty"),
    instructions: t("groups:moveGroupEmptyInstructions")
  }), groups.length === 0 && filter !== "" && /* @__PURE__ */ React.createElement(ListEmptyState, {
    message: t("common:noSearchResults"),
    instructions: t("common:noSearchResultsInstructions")
  }))));
};
