import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  DropdownItem,
  Select,
  SelectOption
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {toUpperCase} from "../../util.js";
export var ClientScope;
(function(ClientScope2) {
  ClientScope2["default"] = "default";
  ClientScope2["optional"] = "optional";
})(ClientScope || (ClientScope = {}));
export var AllClientScopes;
(function(AllClientScopes2) {
  AllClientScopes2["none"] = "none";
})(AllClientScopes || (AllClientScopes = {}));
const clientScopeTypes = Object.keys(ClientScope);
export const allClientScopeTypes = Object.keys({
  ...AllClientScopes,
  ...ClientScope
});
export const clientScopeTypesSelectOptions = (t, scopeTypes = clientScopeTypes) => scopeTypes.map((type) => /* @__PURE__ */ React.createElement(SelectOption, {
  key: type,
  value: type
}, t(`common:clientScope.${type}`)));
export const clientScopeTypesDropdown = (t, onClick) => clientScopeTypes.map((type) => /* @__PURE__ */ React.createElement(DropdownItem, {
  key: type,
  onClick: () => onClick(type)
}, t(`common:clientScope.${type}`)));
export const CellDropdown = ({
  clientScope,
  type,
  onSelect,
  all = false,
  ...props
}) => {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(Select, {
    className: `keycloak__client-scope__${type}`,
    key: clientScope.id,
    onToggle: () => setOpen(!open),
    isOpen: open,
    selections: [type],
    onSelect: (_, value) => {
      onSelect(all ? value : value);
      setOpen(false);
    },
    ...props
  }, clientScopeTypesSelectOptions(t, all ? allClientScopeTypes : clientScopeTypes));
};
export const changeScope = async (adminClient, clientScope, changeTo) => {
  await removeScope(adminClient, clientScope);
  await addScope(adminClient, clientScope, changeTo);
};
const castAdminClient = (adminClient) => adminClient.clientScopes;
export const removeScope = async (adminClient, clientScope) => {
  if (clientScope.type !== AllClientScopes.none)
    await castAdminClient(adminClient)[`delDefault${clientScope.type === ClientScope.optional ? "Optional" : ""}ClientScope`]({
      id: clientScope.id
    });
};
const addScope = async (adminClient, clientScope, type) => {
  if (type !== AllClientScopes.none)
    await castAdminClient(adminClient)[`addDefault${type === ClientScope.optional ? "Optional" : ""}ClientScope`]({
      id: clientScope.id
    });
};
export const changeClientScope = async (adminClient, clientId, clientScope, type, changeTo) => {
  if (type !== "none") {
    await removeClientScope(adminClient, clientId, clientScope, type);
  }
  await addClientScope(adminClient, clientId, clientScope, changeTo);
};
export const removeClientScope = async (adminClient, clientId, clientScope, type) => {
  const methodName = `del${toUpperCase(type)}ClientScope`;
  await adminClient.clients[methodName]({
    id: clientId,
    clientScopeId: clientScope.id
  });
};
export const addClientScope = async (adminClient, clientId, clientScope, type) => {
  const methodName = `add${toUpperCase(type)}ClientScope`;
  await adminClient.clients[methodName]({
    id: clientId,
    clientScopeId: clientScope.id
  });
};
