import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const DashboardRoute = {
  path: "/:realm?/:tab?",
  component: lazy(() => import("../Dashboard.js")),
  breadcrumb: (t) => t("common:home"),
  access: "anyone"
};
export const toDashboard = (params) => ({
  pathname: generatePath(DashboardRoute.path, params)
});
