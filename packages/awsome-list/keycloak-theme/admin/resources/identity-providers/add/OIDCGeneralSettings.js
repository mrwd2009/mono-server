import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, ValidatedOptions} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {RedirectUrl} from "../component/RedirectUrl.js";
import {TextField} from "../component/TextField.js";
import {DisplayOrder} from "../component/DisplayOrder.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {useParams} from "../../_snowpack/pkg/react-router-dom.js";
export const OIDCGeneralSettings = ({id}) => {
  const {t} = useTranslation("identity-providers");
  const {tab} = useParams();
  const {
    register,
    formState: {errors}
  } = useFormContext();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(RedirectUrl, {
    id
  }), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("alias"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:alias",
      fieldLabelId: "identity-providers:alias"
    }),
    fieldId: "alias",
    isRequired: true,
    validated: errors.alias ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isReadOnly: tab === "settings",
    isRequired: true,
    type: "text",
    id: "alias",
    "data-testid": "alias",
    name: "alias",
    validated: errors.alias ? ValidatedOptions.error : ValidatedOptions.default,
    ref: register({required: true})
  })), /* @__PURE__ */ React.createElement(TextField, {
    field: "displayName",
    label: "displayName"
  }), /* @__PURE__ */ React.createElement(DisplayOrder, null));
};
