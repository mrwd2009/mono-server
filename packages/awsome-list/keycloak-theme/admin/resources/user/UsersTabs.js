import React, {useState} from "../_snowpack/pkg/react.js";
import {
  AlertVariant,
  ButtonVariant,
  DropdownItem,
  PageSection,
  Tab,
  TabTitleText
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {FormProvider, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {UserForm} from "./UserForm.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useHistory, useParams} from "../_snowpack/pkg/react-router-dom.js";
import {KeycloakTabs} from "../components/keycloak-tabs/KeycloakTabs.js";
import {UserGroups} from "./UserGroups.js";
import {UserConsents} from "./UserConsents.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {UserIdentityProviderLinks} from "./UserIdentityProviderLinks.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {toUser} from "./routes/User.js";
import {toUsers} from "./routes/Users.js";
import {UserRoleMapping} from "./UserRoleMapping.js";
import {UserAttributes} from "./UserAttributes.js";
import {UserCredentials} from "./UserCredentials.js";
import {UserSessions} from "./UserSessions.js";
import {useAccess} from "../context/access/Access.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
const UsersTabs = () => {
  const {t} = useTranslation("users");
  const {addAlert, addError} = useAlerts();
  const history = useHistory();
  const {realm} = useRealm();
  const {hasAccess} = useAccess();
  const {adminClient} = useAdminClient();
  const userForm = useForm({mode: "onChange"});
  const {id} = useParams();
  const [user, setUser] = useState();
  const [bruteForced, setBruteForced] = useState();
  const [addedGroups, setAddedGroups] = useState([]);
  useFetch(async () => {
    if (id) {
      const user2 = await adminClient.users.findOne({id});
      if (!user2) {
        throw new Error(t("common:notFound"));
      }
      const isBruteForceProtected = (await adminClient.realms.findOne({
        realm
      })).bruteForceProtected;
      const bruteForce = await adminClient.attackDetection.findOne({
        id: user2.id
      });
      const isLocked = isBruteForceProtected && bruteForce && bruteForce.disabled;
      return {user: user2, bruteForced: {isBruteForceProtected, isLocked}};
    }
    return {user: void 0};
  }, ({user: user2, bruteForced: bruteForced2}) => {
    setUser(user2);
    setBruteForced(bruteForced2);
    user2 && setupForm(user2);
  }, [user?.username]);
  const setupForm = (user2) => {
    userForm.reset(user2);
  };
  const updateGroups = (groups) => {
    setAddedGroups(groups);
  };
  const save = async (user2) => {
    user2.username = user2.username?.trim();
    try {
      if (id) {
        await adminClient.users.update({id}, user2);
        addAlert(t("userSaved"), AlertVariant.success);
      } else {
        const createdUser = await adminClient.users.create(user2);
        addedGroups.forEach(async (group) => {
          await adminClient.users.addToGroup({
            id: createdUser.id,
            groupId: group.id
          });
        });
        addAlert(t("userCreated"), AlertVariant.success);
        history.push(toUser({id: createdUser.id, realm, tab: "settings"}));
      }
    } catch (error) {
      addError("users:userCreateError", error);
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "users:deleteConfirm",
    messageKey: "users:deleteConfirmCurrentUser",
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.users.del({id});
        addAlert(t("userDeletedSuccess"), AlertVariant.success);
        history.push(toUsers({realm}));
      } catch (error) {
        addError("users:userDeletedError", error);
      }
    }
  });
  const [toggleImpersonateDialog, ImpersonateConfirm] = useConfirmDialog({
    titleKey: "users:impersonateConfirm",
    messageKey: "users:impersonateConfirmDialog",
    continueButtonLabel: "users:impersonate",
    onConfirm: async () => {
      try {
        const data = await adminClient.users.impersonation({id}, {user: id, realm});
        if (data.sameRealm) {
          window.location = data.redirect;
        } else {
          window.open(data.redirect, "_blank");
        }
      } catch (error) {
        addError("users:impersonateError", error);
      }
    }
  });
  if (id && !user) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ImpersonateConfirm, null), /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: user?.id ? user.username : t("createUser"),
    divider: !id,
    dropdownItems: [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "impersonate",
        isDisabled: !user?.access?.impersonate,
        onClick: () => toggleImpersonateDialog()
      }, t("impersonate")),
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "delete",
        isDisabled: !user?.access?.manage,
        onClick: () => toggleDeleteDialog()
      }, t("common:delete"))
    ]
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...userForm
  }, id && user && /* @__PURE__ */ React.createElement(KeycloakTabs, {
    isBox: true,
    mountOnEnter: true
  }, /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "settings",
    "data-testid": "user-details-tab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:details"))
  }, /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, bruteForced && /* @__PURE__ */ React.createElement(UserForm, {
    onGroupsUpdate: updateGroups,
    save,
    user,
    bruteForce: bruteForced
  }))), /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "attributes",
    "data-testid": "attributes",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:attributes"))
  }, /* @__PURE__ */ React.createElement(UserAttributes, {
    user
  })), /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "credentials",
    "data-testid": "credentials",
    isHidden: !user.access?.manage,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:credentials"))
  }, /* @__PURE__ */ React.createElement(UserCredentials, {
    user
  })), /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "role-mapping",
    "data-testid": "role-mapping-tab",
    isHidden: !user.access?.mapRoles,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("roleMapping"))
  }, /* @__PURE__ */ React.createElement(UserRoleMapping, {
    id,
    name: user.username
  })), /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "groups",
    "data-testid": "user-groups-tab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:groups"))
  }, /* @__PURE__ */ React.createElement(UserGroups, {
    user
  })), /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "consents",
    "data-testid": "user-consents-tab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("consents"))
  }, /* @__PURE__ */ React.createElement(UserConsents, null)), hasAccess("view-identity-providers") && /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "identity-provider-links",
    "data-testid": "identity-provider-links-tab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("identityProviderLinks"))
  }, /* @__PURE__ */ React.createElement(UserIdentityProviderLinks, null)), /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "sessions",
    "data-testid": "user-sessions-tab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("sessions"))
  }, /* @__PURE__ */ React.createElement(UserSessions, null))), !id && /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(UserForm, {
    onGroupsUpdate: updateGroups,
    save
  })))));
};
export default UsersTabs;
