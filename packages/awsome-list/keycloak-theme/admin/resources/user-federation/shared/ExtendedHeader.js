import React from "../../_snowpack/pkg/react.js";
import {useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  DropdownItem,
  DropdownSeparator
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {Header} from "./Header.js";
import {useFormContext, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
export const ExtendedHeader = ({
  provider,
  editMode,
  save,
  noDivider = false
}) => {
  const {t} = useTranslation("user-federation");
  const {id} = useParams();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {control} = useFormContext();
  const hasImportUsers = useWatch({
    name: "config.importEnabled",
    control,
    defaultValue: ["true"]
  })[0];
  const [toggleUnlinkUsersDialog, UnlinkUsersDialog] = useConfirmDialog({
    titleKey: "user-federation:userFedUnlinkUsersConfirmTitle",
    messageKey: "user-federation:userFedUnlinkUsersConfirm",
    continueButtonLabel: "user-federation:unlinkUsers",
    onConfirm: () => unlinkUsers()
  });
  const [toggleRemoveUsersDialog, RemoveUsersConfirm] = useConfirmDialog({
    titleKey: t("removeImportedUsers"),
    messageKey: t("removeImportedUsersMessage"),
    continueButtonLabel: "common:remove",
    onConfirm: async () => {
      try {
        removeImportedUsers();
        addAlert(t("removeImportedUsersSuccess"), AlertVariant.success);
      } catch (error) {
        addError("user-federation:removeImportedUsersError", error);
      }
    }
  });
  const removeImportedUsers = async () => {
    try {
      if (id) {
        await adminClient.userStorageProvider.removeImportedUsers({id});
      }
      addAlert(t("removeImportedUsersSuccess"), AlertVariant.success);
    } catch (error) {
      addError("user-federation:removeImportedUsersError", error);
    }
  };
  const syncChangedUsers = async () => {
    try {
      if (id) {
        const response = await adminClient.userStorageProvider.sync({
          id,
          action: "triggerChangedUsersSync"
        });
        if (response.ignored) {
          addAlert(`${response.status}.`, AlertVariant.warning);
        } else {
          addAlert(t("syncUsersSuccess") + `${response.added} users added, ${response.updated} users updated, ${response.removed} users removed, ${response.failed} users failed.`, AlertVariant.success);
        }
      }
    } catch (error) {
      addError("user-federation:syncUsersError", error);
    }
  };
  const syncAllUsers = async () => {
    try {
      if (id) {
        const response = await adminClient.userStorageProvider.sync({
          id,
          action: "triggerFullSync"
        });
        if (response.ignored) {
          addAlert(`${response.status}.`, AlertVariant.warning);
        } else {
          addAlert(t("syncUsersSuccess") + `${response.added} users added, ${response.updated} users updated, ${response.removed} users removed, ${response.failed} users failed.`, AlertVariant.success);
        }
      }
    } catch (error) {
      addError("user-federation:syncUsersError", error);
    }
  };
  const unlinkUsers = async () => {
    try {
      if (id) {
        await adminClient.userStorageProvider.unlinkUsers({id});
      }
      addAlert(t("unlinkUsersSuccess"), AlertVariant.success);
    } catch (error) {
      addError("user-federation:unlinkUsersError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(UnlinkUsersDialog, null), /* @__PURE__ */ React.createElement(RemoveUsersConfirm, null), /* @__PURE__ */ React.createElement(Header, {
    provider,
    noDivider,
    save,
    dropdownItems: [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "sync",
        onClick: syncChangedUsers,
        isDisabled: hasImportUsers === "false"
      }, t("syncChangedUsers")),
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "syncall",
        onClick: syncAllUsers,
        isDisabled: hasImportUsers === "false"
      }, t("syncAllUsers")),
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "unlink",
        isDisabled: editMode ? !editMode.includes("UNSYNCED") : false,
        onClick: toggleUnlinkUsersDialog
      }, t("unlinkUsers")),
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "remove",
        onClick: toggleRemoveUsersDialog
      }, t("removeImported")),
      /* @__PURE__ */ React.createElement(DropdownSeparator, {
        key: "separator"
      })
    ]
  }));
};
