import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {PasswordInput} from "../../components/password-input/PasswordInput.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const StoreSettings = ({
  hidePassword = false
}) => {
  const {t} = useTranslation("clients");
  const {register} = useFormContext();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("keyAlias"),
    fieldId: "keyAlias",
    isRequired: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:keyAlias",
      fieldLabelId: "clients:keyAlias"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    "data-testid": "keyAlias",
    type: "text",
    id: "keyAlias",
    name: "keyAlias",
    ref: register({required: true})
  })), !hidePassword && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("keyPassword"),
    fieldId: "keyPassword",
    isRequired: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:keyPassword",
      fieldLabelId: "clients:keyPassword"
    })
  }, /* @__PURE__ */ React.createElement(PasswordInput, {
    "data-testid": "keyPassword",
    id: "keyPassword",
    name: "keyPassword",
    ref: register({required: true})
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("storePassword"),
    fieldId: "storePassword",
    isRequired: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:storePassword",
      fieldLabelId: "clients:storePassword"
    })
  }, /* @__PURE__ */ React.createElement(PasswordInput, {
    "data-testid": "storePassword",
    id: "storePassword",
    name: "storePassword",
    ref: register({required: true})
  })));
};
