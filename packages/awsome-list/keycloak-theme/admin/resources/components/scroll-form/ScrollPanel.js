import React from "../../_snowpack/pkg/react.js";
import {Title} from "../../_snowpack/pkg/@patternfly/react-core.js";
import "./form-panel.css.proxy.js";
export const ScrollPanel = (props) => {
  const {title, children, scrollId, ...rest} = props;
  return /* @__PURE__ */ React.createElement("section", {
    ...rest,
    className: "kc-form-panel__panel"
  }, /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h1",
    size: "xl",
    className: "kc-form-panel__title",
    id: scrollId,
    tabIndex: 0
  }, title), children);
};
