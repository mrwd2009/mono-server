import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useServerInfo} from "../../context/server-info/ServerInfoProvider.js";
import {KeycloakTextArea} from "../../components/keycloak-text-area/KeycloakTextArea.js";
export const LoginSettingsPanel = ({access}) => {
  const {t} = useTranslation("clients");
  const {register, control, watch} = useFormContext();
  const [loginThemeOpen, setLoginThemeOpen] = useState(false);
  const loginThemes = useServerInfo().themes["login"];
  const consentRequired = watch("consentRequired");
  const displayOnConsentScreen = watch("attributes.display.on.consent.screen");
  return /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    fineGrainedAccess: access,
    role: "manage-clients"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("loginTheme"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:loginTheme",
      fieldLabelId: "clients:loginTheme"
    }),
    fieldId: "loginTheme"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.login_theme",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "loginTheme",
      onToggle: setLoginThemeOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setLoginThemeOpen(false);
      },
      selections: value || t("common:choose"),
      variant: SelectVariant.single,
      "aria-label": t("loginTheme"),
      isOpen: loginThemeOpen
    }, [
      /* @__PURE__ */ React.createElement(SelectOption, {
        key: "empty",
        value: ""
      }, t("common:choose")),
      ...loginThemes.map((theme) => /* @__PURE__ */ React.createElement(SelectOption, {
        selected: theme.name === value,
        key: theme.name,
        value: theme.name
      }))
    ])
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("consentRequired"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:consentRequired",
      fieldLabelId: "clients:consentRequired"
    }),
    fieldId: "kc-consent",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "consentRequired",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-consent-switch",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("displayOnClient"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:displayOnClient",
      fieldLabelId: "clients:displayOnClient"
    }),
    fieldId: "kc-display-on-client",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.display.on.consent.screen",
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-display-on-client-switch",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value === "true",
      onChange: (value2) => onChange("" + value2),
      isDisabled: !consentRequired
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("consentScreenText"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:consentScreenText",
      fieldLabelId: "clients:consentScreenText"
    }),
    fieldId: "kc-consent-screen-text"
  }, /* @__PURE__ */ React.createElement(KeycloakTextArea, {
    id: "kc-consent-screen-text",
    name: "attributes.consent.screen.text",
    ref: register,
    isDisabled: !(consentRequired && displayOnConsentScreen === "true")
  })));
};
