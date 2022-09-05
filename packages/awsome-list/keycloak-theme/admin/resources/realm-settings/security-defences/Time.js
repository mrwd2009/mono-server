import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, ValidatedOptions} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {TimeSelector} from "../../components/time-selector/TimeSelector.js";
export const Time = ({
  name,
  style
}) => {
  const {t} = useTranslation("realm-settings");
  const {
    control,
    formState: {errors}
  } = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroup, {
    style,
    label: t(name),
    fieldId: name,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `realm-settings-help:${name}`,
      fieldLabelId: `realm-settings:${name}`
    }),
    validated: errors[name] ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(Controller, {
    name,
    defaultValue: "",
    control,
    rules: {required: true},
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      "data-testid": name,
      value,
      onChange,
      validated: errors[name] ? ValidatedOptions.error : ValidatedOptions.default
    })
  }));
};
