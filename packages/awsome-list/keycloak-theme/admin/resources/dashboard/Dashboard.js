import React, {useMemo} from "../_snowpack/pkg/react.js";
import {useHistory} from "../_snowpack/pkg/react-router-dom.js";
import {Trans, useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {xor} from "../_snowpack/pkg/lodash-es.js";
import {
  Brand,
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  EmptyState,
  EmptyStateBody,
  Grid,
  GridItem,
  Label,
  List,
  ListItem,
  ListVariant,
  PageSection,
  Tab,
  TabTitleText,
  Text,
  TextContent,
  Title
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import {toUpperCase} from "../util.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import environment from "../environment.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
import useLocaleSort from "../utils/useLocaleSort.js";
import {
  routableTab,
  RoutableTabs
} from "../components/routable-tabs/RoutableTabs.js";
import {toDashboard} from "./routes/Dashboard.js";
import {ProviderInfo} from "./ProviderInfo.js";
import "./dashboard.css.proxy.js";
const EmptyDashboard = () => {
  const {t} = useTranslation("dashboard");
  const {realm} = useRealm();
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(EmptyState, {
    variant: "large"
  }, /* @__PURE__ */ React.createElement(Brand, {
    src: environment.resourceUrl + "/icon.svg",
    alt: "Keycloak icon",
    className: "keycloak__dashboard_icon"
  }), /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h4",
    size: "3xl"
  }, t("welcome")), /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h4",
    size: "4xl"
  }, realm), /* @__PURE__ */ React.createElement(EmptyStateBody, null, t("introduction"))));
};
const Dashboard = () => {
  const {t} = useTranslation("dashboard");
  const {realm} = useRealm();
  const serverInfo = useServerInfo();
  const history = useHistory();
  const localeSort = useLocaleSort();
  const enabledFeatures = useMemo(() => localeSort(xor(serverInfo.profileInfo?.disabledFeatures, serverInfo.profileInfo?.experimentalFeatures, serverInfo.profileInfo?.previewFeatures), (item) => item), [serverInfo.profileInfo]);
  const disabledFeatures = useMemo(() => localeSort(serverInfo.profileInfo?.disabledFeatures ?? [], (item) => item), [serverInfo.profileInfo]);
  const isExperimentalFeature = (feature) => serverInfo.profileInfo?.experimentalFeatures?.includes(feature);
  const isPreviewFeature = (feature) => serverInfo.profileInfo?.previewFeatures?.includes(feature);
  if (Object.keys(serverInfo).length === 0) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const route = (tab) => routableTab({
    to: toDashboard({
      realm,
      tab
    }),
    history
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(TextContent, {
    className: "pf-u-mr-sm"
  }, /* @__PURE__ */ React.createElement(Text, {
    component: "h1"
  }, t("realmName", {name: toUpperCase(realm)})), /* @__PURE__ */ React.createElement(Text, null, /* @__PURE__ */ React.createElement(Trans, {
    t,
    i18nKey: "adminUiVersion"
  }, /* @__PURE__ */ React.createElement("strong", null, "Admin UI version"), {version: environment.commitHash})))), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(RoutableTabs, {
    "data-testid": "dashboard-tabs",
    defaultLocation: toDashboard({
      realm,
      tab: "info"
    }),
    isBox: true,
    mountOnEnter: true
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "info",
    "data-testid": "infoTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("realmInfo")),
    ...route("info")
  }, /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(Grid, {
    hasGutter: true
  }, /* @__PURE__ */ React.createElement(GridItem, {
    lg: 2,
    sm: 12
  }, /* @__PURE__ */ React.createElement(Card, {
    className: "keycloak__dashboard_card"
  }, /* @__PURE__ */ React.createElement(CardTitle, null, t("serverInfo")), /* @__PURE__ */ React.createElement(CardBody, null, /* @__PURE__ */ React.createElement(DescriptionList, null, /* @__PURE__ */ React.createElement(DescriptionListGroup, null, /* @__PURE__ */ React.createElement(DescriptionListTerm, null, t("version")), /* @__PURE__ */ React.createElement(DescriptionListDescription, null, serverInfo.systemInfo?.version), /* @__PURE__ */ React.createElement(DescriptionListTerm, null, t("product")), /* @__PURE__ */ React.createElement(DescriptionListDescription, null, toUpperCase(serverInfo.profileInfo?.name))))))), /* @__PURE__ */ React.createElement(GridItem, {
    lg: 10,
    sm: 12
  }, /* @__PURE__ */ React.createElement(Card, {
    className: "keycloak__dashboard_card"
  }, /* @__PURE__ */ React.createElement(CardTitle, null, t("profile")), /* @__PURE__ */ React.createElement(CardBody, null, /* @__PURE__ */ React.createElement(DescriptionList, null, /* @__PURE__ */ React.createElement(DescriptionListGroup, null, /* @__PURE__ */ React.createElement(DescriptionListTerm, null, t("enabledFeatures"), " ", /* @__PURE__ */ React.createElement(HelpItem, {
    fieldLabelId: "dashboard:enabledFeatures",
    helpText: "dashboard:infoEnabledFeatures"
  })), /* @__PURE__ */ React.createElement(DescriptionListDescription, null, /* @__PURE__ */ React.createElement(List, {
    variant: ListVariant.inline
  }, enabledFeatures.map((feature) => /* @__PURE__ */ React.createElement(ListItem, {
    key: feature
  }, feature, " ", isExperimentalFeature(feature) ? /* @__PURE__ */ React.createElement(Label, {
    color: "orange"
  }, t("experimental")) : null, isPreviewFeature(feature) ? /* @__PURE__ */ React.createElement(Label, {
    color: "blue"
  }, t("preview")) : null))))), /* @__PURE__ */ React.createElement(DescriptionListGroup, null, /* @__PURE__ */ React.createElement(DescriptionListTerm, null, t("disabledFeatures"), " ", /* @__PURE__ */ React.createElement(HelpItem, {
    fieldLabelId: "dashboard:disabledFeatures",
    helpText: "dashboard:infoDisabledFeatures"
  })), /* @__PURE__ */ React.createElement(DescriptionListDescription, null, /* @__PURE__ */ React.createElement(List, {
    variant: ListVariant.inline
  }, disabledFeatures.map((feature) => /* @__PURE__ */ React.createElement(ListItem, {
    key: feature
  }, feature)))))))))))), /* @__PURE__ */ React.createElement(Tab, {
    id: "providers",
    "data-testid": "providersTab",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("providerInfo")),
    ...route("providers")
  }, /* @__PURE__ */ React.createElement(ProviderInfo, null)))));
};
export default function DashboardSection() {
  const {realm} = useRealm();
  const isMasterRealm = realm === "master";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, !isMasterRealm && /* @__PURE__ */ React.createElement(EmptyDashboard, null), isMasterRealm && /* @__PURE__ */ React.createElement(Dashboard, null));
}
