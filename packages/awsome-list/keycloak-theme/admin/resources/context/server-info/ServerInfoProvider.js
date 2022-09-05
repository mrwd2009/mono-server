import React, {createContext, useState} from "../../_snowpack/pkg/react.js";
import {sortProviders} from "../../util.js";
import {useAdminClient, useFetch} from "../auth/AdminClient.js";
import useRequiredContext from "../../utils/useRequiredContext.js";
export const ServerInfoContext = createContext(void 0);
export const useServerInfo = () => useRequiredContext(ServerInfoContext);
export const useLoginProviders = () => sortProviders(useServerInfo().providers["login-protocol"].providers);
export const ServerInfoProvider = ({children}) => {
  const {adminClient} = useAdminClient();
  const [serverInfo, setServerInfo] = useState({});
  useFetch(adminClient.serverInfo.find, setServerInfo, []);
  return /* @__PURE__ */ React.createElement(ServerInfoContext.Provider, {
    value: serverInfo
  }, children);
};
