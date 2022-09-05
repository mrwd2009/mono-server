import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormProvider} from "../../_snowpack/pkg/react-hook-form.js";
import {ActionGroup, Button} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {KeyValueInput} from "./KeyValueInput.js";
import {FormAccess} from "../form-access/FormAccess.js";
export const AttributesForm = ({
  form,
  reset,
  save,
  fineGrainedAccess
}) => {
  const {t} = useTranslation("roles");
  const noSaveCancelButtons = !save && !reset;
  const {
    formState: {isDirty},
    handleSubmit
  } = form;
  return /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    onSubmit: save ? handleSubmit(save) : void 0,
    fineGrainedAccess
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(KeyValueInput, {
    name: "attributes"
  })), !noSaveCancelButtons && /* @__PURE__ */ React.createElement(ActionGroup, {
    className: "kc-attributes__action-group"
  }, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "save-attributes",
    variant: "primary",
    type: "submit",
    isDisabled: !isDirty
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    onClick: reset,
    variant: "link",
    isDisabled: !isDirty
  }, t("common:revert"))));
};
