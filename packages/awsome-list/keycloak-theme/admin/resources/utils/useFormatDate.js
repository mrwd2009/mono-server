import {useWhoAmI} from "../context/whoami/WhoAmI.js";
export const FORMAT_DATE_AND_TIME = {
  dateStyle: "long",
  timeStyle: "short"
};
export default function useFormatDate() {
  const {whoAmI} = useWhoAmI();
  const locale = whoAmI.getLocale();
  return function formatDate(date, options) {
    return date.toLocaleString(locale, options);
  };
}
