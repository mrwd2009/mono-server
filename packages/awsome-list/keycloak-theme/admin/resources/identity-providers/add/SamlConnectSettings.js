import React from "../../_snowpack/pkg/react.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, Title} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {FileUploadForm} from "../../components/json-file-upload/FileUploadForm.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {DescriptorSettings} from "./DescriptorSettings.js";
import {DiscoveryEndpointField} from "../component/DiscoveryEndpointField.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import environment from "../../environment.js";
import {addTrailingSlash} from "../../util.js";
export const SamlConnectSettings = () => {
  const {t} = useTranslation("identity-providers");
  const id = "saml";
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {
    setValue,
    register,
    setError,
    clearErrors,
    formState: {errors}
  } = useFormContext();
  const setupForm = (result) => {
    Object.entries(result).map(([key, value]) => setValue(`config.${key}`, value));
  };
  const fileUpload = async (xml) => {
    clearErrors("discoveryError");
    if (!xml) {
      return;
    }
    const formData = new FormData();
    formData.append("providerId", id);
    formData.append("file", new Blob([xml]));
    try {
      const response = await fetch(`${addTrailingSlash(adminClient.baseUrl)}admin/realms/${realm}/identity-provider/import-config`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `bearer ${await adminClient.getAccessToken()}`
        }
      });
      if (response.ok) {
        const result = await response.json();
        setupForm(result);
      } else {
        setError("discoveryError", {
          type: "manual",
          message: response.statusText
        });
      }
    } catch (error) {
      setError("discoveryError", {
        type: "manual",
        message: error.message
      });
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h4",
    size: "xl",
    className: "kc-form-panel__title"
  }, t("samlSettings")), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("serviceProviderEntityId"),
    fieldId: "kc-service-provider-entity-id",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:serviceProviderEntityId",
      fieldLabelId: "identity-providers:serviceProviderEntityId"
    }),
    isRequired: true,
    helperTextInvalid: t("common:required"),
    validated: errors.config?.entityId ? "error" : "default"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    name: "config.entityId",
    "data-testid": "serviceProviderEntityId",
    id: "kc-service-provider-entity-id",
    ref: register({required: true}),
    validated: errors.config?.entityId ? "error" : "default",
    defaultValue: `${environment.authServerUrl}/realms/${realm}`
  })), /* @__PURE__ */ React.createElement(DiscoveryEndpointField, {
    id: "saml",
    fileUpload: /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("importConfig"),
      fieldId: "kc-import-config",
      labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
        helpText: "identity-providers-help:importConfig",
        fieldLabelId: "identity-providers:importConfig"
      }),
      validated: errors.discoveryError ? "error" : "default",
      helperTextInvalid: errors.discoveryError?.message
    }, /* @__PURE__ */ React.createElement(FileUploadForm, {
      id: "kc-import-config",
      extension: ".xml",
      hideDefaultPreview: true,
      unWrap: true,
      validated: errors.discoveryError ? "error" : "default",
      onChange: (value) => fileUpload(value)
    }))
  }, (readonly) => /* @__PURE__ */ React.createElement(DescriptorSettings, {
    readOnly: readonly
  })));
};
