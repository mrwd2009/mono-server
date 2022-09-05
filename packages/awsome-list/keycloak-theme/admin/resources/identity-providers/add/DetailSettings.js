import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link, useHistory, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useWatch
} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  Divider,
  DropdownItem,
  Form,
  PageSection,
  Tab,
  TabTitleText,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {ScrollForm} from "../../components/scroll-form/ScrollForm.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {useFetch, useAdminClient} from "../../context/auth/AdminClient.js";
import {GeneralSettings} from "./GeneralSettings.js";
import {AdvancedSettings} from "./AdvancedSettings.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {KeycloakTabs} from "../../components/keycloak-tabs/KeycloakTabs.js";
import {ExtendedNonDiscoverySettings} from "./ExtendedNonDiscoverySettings.js";
import {DiscoverySettings} from "./DiscoverySettings.js";
import {DescriptorSettings} from "./DescriptorSettings.js";
import {OIDCGeneralSettings} from "./OIDCGeneralSettings.js";
import {SamlGeneralSettings} from "./SamlGeneralSettings.js";
import {OIDCAuthentication} from "./OIDCAuthentication.js";
import {ReqAuthnConstraints} from "./ReqAuthnConstraintsSettings.js";
import {KeycloakDataTable} from "../../components/table-toolbar/KeycloakDataTable.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import {toIdentityProviderAddMapper} from "../routes/AddMapper.js";
import {toIdentityProviderEditMapper} from "../routes/EditMapper.js";
import {toIdentityProviders} from "../routes/IdentityProviders.js";
import {toUpperCase} from "../../util.js";
import {
  toIdentityProvider
} from "../routes/IdentityProvider.js";
import {PermissionsTab} from "../../components/permission-tab/PermissionTab.js";
const Header = ({onChange, value, save, toggleDeleteDialog}) => {
  const {t} = useTranslation("identity-providers");
  const {alias} = useParams();
  const {control} = useFormContext();
  const displayName = useWatch({
    name: "displayName",
    control,
    defaultValue: alias
  });
  const [toggleDisableDialog, DisableConfirm] = useConfirmDialog({
    titleKey: "identity-providers:disableProvider",
    messageKey: t("disableConfirm", {provider: displayName}),
    continueButtonLabel: "common:disable",
    onConfirm: () => {
      onChange(!value);
      save();
    }
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DisableConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: toUpperCase(displayName),
    divider: false,
    dropdownItems: [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "delete",
        onClick: () => toggleDeleteDialog()
      }, t("common:delete"))
    ],
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
export default function DetailSettings() {
  const {t} = useTranslation("identity-providers");
  const {alias, providerId} = useParams();
  const form = useForm();
  const {handleSubmit, getValues, reset} = form;
  const [provider, setProvider] = useState();
  const [selectedMapper, setSelectedMapper] = useState();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const history = useHistory();
  const {realm} = useRealm();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const MapperLink = ({name, mapperId}) => /* @__PURE__ */ React.createElement(Link, {
    to: toIdentityProviderEditMapper({
      realm,
      alias,
      providerId: provider?.providerId,
      id: mapperId
    })
  }, name);
  useFetch(() => adminClient.identityProviders.findOne({alias}), (fetchedProvider) => {
    if (!fetchedProvider) {
      throw new Error(t("common:notFound"));
    }
    reset(fetchedProvider);
    setProvider(fetchedProvider);
    if (fetchedProvider.config.authnContextClassRefs) {
      form.setValue("config.authnContextClassRefs", JSON.parse(fetchedProvider.config?.authnContextClassRefs));
    }
    if (fetchedProvider.config.authnContextDeclRefs) {
      form.setValue("config.authnContextDeclRefs", JSON.parse(fetchedProvider.config?.authnContextDeclRefs));
    }
  }, []);
  const save = async (provider2) => {
    const p = provider2 || getValues();
    if (p.config?.authnContextClassRefs)
      p.config.authnContextClassRefs = JSON.stringify(p.config.authnContextClassRefs);
    if (p.config?.authnContextDeclRefs)
      p.config.authnContextDeclRefs = JSON.stringify(p.config.authnContextDeclRefs);
    try {
      await adminClient.identityProviders.update({alias}, {...p, alias, providerId});
      addAlert(t("updateSuccess"), AlertVariant.success);
    } catch (error) {
      addError("identity-providers:updateError", error);
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "identity-providers:deleteProvider",
    messageKey: t("identity-providers:deleteConfirm", {provider: alias}),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.identityProviders.del({alias});
        addAlert(t("deletedSuccess"), AlertVariant.success);
        history.push(toIdentityProviders({realm}));
      } catch (error) {
        addError("identity-providers:deleteErrorError", error);
      }
    }
  });
  const [toggleDeleteMapperDialog, DeleteMapperConfirm] = useConfirmDialog({
    titleKey: "identity-providers:deleteProviderMapper",
    messageKey: t("identity-providers:deleteMapperConfirm", {
      mapper: selectedMapper?.name
    }),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.identityProviders.delMapper({
          alias,
          id: selectedMapper?.mapperId
        });
        addAlert(t("deleteMapperSuccess"), AlertVariant.success);
        refresh();
        history.push(toIdentityProvider({providerId, alias, tab: "mappers", realm}));
      } catch (error) {
        addError("identity-providers:deleteErrorError", error);
      }
    }
  });
  if (!provider) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const isOIDC = provider.providerId.includes("oidc");
  const isSAML = provider.providerId.includes("saml");
  const loader = async () => {
    const [loaderMappers, loaderMapperTypes] = await Promise.all([
      adminClient.identityProviders.findMappers({alias}),
      adminClient.identityProviders.findMapperTypes({alias})
    ]);
    const components = loaderMappers.map((loaderMapper) => {
      const mapperType = Object.values(loaderMapperTypes).find((loaderMapperType) => loaderMapper.identityProviderMapper === loaderMapperType.id);
      const result = {
        ...mapperType,
        name: loaderMapper.name,
        type: mapperType?.name,
        mapperId: loaderMapper.id
      };
      return result;
    });
    return components;
  };
  const sections = [
    {
      title: t("generalSettings"),
      panel: /* @__PURE__ */ React.createElement(FormAccess, {
        role: "manage-identity-providers",
        isHorizontal: true,
        onSubmit: handleSubmit(save)
      }, !isOIDC && !isSAML && /* @__PURE__ */ React.createElement(GeneralSettings, {
        create: false,
        id: alias
      }), isOIDC && /* @__PURE__ */ React.createElement(OIDCGeneralSettings, {
        id: alias
      }), isSAML && /* @__PURE__ */ React.createElement(SamlGeneralSettings, {
        id: alias
      }))
    },
    {
      title: t("oidcSettings"),
      isHidden: !isOIDC,
      panel: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DiscoverySettings, {
        readOnly: false
      }), /* @__PURE__ */ React.createElement(Form, {
        isHorizontal: true,
        className: "pf-u-py-lg"
      }, /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(OIDCAuthentication, {
        create: false
      })), /* @__PURE__ */ React.createElement(ExtendedNonDiscoverySettings, null))
    },
    {
      title: t("samlSettings"),
      isHidden: !isSAML,
      panel: /* @__PURE__ */ React.createElement(DescriptorSettings, {
        readOnly: false
      })
    },
    {
      title: t("reqAuthnConstraints"),
      isHidden: !isSAML,
      panel: /* @__PURE__ */ React.createElement(FormAccess, {
        role: "manage-identity-providers",
        isHorizontal: true,
        onSubmit: handleSubmit(save)
      }, /* @__PURE__ */ React.createElement(ReqAuthnConstraints, null))
    },
    {
      title: t("advancedSettings"),
      panel: /* @__PURE__ */ React.createElement(FormAccess, {
        role: "manage-identity-providers",
        isHorizontal: true,
        onSubmit: handleSubmit(save)
      }, /* @__PURE__ */ React.createElement(AdvancedSettings, {
        isOIDC,
        isSAML
      }), /* @__PURE__ */ React.createElement(ActionGroup, {
        className: "keycloak__form_actions"
      }, /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "save",
        type: "submit"
      }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "revert",
        variant: "link",
        onClick: () => {
          reset();
        }
      }, t("common:revert"))))
    }
  ];
  return /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(DeleteMapperConfirm, null), /* @__PURE__ */ React.createElement(Controller, {
    name: "enabled",
    control: form.control,
    defaultValue: true,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Header, {
      value,
      onChange,
      save,
      toggleDeleteDialog
    })
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(KeycloakTabs, {
    isBox: true
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "settings",
    eventKey: "settings",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:settings"))
  }, /* @__PURE__ */ React.createElement(ScrollForm, {
    className: "pf-u-px-lg",
    sections
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "mappers",
    "data-testid": "mappers-tab",
    eventKey: "mappers",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:mappers"))
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("identity-providers:noMappers"),
      instructions: t("identity-providers:noMappersInstructions"),
      primaryActionText: t("identity-providers:addMapper"),
      onPrimaryAction: () => history.push(toIdentityProviderAddMapper({
        realm,
        alias,
        providerId: provider.providerId,
        tab: "mappers"
      }))
    }),
    loader,
    key,
    ariaLabelKey: "identity-providers:mappersList",
    searchPlaceholderKey: "identity-providers:searchForMapper",
    toolbarItem: /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      id: "add-mapper-button",
      component: (props) => /* @__PURE__ */ React.createElement(Link, {
        ...props,
        to: toIdentityProviderAddMapper({
          realm,
          alias,
          providerId: provider.providerId,
          tab: "mappers"
        })
      }),
      "data-testid": "addMapper"
    }, t("addMapper"))),
    columns: [
      {
        name: "name",
        displayKey: "common:name",
        cellRenderer: MapperLink
      },
      {
        name: "category",
        displayKey: "common:category"
      },
      {
        name: "type",
        displayKey: "common:type"
      }
    ],
    actions: [
      {
        title: t("common:delete"),
        onRowClick: (mapper) => {
          setSelectedMapper(mapper);
          toggleDeleteMapperDialog();
        }
      }
    ]
  })), /* @__PURE__ */ React.createElement(Tab, {
    id: "permissions",
    "data-testid": "permissionsTab",
    eventKey: "permissions",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("common:permissions"))
  }, /* @__PURE__ */ React.createElement(PermissionsTab, {
    id: alias,
    type: "identityProviders"
  })))));
}
