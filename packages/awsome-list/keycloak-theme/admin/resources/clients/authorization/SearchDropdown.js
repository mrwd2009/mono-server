import React, {useEffect} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  Button,
  Dropdown,
  DropdownToggle,
  Form,
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import useToggle from "../../utils/useToggle.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import "./search-dropdown.css.proxy.js";
export const SearchDropdown = ({
  types,
  search,
  onSearch,
  isResource = false
}) => {
  const {t} = useTranslation("clients");
  const {
    register,
    control,
    reset,
    formState: {isDirty},
    handleSubmit
  } = useForm({mode: "onChange"});
  const [open, toggle] = useToggle();
  const [typeOpen, toggleType] = useToggle();
  const submit = (form) => {
    toggle();
    onSearch(form);
  };
  useEffect(() => reset(search), [search]);
  const typeOptions = (value) => [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: "empty",
      value: ""
    }, t("allTypes")),
    ...(types || []).map((type) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: type.type === value,
      key: type.type,
      value: type.type
    }, type.name))
  ];
  return /* @__PURE__ */ React.createElement(Dropdown, {
    "data-testid": "searchdropdown_dorpdown",
    className: "pf-u-ml-md",
    toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
      onToggle: toggle,
      className: "keycloak__client_authentication__searchdropdown"
    }, t("searchForPermission")),
    isOpen: open
  }, /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true,
    className: "keycloak__client_authentication__searchdropdown_form",
    onSubmit: handleSubmit(submit)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    fieldId: "name"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register,
    type: "text",
    id: "name",
    name: "name",
    "data-testid": "searchdropdown_name"
  })), isResource && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:type"),
    fieldId: "type"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register,
    type: "text",
    id: "type",
    name: "type",
    "data-testid": "searchdropdown_type"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("uris"),
    fieldId: "uri"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register,
    type: "text",
    id: "uri",
    name: "uri",
    "data-testid": "searchdropdown_uri"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("owner"),
    fieldId: "owner"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register,
    type: "text",
    id: "owner",
    name: "owner",
    "data-testid": "searchdropdown_owner"
  }))), !isResource && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("resource"),
    fieldId: "resource"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register,
    type: "text",
    id: "resource",
    name: "resource",
    "data-testid": "searchdropdown_resource"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("scope"),
    fieldId: "scope"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register,
    type: "text",
    id: "scope",
    name: "scope",
    "data-testid": "searchdropdown_scope"
  })), !isResource && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:type"),
    fieldId: "type"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "type",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "type",
      onToggle: toggleType,
      onSelect: (event, value2) => {
        event.stopPropagation();
        onChange(value2);
        toggleType();
      },
      selections: value || t("allTypes"),
      variant: SelectVariant.single,
      "aria-label": t("common:type"),
      isOpen: typeOpen
    }, typeOptions(value))
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "search-btn",
    isDisabled: !isDirty
  }, t("common:search")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    "data-testid": "revert-btn",
    onClick: () => onSearch({})
  }, t("common:clear")))));
};
