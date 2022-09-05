import React, {
  useState
} from "../../_snowpack/pkg/react.js";
import {
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  InputGroup,
  Divider,
  SearchInput
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
export const TableToolbar = ({
  toolbarItem,
  subToolbar,
  toolbarItemFooter,
  children,
  searchTypeComponent,
  inputGroupName,
  inputGroupPlaceholder,
  inputGroupOnEnter
}) => {
  const {t} = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const onSearch = () => {
    if (searchValue !== "") {
      setSearchValue(searchValue);
      inputGroupOnEnter?.(searchValue);
    } else {
      setSearchValue("");
      inputGroupOnEnter?.("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(ToolbarContent, null, inputGroupName && /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(InputGroup, null, searchTypeComponent, inputGroupPlaceholder && /* @__PURE__ */ React.createElement(SearchInput, {
    placeholder: inputGroupPlaceholder,
    "aria-label": t("search"),
    value: searchValue,
    onChange: setSearchValue,
    onSearch,
    onKeyDown: handleKeyDown,
    onClear: () => {
      setSearchValue("");
      inputGroupOnEnter?.("");
    }
  }))), toolbarItem)), subToolbar && /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(ToolbarContent, null, subToolbar)), /* @__PURE__ */ React.createElement(Divider, null), children, /* @__PURE__ */ React.createElement(Toolbar, null, toolbarItemFooter));
};
