import {
  AlertVariant,
  ButtonVariant,
  Card,
  CardTitle,
  DropdownItem,
  Gallery,
  GalleryItem,
  PageSection,
  Split,
  SplitItem,
  Text,
  TextContent,
  TextVariants
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {DatabaseIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import React, {useMemo, useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../_snowpack/pkg/react-router-dom.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {ManagePriorityDialog} from "./ManagePriorityDialog.js";
import {KeycloakCard} from "../components/keycloak-card/KeycloakCard.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import {toUpperCase} from "../util.js";
import {toProvider} from "./routes/NewProvider.js";
import "./user-federation.css.proxy.js";
import helpUrls from "../help-urls.js";
export default function UserFederationSection() {
  const [userFederations, setUserFederations] = useState();
  const {addAlert, addError} = useAlerts();
  const {t} = useTranslation("user-federation");
  const {realm} = useRealm();
  const {adminClient} = useAdminClient();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  const history = useHistory();
  const [manageDisplayDialog, setManageDisplayDialog] = useState(false);
  const providers = useServerInfo().componentTypes?.["org.keycloak.storage.UserStorageProvider"] || [];
  useFetch(async () => {
    const realmModel = await adminClient.realms.findOne({realm});
    const testParams = {
      parentId: realmModel.id,
      type: "org.keycloak.storage.UserStorageProvider"
    };
    return adminClient.components.find(testParams);
  }, (userFederations2) => {
    setUserFederations(userFederations2);
  }, [key]);
  const ufAddProviderDropdownItems = useMemo(() => providers.map((p) => /* @__PURE__ */ React.createElement(DropdownItem, {
    key: p.id,
    onClick: () => history.push(toProvider({realm, providerId: p.id, id: "new"}))
  }, p.id.toUpperCase() == "LDAP" ? p.id.toUpperCase() : toUpperCase(p.id))), []);
  const lowerButtonProps = {
    variant: "link",
    onClick: () => setManageDisplayDialog(true),
    lowerButtonTitle: t("managePriorities")
  };
  let cards;
  const [currentCard, setCurrentCard] = useState("");
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("userFedDeleteConfirmTitle"),
    messageKey: t("userFedDeleteConfirm"),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.components.del({id: currentCard});
        refresh();
        addAlert(t("userFedDeletedSuccess"), AlertVariant.success);
      } catch (error) {
        addError("user-federation:userFedDeleteError", error);
      }
    }
  });
  const toggleDeleteForCard = (id) => {
    setCurrentCard(id);
    toggleDeleteDialog();
  };
  const cardSorter = (card1, card2) => {
    const a = `${card1.name}`;
    const b = `${card2.name}`;
    return a < b ? -1 : 1;
  };
  if (userFederations) {
    cards = userFederations.sort(cardSorter).map((userFederation, index) => {
      const ufCardDropdownItems = [
        /* @__PURE__ */ React.createElement(DropdownItem, {
          key: `${index}-cardDelete`,
          onClick: () => {
            toggleDeleteForCard(userFederation.id);
          },
          "data-testid": "card-delete"
        }, t("common:delete"))
      ];
      return /* @__PURE__ */ React.createElement(GalleryItem, {
        key: index,
        className: "keycloak-admin--user-federation__gallery-item"
      }, /* @__PURE__ */ React.createElement(KeycloakCard, {
        id: userFederation.id,
        dropdownItems: ufCardDropdownItems,
        providerId: userFederation.providerId,
        title: userFederation.name,
        footerText: toUpperCase(userFederation.providerId),
        labelText: userFederation.config["enabled"][0] !== "false" ? `${t("common:enabled")}` : `${t("common:disabled")}`,
        labelColor: userFederation.config["enabled"][0] !== "false" ? "blue" : "gray"
      }));
    });
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), manageDisplayDialog && userFederations && /* @__PURE__ */ React.createElement(ManagePriorityDialog, {
    onClose: () => setManageDisplayDialog(false),
    components: userFederations.filter((p) => p.config?.enabled)
  }), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "userFederation",
    subKey: "user-federation:userFederationExplain",
    helpUrl: helpUrls.userFederationUrl,
    ...userFederations && userFederations.length > 0 ? {
      lowerDropdownItems: ufAddProviderDropdownItems,
      lowerDropdownMenuTitle: "user-federation:addNewProvider",
      lowerButton: lowerButtonProps
    } : {}
  }), /* @__PURE__ */ React.createElement(PageSection, null, userFederations && userFederations.length > 0 ? /* @__PURE__ */ React.createElement(Gallery, {
    hasGutter: true
  }, cards) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, {
    component: TextVariants.p
  }, t("getStarted"))), /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, {
    className: "pf-u-mt-lg",
    component: TextVariants.h2
  }, t("providers"))), /* @__PURE__ */ React.createElement("hr", {
    className: "pf-u-mb-lg"
  }), /* @__PURE__ */ React.createElement(Gallery, {
    hasGutter: true
  }, providers.map((p) => /* @__PURE__ */ React.createElement(Card, {
    key: p.id,
    className: "keycloak-empty-state-card",
    isHoverable: true,
    onClick: () => history.push(toProvider({realm, providerId: p.id})),
    "data-testid": `${p.id}-card`
  }, /* @__PURE__ */ React.createElement(CardTitle, null, /* @__PURE__ */ React.createElement(Split, {
    hasGutter: true
  }, /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(DatabaseIcon, {
    size: "lg"
  })), /* @__PURE__ */ React.createElement(SplitItem, {
    isFilled: true
  }, t("addProvider", {
    provider: toUpperCase(p.id),
    count: 4
  }))))))))));
}
