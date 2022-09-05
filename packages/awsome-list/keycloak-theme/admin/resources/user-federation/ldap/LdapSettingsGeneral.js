import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import React, {useState} from "../../_snowpack/pkg/react.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {WizardSectionHeader} from "../../components/wizard-section-header/WizardSectionHeader.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
export const LdapSettingsGeneral = ({
  form,
  showSectionHeading = false,
  showSectionDescription = false,
  vendorEdit = false
}) => {
  const {t} = useTranslation("user-federation");
  const {t: helpText} = useTranslation("user-federation-help");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  useFetch(() => adminClient.realms.findOne({realm}), (result) => form.setValue("parentId", result.id), []);
  const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);
  const setVendorDefaultValues = () => {
    switch (form.getValues("config.vendor[0]")) {
      case "ad":
        form.setValue("config.usernameLDAPAttribute[0]", "cn");
        form.setValue("config.rdnLDAPAttribute[0]", "cn");
        form.setValue("config.uuidLDAPAttribute[0]", "objectGUID");
        form.setValue("config.userObjectClasses[0]", "person, organizationalPerson, user");
        break;
      case "rhds":
        form.setValue("config.usernameLDAPAttribute[0]", "uid");
        form.setValue("config.rdnLDAPAttribute[0]", "uid");
        form.setValue("config.uuidLDAPAttribute[0]", "nsuniqueid");
        form.setValue("config.userObjectClasses[0]", "inetOrgPerson, organizationalPerson");
        break;
      case "tivoli":
        form.setValue("config.usernameLDAPAttribute[0]", "uid");
        form.setValue("config.rdnLDAPAttribute[0]", "uid");
        form.setValue("config.uuidLDAPAttribute[0]", "uniqueidentifier");
        form.setValue("config.userObjectClasses[0]", "inetOrgPerson, organizationalPerson");
        break;
      case "edirectory":
        form.setValue("config.usernameLDAPAttribute[0]", "uid");
        form.setValue("config.rdnLDAPAttribute[0]", "uid");
        form.setValue("config.uuidLDAPAttribute[0]", "guid");
        form.setValue("config.userObjectClasses[0]", "inetOrgPerson, organizationalPerson");
        break;
      case "other":
        form.setValue("config.usernameLDAPAttribute[0]", "uid");
        form.setValue("config.rdnLDAPAttribute[0]", "uid");
        form.setValue("config.uuidLDAPAttribute[0]", "entryUUID");
        form.setValue("config.userObjectClasses[0]", "inetOrgPerson, organizationalPerson");
        break;
      default:
        return "";
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, showSectionHeading && /* @__PURE__ */ React.createElement(WizardSectionHeader, {
    title: t("generalOptions"),
    description: helpText("ldapGeneralOptionsSettingsDescription"),
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
    id: "kc-console-provider-id",
    name: "providerId",
    defaultValue: "ldap",
    ref: form.register
  }), /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    hidden: true,
    type: "text",
    id: "kc-console-provider-type",
    name: "providerType",
    defaultValue: "org.keycloak.storage.UserStorageProvider",
    ref: form.register
  }), /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    hidden: true,
    type: "text",
    id: "kc-console-parentId",
    name: "parentId",
    defaultValue: realm,
    ref: form.register
  }), /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    id: "kc-console-display-name",
    name: "name",
    defaultValue: "ldap",
    ref: form.register({
      required: {
        value: true,
        message: `${t("validateName")}`
      }
    }),
    "data-testid": "ldap-name",
    validated: form.errors.name ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("vendor"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:vendorHelp",
      fieldLabelId: "user-federation:vendor"
    }),
    fieldId: "kc-vendor",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.vendor[0]",
    defaultValue: "ad",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      isDisabled: !!vendorEdit,
      toggleId: "kc-vendor",
      required: true,
      onToggle: () => setIsVendorDropdownOpen(!isVendorDropdownOpen),
      isOpen: isVendorDropdownOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setIsVendorDropdownOpen(false);
        setVendorDefaultValues();
      },
      selections: value,
      variant: SelectVariant.single
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      key: 0,
      value: "ad",
      isPlaceholder: true
    }, "Active Directory"), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 1,
      value: "rhds"
    }, "Red Hat Directory Server"), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 2,
      value: "tivoli"
    }, "Tivoli"), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 3,
      value: "edirectory"
    }, "Novell eDirectory"), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 4,
      value: "other"
    }, "Other"))
  }))));
};
