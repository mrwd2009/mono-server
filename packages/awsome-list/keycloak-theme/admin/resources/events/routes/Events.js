import {lazy} from "../../_snowpack/pkg/react.js";
import {generatePath} from "../../_snowpack/pkg/react-router-dom.js";
export const EventsRoute = {
  path: "/:realm/events/:tab?",
  component: lazy(() => import("../EventsSection.js")),
  breadcrumb: (t) => t("events:title"),
  access: "view-events"
};
export const toEvents = (params) => ({
  pathname: generatePath(EventsRoute.path, params)
});
