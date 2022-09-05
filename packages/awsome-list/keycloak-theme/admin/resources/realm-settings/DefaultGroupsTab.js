import React, {useState} from "../_snowpack/pkg/react.js";
import {Link} from "../_snowpack/pkg/react-router-dom.js";
import {Trans, useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownItem,
  KebabToggle,
  Popover,
  Text,
  TextContent,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {QuestionCircleIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import useToggle from "../utils/useToggle.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {toUserFederation} from "../user-federation/routes/UserFederation.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {GroupPickerDialog} from "../components/group/GroupPickerDialog.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
import {useHelp} from "../components/help-enabler/HelpHeader.js";
export const DefaultsGroupsTab = () => {
  const {t} = useTranslation("realm-settings");
  const [isKebabOpen, toggleKebab] = useToggle();
  const [isGroupPickerOpen, toggleGroupPicker] = useToggle();
  const [defaultGroups, setDefaultGroups] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [key, setKey] = useState(0);
  const [load, setLoad] = useState(0);
  const reload = () => setLoad(load + 1);
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {addAlert, addError} = useAlerts();
  const {enabled} = useHelp();
  useFetch(() => adminClient.realms.getDefaultGroups({realm}), (groups) => {
    setDefaultGroups(groups);
    setKey(key + 1);
  }, [load]);
  const loader = () => Promise.resolve(defaultGroups);
  const removeGroup = async () => {
    try {
      await Promise.all(selectedRows.map((group) => adminClient.realms.removeDefaultGroup({
        realm,
        id: group.id
      })));
      addAlert(t("groupRemove", {count: selectedRows.length}), AlertVariant.success);
      setSelectedRows([]);
    } catch (error) {
      addError("realm-settings:groupRemoveError", error);
    }
    reload();
  };
  const addGroups = async (groups) => {
    try {
      await Promise.all(groups.map((group) => adminClient.realms.addDefaultGroup({
        realm,
        id: group.id
      })));
      addAlert(t("defaultGroupAdded", {count: groups.length}), AlertVariant.success);
    } catch (error) {
      addError("realm-settings:defaultGroupAddedError", error);
    }
    reload();
  };
  const [toggleRemoveDialog, RemoveDialog] = useConfirmDialog({
    titleKey: t("removeConfirmTitle", {count: selectedRows.length}),
    messageKey: t("removeConfirm", {count: selectedRows.length}),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: removeGroup
  });
  if (!defaultGroups) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(RemoveDialog, null), isGroupPickerOpen && /* @__PURE__ */ React.createElement(GroupPickerDialog, {
    type: "selectMany",
    text: {
      title: "realm-settings:addDefaultGroups",
      ok: "common:add"
    },
    onConfirm: (groups) => {
      addGroups(groups || []);
      toggleGroupPicker();
    },
    onClose: toggleGroupPicker
  }), enabled && /* @__PURE__ */ React.createElement(Popover, {
    bodyContent: /* @__PURE__ */ React.createElement(Trans, {
      i18nKey: "realm-settings-help:defaultGroups"
    }, " ", /* @__PURE__ */ React.createElement(Link, {
      to: toUserFederation({realm})
    }), ".")
  }, /* @__PURE__ */ React.createElement(TextContent, {
    className: "keycloak__section_intro__help",
    style: {
      paddingLeft: "var(--pf-c-page__main-section--PaddingLeft)"
    }
  }, /* @__PURE__ */ React.createElement(Text, null, /* @__PURE__ */ React.createElement(QuestionCircleIcon, null), " ", t("whatIsDefaultGroups")))), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    canSelectAll: true,
    onSelect: (rows) => setSelectedRows([...rows]),
    loader,
    ariaLabelKey: "realm-settings:defaultGroups",
    searchPlaceholderKey: "realm-settings:searchForGroups",
    toolbarItem: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "openCreateGroupModal",
      variant: "primary",
      onClick: toggleGroupPicker
    }, t("addGroups"))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Dropdown, {
      toggle: /* @__PURE__ */ React.createElement(KebabToggle, {
        onToggle: toggleKebab,
        isDisabled: selectedRows.length === 0
      }),
      isOpen: isKebabOpen,
      isPlain: true,
      dropdownItems: [
        /* @__PURE__ */ React.createElement(DropdownItem, {
          key: "action",
          component: "button",
          onClick: () => {
            toggleRemoveDialog();
            toggleKebab();
          }
        }, t("common:remove"))
      ]
    }))),
    actions: [
      {
        title: t("common:remove"),
        onRowClick: (group) => {
          setSelectedRows([group]);
          toggleRemoveDialog();
          return Promise.resolve(false);
        }
      }
    ],
    columns: [
      {
        name: "name",
        displayKey: "groups:groupName"
      },
      {
        name: "path",
        displayKey: "groups:path"
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      hasIcon: true,
      message: t("noDefaultGroups"),
      instructions: /* @__PURE__ */ React.createElement(Trans, {
        i18nKey: "realm-settings:noDefaultGroupsInstructions"
      }, " ", /* @__PURE__ */ React.createElement(Link, {
        to: toUserFederation({realm})
      }), "Add groups..."),
      primaryActionText: t("addGroups"),
      onPrimaryAction: toggleGroupPicker
    })
  }));
};
