import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link, useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  ButtonVariant,
  DescriptionList,
  Dropdown,
  DropdownItem,
  DropdownToggle,
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
import {useAlerts} from "../../components/alert/Alerts.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import useToggle from "../../utils/useToggle.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {SearchDropdown} from "./SearchDropdown.js";
import {MoreLabel} from "./MoreLabel.js";
import {DetailDescriptionLink} from "./DetailDescription.js";
import {EmptyPermissionsState} from "./EmptyPermissionsState.js";
import {toNewPermission} from "../routes/NewPermission.js";
import {toPermissionDetails} from "../routes/PermissionDetails.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import {toPolicyDetails} from "../routes/PolicyDetails.js";
import "./permissions.css.proxy.js";
export const AuthorizationPermissions = ({clientId}) => {
  const {t} = useTranslation("clients");
  const history = useHistory();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const [permissions, setPermissions] = useState();
  const [selectedPermission, setSelectedPermission] = useState();
  const [policyProviders, setPolicyProviders] = useState();
  const [disabledCreate, setDisabledCreate] = useState();
  const [createOpen, toggleCreate] = useToggle();
  const [search, setSearch] = useState({});
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const [max, setMax] = useState(10);
  const [first, setFirst] = useState(0);
  const AssociatedPoliciesRenderer = ({
    row
  }) => {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, row.associatedPolicies?.[0]?.name, " ", /* @__PURE__ */ React.createElement(MoreLabel, {
      array: row.associatedPolicies
    }));
  };
  useFetch(async () => {
    const permissions2 = await adminClient.clients.findPermissions({
      first,
      max: max + 1,
      id: clientId,
      ...search
    });
    return await Promise.all(permissions2.map(async (permission) => {
      const associatedPolicies = await adminClient.clients.getAssociatedPolicies({
        id: clientId,
        permissionId: permission.id
      });
      return {
        ...permission,
        associatedPolicies,
        isExpanded: false
      };
    }));
  }, setPermissions, [key, search, first, max]);
  useFetch(async () => {
    const params = {
      first: 0,
      max: 1
    };
    const [policies, resources, scopes] = await Promise.all([
      adminClient.clients.listPolicyProviders({
        id: clientId
      }),
      adminClient.clients.listResources({...params, id: clientId}),
      adminClient.clients.listAllScopes({...params, id: clientId})
    ]);
    return {
      policies: policies.filter((p) => p.type === "resource" || p.type === "scope"),
      resources: resources.length !== 1,
      scopes: scopes.length !== 1
    };
  }, ({policies, resources, scopes}) => {
    setPolicyProviders(policies);
    setDisabledCreate({resources, scopes});
  }, []);
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "clients:deletePermission",
    messageKey: t("deletePermissionConfirm", {
      permission: selectedPermission?.name
    }),
    continueButtonVariant: ButtonVariant.danger,
    continueButtonLabel: "clients:confirm",
    onConfirm: async () => {
      try {
        await adminClient.clients.delPermission({
          id: clientId,
          type: selectedPermission?.type,
          permissionId: selectedPermission?.id
        });
        addAlert(t("permissionDeletedSuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError("clients:permissionDeletedError", error);
      }
    }
  });
  if (!permissions) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const noData = permissions.length === 0;
  const searching = Object.keys(search).length !== 0;
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(DeleteConfirm, null), (!noData || searching) && /* @__PURE__ */ React.createElement(PaginatingTableToolbar, {
    count: permissions.length,
    first,
    max,
    onNextClick: setFirst,
    onPreviousClick: setFirst,
    onPerPageSelect: (first2, max2) => {
      setFirst(first2);
      setMax(max2);
    },
    toolbarItem: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(SearchDropdown, {
      types: policyProviders,
      search,
      onSearch: setSearch
    })), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Dropdown, {
      toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
        onToggle: toggleCreate,
        isPrimary: true,
        "data-testid": "permissionCreateDropdown"
      }, t("createPermission")),
      isOpen: createOpen,
      dropdownItems: [
        /* @__PURE__ */ React.createElement(DropdownItem, {
          "data-testid": "create-resource",
          key: "createResourceBasedPermission",
          isDisabled: disabledCreate?.resources,
          component: "button",
          onClick: () => history.push(toNewPermission({
            realm,
            id: clientId,
            permissionType: "resource"
          }))
        }, t("createResourceBasedPermission")),
        /* @__PURE__ */ React.createElement(DropdownItem, {
          "data-testid": "create-scope",
          key: "createScopeBasedPermission",
          isDisabled: disabledCreate?.scopes,
          component: "button",
          onClick: () => history.push(toNewPermission({
            realm,
            id: clientId,
            permissionType: "scope"
          }))
        }, t("createScopeBasedPermission"))
      ]
    })))
  }, !noData && /* @__PURE__ */ React.createElement(TableComposable, {
    "aria-label": t("resources"),
    variant: "compact"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(Th, null, t("common:name")), /* @__PURE__ */ React.createElement(Th, null, t("common:type")), /* @__PURE__ */ React.createElement(Th, null, t("associatedPolicy")), /* @__PURE__ */ React.createElement(Th, null, t("common:description")), /* @__PURE__ */ React.createElement(Th, null))), permissions.map((permission, rowIndex) => /* @__PURE__ */ React.createElement(Tbody, {
    key: permission.id,
    isExpanded: permission.isExpanded
  }, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Td, {
    expand: {
      rowIndex,
      isExpanded: permission.isExpanded,
      onToggle: (_, rowIndex2) => {
        const rows = permissions.map((p, index) => index === rowIndex2 ? {...p, isExpanded: !p.isExpanded} : p);
        setPermissions(rows);
      }
    }
  }), /* @__PURE__ */ React.createElement(Td, {
    "data-testid": `name-column-${permission.name}`
  }, /* @__PURE__ */ React.createElement(Link, {
    to: toPermissionDetails({
      realm,
      id: clientId,
      permissionType: permission.type,
      permissionId: permission.id
    })
  }, permission.name)), /* @__PURE__ */ React.createElement(Td, null, policyProviders?.find((p) => p.type === permission.type)?.name), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(AssociatedPoliciesRenderer, {
    row: permission
  })), /* @__PURE__ */ React.createElement(Td, null, permission.description), /* @__PURE__ */ React.createElement(Td, {
    actions: {
      items: [
        {
          title: t("common:delete"),
          onClick: async () => {
            setSelectedPermission(permission);
            toggleDeleteDialog();
          }
        }
      ]
    }
  })), /* @__PURE__ */ React.createElement(Tr, {
    key: `child-${permission.id}`,
    isExpanded: permission.isExpanded
  }, /* @__PURE__ */ React.createElement(Td, null), /* @__PURE__ */ React.createElement(Td, {
    colSpan: 5
  }, /* @__PURE__ */ React.createElement(ExpandableRowContent, null, permission.isExpanded && /* @__PURE__ */ React.createElement(DescriptionList, {
    isHorizontal: true,
    className: "keycloak_resource_details"
  }, /* @__PURE__ */ React.createElement(DetailDescriptionLink, {
    name: "associatedPolicy",
    array: permission.associatedPolicies,
    convert: (p) => p.name,
    link: (p) => toPolicyDetails({
      id: clientId,
      realm,
      policyId: p.id,
      policyType: p.type
    })
  }))))))))), noData && !searching && /* @__PURE__ */ React.createElement(EmptyPermissionsState, {
    clientId,
    isResourceEnabled: disabledCreate?.resources,
    isScopeEnabled: disabledCreate?.scopes
  }), noData && searching && /* @__PURE__ */ React.createElement(ListEmptyState, {
    isSearchVariant: true,
    message: t("common:noSearchResults"),
    instructions: t("common:noSearchResultsInstructions")
  }));
};
