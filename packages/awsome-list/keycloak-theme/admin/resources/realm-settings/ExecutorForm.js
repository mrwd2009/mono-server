import React, {useState} from "../_snowpack/pkg/react.js";
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
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import {Controller, FormProvider, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {Link, useHistory, useParams} from "../_snowpack/pkg/react-router-dom.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {toClientProfile} from "./routes/ClientProfile.js";
import {DynamicComponents} from "../components/dynamic/DynamicComponents.js";
const defaultValues = {
  config: {},
  executor: ""
};
export default function ExecutorForm() {
  const {t} = useTranslation("realm-settings");
  const history = useHistory();
  const {realm, profileName} = useParams();
  const {executorName} = useParams();
  const {addAlert, addError} = useAlerts();
  const [selectExecutorTypeOpen, setSelectExecutorTypeOpen] = useState(false);
  const serverInfo = useServerInfo();
  const {adminClient} = useAdminClient();
  const executorTypes = serverInfo.componentTypes?.["org.keycloak.services.clientpolicy.executor.ClientPolicyExecutorProvider"];
  const [executors, setExecutors] = useState([]);
  const [executorProperties, setExecutorProperties] = useState([]);
  const [globalProfiles, setGlobalProfiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const form = useForm({defaultValues});
  const {control, reset, handleSubmit} = form;
  const editMode = !!executorName;
  const setupForm = (profiles2) => {
    const profile = profiles2.find((profile2) => profile2.name === profileName);
    const executor = profile?.executors?.find((executor2) => executor2.executor === executorName);
    if (executor)
      reset({config: executor.configuration});
  };
  useFetch(() => adminClient.clientPolicies.listProfiles({includeGlobalProfiles: true}), (profiles2) => {
    setGlobalProfiles(profiles2.globalProfiles);
    setProfiles(profiles2.profiles);
    setupForm(profiles2.profiles);
    setupForm(profiles2.globalProfiles);
  }, []);
  const save = async () => {
    const formValues = form.getValues();
    const updatedProfiles = profiles.map((profile) => {
      if (profile.name !== profileName) {
        return profile;
      }
      const profileExecutor = profile.executors.find((executor) => executor.executor === executorName);
      const executors2 = (profile.executors ?? []).concat({
        executor: formValues.executor,
        configuration: formValues.config
      });
      if (editMode) {
        profileExecutor.configuration = {
          ...profileExecutor.configuration,
          ...formValues.config
        };
      }
      if (editMode) {
        return profile;
      }
      return {
        ...profile,
        executors: executors2
      };
    });
    try {
      await adminClient.clientPolicies.createProfiles({
        profiles: updatedProfiles,
        globalProfiles
      });
      addAlert(editMode ? t("realm-settings:updateExecutorSuccess") : t("realm-settings:addExecutorSuccess"), AlertVariant.success);
      history.push(toClientProfile({realm, profileName}));
    } catch (error) {
      addError(editMode ? "realm-settings:updateExecutorError" : "realm-settings:addExecutorError", error);
    }
  };
  const globalProfile = globalProfiles.find((globalProfile2) => globalProfile2.name === profileName);
  const profileExecutorType = executorTypes?.find((executor) => executor.id === executorName);
  const editedProfileExecutors = profileExecutorType?.properties.map((property) => {
    const globalDefaultValues = editMode ? property.defaultValue : "";
    return {
      ...property,
      defaultValue: globalDefaultValues
    };
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: editMode ? executorName : t("addExecutor"),
    divider: true
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    isReadOnly: !!globalProfile
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("executorType"),
    fieldId: "kc-executorType",
    labelIcon: executors.length > 0 && executors[0].helpText !== "" ? /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: executors[0].helpText,
      fieldLabelId: "realm-settings:executorTypeHelpText"
    }) : editMode ? /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: profileExecutorType?.helpText,
      fieldLabelId: "realm-settings:executorTypeHelpText"
    }) : void 0
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "executor",
    defaultValue: "",
    control,
    render: ({value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-executor",
      placeholderText: "Select an executor",
      onToggle: (isOpen) => setSelectExecutorTypeOpen(isOpen),
      onSelect: (_, value2) => {
        reset({...defaultValues, executor: value2.toString()});
        const selectedExecutor = executorTypes?.filter((type) => type.id === value2);
        setExecutors(selectedExecutor ?? []);
        setExecutorProperties(selectedExecutor?.[0].properties ?? []);
        setSelectExecutorTypeOpen(false);
      },
      selections: editMode ? executorName : value,
      variant: SelectVariant.single,
      "data-testid": "executorType-select",
      "aria-label": t("executorType"),
      isOpen: selectExecutorTypeOpen,
      maxHeight: 580,
      isDisabled: editMode
    }, executorTypes?.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option.id === value,
      key: option.id,
      value: option.id,
      description: option.helpText
    })))
  })), /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(DynamicComponents, {
    properties: editMode ? editedProfileExecutors : executorProperties
  })), !globalProfile && /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    onClick: () => handleSubmit(save)(),
    "data-testid": "addExecutor-saveBtn"
  }, editMode ? t("common:save") : t("common:add")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toClientProfile({realm, profileName})
    }),
    "data-testid": "addExecutor-cancelBtn"
  }, t("common:cancel")))), editMode && globalProfile && /* @__PURE__ */ React.createElement("div", {
    className: "kc-backToProfile"
  }, /* @__PURE__ */ React.createElement(Button, {
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toClientProfile({realm, profileName})
    }),
    variant: "primary"
  }, t("realm-settings:back")))));
}
