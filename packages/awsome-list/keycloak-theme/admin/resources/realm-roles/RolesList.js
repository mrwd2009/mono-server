import React, {useState} from "../_snowpack/pkg/react.js";
import {Link, useHistory, useRouteMatch} from "../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {AlertVariant, Button, ButtonVariant} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {emptyFormatter, upperCaseFormatter} from "../util.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {ClientRoute} from "../clients/routes/Client.js";
import {toClientRole} from "./routes/ClientRole.js";
import {toRealmRole} from "./routes/RealmRole.js";
import {toRealmSettings} from "../realm-settings/routes/RealmSettings.js";
import "./RealmRolesSection.css.proxy.js";
const RoleLink = ({children, role}) => {
  const {realm} = useRealm();
  const clientRouteMatch = useRouteMatch(ClientRoute.path);
  const to = clientRouteMatch ? toClientRole({...clientRouteMatch.params, id: role.id, tab: "details"}) : toRealmRole({realm, id: role.id, tab: "details"});
  return /* @__PURE__ */ React.createElement(Link, {
    to
  }, children);
};
export const RolesList = ({
  loader,
  paginated = true,
  parentRoleId,
  messageBundle = "roles",
  isReadOnly
}) => {
  const {t} = useTranslation(messageBundle);
  const history = useHistory();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {url} = useRouteMatch();
  const {realm: realmName} = useRealm();
  const [realm, setRealm] = useState();
  const [selectedRole, setSelectedRole] = useState();
  useFetch(() => adminClient.realms.findOne({realm: realmName}), (realm2) => {
    setRealm(realm2);
  }, []);
  const RoleDetailLink = (role) => role.name !== realm?.defaultRole?.name ? /* @__PURE__ */ React.createElement(RoleLink, {
    role
  }, role.name) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Link, {
    to: toRealmSettings({realm: realmName, tab: "user-registration"})
  }, role.name, " "), /* @__PURE__ */ React.createElement(HelpItem, {
    helpText: `${messageBundle}:defaultRole`,
    fieldLabelId: "defaultRole"
  }));
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "roles:roleDeleteConfirm",
    messageKey: t("roles:roleDeleteConfirmDialog", {
      selectedRoleName: selectedRole ? selectedRole.name : ""
    }),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        if (!parentRoleId) {
          await adminClient.roles.delById({
            id: selectedRole.id
          });
        } else {
          await adminClient.roles.delCompositeRoles({id: parentRoleId}, [
            selectedRole
          ]);
        }
        setSelectedRole(void 0);
        addAlert(t("roleDeletedSuccess"), AlertVariant.success);
      } catch (error) {
        addError("roles:roleDeleteError", error);
      }
    }
  });
  const goToCreate = () => history.push(`${url}/add-role`);
  if (!realm) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key: selectedRole ? selectedRole.id : "roleList",
    loader,
    ariaLabelKey: "roles:roleList",
    searchPlaceholderKey: "roles:searchFor",
    isPaginated: paginated,
    toolbarItem: !isReadOnly && /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "create-role",
      onClick: goToCreate
    }, t("createRole")),
    actions: isReadOnly ? [] : [
      {
        title: t("common:delete"),
        onRowClick: (role) => {
          setSelectedRole(role);
          if (role.name === realm.defaultRole.name) {
            addAlert(t("defaultRoleDeleteError"), AlertVariant.danger);
          } else
            toggleDeleteDialog();
        }
      }
    ],
    columns: [
      {
        name: "name",
        displayKey: "roles:roleName",
        cellRenderer: RoleDetailLink
      },
      {
        name: "composite",
        displayKey: "roles:composite",
        cellFormatters: [upperCaseFormatter(), emptyFormatter()]
      },
      {
        name: "description",
        displayKey: "common:description",
        cellFormatters: [emptyFormatter()]
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      hasIcon: true,
      message: t("noRoles"),
      instructions: isReadOnly ? "" : t("noRolesInstructions"),
      primaryActionText: isReadOnly ? "" : t("createRole"),
      onPrimaryAction: goToCreate
    })
  }));
};
