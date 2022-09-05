import React from "../../_snowpack/pkg/react.js";
import {ExternalLinkAltIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
export const FormattedLink = ({
  title,
  href,
  isInline,
  ...rest
}) => {
  return /* @__PURE__ */ React.createElement("a", {
    href,
    target: "_blank",
    rel: "noreferrer noopener",
    className: isInline ? "pf-m-link pf-m-inline" : "",
    ...rest
  }, title ? title : href, " ", href?.startsWith("http") && /* @__PURE__ */ React.createElement(ExternalLinkAltIcon, null));
};
export const formattedLinkTableCell = () => (data) => {
  return data ? /* @__PURE__ */ React.createElement(FormattedLink, {
    href: data.toString()
  }) : void 0;
};
