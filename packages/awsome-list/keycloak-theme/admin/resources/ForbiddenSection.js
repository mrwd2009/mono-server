import React from "./_snowpack/pkg/react.js";
import {useTranslation} from "./_snowpack/pkg/react-i18next.js";
import {PageSection} from "./_snowpack/pkg/@patternfly/react-core.js";
export const ForbiddenSection = ({
  permissionNeeded
}) => {
  const {t} = useTranslation("common");
  const count = Array.isArray(permissionNeeded) ? permissionNeeded.length : 1;
  return /* @__PURE__ */ React.createElement(PageSection, null, t("forbidden", {count}), " ", permissionNeeded);
};
