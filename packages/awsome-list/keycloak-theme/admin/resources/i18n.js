import i18n from "./_snowpack/pkg/i18next.js";
import HttpBackend from "./_snowpack/pkg/i18next-http-backend.js";
import {initReactI18next} from "./_snowpack/pkg/react-i18next.js";
import environment from "./environment.js";
export const DEFAULT_LOCALE = "en";
export async function initI18n(adminClient) {
  const options = await initOptions(adminClient);
  await i18n.init(options);
}
const initOptions = async (adminClient) => {
  const constructLoadPath = (_, namespaces) => {
    if (namespaces[0] === "overrides") {
      return `/admin/realms/${adminClient.realmName}/localization/{{lng}}?useRealmDefaultLocaleFallback=true`;
    } else {
      return `${environment.resourceUrl}/resources/{{lng}}/{{ns}}.json`;
    }
  };
  return {
    defaultNS: "common",
    fallbackLng: DEFAULT_LOCALE,
    preload: [DEFAULT_LOCALE],
    ns: [
      "common",
      "common-help",
      "attributes-group",
      "dashboard",
      "clients",
      "clients-help",
      "client-scopes",
      "client-scopes-help",
      "groups",
      "realm",
      "roles",
      "users",
      "users-help",
      "sessions",
      "events",
      "realm-settings",
      "realm-settings-help",
      "authentication",
      "authentication-help",
      "user-federation",
      "user-federation-help",
      "identity-providers",
      "identity-providers-help",
      "dynamic",
      "overrides"
    ],
    interpolation: {
      escapeValue: false
    },
    postProcess: ["overrideProcessor"],
    backend: {
      loadPath: constructLoadPath,
      customHeaders: {
        Authorization: `Bearer ${await adminClient.getAccessToken()}`
      }
    }
  };
};
const configuredI18n = i18n.use({
  type: "postProcessor",
  name: "overrideProcessor",
  process: function(value, key, _, translator) {
    const override = translator.resourceStore.data[translator.language].overrides?.[key];
    return override || value;
  }
}).use(initReactI18next).use(HttpBackend);
export default configuredI18n;
