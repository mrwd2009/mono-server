import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {ActionGroup, Button, FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const FineGrainSamlEndpointConfig = ({
  control: {register},
  save,
  reset
}) => {
  const {t} = useTranslation("clients");
  return /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("assertionConsumerServicePostBindingURL"),
    fieldId: "assertionConsumerServicePostBindingURL",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:assertionConsumerServicePostBindingURL",
      fieldLabelId: "clients:assertionConsumerServicePostBindingURL"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register(),
    type: "text",
    id: "assertionConsumerServicePostBindingURL",
    name: "attributes.saml_assertion_consumer_url_post"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("assertionConsumerServiceRedirectBindingURL"),
    fieldId: "assertionConsumerServiceRedirectBindingURL",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:assertionConsumerServiceRedirectBindingURL",
      fieldLabelId: "clients:assertionConsumerServiceRedirectBindingURL"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register(),
    type: "text",
    id: "assertionConsumerServiceRedirectBindingURL",
    name: "attributes.saml_assertion_consumer_url_redirect"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("logoutServicePostBindingURL"),
    fieldId: "logoutServicePostBindingURL",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:logoutServicePostBindingURL",
      fieldLabelId: "clients:logoutServicePostBindingURL"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register(),
    type: "text",
    id: "logoutServicePostBindingURL",
    name: "attributes.saml_single_logout_service_url_post"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("logoutServiceRedirectBindingURL"),
    fieldId: "logoutServiceRedirectBindingURL",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:logoutServiceRedirectBindingURL",
      fieldLabelId: "clients:logoutServiceRedirectBindingURL"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register(),
    type: "text",
    id: "logoutServiceRedirectBindingURL",
    name: "attributes.saml_single_logout_service_url_redirect"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("logoutServiceArtifactBindingUrl"),
    fieldId: "logoutServiceArtifactBindingUrl",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:logoutServiceArtifactBindingUrl",
      fieldLabelId: "clients:logoutServiceArtifactBindingUrl"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register(),
    type: "text",
    id: "logoutServiceArtifactBindingUrl",
    name: "attributes.saml_single_logout_service_url_redirect"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("artifactBindingUrl"),
    fieldId: "artifactBindingUrl",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:artifactBindingUrl",
      fieldLabelId: "clients:artifactBindingUrl"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register(),
    type: "text",
    id: "artifactBindingUrl",
    name: "attributes.saml_artifact_binding_url"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("artifactResolutionService"),
    fieldId: "artifactResolutionService",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:artifactResolutionService",
      fieldLabelId: "clients:artifactResolutionService"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register(),
    type: "text",
    id: "artifactResolutionService",
    name: "attributes.saml_artifact_resolution_service_url"
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "tertiary",
    onClick: save
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: reset
  }, t("common:revert"))));
};
