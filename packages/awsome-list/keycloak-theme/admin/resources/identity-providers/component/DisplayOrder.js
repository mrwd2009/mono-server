import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, TextInput} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
export const DisplayOrder = () => {
  const {t} = useTranslation("identity-providers");
  const {control} = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("displayOrder"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:displayOrder",
      fieldLabelId: "identity-providers:displayOrder"
    }),
    fieldId: "kc-display-order"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.guiOrder",
    control,
    defaultValue: "",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TextInput, {
      id: "kc-display-order",
      type: "number",
      value,
      "data-testid": "displayOrder",
      min: 0,
      onChange: (value2) => {
        const num = Number(value2);
        onChange(value2 === "" ? value2 : num < 0 ? 0 : num);
      }
    })
  }));
};
