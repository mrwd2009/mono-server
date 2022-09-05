import React from "../../_snowpack/pkg/react.js";
import {Language} from "../../_snowpack/pkg/@patternfly/react-code-editor.js";
import {FileUploadForm} from "./FileUploadForm.js";
export const JsonFileUpload = ({onChange, ...props}) => {
  const handleChange = (value) => {
    try {
      onChange(JSON.parse(value));
    } catch (error) {
      onChange({});
      console.warn("Invalid json, ignoring value using {}");
    }
  };
  return /* @__PURE__ */ React.createElement(FileUploadForm, {
    ...props,
    language: Language.json,
    extension: ".json",
    onChange: handleChange
  });
};
