// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.keycloak__client-scopes__searchtype button {\n  width: 200px;\n}\n\n.keycloak__client-scopes-add__add-dropdown {\n  margin-right: var(--pf-global--spacer--md);\n}\n\n.kc-protocolType-select {\n  max-width: 25%;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}