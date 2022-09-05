import {PageSection} from "../_snowpack/pkg/@patternfly/react-core.js";
import React from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useParams} from "../_snowpack/pkg/react-router-dom.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import SessionsTable from "../sessions/SessionsTable.js";
export const UserSessions = () => {
  const {adminClient} = useAdminClient();
  const {id} = useParams();
  const {realm} = useRealm();
  const {t} = useTranslation("sessions");
  const loader = () => adminClient.users.listSessions({id, realm});
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(SessionsTable, {
    loader,
    hiddenColumns: ["username"],
    emptyInstructions: t("noSessionsForUser"),
    logoutUser: id
  }));
};
