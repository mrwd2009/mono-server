import {
  ActionGroup,
  Button,
  Chip,
  ChipGroup,
  Dropdown,
  DropdownToggle,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Select,
  SelectOption,
  SelectVariant
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {
  cellWidth,
  Table,
  TableBody,
  TableHeader,
  TableVariant
} from "../_snowpack/pkg/@patternfly/react-table.js";
import {CodeEditor, Language} from "../_snowpack/pkg/@patternfly/react-code-editor.js";
import React, {useMemo, useState} from "../_snowpack/pkg/react.js";
import {Controller, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {pickBy} from "../_snowpack/pkg/lodash-es.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import useFormatDate, {FORMAT_DATE_AND_TIME} from "../utils/useFormatDate.js";
import {prettyPrintJSON} from "../util.js";
import {CellResourceLinkRenderer} from "./ResourceLinks.js";
import "./events.css.proxy.js";
const defaultValues = {
  resourceTypes: [],
  operationTypes: [],
  resourcePath: "",
  dateFrom: "",
  dateTo: "",
  authClient: "",
  authUser: "",
  authRealm: "",
  authIpAddress: ""
};
const DisplayDialog = ({
  titleKey,
  onClose,
  children
}) => {
  const {t} = useTranslation("events");
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.medium,
    title: t(titleKey),
    isOpen: true,
    onClose
  }, children);
};
export const AdminEvents = () => {
  const {t} = useTranslation("events");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const serverInfo = useServerInfo();
  const formatDate = useFormatDate();
  const resourceTypes = serverInfo.enums?.["resourceType"];
  const operationTypes = serverInfo.enums?.["operationType"];
  const [key, setKey] = useState(0);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [selectResourceTypesOpen, setSelectResourceTypesOpen] = useState(false);
  const [selectOperationTypesOpen, setSelectOperationTypesOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [authEvent, setAuthEvent] = useState();
  const [representationEvent, setRepresentationEvent] = useState();
  const filterLabels = {
    resourceTypes: t("resourceTypes"),
    operationTypes: t("operationTypes"),
    resourcePath: t("resourcePath"),
    dateFrom: t("dateFrom"),
    dateTo: t("dateTo"),
    authClient: t("client"),
    authUser: t("userId"),
    authRealm: t("realm"),
    authIpAddress: t("ipAddress")
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
  function loader(first, max) {
    return adminClient.realms.findAdminEvents({
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
  const adminEventSearchFormDisplay = () => {
    return /* @__PURE__ */ React.createElement(Flex, {
      direction: {default: "column"},
      spaceItems: {default: "spaceItemsNone"}
    }, /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Dropdown, {
      id: "admin-events-search-select",
      "data-testid": "AdminEventsSearchSelector",
      className: "pf-u-ml-md",
      toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
        "data-testid": "adminEventsSearchSelectorToggle",
        onToggle: (isOpen) => setSearchDropdownOpen(isOpen),
        className: "keycloak__events_search_selector_dropdown__toggle"
      }, t("searchForAdminEvent")),
      isOpen: searchDropdownOpen
    }, /* @__PURE__ */ React.createElement(Form, {
      isHorizontal: true,
      className: "keycloak__events_search__form",
      "data-testid": "searchForm"
    }, /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("resourceTypes"),
      fieldId: "kc-resourceTypes",
      className: "keycloak__events_search__form_label"
    }, /* @__PURE__ */ React.createElement(Controller, {
      name: "resourceTypes",
      control,
      render: ({
        onChange,
        value
      }) => /* @__PURE__ */ React.createElement(Select, {
        className: "keycloak__events_search__type_select",
        name: "resourceTypes",
        "data-testid": "resource-types-searchField",
        chipGroupProps: {
          numChips: 1,
          expandedText: t("common:hide"),
          collapsedText: t("common:showRemaining")
        },
        variant: SelectVariant.typeaheadMulti,
        typeAheadAriaLabel: "Select",
        onToggle: (isOpen) => setSelectResourceTypesOpen(isOpen),
        selections: value,
        onSelect: (_, selectedValue) => {
          const option = selectedValue.toString();
          const changedValue = value.includes(option) ? value.filter((item) => item !== option) : [...value, option];
          onChange(changedValue);
        },
        onClear: (resource) => {
          resource.stopPropagation();
          onChange([]);
        },
        isOpen: selectResourceTypesOpen,
        "aria-labelledby": "resourceTypes",
        chipGroupComponent: /* @__PURE__ */ React.createElement(ChipGroup, null, value.map((chip) => /* @__PURE__ */ React.createElement(Chip, {
          key: chip,
          onClick: (resource) => {
            resource.stopPropagation();
            onChange(value.filter((val) => val !== chip));
          }
        }, chip)))
      }, resourceTypes?.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
        key: option,
        value: option
      })))
    })), /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("operationTypes"),
      fieldId: "kc-operationTypes",
      className: "keycloak__events_search__form_label"
    }, /* @__PURE__ */ React.createElement(Controller, {
      name: "operationTypes",
      control,
      render: ({
        onChange,
        value
      }) => /* @__PURE__ */ React.createElement(Select, {
        className: "keycloak__events_search__type_select",
        name: "operationTypes",
        "data-testid": "operation-types-searchField",
        chipGroupProps: {
          numChips: 1,
          expandedText: t("common:hide"),
          collapsedText: t("common:showRemaining")
        },
        variant: SelectVariant.typeaheadMulti,
        typeAheadAriaLabel: "Select",
        onToggle: (isOpen) => setSelectOperationTypesOpen(isOpen),
        selections: value,
        onSelect: (_, selectedValue) => {
          const option = selectedValue.toString();
          const changedValue = value.includes(option) ? value.filter((item) => item !== option) : [...value, option];
          onChange(changedValue);
        },
        onClear: (operation) => {
          operation.stopPropagation();
          onChange([]);
        },
        isOpen: selectOperationTypesOpen,
        "aria-labelledby": "operationTypes",
        chipGroupComponent: /* @__PURE__ */ React.createElement(ChipGroup, null, value.map((chip) => /* @__PURE__ */ React.createElement(Chip, {
          key: chip,
          onClick: (operation) => {
            operation.stopPropagation();
            onChange(value.filter((val) => val !== chip));
          }
        }, chip)))
      }, operationTypes?.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
        key: option,
        value: option
      })))
    })), /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("resourcePath"),
      fieldId: "kc-resourcePath",
      className: "keycloak__events_search__form_label"
    }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
      ref: register(),
      type: "text",
      id: "kc-resourcePath",
      name: "resourcePath",
      "data-testid": "resourcePath-searchField"
    })), /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("realm"),
      fieldId: "kc-realm",
      className: "keycloak__events_search__form_label"
    }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
      ref: register(),
      type: "text",
      id: "kc-realm",
      name: "authRealm",
      "data-testid": "realm-searchField"
    })), /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("client"),
      fieldId: "kc-client",
      className: "keycloak__events_search__form_label"
    }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
      ref: register(),
      type: "text",
      id: "kc-client",
      name: "authClient",
      "data-testid": "client-searchField"
    })), /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("user"),
      fieldId: "kc-user",
      className: "keycloak__events_search__form_label"
    }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
      ref: register(),
      type: "text",
      id: "kc-user",
      name: "authUser",
      "data-testid": "user-searchField"
    })), /* @__PURE__ */ React.createElement(FormGroup, {
      label: t("ipAddress"),
      fieldId: "kc-ipAddress",
      className: "keycloak__events_search__form_label"
    }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
      ref: register(),
      type: "text",
      id: "kc-ipAddress",
      name: "authIpAddress",
      "data-testid": "ipAddress-searchField"
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
    }, t("searchAdminEventsBtn")), /* @__PURE__ */ React.createElement(Button, {
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
  const rows = [
    [t("realm"), authEvent?.authDetails?.realmId],
    [t("client"), authEvent?.authDetails?.clientId],
    [t("user"), authEvent?.authDetails?.userId],
    [t("ipAddress"), authEvent?.authDetails?.ipAddress]
  ];
  const code = useMemo(() => representationEvent?.representation ? prettyPrintJSON(JSON.parse(representationEvent.representation)) : "", [representationEvent?.representation]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, authEvent && /* @__PURE__ */ React.createElement(DisplayDialog, {
    titleKey: "auth",
    onClose: () => setAuthEvent(void 0)
  }, /* @__PURE__ */ React.createElement(Table, {
    "aria-label": "authData",
    "data-testid": "auth-dialog",
    variant: TableVariant.compact,
    cells: [t("attribute"), t("value")],
    rows
  }, /* @__PURE__ */ React.createElement(TableHeader, null), /* @__PURE__ */ React.createElement(TableBody, null))), representationEvent && /* @__PURE__ */ React.createElement(DisplayDialog, {
    titleKey: "representation",
    "data-testid": "representation-dialog",
    onClose: () => setRepresentationEvent(void 0)
  }, /* @__PURE__ */ React.createElement(CodeEditor, {
    isLineNumbersVisible: true,
    isReadOnly: true,
    code,
    language: Language.json,
    height: "8rem"
  })), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader,
    isPaginated: true,
    ariaLabelKey: "events:adminEvents",
    toolbarItem: adminEventSearchFormDisplay(),
    actions: [
      {
        title: t("auth"),
        onRowClick: (event) => setAuthEvent(event)
      },
      {
        title: t("representation"),
        onRowClick: (event) => setRepresentationEvent(event)
      }
    ],
    columns: [
      {
        name: "time",
        displayKey: "events:time",
        cellRenderer: (row) => formatDate(new Date(row.time), FORMAT_DATE_AND_TIME)
      },
      {
        name: "resourcePath",
        displayKey: "events:resourcePath",
        cellRenderer: CellResourceLinkRenderer
      },
      {
        name: "resourceType",
        displayKey: "events:resourceType"
      },
      {
        name: "operationType",
        displayKey: "events:operationType",
        transforms: [cellWidth(10)]
      },
      {
        name: "",
        displayKey: "events:user",
        cellRenderer: (event) => event.authDetails?.userId
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("emptyEvents"),
      instructions: t("emptyEventsInstructions")
    }),
    isSearching: Object.keys(activeFilters).length > 0
  }));
};
