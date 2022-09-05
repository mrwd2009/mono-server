import {
  ActionGroup,
  Button,
  Chip,
  ChipGroup,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Dropdown,
  DropdownToggle,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  PageSection,
  Select,
  SelectOption,
  SelectVariant,
  Tab,
  TabTitleText,
  Tooltip
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {CheckCircleIcon, WarningTriangleIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import {cellWidth, expandable} from "../_snowpack/pkg/@patternfly/react-table.js";
import {pickBy} from "../_snowpack/pkg/lodash-es.js";
import React, {useState} from "../_snowpack/pkg/react.js";
import {Controller, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {Trans, useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Link, useHistory} from "../_snowpack/pkg/react-router-dom.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {toRealmSettings} from "../realm-settings/routes/RealmSettings.js";
import {toUser} from "../user/routes/User.js";
import useFormatDate, {FORMAT_DATE_AND_TIME} from "../utils/useFormatDate.js";
import {AdminEvents} from "./AdminEvents.js";
import helpUrls from "../help-urls.js";
import {
  routableTab,
  RoutableTabs
} from "../components/routable-tabs/RoutableTabs.js";
import {toEvents} from "./routes/Events.js";
import "./events.css.proxy.js";
const defaultValues = {
  client: "",
  dateFrom: "",
  dateTo: "",
  user: "",
  type: []
};
const StatusRow = (event) => !event.error ? /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(CheckCircleIcon, {
  color: "green"
}), " ", event.type) : /* @__PURE__ */ React.createElement(Tooltip, {
  content: event.error
}, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(WarningTriangleIcon, {
  color: "orange"
}), " ", event.type));
const DetailCell = (event) => /* @__PURE__ */ React.createElement(DescriptionList, {
  isHorizontal: true,
  className: "keycloak_eventsection_details"
}, Object.entries(event.details).map(([key, value]) => /* @__PURE__ */ React.createElement(DescriptionListGroup, {
  key
}, /* @__PURE__ */ React.createElement(DescriptionListTerm, null, key), /* @__PURE__ */ React.createElement(DescriptionListDescription, null, value))));
export default function EventsSection() {
  const {t} = useTranslation("events");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const formatDate = useFormatDate();
  const [key, setKey] = useState(0);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [events, setEvents] = useState();
  const [activeFilters, setActiveFilters] = useState({});
  const filterLabels = {
    client: t("client"),
    dateFrom: t("dateFrom"),
    dateTo: t("dateTo"),
    user: t("userId"),
    type: t("eventType")
  };
  const {
    getValues,
    register,
    reset,
    formState: {isDirty},
    control
  } = useForm({
    shouldUnregister: false,
    mode: "onChange",
    defaultValues
  });
  useFetch(() => adminClient.realms.getConfigEvents({realm}), (events2) => setEvents(events2), []);
  function loader(first, max) {
    return adminClient.realms.findEvents({
      ...activeFilters,
      realm,
      first,
      max
    });
  }
  function submitSearch() {
    setSearchDropdownOpen(false);
    commitFilters();
  }
  function resetSearch() {
    reset();
    commitFilters();
  }
  function removeFilter(key2) {
    const formValues = {...getValues()};
    delete formValues[key2];
    reset({...defaultValues, ...formValues});
    commitFilters();
  }
  function removeFilterValue(key2, valueToRemove) {
    const formValues = getValues();
    const fieldValue = formValues[key2];
    const newFieldValue = Array.isArray(fieldValue) ? fieldValue.filter((val) => val !== valueToRemove) : fieldValue;
    reset({...formValues, [key2]: newFieldValue});
    commitFilters();
  }
  function commitFilters() {
    const newFilters = pickBy(getValues(), (value) => value !== "" || Array.isArray(value) && value.length > 0);
    setActiveFilters(newFilters);
    setKey(key + 1);
  }
  function refresh() {
    commitFilters();
  }
  const UserDetailLink = (event) => /* @__PURE__ */ React.createElement(React.Fragment, null, event.userId && /* @__PURE__ */ React.createElement(Link, {
    key: `link-${event.time}-${event.type}`,
    to: toUser({
      realm,
      id: event.userId,
      tab: "settings"
    })
  }, event.userId), !event.userId && t("noUserDetails"));
  const userEventSearchFormDisplay = () => {
    return /* @__PURE__ */ React.createElement(Flex, {
      direction: {default: "column"},
      spaceItems: {default: "spaceItemsNone"}
    }, /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Dropdown, {
      id: "user-events-search-select",
      "data-testid": "UserEventsSearchSelector",
      className: "pf-u-ml-md",
      toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
        "data-testid": "userEventsSearchSelectorToggle",
        onToggle: (isOpen) => setSearchDropdownOpen(isOpen),
        className: "keycloak__events_search_selector_dropdown__toggle"
      }, t("searchForUserEvent")),
      isOpen: searchDropdownOpen
    }, /* @__PURE__ */ React.createElement(Form, {
      isHorizontal: true,
      className: "keycloak__events_search__form",
      "data-testid": "searchForm"
    }, /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("userId"),
      fieldId: "kc-userId",
      className: "keycloak__events_search__form_label"
    }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
      ref: register(),
      type: "text",
      id: "kc-userId",
      name: "user",
      "data-testid": "userId-searchField"
    })), /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("eventType"),
      fieldId: "kc-eventType",
      className: "keycloak__events_search__form_label"
    }, /* @__PURE__ */ React.createElement(Controller, {
      name: "type",
      control,
      render: ({
        onChange,
        value
      }) => /* @__PURE__ */ React.createElement(Select, {
        className: "keycloak__events_search__type_select",
        name: "eventType",
        "data-testid": "event-type-searchField",
        chipGroupProps: {
          numChips: 1,
          expandedText: t("common:hide"),
          collapsedText: t("common:showRemaining")
        },
        variant: SelectVariant.typeaheadMulti,
        typeAheadAriaLabel: "Select",
        onToggle: (isOpen) => setSelectOpen(isOpen),
        selections: value,
        onSelect: (_, selectedValue) => {
          const option = selectedValue.toString();
          const changedValue = value.includes(option) ? value.filter((item) => item !== option) : [...value, option];
          onChange(changedValue);
        },
        onClear: (event) => {
          event.stopPropagation();
          onChange([]);
        },
        isOpen: selectOpen,
        "aria-labelledby": "eventType",
        chipGroupComponent: /* @__PURE__ */ React.createElement(ChipGroup, null, value.map((chip) => /* @__PURE__ */ React.createElement(Chip, {
          key: chip,
          onClick: (event) => {
            event.stopPropagation();
            onChange(value.filter((val) => val !== chip));
          }
        }, chip)))
      }, events?.enabledEventTypes?.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
        key: option,
        value: option
      })))
    })), /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("client"),
      fieldId: "kc-client",
      className: "keycloak__events_search__form_label"
    }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
      ref: register(),
      type: "text",
      id: "kc-client",
      name: "client",
      "data-testid": "client-searchField"
    })), /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("dateFrom"),
      fieldId: "kc-dateFrom",
      className: "keycloak__events_search__form_label"
    }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
      ref: register(),
      type: "text",
      id: "kc-dateFrom",
      name: "dateFrom",
      className: "pf-c-form-control pf-m-icon pf-m-calendar",
      placeholder: "yyyy-MM-dd",
      "data-testid": "dateFrom-searchField"
    })), /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("dateTo"),
      fieldId: "kc-dateTo",
      className: "keycloak__events_search__form_label"
    }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
      ref: register(),
      type: "text",
      id: "kc-dateTo",
      name: "dateTo",
      className: "pf-c-form-control pf-m-icon pf-m-calendar",
      placeholder: "yyyy-MM-dd",
      "data-testid": "dateTo-searchField"
    })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
      variant: "primary",
      onClick: submitSearch,
      "data-testid": "search-events-btn",
      isDisabled: !isDirty
    }, t("searchUserEventsBtn")), /* @__PURE__ */ React.createElement(Button, {
      variant: "secondary",
      onClick: resetSearch,
      isDisabled: !isDirty
    }, t("resetBtn"))))), /* @__PURE__ */ React.createElement(Button, {
      className: "pf-u-ml-md",
      onClick: refresh,
      "data-testid": "refresh-btn"
    }, t("refresh"))), /* @__PURE__ */ React.createElement(FlexItem, null, Object.entries(activeFilters).length > 0 && /* @__PURE__ */ React.createElement("div", {
      className: "keycloak__searchChips pf-u-ml-md"
    }, Object.entries(activeFilters).map((filter) => {
      const [key2, value] = filter;
      return /* @__PURE__ */ React.createElement(ChipGroup, {
        className: "pf-u-mt-md pf-u-mr-md",
        key: key2,
        categoryName: filterLabels[key2],
        isClosable: true,
        onClick: () => removeFilter(key2)
      }, typeof value === "string" ? /* @__PURE__ */ React.createElement(Chip, {
        isReadOnly: true
      }, value) : value.map((entry) => /* @__PURE__ */ React.createElement(Chip, {
        key: entry,
        onClick: () => removeFilterValue(key2, entry)
      }, entry)));
    }))));
  };
  const history = useHistory();
  const route = (tab) => routableTab({
    to: toEvents({realm, tab}),
    history
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "events:title",
    subKey: /* @__PURE__ */ React.createElement(Trans, {
      i18nKey: "events:eventExplain"
    }, "If you want to configure user events, Admin events or Event listeners, please enter", /* @__PURE__ */ React.createElement(Link, {
      to: toRealmSettings({realm, tab: "events"})
    }, t("eventConfig")), "page realm settings to configure."),
    helpUrl: helpUrls.eventsUrl,
    divider: false
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(RoutableTabs, {
    isBox: true,
    defaultLocation: toEvents({realm, tab: "user-events"})
  }, /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("userEvents")),
    ...route("user-events")
  }, /* @__PURE__ */ React.createElement("div", {
    className: "keycloak__events_table"
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader,
    detailColumns: [
      {
        name: "details",
        enabled: (event) => event.details !== void 0,
        cellRenderer: DetailCell
      }
    ],
    isPaginated: true,
    ariaLabelKey: "events:title",
    toolbarItem: userEventSearchFormDisplay(),
    columns: [
      {
        name: "time",
        displayKey: "events:time",
        cellFormatters: [expandable],
        cellRenderer: (row) => formatDate(new Date(row.time), FORMAT_DATE_AND_TIME)
      },
      {
        name: "userId",
        displayKey: "events:user",
        cellRenderer: UserDetailLink
      },
      {
        name: "type",
        displayKey: "events:eventType",
        cellRenderer: StatusRow
      },
      {
        name: "ipAddress",
        displayKey: "events:ipAddress",
        transforms: [cellWidth(10)]
      },
      {
        name: "clientId",
        displayKey: "events:client"
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("emptyEvents"),
      instructions: t("emptyEventsInstructions")
    }),
    isSearching: Object.keys(activeFilters).length > 0
  }))), /* @__PURE__ */ React.createElement(Tab, {
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("adminEvents")),
    "data-testid": "admin-events-tab",
    ...route("admin-events")
  }, /* @__PURE__ */ React.createElement(AdminEvents, null)))));
}
