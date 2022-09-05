import React, {useState} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {Modal, ModalVariant} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "../../../_snowpack/pkg/@patternfly/react-table.js";
import {AddValidatorRoleDialog} from "./AddValidatorRoleDialog.js";
import {validators as allValidator} from "./Validators.js";
import useToggle from "../../../utils/useToggle.js";
export const AddValidatorDialog = ({
  selectedValidators,
  toggleDialog,
  onConfirm
}) => {
  const {t} = useTranslation("realm-settings");
  const [selectedValidator, setSelectedValidator] = useState();
  const [validators, setValidators] = useState(() => allValidator.filter(({name}) => !selectedValidators.map(({key}) => key).includes(name)));
  const [addValidatorRoleModalOpen, toggleModal] = useToggle();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, addValidatorRoleModalOpen && /* @__PURE__ */ React.createElement(AddValidatorRoleDialog, {
    onConfirm: (newValidator) => {
      onConfirm(newValidator);
      setValidators(validators.filter(({name}) => name !== newValidator.name));
    },
    open: addValidatorRoleModalOpen,
    toggleDialog: toggleModal,
    selected: selectedValidator
  }), /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.small,
    title: t("addValidator"),
    isOpen: true,
    onClose: toggleDialog
  }, /* @__PURE__ */ React.createElement(TableComposable, {
    "aria-label": "validators-table"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, t("validatorDialogColNames.colName")), /* @__PURE__ */ React.createElement(Th, null, t("validatorDialogColNames.colDescription")))), /* @__PURE__ */ React.createElement(Tbody, null, validators.map((validator) => /* @__PURE__ */ React.createElement(Tr, {
    key: validator.name,
    onRowClick: () => {
      setSelectedValidator(validator);
      toggleModal();
    },
    isHoverable: true
  }, /* @__PURE__ */ React.createElement(Td, {
    dataLabel: t("validatorDialogColNames.colName")
  }, validator.name), /* @__PURE__ */ React.createElement(Td, {
    dataLabel: t("validatorDialogColNames.colDescription")
  }, validator.description)))))));
};
