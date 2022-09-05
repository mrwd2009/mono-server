import React from "../../_snowpack/pkg/react.js";
import {useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  Modal
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const AddHostDialog = ({
  clientId: id,
  isOpen,
  onAdded,
  onClose
}) => {
  const {t} = useTranslation("clients");
  const {register, getValues} = useForm();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  return /* @__PURE__ */ React.createElement(Modal, {
    title: t("addNode"),
    isOpen,
    onClose,
    variant: "small",
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "add-node-confirm",
        key: "confirm",
        onClick: async () => {
          try {
            const node = getValues("node");
            await adminClient.clients.addClusterNode({
              id,
              node
            });
            onAdded(node);
            addAlert(t("addedNodeSuccess"), AlertVariant.success);
          } catch (error) {
            addError("clients:addedNodeFail", error);
          }
          onClose();
        }
      }, t("common:save")),
      /* @__PURE__ */ React.createElement(Button, {
        id: "add-node-cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: () => onClose()
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("nodeHost"),
    fieldId: "nodeHost"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "nodeHost",
    ref: register,
    name: "node"
  }))));
};
