import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const NewKerberosUserFederationRoute = {
  path: "/:realm/user-federation/kerberos/new",
  component: lazy(() => import("../UserFederationKerberosSettings.js")),
  breadcrumb: (t) => t("common:settings"),
  access: "view-realm"
};
export const toNewKerberosUserFederation = (params) => ({
  pathname: generatePath(NewKerberosUserFederationRoute.path, params)
});
