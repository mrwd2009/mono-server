import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
import {lazy} from "../../_snowpack/pkg/react.js";
export const PolicyDetailsRoute = {
  path: "/:realm/clients/:id/authorization/policy/:policyId/:policyType",
  component: lazy(() => import("../authorization/policy/PolicyDetails.js")),
  breadcrumb: (t) => t("clients:createPolicy"),
  access: "view-clients"
};
export const toPolicyDetails = (params) => ({
  pathname: generatePath(PolicyDetailsRoute.path, params)
});
