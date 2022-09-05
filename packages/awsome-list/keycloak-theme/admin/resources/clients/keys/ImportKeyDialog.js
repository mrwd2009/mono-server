import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, FormProvider, useForm, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {
  Button,
  ButtonVariant,
  FileUpload,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Select,
  SelectOption,
  SelectVariant,
  Text,
  TextContent
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {StoreSettings} from "./StoreSettings.js";
const baseFormats = ["JKS", "PKCS12"];
const formats = baseFormats.concat([
  "Certificate PEM",
  "Public Key PEM",
  "JSON Web Key Set"
]);
export const ImportKeyDialog = ({
  save,
  toggleDialog
}) => {
  const {t} = useTranslation("clients");
  const form = useForm();
  const {control, handleSubmit} = form;
  const [openArchiveFormat, setOpenArchiveFormat] = useState(false);
  const format = useWatch({
    control,
    name: "keystoreFormat",
    defaultValue: "JKS"
  });
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.medium,
    title: t("generateKeys"),
    isOpen: true,
    onClose: toggleDialog,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-confirm",
        "data-testid": "confirm",
        key: "confirm",
        onClick: () => {
          handleSubmit((importFile) => {
            save(importFile);
            toggleDialog();
          })();
        }
      }, t("import")),
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-cancel",
        "data-testid": "cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: () => {
          toggleDialog();
        }
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, null, t("clients-help:generateKeysDescription"))), /* @__PURE__ */ React.createElement(Form, {
    className: "pf-u-pt-lg"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("archiveFormat"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:archiveFormat",
      fieldLabelId: "clients:archiveFormat"
    }),
    fieldId: "archiveFormat"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "keystoreFormat",
    control,
    defaultValue: "JKS",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "archiveFormat",
      onToggle: setOpenArchiveFormat,
      onSelect: (_, value2) => {
        onChange(value2);
        setOpenArchiveFormat(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("archiveFormat"),
      isOpen: openArchiveFormat
    }, formats.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option === value,
      key: option,
      value: option
    })))
  })), baseFormats.includes(format) && /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(StoreSettings, {
    hidePassword: true
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("importFile"),
    fieldId: "importFile"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "file",
    control,
    defaultValue: "",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(FileUpload, {
      id: "importFile",
      value: value.value,
      filename: value.filename,
      onChange: (value2, filename) => onChange({value: value2, filename})
    })
  }))));
};
