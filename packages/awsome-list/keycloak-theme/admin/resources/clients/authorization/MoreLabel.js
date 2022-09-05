import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Label} from "../../_snowpack/pkg/@patternfly/react-core.js";
export const MoreLabel = ({array}) => {
  const {t} = useTranslation("clients");
  if (!array || array.length <= 1) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(Label, {
    color: "blue"
  }, t("common:more", {count: array.length - 1}));
};
