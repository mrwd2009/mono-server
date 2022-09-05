import {
  AlertVariant,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownItem,
  EmptyState,
  InputGroup,
  KebabToggle,
  Label,
  PageSection,
  Tab,
  TabTitleText,
  Text,
  TextContent,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Tooltip
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {
  ExclamationCircleIcon,
  InfoCircleIcon,
  SearchIcon,
  WarningTriangleIcon
} from "../_snowpack/pkg/@patternfly/react-icons.js";
import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Link, useHistory} from "../_snowpack/pkg/react-router-dom.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {emptyFormatter} from "../util.js";
import {toUser} from "./routes/User.js";
import {toAddUser} from "./routes/AddUser.js";
import helpUrls from "../help-urls.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
import {PermissionsTab} from "../components/permission-tab/PermissionTab.js";
import {toUsers} from "./routes/Users.js";
import {
  routableTab,
  RoutableTabs
} from "../components/routable-tabs/RoutableTabs.js";
import {useAccess} from "../context/access/Access.js";
import "./user-section.css.proxy.js";
export default function UsersSection() {
  const {t} = useTranslation("users");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm: realmName} = useRealm();
  const history = useHistory();
  const [userStorage, setUserStorage] = useState();
  const [searchUser, setSearchUser] = useState();
  const [realm, setRealm] = useState();
  const [kebabOpen, setKebabOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const {hasAccess} = useAccess();
  const isManager = hasAccess("manage-users");
  useFetch(async () => {
    const testParams = {
      type: "org.keycloak.storage.UserStorageProvider"
    };
    try {
      return await Promise.all([
        adminClient.components.find(testParams),
        adminClient.realms.findOne({realm: realmName})
      ]);
    } catch {
      return [[{}], void 0];
    }
  }, ([storageProviders, realm2]) => {
    setUserStorage(storageProviders);
    setRealm(realm2);
  }, []);
  const UserDetailLink = (user) => /* @__PURE__ */ React.createElement(Link, {
    key: user.username,
    to: toUser({realm: realmName, id: user.id, tab: "settings"})
  }, user.username);
  const loader = async (first, max, search) => {
    const params = {
      first,
      max
    };
    const searchParam = search || searchUser || "";
    if (searchParam) {
      params.search = searchParam;
    }
    if (!listUsers && !searchParam) {
      return [];
    }
    try {
      const users = await adminClient.users.find({
        briefRepresentation: true,
        ...params
      });
      if (realm?.bruteForceProtected) {
        const brutes = await Promise.all(users.map((user) => adminClient.attackDetection.findOne({
          id: user.id
        })));
        for (let index = 0; index < users.length; index++) {
          const user = users[index];
          user.brute = brutes[index];
        }
      }
      return users;
    } catch (error) {
      if (userStorage?.length) {
        addError("users:noUsersFoundErrorStorage", error);
      } else {
        addError("users:noUsersFoundError", error);
      }
      return [];
    }
  };
  const [toggleUnlockUsersDialog, UnlockUsersConfirm] = useConfirmDialog({
    titleKey: "users:unlockAllUsers",
    messageKey: "users:unlockUsersConfirm",
    continueButtonLabel: "users:unlock",
    onConfirm: async () => {
      try {
        await adminClient.attackDetection.delAll();
        refresh();
        addAlert(t("unlockUsersSuccess"), AlertVariant.success);
      } catch (error) {
        addError("users:unlockUsersError", error);
      }
    }
  });
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "users:deleteConfirm",
    messageKey: t("deleteConfirmDialog", {count: selectedRows.length}),
    continueButtonLabel: "delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        for (const user of selectedRows) {
          await adminClient.users.del({id: user.id});
        }
        setSelectedRows([]);
        refresh();
        addAlert(t("userDeletedSuccess"), AlertVariant.success);
      } catch (error) {
        addError("users:userDeletedError", error);
      }
    }
  });
  const StatusRow = (user) => {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, !user.enabled && /* @__PURE__ */ React.createElement(Label, {
      key: user.id,
      color: "red",
      icon: /* @__PURE__ */ React.createElement(InfoCircleIcon, null)
    }, t("disabled")), user.brute?.disabled && /* @__PURE__ */ React.createElement(Label, {
      key: user.id,
      color: "orange",
      icon: /* @__PURE__ */ React.createElement(WarningTriangleIcon, null)
    }, t("temporaryDisabled")), user.enabled && !user.brute?.disabled && "—");
  };
  const ValidatedEmail = (user) => {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, !user.emailVerified && /* @__PURE__ */ React.createElement(Tooltip, {
      key: `email-verified-${user.id}`,
      content: /* @__PURE__ */ React.createElement(React.Fragment, null, t("notVerified"))
    }, /* @__PURE__ */ React.createElement(ExclamationCircleIcon, {
      className: "keycloak__user-section__email-verified"
    })), " ", emptyFormatter()(user.email));
  };
  const goToCreate = () => history.push(toAddUser({realm: realmName}));
  if (!userStorage) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const listUsers = !(userStorage.length > 0);
  const toolbar = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "add-user",
    onClick: goToCreate
  }, t("addUser"))), !realm?.bruteForceProtected ? /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.plain,
    onClick: toggleDeleteDialog,
    "data-testid": "delete-user-btn",
    isDisabled: selectedRows.length === 0
  }, t("deleteUser"))) : /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Dropdown, {
    toggle: /* @__PURE__ */ React.createElement(KebabToggle, {
      onToggle: (open) => setKebabOpen(open)
    }),
    isOpen: kebabOpen,
    isPlain: true,
    dropdownItems: [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "deleteUser",
        component: "button",
        isDisabled: selectedRows.length === 0,
        onClick: () => {
          toggleDeleteDialog();
          setKebabOpen(false);
        }
      }, t("deleteUser")),
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "unlock",
        component: "button",
        onClick: () => {
          toggleUnlockUsersDialog();
          setKebabOpen(false);
        }
      }, t("unlockAllUsers"))
    ]
  })));
  const route = (tab) => routableTab({
    to: toUsers({
      realm: realmName,
      tab
    }),
    history
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(UnlockUsersConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "users:title",
    subKey: "users:usersExplain",
    helpUrl: helpUrls.usersUrl,
    divider: false
  }), /* @__PURE__ */ React.createElement(PageSection, {
    "data-testid": "users-page",
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(RoutableTabs, {
    "data-testid": "user-tabs",
    defaultLocation: toUsers({
      realm: realmName,
      tab: "list"
    }),
    isBox: true,
    mountOnEnter: true
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "list",
    "data-testid": "listTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("userList")),
    ...route("list")
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader,
    isPaginated: true,
    ariaLabelKey: "users:title",
    searchPlaceholderKey: "users:searchForUser",
    canSelectAll: true,
    onSelect: (rows) => setSelectedRows([...rows]),
    emptyState: !listUsers ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(ToolbarContent, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(TextInput, {
      name: "search-input",
      type: "search",
      "aria-label": t("search"),
      placeholder: t("users:searchForUser"),
      onChange: (value) => {
        setSearchUser(value);
      },
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          refresh();
        }
      }
    }), /* @__PURE__ */ React.createElement(Button, {
      variant: ButtonVariant.control,
      "aria-label": t("common:search"),
      onClick: refresh
    }, /* @__PURE__ */ React.createElement(SearchIcon, null)))), toolbar)), /* @__PURE__ */ React.createElement(EmptyState, {
      "data-testid": "empty-state",
      variant: "large"
    }, /* @__PURE__ */ React.createElement(TextContent, {
      className: "kc-search-users-text"
    }, /* @__PURE__ */ React.createElement(Text, null, t("searchForUserDescription"))))) : /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("noUsersFound"),
      instructions: t("emptyInstructions"),
      primaryActionText: t("createNewUser"),
      onPrimaryAction: goToCreate
    }),
    toolbarItem: isManager ? toolbar : void 0,
    actionResolver: (rowData) => {
      const user = rowData.data;
      if (!user.access?.manage)
        return [];
      return [
        {
          title: t("common:delete"),
          onClick: () => {
            setSelectedRows([user]);
            toggleDeleteDialog();
          }
        }
      ];
    },
    columns: [
      {
        name: "username",
        displayKey: "users:username",
        cellRenderer: UserDetailLink
      },
      {
        name: "email",
        displayKey: "users:email",
        cellRenderer: ValidatedEmail
      },
      {
        name: "lastName",
        displayKey: "users:lastName",
        cellFormatters: [emptyFormatter()]
      },
      {
        name: "firstName",
        displayKey: "users:firstName",
        cellFormatters: [emptyFormatter()]
      },
      {
        name: "status",
        displayKey: "users:status",
        cellRenderer: StatusRow
      }
    ]
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "permissions",
    "data-testid": "permissionsTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:permissions")),
    ...route("permissions")
  }, /* @__PURE__ */ React.createElement(PermissionsTab, {
    type: "users"
  })))));
}
