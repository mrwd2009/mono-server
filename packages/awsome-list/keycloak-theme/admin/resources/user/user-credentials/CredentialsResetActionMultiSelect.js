import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {RequiredActionAlias} from "../../_snowpack/pkg/@keycloak/keycloak-admin-client/lib/defs/requiredActionProviderRepresentation.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
export const CredentialsResetActionMultiSelect = () => {
  const {t} = useTranslation("users");
  const {control} = useFormContext();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("resetActions"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:resetActions",
      fieldLabelId: "resetActions"
    }),
    fieldId: "actions"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "actions",
    defaultValue: [],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "actions",
      variant: SelectVariant.typeaheadMulti,
      chipGroupProps: {
        numChips: 3
      },
      menuAppendTo: "parent",
      onToggle: (open2) => setOpen(open2),
      isOpen: open,
      selections: value,
      onSelect: (_, selectedValue) => onChange(value.find((o) => o === selectedValue) ? value.filter((item) => item !== selectedValue) : [...value, selectedValue]),
      onClear: (event) => {
        event.stopPropagation();
        onChange([]);
      },
      typeAheadAriaLabel: t("resetActions")
    }, Object.values(RequiredActionAlias).map((action, index) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: index,
      value: action,
      "data-testid": `${action}-option`
    }, t(action))))
  }));
};
