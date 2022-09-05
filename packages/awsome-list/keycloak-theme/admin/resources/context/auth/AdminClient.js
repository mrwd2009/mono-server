import KeycloakAdminClient from "../../_snowpack/pkg/@keycloak/keycloak-admin-client.js";
import axios from "../../_snowpack/pkg/axios.js";
import Keycloak from "../../_snowpack/pkg/keycloak-js.js";
import {createContext, useEffect} from "../../_snowpack/pkg/react.js";
import {useErrorHandler} from "../../_snowpack/pkg/react-error-boundary.js";
import environment from "../../environment.js";
import useRequiredContext from "../../utils/useRequiredContext.js";
export const AdminClient = createContext(void 0);
export const useAdminClient = () => useRequiredContext(AdminClient);
export function useFetch(adminClientCall, callback, deps) {
  const {adminClient} = useAdminClient();
  const onError = useErrorHandler();
  useEffect(() => {
    const source = axios.CancelToken.source();
    adminClient.setConfig({
      requestConfig: {cancelToken: source.token}
    });
    adminClientCall().then((result) => {
      if (!source.token.reason) {
        callback(result);
      }
    }).catch((error) => {
      if (!axios.isCancel(error)) {
        onError(error);
      }
    });
    adminClient.setConfig({
      requestConfig: {cancelToken: void 0}
    });
    return () => {
      source.cancel();
    };
  }, deps);
}
export async function initAdminClient() {
  const keycloak = new Keycloak({
    url: environment.authServerUrl,
    realm: environment.loginRealm,
    clientId: environment.isRunningAsTheme ? "security-admin-console" : "security-admin-console-v2"
  });
  await keycloak.init({onLoad: "check-sso", pkceMethod: "S256"});
  const adminClient = new KeycloakAdminClient();
  adminClient.setConfig({realmName: environment.loginRealm});
  adminClient.baseUrl = keycloak.authServerUrl ?? environment.authServerUrl;
  adminClient.registerTokenProvider({
    async getAccessToken() {
      try {
        await keycloak.updateToken(5);
      } catch (error) {
        keycloak.login();
      }
      return keycloak.token;
    }
  });
  return {keycloak, adminClient};
}
