import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const ClientPoliciesRoute = {
  path: "/:realm/realm-settings/client-policies/:tab",
  component: lazy(() => import("../RealmSettingsSection.js")),
  breadcrumb: (t) => t("realm-settings:clientPolicies"),
  access: "view-realm"
};
export const toClientPolicies = (params) => ({
  pathname: generatePath(ClientPoliciesRoute.path, params)
});
