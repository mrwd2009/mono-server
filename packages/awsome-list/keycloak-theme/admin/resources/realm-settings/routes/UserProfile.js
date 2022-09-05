import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const UserProfileRoute = {
  path: "/:realm/realm-settings/user-profile/:tab",
  component: lazy(() => import("../RealmSettingsSection.js")),
  breadcrumb: (t) => t("realm-settings:userProfile"),
  access: "view-realm"
};
export const toUserProfile = (params) => ({
  pathname: generatePath(UserProfileRoute.path, params)
});
