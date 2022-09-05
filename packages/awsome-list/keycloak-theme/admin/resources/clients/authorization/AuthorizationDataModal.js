import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Button,
  Modal,
  ModalVariant,
  TextContent,
  Text,
  TextVariants
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {KeycloakTextArea} from "../../components/keycloak-text-area/KeycloakTextArea.js";
import useToggle from "../../utils/useToggle.js";
import {prettyPrintJSON} from "../../util.js";
export const AuthorizationDataModal = ({
  data
}) => {
  const {t} = useTranslation("clients");
  const [show, toggle] = useToggle();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "authorization-revert",
    onClick: toggle,
    variant: "secondary"
  }, t("showAuthData")), /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.medium,
    isOpen: show,
    "aria-label": t("authData"),
    header: /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, {
      component: TextVariants.h1
    }, t("authData")), /* @__PURE__ */ React.createElement(Text, null, t("authDataDescription"))),
    onClose: toggle,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "cancel",
        id: "modal-cancel",
        key: "cancel",
        onClick: toggle
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(KeycloakTextArea, {
    readOnly: true,
    rows: 20,
    value: prettyPrintJSON(data)
  })));
};
