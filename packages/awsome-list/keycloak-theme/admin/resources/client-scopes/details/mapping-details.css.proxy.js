// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@media (min-width: 768px) {\n  .keycloak__client-scope-mapping-details__form .pf-c-form__group {\n    --pf-c-form--m-horizontal__group-label--md--GridColumnWidth: 10rem;\n  }\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}