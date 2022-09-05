import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
export const ScopePicker = ({clientId}) => {
  const {t} = useTranslation("clients");
  const {control} = useFormContext();
  const [open, setOpen] = useState(false);
  const [scopes, setScopes] = useState();
  const [search, setSearch] = useState("");
  const {adminClient} = useAdminClient();
  useFetch(() => {
    const params = {
      id: clientId,
      first: 0,
      max: 20,
      deep: false,
      name: search
    };
    return adminClient.clients.listAllScopes(params);
  }, (scopes2) => setScopes(scopes2.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: option.id,
    value: option
  }, option.name))), [search]);
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("authorizationScopes"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:scopes",
      fieldLabelId: "clients:scopes"
    }),
    fieldId: "scopes"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "scopes",
    defaultValue: [],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "scopes",
      variant: SelectVariant.typeaheadMulti,
      chipGroupProps: {
        numChips: 3,
        expandedText: t("common:hide"),
        collapsedText: t("common:showRemaining")
      },
      onToggle: (open2) => setOpen(open2),
      isOpen: open,
      selections: value.map((o) => o.name),
      onFilter: (_, value2) => {
        setSearch(value2);
        return scopes;
      },
      onSelect: (_, selectedValue) => {
        const option = typeof selectedValue === "string" ? selectedValue : selectedValue.name;
        const changedValue = value.find((o) => o.name === option) ? value.filter((item) => item.name !== option) : [...value, selectedValue];
        onChange(changedValue);
      },
      onClear: (event) => {
        event.stopPropagation();
        setSearch("");
        onChange([]);
      },
      "aria-label": t("authorizationScopes")
    }, scopes)
  }));
};
