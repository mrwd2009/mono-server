import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const FlowRoute = {
  path: "/:realm/authentication/:id/:usedBy/:builtIn?",
  component: lazy(() => import("../FlowDetails.js")),
  breadcrumb: (t) => t("authentication:flowDetails"),
  access: "view-authorization"
};
export const toFlow = (params) => ({
  pathname: generatePath(FlowRoute.path, params)
});
