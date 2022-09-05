import React, {useState} from "../../_snowpack/pkg/react.js";
import FileSaver from "../../_snowpack/pkg/file-saver.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Radio,
  Split,
  SplitItem,
  Text,
  TextContent,
  Title
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {KeyForm} from "./GenerateKeyDialog.js";
import {Certificate} from "./Certificate.js";
export const submitForm = async (form, id, attr, adminClient, callback) => {
  try {
    const formData = new FormData();
    const {file, ...rest} = form;
    Object.entries(rest).map(([key, value]) => formData.append(key === "format" ? "keystoreFormat" : key, value.toString()));
    formData.append("file", file);
    await adminClient.clients.uploadKey({id, attr}, formData);
    callback();
  } catch (error) {
    callback(error);
  }
};
export const SamlKeysDialog = ({
  id,
  attr,
  onClose,
  onCancel
}) => {
  const {t} = useTranslation("clients");
  const [type, setType] = useState(false);
  const [keys, setKeys] = useState();
  const form = useForm();
  const {
    handleSubmit,
    formState: {isDirty}
  } = form;
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const submit = (form2) => {
    submitForm(form2, id, attr, adminClient, (error) => {
      if (error) {
        addError("clients:importError", error);
      } else {
        addAlert(t("importSuccess"), AlertVariant.success);
      }
    });
  };
  const generate = async () => {
    try {
      const key = await adminClient.clients.generateKey({
        id,
        attr
      });
      setKeys(key);
      FileSaver.saveAs(new Blob([key.privateKey], {
        type: "application/octet-stream"
      }), "private.key");
      addAlert(t("generateSuccess"), AlertVariant.success);
    } catch (error) {
      addError("clients:generateError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.medium,
    "aria-labelledby": t("enableClientSignatureRequired"),
    header: /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Title, {
      headingLevel: "h1"
    }, t("enableClientSignatureRequired")), /* @__PURE__ */ React.createElement(Text, null, t("enableClientSignatureRequiredExplain"))),
    isOpen: true,
    onClose,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-confirm",
        key: "confirm",
        "data-testid": "confirm",
        variant: "primary",
        isDisabled: !isDirty && !keys,
        onClick: () => {
          if (type) {
            handleSubmit(submit)();
          }
          onClose();
        }
      }, t("confirm")),
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-cancel",
        key: "cancel",
        "data-testid": "cancel",
        variant: ButtonVariant.link,
        onClick: onCancel
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("selectMethod"),
    fieldId: "selectMethod",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Radio, {
    isChecked: !type,
    name: "selectMethodType",
    onChange: () => setType(false),
    label: t("selectMethodType.generate"),
    id: "selectMethodType-generate"
  })), /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Radio, {
    isChecked: type,
    name: "selectMethodType",
    onChange: () => setType(true),
    label: t("selectMethodType.import"),
    id: "selectMethodType-import"
  }))))), !type && /* @__PURE__ */ React.createElement(Form, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("certificate"),
    fieldId: "certificate",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:certificate",
      fieldLabelId: "clients:certificate"
    })
  }, /* @__PURE__ */ React.createElement(Split, {
    hasGutter: true
  }, /* @__PURE__ */ React.createElement(SplitItem, {
    isFilled: true
  }, /* @__PURE__ */ React.createElement(Certificate, {
    plain: true,
    keyInfo: keys
  })), /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    "data-testid": "generate",
    onClick: generate
  }, t("generate")))))), type && /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(KeyForm, {
    useFile: true
  })));
};
