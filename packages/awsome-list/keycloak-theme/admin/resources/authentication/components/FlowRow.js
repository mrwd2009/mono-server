import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  DataListItemRow,
  DataListControl,
  DataListDragButton,
  DataListItemCells,
  DataListCell,
  DataListItem,
  DataListToggle,
  Text,
  TextVariants,
  Button,
  Tooltip
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {TrashIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {FlowTitle} from "./FlowTitle.js";
import {FlowRequirementDropdown} from "./FlowRequirementDropdown.js";
import {ExecutionConfigModal} from "./ExecutionConfigModal.js";
import {AddFlowDropdown} from "./AddFlowDropdown.js";
import {EditFlow} from "./EditFlow.js";
import "./flow-row.css.proxy.js";
export const FlowRow = ({
  builtIn,
  execution,
  onRowClick,
  onRowChange,
  onAddExecution,
  onAddFlow,
  onDelete
}) => {
  const {t} = useTranslation("authentication");
  const hasSubList = !!execution.executionList?.length;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DataListItem, {
    className: "keycloak__authentication__flow-item",
    id: execution.id,
    isExpanded: !execution.isCollapsed,
    "aria-labelledby": `title-id-${execution.id}`
  }, /* @__PURE__ */ React.createElement(DataListItemRow, {
    className: "keycloak__authentication__flow-row",
    "aria-level": execution.level + 1,
    role: "heading",
    "aria-labelledby": execution.id
  }, /* @__PURE__ */ React.createElement(DataListControl, null, /* @__PURE__ */ React.createElement(DataListDragButton, {
    "aria-label": t("common-help:dragHelp")
  })), hasSubList && /* @__PURE__ */ React.createElement(DataListToggle, {
    onClick: () => onRowClick(execution),
    isExpanded: !execution.isCollapsed,
    id: `toggle1-${execution.id}`,
    "aria-controls": execution.executionList[0].id
  }), /* @__PURE__ */ React.createElement(DataListItemCells, {
    dataListCells: [
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: `${execution.id}-name`
      }, !execution.authenticationFlow && /* @__PURE__ */ React.createElement(FlowTitle, {
        id: execution.id,
        key: execution.id,
        title: execution.displayName
      }), execution.authenticationFlow && /* @__PURE__ */ React.createElement(React.Fragment, null, execution.displayName, " ", /* @__PURE__ */ React.createElement("br", null), " ", /* @__PURE__ */ React.createElement(Text, {
        component: TextVariants.small
      }, execution.description))),
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: `${execution.id}-requirement`
      }, /* @__PURE__ */ React.createElement(FlowRequirementDropdown, {
        flow: execution,
        onChange: onRowChange
      })),
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: `${execution.id}-config`
      }, execution.configurable && /* @__PURE__ */ React.createElement(ExecutionConfigModal, {
        execution
      }), execution.authenticationFlow && !builtIn && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AddFlowDropdown, {
        execution,
        onAddExecution,
        onAddFlow
      }), /* @__PURE__ */ React.createElement(EditFlow, {
        execution,
        onRowChange
      })), !builtIn && /* @__PURE__ */ React.createElement(Tooltip, {
        content: t("common:delete")
      }, /* @__PURE__ */ React.createElement(Button, {
        variant: "plain",
        "data-testid": `${execution.displayName}-delete`,
        "aria-label": t("common:delete"),
        onClick: () => onDelete(execution)
      }, /* @__PURE__ */ React.createElement(TrashIcon, null))))
    ]
  }))), !execution.isCollapsed && hasSubList && execution.executionList?.map((ex) => /* @__PURE__ */ React.createElement(FlowRow, {
    builtIn,
    key: ex.id,
    execution: ex,
    onRowClick,
    onRowChange,
    onAddExecution,
    onAddFlow,
    onDelete
  })));
};
