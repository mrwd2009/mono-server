import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const ExecutorRoute = {
  path: "/:realm/realm-settings/client-policies/:profileName/edit-profile/:executorName",
  component: lazy(() => import("../ExecutorForm.js")),
  breadcrumb: (t) => t("realm-settings:executorDetails"),
  access: ["manage-realm"]
};
export const toExecutor = (params) => ({
  pathname: generatePath(ExecutorRoute.path, params)
});
