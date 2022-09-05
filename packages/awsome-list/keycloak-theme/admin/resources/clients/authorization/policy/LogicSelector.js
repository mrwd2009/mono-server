import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, Radio} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
const LOGIC_TYPES = ["POSITIVE", "NEGATIVE"];
export const LogicSelector = () => {
  const {t} = useTranslation("clients");
  const {control} = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("logic"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:logic",
      fieldLabelId: "clients:logic"
    }),
    fieldId: "logic",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "logic",
    "data-testid": "logic",
    defaultValue: LOGIC_TYPES[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(React.Fragment, null, LOGIC_TYPES.map((type) => /* @__PURE__ */ React.createElement(Radio, {
      id: type,
      key: type,
      "data-testid": type,
      isChecked: value === type,
      name: "logic",
      onChange: () => onChange(type),
      label: t(`logicType.${type.toLowerCase()}`),
      className: "pf-u-mb-md"
    })))
  }));
};
