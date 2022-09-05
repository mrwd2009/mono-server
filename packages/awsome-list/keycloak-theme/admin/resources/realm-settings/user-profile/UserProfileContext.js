import {AlertVariant} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React, {createContext, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import useRequiredContext from "../../utils/useRequiredContext.js";
export const UserProfile = createContext(void 0);
export const UserProfileProvider = ({children}) => {
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {addAlert, addError} = useAlerts();
  const {t} = useTranslation();
  const [config, setConfig] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  useFetch(() => adminClient.users.getProfile({realm}), (config2) => setConfig(config2), [refreshCount]);
  const save = async (updatedConfig, options) => {
    setIsSaving(true);
    try {
      await adminClient.users.updateProfile({
        ...updatedConfig,
        realm
      });
      setIsSaving(false);
      setRefreshCount(refreshCount + 1);
      addAlert(t(options?.successMessageKey ?? "realm-settings:userProfileSuccess"), AlertVariant.success);
      return true;
    } catch (error) {
      setIsSaving(false);
      addError(options?.errorMessageKey ?? "realm-settings:userProfileError", error);
      return false;
    }
  };
  return /* @__PURE__ */ React.createElement(UserProfile.Provider, {
    value: {config, save, isSaving}
  }, children);
};
export const useUserProfile = () => useRequiredContext(UserProfile);
