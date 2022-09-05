import React from "../../_snowpack/pkg/react.js";
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  Title,
  Button,
  ButtonVariant,
  EmptyStateSecondaryActions
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {PlusCircleIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {SearchIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
export const ListEmptyState = ({
  message,
  instructions,
  onPrimaryAction,
  hasIcon = true,
  isSearchVariant,
  primaryActionText,
  secondaryActions,
  icon
}) => {
  return /* @__PURE__ */ React.createElement(EmptyState, {
    "data-testid": "empty-state",
    variant: "large"
  }, hasIcon && isSearchVariant ? /* @__PURE__ */ React.createElement(EmptyStateIcon, {
    icon: SearchIcon
  }) : hasIcon && /* @__PURE__ */ React.createElement(EmptyStateIcon, {
    icon: icon ? icon : PlusCircleIcon
  }), /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h1",
    size: "lg"
  }, message), /* @__PURE__ */ React.createElement(EmptyStateBody, null, instructions), primaryActionText && /* @__PURE__ */ React.createElement(Button, {
    "data-testid": `${message.replace(/\W+/g, "-").toLowerCase()}-empty-action`,
    variant: "primary",
    onClick: onPrimaryAction
  }, primaryActionText), secondaryActions && /* @__PURE__ */ React.createElement(EmptyStateSecondaryActions, null, secondaryActions.map((action) => /* @__PURE__ */ React.createElement(Button, {
    key: action.text,
    "data-testid": `${action.text.replace(/\W+/g, "-").toLowerCase()}-empty-action`,
    variant: action.type || ButtonVariant.secondary,
    onClick: action.onClick
  }, action.text))));
};
