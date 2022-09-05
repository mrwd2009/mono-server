// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.keycloak__realm-settings__partial-import_form {\n  padding: var(--pf-global--spacer--lg) 0 var(--pf-global--spacer--lg) 0;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}