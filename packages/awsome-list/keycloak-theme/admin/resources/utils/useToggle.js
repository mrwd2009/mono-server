import {useCallback, useState} from "../_snowpack/pkg/react.js";
export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggleValue = useCallback(() => setValue((val) => !val), []);
  return [value, toggleValue, setValue];
}
