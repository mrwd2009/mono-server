import React, {Fragment, useState} from "../../_snowpack/pkg/react.js";
import FileSaver from "../../_snowpack/pkg/file-saver.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  CardBody,
  PageSection,
  TextContent,
  Text,
  FormGroup,
  Switch,
  Card,
  Form,
  ActionGroup,
  Button,
  AlertVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {SamlKeysDialog} from "./SamlKeysDialog.js";
import {FormPanel} from "../../components/scroll-form/FormPanel.js";
import {Certificate} from "./Certificate.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {SamlImportKeyDialog} from "./SamlImportKeyDialog.js";
const KEYS = ["saml.signing", "saml.encryption"];
const KEYS_MAPPING = {
  "saml.signing": {
    name: "attributes.saml.client.signature",
    title: "signingKeysConfig",
    key: "clientSignature"
  },
  "saml.encryption": {
    name: "attributes.saml.encrypt",
    title: "encryptionKeysConfig",
    key: "encryptAssertions"
  }
};
const KeySection = ({
  keyInfo,
  attr,
  onChanged,
  onGenerate,
  onImport
}) => {
  const {t} = useTranslation("clients");
  const {control, watch} = useFormContext();
  const title = KEYS_MAPPING[attr].title;
  const key = KEYS_MAPPING[attr].key;
  const name = KEYS_MAPPING[attr].name;
  const section = watch(name);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormPanel, {
    title: t(title),
    className: "kc-form-panel__panel"
  }, /* @__PURE__ */ React.createElement(TextContent, {
    className: "pf-u-pb-lg"
  }, /* @__PURE__ */ React.createElement(Text, null, t(`${title}Explain`))), /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-clients",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `clients-help:${key}`,
      fieldLabelId: `clients:${key}`
    }),
    label: t(key),
    fieldId: key,
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name,
    control,
    defaultValue: "false",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      "data-testid": key,
      id: key,
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => {
        const v = value2.toString();
        if (v === "true") {
          onChanged(attr);
          onChange(v);
        } else {
          onGenerate(attr, false);
        }
      }
    })
  })))), keyInfo?.certificate && section === "true" && /* @__PURE__ */ React.createElement(Card, {
    isFlat: true
  }, /* @__PURE__ */ React.createElement(CardBody, {
    className: "kc-form-panel__body"
  }, /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(Certificate, {
    keyInfo
  }), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    onClick: () => onGenerate(attr, true)
  }, t("regenerate")), /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    onClick: () => onImport(attr)
  }, t("importKey")), /* @__PURE__ */ React.createElement(Button, {
    variant: "tertiary"
  }, t("common:export")))))));
};
export const SamlKeys = ({clientId, save}) => {
  const {t} = useTranslation("clients");
  const [isChanged, setIsChanged] = useState();
  const [keyInfo, setKeyInfo] = useState();
  const [selectedType, setSelectedType] = useState();
  const [openImport, setImportOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const {setValue} = useFormContext();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  useFetch(() => Promise.all(KEYS.map((attr) => adminClient.clients.getKeyInfo({id: clientId, attr}))), (info) => setKeyInfo(info), [refresh]);
  const generate = async (attr) => {
    const index = KEYS.indexOf(attr);
    try {
      const info = [...keyInfo || []];
      info[index] = await adminClient.clients.generateKey({
        id: clientId,
        attr
      });
      setKeyInfo(info);
      FileSaver.saveAs(new Blob([info[index].privateKey], {
        type: "application/octet-stream"
      }), "private.key");
      addAlert(t("generateSuccess"), AlertVariant.success);
    } catch (error) {
      addError("clients:generateError", error);
    }
  };
  const key = selectedType ? KEYS_MAPPING[selectedType].key : "";
  const [toggleDisableDialog, DisableConfirm] = useConfirmDialog({
    titleKey: t("disableSigning", {
      key: t(key)
    }),
    messageKey: t("disableSigningExplain", {
      key: t(key)
    }),
    continueButtonLabel: "common:yes",
    cancelButtonLabel: "common:no",
    onConfirm: () => {
      setValue(KEYS_MAPPING[selectedType].name, "false");
      save();
    }
  });
  const [toggleReGenerateDialog, ReGenerateConfirm] = useConfirmDialog({
    titleKey: "clients:reGenerateSigning",
    messageKey: "clients:reGenerateSigningExplain",
    continueButtonLabel: "common:yes",
    cancelButtonLabel: "common:no",
    onConfirm: () => {
      generate(selectedType);
    }
  });
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "keycloak__form"
  }, isChanged && /* @__PURE__ */ React.createElement(SamlKeysDialog, {
    id: clientId,
    attr: isChanged,
    onClose: () => {
      setIsChanged(void 0);
      save();
      setRefresh(refresh + 1);
    },
    onCancel: () => {
      setValue(KEYS_MAPPING[selectedType].name, "false");
      setIsChanged(void 0);
    }
  }), /* @__PURE__ */ React.createElement(DisableConfirm, null), /* @__PURE__ */ React.createElement(ReGenerateConfirm, null), KEYS.map((attr, index) => /* @__PURE__ */ React.createElement(Fragment, {
    key: attr
  }, openImport && /* @__PURE__ */ React.createElement(SamlImportKeyDialog, {
    id: clientId,
    attr,
    onClose: () => setImportOpen(false)
  }), /* @__PURE__ */ React.createElement(KeySection, {
    keyInfo: keyInfo?.[index],
    attr,
    onChanged: setIsChanged,
    onGenerate: (type, isNew) => {
      setSelectedType(type);
      if (!isNew) {
        toggleDisableDialog();
      } else {
        toggleReGenerateDialog();
      }
    },
    onImport: () => setImportOpen(true)
  }))));
};
