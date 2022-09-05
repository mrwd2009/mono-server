import React from "../../_snowpack/pkg/react.js";
import {COMPONENTS, isValidComponentType} from "./components.js";
export const DynamicComponents = ({
  properties,
  ...rest
}) => /* @__PURE__ */ React.createElement(React.Fragment, null, properties.map((property) => {
  const componentType = property.type;
  if (isValidComponentType(componentType)) {
    const Component = COMPONENTS[componentType];
    return /* @__PURE__ */ React.createElement(Component, {
      key: property.name,
      ...property,
      ...rest
    });
  } else {
    console.warn(`There is no editor registered for ${componentType}`);
  }
}));
