import React, {useState} from "../../../_snowpack/pkg/react.js";
import {Controller, useFormContext} from "../../../_snowpack/pkg/react-hook-form.js";
import {
  SelectOption,
  FormGroup,
  Select,
  SelectVariant
} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
import {useAdminClient, useFetch} from "../../../context/auth/AdminClient.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
export const Client = () => {
  const {t} = useTranslation("clients");
  const {
    control,
    getValues,
    formState: {errors}
  } = useFormContext();
  const values = getValues("clients");
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const {adminClient} = useAdminClient();
  useFetch(async () => {
    const params = {
      max: 20
    };
    if (search) {
      params.clientId = search;
      params.search = true;
    }
    if (values?.length && !search) {
      return await Promise.all(values.map((id) => adminClient.clients.findOne({id})));
    }
    return await adminClient.clients.find(params);
  }, setClients, [search]);
  const convert = (clients2) => clients2.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: option.id,
    value: option.id,
    selected: values?.includes(option.id)
  }, option.clientId));
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clients"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:policyClient",
      fieldLabelId: "clients:client"
    }),
    fieldId: "clients",
    helperTextInvalid: t("requiredClient"),
    validated: errors.clients ? "error" : "default",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "clients",
    defaultValue: [],
    control,
    rules: {
      validate: (value) => value.length > 0
    },
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "clients",
      variant: SelectVariant.typeaheadMulti,
      onToggle: (open2) => setOpen(open2),
      isOpen: open,
      selections: value,
      onFilter: (_, value2) => {
        setSearch(value2);
        return convert(clients);
      },
      onSelect: (_, v) => {
        const option = v.toString();
        if (value.includes(option)) {
          onChange(value.filter((item) => item !== option));
        } else {
          onChange([...value, option]);
        }
        setOpen(false);
      },
      "aria-label": t("clients")
    }, convert(clients))
  }));
};
