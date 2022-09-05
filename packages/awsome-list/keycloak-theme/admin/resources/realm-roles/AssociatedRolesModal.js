import React, {useEffect, useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {omit, sortBy} from "../_snowpack/pkg/lodash-es.js";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Label,
  Modal,
  ModalVariant
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {CaretDownIcon, FilterIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import {useFetch, useAdminClient} from "../context/auth/AdminClient.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
export const AssociatedRolesModal = ({
  id,
  toggleDialog,
  onConfirm,
  omitComposites
}) => {
  const {t} = useTranslation("roles");
  const [name, setName] = useState("");
  const {adminClient} = useAdminClient();
  const [selectedRows, setSelectedRows] = useState([]);
  const [compositeRoles, setCompositeRoles] = useState();
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [filterType, setFilterType] = useState("roles");
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  const alphabetize = (rolesList) => {
    return sortBy(rolesList, (role) => role.name?.toUpperCase());
  };
  const loader = async (first, max, search) => {
    const params = {
      first,
      max
    };
    const searchParam = search || "";
    if (searchParam) {
      params.search = searchParam;
    }
    return (await adminClient.roles.find(params)).filter((item) => item.name !== name);
  };
  const AliasRenderer = ({id: id2, name: name2, clientId}) => {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, clientId && /* @__PURE__ */ React.createElement(Label, {
      color: "blue",
      key: `label-${id2}`
    }, clientId), " ", name2);
  };
  const clientRolesLoader = async () => {
    const clients = await adminClient.clients.find();
    const clientRoles = await Promise.all(clients.map(async (client) => {
      const roles = await adminClient.clients.listRoles({id: client.id});
      return roles.map((role) => ({
        ...role,
        clientId: client.clientId
      })).filter((item) => item.name !== name);
    }));
    return alphabetize(clientRoles.flat());
  };
  useEffect(() => {
    refresh();
  }, [filterType]);
  useFetch(async () => {
    const [role, compositeRoles2] = await Promise.all([
      adminClient.roles.findOneById({id}),
      !omitComposites ? adminClient.roles.getCompositeRoles({id}) : []
    ]);
    return {role, compositeRoles: compositeRoles2};
  }, ({role, compositeRoles: compositeRoles2}) => {
    setName(role?.name);
    setCompositeRoles(compositeRoles2);
  }, []);
  const onFilterDropdownToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };
  const onFilterDropdownSelect = (filterType2) => {
    if (filterType2 === "roles") {
      setFilterType("clients");
    }
    if (filterType2 === "clients") {
      setFilterType("roles");
    }
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };
  if (!compositeRoles) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(Modal, {
    "data-testid": "addAssociatedRole",
    title: name ? t("roles:associatedRolesModalTitle", {name}) : t("addRole"),
    isOpen: true,
    onClose: toggleDialog,
    variant: ModalVariant.large,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        key: "add",
        "data-testid": "add-associated-roles-button",
        variant: "primary",
        isDisabled: !selectedRows.length,
        onClick: () => {
          toggleDialog();
          onConfirm(selectedRows);
        }
      }, t("common:add")),
      /* @__PURE__ */ React.createElement(Button, {
        key: "cancel",
        variant: "link",
        onClick: () => {
          toggleDialog();
        }
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader: filterType === "roles" ? loader : clientRolesLoader,
    ariaLabelKey: "roles:roleList",
    searchPlaceholderKey: "roles:searchFor",
    isPaginated: filterType === "roles",
    isRowDisabled: (r) => compositeRoles.some((o) => o.name === r.name),
    searchTypeComponent: /* @__PURE__ */ React.createElement(Dropdown, {
      onSelect: () => onFilterDropdownSelect(filterType),
      "data-testid": "filter-type-dropdown",
      toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
        id: "toggle-id-9",
        onToggle: onFilterDropdownToggle,
        toggleIndicator: CaretDownIcon,
        icon: /* @__PURE__ */ React.createElement(FilterIcon, null)
      }, "Filter by ", filterType),
      isOpen: isFilterDropdownOpen,
      dropdownItems: [
        /* @__PURE__ */ React.createElement(DropdownItem, {
          "data-testid": "filter-type-dropdown-item",
          key: "filter-type"
        }, filterType === "roles" ? t("filterByClients") : t("filterByRoles"), " ")
      ]
    }),
    canSelectAll: true,
    onSelect: (rows) => {
      setSelectedRows(rows.map((r) => omit(r, "clientId")));
    },
    columns: [
      {
        name: "name",
        displayKey: "roles:roleName",
        cellRenderer: AliasRenderer
      },
      {
        name: "description",
        displayKey: "common:description"
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      hasIcon: true,
      message: t("noRoles"),
      instructions: t("noRolesInstructions"),
      primaryActionText: t("createRole")
    })
  }));
};
