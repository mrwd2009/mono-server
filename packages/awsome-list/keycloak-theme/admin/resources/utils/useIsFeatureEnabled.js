import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
export var Feature;
(function(Feature2) {
  Feature2["DeclarativeUserProfile"] = "DECLARATIVE_USER_PROFILE";
})(Feature || (Feature = {}));
export default function useIsFeatureEnabled() {
  const {profileInfo} = useServerInfo();
  const experimentalFeatures = profileInfo?.experimentalFeatures ?? [];
  const previewFeatures = profileInfo?.previewFeatures ?? [];
  const disabledFilters = profileInfo?.disabledFeatures ?? [];
  const allFeatures = [...experimentalFeatures, ...previewFeatures];
  const enabledFeatures = allFeatures.filter((feature) => !disabledFilters.includes(feature));
  return function isFeatureEnabled(feature) {
    return enabledFeatures.includes(feature);
  };
}
