import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, Switch} from "../../_snowpack/pkg/@patternfly/react-core.js";
import environment from "../../environment.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
export const DiscoveryEndpointField = ({
  id,
  fileUpload,
  children
}) => {
  const {t} = useTranslation("identity-providers");
  const {adminClient} = useAdminClient();
  const {
    setValue,
    register,
    setError,
    watch,
    clearErrors,
    formState: {errors}
  } = useFormContext();
  const discoveryUrl = watch("discoveryEndpoint");
  const [discovery, setDiscovery] = useState(true);
  const [discovering, setDiscovering] = useState(false);
  const [discoveryResult, setDiscoveryResult] = useState();
  const setupForm = (result) => {
    Object.keys(result).map((k) => setValue(`config.${k}`, result[k]));
  };
  useEffect(() => {
    if (!discoveryUrl) {
      setDiscovering(false);
      return;
    }
    (async () => {
      clearErrors("discoveryError");
      try {
        const result = await adminClient.identityProviders.importFromUrl({
          providerId: id,
          fromUrl: discoveryUrl
        });
        setupForm(result);
        setDiscoveryResult(result);
      } catch (error) {
        setError("discoveryError", {
          type: "manual",
          message: error.message
        });
      }
      setDiscovering(false);
    })();
  }, [discovering]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(id === "oidc" ? "useDiscoveryEndpoint" : "useEntityDescriptor"),
    fieldId: "kc-discovery-endpoint",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `identity-providers-help:${id === "oidc" ? "useDiscoveryEndpoint" : "useEntityDescriptor"}`,
      fieldLabelId: "identity-providers:discoveryEndpoint"
    })
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "kc-discovery-endpoint-switch",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: discovery,
    onChange: (checked) => {
      clearErrors("discoveryError");
      setDiscovery(checked);
    }
  })), discovery && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(id === "oidc" ? "discoveryEndpoint" : "samlEntityDescriptor"),
    fieldId: "kc-discovery-endpoint",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `identity-providers-help:${id === "oidc" ? "discoveryEndpoint" : "samlEntityDescriptor"}`,
      fieldLabelId: "identity-providers:discoveryEndpoint"
    }),
    validated: errors.discoveryError || errors.discoveryEndpoint ? "error" : !discoveryResult ? "default" : "success",
    helperTextInvalid: errors.discoveryEndpoint ? t("common:required") : t("noValidMetaDataFound", {
      error: errors.discoveryError?.message
    }),
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    name: "discoveryEndpoint",
    "data-testid": "discoveryEndpoint",
    id: "kc-discovery-endpoint",
    placeholder: id === "oidc" ? "https://hostname/auth/realms/master/.well-known/openid-configuration" : "",
    onBlur: () => setDiscovering(true),
    validated: errors.discoveryError || errors.discoveryEndpoint ? "error" : !discoveryResult ? "default" : "success",
    customIconUrl: discovering ? environment.resourceUrl + "/discovery-load-indicator.svg" : "",
    ref: register({required: true})
  })), !discovery && fileUpload, discovery && !errors.discoveryError && children(true), !discovery && children(false));
};
