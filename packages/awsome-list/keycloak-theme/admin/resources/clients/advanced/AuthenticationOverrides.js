import React, {useState} from "../../_snowpack/pkg/react.js";
import {Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {sortBy} from "../../_snowpack/pkg/lodash-es.js";
import {
  ActionGroup,
  Button,
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useFetch, useAdminClient} from "../../context/auth/AdminClient.js";
export const AuthenticationOverrides = ({
  protocol,
  control,
  save,
  reset,
  hasConfigureAccess
}) => {
  const {adminClient} = useAdminClient();
  const {t} = useTranslation("clients");
  const [flows, setFlows] = useState([]);
  const [browserFlowOpen, setBrowserFlowOpen] = useState(false);
  const [directGrantOpen, setDirectGrantOpen] = useState(false);
  useFetch(() => adminClient.authenticationManagement.getFlows(), (flows2) => {
    let filteredFlows = [
      ...flows2.filter((flow) => flow.providerId !== "client-flow")
    ];
    filteredFlows = sortBy(filteredFlows, [(f) => f.alias]);
    setFlows([
      /* @__PURE__ */ React.createElement(SelectOption, {
        key: "empty",
        value: ""
      }, t("common:choose")),
      ...filteredFlows.map((flow) => /* @__PURE__ */ React.createElement(SelectOption, {
        key: flow.id,
        value: flow.id
      }, flow.alias))
    ]);
  }, []);
  return /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-clients",
    fineGrainedAccess: hasConfigureAccess,
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("browserFlow"),
    fieldId: "browserFlow",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:browserFlow",
      fieldLabelId: "clients:browserFlow"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "authenticationFlowBindingOverrides.browser",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "browserFlow",
      variant: SelectVariant.single,
      onToggle: setBrowserFlowOpen,
      isOpen: browserFlowOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setBrowserFlowOpen(false);
      },
      selections: [value]
    }, flows)
  })), protocol === "openid-connect" && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("directGrant"),
    fieldId: "directGrant",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:directGrant",
      fieldLabelId: "clients:directGrant"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "authenticationFlowBindingOverrides.direct_grant",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "directGrant",
      variant: SelectVariant.single,
      onToggle: setDirectGrantOpen,
      isOpen: directGrantOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setDirectGrantOpen(false);
      },
      selections: [value]
    }, flows)
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    onClick: save
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: reset
  }, t("common:revert"))));
};
