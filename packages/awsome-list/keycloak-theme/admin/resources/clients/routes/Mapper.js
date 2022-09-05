import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
import {lazy} from "../../_snowpack/pkg/react.js";
export const MapperRoute = {
  path: "/:realm/clients/:id/clientScopes/dedicated/mappers/:mapperId",
  component: lazy(() => import("../../client-scopes/details/MappingDetails.js")),
  breadcrumb: (t) => t("common:mappingDetails"),
  access: "view-clients"
};
export const toMapper = (params) => ({
  pathname: generatePath(MapperRoute.path, params)
});
