import {FormGroup, Switch} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import React from "../../_snowpack/pkg/react.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {WizardSectionHeader} from "../../components/wizard-section-header/WizardSectionHeader.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const LdapSettingsSynchronization = ({
  form,
  showSectionHeading = false,
  showSectionDescription = false
}) => {
  const {t} = useTranslation("user-federation");
  const {t: helpText} = useTranslation("user-federation-help");
  const watchPeriodicSync = form.watch("config.periodicFullSync", false);
  const watchChangedSync = form.watch("config.periodicChangedUsersSync", false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, showSectionHeading && /* @__PURE__ */ React.createElement(WizardSectionHeader, {
    title: t("synchronizationSettings"),
    description: helpText("ldapSynchronizationSettingsDescription"),
    showDescription: showSectionDescription
  }), /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("importUsers"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:importUsersHelp",
      fieldLabelId: "user-federation:importUsers"
    }),
    fieldId: "kc-import-users"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.importEnabled",
    defaultValue: ["true"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-import-users",
      "data-testid": "import-users",
      name: "importEnabled",
      label: t("common:on"),
      labelOff: t("common:off"),
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value[0] === "true",
      isDisabled: false
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("batchSize"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:batchSizeHelp",
      fieldLabelId: "user-federation:batchSize"
    }),
    fieldId: "kc-batch-size"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "number",
    min: 0,
    id: "kc-batch-size",
    "data-testid": "batch-size",
    name: "config.batchSizeForSync[0]",
    ref: form.register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("periodicFullSync"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:periodicFullSyncHelp",
      fieldLabelId: "user-federation:periodicFullSync"
    }),
    fieldId: "kc-periodic-full-sync",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.periodicFullSync",
    defaultValue: false,
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-periodic-full-sync",
      "data-testid": "periodic-full-sync",
      isDisabled: false,
      onChange: (value2) => onChange(value2),
      isChecked: value === true,
      label: t("common:on"),
      labelOff: t("common:off"),
      ref: form.register
    })
  })), watchPeriodicSync && /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("fullSyncPeriod"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:fullSyncPeriodHelp",
      fieldLabelId: "user-federation:fullSyncPeriod"
    }),
    fieldId: "kc-full-sync-period"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "number",
    min: -1,
    defaultValue: 604800,
    id: "kc-full-sync-period",
    "data-testid": "full-sync-period",
    name: "config.fullSyncPeriod[0]",
    ref: form.register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("periodicChangedUsersSync"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:periodicChangedUsersSyncHelp",
      fieldLabelId: "user-federation:periodicChangedUsersSync"
    }),
    fieldId: "kc-periodic-changed-users-sync",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.periodicChangedUsersSync",
    defaultValue: false,
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-periodic-changed-users-sync",
      "data-testid": "periodic-changed-users-sync",
      isDisabled: false,
      onChange: (value2) => onChange(value2),
      isChecked: value === true,
      label: t("common:on"),
      labelOff: t("common:off"),
      ref: form.register
    })
  })), watchChangedSync && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("changedUsersSyncPeriod"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:changedUsersSyncHelp",
      fieldLabelId: "user-federation:changedUsersSyncPeriod"
    }),
    fieldId: "kc-changed-users-sync-period",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "number",
    min: -1,
    defaultValue: 86400,
    id: "kc-changed-users-sync-period",
    "data-testid": "changed-users-sync-period",
    name: "config.changedSyncPeriod[0]",
    ref: form.register
  }))));
};
