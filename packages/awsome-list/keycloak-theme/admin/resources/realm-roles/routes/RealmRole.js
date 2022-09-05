import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router.js";
export const RealmRoleRoute = {
  path: "/:realm/roles/:id/:tab?",
  component: lazy(() => import("../RealmRoleTabs.js")),
  breadcrumb: (t) => t("roles:roleDetails"),
  access: ["view-realm", "view-users"]
};
export const toRealmRole = (params) => ({
  pathname: generatePath(RealmRoleRoute.path, params)
});
