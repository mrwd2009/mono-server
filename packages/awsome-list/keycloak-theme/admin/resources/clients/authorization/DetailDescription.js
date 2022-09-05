import React from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription
} from "../../_snowpack/pkg/@patternfly/react-core.js";
export function DetailDescription(props) {
  return /* @__PURE__ */ React.createElement(DetailDescriptionLink, {
    ...props
  });
}
export function DetailDescriptionLink({
  name,
  array,
  convert,
  link
}) {
  const {t} = useTranslation("clients");
  return /* @__PURE__ */ React.createElement(DescriptionListGroup, null, /* @__PURE__ */ React.createElement(DescriptionListTerm, null, t(name)), /* @__PURE__ */ React.createElement(DescriptionListDescription, null, array?.map((element) => {
    const value = typeof element === "string" ? element : convert(element);
    return link ? /* @__PURE__ */ React.createElement(Link, {
      key: value,
      to: link(element),
      className: "pf-u-pr-sm"
    }, value) : /* @__PURE__ */ React.createElement("span", {
      key: value,
      className: "pf-u-pr-sm"
    }, value);
  }), array?.length === 0 && /* @__PURE__ */ React.createElement("i", null, t("common:none"))));
}
