import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const AddClientProfileRoute = {
  path: "/:realm/realm-settings/client-policies/:tab/add-profile",
  component: lazy(() => import("../ClientProfileForm.js")),
  breadcrumb: (t) => t("realm-settings:newClientProfile"),
  access: "manage-realm"
};
export const toAddClientProfile = (params) => ({
  pathname: generatePath(AddClientProfileRoute.path, params)
});
