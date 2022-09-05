import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ExpandableSection,
  Form,
  FormGroup,
  NumberInput,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {SwitchField} from "../component/SwitchField.js";
import {TextField} from "../component/TextField.js";
import {FormGroupField} from "../component/FormGroupField.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
const promptOptions = [
  "unspecified",
  "none",
  "consent",
  "login",
  "select_account"
];
export const ExtendedNonDiscoverySettings = () => {
  const {t} = useTranslation("identity-providers");
  const {control} = useFormContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(ExpandableSection, {
    toggleText: t("advanced"),
    onToggle: () => setIsExpanded(!isExpanded),
    isExpanded
  }, /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(SwitchField, {
    label: "passLoginHint",
    field: "config.loginHint"
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    label: "passCurrentLocale",
    field: "config.uiLocales"
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.backchannelSupported",
    label: "backchannelLogout"
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.disableUserInfo",
    label: "disableUserInfo"
  }), /* @__PURE__ */ React.createElement(TextField, {
    field: "config.defaultScope",
    label: "scopes"
  }), /* @__PURE__ */ React.createElement(FormGroupField, {
    label: "prompt"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.prompt",
    defaultValue: promptOptions[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "prompt",
      required: true,
      onToggle: () => setPromptOpen(!promptOpen),
      onSelect: (_, value2) => {
        onChange(value2);
        setPromptOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("prompt"),
      isOpen: promptOpen
    }, promptOptions.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option === value,
      key: option,
      value: option
    }, t(`prompts.${option}`))))
  })), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.acceptsPromptNoneForwardFromClient",
    label: "acceptsPromptNone"
  }), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("allowedClockSkew"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:allowedClockSkew",
      fieldLabelId: "identity-providers:allowedClockSkew"
    }),
    fieldId: "allowedClockSkew"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.allowedClockSkew",
    control,
    defaultValue: 0,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(NumberInput, {
      value,
      "data-testid": "allowedClockSkew",
      onMinus: () => onChange(value - 1),
      onChange,
      onPlus: () => onChange(value + 1),
      inputName: "input",
      inputAriaLabel: t("allowedClockSkew"),
      minusBtnAriaLabel: t("common:minus"),
      plusBtnAriaLabel: t("common:plus"),
      min: 0,
      unit: t("common:times.seconds")
    })
  })), /* @__PURE__ */ React.createElement(TextField, {
    field: "config.forwardParameters",
    label: "forwardParameters"
  })));
};
