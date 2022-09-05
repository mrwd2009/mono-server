import React, {useEffect, useState} from "../_snowpack/pkg/react.js";
import {useHistory} from "../_snowpack/pkg/react-router-dom.js";
import {Controller, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  ButtonVariant,
  DropdownItem,
  DropdownSeparator,
  PageSection,
  Tab,
  TabTitleText,
  Tooltip
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {
  routableTab,
  RoutableTabs
} from "../components/routable-tabs/RoutableTabs.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useRealms} from "../context/RealmsContext.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {
  convertFormValuesToObject,
  convertToFormValues,
  toUpperCase
} from "../util.js";
import {RealmSettingsEmailTab} from "./EmailTab.js";
import {EventsTab} from "./event-config/EventsTab.js";
import {RealmSettingsGeneralTab} from "./GeneralTab.js";
import {RealmSettingsLoginTab} from "./LoginTab.js";
import {SecurityDefenses} from "./security-defences/SecurityDefenses.js";
import {RealmSettingsSessionsTab} from "./SessionsTab.js";
import {RealmSettingsThemesTab} from "./ThemesTab.js";
import {RealmSettingsTokensTab} from "./TokensTab.js";
import ProfilesTab from "./ProfilesTab.js";
import {PoliciesTab} from "./PoliciesTab.js";
import {PartialImportDialog} from "./PartialImport.js";
import {PartialExportDialog} from "./PartialExport.js";
import {toRealmSettings} from "./routes/RealmSettings.js";
import {LocalizationTab} from "./LocalizationTab.js";
import {UserRegistration} from "./UserRegistration.js";
import {toDashboard} from "../dashboard/routes/Dashboard.js";
import environment from "../environment.js";
import helpUrls from "../help-urls.js";
import {UserProfileTab} from "./user-profile/UserProfileTab.js";
import useIsFeatureEnabled, {Feature} from "../utils/useIsFeatureEnabled.js";
import {toClientPolicies} from "./routes/ClientPolicies.js";
import {KeysTab} from "./keys/KeysTab.js";
const RealmSettingsHeader = ({
  save,
  onChange,
  value,
  realmName,
  refresh
}) => {
  const {t} = useTranslation("realm-settings");
  const {adminClient} = useAdminClient();
  const {refresh: refreshRealms} = useRealms();
  const {addAlert, addError} = useAlerts();
  const history = useHistory();
  const [partialImportOpen, setPartialImportOpen] = useState(false);
  const [partialExportOpen, setPartialExportOpen] = useState(false);
  const [toggleDisableDialog, DisableConfirm] = useConfirmDialog({
    titleKey: "realm-settings:disableConfirmTitle",
    messageKey: "realm-settings:disableConfirm",
    continueButtonLabel: "common:disable",
    onConfirm: () => {
      onChange(!value);
      save();
    }
  });
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "realm-settings:deleteConfirmTitle",
    messageKey: "realm-settings:deleteConfirm",
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.realms.del({realm: realmName});
        addAlert(t("deletedSuccess"), AlertVariant.success);
        await refreshRealms();
        history.push(toDashboard({realm: environment.masterRealm}));
        refresh();
      } catch (error) {
        addError("realm-settings:deleteError", error);
      }
    }
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DisableConfirm, null), /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(PartialImportDialog, {
    open: partialImportOpen,
    toggleDialog: () => setPartialImportOpen(!partialImportOpen)
  }), /* @__PURE__ */ React.createElement(PartialExportDialog, {
    isOpen: partialExportOpen,
    onClose: () => setPartialExportOpen(false)
  }), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: toUpperCase(realmName),
    subKey: "realm-settings:realmSettingsExplain",
    helpUrl: helpUrls.realmSettingsUrl,
    divider: false,
    dropdownItems: [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "import",
        "data-testid": "openPartialImportModal",
        onClick: () => {
          setPartialImportOpen(true);
        }
      }, t("partialImport")),
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "export",
        "data-testid": "openPartialExportModal",
        onClick: () => setPartialExportOpen(true)
      }, t("partialExport")),
      /* @__PURE__ */ React.createElement(DropdownSeparator, {
        key: "separator"
      }),
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "delete",
        onClick: toggleDeleteDialog
      }, t("common:delete"))
    ],
    isEnabled: value,
    onToggle: (value2) => {
      if (!value2) {
        toggleDisableDialog();
      } else {
        onChange(value2);
        save();
      }
    }
  }));
};
export const RealmSettingsTabs = ({
  realm,
  refresh
}) => {
  const {t} = useTranslation("realm-settings");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm: realmName} = useRealm();
  const {refresh: refreshRealms} = useRealms();
  const history = useHistory();
  const isFeatureEnabled = useIsFeatureEnabled();
  const {control, setValue, getValues} = useForm({
    mode: "onChange",
    shouldUnregister: false
  });
  const [key, setKey] = useState(0);
  const refreshHeader = () => {
    setKey(key + 1);
  };
  const setupForm = (r = realm) => {
    convertToFormValues(r, setValue);
  };
  useEffect(setupForm, []);
  const save = async (r) => {
    r = convertFormValuesToObject(r);
    if (r.attributes?.["acr.loa.map"] && typeof r.attributes["acr.loa.map"] !== "string") {
      const map = JSON.stringify(Object.fromEntries(r.attributes["acr.loa.map"].filter(({key: key2}) => key2 !== "").map(({key: key2, value}) => [key2, value])));
      r.attributes["acr.loa.map"] = map !== "{}" ? map : "[]";
    }
    try {
      await adminClient.realms.update({realm: realmName}, {
        ...realm,
        ...r,
        id: r.realm
      });
      addAlert(t("saveSuccess"), AlertVariant.success);
    } catch (error) {
      addError("realm-settings:saveError", error);
    }
    const isRealmRenamed = realmName !== (r.realm || realm.realm);
    if (isRealmRenamed) {
      await refreshRealms();
      history.push(toRealmSettings({realm: r.realm, tab: "general"}));
    }
    refresh();
  };
  const route = (tab = "general") => routableTab({
    to: toRealmSettings({realm: realmName, tab}),
    history
  });
  const policiesRoute = (tab) => routableTab({
    to: toClientPolicies({
      realm: realmName,
      tab
    }),
    history
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Controller, {
    name: "enabled",
    defaultValue: true,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(RealmSettingsHeader, {
      value,
      onChange,
      realmName,
      refresh: refreshHeader,
      save: () => save(getValues())
    })
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(RoutableTabs, {
    isBox: true,
    mountOnEnter: true,
    defaultLocation: toRealmSettings({
      realm: realmName,
      tab: "general"
    })
  }, /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("general")),
    "data-testid": "rs-general-tab",
    ...route()
  }, /* @__PURE__ */ React.createElement(RealmSettingsGeneralTab, {
    realm,
    save
  })), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("login")),
    "data-testid": "rs-login-tab",
    ...route("login")
  }, /* @__PURE__ */ React.createElement(RealmSettingsLoginTab, {
    refresh,
    realm
  })), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("email")),
    "data-testid": "rs-email-tab",
    ...route("email")
  }, /* @__PURE__ */ React.createElement(RealmSettingsEmailTab, {
    realm
  })), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("themes")),
    "data-testid": "rs-themes-tab",
    ...route("themes")
  }, /* @__PURE__ */ React.createElement(RealmSettingsThemesTab, {
    realm,
    save
  })), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("realm-settings:keys")),
    "data-testid": "rs-keys-tab",
    ...route("keys")
  }, /* @__PURE__ */ React.createElement(KeysTab, null)), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("events")),
    "data-testid": "rs-realm-events-tab",
    ...route("events")
  }, /* @__PURE__ */ React.createElement(EventsTab, null)), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("localization")),
    "data-testid": "rs-localization-tab",
    ...route("localization")
  }, /* @__PURE__ */ React.createElement(LocalizationTab, {
    key,
    refresh,
    save,
    realm
  })), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("securityDefences")),
    "data-testid": "rs-security-defenses-tab",
    ...route("security-defenses")
  }, /* @__PURE__ */ React.createElement(SecurityDefenses, {
    realm,
    save
  })), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("realm-settings:sessions")),
    "data-testid": "rs-sessions-tab",
    ...route("sessions")
  }, /* @__PURE__ */ React.createElement(RealmSettingsSessionsTab, {
    key,
    realm,
    save
  })), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("realm-settings:tokens")),
    "data-testid": "rs-tokens-tab",
    ...route("tokens")
  }, /* @__PURE__ */ React.createElement(RealmSettingsTokensTab, {
    save,
    realm
  })), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("realm-settings:clientPolicies")),
    "data-testid": "rs-clientPolicies-tab",
    ...route("client-policies")
  }, /* @__PURE__ */ React.createElement(RoutableTabs, {
    mountOnEnter: true,
    defaultLocation: toClientPolicies({
      realm: realmName,
      tab: "profiles"
    })
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "profiles",
    "data-testid": "rs-policies-clientProfiles-tab",
    "aria-label": t("clientProfilesSubTab"),
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("profiles")),
    tooltip: /* @__PURE__ */ React.createElement(Tooltip, {
      content: t("realm-settings:clientPoliciesProfilesHelpText")
    }),
    ...policiesRoute("profiles")
  }, /* @__PURE__ */ React.createElement(ProfilesTab, null)), /* @__PURE__ */ React.createElement(Tab, {
    id: "policies",
    "data-testid": "rs-policies-clientPolicies-tab",
    "aria-label": t("clientPoliciesSubTab"),
    ...policiesRoute("policies"),
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("policies")),
    tooltip: /* @__PURE__ */ React.createElement(Tooltip, {
      content: t("realm-settings:clientPoliciesPoliciesHelpText")
    })
  }, /* @__PURE__ */ React.createElement(PoliciesTab, null)))), isFeatureEnabled(Feature.DeclarativeUserProfile) && realm.attributes?.userProfileEnabled === "true" && /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("realm-settings:userProfile")),
    "data-testid": "rs-user-profile-tab",
    ...route("user-profile")
  }, /* @__PURE__ */ React.createElement(UserProfileTab, null)), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("userRegistration")),
    "data-testid": "rs-userRegistration-tab",
    ...route("user-registration")
  }, /* @__PURE__ */ React.createElement(UserRegistration, null)))));
};
