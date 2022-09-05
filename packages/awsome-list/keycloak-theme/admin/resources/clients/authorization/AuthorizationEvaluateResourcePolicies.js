import React, {useState} from "../../_snowpack/pkg/react.js";
import {
  DescriptionList,
  TextContent,
  TextList,
  TextListItem,
  capitalize
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {Tbody, Tr, Td, ExpandableRowContent} from "../../_snowpack/pkg/@patternfly/react-table.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {DecisionEffect} from "../../_snowpack/pkg/@keycloak/keycloak-admin-client/lib/defs/policyRepresentation.js";
import {Link, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {toPermissionDetails} from "../routes/PermissionDetails.js";
import {toPolicyDetails} from "../routes/PolicyDetails.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
export const AuthorizationEvaluateResourcePolicies = ({
  idx,
  rowIndex,
  outerPolicy,
  resource
}) => {
  const [expanded, setExpanded] = useState(false);
  const {t} = useTranslation("clients");
  const {realm} = useRealm();
  const {clientId} = useParams();
  return /* @__PURE__ */ React.createElement(Tbody, {
    key: idx,
    isExpanded: expanded
  }, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Td, {
    expand: {
      rowIndex,
      isExpanded: expanded,
      onToggle: () => setExpanded((prev) => !prev)
    }
  }), /* @__PURE__ */ React.createElement(Td, {
    "data-testid": `name-column-${resource.resource}`
  }, /* @__PURE__ */ React.createElement(Link, {
    to: toPermissionDetails({
      realm,
      id: clientId,
      permissionType: outerPolicy.policy?.type,
      permissionId: outerPolicy.policy?.id
    })
  }, outerPolicy.policy?.name)), /* @__PURE__ */ React.createElement(Td, {
    id: outerPolicy.status?.toLowerCase()
  }, t(outerPolicy.status?.toLowerCase())), /* @__PURE__ */ React.createElement(Td, null, t(`${outerPolicy.policy?.decisionStrategy?.toLowerCase()}`)), /* @__PURE__ */ React.createElement(Td, null, outerPolicy.status === DecisionEffect.Permit ? resource.policies?.[rowIndex].scopes?.join(", ") : "-"), /* @__PURE__ */ React.createElement(Td, null, outerPolicy.status === DecisionEffect.Deny && resource.policies?.[rowIndex]?.scopes?.length ? resource.policies[rowIndex].scopes?.join(", ") : "-")), /* @__PURE__ */ React.createElement(Tr, {
    key: `child-${resource.resource}`,
    isExpanded: expanded
  }, /* @__PURE__ */ React.createElement(Td, null), /* @__PURE__ */ React.createElement(Td, {
    colSpan: 5
  }, expanded && /* @__PURE__ */ React.createElement(ExpandableRowContent, null, /* @__PURE__ */ React.createElement(DescriptionList, {
    isHorizontal: true,
    className: "keycloak_resource_details"
  }, /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(TextList, null, outerPolicy.associatedPolicies?.map((item) => /* @__PURE__ */ React.createElement(TextListItem, {
    key: "policyDetails"
  }, /* @__PURE__ */ React.createElement(Link, {
    to: toPolicyDetails({
      realm,
      id: clientId,
      policyType: item.policy?.type,
      policyId: item.policy?.id
    })
  }, item.policy?.name), t("votedToStatus", {
    status: capitalize(item.status)
  }))))))))));
};
