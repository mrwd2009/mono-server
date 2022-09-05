// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak__scopes_evaluate__clipboard-copy input {\n  display: none;\n}\n\n.keycloak__scopes_evaluate__tabs {\n  padding-top: var(--pf-global--spacer--2xl);\n}\n\n#tabs .pf-c-tabs__list {\n  max-width: 300px;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}