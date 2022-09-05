import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Switch,
  Checkbox,
  Grid,
  GridItem,
  InputGroup
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import "./capability-config.css.proxy.js";
export const CapabilityConfig = ({
  unWrap,
  protocol: type
}) => {
  const {t} = useTranslation("clients");
  const {control, watch, setValue} = useFormContext();
  const protocol = type || watch("protocol");
  const clientAuthentication = watch("publicClient");
  const authorization = watch("authorizationServicesEnabled");
  return /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-clients",
    unWrap,
    className: "keycloak__capability-config__form",
    "data-testid": "capability-config-form"
  }, protocol === "openid-connect" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("clientAuthentication"),
    fieldId: "kc-authentication",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:authentication",
      fieldLabelId: "clients:authentication"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "publicClient",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      "data-testid": "authentication",
      id: "kc-authentication-switch",
      name: "publicClient",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: !value,
      onChange: (value2) => {
        onChange(!value2);
        if (!value2) {
          setValue("authorizationServicesEnabled", false);
          setValue("serviceAccountsEnabled", false);
          setValue("attributes.oidc.ciba.grant.enabled", false);
        }
      }
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("clientAuthorization"),
    fieldId: "kc-authorization",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:authorization",
      fieldLabelId: "clients:authorization"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "authorizationServicesEnabled",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      "data-testid": "authorization",
      id: "kc-authorization-switch",
      name: "authorizationServicesEnabled",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value && !clientAuthentication,
      onChange: (value2) => {
        onChange(value2);
        if (value2) {
          setValue("serviceAccountsEnabled", true);
        }
      },
      isDisabled: clientAuthentication
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("authenticationFlow"),
    fieldId: "kc-flow"
  }, /* @__PURE__ */ React.createElement(Grid, {
    id: "authenticationFlowGrid"
  }, /* @__PURE__ */ React.createElement(GridItem, {
    lg: 4,
    sm: 6
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "standardFlowEnabled",
    defaultValue: true,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(Checkbox, {
      "data-testid": "standard",
      label: t("standardFlow"),
      id: "kc-flow-standard",
      name: "standardFlowEnabled",
      isChecked: value.toString() === "true",
      onChange
    }), /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:standardFlow",
      fieldLabelId: "clients:standardFlow"
    }))
  })), /* @__PURE__ */ React.createElement(GridItem, {
    lg: 8,
    sm: 6
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "directAccessGrantsEnabled",
    defaultValue: true,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(Checkbox, {
      "data-testid": "direct",
      label: t("directAccess"),
      id: "kc-flow-direct",
      name: "directAccessGrantsEnabled",
      isChecked: value,
      onChange
    }), /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:directAccess",
      fieldLabelId: "clients:directAccess"
    }))
  })), /* @__PURE__ */ React.createElement(GridItem, {
    lg: 4,
    sm: 6
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "implicitFlowEnabled",
    defaultValue: true,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(Checkbox, {
      "data-testid": "implicit",
      label: t("implicitFlow"),
      id: "kc-flow-implicit",
      name: "implicitFlowEnabled",
      isChecked: value.toString() === "true",
      onChange
    }), /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:implicitFlow",
      fieldLabelId: "clients:implicitFlow"
    }))
  })), /* @__PURE__ */ React.createElement(GridItem, {
    lg: 8,
    sm: 6
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "serviceAccountsEnabled",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(Checkbox, {
      "data-testid": "service-account",
      label: t("serviceAccount"),
      id: "kc-flow-service-account",
      name: "serviceAccountsEnabled",
      isChecked: value.toString() === "true" || clientAuthentication && authorization,
      onChange,
      isDisabled: clientAuthentication && !authorization || !clientAuthentication && authorization
    }), /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:serviceAccount",
      fieldLabelId: "clients:serviceAccount"
    }))
  })), /* @__PURE__ */ React.createElement(GridItem, {
    lg: 8,
    sm: 6
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.oauth2.device.authorization.grant.enabled",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(Checkbox, {
      "data-testid": "oauth-device-authorization-grant",
      label: t("oauthDeviceAuthorizationGrant"),
      id: "kc-oauth-device-authorization-grant",
      name: "oauth2.device.authorization.grant.enabled",
      isChecked: value.toString() === "true",
      onChange
    }), /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:oauthDeviceAuthorizationGrant",
      fieldLabelId: "clients:oauthDeviceAuthorizationGrant"
    }))
  })), /* @__PURE__ */ React.createElement(GridItem, {
    lg: 8,
    sm: 6
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.oidc.ciba.grant.enabled",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(Checkbox, {
      "data-testid": "oidc-ciba-grant",
      label: t("oidcCibaGrant"),
      id: "kc-oidc-ciba-grant",
      name: "oidc.ciba.grant.enabled",
      isChecked: value.toString() === "true",
      onChange,
      isDisabled: clientAuthentication
    }), /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:oidcCibaGrant",
      fieldLabelId: "clients:oidcCibaGrant"
    }))
  }))))), protocol === "saml" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:encryptAssertions",
      fieldLabelId: "clients:encryptAssertions"
    }),
    label: t("encryptAssertions"),
    fieldId: "kc-encrypt",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.saml.encrypt",
    control,
    defaultValue: false,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      "data-testid": "encrypt",
      id: "kc-encrypt",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:clientSignature",
      fieldLabelId: "clients:clientSignature"
    }),
    label: t("clientSignature"),
    fieldId: "kc-client-signature",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.saml.client.signature",
    control,
    defaultValue: false,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      "data-testid": "client-signature",
      id: "kc-client-signature",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  }))));
};
