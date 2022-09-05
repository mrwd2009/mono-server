import React, {Fragment, useMemo} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Grid,
  GridItem,
  JumpLinks,
  JumpLinksItem,
  PageSection
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {mainPageContentId} from "../../App.js";
import {ScrollPanel} from "./ScrollPanel.js";
import {FormPanel} from "./FormPanel.js";
import "./scroll-form.css.proxy.js";
const spacesToHyphens = (string) => {
  return string.replace(/\s+/g, "-");
};
export const ScrollForm = ({
  sections,
  borders = false,
  ...rest
}) => {
  const {t} = useTranslation("common");
  const shownSections = useMemo(() => sections.filter(({isHidden}) => !isHidden), [sections]);
  return /* @__PURE__ */ React.createElement(Grid, {
    hasGutter: true,
    ...rest
  }, /* @__PURE__ */ React.createElement(GridItem, {
    span: 8
  }, shownSections.map(({title, panel}) => {
    const scrollId = spacesToHyphens(title.toLowerCase());
    return /* @__PURE__ */ React.createElement(Fragment, {
      key: title
    }, borders ? /* @__PURE__ */ React.createElement(FormPanel, {
      scrollId,
      title,
      className: "kc-form-panel__panel"
    }, panel) : /* @__PURE__ */ React.createElement(ScrollPanel, {
      scrollId,
      title
    }, panel));
  })), /* @__PURE__ */ React.createElement(GridItem, {
    span: 4
  }, /* @__PURE__ */ React.createElement(PageSection, {
    className: "kc-scroll-form--sticky"
  }, /* @__PURE__ */ React.createElement(JumpLinks, {
    isVertical: true,
    scrollableSelector: `#${mainPageContentId}`,
    label: t("jumpToSection"),
    offset: 100
  }, shownSections.map(({title}) => {
    const scrollId = spacesToHyphens(title.toLowerCase());
    return /* @__PURE__ */ React.createElement(JumpLinksItem, {
      key: title,
      href: `#${scrollId}`,
      "data-testid": `jump-link-${scrollId}`
    }, title);
  })))));
};
