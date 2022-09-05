import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const IdentityProviderAddMapperRoute = {
  path: "/:realm/identity-providers/:providerId/:alias/:tab/create",
  component: lazy(() => import("../add/AddMapper.js")),
  access: "manage-identity-providers",
  breadcrumb: (t) => t("identity-providers:addIdPMapper")
};
export const toIdentityProviderAddMapper = (params) => ({
  pathname: generatePath(IdentityProviderAddMapperRoute.path, params)
});
