import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const AddClientPolicyRoute = {
  path: "/:realm/realm-settings/client-policies/policies/add-client-policy",
  component: lazy(() => import("../NewClientPolicyForm.js")),
  breadcrumb: (t) => t("realm-settings:createPolicy"),
  access: "manage-clients"
};
export const toAddClientPolicy = (params) => ({
  pathname: generatePath(AddClientPolicyRoute.path, params)
});
