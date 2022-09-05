import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useServerInfo} from "../../context/server-info/ServerInfoProvider.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {sortProviders} from "../../util.js";
export const SignedJWT = () => {
  const {control} = useFormContext();
  const providers = sortProviders(useServerInfo().providers.clientSignature.providers);
  const {t} = useTranslation("clients");
  const [open, isOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("signatureAlgorithm"),
    fieldId: "kc-signature-algorithm",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:signature-algorithm",
      fieldLabelId: "clients:signatureAlgorithm"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.token.endpoint.auth.signing.alg",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      maxHeight: 200,
      toggleId: "kc-signature-algorithm",
      onToggle: isOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        isOpen(false);
      },
      selections: value || t("anyAlgorithm"),
      variant: SelectVariant.single,
      "aria-label": t("signatureAlgorithm"),
      isOpen: open
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      selected: value === "",
      key: "any",
      value: ""
    }, t("anyAlgorithm")), /* @__PURE__ */ React.createElement(React.Fragment, null, providers.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option === value,
      key: option,
      value: option
    }))))
  }));
};
