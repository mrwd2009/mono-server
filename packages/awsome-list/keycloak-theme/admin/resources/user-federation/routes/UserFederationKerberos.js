import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const UserFederationKerberosRoute = {
  path: "/:realm/user-federation/kerberos/:id",
  component: lazy(() => import("../UserFederationKerberosSettings.js")),
  breadcrumb: (t) => t("common:settings"),
  access: "view-realm"
};
export const toUserFederationKerberos = (params) => ({
  pathname: generatePath(UserFederationKerberosRoute.path, params)
});
