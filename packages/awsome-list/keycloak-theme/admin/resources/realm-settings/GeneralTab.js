import React, {useEffect, useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Controller, FormProvider, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  Button,
  ClipboardCopy,
  FormGroup,
  PageSection,
  Select,
  SelectOption,
  SelectVariant,
  Stack,
  StackItem,
  Switch
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {addTrailingSlash, convertToFormValues} from "../util.js";
import useIsFeatureEnabled, {Feature} from "../utils/useIsFeatureEnabled.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {FormattedLink} from "../components/external-link/FormattedLink.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
import {KeyValueInput} from "../components/key-value-form/KeyValueInput.js";
export const RealmSettingsGeneralTab = ({
  realm,
  save
}) => {
  const {t} = useTranslation("realm-settings");
  const {adminClient} = useAdminClient();
  const {realm: realmName} = useRealm();
  const form = useForm({shouldUnregister: false});
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: {isDirty}
  } = form;
  const isFeatureEnabled = useIsFeatureEnabled();
  const [open, setOpen] = useState(false);
  const requireSslTypes = ["all", "external", "none"];
  const setupForm = () => {
    convertToFormValues(realm, setValue);
    if (realm.attributes?.["acr.loa.map"]) {
      const result = Object.entries(JSON.parse(realm.attributes["acr.loa.map"])).flatMap(([key, value]) => ({key, value}));
      result.concat({key: "", value: ""});
      setValue("attributes.acr.loa.map", result);
    }
  };
  useEffect(setupForm, []);
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("realmId"),
    fieldId: "kc-realm-id",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "realm",
    control,
    defaultValue: "",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(ClipboardCopy, {
      "data-testid": "realmName",
      onChange
    }, value)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("displayName"),
    fieldId: "kc-display-name"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-display-name",
    name: "displayName",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("htmlDisplayName"),
    fieldId: "kc-html-display-name"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-html-display-name",
    name: "displayNameHtml",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("frontendUrl"),
    fieldId: "kc-frontend-url",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:frontendUrl",
      fieldLabelId: "realm-settings:frontendUrl"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-frontend-url",
    name: "attributes.frontendUrl",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("requireSsl"),
    fieldId: "kc-require-ssl",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:requireSsl",
      fieldLabelId: "realm-settings:requireSsl"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "sslRequired",
    defaultValue: "none",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-require-ssl",
      onToggle: () => setOpen(!open),
      onSelect: (_, value2) => {
        onChange(value2);
        setOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("requireSsl"),
      isOpen: open
    }, requireSslTypes.map((sslType) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: sslType === value,
      key: sslType,
      value: sslType
    }, t(`sslType.${sslType}`))))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clients:acrToLoAMapping"),
    fieldId: "acrToLoAMapping",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:acrToLoAMapping",
      fieldLabelId: "clients:acrToLoAMapping"
    })
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(KeyValueInput, {
    name: "attributes.acr.loa.map"
  }))), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("userManagedAccess"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:userManagedAccess",
      fieldLabelId: "realm-settings:userManagedAccess"
    }),
    fieldId: "kc-user-managed-access"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "userManagedAccessAllowed",
    control,
    defaultValue: false,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-user-managed-access",
      "data-testid": "user-managed-access-switch",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  })), isFeatureEnabled(Feature.DeclarativeUserProfile) && /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("userProfileEnabled"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:userProfileEnabled",
      fieldLabelId: "realm-settings:userProfileEnabled"
    }),
    fieldId: "kc-user-profile-enabled"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.userProfileEnabled",
    control,
    defaultValue: false,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-user-profile-enabled",
      "data-testid": "user-profile-enabled-switch",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange(value2.toString())
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("endpoints"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:endpoints",
      fieldLabelId: "realm-settings:endpoints"
    }),
    fieldId: "kc-endpoints"
  }, /* @__PURE__ */ React.createElement(Stack, null, /* @__PURE__ */ React.createElement(StackItem, null, /* @__PURE__ */ React.createElement(FormattedLink, {
    href: `${addTrailingSlash(adminClient.baseUrl)}realms/${realmName}/.well-known/openid-configuration`,
    title: t("openIDEndpointConfiguration")
  })), /* @__PURE__ */ React.createElement(StackItem, null, /* @__PURE__ */ React.createElement(FormattedLink, {
    href: `${addTrailingSlash(adminClient.baseUrl)}realms/${realmName}/protocol/saml/descriptor`,
    title: t("samlIdentityProviderMetadata")
  })))), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "general-tab-save",
    isDisabled: !isDirty
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "general-tab-revert",
    variant: "link",
    onClick: setupForm
  }, t("common:revert")))));
};
