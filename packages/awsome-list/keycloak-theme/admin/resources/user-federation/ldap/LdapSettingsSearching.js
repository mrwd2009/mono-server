import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import React, {useState} from "../../_snowpack/pkg/react.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {WizardSectionHeader} from "../../components/wizard-section-header/WizardSectionHeader.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const LdapSettingsSearching = ({
  form,
  showSectionHeading = false,
  showSectionDescription = false
}) => {
  const {t} = useTranslation("user-federation");
  const {t: helpText} = useTranslation("user-federation-help");
  const [isSearchScopeDropdownOpen, setIsSearchScopeDropdownOpen] = useState(false);
  const [isEditModeDropdownOpen, setIsEditModeDropdownOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, showSectionHeading && /* @__PURE__ */ React.createElement(WizardSectionHeader, {
    title: t("ldapSearchingAndUpdatingSettings"),
    description: helpText("ldapSearchingAndUpdatingSettingsDescription"),
    showDescription: showSectionDescription
  }), /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("editMode"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:editModeLdapHelp",
      fieldLabelId: "user-federation:editMode"
    }),
    fieldId: "kc-edit-mode",
    isRequired: true,
    validated: form.errors.config?.editMode?.[0] ? "error" : "default",
    helperTextInvalid: form.errors.config?.editMode?.[0].message
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.editMode[0]",
    defaultValue: "",
    control: form.control,
    rules: {
      required: {value: true, message: t("validateEditMode")}
    },
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-edit-mode",
      required: true,
      onToggle: () => setIsEditModeDropdownOpen(!isEditModeDropdownOpen),
      isOpen: isEditModeDropdownOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setIsEditModeDropdownOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      validated: form.errors.config?.editMode?.[0] ? "error" : "default"
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      value: "",
      isPlaceholder: true
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      value: "READ_ONLY"
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      value: "WRITABLE"
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      value: "UNSYNCED"
    }))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("usersDN"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:usersDNHelp",
      fieldLabelId: "user-federation:usersDn"
    }),
    fieldId: "kc-console-users-dn",
    isRequired: true,
    validated: form.errors.config?.usersDn?.[0] ? "error" : "default",
    helperTextInvalid: form.errors.config?.usersDn?.[0].message
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    defaultValue: "",
    id: "kc-console-users-dn",
    "data-testid": "ldap-users-dn",
    name: "config.usersDn[0]",
    ref: form.register({
      required: {
        value: true,
        message: `${t("validateUsersDn")}`
      }
    }),
    validated: form.errors.config?.usersDn?.[0] ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("usernameLdapAttribute"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:usernameLdapAttributeHelp",
      fieldLabelId: "user-federation:usernameLdapAttribute"
    }),
    fieldId: "kc-username-ldap-attribute",
    isRequired: true,
    validated: form.errors.config?.usernameLDAPAttribute?.[0] ? "error" : "default",
    helperTextInvalid: form.errors.config?.usernameLDAPAttribute?.[0].message
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    defaultValue: "cn",
    id: "kc-username-ldap-attribute",
    "data-testid": "ldap-username-attribute",
    name: "config.usernameLDAPAttribute[0]",
    ref: form.register({
      required: {
        value: true,
        message: `${t("validateUsernameLDAPAttribute")}`
      }
    }),
    validated: form.errors.config?.usernameLDAPAttribute?.[0] ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("rdnLdapAttribute"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:rdnLdapAttributeHelp",
      fieldLabelId: "user-federation:rdnLdapAttribute"
    }),
    fieldId: "kc-rdn-ldap-attribute",
    isRequired: true,
    validated: form.errors.config?.rdnLDAPAttribute?.[0] ? "error" : "default",
    helperTextInvalid: form.errors.config?.rdnLDAPAttribute?.[0].message
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    defaultValue: "cn",
    id: "kc-rdn-ldap-attribute",
    "data-testid": "ldap-rdn-attribute",
    name: "config.rdnLDAPAttribute[0]",
    ref: form.register({
      required: {
        value: true,
        message: `${t("validateRdnLdapAttribute")}`
      }
    }),
    validated: form.errors.config?.rdnLDAPAttribute?.[0] ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("uuidLdapAttribute"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:uuidLdapAttributeHelp",
      fieldLabelId: "user-federation:uuidLdapAttribute"
    }),
    fieldId: "kc-uuid-ldap-attribute",
    isRequired: true,
    validated: form.errors.config?.uuidLDAPAttribute?.[0] ? "error" : "default",
    helperTextInvalid: form.errors.config?.uuidLDAPAttribute?.[0].message
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    defaultValue: "objectGUID",
    id: "kc-uuid-ldap-attribute",
    "data-testid": "ldap-uuid-attribute",
    name: "config.uuidLDAPAttribute[0]",
    ref: form.register({
      required: {
        value: true,
        message: `${t("validateUuidLDAPAttribute")}`
      }
    }),
    validated: form.errors.config?.uuidLDAPAttribute?.[0] ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("userObjectClasses"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:userObjectClassesHelp",
      fieldLabelId: "user-federation:userObjectClasses"
    }),
    fieldId: "kc-user-object-classes",
    isRequired: true,
    validated: form.errors.config?.userObjectClasses?.[0] ? "error" : "default",
    helperTextInvalid: form.errors.config?.userObjectClasses?.[0].message
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    defaultValue: "person, organizationalPerson, user",
    id: "kc-user-object-classes",
    "data-testid": "ldap-user-object-classes",
    name: "config.userObjectClasses[0]",
    ref: form.register({
      required: {
        value: true,
        message: `${t("validateUserObjectClasses")}`
      }
    }),
    validated: form.errors.config?.userObjectClasses?.[0] ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("userLdapFilter"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:userLdapFilterHelp",
      fieldLabelId: "user-federation:userLdapFilter"
    }),
    fieldId: "kc-user-ldap-filter",
    validated: form.errors.config?.customUserSearchFilter?.[0] ? "error" : "default",
    helperTextInvalid: form.errors.config?.customUserSearchFilter?.[0].message
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-user-ldap-filter",
    "data-testid": "user-ldap-filter",
    name: "config.customUserSearchFilter[0]",
    ref: form.register({
      pattern: {
        value: /(\(.*\))$/,
        message: `${t("validateCustomUserSearchFilter")}`
      }
    }),
    validated: form.errors.config?.customUserSearchFilter?.[0] ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("searchScope"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:searchScopeHelp",
      fieldLabelId: "user-federation:searchScope"
    }),
    fieldId: "kc-search-scope"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.searchScope[0]",
    defaultValue: "",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-search-scope",
      required: true,
      onToggle: () => setIsSearchScopeDropdownOpen(!isSearchScopeDropdownOpen),
      isOpen: isSearchScopeDropdownOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setIsSearchScopeDropdownOpen(false);
      },
      selections: value,
      variant: SelectVariant.single
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      key: 0,
      value: "1",
      isPlaceholder: true
    }, t("oneLevel")), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 1,
      value: "2"
    }, t("subtree")))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("readTimeout"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:readTimeoutHelp",
      fieldLabelId: "user-federation:readTimeout"
    }),
    fieldId: "kc-read-timeout"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "number",
    min: 0,
    id: "kc-read-timeout",
    "data-testid": "ldap-read-timeout",
    name: "config.readTimeout[0]",
    ref: form.register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("pagination"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:paginationHelp",
      fieldLabelId: "user-federation:pagination"
    }),
    fieldId: "kc-console-pagination",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.pagination",
    defaultValue: ["false"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-console-pagination",
      "data-testid": "console-pagination",
      isDisabled: false,
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value[0] === "true",
      label: t("common:on"),
      labelOff: t("common:off")
    })
  }))));
};
