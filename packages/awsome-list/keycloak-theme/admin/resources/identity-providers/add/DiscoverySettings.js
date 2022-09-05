import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useFormContext, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ExpandableSection,
  FormGroup,
  ValidatedOptions
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {SwitchField} from "../component/SwitchField.js";
import {TextField} from "../component/TextField.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import "./discovery-settings.css.proxy.js";
const Fields = ({readOnly}) => {
  const {t} = useTranslation("identity-providers");
  const {
    register,
    control,
    formState: {errors}
  } = useFormContext();
  const validateSignature = useWatch({
    control,
    name: "config.validateSignature"
  });
  const useJwks = useWatch({
    control,
    name: "config.useJwksUrl"
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: "pf-c-form pf-m-horizontal"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("authorizationUrl"),
    fieldId: "kc-authorization-url",
    isRequired: true,
    validated: errors.config?.authorizationUrl ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    "data-testid": "authorizationUrl",
    id: "kc-authorization-url",
    name: "config.authorizationUrl",
    ref: register({required: true}),
    validated: errors.config?.authorizationUrl ? ValidatedOptions.error : ValidatedOptions.default,
    isReadOnly: readOnly
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("tokenUrl"),
    fieldId: "tokenUrl",
    isRequired: true,
    validated: errors.config?.tokenUrl ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "tokenUrl",
    name: "config.tokenUrl",
    ref: register({required: true}),
    validated: errors.config?.tokenUrl ? ValidatedOptions.error : ValidatedOptions.default,
    isReadOnly: readOnly
  })), /* @__PURE__ */ React.createElement(TextField, {
    field: "config.logoutUrl",
    label: "logoutUrl",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(TextField, {
    field: "config.userInfoUrl",
    label: "userInfoUrl",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(TextField, {
    field: "config.issuer",
    label: "issuer",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.validateSignature",
    label: "validateSignature",
    isReadOnly: readOnly
  }), validateSignature === "true" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.useJwksUrl",
    label: "useJwksUrl",
    isReadOnly: readOnly
  }), useJwks === "true" && /* @__PURE__ */ React.createElement(TextField, {
    field: "config.jwksUrl",
    label: "jwksUrl",
    isReadOnly: readOnly
  })));
};
export const DiscoverySettings = ({readOnly}) => {
  const {t} = useTranslation("identity-providers");
  const [isExpanded, setIsExpanded] = useState(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, readOnly && /* @__PURE__ */ React.createElement(ExpandableSection, {
    className: "keycloak__discovery-settings__metadata",
    toggleText: isExpanded ? t("hideMetaData") : t("showMetaData"),
    onToggle: () => setIsExpanded(!isExpanded),
    isExpanded
  }, /* @__PURE__ */ React.createElement(Fields, {
    readOnly
  })), !readOnly && /* @__PURE__ */ React.createElement(Fields, {
    readOnly
  }));
};
