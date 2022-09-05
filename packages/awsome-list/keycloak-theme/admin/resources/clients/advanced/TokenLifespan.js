import React, {useState} from "../../_snowpack/pkg/react.js";
import {Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  Split,
  SplitItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {
  TimeSelector
} from "../../components/time-selector/TimeSelector.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
const never = "tokenLifespan.never";
const expires = "tokenLifespan.expires";
export const TokenLifespan = ({
  id,
  name,
  defaultValue,
  control,
  units
}) => {
  const {t} = useTranslation("clients");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const isExpireSet = (value) => typeof value === "number" && value !== -1 || typeof value === "string" && value !== "" && value !== "-1" || focused;
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(id),
    fieldId: id,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `clients-help:${id}`,
      fieldLabelId: `clients:${id}`
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name,
    defaultValue,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Split, {
      hasGutter: true
    }, /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(Select, {
      variant: SelectVariant.single,
      onToggle: setOpen,
      isOpen: open,
      onSelect: (_, value2) => {
        onChange(value2);
        setOpen(false);
      },
      selections: [isExpireSet(value) ? t(expires) : t(never)]
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      value: -1
    }, t(never)), /* @__PURE__ */ React.createElement(SelectOption, {
      value: 60
    }, t(expires)))), /* @__PURE__ */ React.createElement(SplitItem, null, isExpireSet(value) && /* @__PURE__ */ React.createElement(TimeSelector, {
      units,
      value,
      onChange,
      onFocus,
      onBlur,
      min: 1
    })))
  }));
};
