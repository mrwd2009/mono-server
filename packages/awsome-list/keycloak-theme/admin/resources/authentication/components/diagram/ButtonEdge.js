import React from "../../../_snowpack/pkg/react.js";
import {PlusIcon} from "../../../_snowpack/pkg/@patternfly/react-icons.js";
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd
} from "../../../_snowpack/pkg/react-flow-renderer.js";
const foreignObjectSize = 33;
export const ButtonEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  arrowHeadType,
  markerEndId,
  selected,
  data: {onEdgeClick}
}) => {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", {
    id,
    style,
    className: "react-flow__edge-path",
    d: edgePath,
    markerEnd
  }), selected && /* @__PURE__ */ React.createElement("foreignObject", {
    width: foreignObjectSize,
    height: foreignObjectSize,
    x: edgeCenterX - foreignObjectSize / 2,
    y: edgeCenterY - foreignObjectSize / 2,
    className: "edgebutton-foreignobject",
    requiredExtensions: "http://www.w3.org/1999/xhtml"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "edgebutton",
    onClick: (event) => onEdgeClick(event, id)
  }, /* @__PURE__ */ React.createElement(PlusIcon, null))));
};
