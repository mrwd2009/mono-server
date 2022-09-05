import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Label,
  PageSection,
  Text,
  TextContent
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {FormPanel} from "../components/scroll-form/FormPanel.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {cellWidth} from "../_snowpack/pkg/@patternfly/react-table.js";
import {Link, useParams} from "../_snowpack/pkg/react-router-dom.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {emptyFormatter, upperCaseFormatter} from "../util.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import {capitalize} from "../_snowpack/pkg/lodash-es.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {UserIdpModal} from "./UserIdPModal.js";
import {toIdentityProvider} from "../identity-providers/routes/IdentityProvider.js";
export const UserIdentityProviderLinks = () => {
  const [key, setKey] = useState(0);
  const [federatedId, setFederatedId] = useState("");
  const [isLinkIdPModalOpen, setIsLinkIdPModalOpen] = useState(false);
  const {adminClient} = useAdminClient();
  const {id} = useParams();
  const {realm} = useRealm();
  const {addAlert, addError} = useAlerts();
  const {t} = useTranslation("users");
  const refresh = () => setKey(new Date().getTime());
  const handleModalToggle = () => {
    setIsLinkIdPModalOpen(!isLinkIdPModalOpen);
  };
  const identityProviders = useServerInfo().identityProviders;
  const getFederatedIdentities = async () => {
    const allProviders = await adminClient.identityProviders.find();
    const allFedIds = await adminClient.users.listFederatedIdentities({
      id
    });
    for (const element of allFedIds) {
      element.providerId = allProviders.find((item) => item.alias === element.identityProvider)?.providerId;
    }
    return allFedIds;
  };
  const getAvailableIdPs = async () => {
    return (await adminClient.realms.findOne({realm})).identityProviders;
  };
  const linkedIdPsLoader = async () => {
    return getFederatedIdentities();
  };
  const availableIdPsLoader = async () => {
    const linkedNames = (await getFederatedIdentities()).map((x) => x.identityProvider);
    return (await getAvailableIdPs())?.filter((item) => !linkedNames.includes(item.alias));
  };
  const [toggleUnlinkDialog, UnlinkConfirm] = useConfirmDialog({
    titleKey: t("users:unlinkAccountTitle", {
      provider: capitalize(federatedId)
    }),
    messageKey: t("users:unlinkAccountConfirm", {
      provider: capitalize(federatedId)
    }),
    continueButtonLabel: "users:unlink",
    continueButtonVariant: ButtonVariant.primary,
    onConfirm: async () => {
      try {
        await adminClient.users.delFromFederatedIdentity({
          id,
          federatedIdentityId: federatedId
        });
        addAlert(t("common:mappingDeletedSuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError("common:mappingDeletedError", error);
      }
    }
  });
  const idpLinkRenderer = (idp) => {
    return /* @__PURE__ */ React.createElement(Link, {
      to: toIdentityProvider({
        realm,
        providerId: idp.providerId,
        alias: idp.identityProvider,
        tab: "settings"
      })
    }, capitalize(idp.identityProvider));
  };
  const badgeRenderer1 = (idp) => {
    const groupName = identityProviders?.find((provider) => provider["id"] === idp.identityProvider)?.groupName;
    return /* @__PURE__ */ React.createElement(Label, {
      color: groupName === "Social" ? "blue" : "orange"
    }, groupName === "Social" ? "Social" : "Custom");
  };
  const badgeRenderer2 = (idp) => {
    const groupName = identityProviders?.find((provider) => provider["id"] === idp.providerId)?.groupName;
    return /* @__PURE__ */ React.createElement(Label, {
      color: groupName === "User-defined" ? "orange" : "blue"
    }, groupName === "User-defined" ? "Custom" : groupName);
  };
  const unlinkRenderer = (fedIdentity) => {
    return /* @__PURE__ */ React.createElement(Button, {
      variant: "link",
      onClick: () => {
        setFederatedId(fedIdentity.identityProvider);
        toggleUnlinkDialog();
      }
    }, t("unlinkAccount"));
  };
  const linkRenderer = (idp) => {
    return /* @__PURE__ */ React.createElement(Button, {
      variant: "link",
      onClick: () => {
        setFederatedId(idp.alias);
        setIsLinkIdPModalOpen(true);
      }
    }, t("linkAccount"));
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, isLinkIdPModalOpen && /* @__PURE__ */ React.createElement(UserIdpModal, {
    federatedId,
    handleModalToggle,
    refresh
  }), /* @__PURE__ */ React.createElement(UnlinkConfirm, null), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormPanel, {
    title: t("linkedIdPs"),
    className: "kc-linked-idps"
  }, /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, {
    className: "kc-available-idps-text"
  }, t("linkedIdPsText"))), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    loader: linkedIdPsLoader,
    key,
    isPaginated: false,
    ariaLabelKey: "users:LinkedIdPs",
    className: "kc-linked-IdPs-table",
    columns: [
      {
        name: "identityProvider",
        displayKey: "common:name",
        cellFormatters: [emptyFormatter()],
        cellRenderer: idpLinkRenderer,
        transforms: [cellWidth(20)]
      },
      {
        name: "type",
        displayKey: "common:type",
        cellFormatters: [emptyFormatter()],
        cellRenderer: badgeRenderer1,
        transforms: [cellWidth(10)]
      },
      {
        name: "userId",
        displayKey: "users:userID",
        cellFormatters: [emptyFormatter()],
        transforms: [cellWidth(30)]
      },
      {
        name: "userName",
        displayKey: "users:username",
        cellFormatters: [emptyFormatter()],
        transforms: [cellWidth(20)]
      },
      {
        name: "",
        cellFormatters: [emptyFormatter()],
        cellRenderer: unlinkRenderer,
        transforms: [cellWidth(20)]
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(TextContent, {
      className: "kc-no-providers-text"
    }, /* @__PURE__ */ React.createElement(Text, null, t("users:noProvidersLinked")))
  })), /* @__PURE__ */ React.createElement(FormPanel, {
    className: "kc-available-idps",
    title: t("availableIdPs")
  }, /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, {
    className: "kc-available-idps-text"
  }, t("availableIdPsText"))), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    loader: availableIdPsLoader,
    key,
    isPaginated: false,
    ariaLabelKey: "users:LinkedIdPs",
    className: "kc-linked-IdPs-table",
    columns: [
      {
        name: "alias",
        displayKey: "common:name",
        cellFormatters: [emptyFormatter(), upperCaseFormatter()],
        transforms: [cellWidth(20)]
      },
      {
        name: "type",
        displayKey: "common:type",
        cellFormatters: [emptyFormatter()],
        cellRenderer: badgeRenderer2,
        transforms: [cellWidth(60)]
      },
      {
        name: "",
        cellFormatters: [emptyFormatter()],
        cellRenderer: linkRenderer
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(TextContent, {
      className: "kc-no-providers-text"
    }, /* @__PURE__ */ React.createElement(Text, null, t("users:noAvailableIdentityProviders")))
  }))));
};
