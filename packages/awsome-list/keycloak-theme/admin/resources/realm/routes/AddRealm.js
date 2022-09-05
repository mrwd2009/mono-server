import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const AddRealmRoute = {
  path: "/:realm/add-realm",
  component: lazy(() => import("../add/NewRealmForm.js")),
  breadcrumb: (t) => t("realm:createRealm"),
  access: "view-realm"
};
export const toAddRealm = (params) => ({
  pathname: generatePath(AddRealmRoute.path, params)
});
