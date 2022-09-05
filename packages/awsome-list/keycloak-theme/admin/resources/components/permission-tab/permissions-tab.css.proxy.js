// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.permission-label > .pf-c-form__group-label {\n  width: 120%;\n}\n\n.keycloak__permission__permission-table.pf-c-card {\n  border-top: 0;\n  border-bottom: 0;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}