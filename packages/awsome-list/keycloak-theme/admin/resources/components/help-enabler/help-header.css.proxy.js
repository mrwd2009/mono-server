// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n\ndiv.keycloak_help-header-description {\n  padding-top: var(--pf-global--spacer--lg);\n  overflow-wrap: break-word;\n  white-space: normal;\n  color: var(--pf-c-dropdown__menu-item--Color);\n}\n\n.keycloak_help-header-switch {\n  margin-left: var(--pf-global--spacer--xl);\n}\n\n.keycloak_help-header-switch .pf-c-switch__toggle::before {\n  background-color: var(--pf-c-switch__toggle-icon--Color);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}