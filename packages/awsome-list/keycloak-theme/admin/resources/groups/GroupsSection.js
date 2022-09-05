import React, {useState} from "../_snowpack/pkg/react.js";
import {Link, useHistory, useLocation} from "../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {
  DropdownItem,
  PageSection,
  PageSectionVariants,
  AlertVariant,
  Tab,
  TabTitleText,
  Tabs
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useFetch, useAdminClient} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useSubGroups} from "./SubGroupsContext.js";
import {GroupTable} from "./GroupTable.js";
import {getId, getLastId} from "./groupIdUtils.js";
import {Members} from "./Members.js";
import {GroupAttributes} from "./GroupAttributes.js";
import {GroupsModal} from "./GroupsModal.js";
import {toGroups} from "./routes/Groups.js";
import {toGroupsSearch} from "./routes/GroupsSearch.js";
import {GroupRoleMapping} from "./GroupRoleMapping.js";
import helpUrls from "../help-urls.js";
import {PermissionsTab} from "../components/permission-tab/PermissionTab.js";
import {useAccess} from "../context/access/Access.js";
import "./GroupsSection.css.proxy.js";
export default function GroupsSection() {
  const {t} = useTranslation("groups");
  const [activeTab, setActiveTab] = useState(0);
  const {adminClient} = useAdminClient();
  const {subGroups, setSubGroups, currentGroup} = useSubGroups();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const [rename, setRename] = useState();
  const history = useHistory();
  const location = useLocation();
  const id = getLastId(location.pathname);
  const {hasAccess} = useAccess();
  const canViewPermissions = hasAccess("manage-authorization", "manage-users", "manage-clients");
  const canManageGroup = hasAccess("manage-users") || currentGroup()?.access?.manage;
  const canManageRoles = hasAccess("manage-users");
  const deleteGroup = async (group) => {
    try {
      await adminClient.groups.del({
        id: group.id
      });
      addAlert(t("groupDeleted", {count: 1}), AlertVariant.success);
    } catch (error) {
      addError("groups:groupDeleteError", error);
    }
    return true;
  };
  useFetch(async () => {
    const ids = getId(location.pathname);
    const isNavigationStateInValid = ids && ids.length > subGroups.length;
    if (isNavigationStateInValid) {
      const groups = [];
      for (const i of ids) {
        const group = i !== "search" ? await adminClient.groups.findOne({id: i}) : {name: t("searchGroups"), id: "search"};
        if (group) {
          groups.push(group);
        } else {
          throw new Error(t("common:notFound"));
        }
      }
      return groups;
    }
    return [];
  }, (groups) => {
    if (groups.length)
      setSubGroups(groups);
  }, [id]);
  const SearchDropdown = /* @__PURE__ */ React.createElement(DropdownItem, {
    key: "searchGroup",
    component: /* @__PURE__ */ React.createElement(Link, {
      "data-testid": "searchGroup",
      to: toGroupsSearch({realm})
    }, t("searchGroup"))
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, rename && /* @__PURE__ */ React.createElement(GroupsModal, {
    id,
    rename,
    refresh: (group) => setSubGroups([...subGroups.slice(0, subGroups.length - 1), group]),
    handleModalToggle: () => setRename(void 0)
  }), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: !id ? "groups:groups" : currentGroup()?.name,
    subKey: !id ? "groups:groupsDescription" : "",
    helpUrl: !id ? helpUrls.groupsUrl : "",
    divider: !id,
    dropdownItems: id && canManageGroup ? [
      SearchDropdown,
      /* @__PURE__ */ React.createElement(DropdownItem, {
        "data-testid": "renameGroupAction",
        key: "renameGroup",
        onClick: () => setRename(currentGroup()?.name)
      }, t("renameGroup")),
      /* @__PURE__ */ React.createElement(DropdownItem, {
        "data-testid": "deleteGroup",
        key: "deleteGroup",
        onClick: async () => {
          await deleteGroup({id});
          history.push(toGroups({realm}));
        }
      }, t("deleteGroup"))
    ] : [SearchDropdown]
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: PageSectionVariants.light,
    className: "pf-u-p-0"
  }, subGroups.length > 0 && /* @__PURE__ */ React.createElement(Tabs, {
    inset: {
      default: "insetNone",
      md: "insetSm",
      xl: "insetLg",
      "2xl": "inset2xl"
    },
    activeKey: activeTab,
    onSelect: (_, key) => setActiveTab(key),
    isBox: true
  }, /* @__PURE__ */ React.createElement(Tab, {
    "data-testid": "groups",
    eventKey: 0,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("childGroups"))
  }, /* @__PURE__ */ React.createElement(GroupTable, null)), /* @__PURE__ */ React.createElement(Tab, {
    "data-testid": "members",
    eventKey: 1,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("members"))
  }, /* @__PURE__ */ React.createElement(Members, null)), /* @__PURE__ */ React.createElement(Tab, {
    "data-testid": "attributes",
    eventKey: 2,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:attributes"))
  }, /* @__PURE__ */ React.createElement(GroupAttributes, null)), canManageRoles && /* @__PURE__ */ React.createElement(Tab, {
    eventKey: 3,
    "data-testid": "role-mapping-tab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("roleMapping"))
  }, /* @__PURE__ */ React.createElement(GroupRoleMapping, {
    id,
    name: currentGroup()?.name
  })), canViewPermissions && /* @__PURE__ */ React.createElement(Tab, {
    eventKey: 4,
    "data-testid": "permissionsTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:permissions"))
  }, /* @__PURE__ */ React.createElement(PermissionsTab, {
    id,
    type: "groups"
  }))), subGroups.length === 0 && /* @__PURE__ */ React.createElement(GroupTable, null)));
}
