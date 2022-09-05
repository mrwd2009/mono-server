import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {Switch} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormGroupField} from "./FormGroupField.js";
export const SwitchField = ({
  label,
  field,
  fieldType = "string",
  isReadOnly = false
}) => {
  const {t} = useTranslation("identity-providers");
  const {control} = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroupField, {
    label
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: field,
    defaultValue: fieldType === "string" ? "false" : false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: label,
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: fieldType === "string" ? value === "true" : value,
      onChange: (value2) => onChange(fieldType === "string" ? "" + value2 : value2),
      isDisabled: isReadOnly
    })
  }));
};
