import React, {useEffect} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {FormProvider, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Form,
  Modal,
  ModalVariant
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {NameDescription} from "./form/NameDescription.js";
export const DuplicateFlowModal = ({
  name,
  description,
  toggleDialog,
  onComplete
}) => {
  const {t} = useTranslation("authentication");
  const form = useForm({
    shouldUnregister: false
  });
  const {setValue, trigger, getValues} = form;
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  useEffect(() => {
    setValue("description", description);
    setValue("alias", t("copyOf", {name}));
  }, [name, description, setValue]);
  const save = async () => {
    if (!await trigger())
      return;
    const form2 = getValues();
    try {
      await adminClient.authenticationManagement.copyFlow({
        flow: name,
        newName: form2.alias
      });
      if (form2.description !== description) {
        const newFlow = (await adminClient.authenticationManagement.getFlows()).find((flow) => flow.alias === form2.alias);
        newFlow.description = form2.description;
        await adminClient.authenticationManagement.updateFlow({flowId: newFlow.id}, newFlow);
      }
      addAlert(t("copyFlowSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:copyFlowError", error);
    }
    onComplete();
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    title: t("duplicateFlow"),
    isOpen: true,
    onClose: toggleDialog,
    variant: ModalVariant.small,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-confirm",
        key: "confirm",
        onClick: save,
        "data-testid": "confirm"
      }, t("duplicate")),
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "cancel",
        id: "modal-cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: () => {
          toggleDialog();
        }
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(NameDescription, null))));
};
