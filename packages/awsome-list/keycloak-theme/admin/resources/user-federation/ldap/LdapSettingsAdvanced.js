import {Button, FormGroup, Switch} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import React from "../../_snowpack/pkg/react.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {WizardSectionHeader} from "../../components/wizard-section-header/WizardSectionHeader.js";
import {convertFormToSettings} from "./LdapSettingsConnection.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useAlerts} from "../../components/alert/Alerts.js";
const PASSWORD_MODIFY_OID = "1.3.6.1.4.1.4203.1.11.1";
export const LdapSettingsAdvanced = ({
  id,
  form,
  showSectionHeading = false,
  showSectionDescription = false
}) => {
  const {t} = useTranslation("user-federation");
  const {t: helpText} = useTranslation("user-federation-help");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {addAlert, addError} = useAlerts();
  const testLdap = async () => {
    if (!await form.trigger())
      return;
    try {
      const settings = convertFormToSettings(form);
      const ldapOids = await adminClient.realms.ldapServerCapabilities({realm}, {...settings, componentId: id});
      addAlert(t("testSuccess"));
      const passwordModifyOid = ldapOids.filter((id2) => id2.oid === PASSWORD_MODIFY_OID);
      form.setValue("config.usePasswordModifyExtendedOp", [
        (passwordModifyOid.length > 0).toString()
      ]);
    } catch (error) {
      addError("user-federation:testError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, showSectionHeading && /* @__PURE__ */ React.createElement(WizardSectionHeader, {
    title: t("advancedSettings"),
    description: helpText("ldapAdvancedSettingsDescription"),
    showDescription: showSectionDescription
  }), /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("enableLdapv3Password"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:enableLdapv3PasswordHelp",
      fieldLabelId: "user-federation:enableLdapv3Password"
    }),
    fieldId: "kc-enable-ldapv3-password",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.usePasswordModifyExtendedOp",
    defaultValue: ["false"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-enable-ldapv3-password",
      "data-testid": "ldapv3-password",
      isDisabled: false,
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value[0] === "true",
      label: t("common:on"),
      labelOff: t("common:off")
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("validatePasswordPolicy"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:validatePasswordPolicyHelp",
      fieldLabelId: "user-federation:validatePasswordPolicy"
    }),
    fieldId: "kc-validate-password-policy",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.validatePasswordPolicy",
    defaultValue: ["false"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-validate-password-policy",
      "data-testid": "password-policy",
      isDisabled: false,
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value[0] === "true",
      label: t("common:on"),
      labelOff: t("common:off")
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("trustEmail"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:trustEmailHelp",
      fieldLabelId: "user-federation:trustEmail"
    }),
    fieldId: "kc-trust-email",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.trustEmail",
    defaultValue: ["false"],
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-trust-email",
      "data-testid": "trust-email",
      isDisabled: false,
      onChange: (value2) => onChange([`${value2}`]),
      isChecked: value[0] === "true",
      label: t("common:on"),
      labelOff: t("common:off")
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    fieldId: "query-extensions"
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    id: "query-extensions",
    "data-testid": "query-extensions",
    onClick: testLdap
  }, t("queryExtensions")))));
};
