import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const KeysRoute = {
  path: "/:realm/realm-settings/keys/:tab",
  component: lazy(() => import("../RealmSettingsSection.js")),
  breadcrumb: (t) => t("realm-settings:keys"),
  access: "view-realm"
};
export const toKeysTab = (params) => ({
  pathname: generatePath(KeysRoute.path, params)
});
