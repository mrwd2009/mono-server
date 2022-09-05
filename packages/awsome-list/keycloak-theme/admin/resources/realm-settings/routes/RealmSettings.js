import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const RealmSettingsRoute = {
  path: "/:realm/realm-settings/:tab?",
  component: lazy(() => import("../RealmSettingsSection.js")),
  breadcrumb: (t) => t("realmSettings"),
  access: "view-realm"
};
export const toRealmSettings = (params) => ({
  pathname: generatePath(RealmSettingsRoute.path, params)
});
