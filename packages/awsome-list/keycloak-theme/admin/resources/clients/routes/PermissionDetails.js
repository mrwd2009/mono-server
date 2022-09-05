import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
import {lazy} from "../../_snowpack/pkg/react.js";
export const PermissionDetailsRoute = {
  path: "/:realm/clients/:id/authorization/permission/:permissionType/:permissionId",
  component: lazy(() => import("../authorization/PermissionDetails.js")),
  breadcrumb: (t) => t("clients:permissionDetails"),
  access: "view-clients"
};
export const toPermissionDetails = (params) => ({
  pathname: generatePath(PermissionDetailsRoute.path, params)
});
