import React, {useState} from "../../../_snowpack/pkg/react.js";
import {
  Divider,
  FormGroup,
  Radio,
  Select,
  SelectOption,
  SelectVariant,
  Switch
} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
import {Controller, useFormContext, useWatch} from "../../../_snowpack/pkg/react-hook-form.js";
import {FormAccess} from "../../../components/form-access/FormAccess.js";
import {KeycloakTextInput} from "../../../components/keycloak-text-input/KeycloakTextInput.js";
import {useAdminClient, useFetch} from "../../../context/auth/AdminClient.js";
import {useParams} from "../../../_snowpack/pkg/react-router-dom.js";
import {isEqual} from "../../../_snowpack/pkg/lodash-es.js";
import "../../realm-settings-section.css.proxy.js";
const REQUIRED_FOR = [
  {label: "requiredForLabel.both", value: ["admin", "user"]},
  {label: "requiredForLabel.users", value: ["user"]},
  {label: "requiredForLabel.admins", value: ["admin"]}
];
export const AttributeGeneralSettings = () => {
  const {t} = useTranslation("realm-settings");
  const {adminClient} = useAdminClient();
  const form = useFormContext();
  const [clientScopes, setClientScopes] = useState();
  const [config, setConfig] = useState();
  const [selectEnabledWhenOpen, setSelectEnabledWhenOpen] = useState(false);
  const [selectRequiredForOpen, setSelectRequiredForOpen] = useState(false);
  const [isAttributeGroupDropdownOpen, setIsAttributeGroupDropdownOpen] = useState(false);
  const {attributeName} = useParams();
  const editMode = attributeName ? true : false;
  const selectedScopes = useWatch({
    control: form.control,
    name: "selector.scopes",
    defaultValue: []
  });
  const requiredScopes = useWatch({
    control: form.control,
    name: "required.scopes",
    defaultValue: []
  });
  const required = useWatch({
    control: form.control,
    name: "isRequired",
    defaultValue: false
  });
  useFetch(() => adminClient.clientScopes.find(), setClientScopes, []);
  useFetch(() => adminClient.users.getProfile(), setConfig, []);
  return /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("attributeName"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:attributeNameHelp",
      fieldLabelId: "realm-settings:attributeName"
    }),
    fieldId: "kc-attribute-name",
    isRequired: true,
    validated: form.errors.name ? "error" : "default",
    helperTextInvalid: form.errors.name?.message
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    id: "kc-attribute-name",
    name: "name",
    defaultValue: "",
    ref: form.register({
      required: {
        value: true,
        message: t("validateName")
      }
    }),
    "data-testid": "attribute-name",
    isDisabled: editMode,
    validated: form.errors.name ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("attributeDisplayName"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:attributeDisplayNameHelp",
      fieldLabelId: "realm-settings:attributeDisplayName"
    }),
    fieldId: "kc-attribute-display-name"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-attribute-display-name",
    name: "displayName",
    defaultValue: "",
    ref: form.register,
    "data-testid": "attribute-display-name"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("attributeGroup"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-setting-help:attributeGroupHelp",
      fieldLabelId: "realm-setting:attributeGroup"
    }),
    fieldId: "kc-attribute-group"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "group",
    defaultValue: "",
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-attributeGroup",
      onToggle: () => setIsAttributeGroupDropdownOpen(!isAttributeGroupDropdownOpen),
      isOpen: isAttributeGroupDropdownOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setIsAttributeGroupDropdownOpen(false);
      },
      selections: [value || t("common:choose")],
      variant: SelectVariant.single
    }, config?.groups?.map((group) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: group.name,
      value: group.name
    }, group.name)))
  })), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("enabledWhen"),
    fieldId: "enabledWhen",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Radio, {
    id: "always",
    "data-testid": "always",
    isChecked: selectedScopes.length === clientScopes?.length,
    name: "enabledWhen",
    label: t("always"),
    onChange: (value) => {
      if (value) {
        form.setValue("selector.scopes", clientScopes?.map((s) => s.name));
      } else {
        form.setValue("selector.scopes", []);
      }
    },
    className: "pf-u-mb-md"
  }), /* @__PURE__ */ React.createElement(Radio, {
    id: "scopesAsRequested",
    "data-testid": "scopesAsRequested",
    isChecked: selectedScopes.length !== clientScopes?.length,
    name: "enabledWhen",
    label: t("scopesAsRequested"),
    onChange: (value) => {
      if (value) {
        form.setValue("selector.scopes", []);
      } else {
        form.setValue("selector.scopes", clientScopes?.map((s) => s.name));
      }
    },
    className: "pf-u-mb-md"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    fieldId: "kc-scope-enabled-when"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "selector.scopes",
    control: form.control,
    defaultValue: [],
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      name: "scopes",
      "data-testid": "enabled-when-scope-field",
      variant: SelectVariant.typeaheadMulti,
      typeAheadAriaLabel: "Select",
      chipGroupProps: {
        numChips: 3,
        expandedText: t("common:hide"),
        collapsedText: t("common:showRemaining")
      },
      onToggle: (isOpen) => setSelectEnabledWhenOpen(isOpen),
      selections: value,
      onSelect: (_, selectedValue) => {
        const option = selectedValue.toString();
        let changedValue = [""];
        if (value) {
          changedValue = value.includes(option) ? value.filter((item) => item !== option) : [...value, option];
        } else {
          changedValue = [option];
        }
        onChange(changedValue);
      },
      onClear: (selectedValues) => {
        selectedValues.stopPropagation();
        onChange([]);
      },
      isOpen: selectEnabledWhenOpen,
      isDisabled: selectedScopes.length === clientScopes?.length,
      "aria-labelledby": "scope"
    }, clientScopes?.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: option.name,
      value: option.name
    })))
  })), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("required"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:requiredHelp",
      fieldLabelId: "realm-settings:required"
    }),
    fieldId: "kc-required",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "isRequired",
    "data-testid": "required",
    defaultValue: false,
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-required",
      onChange,
      isChecked: value,
      label: t("common:on"),
      labelOff: t("common:off")
    })
  })), required && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("requiredFor"),
    fieldId: "requiredFor",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "required.roles",
    "data-testid": "requiredFor",
    defaultValue: REQUIRED_FOR[0].value,
    control: form.control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement("div", {
      className: "kc-requiredFor"
    }, REQUIRED_FOR.map((option) => /* @__PURE__ */ React.createElement(Radio, {
      id: option.label,
      key: option.label,
      "data-testid": option.label,
      isChecked: isEqual(value, option.value),
      name: "roles",
      onChange: () => {
        onChange(option.value);
      },
      label: t(option.label),
      className: "kc-requiredFor-option"
    })))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("requiredWhen"),
    fieldId: "requiredWhen",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Radio, {
    id: "requiredAlways",
    "data-testid": "requiredAlways",
    isChecked: requiredScopes.length === clientScopes?.length,
    name: "requiredWhen",
    label: t("always"),
    onChange: (value) => {
      if (value) {
        form.setValue("required.scopes", clientScopes?.map((s) => s.name));
      } else {
        form.setValue("required.scopes", []);
      }
    },
    className: "pf-u-mb-md"
  }), /* @__PURE__ */ React.createElement(Radio, {
    id: "requiredScopesAsRequested",
    "data-testid": "requiredScopesAsRequested",
    isChecked: requiredScopes.length !== clientScopes?.length,
    name: "requiredWhen",
    label: t("scopesAsRequested"),
    onChange: (value) => {
      if (value) {
        form.setValue("required.scopes", []);
      } else {
        form.setValue("required.scopes", clientScopes?.map((s) => s.name));
      }
    },
    className: "pf-u-mb-md"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    fieldId: "kc-scope-required-when"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "required.scopes",
    control: form.control,
    defaultValue: [],
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      name: "scopeRequired",
      "data-testid": "required-when-scope-field",
      variant: SelectVariant.typeaheadMulti,
      typeAheadAriaLabel: "Select",
      chipGroupProps: {
        numChips: 3,
        expandedText: t("common:hide"),
        collapsedText: t("common:showRemaining")
      },
      onToggle: (isOpen) => setSelectRequiredForOpen(isOpen),
      selections: value,
      onSelect: (_, selectedValue) => {
        const option = selectedValue.toString();
        let changedValue = [""];
        if (value) {
          changedValue = value.includes(option) ? value.filter((item) => item !== option) : [...value, option];
        } else {
          changedValue = [option];
        }
        onChange(changedValue);
      },
      onClear: (selectedValues) => {
        selectedValues.stopPropagation();
        onChange([]);
      },
      isOpen: selectRequiredForOpen,
      isDisabled: requiredScopes.length === clientScopes?.length,
      "aria-labelledby": "scope"
    }, clientScopes?.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: option.name,
      value: option.name
    })))
  }))));
};
