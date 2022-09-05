import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const UserRoute = {
  path: "/:realm/users/:id/:tab",
  component: lazy(() => import("../UsersTabs.js")),
  breadcrumb: (t) => t("users:userDetails"),
  access: "view-users"
};
export const toUser = (params) => ({
  pathname: generatePath(UserRoute.path, params)
});
