import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const DedicatedScopeDetailsRoute = {
  path: "/:realm/clients/:clientId/clientScopes/dedicated/:tab?",
  component: lazy(() => import("../scopes/DedicatedScopes.js")),
  breadcrumb: (t) => t("clients:dedicatedScopes"),
  access: "view-clients"
};
export const toDedicatedScope = (params) => ({
  pathname: generatePath(DedicatedScopeDetailsRoute.path, params)
});
