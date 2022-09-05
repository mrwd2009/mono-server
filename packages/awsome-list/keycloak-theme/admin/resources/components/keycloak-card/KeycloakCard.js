import React, {useState} from "../../_snowpack/pkg/react.js";
import {
  Card,
  CardHeader,
  CardActions,
  CardTitle,
  CardBody,
  CardFooter,
  Dropdown,
  KebabToggle,
  Label,
  Flex,
  FlexItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import "./keycloak-card.css.proxy.js";
import {useHistory, useRouteMatch} from "../../_snowpack/pkg/react-router-dom.js";
export const KeycloakCard = ({
  id,
  title,
  dropdownItems,
  labelText,
  labelColor,
  footerText,
  providerId
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const history = useHistory();
  const {url} = useRouteMatch();
  const onDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleCardMenuClick = (e) => {
    e.stopPropagation();
  };
  const openSettings = () => {
    history.push(`${url}/${providerId}/${id}`);
  };
  return /* @__PURE__ */ React.createElement(Card, {
    isSelectable: true,
    onClick: openSettings
  }, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardActions, null, dropdownItems && /* @__PURE__ */ React.createElement(Dropdown, {
    "data-testid": `${title}-dropdown`,
    isPlain: true,
    position: "right",
    toggle: /* @__PURE__ */ React.createElement(KebabToggle, {
      onToggle: onDropdownToggle
    }),
    onClick: (e) => handleCardMenuClick(e),
    isOpen: isDropdownOpen,
    dropdownItems
  })), /* @__PURE__ */ React.createElement(CardTitle, {
    "data-testid": "keycloak-card-title"
  }, title)), /* @__PURE__ */ React.createElement(CardBody, null), /* @__PURE__ */ React.createElement(CardFooter, null, /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(FlexItem, {
    className: "keycloak--keycloak-card__footer"
  }, footerText && footerText), /* @__PURE__ */ React.createElement(FlexItem, null, labelText && /* @__PURE__ */ React.createElement(Label, {
    color: labelColor || "gray"
  }, labelText)))));
};
