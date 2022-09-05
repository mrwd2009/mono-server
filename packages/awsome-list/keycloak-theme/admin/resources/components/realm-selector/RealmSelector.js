import {
  Button,
  ContextSelector,
  ContextSelectorItem,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Label,
  Split,
  SplitItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {CheckIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import React, {useMemo, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useRealms} from "../../context/RealmsContext.js";
import {useWhoAmI} from "../../context/whoami/WhoAmI.js";
import {toDashboard} from "../../dashboard/routes/Dashboard.js";
import {toAddRealm} from "../../realm/routes/AddRealm.js";
import {toUpperCase} from "../../util.js";
import {RecentUsed} from "./recent-used.js";
import "./realm-selector.css.proxy.js";
export const RealmSelector = () => {
  const {realm} = useRealm();
  const {realms} = useRealms();
  const {whoAmI} = useWhoAmI();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const {t} = useTranslation("common");
  const recentUsed = new RecentUsed();
  const all = recentUsed.used.filter((r) => r !== realm).map((name) => {
    return {name, used: true};
  }).concat(realms.filter((r) => !recentUsed.used.includes(r.realm) || r.realm === realm).map((r) => {
    return {name: r.realm, used: false};
  }));
  const filteredItems = useMemo(() => {
    if (search === "") {
      return void 0;
    }
    return all.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, all]);
  const RealmText = ({value}) => /* @__PURE__ */ React.createElement(Split, {
    className: "keycloak__realm_selector__list-item-split"
  }, /* @__PURE__ */ React.createElement(SplitItem, {
    isFilled: true
  }, toUpperCase(value)), /* @__PURE__ */ React.createElement(SplitItem, null, value === realm && /* @__PURE__ */ React.createElement(CheckIcon, null)));
  const AddRealm = () => /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "add-realm",
    component: "div",
    isBlock: true,
    onClick: () => {
      history.push(toAddRealm({realm}));
      setOpen(!open);
    }
  }, t("createRealm"));
  const selectRealm = (realm2) => {
    setOpen(!open);
    history.push(toDashboard({realm: realm2}));
  };
  const dropdownItems = realms.map((r) => /* @__PURE__ */ React.createElement(DropdownItem, {
    key: `realm-dropdown-item-${r.realm}`,
    onClick: () => {
      selectRealm(r.realm);
    }
  }, /* @__PURE__ */ React.createElement(RealmText, {
    value: r.realm
  })));
  const addRealmComponent = /* @__PURE__ */ React.createElement(React.Fragment, {
    key: "Add Realm"
  }, whoAmI.canCreateRealm() && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Divider, {
    key: "divider"
  }), /* @__PURE__ */ React.createElement(DropdownItem, {
    key: "add"
  }, /* @__PURE__ */ React.createElement(AddRealm, null))));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, realms.length > 5 && /* @__PURE__ */ React.createElement(ContextSelector, {
    "data-testid": "realmSelector",
    toggleText: toUpperCase(realm),
    isOpen: open,
    screenReaderLabel: toUpperCase(realm),
    onToggle: () => setOpen(!open),
    onSelect: (_, r) => {
      let element;
      if (Array.isArray(r)) {
        element = r[0];
      } else {
        element = r;
      }
      const value = element.props.value;
      if (value) {
        selectRealm(value);
      }
    },
    searchInputValue: search,
    onSearchInputChange: (value) => setSearch(value),
    className: "keycloak__realm_selector__context_selector",
    footer: whoAmI.canCreateRealm() && /* @__PURE__ */ React.createElement(ContextSelectorItem, {
      key: "add"
    }, /* @__PURE__ */ React.createElement(AddRealm, null))
  }, (filteredItems || all).map((item) => /* @__PURE__ */ React.createElement(ContextSelectorItem, {
    key: item.name
  }, /* @__PURE__ */ React.createElement(RealmText, {
    value: item.name
  }), " ", item.used && /* @__PURE__ */ React.createElement(Label, null, t("recent"))))), realms.length <= 5 && /* @__PURE__ */ React.createElement(Dropdown, {
    id: "realm-select",
    "data-testid": "realmSelector",
    className: "keycloak__realm_selector__dropdown",
    isOpen: open,
    toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
      "data-testid": "realmSelectorToggle",
      onToggle: () => setOpen(!open),
      className: "keycloak__realm_selector_dropdown__toggle"
    }, toUpperCase(realm)),
    dropdownItems: [...dropdownItems, addRealmComponent]
  }));
};
