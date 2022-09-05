import React from "../../_snowpack/pkg/react.js";
import {Card, CardBody} from "../../_snowpack/pkg/@patternfly/react-core.js";
import "./flow-title.css.proxy.js";
export const FlowTitle = ({id, title}) => {
  return /* @__PURE__ */ React.createElement(Card, {
    "data-testid": title,
    className: "keycloak__authentication__title",
    isFlat: true
  }, /* @__PURE__ */ React.createElement(CardBody, {
    "data-id": id,
    id: `title-id-${id}`
  }, title));
};
