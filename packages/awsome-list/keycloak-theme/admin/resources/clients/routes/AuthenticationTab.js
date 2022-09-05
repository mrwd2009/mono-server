import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const AuthorizationRoute = {
  path: "/:realm/clients/:clientId/authorization/:tab",
  component: lazy(() => import("../ClientDetails.js")),
  breadcrumb: (t) => t("clients:clientSettings"),
  access: "view-clients"
};
export const toAuthorizationTab = (params) => ({
  pathname: generatePath(AuthorizationRoute.path, params)
});
