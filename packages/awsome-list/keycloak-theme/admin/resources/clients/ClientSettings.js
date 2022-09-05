import React from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useFormContext} from "../_snowpack/pkg/react-hook-form.js";
import {Form} from "../_snowpack/pkg/@patternfly/react-core.js";
import {ScrollForm} from "../components/scroll-form/ScrollForm.js";
import {ClientDescription} from "./ClientDescription.js";
import {CapabilityConfig} from "./add/CapabilityConfig.js";
import {SamlConfig} from "./add/SamlConfig.js";
import {SamlSignature} from "./add/SamlSignature.js";
import {AccessSettings} from "./add/AccessSettings.js";
import {LoginSettingsPanel} from "./add/LoginSettingsPanel.js";
import {LogoutPanel} from "./add/LogoutPanel.js";
export const ClientSettings = (props) => {
  const {t} = useTranslation("clients");
  const {watch} = useFormContext();
  const protocol = watch("protocol");
  const {client} = props;
  return /* @__PURE__ */ React.createElement(ScrollForm, {
    className: "pf-u-px-lg",
    sections: [
      {
        title: t("generalSettings"),
        panel: /* @__PURE__ */ React.createElement(Form, {
          isHorizontal: true
        }, /* @__PURE__ */ React.createElement(ClientDescription, {
          protocol: client.protocol,
          hasConfigureAccess: client.access?.configure
        }))
      },
      {
        title: t("accessSettings"),
        panel: /* @__PURE__ */ React.createElement(AccessSettings, {
          ...props
        })
      },
      {
        title: t("samlCapabilityConfig"),
        isHidden: protocol !== "saml" || client.bearerOnly,
        panel: /* @__PURE__ */ React.createElement(SamlConfig, null)
      },
      {
        title: t("signatureAndEncryption"),
        isHidden: protocol !== "saml" || client.bearerOnly,
        panel: /* @__PURE__ */ React.createElement(SamlSignature, null)
      },
      {
        title: t("capabilityConfig"),
        isHidden: protocol !== "openid-connect" || client.bearerOnly,
        panel: /* @__PURE__ */ React.createElement(CapabilityConfig, null)
      },
      {
        title: t("loginSettings"),
        isHidden: client.bearerOnly,
        panel: /* @__PURE__ */ React.createElement(LoginSettingsPanel, {
          access: client.access?.configure
        })
      },
      {
        title: t("logoutSettings"),
        isHidden: client.bearerOnly,
        panel: /* @__PURE__ */ React.createElement(LogoutPanel, {
          ...props
        })
      }
    ]
  });
};
