import React, {useState} from "../../_snowpack/pkg/react.js";
import {useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Tab, TabTitleText} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {KEY_PROVIDER_TYPE} from "../../util.js";
import {
  routableTab,
  RoutableTabs
} from "../../components/routable-tabs/RoutableTabs.js";
import {toKeysTab} from "../routes/KeysTab.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {KeysListTab} from "./KeysListTab.js";
import {KeysProvidersTab} from "./KeysProvidersTab.js";
const sortByPriority = (components) => {
  const sortedComponents = [...components].sort((a, b) => {
    const priorityA = Number(a.config?.priority);
    const priorityB = Number(b.config?.priority);
    return (!isNaN(priorityB) ? priorityB : 0) - (!isNaN(priorityA) ? priorityA : 0);
  });
  return sortedComponents;
};
export const KeysTab = () => {
  const {t} = useTranslation("realm-settings");
  const history = useHistory();
  const {adminClient} = useAdminClient();
  const {realm: realmName} = useRealm();
  const [realmComponents, setRealmComponents] = useState();
  const [key, setKey] = useState(0);
  const refresh = () => {
    setKey(key + 1);
  };
  useFetch(() => adminClient.components.find({
    type: KEY_PROVIDER_TYPE,
    realm: realmName
  }), (components) => setRealmComponents(sortByPriority(components)), [key]);
  if (!realmComponents) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const keysRoute = (tab) => routableTab({
    to: toKeysTab({realm: realmName, tab}),
    history
  });
  return /* @__PURE__ */ React.createElement(RoutableTabs, {
    mountOnEnter: true,
    unmountOnExit: true,
    defaultLocation: toKeysTab({realm: realmName, tab: "list"})
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "keysList",
    "data-testid": "rs-keys-list-tab",
    "aria-label": "keys-list-subtab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("keysList")),
    ...keysRoute("list")
  }, /* @__PURE__ */ React.createElement(KeysListTab, {
    realmComponents
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "providers",
    "data-testid": "rs-providers-tab",
    "aria-label": "rs-providers-tab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("providers")),
    ...keysRoute("providers")
  }, /* @__PURE__ */ React.createElement(KeysProvidersTab, {
    realmComponents,
    refresh
  })));
};
