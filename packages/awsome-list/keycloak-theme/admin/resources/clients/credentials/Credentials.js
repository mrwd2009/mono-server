import React, {useState} from "../../_snowpack/pkg/react.js";
import {Controller, useFormContext, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  Card,
  CardBody,
  ClipboardCopy,
  Divider,
  FormGroup,
  PageSection,
  Select,
  SelectOption,
  SelectVariant,
  Split,
  SplitItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {ClientSecret} from "./ClientSecret.js";
import {SignedJWT} from "./SignedJWT.js";
import {X509} from "./X509.js";
export const Credentials = ({client, save, refresh}) => {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const clientId = client.id;
  const [providers, setProviders] = useState([]);
  const {
    control,
    formState: {isDirty},
    handleSubmit
  } = useFormContext();
  const clientAuthenticatorType = useWatch({
    control,
    name: "clientAuthenticatorType",
    defaultValue: ""
  });
  const [secret, setSecret] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [open, isOpen] = useState(false);
  useFetch(() => Promise.all([
    adminClient.authenticationManagement.getClientAuthenticatorProviders(),
    adminClient.clients.getClientSecret({
      id: clientId
    })
  ]), ([providers2, secret2]) => {
    setProviders(providers2);
    setSecret(secret2.value);
  }, []);
  async function regenerate(call, message) {
    try {
      const data = await call(clientId);
      addAlert(t(`${message}Success`), AlertVariant.success);
      return data;
    } catch (error) {
      addError(`clients:${message}Error`, error);
    }
  }
  const regenerateClientSecret = async () => {
    const secret2 = await regenerate((clientId2) => adminClient.clients.generateNewClientSecret({id: clientId2}), "clientSecret");
    setSecret(secret2?.value || "");
    refresh();
  };
  const [toggleClientSecretConfirm, ClientSecretConfirm] = useConfirmDialog({
    titleKey: "clients:confirmClientSecretTitle",
    messageKey: "clients:confirmClientSecretBody",
    continueButtonLabel: "common:yes",
    cancelButtonLabel: "common:no",
    onConfirm: regenerateClientSecret
  });
  const regenerateAccessToken = async () => {
    const accessToken2 = await regenerate((clientId2) => adminClient.clients.generateRegistrationAccessToken({id: clientId2}), "accessToken");
    setAccessToken(accessToken2?.registrationAccessToken || "");
  };
  const [toggleAccessTokenConfirm, AccessTokenConfirm] = useConfirmDialog({
    titleKey: "clients:confirmAccessTokenTitle",
    messageKey: "clients:confirmAccessTokenBody",
    continueButtonLabel: "common:yes",
    cancelButtonLabel: "common:no",
    onConfirm: regenerateAccessToken
  });
  return /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(FormAccess, {
    onSubmit: handleSubmit(save),
    isHorizontal: true,
    className: "pf-u-mt-md",
    role: "manage-clients"
  }, /* @__PURE__ */ React.createElement(ClientSecretConfirm, null), /* @__PURE__ */ React.createElement(AccessTokenConfirm, null), /* @__PURE__ */ React.createElement(Card, {
    isFlat: true
  }, /* @__PURE__ */ React.createElement(CardBody, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clientAuthenticator"),
    fieldId: "kc-client-authenticator-type",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:client-authenticator-type",
      fieldLabelId: "clients:clientAuthenticator"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "clientAuthenticatorType",
    control,
    defaultValue: "",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-client-authenticator-type",
      required: true,
      onToggle: isOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        isOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("clientAuthenticator"),
      isOpen: open
    }, providers.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option.id === value,
      key: option.id,
      value: option.id
    }, option.displayName)))
  })), clientAuthenticatorType === "client-jwt" && /* @__PURE__ */ React.createElement(SignedJWT, null), clientAuthenticatorType === "client-x509" && /* @__PURE__ */ React.createElement(X509, null), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    isDisabled: !isDirty
  }, t("common:save")))), (clientAuthenticatorType === "client-secret" || clientAuthenticatorType === "client-secret-jwt") && /* @__PURE__ */ React.createElement(Divider, null), (clientAuthenticatorType === "client-secret" || clientAuthenticatorType === "client-secret-jwt") && /* @__PURE__ */ React.createElement(CardBody, null, /* @__PURE__ */ React.createElement(ClientSecret, {
    client,
    secret,
    toggle: toggleClientSecretConfirm
  }))), /* @__PURE__ */ React.createElement(Card, {
    isFlat: true
  }, /* @__PURE__ */ React.createElement(CardBody, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("registrationAccessToken"),
    fieldId: "kc-access-token",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:registration-access-token",
      fieldLabelId: "clients:registrationAccessToken"
    })
  }, /* @__PURE__ */ React.createElement(Split, {
    hasGutter: true
  }, /* @__PURE__ */ React.createElement(SplitItem, {
    isFilled: true
  }, /* @__PURE__ */ React.createElement(ClipboardCopy, {
    id: "kc-access-token",
    isReadOnly: true
  }, accessToken)), /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    onClick: toggleAccessTokenConfirm
  }, t("regenerate")))))))));
};
