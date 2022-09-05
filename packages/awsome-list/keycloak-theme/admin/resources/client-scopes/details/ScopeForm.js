import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {Link, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useForm, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  ValidatedOptions,
  Select,
  SelectVariant,
  SelectOption,
  Switch,
  ActionGroup,
  Button
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {
  clientScopeTypesSelectOptions,
  allClientScopeTypes
} from "../../components/client-scope/ClientScopeTypes.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useLoginProviders} from "../../context/server-info/ServerInfoProvider.js";
import {convertToFormValues} from "../../util.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {getProtocolName} from "../../clients/utils.js";
import {toClientScopes} from "../routes/ClientScopes.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {KeycloakTextArea} from "../../components/keycloak-text-area/KeycloakTextArea.js";
export const ScopeForm = ({clientScope, save}) => {
  const {t} = useTranslation("client-scopes");
  const {t: tc} = useTranslation("clients");
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm({
    defaultValues: {attributes: {"display.on.consent.screen": "true"}}
  });
  const {realm} = useRealm();
  const providers = useLoginProviders();
  const [open, isOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  const {id} = useParams();
  const displayOnConsentScreen = useWatch({
    control,
    name: "attributes.display.on.consent.screen",
    defaultValue: clientScope.attributes?.["display.on.consent.screen"] ?? "true"
  });
  useEffect(() => {
    convertToFormValues(clientScope, setValue);
  }, [clientScope]);
  return /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    onSubmit: handleSubmit(save),
    role: "manage-clients"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "client-scopes-help:name",
      fieldLabelId: "name"
    }),
    fieldId: "kc-name",
    isRequired: true,
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register({
      required: true,
      validate: (value) => !!value.trim() || t("common:required").toString()
    }),
    type: "text",
    id: "kc-name",
    name: "name",
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:description"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "client-scopes-help:description",
      fieldLabelId: "description"
    }),
    fieldId: "kc-description",
    validated: errors.description ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:maxLength", {length: 255})
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register({
      maxLength: 255
    }),
    validated: errors.description ? ValidatedOptions.error : ValidatedOptions.default,
    type: "text",
    id: "kc-description",
    name: "description"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("type"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "client-scopes-help:type",
      fieldLabelId: "client-scopes:type"
    }),
    fieldId: "type"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "type",
    defaultValue: allClientScopeTypes[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      id: "type",
      variant: SelectVariant.single,
      isOpen: openType,
      selections: value,
      onToggle: setOpenType,
      onSelect: (_, value2) => {
        onChange(value2);
        setOpenType(false);
      }
    }, clientScopeTypesSelectOptions(t, allClientScopeTypes))
  })), !id && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("protocol"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "client-scopes-help:protocol",
      fieldLabelId: "client-scopes:protocol"
    }),
    fieldId: "kc-protocol"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "protocol",
    defaultValue: providers[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-protocol",
      required: true,
      onToggle: isOpen,
      onSelect: (_, value2) => {
        onChange(value2);
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
    }, getProtocolName(tc, option))))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("displayOnConsentScreen"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "client-scopes-help:displayOnConsentScreen",
      fieldLabelId: "client-scopes:displayOnConsentScreen"
    }),
    fieldId: "kc-display.on.consent.screen"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.display.on.consent.screen",
    control,
    defaultValue: displayOnConsentScreen,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-display.on.consent.screen-switch",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange("" + value2)
    })
  })), displayOnConsentScreen === "true" && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("consentScreenText"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "client-scopes-help:consentScreenText",
      fieldLabelId: "client-scopes:consentScreenText"
    }),
    fieldId: "kc-consent-screen-text"
  }, /* @__PURE__ */ React.createElement(KeycloakTextArea, {
    ref: register,
    type: "text",
    id: "kc-consent-screen-text",
    name: "attributes.consent.screen.text"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("includeInTokenScope"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "client-scopes-help:includeInTokenScope",
      fieldLabelId: "client-scopes:includeInTokenScope"
    }),
    fieldId: "includeInTokenScope"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.include.in.token.scope",
    control,
    defaultValue: "true",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "includeInTokenScope-switch",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange("" + value2)
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("guiOrder"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "client-scopes-help:guiOrder",
      fieldLabelId: "client-scopes:guiOrder"
    }),
    fieldId: "kc-gui-order"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.gui.order",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(KeycloakTextInput, {
      id: "kc-gui-order",
      type: "number",
      value,
      "data-testid": "displayOrder",
      min: 0,
      onChange
    })
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toClientScopes({realm})
    })
  }, t("common:cancel"))));
};
