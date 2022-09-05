import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const ClientScopesRoute = {
  path: "/:realm/clients/:clientId/clientScopes/:tab",
  component: lazy(() => import("../ClientDetails.js")),
  breadcrumb: (t) => t("clients:clientSettings"),
  access: "view-clients"
};
export const toClientScopesTab = (params) => ({
  pathname: generatePath(ClientScopesRoute.path, params)
});
