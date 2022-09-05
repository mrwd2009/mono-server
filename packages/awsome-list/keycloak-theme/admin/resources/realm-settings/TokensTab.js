import React, {useEffect, useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Controller, useForm, useWatch} from "../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  Button,
  FormGroup,
  NumberInput,
  PageSection,
  Select,
  SelectOption,
  SelectVariant,
  Switch,
  Text,
  TextVariants
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {FormPanel} from "../components/scroll-form/FormPanel.js";
import {
  TimeSelector,
  toHumanFormat
} from "../components/time-selector/TimeSelector.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import "./realm-settings-section.css.proxy.js";
import {useWhoAmI} from "../context/whoami/WhoAmI.js";
import {convertToFormValues} from "../util.js";
export const RealmSettingsTokensTab = ({
  realm,
  reset,
  save
}) => {
  const {t} = useTranslation("realm-settings");
  const serverInfo = useServerInfo();
  const {whoAmI} = useWhoAmI();
  const [defaultSigAlgDrpdwnIsOpen, setDefaultSigAlgDrpdwnOpen] = useState(false);
  const allComponentTypes = serverInfo.componentTypes?.["org.keycloak.keys.KeyProvider"] ?? [];
  const esOptions = ["ES256", "ES384", "ES512"];
  const hmacAlgorithmOptions = allComponentTypes[2].properties[4].options;
  const javaKeystoreAlgOptions = allComponentTypes[3].properties[3].options;
  const defaultSigAlgOptions = esOptions.concat(hmacAlgorithmOptions, javaKeystoreAlgOptions);
  const form = useForm({shouldUnregister: false});
  const {setValue, control} = form;
  const offlineSessionMaxEnabled = useWatch({
    control,
    name: "offlineSessionMaxLifespanEnabled",
    defaultValue: realm.offlineSessionMaxLifespanEnabled
  });
  const ssoSessionIdleTimeout = useWatch({
    control,
    name: "ssoSessionIdleTimeout",
    defaultValue: 36e3
  });
  const revokeRefreshToken = useWatch({
    control,
    name: "revokeRefreshToken",
    defaultValue: false
  });
  useEffect(() => {
    convertToFormValues(realm, setValue);
  }, []);
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormPanel, {
    title: t("realm-settings:general"),
    className: "kc-sso-session-template"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    onSubmit: form.handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("defaultSigAlg"),
    fieldId: "kc-default-signature-algorithm",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:defaultSigAlg",
      fieldLabelId: "realm-settings:algorithm"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "defaultSignatureAlgorithm",
    defaultValue: "RS256",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-default-sig-alg",
      onToggle: () => setDefaultSigAlgDrpdwnOpen(!defaultSigAlgDrpdwnIsOpen),
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setDefaultSigAlgDrpdwnOpen(false);
      },
      selections: [value.toString()],
      variant: SelectVariant.single,
      "aria-label": t("defaultSigAlg"),
      isOpen: defaultSigAlgDrpdwnIsOpen,
      "data-testid": "select-default-sig-alg"
    }, defaultSigAlgOptions.map((p, idx) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: p === value,
      key: `default-sig-alg-${idx}`,
      value: p
    })))
  })))), /* @__PURE__ */ React.createElement(FormPanel, {
    title: t("realm-settings:refreshTokens"),
    className: "kc-client-session-template"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    onSubmit: form.handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("revokeRefreshToken"),
    fieldId: "kc-revoke-refresh-token",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:revokeRefreshToken",
      fieldLabelId: "realm-settings:revokeRefreshToken"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "revokeRefreshToken",
    control: form.control,
    defaultValue: false,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-revoke-refresh-token",
      "data-testid": "revoke-refresh-token-switch",
      "aria-label": "revoke-refresh-token-switch",
      label: t("common:enabled"),
      labelOff: t("common:disabled"),
      isChecked: value,
      onChange
    })
  })), revokeRefreshToken && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("refreshTokenMaxReuse"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:refreshTokenMaxReuse",
      fieldLabelId: "realm-settings:refreshTokenMaxReuse"
    }),
    fieldId: "refreshTokenMaxReuse"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "refreshTokenMaxReuse",
    defaultValue: 0,
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(NumberInput, {
      type: "text",
      id: "refreshTokenMaxReuseMs",
      value,
      onPlus: () => onChange(value + 1),
      onMinus: () => onChange(value - 1),
      onChange: (event) => onChange(Number(event.target.value))
    })
  })))), /* @__PURE__ */ React.createElement(FormPanel, {
    title: t("realm-settings:accessTokens"),
    className: "kc-offline-session-template"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    onSubmit: form.handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("accessTokenLifespan"),
    fieldId: "accessTokenLifespan",
    helperText: t("recommendedSsoTimeout", {
      time: toHumanFormat(ssoSessionIdleTimeout, whoAmI.getLocale())
    }),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:accessTokenLifespan",
      fieldLabelId: "realm-settings:accessTokenLifespan"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "accessTokenLifespan",
    defaultValue: "",
    helperTextInvalid: t("common:required"),
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      validated: value > ssoSessionIdleTimeout ? "warning" : "default",
      className: "kc-access-token-lifespan",
      "data-testid": "access-token-lifespan-input",
      "aria-label": "access-token-lifespan",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("accessTokenLifespanImplicitFlow"),
    fieldId: "accessTokenLifespanImplicitFlow",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:accessTokenLifespanImplicitFlow",
      fieldLabelId: "realm-settings:accessTokenLifespanImplicitFlow"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "accessTokenLifespanForImplicitFlow",
    defaultValue: "",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-access-token-lifespan-implicit",
      "data-testid": "access-token-lifespan-implicit-input",
      "aria-label": "access-token-lifespan-implicit",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clientLoginTimeout"),
    fieldId: "clientLoginTimeout",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:clientLoginTimeout",
      fieldLabelId: "realm-settings:clientLoginTimeout"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "accessCodeLifespan",
    defaultValue: "",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-client-login-timeout",
      "data-testid": "client-login-timeout-input",
      "aria-label": "client-login-timeout",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), offlineSessionMaxEnabled && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("offlineSessionMax"),
    fieldId: "offlineSessionMax",
    id: "offline-session-max-label",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:offlineSessionMax",
      fieldLabelId: "realm-settings:offlineSessionMax"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "offlineSessionMaxLifespan",
    defaultValue: "",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-offline-session-max",
      "data-testid": "offline-session-max-input",
      "aria-label": "offline-session-max-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })))), /* @__PURE__ */ React.createElement(FormPanel, {
    className: "kc-login-settings-template",
    title: t("actionTokens")
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    onSubmit: form.handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("userInitiatedActionLifespan"),
    id: "kc-user-initiated-action-lifespan",
    fieldId: "userInitiatedActionLifespan",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:userInitiatedActionLifespan",
      fieldLabelId: "realm-settings:userInitiatedActionLifespan"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "actionTokenGeneratedByUserLifespan",
    defaultValue: "",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-user-initiated-action-lifespan",
      "data-testid": "user-initiated-action-lifespan",
      "aria-label": "user-initiated-action-lifespan",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("defaultAdminInitiated"),
    fieldId: "defaultAdminInitiated",
    id: "default-admin-initiated-label",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:defaultAdminInitiatedActionLifespan",
      fieldLabelId: "realm-settings:defaultAdminInitiated"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "actionTokenGeneratedByAdminLifespan",
    defaultValue: "",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-default-admin-initiated",
      "data-testid": "default-admin-initated-input",
      "aria-label": "default-admin-initated-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(Text, {
    className: "kc-override-action-tokens-subtitle",
    component: TextVariants.h1
  }, t("overrideActionTokens")), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("emailVerification"),
    fieldId: "emailVerification",
    id: "email-verification"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.actionTokenGeneratedByUserLifespan-verify-email",
    defaultValue: "",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-email-verification",
      "data-testid": "email-verification-input",
      "aria-label": "email-verification-input",
      value,
      onChange: (value2) => onChange(value2.toString()),
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("idpAccountEmailVerification"),
    fieldId: "idpAccountEmailVerification",
    id: "idp-acct-label"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.actionTokenGeneratedByUserLifespan-idp-verify-account-via-email",
    defaultValue: "",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-idp-email-verification",
      "data-testid": "idp-email-verification-input",
      "aria-label": "idp-email-verification",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("forgotPassword"),
    fieldId: "forgotPassword",
    id: "forgot-password-label"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.actionTokenGeneratedByUserLifespan-reset-credentials",
    defaultValue: "",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-forgot-pw",
      "data-testid": "forgot-pw-input",
      "aria-label": "forgot-pw-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("executeActions"),
    fieldId: "executeActions",
    id: "execute-actions"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.actionTokenGeneratedByUserLifespan-execute-actions",
    defaultValue: "",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-execute-actions",
      "data-testid": "execute-actions-input",
      "aria-label": "execute-actions-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "tokens-tab-save",
    isDisabled: !form.formState.isDirty
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: reset
  }, t("common:revert"))))));
};
