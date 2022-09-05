import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
export const FormGroupField = ({
  label,
  children
}) => {
  const {t} = useTranslation("identity-providers");
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(label),
    fieldId: label,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `identity-providers-help:${label}`,
      fieldLabelId: `identity-providers:${label}`
    })
  }, children);
};
