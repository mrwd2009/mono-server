import {AlertVariant, Button, ButtonVariant} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {wrappable} from "../../_snowpack/pkg/@patternfly/react-table.js";
import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Link, useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../../components/table-toolbar/KeycloakDataTable.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {toCreateInitialAccessToken} from "../routes/CreateInitialAccessToken.js";
import useFormatDate, {FORMAT_DATE_AND_TIME} from "../../utils/useFormatDate.js";
export const InitialAccessTokenList = () => {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const formatDate = useFormatDate();
  const history = useHistory();
  const [token, setToken] = useState();
  const loader = async () => {
    try {
      return await adminClient.realms.getClientsInitialAccess({realm});
    } catch (error) {
      return [];
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "clients:tokenDeleteConfirmTitle",
    messageKey: t("tokenDeleteConfirm", token),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.realms.delClientsInitialAccess({
          realm,
          id: token.id
        });
        addAlert(t("tokenDeleteSuccess"), AlertVariant.success);
        setToken(void 0);
      } catch (error) {
        addError("tokenDeleteError", error);
      }
    }
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key: token?.id,
    ariaLabelKey: "clients:initialAccessToken",
    searchPlaceholderKey: "clients:searchInitialAccessToken",
    loader,
    toolbarItem: /* @__PURE__ */ React.createElement(Button, {
      component: (props) => /* @__PURE__ */ React.createElement(Link, {
        ...props,
        to: toCreateInitialAccessToken({realm})
      })
    }, t("common:create")),
    actions: [
      {
        title: t("common:delete"),
        onRowClick: (token2) => {
          setToken(token2);
          toggleDeleteDialog();
        }
      }
    ],
    columns: [
      {
        name: "id",
        displayKey: "common:id"
      },
      {
        name: "timestamp",
        displayKey: "clients:timestamp",
        cellRenderer: (row) => formatDate(new Date(row.timestamp * 1e3), FORMAT_DATE_AND_TIME)
      },
      {
        name: "expiration",
        displayKey: "clients:expires",
        cellRenderer: (row) => formatDate(new Date(row.timestamp * 1e3 + row.expiration * 1e3), FORMAT_DATE_AND_TIME)
      },
      {
        name: "count",
        displayKey: "clients:count"
      },
      {
        name: "remainingCount",
        displayKey: "clients:remainingCount",
        transforms: [wrappable]
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("noTokens"),
      instructions: t("noTokensInstructions"),
      primaryActionText: t("common:create"),
      onPrimaryAction: () => history.push(toCreateInitialAccessToken({realm}))
    })
  }));
};
