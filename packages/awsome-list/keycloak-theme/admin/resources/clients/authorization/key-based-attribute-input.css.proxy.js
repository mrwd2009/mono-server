// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".kc-attributes__table {\n  /* even though the table is borderless, make the border under the th transparent */\n  --pf-c-table--border-width--base: 0;\n  --pf-c-table--m-compact--cell--first-last-child--PaddingLeft: 0;\n}\n\n.kc-attributes__plus-icon {\n  /* shift the button left to adjust for table cell padding */\n  margin-left: calc(var(--pf-global--spacer--md) * -1);\n}\n\n.pf-c-button.kc-attributes__minus-icon {\n  /* shift the button left to adjust for table cell padding */\n  margin-left: calc(var(--pf-global--spacer--md) * -1);\n  color: var(--pf-c-button--m-plain--Color);\n}\n\n.kc-attributes__action-group {\n  /* subtract the padding at the bottom of the table from the action group margin */\n  --pf-c-form__group--m-action--MarginTop: calc(\n    var(--pf-global--spacer--2xl) - var(--pf-global--spacer--sm)\n  );\n}\n\n.pf-c-select.kc-attribute-key-selectable {\n  width: 400px;\n}\n\n.pf-c-select.kc-attribute-value-selectable {\n  width: 400px;\n}\n\n.pf-c-form-control.value-input {\n  width: 400px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}