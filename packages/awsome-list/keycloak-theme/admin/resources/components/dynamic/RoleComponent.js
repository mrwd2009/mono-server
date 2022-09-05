import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Divider,
  FormGroup,
  Select,
  SelectGroup,
  SelectOption,
  SelectVariant,
  Split,
  SplitItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
const RealmClient = (realm) => ({
  name: "realmRoles",
  clientId: realm
});
export const RoleComponent = ({
  name,
  label,
  helpText,
  isDisabled = false
}) => {
  const {t} = useTranslation("dynamic");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {
    control,
    getValues,
    formState: {errors}
  } = useFormContext();
  const [roleOpen, setRoleOpen] = useState(false);
  const [clientsOpen, setClientsOpen] = useState(false);
  const [clients, setClients] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [clientRoles, setClientRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  const fieldName = `config.${name}`;
  useFetch(async () => {
    const clients2 = await adminClient.clients.find();
    const asyncFilter = async (predicate) => {
      const results = await Promise.all(clients2.map(predicate));
      return clients2.filter((_, index) => results[index]);
    };
    const filteredClients = await asyncFilter(async (client) => (await adminClient.clients.listRoles({id: client.id})).length > 0);
    return filteredClients;
  }, (filteredClients) => setClients(filteredClients), []);
  useEffect(() => {
    const value = getValues(fieldName);
    const [client, role] = value?.includes(".") ? value.split(".") : ["", value || ""];
    if (client) {
      setSelectedClient(clients?.find((c) => c.clientId === client));
    } else {
      setSelectedClient(RealmClient(realm));
    }
    setSelectedRole({name: role});
  }, [clients, getValues]);
  const createSelectGroup = (clients2) => {
    return [
      /* @__PURE__ */ React.createElement(SelectGroup, {
        key: "role",
        label: t("roleGroup")
      }, /* @__PURE__ */ React.createElement(SelectOption, {
        key: "realmRoles",
        value: RealmClient(realm)
      }, realm)),
      /* @__PURE__ */ React.createElement(Divider, {
        key: "divider"
      }),
      /* @__PURE__ */ React.createElement(SelectGroup, {
        key: "group",
        label: t("clientGroup")
      }, clients2.map((client) => /* @__PURE__ */ React.createElement(SelectOption, {
        key: client.id,
        value: client
      }, client.clientId)))
    ];
  };
  const roleSelectOptions = () => {
    const createItem = (role) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: role.id,
      value: role
    }, role.name);
    return clientRoles.map((role) => createItem(role));
  };
  useFetch(async () => {
    if (selectedClient && selectedClient.name !== "realmRoles") {
      const clientRoles2 = await adminClient.clients.listRoles({
        id: selectedClient.id
      });
      return clientRoles2;
    } else {
      return await adminClient.roles.find();
    }
  }, (clientRoles2) => setClientRoles(clientRoles2), [selectedClient]);
  const onClear = (onChange) => {
    setSelectedClient(void 0);
    setSelectedRole(void 0);
    onChange("");
  };
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(label),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t(helpText),
      fieldLabelId: `dynamic:${label}`
    }),
    validated: errors[fieldName] ? "error" : "default",
    helperTextInvalid: t("common:required"),
    fieldId: name
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: fieldName,
    defaultValue: "",
    control,
    render: ({onChange}) => /* @__PURE__ */ React.createElement(Split, {
      hasGutter: true
    }, /* @__PURE__ */ React.createElement(SplitItem, null, clients && /* @__PURE__ */ React.createElement(Select, {
      toggleId: `group-${name}`,
      isDisabled,
      onToggle: () => setClientsOpen(!clientsOpen),
      isOpen: clientsOpen,
      variant: SelectVariant.typeahead,
      typeAheadAriaLabel: t("selectASourceOfRoles"),
      placeholderText: t("selectASourceOfRoles"),
      isGrouped: true,
      onFilter: (evt) => {
        const textInput = evt?.target.value || "";
        if (textInput === "") {
          return createSelectGroup(clients);
        } else {
          return createSelectGroup(clients.filter((client) => client.name.toLowerCase().includes(textInput.toLowerCase())));
        }
      },
      selections: selectedClient?.clientId,
      onClear: () => onClear(onChange),
      onSelect: (_, value) => {
        onClear(onChange);
        setSelectedClient(value);
        setClientsOpen(false);
      }
    }, createSelectGroup(clients))), /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(Select, {
      toggleId: `role-${name}`,
      onToggle: (isExpanded) => setRoleOpen(isExpanded),
      isOpen: roleOpen,
      variant: SelectVariant.typeahead,
      placeholderText: selectedClient?.name !== "realmRoles" ? t("clientRoles") : t("selectARole"),
      isDisabled: !selectedClient,
      typeAheadAriaLabel: t("selectARole"),
      selections: selectedRole?.name,
      onSelect: (_, value) => {
        const role = value;
        setSelectedRole(role);
        onChange(selectedClient?.name === "realmRoles" ? role.name : `${selectedClient?.clientId}.${role.name}`);
        setRoleOpen(false);
      },
      maxHeight: 200,
      onClear: () => onClear(onChange)
    }, roleSelectOptions())))
  }));
};
