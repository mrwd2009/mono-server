import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  Badge,
  Button,
  ButtonVariant,
  Checkbox,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {cellWidth} from "../../_snowpack/pkg/@patternfly/react-table.js";
import {AddRoleMappingModal} from "./AddRoleMappingModal.js";
import {KeycloakDataTable} from "../table-toolbar/KeycloakDataTable.js";
import {emptyFormatter, upperCaseFormatter} from "../../util.js";
import {useAlerts} from "../alert/Alerts.js";
import {useConfirmDialog} from "../confirm-dialog/ConfirmDialog.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {ListEmptyState} from "../list-empty-state/ListEmptyState.js";
import useSetTimeout from "../../utils/useSetTimeout.js";
import useToggle from "../../utils/useToggle.js";
import "./role-mapping.css.proxy.js";
export const mapRoles = (assignedRoles, effectiveRoles, hide) => [
  ...hide ? assignedRoles.map((row) => ({
    ...row,
    role: {
      ...row.role,
      isInherited: false
    }
  })) : effectiveRoles.map((row) => ({
    ...row,
    role: {
      ...row.role,
      isInherited: assignedRoles.find((r) => r.role.id === row.role.id) === void 0
    }
  }))
];
export const ServiceRole = ({role, client}) => /* @__PURE__ */ React.createElement(React.Fragment, null, client && /* @__PURE__ */ React.createElement(Badge, {
  isRead: true,
  className: "keycloak-admin--role-mapping__client-name"
}, client.clientId), role.name);
const groupFunctions = {
  delete: ["delClientRoleMappings", "delRealmRoleMappings"],
  list: ["listAvailableClientRoleMappings", "listAvailableRealmRoleMappings"]
};
const clientFunctions = {
  delete: ["delClientScopeMappings", "delRealmScopeMappings"],
  list: ["listAvailableClientScopeMappings", "listAvailableRealmScopeMappings"]
};
export const mapping = [
  {
    resource: "groups",
    functions: groupFunctions
  },
  {
    resource: "users",
    functions: groupFunctions
  },
  {
    resource: "clientScopes",
    functions: clientFunctions
  },
  {
    resource: "clients",
    functions: clientFunctions
  },
  {
    resource: "roles",
    functions: {
      delete: [],
      list: ["listRoles", "find"]
    }
  }
];
export const castAdminClient = (adminClient, resource) => adminClient[resource];
export const RoleMapping = ({
  name,
  id,
  type,
  isManager = true,
  loader,
  save,
  onHideRolesToggle
}) => {
  const {t} = useTranslation(type);
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const [hide, setHide] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [selected, setSelected] = useState([]);
  const [wait, toggleWait] = useToggle();
  const setTimeout = useSetTimeout();
  const assignRoles = async (rows) => {
    await save(rows);
    refresh();
  };
  useEffect(() => setTimeout(refresh, 200), [wait]);
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "clients:removeMappingTitle",
    messageKey: t("clients:removeMappingConfirm", {count: selected.length}),
    continueButtonLabel: "common:remove",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        const mapType = mapping.find((m) => m.resource === type);
        await Promise.all(selected.map((row) => {
          const role = {id: row.role.id, name: row.role.name};
          castAdminClient(adminClient, mapType.resource)[mapType.functions.delete[row.client ? 0 : 1]]({
            id,
            clientUniqueId: row.client?.id,
            client: row.client?.id,
            roles: [role]
          }, [role]);
        }));
        addAlert(t("clients:clientScopeRemoveSuccess"), AlertVariant.success);
        toggleWait();
      } catch (error) {
        addError("clients:clientScopeRemoveError", error);
      }
    }
  });
  const ManagerToolbarItems = () => {
    if (!isManager)
      return /* @__PURE__ */ React.createElement("span", null);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "assignRole",
      onClick: () => setShowAssign(true)
    }, t("common:assignRole"))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      variant: "link",
      "data-testid": "unAssignRole",
      onClick: toggleDeleteDialog,
      isDisabled: selected.length === 0
    }, t("common:unAssignRole"))));
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, showAssign && /* @__PURE__ */ React.createElement(AddRoleMappingModal, {
    id,
    type,
    name,
    onAssign: assignRoles,
    onClose: () => setShowAssign(false)
  }), /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    "data-testid": "assigned-roles",
    key,
    loader,
    canSelectAll: true,
    onSelect: (rows) => setSelected(rows),
    searchPlaceholderKey: "clients:searchByName",
    ariaLabelKey: "clients:clientScopeList",
    isRowDisabled: (value) => value.role.isInherited || false,
    toolbarItem: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Checkbox, {
      label: t("common:hideInheritedRoles"),
      id: "hideInheritedRoles",
      isChecked: hide,
      onChange: (check) => {
        setHide(check);
        onHideRolesToggle();
        refresh();
      }
    })), /* @__PURE__ */ React.createElement(ManagerToolbarItems, null)),
    actions: isManager ? [
      {
        title: t("common:unAssignRole"),
        onRowClick: async (role) => {
          setSelected([role]);
          toggleDeleteDialog();
          return false;
        }
      }
    ] : [],
    columns: [
      {
        name: "role.name",
        displayKey: t("common:name"),
        transforms: [cellWidth(30)],
        cellRenderer: ServiceRole
      },
      {
        name: "role.isInherited",
        displayKey: t("common:inherent"),
        cellFormatters: [upperCaseFormatter(), emptyFormatter()]
      },
      {
        name: "role.description",
        displayKey: t("common:description"),
        cellFormatters: [emptyFormatter()]
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("noRoles"),
      instructions: t("noRolesInstructions"),
      primaryActionText: t("common:assignRole"),
      onPrimaryAction: () => setShowAssign(true)
    })
  }));
};
