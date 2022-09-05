// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak_authentication-section__usedby {\n  color: var(--pf-global--success-color--100);\n}\n\n.keycloak_authentication-section__usedby_label .pf-c-label__icon {\n  color: var(--pf-global--success-color--100);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}