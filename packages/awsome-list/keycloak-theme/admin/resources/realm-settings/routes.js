import {KeyProviderFormRoute} from "./routes/KeyProvider.js";
import {RealmSettingsRoute} from "./routes/RealmSettings.js";
import {ClientPoliciesRoute} from "./routes/ClientPolicies.js";
import {AddClientProfileRoute} from "./routes/AddClientProfile.js";
import {ClientProfileRoute} from "./routes/ClientProfile.js";
import {AddExecutorRoute} from "./routes/AddExecutor.js";
import {ExecutorRoute} from "./routes/Executor.js";
import {AddClientPolicyRoute} from "./routes/AddClientPolicy.js";
import {EditClientPolicyRoute} from "./routes/EditClientPolicy.js";
import {NewClientPolicyConditionRoute} from "./routes/AddCondition.js";
import {EditClientPolicyConditionRoute} from "./routes/EditCondition.js";
import {UserProfileRoute} from "./routes/UserProfile.js";
import {AddAttributeRoute} from "./routes/AddAttribute.js";
import {KeysRoute} from "./routes/KeysTab.js";
import {AttributeRoute} from "./routes/Attribute.js";
import {NewAttributesGroupRoute} from "./routes/NewAttributesGroup.js";
import {EditAttributesGroupRoute} from "./routes/EditAttributesGroup.js";
const routes = [
  RealmSettingsRoute,
  KeysRoute,
  KeyProviderFormRoute,
  ClientPoliciesRoute,
  AddClientProfileRoute,
  AddExecutorRoute,
  ClientProfileRoute,
  ExecutorRoute,
  AddClientPolicyRoute,
  EditClientPolicyRoute,
  NewClientPolicyConditionRoute,
  EditClientPolicyConditionRoute,
  UserProfileRoute,
  AddAttributeRoute,
  AttributeRoute,
  NewAttributesGroupRoute,
  EditAttributesGroupRoute
];
export default routes;
