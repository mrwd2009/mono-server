import {Tab, TabTitleText} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {
  routableTab,
  RoutableTabs
} from "../../components/routable-tabs/RoutableTabs.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {toUserProfile} from "../routes/UserProfile.js";
import {AttributesGroupTab} from "./AttributesGroupTab.js";
import {AttributesTab} from "./AttributesTab.js";
import {JsonEditorTab} from "./JsonEditorTab.js";
import {UserProfileProvider} from "./UserProfileContext.js";
export const UserProfileTab = () => {
  const {realm} = useRealm();
  const {t} = useTranslation("realm-settings");
  const history = useHistory();
  return /* @__PURE__ */ React.createElement(UserProfileProvider, null, /* @__PURE__ */ React.createElement(RoutableTabs, {
    defaultLocation: toUserProfile({realm, tab: "attributes"}),
    mountOnEnter: true
  }, /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("attributes")),
    "data-testid": "attributesTab",
    ...routableTab({
      to: toUserProfile({realm, tab: "attributes"}),
      history
    })
  }, /* @__PURE__ */ React.createElement(AttributesTab, null)), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("attributesGroup")),
    "data-testid": "attributesGroupTab",
    ...routableTab({
      to: toUserProfile({realm, tab: "attributes-group"}),
      history
    })
  }, /* @__PURE__ */ React.createElement(AttributesGroupTab, null)), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("jsonEditor")),
    "data-testid": "jsonEditorTab",
    ...routableTab({
      to: toUserProfile({realm, tab: "json-editor"}),
      history
    })
  }, /* @__PURE__ */ React.createElement(JsonEditorTab, null))));
};
