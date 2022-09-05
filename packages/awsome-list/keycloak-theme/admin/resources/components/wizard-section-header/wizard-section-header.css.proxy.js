// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".kc-wizard-section-header__title {\n  margin-bottom: var(--pf-global--spacer--lg);\n}\n.kc-wizard-section-header__title--has-description {\n  margin-bottom: var(--pf-global--spacer--sm);\n}\n.kc-wizard-section-header__description {\n  margin-bottom: var(--pf-global--spacer--lg);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}