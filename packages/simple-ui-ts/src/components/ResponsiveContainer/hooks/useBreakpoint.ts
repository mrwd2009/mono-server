import { useContext } from "react";
import BreakpointContext from "../contexts/BreakpointContext";

const useBreakpoint = () => {
  const breakpoint = useContext(BreakpointContext);

  return breakpoint;
};

export default useBreakpoint;