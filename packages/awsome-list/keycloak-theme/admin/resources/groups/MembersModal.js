import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  Button,
  Modal,
  ModalVariant
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {emptyFormatter} from "../util.js";
import {differenceBy} from "../_snowpack/pkg/lodash-es.js";
export const MemberModal = ({groupId, onClose}) => {
  const {t} = useTranslation("groups");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [selectedRows, setSelectedRows] = useState([]);
  const loader = async (first, max, search) => {
    const members = await adminClient.groups.listMembers({id: groupId});
    const params = {
      first,
      max: max + members.length,
      search: search || ""
    };
    try {
      const users = await adminClient.users.find({...params});
      return differenceBy(users, members, "id").slice(0, max);
    } catch (error) {
      addError("groups:noUsersFoundError", error);
      return [];
    }
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.large,
    title: t("addMember"),
    isOpen: true,
    onClose,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "add",
        key: "confirm",
        variant: "primary",
        onClick: async () => {
          try {
            await Promise.all(selectedRows.map((user) => adminClient.users.addToGroup({id: user.id, groupId})));
            onClose();
            addAlert(t("usersAdded", {count: selectedRows.length}), AlertVariant.success);
          } catch (error) {
            addError("groups:usersAddedError", error);
          }
        }
      }, t("common:add")),
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "cancel",
        key: "cancel",
        variant: "link",
        onClick: onClose
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    loader,
    isPaginated: true,
    ariaLabelKey: "users:title",
    searchPlaceholderKey: "users:searchForUser",
    canSelectAll: true,
    onSelect: (rows) => setSelectedRows([...rows]),
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("users:noUsersFound"),
      instructions: t("users:emptyInstructions")
    }),
    columns: [
      {
        name: "username",
        displayKey: "users:username"
      },
      {
        name: "email",
        displayKey: "users:email"
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
      }
    ]
  }));
};
