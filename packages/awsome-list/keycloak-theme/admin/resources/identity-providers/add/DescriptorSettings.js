import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ExpandableSection,
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  ValidatedOptions
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {SwitchField} from "../component/SwitchField.js";
import {TextField} from "../component/TextField.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import "./discovery-settings.css.proxy.js";
const Fields = ({readOnly}) => {
  const {t} = useTranslation("identity-providers");
  const {t: th} = useTranslation("identity-providers-help");
  const {
    register,
    control,
    formState: {errors}
  } = useFormContext();
  const [namedPolicyDropdownOpen, setNamedPolicyDropdownOpen] = useState(false);
  const [principalTypeDropdownOpen, setPrincipalTypeDropdownOpen] = useState(false);
  const [signatureAlgorithmDropdownOpen, setSignatureAlgorithmDropdownOpen] = useState(false);
  const [
    samlSignatureKeyNameDropdownOpen,
    setSamlSignatureKeyNameDropdownOpen
  ] = useState(false);
  const wantAuthnSigned = useWatch({
    control,
    name: "config.wantAuthnRequestsSigned"
  });
  const validateSignature = useWatch({
    control,
    name: "config.validateSignature"
  });
  const principalType = useWatch({
    control,
    name: "config.principalType"
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: "pf-c-form pf-m-horizontal"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("serviceProviderEntityId"),
    fieldId: "kc-saml-service-provider-entity-id",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:serviceProviderEntityId",
      fieldLabelId: "identity-providers:serviceProviderEntityId"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    name: "config.entityId",
    "data-testid": "serviceProviderEntityId",
    id: "kc-saml-service-provider-entity-id",
    ref: register()
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("identityProviderEntityId"),
    fieldId: "kc-identity-provider-entity-id",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:identityProviderEntityId",
      fieldLabelId: "identity-providers:identityProviderEntityId"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    name: "config.idpEntityId",
    "data-testid": "identityProviderEntityId",
    id: "kc-identity-provider-entity-id",
    ref: register()
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("ssoServiceUrl"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: th("ssoServiceUrl"),
      fieldLabelId: "identity-providers:ssoServiceUrl"
    }),
    fieldId: "kc-sso-service-url",
    isRequired: true,
    validated: errors.config?.authorizationUrl ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    "data-testid": "sso-service-url",
    id: "kc-sso-service-url",
    name: "config.singleSignOnServiceUrl",
    ref: register({required: true}),
    validated: errors.config?.singleSignOnServiceUrl ? ValidatedOptions.error : ValidatedOptions.default,
    isReadOnly: readOnly
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("singleLogoutServiceUrl"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: th("singleLogoutServiceUrl"),
      fieldLabelId: "identity-providers:singleLogoutServiceUrl"
    }),
    fieldId: "single-logout-service-url",
    validated: errors.config?.singleLogoutServiceUrl ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "single-logout-service-url",
    name: "config.singleLogoutServiceUrl",
    ref: register,
    isReadOnly: readOnly
  })), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.backchannelSupported",
    label: "backchannelLogout",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("nameIdPolicyFormat"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: th("nameIdPolicyFormat"),
      fieldLabelId: "identity-providers:nameIdPolicyFormat"
    }),
    fieldId: "kc-nameIdPolicyFormat",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.nameIDPolicyFormat",
    defaultValue: t("persistent"),
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-nameIdPolicyFormat",
      onToggle: (isExpanded) => setNamedPolicyDropdownOpen(isExpanded),
      isOpen: namedPolicyDropdownOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setNamedPolicyDropdownOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      isDisabled: readOnly
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      "data-testid": "persistent-option",
      value: "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent",
      isPlaceholder: true
    }, t("persistent")), /* @__PURE__ */ React.createElement(SelectOption, {
      "data-testid": "transient-option",
      value: "urn:oasis:names:tc:SAML:2.0:nameid-format:transient"
    }, t("transient")), /* @__PURE__ */ React.createElement(SelectOption, {
      "data-testid": "email-option",
      value: "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
    }, t("email")), /* @__PURE__ */ React.createElement(SelectOption, {
      "data-testid": "kerberos-option",
      value: "urn:oasis:names:tc:SAML:2.0:nameid-format:kerberos"
    }, t("kerberos")), /* @__PURE__ */ React.createElement(SelectOption, {
      "data-testid": "x509-option",
      value: "urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName"
    }, t("x509")), /* @__PURE__ */ React.createElement(SelectOption, {
      "data-testid": "windowsDomainQN-option",
      value: "urn:oasis:names:tc:SAML:1.1:nameid-format:WindowsDomainQualifiedName"
    }, t("windowsDomainQN")), /* @__PURE__ */ React.createElement(SelectOption, {
      "data-testid": "unspecified-option",
      value: "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
    }, t("unspecified")))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("principalType"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: th("principalType"),
      fieldLabelId: "identity-providers:principalType"
    }),
    fieldId: "kc-principalType",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.principalType",
    defaultValue: t("subjectNameId"),
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-principalType",
      onToggle: (isExpanded) => setPrincipalTypeDropdownOpen(isExpanded),
      isOpen: principalTypeDropdownOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setPrincipalTypeDropdownOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      isDisabled: readOnly
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      "data-testid": "subjectNameId-option",
      value: "SUBJECT",
      isPlaceholder: true
    }, t("subjectNameId")), /* @__PURE__ */ React.createElement(SelectOption, {
      "data-testid": "attributeName-option",
      value: "ATTRIBUTE"
    }, t("attributeName")), /* @__PURE__ */ React.createElement(SelectOption, {
      "data-testid": "attributeFriendlyName-option",
      value: "FRIENDLY_ATTRIBUTE"
    }, t("attributeFriendlyName")))
  })), principalType?.includes("ATTRIBUTE") && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("principalAttribute"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: th("principalAttribute"),
      fieldLabelId: "identity-providers:principalAttribute"
    }),
    fieldId: "principalAttribute"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "principalAttribute",
    name: "config.principalAttribute",
    ref: register,
    isReadOnly: readOnly
  })), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.allowCreate",
    label: "allowCreate",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.postBindingResponse",
    label: "httpPostBindingResponse",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.postBindingAuthnRequest",
    label: "httpPostBindingAuthnRequest",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.postBindingLogout",
    label: "httpPostBindingLogout",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.wantAuthnRequestsSigned",
    label: "wantAuthnRequestsSigned",
    isReadOnly: readOnly
  }), wantAuthnSigned === "true" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("signatureAlgorithm"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: th("signatureAlgorithm"),
      fieldLabelId: "identity-providers:signatureAlgorithm"
    }),
    fieldId: "kc-signatureAlgorithm"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.signatureAlgorithm",
    defaultValue: "RSA_SHA256",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-signatureAlgorithm",
      onToggle: (isExpanded) => setSignatureAlgorithmDropdownOpen(isExpanded),
      isOpen: signatureAlgorithmDropdownOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setSignatureAlgorithmDropdownOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      isDisabled: readOnly
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      value: "RSA_SHA1"
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      value: "RSA_SHA256",
      isPlaceholder: true
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      value: "RSA_SHA256_MGF1"
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      value: "RSA_SHA512"
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      value: "RSA_SHA512_MGF1"
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      value: "DSA_SHA1"
    }))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("samlSignatureKeyName"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: th("samlSignatureKeyName"),
      fieldLabelId: "identity-providers:samlSignatureKeyName"
    }),
    fieldId: "kc-samlSignatureKeyName"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "config.xmlSigKeyInfoKeyNameTransformer",
    defaultValue: t("keyID"),
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-samlSignatureKeyName",
      onToggle: (isExpanded) => setSamlSignatureKeyNameDropdownOpen(isExpanded),
      isOpen: samlSignatureKeyNameDropdownOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setSamlSignatureKeyNameDropdownOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      isDisabled: readOnly
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      value: "NONE"
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      value: t("keyID"),
      isPlaceholder: true
    }), /* @__PURE__ */ React.createElement(SelectOption, {
      value: t("certSubject")
    }))
  }))), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.wantAssertionsSigned",
    label: "wantAssertionsSigned",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.wantAssertionsEncrypted",
    label: "wantAssertionsEncrypted",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.forceAuthn",
    label: "forceAuthentication",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.validateSignature",
    label: "validateSignature",
    isReadOnly: readOnly
  }), validateSignature === "true" && /* @__PURE__ */ React.createElement(TextField, {
    field: "config.signingCertificate",
    label: "validatingX509Certs",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.signSpMetadata",
    label: "signServiceProviderMetadata",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(SwitchField, {
    field: "config.loginHint",
    label: "passSubject",
    isReadOnly: readOnly
  }), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("allowedClockSkew"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: th("allowedClockSkew"),
      fieldLabelId: "identity-providers:allowedClockSkew"
    }),
    fieldId: "allowedClockSkew",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "number",
    min: "0",
    max: "2147483",
    id: "allowedClockSkew",
    name: "config.allowedClockSkew",
    ref: register,
    isReadOnly: readOnly
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("attributeConsumingServiceIndex"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: th("attributeConsumingServiceIndex"),
      fieldLabelId: "identity-providers:attributeConsumingServiceIndex"
    }),
    fieldId: "attributeConsumingServiceIndex",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "number",
    min: "0",
    max: "65535",
    id: "attributeConsumingServiceIndex",
    name: "config.attributeConsumingServiceIndex",
    ref: register,
    isReadOnly: readOnly
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("attributeConsumingServiceName"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: th("attributeConsumingServiceName"),
      fieldLabelId: "identity-providers:attributeConsumingServiceName"
    }),
    fieldId: "attributeConsumingServiceName",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "attributeConsumingServiceName",
    name: "config.attributeConsumingServiceName",
    ref: register,
    isReadOnly: readOnly
  })));
};
export const DescriptorSettings = ({readOnly}) => {
  const {t} = useTranslation("identity-providers");
  const [isExpanded, setIsExpanded] = useState(false);
  return readOnly ? /* @__PURE__ */ React.createElement(ExpandableSection, {
    className: "keycloak__discovery-settings__metadata",
    toggleText: isExpanded ? t("hideMetaData") : t("showMetaData"),
    onToggle: (isOpen) => setIsExpanded(isOpen),
    isExpanded
  }, /* @__PURE__ */ React.createElement(Fields, {
    readOnly
  })) : /* @__PURE__ */ React.createElement(Fields, {
    readOnly
  });
};
