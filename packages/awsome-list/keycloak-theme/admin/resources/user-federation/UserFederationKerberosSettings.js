import React from "../_snowpack/pkg/react.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  Form,
  PageSection
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {KerberosSettingsRequired} from "./kerberos/KerberosSettingsRequired.js";
import {SettingsCache} from "./shared/SettingsCache.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {FormProvider, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useHistory, useParams} from "../_snowpack/pkg/react-router-dom.js";
import {Header} from "./shared/Header.js";
import {toUserFederation} from "./routes/UserFederation.js";
export default function UserFederationKerberosSettings() {
  const {t} = useTranslation("user-federation");
  const form = useForm({mode: "onChange"});
  const history = useHistory();
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {id} = useParams();
  const {addAlert, addError} = useAlerts();
  useFetch(async () => {
    if (id) {
      return adminClient.components.findOne({id});
    }
  }, (fetchedComponent) => {
    if (fetchedComponent) {
      setupForm(fetchedComponent);
    } else if (id) {
      throw new Error(t("common:notFound"));
    }
  }, []);
  const setupForm = (component) => {
    form.reset({...component});
  };
  const save = async (component) => {
    try {
      if (!id) {
        await adminClient.components.create(component);
        history.push(`/${realm}/user-federation`);
      } else {
        await adminClient.components.update({id}, component);
      }
      setupForm(component);
      addAlert(t(!id ? "createSuccess" : "saveSuccess"), AlertVariant.success);
    } catch (error) {
      addError(`user-federation:${!id ? "createError" : "saveError"}`, error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(Header, {
    provider: "Kerberos",
    save: () => form.handleSubmit(save)()
  })), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(KerberosSettingsRequired, {
    form,
    showSectionHeading: true
  })), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    isFilled: true
  }, /* @__PURE__ */ React.createElement(SettingsCache, {
    form,
    showSectionHeading: true
  }), /* @__PURE__ */ React.createElement(Form, {
    onSubmit: form.handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    isDisabled: !form.formState.isDirty,
    variant: "primary",
    type: "submit",
    "data-testid": "kerberos-save"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: () => history.push(toUserFederation({realm})),
    "data-testid": "kerberos-cancel"
  }, t("common:cancel"))))));
}
