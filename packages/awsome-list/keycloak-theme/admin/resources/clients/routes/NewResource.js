import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
import {lazy} from "../../_snowpack/pkg/react.js";
export const NewResourceRoute = {
  path: "/:realm/clients/:id/authorization/resource/new",
  component: lazy(() => import("../authorization/ResourceDetails.js")),
  breadcrumb: (t) => t("clients:createResource"),
  access: "view-clients"
};
export const toCreateResource = (params) => ({
  pathname: generatePath(NewResourceRoute.path, params)
});
