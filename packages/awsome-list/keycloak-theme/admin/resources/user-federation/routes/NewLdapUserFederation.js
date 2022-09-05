import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const NewLdapUserFederationRoute = {
  path: "/:realm/user-federation/ldap/new",
  component: lazy(() => import("../UserFederationLdapSettings.js")),
  breadcrumb: (t) => t("user-federation:addProvider", {provider: "LDAP", count: 1}),
  access: "view-realm"
};
export const toNewLdapUserFederation = (params) => ({
  pathname: generatePath(NewLdapUserFederationRoute.path, params)
});
