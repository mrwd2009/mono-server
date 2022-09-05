import React, {Suspense} from "./_snowpack/pkg/react.js";
import {Page} from "./_snowpack/pkg/@patternfly/react-core.js";
import {HashRouter as Router, Route, Switch} from "./_snowpack/pkg/react-router-dom.js";
import {ErrorBoundary} from "./_snowpack/pkg/react-error-boundary.js";
import {Header} from "./PageHeader.js";
import {PageNav} from "./PageNav.js";
import {Help} from "./components/help-enabler/HelpHeader.js";
import {ServerInfoProvider} from "./context/server-info/ServerInfoProvider.js";
import {AlertProvider} from "./components/alert/Alerts.js";
import {AccessContextProvider, useAccess} from "./context/access/Access.js";
import {routes} from "./route-config.js";
import {PageBreadCrumbs} from "./components/bread-crumb/PageBreadCrumbs.js";
import {KeycloakSpinner} from "./components/keycloak-spinner/KeycloakSpinner.js";
import {ForbiddenSection} from "./ForbiddenSection.js";
import {SubGroups} from "./groups/SubGroupsContext.js";
import {RealmsProvider} from "./context/RealmsContext.js";
import {RealmContextProvider} from "./context/realm-context/RealmContext.js";
import {ErrorRenderer} from "./components/error/ErrorRenderer.js";
import {AdminClient} from "./context/auth/AdminClient.js";
import {WhoAmIContextProvider} from "./context/whoami/WhoAmI.js";
export const mainPageContentId = "kc-main-content-page-container";
const AppContexts = ({
  children,
  keycloak,
  adminClient
}) => /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(AdminClient.Provider, {
  value: {keycloak, adminClient}
}, /* @__PURE__ */ React.createElement(WhoAmIContextProvider, null, /* @__PURE__ */ React.createElement(RealmsProvider, null, /* @__PURE__ */ React.createElement(RealmContextProvider, null, /* @__PURE__ */ React.createElement(AccessContextProvider, null, /* @__PURE__ */ React.createElement(Help, null, /* @__PURE__ */ React.createElement(AlertProvider, null, /* @__PURE__ */ React.createElement(SubGroups, null, children)))))))));
const SecuredRoute = ({route}) => {
  const {hasAccess} = useAccess();
  const accessAllowed = route.access instanceof Array ? hasAccess(...route.access) : hasAccess(route.access);
  if (accessAllowed)
    return /* @__PURE__ */ React.createElement(Suspense, {
      fallback: /* @__PURE__ */ React.createElement(KeycloakSpinner, null)
    }, /* @__PURE__ */ React.createElement(route.component, null));
  return /* @__PURE__ */ React.createElement(ForbiddenSection, {
    permissionNeeded: route.access
  });
};
export const App = ({keycloak, adminClient}) => {
  return /* @__PURE__ */ React.createElement(AppContexts, {
    keycloak,
    adminClient
  }, /* @__PURE__ */ React.createElement(Page, {
    header: /* @__PURE__ */ React.createElement(Header, null),
    isManagedSidebar: true,
    sidebar: /* @__PURE__ */ React.createElement(PageNav, null),
    breadcrumb: /* @__PURE__ */ React.createElement(PageBreadCrumbs, null),
    mainContainerId: mainPageContentId
  }, /* @__PURE__ */ React.createElement(ErrorBoundary, {
    FallbackComponent: ErrorRenderer,
    onReset: () => window.location.href = window.location.origin + window.location.pathname
  }, /* @__PURE__ */ React.createElement(ServerInfoProvider, null, /* @__PURE__ */ React.createElement(Switch, null, routes.map((route, i) => /* @__PURE__ */ React.createElement(Route, {
    exact: route.matchOptions?.exact ?? true,
    key: i,
    path: route.path,
    component: () => /* @__PURE__ */ React.createElement(SecuredRoute, {
      route
    })
  })))))));
};
