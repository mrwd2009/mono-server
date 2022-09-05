import React from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {FormGroup, PageSection, Switch} from "../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {FormPanel} from "../components/scroll-form/FormPanel.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
export const RealmSettingsLoginTab = ({
  realm,
  refresh
}) => {
  const {t} = useTranslation("realm-settings");
  const {addAlert, addError} = useAlerts();
  const {adminClient} = useAdminClient();
  const {realm: realmName} = useRealm();
  const updateSwitchValue = async (switches) => {
    const name = Array.isArray(switches) ? Object.keys(switches[0])[0] : Object.keys(switches)[0];
    try {
      await adminClient.realms.update({
        realm: realmName
      }, Array.isArray(switches) ? switches.reduce((realm2, s) => Object.assign(realm2, s), realm) : Object.assign(realm, switches));
      addAlert(t("enableSwitchSuccess", {switch: t(name)}));
      refresh();
    } catch (error) {
      addError(t("enableSwitchError"), error);
    }
  };
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormPanel, {
    className: "kc-login-screen",
    title: t("loginScreenCustomization")
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("registrationAllowed"),
    fieldId: "kc-user-reg",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t("userRegistrationHelpText"),
      fieldLabelId: "realm-settings:registrationAllowed"
    }),
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "kc-user-reg-switch",
    "data-testid": "user-reg-switch",
    value: realm.registrationAllowed ? "on" : "off",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: realm.registrationAllowed,
    onChange: (value) => {
      updateSwitchValue({registrationAllowed: value});
    }
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("resetPasswordAllowed"),
    fieldId: "kc-forgot-pw",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings:forgotPasswordHelpText",
      fieldLabelId: "realm-settings:resetPasswordAllowed"
    }),
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "kc-forgot-pw-switch",
    "data-testid": "forgot-pw-switch",
    name: "resetPasswordAllowed",
    value: realm.resetPasswordAllowed ? "on" : "off",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: realm.resetPasswordAllowed,
    onChange: (value) => {
      updateSwitchValue({resetPasswordAllowed: value});
    }
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("rememberMe"),
    fieldId: "kc-remember-me",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings:rememberMeHelpText",
      fieldLabelId: "realm-settings:rememberMe"
    }),
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "kc-remember-me-switch",
    "data-testid": "remember-me-switch",
    value: realm.rememberMe ? "on" : "off",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: realm.rememberMe,
    onChange: (value) => {
      updateSwitchValue({rememberMe: value});
    }
  })))), /* @__PURE__ */ React.createElement(FormPanel, {
    className: "kc-email-settings",
    title: t("emailSettings")
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("registrationEmailAsUsername"),
    fieldId: "kc-email-as-username",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings:emailAsUsernameHelpText",
      fieldLabelId: "realm-settings:registrationEmailAsUsername"
    }),
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "kc-email-as-username-switch",
    "data-testid": "email-as-username-switch",
    value: realm.registrationEmailAsUsername ? "on" : "off",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: realm.registrationEmailAsUsername,
    onChange: (value) => {
      updateSwitchValue([
        {
          registrationEmailAsUsername: value
        },
        {
          duplicateEmailsAllowed: false
        }
      ]);
    }
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("loginWithEmailAllowed"),
    fieldId: "kc-login-with-email",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings:loginWithEmailHelpText",
      fieldLabelId: "realm-settings:loginWithEmailAllowed"
    }),
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "kc-login-with-email-switch",
    "data-testid": "login-with-email-switch",
    value: realm.loginWithEmailAllowed ? "on" : "off",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: realm.loginWithEmailAllowed,
    onChange: (value) => {
      updateSwitchValue([
        {
          loginWithEmailAllowed: value
        },
        {duplicateEmailsAllowed: false}
      ]);
    }
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("duplicateEmailsAllowed"),
    fieldId: "kc-duplicate-emails",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings:duplicateEmailsHelpText",
      fieldLabelId: "realm-settings:duplicateEmailsAllowed"
    }),
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "kc-duplicate-emails-switch",
    "data-testid": "duplicate-emails-switch",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: realm.duplicateEmailsAllowed || realm.loginWithEmailAllowed || realm.registrationEmailAsUsername,
    onChange: (value) => {
      updateSwitchValue({
        duplicateEmailsAllowed: value
      });
    },
    isDisabled: realm.loginWithEmailAllowed || realm.registrationEmailAsUsername
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("verifyEmail"),
    fieldId: "kc-verify-email",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings:verifyEmailHelpText",
      fieldLabelId: "realm-settings:verifyEmail"
    }),
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "kc-verify-email-switch",
    "data-testid": "verify-email-switch",
    name: "verifyEmail",
    value: realm.verifyEmail ? "on" : "off",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: realm.verifyEmail,
    onChange: (value) => {
      updateSwitchValue({verifyEmail: value});
    }
  })))), /* @__PURE__ */ React.createElement(FormPanel, {
    className: "kc-user-info-settings",
    title: t("userInfoSettings")
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("editUsernameAllowed"),
    fieldId: "kc-edit-username",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:editUsername",
      fieldLabelId: "realm-settings:editUsernameAllowed"
    }),
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "kc-edit-username-switch",
    "data-testid": "edit-username-switch",
    value: realm.editUsernameAllowed ? "on" : "off",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: realm.editUsernameAllowed,
    onChange: (value) => {
      updateSwitchValue({editUsernameAllowed: value});
    }
  })))));
};
