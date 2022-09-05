import {
  AlertVariant,
  Button,
  ButtonVariant,
  Checkbox,
  Popover
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {QuestionCircleIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import {cellWidth} from "../_snowpack/pkg/@patternfly/react-table.js";
import {intersectionBy, sortBy} from "../_snowpack/pkg/lodash-es.js";
import React, {useEffect, useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {GroupPath} from "../components/group/GroupPath.js";
import {GroupPickerDialog} from "../components/group/GroupPickerDialog.js";
import {useHelp} from "../components/help-enabler/HelpHeader.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {emptyFormatter} from "../util.js";
export const UserGroups = ({user}) => {
  const {t} = useTranslation("users");
  const {addAlert, addError} = useAlerts();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [isDirectMembership, setDirectMembership] = useState(true);
  const [directMembershipList, setDirectMembershipList] = useState([]);
  const [open, setOpen] = useState(false);
  const {enabled} = useHelp();
  const {adminClient} = useAdminClient();
  const alphabetize = (groupsList) => {
    return sortBy(groupsList, (group) => group.path?.toUpperCase());
  };
  const loader = async (first, max, search2) => {
    const params = {
      first,
      max
    };
    const searchParam = search2 || "";
    if (searchParam) {
      params.search = searchParam;
      setSearch(searchParam);
    }
    const joinedUserGroups = await adminClient.users.listGroups({
      ...params,
      id: user.id
    });
    const allCreatedGroups = await adminClient.groups.find();
    const getAllPaths = joinedUserGroups.reduce((acc, cur) => (cur.path && acc.push(cur.path), acc), []);
    const parentGroupNames = [];
    const allGroupMembership = [];
    const slicedGroups = [];
    const rootLevelGroups = [...allCreatedGroups];
    let allPaths = [];
    const getAllSubgroupPaths = (o, f, context) => {
      f(o, context);
      if (typeof o !== "object")
        return context;
      if (Array.isArray(o))
        return o.forEach((e) => getAllSubgroupPaths(e, f, context)), context;
      for (const prop in o)
        getAllSubgroupPaths(o[prop], f, context);
      return context;
    };
    const arr = getAllSubgroupPaths(rootLevelGroups, (x, context) => {
      if (x?.subGroups)
        context.push(x.subGroups);
    }, []);
    const allSubgroups = [].concat(...arr);
    allPaths = [...rootLevelGroups, ...allSubgroups];
    getAllPaths.forEach((item) => {
      const paths = item.split("/");
      const groups = [];
      paths.reduce((acc, value) => {
        const path = acc + "/" + value;
        groups.push(path);
        return path;
      }, "");
      for (let i = 1; i < groups.length; i++) {
        slicedGroups.push(groups[i].substring(1));
      }
    });
    allGroupMembership.push(...slicedGroups);
    allPaths.forEach((item) => {
      if (item.subGroups.length !== 0) {
        allPaths.push(...item.subGroups);
      }
    });
    allPaths = allPaths.filter((group) => allGroupMembership.includes(group.path));
    const topLevelGroups = allCreatedGroups.filter((value) => parentGroupNames.includes(value.name));
    const subgroupArray = [];
    topLevelGroups.forEach((group) => subgroupArray.push(group.subGroups));
    const directMembership = joinedUserGroups.filter((value) => !topLevelGroups.includes(value));
    setDirectMembershipList(directMembership);
    const filterDupesfromGroups = allPaths.filter((thing, index, self) => index === self.findIndex((t2) => t2.name === thing.name));
    if (!isDirectMembership) {
      return alphabetize(filterDupesfromGroups);
    }
    return alphabetize(directMembership);
  };
  useEffect(() => {
    refresh();
  }, [isDirectMembership]);
  const AliasRenderer = (group) => group.name;
  const toggleModal = () => {
    setOpen(!open);
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("leaveGroup", {
      count: selectedGroups.length,
      name: selectedGroups[0]?.name
    }),
    messageKey: t("leaveGroupConfirmDialog", {
      count: selectedGroups.length,
      groupname: selectedGroups[0]?.name,
      username: user.username
    }),
    continueButtonLabel: "leave",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await Promise.all(selectedGroups.map((group) => adminClient.users.delFromGroup({
          id: user.id,
          groupId: group.id
        })));
        refresh();
        addAlert(t("removedGroupMembership"), AlertVariant.success);
      } catch (error) {
        addError("users:removedGroupMembershipError", error);
      }
    }
  });
  const leave = (group) => {
    setSelectedGroups(group);
    toggleDeleteDialog();
  };
  const LeaveButtonRenderer = (group) => {
    const canLeaveGroup = directMembershipList.some((item) => item.id === group.id) || directMembershipList.length === 0 || isDirectMembership;
    return canLeaveGroup && /* @__PURE__ */ React.createElement(Button, {
      "data-testid": `leave-${group.name}`,
      onClick: () => leave([group]),
      variant: "link",
      isDisabled: !user.access?.manageGroupMembership
    }, t("leave"));
  };
  const addGroups = async (groups) => {
    const newGroups = groups;
    newGroups.forEach(async (group) => {
      try {
        await adminClient.users.addToGroup({
          id: user.id,
          groupId: group.id
        });
        refresh();
        addAlert(t("addedGroupMembership"), AlertVariant.success);
      } catch (error) {
        addError("users:addedGroupMembershipError", error);
      }
    });
  };
  const Path = (group) => /* @__PURE__ */ React.createElement(GroupPath, {
    group
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), open && /* @__PURE__ */ React.createElement(GroupPickerDialog, {
    id: user.id,
    type: "selectMany",
    text: {
      title: t("joinGroupsFor", {username: user.username}),
      ok: "users:join"
    },
    onClose: () => setOpen(false),
    onConfirm: (groups) => {
      addGroups(groups || []);
      setOpen(false);
      refresh();
    }
  }), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader,
    className: "keycloak_user-section_groups-table",
    isPaginated: true,
    ariaLabelKey: "roles:roleList",
    searchPlaceholderKey: "groups:searchGroup",
    canSelectAll: true,
    onSelect: (groups) => isDirectMembership ? setSelectedGroups(groups) : setSelectedGroups(intersectionBy(groups, directMembershipList, "id")),
    isRowDisabled: (group) => !isDirectMembership && directMembershipList.every((item) => item.id !== group.id),
    toolbarItem: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
      className: "kc-join-group-button",
      onClick: toggleModal,
      "data-testid": "add-group-button",
      isDisabled: !user.access?.manageGroupMembership
    }, t("joinGroup")), /* @__PURE__ */ React.createElement(Checkbox, {
      label: t("directMembership"),
      key: "direct-membership-check",
      id: "kc-direct-membership-checkbox",
      onChange: () => setDirectMembership(!isDirectMembership),
      isChecked: isDirectMembership,
      className: "direct-membership-check"
    }), /* @__PURE__ */ React.createElement(Button, {
      onClick: () => leave(selectedGroups),
      "data-testid": "leave-group-button",
      variant: "link",
      isDisabled: selectedGroups.length === 0
    }, t("leave")), enabled && /* @__PURE__ */ React.createElement(Popover, {
      "aria-label": "Basic popover",
      position: "bottom",
      bodyContent: /* @__PURE__ */ React.createElement("div", null, t("whoWillAppearPopoverText"))
    }, /* @__PURE__ */ React.createElement(Button, {
      variant: "link",
      className: "kc-who-will-appear-button",
      key: "who-will-appear-button",
      icon: /* @__PURE__ */ React.createElement(QuestionCircleIcon, null)
    }, t("whoWillAppearLinkText")))),
    columns: [
      {
        name: "groupMembership",
        displayKey: "users:groupMembership",
        cellRenderer: AliasRenderer,
        cellFormatters: [emptyFormatter()],
        transforms: [cellWidth(40)]
      },
      {
        name: "path",
        displayKey: "users:path",
        cellRenderer: Path,
        transforms: [cellWidth(45)]
      },
      {
        name: "",
        cellRenderer: LeaveButtonRenderer,
        cellFormatters: [emptyFormatter()],
        transforms: [cellWidth(20)]
      }
    ],
    emptyState: !search ? /* @__PURE__ */ React.createElement(ListEmptyState, {
      hasIcon: true,
      message: t("noGroups"),
      instructions: t("noGroupsText"),
      primaryActionText: t("joinGroup"),
      onPrimaryAction: toggleModal
    }) : ""
  }));
};
