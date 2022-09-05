import React from "../../_snowpack/pkg/react.js";
import {
  Pagination,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {TableToolbar} from "./TableToolbar.js";
export const PaginatingTableToolbar = ({
  count,
  first,
  max,
  onNextClick,
  onPreviousClick,
  onPerPageSelect,
  searchTypeComponent,
  toolbarItem,
  subToolbar,
  children,
  inputGroupName,
  inputGroupPlaceholder,
  inputGroupOnEnter
}) => {
  const page = Math.round(first / max);
  const pagination = (variant = "top") => /* @__PURE__ */ React.createElement(Pagination, {
    isCompact: true,
    toggleTemplate: ({firstIndex, lastIndex}) => /* @__PURE__ */ React.createElement("b", null, firstIndex, " - ", lastIndex),
    itemCount: count + page * max,
    page: page + 1,
    perPage: max,
    onNextClick: (_, p) => onNextClick((p - 1) * max),
    onPreviousClick: (_, p) => onPreviousClick((p - 1) * max),
    onPerPageSelect: (_, m, f) => onPerPageSelect(f - 1, m),
    variant
  });
  return /* @__PURE__ */ React.createElement(TableToolbar, {
    searchTypeComponent,
    toolbarItem: /* @__PURE__ */ React.createElement(React.Fragment, null, toolbarItem, count !== 0 && /* @__PURE__ */ React.createElement(ToolbarItem, {
      variant: "pagination"
    }, pagination())),
    subToolbar,
    toolbarItemFooter: count !== 0 ? /* @__PURE__ */ React.createElement(ToolbarItem, null, pagination("bottom")) : null,
    inputGroupName,
    inputGroupPlaceholder,
    inputGroupOnEnter
  }, children);
};
