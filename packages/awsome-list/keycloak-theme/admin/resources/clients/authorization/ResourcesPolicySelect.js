import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {Select, SelectOption, SelectVariant} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
const typeMapping = {
  resources: {
    searchFunction: "listResources",
    fetchFunction: "getAssociatedResources"
  },
  policies: {
    searchFunction: "listPolicies",
    fetchFunction: "getAssociatedPolicies"
  }
};
export const ResourcesPolicySelect = ({
  name,
  clientId,
  permissionId,
  variant = SelectVariant.typeaheadMulti,
  preSelected,
  isRequired = false
}) => {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {
    control,
    formState: {errors}
  } = useFormContext();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const functions = typeMapping[name];
  const convert = (p) => ({
    id: "_id" in p ? p._id : "id" in p ? p.id : void 0,
    name: p.name
  });
  useFetch(async () => {
    const params = Object.assign({id: clientId, first: 0, max: 10, permission: "false"}, search === "" ? null : {name: search});
    return (await Promise.all([
      adminClient.clients[functions.searchFunction](params),
      permissionId ? adminClient.clients[functions.fetchFunction]({
        id: clientId,
        permissionId
      }) : Promise.resolve([])
    ])).flat().map(convert).filter(({id}, index, self) => index === self.findIndex(({id: otherId}) => id === otherId));
  }, setItems, [search]);
  const toSelectOptions = () => items.map((p) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: p.id,
    value: p.id
  }, p.name));
  return /* @__PURE__ */ React.createElement(Controller, {
    name,
    defaultValue: preSelected ? [preSelected] : [],
    control,
    rules: {validate: (value) => !isRequired || value.length > 0},
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: name,
      variant,
      onToggle: setOpen,
      onFilter: (_, filter) => {
        setSearch(filter);
        return toSelectOptions();
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
      "aria-labelledby": t(name),
      isDisabled: !!preSelected,
      validated: errors[name] ? "error" : "default",
      typeAheadAriaLabel: t(name)
    }, toSelectOptions())
  });
};
