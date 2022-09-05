import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FileUpload, FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
export const FileComponent = ({
  name,
  label,
  helpText,
  defaultValue,
  isDisabled = false
}) => {
  const {t} = useTranslation("dynamic");
  const {control} = useFormContext();
  const [filename, setFilename] = useState("");
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(label),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t(helpText),
      fieldLabelId: `dynamic:${label}`
    }),
    fieldId: name
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: `config.${name}`,
    control,
    defaultValue: defaultValue || "",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(FileUpload, {
      id: name,
      value,
      filename,
      isDisabled,
      onChange: (value2, filename2) => {
        onChange(value2);
        setFilename(filename2);
      }
    })
  }));
};
