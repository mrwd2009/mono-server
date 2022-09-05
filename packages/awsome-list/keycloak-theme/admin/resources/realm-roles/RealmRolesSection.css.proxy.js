// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".kc-who-will-appear-button {\n  padding-left: 0px;\n}\n\n.pf-c-button.pf-m-link.kc-groups-link {\n  font-size: var(--pf-global--FontSize--sm);\n  padding-left: 0px;\n  padding-right: var(--pf-global--spacer--xs);\n  padding-top: 0px;\n}\n\n.pf-c-button.pf-m-link.kc-users-link {\n  font-size: var(--pf-global--FontSize--sm);\n  padding-left: var(--pf-global--spacer--xs);\n  padding-right: var(--pf-global--spacer--xs);\n  padding-top: 0px;\n}\n\n.pf-c-button.pf-m-link.kc-groups-link-empty-state {\n  padding-left: var(--pf-global--spacer--xs);\n  padding-right: var(--pf-global--spacer--xs);\n}\n\n.pf-c-button.pf-m-link.kc-users-link-empty-state {\n  padding-left: var(--pf-global--spacer--xs);\n  padding-right: var(--pf-global--spacer--xs);\n}\n\n.pf-c-chip-group.kc-filter-chip-group__table {\n  margin-left: var(--pf-global--spacer--md);\n  margin-bottom: var(--pf-global--spacer--md);\n}\n\nbutton#default-role-help-icon.pf-c-form__group-label-help {\n  margin-left: var(--pf-global--spacer--xs);\n  vertical-align: middle;\n}\n\n.pf-c-tab-content.kc-attributes-tab {\n  padding-left: var(--pf-global--spacer--xl);\n  padding-top: var(--pf-global--spacer--lg);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}