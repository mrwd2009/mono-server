import React from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useFormContext} from "../_snowpack/pkg/react-hook-form.js";
import {AlertVariant, PageSection, Text} from "../_snowpack/pkg/@patternfly/react-core.js";
import {ScrollForm} from "../components/scroll-form/ScrollForm.js";
import {convertToFormValues, toUpperCase} from "../util.js";
import {AdvancedSettings} from "./advanced/AdvancedSettings.js";
import {AuthenticationOverrides} from "./advanced/AuthenticationOverrides.js";
import {FineGrainOpenIdConnect} from "./advanced/FineGrainOpenIdConnect.js";
import {FineGrainSamlEndpointConfig} from "./advanced/FineGrainSamlEndpointConfig.js";
import {OpenIdConnectCompatibilityModes} from "./advanced/OpenIdConnectCompatibilityModes.js";
import {RevocationPanel} from "./advanced/RevocationPanel.js";
import {ClusteringPanel} from "./advanced/ClusteringPanel.js";
export const parseResult = (result, prefixKey, addAlert, t) => {
  const successCount = result.successRequests?.length || 0;
  const failedCount = result.failedRequests?.length || 0;
  if (successCount === 0 && failedCount === 0) {
    addAlert(t("noAdminUrlSet"), AlertVariant.warning);
  } else if (failedCount > 0) {
    addAlert(t(prefixKey + "Success", {successNodes: result.successRequests}), AlertVariant.success);
    addAlert(t(prefixKey + "Fail", {failedNodes: result.failedRequests}), AlertVariant.danger);
  } else {
    addAlert(t(prefixKey + "Success", {successNodes: result.successRequests}), AlertVariant.success);
  }
};
export const AdvancedTab = ({save, client}) => {
  const {t} = useTranslation("clients");
  const openIdConnect = "openid-connect";
  const {setValue, control, reset} = useFormContext();
  const {
    publicClient,
    attributes,
    protocol,
    authenticationFlowBindingOverrides
  } = client;
  const resetFields = (names) => {
    const values = {};
    for (const name of names) {
      values[`attributes.${name}`] = attributes?.[name];
    }
    reset(values);
  };
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-py-0"
  }, /* @__PURE__ */ React.createElement(ScrollForm, {
    sections: [
      {
        title: t("revocation"),
        isHidden: protocol !== openIdConnect,
        panel: /* @__PURE__ */ React.createElement(RevocationPanel, {
          client,
          save
        })
      },
      {
        title: t("clustering"),
        isHidden: !publicClient,
        panel: /* @__PURE__ */ React.createElement(ClusteringPanel, {
          client,
          save
        })
      },
      {
        title: t("fineGrainOpenIdConnectConfiguration"),
        isHidden: protocol !== openIdConnect,
        panel: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Text, {
          className: "pf-u-pb-lg"
        }, t("clients-help:fineGrainOpenIdConnectConfiguration")), /* @__PURE__ */ React.createElement(FineGrainOpenIdConnect, {
          save,
          reset: () => convertToFormValues(attributes, (key, value) => setValue(`attributes.${key}`, value))
        }))
      },
      {
        title: t("openIdConnectCompatibilityModes"),
        isHidden: protocol !== openIdConnect,
        panel: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Text, {
          className: "pf-u-pb-lg"
        }, t("clients-help:openIdConnectCompatibilityModes")), /* @__PURE__ */ React.createElement(OpenIdConnectCompatibilityModes, {
          control,
          save: () => save(),
          reset: () => resetFields(["exclude.session.state.from.auth.response"])
        }))
      },
      {
        title: t("fineGrainSamlEndpointConfig"),
        isHidden: protocol === openIdConnect,
        panel: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Text, {
          className: "pf-u-pb-lg"
        }, t("clients-help:fineGrainSamlEndpointConfig")), /* @__PURE__ */ React.createElement(FineGrainSamlEndpointConfig, {
          control,
          save: () => save(),
          reset: () => convertToFormValues(attributes, (key, value) => setValue(`attributes.${key}`, value))
        }))
      },
      {
        title: t("advancedSettings"),
        panel: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Text, {
          className: "pf-u-pb-lg"
        }, t("clients-help:advancedSettings" + toUpperCase(protocol || ""))), /* @__PURE__ */ React.createElement(AdvancedSettings, {
          protocol,
          control,
          save: () => save(),
          reset: () => {
            resetFields([
              "saml.assertion.lifespan",
              "access.token.lifespan",
              "tls.client.certificate.bound.access.tokens",
              "pkce.code.challenge.method"
            ]);
          }
        }))
      },
      {
        title: t("authenticationOverrides"),
        panel: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Text, {
          className: "pf-u-pb-lg"
        }, t("clients-help:authenticationOverrides")), /* @__PURE__ */ React.createElement(AuthenticationOverrides, {
          protocol,
          control,
          save: () => save(),
          reset: () => {
            setValue("authenticationFlowBindingOverrides.browser", authenticationFlowBindingOverrides?.browser);
            setValue("authenticationFlowBindingOverrides.direct_grant", authenticationFlowBindingOverrides?.direct_grant);
          }
        }))
      }
    ],
    borders: true
  }));
};
