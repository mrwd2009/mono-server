import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {ActionGroup, Button} from "../../_snowpack/pkg/@patternfly/react-core.js";
export const SaveReset = ({
  name,
  save,
  reset,
  isActive = true,
  ...rest
}) => {
  const {t} = useTranslation("common");
  return /* @__PURE__ */ React.createElement(ActionGroup, {
    ...rest
  }, /* @__PURE__ */ React.createElement(Button, {
    isDisabled: !isActive,
    "data-testid": name + "Save",
    onClick: save
  }, t("save")), /* @__PURE__ */ React.createElement(Button, {
    isDisabled: !isActive,
    "data-testid": name + "Revert",
    variant: "link",
    onClick: reset
  }, t("revert")));
};
