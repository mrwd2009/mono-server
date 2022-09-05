import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {PageSection, Tab, Tabs, TabTitleText} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HeadersForm} from "./HeadersForm.js";
import {BruteForceDetection} from "./BruteForceDetection.js";
export const SecurityDefenses = ({realm, save}) => {
  const {t} = useTranslation("realm-settings");
  const [activeTab, setActiveTab] = useState(10);
  return /* @__PURE__ */ React.createElement(Tabs, {
    activeKey: activeTab,
    onSelect: (_, key) => setActiveTab(key)
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "headers",
    eventKey: 10,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("headers"))
  }, /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(HeadersForm, {
    realm,
    save
  }))), /* @__PURE__ */ React.createElement(Tab, {
    id: "bruteForce",
    eventKey: 20,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("bruteForceDetection"))
  }, /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(BruteForceDetection, {
    realm,
    save
  }))));
};
