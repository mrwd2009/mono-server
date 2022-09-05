import React from "./_snowpack/pkg/react.js";
import {NavLink, useHistory, useRouteMatch} from "./_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "./_snowpack/pkg/react-i18next.js";
import {
  Nav,
  NavItem,
  NavGroup,
  NavList,
  PageSidebar,
  Divider
} from "./_snowpack/pkg/@patternfly/react-core.js";
import {RealmSelector} from "./components/realm-selector/RealmSelector.js";
import {useRealm} from "./context/realm-context/RealmContext.js";
import {useAccess} from "./context/access/Access.js";
import {routes} from "./route-config.js";
import {AddRealmRoute} from "./realm/routes/AddRealm.js";
export const PageNav = () => {
  const {t} = useTranslation("common");
  const {hasAccess, hasSomeAccess} = useAccess();
  const {realm} = useRealm();
  const history = useHistory();
  const onSelect = (item) => {
    history.push(item.to);
    item.event.preventDefault();
  };
  const LeftNav = ({title, path}) => {
    const route = routes.find((route2) => route2.path.replace(/\/:.+?(\?|(?:(?!\/).)*|$)/g, "") === path);
    const accessAllowed = route && (route.access instanceof Array ? hasAccess(...route.access) : hasAccess(route.access));
    if (!accessAllowed) {
      return null;
    }
    const activeItem = history.location.pathname.substring(realm.length + 1);
    return /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(NavLink, {
      id: "nav-item" + path.replace("/", "-"),
      to: `/${realm}${path}`,
      className: "pf-c-nav__link",
      activeClassName: "pf-m-current",
      isActive: () => path === activeItem || path !== "/" && activeItem.startsWith(path)
    }, t(title)));
  };
  const showManage = hasSomeAccess("view-realm", "query-groups", "query-users", "query-clients", "view-events");
  const showConfigure = hasSomeAccess("view-realm", "query-clients", "view-identity-providers");
  const isOnAddRealm = !!useRouteMatch(AddRealmRoute.path);
  return /* @__PURE__ */ React.createElement(PageSidebar, {
    nav: /* @__PURE__ */ React.createElement(Nav, {
      onSelect
    }, /* @__PURE__ */ React.createElement(NavList, null, /* @__PURE__ */ React.createElement(NavItem, {
      className: "keycloak__page_nav__nav_item__realm-selector"
    }, /* @__PURE__ */ React.createElement(RealmSelector, null))), /* @__PURE__ */ React.createElement(Divider, null), showManage && !isOnAddRealm && /* @__PURE__ */ React.createElement(NavGroup, {
      "aria-label": t("manage"),
      title: t("manage")
    }, /* @__PURE__ */ React.createElement(LeftNav, {
      title: "clients",
      path: "/clients"
    }), /* @__PURE__ */ React.createElement(LeftNav, {
      title: "clientScopes",
      path: "/client-scopes"
    }), /* @__PURE__ */ React.createElement(LeftNav, {
      title: "realmRoles",
      path: "/roles"
    }), /* @__PURE__ */ React.createElement(LeftNav, {
      title: "users",
      path: "/users"
    }), /* @__PURE__ */ React.createElement(LeftNav, {
      title: "groups",
      path: "/groups"
    }), /* @__PURE__ */ React.createElement(LeftNav, {
      title: "sessions",
      path: "/sessions"
    }), /* @__PURE__ */ React.createElement(LeftNav, {
      title: "events",
      path: "/events"
    })), showConfigure && !isOnAddRealm && /* @__PURE__ */ React.createElement(NavGroup, {
      "aria-label": t("configure"),
      title: t("configure")
    }, /* @__PURE__ */ React.createElement(LeftNav, {
      title: "realmSettings",
      path: "/realm-settings"
    }), /* @__PURE__ */ React.createElement(LeftNav, {
      title: "authentication",
      path: "/authentication"
    }), /* @__PURE__ */ React.createElement(LeftNav, {
      title: "identityProviders",
      path: "/identity-providers"
    }), /* @__PURE__ */ React.createElement(LeftNav, {
      title: "userFederation",
      path: "/user-federation"
    })))
  });
};
