import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Alert,
  AlertVariant,
  ClipboardCopy,
  Form,
  FormGroup,
  Modal,
  ModalVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
export const AccessTokenDialog = ({
  token,
  toggleDialog
}) => {
  const {t} = useTranslation("clients");
  return /* @__PURE__ */ React.createElement(Modal, {
    title: t("initialAccessTokenDetails"),
    isOpen: true,
    onClose: toggleDialog,
    variant: ModalVariant.medium
  }, /* @__PURE__ */ React.createElement(Alert, {
    title: t("copyInitialAccessToken"),
    isInline: true,
    variant: AlertVariant.warning
  }), /* @__PURE__ */ React.createElement(Form, {
    className: "pf-u-mt-md"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("initialAccessToken"),
    fieldId: "initialAccessToken"
  }, /* @__PURE__ */ React.createElement(ClipboardCopy, {
    id: "initialAccessToken",
    isReadOnly: true
  }, token))));
};
