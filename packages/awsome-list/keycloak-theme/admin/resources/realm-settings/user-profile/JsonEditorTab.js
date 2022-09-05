import {CodeEditor, Language} from "../../_snowpack/pkg/@patternfly/react-code-editor.js";
import {ActionGroup, Button, Form, PageSection} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {prettyPrintJSON} from "../../util.js";
import {useUserProfile} from "./UserProfileContext.js";
export const JsonEditorTab = () => {
  const {config, save, isSaving} = useUserProfile();
  const {t} = useTranslation();
  const {addError} = useAlerts();
  const [editor, setEditor] = useState();
  useEffect(() => resetCode(), [config, editor]);
  function resetCode() {
    editor?.setValue(config ? prettyPrintJSON(config) : "");
  }
  function handleSave() {
    const value = editor?.getValue();
    if (!value) {
      return;
    }
    try {
      save(JSON.parse(value));
    } catch (error) {
      addError("realm-settings:invalidJsonError", error);
      return;
    }
  }
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(CodeEditor, {
    language: Language.json,
    height: "30rem",
    onEditorDidMount: (editor2) => setEditor(editor2),
    isLanguageLabelVisible: true
  }), /* @__PURE__ */ React.createElement(Form, null, /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    onClick: handleSave,
    isDisabled: isSaving
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: resetCode,
    isDisabled: isSaving
  }, t("common:revert")))));
};
