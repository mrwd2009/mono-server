import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const KeyProviderFormRoute = {
  path: "/:realm/realm-settings/keys/providers/:id/:providerType/settings",
  component: lazy(() => import("../keys/key-providers/KeyProviderForm.js")),
  breadcrumb: (t) => t("realm-settings:editProvider"),
  access: "view-realm"
};
export const toKeyProvider = (params) => ({
  pathname: generatePath(KeyProviderFormRoute.path, params)
});
