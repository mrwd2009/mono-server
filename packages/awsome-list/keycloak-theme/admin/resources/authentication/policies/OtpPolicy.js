import React, {useEffect} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useForm, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {
  PageSection,
  FormGroup,
  Radio,
  Select,
  SelectVariant,
  SelectOption,
  NumberInput,
  ActionGroup,
  Button,
  ButtonVariant,
  AlertVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import useToggle from "../../utils/useToggle.js";
import {TimeSelector} from "../../components/time-selector/TimeSelector.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import "./otp-policy.css.proxy.js";
const POLICY_TYPES = ["totp", "hotp"];
const OTP_HASH_ALGORITHMS = ["SHA1", "SHA256", "SHA512"];
const NUMBER_OF_DIGITS = [6, 8];
export const OtpPolicy = ({realm, realmUpdated}) => {
  const {t} = useTranslation("authentication");
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: {isDirty, errors}
  } = useForm({mode: "onChange"});
  const {adminClient} = useAdminClient();
  const {realm: realmName} = useRealm();
  const {addAlert, addError} = useAlerts();
  const [open, toggle] = useToggle();
  const otpType = useWatch({
    name: "otpPolicyType",
    control,
    defaultValue: POLICY_TYPES[0]
  });
  const setupForm = (realm2) => reset({
    ...realm2,
    otpSupportedApplications: realm2.otpSupportedApplications?.join(", ")
  });
  useEffect(() => setupForm(realm), []);
  const save = async (realm2) => {
    try {
      await adminClient.realms.update({realm: realmName}, realm2);
      const updatedRealm = await adminClient.realms.findOne({
        realm: realmName
      });
      realmUpdated(updatedRealm);
      setupForm(updatedRealm);
      addAlert(t("updateOtpSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:updateOtpError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true,
    onSubmit: handleSubmit(save),
    className: "keycloak__otp_policies_authentication__form"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("otpType"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:otpType",
      fieldLabelId: "authentication:otpType"
    }),
    fieldId: "otpType",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "otpPolicyType",
    "data-testid": "otpPolicyType",
    defaultValue: POLICY_TYPES[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(React.Fragment, null, POLICY_TYPES.map((type) => /* @__PURE__ */ React.createElement(Radio, {
      id: type,
      key: type,
      "data-testid": type,
      isChecked: value === type,
      name: "otpPolicyType",
      onChange: () => onChange(type),
      label: t(`policyType.${type}`),
      className: "keycloak__otp_policies_authentication__policy-type"
    })))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("otpHashAlgorithm"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:otpHashAlgorithm",
      fieldLabelId: "authentication:otpHashAlgorithm"
    }),
    fieldId: "otpHashAlgorithm"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "otpPolicyAlgorithm",
    defaultValue: `Hmac${OTP_HASH_ALGORITHMS[0]}`,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "otpHashAlgorithm",
      onToggle: toggle,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        toggle();
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("otpHashAlgorithm"),
      isOpen: open
    }, OTP_HASH_ALGORITHMS.map((type) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: `Hmac${type}` === value,
      key: type,
      value: `Hmac${type}`
    }, type)))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("otpPolicyDigits"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:otpPolicyDigits",
      fieldLabelId: "authentication:otpPolicyDigits"
    }),
    fieldId: "otpPolicyDigits",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "otpPolicyDigits",
    "data-testid": "otpPolicyDigits",
    defaultValue: NUMBER_OF_DIGITS[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(React.Fragment, null, NUMBER_OF_DIGITS.map((type) => /* @__PURE__ */ React.createElement(Radio, {
      id: `digit-${type}`,
      key: type,
      "data-testid": `digit-${type}`,
      isChecked: value === type,
      name: "otpPolicyDigits",
      onChange: () => onChange(type),
      label: type,
      className: "keycloak__otp_policies_authentication__number-of-digits"
    })))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("lookAhead"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:lookAhead",
      fieldLabelId: "authentication:lookAhead"
    }),
    fieldId: "lookAhead"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "otpPolicyLookAheadWindow",
    defaultValue: 1,
    control,
    render: ({onChange, value}) => {
      const MIN_VALUE = 0;
      const setValue = (newValue) => onChange(Math.max(newValue, MIN_VALUE));
      return /* @__PURE__ */ React.createElement(NumberInput, {
        id: "lookAhead",
        value,
        min: MIN_VALUE,
        onPlus: () => setValue(value + 1),
        onMinus: () => setValue(value - 1),
        onChange: (event) => {
          const newValue = Number(event.currentTarget.value);
          setValue(!isNaN(newValue) ? newValue : 0);
        }
      });
    }
  })), otpType === POLICY_TYPES[0] && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("otpPolicyPeriod"),
    fieldId: "otpPolicyPeriod",
    helperTextInvalid: t("otpPolicyPeriodErrorHint"),
    validated: errors.otpPolicyPeriod ? "error" : "default",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:otpPolicyPeriod",
      fieldLabelId: "authentication:otpPolicyPeriod"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "otpPolicyPeriod",
    defaultValue: 30,
    control,
    rules: {min: 1, max: 120},
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      "data-testid": "otpPolicyPeriod",
      "aria-label": t("otpPolicyPeriod"),
      value,
      onChange,
      units: ["second", "minute"],
      validated: errors.otpPolicyPeriod ? "error" : "default"
    })
  })), otpType === POLICY_TYPES[1] && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("initialCounter"),
    fieldId: "initialCounter",
    helperTextInvalid: t("initialCounterErrorHint"),
    validated: errors.otpPolicyInitialCounter ? "error" : "default",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:initialCounter",
      fieldLabelId: "authentication:initialCounter"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "otpPolicyInitialCounter",
    defaultValue: 30,
    control,
    rules: {min: 1, max: 120},
    render: ({onChange, value}) => {
      const MIN_VALUE = 1;
      const setValue = (newValue) => onChange(Math.max(newValue, MIN_VALUE));
      return /* @__PURE__ */ React.createElement(NumberInput, {
        id: "initialCounter",
        value,
        min: MIN_VALUE,
        onPlus: () => setValue(value + 1),
        onMinus: () => setValue(value - 1),
        onChange: (event) => {
          const newValue = Number(event.currentTarget.value);
          setValue(!isNaN(newValue) ? newValue : 30);
        }
      });
    }
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("supportedActions"),
    fieldId: "supportedActions",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:supportedActions",
      fieldLabelId: "authentication:supportedActions"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "supportedActions",
    name: "otpSupportedApplications",
    ref: register({
      setValueAs: (value) => value.split(", ")
    }),
    "data-testid": "supportedActions",
    isReadOnly: true
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "save",
    variant: "primary",
    type: "submit",
    isDisabled: !isDirty
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "reload",
    variant: ButtonVariant.link,
    onClick: () => reset({...realm})
  }, t("common:reload")))));
};
