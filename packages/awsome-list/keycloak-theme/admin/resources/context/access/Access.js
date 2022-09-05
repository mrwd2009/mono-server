import React, {
  createContext,
  useEffect,
  useState
} from "../../_snowpack/pkg/react.js";
import {useRealm} from "../realm-context/RealmContext.js";
import {useWhoAmI} from "../whoami/WhoAmI.js";
import useRequiredContext from "../../utils/useRequiredContext.js";
export const AccessContext = createContext(void 0);
export const useAccess = () => useRequiredContext(AccessContext);
export const AccessContextProvider = ({children}) => {
  const {whoAmI} = useWhoAmI();
  const {realm} = useRealm();
  const [access, setAccess] = useState([]);
  useEffect(() => {
    if (whoAmI.getRealmAccess()[realm]) {
      setAccess(whoAmI.getRealmAccess()[realm]);
    }
  }, [whoAmI, realm]);
  const hasAccess = (...types) => {
    return types.every((type) => type === "anyone" || access.includes(type));
  };
  const hasSomeAccess = (...types) => {
    return types.some((type) => type === "anyone" || access.includes(type));
  };
  return /* @__PURE__ */ React.createElement(AccessContext.Provider, {
    value: {hasAccess, hasSomeAccess}
  }, children);
};
