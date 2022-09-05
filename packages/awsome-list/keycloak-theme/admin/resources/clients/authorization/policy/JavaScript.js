import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../../_snowpack/pkg/react-hook-form.js";
import {FormGroup} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {CodeEditor, Language} from "../../../_snowpack/pkg/@patternfly/react-code-editor.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
export const JavaScript = () => {
  const {t} = useTranslation("clients");
  const {control} = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("code"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:policyCode",
      fieldLabelId: "clients:code"
    }),
    fieldId: "code",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "code",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(CodeEditor, {
      id: "code",
      "data-testid": "code",
      type: "text",
      onChange,
      code: value,
      height: "600px",
      language: Language.javascript
    })
  }));
};
