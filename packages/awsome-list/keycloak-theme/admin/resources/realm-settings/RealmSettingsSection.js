import React, {useState} from "../_snowpack/pkg/react.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {RealmSettingsTabs} from "./RealmSettingsTabs.js";
import {useParams} from "../_snowpack/pkg/react-router-dom.js";
export default function RealmSettingsSection() {
  const {adminClient} = useAdminClient();
  const {realm: realmName} = useParams();
  const [realm, setRealm] = useState();
  const [key, setKey] = useState(0);
  const refresh = () => {
    setKey(key + 1);
    setRealm(void 0);
  };
  useFetch(() => adminClient.realms.findOne({realm: realmName}), setRealm, [
    key
  ]);
  if (!realm) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(RealmSettingsTabs, {
    realm,
    refresh
  });
}
