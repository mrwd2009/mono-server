/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/layouts/Bullseye/bullseye.css */
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
__snowpack__injectStyle(".pf-l-bullseye {\n  --pf-l-bullseye--Padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  padding: var(--pf-l-bullseye--Padding);\n  margin: 0;\n}");
