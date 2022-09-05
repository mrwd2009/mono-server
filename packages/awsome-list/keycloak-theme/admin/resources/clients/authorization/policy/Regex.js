import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {useFormContext} from "../../../_snowpack/pkg/react-hook-form.js";
import {FormGroup} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../../../components/keycloak-text-input/KeycloakTextInput.js";
export const Regex = () => {
  const {t} = useTranslation("clients");
  const {
    register,
    formState: {errors}
  } = useFormContext();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("targetClaim"),
    fieldId: "targetClaim",
    helperTextInvalid: t("common:required"),
    validated: errors.targetClaim ? "error" : "default",
    isRequired: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:targetClaim",
      fieldLabelId: "clients:targetClaim"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "targetClaim",
    name: "targetClaim",
    "data-testid": "targetClaim",
    ref: register({required: true}),
    validated: errors.targetClaim ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("regexPattern"),
    fieldId: "pattern",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:regexPattern",
      fieldLabelId: "clients:regexPattern"
    }),
    isRequired: true,
    validated: errors.pattern ? "error" : "default",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register({required: true}),
    type: "text",
    id: "pattern",
    name: "pattern",
    "data-testid": "regexPattern",
    validated: errors.pattern ? "error" : "default"
  })));
};
