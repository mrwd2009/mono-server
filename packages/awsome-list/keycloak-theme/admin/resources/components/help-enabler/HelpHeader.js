import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Split,
  SplitItem,
  Switch,
  TextContent
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {ExternalLinkAltIcon, HelpIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import React, {createContext, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import useRequiredContext from "../../utils/useRequiredContext.js";
import helpUrls from "../../help-urls.js";
import "./help-header.css.proxy.js";
export const HelpContext = createContext(void 0);
export const useHelp = () => useRequiredContext(HelpContext);
export const Help = ({children}) => {
  const [enabled, setHelp] = useState(true);
  function toggleHelp() {
    setHelp((help) => !help);
  }
  return /* @__PURE__ */ React.createElement(HelpContext.Provider, {
    value: {enabled, toggleHelp}
  }, children);
};
export const HelpHeader = () => {
  const [open, setOpen] = useState(false);
  const help = useHelp();
  const {t} = useTranslation();
  const dropdownItems = [
    /* @__PURE__ */ React.createElement(DropdownItem, {
      key: "link",
      id: "link",
      href: helpUrls.documentationUrl,
      target: "_blank"
    }, /* @__PURE__ */ React.createElement(Split, null, /* @__PURE__ */ React.createElement(SplitItem, {
      isFilled: true
    }, t("documentation")), /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(ExternalLinkAltIcon, null)))),
    /* @__PURE__ */ React.createElement(Divider, {
      key: "divide"
    }),
    /* @__PURE__ */ React.createElement(DropdownItem, {
      key: "enable",
      id: "enable"
    }, /* @__PURE__ */ React.createElement(Split, null, /* @__PURE__ */ React.createElement(SplitItem, {
      isFilled: true
    }, t("enableHelpMode")), /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(Switch, {
      id: "enableHelp",
      "aria-label": "Help is enabled",
      isChecked: help.enabled,
      label: "",
      className: "keycloak_help-header-switch",
      onChange: () => help.toggleHelp()
    }))), /* @__PURE__ */ React.createElement(TextContent, {
      className: "keycloak_help-header-description"
    }, t("common-help:helpToggleInfo")))
  ];
  return /* @__PURE__ */ React.createElement(Dropdown, {
    position: "right",
    isPlain: true,
    isOpen: open,
    toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
      toggleIndicator: null,
      onToggle: () => setOpen(!open),
      "aria-label": "Help",
      id: "help"
    }, /* @__PURE__ */ React.createElement(HelpIcon, null)),
    dropdownItems
  });
};
