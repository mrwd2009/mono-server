import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const UserFederationRoute = {
  path: "/:realm/user-federation",
  component: lazy(() => import("../UserFederationSection.js")),
  breadcrumb: (t) => t("userFederation"),
  access: "view-realm"
};
export const toUserFederation = (params) => ({
  pathname: generatePath(UserFederationRoute.path, params)
});
