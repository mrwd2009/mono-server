import React, {useState} from "../../_snowpack/pkg/react.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {isEqual} from "../../_snowpack/pkg/lodash-es.js";
import {WizardSectionHeader} from "../../components/wizard-section-header/WizardSectionHeader.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
export const KerberosSettingsRequired = ({
  form,
  showSectionHeading = false,
  showSectionDescription = false
}) => {
  const {t} = useTranslation("user-federation");
  const {t: helpText} = useTranslation("user-federation-help");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const [isEditModeDropdownOpen, setIsEditModeDropdownOpen] = useState(false);
  const allowPassAuth = useWatch({
    control: form.control,
    name: "config.allowPasswordAuthentication"
  });
  useFetch(() => adminClient.realms.findOne({realm}), (result) => form.setValue("parentId", result.id), []);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, showSectionHeading && /* @__PURE__ */ React.createElement(WizardSectionHeader, {
    title: t("requiredSettings"),
    description: helpText("kerberosRequiredSettingsDescription"),
    showDescription: showSectionDescription
  }), /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("consoleDisplayName"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:consoleDisplayNameHelp",
      fieldLabelId: "user-federation:consoleDisplayName"
    }),
    fieldId: "kc-console-display-name",
    isRequired: true,
    validated: form.errors.name ? "error" : "default",
    helperTextInvalid: form.errors.name?.message
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    hidden: true,
    type: "text",
    id: "kc-console-providerId",
    name: "providerId",
    defaultValue: "kerberos",
    ref: form.register,
    "aria-label": t("providerId")
  }), /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    hidden: true,
    type: "text",
    id: "kc-console-providerType",
    name: "providerType",
    defaultValue: "org.keycloak.storage.UserStorageProvider",
    ref: form.register,
    "aria-label": t("providerType")
  }), /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    hidden: true,
    type: "text",
    id: "kc-console-parentId",
    name: "parentId",
    defaultValue: realm,
    ref: form.register,
    "aria-label": t("parentId")
  }), /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    id: "kc-console-name",
    name: "name",
    ref: form.register({
      required: {
        value: true,
        message: `${t("validateName")}`
      }
    }),
    "data-testid": "kerberos-name",
    validated: form.errors.name ? "error" : "default",
    "aria-label": t("consoleDisplayName")
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("kerberosRealm"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:kerberosRealmHelp",
      fieldLabelId: "user-federation:kc-kerberos-realm"
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
    "aria-label": t("kerberosRealm"),
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
    "aria-label": t("kerberosPrincipal"),
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
    "aria-label": t("kerberosKeyTab"),
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
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value?.[0] === "true",
      label: t("common:on"),
      labelOff: t("common:off")
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("allowPasswordAuthentication"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:allowPasswordAuthenticationHelp",
      fieldLabelId: "user-federation:allowPasswordAuthentication"
    }),
    fieldId: "kc-allow-password-authentication",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.allowPasswordAuthentication",
    defaultValue: ["false"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-allow-password-authentication",
      "data-testid": "allow-password-authentication",
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value?.[0] === "true",
      label: t("common:on"),
      labelOff: t("common:off")
    })
  })), isEqual(allowPassAuth, ["true"]) ? /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("editMode"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:editModeKerberosHelp",
      fieldLabelId: "user-federation:editMode"
    }),
    isRequired: true,
    fieldId: "kc-edit-mode"
  }, " ", /* @__PURE__ */ React.createElement(Controller, {
    name: "config.editMode[0]",
    defaultValue: "READ_ONLY",
    control: form.control,
    rules: {required: true},
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-edit-mode",
      required: true,
      onToggle: () => setIsEditModeDropdownOpen(!isEditModeDropdownOpen),
      isOpen: isEditModeDropdownOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setIsEditModeDropdownOpen(false);
      },
      selections: value,
      variant: SelectVariant.single
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      key: 0,
      value: "READ_ONLY",
      isPlaceholder: true
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 1,
      value: "UNSYNCED"
    }))
  })) : null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("updateFirstLogin"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:updateFirstLoginHelp",
      fieldLabelId: "user-federation:updateFirstLogin"
    }),
    fieldId: "kc-update-first-login",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.updateProfileFirstLogin",
    defaultValue: ["false"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-update-first-login",
      "data-testid": "update-first-login",
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value?.[0] === "true",
      label: t("common:on"),
      labelOff: t("common:off")
    })
  }))));
};
