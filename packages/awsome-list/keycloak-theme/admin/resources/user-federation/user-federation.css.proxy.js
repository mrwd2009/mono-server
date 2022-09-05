// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak__user-federation__dropdown {\n  margin-top: var(--pf-global--spacer--lg);\n}\n\n.keycloak-admin--user-federation__gallery-item {\n  display: contents;\n}\n\n.keycloak__user-federation__assign-role {\n  display: flex;\n  flex-direction: row;\n  align-items: right;\n}\n\n.keycloak__user-federation__assign-role-btn {\n  margin-left: 10px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}