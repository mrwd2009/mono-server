import React from "../../_snowpack/pkg/react.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroupField} from "./FormGroupField.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const TextField = ({label, field, isReadOnly = false}) => {
  const {register} = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroupField, {
    label
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: label,
    "data-testid": label,
    name: field,
    ref: register,
    isReadOnly
  }));
};
