import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const NewClientScopeRoute = {
  path: "/:realm/client-scopes/new",
  component: lazy(() => import("../form/ClientScopeForm.js")),
  breadcrumb: (t) => t("client-scopes:createClientScope"),
  access: "manage-clients"
};
export const toNewClientScope = (params) => ({
  pathname: generatePath(NewClientScopeRoute.path, params)
});
