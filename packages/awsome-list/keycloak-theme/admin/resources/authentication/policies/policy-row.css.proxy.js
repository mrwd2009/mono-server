// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@media (min-width: 768px) {\n  .keycloak__policies_authentication__form .pf-c-form__group {\n    --pf-c-form--m-horizontal__group-label--md--GridColumnWidth: 10rem;\n  }\n}\n.keycloak__policies_authentication__minus-icon svg {\n  color: var(--pf-c-button--m-plain--Color);\n}\n.keycloak__policies_authentication__number-field {\n  --pf-c-number-input--c-form-control--Width: 7ch;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}