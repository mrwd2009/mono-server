import React, {memo} from "../../../_snowpack/pkg/react.js";
import {Handle, Position} from "../../../_snowpack/pkg/react-flow-renderer.js";
const ConditionalNodeInner = ({data, selected}) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Handle, {
    position: Position.Right,
    type: "source"
  }), /* @__PURE__ */ React.createElement("div", {
    className: `react-flow__node-default keycloak__authentication__conditional_node ${selected ? "selected" : ""}`
  }, /* @__PURE__ */ React.createElement("div", null, data.label)), /* @__PURE__ */ React.createElement(Handle, {
    position: Position.Left,
    type: "target"
  }));
};
export const ConditionalNode = memo(ConditionalNodeInner);
