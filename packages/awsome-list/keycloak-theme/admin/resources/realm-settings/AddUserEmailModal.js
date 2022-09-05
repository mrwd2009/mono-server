import React from "../_snowpack/pkg/react.js";
import {
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  TextContent,
  ValidatedOptions
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useForm} from "../_snowpack/pkg/react-hook-form.js";
import {emailRegexPattern} from "../util.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useWhoAmI} from "../context/whoami/WhoAmI.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
export const AddUserEmailModal = ({callback}) => {
  const {t} = useTranslation("groups");
  const {adminClient} = useAdminClient();
  const {whoAmI} = useWhoAmI();
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm({
    defaultValues: {email: ""}
  });
  const watchEmailInput = watch("email", "");
  const cancel = () => callback(false);
  const proceed = () => callback(true);
  const save = async (formData) => {
    await adminClient.users.update({id: whoAmI.getUserId()}, formData);
    proceed();
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.small,
    title: t("realm-settings:provideEmailTitle"),
    isOpen: true,
    onClose: cancel,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "modal-test-connection-button",
        key: "confirm",
        variant: "primary",
        type: "submit",
        form: "email-form",
        isDisabled: !watchEmailInput
      }, t("common:testConnection")),
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-cancel",
        "data-testid": "cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: cancel
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(TextContent, {
    className: "kc-provide-email-text"
  }, t("realm-settings:provideEmail")), /* @__PURE__ */ React.createElement(Form, {
    id: "email-form",
    isHorizontal: true,
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    className: "kc-email-form-group",
    name: "add-email-address",
    fieldId: "email-id",
    helperTextInvalid: t("users:emailInvalid"),
    validated: errors.email ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    "data-testid": "email-address-input",
    ref: register({required: true, pattern: emailRegexPattern}),
    autoFocus: true,
    type: "text",
    id: "add-email",
    name: "email",
    validated: errors.email ? ValidatedOptions.error : ValidatedOptions.default
  }))));
};
