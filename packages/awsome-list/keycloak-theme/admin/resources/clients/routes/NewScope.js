import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
import {lazy} from "../../_snowpack/pkg/react.js";
export const NewScopeRoute = {
  path: "/:realm/clients/:id/authorization/scope/new",
  component: lazy(() => import("../authorization/ScopeDetails.js")),
  breadcrumb: (t) => t("clients:createAuthorizationScope"),
  access: "view-clients"
};
export const toNewScope = (params) => ({
  pathname: generatePath(NewScopeRoute.path, params)
});
