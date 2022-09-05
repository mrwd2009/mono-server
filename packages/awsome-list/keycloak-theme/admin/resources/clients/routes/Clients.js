import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const ClientsRoute = {
  path: "/:realm/clients/:tab?",
  component: lazy(() => import("../ClientsSection.js")),
  breadcrumb: (t) => t("clients:clientList"),
  access: "query-clients"
};
export const toClients = (params) => ({
  pathname: generatePath(ClientsRoute.path, params)
});
