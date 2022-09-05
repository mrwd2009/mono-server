import React from "../../_snowpack/pkg/react.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormGroup, Switch} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
export const BooleanComponent = ({
  name,
  label,
  helpText,
  defaultValue,
  isDisabled = false
}) => {
  const {t} = useTranslation("dynamic");
  const {control} = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t(label),
    fieldId: name,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t(helpText),
      fieldLabelId: `dynamic:${label}`
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: `config.${name}`,
    "data-testid": name,
    defaultValue: defaultValue || false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: name,
      isDisabled,
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true" || value === true,
      onChange: (value2) => onChange("" + value2),
      "data-testid": name
    })
  }));
};
