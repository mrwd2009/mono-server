import React, {useState} from "../../_snowpack/pkg/react.js";
import environment from "../../environment.js";
import i18n, {DEFAULT_LOCALE} from "../../i18n.js";
import useRequiredContext from "../../utils/useRequiredContext.js";
import {useAdminClient, useFetch} from "../auth/AdminClient.js";
export class WhoAmI {
  constructor(me) {
    this.me = me;
    if (this.me?.locale) {
      i18n.changeLanguage(this.me.locale, (error) => {
        if (error)
          console.error("Unable to set locale to", this.me?.locale);
      });
    }
  }
  getDisplayName() {
    if (this.me === void 0)
      return "";
    return this.me.displayName;
  }
  getLocale() {
    return this.me?.locale ?? DEFAULT_LOCALE;
  }
  getRealm() {
    return this.me?.realm ?? "";
  }
  getUserId() {
    if (this.me === void 0)
      return "";
    return this.me.userId;
  }
  canCreateRealm() {
    return !!this.me?.createRealm;
  }
  getRealmAccess() {
    if (this.me === void 0)
      return {};
    return this.me.realm_access;
  }
}
export const WhoAmIContext = React.createContext(void 0);
export const useWhoAmI = () => useRequiredContext(WhoAmIContext);
export const WhoAmIContextProvider = ({children}) => {
  const {adminClient} = useAdminClient();
  const [whoAmI, setWhoAmI] = useState(new WhoAmI());
  const [key, setKey] = useState(0);
  useFetch(() => adminClient.whoAmI.find({realm: environment.loginRealm}), (me) => {
    const whoAmI2 = new WhoAmI(me);
    setWhoAmI(whoAmI2);
  }, [key]);
  return /* @__PURE__ */ React.createElement(WhoAmIContext.Provider, {
    value: {refresh: () => setKey(key + 1), whoAmI}
  }, children);
};
