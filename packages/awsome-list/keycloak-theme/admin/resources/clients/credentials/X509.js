import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, Switch, ValidatedOptions} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const X509 = () => {
  const {t} = useTranslation("clients");
  const {
    register,
    control,
    formState: {errors}
  } = useFormContext();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("allowRegexComparison"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:allowRegexComparison",
      fieldLabelId: "clients:allowRegexComparison"
    }),
    fieldId: "allowRegexComparison",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.x509.allow.regex.pattern.comparison",
    defaultValue: "false",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "allowRegexComparison",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange(value2.toString())
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("subject"),
    fieldId: "kc-subject",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:subject",
      fieldLabelId: "clients:subject"
    }),
    helperTextInvalid: t("common:required"),
    validated: errors.attributes?.["x509.subjectdn"] ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register({required: true}),
    type: "text",
    id: "kc-subject",
    name: "attributes.x509.subjectdn",
    validated: errors.attributes?.["x509.subjectdn"] ? ValidatedOptions.error : ValidatedOptions.default
  })));
};
