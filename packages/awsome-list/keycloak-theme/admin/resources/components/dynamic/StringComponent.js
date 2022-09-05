import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../keycloak-text-input/KeycloakTextInput.js";
export const StringComponent = ({
  name,
  label,
  helpText,
  defaultValue,
  isDisabled = false
}) => {
  const {t} = useTranslation("dynamic");
  const {register} = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(label),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t(helpText),
      fieldLabelId: `dynamic:${label}`
    }),
    fieldId: name
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: name,
    "data-testid": name,
    isDisabled,
    ref: register(),
    type: "text",
    name: `config.${name}`,
    defaultValue: defaultValue?.toString()
  }));
};
