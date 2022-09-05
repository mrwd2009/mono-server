import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  CodeBlock,
  CodeBlockAction,
  EmptyState,
  EmptyStateBody,
  Title
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {CopyToClipboardButton} from "./CopyToClipboardButton.js";
import {KeycloakTextArea} from "../../components/keycloak-text-area/KeycloakTextArea.js";
export const GeneratedCodeTab = ({
  text,
  user,
  label
}) => {
  const {t} = useTranslation("clients");
  return user ? /* @__PURE__ */ React.createElement(CodeBlock, {
    id: label,
    actions: /* @__PURE__ */ React.createElement(CodeBlockAction, null, /* @__PURE__ */ React.createElement(CopyToClipboardButton, {
      id: "code",
      text,
      label
    }))
  }, /* @__PURE__ */ React.createElement(KeycloakTextArea, {
    id: `text-area-${label}`,
    rows: 20,
    value: text
  })) : /* @__PURE__ */ React.createElement(EmptyState, {
    variant: "large"
  }, /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h4",
    size: "lg"
  }, t(`${label}No`)), /* @__PURE__ */ React.createElement(EmptyStateBody, null, t(`${label}IsDisabled`)));
};
