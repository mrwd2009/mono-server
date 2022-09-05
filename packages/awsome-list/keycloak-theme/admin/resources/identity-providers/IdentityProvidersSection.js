import React, {Fragment, useState} from "../_snowpack/pkg/react.js";
import {Link, useHistory} from "../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {sortBy, groupBy} from "../_snowpack/pkg/lodash-es.js";
import {
  AlertVariant,
  Badge,
  Button,
  ButtonVariant,
  Card,
  CardTitle,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownToggle,
  Gallery,
  PageSection,
  Spinner,
  Split,
  SplitItem,
  Text,
  TextContent,
  TextVariants,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useFetch, useAdminClient} from "../context/auth/AdminClient.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import {upperCaseFormatter} from "../util.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {ProviderIconMapper} from "./ProviderIconMapper.js";
import {ManageOrderDialog} from "./ManageOrderDialog.js";
import {toIdentityProvider} from "./routes/IdentityProvider.js";
import {toIdentityProviderCreate} from "./routes/IdentityProviderCreate.js";
import helpUrls from "../help-urls.js";
export default function IdentityProvidersSection() {
  const {t} = useTranslation("identity-providers");
  const identityProviders = groupBy(useServerInfo().identityProviders, "groupName");
  const {realm} = useRealm();
  const history = useHistory();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const [addProviderOpen, setAddProviderOpen] = useState(false);
  const [manageDisplayDialog, setManageDisplayDialog] = useState(false);
  const [providers, setProviders] = useState();
  const [selectedProvider, setSelectedProvider] = useState();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  useFetch(async () => {
    const provider = await adminClient.realms.findOne({realm});
    if (!provider) {
      throw new Error(t("common:notFound"));
    }
    return provider.identityProviders;
  }, (providers2) => {
    setProviders(sortBy(providers2, ["config.guiOrder", "alias"]));
  }, [key]);
  const DetailLink = (identityProvider) => /* @__PURE__ */ React.createElement(Link, {
    key: identityProvider.providerId,
    to: toIdentityProvider({
      realm,
      providerId: identityProvider.providerId,
      alias: identityProvider.alias,
      tab: "settings"
    })
  }, identityProvider.alias, !identityProvider.enabled && /* @__PURE__ */ React.createElement(Badge, {
    key: `${identityProvider.providerId}-disabled`,
    isRead: true,
    className: "pf-u-ml-sm"
  }, t("common:disabled")));
  const navigateToCreate = (providerId) => history.push(toIdentityProviderCreate({
    realm,
    providerId
  }));
  const identityProviderOptions = () => Object.keys(identityProviders).map((group) => /* @__PURE__ */ React.createElement(DropdownGroup, {
    key: group,
    label: group
  }, sortBy(identityProviders[group], "name").map((provider) => /* @__PURE__ */ React.createElement(DropdownItem, {
    key: provider.id,
    value: provider.id,
    component: /* @__PURE__ */ React.createElement(Link, {
      to: toIdentityProviderCreate({
        realm,
        providerId: provider.id
      }),
      "data-testid": provider.id
    }, provider.name)
  }))));
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "identity-providers:deleteProvider",
    messageKey: t("deleteConfirm", {provider: selectedProvider?.alias}),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.identityProviders.del({
          alias: selectedProvider.alias
        });
        setProviders([
          ...providers.filter((p) => p.alias !== selectedProvider?.alias)
        ]);
        refresh();
        addAlert(t("deletedSuccess"), AlertVariant.success);
      } catch (error) {
        addError("identity-providers:deleteError", error);
      }
    }
  });
  if (!providers) {
    return /* @__PURE__ */ React.createElement(Spinner, null);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), manageDisplayDialog && /* @__PURE__ */ React.createElement(ManageOrderDialog, {
    onClose: () => {
      setManageDisplayDialog(false);
      refresh();
    },
    providers: providers.filter((p) => p.enabled)
  }), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "common:identityProviders",
    subKey: "identity-providers:listExplain",
    helpUrl: helpUrls.identityProvidersUrl
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: providers.length === 0 ? "default" : "light",
    className: providers.length === 0 ? "" : "pf-u-p-0"
  }, providers.length === 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, {
    component: TextVariants.p
  }, t("getStarted"))), Object.keys(identityProviders).map((group) => /* @__PURE__ */ React.createElement(Fragment, {
    key: group
  }, /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, {
    className: "pf-u-mt-lg",
    component: TextVariants.h2
  }, group, ":")), /* @__PURE__ */ React.createElement("hr", {
    className: "pf-u-mb-lg"
  }), /* @__PURE__ */ React.createElement(Gallery, {
    hasGutter: true
  }, sortBy(identityProviders[group], "name").map((provider) => /* @__PURE__ */ React.createElement(Card, {
    className: "keycloak-empty-state-card",
    key: provider.id,
    isHoverable: true,
    "data-testid": `${provider.id}-card`,
    onClick: () => navigateToCreate(provider.id)
  }, /* @__PURE__ */ React.createElement(CardTitle, null, /* @__PURE__ */ React.createElement(Split, {
    hasGutter: true
  }, /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(ProviderIconMapper, {
    provider
  })), /* @__PURE__ */ React.createElement(SplitItem, {
    isFilled: true
  }, provider.name))))))))), providers.length !== 0 && /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    loader: providers,
    ariaLabelKey: "common:identityProviders",
    searchPlaceholderKey: "identity-providers:searchForProvider",
    toolbarItem: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Dropdown, {
      "data-testid": "addProviderDropdown",
      toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
        onToggle: () => setAddProviderOpen(!addProviderOpen),
        isPrimary: true
      }, t("addProvider")),
      isOpen: addProviderOpen,
      dropdownItems: identityProviderOptions()
    })), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "manageDisplayOrder",
      variant: "link",
      onClick: () => setManageDisplayDialog(true)
    }, t("manageDisplayOrder")))),
    actions: [
      {
        title: t("common:delete"),
        onRowClick: (provider) => {
          setSelectedProvider(provider);
          toggleDeleteDialog();
        }
      }
    ],
    columns: [
      {
        name: "alias",
        displayKey: "common:name",
        cellRenderer: DetailLink
      },
      {
        name: "providerId",
        displayKey: "identity-providers:providerDetails",
        cellFormatters: [upperCaseFormatter()]
      }
    ]
  })));
}
