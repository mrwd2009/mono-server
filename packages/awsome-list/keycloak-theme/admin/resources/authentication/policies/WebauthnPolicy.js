import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext
} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  FormGroup,
  PageSection,
  Popover,
  Select,
  SelectOption,
  SelectVariant,
  Switch,
  Text,
  TextContent
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {QuestionCircleIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {convertFormValuesToObject, convertToFormValues} from "../../util.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useHelp} from "../../components/help-enabler/HelpHeader.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {TimeSelector} from "../../components/time-selector/TimeSelector.js";
import {MultiLineInput} from "../../components/multi-line-input/MultiLineInput.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import "./webauthn-policy.css.proxy.js";
const SIGNATURE_ALGORITHMS = [
  "ES256",
  "ES384",
  "ES512",
  "RS256",
  "RS384",
  "RS512",
  "RS1"
];
const ATTESTATION_PREFERENCE = [
  "not specified",
  "none",
  "indirect",
  "direct"
];
const AUTHENTICATOR_ATTACHMENT = [
  "not specified",
  "platform",
  "cross-platform"
];
const RESIDENT_KEY_OPTIONS = ["not specified", "Yes", "No"];
const USER_VERIFY = [
  "not specified",
  "required",
  "preferred",
  "discouraged"
];
const WebauthnSelect = ({
  name,
  label,
  options,
  labelPrefix,
  isMultiSelect = false
}) => {
  const {t} = useTranslation("authentication");
  const {control} = useFormContext();
  const [open, toggle] = useState(false);
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(label),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: `authentication-help:${label}`,
      fieldLabelId: `authentication:${label}`
    }),
    fieldId: name
  }, /* @__PURE__ */ React.createElement(Controller, {
    name,
    defaultValue: options[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: name,
      onToggle: toggle,
      onSelect: (_, selectedValue) => {
        if (isMultiSelect) {
          const changedValue = value.find((item) => item === selectedValue) ? value.filter((item) => item !== selectedValue) : [...value, selectedValue];
          onChange(changedValue);
        } else {
          onChange(selectedValue.toString());
          toggle(false);
        }
      },
      selections: labelPrefix ? t(`${labelPrefix}.${value}`) : value,
      variant: isMultiSelect ? SelectVariant.typeaheadMulti : SelectVariant.single,
      "aria-label": t(name),
      typeAheadAriaLabel: t(name),
      isOpen: open
    }, options.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: option === value,
      key: option,
      value: option
    }, labelPrefix ? t(`${labelPrefix}.${option}`) : option)))
  }));
};
export const WebauthnPolicy = ({
  realm,
  realmUpdated,
  isPasswordLess = false
}) => {
  const {t} = useTranslation("authentication");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm: realmName} = useRealm();
  const {enabled} = useHelp();
  const form = useForm({mode: "onChange", shouldUnregister: false});
  const {
    control,
    register,
    setValue,
    errors,
    handleSubmit,
    formState: {isDirty}
  } = form;
  const namePrefix = isPasswordLess ? "webAuthnPolicyPasswordless" : "webAuthnPolicy";
  const setupForm = (realm2) => convertToFormValues(realm2, setValue);
  useEffect(() => setupForm(realm), []);
  const save = async (realm2) => {
    const submittedRealm = convertFormValuesToObject(realm2);
    try {
      await adminClient.realms.update({realm: realmName}, submittedRealm);
      realmUpdated(submittedRealm);
      setupForm(submittedRealm);
      addAlert(t("webAuthnUpdateSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:webAuthnUpdateError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, enabled && /* @__PURE__ */ React.createElement(Popover, {
    bodyContent: t(`authentication-help:${namePrefix}FormHelp`)
  }, /* @__PURE__ */ React.createElement(TextContent, {
    className: "keycloak__section_intro__help"
  }, /* @__PURE__ */ React.createElement(Text, null, /* @__PURE__ */ React.createElement(QuestionCircleIcon, null), " ", t("authentication-help:webauthnIntro")))), /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true,
    onSubmit: handleSubmit(save),
    className: "keycloak__webauthn_policies_authentication__form"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("webAuthnPolicyRpEntityName"),
    fieldId: "webAuthnPolicyRpEntityName",
    helperTextInvalid: t("common:required"),
    validated: errors.webAuthnPolicyRpEntityName ? "error" : "default",
    isRequired: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:webAuthnPolicyRpEntityName",
      fieldLabelId: "authentication:webAuthnPolicyRpEntityName"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register({required: true}),
    name: `${namePrefix}RpEntityName`,
    id: "webAuthnPolicyRpEntityName",
    "data-testid": "webAuthnPolicyRpEntityName",
    validated: errors.webAuthnPolicyRpEntityName ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(WebauthnSelect, {
    name: `${namePrefix}SignatureAlgorithms`,
    label: "webAuthnPolicySignatureAlgorithms",
    options: SIGNATURE_ALGORITHMS,
    isMultiSelect: true
  }), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("webAuthnPolicyRpId"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:webAuthnPolicyRpId",
      fieldLabelId: "authentication:webAuthnPolicyRpId"
    }),
    fieldId: "webAuthnPolicyRpId"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "webAuthnPolicyRpId",
    name: `${namePrefix}RpId`,
    ref: register(),
    "data-testid": "webAuthnPolicyRpId\n            "
  })), /* @__PURE__ */ React.createElement(WebauthnSelect, {
    name: `${namePrefix}AttestationConveyancePreference`,
    label: "webAuthnPolicyAttestationConveyancePreference",
    options: ATTESTATION_PREFERENCE,
    labelPrefix: "attestationPreference"
  }), /* @__PURE__ */ React.createElement(WebauthnSelect, {
    name: `${namePrefix}AuthenticatorAttachment`,
    label: "webAuthnPolicyAuthenticatorAttachment",
    options: AUTHENTICATOR_ATTACHMENT,
    labelPrefix: "authenticatorAttachment"
  }), /* @__PURE__ */ React.createElement(WebauthnSelect, {
    name: `${namePrefix}RequireResidentKey`,
    label: "webAuthnPolicyRequireResidentKey",
    options: RESIDENT_KEY_OPTIONS,
    labelPrefix: "residentKey"
  }), /* @__PURE__ */ React.createElement(WebauthnSelect, {
    name: `${namePrefix}UserVerificationRequirement`,
    label: "webAuthnPolicyUserVerificationRequirement",
    options: USER_VERIFY,
    labelPrefix: "userVerify"
  }), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("webAuthnPolicyCreateTimeout"),
    fieldId: "webAuthnPolicyCreateTimeout",
    helperTextInvalid: t("webAuthnPolicyCreateTimeoutHint"),
    validated: errors.webAuthnPolicyCreateTimeout ? "error" : "default",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:webAuthnPolicyCreateTimeout",
      fieldLabelId: "authentication:webAuthnPolicyCreateTimeout"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: `${namePrefix}CreateTimeout`,
    defaultValue: 0,
    control,
    rules: {min: 0, max: 31536},
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      "data-testid": "webAuthnPolicyCreateTimeout",
      "aria-label": t("webAuthnPolicyCreateTimeout"),
      value,
      onChange,
      units: ["second", "minute", "hour"],
      validated: errors.webAuthnPolicyCreateTimeout ? "error" : "default"
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("webAuthnPolicyAvoidSameAuthenticatorRegister"),
    fieldId: "webAuthnPolicyAvoidSameAuthenticatorRegister",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:webAuthnPolicyAvoidSameAuthenticatorRegister",
      fieldLabelId: "authentication:webAuthnPolicyAvoidSameAuthenticatorRegister"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: `${namePrefix}AvoidSameAuthenticatorRegister`,
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "webAuthnPolicyAvoidSameAuthenticatorRegister",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("webAuthnPolicyAcceptableAaguids"),
    fieldId: "webAuthnPolicyAcceptableAaguids",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:webAuthnPolicyAcceptableAaguids",
      fieldLabelId: "authentication:webAuthnPolicyAcceptableAaguids"
    })
  }, /* @__PURE__ */ React.createElement(MultiLineInput, {
    name: `${namePrefix}AcceptableAaguids`,
    "aria-label": t("webAuthnPolicyAcceptableAaguids"),
    addButtonLabel: "authentication:addAaguids"
  }))), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "save",
    variant: "primary",
    type: "submit",
    isDisabled: !isDirty
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "reload",
    variant: ButtonVariant.link,
    onClick: () => setupForm(realm)
  }, t("common:reload")))));
};
