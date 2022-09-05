import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const IdentityProvidersRoute = {
  path: "/:realm/identity-providers",
  component: lazy(() => import("../IdentityProvidersSection.js")),
  breadcrumb: (t) => t("identityProviders"),
  access: "view-identity-providers"
};
export const toIdentityProviders = (params) => ({
  pathname: generatePath(IdentityProvidersRoute.path, params)
});
