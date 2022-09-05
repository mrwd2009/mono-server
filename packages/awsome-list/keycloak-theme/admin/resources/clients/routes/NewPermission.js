import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
import {lazy} from "../../_snowpack/pkg/react.js";
export const NewPermissionRoute = {
  path: "/:realm/clients/:id/authorization/permission/new/:permissionType/:selectedId?",
  component: lazy(() => import("../authorization/PermissionDetails.js")),
  breadcrumb: (t) => t("clients:createPermission"),
  access: "view-clients"
};
export const toNewPermission = (params) => ({
  pathname: generatePath(NewPermissionRoute.path, params)
});
