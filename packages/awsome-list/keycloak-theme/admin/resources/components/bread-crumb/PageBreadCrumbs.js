import React, {isValidElement} from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import useBreadcrumbs from "../../_snowpack/pkg/use-react-router-breadcrumbs.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {uniqBy} from "../../_snowpack/pkg/lodash-es.js";
import {Breadcrumb, BreadcrumbItem} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {routes} from "../../route-config.js";
import {GroupBreadCrumbs} from "./GroupBreadCrumbs.js";
export const PageBreadCrumbs = () => {
  const {t} = useTranslation();
  const {realm} = useRealm();
  const elementText = (crumb) => isValidElement(crumb.breadcrumb) && crumb.breadcrumb.props.children;
  const routesWithCrumbs = routes.map((route) => ({
    ...route,
    breadcrumb: route.breadcrumb?.(t)
  }));
  const crumbs = uniqBy(useBreadcrumbs(routesWithCrumbs, {
    disableDefaults: true,
    excludePaths: ["/", `/${realm}`]
  }), elementText);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, crumbs.length > 1 && /* @__PURE__ */ React.createElement(Breadcrumb, null, crumbs.map(({match, breadcrumb: crumb}, i) => /* @__PURE__ */ React.createElement(BreadcrumbItem, {
    key: i,
    isActive: crumbs.length - 1 === i
  }, crumbs.length - 1 !== i && /* @__PURE__ */ React.createElement(Link, {
    to: match.url
  }, crumb), crumbs.length - 1 === i && crumb))), /* @__PURE__ */ React.createElement(GroupBreadCrumbs, null));
};
