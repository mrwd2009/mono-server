import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {TimeSelector} from "../../components/time-selector/TimeSelector.js";
import {credResetFormDefaultValues} from "./ResetCredentialDialog.js";
export const LifespanField = () => {
  const {t} = useTranslation("users");
  const {control} = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroup, {
    fieldId: "lifespan",
    label: t("lifespan"),
    isStack: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:lifespan",
      fieldLabelId: "lifespan"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "lifespan",
    defaultValue: credResetFormDefaultValues.lifespan,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      value,
      units: ["minute", "hour", "day"],
      onChange,
      menuAppendTo: "parent"
    })
  }));
};
