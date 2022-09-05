import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Button, InputGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {EyeIcon, EyeSlashIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {
  KeycloakTextInput
} from "../keycloak-text-input/KeycloakTextInput.js";
const PasswordInputBase = ({
  hasReveal = true,
  innerRef,
  ...rest
}) => {
  const {t} = useTranslation("common-help");
  const [hidePassword, setHidePassword] = useState(true);
  return /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ...rest,
    type: hidePassword ? "password" : "text",
    ref: innerRef
  }), hasReveal && /* @__PURE__ */ React.createElement(Button, {
    variant: "control",
    "aria-label": t("showPassword"),
    onClick: () => setHidePassword(!hidePassword)
  }, hidePassword ? /* @__PURE__ */ React.createElement(EyeIcon, null) : /* @__PURE__ */ React.createElement(EyeSlashIcon, null)));
};
export const PasswordInput = React.forwardRef((props, ref) => /* @__PURE__ */ React.createElement(PasswordInputBase, {
  ...props,
  innerRef: ref
}));
PasswordInput.displayName = "PasswordInput";
