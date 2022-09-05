import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  Button,
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useServerInfo} from "../../context/server-info/ServerInfoProvider.js";
import {sortProviders} from "../../util.js";
import {MultiLineInput} from "../../components/multi-line-input/MultiLineInput.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const FineGrainOpenIdConnect = ({
  save,
  reset,
  hasConfigureAccess
}) => {
  const {t} = useTranslation("clients");
  const providers = useServerInfo().providers;
  const clientSignatureProviders = providers?.clientSignature.providers;
  const contentEncryptionProviders = providers?.contentencryption.providers;
  const cekManagementProviders = providers?.cekmanagement.providers;
  const signatureProviders = providers?.signature.providers;
  const [accessTokenOpen, setAccessTokenOpen] = useState(false);
  const [idTokenOpen, setIdTokenOpen] = useState(false);
  const [idTokenKeyManagementOpen, setIdTokenKeyManagementOpen] = useState(false);
  const [idTokenContentOpen, setIdTokenContentOpen] = useState(false);
  const [userInfoSignedResponseOpen, setUserInfoSignedResponseOpen] = useState(false);
  const [requestObjectSignatureOpen, setRequestObjectSignatureOpen] = useState(false);
  const [requestObjectRequiredOpen, setRequestObjectRequiredOpen] = useState(false);
  const [requestObjectEncryptionOpen, setRequestObjectEncryptionOpen] = useState(false);
  const [requestObjectEncodingOpen, setRequestObjectEncodingOpen] = useState(false);
  const [authorizationSignedOpen, setAuthorizationSignedOpen] = useState(false);
  const [authorizationEncryptedOpen, setAuthorizationEncryptedOpen] = useState(false);
  const [
    authorizationEncryptedResponseOpen,
    setAuthorizationEncryptedResponseOpen
  ] = useState(false);
  const {control, register} = useFormContext();
  const keyOptions = [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: "empty",
      value: ""
    }, t("common:choose")),
    ...sortProviders(clientSignatureProviders).map((p) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: p,
      value: p
    }))
  ];
  const cekManagementOptions = [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: "empty",
      value: ""
    }, t("common:choose")),
    ...sortProviders(cekManagementProviders).map((p) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: p,
      value: p
    }))
  ];
  const signatureOptions = [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: "unsigned",
      value: ""
    }, t("unsigned")),
    ...sortProviders(signatureProviders).map((p) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: p,
      value: p
    }))
  ];
  const contentOptions = [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: "empty",
      value: ""
    }, t("common:choose")),
    ...sortProviders(contentEncryptionProviders).map((p) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: p,
      value: p
    }))
  ];
  const requestObjectOptions = [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: "any",
      value: "any"
    }, t("common:any")),
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: "none",
      value: "none"
    }, t("common:none")),
    ...sortProviders(clientSignatureProviders).map((p) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: p,
      value: p
    }))
  ];
  const requestObjectEncryptionOptions = [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: "any",
      value: "any"
    }, t("common:any")),
    ...sortProviders(cekManagementProviders).map((p) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: p,
      value: p
    }))
  ];
  const requestObjectEncodingOptions = [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: "any",
      value: "any"
    }, t("common:any")),
    ...sortProviders(contentEncryptionProviders).map((p) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: p,
      value: p
    }))
  ];
  const authorizationSignedResponseOptions = [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: "empty",
      value: ""
    }, t("common:choose")),
    ...sortProviders(signatureProviders).map((p) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: p,
      value: p
    }))
  ];
  const requestObjectRequiredOptions = [
    "not required",
    "request or request_uri",
    "request only",
    "request_uri only"
  ].map((p) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: p,
    value: p
  }, t(`requestObject.${p}`)));
  return /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-clients",
    fineGrainedAccess: hasConfigureAccess,
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("logoUrl"),
    fieldId: "logoUrl",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:logoUrl",
      fieldLabelId: "clients:logoUrl"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "logoUrl",
    name: "attributes.logoUri",
    "data-testid": "logoUrl",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("policyUrl"),
    fieldId: "policyUrl",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:policyUrl",
      fieldLabelId: "clients:policyUrl"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "policyUrl",
    name: "attributes.policyUri",
    "data-testid": "policyUrl",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("termsOfServiceUrl"),
    fieldId: "termsOfServiceUrl",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:termsOfServiceUrl",
      fieldLabelId: "clients:termsOfServiceUrl"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "termsOfServiceUrl",
    name: "attributes.tosUri",
    "data-testid": "termsOfServiceUrl",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("accessTokenSignatureAlgorithm"),
    fieldId: "accessTokenSignatureAlgorithm",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:accessTokenSignatureAlgorithm",
      fieldLabelId: "clients:accessTokenSignatureAlgorithm"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.access.token.signed.response.alg",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "accessTokenSignatureAlgorithm",
      variant: SelectVariant.single,
      onToggle: setAccessTokenOpen,
      isOpen: accessTokenOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setAccessTokenOpen(false);
      },
      selections: value
    }, keyOptions)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("idTokenSignatureAlgorithm"),
    fieldId: "kc-id-token-signature",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:idTokenSignatureAlgorithm",
      fieldLabelId: "clients:idTokenSignatureAlgorithm"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.id.token.signed.response.alg",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "idTokenSignatureAlgorithm",
      variant: SelectVariant.single,
      onToggle: setIdTokenOpen,
      isOpen: idTokenOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setIdTokenOpen(false);
      },
      selections: value
    }, keyOptions)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("idTokenEncryptionKeyManagementAlgorithm"),
    fieldId: "idTokenEncryptionKeyManagementAlgorithm",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:idTokenEncryptionKeyManagementAlgorithm",
      fieldLabelId: "clients:idTokenEncryptionKeyManagementAlgorithm"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.id.token.encrypted.response.alg",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "idTokenEncryptionKeyManagementAlgorithm",
      variant: SelectVariant.single,
      onToggle: setIdTokenKeyManagementOpen,
      isOpen: idTokenKeyManagementOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setIdTokenKeyManagementOpen(false);
      },
      selections: value
    }, cekManagementOptions)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("idTokenEncryptionContentEncryptionAlgorithm"),
    fieldId: "idTokenEncryptionContentEncryptionAlgorithm",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:idTokenEncryptionContentEncryptionAlgorithm",
      fieldLabelId: "clients:idTokenEncryptionContentEncryptionAlgorithm"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.id.token.encrypted.response.enc",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "idTokenEncryptionContentEncryptionAlgorithm",
      variant: SelectVariant.single,
      onToggle: setIdTokenContentOpen,
      isOpen: idTokenContentOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setIdTokenContentOpen(false);
      },
      selections: value
    }, contentOptions)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("userInfoSignedResponseAlgorithm"),
    fieldId: "userInfoSignedResponseAlgorithm",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:userInfoSignedResponseAlgorithm",
      fieldLabelId: "clients:userInfoSignedResponseAlgorithm"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.user.info.response.signature.alg",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "userInfoSignedResponseAlgorithm",
      variant: SelectVariant.single,
      onToggle: setUserInfoSignedResponseOpen,
      isOpen: userInfoSignedResponseOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setUserInfoSignedResponseOpen(false);
      },
      selections: value
    }, signatureOptions)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("requestObjectSignatureAlgorithm"),
    fieldId: "requestObjectSignatureAlgorithm",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:requestObjectSignatureAlgorithm",
      fieldLabelId: "clients:requestObjectSignatureAlgorithm"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.request.object.signature.alg",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "requestObjectSignatureAlgorithm",
      variant: SelectVariant.single,
      onToggle: setRequestObjectSignatureOpen,
      isOpen: requestObjectSignatureOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setRequestObjectSignatureOpen(false);
      },
      selections: value
    }, requestObjectOptions)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("requestObjectEncryption"),
    fieldId: "requestObjectEncryption",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:requestObjectEncryption",
      fieldLabelId: "clients:requestObjectEncryption"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.request.object.encryption.alg",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "requestObjectEncryption",
      variant: SelectVariant.single,
      onToggle: setRequestObjectEncryptionOpen,
      isOpen: requestObjectEncryptionOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setRequestObjectEncryptionOpen(false);
      },
      selections: value
    }, requestObjectEncryptionOptions)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("requestObjectEncoding"),
    fieldId: "requestObjectEncoding",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:requestObjectEncoding",
      fieldLabelId: "clients:requestObjectEncoding"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.request.object.encryption.enc",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "requestObjectEncoding",
      variant: SelectVariant.single,
      onToggle: setRequestObjectEncodingOpen,
      isOpen: requestObjectEncodingOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setRequestObjectEncodingOpen(false);
      },
      selections: value
    }, requestObjectEncodingOptions)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("requestObjectRequired"),
    fieldId: "requestObjectRequired",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:requestObjectRequired",
      fieldLabelId: "clients:requestObjectRequired"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.request.object.required",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "requestObjectRequired",
      variant: SelectVariant.single,
      onToggle: setRequestObjectRequiredOpen,
      isOpen: requestObjectRequiredOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setRequestObjectRequiredOpen(false);
      },
      selections: value
    }, requestObjectRequiredOptions)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("validRequestURIs"),
    fieldId: "validRequestURIs",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:validRequestURIs",
      fieldLabelId: "clients:validRequestURIs"
    })
  }, /* @__PURE__ */ React.createElement(MultiLineInput, {
    name: "attributes.request.uris",
    "aria-label": t("validRequestURIs"),
    addButtonLabel: "clients:addRequestUri"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("authorizationSignedResponseAlg"),
    fieldId: "authorizationSignedResponseAlg",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:authorizationSignedResponseAlg",
      fieldLabelId: "clients:authorizationSignedResponseAlg"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.authorization.signed.response.alg",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "authorizationSignedResponseAlg",
      variant: SelectVariant.single,
      onToggle: setAuthorizationSignedOpen,
      isOpen: authorizationSignedOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setAuthorizationSignedOpen(false);
      },
      selections: value
    }, authorizationSignedResponseOptions)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("authorizationEncryptedResponseAlg"),
    fieldId: "authorizationEncryptedResponseAlg",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:authorizationEncryptedResponseAlg",
      fieldLabelId: "clients:authorizationEncryptedResponseAlg"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.authorization.encrypted.response.alg",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "authorizationEncryptedResponseAlg",
      variant: SelectVariant.single,
      onToggle: setAuthorizationEncryptedOpen,
      isOpen: authorizationEncryptedOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setAuthorizationEncryptedOpen(false);
      },
      selections: value
    }, cekManagementOptions)
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("authorizationEncryptedResponseEnc"),
    fieldId: "authorizationEncryptedResponseEnc",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:authorizationEncryptedResponseEnc",
      fieldLabelId: "clients:authorizationEncryptedResponseEnc"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.authorization.encrypted.response.enc",
    defaultValue: "",
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "authorizationEncryptedResponseEnc",
      variant: SelectVariant.single,
      onToggle: setAuthorizationEncryptedResponseOpen,
      isOpen: authorizationEncryptedResponseOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setAuthorizationEncryptedResponseOpen(false);
      },
      selections: value
    }, contentOptions)
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    id: "fineGrainSave",
    onClick: save
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    id: "fineGrainRevert",
    variant: "link",
    onClick: reset
  }, t("common:revert"))));
};
