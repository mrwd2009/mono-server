import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const AuthenticationRoute = {
  path: "/:realm/authentication/:tab?",
  component: lazy(() => import("../AuthenticationSection.js")),
  breadcrumb: (t) => t("authentication"),
  access: ["view-realm", "view-identity-providers", "view-clients"]
};
export const toAuthentication = (params) => ({
  pathname: generatePath(AuthenticationRoute.path, params)
});
