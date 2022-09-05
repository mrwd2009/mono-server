import React, {useRef, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {Select, SelectOption, SelectVariant} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
export const ScopeSelect = ({
  clientId,
  resourceId,
  preSelected
}) => {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {
    control,
    setValue,
    formState: {errors}
  } = useFormContext();
  const [scopes, setScopes] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const firstUpdate = useRef(true);
  const toSelectOptions = (scopes2) => scopes2.map((scope) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: scope.id,
    value: scope.id
  }, scope.name));
  useFetch(async () => {
    if (!resourceId) {
      return adminClient.clients.listAllScopes(Object.assign({id: clientId, first: 0, max: 10, deep: false}, search === "" ? null : {name: search}));
    }
    if (resourceId && !firstUpdate.current) {
      setValue("scopes", []);
    }
    firstUpdate.current = false;
    return adminClient.clients.listScopesByResource({
      id: clientId,
      resourceName: resourceId
    });
  }, setScopes, [resourceId, search]);
  return /* @__PURE__ */ React.createElement(Controller, {
    name: "scopes",
    defaultValue: preSelected ? [preSelected] : [],
    control,
    rules: {validate: (value) => value.length > 0},
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "scopes",
      variant: SelectVariant.typeaheadMulti,
      onToggle: setOpen,
      onFilter: (_, filter) => {
        setSearch(filter);
        return toSelectOptions(scopes);
      },
      onClear: () => {
        onChange([]);
        setSearch("");
      },
      selections: value,
      onSelect: (_, selectedValue) => {
        const option = selectedValue.toString();
        const changedValue = value.find((p) => p === option) ? value.filter((p) => p !== option) : [...value, option];
        onChange(changedValue);
        setSearch("");
      },
      isOpen: open,
      "aria-labelledby": t("scopes"),
      validated: errors.scopes ? "error" : "default",
      isDisabled: !!preSelected,
      typeAheadAriaLabel: t("scopes")
    }, toSelectOptions(scopes))
  });
};
