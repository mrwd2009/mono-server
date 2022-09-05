import React, {useEffect} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useFieldArray, useFormContext, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionList,
  ActionListItem,
  Button,
  Flex,
  FlexItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {MinusCircleIcon, PlusCircleIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {KeycloakTextInput} from "../keycloak-text-input/KeycloakTextInput.js";
export const KeyValueInput = ({name}) => {
  const {t} = useTranslation("common");
  const {control, register} = useFormContext();
  const {fields, append, remove} = useFieldArray({
    control,
    name
  });
  const watchFields = useWatch({
    control,
    name,
    defaultValue: []
  });
  const isValid = watchFields.every(({key, value}) => key.trim().length !== 0 && value.trim().length !== 0);
  useEffect(() => {
    if (!fields.length) {
      append({key: "", value: ""}, false);
    }
  }, [fields]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Flex, {
    direction: {default: "column"}
  }, /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(FlexItem, {
    grow: {default: "grow"},
    spacer: {default: "spacerNone"}
  }, /* @__PURE__ */ React.createElement("strong", null, t("key"))), /* @__PURE__ */ React.createElement(FlexItem, {
    grow: {default: "grow"}
  }, /* @__PURE__ */ React.createElement("strong", null, t("value")))), fields.map((attribute, index) => /* @__PURE__ */ React.createElement(Flex, {
    key: attribute.id,
    "data-testid": "row"
  }, /* @__PURE__ */ React.createElement(FlexItem, {
    grow: {default: "grow"}
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    name: `${name}[${index}].key`,
    ref: register(),
    placeholder: t("keyPlaceholder"),
    "aria-label": t("key"),
    defaultValue: attribute.key,
    "data-testid": `${name}[${index}].key`
  })), /* @__PURE__ */ React.createElement(FlexItem, {
    grow: {default: "grow"},
    spacer: {default: "spacerNone"}
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    name: `${name}[${index}].value`,
    ref: register(),
    placeholder: t("valuePlaceholder"),
    "aria-label": t("value"),
    defaultValue: attribute.value,
    "data-testid": `${name}[${index}].value`
  })), /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    title: t("removeAttribute"),
    isDisabled: watchFields.length === 1,
    onClick: () => remove(index),
    "data-testid": `${name}[${index}].remove`
  }, /* @__PURE__ */ React.createElement(MinusCircleIcon, null)))))), /* @__PURE__ */ React.createElement(ActionList, null, /* @__PURE__ */ React.createElement(ActionListItem, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": `${name}-add-row`,
    className: "pf-u-px-0 pf-u-mt-sm",
    variant: "link",
    icon: /* @__PURE__ */ React.createElement(PlusCircleIcon, null),
    isDisabled: !isValid,
    onClick: () => append({key: "", value: ""})
  }, t("addAttribute")))));
};
