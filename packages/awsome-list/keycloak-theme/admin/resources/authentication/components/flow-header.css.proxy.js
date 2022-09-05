// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak__authentication__header-drag-button svg {\n  fill: var(--pf-global--BackgroundColor--100);\n}\n\n.keycloak__authentication__header .pf-c-data-list__cell {\n  font-weight: 700;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}