import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  AlertVariant,
  Button,
  Divider,
  FormGroup,
  PageSection,
  Radio,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {SaveReset} from "../advanced/SaveReset.js";
import {ImportDialog} from "./ImportDialog.js";
import useToggle from "../../utils/useToggle.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {DecisionStrategySelect} from "./DecisionStragegySelect.js";
const POLICY_ENFORCEMENT_MODES = [
  "ENFORCING",
  "PERMISSIVE",
  "DISABLED"
];
export const AuthorizationSettings = ({clientId}) => {
  const {t} = useTranslation("clients");
  const [resource, setResource] = useState();
  const [importDialog, toggleImportDialog] = useToggle();
  const form = useForm({});
  const {control, reset, handleSubmit} = form;
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  useFetch(() => adminClient.clients.getResourceServer({id: clientId}), (resource2) => {
    setResource(resource2);
    reset(resource2);
  }, []);
  const importResource = async (value) => {
    try {
      await adminClient.clients.importResource({id: clientId}, value);
      addAlert(t("importResourceSuccess"), AlertVariant.success);
      reset({...value});
    } catch (error) {
      addError("clients:importResourceError", error);
    }
  };
  const save = async (resource2) => {
    try {
      await adminClient.clients.updateResourceServer({id: clientId}, resource2);
      addAlert(t("updateResourceSuccess"), AlertVariant.success);
    } catch (error) {
      addError("clients:resourceSaveError", error);
    }
  };
  if (!resource) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, importDialog && /* @__PURE__ */ React.createElement(ImportDialog, {
    onConfirm: importResource,
    closeDialog: toggleImportDialog
  }), /* @__PURE__ */ React.createElement(FormAccess, {
    role: "view-clients",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("import"),
    fieldId: "import",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:import",
      fieldLabelId: "clients:import"
    })
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    onClick: toggleImportDialog
  }, t("import"))), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("policyEnforcementMode"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:policyEnforcementMode",
      fieldLabelId: "clients:policyEnforcementMode"
    }),
    fieldId: "policyEnforcementMode",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "policyEnforcementMode",
    "data-testid": "policyEnforcementMode",
    defaultValue: POLICY_ENFORCEMENT_MODES[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(React.Fragment, null, POLICY_ENFORCEMENT_MODES.map((mode) => /* @__PURE__ */ React.createElement(Radio, {
      id: mode,
      key: mode,
      "data-testid": mode,
      isChecked: value === mode,
      name: "policyEnforcementMode",
      onChange: () => onChange(mode),
      label: t(`policyEnforcementModes.${mode}`),
      className: "pf-u-mb-md"
    })))
  })), /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(DecisionStrategySelect, {
    isLimited: true
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("allowRemoteResourceManagement"),
    fieldId: "allowRemoteResourceManagement",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:allowRemoteResourceManagement",
      fieldLabelId: "clients:allowRemoteResourceManagement"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "allowRemoteResourceManagement",
    "data-testid": "allowRemoteResourceManagement",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "allowRemoteResourceManagement",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  })), /* @__PURE__ */ React.createElement(SaveReset, {
    name: "authenticationSettings",
    save: () => handleSubmit(save)(),
    reset: () => reset(resource),
    isActive: true
  })));
};
