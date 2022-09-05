import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
import {MultiLineInput} from "../multi-line-input/MultiLineInput.js";
export const MultiValuedStringComponent = ({
  name,
  label,
  defaultValue,
  helpText,
  isDisabled = false
}) => {
  const {t} = useTranslation("dynamic");
  const fieldName = `config.${name}`;
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(label),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t(helpText),
      fieldLabelId: `dynamic:${label}`
    }),
    fieldId: name
  }, /* @__PURE__ */ React.createElement(MultiLineInput, {
    name: fieldName,
    isDisabled,
    defaultValue: [defaultValue],
    addButtonLabel: t("addMultivaluedLabel", {
      fieldLabel: t(label).toLowerCase()
    })
  }));
};
