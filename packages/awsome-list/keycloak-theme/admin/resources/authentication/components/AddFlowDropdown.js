import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  Tooltip
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {PlusIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {AddStepModal} from "./modals/AddStepModal.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {AddSubFlowModal} from "./modals/AddSubFlowModal.js";
export const AddFlowDropdown = ({
  execution,
  onAddExecution,
  onAddFlow
}) => {
  const {t} = useTranslation("authentication");
  const {adminClient} = useAdminClient();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  const [providerId, setProviderId] = useState();
  useFetch(() => adminClient.authenticationManagement.getFlow({
    flowId: execution.flowId
  }), ({providerId: providerId2}) => setProviderId(providerId2), []);
  return /* @__PURE__ */ React.createElement(Tooltip, {
    content: t("common:add")
  }, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Dropdown, {
    isPlain: true,
    position: "right",
    "data-testid": `${execution.displayName}-edit-dropdown`,
    isOpen: open,
    toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
      onToggle: setOpen,
      "aria-label": t("common:add")
    }, /* @__PURE__ */ React.createElement(PlusIcon, null)),
    dropdownItems: [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "addStep",
        onClick: () => setType(providerId === "form-flow" ? "form" : "basic")
      }, t("addStep")),
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "addCondition",
        onClick: () => setType("condition")
      }, t("addCondition")),
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "addSubFlow",
        onClick: () => setType("subFlow")
      }, t("addSubFlow"))
    ],
    onSelect: () => setOpen(false)
  }), type && type !== "subFlow" && /* @__PURE__ */ React.createElement(AddStepModal, {
    name: execution.displayName,
    type,
    onSelect: (type2) => {
      if (type2) {
        onAddExecution(execution, type2);
      }
      setType(void 0);
    }
  }), type === "subFlow" && /* @__PURE__ */ React.createElement(AddSubFlowModal, {
    name: execution.displayName,
    onCancel: () => setType(void 0),
    onConfirm: (flow) => {
      onAddFlow(execution, flow);
      setType(void 0);
    }
  })));
};
