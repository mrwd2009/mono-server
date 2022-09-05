import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {MultiLineInput} from "../../components/multi-line-input/MultiLineInput.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {SaveReset} from "../advanced/SaveReset.js";
import environment from "../../environment.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useAccess} from "../../context/access/Access.js";
export const AccessSettings = ({
  client,
  save,
  reset
}) => {
  const {t} = useTranslation("clients");
  const {register, watch} = useFormContext();
  const {realm} = useRealm();
  const {hasAccess} = useAccess();
  const isManager = hasAccess("manage-clients") || client.access?.configure;
  const protocol = watch("protocol");
  const idpInitiatedSsoUrlName = watch("attributes.saml_idp_initiated_sso_url_name");
  return /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    fineGrainedAccess: client.access?.configure,
    role: "manage-clients"
  }, !client.bearerOnly && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("rootUrl"),
    fieldId: "kc-root-url",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:rootUrl",
      fieldLabelId: "clients:rootUrl"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-root-url",
    name: "rootUrl",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("homeURL"),
    fieldId: "kc-home-url",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:homeURL",
      fieldLabelId: "clients:homeURL"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-home-url",
    name: "baseUrl",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("validRedirectUri"),
    fieldId: "kc-redirect",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:validRedirectURIs",
      fieldLabelId: "clients:validRedirectUri"
    })
  }, /* @__PURE__ */ React.createElement(MultiLineInput, {
    name: "redirectUris",
    "aria-label": t("validRedirectUri"),
    addButtonLabel: "clients:addRedirectUri"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("validPostLogoutRedirectUri"),
    fieldId: "kc-postLogoutRedirect",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:validPostLogoutRedirectURIs",
      fieldLabelId: "clients:validPostLogoutRedirectUri"
    })
  }, /* @__PURE__ */ React.createElement(MultiLineInput, {
    name: "attributes.post.logout.redirect.uris",
    "aria-label": t("validPostLogoutRedirectUri"),
    addButtonLabel: "clients:addPostLogoutRedirectUri"
  })), protocol === "saml" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("idpInitiatedSsoUrlName"),
    fieldId: "idpInitiatedSsoUrlName",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:idpInitiatedSsoUrlName",
      fieldLabelId: "clients:idpInitiatedSsoUrlName"
    }),
    helperText: idpInitiatedSsoUrlName !== "" && t("idpInitiatedSsoUrlNameHelp", {
      url: `${environment.authServerUrl}/realms/${realm}/protocol/saml/clients/${idpInitiatedSsoUrlName}`
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "idpInitiatedSsoUrlName",
    name: "attributes.saml_idp_initiated_sso_url_name",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("idpInitiatedSsoRelayState"),
    fieldId: "idpInitiatedSsoRelayState",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:idpInitiatedSsoRelayState",
      fieldLabelId: "clients:idpInitiatedSsoRelayState"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "idpInitiatedSsoRelayState",
    name: "attributes.saml_idp_initiated_sso_relay_state",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("masterSamlProcessingUrl"),
    fieldId: "masterSamlProcessingUrl",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:masterSamlProcessingUrl",
      fieldLabelId: "clients:masterSamlProcessingUrl"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "masterSamlProcessingUrl",
    name: "adminUrl",
    ref: register
  }))), protocol !== "saml" && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("webOrigins"),
    fieldId: "kc-web-origins",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:webOrigins",
      fieldLabelId: "clients:webOrigins"
    })
  }, /* @__PURE__ */ React.createElement(MultiLineInput, {
    name: "webOrigins",
    "aria-label": t("webOrigins"),
    addButtonLabel: "clients:addWebOrigins"
  }))), protocol !== "saml" && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("adminURL"),
    fieldId: "kc-admin-url",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:adminURL",
      fieldLabelId: "clients:adminURL"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-admin-url",
    name: "adminUrl",
    ref: register
  })), client.bearerOnly && /* @__PURE__ */ React.createElement(SaveReset, {
    className: "keycloak__form_actions",
    name: "settings",
    save,
    reset,
    isActive: !isManager
  }));
};
