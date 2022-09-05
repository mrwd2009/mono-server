import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
import {lazy} from "../../_snowpack/pkg/react.js";
export const ResourceDetailsRoute = {
  path: "/:realm/clients/:id/authorization/resource/:resourceId?",
  component: lazy(() => import("../authorization/ResourceDetails.js")),
  breadcrumb: (t) => t("clients:createResource"),
  access: "view-clients"
};
export const toResourceDetails = (params) => ({
  pathname: generatePath(ResourceDetailsRoute.path, params)
});
