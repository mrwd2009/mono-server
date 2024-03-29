import {Position, isNode} from "../../../_snowpack/pkg/react-flow-renderer.js";
import dagre from "../../../_snowpack/pkg/dagre.js";
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 130;
const nodeHeight = 28;
export const getLayoutedElements = (elements, direction = "LR") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({rankdir: direction});
  elements.forEach((element) => {
    if (isNode(element)) {
      dagreGraph.setNode(element.id, {
        width: nodeWidth,
        height: nodeHeight
      });
    } else {
      dagreGraph.setEdge(element.source, element.target);
    }
  });
  dagre.layout(dagreGraph);
  return elements.map((element) => {
    if (isNode(element)) {
      const nodeWithPosition = dagreGraph.node(element.id);
      element.targetPosition = isHorizontal ? Position.Left : Position.Top;
      element.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
      element.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1e3,
        y: nodeWithPosition.y - nodeHeight / 2
      };
    }
    return element;
  });
};
