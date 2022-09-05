import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const IdentityProviderRoute = {
  path: "/:realm/identity-providers/:providerId/:alias/:tab",
  component: lazy(() => import("../add/DetailSettings.js")),
  breadcrumb: (t) => t("identity-providers:providerDetails"),
  access: "manage-identity-providers"
};
export const toIdentityProvider = (params) => ({
  pathname: generatePath(IdentityProviderRoute.path, params)
});
