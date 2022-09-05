/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/components/CodeBlock/code-block.css */
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
__snowpack__injectStyle(".pf-c-code-block {\n  --pf-c-code-block--BackgroundColor: var(--pf-global--BackgroundColor--200);\n  --pf-c-code-block__header--BorderBottomWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-code-block__header--BorderBottomColor: var(--pf-global--BorderColor--100);\n  --pf-c-code-block__content--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-code-block__content--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-code-block__content--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-code-block__content--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-code-block__pre--FontFamily: var(--pf-global--FontFamily--monospace);\n  --pf-c-code-block__pre--FontSize: var(--pf-global--FontSize--sm);\n  background-color: var(--pf-c-code-block--BackgroundColor);\n}\n\n.pf-c-code-block__header {\n  display: flex;\n  border-bottom: var(--pf-c-code-block__header--BorderBottomWidth) solid var(--pf-c-code-block__header--BorderBottomColor);\n}\n\n.pf-c-code-block__actions {\n  display: flex;\n  margin-left: auto;\n}\n\n.pf-c-code-block__content {\n  padding: var(--pf-c-code-block__content--PaddingTop) var(--pf-c-code-block__content--PaddingRight) var(--pf-c-code-block__content--PaddingBottom) var(--pf-c-code-block__content--PaddingLeft);\n}\n\n.pf-c-code-block__pre {\n  font-family: var(--pf-c-code-block__pre--FontFamily);\n  font-size: var(--pf-c-code-block__pre--FontSize);\n  overflow-wrap: break-word;\n  white-space: pre-wrap;\n}\n\n.pf-c-code-block__code {\n  font-family: var(--pf-c-code-block__code--FontFamily, inherit);\n}");
