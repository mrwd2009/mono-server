import React, {useState} from "../../_snowpack/pkg/react.js";
import {useHistory, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  PageSection,
  Tab,
  TabTitleText
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {MapperList} from "../../client-scopes/details/MapperList.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {
  routableTab,
  RoutableTabs
} from "../../components/routable-tabs/RoutableTabs.js";
import {
  toDedicatedScope
} from "../routes/DedicatedScopeDetails.js";
import {toMapper} from "../routes/Mapper.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {DedicatedScope} from "./DecicatedScope.js";
export default function DedicatedScopes() {
  const {t} = useTranslation("clients");
  const history = useHistory();
  const {realm, clientId} = useParams();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [client, setClient] = useState();
  useFetch(() => adminClient.clients.findOne({id: clientId}), setClient, []);
  const route = (tab) => routableTab({
    to: toDedicatedScope({realm, clientId, tab}),
    history
  });
  if (!client) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const addMappers = async (mappers) => {
    if (!Array.isArray(mappers)) {
      const mapper = mappers;
      history.push(toMapper({
        realm,
        id: client.id,
        mapperId: mapper.id
      }));
    } else {
      try {
        await adminClient.clients.addMultipleProtocolMappers({id: client.id}, mappers);
        setClient(await adminClient.clients.findOne({id: client.id}));
        addAlert(t("common:mappingCreatedSuccess"), AlertVariant.success);
      } catch (error) {
        addError("common:mappingCreatedError", error);
      }
    }
  };
  const onDeleteMapper = async (mapper) => {
    try {
      await adminClient.clients.delProtocolMapper({
        id: client.id,
        mapperId: mapper.id
      });
      setClient({
        ...client,
        protocolMappers: client.protocolMappers?.filter((m) => m.id !== mapper.id)
      });
      addAlert(t("common:mappingDeletedSuccess"), AlertVariant.success);
    } catch (error) {
      addError("common:mappingDeletedError", error);
    }
    return true;
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: client.clientId,
    subKey: "clients-help:dedicatedScopeExplain",
    divider: false
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(RoutableTabs, {
    isBox: true,
    mountOnEnter: true,
    defaultLocation: toDedicatedScope({
      realm,
      clientId,
      tab: "mappers"
    })
  }, /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("mappers")),
    "data-testid": "mappersTab",
    ...route("mappers")
  }, /* @__PURE__ */ React.createElement(MapperList, {
    model: client,
    onAdd: addMappers,
    onDelete: onDeleteMapper,
    detailLink: (mapperId) => toMapper({realm, id: client.id, mapperId})
  })), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("scope")),
    "data-testid": "scopeTab",
    ...route("scope")
  }, /* @__PURE__ */ React.createElement(DedicatedScope, {
    client
  })))));
}
