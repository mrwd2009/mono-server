import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Button,
  Modal,
  ModalVariant,
  Popover,
  Text,
  TextContent,
  TextVariants
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {CheckCircleIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {KeycloakDataTable} from "../../components/table-toolbar/KeycloakDataTable.js";
import useToggle from "../../utils/useToggle.js";
import "./used-by.css.proxy.js";
const Label = ({label}) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(CheckCircleIcon, {
  className: "keycloak_authentication-section__usedby"
}), " ", label);
const UsedByModal = ({
  values,
  isSpecificClient,
  onClose
}) => {
  const {t} = useTranslation("authentication");
  return /* @__PURE__ */ React.createElement(Modal, {
    header: /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, {
      component: TextVariants.h1
    }, t("flowUsedBy")), /* @__PURE__ */ React.createElement(Text, null, t("flowUsedByDescription", {
      value: isSpecificClient ? t("clients") : t("identiyProviders")
    }))),
    variant: ModalVariant.medium,
    isOpen: true,
    onClose,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "cancel",
        id: "modal-cancel",
        key: "cancel",
        onClick: onClose
      }, t("common:close"))
    ]
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    loader: values.map((value) => ({name: value})),
    ariaLabelKey: "authentication:usedBy",
    searchPlaceholderKey: "common:search",
    columns: [
      {
        name: "name"
      }
    ]
  }));
};
export const UsedBy = ({
  authType: {
    id,
    usedBy: {type, values}
  }
}) => {
  const {t} = useTranslation("authentication");
  const [open, toggle] = useToggle();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, open && /* @__PURE__ */ React.createElement(UsedByModal, {
    values,
    onClose: toggle,
    isSpecificClient: type === "specificClients"
  }), (type === "specificProviders" || type === "specificClients") && (values.length < 8 ? /* @__PURE__ */ React.createElement(Popover, {
    key: id,
    "aria-label": t("usedBy"),
    bodyContent: /* @__PURE__ */ React.createElement("div", {
      key: `usedBy-${id}-${values}`
    }, t("appliedBy" + (type === "specificClients" ? "Clients" : "Providers")), " ", values.map((used, index) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("strong", null, used), index < values.length - 1 ? ", " : "")))
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    className: "keycloak__used-by__popover-button"
  }, /* @__PURE__ */ React.createElement(Label, {
    label: t(type)
  }))) : /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    className: "keycloak__used-by__popover-button",
    onClick: toggle
  }, /* @__PURE__ */ React.createElement(Label, {
    label: t(type)
  }))), type === "default" && /* @__PURE__ */ React.createElement(Label, {
    label: t(`flow.${values[0]}`)
  }), !type && t("notInUse"));
};
