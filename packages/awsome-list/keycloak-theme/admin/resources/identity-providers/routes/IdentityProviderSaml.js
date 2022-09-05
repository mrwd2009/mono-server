import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const IdentityProviderSamlRoute = {
  path: "/:realm/identity-providers/saml/add",
  component: lazy(() => import("../add/AddSamlConnect.js")),
  breadcrumb: (t) => t("identity-providers:addSamlProvider"),
  access: "manage-identity-providers"
};
export const toIdentityProviderSaml = (params) => ({
  pathname: generatePath(IdentityProviderSamlRoute.path, params)
});
