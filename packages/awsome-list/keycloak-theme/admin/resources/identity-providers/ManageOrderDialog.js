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
export const ManageOrderDialog = ({
  providers,
  onClose
}) => {
  const {t} = useTranslation("identity-providers");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [alias, setAlias] = useState("");
  const [liveText, setLiveText] = useState("");
  const [order, setOrder] = useState(providers.map((provider) => provider.alias));
  const onDragStart = (id) => {
    setAlias(id);
    setLiveText(t("common:onDragStart", {item: id}));
  };
  const onDragMove = () => {
    setLiveText(t("common:onDragMove", {item: alias}));
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
    title: t("manageDisplayOrder"),
    isOpen: true,
    onClose,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-confirm",
        "data-testid": "confirm",
        key: "confirm",
        onClick: async () => {
          const updates = order.map((alias2, index) => {
            const provider = providers.find((p) => p.alias === alias2);
            provider.config.guiOrder = index;
            return adminClient.identityProviders.update({alias: alias2}, provider);
          });
          try {
            await Promise.all(updates);
            addAlert(t("orderChangeSuccess"));
          } catch (error) {
            addError("identity-providers:orderChangeError", error);
          }
          onClose();
        }
      }, t("common:save")),
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-cancel",
        "data-testid": "cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: onClose
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(TextContent, {
    className: "pf-u-pb-lg"
  }, /* @__PURE__ */ React.createElement(Text, null, t("orderDialogIntro"))), /* @__PURE__ */ React.createElement(DataList, {
    "aria-label": t("manageOrderTableAria"),
    "data-testid": "manageOrderDataList",
    isCompact: true,
    onDragFinish,
    onDragStart,
    onDragMove,
    onDragCancel,
    itemOrder: order
  }, sortBy(providers, "config.guiOrder", "alias").map((provider) => /* @__PURE__ */ React.createElement(DataListItem, {
    "aria-label": provider.alias,
    id: provider.alias,
    key: provider.alias
  }, /* @__PURE__ */ React.createElement(DataListItemRow, null, /* @__PURE__ */ React.createElement(DataListControl, null, /* @__PURE__ */ React.createElement(DataListDragButton, {
    "aria-label": t("manageOrderItemAria")
  })), /* @__PURE__ */ React.createElement(DataListItemCells, {
    dataListCells: [
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: provider.alias,
        "data-testid": provider.alias
      }, provider.alias)
    ]
  }))))), /* @__PURE__ */ React.createElement("div", {
    className: "pf-screen-reader",
    "aria-live": "assertive"
  }, liveText));
};
