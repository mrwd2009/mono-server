import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext
} from "../../_snowpack/pkg/react-hook-form.js";
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
export const KeyForm = ({useFile = false}) => {
  const {t} = useTranslation("clients");
  const [filename, setFilename] = useState();
  const [openArchiveFormat, setOpenArchiveFormat] = useState(false);
  const {control} = useFormContext();
  return /* @__PURE__ */ React.createElement(Form, {
    className: "pf-u-pt-lg"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("archiveFormat"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:archiveFormat",
      fieldLabelId: "clients:archiveFormat"
    }),
    fieldId: "archiveFormat"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "format",
    defaultValue: "JKS",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "archiveFormat",
      onToggle: setOpenArchiveFormat,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setOpenArchiveFormat(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("archiveFormat"),
      isOpen: openArchiveFormat
    }, ["JKS", "PKCS12"].map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option === value,
      key: option,
      value: option
    })))
  })), useFile && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("importFile"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:importFile",
      fieldLabelId: "clients:importFile"
    }),
    fieldId: "importFile"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "file",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(FileUpload, {
      id: "importFile",
      value,
      filename,
      browseButtonText: t("browse"),
      onChange: (value2, filename2) => {
        setFilename(filename2);
        onChange(value2);
      }
    })
  })), /* @__PURE__ */ React.createElement(StoreSettings, {
    hidePassword: useFile
  }));
};
export const GenerateKeyDialog = ({
  clientId,
  save,
  toggleDialog
}) => {
  const {t} = useTranslation("clients");
  const form = useForm({
    defaultValues: {keyAlias: clientId},
    mode: "onChange"
  });
  const {
    handleSubmit,
    formState: {isValid}
  } = form;
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.medium,
    title: t("generateKeys"),
    isOpen: true,
    onClose: toggleDialog,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-confirm",
        key: "confirm",
        "data-testid": "confirm",
        isDisabled: !isValid,
        onClick: () => {
          handleSubmit((config) => {
            save(config);
            toggleDialog();
          })();
        }
      }, t("generate")),
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-cancel",
        key: "cancel",
        "data-testid": "cancel",
        variant: ButtonVariant.link,
        onClick: () => {
          toggleDialog();
        }
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, null, t("clients-help:generateKeysDescription"))), /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(KeyForm, null)));
};
