import React, {useState} from "../_snowpack/pkg/react.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  Form,
  PageSection,
  Tab,
  TabTitleText
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {LdapSettingsAdvanced} from "./ldap/LdapSettingsAdvanced.js";
import {LdapSettingsKerberosIntegration} from "./ldap/LdapSettingsKerberosIntegration.js";
import {SettingsCache} from "./shared/SettingsCache.js";
import {LdapSettingsSynchronization} from "./ldap/LdapSettingsSynchronization.js";
import {LdapSettingsGeneral} from "./ldap/LdapSettingsGeneral.js";
import {LdapSettingsConnection} from "./ldap/LdapSettingsConnection.js";
import {LdapSettingsSearching} from "./ldap/LdapSettingsSearching.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {FormProvider, useForm, useFormContext} from "../_snowpack/pkg/react-hook-form.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useHistory, useParams} from "../_snowpack/pkg/react-router-dom.js";
import {ScrollForm} from "../components/scroll-form/ScrollForm.js";
import {KeycloakTabs} from "../components/keycloak-tabs/KeycloakTabs.js";
import {LdapMapperList} from "./ldap/mappers/LdapMapperList.js";
import {toUserFederation} from "./routes/UserFederation.js";
import {ExtendedHeader} from "./shared/ExtendedHeader.js";
const AddLdapFormContent = ({
  save
}) => {
  const {t} = useTranslation("user-federation");
  const form = useFormContext();
  const {id} = useParams();
  const history = useHistory();
  const {realm} = useRealm();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ScrollForm, {
    sections: [
      {
        title: t("generalOptions"),
        panel: /* @__PURE__ */ React.createElement(LdapSettingsGeneral, {
          form,
          vendorEdit: !!id
        })
      },
      {
        title: t("connectionAndAuthenticationSettings"),
        panel: /* @__PURE__ */ React.createElement(LdapSettingsConnection, {
          form,
          id
        })
      },
      {
        title: t("ldapSearchingAndUpdatingSettings"),
        panel: /* @__PURE__ */ React.createElement(LdapSettingsSearching, {
          form
        })
      },
      {
        title: t("synchronizationSettings"),
        panel: /* @__PURE__ */ React.createElement(LdapSettingsSynchronization, {
          form
        })
      },
      {
        title: t("kerberosIntegration"),
        panel: /* @__PURE__ */ React.createElement(LdapSettingsKerberosIntegration, {
          form
        })
      },
      {title: t("cacheSettings"), panel: /* @__PURE__ */ React.createElement(SettingsCache, {
        form
      })},
      {
        title: t("advancedSettings"),
        panel: /* @__PURE__ */ React.createElement(LdapSettingsAdvanced, {
          form,
          id
        })
      }
    ]
  }), /* @__PURE__ */ React.createElement(Form, {
    onSubmit: form.handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(ActionGroup, {
    className: "keycloak__form_actions"
  }, /* @__PURE__ */ React.createElement(Button, {
    isDisabled: !form.formState.isDirty,
    variant: "primary",
    type: "submit",
    "data-testid": "ldap-save"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: () => history.push(toUserFederation({realm})),
    "data-testid": "ldap-cancel"
  }, t("common:cancel")))));
};
export default function UserFederationLdapSettings() {
  const {t} = useTranslation("user-federation");
  const form = useForm({mode: "onChange"});
  const history = useHistory();
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {id} = useParams();
  const {addAlert, addError} = useAlerts();
  const [component, setComponent] = useState();
  const [refreshCount, setRefreshCount] = useState(0);
  const editMode = component?.config?.editMode;
  const refresh = () => setRefreshCount((count) => count + 1);
  useFetch(async () => {
    if (id) {
      return await adminClient.components.findOne({id});
    }
    return void 0;
  }, (fetchedComponent) => {
    if (fetchedComponent) {
      setupForm(fetchedComponent);
      setComponent(fetchedComponent);
    } else if (id) {
      throw new Error(t("common:notFound"));
    }
  }, [refreshCount]);
  const setupForm = (component2) => {
    form.reset({...component2});
    form.setValue("config.periodicChangedUsersSync", component2.config?.["changedSyncPeriod"][0] !== "-1");
    form.setValue("config.periodicFullSync", component2.config?.["fullSyncPeriod"][0] !== "-1");
  };
  const save = async (component2) => {
    if (component2.config?.periodicChangedUsersSync !== void 0) {
      if (component2.config.periodicChangedUsersSync === false) {
        component2.config.changedSyncPeriod = ["-1"];
      }
      delete component2.config.periodicChangedUsersSync;
    }
    if (component2.config?.periodicFullSync !== void 0) {
      if (component2.config.periodicFullSync === false) {
        component2.config.fullSyncPeriod = ["-1"];
      }
      delete component2.config.periodicFullSync;
    }
    try {
      if (!id) {
        await adminClient.components.create(component2);
        history.push(toUserFederation({realm}));
      } else {
        await adminClient.components.update({id}, component2);
      }
      addAlert(t(id ? "saveSuccess" : "createSuccess"), AlertVariant.success);
      refresh();
    } catch (error) {
      addError(`user-federation:${id ? "saveError" : "createError"}`, error);
    }
  };
  return /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(ExtendedHeader, {
    provider: "LDAP",
    noDivider: true,
    editMode,
    save: () => form.handleSubmit(save)()
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, id ? /* @__PURE__ */ React.createElement(KeycloakTabs, {
    isBox: true
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "settings",
    eventKey: "settings",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:settings"))
  }, /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(AddLdapFormContent, {
    save
  }))), /* @__PURE__ */ React.createElement(Tab, {
    id: "mappers",
    eventKey: "mappers",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:mappers")),
    "data-testid": "ldap-mappers-tab"
  }, /* @__PURE__ */ React.createElement(LdapMapperList, null))) : /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(AddLdapFormContent, {
    save
  }))));
}
