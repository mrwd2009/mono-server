import React, {useState} from "../../_snowpack/pkg/react.js";
import {
  Button,
  ButtonVariant,
  Modal,
  ModalVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
export const useConfirmDialog = (props) => {
  const [show, setShow] = useState(false);
  function toggleDialog() {
    setShow((show2) => !show2);
  }
  const Dialog = () => /* @__PURE__ */ React.createElement(ConfirmDialogModal, {
    key: "confirmDialog",
    ...props,
    open: show,
    toggleDialog
  });
  return [toggleDialog, Dialog];
};
export const ConfirmDialogModal = ({
  titleKey,
  messageKey,
  noCancelButton,
  cancelButtonLabel,
  continueButtonLabel,
  continueButtonVariant,
  onConfirm,
  onCancel,
  children,
  open = true,
  variant = ModalVariant.small,
  toggleDialog,
  confirmButtonDisabled
}) => {
  const {t} = useTranslation();
  return /* @__PURE__ */ React.createElement(Modal, {
    title: t(titleKey),
    isOpen: open,
    onClose: toggleDialog,
    variant,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-confirm",
        "data-testid": "confirm",
        key: "confirm",
        isDisabled: confirmButtonDisabled,
        variant: continueButtonVariant || ButtonVariant.primary,
        onClick: () => {
          onConfirm();
          toggleDialog();
        }
      }, t(continueButtonLabel || "common:continue")),
      !noCancelButton && /* @__PURE__ */ React.createElement(Button, {
        id: "modal-cancel",
        "data-testid": "cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: () => {
          if (onCancel)
            onCancel();
          toggleDialog();
        }
      }, t(cancelButtonLabel || "common:cancel"))
    ]
  }, !messageKey && children, messageKey && t(messageKey));
};
