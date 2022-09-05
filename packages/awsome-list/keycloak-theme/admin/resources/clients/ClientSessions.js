import {PageSection} from "../_snowpack/pkg/@patternfly/react-core.js";
import React from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import SessionsTable from "../sessions/SessionsTable.js";
export const ClientSessions = ({client}) => {
  const {adminClient} = useAdminClient();
  const {t} = useTranslation("sessions");
  const loader = (first, max) => adminClient.clients.listSessions({id: client.id, first, max});
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(SessionsTable, {
    loader,
    hiddenColumns: ["clients"],
    emptyInstructions: t("noSessionsForClient")
  }));
};
