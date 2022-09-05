import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const AddExecutorRoute = {
  path: "/:realm/realm-settings/client-policies/:profileName/add-executor",
  component: lazy(() => import("../ExecutorForm.js")),
  breadcrumb: (t) => t("realm-settings:addExecutor"),
  access: "manage-realm"
};
export const toAddExecutor = (params) => ({
  pathname: generatePath(AddExecutorRoute.path, params)
});
