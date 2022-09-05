/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/layouts/Split/split.css */
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
__snowpack__injectStyle(".pf-l-split {\n  --pf-l-split--m-gutter--MarginRight: var(--pf-global--gutter);\n  display: flex;\n  padding: 0;\n  margin: 0;\n}\n.pf-l-split.pf-m-wrap {\n  flex-wrap: wrap;\n}\n\n.pf-l-split__item.pf-m-fill {\n  flex-grow: 1;\n}\n\n.pf-l-split.pf-m-gutter > *:not(:last-child) {\n  margin-right: var(--pf-l-split--m-gutter--MarginRight);\n}");
