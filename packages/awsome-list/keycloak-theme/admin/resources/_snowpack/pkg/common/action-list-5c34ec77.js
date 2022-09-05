/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/components/ActionList/action-list.css */
function __snowpack__injectStyle(css) {
  const headEl = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = css;
  } else {
    styleEl.appendChild(document.createTextNode(css));
  }
  headEl.appendChild(styleEl);
}
__snowpack__injectStyle(".pf-c-action-list {\n  --pf-c-action-list--m-icon--spacer: 0;\n  --pf-c-action-list--child--spacer-base: var(--pf-global--spacer--md);\n  --pf-c-action-list--group--spacer-base: var(--pf-global--spacer--2xl);\n}\n\n.pf-c-action-list,\n.pf-c-action-list__group {\n  --pf-c-action-list--child--spacer: var(--pf-c-action-list--child--spacer-base);\n  --pf-c-action-list--group--spacer: var(--pf-c-action-list--group--spacer-base);\n  display: flex;\n  align-items: center;\n}\n.pf-c-action-list > * + *,\n.pf-c-action-list__group > * + * {\n  margin-left: var(--pf-c-action-list--child--spacer);\n}\n.pf-c-action-list > * + .pf-c-action-list__group,\n.pf-c-action-list .pf-c-action-list__group + *,\n.pf-c-action-list__group > * + .pf-c-action-list__group,\n.pf-c-action-list__group .pf-c-action-list__group + * {\n  margin-left: var(--pf-c-action-list--group--spacer);\n}\n.pf-c-action-list.pf-m-icons,\n.pf-c-action-list__group.pf-m-icons {\n  --pf-c-action-list--child--spacer: var(--pf-c-action-list--m-icon--spacer);\n}");
