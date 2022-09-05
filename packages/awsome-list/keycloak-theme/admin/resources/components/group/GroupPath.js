import React from "../../_snowpack/pkg/react.js";
import {Tooltip} from "../../_snowpack/pkg/@patternfly/react-core.js";
const MAX_LENGTH = 20;
const PART = 10;
const truncatePath = (path) => {
  if (path && path.length >= MAX_LENGTH) {
    return path.substr(0, PART) + "..." + path.substr(path.length - PART, path.length);
  }
  return path;
};
export const GroupPath = ({
  group: {path},
  onMouseEnter: onMouseEnterProp,
  ...props
}) => {
  const [tooltip, setTooltip] = React.useState("");
  const onMouseEnter = (event) => {
    setTooltip(path);
    onMouseEnterProp?.(event);
  };
  const text = /* @__PURE__ */ React.createElement("span", {
    onMouseEnter,
    ...props
  }, truncatePath(path));
  return tooltip !== "" ? /* @__PURE__ */ React.createElement(Tooltip, {
    content: tooltip,
    isVisible: true
  }, text) : text;
};
