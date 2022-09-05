import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormGroup, GenerateId} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {KeycloakTextArea} from "../../components/keycloak-text-area/KeycloakTextArea.js";
const CertificateDisplay = ({id, keyInfo}) => /* @__PURE__ */ React.createElement(KeycloakTextArea, {
  readOnly: true,
  rows: 5,
  id,
  "data-testid": "certificate",
  value: keyInfo?.certificate
});
export const Certificate = ({keyInfo, plain = false}) => {
  const {t} = useTranslation("clients");
  return /* @__PURE__ */ React.createElement(GenerateId, {
    prefix: "certificate"
  }, (id) => plain ? /* @__PURE__ */ React.createElement(CertificateDisplay, {
    id,
    keyInfo
  }) : /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("certificate"),
    fieldId: id,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:certificate",
      fieldLabelId: `clients:${id}`
    })
  }, /* @__PURE__ */ React.createElement(CertificateDisplay, {
    id,
    keyInfo
  })));
};
