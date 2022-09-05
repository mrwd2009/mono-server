// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak-admin--groups__member-count {\n  display: flex;\n  align-items: center;\n}\n\n.keycloak-admin--groups__member-count svg {\n  color: var(--pf-global--Color--200);\n  font-size: var(--pf-global--FontSize--md);\n  margin-right: var(--pf-global--spacer--sm);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}