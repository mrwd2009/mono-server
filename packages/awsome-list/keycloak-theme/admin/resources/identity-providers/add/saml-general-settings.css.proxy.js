// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak__identity-providers__saml_link > .pf-c-form__group-control {\n  padding-top: var(--pf-c-form--m-horizontal__group-label--md--PaddingTop);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}