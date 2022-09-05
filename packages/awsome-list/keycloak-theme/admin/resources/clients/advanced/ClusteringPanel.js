import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  ExpandableSection,
  FormGroup,
  Split,
  SplitItem,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {parseResult} from "../AdvancedTab.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../../components/table-toolbar/KeycloakDataTable.js";
import {TimeSelector} from "../../components/time-selector/TimeSelector.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {AddHostDialog} from "./AddHostDialog.js";
import useFormatDate, {FORMAT_DATE_AND_TIME} from "../../utils/useFormatDate.js";
export const ClusteringPanel = ({
  save,
  client: {id, registeredNodes, access}
}) => {
  const {t} = useTranslation("clients");
  const {control} = useFormContext();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const formatDate = useFormatDate();
  const [nodes, setNodes] = useState(registeredNodes || {});
  const [expanded, setExpanded] = useState(false);
  const [selectedNode, setSelectedNode] = useState("");
  const [addNodeOpen, setAddNodeOpen] = useState(false);
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  const testCluster = async () => {
    const result = await adminClient.clients.testNodesAvailable({id});
    parseResult(result, "testCluster", addAlert, t);
  };
  const [toggleDeleteNodeConfirm, DeleteNodeConfirm] = useConfirmDialog({
    titleKey: "clients:deleteNode",
    messageKey: t("deleteNodeBody", {
      node: selectedNode
    }),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.clients.deleteClusterNode({
          id,
          node: selectedNode
        });
        setNodes({
          ...Object.keys(nodes).reduce((object, key2) => {
            if (key2 !== selectedNode) {
              object[key2] = nodes[key2];
            }
            return object;
          }, {})
        });
        refresh();
        addAlert(t("deleteNodeSuccess"), AlertVariant.success);
      } catch (error) {
        addError("clients:deleteNodeFail", error);
      }
    }
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-clients",
    fineGrainedAccess: access?.configure,
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("nodeReRegistrationTimeout"),
    fieldId: "kc-node-reregistration-timeout",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:nodeReRegistrationTimeout",
      fieldLabelId: "clients:nodeReRegistrationTimeout"
    })
  }, /* @__PURE__ */ React.createElement(Split, {
    hasGutter: true
  }, /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(Controller, {
    name: "nodeReRegistrationTimeout",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      value,
      onChange
    })
  })), /* @__PURE__ */ React.createElement(SplitItem, null, /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.secondary,
    onClick: () => save()
  }, t("common:save")))))), /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteNodeConfirm, null), /* @__PURE__ */ React.createElement(AddHostDialog, {
    clientId: id,
    isOpen: addNodeOpen,
    onAdded: (node) => {
      nodes[node] = Date.now() / 1e3;
      refresh();
    },
    onClose: () => setAddNodeOpen(false)
  }), /* @__PURE__ */ React.createElement(ExpandableSection, {
    toggleText: t("registeredClusterNodes"),
    onToggle: setExpanded,
    isExpanded: expanded
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    ariaLabelKey: "registeredClusterNodes",
    loader: () => Promise.resolve(Object.entries(nodes || {}).map((entry) => {
      return {host: entry[0], registration: entry[1]};
    })),
    toolbarItem: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      id: "testClusterAvailability",
      onClick: testCluster,
      variant: ButtonVariant.secondary,
      isDisabled: Object.keys(nodes).length === 0
    }, t("testClusterAvailability"))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      id: "registerNodeManually",
      onClick: () => setAddNodeOpen(true),
      variant: ButtonVariant.tertiary
    }, t("registerNodeManually")))),
    actions: [
      {
        title: t("common:delete"),
        onRowClick: (node) => {
          setSelectedNode(node.host);
          toggleDeleteNodeConfirm();
        }
      }
    ],
    columns: [
      {
        name: "host",
        displayKey: "clients:nodeHost"
      },
      {
        name: "registration",
        displayKey: "clients:lastRegistration",
        cellFormatters: [
          (value) => value ? formatDate(new Date(parseInt(value.toString()) * 1e3), FORMAT_DATE_AND_TIME) : ""
        ]
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("noNodes"),
      instructions: t("noNodesInstructions"),
      primaryActionText: t("registerNodeManually"),
      onPrimaryAction: () => setAddNodeOpen(true)
    })
  }))));
};
