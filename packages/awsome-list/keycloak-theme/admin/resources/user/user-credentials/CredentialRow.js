import React, {useMemo} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Td} from "../../_snowpack/pkg/@patternfly/react-table.js";
import {
  Button,
  Dropdown,
  DropdownPosition,
  KebabToggle,
  DropdownItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import useToggle from "../../utils/useToggle.js";
import useLocaleSort from "../../utils/useLocaleSort.js";
import {CredentialDataDialog} from "./CredentialDataDialog.js";
export const CredentialRow = ({
  credential,
  resetPassword,
  toggleDelete,
  children
}) => {
  const {t} = useTranslation("users");
  const [showData, toggleShow] = useToggle();
  const [kebabOpen, toggleKebab] = useToggle();
  const localeSort = useLocaleSort();
  const rows = useMemo(() => {
    if (!credential.credentialData) {
      return [];
    }
    const credentialData = JSON.parse(credential.credentialData);
    return localeSort(Object.entries(credentialData), ([key]) => key).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value];
      }
      return [key, JSON.stringify(value)];
    });
  }, [credential.credentialData]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, showData && Object.keys(credential).length !== 0 && /* @__PURE__ */ React.createElement(CredentialDataDialog, {
    credentialData: rows,
    onClose: () => {
      toggleShow();
    }
  }), /* @__PURE__ */ React.createElement(Td, null, children), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(Button, {
    className: "kc-showData-btn",
    variant: "link",
    "data-testid": "showDataBtn",
    onClick: toggleShow
  }, t("showDataBtn"))), credential.type === "password" ? /* @__PURE__ */ React.createElement(Td, {
    isActionCell: true
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    "data-testid": "resetPasswordBtn",
    onClick: resetPassword
  }, t("resetPasswordBtn"))) : /* @__PURE__ */ React.createElement(Td, null), /* @__PURE__ */ React.createElement(Td, {
    isActionCell: true
  }, /* @__PURE__ */ React.createElement(Dropdown, {
    isPlain: true,
    position: DropdownPosition.right,
    toggle: /* @__PURE__ */ React.createElement(KebabToggle, {
      onToggle: toggleKebab
    }),
    isOpen: kebabOpen,
    dropdownItems: [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: credential.id,
        "data-testid": "deleteDropdownItem",
        component: "button",
        onClick: () => {
          toggleDelete();
          toggleKebab();
        }
      }, t("deleteBtn"))
    ]
  })));
};
