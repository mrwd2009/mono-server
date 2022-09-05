import React, {useState} from "../../_snowpack/pkg/react.js";
import {
  FormGroup,
  FileUpload,
  Modal,
  ModalVariant,
  Button
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {CodeEditor} from "../../_snowpack/pkg/@patternfly/react-code-editor.js";
export const FileUploadForm = ({
  id,
  onChange,
  helpText = "common-help:helpFileUpload",
  unWrap = false,
  language,
  extension,
  ...rest
}) => {
  const {t} = useTranslation();
  const defaultUpload = {
    value: "",
    filename: "",
    isLoading: false,
    modal: false
  };
  const [fileUpload, setFileUpload] = useState(defaultUpload);
  const removeDialog = () => setFileUpload({...fileUpload, modal: false});
  const handleChange = (value, filename, event) => {
    if (event.nativeEvent instanceof MouseEvent && !(event.nativeEvent instanceof DragEvent)) {
      setFileUpload({...fileUpload, modal: true});
    } else {
      setFileUpload({
        ...fileUpload,
        value: value.toString(),
        filename
      });
      if (value) {
        onChange(value.toString());
      }
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, fileUpload.modal && /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.small,
    title: t("clearFile"),
    isOpen: true,
    onClose: removeDialog,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        key: "confirm",
        variant: "primary",
        "data-testid": "clear-button",
        onClick: () => {
          setFileUpload(defaultUpload);
          onChange("");
        }
      }, t("clear")),
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "cancel",
        key: "cancel",
        variant: "link",
        onClick: removeDialog
      }, t("cancel"))
    ]
  }, t("clearFileExplain")), unWrap && /* @__PURE__ */ React.createElement(FileUpload, {
    id,
    ...rest,
    type: "text",
    value: fileUpload.value,
    filename: fileUpload.filename,
    onChange: handleChange,
    onReadStarted: () => setFileUpload({...fileUpload, isLoading: true}),
    onReadFinished: () => setFileUpload({...fileUpload, isLoading: false}),
    isLoading: fileUpload.isLoading,
    dropzoneProps: {
      accept: extension
    }
  }), !unWrap && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("resourceFile"),
    fieldId: id,
    helperText: t(helpText)
  }, /* @__PURE__ */ React.createElement(FileUpload, {
    id,
    ...rest,
    type: "text",
    value: fileUpload.value,
    filename: fileUpload.filename,
    onChange: handleChange,
    onReadStarted: () => setFileUpload({...fileUpload, isLoading: true}),
    onReadFinished: () => setFileUpload({...fileUpload, isLoading: false}),
    isLoading: fileUpload.isLoading,
    hideDefaultPreview: true
  }, !rest.hideDefaultPreview && /* @__PURE__ */ React.createElement(CodeEditor, {
    isLineNumbersVisible: true,
    code: fileUpload.value,
    language,
    height: "128px",
    onChange: (value, event) => handleChange(value || "", fileUpload.filename, event),
    isReadOnly: !rest.allowEditingUploadedText
  }))));
};
