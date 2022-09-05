import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const AddRoleRoute = {
  path: "/:realm/roles/add-role",
  component: lazy(() => import("../RealmRoleTabs.js")),
  breadcrumb: (t) => t("roles:createRole"),
  access: "manage-realm"
};
export const toAddRole = (params) => ({
  pathname: generatePath(AddRoleRoute.path, params)
});
