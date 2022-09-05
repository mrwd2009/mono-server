import React from "../../_snowpack/pkg/react.js";
import {useHistory, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  ButtonVariant,
  DropdownItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {toUserFederation} from "../routes/UserFederation.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
export const Header = ({
  provider,
  save,
  noDivider = false,
  dropdownItems = []
}) => {
  const {t} = useTranslation("user-federation");
  const {id} = useParams();
  const history = useHistory();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const {control, setValue} = useFormContext();
  const [toggleDisableDialog, DisableConfirm] = useConfirmDialog({
    titleKey: "user-federation:userFedDisableConfirmTitle",
    messageKey: "user-federation:userFedDisableConfirm",
    continueButtonLabel: "common:disable",
    onConfirm: () => {
      setValue("config.enabled[0]", "false");
      save();
    }
  });
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "user-federation:userFedDeleteConfirmTitle",
    messageKey: "user-federation:userFedDeleteConfirm",
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.components.del({id});
        addAlert(t("userFedDeletedSuccess"), AlertVariant.success);
        history.replace(toUserFederation({realm}));
      } catch (error) {
        addError("user-federation:userFedDeleteError", error);
      }
    }
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DisableConfirm, null), /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(Controller, {
    name: "config.enabled[0]",
    defaultValue: ["true"][0],
    control,
    render: ({onChange, value}) => !id ? /* @__PURE__ */ React.createElement(ViewHeader, {
      titleKey: t("addProvider", {
        provider,
        count: 1
      })
    }) : /* @__PURE__ */ React.createElement(ViewHeader, {
      divider: !noDivider,
      titleKey: provider,
      dropdownItems: [
        ...dropdownItems,
        /* @__PURE__ */ React.createElement(DropdownItem, {
          key: "delete",
          onClick: () => toggleDeleteDialog(),
          "data-testid": "delete-cmd"
        }, t("deleteProvider"))
      ],
      isEnabled: value === "true",
      onToggle: (value2) => {
        if (!value2) {
          toggleDisableDialog();
        } else {
          onChange(value2.toString());
          save();
        }
      }
    })
  }));
};
