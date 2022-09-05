import {ClientScopeRoute} from "./routes/ClientScope.js";
import {ClientScopesRoute} from "./routes/ClientScopes.js";
import {MapperRoute} from "./routes/Mapper.js";
import {NewClientScopeRoute} from "./routes/NewClientScope.js";
const routes = [
  NewClientScopeRoute,
  MapperRoute,
  ClientScopeRoute,
  ClientScopesRoute
];
export default routes;
