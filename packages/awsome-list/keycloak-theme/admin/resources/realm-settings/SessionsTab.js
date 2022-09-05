import React, {useEffect} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Controller, useForm, useWatch} from "../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  Button,
  FormGroup,
  PageSection,
  Switch
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {FormPanel} from "../components/scroll-form/FormPanel.js";
import {TimeSelector} from "../components/time-selector/TimeSelector.js";
import {convertToFormValues} from "../util.js";
import "./realm-settings-section.css.proxy.js";
export const RealmSettingsSessionsTab = ({
  realm,
  save
}) => {
  const {t} = useTranslation("realm-settings");
  const {setValue, control, handleSubmit, formState} = useForm({
    shouldUnregister: false
  });
  const offlineSessionMaxEnabled = useWatch({
    control,
    name: "offlineSessionMaxLifespanEnabled"
  });
  const setupForm = () => {
    convertToFormValues(realm, setValue);
  };
  useEffect(setupForm, []);
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormPanel, {
    title: t("SSOSessionSettings"),
    className: "kc-sso-session-template"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("SSOSessionIdle"),
    fieldId: "SSOSessionIdle",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:ssoSessionIdle",
      fieldLabelId: "realm-settings:SSOSessionIdle"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "ssoSessionIdleTimeout",
    defaultValue: realm.ssoSessionIdleTimeout,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-sso-session-idle",
      "data-testid": "sso-session-idle-input",
      "aria-label": "sso-session-idle-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("SSOSessionMax"),
    fieldId: "SSOSessionMax",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:ssoSessionMax",
      fieldLabelId: "realm-settings:SSOSessionMax"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "ssoSessionMaxLifespan",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-sso-session-max",
      "data-testid": "sso-session-max-input",
      "aria-label": "sso-session-max-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("SSOSessionIdleRememberMe"),
    fieldId: "SSOSessionIdleRememberMe",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:ssoSessionIdleRememberMe",
      fieldLabelId: "realm-settings:SSOSessionIdleRememberMe"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "ssoSessionIdleTimeoutRememberMe",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-sso-session-idle-remember-me",
      "data-testid": "sso-session-idle-remember-me-input",
      "aria-label": "sso-session-idle-remember-me-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("SSOSessionMaxRememberMe"),
    fieldId: "SSOSessionMaxRememberMe",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:ssoSessionMaxRememberMe",
      fieldLabelId: "realm-settings:SSOSessionMaxRememberMe"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "ssoSessionMaxLifespanRememberMe",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-sso-session-max-remember-me",
      "aria-label": "sso-session-max-remember-me-input",
      "data-testid": "sso-session-max-remember-me-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })))), /* @__PURE__ */ React.createElement(FormPanel, {
    title: t("clientSessionSettings"),
    className: "kc-client-session-template"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clientSessionIdle"),
    fieldId: "clientSessionIdle",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:clientSessionIdle",
      fieldLabelId: "realm-settings:clientSessionIdle"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "clientSessionIdleTimeout",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-client-session-idle",
      "data-testid": "client-session-idle-input",
      "aria-label": "client-session-idle-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clientSessionMax"),
    fieldId: "clientSessionMax",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:clientSessionMax",
      fieldLabelId: "realm-settings:clientSessionMax"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "clientSessionMaxLifespan",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-client-session-max",
      "data-testid": "client-session-max-input",
      "aria-label": "client-session-max-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })))), /* @__PURE__ */ React.createElement(FormPanel, {
    title: t("offlineSessionSettings"),
    className: "kc-offline-session-template"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("offlineSessionIdle"),
    fieldId: "offlineSessionIdle",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:offlineSessionIdle",
      fieldLabelId: "realm-settings:offlineSessionIdle"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "offlineSessionIdleTimeout",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-offline-session-idle",
      "data-testid": "offline-session-idle-input",
      "aria-label": "offline-session-idle-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("offlineSessionMaxLimited"),
    fieldId: "kc-offlineSessionMaxLimited",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:offlineSessionMaxLimited",
      fieldLabelId: "realm-settings:offlineSessionMaxLimited"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "offlineSessionMaxLifespanEnabled",
    control,
    defaultValue: false,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-offline-session-max",
      "data-testid": "offline-session-max-switch",
      "aria-label": "offline-session-max-switch",
      label: t("common:enabled"),
      labelOff: t("common:disabled"),
      isChecked: value,
      onChange
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
    control,
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
    title: t("loginSettings")
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("loginTimeout"),
    id: "kc-login-timeout-label",
    fieldId: "offlineSessionIdle",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:loginTimeout",
      fieldLabelId: "realm-settings:loginTimeout"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "accessCodeLifespanLogin",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-login-timeout",
      "data-testid": "login-timeout-input",
      "aria-label": "login-timeout-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("loginActionTimeout"),
    fieldId: "loginActionTimeout",
    id: "login-action-timeout-label",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:loginActionTimeout",
      fieldLabelId: "realm-settings:loginActionTimeout"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "accessCodeLifespanUserAction",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      className: "kc-login-action-timeout",
      "data-testid": "login-action-timeout-input",
      "aria-label": "login-action-timeout-input",
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "sessions-tab-save",
    isDisabled: !formState.isDirty
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: setupForm
  }, t("common:revert"))))));
};
