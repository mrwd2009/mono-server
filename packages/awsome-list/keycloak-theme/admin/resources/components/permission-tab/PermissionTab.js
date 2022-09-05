import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link, useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {Trans, useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  PageSection,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {
  ActionsColumn,
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "../../_snowpack/pkg/@patternfly/react-table.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {toPermissionDetails} from "../../clients/routes/PermissionDetails.js";
import {KeycloakSpinner} from "../keycloak-spinner/KeycloakSpinner.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
import useLocaleSort from "../../utils/useLocaleSort.js";
import {useConfirmDialog} from "../confirm-dialog/ConfirmDialog.js";
import "./permissions-tab.css.proxy.js";
export const PermissionsTab = ({id, type}) => {
  const {t} = useTranslation("common");
  const history = useHistory();
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const [realmId, setRealmId] = useState("");
  const [permission, setPermission] = useState();
  const localeSort = useLocaleSort();
  const togglePermissionEnabled = (enabled) => {
    switch (type) {
      case "clients":
        return adminClient.clients.updateFineGrainPermission({id}, {enabled});
      case "users":
        return adminClient.realms.updateUsersManagementPermissions({
          realm,
          enabled
        });
      case "groups":
        return adminClient.groups.updatePermission({id}, {enabled});
      case "roles":
        return adminClient.roles.updatePermission({id}, {enabled});
      case "identityProviders":
        return adminClient.identityProviders.updatePermission({alias: id}, {enabled});
    }
  };
  useFetch(() => Promise.all([
    adminClient.clients.find({
      search: true,
      clientId: realm === "master" ? "master-realm" : "realm-management"
    }),
    (() => {
      switch (type) {
        case "clients":
          return adminClient.clients.listFineGrainPermissions({id});
        case "users":
          return adminClient.realms.getUsersManagementPermissions({
            realm
          });
        case "groups":
          return adminClient.groups.listPermissions({id});
        case "roles":
          return adminClient.roles.listPermissions({id});
        case "identityProviders":
          return adminClient.identityProviders.listPermissions({
            alias: id
          });
      }
    })()
  ]), ([clients, permission2]) => {
    setRealmId(clients[0]?.id);
    setPermission(permission2);
  }, []);
  const [toggleDisableDialog, DisableConfirm] = useConfirmDialog({
    titleKey: "common:permissionsDisable",
    messageKey: "common:permissionsDisableConfirm",
    continueButtonLabel: "common:confirm",
    onConfirm: async () => {
      const permission2 = await togglePermissionEnabled(false);
      setPermission(permission2);
    }
  });
  if (!permission) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(DisableConfirm, null), /* @__PURE__ */ React.createElement(Card, {
    isFlat: true
  }, /* @__PURE__ */ React.createElement(CardTitle, null, t("permissions")), /* @__PURE__ */ React.createElement(CardBody, null, t(`${type}PermissionsHint`), /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true,
    className: "pf-u-pt-md"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    className: "permission-label",
    label: t("permissionsEnabled"),
    fieldId: "permissionsEnabled",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:permissionsEnabled",
      fieldLabelId: "clients:permissionsEnabled"
    })
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "permissionsEnabled",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: permission.enabled,
    onChange: async (enabled) => {
      if (enabled) {
        const permission2 = await togglePermissionEnabled(enabled);
        setPermission(permission2);
      } else {
        toggleDisableDialog();
      }
    }
  }))))), permission.enabled && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Card, {
    isFlat: true,
    className: "pf-u-mt-lg"
  }, /* @__PURE__ */ React.createElement(CardTitle, null, t("permissionsList")), /* @__PURE__ */ React.createElement(CardBody, null, /* @__PURE__ */ React.createElement(Trans, {
    i18nKey: "common:permissionsListIntro"
  }, " ", /* @__PURE__ */ React.createElement("strong", null, {
    realm: realm === "master" ? "master-realm" : "realm-management"
  }), "."))), /* @__PURE__ */ React.createElement(Card, {
    isFlat: true,
    className: "keycloak__permission__permission-table"
  }, /* @__PURE__ */ React.createElement(CardBody, {
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(TableComposable, {
    "aria-label": t("permissionsList"),
    variant: "compact"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, {
    id: "permissionsScopeName"
  }, t("permissionsScopeName")), /* @__PURE__ */ React.createElement(Th, {
    id: "description"
  }, t("description")))), /* @__PURE__ */ React.createElement(Tbody, null, localeSort(Object.entries(permission.scopePermissions || {}), ([name]) => name).map(([name, id2]) => /* @__PURE__ */ React.createElement(Tr, {
    key: id2
  }, /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(Link, {
    to: toPermissionDetails({
      realm,
      id: realmId,
      permissionType: "scope",
      permissionId: id2
    })
  }, name)), /* @__PURE__ */ React.createElement(Td, null, t(`scopePermissions.${type}.${name}-description`)), /* @__PURE__ */ React.createElement(Td, {
    isActionCell: true
  }, /* @__PURE__ */ React.createElement(ActionsColumn, {
    items: [
      {
        title: t("common:edit"),
        onClick() {
          history.push(toPermissionDetails({
            realm,
            id: realmId,
            permissionType: "scope",
            permissionId: id2
          }));
        }
      }
    ]
  }))))))))));
};
