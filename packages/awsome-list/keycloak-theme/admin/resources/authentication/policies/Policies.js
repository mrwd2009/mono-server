import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Tab, Tabs, TabTitleText} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {PasswordPolicy} from "./PasswordPolicy.js";
import {OtpPolicy} from "./OtpPolicy.js";
import {WebauthnPolicy} from "./WebauthnPolicy.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
export const Policies = () => {
  const {t} = useTranslation("authentication");
  const [subTab, setSubTab] = useState(1);
  const {adminClient} = useAdminClient();
  const {realm: realmName} = useRealm();
  const [realm, setRealm] = useState();
  useFetch(async () => {
    const realm2 = await adminClient.realms.findOne({realm: realmName});
    if (!realm2) {
      throw new Error(t("common:notFound"));
    }
    return realm2;
  }, (realm2) => {
    setRealm(realm2);
  }, []);
  if (!realm) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(Tabs, {
    activeKey: subTab,
    onSelect: (_, key) => setSubTab(key),
    mountOnEnter: true,
    unmountOnExit: true
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "passwordPolicy",
    eventKey: 1,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("passwordPolicy"))
  }, /* @__PURE__ */ React.createElement(PasswordPolicy, {
    realm,
    realmUpdated: setRealm
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "otpPolicy",
    eventKey: 2,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("otpPolicy"))
  }, /* @__PURE__ */ React.createElement(OtpPolicy, {
    realm,
    realmUpdated: setRealm
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "webauthnPolicy",
    eventKey: 3,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("webauthnPolicy"))
  }, /* @__PURE__ */ React.createElement(WebauthnPolicy, {
    realm,
    realmUpdated: setRealm
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "webauthnPasswordlessPolicy",
    eventKey: 4,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("webauthnPasswordlessPolicy"))
  }, /* @__PURE__ */ React.createElement(WebauthnPolicy, {
    realm,
    realmUpdated: setRealm,
    isPasswordLess: true
  })));
};
