import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const NewAttributesGroupRoute = {
  path: "/:realm/realm-settings/user-profile/attributesGroup/new",
  component: lazy(() => import("../user-profile/AttributesGroupDetails.js")),
  breadcrumb: (t) => t("attributes-group:createGroupText"),
  access: "view-realm"
};
export const toNewAttributesGroup = (params) => ({
  pathname: generatePath(NewAttributesGroupRoute.path, params)
});
