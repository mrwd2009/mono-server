import React from "../../../_snowpack/pkg/react.js";
import {Modal, ModalVariant} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {KeyProviderForm} from "./KeyProviderForm.js";
export const KeyProviderModal = ({
  providerType,
  onClose
}) => {
  const {t} = useTranslation("realm-settings");
  return /* @__PURE__ */ React.createElement(Modal, {
    className: "add-provider-modal",
    variant: ModalVariant.medium,
    title: t("addProvider"),
    isOpen: true,
    onClose
  }, /* @__PURE__ */ React.createElement(KeyProviderForm, {
    providerType,
    onClose
  }));
};
