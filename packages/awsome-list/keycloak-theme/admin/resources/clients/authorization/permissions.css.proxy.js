// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".pf-c-button.keycloak__permissions__empty_state {\n  color: var(--pf-c-button--disabled--Color);\n  background-color: var(--pf-c-button--disabled--BackgroundColor);\n  --pf-c-button--after--BorderWidth: 0;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}