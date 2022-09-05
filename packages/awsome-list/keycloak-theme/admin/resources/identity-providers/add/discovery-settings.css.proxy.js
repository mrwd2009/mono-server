// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak__discovery-settings__metadata .pf-c-expandable-section__toggle {\n  margin-left: var(--pf-c-form--m-horizontal__group-label--md--GridColumnWidth);\n}\n\ninput#kc-role {\n  width: 300px;\n  margin-right: 24px;\n}\n\nh1.kc-add-mapper-title {\n  margin-left: calc(-1 * var(--pf-global--spacer--md));\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}