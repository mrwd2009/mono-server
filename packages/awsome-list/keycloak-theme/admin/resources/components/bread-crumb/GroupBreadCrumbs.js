import React, {useEffect} from "../../_snowpack/pkg/react.js";
import {Link, useHistory, useLocation} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Breadcrumb, BreadcrumbItem} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useSubGroups} from "../../groups/SubGroupsContext.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
export const GroupBreadCrumbs = () => {
  const {t} = useTranslation();
  const {clear, remove, subGroups} = useSubGroups();
  const {realm} = useRealm();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    return history.listen(({pathname}) => {
      if (!pathname.includes("/groups") || pathname.endsWith("/groups")) {
        clear();
      }
    });
  }, [history]);
  return subGroups.length !== 0 ? /* @__PURE__ */ React.createElement(Breadcrumb, null, /* @__PURE__ */ React.createElement(BreadcrumbItem, {
    key: "home"
  }, /* @__PURE__ */ React.createElement(Link, {
    to: `/${realm}/groups`
  }, t("groups"))), subGroups.map((group, i) => {
    const isLastGroup = i === subGroups.length - 1;
    return /* @__PURE__ */ React.createElement(BreadcrumbItem, {
      key: group.id,
      isActive: isLastGroup
    }, !isLastGroup && /* @__PURE__ */ React.createElement(Link, {
      to: location.pathname.substring(0, location.pathname.indexOf(group.id) + group.id.length),
      onClick: () => remove(group)
    }, group.name), isLastGroup && (group.id === "search" ? group.name : t("groups:groupDetails")));
  })) : null;
};
