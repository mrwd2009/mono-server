import {AddClientRoute} from "./routes/AddClient.js";
import {ClientRoute} from "./routes/Client.js";
import {ClientsRoute} from "./routes/Clients.js";
import {CreateInitialAccessTokenRoute} from "./routes/CreateInitialAccessToken.js";
import {ImportClientRoute} from "./routes/ImportClient.js";
import {MapperRoute} from "./routes/Mapper.js";
import {ClientScopesRoute} from "./routes/ClientScopeTab.js";
import {AuthorizationRoute} from "./routes/AuthenticationTab.js";
import {NewResourceRoute} from "./routes/NewResource.js";
import {ResourceDetailsRoute} from "./routes/Resource.js";
import {NewScopeRoute} from "./routes/NewScope.js";
import {ScopeDetailsRoute} from "./routes/Scope.js";
import {NewPolicyRoute} from "./routes/NewPolicy.js";
import {PolicyDetailsRoute} from "./routes/PolicyDetails.js";
import {NewPermissionRoute} from "./routes/NewPermission.js";
import {PermissionDetailsRoute} from "./routes/PermissionDetails.js";
import {DedicatedScopeDetailsRoute} from "./routes/DedicatedScopeDetails.js";
const routes = [
  AddClientRoute,
  ImportClientRoute,
  ClientsRoute,
  CreateInitialAccessTokenRoute,
  ClientRoute,
  MapperRoute,
  DedicatedScopeDetailsRoute,
  ClientScopesRoute,
  AuthorizationRoute,
  NewResourceRoute,
  ResourceDetailsRoute,
  NewScopeRoute,
  ScopeDetailsRoute,
  NewPolicyRoute,
  PolicyDetailsRoute,
  NewPermissionRoute,
  PermissionDetailsRoute
];
export default routes;
