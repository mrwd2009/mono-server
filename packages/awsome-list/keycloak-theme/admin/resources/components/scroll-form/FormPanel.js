import React from "../../_snowpack/pkg/react.js";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Title
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import "./form-panel.css.proxy.js";
export const FormPanel = ({
  title,
  children,
  scrollId,
  className
}) => {
  return /* @__PURE__ */ React.createElement(Card, {
    className,
    isFlat: true
  }, /* @__PURE__ */ React.createElement(CardHeader, {
    className: "kc-form-panel__header"
  }, /* @__PURE__ */ React.createElement(CardTitle, {
    tabIndex: 0
  }, /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h1",
    size: "xl",
    className: "kc-form-panel__title",
    id: scrollId,
    tabIndex: 0
  }, title))), /* @__PURE__ */ React.createElement(CardBody, {
    className: "kc-form-panel__body"
  }, children));
};
