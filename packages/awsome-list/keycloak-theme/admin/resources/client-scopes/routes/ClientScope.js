import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const ClientScopeRoute = {
  path: "/:realm/client-scopes/:id/:tab/:type?",
  component: lazy(() => import("../form/ClientScopeForm.js")),
  breadcrumb: (t) => t("client-scopes:clientScopeDetails"),
  access: "view-clients"
};
export const toClientScope = (params) => ({
  pathname: generatePath(ClientScopeRoute.path, params)
});
