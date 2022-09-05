import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  Button,
  Dropdown,
  DropdownItem,
  KebabToggle,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import {AddScopeDialog} from "./AddScopeDialog.js";
import {
  ClientScope,
  CellDropdown,
  AllClientScopes,
  changeClientScope,
  addClientScope,
  removeClientScope
} from "../../components/client-scope/ClientScopeTypes.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {KeycloakDataTable} from "../../components/table-toolbar/KeycloakDataTable.js";
import {
  nameFilter,
  SearchDropdown,
  SearchToolbar,
  typeFilter
} from "../../client-scopes/details/SearchFilter.js";
import {ChangeTypeDropdown} from "../../client-scopes/ChangeTypeDropdown.js";
import {toDedicatedScope} from "../routes/DedicatedScopeDetails.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import useLocaleSort, {mapByKey} from "../../utils/useLocaleSort.js";
import "./client-scopes.css.proxy.js";
import {useAccess} from "../../context/access/Access.js";
const DEDICATED_ROW = "dedicated";
export const ClientScopes = ({
  clientId,
  protocol,
  clientName,
  fineGrainedAccess
}) => {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const localeSort = useLocaleSort();
  const [searchType, setSearchType] = useState("name");
  const [searchTypeType, setSearchTypeType] = useState(AllClientScopes.none);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [kebabOpen, setKebabOpen] = useState(false);
  const [rest, setRest] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const isDedicatedRow = (value) => value.id === DEDICATED_ROW;
  const {hasAccess} = useAccess();
  const isManager = hasAccess("manage-clients") || fineGrainedAccess;
  const loader = async (first, max, search) => {
    const defaultClientScopes = await adminClient.clients.listDefaultClientScopes({id: clientId});
    const optionalClientScopes = await adminClient.clients.listOptionalClientScopes({id: clientId});
    const clientScopes = await adminClient.clientScopes.find();
    const find = (id) => clientScopes.find((clientScope) => id === clientScope.id);
    const optional = optionalClientScopes.map((c) => {
      const scope = find(c.id);
      const row = {
        ...c,
        type: ClientScope.optional,
        description: scope.description
      };
      return row;
    });
    const defaultScopes = defaultClientScopes.map((c) => {
      const scope = find(c.id);
      const row = {
        ...c,
        type: ClientScope.default,
        description: scope.description
      };
      return row;
    });
    const rows = [...optional, ...defaultScopes];
    const names = rows.map((row) => row.name);
    setRest(clientScopes.filter((scope) => !names.includes(scope.name)).filter((scope) => scope.protocol === protocol));
    const filter = searchType === "name" ? nameFilter(search) : typeFilter(searchTypeType);
    const firstNum = Number(first);
    const page = localeSort(rows.filter(filter), mapByKey("name")).slice(firstNum, firstNum + Number(max));
    if (firstNum === 0 && isManager) {
      return [
        {
          id: DEDICATED_ROW,
          name: t("dedicatedScopeName", {clientName}),
          type: AllClientScopes.none,
          description: t("dedicatedScopeDescription")
        },
        ...page
      ];
    }
    return page;
  };
  const TypeSelector = (scope) => /* @__PURE__ */ React.createElement(CellDropdown, {
    isDisabled: isDedicatedRow(scope) || !isManager,
    clientScope: scope,
    type: scope.type,
    onSelect: async (value) => {
      try {
        await changeClientScope(adminClient, clientId, scope, scope.type, value);
        addAlert(t("clientScopeSuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError("clients:clientScopeError", error);
      }
    }
  });
  const ManagerToolbarItems = () => {
    if (!isManager)
      return /* @__PURE__ */ React.createElement("span", null);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      onClick: () => setAddDialogOpen(true)
    }, t("addClientScope"))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(ChangeTypeDropdown, {
      clientId,
      selectedRows,
      refresh
    })), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Dropdown, {
      toggle: /* @__PURE__ */ React.createElement(KebabToggle, {
        onToggle: () => setKebabOpen(!kebabOpen)
      }),
      isOpen: kebabOpen,
      isPlain: true,
      dropdownItems: [
        /* @__PURE__ */ React.createElement(DropdownItem, {
          key: "deleteAll",
          isDisabled: selectedRows.length === 0,
          onClick: async () => {
            try {
              await Promise.all(selectedRows.map(async (row) => {
                await removeClientScope(adminClient, clientId, {...row}, row.type);
              }));
              setKebabOpen(false);
              addAlert(t("clients:clientScopeRemoveSuccess"), AlertVariant.success);
              refresh();
            } catch (error) {
              addError("clients:clientScopeRemoveError", error);
            }
          }
        }, t("common:remove"))
      ]
    })));
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, rest && /* @__PURE__ */ React.createElement(AddScopeDialog, {
    clientScopes: rest,
    clientName,
    open: addDialogOpen,
    toggleDialog: () => setAddDialogOpen(!addDialogOpen),
    onAdd: async (scopes) => {
      try {
        await Promise.all(scopes.map(async (scope) => await addClientScope(adminClient, clientId, scope.scope, scope.type)));
        addAlert(t("clientScopeSuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError("clients:clientScopeError", error);
      }
    }
  }), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader,
    ariaLabelKey: "clients:clientScopeList",
    searchPlaceholderKey: searchType === "name" ? "clients:searchByName" : void 0,
    canSelectAll: true,
    isPaginated: true,
    isSearching: searchType === "type",
    onSelect: (rows) => setSelectedRows([...rows]),
    searchTypeComponent: /* @__PURE__ */ React.createElement(SearchDropdown, {
      searchType,
      onSelect: (searchType2) => setSearchType(searchType2)
    }),
    toolbarItem: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SearchToolbar, {
      searchType,
      type: searchTypeType,
      onSelect: (searchType2) => setSearchType(searchType2),
      onType: (value) => {
        setSearchTypeType(value);
        refresh();
      }
    }), /* @__PURE__ */ React.createElement(ManagerToolbarItems, null)),
    columns: [
      {
        name: "name",
        displayKey: "clients:assignedClientScope",
        cellRenderer: (row) => {
          if (isDedicatedRow(row)) {
            return /* @__PURE__ */ React.createElement(Link, {
              to: toDedicatedScope({realm, clientId})
            }, row.name);
          }
          return row.name;
        }
      },
      {
        name: "type",
        displayKey: "clients:assignedType",
        cellRenderer: TypeSelector
      },
      {name: "description"}
    ],
    actions: isManager ? [
      {
        title: t("common:remove"),
        onRowClick: async (row) => {
          try {
            await removeClientScope(adminClient, clientId, row, row.type);
            addAlert(t("clients:clientScopeRemoveSuccess"), AlertVariant.success);
            refresh();
          } catch (error) {
            addError("clients:clientScopeRemoveError", error);
          }
          return true;
        }
      }
    ] : [],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("clients:emptyClientScopes"),
      instructions: t("clients:emptyClientScopesInstructions"),
      primaryActionText: t("clients:emptyClientScopesPrimaryAction"),
      onPrimaryAction: () => setAddDialogOpen(true)
    })
  }));
};
