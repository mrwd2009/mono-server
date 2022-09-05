import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Badge,
  Button,
  Chip,
  ChipGroup,
  Divider,
  Modal,
  ModalVariant,
  Select,
  SelectGroup,
  SelectOption,
  SelectVariant,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FilterIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {KeycloakDataTable} from "../table-toolbar/KeycloakDataTable.js";
import {useFetch, useAdminClient} from "../../context/auth/AdminClient.js";
import {
  castAdminClient,
  mapping,
  ServiceRole
} from "./RoleMapping.js";
import {KeycloakSpinner} from "../keycloak-spinner/KeycloakSpinner.js";
const realmRole = {
  name: "realmRoles"
};
export const AddRoleMappingModal = ({
  id,
  name,
  type,
  isRadio = false,
  isLDAPmapper,
  onAssign,
  onClose
}) => {
  const {t} = useTranslation("common");
  const {adminClient} = useAdminClient();
  const [clients, setClients] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState();
  const mapType = mapping.find((m) => m.resource === type);
  useFetch(async () => {
    const clients2 = await adminClient.clients.find();
    return (await Promise.all(clients2.map(async (client) => {
      const roles = await castAdminClient(adminClient, mapType.resource === "roles" ? "clients" : mapType.resource)[mapType.functions.list[0]]({
        id: mapType.resource === "roles" ? client.id : id,
        clientUniqueId: client.id,
        client: client.id
      });
      return {
        roles,
        client
      };
    }))).flat().filter((row) => row.roles.length !== 0).map((row) => ({...row.client, numberOfRoles: row.roles.length}));
  }, (clients2) => {
    setClients(clients2);
  }, []);
  useFetch(async () => {
    const realmRolesSelected = selectedClients.some((client) => client.name === "realmRoles");
    let selected = selectedClients;
    if (realmRolesSelected) {
      selected = selectedClients.filter((client) => client.name !== "realmRoles");
    }
    const availableRoles = await castAdminClient(adminClient, mapType.resource)[mapType.functions.list[1]]({
      id
    });
    const realmRoles = availableRoles.map((role) => {
      return {
        id: role.id,
        role,
        client: void 0
      };
    });
    const allClients = selectedClients.length !== 0 ? selected : await adminClient.clients.find();
    const roles = (await Promise.all(allClients.map(async (client) => {
      const clientAvailableRoles = await castAdminClient(adminClient, mapType.resource === "roles" ? "clients" : mapType.resource)[mapType.functions.list[0]]({
        id: mapType.resource === "roles" ? client.id : id,
        client: client.id,
        clientUniqueId: client.id
      });
      return clientAvailableRoles.map((role) => {
        return {
          id: role.id,
          role,
          client
        };
      });
    }))).flat();
    return [
      ...realmRolesSelected || selected.length === 0 ? realmRoles : [],
      ...roles
    ];
  }, setData, [selectedClients]);
  const removeClient = (client) => {
    setSelectedClients(selectedClients.filter((item) => item.id !== client.id));
  };
  if (!data) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const createSelectGroup = (clients2) => [
    /* @__PURE__ */ React.createElement(SelectGroup, {
      key: "role",
      label: t("realmRoles")
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      key: "realmRoles",
      value: realmRole
    }, t("realmRoles"))),
    /* @__PURE__ */ React.createElement(Divider, {
      key: "divider"
    }),
    /* @__PURE__ */ React.createElement(SelectGroup, {
      key: "group",
      label: t("clients")
    }, clients2.map((client) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: client.id,
      value: client
    }, client.clientId)))
  ];
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.large,
    title: isLDAPmapper ? t("assignRole") : t("assignRolesTo", {client: name}),
    isOpen: true,
    onClose,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "assign",
        key: "confirm",
        isDisabled: selectedRows.length === 0,
        variant: "primary",
        onClick: () => {
          onAssign(selectedRows);
          onClose();
        }
      }, t("assign")),
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "cancel",
        key: "cancel",
        variant: "link",
        onClick: onClose
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    onSelect: (rows) => setSelectedRows([...rows]),
    searchPlaceholderKey: "clients:searchByRoleName",
    searchTypeComponent: /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Select, {
      toggleId: "role",
      onToggle: setSearchToggle,
      isOpen: searchToggle,
      variant: isRadio ? SelectVariant.single : SelectVariant.checkbox,
      hasInlineFilter: true,
      placeholderText: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FilterIcon, null), " ", t("clients:filterByOrigin")),
      isGrouped: true,
      isCheckboxSelectionBadgeHidden: true,
      onFilter: (evt) => {
        const value = evt?.target.value || "";
        return createSelectGroup(clients.filter((client) => client.clientId?.includes(value)));
      },
      selections: selectedClients,
      onClear: () => setSelectedClients([]),
      onSelect: (_, selection) => {
        const client = selection;
        if (selectedClients.includes(client)) {
          removeClient(client);
        } else {
          setSelectedClients([...selectedClients, client]);
        }
      }
    }, createSelectGroup(clients))),
    subToolbar: /* @__PURE__ */ React.createElement(ToolbarItem, {
      widths: {default: "100%"}
    }, /* @__PURE__ */ React.createElement(ChipGroup, null, selectedClients.map((client) => /* @__PURE__ */ React.createElement(Chip, {
      key: `chip-${client.id}`,
      onClick: () => removeClient(client)
    }, client.clientId || t("realmRoles"), /* @__PURE__ */ React.createElement(Badge, {
      isRead: true
    }, client.numberOfRoles))))),
    canSelectAll: true,
    isRadio,
    loader: data,
    ariaLabelKey: "clients:roles",
    columns: [
      {
        name: "name",
        cellRenderer: ServiceRole
      },
      {
        name: "role.description",
        displayKey: t("description")
      }
    ]
  }));
};
