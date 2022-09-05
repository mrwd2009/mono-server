import React from "../_snowpack/pkg/react.js";
import {
  AlertVariant,
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
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
export const GroupsModal = ({
  id,
  rename,
  handleModalToggle,
  refresh
}) => {
  const {t} = useTranslation("groups");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    defaultValues: {name: rename}
  });
  const submitForm = async (group) => {
    group.name = group.name?.trim();
    try {
      if (!id) {
        await adminClient.groups.create(group);
      } else if (rename) {
        await adminClient.groups.update({id}, group);
      } else {
        await adminClient.groups.setOrCreateChild({id}, group);
      }
      refresh(rename ? group : void 0);
      handleModalToggle();
      addAlert(t(rename ? "groupUpdated" : "groupCreated"), AlertVariant.success);
    } catch (error) {
      addError("groups:couldNotCreateGroup", error);
    }
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.small,
    title: t(rename ? "renameAGroup" : "createAGroup"),
    isOpen: true,
    onClose: handleModalToggle,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": `${rename ? "rename" : "create"}Group`,
        key: "confirm",
        variant: "primary",
        type: "submit",
        form: "group-form"
      }, t(rename ? "rename" : "create")),
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
    id: "group-form",
    isHorizontal: true,
    onSubmit: handleSubmit(submitForm)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    name: "create-modal-group",
    label: t("common:name"),
    fieldId: "group-id",
    helperTextInvalid: t("common:required"),
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    "data-testid": "groupNameInput",
    "aria-label": "group name input",
    ref: register({required: true}),
    autoFocus: true,
    type: "text",
    id: "create-group-name",
    name: "name",
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default
  }))));
};
