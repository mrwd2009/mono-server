import {AddRoleRoute} from "./routes/AddRole.js";
import {AddRoleToClientRoute} from "./routes/AddRoleToClient.js";
import {ClientRoleRoute} from "./routes/ClientRole.js";
import {RealmRoleRoute} from "./routes/RealmRole.js";
import {RealmRolesRoute} from "./routes/RealmRoles.js";
const routes = [
  AddRoleToClientRoute,
  ClientRoleRoute,
  RealmRolesRoute,
  AddRoleRoute,
  RealmRoleRoute
];
export default routes;
