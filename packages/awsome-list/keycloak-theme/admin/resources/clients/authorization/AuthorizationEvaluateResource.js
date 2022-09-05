import React, {useState} from "../../_snowpack/pkg/react.js";
import {
  ExpandableRowContent,
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "../../_snowpack/pkg/@patternfly/react-table.js";
import {DescriptionList} from "../../_snowpack/pkg/@patternfly/react-core/dist/esm/components.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {AuthorizationEvaluateResourcePolicies} from "./AuthorizationEvaluateResourcePolicies.js";
export const AuthorizationEvaluateResource = ({
  rowIndex,
  resource,
  evaluateResults
}) => {
  const [expanded, setExpanded] = useState(false);
  const {t} = useTranslation("clients");
  return /* @__PURE__ */ React.createElement(Tbody, {
    isExpanded: expanded
  }, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Td, {
    expand: {
      rowIndex,
      isExpanded: expanded,
      onToggle: () => setExpanded((prev) => !prev)
    }
  }), /* @__PURE__ */ React.createElement(Td, {
    "data-testid": `name-column-${resource.resource}`
  }, resource.resource?.name), /* @__PURE__ */ React.createElement(Td, {
    id: resource.status?.toLowerCase()
  }, t(`${resource.status?.toLowerCase()}`)), /* @__PURE__ */ React.createElement(Td, null, resource.allowedScopes?.length ? resource.allowedScopes.map((item) => item.name) : "-")), /* @__PURE__ */ React.createElement(Tr, {
    key: `child-${resource.resource}`,
    isExpanded: expanded
  }, /* @__PURE__ */ React.createElement(Td, null), /* @__PURE__ */ React.createElement(Td, {
    colSpan: 5
  }, /* @__PURE__ */ React.createElement(ExpandableRowContent, null, expanded && /* @__PURE__ */ React.createElement(DescriptionList, {
    isHorizontal: true,
    className: "keycloak_resource_details"
  }, /* @__PURE__ */ React.createElement(TableComposable, {
    "aria-label": t("evaluationResults")
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(Th, null, t("permission")), /* @__PURE__ */ React.createElement(Th, null, t("results")), /* @__PURE__ */ React.createElement(Th, null, t("decisionStrategy")), /* @__PURE__ */ React.createElement(Th, null, t("grantedScopes")), /* @__PURE__ */ React.createElement(Th, null, t("deniedScopes")), /* @__PURE__ */ React.createElement(Th, null))), Object.values(evaluateResults[rowIndex].policies).map((outerPolicy, idx) => /* @__PURE__ */ React.createElement(AuthorizationEvaluateResourcePolicies, {
    key: idx,
    idx,
    rowIndex,
    outerPolicy,
    resource
  }))))))));
};
