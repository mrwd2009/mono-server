import React, {useState} from "../../_snowpack/pkg/react.js";
import {useHistory, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  ButtonVariant,
  DropdownItem,
  PageSection,
  Tab,
  TabTitleText
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {convertFormValuesToObject} from "../../util.js";
import {MapperList} from "../details/MapperList.js";
import {ScopeForm} from "../details/ScopeForm.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {
  mapRoles,
  RoleMapping
} from "../../components/role-mapping/RoleMapping.js";
import {
  changeScope
} from "../../components/client-scope/ClientScopeTypes.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import useToggle from "../../utils/useToggle.js";
import {toMapper} from "../routes/Mapper.js";
import {toClientScope} from "../routes/ClientScope.js";
import {
  routableTab,
  RoutableTabs
} from "../../components/routable-tabs/RoutableTabs.js";
export default function ClientScopeForm() {
  const {t} = useTranslation("client-scopes");
  const [clientScope, setClientScope] = useState();
  const history = useHistory();
  const {realm} = useRealm();
  const [hide, toggleHide] = useToggle();
  const {adminClient} = useAdminClient();
  const {id, type} = useParams();
  const {addAlert, addError} = useAlerts();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  useFetch(async () => {
    if (id) {
      const clientScope2 = await adminClient.clientScopes.findOne({id});
      if (!clientScope2) {
        throw new Error(t("common:notFound"));
      }
      return {
        ...clientScope2,
        type
      };
    }
  }, (clientScope2) => {
    setClientScope(clientScope2);
  }, [key, id]);
  const loader = async () => {
    const assignedRoles = (await adminClient.clientScopes.listRealmScopeMappings({id})).map((role) => ({role}));
    const effectiveRoles = (await adminClient.clientScopes.listCompositeRealmScopeMappings({id})).map((role) => ({role}));
    const clients = await adminClient.clients.find();
    const clientRoles = (await Promise.all(clients.map(async (client) => {
      const clientAssignedRoles = (await adminClient.clientScopes.listClientScopeMappings({
        id,
        client: client.id
      })).map((role) => ({role, client}));
      const clientEffectiveRoles = (await adminClient.clientScopes.listCompositeClientScopeMappings({
        id,
        client: client.id
      })).map((role) => ({role, client}));
      return mapRoles(clientAssignedRoles, clientEffectiveRoles, hide);
    }))).flat();
    return [...mapRoles(assignedRoles, effectiveRoles, hide), ...clientRoles];
  };
  const save = async (clientScopes) => {
    try {
      clientScopes.name = clientScopes.name?.trim().replace(/ /g, "_");
      clientScopes = convertFormValuesToObject(clientScopes);
      if (id) {
        await adminClient.clientScopes.update({id}, clientScopes);
        changeScope(adminClient, {...clientScopes, id, type}, clientScopes.type);
      } else {
        await adminClient.clientScopes.create(clientScopes);
        const scope = await adminClient.clientScopes.findOneByName({
          name: clientScopes.name
        });
        if (!scope) {
          throw new Error(t("common:notFound"));
        }
        changeScope(adminClient, {...clientScopes, id: scope.id}, clientScopes.type);
        history.push(toClientScope({
          realm,
          id: scope.id,
          type: clientScopes.type || "none",
          tab: "settings"
        }));
      }
      addAlert(t((id ? "update" : "create") + "Success"), AlertVariant.success);
    } catch (error) {
      addError(`client-scopes:${id ? "update" : "create"}Error`, error);
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("deleteClientScope", {
      count: 1,
      name: clientScope?.name
    }),
    messageKey: "client-scopes:deleteConfirm",
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.clientScopes.del({id});
        addAlert(t("deletedSuccess"), AlertVariant.success);
      } catch (error) {
        addError("client-scopes:deleteError", error);
      }
    }
  });
  const assignRoles = async (rows) => {
    try {
      const realmRoles = rows.filter((row) => row.client === void 0).map((row) => row.role).flat();
      await adminClient.clientScopes.addRealmScopeMappings({
        id
      }, realmRoles);
      await Promise.all(rows.filter((row) => row.client !== void 0).map((row) => adminClient.clientScopes.addClientScopeMappings({
        id,
        client: row.client.id
      }, [row.role])));
      addAlert(t("roleMappingUpdatedSuccess"), AlertVariant.success);
    } catch (error) {
      addError("client-scopes:roleMappingUpdatedError", error);
    }
  };
  const addMappers = async (mappers) => {
    if (!Array.isArray(mappers)) {
      const mapper = mappers;
      history.push(toMapper({
        realm,
        id: clientScope.id,
        type,
        mapperId: mapper.id
      }));
    } else {
      try {
        await adminClient.clientScopes.addMultipleProtocolMappers({id: clientScope.id}, mappers);
        refresh();
        addAlert(t("common:mappingCreatedSuccess"), AlertVariant.success);
      } catch (error) {
        addError("common:mappingCreatedError", error);
      }
    }
  };
  const onDelete = async (mapper) => {
    try {
      await adminClient.clientScopes.delProtocolMapper({
        id: clientScope.id,
        mapperId: mapper.id
      });
      addAlert(t("common:mappingDeletedSuccess"), AlertVariant.success);
      refresh();
    } catch (error) {
      addError("common:mappingDeletedError", error);
    }
    return true;
  };
  if (id && !clientScope) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const clientRoute = (tab) => routableTab({
    to: toClientScope({
      realm,
      id,
      tab,
      type
    }),
    history
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: clientScope ? clientScope.name : "client-scopes:createClientScope",
    dropdownItems: clientScope ? [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "delete",
        onClick: toggleDeleteDialog
      }, t("common:delete"))
    ] : void 0,
    badges: [{text: clientScope ? clientScope.protocol : void 0}],
    divider: !id
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, !id && /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(ScopeForm, {
    save,
    clientScope: {}
  })), id && clientScope && /* @__PURE__ */ React.createElement(RoutableTabs, {
    isBox: true
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "settings",
    "data-testid": "settings",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:settings")),
    ...clientRoute("settings")
  }, /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(ScopeForm, {
    save,
    clientScope
  }))), /* @__PURE__ */ React.createElement(Tab, {
    id: "mappers",
    "data-testid": "mappers",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:mappers")),
    ...clientRoute("mappers")
  }, /* @__PURE__ */ React.createElement(MapperList, {
    model: clientScope,
    onAdd: addMappers,
    onDelete,
    detailLink: (id2) => toMapper({realm, id: clientScope.id, type, mapperId: id2})
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "scope",
    "data-testid": "scopeTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("scope")),
    ...clientRoute("scope")
  }, /* @__PURE__ */ React.createElement(RoleMapping, {
    id,
    name: clientScope.name,
    type: "clientScopes",
    loader,
    save: assignRoles,
    onHideRolesToggle: toggleHide
  })))));
}
