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
import {capitalize} from "../_snowpack/pkg/lodash-es.js";
import {useParams} from "../_snowpack/pkg/react-router-dom.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
export const UserIdpModal = ({
  federatedId,
  handleModalToggle,
  refresh
}) => {
  const {t} = useTranslation("users");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {
    register,
    handleSubmit,
    formState: {isValid, errors}
  } = useForm({
    mode: "onChange"
  });
  const {id} = useParams();
  const submitForm = async (fedIdentity) => {
    try {
      await adminClient.users.addToFederatedIdentity({
        id,
        federatedIdentityId: federatedId,
        federatedIdentity: fedIdentity
      });
      addAlert(t("users:idpLinkSuccess"), AlertVariant.success);
      handleModalToggle();
      refresh();
    } catch (error) {
      addError("users:couldNotLinkIdP", error);
    }
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.small,
    title: t("users:linkAccountTitle", {
      provider: capitalize(federatedId)
    }),
    isOpen: true,
    onClose: handleModalToggle,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": t("link"),
        key: "confirm",
        variant: "primary",
        type: "submit",
        form: "group-form",
        isDisabled: !isValid
      }, t("link")),
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
    onSubmit: handleSubmit(submitForm)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    name: "idp-name-group",
    label: t("users:identityProvider"),
    fieldId: "idp-name",
    helperTextInvalid: t("common:required"),
    validated: errors.identityProvider ? ValidatedOptions.error : ValidatedOptions.default
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    "data-testid": "idpNameInput",
    "aria-label": "Identity provider name input",
    ref: register({required: true}),
    autoFocus: true,
    isReadOnly: true,
    type: "text",
    id: "link-idp-name",
    name: "identityProvider",
    value: capitalize(federatedId),
    validated: errors.identityProvider ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    name: "user-id-group",
    label: t("users:userID"),
    fieldId: "user-id",
    helperText: t("users-help:userIdHelperText"),
    helperTextInvalid: t("common:required"),
    validated: errors.userId ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    "data-testid": "userIdInput",
    "aria-label": "user ID input",
    ref: register({required: true}),
    autoFocus: true,
    type: "text",
    id: "link-idp-user-id",
    name: "userId",
    validated: errors.userId ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    name: "username-group",
    label: t("users:username"),
    fieldId: "username",
    helperText: t("users-help:usernameHelperText"),
    helperTextInvalid: t("common:required"),
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    "data-testid": "usernameInput",
    "aria-label": "username input",
    ref: register({required: true}),
    autoFocus: true,
    type: "text",
    id: "link-idp-username",
    name: "userName",
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default
  }))));
};
