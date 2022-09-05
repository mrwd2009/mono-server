import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Select,
  SelectOption,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FilterIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {
  AllClientScopes,
  clientScopeTypesSelectOptions
} from "../../components/client-scope/ClientScopeTypes.js";
export const PROTOCOLS = ["all", "saml", "openid-connect"];
export const nameFilter = (search = "") => (scope) => scope.name?.includes(search);
export const typeFilter = (type) => (scope) => type === AllClientScopes.none || scope.type === type;
export const protocolFilter = (protocol) => (scope) => protocol === "all" || scope.protocol === protocol;
export const SearchDropdown = ({
  searchType,
  withProtocol = false,
  onSelect
}) => {
  const {t} = useTranslation("clients");
  const [searchToggle, setSearchToggle] = useState(false);
  const createDropdown = (searchType2) => /* @__PURE__ */ React.createElement(DropdownItem, {
    key: searchType2,
    onClick: () => {
      onSelect(searchType2);
      setSearchToggle(false);
    }
  }, t(`clientScopeSearch.${searchType2}`));
  const options = [createDropdown("name"), createDropdown("type")];
  if (withProtocol) {
    options.push(createDropdown("protocol"));
  }
  return /* @__PURE__ */ React.createElement(Dropdown, {
    className: "keycloak__client-scopes__searchtype",
    toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
      id: "toggle-id",
      onToggle: setSearchToggle
    }, /* @__PURE__ */ React.createElement(FilterIcon, null), " ", t(`clientScopeSearch.${searchType}`)),
    isOpen: searchToggle,
    dropdownItems: options
  });
};
export const SearchToolbar = ({
  searchType,
  onSelect,
  type,
  onType,
  protocol,
  onProtocol
}) => {
  const {t} = useTranslation("client-scopes");
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, searchType === "type" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(SearchDropdown, {
    searchType,
    onSelect,
    withProtocol: !!protocol
  })), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Select, {
    className: "keycloak__client-scopes__searchtype",
    onToggle: setOpen,
    isOpen: open,
    selections: [
      type === AllClientScopes.none ? t("common:allTypes") : t(`common:clientScope.${type}`)
    ],
    onSelect: (_, value) => {
      onType(value);
      setOpen(false);
    }
  }, /* @__PURE__ */ React.createElement(SelectOption, {
    value: AllClientScopes.none
  }, t("common:allTypes")), /* @__PURE__ */ React.createElement(React.Fragment, null, clientScopeTypesSelectOptions(t))))), searchType === "protocol" && !!protocol && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(SearchDropdown, {
    searchType,
    onSelect,
    withProtocol: true
  })), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Select, {
    className: "keycloak__client-scopes__searchtype",
    onToggle: setOpen,
    isOpen: open,
    selections: [t(`protocolTypes.${protocol}`)],
    onSelect: (_, value) => {
      onProtocol?.(value);
      setOpen(false);
    }
  }, PROTOCOLS.map((type2) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: type2,
    value: type2
  }, t(`protocolTypes.${type2}`)))))));
};
