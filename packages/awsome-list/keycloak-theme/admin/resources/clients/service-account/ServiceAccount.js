import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {Trans, useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {AlertVariant, PageSection} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {InfoCircleIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {
  mapRoles,
  RoleMapping
} from "../../components/role-mapping/RoleMapping.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {toUser} from "../../user/routes/User.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useAccess} from "../../context/access/Access.js";
import "./service-account.css.proxy.js";
export const ServiceAccount = ({client}) => {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const [hide, setHide] = useState(false);
  const [serviceAccount, setServiceAccount] = useState();
  const {hasAccess} = useAccess();
  const hasManageClients = hasAccess("manage-clients");
  useFetch(() => adminClient.clients.getServiceAccountUser({
    id: client.id
  }), (serviceAccount2) => setServiceAccount(serviceAccount2), []);
  const loader = async () => {
    const serviceAccount2 = await adminClient.clients.getServiceAccountUser({
      id: client.id
    });
    const id = serviceAccount2.id;
    const assignedRoles = (await adminClient.users.listRealmRoleMappings({id})).map((role) => ({role}));
    const effectiveRoles = (await adminClient.users.listCompositeRealmRoleMappings({id})).map((role) => ({role}));
    const clients = await adminClient.clients.find();
    const clientRoles = (await Promise.all(clients.map(async (client2) => {
      const clientAssignedRoles = (await adminClient.users.listClientRoleMappings({
        id,
        clientUniqueId: client2.id
      })).map((role) => ({role, client: client2}));
      const clientEffectiveRoles = (await adminClient.users.listCompositeClientRoleMappings({
        id,
        clientUniqueId: client2.id
      })).map((role) => ({role, client: client2}));
      return mapRoles(clientAssignedRoles, clientEffectiveRoles, hide);
    }))).flat();
    return [...mapRoles(assignedRoles, effectiveRoles, hide), ...clientRoles];
  };
  const assignRoles = async (rows) => {
    try {
      const realmRoles = rows.filter((row) => row.client === void 0).map((row) => row.role).flat();
      await adminClient.users.addRealmRoleMappings({
        id: serviceAccount?.id,
        roles: realmRoles
      });
      await Promise.all(rows.filter((row) => row.client !== void 0).map((row) => adminClient.users.addClientRoleMappings({
        id: serviceAccount?.id,
        clientUniqueId: row.client.id,
        roles: [row.role]
      })));
      addAlert(t("roleMappingUpdatedSuccess"), AlertVariant.success);
    } catch (error) {
      addError("clients:roleMappingUpdatedError", error);
    }
  };
  return serviceAccount ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(PageSection, {
    className: "pf-u-pb-0"
  }, /* @__PURE__ */ React.createElement(InfoCircleIcon, {
    className: "pf-c-alert__icon keycloak--service-account--info-text"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "pf-u-pl-sm"
  }, /* @__PURE__ */ React.createElement(Trans, {
    i18nKey: "clients-help:manageServiceAccountUser"
  }, "", /* @__PURE__ */ React.createElement(Link, {
    to: toUser({realm, id: serviceAccount.id, tab: "settings"})
  }, {link: serviceAccount.username})))), /* @__PURE__ */ React.createElement(RoleMapping, {
    name: client.clientId,
    id: serviceAccount.id,
    type: "users",
    isManager: hasManageClients || client.access?.configure,
    loader,
    save: assignRoles,
    onHideRolesToggle: () => setHide(!hide)
  })) : /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
};
