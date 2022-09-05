import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useFetch, useAdminClient} from "../../context/auth/AdminClient.js";
import {SwitchField} from "../component/SwitchField.js";
import {TextField} from "../component/TextField.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
const LoginFlow = ({
  field,
  label,
  defaultValue
}) => {
  const {t} = useTranslation("identity-providers");
  const {control} = useFormContext();
  const {adminClient} = useAdminClient();
  const [flows, setFlows] = useState();
  const [open, setOpen] = useState(false);
  useFetch(() => adminClient.authenticationManagement.getFlows(), (flows2) => setFlows(flows2.filter((flow) => flow.providerId === "basic-flow")), []);
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(label),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `identity-providers-help:${label}`,
      fieldLabelId: `identity-providers:${label}`
    }),
    fieldId: label
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: field,
    defaultValue,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: label,
      required: true,
      onToggle: () => setOpen(!open),
      onSelect: (_, value2) => {
        onChange(value2);
        setOpen(false);
      },
      selections: value || t("common:none"),
      variant: SelectVariant.single,
      "aria-label": t(label),
      isOpen: open
    }, /* @__PURE__ */ React.createElement(React.Fragment, null, defaultValue === "" && /* @__PURE__ */ React.createElement(SelectOption, {
      key: "empty",
      value: defaultValue
    }, t("common:none"))), /* @__PURE__ */ React.createElement(React.Fragment, null, flows?.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option.alias === value,
      key: option.id,
      value: option.alias
    }, option.alias))))
  }));
};
const syncModes = ["import", "legacy", "force"];
export const AdvancedSettings = ({isOIDC, isSAML}) => {
  const {t} = useTranslation("identity-providers");
  const {control} = useFormContext();
  const [syncModeOpen, setSyncModeOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, !isOIDC && !isSAML && /* @__PURE__ */ React.createElement(TextField, {
    field: "config.defaultScope",
    label: "scopes"
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "storeToken",
    label: "storeTokens",
    fieldType: "boolean"
  }), (isSAML || isOIDC) && /* @__PURE__ */ React.createElement(SwitchField, {
    field: "addReadTokenRoleOnCreate",
    label: "storedTokensReadable",
    fieldType: "boolean"
  }), !isOIDC && !isSAML && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.acceptsPromptNoneForwardFromClient",
    label: "acceptsPromptNone"
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.disableUserInfo",
    label: "disableUserInfo"
  })), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "trustEmail",
    label: "trustEmail",
    fieldType: "boolean"
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "linkOnly",
    label: "accountLinkingOnly",
    fieldType: "boolean"
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.hideOnLoginPage",
    label: "hideOnLoginPage"
  }), /* @__PURE__ */ React.createElement(LoginFlow, {
    field: "firstBrokerLoginFlowAlias",
    label: "firstBrokerLoginFlowAlias",
    defaultValue: "fist broker login"
  }), /* @__PURE__ */ React.createElement(LoginFlow, {
    field: "postBrokerLoginFlowAlias",
    label: "postBrokerLoginFlowAlias",
    defaultValue: ""
  }), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("syncMode"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:syncMode",
      fieldLabelId: "identity-providers:syncMode"
    }),
    fieldId: "syncMode"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.syncMode",
    defaultValue: syncModes[0].toUpperCase(),
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "syncMode",
      required: true,
      direction: "up",
      onToggle: () => setSyncModeOpen(!syncModeOpen),
      onSelect: (_, value2) => {
        onChange(value2);
        setSyncModeOpen(false);
      },
      selections: t(`syncModes.${value.toLowerCase()}`),
      variant: SelectVariant.single,
      "aria-label": t("syncMode"),
      isOpen: syncModeOpen
    }, syncModes.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option === value,
      key: option,
      value: option.toUpperCase()
    }, t(`syncModes.${option}`))))
  })));
};
