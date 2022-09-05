import {
  ClipboardCopy,
  Form,
  FormGroup,
  Grid,
  GridItem,
  PageSection,
  Select,
  SelectOption,
  SelectVariant,
  Split,
  SplitItem,
  Tab,
  TabContent,
  Tabs,
  TabTitleText,
  Text,
  TextContent
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {QuestionCircleIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import React, {useEffect, useRef, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useHelp} from "../../components/help-enabler/HelpHeader.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {KeycloakDataTable} from "../../components/table-toolbar/KeycloakDataTable.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useServerInfo} from "../../context/server-info/ServerInfoProvider.js";
import {prettyPrintJSON} from "../../util.js";
import {GeneratedCodeTab} from "./GeneratedCodeTab.js";
import "./evaluate.css.proxy.js";
const ProtocolMappers = ({
  protocolMappers
}) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey(key + 1);
  }, [protocolMappers]);
  return /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader: () => Promise.resolve(protocolMappers),
    ariaLabelKey: "clients:effectiveProtocolMappers",
    searchPlaceholderKey: "clients:searchForProtocol",
    columns: [
      {
        name: "mapperName",
        displayKey: "common:name"
      },
      {
        name: "containerName",
        displayKey: "clients:parentClientScope"
      },
      {
        name: "type.category",
        displayKey: "common:category"
      },
      {
        name: "type.priority",
        displayKey: "common:priority"
      }
    ]
  });
};
const EffectiveRoles = ({
  effectiveRoles
}) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey(key + 1);
  }, [effectiveRoles]);
  return /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader: () => Promise.resolve(effectiveRoles),
    ariaLabelKey: "client:effectiveRoleScopeMappings",
    searchPlaceholderKey: "clients:searchForRole",
    columns: [
      {
        name: "name",
        displayKey: "clients:role"
      },
      {
        name: "containerId",
        displayKey: "clients:origin"
      }
    ]
  });
};
export const EvaluateScopes = ({clientId, protocol}) => {
  const prefix = "openid";
  const {t} = useTranslation("clients");
  const {enabled} = useHelp();
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const mapperTypes = useServerInfo().protocolMapperTypes[protocol];
  const [selectableScopes, setSelectableScopes] = useState([]);
  const [isScopeOpen, setIsScopeOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [selected, setSelected] = useState([prefix]);
  const [activeTab, setActiveTab] = useState(0);
  const [userItems, setUserItems] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [user, setUser] = useState();
  const [key, setKey] = useState("");
  const refresh = () => setKey(`${new Date().getTime()}`);
  const [effectiveRoles, setEffectiveRoles] = useState([]);
  const [protocolMappers, setProtocolMappers] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [idToken, setIdToken] = useState("");
  const tabContent1 = useRef(null);
  const tabContent2 = useRef(null);
  const tabContent3 = useRef(null);
  const tabContent4 = useRef(null);
  const tabContent5 = useRef(null);
  useFetch(() => adminClient.clients.listOptionalClientScopes({id: clientId}), (optionalClientScopes) => setSelectableScopes(optionalClientScopes), []);
  const toString = (user2) => {
    return t("common:fullName", {
      givenName: user2.firstName,
      familyName: user2.lastName
    }).trim() || user2.username || "";
  };
  useFetch(() => {
    if (userSearch.length > 2) {
      return adminClient.users.find({search: userSearch});
    } else {
      return Promise.resolve([]);
    }
  }, (users) => setUserItems(users.map((user2) => {
    user2.toString = function() {
      return toString(this);
    };
    return user2;
  }).map((user2) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: user2.id,
    value: user2
  }))), [userSearch]);
  useFetch(async () => {
    const scope = selected.join(" ");
    const effectiveRoles2 = await adminClient.clients.evaluatePermission({
      id: clientId,
      roleContainer: realm,
      scope,
      type: "granted"
    });
    const mapperList = await adminClient.clients.evaluateListProtocolMapper({
      id: clientId,
      scope
    });
    return {
      mapperList,
      effectiveRoles: effectiveRoles2
    };
  }, ({mapperList, effectiveRoles: effectiveRoles2}) => {
    setEffectiveRoles(effectiveRoles2);
    mapperList.map((mapper) => {
      mapper.type = mapperTypes.filter((type) => type.id === mapper.protocolMapper)[0];
    });
    setProtocolMappers(mapperList);
    refresh();
  }, [selected]);
  useFetch(async () => {
    const scope = selected.join(" ");
    if (!user)
      return [];
    return await Promise.all([
      adminClient.clients.evaluateGenerateAccessToken({
        id: clientId,
        userId: user.id,
        scope
      }),
      adminClient.clients.evaluateGenerateUserInfo({
        id: clientId,
        userId: user.id,
        scope
      }),
      adminClient.clients.evaluateGenerateIdToken({
        id: clientId,
        userId: user.id,
        scope
      })
    ]);
  }, ([accessToken2, userInfo2, idToken2]) => {
    setAccessToken(prettyPrintJSON(accessToken2));
    setUserInfo(prettyPrintJSON(userInfo2));
    setIdToken(prettyPrintJSON(idToken2));
  }, [user, selected]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, enabled && /* @__PURE__ */ React.createElement(TextContent, {
    className: "keycloak__section_intro__help"
  }, /* @__PURE__ */ React.createElement(Text, null, /* @__PURE__ */ React.createElement(QuestionCircleIcon, null), " ", t("clients-help:evaluateExplain"))), /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("scopeParameter"),
    fieldId: "scopeParameter",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:scopeParameter",
      fieldLabelId: "clients:scopeParameter"
    })
  }, /* @__PURE__ */ React.createElement(Split, {
    hasGutter: true
  }, /* @__PURE__ */ React.createElement(SplitItem, {
    isFilled: true
  }, /* @__PURE__ */ React.createElement(Select, {
    toggleId: "scopeParameter",
    variant: SelectVariant.typeaheadMulti,
    typeAheadAriaLabel: t("scopeParameter"),
    onToggle: () => setIsScopeOpen(!isScopeOpen),
    isOpen: isScopeOpen,
    selections: selected,
    onSelect: (_, value) => {
      const option = value;
      if (selected.includes(option)) {
        if (option !== prefix) {
          setSelected(selected.filter((item) => item !== option));
        }
      } else {
        setSelected([...selected, option]);
      }
    },
    "aria-labelledby": t("scopeParameter"),
    placeholderText: t("scopeParameterPlaceholder")
  }, selectableScopes.map((option, index) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: index,
    value: option.name
  })))), /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(ClipboardCopy, {
    className: "keycloak__scopes_evaluate__clipboard-copy"
  }, selected.join(" "))))), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("user"),
    fieldId: "user",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:user",
      fieldLabelId: "clients:user"
    })
  }, /* @__PURE__ */ React.createElement(Select, {
    toggleId: "user",
    variant: SelectVariant.typeahead,
    typeAheadAriaLabel: t("user"),
    onToggle: () => setIsUserOpen(!isUserOpen),
    onFilter: (e) => {
      const value = e?.target.value || "";
      setUserSearch(value);
      return userItems;
    },
    onClear: () => {
      setUser(void 0);
      setUserSearch("");
    },
    selections: [user],
    onSelect: (_, value) => {
      setUser(value);
      setUserSearch("");
      setIsUserOpen(false);
    },
    isOpen: isUserOpen
  })))), /* @__PURE__ */ React.createElement(Grid, {
    hasGutter: true,
    className: "keycloak__scopes_evaluate__tabs"
  }, /* @__PURE__ */ React.createElement(GridItem, {
    span: 8
  }, /* @__PURE__ */ React.createElement(TabContent, {
    "aria-labelledby": "pf-tab-0-effectiveProtocolMappers",
    eventKey: 0,
    id: "effectiveProtocolMappers",
    ref: tabContent1
  }, /* @__PURE__ */ React.createElement(ProtocolMappers, {
    protocolMappers
  })), /* @__PURE__ */ React.createElement(TabContent, {
    "aria-labelledby": "pf-tab-0-effectiveRoleScopeMappings",
    eventKey: 1,
    id: "effectiveRoleScopeMappings",
    ref: tabContent2,
    hidden: true
  }, /* @__PURE__ */ React.createElement(EffectiveRoles, {
    effectiveRoles
  })), /* @__PURE__ */ React.createElement(TabContent, {
    "aria-labelledby": t("generatedAccessToken"),
    eventKey: 2,
    id: "tab-generated-access-token",
    ref: tabContent3,
    hidden: true
  }, /* @__PURE__ */ React.createElement(GeneratedCodeTab, {
    text: accessToken,
    user,
    label: "generatedAccessToken"
  })), /* @__PURE__ */ React.createElement(TabContent, {
    "aria-labelledby": t("generatedIdToken"),
    eventKey: 3,
    id: "tab-generated-id-token",
    ref: tabContent4,
    hidden: true
  }, /* @__PURE__ */ React.createElement(GeneratedCodeTab, {
    text: idToken,
    user,
    label: "generatedIdToken"
  })), /* @__PURE__ */ React.createElement(TabContent, {
    "aria-labelledby": t("generatedUserInfo"),
    eventKey: 4,
    id: "tab-generated-user-info",
    ref: tabContent5,
    hidden: true
  }, /* @__PURE__ */ React.createElement(GeneratedCodeTab, {
    text: userInfo,
    user,
    label: "generatedUserInfo"
  }))), /* @__PURE__ */ React.createElement(GridItem, {
    span: 4
  }, /* @__PURE__ */ React.createElement(Tabs, {
    id: "tabs",
    key,
    isVertical: true,
    activeKey: activeTab,
    onSelect: (_, key2) => setActiveTab(key2)
  }, /* @__PURE__ */ React.createElement(Tab, {
    id: "effectiveProtocolMappers",
    "aria-controls": "effectiveProtocolMappers",
    eventKey: 0,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("effectiveProtocolMappers"), " ", /* @__PURE__ */ React.createElement(HelpItem, {
      fieldLabelId: "clients:effectiveProtocolMappers",
      helpText: "clients-help:effectiveProtocolMappers",
      noVerticalAlign: false,
      unWrap: true
    })),
    tabContentRef: tabContent1
  }), /* @__PURE__ */ React.createElement(Tab, {
    id: "effectiveRoleScopeMappings",
    "aria-controls": "effectiveRoleScopeMappings",
    eventKey: 1,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("effectiveRoleScopeMappings"), " ", /* @__PURE__ */ React.createElement(HelpItem, {
      fieldLabelId: "clients:effectiveRoleScopeMappings",
      helpText: "clients-help:effectiveRoleScopeMappings",
      noVerticalAlign: false,
      unWrap: true
    })),
    tabContentRef: tabContent2
  }), /* @__PURE__ */ React.createElement(Tab, {
    id: "generatedAccessToken",
    "aria-controls": "generatedAccessToken",
    eventKey: 2,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("generatedAccessToken"), " ", /* @__PURE__ */ React.createElement(HelpItem, {
      fieldLabelId: "clients:generatedAccessToken",
      helpText: "clients-help:generatedAccessToken",
      noVerticalAlign: false,
      unWrap: true
    })),
    tabContentRef: tabContent3
  }), /* @__PURE__ */ React.createElement(Tab, {
    id: "generatedIdToken",
    "aria-controls": "generatedIdToken",
    eventKey: 3,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("generatedIdToken"), " ", /* @__PURE__ */ React.createElement(HelpItem, {
      fieldLabelId: "clients:generatedIdToken",
      helpText: "clients-help:generatedIdToken",
      noVerticalAlign: false,
      unWrap: true
    })),
    tabContentRef: tabContent4
  }), /* @__PURE__ */ React.createElement(Tab, {
    id: "generatedUserInfo",
    "aria-controls": "generatedUserInfo",
    eventKey: 4,
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("generatedUserInfo"), " ", /* @__PURE__ */ React.createElement(HelpItem, {
      fieldLabelId: "clients:generatedUserInfo",
      helpText: "clients-help:generatedUserInfo",
      noVerticalAlign: false,
      unWrap: true
    })),
    tabContentRef: tabContent5
  })))));
};
