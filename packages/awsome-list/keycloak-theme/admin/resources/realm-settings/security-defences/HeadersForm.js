import React, {useEffect} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {ActionGroup, Button} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpLinkTextInput} from "./HelpLinkTextInput.js";
import {convertToFormValues} from "../../util.js";
import "./security-defences.css.proxy.js";
export const HeadersForm = ({realm, save}) => {
  const {t} = useTranslation();
  const form = useForm();
  const {
    setValue,
    formState: {isDirty},
    handleSubmit
  } = form;
  const setupForm = () => convertToFormValues(realm, setValue);
  useEffect(setupForm, []);
  return /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "keycloak__security-defences__form",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(HelpLinkTextInput, {
    fieldName: "browserSecurityHeaders.xFrameOptions",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options"
  }), /* @__PURE__ */ React.createElement(HelpLinkTextInput, {
    fieldName: "browserSecurityHeaders.contentSecurityPolicy",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy"
  }), /* @__PURE__ */ React.createElement(HelpLinkTextInput, {
    fieldName: "browserSecurityHeaders.contentSecurityPolicyReportOnly",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only"
  }), /* @__PURE__ */ React.createElement(HelpLinkTextInput, {
    fieldName: "browserSecurityHeaders.xContentTypeOptions",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options"
  }), /* @__PURE__ */ React.createElement(HelpLinkTextInput, {
    fieldName: "browserSecurityHeaders.xRobotsTag",
    url: "https://developers.google.com/search/docs/advanced/robots/robots_meta_tag"
  }), /* @__PURE__ */ React.createElement(HelpLinkTextInput, {
    fieldName: "browserSecurityHeaders.xXSSProtection",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection"
  }), /* @__PURE__ */ React.createElement(HelpLinkTextInput, {
    fieldName: "browserSecurityHeaders.strictTransportSecurity",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security"
  }), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "headers-form-tab-save",
    isDisabled: !isDirty
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: setupForm
  }, t("common:revert")))));
};
