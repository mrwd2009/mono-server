import {
  Badge,
  Button,
  Divider,
  Dropdown,
  DropdownPosition,
  DropdownToggle,
  Level,
  LevelItem,
  PageSection,
  Switch,
  Text,
  TextContent,
  Toolbar,
  ToolbarContent,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React, {
  useState,
  isValidElement,
  Fragment
} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormattedLink} from "../external-link/FormattedLink.js";
import {useHelp} from "../help-enabler/HelpHeader.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
import "../../help-urls.js";
export const ViewHeader = ({
  actionsDropdownId,
  className,
  titleKey,
  badges,
  isDropdownDisabled,
  subKey,
  helpUrl,
  dropdownItems,
  lowerDropdownMenuTitle,
  lowerDropdownItems,
  lowerButton,
  isEnabled = true,
  onToggle,
  divider = true,
  helpTextKey,
  isReadOnly = false
}) => {
  const {t} = useTranslation();
  const {enabled} = useHelp();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLowerDropdownOpen, setIsLowerDropdownOpen] = useState(false);
  const onDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const onLowerDropdownToggle = () => {
    setIsLowerDropdownOpen(!isLowerDropdownOpen);
  };
  const toKey = (value) => value.replace(/\s/g, "-");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(Level, {
    hasGutter: true
  }, /* @__PURE__ */ React.createElement(LevelItem, null, /* @__PURE__ */ React.createElement(Level, null, /* @__PURE__ */ React.createElement(LevelItem, null, /* @__PURE__ */ React.createElement(TextContent, {
    className: "pf-u-mr-sm"
  }, /* @__PURE__ */ React.createElement(Text, {
    className,
    component: "h1"
  }, t(titleKey)))), badges && /* @__PURE__ */ React.createElement(LevelItem, null, badges.map((badge, index) => /* @__PURE__ */ React.createElement(Fragment, {
    key: index
  }, !isValidElement(badge.text) && /* @__PURE__ */ React.createElement(Fragment, {
    key: badge.text
  }, /* @__PURE__ */ React.createElement(Badge, {
    "data-testid": badge.id,
    isRead: badge.readonly
  }, badge.text), " "), isValidElement(badge.text) && badge.text, " "))))), /* @__PURE__ */ React.createElement(LevelItem, null, /* @__PURE__ */ React.createElement(Toolbar, {
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(ToolbarContent, null, onToggle && /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Switch, {
    id: `${toKey(titleKey)}-switch`,
    "data-testid": `${titleKey}-switch`,
    label: t("common:enabled"),
    labelOff: t("common:disabled"),
    className: "pf-u-mr-lg",
    isDisabled: isReadOnly,
    isChecked: isEnabled,
    onChange: (value) => {
      onToggle(value);
    }
  }), helpTextKey && /* @__PURE__ */ React.createElement(HelpItem, {
    helpText: t(helpTextKey),
    fieldLabelId: `${toKey(titleKey)}-switch`
  })), dropdownItems && /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Dropdown, {
    position: DropdownPosition.right,
    toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
      isDisabled: isDropdownDisabled,
      id: actionsDropdownId,
      onToggle: onDropdownToggle
    }, t("common:action")),
    isOpen: isDropdownOpen,
    dropdownItems,
    "data-testid": "action-dropdown"
  })))))), enabled && /* @__PURE__ */ React.createElement(TextContent, {
    id: "view-header-subkey"
  }, /* @__PURE__ */ React.createElement(Text, null, React.isValidElement(subKey) ? subKey : subKey ? t(subKey) : "", helpUrl && /* @__PURE__ */ React.createElement(FormattedLink, {
    title: t("common:learnMore"),
    href: helpUrl,
    isInline: true,
    className: "pf-u-ml-md"
  }))), lowerDropdownItems && /* @__PURE__ */ React.createElement(Dropdown, {
    className: "keycloak__user-federation__dropdown",
    toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
      onToggle: () => onLowerDropdownToggle(),
      isPrimary: true,
      id: "ufToggleId"
    }, t(lowerDropdownMenuTitle)),
    isOpen: isLowerDropdownOpen,
    dropdownItems: lowerDropdownItems
  }), lowerButton && /* @__PURE__ */ React.createElement(Button, {
    variant: lowerButton.variant,
    onClick: lowerButton.onClick,
    "data-testid": "viewHeader-lower-btn"
  }, lowerButton.lowerButtonTitle)), divider && /* @__PURE__ */ React.createElement(Divider, {
    component: "div"
  }));
};
