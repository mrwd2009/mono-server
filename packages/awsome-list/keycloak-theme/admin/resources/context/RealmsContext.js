import {sortBy} from "../_snowpack/pkg/lodash-es.js";
import React, {
  createContext,
  useCallback,
  useMemo,
  useState
} from "../_snowpack/pkg/react.js";
import axios from "../_snowpack/pkg/axios.js";
import {RecentUsed} from "../components/realm-selector/recent-used.js";
import useRequiredContext from "../utils/useRequiredContext.js";
import {useAdminClient, useFetch} from "./auth/AdminClient.js";
export const RealmsContext = createContext(void 0);
export const RealmsProvider = ({children}) => {
  const {keycloak, adminClient} = useAdminClient();
  const [realms, setRealms] = useState([]);
  const recentUsed = useMemo(() => new RecentUsed(), []);
  function updateRealms(realms2) {
    setRealms(sortBy(realms2, "realm"));
    recentUsed.clean(realms2.map(({realm}) => realm));
  }
  useFetch(async () => {
    try {
      return await adminClient.realms.find({briefRepresentation: true});
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status < 500) {
        return [];
      }
      throw error;
    }
  }, (realms2) => updateRealms(realms2), []);
  const refresh = useCallback(async () => {
    await keycloak.updateToken(Number.MAX_VALUE);
    updateRealms(await adminClient.realms.find({briefRepresentation: true}));
  }, []);
  const value = useMemo(() => ({realms, refresh}), [realms, refresh]);
  return /* @__PURE__ */ React.createElement(RealmsContext.Provider, {
    value
  }, children);
};
export const useRealms = () => useRequiredContext(RealmsContext);
