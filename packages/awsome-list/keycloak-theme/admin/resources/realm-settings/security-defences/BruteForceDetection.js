import React, {useEffect} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, FormProvider, useForm, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  Button,
  FormGroup,
  NumberInput,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {Time} from "./Time.js";
import {convertToFormValues} from "../../util.js";
export const BruteForceDetection = ({
  realm,
  save
}) => {
  const {t} = useTranslation("realm-settings");
  const form = useForm({shouldUnregister: false});
  const {
    setValue,
    handleSubmit,
    control,
    formState: {isDirty}
  } = form;
  const enable = useWatch({
    control,
    name: "bruteForceProtected"
  });
  const permanentLockout = useWatch({
    control,
    name: "permanentLockout"
  });
  const setupForm = () => convertToFormValues(realm, setValue);
  useEffect(setupForm, []);
  return /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true,
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:enabled"),
    fieldId: "bruteForceProtected",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "bruteForceProtected",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "bruteForceProtected",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  })), enable && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("failureFactor"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:failureFactor",
      fieldLabelId: "realm-settings:failureFactor"
    }),
    fieldId: "failureFactor"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "failureFactor",
    defaultValue: 0,
    control,
    rules: {required: true},
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(NumberInput, {
      type: "text",
      id: "failureFactor",
      value,
      onPlus: () => onChange(value + 1),
      onMinus: () => onChange(value - 1),
      onChange: (event) => onChange(Number(event.target.value))
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("permanentLockout"),
    fieldId: "permanentLockout",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "permanentLockout",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "permanentLockout",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  })), !permanentLockout && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Time, {
    name: "waitIncrementSeconds"
  }), /* @__PURE__ */ React.createElement(Time, {
    name: "maxFailureWaitSeconds"
  }), /* @__PURE__ */ React.createElement(Time, {
    name: "maxDeltaTimeSeconds"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("quickLoginCheckMilliSeconds"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:quickLoginCheckMilliSeconds",
      fieldLabelId: "realm-settings:quickLoginCheckMilliSeconds"
    }),
    fieldId: "quickLoginCheckMilliSeconds"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "quickLoginCheckMilliSeconds",
    defaultValue: 0,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(NumberInput, {
      type: "text",
      id: "quickLoginCheckMilliSeconds",
      value,
      onPlus: () => onChange(value + 1),
      onMinus: () => onChange(value - 1),
      onChange: (event) => onChange(Number(event.target.value))
    })
  })), /* @__PURE__ */ React.createElement(Time, {
    name: "minimumQuickLoginWaitSeconds"
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "brute-force-tab-save",
    isDisabled: !isDirty
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: setupForm
  }, t("common:revert")))));
};
