import React from "../_snowpack/pkg/react.js";
import {Controller, useFormContext} from "../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {FormGroup, Switch, ValidatedOptions} from "../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
import {KeycloakTextArea} from "../components/keycloak-text-area/KeycloakTextArea.js";
export const ClientDescription = ({
  hasConfigureAccess: configure
}) => {
  const {t} = useTranslation("clients");
  const {
    register,
    control,
    formState: {errors}
  } = useFormContext();
  return /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-clients",
    fineGrainedAccess: configure,
    unWrap: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:clientId",
      fieldLabelId: "clientId"
    }),
    label: t("common:clientId"),
    fieldId: "kc-client-id",
    helperTextInvalid: t("common:required"),
    validated: errors.clientId ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register({required: true}),
    type: "text",
    id: "kc-client-id",
    name: "clientId",
    validated: errors.clientId ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:clientName",
      fieldLabelId: "name"
    }),
    label: t("common:name"),
    fieldId: "kc-name"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register(),
    type: "text",
    id: "kc-name",
    name: "name"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:description",
      fieldLabelId: "description"
    }),
    label: t("common:description"),
    fieldId: "kc-description",
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
    validated: errors.description ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clients:alwaysDisplayInConsole"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:alwaysDisplayInConsole",
      fieldLabelId: "clients:alwaysDisplayInConsole"
    }),
    fieldId: "kc-always-display-in-console",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "alwaysDisplayInConsole",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-always-display-in-console-switch",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  })));
};
