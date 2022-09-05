import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
export const ListComponent = ({
  name,
  label,
  helpText,
  defaultValue,
  options,
  isDisabled = false
}) => {
  const {t} = useTranslation("dynamic");
  const {control} = useFormContext();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(label),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t(helpText),
      fieldLabelId: `dynamic:${label}`
    }),
    fieldId: name
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: `config.${name}`,
    "data-testid": name,
    defaultValue: defaultValue || "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: name,
      isDisabled,
      onToggle: (toggle) => setOpen(toggle),
      onSelect: (_, value2) => {
        onChange(value2);
        setOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t(label),
      isOpen: open
    }, options?.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option === value,
      key: option,
      value: option
    })))
  }));
};
