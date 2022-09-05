import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link, useHistory, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  FormGroup,
  PageSection
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {toUserFederation} from "../routes/UserFederation.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {SettingsCache} from "../shared/SettingsCache.js";
import {ExtendedHeader} from "../shared/ExtendedHeader.js";
import "./custom-provider-settings.css.proxy.js";
export default function CustomProviderSettings() {
  const {t} = useTranslation("user-federation");
  const {id, providerId} = useParams();
  const history = useHistory();
  const form = useForm({
    mode: "onChange"
  });
  const {
    register,
    errors,
    reset,
    handleSubmit,
    formState: {isDirty}
  } = form;
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm: realmName} = useRealm();
  const [parentId, setParentId] = useState("");
  useFetch(async () => {
    if (id) {
      return await adminClient.components.findOne({id});
    }
    return void 0;
  }, (fetchedComponent) => {
    if (fetchedComponent) {
      reset({...fetchedComponent});
    } else if (id) {
      throw new Error(t("common:notFound"));
    }
  }, []);
  useFetch(() => adminClient.realms.findOne({
    realm: realmName
  }), (realm) => setParentId(realm?.id), []);
  const save = async (component) => {
    const saveComponent = {
      ...component,
      providerId,
      providerType: "org.keycloak.storage.UserStorageProvider",
      parentId
    };
    try {
      if (!id) {
        await adminClient.components.create(saveComponent);
        history.push(toUserFederation({realm: realmName}));
      } else {
        await adminClient.components.update({id}, saveComponent);
      }
      reset({...component});
      addAlert(t(!id ? "createSuccess" : "saveSuccess"), AlertVariant.success);
    } catch (error) {
      addError(`user-federation:${!id ? "createError" : "saveError"}`, error);
    }
  };
  return /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(ExtendedHeader, {
    provider: providerId,
    save: () => handleSubmit(save)()
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true,
    className: "keycloak__user-federation__custom-form",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("consoleDisplayName"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:consoleDisplayNameHelp",
      fieldLabelId: "user-federation:consoleDisplayName"
    }),
    helperTextInvalid: t("validateName"),
    validated: errors.name ? "error" : "default",
    fieldId: "kc-console-display-name",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    id: "kc-console-display-name",
    name: "name",
    ref: register({
      required: true
    }),
    "data-testid": "console-name",
    validated: errors.name ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(SettingsCache, {
    form,
    unWrap: true
  }), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    isDisabled: !isDirty,
    variant: "primary",
    type: "submit",
    "data-testid": "custom-save"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toUserFederation({realm: realmName})
    }),
    "data-testid": "custom-cancel"
  }, t("common:cancel"))))));
}
