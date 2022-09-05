import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  SelectOption,
  FormGroup,
  Select,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
import useToggle from "../../utils/useToggle.js";
export const UserSelect = ({
  name,
  label,
  helpText,
  defaultValue,
  isRequired,
  variant = SelectVariant.typeaheadMulti
}) => {
  const {t} = useTranslation("clients");
  const {
    control,
    getValues,
    formState: {errors}
  } = useFormContext();
  const values = getValues(name);
  const [open, toggleOpen] = useToggle();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const {adminClient} = useAdminClient();
  useFetch(() => {
    const params = {
      max: 20
    };
    if (search) {
      params.name = search;
    }
    if (values?.length && !search) {
      return Promise.all(values.map((id) => adminClient.users.findOne({id})));
    }
    return adminClient.users.find(params);
  }, setUsers, [search]);
  const convert = (clients) => clients.filter((c) => c !== void 0).map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: option.id,
    value: option.id,
    selected: values?.includes(option.id)
  }, option.username));
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(label),
    isRequired,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText,
      fieldLabelId: `clients:${label}`
    }),
    fieldId: name,
    validated: errors[name] ? "error" : "default",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(Controller, {
    name,
    defaultValue,
    control,
    rules: isRequired && variant === SelectVariant.typeaheadMulti ? {validate: (value) => value.length > 0} : isRequired ? {required: true} : {},
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: name,
      variant,
      placeholderText: t("selectAUser"),
      onToggle: toggleOpen,
      isOpen: open,
      selections: value,
      onFilter: (_, value2) => {
        setSearch(value2);
        return convert(users);
      },
      onSelect: (_, v) => {
        const option = v.toString();
        if (value.includes(option)) {
          onChange(value.filter((item) => item !== option));
        } else {
          onChange([...value, option]);
        }
        toggleOpen();
      },
      "aria-label": t(name)
    }, convert(users))
  }));
};
