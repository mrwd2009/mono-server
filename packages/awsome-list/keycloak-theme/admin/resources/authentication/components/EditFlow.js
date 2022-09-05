import React, {useEffect} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Tooltip,
  ValidatedOptions
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {PencilAltIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import useToggle from "../../utils/useToggle.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {KeycloakTextArea} from "../../components/keycloak-text-area/KeycloakTextArea.js";
export const EditFlow = ({execution, onRowChange}) => {
  const {t} = useTranslation("authentication");
  const {register, errors, reset, handleSubmit} = useForm();
  const [show, toggle] = useToggle();
  const update = (values) => {
    onRowChange({...execution, ...values});
    toggle();
  };
  useEffect(() => {
    reset(execution);
  }, [execution, reset]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Tooltip, {
    content: t("common:edit")
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "plain",
    "data-testid": `${execution.id}-edit`,
    "aria-label": t("common:edit"),
    onClick: toggle
  }, /* @__PURE__ */ React.createElement(PencilAltIcon, null))), show && /* @__PURE__ */ React.createElement(Modal, {
    title: t("editFlow"),
    isOpen: true,
    onClose: toggle,
    variant: ModalVariant.small,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-confirm",
        key: "confirm",
        onClick: handleSubmit(update),
        "data-testid": "confirm"
      }, t("edit")),
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "cancel",
        id: "modal-cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: toggle
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    fieldId: "name",
    helperTextInvalid: t("common:required"),
    validated: errors.displayName ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:name",
      fieldLabelId: "name"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "name",
    name: "displayName",
    "data-testid": "displayName",
    ref: register({required: true}),
    validated: errors.displayName ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:description"),
    fieldId: "kc-description",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:description",
      fieldLabelId: "description"
    }),
    validated: errors.description ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: errors.description?.message
  }, /* @__PURE__ */ React.createElement(KeycloakTextArea, {
    ref: register({
      maxLength: {
        value: 255,
        message: t("common:maxLength", {length: 255})
      }
    }),
    type: "text",
    id: "kc-description",
    name: "description",
    "data-testid": "description",
    validated: errors.description ? ValidatedOptions.error : ValidatedOptions.default
  })))));
};
