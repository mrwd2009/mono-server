import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const ClientRoute = {
  path: "/:realm/clients/:clientId/:tab",
  component: lazy(() => import("../ClientDetails.js")),
  breadcrumb: (t) => t("clients:clientSettings"),
  access: "view-clients"
};
export const toClient = (params) => ({
  pathname: generatePath(ClientRoute.path, params)
});
