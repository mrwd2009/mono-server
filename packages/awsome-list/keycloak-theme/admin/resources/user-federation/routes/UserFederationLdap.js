import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const UserFederationLdapRoute = {
  path: "/:realm/user-federation/ldap/:id/:tab?",
  component: lazy(() => import("../UserFederationLdapSettings.js")),
  breadcrumb: (t) => t("common:settings"),
  access: "view-realm"
};
export const toUserFederationLdap = (params) => ({
  pathname: generatePath(UserFederationLdapRoute.path, params)
});
