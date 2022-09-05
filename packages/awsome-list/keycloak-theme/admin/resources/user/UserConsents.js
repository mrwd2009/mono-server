import React, {useState} from "../_snowpack/pkg/react.js";
import {useParams} from "../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  ButtonVariant,
  Chip,
  ChipGroup
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {emptyFormatter} from "../util.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {cellWidth} from "../_snowpack/pkg/@patternfly/react-table.js";
import {sortBy} from "../_snowpack/pkg/lodash-es.js";
import {CubesIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {useAlerts} from "../components/alert/Alerts.js";
import useFormatDate from "../utils/useFormatDate.js";
export const UserConsents = () => {
  const [selectedClient, setSelectedClient] = useState();
  const {t} = useTranslation("roles");
  const {addAlert, addError} = useAlerts();
  const formatDate = useFormatDate();
  const [key, setKey] = useState(0);
  const {adminClient} = useAdminClient();
  const {id} = useParams();
  const alphabetize = (consentsList) => {
    return sortBy(consentsList, (client) => client.clientId?.toUpperCase());
  };
  const refresh = () => setKey(new Date().getTime());
  const loader = async () => {
    const getConsents = await adminClient.users.listConsents({id});
    return alphabetize(getConsents);
  };
  const clientScopesRenderer = ({
    grantedClientScopes
  }) => {
    return /* @__PURE__ */ React.createElement(ChipGroup, {
      className: "kc-consents-chip-group"
    }, grantedClientScopes.map((currentChip) => /* @__PURE__ */ React.createElement(Chip, {
      key: currentChip,
      isReadOnly: true,
      className: "kc-consents-chip",
      id: "consents-chip-text"
    }, currentChip)));
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "users:revokeClientScopesTitle",
    messageKey: t("users:revokeClientScopes", {
      clientId: selectedClient?.clientId
    }),
    continueButtonLabel: "common:revoke",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.users.revokeConsent({
          id,
          clientId: selectedClient.clientId
        });
        refresh();
        addAlert(t("deleteGrantsSuccess"), AlertVariant.success);
      } catch (error) {
        addError("roles:deleteGrantsError", error);
      }
    }
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    loader,
    key,
    ariaLabelKey: "roles:roleList",
    searchPlaceholderKey: " ",
    columns: [
      {
        name: "clientId",
        displayKey: "clients:Client",
        cellFormatters: [emptyFormatter()],
        transforms: [cellWidth(20)]
      },
      {
        name: "grantedClientScopes",
        displayKey: "client-scopes:grantedClientScopes",
        cellFormatters: [emptyFormatter()],
        cellRenderer: clientScopesRenderer,
        transforms: [cellWidth(30)]
      },
      {
        name: "createDate",
        displayKey: "clients:created",
        transforms: [cellWidth(20)],
        cellRenderer: ({createDate}) => createDate ? formatDate(new Date(createDate)) : "—"
      },
      {
        name: "lastUpdatedDate",
        displayKey: "clients:lastUpdated",
        transforms: [cellWidth(10)],
        cellRenderer: ({lastUpdatedDate}) => lastUpdatedDate ? formatDate(new Date(lastUpdatedDate)) : "—"
      }
    ],
    actions: [
      {
        title: t("users:revoke"),
        onRowClick: (client) => {
          setSelectedClient(client);
          toggleDeleteDialog();
        }
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      hasIcon: true,
      icon: CubesIcon,
      message: t("users:noConsents"),
      instructions: t("users:noConsentsText")
    })
  }));
};
