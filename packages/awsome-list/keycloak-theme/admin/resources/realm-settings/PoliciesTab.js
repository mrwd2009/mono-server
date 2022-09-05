import React, {useState} from "../_snowpack/pkg/react.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Divider,
  Flex,
  FlexItem,
  PageSection,
  Radio,
  Switch,
  Title,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {prettyPrintJSON} from "../util.js";
import {CodeEditor, Language} from "../_snowpack/pkg/@patternfly/react-code-editor.js";
import {Link, useHistory} from "../_snowpack/pkg/react-router-dom.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {toAddClientPolicy} from "./routes/AddClientPolicy.js";
import {toEditClientPolicy} from "./routes/EditClientPolicy.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
import {Controller, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {toClientPolicies} from "./routes/ClientPolicies.js";
import "./realm-settings-section.css.proxy.js";
export const PoliciesTab = () => {
  const {t} = useTranslation("realm-settings");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [policies, setPolicies] = useState();
  const [selectedPolicy, setSelectedPolicy] = useState();
  const [key, setKey] = useState(0);
  const [code, setCode] = useState();
  const [tablePolicies, setTablePolicies] = useState();
  const refresh = () => setKey(key + 1);
  const form = useForm({mode: "onChange"});
  useFetch(() => adminClient.clientPolicies.listPolicies(), (policies2) => {
    setPolicies(policies2.policies), setTablePolicies(policies2.policies || []), setCode(prettyPrintJSON(policies2.policies));
  }, [key]);
  const loader = async () => policies ?? [];
  const saveStatus = async () => {
    const switchValues = form.getValues();
    const updatedPolicies = policies?.map((policy) => {
      const enabled = switchValues[policy.name];
      return {
        ...policy,
        enabled
      };
    });
    try {
      await adminClient.clientPolicies.updatePolicy({
        policies: updatedPolicies
      });
      history.push(toClientPolicies({realm, tab: "policies"}));
      addAlert(t("realm-settings:updateClientPolicySuccess"), AlertVariant.success);
    } catch (error) {
      addError("realm-settings:updateClientPolicyError", error);
    }
  };
  const ClientPolicyDetailLink = ({name}) => /* @__PURE__ */ React.createElement(Link, {
    to: toEditClientPolicy({realm, policyName: name})
  }, name);
  const SwitchRenderer = ({
    clientPolicy
  }) => {
    const [toggleDisableDialog, DisableConfirm] = useConfirmDialog({
      titleKey: "realm-settings:disablePolicyConfirmTitle",
      messageKey: "realm-settings:disablePolicyConfirm",
      continueButtonLabel: "common:disable",
      onConfirm: () => {
        form.setValue(clientPolicy.name, false);
        saveStatus();
      }
    });
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DisableConfirm, null), /* @__PURE__ */ React.createElement(Controller, {
      name: clientPolicy.name,
      "data-testid": `${clientPolicy.name}-switch`,
      defaultValue: clientPolicy.enabled,
      control: form.control,
      render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
        label: t("common:enabled"),
        labelOff: t("common:disabled"),
        isChecked: value,
        onChange: (value2) => {
          if (!value2) {
            toggleDisableDialog();
          } else {
            onChange(value2);
            saveStatus();
          }
        }
      })
    }));
  };
  const save = async () => {
    if (!code) {
      return;
    }
    try {
      const obj = JSON.parse(code);
      try {
        await adminClient.clientPolicies.updatePolicy({
          policies: obj
        });
        addAlert(t("realm-settings:updateClientPoliciesSuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError("realm-settings:updateClientPoliciesError", error);
      }
    } catch (error) {
      console.warn("Invalid json, ignoring value using {}");
      addError("realm-settings:updateClientPoliciesError", error);
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("deleteClientPolicyConfirmTitle"),
    messageKey: t("deleteClientPolicyConfirm", {
      policyName: selectedPolicy?.name
    }),
    continueButtonLabel: t("delete"),
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      const updatedPolicies = policies?.filter((policy) => policy.name !== selectedPolicy?.name);
      try {
        await adminClient.clientPolicies.updatePolicy({
          policies: updatedPolicies
        });
        addAlert(t("deleteClientPolicySuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError(t("deleteClientPolicyError"), error);
      }
    }
  });
  if (!policies) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(Flex, {
    className: "kc-policies-config-section"
  }, /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h1",
    size: "md"
  }, t("policiesConfigType"))), /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Radio, {
    isChecked: !show,
    name: "policiesView",
    onChange: () => setShow(false),
    label: t("policiesConfigTypes.formView"),
    id: "formView-policiesView",
    "data-testid": "formView-policiesView",
    className: "kc-form-radio-btn pf-u-mr-sm pf-u-ml-sm"
  })), /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Radio, {
    isChecked: show,
    name: "policiesView",
    onChange: () => setShow(true),
    label: t("policiesConfigTypes.jsonEditor"),
    id: "jsonEditor-policiesView",
    "data-testid": "jsonEditor-policiesView",
    className: "kc-editor-radio-btn"
  })))), /* @__PURE__ */ React.createElement(Divider, null), !show ? /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key: policies.length,
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("realm-settings:noClientPolicies"),
      instructions: t("realm-settings:noClientPoliciesInstructions"),
      primaryActionText: t("realm-settings:createClientPolicy"),
      onPrimaryAction: () => history.push(toAddClientPolicy({realm}))
    }),
    ariaLabelKey: "realm-settings:clientPolicies",
    searchPlaceholderKey: "realm-settings:clientPolicySearch",
    loader,
    toolbarItem: /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      id: "createPolicy",
      component: (props) => /* @__PURE__ */ React.createElement(Link, {
        ...props,
        to: toAddClientPolicy({realm})
      }),
      "data-testid": "createPolicy"
    }, t("createClientPolicy"))),
    actions: [
      {
        title: t("common:delete"),
        onRowClick: (item) => {
          toggleDeleteDialog();
          setSelectedPolicy(item);
        }
      }
    ],
    columns: [
      {
        name: "name",
        cellRenderer: ClientPolicyDetailLink
      },
      {
        name: "enabled",
        displayKey: "realm-settings:status",
        cellRenderer: (clientPolicy) => /* @__PURE__ */ React.createElement(SwitchRenderer, {
          clientPolicy
        })
      },
      {
        name: "description"
      }
    ]
  }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "pf-u-mt-md pf-u-ml-lg"
  }, /* @__PURE__ */ React.createElement(CodeEditor, {
    isLineNumbersVisible: true,
    isLanguageLabelVisible: true,
    isReadOnly: false,
    code,
    language: Language.json,
    height: "30rem",
    onChange: setCode
  })), /* @__PURE__ */ React.createElement("div", {
    className: "pf-u-mt-md"
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.primary,
    className: "pf-u-mr-md pf-u-ml-lg",
    "data-testid": "jsonEditor-policies-saveBtn",
    onClick: save
  }, t("save")), /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.link,
    "data-testid": "jsonEditor-reloadBtn",
    onClick: () => {
      setCode(prettyPrintJSON(tablePolicies));
    }
  }, t("reload")))));
};
