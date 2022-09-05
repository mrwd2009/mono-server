import React from "../../_snowpack/pkg/react.js";
import {Trans, useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {FormattedLink} from "../../components/external-link/FormattedLink.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
export const HelpLinkTextInput = ({
  fieldName,
  url
}) => {
  const {t} = useTranslation("realm-settings");
  const {register} = useFormContext();
  const name = fieldName.substr(fieldName.indexOf(".") + 1);
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t(name),
    fieldId: name,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: /* @__PURE__ */ React.createElement(Trans, {
        i18nKey: `realm-settings-help:${name}`
      }, "Default value prevents pages from being included", /* @__PURE__ */ React.createElement(FormattedLink, {
        href: url,
        title: t("common:learnMore")
      })),
      fieldLabelId: name
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: name,
    name: fieldName,
    ref: register
  }));
};
