import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const ImportClientRoute = {
  path: "/:realm/clients/import-client",
  component: lazy(() => import("../import/ImportForm.js")),
  breadcrumb: (t) => t("clients:importClient"),
  access: "manage-clients"
};
export const toImportClient = (params) => ({
  pathname: generatePath(ImportClientRoute.path, params)
});
