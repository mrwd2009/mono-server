import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const IdentityProviderCreateRoute = {
  path: "/:realm/identity-providers/:providerId/add",
  component: lazy(() => import("../add/AddIdentityProvider.js")),
  breadcrumb: (t) => t("identity-providers:addProvider"),
  access: "manage-identity-providers"
};
export const toIdentityProviderCreate = (params) => ({
  pathname: generatePath(IdentityProviderCreateRoute.path, params)
});
