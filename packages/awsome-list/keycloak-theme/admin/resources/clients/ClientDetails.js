import {
  Alert,
  AlertVariant,
  ButtonVariant,
  Divider,
  DropdownItem,
  Label,
  PageSection,
  Tab,
  TabTitleText,
  Tooltip
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {InfoCircleIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import {cloneDeep, sortBy} from "../_snowpack/pkg/lodash-es.js";
import React, {useMemo, useState} from "../_snowpack/pkg/react.js";
import {Controller, FormProvider, useForm, useWatch} from "../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useHistory, useParams} from "../_snowpack/pkg/react-router-dom.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {
  ConfirmDialogModal,
  useConfirmDialog
} from "../components/confirm-dialog/ConfirmDialog.js";
import {DownloadDialog} from "../components/download-dialog/DownloadDialog.js";
import {
  stringToMultiline,
  toStringValue
} from "../components/multi-line-input/multi-line-convert.js";
import {
  ViewHeader
} from "../components/view-header/ViewHeader.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {RolesList} from "../realm-roles/RolesList.js";
import {
  convertFormValuesToObject,
  convertToFormValues,
  exportClient
} from "../util.js";
import useToggle from "../utils/useToggle.js";
import {AdvancedTab} from "./AdvancedTab.js";
import {ClientSettings} from "./ClientSettings.js";
import {ClientSessions} from "./ClientSessions.js";
import {Credentials} from "./credentials/Credentials.js";
import {Keys} from "./keys/Keys.js";
import {toClient} from "./routes/Client.js";
import {toClients} from "./routes/Clients.js";
import {ClientScopes} from "./scopes/ClientScopes.js";
import {EvaluateScopes} from "./scopes/EvaluateScopes.js";
import {ServiceAccount} from "./service-account/ServiceAccount.js";
import {isRealmClient, getProtocolName} from "./utils.js";
import {SamlKeys} from "./keys/SamlKeys.js";
import {AuthorizationSettings} from "./authorization/Settings.js";
import {AuthorizationResources} from "./authorization/Resources.js";
import {AuthorizationScopes} from "./authorization/Scopes.js";
import {AuthorizationPolicies} from "./authorization/Policies.js";
import {AuthorizationPermissions} from "./authorization/Permissions.js";
import {AuthorizationEvaluate} from "./authorization/AuthorizationEvaluate.js";
import {
  routableTab,
  RoutableTabs
} from "../components/routable-tabs/RoutableTabs.js";
import {
  toAuthorizationTab
} from "./routes/AuthenticationTab.js";
import {toClientScopesTab} from "./routes/ClientScopeTab.js";
import {AuthorizationExport} from "./authorization/AuthorizationExport.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import {PermissionsTab} from "../components/permission-tab/PermissionTab.js";
import {useAccess} from "../context/access/Access.js";
const ClientDetailHeader = ({
  onChange,
  value,
  save,
  client,
  toggleDownloadDialog,
  toggleDeleteDialog
}) => {
  const {t} = useTranslation("clients");
  const [toggleDisableDialog, DisableConfirm] = useConfirmDialog({
    titleKey: "clients:disableConfirmTitle",
    messageKey: "clients:disableConfirm",
    continueButtonLabel: "common:disable",
    onConfirm: () => {
      onChange(!value);
      save();
    }
  });
  const badges = useMemo(() => {
    const protocolName = getProtocolName(t, client.protocol ?? "openid-connect");
    const text = client.bearerOnly ? /* @__PURE__ */ React.createElement(Tooltip, {
      "data-testid": "bearer-only-explainer-tooltip",
      content: t("explainBearerOnly")
    }, /* @__PURE__ */ React.createElement(Label, {
      "data-testid": "bearer-only-explainer-label",
      icon: /* @__PURE__ */ React.createElement(InfoCircleIcon, null)
    }, protocolName)) : /* @__PURE__ */ React.createElement(Label, null, protocolName);
    return [{text}];
  }, [client, t]);
  const {hasAccess} = useAccess();
  const isManager = hasAccess("manage-clients") || client.access?.configure;
  const dropdownItems = [
    /* @__PURE__ */ React.createElement(DropdownItem, {
      key: "download",
      onClick: toggleDownloadDialog
    }, t("downloadAdapterConfig")),
    /* @__PURE__ */ React.createElement(DropdownItem, {
      key: "export",
      onClick: () => exportClient(client)
    }, t("common:export")),
    ...!isRealmClient(client) && isManager ? [
      /* @__PURE__ */ React.createElement(Divider, {
        key: "divider"
      }),
      /* @__PURE__ */ React.createElement(DropdownItem, {
        "data-testid": "delete-client",
        key: "delete",
        onClick: toggleDeleteDialog
      }, t("common:delete"))
    ] : []
  ];
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DisableConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: client.clientId,
    subKey: "clients:clientsExplain",
    badges,
    divider: false,
    isReadOnly: !isManager,
    helpTextKey: "clients-help:enableDisable",
    dropdownItems,
    isEnabled: value,
    onToggle: (value2) => {
      if (!value2) {
        toggleDisableDialog();
      } else {
        onChange(value2);
        save();
      }
    }
  }));
};
export default function ClientDetails() {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const {profileInfo} = useServerInfo();
  const {hasAccess} = useAccess();
  const permissionsEnabled = !profileInfo?.disabledFeatures?.includes("ADMIN_FINE_GRAINED_AUTHZ") && hasAccess("manage-authorization");
  const hasManageClients = hasAccess("manage-clients");
  const hasViewUsers = hasAccess("view-users");
  const history = useHistory();
  const [downloadDialogOpen, toggleDownloadDialogOpen] = useToggle();
  const [changeAuthenticatorOpen, toggleChangeAuthenticatorOpen] = useToggle();
  const form = useForm({shouldUnregister: false});
  const {clientId} = useParams();
  const [key, setKey] = useState(0);
  const clientAuthenticatorType = useWatch({
    control: form.control,
    name: "clientAuthenticatorType",
    defaultValue: "client-secret"
  });
  const [client, setClient] = useState();
  const loader = async () => {
    const roles = await adminClient.clients.listRoles({id: clientId});
    return sortBy(roles, (role) => role.name?.toUpperCase());
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "clients:clientDeleteConfirmTitle",
    messageKey: "clients:clientDeleteConfirm",
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.clients.del({id: clientId});
        addAlert(t("clientDeletedSuccess"), AlertVariant.success);
        history.push(toClients({realm}));
      } catch (error) {
        addError("clients:clientDeleteError", error);
      }
    }
  });
  const setupForm = (client2) => {
    form.reset({...client2});
    convertToFormValues(client2, form.setValue);
    form.setValue("attributes.request.uris", stringToMultiline(client2.attributes?.["request.uris"]));
    if (client2.attributes?.["acr.loa.map"]) {
      form.setValue("attributes.acr.loa.map", Object.entries(JSON.parse(client2.attributes["acr.loa.map"])).flatMap(([key2, value]) => ({key: key2, value})));
    }
    if (client2.attributes?.["default.acr.values"]) {
      form.setValue("attributes.default.acr.values", stringToMultiline(client2.attributes["default.acr.values"]));
    }
    if (client2.attributes?.["post.logout.redirect.uris"]) {
      form.setValue("attributes.post.logout.redirect.uris", stringToMultiline(client2.attributes["post.logout.redirect.uris"]));
    }
    Object.entries(client2.attributes || {}).filter(([key2]) => key2.startsWith("saml.server.signature")).map(([key2, value]) => form.setValue("attributes." + key2.replaceAll(".", "$"), value));
  };
  useFetch(() => adminClient.clients.findOne({id: clientId}), (fetchedClient) => {
    if (!fetchedClient) {
      throw new Error(t("common:notFound"));
    }
    setClient(cloneDeep(fetchedClient));
    setupForm(fetchedClient);
  }, [clientId, key]);
  const save = async ({confirmed = false, messageKey = "clientSaveSuccess"} = {
    confirmed: false,
    messageKey: "clientSaveSuccess"
  }) => {
    if (await form.trigger()) {
      if (!client?.publicClient && client?.clientAuthenticatorType !== clientAuthenticatorType && !confirmed) {
        toggleChangeAuthenticatorOpen();
        return;
      }
      const values = form.getValues();
      if (values.attributes?.request.uris) {
        values.attributes["request.uris"] = toStringValue(values.attributes.request.uris);
      }
      if (values.attributes?.default?.acr?.values) {
        values.attributes["default.acr.values"] = toStringValue(values.attributes.default.acr.values);
      }
      if (values.attributes?.post.logout.redirect.uris) {
        values.attributes["post.logout.redirect.uris"] = toStringValue(values.attributes.post.logout.redirect.uris);
      }
      const submittedClient = convertFormValuesToObject(values);
      Object.entries(values.attributes || {}).filter(([key2]) => key2.includes("$")).map(([key2, value]) => submittedClient.attributes[key2.replaceAll("$", ".")] = value);
      if (submittedClient.attributes?.["acr.loa.map"]) {
        submittedClient.attributes["acr.loa.map"] = JSON.stringify(Object.fromEntries(submittedClient.attributes["acr.loa.map"].filter(({key: key2}) => key2 !== "").map(({key: key2, value}) => [key2, value])));
      }
      try {
        const newClient = {
          ...client,
          ...submittedClient
        };
        newClient.clientId = newClient.clientId?.trim();
        await adminClient.clients.update({id: clientId}, newClient);
        setupForm(newClient);
        setClient(newClient);
        addAlert(t(messageKey), AlertVariant.success);
      } catch (error) {
        addError("clients:clientSaveError", error);
      }
    }
  };
  if (!client) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const route = (tab) => routableTab({
    to: toClient({
      realm,
      clientId,
      tab
    }),
    history
  });
  const authenticationRoute = (tab) => routableTab({
    to: toAuthorizationTab({
      realm,
      clientId,
      tab
    }),
    history
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ConfirmDialogModal, {
    continueButtonLabel: "common:yes",
    titleKey: t("changeAuthenticatorConfirmTitle", {
      clientAuthenticatorType
    }),
    open: changeAuthenticatorOpen,
    toggleDialog: toggleChangeAuthenticatorOpen,
    onConfirm: () => save({confirmed: true})
  }, /* @__PURE__ */ React.createElement(React.Fragment, null, t("changeAuthenticatorConfirm", {
    clientAuthenticatorType
  }), clientAuthenticatorType === "client-jwt" && /* @__PURE__ */ React.createElement(Alert, {
    variant: "info",
    isInline: true,
    title: t("signedJWTConfirm")
  }))), /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(DownloadDialog, {
    id: client.id,
    protocol: client.protocol,
    open: downloadDialogOpen,
    toggleDialog: toggleDownloadDialogOpen
  }), /* @__PURE__ */ React.createElement(Controller, {
    name: "enabled",
    control: form.control,
    defaultValue: true,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(ClientDetailHeader, {
      value,
      onChange,
      client,
      save,
      toggleDeleteDialog,
      toggleDownloadDialog: toggleDownloadDialogOpen
    })
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(RoutableTabs, {
    "data-testid": "client-tabs",
    isBox: true,
    mountOnEnter: true
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "settings",
    "data-testid": "clientSettingsTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:settings")),
    ...route("settings")
  }, /* @__PURE__ */ React.createElement(ClientSettings, {
    client,
    save: () => save(),
    reset: () => setupForm(client)
  })), (!client.publicClient && !isRealmClient(client) || client.protocol === "saml") && /* @__PURE__ */ React.createElement(Tab, {
    id: "keys",
    "data-testid": "keysTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("keys")),
    ...route("keys")
  }, client.protocol === "openid-connect" && /* @__PURE__ */ React.createElement(Keys, {
    clientId,
    save,
    hasConfigureAccess: client.access?.configure
  }), client.protocol === "saml" && /* @__PURE__ */ React.createElement(SamlKeys, {
    clientId,
    save
  })), !client.publicClient && !isRealmClient(client) && (hasManageClients || client.access?.configure) && /* @__PURE__ */ React.createElement(Tab, {
    id: "credentials",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("credentials")),
    ...route("credentials")
  }, /* @__PURE__ */ React.createElement(Credentials, {
    key,
    client,
    save,
    refresh: () => setKey(key + 1)
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "roles",
    "data-testid": "rolesTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("roles")),
    ...route("roles")
  }, /* @__PURE__ */ React.createElement(RolesList, {
    loader,
    paginated: false,
    messageBundle: "clients",
    isReadOnly: !(hasManageClients || client.access?.configure)
  })), !isRealmClient(client) && !client.bearerOnly && /* @__PURE__ */ React.createElement(Tab, {
    id: "clientScopes",
    "data-testid": "clientScopesTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("clientScopes")),
    ...route("clientScopes")
  }, /* @__PURE__ */ React.createElement(RoutableTabs, {
    defaultLocation: toClientScopesTab({
      realm,
      clientId,
      tab: "setup"
    })
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "setup",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("setup")),
    ...routableTab({
      to: toClientScopesTab({
        realm,
        clientId,
        tab: "setup"
      }),
      history
    })
  }, /* @__PURE__ */ React.createElement(ClientScopes, {
    clientName: client.clientId,
    clientId,
    protocol: client.protocol,
    fineGrainedAccess: client.access?.manage
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "evaluate",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("evaluate")),
    ...routableTab({
      to: toClientScopesTab({
        realm,
        clientId,
        tab: "evaluate"
      }),
      history
    })
  }, /* @__PURE__ */ React.createElement(EvaluateScopes, {
    clientId,
    protocol: client.protocol
  })))), client.authorizationServicesEnabled && /* @__PURE__ */ React.createElement(Tab, {
    id: "authorization",
    "data-testid": "authorizationTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("authorization")),
    ...route("authorization")
  }, /* @__PURE__ */ React.createElement(RoutableTabs, {
    mountOnEnter: true,
    unmountOnExit: true,
    defaultLocation: toAuthorizationTab({
      realm,
      clientId,
      tab: "settings"
    })
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "settings",
    "data-testid": "authorizationSettings",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("settings")),
    ...authenticationRoute("settings")
  }, /* @__PURE__ */ React.createElement(AuthorizationSettings, {
    clientId
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "resources",
    "data-testid": "authorizationResources",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("resources")),
    ...authenticationRoute("resources")
  }, /* @__PURE__ */ React.createElement(AuthorizationResources, {
    clientId
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "scopes",
    "data-testid": "authorizationScopes",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("scopes")),
    ...authenticationRoute("scopes")
  }, /* @__PURE__ */ React.createElement(AuthorizationScopes, {
    clientId
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "policies",
    "data-testid": "authorizationPolicies",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("policies")),
    ...authenticationRoute("policies")
  }, /* @__PURE__ */ React.createElement(AuthorizationPolicies, {
    clientId
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "permissions",
    "data-testid": "authorizationPermissions",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:permissions")),
    ...authenticationRoute("permissions")
  }, /* @__PURE__ */ React.createElement(AuthorizationPermissions, {
    clientId
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "evaluate",
    "data-testid": "authorizationEvaluate",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("evaluate")),
    ...authenticationRoute("evaluate")
  }, /* @__PURE__ */ React.createElement(AuthorizationEvaluate, {
    client,
    save
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "export",
    "data-testid": "authorizationExport",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:export")),
    ...authenticationRoute("export")
  }, /* @__PURE__ */ React.createElement(AuthorizationExport, null)))), client.serviceAccountsEnabled && hasViewUsers && /* @__PURE__ */ React.createElement(Tab, {
    id: "serviceAccount",
    "data-testid": "serviceAccountTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("serviceAccount")),
    ...route("serviceAccount")
  }, /* @__PURE__ */ React.createElement(ServiceAccount, {
    client
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "sessions",
    "data-testid": "sessionsTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("sessions")),
    ...route("sessions")
  }, /* @__PURE__ */ React.createElement(ClientSessions, {
    client
  })), permissionsEnabled && (hasManageClients || client.access?.manage) && /* @__PURE__ */ React.createElement(Tab, {
    id: "permissions",
    "data-testid": "permissionsTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:permissions")),
    ...route("permissions")
  }, /* @__PURE__ */ React.createElement(PermissionsTab, {
    id: client.id,
    type: "clients"
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "advanced",
    "data-testid": "advancedTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("advanced")),
    ...route("advanced")
  }, /* @__PURE__ */ React.createElement(AdvancedTab, {
    save,
    client
  }))))));
}
