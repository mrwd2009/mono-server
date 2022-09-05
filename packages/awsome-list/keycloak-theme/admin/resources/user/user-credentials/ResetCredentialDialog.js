import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormProvider, useForm, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {ModalVariant, Form, AlertVariant} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {CredentialsResetActionMultiSelect} from "./CredentialsResetActionMultiSelect.js";
import {ConfirmDialogModal} from "../../components/confirm-dialog/ConfirmDialog.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {LifespanField} from "./LifespanField.js";
import {isEmpty} from "../../_snowpack/pkg/lodash-es.js";
export const credResetFormDefaultValues = {
  actions: [],
  lifespan: 43200
};
export const ResetCredentialDialog = ({
  userId,
  onClose
}) => {
  const {t} = useTranslation("users");
  const form = useForm({
    defaultValues: credResetFormDefaultValues
  });
  const {handleSubmit, control} = form;
  const resetActionWatcher = useWatch({
    control,
    name: "actions"
  });
  const resetIsNotDisabled = !isEmpty(resetActionWatcher);
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const sendCredentialsResetEmail = async ({
    actions,
    lifespan
  }) => {
    if (isEmpty(actions)) {
      return;
    }
    try {
      await adminClient.users.executeActionsEmail({
        id: userId,
        actions,
        lifespan
      });
      addAlert(t("credentialResetEmailSuccess"), AlertVariant.success);
      onClose();
    } catch (error) {
      addError("users:credentialResetEmailError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(ConfirmDialogModal, {
    variant: ModalVariant.medium,
    titleKey: "users:credentialReset",
    open: true,
    onCancel: onClose,
    toggleDialog: onClose,
    continueButtonLabel: "users:credentialResetConfirm",
    onConfirm: () => {
      handleSubmit(sendCredentialsResetEmail)();
    },
    confirmButtonDisabled: !resetIsNotDisabled
  }, /* @__PURE__ */ React.createElement(Form, {
    id: "userCredentialsReset-form",
    isHorizontal: true,
    "data-testid": "credential-reset-modal"
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(CredentialsResetActionMultiSelect, null), /* @__PURE__ */ React.createElement(LifespanField, null))));
};
