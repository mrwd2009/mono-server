import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const MapperRoute = {
  path: "/:realm/client-scopes/:id/:type/mappers/:mapperId",
  component: lazy(() => import("../details/MappingDetails.js")),
  breadcrumb: (t) => t("common:mappingDetails"),
  access: "view-clients"
};
export const toMapper = (params) => ({
  pathname: generatePath(MapperRoute.path, params)
});
