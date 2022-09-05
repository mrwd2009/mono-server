import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Modal, ModalVariant} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {
  Table,
  TableBody,
  TableHeader,
  TableVariant
} from "../../_snowpack/pkg/@patternfly/react-table.js";
export const CredentialDataDialog = ({
  credentialData,
  onClose
}) => {
  const {t} = useTranslation("users");
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.medium,
    title: t("passwordDataTitle"),
    "data-testid": "passwordDataDialog",
    isOpen: true,
    onClose
  }, /* @__PURE__ */ React.createElement(Table, {
    "aria-label": t("passwordDataTitle"),
    "data-testid": "password-data-dialog",
    variant: TableVariant.compact,
    cells: [t("showPasswordDataName"), t("showPasswordDataValue")],
    rows: credentialData
  }, /* @__PURE__ */ React.createElement(TableHeader, null), /* @__PURE__ */ React.createElement(TableBody, null)));
};
