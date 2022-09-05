import {
  ActionGroup,
  AlertVariant,
  Button,
  Checkbox,
  FormGroup,
  PageSection,
  Switch
} from "../_snowpack/pkg/@patternfly/react-core.js";
import React, {useState} from "../_snowpack/pkg/react.js";
import {Controller, useForm, useWatch} from "../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {FormPanel} from "../components/scroll-form/FormPanel.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useWhoAmI} from "../context/whoami/WhoAmI.js";
import {emailRegexPattern} from "../util.js";
import {AddUserEmailModal} from "./AddUserEmailModal.js";
import "./realm-settings-section.css.proxy.js";
export const RealmSettingsEmailTab = ({
  realm: initialRealm
}) => {
  const {t} = useTranslation("realm-settings");
  const {adminClient} = useAdminClient();
  const {realm: realmName} = useRealm();
  const {addAlert, addError} = useAlerts();
  const {whoAmI} = useWhoAmI();
  const [realm, setRealm] = useState(initialRealm);
  const [callback, setCallback] = useState();
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset: resetForm,
    getValues,
    formState: {errors}
  } = useForm({defaultValues: realm});
  const reset = () => resetForm(realm);
  const watchFromValue = watch("smtpServer.from", "");
  const watchHostValue = watch("smtpServer.host", "");
  const authenticationEnabled = useWatch({
    control,
    name: "smtpServer.auth",
    defaultValue: ""
  });
  const save = async (form) => {
    try {
      const registered = await registerEmailIfNeeded();
      if (!registered) {
        return;
      }
      const savedRealm = {...realm, ...form};
      await adminClient.realms.update({realm: realmName}, savedRealm);
      setRealm(savedRealm);
      addAlert(t("saveSuccess"), AlertVariant.success);
    } catch (error) {
      addError("realm-settings:saveError", error);
    }
  };
  const testConnection = async () => {
    const toNumber = (value) => Number(value);
    const toBoolean = (value) => value === true.toString();
    const valueMapper = new Map([
      ["port", toNumber],
      ["ssl", toBoolean],
      ["starttls", toBoolean],
      ["auth", toBoolean]
    ]);
    const serverSettings = {...getValues()["smtpServer"]};
    for (const [key, mapperFn] of valueMapper.entries()) {
      serverSettings[key] = mapperFn(serverSettings[key]);
    }
    try {
      const registered = await registerEmailIfNeeded();
      if (!registered) {
        return;
      }
      await adminClient.realms.testSMTPConnection({realm: realm.realm}, serverSettings);
      addAlert(t("testConnectionSuccess"), AlertVariant.success);
    } catch (error) {
      addError("realm-settings:testConnectionError", error);
    }
  };
  const registerEmailIfNeeded = async () => {
    const user = await adminClient.users.findOne({id: whoAmI.getUserId()});
    if (!user) {
      throw new Error("Unable to find user.");
    }
    if (user.email) {
      return true;
    }
    return new Promise((resolve) => {
      const callback2 = (registered) => {
        setCallback(void 0);
        resolve(registered);
      };
      setCallback(() => callback2);
    });
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, callback && /* @__PURE__ */ React.createElement(AddUserEmailModal, {
    callback
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormPanel, {
    title: t("template"),
    className: "kc-email-template"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("from"),
    fieldId: "kc-display-name",
    isRequired: true,
    validated: errors.smtpServer?.from ? "error" : "default",
    helperTextInvalid: t("users:emailInvalid")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "email",
    id: "kc-sender-email-address",
    "data-testid": "sender-email-address",
    name: "smtpServer.from",
    ref: register({
      pattern: emailRegexPattern,
      required: true
    }),
    placeholder: "Sender email address",
    validated: errors.smtpServer?.from ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("fromDisplayName"),
    fieldId: "kc-from-display-name",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:fromDisplayName",
      fieldLabelId: "realm-settings:authentication"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-from-display-name",
    "data-testid": "from-display-name",
    name: "smtpServer.fromDisplayName",
    ref: register,
    placeholder: "Display name for Sender email address"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("replyTo"),
    fieldId: "kc-reply-to",
    validated: errors.smtpServer?.replyTo ? "error" : "default",
    helperTextInvalid: t("users:emailInvalid")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "email",
    id: "kc-reply-to",
    name: "smtpServer.replyTo",
    ref: register({
      pattern: emailRegexPattern
    }),
    placeholder: "Reply to email address",
    validated: errors.smtpServer?.replyTo ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("replyToDisplayName"),
    fieldId: "kc-reply-to-display-name",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:replyToDisplayName",
      fieldLabelId: "realm-settings:replyToDisplayName"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-reply-to-display-name",
    name: "smtpServer.replyToDisplayName",
    ref: register,
    placeholder: 'Display name for "reply to" email address'
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("envelopeFrom"),
    fieldId: "kc-envelope-from",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:envelopeFrom",
      fieldLabelId: "realm-settings:envelopeFrom"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-envelope-from",
    name: "smtpServer.envelopeFrom",
    ref: register,
    placeholder: "Sender envelope email address"
  })))), /* @__PURE__ */ React.createElement(FormPanel, {
    className: "kc-email-connection",
    title: t("connectionAndAuthentication")
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("host"),
    fieldId: "kc-host",
    isRequired: true,
    validated: errors.smtpServer?.host ? "error" : "default",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-host",
    name: "smtpServer.host",
    ref: register({required: true}),
    placeholder: "SMTP host",
    validated: errors.smtpServer?.host ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("port"),
    fieldId: "kc-port"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-port",
    name: "smtpServer.port",
    ref: register,
    placeholder: "SMTP port (defaults to 25)"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("encryption"),
    fieldId: "kc-html-display-name"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "smtpServer.ssl",
    control,
    defaultValue: "false",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Checkbox, {
      id: "kc-enable-ssl",
      "data-testid": "enable-ssl",
      label: t("enableSSL"),
      ref: register,
      isChecked: value === "true",
      onChange: (value2) => onChange("" + value2)
    })
  }), /* @__PURE__ */ React.createElement(Controller, {
    name: "smtpServer.starttls",
    control,
    defaultValue: "false",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Checkbox, {
      id: "kc-enable-start-tls",
      "data-testid": "enable-start-tls",
      label: t("enableStartTLS"),
      ref: register,
      isChecked: value === "true",
      onChange: (value2) => onChange("" + value2)
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("authentication"),
    fieldId: "kc-authentication"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "smtpServer.auth",
    control,
    defaultValue: "",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-authentication-switch",
      "data-testid": "email-authentication-switch",
      label: t("common:enabled"),
      labelOff: t("common:disabled"),
      isChecked: value === "true",
      onChange: (value2) => {
        onChange("" + value2);
      }
    })
  })), authenticationEnabled === "true" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("username"),
    fieldId: "kc-username",
    isRequired: true,
    validated: errors.smtpServer?.user ? "error" : "default",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-username",
    "data-testid": "username-input",
    name: "smtpServer.user",
    ref: register({required: true}),
    placeholder: "Login username",
    validated: errors.smtpServer?.user ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("password"),
    fieldId: "kc-username",
    isRequired: true,
    validated: errors.smtpServer?.password ? "error" : "default",
    helperTextInvalid: t("common:required"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:password",
      fieldLabelId: "realm-settings:password"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "password",
    id: "kc-password",
    "data-testid": "password-input",
    name: "smtpServer.password",
    ref: register({required: true}),
    placeholder: "Login password",
    validated: errors.smtpServer?.password ? "error" : "default"
  }))), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "email-tab-save"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    onClick: () => testConnection(),
    "data-testid": "test-connection-button",
    isDisabled: !(emailRegexPattern.test(watchFromValue) && watchHostValue)
  }, t("common:testConnection")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: reset
  }, t("common:revert")))))));
};
