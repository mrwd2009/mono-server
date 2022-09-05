import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {Button, Modal, ModalVariant} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {FormProvider, useForm} from "../../../_snowpack/pkg/react-hook-form.js";
import {DynamicComponents} from "../../../components/dynamic/DynamicComponents.js";
export const AddValidatorRoleDialog = ({
  open,
  toggleDialog,
  onConfirm,
  selected
}) => {
  const {t} = useTranslation("realm-settings");
  const form = useForm();
  const {handleSubmit} = form;
  const selectedRoleValidator = selected;
  const save = (newValidator) => {
    onConfirm({...newValidator, name: selected.name});
    toggleDialog();
  };
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.small,
    title: t("addValidatorRole", {
      validatorName: selectedRoleValidator.name
    }),
    description: selectedRoleValidator.description,
    isOpen: open,
    onClose: toggleDialog,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        key: "save",
        "data-testid": "save-validator-role-button",
        variant: "primary",
        onClick: () => handleSubmit(save)()
      }, t("common:save")),
      /* @__PURE__ */ React.createElement(Button, {
        key: "cancel",
        "data-testid": "cancel-validator-role-button",
        variant: "link",
        onClick: toggleDialog
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(DynamicComponents, {
    properties: selectedRoleValidator.config
  })));
};
