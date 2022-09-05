import React from "../../_snowpack/pkg/react.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {CodeEditor, Language} from "../../_snowpack/pkg/@patternfly/react-code-editor.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
export const ScriptComponent = ({
  name,
  label,
  helpText,
  defaultValue,
  isDisabled = false
}) => {
  const {t} = useTranslation("dynamic");
  const {control} = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(label),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: /* @__PURE__ */ React.createElement("span", {
        style: {whiteSpace: "pre-wrap"}
      }, helpText),
      fieldLabelId: `dynamic:${label}`
    }),
    fieldId: name
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: `config.${name}`,
    defaultValue,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(CodeEditor, {
      id: name,
      "data-testid": name,
      isReadOnly: isDisabled,
      type: "text",
      onChange,
      code: value,
      height: "600px",
      language: Language.javascript
    })
  }));
};
