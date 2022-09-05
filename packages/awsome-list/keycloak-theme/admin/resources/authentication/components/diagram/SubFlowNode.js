import React, {memo} from "../../../_snowpack/pkg/react.js";
import {Handle, Position} from "../../../_snowpack/pkg/react-flow-renderer.js";
const SubFlowNodeInner = ({
  data: {label},
  prefix,
  selected
}) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Handle, {
    position: Position.Right,
    type: "source"
  }), /* @__PURE__ */ React.createElement("div", {
    className: `react-flow__node-default keycloak__authentication__subflow_node ${selected ? "selected" : ""}`
  }, /* @__PURE__ */ React.createElement("div", null, prefix, " ", label)), /* @__PURE__ */ React.createElement(Handle, {
    position: Position.Left,
    type: "target"
  }));
};
export const SubFlowNode = memo(SubFlowNodeInner);
export const StartSubFlowNode = ({...props}) => /* @__PURE__ */ React.createElement(SubFlowNode, {
  ...props,
  prefix: "Start"
});
export const EndSubFlowNode = ({...props}) => /* @__PURE__ */ React.createElement(SubFlowNode, {
  ...props,
  prefix: "End"
});
