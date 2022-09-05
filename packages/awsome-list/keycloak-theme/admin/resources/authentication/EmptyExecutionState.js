import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {
  Button,
  Flex,
  FlexItem,
  Title,
  TitleSizes
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {AddStepModal} from "./components/modals/AddStepModal.js";
import {AddSubFlowModal} from "./components/modals/AddSubFlowModal.js";
import "./empty-execution-state.css.proxy.js";
const SECTIONS = ["addExecution", "addSubFlow"];
export const EmptyExecutionState = ({
  flow,
  onAddExecution,
  onAddFlow
}) => {
  const {t} = useTranslation("authentication");
  const [show, setShow] = useState();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, show === "addExecution" && /* @__PURE__ */ React.createElement(AddStepModal, {
    name: flow.alias,
    type: flow.providerId === "client-flow" ? "client" : "basic",
    onSelect: (type) => {
      if (type) {
        onAddExecution(type);
      }
      setShow(void 0);
    }
  }), show === "addSubFlow" && /* @__PURE__ */ React.createElement(AddSubFlowModal, {
    name: flow.alias,
    onCancel: () => setShow(void 0),
    onConfirm: (newFlow) => {
      onAddFlow(newFlow);
      setShow(void 0);
    }
  }), /* @__PURE__ */ React.createElement(ListEmptyState, {
    message: t("emptyExecution"),
    instructions: t("emptyExecutionInstructions")
  }), /* @__PURE__ */ React.createElement("div", {
    className: "keycloak__empty-execution-state__block"
  }, SECTIONS.map((section) => /* @__PURE__ */ React.createElement(Flex, {
    key: section,
    className: "keycloak__empty-execution-state__help"
  }, /* @__PURE__ */ React.createElement(FlexItem, {
    flex: {default: "flex_1"}
  }, /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h3",
    size: TitleSizes.md
  }, t(`${section}Title`)), /* @__PURE__ */ React.createElement("p", null, t(`authentication-help:${section}`))), /* @__PURE__ */ React.createElement(Flex, {
    alignSelf: {default: "alignSelfCenter"}
  }, /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": section,
    variant: "tertiary",
    onClick: () => setShow(section)
  }, t(section))))))));
};
