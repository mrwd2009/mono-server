import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
import {lazy} from "../../_snowpack/pkg/react.js";
export const NewPolicyRoute = {
  path: "/:realm/clients/:id/authorization/policy/new/:policyType",
  component: lazy(() => import("../authorization/policy/PolicyDetails.js")),
  breadcrumb: (t) => t("clients:createPolicy"),
  access: "view-clients"
};
export const toCreatePolicy = (params) => ({
  pathname: generatePath(NewPolicyRoute.path, params)
});
