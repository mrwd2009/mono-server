import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {AlertVariant, Button, Form, FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {CheckIcon, PencilAltIcon, TimesIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const InlineLabelEdit = ({
  userId,
  credential,
  isEditable,
  toggle
}) => {
  const {t} = useTranslation("users");
  const {register, handleSubmit} = useForm();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const saveUserLabel = async (userLabel) => {
    try {
      await adminClient.users.updateCredentialLabel({
        id: userId,
        credentialId: credential.id
      }, userLabel.userLabel || "");
      addAlert(t("updateCredentialUserLabelSuccess"), AlertVariant.success);
      toggle();
    } catch (error) {
      addError("users:updateCredentialUserLabelError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true,
    className: "kc-form-userLabel",
    onSubmit: handleSubmit(saveUserLabel)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    fieldId: "kc-userLabel",
    className: "kc-userLabel-row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "kc-form-group-userLabel"
  }, isEditable ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    name: "userLabel",
    "data-testid": "userLabelFld",
    defaultValue: credential.userLabel,
    ref: register(),
    type: "text",
    className: "kc-userLabel",
    "aria-label": t("userLabel")
  }), /* @__PURE__ */ React.createElement("div", {
    className: "kc-userLabel-actionBtns"
  }, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "editUserLabelAcceptBtn",
    variant: "link",
    className: "kc-editUserLabelAcceptBtn",
    type: "submit",
    icon: /* @__PURE__ */ React.createElement(CheckIcon, null)
  }), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "editUserLabelCancelBtn",
    variant: "link",
    className: "kc-editUserLabel-cancelBtn",
    onClick: toggle,
    icon: /* @__PURE__ */ React.createElement(TimesIcon, null)
  }))) : /* @__PURE__ */ React.createElement(React.Fragment, null, credential.userLabel, /* @__PURE__ */ React.createElement(Button, {
    "aria-label": t("editUserLabel"),
    variant: "link",
    className: "kc-editUserLabel-btn",
    onClick: toggle,
    "data-testid": "editUserLabelBtn",
    icon: /* @__PURE__ */ React.createElement(PencilAltIcon, null)
  })))));
};
