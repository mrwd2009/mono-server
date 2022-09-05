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
export const EditFlowModal = ({flow, toggleDialog}) => {
  const {t} = useTranslation("authentication");
  const form = useForm({
    shouldUnregister: false
  });
  const {reset, handleSubmit} = form;
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  useEffect(() => {
    reset(flow);
  }, [flow, reset]);
  const save = async (values) => {
    try {
      await adminClient.authenticationManagement.updateFlow({flowId: flow.id}, {...flow, ...values});
      addAlert(t("updateFlowSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:updateFlowError", error);
    }
    toggleDialog();
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    title: t("editFlow"),
    isOpen: true,
    onClose: toggleDialog,
    variant: ModalVariant.small,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-confirm",
        key: "confirm",
        onClick: handleSubmit(save),
        "data-testid": "confirm"
      }, t("edit")),
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
