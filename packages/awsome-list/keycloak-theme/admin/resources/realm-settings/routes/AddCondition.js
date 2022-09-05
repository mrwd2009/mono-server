import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const NewClientPolicyConditionRoute = {
  path: "/:realm/realm-settings/client-policies/:policyName?/edit-policy/create-condition",
  component: lazy(() => import("../NewClientPolicyCondition.js")),
  breadcrumb: (t) => t("realm-settings:addCondition"),
  access: "manage-clients"
};
export const toNewClientPolicyCondition = (params) => ({
  pathname: generatePath(NewClientPolicyConditionRoute.path, params)
});
