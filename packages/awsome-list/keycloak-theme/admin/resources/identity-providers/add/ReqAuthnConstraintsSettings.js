import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {MultiLineInput} from "../../components/multi-line-input/MultiLineInput.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
const comparisonValues = ["exact", "minimum", "maximum", "better"];
export const ReqAuthnConstraints = () => {
  const {t} = useTranslation("identity-providers");
  const {control} = useFormContext();
  const [comparisonOpen, setComparisonOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("comparison"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:comparison",
      fieldLabelId: "identity-providers:comparison"
    }),
    fieldId: "comparison"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.authnContextComparisonType",
    defaultValue: comparisonValues[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "comparison",
      required: true,
      direction: "up",
      onToggle: (isExpanded) => setComparisonOpen(isExpanded),
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setComparisonOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("comparison"),
      isOpen: comparisonOpen
    }, comparisonValues.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option === value,
      key: option,
      value: option
    }, t(option))))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("authnContextClassRefs"),
    fieldId: "kc-authnContextClassRefs",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:authnContextClassRefs",
      fieldLabelId: "authnContextClassRefs"
    })
  }, /* @__PURE__ */ React.createElement(MultiLineInput, {
    name: "config.authnContextClassRefs",
    "aria-label": t("identify-providers:authnContextClassRefs"),
    addButtonLabel: "identity-providers:addAuthnContextClassRef",
    "data-testid": "classref-field"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("authnContextDeclRefs"),
    fieldId: "kc-authnContextDeclRefs",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:authnContextDeclRefs",
      fieldLabelId: "authnContextDeclRefs"
    })
  }, /* @__PURE__ */ React.createElement(MultiLineInput, {
    name: "config.authnContextDeclRefs",
    "aria-label": t("identify-providers:authnContextDeclRefs"),
    addButtonLabel: "identity-providers:addAuthnContextDeclRef",
    "data-testid": "declref-field"
  })));
};
