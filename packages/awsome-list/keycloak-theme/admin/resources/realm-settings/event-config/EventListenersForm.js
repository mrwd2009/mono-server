import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  Button,
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useServerInfo} from "../../context/server-info/ServerInfoProvider.js";
export const EventListenersForm = ({
  form,
  reset
}) => {
  const {t} = useTranslation("realm-settings");
  const {
    control,
    formState: {isDirty}
  } = form;
  const [selectEventListenerOpen, setSelectEventListenerOpen] = useState(false);
  const serverInfo = useServerInfo();
  const eventListeners = serverInfo.providers?.eventsListener.providers;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("eventListeners"),
    fieldId: "kc-eventListeners",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t("eventListenersHelpText"),
      fieldLabelId: "realm-settings:eventListeners"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "eventsListeners",
    defaultValue: "",
    control,
    render: ({
      onChange,
      value
    }) => /* @__PURE__ */ React.createElement(Select, {
      name: "eventsListeners",
      className: "kc_eventListeners_select",
      "data-testid": "eventListeners-select",
      chipGroupProps: {
        numChips: 3,
        expandedText: t("common:hide"),
        collapsedText: t("common:showRemaining")
      },
      variant: SelectVariant.typeaheadMulti,
      typeAheadAriaLabel: "Select",
      onToggle: (isOpen) => setSelectEventListenerOpen(isOpen),
      selections: value,
      onSelect: (_, selectedValue) => {
        const option = selectedValue.toString();
        const changedValue = value.includes(option) ? value.filter((item) => item !== option) : [...value, option];
        onChange(changedValue);
      },
      onClear: (operation) => {
        operation.stopPropagation();
        onChange([]);
      },
      isOpen: selectEventListenerOpen,
      "aria-labelledby": "eventsListeners"
    }, Object.keys(eventListeners).map((event) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: event,
      value: event
    })))
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "saveEventListenerBtn",
    isDisabled: !isDirty
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    "data-testid": "revertEventListenerBtn",
    onClick: reset
  }, t("common:revert"))));
};
