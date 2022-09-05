import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Tab, Tabs, TabTitleText} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {AssociatedRolesTab} from "../realm-roles/AssociatedRolesTab.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
import {DefaultsGroupsTab} from "./DefaultGroupsTab.js";
export const UserRegistration = () => {
  const {t} = useTranslation("realm-settings");
  const [realm, setRealm] = useState();
  const [activeTab, setActiveTab] = useState(10);
  const [key, setKey] = useState(0);
  const {adminClient} = useAdminClient();
  const {realm: realmName} = useRealm();
  useFetch(() => adminClient.realms.findOne({realm: realmName}), setRealm, []);
  if (!realm) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(Tabs, {
    activeKey: activeTab,
    onSelect: (_, key2) => setActiveTab(key2)
  }, /* @__PURE__ */ React.createElement(Tab, {
    key,
    id: "roles",
    eventKey: 10,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("defaultRoles"))
  }, /* @__PURE__ */ React.createElement(AssociatedRolesTab, {
    parentRole: {...realm.defaultRole, attributes: []},
    refresh: () => setKey(key + 1)
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "groups",
    eventKey: 20,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("defaultGroups"))
  }, /* @__PURE__ */ React.createElement(DefaultsGroupsTab, null)));
};
