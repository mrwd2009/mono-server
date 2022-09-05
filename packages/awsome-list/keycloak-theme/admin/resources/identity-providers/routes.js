import {IdentityProviderRoute} from "./routes/IdentityProvider.js";
import {IdentityProviderKeycloakOidcRoute} from "./routes/IdentityProviderKeycloakOidc.js";
import {IdentityProviderOidcRoute} from "./routes/IdentityProviderOidc.js";
import {IdentityProviderSamlRoute} from "./routes/IdentityProviderSaml.js";
import {IdentityProvidersRoute} from "./routes/IdentityProviders.js";
import {IdentityProviderAddMapperRoute} from "./routes/AddMapper.js";
import {IdentityProviderEditMapperRoute} from "./routes/EditMapper.js";
import {IdentityProviderCreateRoute} from "./routes/IdentityProviderCreate.js";
const routes = [
  IdentityProviderAddMapperRoute,
  IdentityProviderEditMapperRoute,
  IdentityProvidersRoute,
  IdentityProviderOidcRoute,
  IdentityProviderSamlRoute,
  IdentityProviderKeycloakOidcRoute,
  IdentityProviderCreateRoute,
  IdentityProviderRoute
];
export default routes;
