import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  Button,
  FormGroup,
  NumberInput,
  Split,
  SplitItem,
  Switch,
  ValidatedOptions
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {MinusCircleIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import "./policy-row.css.proxy.js";
export const PolicyRow = ({
  policy: {id, configType, defaultValue, displayName},
  onRemove
}) => {
  const {t} = useTranslation("authentication");
  const {
    control,
    register,
    formState: {errors}
  } = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: displayName,
    fieldId: id,
    isRequired: true,
    helperTextInvalid: t("common:required"),
    validated: errors[id] ? ValidatedOptions.error : ValidatedOptions.default,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `authentication-help:passwordPolicies.${id}`,
      fieldLabelId: `authentication:${id}`
    })
  }, /* @__PURE__ */ React.createElement(Split, null, /* @__PURE__ */ React.createElement(SplitItem, {
    isFilled: true
  }, configType && configType !== "int" && /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id,
    "data-testid": id,
    ref: register({required: true}),
    name: id,
    defaultValue,
    validated: errors[id] ? ValidatedOptions.error : ValidatedOptions.default
  }), configType === "int" && /* @__PURE__ */ React.createElement(Controller, {
    name: id,
    defaultValue: Number.parseInt(defaultValue || "0"),
    control,
    render: ({onChange, value}) => {
      const MIN_VALUE = 0;
      const setValue = (newValue) => onChange(Math.max(newValue, MIN_VALUE));
      return /* @__PURE__ */ React.createElement(NumberInput, {
        id,
        value,
        min: MIN_VALUE,
        onPlus: () => setValue(value + 1),
        onMinus: () => setValue(value - 1),
        onChange: (event) => {
          const newValue = Number(event.currentTarget.value);
          setValue(!isNaN(newValue) ? newValue : 0);
        },
        className: "keycloak__policies_authentication__number-field"
      });
    }
  }), !configType && /* @__PURE__ */ React.createElement(Switch, {
    id,
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: true,
    isDisabled: true
  })), /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": `remove-${id}`,
    variant: "link",
    className: "keycloak__policies_authentication__minus-icon",
    onClick: () => onRemove(id),
    "aria-label": t("common:remove")
  }, /* @__PURE__ */ React.createElement(MinusCircleIcon, null)))));
};
