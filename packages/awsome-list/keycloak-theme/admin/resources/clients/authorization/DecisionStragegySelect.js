import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, Radio} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
const DECISION_STRATEGY = ["UNANIMOUS", "AFFIRMATIVE", "CONSENSUS"];
export const DecisionStrategySelect = ({
  helpLabel,
  isLimited = false
}) => {
  const {t} = useTranslation("clients");
  const {control} = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("decisionStrategy"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `clients-help:${helpLabel || "decisionStrategy"}`,
      fieldLabelId: "clients:decisionStrategy"
    }),
    fieldId: "decisionStrategy",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "decisionStrategy",
    "data-testid": "decisionStrategy",
    defaultValue: DECISION_STRATEGY[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(React.Fragment, null, (isLimited ? DECISION_STRATEGY.slice(0, 2) : DECISION_STRATEGY).map((strategy) => /* @__PURE__ */ React.createElement(Radio, {
      id: strategy,
      key: strategy,
      "data-testid": strategy,
      isChecked: value === strategy,
      name: "decisionStrategy",
      onChange: () => onChange(strategy),
      label: t(`decisionStrategies.${strategy}`),
      className: "pf-u-mb-md"
    })))
  }));
};
