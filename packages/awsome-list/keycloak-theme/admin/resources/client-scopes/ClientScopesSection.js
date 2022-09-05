import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Link} from "../_snowpack/pkg/react-router-dom.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownItem,
  KebabToggle,
  PageSection,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {cellWidth} from "../_snowpack/pkg/@patternfly/react-table.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {emptyFormatter} from "../util.js";
import useLocaleSort, {mapByKey} from "../utils/useLocaleSort.js";
import {
  CellDropdown,
  ClientScope,
  AllClientScopes,
  changeScope,
  removeScope
} from "../components/client-scope/ClientScopeTypes.js";
import {ChangeTypeDropdown} from "./ChangeTypeDropdown.js";
import {toNewClientScope} from "./routes/NewClientScope.js";
import {toClientScope} from "./routes/ClientScope.js";
import {
  nameFilter,
  protocolFilter,
  SearchDropdown,
  SearchToolbar,
  typeFilter
} from "./details/SearchFilter.js";
import {getProtocolName} from "../clients/utils.js";
import helpUrls from "../help-urls.js";
import "./client-scope.css.proxy.js";
export default function ClientScopesSection() {
  const {realm} = useRealm();
  const {t} = useTranslation("client-scopes");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [kebabOpen, setKebabOpen] = useState(false);
  const [selectedScopes, setSelectedScopes] = useState([]);
  const [searchType, setSearchType] = useState("name");
  const [searchTypeType, setSearchTypeType] = useState(AllClientScopes.none);
  const [searchProtocol, setSearchProtocol] = useState("all");
  const localeSort = useLocaleSort();
  const [key, setKey] = useState(0);
  const refresh = () => {
    setSelectedScopes([]);
    setKey(key + 1);
  };
  const loader = async (first, max, search) => {
    const defaultScopes = await adminClient.clientScopes.listDefaultClientScopes();
    const optionalScopes = await adminClient.clientScopes.listDefaultOptionalClientScopes();
    const clientScopes = await adminClient.clientScopes.find();
    const filter = searchType === "name" ? nameFilter(search) : searchType === "type" ? typeFilter(searchTypeType) : protocolFilter(searchProtocol);
    const transformed = clientScopes.map((scope) => {
      const row = {
        ...scope,
        type: defaultScopes.find((defaultScope) => defaultScope.name === scope.name) ? ClientScope.default : optionalScopes.find((optionalScope) => optionalScope.name === scope.name) ? ClientScope.optional : AllClientScopes.none
      };
      return row;
    }).filter(filter);
    return localeSort(transformed, mapByKey("name")).slice(first, Number(first) + Number(max));
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("deleteClientScope", {
      count: selectedScopes.length,
      name: selectedScopes[0]?.name
    }),
    messageKey: "client-scopes:deleteConfirm",
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        for (const scope of selectedScopes) {
          try {
            await removeScope(adminClient, scope);
          } catch (error) {
            console.warn("could not remove scope", error.response?.data?.errorMessage || error);
          }
          await adminClient.clientScopes.del({id: scope.id});
        }
        addAlert(t("deletedSuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError("client-scopes:deleteError", error);
      }
    }
  });
  const TypeSelector = (scope) => /* @__PURE__ */ React.createElement(CellDropdown, {
    clientScope: scope,
    type: scope.type,
    all: true,
    onSelect: async (value) => {
      try {
        await changeScope(adminClient, scope, value);
        addAlert(t("clientScopeSuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError("client-scopes:clientScopeError", error);
      }
    }
  });
  const ClientScopeDetailLink = ({
    id,
    type,
    name
  }) => /* @__PURE__ */ React.createElement(Link, {
    key: id,
    to: toClientScope({realm, id, type, tab: "settings"})
  }, name);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "clientScopes",
    subKey: "client-scopes:clientScopeExplain",
    helpUrl: helpUrls.clientScopesUrl
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader,
    ariaLabelKey: "client-scopes:clientScopeList",
    searchPlaceholderKey: searchType === "name" ? "client-scopes:searchFor" : void 0,
    isSearching: searchType !== "name",
    searchTypeComponent: /* @__PURE__ */ React.createElement(SearchDropdown, {
      searchType,
      onSelect: (searchType2) => setSearchType(searchType2),
      withProtocol: true
    }),
    isPaginated: true,
    onSelect: (clientScopes) => setSelectedScopes([...clientScopes]),
    canSelectAll: true,
    toolbarItem: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SearchToolbar, {
      searchType,
      type: searchTypeType,
      onSelect: (searchType2) => {
        setSearchType(searchType2);
        setSearchProtocol("all");
        setSearchTypeType(AllClientScopes.none);
        refresh();
      },
      onType: (value) => {
        setSearchTypeType(value);
        setSearchProtocol("all");
        refresh();
      },
      protocol: searchProtocol,
      onProtocol: (protocol) => {
        setSearchProtocol(protocol);
        setSearchTypeType(AllClientScopes.none);
        refresh();
      }
    }), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      component: (props) => /* @__PURE__ */ React.createElement(Link, {
        ...props,
        to: toNewClientScope({realm})
      })
    }, t("createClientScope"))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(ChangeTypeDropdown, {
      selectedRows: selectedScopes,
      refresh
    })), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Dropdown, {
      toggle: /* @__PURE__ */ React.createElement(KebabToggle, {
        onToggle: setKebabOpen
      }),
      isOpen: kebabOpen,
      isPlain: true,
      dropdownItems: [
        /* @__PURE__ */ React.createElement(DropdownItem, {
          key: "action",
          component: "button",
          isDisabled: selectedScopes.length === 0,
          onClick: () => {
            toggleDeleteDialog();
            setKebabOpen(false);
          }
        }, t("common:delete"))
      ]
    }))),
    actions: [
      {
        title: t("common:delete"),
        onRowClick: (clientScope) => {
          setSelectedScopes([clientScope]);
          toggleDeleteDialog();
        }
      }
    ],
    columns: [
      {
        name: "name",
        cellRenderer: ClientScopeDetailLink
      },
      {
        name: "type",
        displayKey: "client-scopes:assignedType",
        cellRenderer: TypeSelector
      },
      {
        name: "protocol",
        displayKey: "client-scopes:protocol",
        cellRenderer: (client) => getProtocolName(t, client.protocol ?? "openid-connect"),
        transforms: [cellWidth(15)]
      },
      {
        name: "attributes['gui.order']",
        displayKey: "client-scopes:displayOrder",
        cellFormatters: [emptyFormatter()],
        transforms: [cellWidth(15)]
      },
      {name: "description", cellFormatters: [emptyFormatter()]}
    ]
  })));
}
