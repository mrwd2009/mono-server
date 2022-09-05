import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  Button,
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {TimeSelector} from "../../components/time-selector/TimeSelector.js";
import {TokenLifespan} from "./TokenLifespan.js";
import {KeyValueInput} from "../../components/key-value-form/KeyValueInput.js";
import {MultiLineInput} from "../../components/multi-line-input/MultiLineInput.js";
export const AdvancedSettings = ({
  control,
  save,
  reset,
  protocol,
  hasConfigureAccess
}) => {
  const {t} = useTranslation("clients");
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    fineGrainedAccess: hasConfigureAccess,
    isHorizontal: true
  }, protocol !== "openid-connect" && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("assertionLifespan"),
    fieldId: "assertionLifespan",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:assertionLifespan",
      fieldLabelId: "clients:assertionLifespan"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.saml.assertion.lifespan",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      units: ["minute", "day", "hour"],
      value,
      onChange
    })
  })), protocol === "openid-connect" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(TokenLifespan, {
    id: "accessTokenLifespan",
    name: "attributes.access.token.lifespan",
    defaultValue: "",
    units: ["minute", "day", "hour"],
    control
  }), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("oAuthMutual"),
    fieldId: "oAuthMutual",
    hasNoPaddingTop: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:oAuthMutual",
      fieldLabelId: "clients:oAuthMutual"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.tls-client-certificate-bound-access-tokens",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "oAuthMutual-switch",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange("" + value2)
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("keyForCodeExchange"),
    fieldId: "keyForCodeExchange",
    hasNoPaddingTop: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:keyForCodeExchange",
      fieldLabelId: "clients:keyForCodeExchange"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.pkce.code.challenge.method",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "keyForCodeExchange",
      variant: SelectVariant.single,
      onToggle: setOpen,
      isOpen: open,
      onSelect: (_, value2) => {
        onChange(value2);
        setOpen(false);
      },
      selections: [value || t("common:choose")]
    }, ["", "S256", "plain"].map((v) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: v,
      value: v
    }, v || t("common:choose"))))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("pushedAuthorizationRequestRequired"),
    fieldId: "pushedAuthorizationRequestRequired",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:pushedAuthorizationRequestRequired",
      fieldLabelId: "clients:pushedAuthorizationRequestRequired"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.require.pushed.authorization.requests",
    defaultValue: "false",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "pushedAuthorizationRequestRequired",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange(value2.toString())
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("acrToLoAMapping"),
    fieldId: "acrToLoAMapping",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:acrToLoAMapping",
      fieldLabelId: "clients:acrToLoAMapping"
    })
  }, /* @__PURE__ */ React.createElement(KeyValueInput, {
    name: "attributes.acr.loa.map"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("defaultACRValues"),
    fieldId: "defaultACRValues",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:defaultACRValues",
      fieldLabelId: "clients:defaultACRValues"
    })
  }, /* @__PURE__ */ React.createElement(MultiLineInput, {
    name: "attributes.default.acr.values"
  }))), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    onClick: save
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: reset
  }, t("common:revert"))));
};
