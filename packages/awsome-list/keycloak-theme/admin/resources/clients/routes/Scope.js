import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
import {lazy} from "../../_snowpack/pkg/react.js";
export const ScopeDetailsRoute = {
  path: "/:realm/clients/:id/authorization/scope/:scopeId?",
  component: lazy(() => import("../authorization/ScopeDetails.js")),
  breadcrumb: (t) => t("clients:createAuthorizationScope"),
  access: "manage-clients"
};
export const toScopeDetails = (params) => ({
  pathname: generatePath(ScopeDetailsRoute.path, params)
});
