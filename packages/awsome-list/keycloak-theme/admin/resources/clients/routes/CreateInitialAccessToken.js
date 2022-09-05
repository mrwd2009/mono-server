import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const CreateInitialAccessTokenRoute = {
  path: "/:realm/clients/initialAccessToken/create",
  component: lazy(() => import("../initial-access/CreateInitialAccessToken.js")),
  breadcrumb: (t) => t("clients:createToken"),
  access: "manage-clients"
};
export const toCreateInitialAccessToken = (params) => ({
  pathname: generatePath(CreateInitialAccessTokenRoute.path, params)
});
