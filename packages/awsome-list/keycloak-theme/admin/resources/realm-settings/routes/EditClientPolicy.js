import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const EditClientPolicyRoute = {
  path: "/:realm/realm-settings/client-policies/:policyName/edit-policy",
  component: lazy(() => import("../NewClientPolicyForm.js")),
  access: "manage-realm",
  breadcrumb: (t) => t("realm-settings:policyDetails")
};
export const toEditClientPolicy = (params) => ({
  pathname: generatePath(EditClientPolicyRoute.path, params)
});
