import React, {useState} from "../_snowpack/pkg/react.js";
import {useHistory, useParams} from "../_snowpack/pkg/react-router-dom.js";
import {Trans, useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {
  DataList,
  Label,
  PageSection,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  ToggleGroup,
  ToggleGroupItem,
  AlertVariant,
  Button,
  ButtonVariant,
  DropdownItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {CheckCircleIcon, TableIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {EmptyExecutionState} from "./EmptyExecutionState.js";
import {toUpperCase} from "../util.js";
import {FlowHeader} from "./components/FlowHeader.js";
import {FlowRow} from "./components/FlowRow.js";
import {
  ExecutionList
} from "./execution-model.js";
import {FlowDiagram} from "./components/FlowDiagram.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {AddStepModal} from "./components/modals/AddStepModal.js";
import {AddSubFlowModal} from "./components/modals/AddSubFlowModal.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {DuplicateFlowModal} from "./DuplicateFlowModal.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import useToggle from "../utils/useToggle.js";
import {toAuthentication} from "./routes/Authentication.js";
import {EditFlowModal} from "./EditFlowModal.js";
import {BindFlowDialog} from "./BindFlowDialog.js";
export const providerConditionFilter = (value) => value.displayName?.startsWith("Condition ");
export default function FlowDetails() {
  const {t} = useTranslation("authentication");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {addAlert, addError} = useAlerts();
  const {id, usedBy, builtIn} = useParams();
  const history = useHistory();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  const [tableView, setTableView] = useState(true);
  const [flow, setFlow] = useState();
  const [executionList, setExecutionList] = useState();
  const [dragged, setDragged] = useState();
  const [liveText, setLiveText] = useState("");
  const [showAddExecutionDialog, setShowAddExecutionDialog] = useState();
  const [showAddSubFlowDialog, setShowSubFlowDialog] = useState();
  const [selectedExecution, setSelectedExecution] = useState();
  const [open, toggleOpen, setOpen] = useToggle();
  const [edit, setEdit] = useState(false);
  const [bindFlowOpen, toggleBindFlow] = useToggle();
  useFetch(async () => {
    const flows = await adminClient.authenticationManagement.getFlows();
    const flow2 = flows.find((f) => f.id === id);
    if (!flow2) {
      throw new Error(t("common:notFound"));
    }
    const executions = await adminClient.authenticationManagement.getExecutions({
      flow: flow2.alias
    });
    return {flow: flow2, executions};
  }, ({flow: flow2, executions}) => {
    setFlow(flow2);
    setExecutionList(new ExecutionList(executions));
  }, [key]);
  const executeChange = async (ex, change) => {
    try {
      let id2 = ex.id;
      if ("parent" in change) {
        await adminClient.authenticationManagement.delExecution({id: id2});
        const result = await adminClient.authenticationManagement.addExecutionToFlow({
          flow: change.parent?.displayName || flow?.alias,
          provider: ex.providerId
        });
        id2 = result.id;
      }
      const times = change.newIndex - change.oldIndex;
      for (let index = 0; index < Math.abs(times); index++) {
        if (times > 0) {
          await adminClient.authenticationManagement.lowerPriorityExecution({
            id: id2
          });
        } else {
          await adminClient.authenticationManagement.raisePriorityExecution({
            id: id2
          });
        }
      }
      refresh();
      addAlert(t("updateFlowSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:updateFlowError", error);
    }
  };
  const update = async (execution) => {
    const {executionList: executionList2, isCollapsed, ...ex} = execution;
    try {
      await adminClient.authenticationManagement.updateExecution({flow: flow?.alias}, ex);
      refresh();
      addAlert(t("updateFlowSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:updateFlowError", error);
    }
  };
  const addExecution = async (name, type) => {
    try {
      await adminClient.authenticationManagement.addExecutionToFlow({
        flow: name,
        provider: type.id
      });
      refresh();
      addAlert(t("updateFlowSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:updateFlowError", error);
    }
  };
  const addFlow = async (flow2, {name, description = "", type, provider}) => {
    try {
      await adminClient.authenticationManagement.addFlowToFlow({
        flow: flow2,
        alias: name,
        description,
        provider,
        type
      });
      refresh();
      addAlert(t("updateFlowSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:updateFlowError", error);
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "authentication:deleteConfirmExecution",
    children: /* @__PURE__ */ React.createElement(Trans, {
      i18nKey: "authentication:deleteConfirmExecutionMessage"
    }, " ", /* @__PURE__ */ React.createElement("strong", null, {name: selectedExecution?.displayName}), "."),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.authenticationManagement.delExecution({
          id: selectedExecution?.id
        });
        addAlert(t("deleteExecutionSuccess"), AlertVariant.success);
        refresh();
      } catch (error) {
        addError("authentication:deleteExecutionError", error);
      }
    }
  });
  const [toggleDeleteFlow, DeleteFlowConfirm] = useConfirmDialog({
    titleKey: "authentication:deleteConfirmFlow",
    children: /* @__PURE__ */ React.createElement(Trans, {
      i18nKey: "authentication:deleteConfirmFlowMessage"
    }, " ", /* @__PURE__ */ React.createElement("strong", null, {flow: flow?.alias || ""}), "."),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.authenticationManagement.deleteFlow({
          flowId: flow.id
        });
        history.push(toAuthentication({realm}));
        addAlert(t("deleteFlowSuccess"), AlertVariant.success);
      } catch (error) {
        addError("authentication:deleteFlowError", error);
      }
    }
  });
  const hasExecutions = executionList?.expandableList.length !== 0;
  const dropdownItems = [
    ...usedBy !== "default" && flow?.providerId !== "client-flow" ? [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        "data-testid": "set-as-default",
        key: "default",
        onClick: toggleBindFlow
      }, t("bindFlow"))
    ] : [],
    /* @__PURE__ */ React.createElement(DropdownItem, {
      key: "duplicate",
      onClick: () => setOpen(true)
    }, t("duplicate")),
    ...!builtIn ? [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        "data-testid": "edit-flow",
        key: "edit",
        onClick: () => setEdit(true)
      }, t("editInfo")),
      /* @__PURE__ */ React.createElement(DropdownItem, {
        "data-testid": "delete-flow",
        key: "delete",
        onClick: () => toggleDeleteFlow()
      }, t("common:delete"))
    ] : []
  ];
  return /* @__PURE__ */ React.createElement(React.Fragment, null, bindFlowOpen && /* @__PURE__ */ React.createElement(BindFlowDialog, {
    flowAlias: flow?.alias,
    onClose: () => {
      toggleBindFlow();
      refresh();
    }
  }), open && /* @__PURE__ */ React.createElement(DuplicateFlowModal, {
    name: flow?.alias,
    description: flow?.description,
    toggleDialog: toggleOpen,
    onComplete: () => {
      refresh();
      setOpen(false);
    }
  }), edit && /* @__PURE__ */ React.createElement(EditFlowModal, {
    flow,
    toggleDialog: () => {
      setEdit(!edit);
      refresh();
    }
  }), /* @__PURE__ */ React.createElement(DeleteFlowConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: toUpperCase(flow?.alias || ""),
    badges: [
      {text: /* @__PURE__ */ React.createElement(Label, null, t(usedBy))},
      builtIn ? {
        text: /* @__PURE__ */ React.createElement(Label, {
          className: "keycloak_authentication-section__usedby_label",
          icon: /* @__PURE__ */ React.createElement(CheckCircleIcon, null)
        }, t("buildIn")),
        id: "builtIn"
      } : {}
    ],
    dropdownItems
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, executionList && hasExecutions && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Toolbar, {
    id: "toolbar"
  }, /* @__PURE__ */ React.createElement(ToolbarContent, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(ToggleGroup, null, /* @__PURE__ */ React.createElement(ToggleGroupItem, {
    icon: /* @__PURE__ */ React.createElement(TableIcon, null),
    "aria-label": t("tableView"),
    buttonId: "tableView",
    isSelected: tableView,
    onChange: () => setTableView(true)
  }), /* @__PURE__ */ React.createElement(ToggleGroupItem, {
    icon: /* @__PURE__ */ React.createElement("i", {
      className: "fas fa-project-diagram"
    }),
    "aria-label": t("diagramView"),
    buttonId: "diagramView",
    isSelected: !tableView,
    onChange: () => setTableView(false)
  }))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "addStep",
    variant: "secondary",
    onClick: () => setShowAddExecutionDialog(true)
  }, t("addStep"))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "addSubFlow",
    variant: "secondary",
    onClick: () => setShowSubFlowDialog(true)
  }, t("addSubFlow"))))), /* @__PURE__ */ React.createElement(DeleteConfirm, null), tableView && /* @__PURE__ */ React.createElement(DataList, {
    "aria-label": t("flows"),
    onDragFinish: (order) => {
      const withoutHeaderId = order.slice(1);
      setLiveText(t("common:onDragFinish", {list: dragged?.displayName}));
      const change = executionList.getChange(dragged, withoutHeaderId);
      executeChange(dragged, change);
    },
    onDragStart: (id2) => {
      const item = executionList.findExecution(id2);
      setLiveText(t("common:onDragStart", {item: item.displayName}));
      setDragged(item);
      if (!item.isCollapsed) {
        item.isCollapsed = true;
        setExecutionList(executionList.clone());
      }
    },
    onDragMove: () => setLiveText(t("common:onDragMove", {item: dragged?.displayName})),
    onDragCancel: () => setLiveText(t("common:onDragCancel")),
    itemOrder: [
      "header",
      ...executionList.order().map((ex) => ex.id)
    ]
  }, /* @__PURE__ */ React.createElement(FlowHeader, null), /* @__PURE__ */ React.createElement(React.Fragment, null, executionList.expandableList.map((execution) => /* @__PURE__ */ React.createElement(FlowRow, {
    builtIn: !!builtIn,
    key: execution.id,
    execution,
    onRowClick: (execution2) => {
      execution2.isCollapsed = !execution2.isCollapsed;
      setExecutionList(executionList.clone());
    },
    onRowChange: update,
    onAddExecution: (execution2, type) => addExecution(execution2.displayName, type),
    onAddFlow: (execution2, flow2) => addFlow(execution2.displayName, flow2),
    onDelete: (execution2) => {
      setSelectedExecution(execution2);
      toggleDeleteDialog();
    }
  })))), flow && /* @__PURE__ */ React.createElement(React.Fragment, null, showAddExecutionDialog && /* @__PURE__ */ React.createElement(AddStepModal, {
    name: flow.alias,
    type: flow.providerId === "client-flow" ? "client" : "basic",
    onSelect: (type) => {
      if (type) {
        addExecution(flow.alias, type);
      }
      setShowAddExecutionDialog(false);
    }
  }), showAddSubFlowDialog && /* @__PURE__ */ React.createElement(AddSubFlowModal, {
    name: flow.alias,
    onCancel: () => setShowSubFlowDialog(false),
    onConfirm: (newFlow) => {
      addFlow(flow.alias, newFlow);
      setShowSubFlowDialog(false);
    }
  })), /* @__PURE__ */ React.createElement("div", {
    className: "pf-screen-reader",
    "aria-live": "assertive"
  }, liveText)), !tableView && executionList?.expandableList && /* @__PURE__ */ React.createElement(FlowDiagram, {
    executionList
  }), !executionList?.expandableList || flow && !hasExecutions && /* @__PURE__ */ React.createElement(EmptyExecutionState, {
    flow,
    onAddExecution: (type) => addExecution(flow.alias, type),
    onAddFlow: (newFlow) => addFlow(flow.alias, newFlow)
  })));
}
