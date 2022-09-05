// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak__empty-execution-state__block {\n  padding-top: var(--pf-global--spacer--sm);\n}\n.keycloak__empty-execution-state__help {\n  max-width: 36rem;\n  margin: 0 auto var(--pf-global--spacer--2xl);\n}\n.keycloak__empty-execution-state__help p {\n  color: var(--pf-global--Color--200);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}