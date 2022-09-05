import React from "../_snowpack/pkg/react.js";
import {Link} from "../_snowpack/pkg/react-router-dom.js";
import {Tooltip} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {toClient} from "../clients/routes/Client.js";
import {toGroups} from "../groups/routes/Groups.js";
import {toClientScope} from "../client-scopes/routes/ClientScope.js";
import {toUser} from "../user/routes/User.js";
import {toRealmRole} from "../realm-roles/routes/RealmRole.js";
import {toFlow} from "../authentication/routes/Flow.js";
const MAX_TEXT_LENGTH = 38;
const Truncate = ({
  text,
  children
}) => {
  const definedText = text || "";
  const needsTruncation = definedText.length > MAX_TEXT_LENGTH;
  const truncatedText = definedText.substring(0, MAX_TEXT_LENGTH);
  return needsTruncation ? /* @__PURE__ */ React.createElement(Tooltip, {
    content: text
  }, children(truncatedText + "…")) : children(definedText);
};
const isLinkable = (event) => {
  if (event.operationType === "DELETE") {
    return false;
  }
  return event.resourceType === "USER" || event.resourceType === "GROUP_MEMBERSHIP" || event.resourceType === "GROUP" || event.resourceType === "CLIENT" || event.resourceType?.startsWith("AUTHORIZATION_RESOURCE") || event.resourceType === "CLIENT_SCOPE" || event.resourceType === "AUTH_FLOW" || event.resourcePath?.startsWith("roles-by-id");
};
const idRegex = new RegExp(/([0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12})/);
const createLink = (realm, event) => {
  const part = idRegex.exec(event.resourcePath);
  if (!part) {
    console.warn("event didn't contain a valid link", event);
    return "";
  }
  const id = part[1];
  if (event.resourceType === "CLIENT" || event.resourceType?.startsWith("AUTHORIZATION_RESOURCE")) {
    return toClient({
      realm,
      clientId: id,
      tab: event.resourceType === "CLIENT" ? "settings" : "authorization"
    });
  }
  if (event.resourceType === "GROUP") {
    return toGroups({realm, id});
  }
  if (event.resourceType === "CLIENT_SCOPE") {
    return toClientScope({realm, id, tab: "settings"});
  }
  if (event.resourceType === "USER" || event.resourceType === "GROUP_MEMBERSHIP") {
    return toUser({realm, id, tab: "settings"});
  }
  if (event.resourceType === "AUTH_FLOW") {
    return toFlow({realm, id, usedBy: "-"});
  }
  if (event.resourcePath?.startsWith("roles-by-id")) {
    return toRealmRole({realm, id});
  }
  return "";
};
export const ResourceLink = ({event}) => {
  const {realm} = useRealm();
  return /* @__PURE__ */ React.createElement(Truncate, {
    text: event.resourcePath
  }, (text) => isLinkable(event) ? /* @__PURE__ */ React.createElement(Link, {
    to: createLink(realm, event)
  }, text) : /* @__PURE__ */ React.createElement("span", null, text));
};
export const CellResourceLinkRenderer = (adminEvent) => /* @__PURE__ */ React.createElement(ResourceLink, {
  event: adminEvent
});
