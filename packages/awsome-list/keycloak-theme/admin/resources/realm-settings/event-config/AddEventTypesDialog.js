import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Button, Modal, ModalVariant} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {EventsTypeTable} from "./EventsTypeTable.js";
import {useServerInfo} from "../../context/server-info/ServerInfoProvider.js";
export const AddEventTypesDialog = ({
  onConfirm,
  onClose,
  configured
}) => {
  const {t} = useTranslation("realm-settings");
  const {enums} = useServerInfo();
  const [selectedTypes, setSelectedTypes] = useState([]);
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.medium,
    title: t("addTypes"),
    isOpen: true,
    onClose,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "addEventTypeConfirm",
        key: "confirm",
        variant: "primary",
        onClick: () => onConfirm(selectedTypes)
      }, t("common:add")),
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "moveCancel",
        key: "cancel",
        variant: "link",
        onClick: onClose
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(EventsTypeTable, {
    onSelect: (selected) => setSelectedTypes(selected),
    loader: () => Promise.resolve(enums["eventType"].filter((type) => !configured.includes(type)).map((id) => {
      return {id};
    }))
  }));
};
