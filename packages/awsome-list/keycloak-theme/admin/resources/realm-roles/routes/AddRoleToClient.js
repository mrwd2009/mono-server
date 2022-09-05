import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const AddRoleToClientRoute = {
  path: "/:realm/clients/:clientId/roles/add-role",
  component: lazy(() => import("../RealmRoleTabs.js")),
  breadcrumb: (t) => t("roles:createRole"),
  access: "manage-realm"
};
export const toAddRoleToClient = (params) => ({
  pathname: generatePath(AddRoleToClientRoute.path, params)
});
