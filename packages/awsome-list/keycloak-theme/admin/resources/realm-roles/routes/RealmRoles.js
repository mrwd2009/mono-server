import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const RealmRolesRoute = {
  path: "/:realm/roles",
  component: lazy(() => import("../RealmRolesSection.js")),
  breadcrumb: (t) => t("roles:roleList"),
  access: "view-realm"
};
export const toRealmRoles = (params) => ({
  pathname: generatePath(RealmRolesRoute.path, params)
});
