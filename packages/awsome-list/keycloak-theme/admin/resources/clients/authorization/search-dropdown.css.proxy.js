// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak__client_authentication__searchdropdown {\n  --pf-c-dropdown__toggle--MinWidth: 21rem;\n}\n\n.keycloak__client_authentication__searchdropdown_form {\n  --pf-c-form--m-horizontal__group-label--md--GridColumnWidth: 5rem;\n  --pf-c-form--m-horizontal__group-control--md--GridColumnWidth: 24rem;\n  margin: 0 var(--pf-global--spacer--lg) var(--pf-global--spacer--lg) var(--pf-global--spacer--lg);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}