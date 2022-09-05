import React, {Fragment, useEffect, useMemo, useState} from "../_snowpack/pkg/react.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  DataList,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Divider,
  DropdownItem,
  Flex,
  FlexItem,
  FormGroup,
  PageSection,
  Text,
  TextVariants,
  ValidatedOptions
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useForm} from "../_snowpack/pkg/react-hook-form.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {Link, useHistory, useParams} from "../_snowpack/pkg/react-router-dom.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
import {KeycloakTextArea} from "../components/keycloak-text-area/KeycloakTextArea.js";
import {PlusCircleIcon, TrashIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import "./realm-settings-section.css.proxy.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {toAddExecutor} from "./routes/AddExecutor.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import {toClientProfile} from "./routes/ClientProfile.js";
import {toExecutor} from "./routes/Executor.js";
import {toClientPolicies} from "./routes/ClientPolicies.js";
const defaultValues = {
  name: "",
  description: "",
  executors: []
};
export default function ClientProfileForm() {
  const {t} = useTranslation("realm-settings");
  const history = useHistory();
  const {
    handleSubmit,
    setValue,
    register,
    formState: {isDirty, errors}
  } = useForm({
    defaultValues,
    mode: "onChange"
  });
  const {addAlert, addError} = useAlerts();
  const {adminClient} = useAdminClient();
  const [globalProfiles, setGlobalProfiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const {realm, profileName} = useParams();
  const serverInfo = useServerInfo();
  const executorTypes = useMemo(() => serverInfo.componentTypes?.["org.keycloak.services.clientpolicy.executor.ClientPolicyExecutorProvider"], []);
  const [executorToDelete, setExecutorToDelete] = useState();
  const editMode = profileName ? true : false;
  const [key, setKey] = useState(0);
  const reload = () => setKey(new Date().getTime());
  useFetch(() => adminClient.clientPolicies.listProfiles({includeGlobalProfiles: true}), (profiles2) => {
    setGlobalProfiles(profiles2.globalProfiles ?? []);
    setProfiles(profiles2.profiles ?? []);
  }, [key]);
  const save = async (form) => {
    const updatedProfiles = editMode ? patchProfiles(form) : addProfile(form);
    try {
      await adminClient.clientPolicies.createProfiles({
        profiles: updatedProfiles,
        globalProfiles
      });
      addAlert(editMode ? t("realm-settings:updateClientProfileSuccess") : t("realm-settings:createClientProfileSuccess"), AlertVariant.success);
      history.push(toClientProfile({realm, profileName: form.name}));
    } catch (error) {
      addError(editMode ? "realm-settings:updateClientProfileError" : "realm-settings:createClientProfileError", error);
    }
  };
  const patchProfiles = (data) => profiles.map((profile2) => {
    if (profile2.name !== profileName) {
      return profile2;
    }
    return {
      ...profile2,
      name: data.name,
      description: data.description
    };
  });
  const addProfile = (data) => profiles.concat({
    ...data,
    executors: []
  });
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: executorToDelete?.name ? t("deleteExecutorProfileConfirmTitle") : t("deleteClientProfileConfirmTitle"),
    messageKey: executorToDelete?.name ? t("deleteExecutorProfileConfirm", {
      executorName: executorToDelete.name
    }) : t("deleteClientProfileConfirm", {
      profileName
    }),
    continueButtonLabel: t("delete"),
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      if (executorToDelete?.name) {
        profileExecutors.splice(executorToDelete.idx, 1);
        try {
          await adminClient.clientPolicies.createProfiles({
            profiles,
            globalProfiles
          });
          addAlert(t("deleteExecutorSuccess"), AlertVariant.success);
          history.push(toClientProfile({realm, profileName}));
        } catch (error) {
          addError(t("deleteExecutorError"), error);
        }
      } else {
        const updatedProfiles = profiles.filter((profile2) => profile2.name !== profileName);
        try {
          await adminClient.clientPolicies.createProfiles({
            profiles: updatedProfiles,
            globalProfiles
          });
          addAlert(t("deleteClientSuccess"), AlertVariant.success);
          history.push(toClientPolicies({realm, tab: "profiles"}));
        } catch (error) {
          addError(t("deleteClientError"), error);
        }
      }
    }
  });
  const profile = profiles.find((profile2) => profile2.name === profileName);
  const profileExecutors = profile?.executors || [];
  const globalProfile = globalProfiles.find((globalProfile2) => globalProfile2.name === profileName);
  const globalProfileExecutors = globalProfile?.executors || [];
  useEffect(() => {
    setValue("name", globalProfile?.name ?? profile?.name);
    setValue("description", globalProfile?.description ?? profile?.description);
  }, [profiles]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: editMode ? profileName : t("newClientProfile"),
    badges: [
      {
        id: "global-client-profile-badge",
        text: globalProfile ? t("global") : ""
      }
    ],
    divider: true,
    dropdownItems: editMode && !globalProfile ? [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "delete",
        value: "delete",
        onClick: toggleDeleteDialog,
        "data-testid": "deleteClientProfileDropdown"
      }, t("deleteClientProfile"))
    ] : void 0
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "view-realm",
    className: "pf-u-mt-lg"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("newClientProfileName"),
    fieldId: "kc-name",
    helperText: t("createClientProfileNameHelperText"),
    isRequired: true,
    helperTextInvalid: t("common:required"),
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register({required: true}),
    name: "name",
    type: "text",
    id: "name",
    "aria-label": t("name"),
    "data-testid": "client-profile-name",
    isReadOnly: !!globalProfile
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:description"),
    fieldId: "kc-description"
  }, /* @__PURE__ */ React.createElement(KeycloakTextArea, {
    ref: register(),
    name: "description",
    type: "text",
    id: "description",
    "aria-label": t("description"),
    "data-testid": "client-profile-description",
    isReadOnly: !!globalProfile
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, !globalProfile && /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    onClick: () => handleSubmit(save)(),
    "data-testid": "saveCreateProfile",
    isDisabled: !isDirty
  }, t("common:save")), editMode && !globalProfile && /* @__PURE__ */ React.createElement(Button, {
    id: "reloadProfile",
    variant: "link",
    "data-testid": "reloadProfile",
    isDisabled: !isDirty,
    onClick: reload
  }, t("realm-settings:reload")), !editMode && !globalProfile && /* @__PURE__ */ React.createElement(Button, {
    id: "cancelCreateProfile",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toClientPolicies({realm, tab: "profiles"})
    }),
    "data-testid": "cancelCreateProfile"
  }, t("common:cancel"))), editMode && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Text, {
    className: "kc-executors",
    component: TextVariants.h1
  }, t("executors"), /* @__PURE__ */ React.createElement(HelpItem, {
    helpText: "realm-settings:executorsHelpText",
    fieldLabelId: "realm-settings:executors"
  }))), profile && /* @__PURE__ */ React.createElement(FlexItem, {
    align: {default: "alignRight"}
  }, /* @__PURE__ */ React.createElement(Button, {
    id: "addExecutor",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toAddExecutor({
        realm,
        profileName
      })
    }),
    variant: "link",
    className: "kc-addExecutor",
    "data-testid": "addExecutor",
    icon: /* @__PURE__ */ React.createElement(PlusCircleIcon, null)
  }, t("realm-settings:addExecutor")))), profileExecutors.length > 0 && /* @__PURE__ */ React.createElement(DataList, {
    "aria-label": t("executors"),
    isCompact: true
  }, profileExecutors.map((executor, idx) => /* @__PURE__ */ React.createElement(DataListItem, {
    "aria-labelledby": "executors-list-item",
    key: executor.executor,
    id: executor.executor
  }, /* @__PURE__ */ React.createElement(DataListItemRow, {
    "data-testid": "executors-list-row"
  }, /* @__PURE__ */ React.createElement(DataListItemCells, {
    dataListCells: [
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: "executor",
        "data-testid": "executor-type"
      }, executor.configuration ? /* @__PURE__ */ React.createElement(Button, {
        component: (props) => /* @__PURE__ */ React.createElement(Link, {
          ...props,
          to: toExecutor({
            realm,
            profileName,
            executorName: executor.executor
          })
        }),
        variant: "link",
        "data-testid": "editExecutor"
      }, executor.executor) : /* @__PURE__ */ React.createElement("span", {
        className: "kc-unclickable-executor"
      }, executor.executor), executorTypes?.filter((type) => type.id === executor.executor).map((type) => /* @__PURE__ */ React.createElement(Fragment, {
        key: type.id
      }, /* @__PURE__ */ React.createElement(HelpItem, {
        key: type.id,
        helpText: type.helpText,
        fieldLabelId: "realm-settings:executorTypeTextHelpText"
      }), /* @__PURE__ */ React.createElement(Button, {
        variant: "link",
        isInline: true,
        icon: /* @__PURE__ */ React.createElement(TrashIcon, {
          key: `executorType-trash-icon-${type.id}`,
          className: "kc-executor-trash-icon",
          "data-testid": "deleteExecutor"
        }),
        onClick: () => {
          toggleDeleteDialog();
          setExecutorToDelete({
            idx,
            name: type.id
          });
        }
      }))))
    ]
  }))))), globalProfileExecutors.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DataList, {
    "aria-label": t("executors"),
    isCompact: true
  }, globalProfileExecutors.map((executor) => /* @__PURE__ */ React.createElement(DataListItem, {
    "aria-labelledby": "global-executors-list-item",
    key: executor.executor,
    id: executor.executor
  }, /* @__PURE__ */ React.createElement(DataListItemRow, {
    "data-testid": "global-executors-list-row"
  }, /* @__PURE__ */ React.createElement(DataListItemCells, {
    dataListCells: [
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: "executor",
        "data-testid": "global-executor-type"
      }, Object.keys(executor.configuration).length !== 0 ? /* @__PURE__ */ React.createElement(Button, {
        component: (props) => /* @__PURE__ */ React.createElement(Link, {
          ...props,
          to: toExecutor({
            realm,
            profileName,
            executorName: executor.executor
          })
        }),
        variant: "link",
        "data-testid": "editExecutor"
      }, executor.executor) : /* @__PURE__ */ React.createElement("span", {
        className: "kc-unclickable-executor"
      }, executor.executor), executorTypes?.filter((type) => type.id === executor.executor).map((type) => /* @__PURE__ */ React.createElement(HelpItem, {
        key: type.id,
        helpText: type.helpText,
        fieldLabelId: "realm-settings:executorTypeTextHelpText"
      })))
    ]
  }))))), /* @__PURE__ */ React.createElement(Button, {
    id: "backToClientPolicies",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toClientPolicies({realm, tab: "profiles"})
    }),
    variant: "primary",
    className: "kc-backToPolicies",
    "data-testid": "backToClientPolicies"
  }, t("realm-settings:back"))), profileExecutors.length === 0 && globalProfileExecutors.length === 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Text, {
    className: "kc-emptyExecutors",
    component: TextVariants.h6
  }, t("realm-settings:emptyExecutors")))))));
}
