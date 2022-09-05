import {
  AlertVariant,
  Button,
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  Switch,
  ValidatedOptions
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import React, {useState} from "../../_snowpack/pkg/react.js";
import {get, isEqual} from "../../_snowpack/pkg/lodash-es.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {Controller, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {WizardSectionHeader} from "../../components/wizard-section-header/WizardSectionHeader.js";
import {PasswordInput} from "../../components/password-input/PasswordInput.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
const testLdapProperties = [
  "connectionUrl",
  "bindDn",
  "bindCredential",
  "useTruststoreSpi",
  "connectionTimeout",
  "startTls",
  "authType"
];
export const convertFormToSettings = (form) => {
  const settings = {};
  testLdapProperties.forEach((key) => {
    const value = get(form.getValues(), `config.${key}`);
    settings[key] = Array.isArray(value) ? value[0] : "";
  });
  return settings;
};
export const LdapSettingsConnection = ({
  form,
  id,
  showSectionHeading = false,
  showSectionDescription = false
}) => {
  const {t} = useTranslation("user-federation");
  const {t: helpText} = useTranslation("user-federation-help");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {addAlert, addError} = useAlerts();
  const edit = !!id;
  const testLdap = async (testType) => {
    if (!await form.trigger())
      return;
    try {
      const settings = convertFormToSettings(form);
      await adminClient.realms.testLDAPConnection({realm}, {...settings, action: testType, componentId: id});
      addAlert(t("testSuccess"), AlertVariant.success);
    } catch (error) {
      addError("user-federation:testError", error);
    }
  };
  const [isTruststoreSpiDropdownOpen, setIsTruststoreSpiDropdownOpen] = useState(false);
  const [isBindTypeDropdownOpen, setIsBindTypeDropdownOpen] = useState(false);
  const ldapBindType = useWatch({
    control: form.control,
    name: "config.authType",
    defaultValue: ["simple"]
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, showSectionHeading && /* @__PURE__ */ React.createElement(WizardSectionHeader, {
    title: t("connectionAndAuthenticationSettings"),
    description: helpText("ldapConnectionAndAuthorizationSettingsDescription"),
    showDescription: showSectionDescription
  }), /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("connectionURL"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:consoleDisplayConnectionUrlHelp",
      fieldLabelId: "user-federation:connectionURL"
    }),
    fieldId: "kc-console-connection-url",
    isRequired: true,
    validated: form.errors.config?.connectionUrl?.[0] ? "error" : "default",
    helperTextInvalid: form.errors.config?.connectionUrl?.[0].message
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    id: "kc-console-connection-url",
    "data-testid": "ldap-connection-url",
    name: "config.connectionUrl[0]",
    ref: form.register({
      required: {
        value: true,
        message: `${t("validateConnectionUrl")}`
      }
    }),
    validated: form.errors.config?.connectionUrl?.[0] ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("enableStartTls"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:enableStartTlsHelp",
      fieldLabelId: "user-federation:enableStartTls"
    }),
    fieldId: "kc-enable-start-tls",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.startTls",
    defaultValue: ["false"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-enable-start-tls",
      "data-testid": "enable-start-tls",
      isDisabled: false,
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value[0] === "true",
      label: t("common:on"),
      labelOff: t("common:off")
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("useTruststoreSpi"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:useTruststoreSpiHelp",
      fieldLabelId: "user-federation:useTruststoreSpi"
    }),
    fieldId: "kc-use-truststore-spi"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.useTruststoreSpi[0]",
    control: form.control,
    defaultValue: "ldapsOnly",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-use-truststore-spi",
      onToggle: () => setIsTruststoreSpiDropdownOpen(!isTruststoreSpiDropdownOpen),
      isOpen: isTruststoreSpiDropdownOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setIsTruststoreSpiDropdownOpen(false);
      },
      selections: value
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      value: "always"
    }, t("always")), /* @__PURE__ */ React.createElement(SelectOption, {
      value: "ldapsOnly"
    }, t("onlyLdaps")), /* @__PURE__ */ React.createElement(SelectOption, {
      value: "never"
    }, t("never")))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("connectionPooling"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:connectionPoolingHelp",
      fieldLabelId: "user-federation:connectionPooling"
    }),
    fieldId: "kc-connection-pooling",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.connectionPooling",
    defaultValue: ["false"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-connection-pooling",
      "data-testid": "connection-pooling",
      isDisabled: false,
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value[0] === "true",
      label: t("common:on"),
      labelOff: t("common:off")
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("connectionTimeout"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:connectionTimeoutHelp",
      fieldLabelId: "user-federation:consoleTimeout"
    }),
    fieldId: "kc-console-connection-timeout"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "number",
    min: 0,
    id: "kc-console-connection-timeout",
    "data-testid": "connection-timeout",
    name: "config.connectionTimeout[0]",
    ref: form.register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    fieldId: "kc-test-connection-button"
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    id: "kc-test-connection-button",
    "data-testid": "test-connection-button",
    onClick: () => testLdap("testConnection")
  }, t("common:testConnection"))), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("bindType"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:bindTypeHelp",
      fieldLabelId: "user-federation:bindType"
    }),
    fieldId: "kc-bind-type",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.authType[0]",
    defaultValue: "simple",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-bind-type",
      required: true,
      onToggle: () => setIsBindTypeDropdownOpen(!isBindTypeDropdownOpen),
      isOpen: isBindTypeDropdownOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setIsBindTypeDropdownOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "data-testid": "ldap-bind-type"
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      value: "simple"
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      value: "none"
    }))
  })), isEqual(ldapBindType, ["simple"]) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("bindDn"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:bindDnHelp",
      fieldLabelId: "user-federation:bindDn"
    }),
    fieldId: "kc-console-bind-dn",
    helperTextInvalid: t("validateBindDn"),
    validated: form.errors.config?.bindDn ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-console-bind-dn",
    "data-testid": "ldap-bind-dn",
    name: "config.bindDn[0]",
    ref: form.register({required: true}),
    validated: form.errors.config?.bindDn ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("bindCredentials"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:bindCredentialsHelp",
      fieldLabelId: "user-federation:bindCredentials"
    }),
    fieldId: "kc-console-bind-credentials",
    helperTextInvalid: t("validateBindCredentials"),
    validated: form.errors.config?.bindCredential ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(PasswordInput, {
    hasReveal: !edit,
    isRequired: true,
    id: "kc-console-bind-credentials",
    "data-testid": "ldap-bind-credentials",
    name: "config.bindCredential[0]",
    ref: form.register({
      required: true
    }),
    validated: form.errors.config?.bindCredential ? ValidatedOptions.error : ValidatedOptions.default
  }))), /* @__PURE__ */ React.createElement(FormGroup, {
    fieldId: "kc-test-auth-button"
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    id: "kc-test-auth-button",
    "data-testid": "test-auth-button",
    onClick: () => testLdap("testAuthentication")
  }, t("testAuthentication")))));
};
