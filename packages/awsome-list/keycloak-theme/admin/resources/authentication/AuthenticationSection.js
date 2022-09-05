import React, {useState} from "../_snowpack/pkg/react.js";
import {Link, useHistory} from "../_snowpack/pkg/react-router-dom.js";
import {Trans, useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {sortBy} from "../_snowpack/pkg/lodash-es.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Label,
  PageSection,
  Tab,
  TabTitleText,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {toUpperCase} from "../util.js";
import useToggle from "../utils/useToggle.js";
import {DuplicateFlowModal} from "./DuplicateFlowModal.js";
import {toCreateFlow} from "./routes/CreateFlow.js";
import {toFlow} from "./routes/Flow.js";
import {RequiredActions} from "./RequiredActions.js";
import {Policies} from "./policies/Policies.js";
import helpUrls from "../help-urls.js";
import {BindFlowDialog} from "./BindFlowDialog.js";
import {UsedBy} from "./components/UsedBy.js";
import {
  routableTab,
  RoutableTabs
} from "../components/routable-tabs/RoutableTabs.js";
import {toAuthentication} from "./routes/Authentication.js";
import "./authentication-section.css.proxy.js";
export const REALM_FLOWS = [
  "browserFlow",
  "registrationFlow",
  "directGrantFlow",
  "resetCredentialsFlow",
  "clientAuthenticationFlow",
  "dockerAuthenticationFlow"
];
export default function AuthenticationSection() {
  const {t} = useTranslation("authentication");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const history = useHistory();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const {addAlert, addError} = useAlerts();
  const [selectedFlow, setSelectedFlow] = useState();
  const [open, toggleOpen] = useToggle();
  const [bindFlowOpen, toggleBindFlow] = useToggle();
  const loader = async () => {
    const [allClients, allIdps, realmRep, flows] = await Promise.all([
      adminClient.clients.find(),
      adminClient.identityProviders.find(),
      adminClient.realms.findOne({realm}),
      adminClient.authenticationManagement.getFlows()
    ]);
    if (!realmRep) {
      throw new Error(t("common:notFound"));
    }
    const defaultFlows = Object.entries(realmRep).filter(([key2]) => REALM_FLOWS.includes(key2));
    for (const flow of flows) {
      flow.usedBy = {values: []};
      const clients = allClients.filter((client) => client.authenticationFlowBindingOverrides && (client.authenticationFlowBindingOverrides["direct_grant"] === flow.id || client.authenticationFlowBindingOverrides["browser"] === flow.id));
      if (clients.length > 0) {
        flow.usedBy.type = "specificClients";
        flow.usedBy.values = clients.map(({clientId}) => clientId);
      }
      const idps = allIdps.filter((idp) => idp.firstBrokerLoginFlowAlias === flow.alias || idp.postBrokerLoginFlowAlias === flow.alias);
      if (idps.length > 0) {
        flow.usedBy.type = "specificProviders";
        flow.usedBy.values = idps.map(({alias}) => alias);
      }
      const defaultFlow = defaultFlows.find(([, alias]) => flow.alias === alias);
      if (defaultFlow) {
        flow.usedBy.type = "default";
        flow.usedBy.values.push(defaultFlow[0]);
      }
    }
    return sortBy(flows, (flow) => flow.usedBy.type);
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "authentication:deleteConfirmFlow",
    children: /* @__PURE__ */ React.createElement(Trans, {
      i18nKey: "authentication:deleteConfirmFlowMessage"
    }, " ", /* @__PURE__ */ React.createElement("strong", null, {flow: selectedFlow ? selectedFlow.alias : ""}), "."),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.authenticationManagement.deleteFlow({
          flowId: selectedFlow.id
        });
        refresh();
        addAlert(t("deleteFlowSuccess"), AlertVariant.success);
      } catch (error) {
        addError("authentication:deleteFlowError", error);
      }
    }
  });
  const UsedByRenderer = (authType) => /* @__PURE__ */ React.createElement(UsedBy, {
    authType
  });
  const AliasRenderer = ({
    id,
    alias,
    usedBy,
    builtIn
  }) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Link, {
    to: toFlow({
      realm,
      id,
      usedBy: usedBy.type || "notInUse",
      builtIn: builtIn ? "builtIn" : void 0
    }),
    key: `link-${id}`
  }, toUpperCase(alias)), " ", builtIn && /* @__PURE__ */ React.createElement(Label, {
    key: `label-${id}`
  }, t("buildIn")));
  const route = (tab) => routableTab({
    to: toAuthentication({realm, tab}),
    history
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), open && /* @__PURE__ */ React.createElement(DuplicateFlowModal, {
    name: selectedFlow ? selectedFlow.alias : "",
    description: selectedFlow?.description,
    toggleDialog: toggleOpen,
    onComplete: () => {
      refresh();
      toggleOpen();
    }
  }), bindFlowOpen && /* @__PURE__ */ React.createElement(BindFlowDialog, {
    onClose: () => {
      toggleBindFlow();
      refresh();
    },
    flowAlias: selectedFlow?.alias
  }), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "authentication:title",
    subKey: "authentication:authenticationExplain",
    helpUrl: helpUrls.authenticationUrl,
    divider: false
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(RoutableTabs, {
    isBox: true,
    defaultLocation: toAuthentication({realm, tab: "flows"})
  }, /* @__PURE__ */ React.createElement(Tab, {
    "data-testid": "flows",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("flows")),
    ...route("flows")
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader,
    ariaLabelKey: "authentication:title",
    searchPlaceholderKey: "authentication:searchForFlow",
    toolbarItem: /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      component: (props) => /* @__PURE__ */ React.createElement(Link, {
        ...props,
        to: toCreateFlow({realm})
      })
    }, t("createFlow"))),
    actionResolver: ({data}) => [
      {
        title: t("duplicate"),
        onClick: () => {
          toggleOpen();
          setSelectedFlow(data);
        }
      },
      ...data.usedBy.type !== "default" && data.providerId !== "client-flow" ? [
        {
          title: t("bindFlow"),
          onClick: () => {
            toggleBindFlow();
            setSelectedFlow(data);
          }
        }
      ] : [],
      ...!data.builtIn && data.usedBy.values.length === 0 ? [
        {
          title: t("common:delete"),
          onClick: () => {
            setSelectedFlow(data);
            toggleDeleteDialog();
          }
        }
      ] : []
    ],
    columns: [
      {
        name: "alias",
        displayKey: "authentication:flowName",
        cellRenderer: AliasRenderer
      },
      {
        name: "usedBy",
        displayKey: "authentication:usedBy",
        cellRenderer: UsedByRenderer
      },
      {
        name: "description",
        displayKey: "common:description"
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("emptyEvents"),
      instructions: t("emptyEventsInstructions")
    })
  })), /* @__PURE__ */ React.createElement(Tab, {
    "data-testid": "requiredActions",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("requiredActions")),
    ...route("required-actions")
  }, /* @__PURE__ */ React.createElement(RequiredActions, null)), /* @__PURE__ */ React.createElement(Tab, {
    "data-testid": "policies",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("policies")),
    ...route("policies")
  }, /* @__PURE__ */ React.createElement(Policies, null)))));
}
