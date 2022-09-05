import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormProvider, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {AlertVariant} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {KeyForm} from "./GenerateKeyDialog.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {submitForm} from "./SamlKeysDialog.js";
import {ConfirmDialogModal} from "../../components/confirm-dialog/ConfirmDialog.js";
export const SamlImportKeyDialog = ({
  id,
  attr,
  onClose
}) => {
  const {t} = useTranslation("clients");
  const form = useFormContext();
  const {handleSubmit} = form;
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
  return /* @__PURE__ */ React.createElement(ConfirmDialogModal, {
    open: true,
    toggleDialog: onClose,
    continueButtonLabel: "clients:import",
    titleKey: "clients:importKey",
    onConfirm: () => {
      handleSubmit(submit)();
      onClose();
    }
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(KeyForm, {
    useFile: true
  })));
};
