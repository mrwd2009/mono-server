// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak__authentication__title {\n  width: fit-content;\n  width: -moz-fit-content;\n}\n\n.keycloak__authentication__title .pf-c-card__body {\n  padding-bottom: var(--pf-global--spacer--sm);\n  padding-top: var(--pf-global--spacer--sm);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}