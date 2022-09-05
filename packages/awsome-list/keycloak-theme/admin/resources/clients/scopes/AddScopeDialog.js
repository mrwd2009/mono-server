import React, {useMemo, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Button,
  ButtonVariant,
  Dropdown,
  DropdownToggle,
  Modal,
  ModalVariant,
  DropdownDirection,
  DropdownItem,
  Select,
  SelectOption,
  SelectVariant,
  SelectDirection
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {
  CaretDownIcon,
  CaretUpIcon,
  FilterIcon
} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {
  clientScopeTypesDropdown
} from "../../components/client-scope/ClientScopeTypes.js";
import {KeycloakDataTable} from "../../components/table-toolbar/KeycloakDataTable.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import {getProtocolName} from "../utils.js";
import useToggle from "../../utils/useToggle.js";
import "./client-scopes.css.proxy.js";
var FilterType;
(function(FilterType2) {
  FilterType2["Name"] = "Name";
  FilterType2["Protocol"] = "Protocol";
})(FilterType || (FilterType = {}));
var ProtocolType;
(function(ProtocolType2) {
  ProtocolType2["All"] = "All";
  ProtocolType2["SAML"] = "SAML";
  ProtocolType2["OpenIDConnect"] = "OpenID Connect";
})(ProtocolType || (ProtocolType = {}));
export const AddScopeDialog = ({
  clientScopes: scopes,
  clientName,
  open,
  toggleDialog,
  onAdd,
  isClientScopesConditionType
}) => {
  const {t} = useTranslation("clients");
  const [addToggle, setAddToggle] = useState(false);
  const [rows, setRows] = useState([]);
  const [filterType, setFilterType] = useState(FilterType.Name);
  const [protocolType, setProtocolType] = useState(ProtocolType.All);
  const [isFilterTypeDropdownOpen, toggleIsFilterTypeDropdownOpen] = useToggle();
  const [isProtocolTypeDropdownOpen, toggleIsProtocolTypeDropdownOpen] = useToggle(false);
  const clientScopes = useMemo(() => {
    if (protocolType === ProtocolType.OpenIDConnect) {
      return scopes.filter((item) => item.protocol === "openid-connect");
    } else if (protocolType === ProtocolType.SAML) {
      return scopes.filter((item) => item.protocol === "saml");
    }
    return scopes;
  }, [scopes, filterType, protocolType]);
  const action = (scope) => {
    const scopes2 = rows.map((row) => {
      return {scope: row, type: scope};
    });
    onAdd(scopes2);
    setAddToggle(false);
    toggleDialog();
  };
  const onFilterTypeDropdownSelect = (filterType2) => {
    if (filterType2 === FilterType.Name) {
      setFilterType(FilterType.Protocol);
    } else if (filterType2 === FilterType.Protocol) {
      setFilterType(FilterType.Name);
      setProtocolType(ProtocolType.All);
    }
    toggleIsFilterTypeDropdownOpen();
  };
  const onProtocolTypeDropdownSelect = (protocolType2) => {
    if (protocolType2 === ProtocolType.SAML) {
      setProtocolType(ProtocolType.SAML);
    } else if (protocolType2 === ProtocolType.OpenIDConnect) {
      setProtocolType(ProtocolType.OpenIDConnect);
    } else if (protocolType2 === ProtocolType.All) {
      setProtocolType(ProtocolType.All);
    }
    toggleIsProtocolTypeDropdownOpen();
  };
  const protocolTypeOptions = [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: 1,
      value: ProtocolType.SAML
    }, t("protocolTypes.saml")),
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: 2,
      value: ProtocolType.OpenIDConnect
    }, t("protocolTypes.openIdConnect")),
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: 3,
      value: ProtocolType.All,
      isPlaceholder: true
    }, t("protocolTypes.all"))
  ];
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.medium,
    title: isClientScopesConditionType ? t("addClientScope") : t("addClientScopesTo", {clientName}),
    isOpen: open,
    onClose: toggleDialog,
    actions: isClientScopesConditionType ? [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-add",
        "data-testid": "confirm",
        key: "add",
        variant: ButtonVariant.primary,
        onClick: () => {
          const scopes2 = rows.map((scope) => ({scope}));
          onAdd(scopes2);
          toggleDialog();
        }
      }, t("common:add")),
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-cancel",
        "data-testid": "cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: () => {
          setRows([]);
          toggleDialog();
        }
      }, t("common:cancel"))
    ] : [
      /* @__PURE__ */ React.createElement(Dropdown, {
        className: "keycloak__client-scopes-add__add-dropdown",
        id: "add-dropdown",
        key: "add-dropdown",
        direction: DropdownDirection.up,
        isOpen: addToggle,
        toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
          isDisabled: rows.length === 0,
          onToggle: () => setAddToggle(!addToggle),
          isPrimary: true,
          toggleIndicator: CaretUpIcon,
          id: "add-scope-toggle"
        }, t("common:add")),
        dropdownItems: clientScopeTypesDropdown(t, action)
      }),
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: () => {
          setRows([]);
          toggleDialog();
        }
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    loader: clientScopes,
    ariaLabelKey: "client-scopes:chooseAMapperType",
    searchPlaceholderKey: filterType === FilterType.Name ? "client-scopes:searchFor" : void 0,
    isSearching: filterType !== FilterType.Name,
    searchTypeComponent: /* @__PURE__ */ React.createElement(Dropdown, {
      onSelect: () => {
        onFilterTypeDropdownSelect(filterType);
      },
      "data-testid": "filter-type-dropdown",
      toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
        id: "toggle-id-9",
        onToggle: toggleIsFilterTypeDropdownOpen,
        toggleIndicator: CaretDownIcon,
        icon: /* @__PURE__ */ React.createElement(FilterIcon, null)
      }, filterType),
      isOpen: isFilterTypeDropdownOpen,
      dropdownItems: [
        /* @__PURE__ */ React.createElement(DropdownItem, {
          "data-testid": "filter-type-dropdown-item",
          key: "filter-type"
        }, filterType === FilterType.Name ? t("protocol") : t("common:name"))
      ]
    }),
    toolbarItem: filterType === FilterType.Protocol && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Dropdown, {
      onSelect: () => {
        onFilterTypeDropdownSelect(filterType);
      },
      "data-testid": "filter-type-dropdown",
      toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
        id: "toggle-id-9",
        onToggle: toggleIsFilterTypeDropdownOpen,
        toggleIndicator: CaretDownIcon,
        icon: /* @__PURE__ */ React.createElement(FilterIcon, null)
      }, filterType),
      isOpen: isFilterTypeDropdownOpen,
      dropdownItems: [
        /* @__PURE__ */ React.createElement(DropdownItem, {
          "data-testid": "filter-type-dropdown-item",
          key: "filter-type"
        }, t("common:name"))
      ]
    }), /* @__PURE__ */ React.createElement(Select, {
      variant: SelectVariant.single,
      className: "kc-protocolType-select",
      "aria-label": "Select Input",
      onToggle: toggleIsProtocolTypeDropdownOpen,
      onSelect: (_, value) => onProtocolTypeDropdownSelect(value.toString()),
      selections: protocolType,
      isOpen: isProtocolTypeDropdownOpen,
      direction: SelectDirection.down
    }, protocolTypeOptions)),
    canSelectAll: true,
    onSelect: (rows2) => setRows(rows2),
    columns: [
      {
        name: "name"
      },
      {
        name: "protocol",
        displayKey: "clients:protocol",
        cellRenderer: (client) => getProtocolName(t, client.protocol ?? "openid-connect")
      },
      {
        name: "description"
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("emptyAddClientScopes"),
      instructions: t("emptyAddClientScopesInstructions")
    })
  }));
};
