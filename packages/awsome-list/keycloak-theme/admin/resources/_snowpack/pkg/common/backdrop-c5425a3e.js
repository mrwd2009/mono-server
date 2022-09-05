/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/components/Backdrop/backdrop.css */
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
__snowpack__injectStyle(".pf-c-backdrop {\n  --pf-c-backdrop--Position: fixed;\n  --pf-c-backdrop--ZIndex: var(--pf-global--ZIndex--lg);\n  --pf-c-backdrop--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-100);\n  position: var(--pf-c-backdrop--Position);\n  top: 0;\n  left: 0;\n  z-index: var(--pf-c-backdrop--ZIndex);\n  width: 100%;\n  height: 100%;\n  background-color: var(--pf-c-backdrop--BackgroundColor);\n}\n\n.pf-c-backdrop__open {\n  overflow: hidden;\n}");
