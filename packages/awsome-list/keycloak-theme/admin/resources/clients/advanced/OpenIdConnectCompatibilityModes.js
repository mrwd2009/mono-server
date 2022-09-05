import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {ActionGroup, Button, FormGroup, Switch} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
export const OpenIdConnectCompatibilityModes = ({
  control,
  save,
  reset,
  hasConfigureAccess
}) => {
  const {t} = useTranslation("clients");
  return /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    fineGrainedAccess: hasConfigureAccess,
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("excludeSessionStateFromAuthenticationResponse"),
    fieldId: "excludeSessionStateFromAuthenticationResponse",
    hasNoPaddingTop: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:excludeSessionStateFromAuthenticationResponse",
      fieldLabelId: "clients:excludeSessionStateFromAuthenticationResponse"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.exclude.session.state.from.auth.response",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "excludeSessionStateFromAuthenticationResponse-switch",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange(value2.toString())
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("useRefreshTokens"),
    fieldId: "useRefreshTokens",
    hasNoPaddingTop: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:useRefreshTokens",
      fieldLabelId: "clients:useRefreshTokens"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.use.refresh.tokens",
    defaultValue: "true",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "useRefreshTokens",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange(value2.toString())
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("useRefreshTokenForClientCredentialsGrant"),
    fieldId: "useRefreshTokenForClientCredentialsGrant",
    hasNoPaddingTop: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:useRefreshTokenForClientCredentialsGrant",
      fieldLabelId: "clients:useRefreshTokenForClientCredentialsGrant"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.client_credentials.use_refresh_token",
    defaultValue: "false",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "useRefreshTokenForClientCredentialsGrant",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange(value2.toString())
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("useLowerCaseBearerType"),
    fieldId: "useLowerCaseBearerType",
    hasNoPaddingTop: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:useLowerCaseBearerType",
      fieldLabelId: "clients:useLowerCaseBearerType"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.token.response.type.bearer.lower-case",
    defaultValue: "false",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "useLowerCaseBearerType",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange(value2.toString())
    })
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    onClick: save
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: reset
  }, t("common:revert"))));
};
