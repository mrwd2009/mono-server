import React, {useEffect, useState} from "../../../_snowpack/pkg/react.js";
import {
  Button,
  ButtonVariant,
  Divider,
  Flex,
  FlexItem,
  Text,
  TextVariants
} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import "../../realm-settings-section.css.proxy.js";
import {PlusCircleIcon} from "../../../_snowpack/pkg/@patternfly/react-icons.js";
import {AddValidatorDialog} from "./AddValidatorDialog.js";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "../../../_snowpack/pkg/@patternfly/react-table.js";
import {useConfirmDialog} from "../../../components/confirm-dialog/ConfirmDialog.js";
import useToggle from "../../../utils/useToggle.js";
import {useFormContext, useWatch} from "../../../_snowpack/pkg/react-hook-form.js";
import "../../realm-settings-section.css.proxy.js";
export const AttributeValidations = () => {
  const {t} = useTranslation("realm-settings");
  const [addValidatorModalOpen, toggleModal] = useToggle();
  const [validatorToDelete, setValidatorToDelete] = useState();
  const {setValue, control, register} = useFormContext();
  const validators = useWatch({
    name: "validations",
    control,
    defaultValue: []
  });
  useEffect(() => {
    register("validations");
  }, []);
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("deleteValidatorConfirmTitle"),
    messageKey: t("deleteValidatorConfirmMsg", {
      validatorName: validatorToDelete?.name
    }),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      const updatedValidators = validators.filter((validator) => validator.key !== validatorToDelete?.name);
      setValue("validations", [...updatedValidators]);
    }
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, addValidatorModalOpen && /* @__PURE__ */ React.createElement(AddValidatorDialog, {
    selectedValidators: validators,
    onConfirm: (newValidator) => {
      setValue("validations", [
        ...validators,
        {key: newValidator.name, value: newValidator.config}
      ]);
    },
    toggleDialog: toggleModal
  }), /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement("div", {
    className: "kc-attributes-validations"
  }, /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(FlexItem, {
    align: {default: "alignRight"}
  }, /* @__PURE__ */ React.createElement(Button, {
    id: "addValidator",
    onClick: () => toggleModal(),
    variant: "link",
    className: "kc-addValidator",
    "data-testid": "addValidator",
    icon: /* @__PURE__ */ React.createElement(PlusCircleIcon, null)
  }, t("realm-settings:addValidator")))), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(TableComposable, {
    "aria-label": "validators-table"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, t("validatorColNames.colName")), /* @__PURE__ */ React.createElement(Th, null, t("validatorColNames.colConfig")), /* @__PURE__ */ React.createElement(Th, null))), /* @__PURE__ */ React.createElement(Tbody, null, validators.map((validator) => /* @__PURE__ */ React.createElement(Tr, {
    key: validator.key
  }, /* @__PURE__ */ React.createElement(Td, {
    dataLabel: t("validatorColNames.colName")
  }, validator.key), /* @__PURE__ */ React.createElement(Td, {
    dataLabel: t("validatorColNames.colConfig")
  }, JSON.stringify(validator.value)), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(Button, {
    key: "validator",
    variant: "link",
    "data-testid": "deleteValidator",
    onClick: () => {
      toggleDeleteDialog();
      setValidatorToDelete({
        name: validator.key
      });
    }
  }, t("common:delete"))))), validators.length === 0 && /* @__PURE__ */ React.createElement(Text, {
    className: "kc-emptyValidators",
    component: TextVariants.h6
  }, t("realm-settings:emptyValidators"))))));
};
