import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const CreateFlowRoute = {
  path: "/:realm/authentication/flows/create",
  component: lazy(() => import("../form/CreateFlow.js")),
  breadcrumb: (t) => t("authentication:createFlow"),
  access: "manage-authorization"
};
export const toCreateFlow = (params) => ({
  pathname: generatePath(CreateFlowRoute.path, params)
});
