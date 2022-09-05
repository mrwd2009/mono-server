import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {ClientIdSecret} from "../component/ClientIdSecret.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
const clientAuthenticationTypes = [
  "clientAuth_post",
  "clientAuth_basic",
  "clientAuth_secret_jwt",
  "clientAuth_privatekey_jwt"
];
export const OIDCAuthentication = ({create = true}) => {
  const {t} = useTranslation("identity-providers");
  const {control} = useFormContext();
  const [openClientAuth, setOpenClientAuth] = useState(false);
  const clientAuthMethod = useWatch({
    control,
    name: "config.clientAuthMethod"
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clientAuthentication"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:clientAuthentication",
      fieldLabelId: "identity-providers:clientAuthentication"
    }),
    fieldId: "clientAuthentication"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.clientAuthMethod",
    defaultValue: clientAuthenticationTypes[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "clientAuthMethod",
      required: true,
      onToggle: () => setOpenClientAuth(!openClientAuth),
      onSelect: (_, value2) => {
        onChange(value2);
        setOpenClientAuth(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("prompt"),
      isOpen: openClientAuth
    }, clientAuthenticationTypes.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option === value,
      key: option,
      value: option
    }, t(`clientAuthentications.${option}`))))
  })), /* @__PURE__ */ React.createElement(ClientIdSecret, {
    secretRequired: clientAuthMethod !== "clientAuth_privatekey_jwt",
    create
  }));
};
