import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const IdentityProviderKeycloakOidcRoute = {
  path: "/:realm/identity-providers/keycloak-oidc/add",
  component: lazy(() => import("../add/AddOpenIdConnect.js")),
  breadcrumb: (t) => t("identity-providers:addKeycloakOpenIdProvider"),
  access: "manage-identity-providers"
};
export const toIdentityProviderKeycloakOidc = (params) => ({
  pathname: generatePath(IdentityProviderKeycloakOidcRoute.path, params)
});
