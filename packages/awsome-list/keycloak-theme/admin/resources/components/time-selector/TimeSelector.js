import React, {useEffect, useMemo, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Select,
  SelectOption,
  SelectVariant,
  Split,
  SplitItem,
  TextInput
} from "../../_snowpack/pkg/@patternfly/react-core.js";
const allTimes = [
  {unit: "second", label: "times.seconds", multiplier: 1},
  {unit: "minute", label: "times.minutes", multiplier: 60},
  {unit: "hour", label: "times.hours", multiplier: 3600},
  {unit: "day", label: "times.days", multiplier: 86400}
];
export const getTimeUnit = (value) => allTimes.reduce((v, time) => value % time.multiplier === 0 && v.multiplier < time.multiplier ? time : v, allTimes[0]);
export const toHumanFormat = (value, locale) => {
  const timeUnit = getTimeUnit(value);
  const formatter = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: timeUnit.unit,
    unitDisplay: "long"
  });
  return formatter.format(value / timeUnit.multiplier);
};
export const TimeSelector = ({
  value,
  units = ["second", "minute", "hour", "day"],
  onChange,
  className,
  min,
  menuAppendTo,
  ...rest
}) => {
  const {t} = useTranslation("common");
  const times = useMemo(() => units.map((unit) => allTimes.find((time) => time.unit === unit)), [units]);
  const defaultMultiplier = useMemo(() => allTimes.find((time) => time.unit === units[0])?.multiplier, [units]);
  const [timeValue, setTimeValue] = useState("");
  const [multiplier, setMultiplier] = useState(defaultMultiplier);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const multiplier2 = getTimeUnit(value).multiplier;
    if (value) {
      setMultiplier(multiplier2);
      setTimeValue(value / multiplier2);
    } else {
      setTimeValue(value);
      setMultiplier(defaultMultiplier);
    }
  }, [value]);
  const updateTimeout = (timeout, times2 = multiplier) => {
    if (timeout !== "") {
      onChange(timeout * (times2 || 1));
      setTimeValue(timeout);
    } else {
      onChange("");
    }
  };
  return /* @__PURE__ */ React.createElement(Split, {
    hasGutter: true,
    className
  }, /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(TextInput, {
    ...rest,
    type: "number",
    "aria-label": "kc-time",
    min: min || 0,
    value: timeValue,
    className: `${className}-input`,
    onChange: (value2) => {
      updateTimeout(value2 === "" ? value2 : parseInt(value2));
    }
  })), /* @__PURE__ */ React.createElement(SplitItem, {
    id: `${className}-select-menu`
  }, /* @__PURE__ */ React.createElement(Select, {
    variant: SelectVariant.single,
    "aria-label": t("unitLabel"),
    className: `${className}-select`,
    onSelect: (_, value2) => {
      setMultiplier(value2);
      updateTimeout(timeValue, value2);
      setOpen(false);
    },
    menuAppendTo,
    selections: [multiplier],
    onToggle: () => {
      setOpen(!open);
    },
    isOpen: open
  }, times.map((time) => /* @__PURE__ */ React.createElement(SelectOption, {
    id: time.label,
    key: time.label,
    value: time.multiplier
  }, t(time.label))))));
};
