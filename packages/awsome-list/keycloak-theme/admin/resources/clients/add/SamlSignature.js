import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {Toggle} from "./SamlConfig.js";
const SIGNATURE_ALGORITHMS = [
  "RSA_SHA1",
  "RSA_SHA256",
  "RSA_SHA256_MGF1",
  "RSA_SHA512",
  "RSA_SHA512_MGF1",
  "DSA_SHA1"
];
const KEYNAME_TRANSFORMER = ["NONE", "KEY_ID", "CERT_SUBJECT"];
const CANONICALIZATION = [
  {name: "EXCLUSIVE", value: "http://www.w3.org/2001/10/xml-exc-c14n#"},
  {
    name: "EXCLUSIVE_WITH_COMMENTS",
    value: "http://www.w3.org/2001/10/xml-exc-c14n#WithComments"
  },
  {
    name: "INCLUSIVE",
    value: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"
  },
  {
    name: "INCLUSIVE_WITH_COMMENTS",
    value: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments"
  }
];
export const SamlSignature = () => {
  const {t} = useTranslation("clients");
  const [algOpen, setAlgOpen] = useState(false);
  const [keyOpen, setKeyOpen] = useState(false);
  const [canOpen, setCanOpen] = useState(false);
  const {control, watch} = useFormContext();
  const signDocs = watch("attributes.saml$server$signature");
  const signAssertion = watch("attributes.saml.assertion.signature");
  return /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-clients",
    className: "keycloak__capability-config__form"
  }, /* @__PURE__ */ React.createElement(Toggle, {
    name: "attributes.saml$server$signature",
    label: "signDocuments"
  }), /* @__PURE__ */ React.createElement(Toggle, {
    name: "attributes.saml.assertion.signature",
    label: "signAssertions"
  }), (signDocs === "true" || signAssertion === "true") && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("signatureAlgorithm"),
    fieldId: "signatureAlgorithm",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:signatureAlgorithm",
      fieldLabelId: "clients:signatureAlgorithm"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.saml.signature.algorithm",
    defaultValue: SIGNATURE_ALGORITHMS[0],
    Key: true,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "signatureAlgorithm",
      onToggle: setAlgOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setAlgOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("signatureAlgorithm"),
      isOpen: algOpen
    }, SIGNATURE_ALGORITHMS.map((algorithm) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: algorithm === value,
      key: algorithm,
      value: algorithm
    })))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("signatureKeyName"),
    fieldId: "signatureKeyName",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:signatureKeyName",
      fieldLabelId: "clients:signatureKeyName"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.saml$server$signature$keyinfo$xmlSigKeyInfoKeyNameTransformer",
    defaultValue: KEYNAME_TRANSFORMER[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "signatureKeyName",
      onToggle: setKeyOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setKeyOpen(false);
      },
      selections: value,
      variant: SelectVariant.single,
      "aria-label": t("signatureKeyName"),
      isOpen: keyOpen
    }, KEYNAME_TRANSFORMER.map((key) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: key === value,
      key,
      value: key
    })))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("canonicalization"),
    fieldId: "canonicalization",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:canonicalization",
      fieldLabelId: "clients:canonicalization"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "attributes.saml_signature_canonicalization_method",
    defaultValue: CANONICALIZATION[0].value,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "canonicalization",
      onToggle: setCanOpen,
      onSelect: (_, value2) => {
        onChange(value2.toString());
        setCanOpen(false);
      },
      selections: CANONICALIZATION.find((can) => can.value === value)?.name,
      variant: SelectVariant.single,
      "aria-label": t("canonicalization"),
      isOpen: canOpen
    }, CANONICALIZATION.map((can) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: can.value === value,
      key: can.name,
      value: can.value
    }, can.name)))
  }))));
};
