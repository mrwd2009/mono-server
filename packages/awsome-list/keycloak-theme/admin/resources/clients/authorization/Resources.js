import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Alert,
  AlertVariant,
  Button,
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
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {PaginatingTableToolbar} from "../../components/table-toolbar/PaginatingTableToolbar.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {DetailCell} from "./DetailCell.js";
import {toCreateResource} from "../routes/NewResource.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {toResourceDetails} from "../routes/Resource.js";
import {MoreLabel} from "./MoreLabel.js";
import {toNewPermission} from "../routes/NewPermission.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import {SearchDropdown} from "./SearchDropdown.js";
export const AuthorizationResources = ({clientId}) => {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const [resources, setResources] = useState();
  const [selectedResource, setSelectedResource] = useState();
  const [permissions, setPermission] = useState();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const [max, setMax] = useState(10);
  const [first, setFirst] = useState(0);
  const [search, setSearch] = useState({});
  useFetch(() => {
    const params = {
      first,
      max: max + 1,
      deep: false,
      ...search
    };
    return adminClient.clients.listResources({
      ...params,
      id: clientId
    });
  }, (resources2) => setResources(resources2.map((resource) => ({...resource, isExpanded: false}))), [key, search, first, max]);
  const UriRenderer = ({row}) => /* @__PURE__ */ React.createElement(React.Fragment, null, row.uris?.[0], " ", /* @__PURE__ */ React.createElement(MoreLabel, {
    array: row.uris
  }));
  const fetchPermissions = async (id) => {
    return adminClient.clients.listPermissionsByResource({
      id: clientId,
      resourceId: id
    });
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "clients:deleteResource",
    children: /* @__PURE__ */ React.createElement(React.Fragment, null, t("deleteResourceConfirm"), permissions?.length && /* @__PURE__ */ React.createElement(Alert, {
      variant: "warning",
      isInline: true,
      isPlain: true,
      title: t("deleteResourceWarning"),
      className: "pf-u-pt-lg"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "pf-u-pt-xs"
    }, permissions.map((permission) => /* @__PURE__ */ React.createElement("strong", {
      key: permission.id,
      className: "pf-u-pr-md"
    }, permission.name))))),
    continueButtonLabel: "clients:confirm",
    onConfirm: async () => {
      try {
        await adminClient.clients.delResource({
          id: clientId,
          resourceId: selectedResource?._id
        });
        addAlert(t("resourceDeletedSuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError("clients:resourceDeletedError", error);
      }
    }
  });
  if (!resources) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const noData = resources.length === 0;
  const searching = Object.keys(search).length !== 0;
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(DeleteConfirm, null), (!noData || searching) && /* @__PURE__ */ React.createElement(PaginatingTableToolbar, {
    count: resources.length,
    first,
    max,
    onNextClick: setFirst,
    onPreviousClick: setFirst,
    onPerPageSelect: (first2, max2) => {
      setFirst(first2);
      setMax(max2);
    },
    toolbarItem: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(SearchDropdown, {
      search,
      onSearch: setSearch,
      isResource: true
    })), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "createResource",
      component: (props) => /* @__PURE__ */ React.createElement(Link, {
        ...props,
        to: toCreateResource({realm, id: clientId})
      })
    }, t("createResource"))))
  }, !noData && /* @__PURE__ */ React.createElement(TableComposable, {
    "aria-label": t("resources"),
    variant: "compact"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(Th, null, t("common:name")), /* @__PURE__ */ React.createElement(Th, null, t("common:type")), /* @__PURE__ */ React.createElement(Th, null, t("owner")), /* @__PURE__ */ React.createElement(Th, null, t("uris")), /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(Th, null))), resources.map((resource, rowIndex) => /* @__PURE__ */ React.createElement(Tbody, {
    key: resource._id,
    isExpanded: resource.isExpanded
  }, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Td, {
    expand: {
      rowIndex,
      isExpanded: resource.isExpanded,
      onToggle: (_, rowIndex2) => {
        const rows = resources.map((resource2, index) => index === rowIndex2 ? {
          ...resource2,
          isExpanded: !resource2.isExpanded
        } : resource2);
        setResources(rows);
      }
    }
  }), /* @__PURE__ */ React.createElement(Td, {
    "data-testid": `name-column-${resource.name}`
  }, /* @__PURE__ */ React.createElement(Link, {
    to: toResourceDetails({
      realm,
      id: clientId,
      resourceId: resource._id
    })
  }, resource.name)), /* @__PURE__ */ React.createElement(Td, null, resource.type), /* @__PURE__ */ React.createElement(Td, null, resource.owner?.name), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(UriRenderer, {
    row: resource
  })), /* @__PURE__ */ React.createElement(Td, {
    width: 10
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toNewPermission({
        realm,
        id: clientId,
        permissionType: "resource",
        selectedId: resource._id
      })
    })
  }, t("createPermission"))), /* @__PURE__ */ React.createElement(Td, {
    actions: {
      items: [
        {
          title: t("common:delete"),
          onClick: async () => {
            setSelectedResource(resource);
            setPermission(await fetchPermissions(resource._id));
            toggleDeleteDialog();
          }
        }
      ]
    }
  })), /* @__PURE__ */ React.createElement(Tr, {
    key: `child-${resource._id}`,
    isExpanded: resource.isExpanded
  }, /* @__PURE__ */ React.createElement(Td, null), /* @__PURE__ */ React.createElement(Td, {
    colSpan: 4
  }, /* @__PURE__ */ React.createElement(ExpandableRowContent, null, resource.isExpanded && /* @__PURE__ */ React.createElement(DetailCell, {
    clientId,
    id: resource._id,
    uris: resource.uris
  })))))))), noData && searching && /* @__PURE__ */ React.createElement(ListEmptyState, {
    isSearchVariant: true,
    message: t("common:noSearchResults"),
    instructions: t("common:noSearchResultsInstructions")
  }));
};
