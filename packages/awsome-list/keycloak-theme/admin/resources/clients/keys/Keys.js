import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import FileSaver from "../../_snowpack/pkg/file-saver.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  PageSection,
  Switch,
  Text,
  TextContent
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {Controller, useFormContext, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {GenerateKeyDialog} from "./GenerateKeyDialog.js";
import {useFetch, useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import useToggle from "../../utils/useToggle.js";
import {ImportKeyDialog} from "./ImportKeyDialog.js";
import {Certificate} from "./Certificate.js";
const attr = "jwt.credential";
export const Keys = ({clientId, save, hasConfigureAccess}) => {
  const {t} = useTranslation("clients");
  const {
    control,
    register,
    getValues,
    formState: {isDirty}
  } = useFormContext();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [keyInfo, setKeyInfo] = useState();
  const [openGenerateKeys, toggleOpenGenerateKeys, setOpenGenerateKeys] = useToggle();
  const [openImportKeys, toggleOpenImportKeys, setOpenImportKeys] = useToggle();
  const useJwksUrl = useWatch({
    control,
    name: "attributes.use.jwks.url",
    defaultValue: "false"
  });
  useFetch(() => adminClient.clients.getKeyInfo({id: clientId, attr}), (info) => setKeyInfo(info), []);
  const generate = async (config) => {
    try {
      const keyStore = await adminClient.clients.generateAndDownloadKey({
        id: clientId,
        attr
      }, config);
      FileSaver.saveAs(new Blob([keyStore], {type: "application/octet-stream"}), `keystore.${config.format == "PKCS12" ? "p12" : "jks"}`);
      addAlert(t("generateSuccess"), AlertVariant.success);
    } catch (error) {
      addError("clients:generateError", error);
    }
  };
  const importKey = async (importFile) => {
    try {
      const formData = new FormData();
      const {file, ...rest} = importFile;
      Object.entries(rest).map((entry) => formData.append(entry[0], entry[1]));
      formData.append("file", file.value);
      await adminClient.clients.uploadCertificate({id: clientId, attr}, formData);
      addAlert(t("importSuccess"), AlertVariant.success);
    } catch (error) {
      addError("clients:importError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "keycloak__form"
  }, openGenerateKeys && /* @__PURE__ */ React.createElement(GenerateKeyDialog, {
    clientId: getValues("clientId"),
    toggleDialog: toggleOpenGenerateKeys,
    save: generate
  }), openImportKeys && /* @__PURE__ */ React.createElement(ImportKeyDialog, {
    toggleDialog: toggleOpenImportKeys,
    save: importKey
  }), /* @__PURE__ */ React.createElement(Card, {
    isFlat: true
  }, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, t("jwksUrlConfig"))), /* @__PURE__ */ React.createElement(CardBody, null, /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, null, t("keysIntro")))), /* @__PURE__ */ React.createElement(CardBody, null, /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-clients",
    fineGrainedAccess: hasConfigureAccess,
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("useJwksUrl"),
    fieldId: "useJwksUrl",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:useJwksUrl",
      fieldLabelId: "clients:useJwksUrl"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.use.jwks.url",
    defaultValue: "false",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      "data-testid": "useJwksUrl",
      id: "useJwksUrl-switch",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange(`${value2}`)
    })
  })), useJwksUrl !== "true" && (keyInfo ? /* @__PURE__ */ React.createElement(Certificate, {
    plain: true,
    keyInfo
  }) : "No client certificate configured"), useJwksUrl === "true" && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("jwksUrl"),
    fieldId: "jwksUrl",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:jwksUrl",
      fieldLabelId: "clients:jwksUrl"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "jwksUrl",
    name: "attributes.jwks.url",
    ref: register
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "saveKeys",
    onClick: save,
    isDisabled: !isDirty
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "generate",
    variant: "secondary",
    onClick: () => setOpenGenerateKeys(true)
  }, t("generateNewKeys")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "import",
    variant: "secondary",
    onClick: () => setOpenImportKeys(true),
    isDisabled: useJwksUrl === "true"
  }, t("import")))))));
};
