import React, {useState} from "../_snowpack/pkg/react.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  TextContent,
  ValidatedOptions
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useForm} from "../_snowpack/pkg/react-hook-form.js";
import {emailRegexPattern} from "../util.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
export const RevocationModal = ({
  handleModalToggle,
  save
}) => {
  const {t} = useTranslation("sessions");
  const {addAlert} = useAlerts();
  const {realm: realmName} = useRealm();
  const {adminClient} = useAdminClient();
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();
  const [realm, setRealm] = useState();
  const [key, setKey] = useState(0);
  const refresh = () => {
    setKey(new Date().getTime());
  };
  useFetch(() => adminClient.realms.findOne({realm: realmName}), (realm2) => {
    setRealm(realm2);
  }, [key]);
  const parseResult = (result, prefixKey) => {
    const successCount = result.successRequests?.length || 0;
    const failedCount = result.failedRequests?.length || 0;
    if (successCount === 0 && failedCount === 0) {
      addAlert(t("clients:noAdminUrlSet"), AlertVariant.warning);
    } else if (failedCount > 0) {
      addAlert(t("clients:" + prefixKey + "Success", {
        successNodes: result.successRequests
      }), AlertVariant.success);
      addAlert(t("clients:" + prefixKey + "Fail", {
        failedNodes: result.failedRequests
      }), AlertVariant.danger);
    } else {
      addAlert(t("clients:" + prefixKey + "Success", {
        successNodes: result.successRequests
      }), AlertVariant.success);
    }
  };
  const setToNow = async () => {
    try {
      await adminClient.realms.update({realm: realmName}, {
        realm: realmName,
        notBefore: Date.now() / 1e3
      });
      addAlert(t("notBeforeSuccess"), AlertVariant.success);
    } catch (error) {
      addAlert(t("setToNowError", {error}), AlertVariant.danger);
    }
  };
  const clearNotBefore = async () => {
    try {
      await adminClient.realms.update({realm: realmName}, {
        realm: realmName,
        notBefore: 0
      });
      addAlert(t("notBeforeClearedSuccess"), AlertVariant.success);
      refresh();
    } catch (error) {
      addAlert(t("notBeforeError", {error}), AlertVariant.danger);
    }
  };
  const push = async () => {
    const result = await adminClient.realms.pushRevocation({
      realm: realmName
    });
    parseResult(result, "notBeforePush");
    refresh();
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.small,
    title: t("revocation"),
    isOpen: true,
    onClose: handleModalToggle,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "set-to-now-button",
        key: "set-to-now",
        variant: "tertiary",
        onClick: () => {
          setToNow();
          handleModalToggle();
        },
        form: "revocation-modal-form"
      }, t("setToNow")),
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "clear-not-before-button",
        key: "clear",
        variant: "tertiary",
        onClick: () => {
          clearNotBefore();
          handleModalToggle();
        },
        form: "revocation-modal-form"
      }, t("clear")),
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "modal-test-connection-button",
        key: "push",
        variant: "secondary",
        onClick: () => {
          push();
          handleModalToggle();
        },
        form: "revocation-modal-form"
      }, t("push")),
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-cancel",
        "data-testid": "cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: () => {
          handleModalToggle();
        }
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(TextContent, {
    className: "kc-revocation-description-text"
  }, t("revocationDescription")), /* @__PURE__ */ React.createElement(Form, {
    id: "revocation-modal-form",
    isHorizontal: true,
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    className: "kc-revocation-modal-form-group",
    label: t("notBefore"),
    name: "notBefore",
    fieldId: "not-before",
    validated: errors.email ? ValidatedOptions.error : ValidatedOptions.default
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    "data-testid": "not-before-input",
    ref: register({required: true, pattern: emailRegexPattern}),
    autoFocus: true,
    isReadOnly: true,
    value: realm?.notBefore === 0 ? t("none") : new Date(realm?.notBefore * 1e3).toString(),
    type: "text",
    id: "not-before",
    name: "notBefore",
    validated: errors.email ? ValidatedOptions.error : ValidatedOptions.default
  }))));
};
