import React, {useState} from "../_snowpack/pkg/react.js";
import {useHistory, useParams, useRouteMatch} from "../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Checkbox,
  Label,
  PageSection,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {
  ClientRoleRoute,
  toClientRole
} from "./routes/ClientRole.js";
import {
  RealmSettingsRoute
} from "../realm-settings/routes/RealmSettings.js";
import {toRealmRole} from "./routes/RealmRole.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {emptyFormatter} from "../util.js";
import {AssociatedRolesModal} from "./AssociatedRolesModal.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
export const AssociatedRolesTab = ({
  parentRole,
  refresh: refreshParent
}) => {
  const {t} = useTranslation("roles");
  const history = useHistory();
  const {addAlert, addError} = useAlerts();
  const {id, realm} = useParams();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  const [selectedRows, setSelectedRows] = useState([]);
  const [isInheritedHidden, setIsInheritedHidden] = useState(false);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const {adminClient} = useAdminClient();
  const clientRoleRouteMatch = useRouteMatch(ClientRoleRoute.path);
  const realmSettingsMatch = useRouteMatch(RealmSettingsRoute.path);
  const subRoles = async (result, roles) => {
    const promises = roles.map(async (r) => {
      if (result.find((o) => o.id === r.id))
        return result;
      result.push(r);
      if (r.composite) {
        const subList = await adminClient.roles.getCompositeRoles({
          id: r.id
        });
        subList.map((o) => o.inherited = r.name);
        result.concat(await subRoles(result, subList));
      }
      return result;
    });
    await Promise.all(promises);
    return [...result];
  };
  const loader = async (first, max, search) => {
    const compositeRoles = await adminClient.roles.getCompositeRoles({
      id: parentRole.id,
      first,
      max,
      search
    });
    setCount(compositeRoles.length);
    if (!isInheritedHidden) {
      const children = await subRoles([], compositeRoles);
      compositeRoles.splice(0, compositeRoles.length);
      compositeRoles.push(...children);
    }
    await Promise.all(compositeRoles.map(async (role) => {
      if (role.clientRole) {
        role.containerId = (await adminClient.clients.findOne({
          id: role.containerId
        }))?.clientId;
      }
    }));
    return compositeRoles;
  };
  const toRolesTab = (tab = "associated-roles") => {
    const to = clientRoleRouteMatch ? toClientRole({...clientRoleRouteMatch.params, tab}) : !realmSettingsMatch ? toRealmRole({
      realm,
      id,
      tab
    }) : void 0;
    if (to)
      history.push(to);
  };
  const AliasRenderer = ({id: id2, name, clientRole, containerId}) => {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, clientRole && /* @__PURE__ */ React.createElement(Label, {
      color: "blue",
      key: `label-${id2}`
    }, containerId), " ", name);
  };
  const toggleModal = () => {
    setOpen(!open);
  };
  const reload = () => {
    if (selectedRows.length >= count) {
      refreshParent();
      toRolesTab("details");
    } else {
      refresh();
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "roles:roleRemoveAssociatedRoleConfirm",
    messageKey: t("roles:roleRemoveAssociatedText", {
      role: selectedRows.map((r) => r.name),
      roleName: parentRole.name
    }),
    continueButtonLabel: "common:remove",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.roles.delCompositeRoles({id: parentRole.id}, selectedRows);
        reload();
        setSelectedRows([]);
        addAlert(t("associatedRolesRemoved"), AlertVariant.success);
      } catch (error) {
        addError("roles:roleDeleteError", error);
      }
    }
  });
  const [toggleDeleteAssociatedRolesDialog, DeleteAssociatedRolesConfirm] = useConfirmDialog({
    titleKey: t("roles:removeAssociatedRoles") + "?",
    messageKey: t("roles:removeAllAssociatedRolesConfirmDialog", {
      name: parentRole.name || t("createRole")
    }),
    continueButtonLabel: "common:remove",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.roles.delCompositeRoles({id: parentRole.id}, selectedRows);
        addAlert(t("associatedRolesRemoved"), AlertVariant.success);
        reload();
      } catch (error) {
        addError("roles:roleDeleteError", error);
      }
    }
  });
  const addComposites = async (composites) => {
    const compositeArray = composites;
    try {
      await adminClient.roles.createComposite({roleId: parentRole.id, realm}, compositeArray);
      toRolesTab();
      refresh();
      addAlert(t("addAssociatedRolesSuccess"), AlertVariant.success);
    } catch (error) {
      addError("roles:addAssociatedRolesError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    padding: {default: "noPadding"}
  }, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(DeleteAssociatedRolesConfirm, null), open && /* @__PURE__ */ React.createElement(AssociatedRolesModal, {
    id: parentRole.id,
    toggleDialog: toggleModal,
    onConfirm: addComposites
  }), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader,
    ariaLabelKey: "roles:roleList",
    searchPlaceholderKey: "roles:searchFor",
    canSelectAll: true,
    isPaginated: true,
    onSelect: (rows) => {
      setSelectedRows([
        ...rows.map((r) => {
          delete r.inherited;
          return r;
        })
      ]);
    },
    toolbarItem: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Checkbox, {
      label: "Hide inherited roles",
      key: "associated-roles-check",
      id: "kc-hide-inherited-roles-checkbox",
      onChange: () => {
        setIsInheritedHidden(!isInheritedHidden);
        refresh();
      },
      isChecked: isInheritedHidden
    })), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      key: "add-role-button",
      onClick: () => toggleModal(),
      "data-testid": "add-role-button"
    }, t("addRole"))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      variant: "link",
      isDisabled: selectedRows.length === 0,
      key: "remove-role-button",
      "data-testid": "removeRoles",
      onClick: () => {
        toggleDeleteAssociatedRolesDialog();
      }
    }, t("removeRoles")))),
    actions: [
      {
        title: t("common:remove"),
        onRowClick: (role) => {
          setSelectedRows([role]);
          toggleDeleteDialog();
        }
      }
    ],
    columns: [
      {
        name: "name",
        displayKey: "roles:roleName",
        cellRenderer: AliasRenderer,
        cellFormatters: [emptyFormatter()]
      },
      {
        name: "inherited",
        displayKey: "roles:inheritedFrom",
        cellFormatters: [emptyFormatter()]
      },
      {
        name: "description",
        displayKey: "common:description",
        cellFormatters: [emptyFormatter()]
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      hasIcon: true,
      message: t("noRolesAssociated"),
      instructions: t("noRolesAssociatedInstructions"),
      primaryActionText: t("addRole"),
      onPrimaryAction: () => setOpen(true)
    })
  }));
};
