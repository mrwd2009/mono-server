import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const CustomProviderRoute = {
  path: "/:realm/user-federation/:providerId/new",
  component: lazy(() => import("../custom/CustomProviderSettings.js")),
  breadcrumb: (t) => t("user-federation:addCustomProvider"),
  access: "view-realm"
};
export const CustomEditProviderRoute = {
  path: "/:realm/user-federation/:providerId/:id",
  component: lazy(() => import("../custom/CustomProviderSettings.js")),
  breadcrumb: (t) => t("user-federation:providerDetails"),
  access: "view-realm"
};
export const toProvider = (params) => ({
  pathname: generatePath(CustomProviderRoute.path, params)
});
