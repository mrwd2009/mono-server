import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {AlertVariant, Select} from "../_snowpack/pkg/@patternfly/react-core.js";
import {
  allClientScopeTypes,
  changeClientScope,
  changeScope,
  clientScopeTypesSelectOptions
} from "../components/client-scope/ClientScopeTypes.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
export const ChangeTypeDropdown = ({
  clientId,
  selectedRows,
  refresh
}) => {
  const {t} = useTranslation("client-scopes");
  const [open, setOpen] = useState(false);
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  return /* @__PURE__ */ React.createElement(Select, {
    toggleId: "change-type-dropdown",
    isOpen: open,
    selections: [],
    isDisabled: selectedRows.length === 0,
    placeholderText: t("changeTypeTo"),
    onToggle: setOpen,
    onSelect: async (_, value) => {
      try {
        await Promise.all(selectedRows.map((row) => {
          return clientId ? changeClientScope(adminClient, clientId, row, row.type, value) : changeScope(adminClient, row, value);
        }));
        setOpen(false);
        refresh();
        addAlert(t("clientScopeSuccess"), AlertVariant.success);
      } catch (error) {
        addError("clients:clientScopeError", error);
      }
    }
  }, clientScopeTypesSelectOptions(t, !clientId ? allClientScopeTypes : void 0));
};
