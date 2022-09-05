import React from "../_snowpack/pkg/react.js";
import {
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  ValidatedOptions
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useForm} from "../_snowpack/pkg/react-hook-form.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
export const AddMessageBundleModal = ({
  handleModalToggle,
  save
}) => {
  const {t} = useTranslation("realm-settings");
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.small,
    title: t("addMessageBundle"),
    isOpen: true,
    onClose: handleModalToggle,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "add-bundle-confirm-button",
        key: "confirm",
        variant: "primary",
        type: "submit",
        form: "bundle-form"
      }, t("common:create")),
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-cancel",
        "data-testid": "cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: () => {
          handleModalToggle();
        }
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(Form, {
    id: "bundle-form",
    isHorizontal: true,
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:key"),
    name: "key",
    fieldId: "key-id",
    helperTextInvalid: t("common:required"),
    validated: errors.key ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    "data-testid": "key-input",
    ref: register({required: true}),
    autoFocus: true,
    type: "text",
    id: "key-id",
    name: "key",
    validated: errors.key ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:value"),
    name: "add-value",
    fieldId: "value-id",
    helperTextInvalid: t("common:required"),
    validated: errors.value ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    "data-testid": "value-input",
    ref: register({required: true}),
    type: "text",
    id: "value-id",
    name: "value",
    validated: errors.value ? ValidatedOptions.error : ValidatedOptions.default
  }))));
};
