import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  Alert,
  Button,
  FormGroup,
  InputGroup,
  Split,
  SplitItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {PasswordInput} from "../../components/password-input/PasswordInput.js";
import {CopyToClipboardButton} from "../scopes/CopyToClipboardButton.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import useFormatDate from "../../utils/useFormatDate.js";
const SecretInput = ({id, buttonLabel, secret, toggle}) => {
  const {t} = useTranslation("clients");
  const form = useFormContext();
  return /* @__PURE__ */ React.createElement(Split, {
    hasGutter: true
  }, /* @__PURE__ */ React.createElement(SplitItem, {
    isFilled: true
  }, /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(PasswordInput, {
    id,
    value: secret,
    isReadOnly: true
  }), /* @__PURE__ */ React.createElement(CopyToClipboardButton, {
    id,
    text: secret,
    label: "clientSecret",
    variant: "control"
  }))), /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    isDisabled: form.formState.isDirty,
    onClick: toggle
  }, t(buttonLabel))));
};
const ExpireDateFormatter = ({time}) => {
  const {t} = useTranslation("clients");
  const formatDate = useFormatDate();
  const unixTimeToString = (time2) => time2 ? t("secretExpiresOn", {
    time: formatDate(new Date(time2 * 1e3), {
      dateStyle: "full",
      timeStyle: "long"
    })
  }) : void 0;
  return /* @__PURE__ */ React.createElement("div", {
    className: "pf-u-my-md"
  }, unixTimeToString(time));
};
export const ClientSecret = ({client, secret, toggle}) => {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [secretRotated, setSecretRotated] = useState(client.attributes?.["client.secret.rotated"]);
  const secretExpirationTime = client.attributes?.["client.secret.expiration.time"];
  const secretRotatedExpirationTime = client.attributes?.["client.secret.rotated.expiration.time"];
  const expired = (time) => new Date().getTime() >= time * 1e3;
  const [toggleInvalidateConfirm, InvalidateConfirm] = useConfirmDialog({
    titleKey: "clients:invalidateRotatedSecret",
    messageKey: "clients:invalidateRotatedSecretExplain",
    continueButtonLabel: "common:confirm",
    onConfirm: async () => {
      try {
        await adminClient.clients.invalidateSecret({
          id: client.id
        });
        setSecretRotated(void 0);
        addAlert(t("invalidateRotatedSuccess"));
      } catch (error) {
        addError("clients:invalidateRotatedError", error);
      }
    }
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(InvalidateConfirm, null), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clientSecret"),
    fieldId: "kc-client-secret",
    className: "pf-u-my-md"
  }, /* @__PURE__ */ React.createElement(SecretInput, {
    id: "kc-client-secret",
    secret,
    toggle,
    buttonLabel: "regenerate"
  }), /* @__PURE__ */ React.createElement(ExpireDateFormatter, {
    time: secretExpirationTime
  }), expired(secretExpirationTime) && /* @__PURE__ */ React.createElement(Alert, {
    variant: "warning",
    isInline: true,
    title: t("secretHasExpired")
  })), secretRotated && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("secretRotated"),
    fieldId: "secretRotated"
  }, /* @__PURE__ */ React.createElement(SecretInput, {
    id: "secretRotated",
    secret: secretRotated,
    toggle: toggleInvalidateConfirm,
    buttonLabel: "invalidateSecret"
  }), /* @__PURE__ */ React.createElement(ExpireDateFormatter, {
    time: secretRotatedExpirationTime
  })));
};
