import React from "../../_snowpack/pkg/react.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, Title} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {JsonFileUpload} from "../../components/json-file-upload/JsonFileUpload.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {DiscoverySettings} from "./DiscoverySettings.js";
import {DiscoveryEndpointField} from "../component/DiscoveryEndpointField.js";
import {addTrailingSlash} from "../../util.js";
export const OpenIdConnectSettings = () => {
  const {t} = useTranslation("identity-providers");
  const id = "oidc";
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {
    setValue,
    setError,
    clearErrors,
    formState: {errors}
  } = useFormContext();
  const setupForm = (result) => {
    Object.keys(result).map((k) => setValue(`config.${k}`, result[k]));
  };
  const fileUpload = async (obj) => {
    clearErrors("discoveryError");
    if (!obj) {
      return;
    }
    const formData = new FormData();
    formData.append("providerId", id);
    formData.append("file", new Blob([JSON.stringify(obj)]));
    try {
      const response = await fetch(`${addTrailingSlash(adminClient.baseUrl)}admin/realms/${realm}/identity-provider/import-config`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${await adminClient.getAccessToken()}`
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
  }, t("oidcSettings")), /* @__PURE__ */ React.createElement(DiscoveryEndpointField, {
    id: "oidc",
    fileUpload: /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("importConfig"),
      fieldId: "kc-import-config",
      labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
        helpText: "identity-providers-help:importConfig",
        fieldLabelId: "identity-providers:importConfig"
      }),
      validated: errors.discoveryError ? "error" : "default",
      helperTextInvalid: errors.discoveryError?.message
    }, /* @__PURE__ */ React.createElement(JsonFileUpload, {
      id: "kc-import-config",
      helpText: "identity=providers-help:jsonFileUpload",
      hideDefaultPreview: true,
      unWrap: true,
      validated: errors.discoveryError ? "error" : "default",
      onChange: (value) => fileUpload(value)
    }))
  }, (readonly) => /* @__PURE__ */ React.createElement(DiscoverySettings, {
    readOnly: readonly
  })));
};
