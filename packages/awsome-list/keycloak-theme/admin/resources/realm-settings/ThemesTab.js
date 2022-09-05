import React, {useEffect, useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Controller, useForm} from "../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  Button,
  FormGroup,
  PageSection,
  Select,
  SelectOption,
  SelectVariant
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import {convertToFormValues} from "../util.js";
export const RealmSettingsThemesTab = ({
  realm,
  save
}) => {
  const {t} = useTranslation("realm-settings");
  const [loginThemeOpen, setLoginThemeOpen] = useState(false);
  const [accountThemeOpen, setAccountThemeOpen] = useState(false);
  const [adminConsoleThemeOpen, setAdminConsoleThemeOpen] = useState(false);
  const [emailThemeOpen, setEmailThemeOpen] = useState(false);
  const {control, handleSubmit, setValue} = useForm();
  const themeTypes = useServerInfo().themes;
  const setupForm = () => {
    convertToFormValues(realm, setValue);
  };
  useEffect(setupForm, []);
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("loginTheme"),
    fieldId: "kc-login-theme",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:loginTheme",
      fieldLabelId: "realm-settings:loginTheme"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "loginTheme",
    control,
    defaultValue: "",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-login-theme",
      onToggle: () => setLoginThemeOpen(!loginThemeOpen),
      onSelect: (_, value2) => {
        onChange(value2);
        setLoginThemeOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("loginTheme"),
      isOpen: loginThemeOpen,
      placeholderText: "Select a theme",
      "data-testid": "select-login-theme"
    }, themeTypes.login.map((theme, idx) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: theme.name === value,
      key: `login-theme-${idx}`,
      value: theme.name
    }, t(`${theme.name}`))))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("accountTheme"),
    fieldId: "kc-account-theme",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:accountTheme",
      fieldLabelId: "realm-settings:accountTheme"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "accountTheme",
    control,
    defaultValue: "",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-account-theme",
      onToggle: () => setAccountThemeOpen(!accountThemeOpen),
      onSelect: (_, value2) => {
        onChange(value2);
        setAccountThemeOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("accountTheme"),
      isOpen: accountThemeOpen,
      placeholderText: "Select a theme",
      "data-testid": "select-account-theme"
    }, themeTypes.account.map((theme, idx) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: theme.name === value,
      key: `account-theme-${idx}`,
      value: theme.name
    }, t(`${theme.name}`))))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("adminTheme"),
    fieldId: "kc-admin-console-theme",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:adminConsoleTheme",
      fieldLabelId: "realm-settings:adminTheme"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "adminTheme",
    control,
    defaultValue: "",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-admin-console-theme",
      onToggle: () => setAdminConsoleThemeOpen(!adminConsoleThemeOpen),
      onSelect: (_, value2) => {
        onChange(value2);
        setAdminConsoleThemeOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("adminConsoleTheme"),
      isOpen: adminConsoleThemeOpen,
      placeholderText: "Select a theme",
      "data-testid": "select-admin-theme"
    }, themeTypes.admin.map((theme, idx) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: theme.name === value,
      key: `admin-theme-${idx}`,
      value: theme.name
    }, t(`${theme.name}`))))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("emailTheme"),
    fieldId: "kc-email-theme",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:emailTheme",
      fieldLabelId: "realm-settings:emailTheme"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "emailTheme",
    control,
    defaultValue: "",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-email-theme",
      onToggle: () => setEmailThemeOpen(!emailThemeOpen),
      onSelect: (_, value2) => {
        onChange(value2);
        setEmailThemeOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("emailTheme"),
      isOpen: emailThemeOpen,
      placeholderText: "Select a theme",
      "data-testid": "select-email-theme"
    }, themeTypes.email.map((theme, idx) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: theme.name === value,
      key: `email-theme-${idx}`,
      value: theme.name
    }, t(`${theme.name}`))))
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "themes-tab-save"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: setupForm
  }, t("common:revert")))));
};
