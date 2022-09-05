import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const SessionsRoute = {
  path: "/:realm/sessions",
  component: lazy(() => import("../SessionsSection.js")),
  breadcrumb: (t) => t("sessions:title"),
  access: ["view-realm", "view-clients", "view-users"]
};
export const toSessions = (params) => ({
  pathname: generatePath(SessionsRoute.path, params)
});
