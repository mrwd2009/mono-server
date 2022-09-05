/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/layouts/Stack/stack.css */
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
__snowpack__injectStyle(".pf-l-stack {\n  --pf-l-stack--m-gutter--MarginBottom: var(--pf-global--gutter);\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n.pf-l-stack__item.pf-m-fill {\n  flex-grow: 1;\n}\n\n.pf-l-stack.pf-m-gutter > *:not(:last-child) {\n  margin-bottom: var(--pf-l-stack--m-gutter--MarginBottom);\n}");
