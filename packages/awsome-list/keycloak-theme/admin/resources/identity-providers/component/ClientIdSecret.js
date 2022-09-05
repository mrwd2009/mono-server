import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, ValidatedOptions} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {PasswordInput} from "../../components/password-input/PasswordInput.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const ClientIdSecret = ({
  secretRequired = true,
  create = true
}) => {
  const {t} = useTranslation("identity-providers");
  const {
    register,
    formState: {errors}
  } = useFormContext();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clientId"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:clientId",
      fieldLabelId: "identity-providers:clientId"
    }),
    fieldId: "kc-client-id",
    isRequired: true,
    validated: errors.config?.clientId ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    id: "kc-client-id",
    "data-testid": "clientId",
    name: "config.clientId",
    ref: register({required: true})
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clientSecret"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:clientSecret",
      fieldLabelId: "identity-providers:clientSecret"
    }),
    fieldId: "kc-client-secret",
    isRequired: secretRequired,
    validated: errors.config?.clientSecret ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, create && /* @__PURE__ */ React.createElement(PasswordInput, {
    isRequired: secretRequired,
    id: "kc-client-secret",
    "data-testid": "clientSecret",
    name: "config.clientSecret",
    ref: register({required: secretRequired})
  }), !create && /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: secretRequired,
    type: "password",
    id: "kc-client-secret",
    "data-testid": "clientSecret",
    name: "config.clientSecret",
    ref: register({required: secretRequired})
  })));
};
