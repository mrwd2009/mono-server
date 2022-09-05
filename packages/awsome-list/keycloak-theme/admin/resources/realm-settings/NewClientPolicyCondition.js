import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Controller, FormProvider, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  FormGroup,
  PageSection,
  Select,
  SelectOption,
  SelectVariant
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {FormPanel} from "../components/scroll-form/FormPanel.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import {camelCase} from "../_snowpack/pkg/lodash-es.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useHistory, useParams} from "../_snowpack/pkg/react-router.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {
  toEditClientPolicy
} from "./routes/EditClientPolicy.js";
import {DynamicComponents} from "../components/dynamic/DynamicComponents.js";
export default function NewClientPolicyCondition() {
  const {t} = useTranslation("realm-settings");
  const {addAlert, addError} = useAlerts();
  const history = useHistory();
  const {realm} = useRealm();
  const [openConditionType, setOpenConditionType] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [condition, setCondition] = useState([]);
  const [conditionData, setConditionData] = useState();
  const [conditionType, setConditionType] = useState("");
  const [conditionProperties, setConditionProperties] = useState([]);
  const {policyName} = useParams();
  const {conditionName} = useParams();
  const serverInfo = useServerInfo();
  const form = useForm({
    shouldUnregister: false
  });
  const conditionTypes = serverInfo.componentTypes?.["org.keycloak.services.clientpolicy.condition.ClientPolicyConditionProvider"];
  const {adminClient} = useAdminClient();
  const setupForm = (condition2) => {
    form.reset({config: condition2.configuration || {}});
  };
  useFetch(() => adminClient.clientPolicies.listPolicies(), (policies2) => {
    setPolicies(policies2.policies ?? []);
    if (conditionName) {
      const currentPolicy = policies2.policies?.find((item) => item.name === policyName);
      const typeAndConfigData = currentPolicy?.conditions?.find((item) => item.condition === conditionName);
      const currentCondition = conditionTypes?.find((condition2) => condition2.id === conditionName);
      setConditionData(typeAndConfigData);
      setConditionProperties(currentCondition?.properties);
      setupForm(typeAndConfigData);
    }
  }, []);
  const save = async (configPolicy) => {
    const configValues = configPolicy.config;
    const writeConfig = () => {
      return conditionProperties.reduce((r, p) => {
        r[p.name] = configValues[p.name];
        return r;
      }, {});
    };
    const updatedPolicies = policies.map((policy) => {
      if (policy.name !== policyName) {
        return policy;
      }
      let conditions = policy.conditions ?? [];
      if (conditionName) {
        const createdCondition = {
          condition: conditionData?.condition,
          configuration: writeConfig()
        };
        const index = conditions.findIndex((condition2) => conditionName === condition2.condition);
        if (index === -1) {
          return;
        }
        const newConditions = [
          ...conditions.slice(0, index),
          createdCondition,
          ...conditions.slice(index + 1)
        ];
        return {
          ...policy,
          conditions: newConditions
        };
      }
      conditions = conditions.concat({
        condition: condition[0].condition,
        configuration: writeConfig()
      });
      return {
        ...policy,
        conditions
      };
    });
    try {
      await adminClient.clientPolicies.updatePolicy({
        policies: updatedPolicies
      });
      setPolicies(updatedPolicies);
      history.push(toEditClientPolicy({realm, policyName}));
      addAlert(conditionName ? t("realm-settings:updateClientConditionSuccess") : t("realm-settings:createClientConditionSuccess"), AlertVariant.success);
    } catch (error) {
      addError("realm-settings:createClientConditionError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormPanel, {
    className: "kc-login-screen",
    title: conditionName ? t("editCondition") : t("addCondition")
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    onSubmit: form.handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("conditionType"),
    fieldId: "conditionType",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: conditionType ? `realm-settings-help:${camelCase(conditionType.replace(/-/g, " "))}` : "realm-settings:anyClient",
      fieldLabelId: "realm-settings:conditionType"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "conditions",
    defaultValue: "any-client",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      placeholderText: t("selectACondition"),
      className: "kc-conditionType-select",
      "data-testid": "conditionType-select",
      toggleId: "provider",
      isDisabled: !!conditionName,
      onToggle: (toggle) => setOpenConditionType(toggle),
      onSelect: (_, value2) => {
        onChange(value2);
        setConditionProperties(value2.properties);
        setConditionType(value2.id);
        setCondition([
          {
            condition: value2.id
          }
        ]);
        setOpenConditionType(false);
      },
      selections: conditionName ? conditionName : conditionType,
      variant: SelectVariant.single,
      "aria-label": t("conditionType"),
      isOpen: openConditionType
    }, conditionTypes?.map((condition2) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: condition2.id === value,
      description: t(`realm-settings-help:${camelCase(condition2.id.replace(/-/g, " "))}`),
      key: condition2.id,
      value: condition2
    }, condition2.id)))
  })), /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(DynamicComponents, {
    properties: conditionProperties
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "addCondition-saveBtn",
    isDisabled: conditionType === "" && !conditionName
  }, conditionName ? t("common:save") : t("common:add")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    "data-testid": "addCondition-cancelBtn",
    onClick: () => history.push(toEditClientPolicy({realm, policyName}))
  }, t("common:cancel"))))));
}
