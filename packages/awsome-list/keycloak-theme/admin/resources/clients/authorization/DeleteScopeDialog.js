import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Alert, AlertVariant} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {ConfirmDialogModal} from "../../components/confirm-dialog/ConfirmDialog.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
export const DeleteScopeDialog = ({
  clientId,
  selectedScope,
  refresh,
  open,
  toggleDialog
}) => {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  return /* @__PURE__ */ React.createElement(ConfirmDialogModal, {
    open,
    toggleDialog,
    titleKey: "clients:deleteScope",
    continueButtonLabel: "clients:confirm",
    onConfirm: async () => {
      try {
        await adminClient.clients.delAuthorizationScope({
          id: clientId,
          scopeId: selectedScope?.id
        });
        addAlert(t("resourceScopeSuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError("clients:resourceScopeError", error);
      }
    }
  }, t("deleteScopeConfirm"), selectedScope && "permissions" in selectedScope && selectedScope.permissions && selectedScope.permissions.length > 0 && /* @__PURE__ */ React.createElement(Alert, {
    variant: "warning",
    isInline: true,
    isPlain: true,
    title: t("deleteScopeWarning"),
    className: "pf-u-pt-lg"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "pf-u-pt-xs"
  }, selectedScope.permissions.map((permission) => /* @__PURE__ */ React.createElement("strong", {
    key: permission.id,
    className: "pf-u-pr-md"
  }, permission.name)))));
};
