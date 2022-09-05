import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {AlertVariant, Switch} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {DraggableTable} from "./components/DraggableTable.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
import {toKey} from "../util.js";
export const RequiredActions = () => {
  const {t} = useTranslation("authentication");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [actions, setActions] = useState();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  useFetch(async () => {
    const [requiredActions, unregisteredRequiredActions] = await Promise.all([
      adminClient.authenticationManagement.getRequiredActions(),
      adminClient.authenticationManagement.getUnregisteredRequiredActions()
    ]);
    return [
      ...requiredActions.map((a) => ({
        name: a.name,
        enabled: a.enabled,
        defaultAction: a.defaultAction,
        data: a
      })),
      ...unregisteredRequiredActions.map((a) => ({
        name: a.name,
        enabled: false,
        defaultAction: false,
        data: a
      }))
    ];
  }, (actions2) => setActions(actions2), [key]);
  const isUnregisteredAction = (data) => {
    return !("alias" in data);
  };
  const updateAction = async (action, field) => {
    try {
      if (field in action) {
        action[field] = !action[field];
        await adminClient.authenticationManagement.updateRequiredAction({alias: action.alias}, action);
      } else if (isUnregisteredAction(action)) {
        await adminClient.authenticationManagement.registerRequiredAction({
          name: action.name,
          providerId: action.providerId
        });
      }
      refresh();
      addAlert(t("updatedRequiredActionSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:updatedRequiredActionError", error);
    }
  };
  const executeMove = async (action, times) => {
    try {
      const alias = action.alias;
      for (let index = 0; index < Math.abs(times); index++) {
        if (times > 0) {
          await adminClient.authenticationManagement.lowerRequiredActionPriority({
            alias
          });
        } else {
          await adminClient.authenticationManagement.raiseRequiredActionPriority({
            alias
          });
        }
      }
      refresh();
      addAlert(t("updatedRequiredActionSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:updatedRequiredActionError", error);
    }
  };
  if (!actions) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(DraggableTable, {
    keyField: "name",
    onDragFinish: async (nameDragged, items) => {
      const keys = actions.map((e) => e.name);
      const newIndex = items.indexOf(nameDragged);
      const oldIndex = keys.indexOf(nameDragged);
      const dragged = actions[oldIndex].data;
      if (!dragged.alias)
        return;
      const times = newIndex - oldIndex;
      executeMove(dragged, times);
    },
    columns: [
      {
        name: "name",
        displayKey: "authentication:requiredActions"
      },
      {
        name: "enabled",
        displayKey: "common:enabled",
        cellRenderer: (row) => /* @__PURE__ */ React.createElement(Switch, {
          id: `enable-${toKey(row.name)}`,
          label: t("common:on"),
          labelOff: t("common:off"),
          isChecked: row.enabled,
          onChange: () => {
            updateAction(row.data, "enabled");
          }
        })
      },
      {
        name: "default",
        displayKey: "authentication:setAsDefaultAction",
        cellRenderer: (row) => /* @__PURE__ */ React.createElement(Switch, {
          id: `default-${toKey(row.name)}`,
          label: t("common:on"),
          isDisabled: !row.enabled,
          labelOff: !row.enabled ? t("disabledOff") : t("common:off"),
          isChecked: row.defaultAction,
          onChange: () => {
            updateAction(row.data, "defaultAction");
          }
        })
      }
    ],
    data: actions
  });
};
