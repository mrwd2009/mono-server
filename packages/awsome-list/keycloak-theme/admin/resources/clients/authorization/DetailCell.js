import React, {useState} from "../../_snowpack/pkg/react.js";
import {DescriptionList} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {DetailDescription, DetailDescriptionLink} from "./DetailDescription.js";
import {toScopeDetails} from "../routes/Scope.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {toPermissionDetails} from "../routes/PermissionDetails.js";
import "./detail-cell.css.proxy.js";
export const DetailCell = ({id, clientId, uris}) => {
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const [scope, setScope] = useState();
  const [permissions, setPermissions] = useState();
  useFetch(() => Promise.all([
    adminClient.clients.listScopesByResource({
      id: clientId,
      resourceName: id
    }),
    adminClient.clients.listPermissionsByResource({
      id: clientId,
      resourceId: id
    })
  ]), ([scopes, permissions2]) => {
    setScope(scopes);
    setPermissions(permissions2);
  }, []);
  if (!permissions || !scope) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(DescriptionList, {
    isHorizontal: true,
    className: "keycloak_resource_details"
  }, /* @__PURE__ */ React.createElement(DetailDescription, {
    name: "uris",
    array: uris
  }), /* @__PURE__ */ React.createElement(DetailDescriptionLink, {
    name: "scopes",
    array: scope,
    convert: (s) => s.name,
    link: (scope2) => toScopeDetails({id: clientId, realm, scopeId: scope2.id})
  }), /* @__PURE__ */ React.createElement(DetailDescriptionLink, {
    name: "associatedPermissions",
    array: permissions,
    convert: (p) => p.name,
    link: (permission) => toPermissionDetails({
      id: clientId,
      realm,
      permissionId: permission.id,
      permissionType: "resource"
    })
  }));
};
