import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const AddAttributeRoute = {
  path: "/:realm/realm-settings/user-profile/attributes/add-attribute",
  component: lazy(() => import("../NewAttributeSettings.js")),
  breadcrumb: (t) => t("realm-settings:createAttribute"),
  access: "manage-realm"
};
export const toAddAttribute = (params) => ({
  pathname: generatePath(AddAttributeRoute.path, params)
});
