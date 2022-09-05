import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  AlertVariant,
  ButtonVariant,
  Form,
  FormGroup,
  Switch,
  ValidatedOptions
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {PasswordInput} from "../../components/password-input/PasswordInput.js";
import {
  ConfirmDialogModal,
  useConfirmDialog
} from "../../components/confirm-dialog/ConfirmDialog.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import useToggle from "../../utils/useToggle.js";
const credFormDefaultValues = {
  password: "",
  passwordConfirmation: "",
  temporaryPassword: true
};
export const ResetPasswordDialog = ({
  user,
  isResetPassword,
  refresh,
  onClose
}) => {
  const {t} = useTranslation("users");
  const {
    register,
    control,
    formState: {isValid, errors},
    watch,
    handleSubmit
  } = useForm({
    defaultValues: credFormDefaultValues,
    mode: "onChange",
    shouldUnregister: false
  });
  const [confirm, toggle] = useToggle(true);
  const password = watch("password", "");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [toggleConfirmSaveModal, ConfirmSaveModal] = useConfirmDialog({
    titleKey: isResetPassword ? "users:resetPasswordConfirm" : "users:setPasswordConfirm",
    messageKey: isResetPassword ? t("resetPasswordConfirmText", {username: user.username}) : t("setPasswordConfirmText", {username: user.username}),
    continueButtonLabel: isResetPassword ? "users:resetPassword" : "users:savePassword",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: () => handleSubmit(saveUserPassword)()
  });
  const saveUserPassword = async ({
    password: password2,
    temporaryPassword
  }) => {
    try {
      await adminClient.users.resetPassword({
        id: user.id,
        credential: {
          temporary: temporaryPassword,
          type: "password",
          value: password2
        }
      });
      const {id} = (await adminClient.users.getCredentials({id: user.id})).find((c) => c.type === "password");
      await adminClient.users.updateCredentialLabel({
        id: user.id,
        credentialId: id
      }, t("defaultPasswordLabel"));
      addAlert(isResetPassword ? t("resetCredentialsSuccess") : t("savePasswordSuccess"), AlertVariant.success);
      refresh();
    } catch (error) {
      addError(isResetPassword ? "users:resetPasswordError" : "users:savePasswordError", error);
    }
    onClose();
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ConfirmSaveModal, null), /* @__PURE__ */ React.createElement(ConfirmDialogModal, {
    titleKey: isResetPassword ? t("resetPasswordFor", {username: user.username}) : t("setPasswordFor", {username: user.username}),
    open: confirm,
    onCancel: onClose,
    toggleDialog: toggle,
    onConfirm: toggleConfirmSaveModal,
    confirmButtonDisabled: !isValid,
    continueButtonLabel: "common:save"
  }, /* @__PURE__ */ React.createElement(Form, {
    id: "userCredentials-form",
    isHorizontal: true,
    className: "keycloak__user-credentials__reset-form"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    name: "password",
    label: t("password"),
    fieldId: "password",
    helperTextInvalid: t("common:required"),
    validated: errors.password ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(PasswordInput, {
    "data-testid": "passwordField",
    name: "password",
    "aria-label": "password",
    ref: register({required: true})
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    name: "passwordConfirmation",
    label: isResetPassword ? t("resetPasswordConfirmation") : t("passwordConfirmation"),
    fieldId: "passwordConfirmation",
    helperTextInvalid: errors.passwordConfirmation?.message,
    validated: errors.passwordConfirmation ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(PasswordInput, {
    "data-testid": "passwordConfirmationField",
    name: "passwordConfirmation",
    "aria-label": "passwordConfirm",
    ref: register({
      required: true,
      validate: (value) => value === password || t("confirmPasswordDoesNotMatch").toString()
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:temporaryPassword"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "temporaryPasswordHelpText",
      fieldLabelId: "temporaryPassword"
    }),
    fieldId: "kc-temporaryPassword"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "temporaryPassword",
    defaultValue: true,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      className: "kc-temporaryPassword",
      onChange,
      isChecked: value,
      label: t("common:on"),
      labelOff: t("common:off")
    })
  })))));
};
