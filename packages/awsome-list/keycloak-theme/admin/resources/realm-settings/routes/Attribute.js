import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const AttributeRoute = {
  path: "/:realm/realm-settings/user-profile/attributes/:attributeName/edit-attribute",
  component: lazy(() => import("../NewAttributeSettings.js")),
  breadcrumb: (t) => t("realm-settings:editAttribute"),
  access: "manage-realm"
};
export const toAttribute = (params) => ({
  pathname: generatePath(AttributeRoute.path, params)
});
