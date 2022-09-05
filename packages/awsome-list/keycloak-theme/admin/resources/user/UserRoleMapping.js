import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {AlertVariant} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {
  mapRoles,
  RoleMapping
} from "../components/role-mapping/RoleMapping.js";
export const UserRoleMapping = ({id, name}) => {
  const {t} = useTranslation("users");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [hide, setHide] = useState(false);
  const loader = async () => {
    const [assignedRoles, effectiveRoles] = await Promise.all([
      adminClient.users.listRealmRoleMappings({id}).then((roles) => roles.map((role) => ({role}))),
      adminClient.users.listCompositeRealmRoleMappings({id}).then((roles) => roles.map((role) => ({role})))
    ]);
    const clients = await adminClient.clients.find();
    const clientRoles = (await Promise.all(clients.map(async (client) => {
      const [clientAssignedRoles, clientEffectiveRoles] = await Promise.all([
        adminClient.users.listClientRoleMappings({
          id,
          clientUniqueId: client.id
        }).then((roles) => roles.map((role) => ({role, client}))),
        adminClient.users.listCompositeClientRoleMappings({
          id,
          clientUniqueId: client.id
        }).then((roles) => roles.map((role) => ({role, client})))
      ]);
      return mapRoles(clientAssignedRoles, clientEffectiveRoles, hide);
    }))).flat();
    return [...mapRoles(assignedRoles, effectiveRoles, hide), ...clientRoles];
  };
  const assignRoles = async (rows) => {
    try {
      const realmRoles = rows.filter((row) => row.client === void 0).map((row) => row.role).flat();
      await adminClient.users.addRealmRoleMappings({
        id,
        roles: realmRoles
      });
      await Promise.all(rows.filter((row) => row.client !== void 0).map((row) => adminClient.users.addClientRoleMappings({
        id,
        clientUniqueId: row.client.id,
        roles: [row.role]
      })));
      addAlert(t("roleMappingUpdatedSuccess"), AlertVariant.success);
    } catch (error) {
      addError("clients:roleMappingUpdatedError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(RoleMapping, {
    name,
    id,
    type: "users",
    loader,
    save: assignRoles,
    onHideRolesToggle: () => setHide(!hide)
  });
};
