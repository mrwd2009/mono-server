import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const EditAttributesGroupRoute = {
  path: "/:realm/realm-settings/user-profile/attributesGroup/edit/:name",
  component: lazy(() => import("../user-profile/AttributesGroupDetails.js")),
  breadcrumb: (t) => t("attributes-group:editGroupText"),
  access: "view-realm"
};
export const toEditAttributesGroup = (params) => ({
  pathname: generatePath(EditAttributesGroupRoute.path, params)
});
