import React from "../../_snowpack/pkg/react.js";
import {useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  EmptyState,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  Button,
  Tooltip
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {PlusCircleIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {toNewPermission} from "../routes/NewPermission.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {toUpperCase} from "../../util.js";
const EmptyButton = ({
  permissionType,
  disabled = false,
  clientId
}) => {
  const {t} = useTranslation("clients");
  const {realm} = useRealm();
  const history = useHistory();
  return /* @__PURE__ */ React.createElement(Button, {
    "data-testid": `create-${permissionType}`,
    className: disabled ? "keycloak__permissions__empty_state " : "pf-u-m-sm",
    variant: "secondary",
    onClick: () => !disabled && history.push(toNewPermission({realm, id: clientId, permissionType}))
  }, t(`create${toUpperCase(permissionType)}BasedPermission`));
};
const TooltipEmptyButton = ({
  permissionType,
  disabled,
  ...props
}) => {
  const {t} = useTranslation("clients");
  return disabled ? /* @__PURE__ */ React.createElement(Tooltip, {
    content: t(`no${toUpperCase(permissionType)}CreateHint`)
  }, /* @__PURE__ */ React.createElement(EmptyButton, {
    ...props,
    disabled,
    permissionType
  })) : /* @__PURE__ */ React.createElement(EmptyButton, {
    ...props,
    disabled,
    permissionType
  });
};
export const EmptyPermissionsState = ({
  clientId,
  isResourceEnabled,
  isScopeEnabled
}) => {
  const {t} = useTranslation("clients");
  return /* @__PURE__ */ React.createElement(EmptyState, {
    "data-testid": "empty-state",
    variant: "large"
  }, /* @__PURE__ */ React.createElement(EmptyStateIcon, {
    icon: PlusCircleIcon
  }), /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h1",
    size: "lg"
  }, t("emptyPermissions")), /* @__PURE__ */ React.createElement(EmptyStateBody, null, t("emptyPermissionInstructions")), /* @__PURE__ */ React.createElement(TooltipEmptyButton, {
    permissionType: "resource",
    disabled: isResourceEnabled,
    clientId
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(TooltipEmptyButton, {
    permissionType: "scope",
    disabled: isScopeEnabled,
    clientId
  }));
};
