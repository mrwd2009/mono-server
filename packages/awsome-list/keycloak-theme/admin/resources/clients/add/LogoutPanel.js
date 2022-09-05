import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, Switch, ValidatedOptions} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {useAccess} from "../../context/access/Access.js";
import {SaveReset} from "../advanced/SaveReset.js";
export const LogoutPanel = ({
  save,
  reset,
  client: {access}
}) => {
  const {t} = useTranslation("clients");
  const {
    register,
    control,
    watch,
    formState: {errors}
  } = useFormContext();
  const {hasAccess} = useAccess();
  const isManager = hasAccess("manage-clients") || access?.configure;
  const protocol = watch("protocol");
  const frontchannelLogout = watch("frontchannelLogout");
  return /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    fineGrainedAccess: access?.configure,
    role: "manage-clients",
    className: "pf-u-pb-4xl"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("frontchannelLogout"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:frontchannelLogout",
      fieldLabelId: "clients:frontchannelLogout"
    }),
    fieldId: "kc-frontchannelLogout",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "frontchannelLogout",
    defaultValue: true,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-frontchannelLogout-switch",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  })), protocol === "openid-connect" && frontchannelLogout && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("frontchannelLogoutUrl"),
    fieldId: "frontchannelLogoutUrl",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:frontchannelLogoutUrl",
      fieldLabelId: "clients:frontchannelLogoutUrl"
    }),
    helperTextInvalid: errors.attributes?.frontchannel?.logout?.url?.message,
    validated: errors.attributes?.frontchannel?.logout?.url?.message ? ValidatedOptions.error : ValidatedOptions.default
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "frontchannelLogoutUrl",
    name: "attributes.frontchannel.logout.url",
    ref: register({
      validate: (uri) => (uri.startsWith("https://") || uri.startsWith("http://")) && !uri.includes("*") || uri === "" || t("frontchannelUrlInvalid").toString()
    }),
    validated: errors.attributes?.frontchannel?.logout?.url?.message ? ValidatedOptions.error : ValidatedOptions.default
  })), protocol === "openid-connect" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("backchannelLogoutUrl"),
    fieldId: "backchannelLogoutUrl",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:backchannelLogoutUrl",
      fieldLabelId: "clients:backchannelLogoutUrl"
    }),
    helperTextInvalid: errors.attributes?.backchannel?.logout?.url?.message,
    validated: errors.attributes?.backchannel?.logout?.url?.message ? ValidatedOptions.error : ValidatedOptions.default
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "backchannelLogoutUrl",
    name: "attributes.backchannel.logout.url",
    ref: register({
      validate: (uri) => (uri.startsWith("https://") || uri.startsWith("http://")) && !uri.includes("*") || uri === "" || t("backchannelUrlInvalid").toString()
    }),
    validated: errors.attributes?.backchannel?.logout?.url?.message ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("backchannelLogoutSessionRequired"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:backchannelLogoutSessionRequired",
      fieldLabelId: "clients:backchannelLogoutSessionRequired"
    }),
    fieldId: "backchannelLogoutSessionRequired",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.backchannel.logout.session.required",
    defaultValue: "true",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "backchannelLogoutSessionRequired",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange(value2.toString())
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("backchannelLogoutRevokeOfflineSessions"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:backchannelLogoutRevokeOfflineSessions",
      fieldLabelId: "clients:backchannelLogoutRevokeOfflineSessions"
    }),
    fieldId: "backchannelLogoutRevokeOfflineSessions",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.backchannel.logout.revoke.offline.tokens",
    defaultValue: "false",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "backchannelLogoutRevokeOfflineSessions",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange(value2.toString())
    })
  }))), /* @__PURE__ */ React.createElement(SaveReset, {
    className: "keycloak__form_actions",
    name: "settings",
    save,
    reset,
    isActive: isManager
  }));
};
