import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link, useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Alert,
  AlertVariant,
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
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {PaginatingTableToolbar} from "../../components/table-toolbar/PaginatingTableToolbar.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {toPolicyDetails} from "../routes/PolicyDetails.js";
import {MoreLabel} from "./MoreLabel.js";
import {toUpperCase} from "../../util.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import useToggle from "../../utils/useToggle.js";
import {NewPolicyDialog} from "./NewPolicyDialog.js";
import {toCreatePolicy} from "../routes/NewPolicy.js";
import {toPermissionDetails} from "../routes/PermissionDetails.js";
import {SearchDropdown} from "./SearchDropdown.js";
import {DetailDescriptionLink} from "./DetailDescription.js";
export const AuthorizationPolicies = ({clientId}) => {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const history = useHistory();
  const [policies, setPolicies] = useState();
  const [selectedPolicy, setSelectedPolicy] = useState();
  const [policyProviders, setPolicyProviders] = useState();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const [max, setMax] = useState(10);
  const [first, setFirst] = useState(0);
  const [search, setSearch] = useState({});
  const [newDialog, toggleDialog] = useToggle();
  useFetch(async () => {
    const policies2 = await adminClient.clients.listPolicies({
      first,
      max: max + 1,
      id: clientId,
      permission: "false",
      ...search
    });
    return await Promise.all([
      adminClient.clients.listPolicyProviders({id: clientId}),
      ...policies2.map(async (policy) => {
        const dependentPolicies = await adminClient.clients.listDependentPolicies({
          id: clientId,
          policyId: policy.id
        });
        return {
          ...policy,
          dependentPolicies,
          isExpanded: false
        };
      })
    ]);
  }, ([providers, ...policies2]) => {
    setPolicyProviders(providers.filter((p) => p.type !== "resource" && p.type !== "scope"));
    setPolicies(policies2);
  }, [key, search, first, max]);
  const DependentPoliciesRenderer = ({
    row
  }) => {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, row.dependentPolicies?.[0]?.name, " ", /* @__PURE__ */ React.createElement(MoreLabel, {
      array: row.dependentPolicies
    }));
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "clients:deletePolicy",
    children: /* @__PURE__ */ React.createElement(React.Fragment, null, t("deletePolicyConfirm"), selectedPolicy?.dependentPolicies && selectedPolicy.dependentPolicies.length > 0 && /* @__PURE__ */ React.createElement(Alert, {
      variant: "warning",
      isInline: true,
      isPlain: true,
      title: t("deletePolicyWarning"),
      className: "pf-u-pt-lg"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "pf-u-pt-xs"
    }, selectedPolicy.dependentPolicies.map((policy) => /* @__PURE__ */ React.createElement("strong", {
      key: policy.id,
      className: "pf-u-pr-md"
    }, policy.name))))),
    continueButtonLabel: "clients:confirm",
    onConfirm: async () => {
      try {
        await adminClient.clients.delPolicy({
          id: clientId,
          policyId: selectedPolicy?.id
        });
        addAlert(t("policyDeletedSuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError("clients:policyDeletedError", error);
      }
    }
  });
  if (!policies) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const noData = policies.length === 0;
  const searching = Object.keys(search).length !== 0;
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(DeleteConfirm, null), (!noData || searching) && /* @__PURE__ */ React.createElement(React.Fragment, null, newDialog && /* @__PURE__ */ React.createElement(NewPolicyDialog, {
    policyProviders,
    onSelect: (p) => history.push(toCreatePolicy({id: clientId, realm, policyType: p.type})),
    toggleDialog
  }), /* @__PURE__ */ React.createElement(PaginatingTableToolbar, {
    count: policies.length,
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
    })), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "createPolicy",
      onClick: toggleDialog
    }, t("createPolicy"))))
  }, !noData && /* @__PURE__ */ React.createElement(TableComposable, {
    "aria-label": t("resources"),
    variant: "compact"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(Th, null, t("common:name")), /* @__PURE__ */ React.createElement(Th, null, t("common:type")), /* @__PURE__ */ React.createElement(Th, null, t("dependentPermission")), /* @__PURE__ */ React.createElement(Th, null, t("common:description")), /* @__PURE__ */ React.createElement(Th, null))), policies.map((policy, rowIndex) => /* @__PURE__ */ React.createElement(Tbody, {
    key: policy.id,
    isExpanded: policy.isExpanded
  }, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Td, {
    expand: {
      rowIndex,
      isExpanded: policy.isExpanded,
      onToggle: (_, rowIndex2) => {
        const rows = policies.map((policy2, index) => index === rowIndex2 ? {...policy2, isExpanded: !policy2.isExpanded} : policy2);
        setPolicies(rows);
      }
    }
  }), /* @__PURE__ */ React.createElement(Td, {
    "data-testid": `name-column-${policy.name}`
  }, /* @__PURE__ */ React.createElement(Link, {
    to: toPolicyDetails({
      realm,
      id: clientId,
      policyType: policy.type,
      policyId: policy.id
    })
  }, policy.name)), /* @__PURE__ */ React.createElement(Td, null, toUpperCase(policy.type)), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(DependentPoliciesRenderer, {
    row: policy
  })), /* @__PURE__ */ React.createElement(Td, null, policy.description), /* @__PURE__ */ React.createElement(Td, {
    actions: {
      items: [
        {
          title: t("common:delete"),
          onClick: async () => {
            setSelectedPolicy(policy);
            toggleDeleteDialog();
          }
        }
      ]
    }
  })), /* @__PURE__ */ React.createElement(Tr, {
    key: `child-${policy.id}`,
    isExpanded: policy.isExpanded
  }, /* @__PURE__ */ React.createElement(Td, null), /* @__PURE__ */ React.createElement(Td, {
    colSpan: 4
  }, /* @__PURE__ */ React.createElement(ExpandableRowContent, null, policy.isExpanded && /* @__PURE__ */ React.createElement(DescriptionList, {
    isHorizontal: true,
    className: "keycloak_resource_details"
  }, /* @__PURE__ */ React.createElement(DetailDescriptionLink, {
    name: "dependentPermission",
    array: policy.dependentPolicies,
    convert: (p) => p.name,
    link: (permission) => toPermissionDetails({
      realm,
      id: clientId,
      permissionId: permission.id,
      permissionType: permission.type
    })
  })))))))))), noData && searching && /* @__PURE__ */ React.createElement(ListEmptyState, {
    isSearchVariant: true,
    message: t("common:noSearchResults"),
    instructions: t("common:noSearchResultsInstructions")
  }), noData && !searching && /* @__PURE__ */ React.createElement(React.Fragment, null, newDialog && /* @__PURE__ */ React.createElement(NewPolicyDialog, {
    policyProviders: policyProviders?.filter((p) => p.type !== "aggregate"),
    onSelect: (p) => history.push(toCreatePolicy({id: clientId, realm, policyType: p.type})),
    toggleDialog
  }), /* @__PURE__ */ React.createElement(ListEmptyState, {
    message: t("emptyPolicies"),
    instructions: t("emptyPoliciesInstructions"),
    primaryActionText: t("createPolicy"),
    onPrimaryAction: toggleDialog
  })));
};
