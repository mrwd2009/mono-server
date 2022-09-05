import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {useFormContext} from "../../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, ValidatedOptions} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../../../components/keycloak-text-input/KeycloakTextInput.js";
import {KeycloakTextArea} from "../../../components/keycloak-text-area/KeycloakTextArea.js";
export const NameDescription = ({prefix}) => {
  const {t} = useTranslation("clients");
  const {
    register,
    formState: {errors}
  } = useFormContext();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    fieldId: "kc-name",
    helperTextInvalid: t("common:required"),
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `clients-help:${prefix}-name`,
      fieldLabelId: "name"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-name",
    name: "name",
    "data-testid": "name",
    ref: register({required: true}),
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:description"),
    fieldId: "kc-description",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `clients-help:${prefix}-description`,
      fieldLabelId: "description"
    }),
    validated: errors.description ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: errors.description?.message
  }, /* @__PURE__ */ React.createElement(KeycloakTextArea, {
    ref: register({
      maxLength: {
        value: 255,
        message: t("common:maxLength", {length: 255})
      }
    }),
    type: "text",
    id: "kc-description",
    name: "description",
    "data-testid": "description",
    validated: errors.description ? ValidatedOptions.error : ValidatedOptions.default
  })));
};
