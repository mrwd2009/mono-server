import React, {useState} from "../../_snowpack/pkg/react.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
export const Toggle = ({name, label}) => {
  const {t} = useTranslation("clients");
  const {control} = useFormContext();
  return /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t(label),
    fieldId: label,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t(`clients-help:${label}`),
      fieldLabelId: `clients:${label}`
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name,
    defaultValue: "false",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: name,
      "data-testid": label,
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange(value2.toString())
    })
  }));
};
export const SamlConfig = () => {
  const {t} = useTranslation("clients");
  const {control} = useFormContext();
  const [nameFormatOpen, setNameFormatOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-clients",
    className: "keycloak__capability-config__form"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("nameIdFormat"),
    fieldId: "nameIdFormat",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:nameIdFormat",
      fieldLabelId: "clients:nameIdFormat"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.saml_name_id_format",
    defaultValue: "username",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "samlNameIdFormat",
      onToggle: setNameFormatOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setNameFormatOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("nameIdFormat"),
      isOpen: nameFormatOpen
    }, ["username", "email", "transient", "persistent"].map((name) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: name === value,
      key: name,
      value: name
    })))
  })), /* @__PURE__ */ React.createElement(Toggle, {
    name: "attributes.saml.force.name.id.format",
    label: "forceNameIdFormat"
  }), /* @__PURE__ */ React.createElement(Toggle, {
    name: "attributes.saml.force.post.binding",
    label: "forcePostBinding"
  }), /* @__PURE__ */ React.createElement(Toggle, {
    name: "attributes.saml.artifact.binding",
    label: "forceArtifactBinding"
  }), /* @__PURE__ */ React.createElement(Toggle, {
    name: "attributes.saml.authnstatement",
    label: "includeAuthnStatement"
  }), /* @__PURE__ */ React.createElement(Toggle, {
    name: "attributes.saml.onetimeuse.condition",
    label: "includeOneTimeUseCondition"
  }), /* @__PURE__ */ React.createElement(Toggle, {
    name: "attributes.saml.server.signature.keyinfo.ext",
    label: "optimizeLookup"
  }));
};
