// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".kc-form-panel__panel {\n  margin-top: var(--pf-global--spacer--lg);\n}\n\n.kc-form-panel__title {\n  margin-bottom: var(--pf-global--spacer--lg);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}