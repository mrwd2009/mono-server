import React from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Controller, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {
  Modal,
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  Select,
  SelectVariant,
  SelectOption,
  AlertVariant
} from "../_snowpack/pkg/@patternfly/react-core.js";
import useToggle from "../utils/useToggle.js";
import {REALM_FLOWS} from "./AuthenticationSection.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
export const BindFlowDialog = ({flowAlias, onClose}) => {
  const {t} = useTranslation("authentication");
  const {control, handleSubmit} = useForm();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const [open, toggle] = useToggle();
  const save = async ({bindingType}) => {
    const realmRep = await adminClient.realms.findOne({realm});
    try {
      await adminClient.realms.update({realm}, {...realmRep, [bindingType]: flowAlias});
      addAlert(t("updateFlowSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:updateFlowError", error);
    }
    onClose();
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    title: t("bindFlow"),
    isOpen: true,
    variant: "small",
    onClose,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-confirm",
        key: "confirm",
        "data-testid": "save",
        type: "submit",
        form: "bind-form"
      }, t("common:save")),
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "cancel",
        id: "modal-cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: onClose
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(Form, {
    id: "bind-form",
    isHorizontal: true,
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("chooseBindingType"),
    fieldId: "chooseBindingType"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "bindingType",
    defaultValue: REALM_FLOWS[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "chooseBindingType",
      onToggle: toggle,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        toggle();
      },
      selections: t(`flow.${value}`),
      variant: SelectVariant.single,
      "aria-label": t("bindingFlow"),
      isOpen: open,
      menuAppendTo: "parent"
    }, REALM_FLOWS.filter((f) => f !== "dockerAuthenticationFlow").map((flow) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: flow === value,
      key: flow,
      value: flow
    }, t(`flow.${flow}`))))
  }))));
};
