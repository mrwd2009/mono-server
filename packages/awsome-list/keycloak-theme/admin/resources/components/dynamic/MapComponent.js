import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
import {KeyValueInput} from "../key-value-form/KeyValueInput.js";
export const MapComponent = ({name, label, helpText}) => {
  const {t} = useTranslation("dynamic");
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(label),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t(helpText),
      fieldLabelId: `dynamic:${label}`
    }),
    fieldId: name
  }, /* @__PURE__ */ React.createElement(KeyValueInput, {
    name: `config.${name}`
  }));
};
