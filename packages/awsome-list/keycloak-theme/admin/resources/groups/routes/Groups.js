import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const GroupsRoute = {
  path: "/:realm/groups/:id?",
  component: lazy(() => import("../GroupsSection.js")),
  access: "query-groups",
  matchOptions: {
    exact: false
  }
};
export const toGroups = (params) => ({
  pathname: generatePath(GroupsRoute.path, params)
});
