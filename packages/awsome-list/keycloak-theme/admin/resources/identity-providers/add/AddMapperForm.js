import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  ValidatedOptions
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const AddMapperForm = ({
  mapperTypes,
  mapperType,
  form,
  id,
  updateMapperType
}) => {
  const {t} = useTranslation("identity-providers");
  const {control, register, errors} = form;
  const [mapperTypeOpen, setMapperTypeOpen] = useState(false);
  const syncModes = ["inherit", "import", "legacy", "force"];
  const [syncModeOpen, setSyncModeOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:addIdpMapperName",
      fieldLabelId: "name"
    }),
    fieldId: "kc-name",
    isRequired: true,
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register({required: true}),
    type: "text",
    "datatest-id": "name-input",
    id: "kc-name",
    name: "name",
    isDisabled: !!id,
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("syncModeOverride"),
    isRequired: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:syncModeOverride",
      fieldLabelId: "identity-providers:syncModeOverride"
    }),
    fieldId: "syncMode"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.syncMode",
    defaultValue: syncModes[0].toUpperCase(),
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "syncMode",
      "datatest-id": "syncmode-select",
      required: true,
      direction: "down",
      onToggle: () => setSyncModeOpen(!syncModeOpen),
      onSelect: (_, value2) => {
        onChange(value2.toString().toUpperCase());
        setSyncModeOpen(false);
      },
      selections: t(`syncModes.${value.toLowerCase()}`),
      variant: SelectVariant.single,
      "aria-label": t("syncMode"),
      isOpen: syncModeOpen
    }, syncModes.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option === value,
      key: option,
      "data-testid": option,
      value: option.toUpperCase()
    }, t(`syncModes.${option}`))))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("mapperType"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: mapperType.helpText,
      fieldLabelId: "identity-providers:mapperType"
    }),
    fieldId: "identityProviderMapper"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "identityProviderMapper",
    defaultValue: mapperTypes[0].id,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "identityProviderMapper",
      "data-testid": "idp-mapper-select",
      isDisabled: !!id,
      required: true,
      onToggle: () => setMapperTypeOpen(!mapperTypeOpen),
      onSelect: (_, value2) => {
        const mapperType2 = value2;
        updateMapperType(mapperType2);
        onChange(mapperType2.id);
        setMapperTypeOpen(false);
      },
      selections: mapperType.name,
      variant: SelectVariant.single,
      "aria-label": t("mapperType"),
      isOpen: mapperTypeOpen
    }, mapperTypes.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option === value,
      "datatest-id": option.id,
      key: option.name,
      value: option
    }, option.name)))
  })));
};
