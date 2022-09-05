import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const ClientProfileRoute = {
  path: "/:realm/realm-settings/client-policies/:profileName/edit-profile",
  component: lazy(() => import("../ClientProfileForm.js")),
  breadcrumb: (t) => t("realm-settings:clientProfile"),
  access: ["view-realm", "view-users"]
};
export const toClientProfile = (params) => ({
  pathname: generatePath(ClientProfileRoute.path, params)
});
