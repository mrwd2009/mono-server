import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const IdentityProviderOidcRoute = {
  path: "/:realm/identity-providers/oidc/add",
  component: lazy(() => import("../add/AddOpenIdConnect.js")),
  breadcrumb: (t) => t("identity-providers:addOpenIdProvider"),
  access: "manage-identity-providers"
};
export const toIdentityProviderOidc = (params) => ({
  pathname: generatePath(IdentityProviderOidcRoute.path, params)
});
