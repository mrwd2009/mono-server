import {useContext} from "../_snowpack/pkg/react.js";
import {isDefined} from "./isDefined.js";
export default function useRequiredContext(context) {
  const resolved = useContext(context);
  if (isDefined(resolved)) {
    return resolved;
  }
  throw new Error(`No provider found for ${context.displayName ? `the '${context.displayName}'` : "an unknown"} context, make sure it is included in your component hierarchy.`);
}
