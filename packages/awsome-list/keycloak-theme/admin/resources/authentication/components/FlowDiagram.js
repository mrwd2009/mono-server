import React, {useState} from "../../_snowpack/pkg/react.js";
import {
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelContent
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import ReactFlow, {
  Position,
  removeElements,
  MiniMap,
  Controls,
  Background,
  isNode
} from "../../_snowpack/pkg/react-flow-renderer.js";
import {EndSubFlowNode, StartSubFlowNode} from "./diagram/SubFlowNode.js";
import {ConditionalNode} from "./diagram/ConditionalNode.js";
import {ButtonEdge} from "./diagram/ButtonEdge.js";
import {getLayoutedElements} from "./diagram/auto-layout.js";
import {providerConditionFilter} from "../FlowDetails.js";
import "./flow-diagram.css.proxy.js";
const createEdge = (fromNode, toNode) => ({
  id: `edge-${fromNode}-to-${toNode}`,
  type: "buttonEdge",
  source: fromNode,
  target: toNode,
  data: {
    onEdgeClick: (evt, id) => {
      evt.stopPropagation();
      alert(`hello ${id}`);
    }
  }
});
const createNode = (ex) => {
  let nodeType = void 0;
  if (ex.executionList) {
    nodeType = "startSubFlow";
  }
  if (providerConditionFilter(ex)) {
    nodeType = "conditional";
  }
  return {
    id: ex.id,
    type: nodeType,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {label: ex.displayName},
    position: {x: 0, y: 0}
  };
};
const renderParallelNodes = (start, execution, end) => {
  const elements = [];
  elements.push(createNode(execution));
  elements.push(createEdge(start.id, execution.id));
  elements.push(createEdge(execution.id, end.id));
  return elements;
};
const renderSequentialNodes = (start, execution, end, prefExecution, isFirst, isLast) => {
  const elements = [];
  elements.push(createNode(execution));
  if (isFirst) {
    elements.push(createEdge(start.id, execution.id));
  } else {
    elements.push(createEdge(prefExecution.id, execution.id));
  }
  if (isLast) {
    elements.push(createEdge(execution.id, end.id));
  }
  return elements;
};
const renderSubFlow = (execution, start, end, prefExecution) => {
  const elements = [];
  elements.push({
    id: execution.id,
    type: "startSubFlow",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {label: execution.displayName},
    position: {x: 0, y: 0}
  });
  const endSubFlowId = `flow-end-${execution.id}`;
  elements.push({
    id: endSubFlowId,
    type: "endSubFlow",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {label: execution.displayName},
    position: {x: 0, y: 0}
  });
  elements.push(createEdge(prefExecution && prefExecution.requirement !== "ALTERNATIVE" ? prefExecution.id : start.id, execution.id));
  elements.push(createEdge(endSubFlowId, end.id));
  return elements.concat(renderFlow(execution, execution.executionList || [], {
    ...execution,
    id: endSubFlowId
  }));
};
const renderFlow = (start, executionList, end) => {
  let elements = [];
  for (let index = 0; index < executionList.length; index++) {
    const execution = executionList[index];
    if (execution.executionList) {
      elements = elements.concat(renderSubFlow(execution, start, end, executionList[index - 1]));
    } else {
      if (execution.requirement === "ALTERNATIVE" || execution.requirement === "DISABLED") {
        elements = elements.concat(renderParallelNodes(start, execution, end));
      } else {
        elements = elements.concat(renderSequentialNodes(start, execution, end, executionList[index - 1], index === 0, index === executionList.length - 1));
      }
    }
  }
  return elements;
};
export const FlowDiagram = ({
  executionList: {expandableList}
}) => {
  let elements = [
    {
      id: "start",
      sourcePosition: Position.Right,
      type: "input",
      data: {label: "Start"},
      position: {x: 0, y: 0},
      className: "keycloak__authentication__input_node"
    },
    {
      id: "end",
      targetPosition: Position.Left,
      type: "output",
      data: {label: "End"},
      position: {x: 0, y: 0},
      className: "keycloak__authentication__output_node"
    }
  ];
  elements = elements.concat(renderFlow({id: "start"}, expandableList, {id: "end"}));
  const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();
  const [layoutedElements, setElements] = useState(getLayoutedElements(elements));
  const [expandDrawer, setExpandDrawer] = useState(false);
  const onElementClick = (_event, element) => {
    if (isNode(element))
      setExpandDrawer(!expandDrawer);
  };
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  return /* @__PURE__ */ React.createElement(Drawer, {
    isExpanded: expandDrawer,
    onExpand: () => setExpandDrawer(true)
  }, /* @__PURE__ */ React.createElement(DrawerContent, {
    panelContent: /* @__PURE__ */ React.createElement(DrawerPanelContent, null, /* @__PURE__ */ React.createElement(DrawerHead, null, /* @__PURE__ */ React.createElement("span", {
      tabIndex: expandDrawer ? 0 : -1
    }, "drawer-panel"), /* @__PURE__ */ React.createElement(DrawerActions, null, /* @__PURE__ */ React.createElement(DrawerCloseButton, {
      onClick: () => setExpandDrawer(false)
    }))))
  }, /* @__PURE__ */ React.createElement(DrawerContentBody, null, /* @__PURE__ */ React.createElement(ReactFlow, {
    nodeTypes: {
      conditional: ConditionalNode,
      startSubFlow: StartSubFlowNode,
      endSubFlow: EndSubFlowNode
    },
    edgeTypes: {
      buttonEdge: ButtonEdge
    },
    onElementClick,
    onElementsRemove,
    onLoad,
    elements: layoutedElements,
    nodesConnectable: false
  }, /* @__PURE__ */ React.createElement(MiniMap, null), /* @__PURE__ */ React.createElement(Controls, null), /* @__PURE__ */ React.createElement(Background, null)))));
};
