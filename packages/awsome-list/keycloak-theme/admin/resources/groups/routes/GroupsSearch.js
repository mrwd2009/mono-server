import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const GroupsSearchRoute = {
  path: "/:realm/groups/search",
  component: lazy(() => import("../SearchGroups.js")),
  breadcrumb: (t) => t("groups:searchGroups"),
  access: "query-groups"
};
export const toGroupsSearch = (params) => ({
  pathname: generatePath(GroupsSearchRoute.path, params)
});
