import React, {useState} from "../_snowpack/pkg/react.js";
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
import {Controller, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {Link, useHistory, useParams} from "../_snowpack/pkg/react-router-dom.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
import {KeycloakTextArea} from "../components/keycloak-text-area/KeycloakTextArea.js";
import {PlusCircleIcon, TrashIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {toNewClientPolicyCondition} from "./routes/AddCondition.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import {toEditClientPolicyCondition} from "./routes/EditCondition.js";
import {toClientProfile} from "./routes/ClientProfile.js";
import {
  toEditClientPolicy
} from "./routes/EditClientPolicy.js";
import {AddClientProfileModal} from "./AddClientProfileModal.js";
import {toClientPolicies} from "./routes/ClientPolicies.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
import "./realm-settings-section.css.proxy.js";
const defaultValues = {
  name: "",
  description: "",
  conditions: [],
  enabled: true,
  profiles: []
};
export default function NewClientPolicyForm() {
  const {t} = useTranslation("realm-settings");
  const {
    reset: resetForm,
    formState: {errors}
  } = useForm({
    defaultValues
  });
  const {realm} = useRealm();
  const {addAlert, addError} = useAlerts();
  const {adminClient} = useAdminClient();
  const [policies, setPolicies] = useState();
  const [clientProfiles, setClientProfiles] = useState([]);
  const [currentPolicy, setCurrentPolicy] = useState();
  const [
    showAddConditionsAndProfilesForm,
    setShowAddConditionsAndProfilesForm
  ] = useState(false);
  const [conditionToDelete, setConditionToDelete] = useState();
  const [profilesModalOpen, setProfilesModalOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState();
  const {policyName} = useParams();
  const history = useHistory();
  const form = useForm({mode: "onChange"});
  const {handleSubmit} = form;
  const formValues = form.getValues();
  const ClientPoliciesHeader = ({
    save: save2,
    onChange,
    value
  }) => {
    const {t: t2} = useTranslation("realm-settings");
    const [toggleDisableDialog, DisableConfirm] = useConfirmDialog({
      titleKey: "realm-settings:disablePolicyConfirmTitle",
      messageKey: "realm-settings:disablePolicyConfirm",
      continueButtonLabel: "common:disable",
      onConfirm: () => {
        onChange(!value);
        save2();
      }
    });
    if (!policies) {
      return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DisableConfirm, null), /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
      titleKey: showAddConditionsAndProfilesForm || policyName ? formValues.name : "realm-settings:createPolicy",
      divider: true,
      dropdownItems: showAddConditionsAndProfilesForm || policyName ? [
        /* @__PURE__ */ React.createElement(DropdownItem, {
          key: "delete",
          value: "delete",
          onClick: () => {
            toggleDeleteDialog();
          },
          "data-testid": "deleteClientPolicyDropdown"
        }, t2("deleteClientPolicy"))
      ] : void 0,
      isEnabled: value,
      onToggle: (value2) => {
        if (!value2) {
          toggleDisableDialog();
        } else {
          onChange(value2);
          save2();
        }
      }
    }));
  };
  useFetch(async () => {
    const [policies2, profiles] = await Promise.all([
      adminClient.clientPolicies.listPolicies(),
      adminClient.clientPolicies.listProfiles({
        includeGlobalProfiles: true
      })
    ]);
    return {policies: policies2, profiles};
  }, ({policies: policies2, profiles}) => {
    const currentPolicy2 = policies2.policies?.find((item) => item.name === policyName);
    const allClientProfiles = [
      ...profiles.globalProfiles ?? [],
      ...profiles.profiles ?? []
    ];
    setPolicies(policies2.policies ?? []);
    if (currentPolicy2) {
      setupForm(currentPolicy2);
      setClientProfiles(allClientProfiles);
      setCurrentPolicy(currentPolicy2);
      setShowAddConditionsAndProfilesForm(true);
    }
  }, []);
  const setupForm = (policy2) => {
    resetForm();
    Object.entries(policy2).map(([key, value]) => {
      form.setValue(key, value);
    });
  };
  const policy = (policies || []).filter((policy2) => policy2.name === policyName);
  const policyConditions = policy[0]?.conditions || [];
  const policyProfiles = policy[0]?.profiles || [];
  const serverInfo = useServerInfo();
  const conditionTypes = serverInfo.componentTypes?.["org.keycloak.services.clientpolicy.condition.ClientPolicyConditionProvider"];
  const save = async () => {
    const createdForm = form.getValues();
    const createdPolicy = {
      ...createdForm,
      profiles: [],
      conditions: []
    };
    const getAllPolicies = () => {
      const policyNameExists = policies?.some((policy2) => policy2.name === createdPolicy.name);
      if (policyNameExists) {
        return policies?.map((policy2) => policy2.name === createdPolicy.name ? createdPolicy : policy2);
      } else if (createdForm.name !== policyName) {
        return policies?.filter((item) => item.name !== policyName).concat(createdForm);
      }
      return policies?.concat(createdForm);
    };
    try {
      await adminClient.clientPolicies.updatePolicy({
        policies: getAllPolicies()
      });
      addAlert(policyName ? t("realm-settings:updateClientPolicySuccess") : t("realm-settings:createClientPolicySuccess"), AlertVariant.success);
      history.push(toEditClientPolicy({realm, policyName: createdForm.name}));
      setShowAddConditionsAndProfilesForm(true);
    } catch (error) {
      addError("realm-settings:createClientPolicyError", error);
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("deleteClientPolicyConfirmTitle"),
    messageKey: t("deleteClientPolicyConfirm", {
      policyName
    }),
    continueButtonLabel: t("delete"),
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      const updatedPolicies = policies?.filter((policy2) => policy2.name !== policyName);
      try {
        await adminClient.clientPolicies.updatePolicy({
          policies: updatedPolicies
        });
        addAlert(t("deleteClientPolicySuccess"), AlertVariant.success);
        history.push(toClientPolicies({
          realm,
          tab: "policies"
        }));
      } catch (error) {
        addError(t("deleteClientPolicyError"), error);
      }
    }
  });
  const [toggleDeleteConditionDialog, DeleteConditionConfirm] = useConfirmDialog({
    titleKey: t("deleteClientPolicyConditionConfirmTitle"),
    messageKey: t("deleteClientPolicyConditionConfirm", {
      condition: conditionToDelete?.name
    }),
    continueButtonLabel: t("delete"),
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      if (conditionToDelete?.name) {
        currentPolicy?.conditions?.splice(conditionToDelete.idx, 1);
        try {
          await adminClient.clientPolicies.updatePolicy({
            policies
          });
          addAlert(t("deleteConditionSuccess"), AlertVariant.success);
          history.push(toEditClientPolicy({realm, policyName: formValues.name}));
        } catch (error) {
          addError(t("deleteConditionError"), error);
        }
      } else {
        const updatedPolicies = policies?.filter((policy2) => policy2.name !== policyName);
        try {
          await adminClient.clientPolicies.updatePolicy({
            policies: updatedPolicies
          });
          addAlert(t("deleteClientSuccess"), AlertVariant.success);
          history.push(toClientPolicies({
            realm,
            tab: "policies"
          }));
        } catch (error) {
          addError(t("deleteClientError"), error);
        }
      }
    }
  });
  const [toggleDeleteProfileDialog, DeleteProfileConfirm] = useConfirmDialog({
    titleKey: t("deleteClientPolicyProfileConfirmTitle"),
    messageKey: t("deleteClientPolicyProfileConfirm", {
      profileName: profileToDelete?.name,
      policyName
    }),
    continueButtonLabel: t("delete"),
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      if (profileToDelete?.name) {
        currentPolicy?.profiles?.splice(profileToDelete.idx, 1);
        try {
          await adminClient.clientPolicies.updatePolicy({
            policies
          });
          addAlert(t("deleteClientPolicyProfileSuccess"), AlertVariant.success);
          history.push(toEditClientPolicy({realm, policyName: formValues.name}));
        } catch (error) {
          addError(t("deleteClientPolicyProfileError"), error);
        }
      } else {
        const updatedPolicies = policies?.filter((policy2) => policy2.name !== policyName);
        try {
          await adminClient.clientPolicies.updatePolicy({
            policies: updatedPolicies
          });
          addAlert(t("deleteClientSuccess"), AlertVariant.success);
          history.push(toClientPolicies({
            realm,
            tab: "policies"
          }));
        } catch (error) {
          addError(t("deleteClientError"), error);
        }
      }
    }
  });
  const reset = () => {
    form.setValue("name", currentPolicy?.name);
    form.setValue("description", currentPolicy?.description);
  };
  const toggleModal = () => {
    setProfilesModalOpen(!profilesModalOpen);
  };
  const addProfiles = async (profiles) => {
    const createdPolicy = {
      ...currentPolicy,
      profiles: policyProfiles.concat(profiles),
      conditions: currentPolicy?.conditions
    };
    const index = policies?.findIndex((policy2) => createdPolicy.name === policy2.name);
    if (!index || index === -1) {
      return;
    }
    const newPolicies = [
      ...(policies || []).slice(0, index),
      createdPolicy,
      ...(policies || []).slice(index + 1)
    ];
    try {
      await adminClient.clientPolicies.updatePolicy({
        policies: newPolicies
      });
      setPolicies(newPolicies);
      history.push(toEditClientPolicy({realm, policyName: formValues.name}));
      addAlert(t("realm-settings:addClientProfileSuccess"), AlertVariant.success);
    } catch (error) {
      addError("realm-settings:addClientProfileError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConditionConfirm, null), /* @__PURE__ */ React.createElement(DeleteProfileConfirm, null), /* @__PURE__ */ React.createElement(AddClientProfileModal, {
    onConfirm: (profiles) => {
      addProfiles(profiles.map((item) => item.name));
    },
    allProfiles: policyProfiles,
    open: profilesModalOpen,
    toggleDialog: toggleModal
  }), /* @__PURE__ */ React.createElement(Controller, {
    name: "enabled",
    defaultValue: true,
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(ClientPoliciesHeader, {
      value,
      onChange,
      realmName: realm,
      save
    })
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    onSubmit: handleSubmit(save),
    isHorizontal: true,
    role: "view-realm",
    className: "pf-u-mt-lg"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    fieldId: "kc-client-profile-name",
    isRequired: true,
    helperTextInvalid: t("common:required"),
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: form.register({required: true}),
    type: "text",
    id: "kc-client-profile-name",
    name: "name",
    "data-testid": "client-policy-name"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:description"),
    fieldId: "kc-description"
  }, /* @__PURE__ */ React.createElement(KeycloakTextArea, {
    name: "description",
    "aria-label": t("description"),
    ref: form.register(),
    type: "text",
    id: "kc-client-policy-description",
    "data-testid": "client-policy-description"
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "saveCreatePolicy",
    isDisabled: !formValues.name
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    id: "cancelCreatePolicy",
    variant: "link",
    onClick: () => showAddConditionsAndProfilesForm || policyName ? reset() : history.push(toClientPolicies({
      realm,
      tab: "policies"
    })),
    "data-testid": "cancelCreatePolicy"
  }, showAddConditionsAndProfilesForm ? t("common:reload") : t("common:cancel"))), (showAddConditionsAndProfilesForm || form.formState.isSubmitted) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Text, {
    className: "kc-conditions",
    component: TextVariants.h1
  }, t("conditions"), /* @__PURE__ */ React.createElement(HelpItem, {
    helpText: "realm-settings:realm-settings-help:conditions",
    fieldLabelId: "realm-settings:conditions"
  }))), /* @__PURE__ */ React.createElement(FlexItem, {
    align: {default: "alignRight"}
  }, /* @__PURE__ */ React.createElement(Button, {
    id: "addCondition",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toNewClientPolicyCondition({
        realm,
        policyName: formValues.name
      })
    }),
    variant: "link",
    className: "kc-addCondition",
    "data-testid": "addCondition",
    icon: /* @__PURE__ */ React.createElement(PlusCircleIcon, null)
  }, t("realm-settings:addCondition")))), policyConditions.length > 0 ? /* @__PURE__ */ React.createElement(DataList, {
    "aria-label": t("conditions"),
    isCompact: true
  }, policyConditions.map((condition, idx) => /* @__PURE__ */ React.createElement(DataListItem, {
    "aria-labelledby": "conditions-list-item",
    key: `list-item-${idx}`,
    id: condition.condition,
    "data-testid": "conditions-list-item"
  }, /* @__PURE__ */ React.createElement(DataListItemRow, {
    "data-testid": "conditions-list-row"
  }, /* @__PURE__ */ React.createElement(DataListItemCells, {
    dataListCells: [
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: `name-${idx}`,
        "data-testid": "condition-type"
      }, Object.keys(condition.configuration).length !== 0 ? /* @__PURE__ */ React.createElement(Link, {
        key: condition.condition,
        "data-testid": `${condition.condition}-condition-link`,
        to: toEditClientPolicyCondition({
          realm,
          conditionName: condition.condition,
          policyName
        }),
        className: "kc-condition-link"
      }, condition.condition) : condition.condition, conditionTypes?.map((type) => type.id === condition.condition && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HelpItem, {
        helpText: type.helpText,
        fieldLabelId: condition.condition
      }), /* @__PURE__ */ React.createElement(Button, {
        variant: "link",
        isInline: true,
        icon: /* @__PURE__ */ React.createElement(TrashIcon, {
          className: "kc-conditionType-trash-icon",
          "data-testid": `delete-${condition.condition}-condition`,
          onClick: () => {
            toggleDeleteConditionDialog();
            setConditionToDelete({
              idx,
              name: type.id
            });
          }
        })
      }))))
    ]
  }))))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Text, {
    className: "kc-emptyConditions",
    component: TextVariants.h6
  }, t("realm-settings:emptyConditions")))), (showAddConditionsAndProfilesForm || form.formState.isSubmitted) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Text, {
    className: "kc-client-profiles",
    component: TextVariants.h1
  }, t("clientProfiles"), /* @__PURE__ */ React.createElement(HelpItem, {
    helpText: "realm-settings-help:clientProfiles",
    fieldLabelId: "realm-settings:clientProfiles"
  }))), /* @__PURE__ */ React.createElement(FlexItem, {
    align: {default: "alignRight"}
  }, /* @__PURE__ */ React.createElement(Button, {
    id: "addClientProfile",
    variant: "link",
    className: "kc-addClientProfile",
    "data-testid": "addClientProfile",
    icon: /* @__PURE__ */ React.createElement(PlusCircleIcon, null),
    onClick: toggleModal
  }, t("realm-settings:addClientProfile")))), policyProfiles.length > 0 ? /* @__PURE__ */ React.createElement(DataList, {
    "aria-label": t("profiles"),
    isCompact: true
  }, policyProfiles.map((profile, idx) => /* @__PURE__ */ React.createElement(DataListItem, {
    "aria-labelledby": `${profile}-profile-list-item`,
    key: profile,
    id: `${profile}-profile-list-item`,
    "data-testid": "profile-list-item"
  }, /* @__PURE__ */ React.createElement(DataListItemRow, {
    "data-testid": "profile-list-row"
  }, /* @__PURE__ */ React.createElement(DataListItemCells, {
    dataListCells: [
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: "name",
        "data-testid": "profile-name"
      }, profile && /* @__PURE__ */ React.createElement(Link, {
        key: profile,
        "data-testid": "profile-name-link",
        to: toClientProfile({
          realm,
          profileName: profile
        }),
        className: "kc-profile-link"
      }, profile), policyProfiles.filter((type) => type === profile).map((type) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(HelpItem, {
        helpText: clientProfiles.find((profile2) => type === profile2.name)?.description,
        fieldLabelId: profile
      }), /* @__PURE__ */ React.createElement(Button, {
        variant: "link",
        isInline: true,
        icon: /* @__PURE__ */ React.createElement(TrashIcon, {
          className: "kc-conditionType-trash-icon",
          "data-testid": "deleteClientProfileDropdown",
          onClick: () => {
            toggleDeleteProfileDialog();
            setProfileToDelete({
              idx,
              name: type
            });
          }
        })
      }))))
    ]
  }))))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Text, {
    className: "kc-emptyClientProfiles",
    component: TextVariants.h6
  }, t("realm-settings:emptyProfiles")))))));
}
