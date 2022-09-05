import React, {Fragment, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Alert,
  Button,
  ButtonVariant,
  Divider,
  Form,
  FormGroup,
  Modal,
  Radio,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {JsonFileUpload} from "../../components/json-file-upload/JsonFileUpload.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
export const ImportDialog = ({onConfirm, closeDialog}) => {
  const {t} = useTranslation("clients");
  const [imported, setImported] = useState({});
  return /* @__PURE__ */ React.createElement(Modal, {
    title: t("import"),
    isOpen: true,
    variant: "small",
    onClose: closeDialog,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-confirm",
        key: "confirm",
        onClick: () => {
          onConfirm(imported);
          closeDialog();
        },
        "data-testid": "confirm"
      }, t("confirm")),
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "cancel",
        id: "modal-cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: () => {
          closeDialog();
        }
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(Form, null, /* @__PURE__ */ React.createElement(JsonFileUpload, {
    id: "import-resource",
    onChange: setImported
  })), Object.keys(imported).length !== 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement("p", {
    className: "pf-u-my-lg"
  }, t("importResources")), /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("policyEnforcementMode"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:policyEnforcementMode",
      fieldLabelId: "clients:policyEnforcementMode"
    }),
    fieldId: "policyEnforcementMode",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Radio, {
    id: "policyEnforcementMode",
    name: "policyEnforcementMode",
    label: t(`policyEnforcementModes.${imported.policyEnforcementMode}`),
    isChecked: true,
    isDisabled: true,
    className: "pf-u-mb-md"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("decisionStrategy"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:decisionStrategy",
      fieldLabelId: "clients:decisionStrategy"
    }),
    fieldId: "decisionStrategy",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Radio, {
    id: "decisionStrategy",
    name: "decisionStrategy",
    isChecked: true,
    isDisabled: true,
    label: t(`decisionStrategies.${imported.decisionStrategy}`),
    className: "pf-u-mb-md"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("allowRemoteResourceManagement"),
    fieldId: "allowRemoteResourceManagement",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t("allowRemoteResourceManagement"),
      fieldLabelId: "clients:allowRemoteResourceManagement"
    })
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "allowRemoteResourceManagement",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: imported.allowRemoteResourceManagement,
    isDisabled: true
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "pf-u-mt-md"
  }, Object.entries(imported).filter(([, value]) => Array.isArray(value)).map(([key, value]) => /* @__PURE__ */ React.createElement(Fragment, {
    key
  }, /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement("p", {
    className: "pf-u-my-sm"
  }, /* @__PURE__ */ React.createElement("strong", null, value.length, " ", t(key)))))), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Alert, {
    variant: "warning",
    className: "pf-u-mt-lg",
    isInline: true,
    title: t("importWarning")
  })));
};
