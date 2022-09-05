import {
  Tabs,
  TabsComponent
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React, {
  Children,
  isValidElement
} from "../../_snowpack/pkg/react.js";
import {useLocation} from "../../_snowpack/pkg/react-router-dom.js";
export const RoutableTabs = ({
  children,
  defaultLocation,
  ...otherProps
}) => {
  const {pathname} = useLocation();
  const eventKeys = Children.toArray(children).filter((child) => isValidElement(child)).map((child) => child.props.eventKey.toString());
  const exactMatch = eventKeys.find((eventKey) => eventKey === pathname);
  const nearestMatch = eventKeys.filter((eventKey) => pathname.includes(eventKey)).sort((a, b) => a.length - b.length).pop();
  return /* @__PURE__ */ React.createElement(Tabs, {
    activeKey: exactMatch ?? nearestMatch ?? defaultLocation?.pathname ?? pathname,
    component: TabsComponent.nav,
    inset: {
      default: "insetNone",
      xl: "insetLg",
      "2xl": "inset2xl"
    },
    ...otherProps
  }, children);
};
export const routableTab = ({to, history}) => ({
  eventKey: to.pathname ?? "",
  href: history.createHref(to)
});
