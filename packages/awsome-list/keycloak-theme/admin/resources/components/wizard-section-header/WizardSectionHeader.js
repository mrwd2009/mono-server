import {Text, TextContent, Title} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React from "../../_snowpack/pkg/react.js";
import "./wizard-section-header.css.proxy.js";
export const WizardSectionHeader = ({
  title,
  description,
  showDescription = false
}) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Title, {
    size: "xl",
    headingLevel: "h2",
    className: showDescription ? "kc-wizard-section-header__title--has-description" : "kc-wizard-section-header__title"
  }, title), showDescription && /* @__PURE__ */ React.createElement(TextContent, {
    className: "kc-wizard-section-header__description"
  }, /* @__PURE__ */ React.createElement(Text, null, description)));
};
