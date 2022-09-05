import React, {useState} from "../_snowpack/pkg/react.js";
import {useHistory, useParams, useRouteMatch} from "../_snowpack/pkg/react-router-dom.js";
import {
  AlertVariant,
  ButtonVariant,
  DropdownItem,
  PageSection,
  Tab,
  TabTitleText
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useForm} from "../_snowpack/pkg/react-hook-form.js";
import {omit} from "../_snowpack/pkg/lodash-es.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {
  AttributesForm
} from "../components/key-value-form/AttributeForm.js";
import {
  arrayToKeyValue,
  keyValueToArray
} from "../components/key-value-form/key-value-convert.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {RealmRoleForm} from "./RealmRoleForm.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {AssociatedRolesModal} from "./AssociatedRolesModal.js";
import {KeycloakTabs} from "../components/keycloak-tabs/KeycloakTabs.js";
import {AssociatedRolesTab} from "./AssociatedRolesTab.js";
import {UsersInRoleTab} from "./UsersInRoleTab.js";
import {toRealmRole} from "./routes/RealmRole.js";
import {
  ClientRoleRoute,
  toClientRole
} from "./routes/ClientRole.js";
import {PermissionsTab} from "../components/permission-tab/PermissionTab.js";
export default function RealmRoleTabs() {
  const {t} = useTranslation("roles");
  const form = useForm({
    mode: "onChange"
  });
  const {setValue, getValues, trigger, reset} = form;
  const history = useHistory();
  const {adminClient} = useAdminClient();
  const [role, setRole] = useState();
  const {id, clientId} = useParams();
  const {url} = useRouteMatch();
  const {realm: realmName} = useRealm();
  const [key, setKey] = useState("");
  const refresh = () => {
    setKey(`${new Date().getTime()}`);
  };
  const {addAlert, addError} = useAlerts();
  const [open, setOpen] = useState(false);
  const convert = (role2) => {
    const {attributes, ...rest} = role2;
    return {
      attributes: arrayToKeyValue(attributes),
      ...rest
    };
  };
  const [realm, setRealm] = useState();
  useFetch(async () => {
    const realm2 = await adminClient.realms.findOne({realm: realmName});
    if (!id) {
      return {realm: realm2};
    }
    const role2 = await adminClient.roles.findOneById({id});
    return {realm: realm2, role: role2};
  }, ({realm: realm2, role: role2}) => {
    if (!realm2 || !role2 && id) {
      throw new Error(t("common:notFound"));
    }
    setRealm(realm2);
    if (role2) {
      const convertedRole = convert(role2);
      setRole(convertedRole);
      Object.entries(convertedRole).map((entry) => {
        setValue(entry[0], entry[1]);
      });
    }
  }, [key, url]);
  const save = async () => {
    try {
      const values = getValues();
      if (values.attributes && values.attributes[values.attributes.length - 1]?.key === "") {
        setValue("attributes", values.attributes.slice(0, values.attributes.length - 1));
      }
      if (!await trigger()) {
        return;
      }
      const {attributes, ...rest} = values;
      let roleRepresentation = rest;
      roleRepresentation.name = roleRepresentation.name?.trim();
      if (id) {
        if (attributes) {
          roleRepresentation.attributes = keyValueToArray(attributes);
        }
        roleRepresentation = {
          ...omit(role, "attributes"),
          ...roleRepresentation
        };
        if (!clientId) {
          await adminClient.roles.updateById({id}, roleRepresentation);
        } else {
          await adminClient.clients.updateRole({id: clientId, roleName: values.name}, roleRepresentation);
        }
        setRole(convert(roleRepresentation));
      } else {
        let createdRole;
        if (!clientId) {
          await adminClient.roles.create(roleRepresentation);
          createdRole = await adminClient.roles.findOneByName({
            name: values.name
          });
        } else {
          await adminClient.clients.createRole({
            id: clientId,
            name: values.name
          });
          if (values.description) {
            await adminClient.clients.updateRole({id: clientId, roleName: values.name}, roleRepresentation);
          }
          createdRole = await adminClient.clients.findRole({
            id: clientId,
            roleName: values.name
          });
        }
        if (!createdRole) {
          throw new Error(t("common:notFound"));
        }
        setRole(convert(createdRole));
        history.push(url.substr(0, url.lastIndexOf("/") + 1) + createdRole.id + "/details");
      }
      addAlert(t(id ? "roleSaveSuccess" : "roleCreated"), AlertVariant.success);
    } catch (error) {
      addError(`roles:${id ? "roleSave" : "roleCreate"}Error`, error);
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "roles:roleDeleteConfirm",
    messageKey: t("roles:roleDeleteConfirmDialog", {
      name: role?.name || t("createRole")
    }),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        if (!clientId) {
          await adminClient.roles.delById({id});
        } else {
          await adminClient.clients.delRole({
            id: clientId,
            roleName: role.name
          });
        }
        addAlert(t("roleDeletedSuccess"), AlertVariant.success);
        history.push(url.substr(0, url.indexOf("/roles") + "/roles".length));
      } catch (error) {
        addError("roles:roleDeleteError", error);
      }
    }
  });
  const dropdownItems = url.includes("associated-roles") ? [
    /* @__PURE__ */ React.createElement(DropdownItem, {
      key: "delete-all-associated",
      component: "button",
      onClick: () => toggleDeleteAllAssociatedRolesDialog()
    }, t("roles:removeAllAssociatedRoles")),
    /* @__PURE__ */ React.createElement(DropdownItem, {
      key: "delete-role",
      component: "button",
      onClick: () => {
        toggleDeleteDialog();
      }
    }, t("deleteRole"))
  ] : [
    /* @__PURE__ */ React.createElement(DropdownItem, {
      key: "toggle-modal",
      "data-testid": "add-roles",
      component: "button",
      onClick: () => toggleModal()
    }, t("addAssociatedRolesText")),
    /* @__PURE__ */ React.createElement(DropdownItem, {
      key: "delete-role",
      component: "button",
      onClick: () => toggleDeleteDialog()
    }, t("deleteRole"))
  ];
  const [
    toggleDeleteAllAssociatedRolesDialog,
    DeleteAllAssociatedRolesConfirm
  ] = useConfirmDialog({
    titleKey: t("roles:removeAllAssociatedRoles") + "?",
    messageKey: t("roles:removeAllAssociatedRolesConfirmDialog", {
      name: role?.name || t("createRole")
    }),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        const additionalRoles = await adminClient.roles.getCompositeRoles({
          id: role.id
        });
        await adminClient.roles.delCompositeRoles({id}, additionalRoles);
        addAlert(t("compositeRoleOff"), AlertVariant.success, t("compositesRemovedAlertDescription"));
        const loc = url.replace(/\/AssociatedRoles/g, "/details");
        history.push(loc);
        refresh();
      } catch (error) {
        addError("roles:roleDeleteError", error);
      }
    }
  });
  const toggleModal = () => {
    setOpen(!open);
  };
  const clientRoleRouteMatch = useRouteMatch(ClientRoleRoute.path);
  const toAssociatedRoles = () => {
    const to = clientRoleRouteMatch ? toClientRole({
      ...clientRoleRouteMatch.params,
      tab: "associated-roles"
    }) : toRealmRole({
      realm: realm?.realm,
      id,
      tab: "associated-roles"
    });
    history.push(to);
  };
  const addComposites = async (composites) => {
    try {
      await adminClient.roles.createComposite({roleId: role?.id, realm: realm.realm}, composites);
      refresh();
      toAssociatedRoles();
      addAlert(t("addAssociatedRolesSuccess"), AlertVariant.success);
    } catch (error) {
      addError("roles:addAssociatedRolesError", error);
    }
  };
  const isDefaultRole = (name) => realm?.defaultRole.name === name;
  if (!realm) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  if (!role) {
    return /* @__PURE__ */ React.createElement(RealmRoleForm, {
      reset: () => reset(role),
      form,
      save,
      editMode: false
    });
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(DeleteAllAssociatedRolesConfirm, null), open && /* @__PURE__ */ React.createElement(AssociatedRolesModal, {
    id,
    toggleDialog: toggleModal,
    onConfirm: addComposites
  }), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: role.name || t("createRole"),
    badges: [
      {
        id: "composite-role-badge",
        text: role.composite ? t("composite") : "",
        readonly: true
      }
    ],
    subKey: id ? "" : "roles:roleCreateExplain",
    actionsDropdownId: "roles-actions-dropdown",
    dropdownItems,
    divider: !id
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, id && /* @__PURE__ */ React.createElement(KeycloakTabs, {
    isBox: true,
    mountOnEnter: true
  }, /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "details",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:details"))
  }, /* @__PURE__ */ React.createElement(RealmRoleForm, {
    reset: () => reset(role),
    form,
    save,
    editMode: true
  })), role.composite && /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "associated-roles",
    className: "kc-associated-roles-tab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("associatedRolesText"))
  }, /* @__PURE__ */ React.createElement(AssociatedRolesTab, {
    parentRole: role,
    refresh
  })), !isDefaultRole(role.name) && /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "attributes",
    className: "kc-attributes-tab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:attributes"))
  }, /* @__PURE__ */ React.createElement(AttributesForm, {
    form,
    save,
    reset: () => reset(role)
  })), !isDefaultRole(role.name) && /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "users-in-role",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("usersInRole"))
  }, /* @__PURE__ */ React.createElement(UsersInRoleTab, {
    "data-cy": "users-in-role-tab"
  })), /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "permissions",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:permissions"))
  }, /* @__PURE__ */ React.createElement(PermissionsTab, {
    id: role.id,
    type: "roles"
  })))));
}
