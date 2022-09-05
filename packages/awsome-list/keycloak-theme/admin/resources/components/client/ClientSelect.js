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
import {HelpItem} from "../help-enabler/HelpItem.js";
export const ClientSelect = ({
  name,
  label,
  helpText,
  defaultValue,
  namespace,
  isDisabled = false,
  required = false
}) => {
  const {t} = useTranslation(namespace);
  const {control, errors} = useFormContext();
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const {adminClient} = useAdminClient();
  useFetch(() => {
    const params = {
      max: 20
    };
    if (search) {
      params.clientId = search;
      params.search = true;
    }
    return adminClient.clients.find(params);
  }, (clients2) => setClients(clients2), [search]);
  const convert = (clients2) => clients2.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: option.id,
    value: option.clientId
  }));
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(label),
    isRequired: required,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t(helpText),
      fieldLabelId: `${namespace}:${label}`
    }),
    fieldId: name,
    validated: errors[name] ? "error" : "default",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(Controller, {
    name,
    defaultValue: defaultValue || "",
    control,
    rules: required ? {required: true} : {},
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: name,
      variant: SelectVariant.typeahead,
      onToggle: (open2) => setOpen(open2),
      isOpen: open,
      isDisabled,
      selections: value,
      onFilter: (_, value2) => {
        setSearch(value2);
        return convert(clients);
      },
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setOpen(false);
      },
      "aria-label": t(label)
    }, convert(clients))
  }));
};
