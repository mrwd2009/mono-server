import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const UserFederationLdapMapperRoute = {
  path: "/:realm/user-federation/ldap/:id/:tab/:mapperId",
  component: lazy(() => import("../ldap/mappers/LdapMapperDetails.js")),
  breadcrumb: (t) => t("common:mappingDetails"),
  access: "view-realm"
};
export const toUserFederationLdapMapper = (params) => ({
  pathname: generatePath(UserFederationLdapMapperRoute.path, params)
});
