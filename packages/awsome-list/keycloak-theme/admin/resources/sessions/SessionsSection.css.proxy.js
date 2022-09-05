// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".kc-filter-session-type-select {\n  margin-right: 10px;\n  width: 300px;\n}\n\n.pf-c-form__group.kc-revocation-modal-form-group {\n  display: inline-block !important;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}