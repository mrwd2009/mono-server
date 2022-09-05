// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak_eventsection_details {\n  --pf-c-description-list--m-horizontal__term--width: 15ch;\n}\n\n.keycloak__events_search_selector_dropdown__toggle {\n  --pf-c-dropdown__toggle--MinWidth: 21rem;\n  position: relative;\n  z-index: 1;\n}\n\n.keycloak__events_search__form {\n  --pf-c-form--m-horizontal__group-control--md--GridColumnWidth: 24rem;\n  margin: 0 var(--pf-global--spacer--lg) var(--pf-global--spacer--lg) var(--pf-global--spacer--lg);\n  --pf-c-form__group--m-action--MarginTop: 0rem;\n  --pf-c-form--m-horizontal__group-label--md--GridColumnWidth: 5rem;\n}\n\n.keycloak__events_search__form_label {\n  --pf-c-form--m-horizontal__group-label--md--GridColumnWidth: 5rem;\n  line-height: 0px;\n}\n\n.keycloak__events_search__type_select .pf-c-select__menu {\n  max-height: 200px;\n  overflow: auto;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}