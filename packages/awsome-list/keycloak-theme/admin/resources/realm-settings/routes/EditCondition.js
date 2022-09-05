import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const EditClientPolicyConditionRoute = {
  path: "/:realm/realm-settings/client-policies/:policyName?/edit-policy/:conditionName/edit-condition",
  component: lazy(() => import("../NewClientPolicyCondition.js")),
  breadcrumb: (t) => t("realm-settings:editCondition"),
  access: "manage-clients"
};
export const toEditClientPolicyCondition = (params) => ({
  pathname: generatePath(EditClientPolicyConditionRoute.path, params)
});
