/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/components/Content/content.css */
function __snowpack__injectStyle(css) {
  const headEl = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = css;
  } else {
    styleEl.appendChild(document.createTextNode(css));
  }
  headEl.appendChild(styleEl);
}
__snowpack__injectStyle(".pf-c-content {\n  --pf-c-content--MarginBottom: var(--pf-global--spacer--md);\n  --pf-c-content--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-content--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-content--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-content--Color: var(--pf-global--Color--100);\n  --pf-c-content--heading--FontFamily: var(--pf-global--FontFamily--heading--sans-serif);\n  --pf-c-content--h1--MarginTop: var(--pf-global--spacer--lg);\n  --pf-c-content--h1--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-content--h1--LineHeight: var(--pf-global--LineHeight--sm);\n  --pf-c-content--h1--FontSize: var(--pf-global--FontSize--2xl);\n  --pf-c-content--h1--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-content--h2--MarginTop: var(--pf-global--spacer--lg);\n  --pf-c-content--h2--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-content--h2--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-content--h2--FontSize: var(--pf-global--FontSize--xl);\n  --pf-c-content--h2--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-content--h3--MarginTop: var(--pf-global--spacer--lg);\n  --pf-c-content--h3--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-content--h3--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-content--h3--FontSize: var(--pf-global--FontSize--lg);\n  --pf-c-content--h3--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-content--h4--MarginTop: var(--pf-global--spacer--lg);\n  --pf-c-content--h4--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-content--h4--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-content--h4--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-content--h4--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-content--h5--MarginTop: var(--pf-global--spacer--lg);\n  --pf-c-content--h5--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-content--h5--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-content--h5--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-content--h5--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-content--h6--MarginTop: var(--pf-global--spacer--lg);\n  --pf-c-content--h6--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-content--h6--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-content--h6--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-content--h6--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-content--small--MarginBottom: var(--pf-global--spacer--md);\n  --pf-c-content--small--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-content--small--FontSize: var(--pf-global--FontSize--sm);\n  --pf-c-content--small--Color: var(--pf-global--Color--200);\n  --pf-c-content--a--Color: var(--pf-global--link--Color);\n  --pf-c-content--a--TextDecoration: var(--pf-global--link--TextDecoration);\n  --pf-c-content--a--hover--Color: var(--pf-global--link--Color--hover);\n  --pf-c-content--a--hover--TextDecoration: var(--pf-global--link--TextDecoration--hover);\n  --pf-c-content--a--visited--Color: var(--pf-global--link--Color--visited);\n  --pf-c-content--blockquote--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-content--blockquote--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-content--blockquote--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-content--blockquote--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-content--blockquote--Color: var(--pf-global--Color--200);\n  --pf-c-content--blockquote--BorderLeftColor: var(--pf-global--BorderColor--100);\n  --pf-c-content--blockquote--BorderLeftWidth: var(--pf-global--BorderWidth--lg);\n  --pf-c-content--ol--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-content--ol--MarginLeft: var(--pf-global--spacer--lg);\n  --pf-c-content--ol--nested--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-content--ol--nested--MarginLeft: var(--pf-global--spacer--sm);\n  --pf-c-content--ul--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-content--ul--MarginLeft: var(--pf-global--spacer--lg);\n  --pf-c-content--ul--nested--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-content--ul--nested--MarginLeft: var(--pf-global--spacer--sm);\n  --pf-c-content--ul--ListStyle: var(--pf-global--ListStyle);\n  --pf-c-content--li--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-content--dl--ColumnGap: var(--pf-global--spacer--2xl);\n  --pf-c-content--dl--RowGap: var(--pf-global--spacer--md);\n  --pf-c-content--dt--FontWeight: var(--pf-global--FontWeight--semi-bold);\n  --pf-c-content--dt--MarginTop: var(--pf-global--spacer--md);\n  --pf-c-content--dt--sm--MarginTop: 0;\n  --pf-c-content--hr--Height: var(--pf-global--BorderWidth--sm);\n  --pf-c-content--hr--BackgroundColor: var(--pf-global--BorderColor--100);\n  font-size: var(--pf-c-content--FontSize);\n  line-height: var(--pf-c-content--LineHeight);\n  color: var(--pf-c-content--Color);\n}\n.pf-c-content a {\n  color: var(--pf-c-content--a--Color);\n  text-decoration: var(--pf-c-content--a--TextDecoration);\n}\n.pf-c-content a:hover {\n  --pf-c-content--a--Color: var(--pf-c-content--a--hover--Color);\n  --pf-c-content--a--TextDecoration: var(--pf-c-content--a--hover--TextDecoration);\n}\n.pf-c-content.pf-m-visited a:visited,\n.pf-c-content a.pf-m-visited:visited {\n  color: var(--pf-c-content--a--visited--Color);\n}\n.pf-c-content li + li {\n  margin-top: var(--pf-c-content--li--MarginTop);\n}\n.pf-c-content p:not(:last-child),\n.pf-c-content dl:not(:last-child),\n.pf-c-content ol:not(:last-child),\n.pf-c-content ul:not(:last-child),\n.pf-c-content blockquote:not(:last-child),\n.pf-c-content small:not(:last-child),\n.pf-c-content pre:not(:last-child),\n.pf-c-content table:not(:last-child),\n.pf-c-content hr:not(:last-child) {\n  margin-bottom: var(--pf-c-content--MarginBottom);\n}\n.pf-c-content h1,\n.pf-c-content h2,\n.pf-c-content h3,\n.pf-c-content h4,\n.pf-c-content h5,\n.pf-c-content h6 {\n  margin: 0;\n  font-family: var(--pf-c-content--heading--FontFamily);\n}\n.pf-c-content h1:first-child,\n.pf-c-content h2:first-child,\n.pf-c-content h3:first-child,\n.pf-c-content h4:first-child,\n.pf-c-content h5:first-child,\n.pf-c-content h6:first-child {\n  margin-top: 0;\n}\n.pf-c-content h1:last-child,\n.pf-c-content h2:last-child,\n.pf-c-content h3:last-child,\n.pf-c-content h4:last-child,\n.pf-c-content h5:last-child,\n.pf-c-content h6:last-child {\n  margin-bottom: 0;\n}\n.pf-c-content ol,\n.pf-c-content ul {\n  margin: 0;\n}\n.pf-c-content h1 {\n  margin-top: var(--pf-c-content--h1--MarginTop);\n  margin-bottom: var(--pf-c-content--h1--MarginBottom);\n  font-size: var(--pf-c-content--h1--FontSize);\n  font-weight: var(--pf-c-content--h1--FontWeight);\n  line-height: var(--pf-c-content--h1--LineHeight);\n}\n.pf-c-content h2 {\n  margin-top: var(--pf-c-content--h2--MarginTop);\n  margin-bottom: var(--pf-c-content--h2--MarginBottom);\n  font-size: var(--pf-c-content--h2--FontSize);\n  font-weight: var(--pf-c-content--h2--FontWeight);\n  line-height: var(--pf-c-content--h2--LineHeight);\n}\n.pf-c-content h3 {\n  margin-top: var(--pf-c-content--h3--MarginTop);\n  margin-bottom: var(--pf-c-content--h3--MarginBottom);\n  font-size: var(--pf-c-content--h3--FontSize);\n  font-weight: var(--pf-c-content--h3--FontWeight);\n  line-height: var(--pf-c-content--h3--LineHeight);\n}\n.pf-c-content h4 {\n  margin-top: var(--pf-c-content--h4--MarginTop);\n  margin-bottom: var(--pf-c-content--h4--MarginBottom);\n  font-size: var(--pf-c-content--h4--FontSize);\n  font-weight: var(--pf-c-content--h4--FontWeight);\n  line-height: var(--pf-c-content--h4--LineHeight);\n}\n.pf-c-content h5 {\n  margin-top: var(--pf-c-content--h5--MarginTop);\n  margin-bottom: var(--pf-c-content--h5--MarginBottom);\n  font-size: var(--pf-c-content--h5--FontSize);\n  font-weight: var(--pf-c-content--h5--FontWeight);\n  line-height: var(--pf-c-content--h5--LineHeight);\n}\n.pf-c-content h6 {\n  margin-top: var(--pf-c-content--h6--MarginTop);\n  margin-bottom: var(--pf-c-content--h6--MarginBottom);\n  font-size: var(--pf-c-content--h6--FontSize);\n  font-weight: var(--pf-c-content--h6--FontWeight);\n  line-height: var(--pf-c-content--h6--LineHeight);\n}\n.pf-c-content small {\n  display: block;\n  font-size: var(--pf-c-content--small--FontSize);\n  line-height: var(--pf-c-content--small--LineHeight);\n  color: var(--pf-c-content--small--Color);\n}\n.pf-c-content small:not(:last-child) {\n  margin-bottom: var(--pf-c-content--small--MarginBottom);\n}\n.pf-c-content blockquote {\n  padding: var(--pf-c-content--blockquote--PaddingTop) var(--pf-c-content--blockquote--PaddingRight) var(--pf-c-content--blockquote--PaddingBottom) var(--pf-c-content--blockquote--PaddingLeft);\n  color: var(--pf-c-content--blockquote--Color);\n  border-left: var(--pf-c-content--blockquote--BorderLeftWidth) solid var(--pf-c-content--blockquote--BorderLeftColor);\n}\n.pf-c-content hr {\n  height: var(--pf-c-content--hr--Height);\n  background-color: var(--pf-c-content--hr--BackgroundColor);\n  border: none;\n}\n.pf-c-content ol {\n  padding-left: var(--pf-c-content--ol--PaddingLeft);\n  margin-left: var(--pf-c-content--ol--MarginLeft);\n}\n.pf-c-content ol ul {\n  margin-top: var(--pf-c-content--ul--nested--MarginTop);\n  --pf-c-content--ul--MarginLeft: var(--pf-c-content--ul--nested--MarginLeft);\n}\n.pf-c-content ol ol {\n  margin-top: var(--pf-c-content--ol--nested--MarginTop);\n  --pf-c-content--ol--MarginLeft: var(--pf-c-content--ol--nested--MarginLeft);\n}\n.pf-c-content ul {\n  padding-left: var(--pf-c-content--ul--PaddingLeft);\n  margin-left: var(--pf-c-content--ul--MarginLeft);\n  list-style: var(--pf-c-content--ul--ListStyle);\n}\n.pf-c-content ul ul {\n  margin-top: var(--pf-c-content--ul--nested--MarginTop);\n  --pf-c-content--ul--MarginLeft: var(--pf-c-content--ul--nested--MarginLeft);\n}\n.pf-c-content ul ol {\n  margin-top: var(--pf-c-content--ol--nested--MarginTop);\n  --pf-c-content--ol--MarginLeft: var(--pf-c-content--ol--nested--MarginLeft);\n}\n.pf-c-content dl {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n@media screen and (min-width: 576px) {\n  .pf-c-content dl {\n    grid-template: auto/auto 1fr;\n    grid-column-gap: var(--pf-c-content--dl--ColumnGap);\n    grid-row-gap: var(--pf-c-content--dl--RowGap);\n  }\n}\n.pf-c-content dt {\n  font-weight: var(--pf-c-content--dt--FontWeight);\n}\n.pf-c-content dt:not(:first-child) {\n  margin-top: var(--pf-c-content--dt--MarginTop);\n}\n@media screen and (min-width: 576px) {\n  .pf-c-content dt:not(:first-child) {\n    --pf-c-content--dt--MarginTop: var(--pf-c-content--dt--sm--MarginTop);\n  }\n}\n@media screen and (min-width: 576px) {\n  .pf-c-content dt {\n    grid-column: 1;\n  }\n}\n@media screen and (min-width: 576px) {\n  .pf-c-content dd {\n    grid-column: 2;\n  }\n}\n\n.pf-m-overpass-font .pf-c-content {\n  --pf-c-content--h2--LineHeight: var(--pf-global--LineHeight--sm);\n  --pf-c-content--h4--FontWeight: var(--pf-global--FontWeight--semi-bold);\n  --pf-c-content--h5--FontWeight: var(--pf-global--FontWeight--semi-bold);\n  --pf-c-content--h6--FontWeight: var(--pf-global--FontWeight--semi-bold);\n}\n.pf-m-overpass-font .pf-c-content blockquote {\n  font-weight: var(--pf-global--FontWeight--light);\n}");
