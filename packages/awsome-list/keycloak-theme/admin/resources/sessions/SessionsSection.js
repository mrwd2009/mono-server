import {DropdownItem, PageSection} from "../_snowpack/pkg/@patternfly/react-core.js";
import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import helpUrls from "../help-urls.js";
import {RevocationModal} from "./RevocationModal.js";
import SessionsTable from "./SessionsTable.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import "./SessionsSection.css.proxy.js";
export default function SessionsSection() {
  const {t} = useTranslation("sessions");
  const {keycloak, adminClient} = useAdminClient();
  const {addError} = useAlerts();
  const {realm} = useRealm();
  const [revocationModalOpen, setRevocationModalOpen] = useState(false);
  const [activeClientDetails, setActiveClientDetails] = useState([]);
  const [noSessions, setNoSessions] = useState(false);
  const handleRevocationModalToggle = () => {
    setRevocationModalOpen(!revocationModalOpen);
  };
  const loader = async () => {
    const activeClients = await adminClient.sessions.find();
    const clientSessions = (await Promise.all(activeClients.map((client) => adminClient.clients.listSessions({id: client.id})))).flat();
    setNoSessions(clientSessions.length === 0);
    const allClients = await adminClient.clients.find();
    const getActiveClientDetails = allClients.filter((x) => activeClients.map((y) => y.id).includes(x.id));
    setActiveClientDetails(getActiveClientDetails);
    const userIds = Array.from(new Set(clientSessions.map((session) => session.userId)));
    const userSessions = (await Promise.all(userIds.map((userId) => adminClient.users.listSessions({id: userId})))).flat();
    return userSessions;
  };
  const [toggleLogoutDialog, LogoutConfirm] = useConfirmDialog({
    titleKey: "sessions:logoutAllSessions",
    messageKey: "sessions:logoutAllDescription",
    continueButtonLabel: "common:confirm",
    onConfirm: async () => {
      try {
        await adminClient.realms.logoutAll({realm});
        keycloak.logout({redirectUri: ""});
      } catch (error) {
        addError("sessions:logoutAllSessionsError", error);
      }
    }
  });
  const dropdownItems = [
    /* @__PURE__ */ React.createElement(DropdownItem, {
      key: "toggle-modal",
      "data-testid": "revocation",
      component: "button",
      onClick: () => handleRevocationModalToggle()
    }, t("revocation")),
    /* @__PURE__ */ React.createElement(DropdownItem, {
      key: "delete-role",
      "data-testid": "logout-all",
      component: "button",
      isDisabled: noSessions,
      onClick: toggleLogoutDialog
    }, t("signOutAllActiveSessions"))
  ];
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(LogoutConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    dropdownItems,
    titleKey: "sessions:title",
    subKey: "sessions:sessionExplain",
    helpUrl: helpUrls.sessionsUrl
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, revocationModalOpen && /* @__PURE__ */ React.createElement(RevocationModal, {
    handleModalToggle: handleRevocationModalToggle,
    activeClients: activeClientDetails,
    save: () => {
      handleRevocationModalToggle();
    }
  }), /* @__PURE__ */ React.createElement(SessionsTable, {
    loader
  })));
}
