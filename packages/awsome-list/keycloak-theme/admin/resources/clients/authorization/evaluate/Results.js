import React, {useMemo, useState} from "../../../_snowpack/pkg/react.js";
import {
  Select,
  SelectVariant,
  SelectOption,
  PageSection,
  ActionGroup,
  Button,
  TextInput,
  ButtonVariant,
  InputGroup,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Divider
} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {SearchIcon} from "../../../_snowpack/pkg/@patternfly/react-icons.js";
import {TableComposable, Th, Thead, Tr} from "../../../_snowpack/pkg/@patternfly/react-table.js";
import {AuthorizationEvaluateResource} from "../AuthorizationEvaluateResource.js";
import {ListEmptyState} from "../../../components/list-empty-state/ListEmptyState.js";
import {AuthorizationDataModal} from "../AuthorizationDataModal.js";
import useToggle from "../../../utils/useToggle.js";
var ResultsFilter;
(function(ResultsFilter2) {
  ResultsFilter2["All"] = "ALL";
  ResultsFilter2["StatusDenied"] = "STATUS_DENIED";
  ResultsFilter2["StatusPermitted"] = "STATUS_PERMITTED";
})(ResultsFilter || (ResultsFilter = {}));
function filterResults(results, filter) {
  switch (filter) {
    case ResultsFilter.StatusPermitted:
      return results.filter(({status}) => status === "PERMIT");
    case ResultsFilter.StatusDenied:
      return results.filter(({status}) => status === "DENY");
    default:
      return results;
  }
}
export const Results = ({evaluateResult, refresh, back}) => {
  const {t} = useTranslation("clients");
  const [filterDropdownOpen, toggleFilterDropdown] = useToggle();
  const [filter, setFilter] = useState(ResultsFilter.All);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const confirmSearchQuery = () => {
    setSearchQuery(searchInput);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      confirmSearchQuery();
    }
  };
  const filteredResources = useMemo(() => filterResults(evaluateResult.results, filter).filter(({resource}) => resource?.name?.includes(searchQuery) ?? false), [evaluateResult.results, filter, searchQuery]);
  const noEvaluatedData = evaluateResult.results.length === 0;
  const noFilteredData = filteredResources.length === 0;
  return /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(ToolbarGroup, {
    className: "providers-toolbar"
  }, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(TextInput, {
    name: "inputGroupName",
    id: "inputGroupName",
    type: "search",
    "aria-label": t("common:search"),
    placeholder: t("common:search"),
    onChange: setSearchInput,
    onKeyDown: handleKeyDown
  }), /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.control,
    "aria-label": t("common:search"),
    onClick: () => confirmSearchQuery()
  }, /* @__PURE__ */ React.createElement(SearchIcon, null)))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Select, {
    width: 300,
    "data-testid": "filter-type-select",
    isOpen: filterDropdownOpen,
    className: "kc-filter-type-select",
    variant: SelectVariant.single,
    onToggle: toggleFilterDropdown,
    onSelect: (_, value) => {
      setFilter(value);
      toggleFilterDropdown();
      refresh();
    },
    selections: filter
  }, /* @__PURE__ */ React.createElement(SelectOption, {
    "data-testid": "all-results-option",
    value: ResultsFilter.All,
    isPlaceholder: true
  }, t("allResults")), /* @__PURE__ */ React.createElement(SelectOption, {
    "data-testid": "result-permit-option",
    value: ResultsFilter.StatusPermitted
  }, t("resultPermit")), /* @__PURE__ */ React.createElement(SelectOption, {
    "data-testid": "result-deny-option",
    value: ResultsFilter.StatusDenied
  }, t("resultDeny")))))), !noFilteredData && /* @__PURE__ */ React.createElement(TableComposable, {
    "aria-label": t("evaluationResults")
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null), /* @__PURE__ */ React.createElement(Th, null, t("resource")), /* @__PURE__ */ React.createElement(Th, null, t("overallResults")), /* @__PURE__ */ React.createElement(Th, null, t("scopes")), /* @__PURE__ */ React.createElement(Th, null))), filteredResources.map((resource, rowIndex) => /* @__PURE__ */ React.createElement(AuthorizationEvaluateResource, {
    key: rowIndex,
    rowIndex,
    resource,
    evaluateResults: evaluateResult.results
  }))), (noFilteredData || noEvaluatedData) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(ListEmptyState, {
    isSearchVariant: true,
    message: t("common:noSearchResults"),
    instructions: t("common:noSearchResultsInstructions")
  })), /* @__PURE__ */ React.createElement(ActionGroup, {
    className: "kc-evaluated-options"
  }, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "authorization-eval",
    id: "back-btn",
    onClick: back
  }, t("common:back")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "authorization-reevaluate",
    id: "reevaluate-btn",
    variant: "secondary",
    onClick: refresh
  }, t("clients:reevaluate")), /* @__PURE__ */ React.createElement(AuthorizationDataModal, {
    data: evaluateResult.rpt
  })));
};
