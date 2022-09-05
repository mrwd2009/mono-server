import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  Button,
  Divider,
  FormGroup,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {TimeSelector} from "../../components/time-selector/TimeSelector.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
export const EventConfigForm = ({
  type,
  form,
  reset,
  clear
}) => {
  const {t} = useTranslation("realm-settings");
  const {
    control,
    watch,
    setValue,
    formState: {isDirty}
  } = form;
  const eventKey = type === "admin" ? "adminEventsEnabled" : "eventsEnabled";
  const eventsEnabled = watch(eventKey);
  const [toggleDisableDialog, DisableConfirm] = useConfirmDialog({
    titleKey: "realm-settings:events-disable-title",
    messageKey: "realm-settings:events-disable-confirm",
    continueButtonLabel: "realm-settings:confirm",
    onConfirm: () => setValue(eventKey, false)
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DisableConfirm, null), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("saveEvents"),
    fieldId: eventKey,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `realm-settings-help:save-${type}-events`,
      fieldLabelId: "realm-settings:saveEvents"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: eventKey,
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      "data-testid": eventKey,
      id: `${eventKey}-switch`,
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange: (value2) => {
        if (!value2) {
          toggleDisableDialog();
        } else {
          onChange(value2);
        }
      }
    })
  })), eventsEnabled && /* @__PURE__ */ React.createElement(React.Fragment, null, type === "admin" && /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("includeRepresentation"),
    fieldId: "includeRepresentation",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:includeRepresentation",
      fieldLabelId: "realm-settings:includeRepresentation"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "adminEventsDetailsEnabled",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      "data-testid": "includeRepresentation",
      id: "includeRepresentation",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  })), type === "user" && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("expiration"),
    fieldId: "expiration",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:expiration",
      fieldLabelId: "realm-settings:expiration"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "eventsExpiration",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      value,
      onChange,
      units: ["minute", "hour", "day"]
    })
  }))), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    id: `save-${type}`,
    "data-testid": `save-${type}`,
    isDisabled: !isDirty
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: reset
  }, t("common:revert"))), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(FormGroup, {
    label: type === "user" ? t("clearUserEvents") : t("clearAdminEvents"),
    fieldId: `clear-${type}-events`,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `realm-settings-help:${type}-clearEvents`,
      fieldLabelId: `realm-settings:clear-${type}-events`
    })
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "danger",
    id: `clear-${type}-events`,
    "data-testid": `clear-${type}-events`,
    onClick: () => clear()
  }, type === "user" ? t("clearUserEvents") : t("clearAdminEvents"))));
};
