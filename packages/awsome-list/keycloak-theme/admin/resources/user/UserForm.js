import React, {useState} from "../_snowpack/pkg/react.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  Chip,
  ChipGroup,
  FormGroup,
  InputGroup,
  Select,
  SelectOption,
  Switch
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../_snowpack/pkg/react-hook-form.js";
import {useHistory} from "../_snowpack/pkg/react-router-dom.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
import {emailRegexPattern} from "../util.js";
import useFormatDate from "../utils/useFormatDate.js";
import {GroupPickerDialog} from "../components/group/GroupPickerDialog.js";
export const UserForm = ({
  user,
  bruteForce: {isBruteForceProtected, isLocked} = {
    isBruteForceProtected: false,
    isLocked: false
  },
  save,
  onGroupsUpdate
}) => {
  const {t} = useTranslation("users");
  const {realm: realmName} = useRealm();
  const formatDate = useFormatDate();
  const [
    isRequiredUserActionsDropdownOpen,
    setRequiredUserActionsDropdownOpen
  ] = useState(false);
  const history = useHistory();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {
    handleSubmit,
    register,
    watch,
    control,
    reset,
    formState: {errors}
  } = useFormContext();
  const watchUsernameInput = watch("username");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [locked, setLocked] = useState(isLocked);
  const [realm, setRealm] = useState();
  const [requiredActions, setRequiredActions] = useState([]);
  useFetch(() => Promise.all([
    adminClient.realms.findOne({realm: realmName}),
    adminClient.authenticationManagement.getRequiredActions()
  ]), ([realm2, actions]) => {
    if (!realm2) {
      throw new Error(t("common:notFound"));
    }
    setRealm(realm2);
    setRequiredActions(actions);
  }, []);
  const unLockUser = async () => {
    try {
      await adminClient.attackDetection.del({id: user.id});
      addAlert(t("unlockSuccess"), AlertVariant.success);
    } catch (error) {
      addError("users:unlockError", error);
    }
  };
  const clearSelection = () => {
    setRequiredUserActionsDropdownOpen(false);
  };
  const deleteItem = (id) => {
    setSelectedGroups(selectedGroups.filter((item) => item.name !== id));
    onGroupsUpdate(selectedGroups);
  };
  const addChips = async (groups) => {
    setSelectedGroups([...selectedGroups, ...groups]);
    onGroupsUpdate([...selectedGroups, ...groups]);
  };
  const addGroups = async (groups) => {
    const newGroups = groups;
    newGroups.forEach(async (group) => {
      try {
        await adminClient.users.addToGroup({
          id: user.id,
          groupId: group.id
        });
        addAlert(t("users:addedGroupMembership"), AlertVariant.success);
      } catch (error) {
        addError("users:addedGroupMembershipError", error);
      }
    });
  };
  const toggleModal = () => {
    setOpen(!open);
  };
  return /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    onSubmit: handleSubmit(save),
    role: "manage-users",
    fineGrainedAccess: user?.access?.manage,
    className: "pf-u-mt-lg"
  }, open && /* @__PURE__ */ React.createElement(GroupPickerDialog, {
    type: "selectMany",
    text: {
      title: "users:selectGroups",
      ok: "users:join"
    },
    onConfirm: (groups) => {
      user?.id ? addGroups(groups || []) : addChips(groups || []);
      setOpen(false);
    },
    onClose: () => setOpen(false),
    filterGroups: selectedGroups.map((group) => group.name)
  }), user?.id && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:id"),
    fieldId: "kc-id",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: user.id,
    "aria-label": t("userID"),
    value: user.id,
    type: "text",
    isReadOnly: true
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("createdAt"),
    fieldId: "kc-created-at",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    value: formatDate(new Date(user.createdTimestamp)),
    type: "text",
    id: "kc-created-at",
    "aria-label": t("createdAt"),
    name: "createdTimestamp",
    isReadOnly: true
  }))), !realm?.registrationEmailAsUsername && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("username"),
    fieldId: "kc-username",
    isRequired: true,
    validated: errors.username ? "error" : "default",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register(),
    type: "text",
    id: "kc-username",
    "aria-label": t("username"),
    name: "username",
    isReadOnly: !!user?.id && !realm?.editUsernameAllowed
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("email"),
    fieldId: "kc-description",
    validated: errors.email ? "error" : "default",
    helperTextInvalid: t("users:emailInvalid")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register({
      pattern: emailRegexPattern
    }),
    type: "email",
    id: "kc-email",
    name: "email",
    "data-testid": "email-input",
    "aria-label": t("emailInput")
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("emailVerified"),
    fieldId: "kc-email-verified",
    helperTextInvalid: t("common:required"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "users-help:emailVerified",
      fieldLabelId: "users:emailVerified"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "emailVerified",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      "data-testid": "email-verified-switch",
      id: "kc-user-email-verified",
      isDisabled: false,
      onChange: (value2) => onChange(value2),
      isChecked: value,
      label: t("common:on"),
      labelOff: t("common:off")
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("firstName"),
    fieldId: "kc-firstname",
    validated: errors.firstName ? "error" : "default",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register(),
    "data-testid": "firstName-input",
    type: "text",
    id: "kc-firstname",
    "aria-label": t("firstName"),
    name: "firstName"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("lastName"),
    fieldId: "kc-name",
    validated: errors.lastName ? "error" : "default"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register(),
    "data-testid": "lastName-input",
    type: "text",
    id: "kc-lastname",
    name: "lastName",
    "aria-label": t("lastName")
  })), isBruteForceProtected && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("temporaryLocked"),
    fieldId: "temporaryLocked",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "users-help:temporaryLocked",
      fieldLabelId: "users:temporaryLocked"
    })
  }, /* @__PURE__ */ React.createElement(Switch, {
    "data-testid": "user-locked-switch",
    id: "temporaryLocked",
    onChange: (value) => {
      unLockUser();
      setLocked(value);
    },
    isChecked: locked,
    isDisabled: !locked,
    label: t("common:on"),
    labelOff: t("common:off")
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:enabled"),
    fieldId: "kc-enabled",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "users-help:disabled",
      fieldLabelId: "enabled"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "enabled",
    defaultValue: true,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      "data-testid": "user-enabled-switch",
      id: "kc-user-enabled",
      onChange: (value2) => onChange(value2),
      isChecked: value,
      label: t("common:on"),
      labelOff: t("common:off")
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("requiredUserActions"),
    fieldId: "kc-required-user-actions",
    validated: errors.requiredActions ? "error" : "default",
    helperTextInvalid: t("common:required"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "users-help:requiredUserActions",
      fieldLabelId: "users:requiredUserActions"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "requiredActions",
    defaultValue: [],
    typeAheadAriaLabel: "Select an action",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      "data-testid": "required-actions-select",
      placeholderText: "Select action",
      toggleId: "kc-required-user-actions",
      onToggle: () => setRequiredUserActionsDropdownOpen(!isRequiredUserActionsDropdownOpen),
      isOpen: isRequiredUserActionsDropdownOpen,
      selections: value,
      onSelect: (_, v) => {
        const option = v;
        if (value.includes(option)) {
          onChange(value.filter((item) => item !== option));
        } else {
          onChange([...value, option]);
        }
      },
      onClear: clearSelection,
      variant: "typeaheadmulti"
    }, requiredActions.map(({alias, name}) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: alias,
      value: alias
    }, name)))
  })), !user?.id && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:groups"),
    fieldId: "kc-groups",
    validated: errors.requiredActions ? "error" : "default",
    helperTextInvalid: t("common:required"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "users-help:groups",
      fieldLabelId: "groups"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "groups",
    defaultValue: [],
    typeAheadAriaLabel: "Select an action",
    control,
    render: () => /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(ChipGroup, {
      categoryName: " "
    }, selectedGroups.map((currentChip) => /* @__PURE__ */ React.createElement(Chip, {
      key: currentChip.id,
      onClick: () => deleteItem(currentChip.name)
    }, currentChip.path))), /* @__PURE__ */ React.createElement(Button, {
      id: "kc-join-groups-button",
      onClick: toggleModal,
      variant: "secondary",
      "data-testid": "join-groups-button"
    }, t("users:joinGroups")))
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": !user?.id ? "create-user" : "save-user",
    isDisabled: !user?.id && !watchUsernameInput && !realm?.registrationEmailAsUsername,
    variant: "primary",
    type: "submit"
  }, user?.id ? t("common:save") : t("common:create")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "cancel-create-user",
    onClick: () => user?.id ? reset(user) : history.push(`/${realmName}/users`),
    variant: "link"
  }, user?.id ? t("common:revert") : t("common:cancel"))));
};
