// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "td#permit {\n  color: var(--pf-global--success-color--100);\n  font-weight: bold;;\n}\n\ntd#deny {\n  color: var(--pf-global--danger-color--100);\n  font-weight: bold;\n}\n\n.kc-evaluated-options {\n    padding-top: 300px\n}\n\nbutton#back-btn {\n  margin-right: var(--pf-global--spacer--md);\n}\n\nbutton#reevaluate-btn {\n  margin-right: var(--pf-global--spacer--md);\n}\n\n.kc-identity-information, .kc-permissions {\n  border: none !important;\n}\n\n.kc-identity-information > div.pf-c-card__header.kc-form-panel__header {\n  padding-top: 0;\n}\n\n#resourcesAndAuthScopes > .pf-c-form__group-control > .kc-attributes__table > thead #key, \n#resourcesAndAuthScopes > .pf-c-form__group-control > .kc-attributes__table > thead #value {\n  display:none\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}