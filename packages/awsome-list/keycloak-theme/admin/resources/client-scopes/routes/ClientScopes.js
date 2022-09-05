import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const ClientScopesRoute = {
  path: "/:realm/client-scopes",
  component: lazy(() => import("../ClientScopesSection.js")),
  breadcrumb: (t) => t("client-scopes:clientScopeList"),
  access: "view-clients"
};
export const toClientScopes = (params) => ({
  pathname: generatePath(ClientScopesRoute.path, params)
});
