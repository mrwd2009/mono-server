/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/components/CodeEditor/code-editor.css */
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
__snowpack__injectStyle(".pf-c-code-editor {\n  --pf-c-code-editor__controls--c-button--m-control--Color: var(--pf-global--Color--200);\n  --pf-c-code-editor__controls--c-button--m-control--hover--Color: var(--pf-global--Color--100);\n  --pf-c-code-editor__controls--c-button--m-control--focus--Color: var(--pf-global--Color--100);\n  --pf-c-code-editor__controls--c-button--m-control--disabled--after--BorderBottomColor: var(--pf-global--BorderColor--100);\n  --pf-c-code-editor__header--before--BorderBottomWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-code-editor__header--before--BorderBottomColor: var(--pf-global--BorderColor--100);\n  --pf-c-code-editor__main--BorderColor: var(--pf-global--BorderColor--100);\n  --pf-c-code-editor__main--BorderWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-code-editor__main--BackgroundColor: var(--pf-global--BackgroundColor--100);\n  --pf-c-code-editor--m-read-only__main--BackgroundColor: var(--pf-global--disabled-color--300);\n  --pf-c-code-editor__main--m-drag-hover--before--BorderWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-code-editor__main--m-drag-hover--before--BorderColor: var(--pf-global--primary-color--100);\n  --pf-c-code-editor__main--m-drag-hover--after--BackgroundColor: var(--pf-global--primary-color--100);\n  --pf-c-code-editor__main--m-drag-hover--after--Opacity: .1;\n  --pf-c-code-editor__code--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-code-editor__code--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-code-editor__code--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-code-editor__code--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-code-editor__code-pre--FontSize: var(--pf-global--FontSize--sm);\n  --pf-c-code-editor__code-pre--FontFamily: var(--pf-global--FontFamily--monospace);\n  --pf-c-code-editor__header-main--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-code-editor__header-main--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-code-editor__tab--BackgroundColor: var(--pf-global--BackgroundColor--100);\n  --pf-c-code-editor__tab--Color: var(--pf-global--Color--200);\n  --pf-c-code-editor__tab--PaddingTop: var(--pf-global--spacer--form-element);\n  --pf-c-code-editor__tab--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-code-editor__tab--PaddingBottom: var(--pf-global--spacer--form-element);\n  --pf-c-code-editor__tab--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-code-editor__tab--BorderTopWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-code-editor__tab--BorderRightWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-code-editor__tab--BorderBottomWidth: 0;\n  --pf-c-code-editor__tab--BorderLeftWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-code-editor__tab--BorderColor: var(--pf-global--BorderColor--100);\n  --pf-c-code-editor__tab-icon--text--MarginLeft: var(--pf-global--spacer--sm);\n}\n.pf-c-code-editor.pf-m-read-only {\n  --pf-c-code-editor__main--BackgroundColor: var(--pf-c-code-editor--m-read-only__main--BackgroundColor);\n}\n\n.pf-c-code-editor__header {\n  position: relative;\n  display: flex;\n  align-items: flex-end;\n}\n.pf-c-code-editor__header::before {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n  content: \"\";\n  border-bottom: var(--pf-c-code-editor__header--before--BorderBottomWidth) solid var(--pf-c-code-editor__header--before--BorderBottomColor);\n}\n\n.pf-c-code-editor__controls {\n  display: flex;\n}\n.pf-c-code-editor__controls .pf-c-button.pf-m-control {\n  --pf-c-button--m-control--Color: var(--pf-c-code-editor__controls--c-button--m-control--Color);\n}\n.pf-c-code-editor__controls .pf-c-button.pf-m-control:hover {\n  --pf-c-code-editor__controls--c-button--m-control--Color: var(--pf-c-code-editor__controls--c-button--m-control--hover--Color);\n}\n.pf-c-code-editor__controls .pf-c-button.pf-m-control:focus {\n  --pf-c-code-editor__controls--c-button--m-control--Color: var(--pf-c-code-editor__controls--c-button--m-control--focus--Color);\n}\n.pf-c-code-editor__controls .pf-c-button.pf-m-control:disabled::after {\n  border-bottom-color: var(--pf-c-code-editor__controls--c-button--m-control--disabled--after--BorderBottomColor);\n}\n\n.pf-c-code-editor__header-main {\n  flex-grow: 1;\n  padding-right: var(--pf-c-code-editor__header-main--PaddingRight);\n  padding-left: var(--pf-c-code-editor__header-main--PaddingLeft);\n}\n\n.pf-c-code-editor__main {\n  position: relative;\n  background-color: var(--pf-c-code-editor__main--BackgroundColor);\n  border: var(--pf-c-code-editor__main--BorderWidth) solid;\n  border-color: var(--pf-c-code-editor__main--BorderColor);\n}\n.pf-c-code-editor__main.pf-m-drag-hover::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  content: \"\";\n  background-color: var(--pf-c-code-editor__main--m-drag-hover--after--BackgroundColor);\n  opacity: var(--pf-c-code-editor__main--m-drag-hover--after--Opacity);\n}\n.pf-c-code-editor__main.pf-m-drag-hover::before {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  content: \"\";\n  border: var(--pf-c-code-editor__main--m-drag-hover--before--BorderWidth) solid var(--pf-c-code-editor__main--m-drag-hover--before--BorderColor);\n}\n.pf-c-code-editor__main .monaco-editor {\n  background-color: var(--pf-c-code-editor__main--BackgroundColor);\n}\n\n.pf-c-code-editor__header + .pf-c-code-editor__main {\n  border-top-width: 0;\n}\n\n.pf-c-code-editor__code {\n  position: relative;\n  padding: var(--pf-c-code-editor__code--PaddingTop) var(--pf-c-code-editor__code--PaddingRight) var(--pf-c-code-editor__code--PaddingBottom) var(--pf-c-code-editor__code--PaddingLeft);\n}\n.pf-c-code-editor__code .pf-c-code-editor__code-pre {\n  font-family: var(--pf-c-code-editor__code-pre--FontFamily);\n  font-size: var(--pf-c-code-editor__code-pre--FontSize);\n  white-space: pre-wrap;\n}\n\n.pf-c-code-editor__tab {\n  position: relative;\n  display: flex;\n  align-items: center;\n  padding: var(--pf-c-code-editor__tab--PaddingTop) var(--pf-c-code-editor__tab--PaddingRight) var(--pf-c-code-editor__tab--PaddingBottom) var(--pf-c-code-editor__tab--PaddingLeft);\n  margin-left: auto;\n  color: var(--pf-c-code-editor__tab--Color);\n  background-color: var(--pf-c-code-editor__tab--BackgroundColor);\n  border-color: var(--pf-c-code-editor__tab--BorderColor);\n  border-style: solid;\n  border-width: var(--pf-c-code-editor__tab--BorderTopWidth) var(--pf-c-code-editor__tab--BorderRightWidth) var(--pf-c-code-editor__tab--BorderBottomWidth) var(--pf-c-code-editor__tab--BorderLeftWidth);\n}\n\n.pf-c-code-editor__tab-icon + .pf-c-code-editor__tab-text {\n  margin-left: var(--pf-c-code-editor__tab-icon--text--MarginLeft);\n}\n\n:where(.pf-theme-dark) .pf-c-code-editor__controls > * + * {\n  border-left: 1px solid var(--pf-global--palette--black-700);\n}");