import React from "../_snowpack/pkg/react.js";
import {PageSection} from "../_snowpack/pkg/@patternfly/react-core.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {RolesList} from "./RolesList.js";
import helpUrls from "../help-urls.js";
import {useAccess} from "../context/access/Access.js";
export default function RealmRolesSection() {
  const {adminClient} = useAdminClient();
  const {hasAccess} = useAccess();
  const isManager = hasAccess("manage-realm");
  const loader = (first, max, search) => {
    const params = {
      first,
      max
    };
    const searchParam = search || "";
    if (searchParam) {
      params.search = searchParam;
    }
    return adminClient.roles.find(params);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "roles:title",
    subKey: "roles:roleExplain",
    helpUrl: helpUrls.realmRolesUrl
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    padding: {default: "noPadding"}
  }, /* @__PURE__ */ React.createElement(RolesList, {
    loader,
    isReadOnly: !isManager
  })));
}
