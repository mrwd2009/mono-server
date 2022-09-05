import {TextInput} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React, {forwardRef} from "../../_snowpack/pkg/react.js";
export const KeycloakTextInput = forwardRef(({onChange, ...props}, ref) => {
  const onChangeForward = (_, event) => onChange?.(event);
  return /* @__PURE__ */ React.createElement(TextInput, {
    ...props,
    ref,
    onChange: onChangeForward
  });
});
KeycloakTextInput.displayName = "TextInput";
