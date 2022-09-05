import React from "../../_snowpack/pkg/react.js";
import {ClientSelect} from "../client/ClientSelect.js";
export const ClientSelectComponent = (props) => {
  return /* @__PURE__ */ React.createElement(ClientSelect, {
    ...props,
    name: `config.${props.name}`,
    namespace: "dynamic"
  });
};
