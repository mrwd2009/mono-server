import {TextArea} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React, {forwardRef} from "../../_snowpack/pkg/react.js";
export const KeycloakTextArea = forwardRef(({onChange, ...props}, ref) => {
  const onChangeForward = (_, event) => onChange?.(event);
  return /* @__PURE__ */ React.createElement(TextArea, {
    ...props,
    ref,
    onChange: onChangeForward
  });
});
KeycloakTextArea.displayName = "TextArea";
