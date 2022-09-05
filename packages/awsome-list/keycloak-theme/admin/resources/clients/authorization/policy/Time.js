import React, {useState} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../../_snowpack/pkg/react-hook-form.js";
import {
  DatePicker,
  Flex,
  FlexItem,
  FormGroup,
  NumberInput,
  Radio,
  Split,
  SplitItem,
  TimePicker
} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
const DATE_TIME_FORMAT = /(\d\d\d\d-\d\d-\d\d)? (\d\d?):(\d\d?)/;
const padDateSegment = (value) => value.toString().padStart(2, "0");
const DateTime = ({name}) => {
  const {control} = useFormContext();
  const parseDate = (value, date) => {
    if (!date) {
      return value;
    }
    const parts = value.match(DATE_TIME_FORMAT);
    const parsedDate = [
      date.getFullYear(),
      padDateSegment(date.getMonth() + 1),
      padDateSegment(date.getDate())
    ].join("-");
    return `${parsedDate} ${parts ? parts[2] : "00"}:${parts ? parts[3] : "00"}:00`;
  };
  const parseTime = (value, hour, minute) => {
    const parts = value.match(DATE_TIME_FORMAT);
    if (minute !== void 0 && minute !== null) {
      return `${parts ? parts[1] : ""} ${hour}:${minute < 10 ? `0${minute}` : minute}:00`;
    }
    return value;
  };
  return /* @__PURE__ */ React.createElement(Controller, {
    name,
    defaultValue: "",
    control,
    render: ({onChange, value}) => {
      const dateTime = value.match(DATE_TIME_FORMAT) || ["", "", "0", "00"];
      return /* @__PURE__ */ React.createElement(Split, {
        hasGutter: true,
        id: name
      }, /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(DatePicker, {
        value: dateTime[1],
        onChange: (_, date) => {
          onChange(parseDate(value, date));
        }
      })), /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(TimePicker, {
        time: `${dateTime[2]}:${dateTime[3]}`,
        onChange: (_, hour, minute) => onChange(parseTime(value, hour, minute)),
        is24Hour: true
      })));
    }
  });
};
const NumberControl = ({name, min, max}) => {
  const {control} = useFormContext();
  const setValue = (newValue) => Math.min(newValue, max);
  return /* @__PURE__ */ React.createElement(Controller, {
    name,
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(NumberInput, {
      id: name,
      value,
      min,
      max,
      onPlus: () => onChange(Number(value) + 1),
      onMinus: () => onChange(Number(value) - 1),
      onChange: (event) => {
        const newValue = Number(event.currentTarget.value);
        onChange(setValue(!isNaN(newValue) ? newValue : 0));
      }
    })
  });
};
const FromTo = ({name, ...rest}) => {
  const {t} = useTranslation("clients");
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(name),
    fieldId: name,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `clients-help:${name}`,
      fieldLabelId: `clients:${name}`
    })
  }, /* @__PURE__ */ React.createElement(Split, {
    hasGutter: true
  }, /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(NumberControl, {
    name,
    ...rest
  })), /* @__PURE__ */ React.createElement(SplitItem, null, t("common:to")), /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(NumberControl, {
    name: `${name}End`,
    ...rest
  }))));
};
export const Time = () => {
  const {t} = useTranslation("clients");
  const {getValues} = useFormContext();
  const [repeat, setRepeat] = useState(getValues("month"));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("repeat"),
    fieldId: "repeat",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:repeat",
      fieldLabelId: "clients:repeat"
    })
  }, /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Radio, {
    id: "notRepeat",
    "data-testid": "notRepeat",
    isChecked: !repeat,
    name: "repeat",
    onChange: () => setRepeat(false),
    label: t("notRepeat"),
    className: "pf-u-mb-md"
  })), /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Radio, {
    id: "repeat",
    "data-testid": "repeat",
    isChecked: repeat,
    name: "repeat",
    onChange: () => setRepeat(true),
    label: t("repeat"),
    className: "pf-u-mb-md"
  })))), repeat && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FromTo, {
    name: "month",
    min: 1,
    max: 12
  }), /* @__PURE__ */ React.createElement(FromTo, {
    name: "dayMonth",
    min: 1,
    max: 31
  }), /* @__PURE__ */ React.createElement(FromTo, {
    name: "hour",
    min: 0,
    max: 23
  }), /* @__PURE__ */ React.createElement(FromTo, {
    name: "minute",
    min: 0,
    max: 59
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("startTime"),
    fieldId: "notBefore",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:startTime",
      fieldLabelId: "clients:startTime"
    })
  }, /* @__PURE__ */ React.createElement(DateTime, {
    name: "notBefore"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("expireTime"),
    fieldId: "notOnOrAfter",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:expireTime",
      fieldLabelId: "clients:expireTime"
    })
  }, /* @__PURE__ */ React.createElement(DateTime, {
    name: "notOnOrAfter"
  })));
};
