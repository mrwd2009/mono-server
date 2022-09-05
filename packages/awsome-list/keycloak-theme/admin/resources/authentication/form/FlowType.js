import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
const TYPES = ["basic-flow", "client-flow"];
export const FlowType = () => {
  const {t} = useTranslation("authentication");
  const {control} = useFormContext();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("flowType"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:topLevelFlowType",
      fieldLabelId: "authentication:flowType"
    }),
    fieldId: "flowType"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "providerId",
    defaultValue: TYPES[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "flowType",
      onToggle: setOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setOpen(false);
      },
      selections: t(`top-level-flow-type.${value}`),
      variant: SelectVariant.single,
      "aria-label": t("flowType"),
      isOpen: open
    }, TYPES.map((type) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: type === value,
      key: type,
      value: type
    }, t(`top-level-flow-type.${type}`))))
  }));
};
