import {
  Avatar,
  Brand,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  DropdownToggle,
  KebabToggle,
  PageHeader,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem
} from "./_snowpack/pkg/@patternfly/react-core.js";
import {HelpIcon} from "./_snowpack/pkg/@patternfly/react-icons.js";
import React, {useState} from "./_snowpack/pkg/react.js";
import {useTranslation} from "./_snowpack/pkg/react-i18next.js";
import {Link} from "./_snowpack/pkg/react-router-dom.js";
import {HelpHeader, useHelp} from "./components/help-enabler/HelpHeader.js";
import {useAdminClient} from "./context/auth/AdminClient.js";
import {useRealm} from "./context/realm-context/RealmContext.js";
import {useWhoAmI} from "./context/whoami/WhoAmI.js";
import {toDashboard} from "./dashboard/routes/Dashboard.js";
import environment from "./environment.js";
export const Header = () => {
  const {realm} = useRealm();
  const {keycloak} = useAdminClient();
  const {t} = useTranslation();
  const ManageAccountDropdownItem = () => /* @__PURE__ */ React.createElement(DropdownItem, {
    key: "manage account",
    id: "manage-account",
    onClick: () => keycloak.accountManagement()
  }, t("manageAccount"));
  const SignOutDropdownItem = () => /* @__PURE__ */ React.createElement(DropdownItem, {
    id: "sign-out",
    key: "sign out",
    onClick: () => keycloak.logout({redirectUri: ""})
  }, t("signOut"));
  const ServerInfoDropdownItem = () => {
    const {realm: realm2} = useRealm();
    const {t: t2} = useTranslation();
    return /* @__PURE__ */ React.createElement(DropdownItem, {
      key: "server info",
      component: (props) => /* @__PURE__ */ React.createElement(Link, {
        ...props,
        to: toDashboard({realm: realm2})
      })
    }, t2("realmInfo"));
  };
  const HelpDropdownItem = () => {
    const {t: t2} = useTranslation();
    const {enabled, toggleHelp} = useHelp();
    return /* @__PURE__ */ React.createElement(DropdownItem, {
      icon: /* @__PURE__ */ React.createElement(HelpIcon, null),
      onClick: toggleHelp
    }, enabled ? t2("helpEnabled") : t2("helpDisabled"));
  };
  const kebabDropdownItems = [
    /* @__PURE__ */ React.createElement(ManageAccountDropdownItem, {
      key: "kebab Manage Account"
    }),
    /* @__PURE__ */ React.createElement(ServerInfoDropdownItem, {
      key: "kebab Server Info"
    }),
    /* @__PURE__ */ React.createElement(HelpDropdownItem, {
      key: "kebab Help"
    }),
    /* @__PURE__ */ React.createElement(DropdownSeparator, {
      key: "kebab sign out separator"
    }),
    /* @__PURE__ */ React.createElement(SignOutDropdownItem, {
      key: "kebab Sign out"
    })
  ];
  const userDropdownItems = [
    /* @__PURE__ */ React.createElement(ManageAccountDropdownItem, {
      key: "Manage Account"
    }),
    /* @__PURE__ */ React.createElement(ServerInfoDropdownItem, {
      key: "Server info"
    }),
    /* @__PURE__ */ React.createElement(DropdownSeparator, {
      key: "sign out separator"
    }),
    /* @__PURE__ */ React.createElement(SignOutDropdownItem, {
      key: "Sign out"
    })
  ];
  const headerTools = () => {
    return /* @__PURE__ */ React.createElement(PageHeaderTools, null, /* @__PURE__ */ React.createElement(PageHeaderToolsGroup, {
      visibility: {
        default: "hidden",
        md: "visible"
      }
    }, /* @__PURE__ */ React.createElement(PageHeaderToolsItem, null, /* @__PURE__ */ React.createElement(HelpHeader, null))), /* @__PURE__ */ React.createElement(PageHeaderToolsGroup, null, /* @__PURE__ */ React.createElement(PageHeaderToolsItem, {
      visibility: {
        md: "hidden"
      }
    }, /* @__PURE__ */ React.createElement(KebabDropdown, null)), /* @__PURE__ */ React.createElement(PageHeaderToolsItem, {
      visibility: {
        default: "hidden",
        md: "visible"
      }
    }, /* @__PURE__ */ React.createElement(UserDropdown, null))), /* @__PURE__ */ React.createElement(Avatar, {
      src: environment.resourceUrl + "/img_avatar.svg",
      alt: "Avatar image"
    }));
  };
  const KebabDropdown = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    return /* @__PURE__ */ React.createElement(Dropdown, {
      id: "user-dropdown-kebab",
      isPlain: true,
      position: "right",
      toggle: /* @__PURE__ */ React.createElement(KebabToggle, {
        onToggle: setDropdownOpen
      }),
      isOpen: isDropdownOpen,
      dropdownItems: kebabDropdownItems
    });
  };
  const UserDropdown = () => {
    const {whoAmI} = useWhoAmI();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    return /* @__PURE__ */ React.createElement(Dropdown, {
      isPlain: true,
      position: "right",
      id: "user-dropdown",
      isOpen: isDropdownOpen,
      toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
        onToggle: setDropdownOpen
      }, whoAmI.getDisplayName()),
      dropdownItems: userDropdownItems
    });
  };
  return /* @__PURE__ */ React.createElement(PageHeader, {
    showNavToggle: true,
    logo: /* @__PURE__ */ React.createElement(Link, {
      to: toDashboard({realm})
    }, /* @__PURE__ */ React.createElement(Brand, {
      src: environment.resourceUrl + "/logo.svg",
      id: "masthead-logo",
      alt: "Logo",
      className: "keycloak__pageheader_brand"
    })),
    logoComponent: "div",
    headerTools: headerTools()
  });
};
