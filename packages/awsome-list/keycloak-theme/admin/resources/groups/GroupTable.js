import React, {useState} from "../_snowpack/pkg/react.js";
import {Link, useHistory, useLocation} from "../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownItem,
  KebabToggle,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {cellWidth} from "../_snowpack/pkg/@patternfly/react-table.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {GroupsModal} from "./GroupsModal.js";
import {getLastId} from "./groupIdUtils.js";
import {GroupPickerDialog} from "../components/group/GroupPickerDialog.js";
import {useSubGroups} from "./SubGroupsContext.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {toGroups} from "./routes/Groups.js";
import {useAccess} from "../context/access/Access.js";
export const GroupTable = () => {
  const {t} = useTranslation("groups");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [move, setMove] = useState();
  const {subGroups, currentGroup, setSubGroups} = useSubGroups();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  const history = useHistory();
  const location = useLocation();
  const id = getLastId(location.pathname);
  const {hasAccess} = useAccess();
  const isManager = hasAccess("manage-users") || currentGroup()?.access?.manage;
  const canView = hasAccess("query-groups", "view-users") || hasAccess("manage-users", "query-groups");
  const loader = async () => {
    let groupsData = void 0;
    if (id) {
      const group = await adminClient.groups.findOne({id});
      if (!group) {
        throw new Error(t("common:notFound"));
      }
      groupsData = group.subGroups;
    } else {
      groupsData = await adminClient.groups.find({
        briefRepresentation: false
      });
    }
    if (!groupsData) {
      history.push(toGroups({realm}));
    }
    return groupsData || [];
  };
  const multiDelete = async () => {
    try {
      for (const group of selectedRows) {
        await adminClient.groups.del({
          id: group.id
        });
      }
      addAlert(t("groupDeleted", {count: selectedRows.length}), AlertVariant.success);
      setSelectedRows([]);
    } catch (error) {
      addError("groups:groupDeleteError", error);
    }
    refresh();
  };
  const GroupNameCell = (group) => {
    if (!canView)
      return /* @__PURE__ */ React.createElement("span", null, group.name);
    return /* @__PURE__ */ React.createElement(Link, {
      key: group.id,
      to: `${location.pathname}/${group.id}`,
      onClick: async () => {
        const loadedGroup = await adminClient.groups.findOne({
          id: group.id
        });
        setSubGroups([...subGroups, loadedGroup]);
      }
    }, group.name);
  };
  const handleModalToggle = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("deleteConfirmTitle", {count: selectedRows.length}),
    messageKey: t("deleteConfirm", {count: selectedRows.length}),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: multiDelete
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key: `${id}${key}`,
    onSelect: (rows) => setSelectedRows([...rows]),
    canSelectAll: true,
    loader,
    ariaLabelKey: "groups:groups",
    searchPlaceholderKey: "groups:searchForGroups",
    toolbarItem: isManager && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "openCreateGroupModal",
      variant: "primary",
      onClick: handleModalToggle
    }, t("createGroup"))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Dropdown, {
      toggle: /* @__PURE__ */ React.createElement(KebabToggle, {
        onToggle: () => setIsKebabOpen(!isKebabOpen),
        isDisabled: selectedRows.length === 0
      }),
      isOpen: isKebabOpen,
      isPlain: true,
      dropdownItems: [
        /* @__PURE__ */ React.createElement(DropdownItem, {
          key: "action",
          component: "button",
          onClick: () => {
            toggleDeleteDialog();
            setIsKebabOpen(false);
          }
        }, t("common:delete"))
      ]
    }))),
    actions: !isManager ? [] : [
      {
        title: t("moveTo"),
        onRowClick: async (group) => {
          setMove(group);
          return false;
        }
      },
      {
        title: t("common:delete"),
        onRowClick: async (group) => {
          setSelectedRows([group]);
          toggleDeleteDialog();
          return true;
        }
      }
    ],
    columns: [
      {
        name: "name",
        displayKey: "groups:groupName",
        cellRenderer: GroupNameCell,
        transforms: [cellWidth(90)]
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      hasIcon: true,
      message: t(`noGroupsInThis${id ? "SubGroup" : "Realm"}`),
      instructions: t(`noGroupsInThis${id ? "SubGroup" : "Realm"}Instructions`),
      primaryActionText: t("createGroup"),
      onPrimaryAction: handleModalToggle
    })
  }), isCreateModalOpen && /* @__PURE__ */ React.createElement(GroupsModal, {
    id,
    handleModalToggle,
    refresh
  }), move && /* @__PURE__ */ React.createElement(GroupPickerDialog, {
    type: "selectOne",
    filterGroups: [move.name],
    text: {
      title: "groups:moveToGroup",
      ok: "groups:moveHere"
    },
    onClose: () => setMove(void 0),
    onConfirm: async (group) => {
      try {
        if (group !== void 0) {
          try {
            await adminClient.groups.setOrCreateChild({id: group[0].id}, move);
          } catch (error) {
            if (error.response) {
              throw error;
            }
          }
        } else {
          await adminClient.groups.del({id: move.id});
          const {id: id2} = await adminClient.groups.create({
            ...move,
            id: void 0
          });
          if (move.subGroups) {
            await Promise.all(move.subGroups.map((s) => adminClient.groups.setOrCreateChild({id: id2}, {
              ...s,
              id: void 0
            })));
          }
        }
        setMove(void 0);
        refresh();
        addAlert(t("moveGroupSuccess"), AlertVariant.success);
      } catch (error) {
        addError("groups:moveGroupError", error);
      }
    }
  }));
};
