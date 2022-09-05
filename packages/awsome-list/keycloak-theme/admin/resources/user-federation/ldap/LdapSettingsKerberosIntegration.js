import {FormGroup, Switch} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import React from "../../_snowpack/pkg/react.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {Controller, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {WizardSectionHeader} from "../../components/wizard-section-header/WizardSectionHeader.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const LdapSettingsKerberosIntegration = ({
  form,
  showSectionHeading = false,
  showSectionDescription = false
}) => {
  const {t} = useTranslation("user-federation");
  const {t: helpText} = useTranslation("user-federation-help");
  const allowKerberosAuth = useWatch({
    control: form.control,
    name: "config.allowKerberosAuthentication",
    defaultValue: ["false"]
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, showSectionHeading && /* @__PURE__ */ React.createElement(WizardSectionHeader, {
    title: t("kerberosIntegration"),
    description: helpText("ldapKerberosSettingsDescription"),
    showDescription: showSectionDescription
  }), /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("allowKerberosAuthentication"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:allowKerberosAuthenticationHelp",
      fieldLabelId: "user-federation:allowKerberosAuthentication"
    }),
    fieldId: "kc-allow-kerberos-authentication",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.allowKerberosAuthentication",
    defaultValue: ["false"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-allow-kerberos-authentication",
      "data-testid": "allow-kerberos-auth",
      isDisabled: false,
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value[0] === "true",
      label: t("common:on"),
      labelOff: t("common:off")
    })
  })), allowKerberosAuth[0] === "true" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("kerberosRealm"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:kerberosRealmHelp",
      fieldLabelId: "user-federation:kerberosRealm"
    }),
    fieldId: "kc-kerberos-realm",
    isRequired: true,
    validated: form.errors.config?.kerberosRealm?.[0] ? "error" : "default",
    helperTextInvalid: form.errors.config?.kerberosRealm?.[0].message
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    id: "kc-kerberos-realm",
    name: "config.kerberosRealm[0]",
    ref: form.register({
      required: {
        value: true,
        message: `${t("validateRealm")}`
      }
    }),
    "data-testid": "kerberos-realm",
    validated: form.errors.config?.kerberosRealm?.[0] ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("serverPrincipal"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:serverPrincipalHelp",
      fieldLabelId: "user-federation:serverPrincipal"
    }),
    fieldId: "kc-server-principal",
    isRequired: true,
    validated: form.errors.config?.serverPrincipal?.[0] ? "error" : "default",
    helperTextInvalid: form.errors.config?.serverPrincipal?.[0].message
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    id: "kc-server-principal",
    name: "config.serverPrincipal[0]",
    ref: form.register({
      required: {
        value: true,
        message: `${t("validateServerPrincipal")}`
      }
    }),
    "data-testid": "kerberos-principal",
    validated: form.errors.config?.serverPrincipal?.[0] ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("keyTab"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:keyTabHelp",
      fieldLabelId: "user-federation:keyTab"
    }),
    fieldId: "kc-key-tab",
    isRequired: true,
    validated: form.errors.config?.keyTab?.[0] ? "error" : "default",
    helperTextInvalid: form.errors.config?.keyTab?.[0].message
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    id: "kc-key-tab",
    name: "config.keyTab[0]",
    ref: form.register({
      required: {
        value: true,
        message: `${t("validateKeyTab")}`
      }
    }),
    "data-testid": "kerberos-keytab",
    validated: form.errors.config?.keyTab?.[0] ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("debug"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:debugHelp",
      fieldLabelId: "user-federation:debug"
    }),
    fieldId: "kc-debug",
    hasNoPaddingTop: true
  }, " ", /* @__PURE__ */ React.createElement(Controller, {
    name: "config.debug",
    defaultValue: ["false"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-debug",
      "data-testid": "debug",
      isDisabled: false,
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value[0] === "true",
      label: t("common:on"),
      labelOff: t("common:off")
    })
  }))), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("useKerberosForPasswordAuthentication"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:useKerberosForPasswordAuthenticationHelp",
      fieldLabelId: "user-federation:useKerberosForPasswordAuthentication"
    }),
    fieldId: "kc-use-kerberos-password-authentication",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.useKerberosForPasswordAuthentication",
    defaultValue: ["false"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-use-kerberos-password-authentication",
      "data-testid": "use-kerberos-pw-auth",
      isDisabled: false,
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value[0] === "true",
      label: t("common:on"),
      labelOff: t("common:off")
    })
  }))));
};
