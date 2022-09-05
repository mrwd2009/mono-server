import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const IdentityProviderEditMapperRoute = {
  path: "/:realm/identity-providers/:providerId/:alias/mappers/:id",
  component: lazy(() => import("../add/AddMapper.js")),
  access: "manage-identity-providers",
  breadcrumb: (t) => t("identity-providers:editIdPMapper")
};
export const toIdentityProviderEditMapper = (params) => ({
  pathname: generatePath(IdentityProviderEditMapperRoute.path, params)
});
