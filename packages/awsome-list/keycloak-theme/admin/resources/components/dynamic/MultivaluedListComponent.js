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
export const MultiValuedListComponent = ({
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
    control,
    defaultValue: defaultValue ? [defaultValue] : [],
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: name,
      "data-testid": name,
      isDisabled,
      chipGroupProps: {
        numChips: 3,
        expandedText: t("common:hide"),
        collapsedText: t("common:showRemaining")
      },
      variant: SelectVariant.typeaheadMulti,
      typeAheadAriaLabel: "Select",
      onToggle: (isOpen) => setOpen(isOpen),
      selections: value,
      onSelect: (_, v) => {
        const option = v.toString();
        if (value.includes(option)) {
          onChange(value.filter((item) => item !== option));
        } else {
          onChange([...value, option]);
        }
      },
      onClear: (event) => {
        event.stopPropagation();
        onChange([]);
      },
      isOpen: open,
      "aria-label": t(label)
    }, options?.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: option,
      value: option
    })))
  }));
};
