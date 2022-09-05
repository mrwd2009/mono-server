import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Modal,
  ModalVariant,
  TextContent,
  Text,
  TextVariants
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "../../_snowpack/pkg/@patternfly/react-table.js";
import {isValidComponentType} from "./policy/PolicyDetails.js";
export const NewPolicyDialog = ({
  policyProviders,
  onSelect,
  toggleDialog
}) => {
  const {t} = useTranslation("clients");
  return /* @__PURE__ */ React.createElement(Modal, {
    "aria-labelledby": t("addPredefinedMappers"),
    variant: ModalVariant.medium,
    header: /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, {
      component: TextVariants.h1
    }, t("chooseAPolicyType")), /* @__PURE__ */ React.createElement(Text, null, t("chooseAPolicyTypeInstructions"))),
    isOpen: true,
    onClose: toggleDialog
  }, /* @__PURE__ */ React.createElement(TableComposable, {
    "aria-label": t("policies"),
    variant: "compact"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, t("common:name")), /* @__PURE__ */ React.createElement(Th, null, t("common:description")))), /* @__PURE__ */ React.createElement(Tbody, null, policyProviders?.map((provider) => /* @__PURE__ */ React.createElement(Tr, {
    key: provider.type,
    "data-testid": provider.type,
    onRowClick: () => onSelect(provider),
    isHoverable: true
  }, /* @__PURE__ */ React.createElement(Td, null, provider.name), /* @__PURE__ */ React.createElement(Td, null, isValidComponentType(provider.type) && t(`policyProvider.${provider.type}`)))))));
};
