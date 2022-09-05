import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const AddUserRoute = {
  path: "/:realm/users/add-user",
  component: lazy(() => import("../UsersTabs.js")),
  breadcrumb: (t) => t("users:createUser"),
  access: "manage-users"
};
export const toAddUser = (params) => ({
  pathname: generatePath(AddUserRoute.path, params)
});
