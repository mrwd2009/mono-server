import {
  FormGroup,
  NumberInput,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import React from "../../_snowpack/pkg/react.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useWatch, Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {isEqual} from "../../_snowpack/pkg/lodash-es.js";
import {WizardSectionHeader} from "../../components/wizard-section-header/WizardSectionHeader.js";
import useToggle from "../../utils/useToggle.js";
const CacheFields = ({form}) => {
  const {t} = useTranslation("user-federation");
  const [isCachePolicyOpen, toggleCachePolicy] = useToggle();
  const [isEvictionHourOpen, toggleEvictionHour] = useToggle();
  const [isEvictionMinuteOpen, toggleEvictionMinute] = useToggle();
  const [isEvictionDayOpen, toggleEvictionDay] = useToggle();
  const cachePolicyType = useWatch({
    control: form.control,
    name: "config.cachePolicy"
  });
  const hourOptions = [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: 0,
      value: [`${0}`],
      isPlaceholder: true
    }, [`0${0}`])
  ];
  let hourDisplay = "";
  for (let index = 1; index < 24; index++) {
    if (index < 10) {
      hourDisplay = `0${index}`;
    } else {
      hourDisplay = `${index}`;
    }
    hourOptions.push(/* @__PURE__ */ React.createElement(SelectOption, {
      key: index,
      value: [`${index}`]
    }, hourDisplay));
  }
  const minuteOptions = [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: 0,
      value: [`${0}`],
      isPlaceholder: true
    }, [`0${0}`])
  ];
  let minuteDisplay = "";
  for (let index = 1; index < 60; index++) {
    if (index < 10) {
      minuteDisplay = `0${index}`;
    } else {
      minuteDisplay = `${index}`;
    }
    minuteOptions.push(/* @__PURE__ */ React.createElement(SelectOption, {
      key: index,
      value: [`${index}`]
    }, minuteDisplay));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("cachePolicy"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:cachePolicyHelp",
      fieldLabelId: "user-federation:cachePolicy"
    }),
    fieldId: "kc-cache-policy"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.cachePolicy",
    defaultValue: ["DEFAULT"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-cache-policy",
      required: true,
      onToggle: toggleCachePolicy,
      isOpen: isCachePolicyOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        toggleCachePolicy();
      },
      selections: value,
      variant: SelectVariant.single,
      "data-testid": "kerberos-cache-policy"
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      key: 0,
      value: ["DEFAULT"],
      isPlaceholder: true
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 1,
      value: ["EVICT_DAILY"]
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 2,
      value: ["EVICT_WEEKLY"]
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 3,
      value: ["MAX_LIFESPAN"]
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 4,
      value: ["NO_CACHE"]
    }))
  })), isEqual(cachePolicyType, ["EVICT_WEEKLY"]) ? /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("evictionDay"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:evictionDayHelp",
      fieldLabelId: "user-federation:evictionDay"
    }),
    isRequired: true,
    fieldId: "kc-eviction-day"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.evictionDay[0]",
    defaultValue: "1",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      "data-testid": "cache-day",
      toggleId: "kc-eviction-day",
      required: true,
      onToggle: toggleEvictionDay,
      isOpen: isEvictionDayOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        toggleEvictionDay();
      },
      selections: value,
      variant: SelectVariant.single
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      key: 0,
      value: "1",
      isPlaceholder: true
    }, t("common:Sunday")), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 1,
      value: "2"
    }, t("common:Monday")), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 2,
      value: "3"
    }, t("common:Tuesday")), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 3,
      value: "4"
    }, t("common:Wednesday")), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 4,
      value: "5"
    }, t("common:Thursday")), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 5,
      value: "6"
    }, t("common:Friday")), /* @__PURE__ */ React.createElement(SelectOption, {
      key: 6,
      value: "7"
    }, t("common:Saturday")))
  })) : null, isEqual(cachePolicyType, ["EVICT_DAILY"]) || isEqual(cachePolicyType, ["EVICT_WEEKLY"]) ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("evictionHour"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:evictionHourHelp",
      fieldLabelId: "user-federation:evictionHour"
    }),
    isRequired: true,
    fieldId: "kc-eviction-hour"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.evictionHour",
    defaultValue: ["0"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-eviction-hour",
      onToggle: toggleEvictionHour,
      isOpen: isEvictionHourOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        toggleEvictionHour();
      },
      selections: value,
      variant: SelectVariant.single
    }, hourOptions)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("evictionMinute"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:evictionMinuteHelp",
      fieldLabelId: "user-federation:evictionMinute"
    }),
    isRequired: true,
    fieldId: "kc-eviction-minute"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.evictionMinute",
    defaultValue: ["0"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-eviction-minute",
      onToggle: toggleEvictionMinute,
      isOpen: isEvictionMinuteOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        toggleEvictionMinute();
      },
      selections: value,
      variant: SelectVariant.single
    }, minuteOptions)
  }))) : null, isEqual(cachePolicyType, ["MAX_LIFESPAN"]) ? /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("maxLifespan"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:maxLifespanHelp",
      fieldLabelId: "user-federation:maxLifespan"
    }),
    fieldId: "kc-max-lifespan"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.maxLifespan[0]",
    defaultValue: 0,
    control: form.control,
    render: ({onChange, value}) => {
      const MIN_VALUE = 0;
      const setValue = (newValue) => onChange(Math.max(newValue, MIN_VALUE));
      return /* @__PURE__ */ React.createElement(NumberInput, {
        id: "kc-max-lifespan",
        "data-testid": "kerberos-cache-lifespan",
        value,
        min: MIN_VALUE,
        unit: t("ms"),
        type: "text",
        onPlus: () => onChange(Number(value) + 1),
        onMinus: () => onChange(Number(value) - 1),
        onChange: (event) => {
          const newValue = Number(event.currentTarget.value);
          setValue(!isNaN(newValue) ? newValue : 0);
        }
      });
    }
  })) : null);
};
export const SettingsCache = ({
  form,
  showSectionHeading = false,
  showSectionDescription = false,
  unWrap = false
}) => {
  const {t} = useTranslation("user-federation");
  const {t: helpText} = useTranslation("user-federation-help");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, showSectionHeading && /* @__PURE__ */ React.createElement(WizardSectionHeader, {
    title: t("cacheSettings"),
    description: helpText("cacheSettingsDescription"),
    showDescription: showSectionDescription
  }), unWrap ? /* @__PURE__ */ React.createElement(CacheFields, {
    form
  }) : /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(CacheFields, {
    form
  })));
};
