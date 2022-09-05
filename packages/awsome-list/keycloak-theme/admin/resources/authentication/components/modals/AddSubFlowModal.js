import React, {useState} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {Controller, useForm} from "../../../_snowpack/pkg/react-hook-form.js";
import {
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Select,
  SelectOption,
  SelectVariant,
  ValidatedOptions
} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../../../components/keycloak-text-input/KeycloakTextInput.js";
import {useAdminClient, useFetch} from "../../../context/auth/AdminClient.js";
const types = ["basic-flow", "form-flow"];
export const AddSubFlowModal = ({
  name,
  onConfirm,
  onCancel
}) => {
  const {t} = useTranslation("authentication");
  const {
    register,
    control,
    handleSubmit,
    formState: {errors}
  } = useForm();
  const [open, setOpen] = useState(false);
  const [openProvider, setOpenProvider] = useState(false);
  const [formProviders, setFormProviders] = useState();
  const {adminClient} = useAdminClient();
  useFetch(() => adminClient.authenticationManagement.getFormProviders(), (providers) => setFormProviders(providers), []);
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.medium,
    isOpen: true,
    title: t("addStepTo", {name}),
    onClose: () => onCancel(),
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-add",
        "data-testid": "modal-add",
        key: "add",
        type: "submit",
        form: "sub-flow-form"
      }, t("common:add")),
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "cancel",
        id: "modal-cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: () => {
          onCancel();
        }
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(Form, {
    id: "sub-flow-form",
    isHorizontal: true,
    onSubmit: handleSubmit(onConfirm)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    fieldId: "name",
    helperTextInvalid: t("common:required"),
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:name",
      fieldLabelId: "name"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "name",
    name: "name",
    "data-testid": "name",
    ref: register({required: true}),
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:description"),
    fieldId: "description",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:description",
      fieldLabelId: "description"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "description",
    name: "description",
    "data-testid": "description",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("flowType"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:flowType",
      fieldLabelId: "authentication:flowType"
    }),
    fieldId: "flowType"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "type",
    defaultValue: types[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      menuAppendTo: "parent",
      toggleId: "flowType",
      onToggle: setOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setOpen(false);
      },
      selections: t(`flow-type.${value}`),
      variant: SelectVariant.single,
      "aria-label": t("flowType"),
      isOpen: open
    }, types.map((type) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: type === value,
      key: type,
      value: type
    }, t(`flow-type.${type}`))))
  })), formProviders && formProviders.length > 1 && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("flowType"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:flowType",
      fieldLabelId: "authentication:flowType"
    }),
    fieldId: "flowType"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "provider",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      menuAppendTo: "parent",
      toggleId: "provider",
      onToggle: setOpenProvider,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setOpenProvider(false);
      },
      selections: value.displayName,
      variant: SelectVariant.single,
      "aria-label": t("flowType"),
      isOpen: openProvider
    }, formProviders.map((provider) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: provider.displayName === value,
      key: provider.id,
      value: provider
    }, provider.displayName)))
  })), formProviders?.length === 1 && /* @__PURE__ */ React.createElement("input", {
    name: "provider",
    type: "hidden",
    ref: register,
    value: formProviders[0].id
  })));
};
