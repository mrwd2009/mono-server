import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const UsersRoute = {
  path: "/:realm/users/:tab?",
  component: lazy(() => import("../UsersSection.js")),
  breadcrumb: (t) => t("users:title"),
  access: "query-users"
};
export const toUsers = (params) => ({
  pathname: generatePath(UsersRoute.path, params)
});
