import React, {Fragment, useMemo, useRef, useState} from "../_snowpack/pkg/react.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Divider
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "../_snowpack/pkg/@patternfly/react-table.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {ResetPasswordDialog} from "./user-credentials/ResetPasswordDialog.js";
import {ResetCredentialDialog} from "./user-credentials/ResetCredentialDialog.js";
import {InlineLabelEdit} from "./user-credentials/InlineLabelEdit.js";
import styles from "../_snowpack/pkg/@patternfly/react-styles/css/components/Table/table.js";
import {CredentialRow} from "./user-credentials/CredentialRow.js";
import {toUpperCase} from "../util.js";
import "./user-credentials.css.proxy.js";
export const UserCredentials = ({user}) => {
  const {t} = useTranslation("users");
  const {addAlert, addError} = useAlerts();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const [isOpen, setIsOpen] = useState(false);
  const [openCredentialReset, setOpenCredentialReset] = useState(false);
  const {adminClient} = useAdminClient();
  const [userCredentials, setUserCredentials] = useState([]);
  const [groupedUserCredentials, setGroupedUserCredentials] = useState([]);
  const [selectedCredential, setSelectedCredential] = useState({});
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isUserLabelEdit, setIsUserLabelEdit] = useState();
  const bodyRef = useRef(null);
  const [state, setState] = useState({
    draggedItemId: "",
    draggingToItemIndex: -1,
    dragging: false,
    tempItemOrder: [""]
  });
  useFetch(() => adminClient.users.getCredentials({id: user.id}), (credentials) => {
    setUserCredentials(credentials);
    const groupedCredentials = credentials.reduce((r, a) => {
      r[a.type] = r[a.type] || [];
      r[a.type].push(a);
      return r;
    }, Object.create(null));
    const groupedCredentialsArray = Object.keys(groupedCredentials).map((key2) => ({key: key2, value: groupedCredentials[key2]}));
    setGroupedUserCredentials(groupedCredentialsArray.map((groupedCredential) => ({
      ...groupedCredential,
      isExpanded: false
    })));
  }, [key]);
  const passwordTypeFinder = userCredentials.find((credential) => credential.type === "password");
  const toggleModal = () => setIsOpen(!isOpen);
  const toggleCredentialsResetModal = () => {
    setOpenCredentialReset(!openCredentialReset);
  };
  const resetPassword = () => {
    setIsResetPassword(true);
    toggleModal();
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("deleteCredentialsConfirmTitle"),
    messageKey: t("deleteCredentialsConfirm"),
    continueButtonLabel: t("common:delete"),
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.users.deleteCredential({
          id: user.id,
          credentialId: selectedCredential.id
        });
        addAlert(t("deleteCredentialsSuccess"), AlertVariant.success);
        setKey((key2) => key2 + 1);
      } catch (error) {
        addError("users:deleteCredentialsError", error);
      }
    }
  });
  const Row = ({credential}) => /* @__PURE__ */ React.createElement(CredentialRow, {
    key: credential.id,
    credential,
    toggleDelete: () => {
      setSelectedCredential(credential);
      toggleDeleteDialog();
    },
    resetPassword
  }, /* @__PURE__ */ React.createElement(InlineLabelEdit, {
    credential,
    userId: user.id,
    isEditable: isUserLabelEdit?.status && isUserLabelEdit.rowKey === credential.id || false,
    toggle: () => {
      setIsUserLabelEdit({
        status: !isUserLabelEdit?.status,
        rowKey: credential.id
      });
      if (isUserLabelEdit?.status) {
        refresh();
      }
    }
  }));
  const itemOrder = useMemo(() => groupedUserCredentials.flatMap((groupedCredential) => [
    groupedCredential.value.map(({id}) => id).toString(),
    ...groupedCredential.isExpanded ? groupedCredential.value.map((c) => c.id) : []
  ]), [groupedUserCredentials]);
  const onDragStart = (evt) => {
    evt.dataTransfer.effectAllowed = "move";
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    const draggedItemId = evt.currentTarget.id;
    evt.currentTarget.classList.add(styles.modifiers.ghostRow);
    evt.currentTarget.setAttribute("aria-pressed", "true");
    setState({...state, draggedItemId, dragging: true});
  };
  const moveItem = (items, targetItem, toIndex) => {
    const fromIndex = items.indexOf(targetItem);
    if (fromIndex === toIndex) {
      return items;
    }
    const result = [...items];
    result.splice(toIndex, 0, result.splice(fromIndex, 1)[0]);
    return result;
  };
  const move = (itemOrder2) => {
    if (!bodyRef.current)
      return;
    const ulNode = bodyRef.current;
    const nodes = Array.from(ulNode.children);
    if (nodes.every(({id}, i) => id === itemOrder2[i])) {
      return;
    }
    ulNode.replaceChildren();
    itemOrder2.forEach((itemId) => {
      ulNode.appendChild(nodes.find(({id}) => id === itemId));
    });
  };
  const onDragCancel = () => {
    if (!bodyRef.current)
      return;
    Array.from(bodyRef.current.children).forEach((el) => {
      el.classList.remove(styles.modifiers.ghostRow);
      el.setAttribute("aria-pressed", "false");
    });
    setState({
      ...state,
      draggedItemId: "",
      draggingToItemIndex: -1,
      dragging: false
    });
  };
  const onDragLeave = (evt) => {
    if (!isValidDrop(evt)) {
      move(itemOrder);
      setState({...state, draggingToItemIndex: -1});
    }
  };
  const isValidDrop = (evt) => {
    if (!bodyRef.current)
      return false;
    const ulRect = bodyRef.current.getBoundingClientRect();
    return evt.clientX > ulRect.x && evt.clientX < ulRect.x + ulRect.width && evt.clientY > ulRect.y && evt.clientY < ulRect.y + ulRect.height;
  };
  const onDrop = (evt) => {
    if (isValidDrop(evt)) {
      onDragFinish(state.draggedItemId, state.tempItemOrder);
    } else {
      onDragCancel();
    }
  };
  const onDragOver = (evt) => {
    evt.preventDefault();
    const td = evt.target;
    const curListItem = td.closest("tr");
    if (!curListItem || bodyRef.current && !bodyRef.current.contains(curListItem) || curListItem.id === state.draggedItemId) {
      return;
    } else {
      const dragId = curListItem.id;
      const draggingToItemIndex = Array.from(bodyRef.current?.children || []).findIndex((item) => item.id === dragId);
      if (draggingToItemIndex === state.draggingToItemIndex) {
        return;
      }
      const tempItemOrder = moveItem(itemOrder, state.draggedItemId, draggingToItemIndex);
      move(tempItemOrder);
      setState({
        ...state,
        draggingToItemIndex,
        tempItemOrder
      });
    }
  };
  const onDragEnd = ({target}) => {
    if (!(target instanceof HTMLTableRowElement)) {
      return;
    }
    target.classList.remove(styles.modifiers.ghostRow);
    target.setAttribute("aria-pressed", "false");
    setState({
      ...state,
      draggedItemId: "",
      draggingToItemIndex: -1,
      dragging: false
    });
  };
  const onDragFinish = async (dragged, newOrder) => {
    const oldIndex = itemOrder.findIndex((key2) => key2 === dragged);
    const newIndex = newOrder.findIndex((key2) => key2 === dragged);
    const times = newIndex - oldIndex;
    const ids = dragged.split(",");
    try {
      for (const id of ids)
        for (let index = 0; index < Math.abs(times); index++) {
          if (times > 0) {
            await adminClient.users.moveCredentialPositionDown({
              id: user.id,
              credentialId: id,
              newPreviousCredentialId: itemOrder[newIndex]
            });
          } else {
            await adminClient.users.moveCredentialPositionUp({
              id: user.id,
              credentialId: id
            });
          }
        }
      refresh();
      addAlert(t("users:updatedCredentialMoveSuccess"), AlertVariant.success);
    } catch (error) {
      addError("users:updatedCredentialMoveError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, isOpen && /* @__PURE__ */ React.createElement(ResetPasswordDialog, {
    user,
    isResetPassword,
    refresh,
    onClose: () => setIsOpen(false)
  }), openCredentialReset && /* @__PURE__ */ React.createElement(ResetCredentialDialog, {
    userId: user.id,
    onClose: () => setOpenCredentialReset(false)
  }), /* @__PURE__ */ React.createElement(DeleteConfirm, null), userCredentials.length !== 0 && passwordTypeFinder === void 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
    className: "kc-setPasswordBtn-tbl",
    "data-testid": "setPasswordBtn-table",
    variant: "primary",
    form: "userCredentials-form",
    onClick: () => {
      setIsOpen(true);
    }
  }, t("setPassword")), /* @__PURE__ */ React.createElement(Divider, null)), groupedUserCredentials.length !== 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, user.email && /* @__PURE__ */ React.createElement(Button, {
    className: "kc-resetCredentialBtn-header",
    variant: "primary",
    "data-testid": "credentialResetBtn",
    onClick: () => setOpenCredentialReset(true)
  }, t("credentialResetBtn")), /* @__PURE__ */ React.createElement(TableComposable, {
    "aria-label": "userCredentials-table",
    variant: "compact"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, {
    className: "kc-table-header"
  }, /* @__PURE__ */ React.createElement(Th, null, /* @__PURE__ */ React.createElement(HelpItem, {
    helpText: "users:userCredentialsHelpText",
    fieldLabelId: "users:userCredentialsHelpTextLabel"
  })), /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(Th, null, t("type")), /* @__PURE__ */ React.createElement(Th, null, t("userLabel")), /* @__PURE__ */ React.createElement(Th, null, t("data")), /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(Th, null))), /* @__PURE__ */ React.createElement(Tbody, {
    ref: bodyRef,
    onDragOver,
    onDrop: onDragOver,
    onDragLeave
  }, groupedUserCredentials.map((groupedCredential, rowIndex) => /* @__PURE__ */ React.createElement(Fragment, {
    key: groupedCredential.key
  }, /* @__PURE__ */ React.createElement(Tr, {
    id: groupedCredential.value.map(({id}) => id).toString(),
    draggable: groupedUserCredentials.length > 1,
    onDrop,
    onDragEnd,
    onDragStart
  }, /* @__PURE__ */ React.createElement(Td, {
    className: groupedUserCredentials.length === 1 ? "one-row" : "",
    draggableRow: {
      id: `draggable-row-${groupedCredential.value.map(({id}) => id)}`
    }
  }), groupedCredential.value.length > 1 ? /* @__PURE__ */ React.createElement(Td, {
    className: "kc-expandRow-btn",
    expand: {
      rowIndex,
      isExpanded: groupedCredential.isExpanded,
      onToggle: (_, rowIndex2) => {
        const rows = groupedUserCredentials.map((credential, index) => index === rowIndex2 ? {
          ...credential,
          isExpanded: !credential.isExpanded
        } : credential);
        setGroupedUserCredentials(rows);
      }
    }
  }) : /* @__PURE__ */ React.createElement(Td, null), /* @__PURE__ */ React.createElement(Td, {
    dataLabel: `columns-${groupedCredential.key}`,
    className: "kc-notExpandableRow-credentialType",
    "data-testid": "credentialType"
  }, toUpperCase(groupedCredential.key)), groupedCredential.value.length <= 1 && groupedCredential.value.map((credential) => /* @__PURE__ */ React.createElement(Row, {
    key: credential.id,
    credential
  }))), groupedCredential.isExpanded && groupedCredential.value.map((credential) => /* @__PURE__ */ React.createElement(Tr, {
    key: credential.id,
    id: credential.id,
    draggable: true,
    onDrop,
    onDragEnd,
    onDragStart
  }, /* @__PURE__ */ React.createElement(Td, null), /* @__PURE__ */ React.createElement(Td, {
    className: "kc-draggable-dropdown-type-icon",
    draggableRow: {
      id: `draggable-row-${groupedCredential.value.map(({id}) => id)}`
    }
  }), /* @__PURE__ */ React.createElement(Td, {
    dataLabel: `child-columns-${credential.id}`,
    className: "kc-expandableRow-credentialType"
  }, toUpperCase(credential.type)), /* @__PURE__ */ React.createElement(Row, {
    credential
  })))))))) : /* @__PURE__ */ React.createElement(ListEmptyState, {
    hasIcon: true,
    message: t("noCredentials"),
    instructions: t("noCredentialsText"),
    primaryActionText: t("setPassword"),
    onPrimaryAction: toggleModal,
    secondaryActions: user.email ? [
      {
        text: t("credentialResetBtn"),
        onClick: toggleCredentialsResetModal,
        type: ButtonVariant.link
      }
    ] : void 0
  }));
};
