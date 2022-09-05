import {
  Button,
  List,
  ListItem,
  ListVariant,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {CubesIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import React, {useMemo, useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Link} from "../_snowpack/pkg/react-router-dom.js";
import {toClient} from "../clients/routes/Client.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {
  KeycloakDataTable
} from "../components/table-toolbar/KeycloakDataTable.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useWhoAmI} from "../context/whoami/WhoAmI.js";
import {toUser} from "../user/routes/User.js";
import useFormatDate from "../utils/useFormatDate.js";
export default function SessionsTable({
  loader,
  hiddenColumns = [],
  emptyInstructions,
  logoutUser
}) {
  const {realm} = useRealm();
  const {whoAmI} = useWhoAmI();
  const {t} = useTranslation("sessions");
  const {keycloak, adminClient} = useAdminClient();
  const {addError} = useAlerts();
  const formatDate = useFormatDate();
  const [key, setKey] = useState(0);
  const refresh = () => setKey((value) => value + 1);
  const columns = useMemo(() => {
    const UsernameCell = (row) => /* @__PURE__ */ React.createElement(Link, {
      to: toUser({realm, id: row.userId, tab: "sessions"})
    }, row.username);
    const ClientsCell = (row) => /* @__PURE__ */ React.createElement(List, {
      variant: ListVariant.inline
    }, Object.entries(row.clients).map(([clientId, client]) => /* @__PURE__ */ React.createElement(ListItem, {
      key: clientId
    }, /* @__PURE__ */ React.createElement(Link, {
      to: toClient({realm, clientId, tab: "sessions"})
    }, client))));
    const defaultColumns = [
      {
        name: "username",
        displayKey: "sessions:user",
        cellRenderer: UsernameCell
      },
      {
        name: "start",
        displayKey: "sessions:started",
        cellRenderer: (row) => formatDate(new Date(row.start))
      },
      {
        name: "lastAccess",
        displayKey: "sessions:lastAccess",
        cellRenderer: (row) => formatDate(new Date(row.lastAccess))
      },
      {
        name: "ipAddress",
        displayKey: "events:ipAddress"
      },
      {
        name: "clients",
        displayKey: "sessions:clients",
        cellRenderer: ClientsCell
      }
    ];
    return defaultColumns.filter(({name}) => !hiddenColumns.includes(name));
  }, [realm, hiddenColumns]);
  const [toggleLogoutDialog, LogoutConfirm] = useConfirmDialog({
    titleKey: "sessions:logoutAllSessions",
    messageKey: "sessions:logoutAllDescription",
    continueButtonLabel: "common:confirm",
    onConfirm: async () => {
      try {
        await adminClient.users.logout({id: logoutUser});
        refresh();
      } catch (error) {
        addError("sessions:logoutAllSessionsError", error);
      }
    }
  });
  async function onClickSignOut(session) {
    await adminClient.realms.deleteSession({realm, session: session.id});
    if (session.userId === whoAmI.getUserId()) {
      await keycloak.logout({redirectUri: ""});
    } else {
      refresh();
    }
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(LogoutConfirm, null), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader,
    ariaLabelKey: "sessions:title",
    searchPlaceholderKey: "sessions:searchForSession",
    toolbarItem: logoutUser && /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      onClick: toggleLogoutDialog
    }, t("logoutAllSessions"))),
    columns,
    actions: [
      {
        title: t("common:signOut"),
        onRowClick: onClickSignOut
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      hasIcon: true,
      icon: CubesIcon,
      message: t("noSessions"),
      instructions: emptyInstructions ? emptyInstructions : t("noSessionsDescription")
    })
  }));
}
