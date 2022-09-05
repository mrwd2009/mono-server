import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const ClientRoleRoute = {
  path: "/:realm/clients/:clientId/roles/:id/:tab?",
  component: lazy(() => import("../RealmRoleTabs.js")),
  breadcrumb: (t) => t("roles:roleDetails"),
  access: "view-realm"
};
export const toClientRole = (params) => ({
  pathname: generatePath(ClientRoleRoute.path, params)
});
