import {
  AlertVariant,
  Badge,
  Button,
  ButtonVariant,
  PageSection,
  Tab,
  TabTitleText,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {cellWidth, TableText} from "../_snowpack/pkg/@patternfly/react-table.js";
import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Link, useHistory} from "../_snowpack/pkg/react-router-dom.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {formattedLinkTableCell} from "../components/external-link/FormattedLink.js";
import {
  KeycloakDataTable
} from "../components/table-toolbar/KeycloakDataTable.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {addTrailingSlash, emptyFormatter, exportClient} from "../util.js";
import {InitialAccessTokenList} from "./initial-access/InitialAccessTokenList.js";
import {toAddClient} from "./routes/AddClient.js";
import {toClient} from "./routes/Client.js";
import {toImportClient} from "./routes/ImportClient.js";
import {isRealmClient, getProtocolName} from "./utils.js";
import helpUrls from "../help-urls.js";
import {useAccess} from "../context/access/Access.js";
import {
  routableTab,
  RoutableTabs
} from "../components/routable-tabs/RoutableTabs.js";
import {toClients} from "./routes/Clients.js";
export default function ClientsSection() {
  const {t} = useTranslation("clients");
  const {addAlert, addError} = useAlerts();
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const history = useHistory();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  const [selectedClient, setSelectedClient] = useState();
  const {hasAccess} = useAccess();
  const isManager = hasAccess("manage-clients");
  const loader = async (first, max, search) => {
    const params = {
      first,
      max
    };
    if (search) {
      params.clientId = search;
      params.search = true;
    }
    return await adminClient.clients.find({...params});
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("clientDelete", {clientId: selectedClient?.clientId}),
    messageKey: "clients:clientDeleteConfirm",
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.clients.del({
          id: selectedClient.id
        });
        addAlert(t("clientDeletedSuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError("clients:clientDeleteError", error);
      }
    }
  });
  const ClientDetailLink = (client) => /* @__PURE__ */ React.createElement(Link, {
    key: client.id,
    to: toClient({realm, clientId: client.id, tab: "settings"})
  }, client.clientId, !client.enabled && /* @__PURE__ */ React.createElement(Badge, {
    key: `${client.id}-disabled`,
    isRead: true,
    className: "pf-u-ml-sm"
  }, t("common:disabled")));
  const ClientDescription = (client) => /* @__PURE__ */ React.createElement(TableText, {
    wrapModifier: "truncate"
  }, emptyFormatter()(client.description));
  const ToolbarItems = () => {
    if (!isManager)
      return /* @__PURE__ */ React.createElement("span", null);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      component: (props) => /* @__PURE__ */ React.createElement(Link, {
        ...props,
        to: toAddClient({realm})
      })
    }, t("createClient"))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      component: (props) => /* @__PURE__ */ React.createElement(Link, {
        ...props,
        to: toImportClient({realm})
      }),
      variant: "link"
    }, t("importClient"))));
  };
  const route = (tab) => routableTab({
    to: toClients({realm, tab}),
    history
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "clients:clientList",
    subKey: "clients:clientsExplain",
    helpUrl: helpUrls.clientsUrl,
    divider: false
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(RoutableTabs, {
    mountOnEnter: true,
    isBox: true,
    defaultLocation: toClients({
      realm,
      tab: "list"
    })
  }, /* @__PURE__ */ React.createElement(Tab, {
    "data-testid": "list",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("clientsList")),
    ...route("list")
  }, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader,
    isPaginated: true,
    ariaLabelKey: "clients:clientList",
    searchPlaceholderKey: "clients:searchForClient",
    toolbarItem: /* @__PURE__ */ React.createElement(ToolbarItems, null),
    actionResolver: (rowData) => {
      const client = rowData.data;
      const actions = [
        {
          title: t("common:export"),
          onClick() {
            exportClient(client);
          }
        }
      ];
      if (!isRealmClient(client) && (isManager || client.access?.configure)) {
        actions.push({
          title: t("common:delete"),
          onClick() {
            setSelectedClient(client);
            toggleDeleteDialog();
          }
        });
      }
      return actions;
    },
    columns: [
      {
        name: "clientId",
        displayKey: "common:clientId",
        cellRenderer: ClientDetailLink
      },
      {
        name: "protocol",
        displayKey: "common:type",
        cellRenderer: (client) => getProtocolName(t, client.protocol ?? "openid-connect")
      },
      {
        name: "description",
        displayKey: "common:description",
        transforms: [cellWidth(20)],
        cellRenderer: ClientDescription
      },
      {
        name: "baseUrl",
        displayKey: "clients:homeURL",
        cellFormatters: [formattedLinkTableCell(), emptyFormatter()],
        cellRenderer: (client) => {
          if (client.rootUrl) {
            if (!client.rootUrl.startsWith("http") || client.rootUrl.includes("$")) {
              return client.rootUrl.replace("${authBaseUrl}", addTrailingSlash(adminClient.baseUrl)).replace("${authAdminUrl}", addTrailingSlash(adminClient.baseUrl)) + (client.baseUrl ? client.baseUrl.substring(1) : "");
            }
          }
          return client.baseUrl;
        }
      }
    ]
  })), /* @__PURE__ */ React.createElement(Tab, {
    "data-testid": "initialAccessToken",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("initialAccessToken")),
    ...route("initial-access-token")
  }, /* @__PURE__ */ React.createElement(InitialAccessTokenList, null)))));
}
