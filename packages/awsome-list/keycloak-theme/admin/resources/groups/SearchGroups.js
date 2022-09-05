import React, {useState} from "../_snowpack/pkg/react.js";
import {Link} from "../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {
  Button,
  ButtonVariant,
  Chip,
  ChipGroup,
  InputGroup,
  PageSection,
  PageSectionVariants,
  Stack,
  StackItem,
  TextInput,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {SearchIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {GroupPath} from "../components/group/GroupPath.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useAccess} from "../context/access/Access.js";
export default function SearchGroups() {
  const {t} = useTranslation("groups");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerms, setSearchTerms] = useState([]);
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  const {hasAccess} = useAccess();
  const isManager = hasAccess("manage-users", "query-clients");
  const deleteTerm = (id) => {
    const index = searchTerms.indexOf(id);
    searchTerms.splice(index, 1);
    setSearchTerms([...searchTerms]);
    refresh();
  };
  const addTerm = () => {
    if (searchTerm !== "") {
      setSearchTerms([...searchTerms, searchTerm]);
      setSearchTerm("");
      refresh();
    }
  };
  const GroupNameCell = (group) => {
    if (!isManager)
      return /* @__PURE__ */ React.createElement("span", null, group.name);
    return /* @__PURE__ */ React.createElement(Link, {
      key: group.id,
      to: `/${realm}/groups/search/${group.link}`
    }, group.name);
  };
  const flatten = (groups, id) => {
    let result = [];
    for (const group of groups) {
      const link = `${id || ""}${id ? "/" : ""}${group.id}`;
      result.push({...group, link});
      if (group.subGroups) {
        result = [...result, ...flatten(group.subGroups, link)];
      }
    }
    return result;
  };
  const loader = async (first, max) => {
    const params = {
      first,
      max
    };
    let result = [];
    if (searchTerms[0]) {
      result = await adminClient.groups.find({
        ...params,
        search: searchTerms[0]
      });
      result = flatten(result);
      for (const searchTerm2 of searchTerms) {
        result = result.filter((group) => group.name?.includes(searchTerm2));
      }
    }
    return result;
  };
  const Path = (group) => /* @__PURE__ */ React.createElement(GroupPath, {
    group
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "groups:searchGroups"
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: PageSectionVariants.light,
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    isSearching: true,
    toolbarItem: /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Stack, null, /* @__PURE__ */ React.createElement(StackItem, {
      className: "pf-u-mb-sm"
    }, /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(TextInput, {
      name: "search",
      "data-testid": "group-search",
      type: "search",
      "aria-label": t("search"),
      placeholder: t("searchGroups"),
      value: searchTerm,
      onChange: (value) => setSearchTerm(value),
      onKeyDown: (event) => {
        if (event.key === "Enter") {
          addTerm();
        }
      }
    }), /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "search-button",
      variant: ButtonVariant.control,
      "aria-label": t("search"),
      onClick: addTerm
    }, /* @__PURE__ */ React.createElement(SearchIcon, null)))), /* @__PURE__ */ React.createElement(StackItem, null, /* @__PURE__ */ React.createElement(ChipGroup, null, searchTerms.map((term) => /* @__PURE__ */ React.createElement(Chip, {
      key: term,
      onClick: () => deleteTerm(term)
    }, term)))))),
    ariaLabelKey: "groups:groups",
    isPaginated: true,
    loader,
    columns: [
      {
        name: "name",
        displayKey: "groups:groupName",
        cellRenderer: GroupNameCell
      },
      {
        name: "path",
        displayKey: "groups:path",
        cellRenderer: Path
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("noSearchResults"),
      instructions: t("noSearchResultsInstructions"),
      hasIcon: false
    })
  })));
}
