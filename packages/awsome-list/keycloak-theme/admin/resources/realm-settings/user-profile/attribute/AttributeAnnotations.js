import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {FormGroup, Grid, GridItem} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../../components/form-access/FormAccess.js";
import {KeyValueInput} from "../../../components/key-value-form/KeyValueInput.js";
import "../../realm-settings-section.css.proxy.js";
export const AttributeAnnotations = () => {
  const {t} = useTranslation("realm-settings");
  return /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("annotations"),
    fieldId: "kc-annotations",
    className: "kc-annotations-label"
  }, /* @__PURE__ */ React.createElement(Grid, {
    className: "kc-annotations"
  }, /* @__PURE__ */ React.createElement(GridItem, null, /* @__PURE__ */ React.createElement(KeyValueInput, {
    name: "annotations"
  })))));
};
