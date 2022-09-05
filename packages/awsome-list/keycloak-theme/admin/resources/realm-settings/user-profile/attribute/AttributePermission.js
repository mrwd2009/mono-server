import React from "../../../_snowpack/pkg/react.js";
import {Checkbox, FormGroup, Grid, GridItem} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
import {Controller, useFormContext} from "../../../_snowpack/pkg/react-hook-form.js";
import {FormAccess} from "../../../components/form-access/FormAccess.js";
import "../../realm-settings-section.css.proxy.js";
const Permissions = ({name}) => {
  const {t} = useTranslation("realm-settings");
  const {control} = useFormContext();
  return /* @__PURE__ */ React.createElement(Grid, null, /* @__PURE__ */ React.createElement(Controller, {
    name: `permissions.${name}`,
    control,
    defaultValue: [],
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(GridItem, {
      lg: 4,
      sm: 6
    }, /* @__PURE__ */ React.createElement(Checkbox, {
      id: `user-${name}`,
      label: t("user"),
      value: "user",
      "data-testid": `user-${name}`,
      isChecked: value.includes("user"),
      onChange: () => {
        const option = "user";
        const changedValue = value.includes(option) ? value.filter((item) => item !== option) : [option];
        onChange(changedValue);
      },
      isDisabled: value.includes("admin")
    })), /* @__PURE__ */ React.createElement(GridItem, {
      lg: 8,
      sm: 6
    }, /* @__PURE__ */ React.createElement(Checkbox, {
      id: `admin-${name}`,
      label: t("admin"),
      value: "admin",
      "data-testid": `admin-${name}`,
      isChecked: value.includes("admin"),
      onChange: () => {
        const option = "admin";
        const changedValue = value.includes(option) ? value.filter((item) => item !== option) : ["user", option];
        onChange(changedValue);
      }
    })))
  }));
};
export const AttributePermission = () => {
  const {t} = useTranslation("realm-settings");
  return /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("whoCanEdit"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:whoCanEditHelp",
      fieldLabelId: "realm-settings:whoCanEdit"
    }),
    fieldId: "kc-who-can-edit"
  }, /* @__PURE__ */ React.createElement(Permissions, {
    name: "edit"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("whoCanView"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:whoCanViewHelp",
      fieldLabelId: "realm-settings:whoCanView"
    }),
    fieldId: "kc-who-can-view"
  }, /* @__PURE__ */ React.createElement(Permissions, {
    name: "view"
  })));
};
