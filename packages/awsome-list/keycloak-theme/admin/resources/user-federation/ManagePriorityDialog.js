import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {sortBy} from "../_snowpack/pkg/lodash-es.js";
import {
  Button,
  ButtonVariant,
  DataList,
  DataListCell,
  DataListControl,
  DataListDragButton,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Modal,
  ModalVariant,
  TextContent,
  Text
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
export const ManagePriorityDialog = ({
  components,
  onClose
}) => {
  const {t} = useTranslation("user-federation");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [id, setId] = useState("");
  const [liveText, setLiveText] = useState("");
  const [order, setOrder] = useState(components.map((component) => component.name));
  const onDragStart = (id2) => {
    setId(id2);
    setLiveText(t("common:onDragStart", {item: id2}));
  };
  const onDragMove = () => {
    setLiveText(t("common:onDragMove", {item: id}));
  };
  const onDragCancel = () => {
    setLiveText(t("common:onDragCancel"));
  };
  const onDragFinish = (providerOrder) => {
    setLiveText(t("common:onDragFinish", {list: providerOrder}));
    setOrder(providerOrder);
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.small,
    title: t("managePriorityOrder"),
    isOpen: true,
    onClose,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-confirm",
        key: "confirm",
        onClick: async () => {
          const updates = order.map((name, index) => {
            const component = components.find((c) => c.name === name);
            component.config.priority = [index.toString()];
            return adminClient.components.update({id: component.id}, component);
          });
          try {
            await Promise.all(updates);
            addAlert(t("orderChangeSuccess"));
          } catch (error) {
            addError("orderChangeError", error);
          }
          onClose();
        }
      }, t("common:save")),
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: onClose
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(TextContent, {
    className: "pf-u-pb-lg"
  }, /* @__PURE__ */ React.createElement(Text, null, t("managePriorityInfo"))), /* @__PURE__ */ React.createElement(DataList, {
    "aria-label": t("manageOrderTableAria"),
    "data-testid": "manageOrderDataList",
    isCompact: true,
    onDragFinish,
    onDragStart,
    onDragMove,
    onDragCancel,
    itemOrder: order
  }, sortBy(components, "config.priority", "name").map((component) => /* @__PURE__ */ React.createElement(DataListItem, {
    "aria-label": component.name,
    id: component.name,
    key: component.name
  }, /* @__PURE__ */ React.createElement(DataListItemRow, null, /* @__PURE__ */ React.createElement(DataListControl, null, /* @__PURE__ */ React.createElement(DataListDragButton, {
    "aria-label": t("manageOrderItemAria")
  })), /* @__PURE__ */ React.createElement(DataListItemCells, {
    dataListCells: [
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: component.name,
        "data-testid": component.name
      }, component.name)
    ]
  }))))), /* @__PURE__ */ React.createElement("div", {
    className: "pf-screen-reader",
    "aria-live": "assertive"
  }, liveText));
};
