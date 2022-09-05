import React, {useState} from "../../_snowpack/pkg/react.js";
import {
  FormGroup,
  Select,
  SelectVariant,
  SelectOption
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {useLoginProviders} from "../../context/server-info/ServerInfoProvider.js";
import {ClientDescription} from "../ClientDescription.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {getProtocolName} from "../utils.js";
export const GeneralSettings = () => {
  const {t} = useTranslation("clients");
  const {
    control,
    formState: {errors}
  } = useFormContext();
  const providers = useLoginProviders();
  const [open, isOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-clients"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clientType"),
    fieldId: "kc-type",
    validated: errors.protocol ? "error" : "default",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:clientType",
      fieldLabelId: "clients:clientType"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "protocol",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      id: "kc-type",
      onToggle: isOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        isOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("selectEncryptionType"),
      isOpen: open
    }, providers.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option === value,
      key: option,
      value: option,
      "data-testid": `option-${option}`
    }, getProtocolName(t, option))))
  })), /* @__PURE__ */ React.createElement(ClientDescription, {
    hasConfigureAccess: true
  }));
};
