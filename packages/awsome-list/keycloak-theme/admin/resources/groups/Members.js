import React, {useState} from "../_snowpack/pkg/react.js";
import {Link, useLocation} from "../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {uniqBy} from "../_snowpack/pkg/lodash-es.js";
import {
  AlertVariant,
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  KebabToggle,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {emptyFormatter} from "../util.js";
import {getLastId} from "./groupIdUtils.js";
import {useSubGroups} from "./SubGroupsContext.js";
import {MemberModal} from "./MembersModal.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {GroupPath} from "../components/group/GroupPath.js";
import {toUser} from "../user/routes/User.js";
import {useAccess} from "../context/access/Access.js";
export const Members = () => {
  const {t} = useTranslation("groups");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {addAlert, addError} = useAlerts();
  const location = useLocation();
  const id = getLastId(location.pathname);
  const [includeSubGroup, setIncludeSubGroup] = useState(false);
  const {currentGroup} = useSubGroups();
  const [addMembers, setAddMembers] = useState(false);
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const {hasAccess} = useAccess();
  const isManager = hasAccess("manage-users") || currentGroup().access.manageMembership;
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  const getMembership = async (id2) => await adminClient.users.listGroups({id: id2});
  const getSubGroups = (groups) => {
    let subGroups = [];
    for (const group of groups) {
      subGroups.push(group);
      const subs = getSubGroups(group.subGroups);
      subGroups = subGroups.concat(subs);
    }
    return subGroups;
  };
  const loader = async (first, max) => {
    let members = await adminClient.groups.listMembers({
      id,
      first,
      max
    });
    if (includeSubGroup) {
      const subGroups = getSubGroups(currentGroup()?.subGroups);
      for (const group of subGroups) {
        members = members.concat(await adminClient.groups.listMembers({id: group.id}));
      }
      members = uniqBy(members, (member) => member.username);
    }
    const memberOfPromises = await Promise.all(members.map((member) => getMembership(member.id)));
    return members.map((member, i) => {
      return {...member, membership: memberOfPromises[i]};
    });
  };
  const MemberOfRenderer = (member) => {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, member.membership.map((group, index) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(GroupPath, {
      key: group.id,
      group
    }), member.membership[index + 1] ? ", " : "")));
  };
  const UserDetailLink = (user) => /* @__PURE__ */ React.createElement(Link, {
    key: user.id,
    to: toUser({realm, id: user.id, tab: "settings"})
  }, user.username);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, addMembers && /* @__PURE__ */ React.createElement(MemberModal, {
    groupId: id,
    onClose: () => {
      setAddMembers(false);
      refresh();
    }
  }), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    "data-testid": "members-table",
    key: `${id}${key}${includeSubGroup}`,
    loader,
    ariaLabelKey: "groups:members",
    isPaginated: true,
    canSelectAll: true,
    onSelect: (rows) => setSelectedRows([...rows]),
    toolbarItem: isManager && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "addMember",
      variant: "primary",
      onClick: () => setAddMembers(true)
    }, t("addMember"))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Checkbox, {
      "data-testid": "includeSubGroupsCheck",
      label: t("includeSubGroups"),
      id: "kc-include-sub-groups",
      isChecked: includeSubGroup,
      onChange: () => setIncludeSubGroup(!includeSubGroup)
    })), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Dropdown, {
      toggle: /* @__PURE__ */ React.createElement(KebabToggle, {
        onToggle: () => setIsKebabOpen(!isKebabOpen),
        isDisabled: selectedRows.length === 0
      }),
      isOpen: isKebabOpen,
      isPlain: true,
      dropdownItems: [
        /* @__PURE__ */ React.createElement(DropdownItem, {
          key: "action",
          component: "button",
          onClick: async () => {
            try {
              await Promise.all(selectedRows.map((user) => adminClient.users.delFromGroup({
                id: user.id,
                groupId: id
              })));
              setIsKebabOpen(false);
              addAlert(t("usersLeft", {count: selectedRows.length}), AlertVariant.success);
            } catch (error) {
              addError("groups:usersLeftError", error);
            }
            refresh();
          }
        }, t("leave"))
      ]
    }))),
    actions: isManager ? [
      {
        title: t("leave"),
        onRowClick: async (user) => {
          try {
            await adminClient.users.delFromGroup({
              id: user.id,
              groupId: id
            });
            addAlert(t("usersLeft", {count: 1}), AlertVariant.success);
          } catch (error) {
            addError("groups:usersLeftError", error);
          }
          return true;
        }
      }
    ] : [],
    columns: [
      {
        name: "username",
        displayKey: "common:name",
        cellRenderer: UserDetailLink
      },
      {
        name: "email",
        displayKey: "groups:email",
        cellFormatters: [emptyFormatter()]
      },
      {
        name: "firstName",
        displayKey: "groups:firstName",
        cellFormatters: [emptyFormatter()]
      },
      {
        name: "lastName",
        displayKey: "groups:lastName",
        cellFormatters: [emptyFormatter()]
      },
      {
        name: "membership",
        displayKey: "groups:membership",
        cellRenderer: MemberOfRenderer
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("users:noUsersFound"),
      instructions: isManager ? t("users:emptyInstructions") : void 0,
      primaryActionText: isManager ? t("addMember") : void 0,
      onPrimaryAction: () => setAddMembers(true)
    })
  }));
};
