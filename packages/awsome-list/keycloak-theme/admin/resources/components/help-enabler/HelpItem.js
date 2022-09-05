import {Popover} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import React, {isValidElement} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useHelp} from "./HelpHeader.js";
export const HelpItem = ({
  helpText,
  fieldLabelId,
  noVerticalAlign = true,
  unWrap = false
}) => {
  const {t} = useTranslation();
  const {enabled} = useHelp();
  return enabled ? /* @__PURE__ */ React.createElement(Popover, {
    bodyContent: isValidElement(helpText) ? helpText : t(helpText)
  }, /* @__PURE__ */ React.createElement(React.Fragment, null, !unWrap && /* @__PURE__ */ React.createElement("button", {
    "data-testid": `help-label-${t(fieldLabelId).toLowerCase().replace(/\s/g, "-")}`,
    "aria-label": t("helpLabel", {label: t(fieldLabelId)}),
    onClick: (e) => e.preventDefault(),
    className: "pf-c-form__group-label-help"
  }, /* @__PURE__ */ React.createElement(HelpIcon, {
    noVerticalAlign
  })), unWrap && /* @__PURE__ */ React.createElement(HelpIcon, {
    noVerticalAlign
  }))) : null;
};
