import authenticationRoutes from "./authentication/routes.js";
import clientScopesRoutes from "./client-scopes/routes.js";
import clientRoutes from "./clients/routes.js";
import dashboardRoutes from "./dashboard/routes.js";
import eventRoutes from "./events/routes.js";
import groupsRoutes from "./groups/routes.js";
import identityProviders from "./identity-providers/routes.js";
import {PageNotFoundSection} from "./PageNotFoundSection.js";
import realmRoleRoutes from "./realm-roles/routes.js";
import realmSettingRoutes from "./realm-settings/routes.js";
import realmRoutes from "./realm/routes.js";
import sessionRoutes from "./sessions/routes.js";
import userFederationRoutes from "./user-federation/routes.js";
import userRoutes from "./user/routes.js";
const NotFoundRoute = {
  path: "*",
  component: PageNotFoundSection,
  access: "anyone"
};
export const routes = [
  ...authenticationRoutes,
  ...clientRoutes,
  ...clientScopesRoutes,
  ...eventRoutes,
  ...identityProviders,
  ...realmRoleRoutes,
  ...realmRoutes,
  ...realmSettingRoutes,
  ...sessionRoutes,
  ...userFederationRoutes,
  ...userRoutes,
  ...groupsRoutes,
  ...dashboardRoutes,
  NotFoundRoute
];
