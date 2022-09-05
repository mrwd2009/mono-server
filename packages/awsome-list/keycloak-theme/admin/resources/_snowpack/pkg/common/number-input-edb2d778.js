/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/components/NumberInput/number-input.css */
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
__snowpack__injectStyle(".pf-c-number-input .pf-c-form-control {\n  appearance: textfield;\n}\n.pf-c-number-input .pf-c-form-control::-webkit-inner-spin-button, .pf-c-number-input .pf-c-form-control::-webkit-outer-spin-button {\n  appearance: none;\n  margin: 0;\n}\n\n.pf-c-number-input {\n  --pf-c-number-input__unit--c-input-group--MarginLeft: var(--pf-global--spacer--sm);\n  --pf-c-number-input__icon--FontSize: var(--pf-global--FontSize--xs);\n  --pf-c-number-input--c-form-control--width-base: calc(var(--pf-global--spacer--sm) * 2 + var(--pf-global--BorderWidth--sm) * 2);\n  --pf-c-number-input--c-form-control--width-chars: 4;\n  --pf-c-number-input--c-form-control--Width: calc(var(--pf-c-number-input--c-form-control--width-base) + var(--pf-c-number-input--c-form-control--width-chars) * 1ch);\n  display: inline-flex;\n  align-items: center;\n}\n.pf-c-number-input .pf-c-form-control {\n  display: inline-flex;\n  width: var(--pf-c-number-input--c-form-control--Width);\n  text-align: right;\n}\n\n.pf-c-input-group + .pf-c-number-input__unit,\n.pf-c-number-input__unit + .pf-c-input-group {\n  margin-left: var(--pf-c-number-input__unit--c-input-group--MarginLeft);\n}\n\n.pf-c-number-input__icon {\n  display: flex;\n  font-size: var(--pf-c-number-input__icon--FontSize);\n}");
