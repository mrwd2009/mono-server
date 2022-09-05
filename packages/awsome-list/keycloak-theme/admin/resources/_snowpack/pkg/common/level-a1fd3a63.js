/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/layouts/Level/level.css */
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
__snowpack__injectStyle(".pf-l-level {\n  --pf-l-level--m-gutter--MarginRight: var(--pf-global--gutter);\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n}\n.pf-l-level.pf-m-gutter > *:not(:last-child) {\n  margin-right: var(--pf-l-level--m-gutter--MarginRight);\n}");
