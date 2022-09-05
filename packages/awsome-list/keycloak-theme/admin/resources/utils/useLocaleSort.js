import {useWhoAmI} from "../context/whoami/WhoAmI.js";
export default function useLocaleSort() {
  const {whoAmI} = useWhoAmI();
  return function localeSort(items, mapperFn) {
    const locale = whoAmI.getLocale();
    return [...items].sort((a, b) => {
      const valA = mapperFn(a);
      const valB = mapperFn(b);
      if (valA === void 0 || valB === void 0) {
        return 0;
      }
      return valA.localeCompare(valB, locale);
    });
  };
}
export const mapByKey = (key) => (item) => item[key];
