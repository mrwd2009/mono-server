import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const AddClientRoute = {
  path: "/:realm/clients/add-client",
  component: lazy(() => import("../add/NewClientForm.js")),
  breadcrumb: (t) => t("clients:createClient"),
  access: "manage-clients"
};
export const toAddClient = (params) => ({
  pathname: generatePath(AddClientRoute.path, params)
});
