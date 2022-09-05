import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  Divider,
  FormGroup,
  PageSection,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {
  mapRoles,
  RoleMapping
} from "../../components/role-mapping/RoleMapping.js";
import useToggle from "../../utils/useToggle.js";
import {useAccess} from "../../context/access/Access.js";
export const DedicatedScope = ({
  client: initialClient
}) => {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [client, setClient] = useState(initialClient);
  const [hide, toggle] = useToggle();
  const {hasAccess} = useAccess();
  const isManager = hasAccess("manage-clients") || client.access?.manage;
  const loader = async () => {
    const [clients, assignedRoles, effectiveRoles] = await Promise.all([
      adminClient.clients.find(),
      adminClient.clients.listRealmScopeMappings({id: client.id}).then((roles) => roles.map((role) => ({role}))),
      adminClient.clients.listCompositeRealmScopeMappings({id: client.id}).then((roles) => roles.map((role) => ({role})))
    ]);
    const clientRoles = (await Promise.all(clients.map(async ({id}) => {
      const [clientAssignedRoles, clientEffectiveRoles] = await Promise.all([
        adminClient.clients.listClientScopeMappings({
          id: client.id,
          client: id
        }).then((roles) => roles.map((role) => ({role, client}))),
        adminClient.clients.listCompositeClientScopeMappings({
          id: client.id,
          client: id
        }).then((roles) => roles.map((role) => ({role, client})))
      ]);
      return mapRoles(clientAssignedRoles, clientEffectiveRoles, hide);
    }))).flat();
    return [...mapRoles(assignedRoles, effectiveRoles, hide), ...clientRoles];
  };
  const assignRoles = async (rows) => {
    try {
      const realmRoles = rows.filter((row) => row.client === void 0).map((row) => row.role).flat();
      await Promise.all([
        adminClient.clients.addRealmScopeMappings({
          id: client.id
        }, realmRoles),
        ...rows.filter((row) => row.client !== void 0).map((row) => adminClient.clients.addClientScopeMappings({
          id: client.id,
          client: row.client.id
        }, [row.role]))
      ]);
      addAlert(t("clientScopeSuccess"), AlertVariant.success);
    } catch (error) {
      addError("clients:clientScopeError", error);
    }
  };
  const update = async () => {
    const newClient = {...client, fullScopeAllowed: !client.fullScopeAllowed};
    try {
      await adminClient.clients.update({id: client.id}, newClient);
      addAlert(t("clientScopeSuccess"), AlertVariant.success);
      setClient(newClient);
    } catch (error) {
      addError("clients:clientScopeError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-clients",
    fineGrainedAccess: client.access?.manage,
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("fullScopeAllowed"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:fullScopeAllowed",
      fieldLabelId: "clients:fullScopeAllowed"
    }),
    fieldId: "fullScopeAllowed"
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "fullScopeAllowed",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: client.fullScopeAllowed,
    onChange: update
  }))), !client.fullScopeAllowed && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(RoleMapping, {
    name: client.clientId,
    id: client.id,
    type: "clients",
    loader,
    save: assignRoles,
    onHideRolesToggle: toggle,
    isManager
  })));
};
