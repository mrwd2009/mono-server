import {NewKerberosUserFederationRoute} from "./routes/NewKerberosUserFederation.js";
import {NewLdapUserFederationRoute} from "./routes/NewLdapUserFederation.js";
import {
  CustomEditProviderRoute,
  CustomProviderRoute
} from "./routes/NewProvider.js";
import {UserFederationRoute} from "./routes/UserFederation.js";
import {UserFederationKerberosRoute} from "./routes/UserFederationKerberos.js";
import {UserFederationLdapRoute} from "./routes/UserFederationLdap.js";
import {UserFederationLdapMapperRoute} from "./routes/UserFederationLdapMapper.js";
import {UserFederationsKerberosRoute} from "./routes/UserFederationsKerberos.js";
import {UserFederationsLdapRoute} from "./routes/UserFederationsLdap.js";
const routes = [
  UserFederationRoute,
  UserFederationsKerberosRoute,
  NewKerberosUserFederationRoute,
  UserFederationKerberosRoute,
  UserFederationsLdapRoute,
  NewLdapUserFederationRoute,
  UserFederationLdapRoute,
  UserFederationLdapMapperRoute,
  CustomProviderRoute,
  CustomEditProviderRoute
];
export default routes;
