import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link, useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Button,
  DescriptionList,
  PageSection,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {
  ExpandableRowContent,
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "../../_snowpack/pkg/@patternfly/react-table.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {PaginatingTableToolbar} from "../../components/table-toolbar/PaginatingTableToolbar.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {MoreLabel} from "./MoreLabel.js";
import {toScopeDetails} from "../routes/Scope.js";
import {toNewScope} from "../routes/NewScope.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import useToggle from "../../utils/useToggle.js";
import {DeleteScopeDialog} from "./DeleteScopeDialog.js";
import {DetailDescriptionLink} from "./DetailDescription.js";
import {toNewPermission} from "../routes/NewPermission.js";
import {toResourceDetails} from "../routes/Resource.js";
import {toPermissionDetails} from "../routes/PermissionDetails.js";
export const AuthorizationScopes = ({clientId}) => {
  const {t} = useTranslation("clients");
  const history = useHistory();
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const [deleteDialog, toggleDeleteDialog] = useToggle();
  const [scopes, setScopes] = useState();
  const [selectedScope, setSelectedScope] = useState();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const [max, setMax] = useState(10);
  const [first, setFirst] = useState(0);
  const [search, setSearch] = useState("");
  useFetch(async () => {
    const params = {
      first,
      max: max + 1,
      deep: false,
      name: search
    };
    const scopes2 = await adminClient.clients.listAllScopes({
      ...params,
      id: clientId
    });
    return await Promise.all(scopes2.map(async (scope) => {
      const options = {id: clientId, scopeId: scope.id};
      const [resources, permissions] = await Promise.all([
        adminClient.clients.listAllResourcesByScope(options),
        adminClient.clients.listAllPermissionsByScope(options)
      ]);
      return {
        ...scope,
        resources,
        permissions,
        isExpanded: false
      };
    }));
  }, setScopes, [key, search, first, max]);
  const ResourceRenderer = ({
    row
  }) => /* @__PURE__ */ React.createElement(React.Fragment, null, row.resources?.[0]?.name ? row.resources[0]?.name : "—", " ", /* @__PURE__ */ React.createElement(MoreLabel, {
    array: row.resources
  }));
  const PermissionsRenderer = ({
    row
  }) => /* @__PURE__ */ React.createElement(React.Fragment, null, row.permissions?.[0]?.name ? row.permissions[0]?.name : "—", " ", /* @__PURE__ */ React.createElement(MoreLabel, {
    array: row.permissions
  }));
  if (!scopes) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const noData = scopes.length === 0;
  const searching = search !== "";
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(DeleteScopeDialog, {
    clientId,
    open: deleteDialog,
    toggleDialog: toggleDeleteDialog,
    selectedScope,
    refresh
  }), (!noData || searching) && /* @__PURE__ */ React.createElement(PaginatingTableToolbar, {
    count: scopes.length,
    first,
    max,
    onNextClick: setFirst,
    onPreviousClick: setFirst,
    onPerPageSelect: (first2, max2) => {
      setFirst(first2);
      setMax(max2);
    },
    inputGroupName: "search",
    inputGroupPlaceholder: t("searchByName"),
    inputGroupOnEnter: setSearch,
    toolbarItem: /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "createAuthorizationScope",
      component: (props) => /* @__PURE__ */ React.createElement(Link, {
        ...props,
        to: toNewScope({realm, id: clientId})
      })
    }, t("createAuthorizationScope")))
  }, !noData && /* @__PURE__ */ React.createElement(TableComposable, {
    "aria-label": t("scopes"),
    variant: "compact"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(Th, null, t("common:name")), /* @__PURE__ */ React.createElement(Th, null, t("resources")), /* @__PURE__ */ React.createElement(Th, null, t("common:permissions")), /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(Th, null))), scopes.map((scope, rowIndex) => /* @__PURE__ */ React.createElement(Tbody, {
    key: scope.id,
    isExpanded: scope.isExpanded
  }, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Td, {
    expand: {
      rowIndex,
      isExpanded: scope.isExpanded,
      onToggle: (_, rowIndex2) => {
        const rows = scopes.map((resource, index) => index === rowIndex2 ? {
          ...resource,
          isExpanded: !resource.isExpanded
        } : resource);
        setScopes(rows);
      }
    }
  }), /* @__PURE__ */ React.createElement(Td, {
    "data-testid": `name-column-${scope.name}`
  }, /* @__PURE__ */ React.createElement(Link, {
    to: toScopeDetails({
      realm,
      id: clientId,
      scopeId: scope.id
    })
  }, scope.name)), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(ResourceRenderer, {
    row: scope
  })), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(PermissionsRenderer, {
    row: scope
  })), /* @__PURE__ */ React.createElement(Td, {
    width: 10
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toNewPermission({
        realm,
        id: clientId,
        permissionType: "scope",
        selectedId: scope.id
      })
    })
  }, t("createPermission"))), /* @__PURE__ */ React.createElement(Td, {
    isActionCell: true,
    actions: {
      items: [
        {
          title: t("common:delete"),
          onClick: () => {
            setSelectedScope(scope);
            toggleDeleteDialog();
          }
        }
      ]
    }
  })), /* @__PURE__ */ React.createElement(Tr, {
    key: `child-${scope.id}`,
    isExpanded: scope.isExpanded
  }, /* @__PURE__ */ React.createElement(Td, null), /* @__PURE__ */ React.createElement(Td, {
    colSpan: 4
  }, /* @__PURE__ */ React.createElement(ExpandableRowContent, null, scope.isExpanded && /* @__PURE__ */ React.createElement(DescriptionList, {
    isHorizontal: true,
    className: "keycloak_resource_details"
  }, /* @__PURE__ */ React.createElement(DetailDescriptionLink, {
    name: "resources",
    array: scope.resources,
    convert: (r) => r.name,
    link: (r) => toResourceDetails({
      id: clientId,
      realm,
      resourceId: r._id
    })
  }), /* @__PURE__ */ React.createElement(DetailDescriptionLink, {
    name: "associatedPermissions",
    array: scope.permissions,
    convert: (p) => p.name,
    link: (p) => toPermissionDetails({
      id: clientId,
      realm,
      permissionId: p.id,
      permissionType: p.type
    })
  }))))))))), noData && !searching && /* @__PURE__ */ React.createElement(ListEmptyState, {
    message: t("emptyAuthorizationScopes"),
    instructions: t("emptyAuthorizationInstructions"),
    onPrimaryAction: () => history.push(toNewScope({id: clientId, realm})),
    primaryActionText: t("createAuthorizationScope")
  }), noData && searching && /* @__PURE__ */ React.createElement(ListEmptyState, {
    isSearchVariant: true,
    message: t("common:noSearchResults"),
    instructions: t("common:noSearchResultsInstructions")
  }));
};
