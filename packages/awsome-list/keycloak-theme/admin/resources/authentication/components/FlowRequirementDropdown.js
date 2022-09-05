import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Select, SelectOption, SelectVariant} from "../../_snowpack/pkg/@patternfly/react-core.js";
export const FlowRequirementDropdown = ({
  flow,
  onChange
}) => {
  const {t} = useTranslation("authentication");
  const [open, setOpen] = useState(false);
  const options = flow.requirementChoices.map((option, index) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: index,
    value: option
  }, t(`requirements.${option}`)));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, flow.requirementChoices && flow.requirementChoices.length > 1 && /* @__PURE__ */ React.createElement(Select, {
    className: "keycloak__authentication__requirement-dropdown",
    variant: SelectVariant.single,
    onToggle: setOpen,
    onSelect: (_event, value) => {
      flow.requirement = value.toString();
      onChange(flow);
      setOpen(false);
    },
    selections: [flow.requirement],
    isOpen: open
  }, options), (!flow.requirementChoices || flow.requirementChoices.length <= 1) && /* @__PURE__ */ React.createElement(React.Fragment, null, t(`requirements.${flow.requirement}`)));
};
