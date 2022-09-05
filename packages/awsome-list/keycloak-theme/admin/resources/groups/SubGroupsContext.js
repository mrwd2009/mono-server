import React, {createContext, useState} from "../_snowpack/pkg/react.js";
import useRequiredContext from "../utils/useRequiredContext.js";
const SubGroupContext = createContext(void 0);
export const SubGroups = ({children}) => {
  const [subGroups, setSubGroups] = useState([]);
  const clear = () => setSubGroups([]);
  const remove = (group) => setSubGroups(subGroups.slice(0, subGroups.findIndex((g) => g.id === group.id) + 1));
  const currentGroup = () => subGroups[subGroups.length - 1];
  return /* @__PURE__ */ React.createElement(SubGroupContext.Provider, {
    value: {subGroups, setSubGroups, clear, remove, currentGroup}
  }, children);
};
export const useSubGroups = () => useRequiredContext(SubGroupContext);
