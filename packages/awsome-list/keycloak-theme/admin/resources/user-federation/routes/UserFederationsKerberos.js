import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const UserFederationsKerberosRoute = {
  path: "/:realm/user-federation/kerberos",
  component: lazy(() => import("../UserFederationSection.js")),
  access: "view-realm"
};
export const toUserFederationsKerberos = (params) => ({
  pathname: generatePath(UserFederationsKerberosRoute.path, params)
});
