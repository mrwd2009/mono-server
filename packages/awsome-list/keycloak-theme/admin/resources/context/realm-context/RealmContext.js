import React, {useEffect, useMemo} from "../../_snowpack/pkg/react.js";
import {useRouteMatch} from "../../_snowpack/pkg/react-router-dom.js";
import {RecentUsed} from "../../components/realm-selector/recent-used.js";
import {
  DashboardRoute
} from "../../dashboard/routes/Dashboard.js";
import environment from "../../environment.js";
import useRequiredContext from "../../utils/useRequiredContext.js";
import {useAdminClient} from "../auth/AdminClient.js";
export const RealmContext = React.createContext(void 0);
export const RealmContextProvider = ({children}) => {
  const {adminClient} = useAdminClient();
  const recentUsed = useMemo(() => new RecentUsed(), []);
  const routeMatch = useRouteMatch(DashboardRoute.path);
  const realmParam = routeMatch?.params.realm;
  const realm = useMemo(() => realmParam ?? environment.loginRealm, [realmParam]);
  useEffect(() => adminClient.setConfig({realmName: realm}), [realm]);
  useEffect(() => recentUsed.setRecentUsed(realm), [realm]);
  const value = useMemo(() => ({realm}), [realm]);
  return /* @__PURE__ */ React.createElement(RealmContext.Provider, {
    value
  }, children);
};
export const useRealm = () => useRequiredContext(RealmContext);
