import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const UserFederationsLdapRoute = {
  path: "/:realm/user-federation/ldap",
  component: lazy(() => import("../UserFederationSection.js")),
  access: "view-realm"
};
export const toUserFederationsLdap = (params) => ({
  pathname: generatePath(UserFederationsLdapRoute.path, params)
});
