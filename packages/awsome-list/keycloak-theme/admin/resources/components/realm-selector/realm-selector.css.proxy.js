// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak__realm_selector_dropdown__toggle {\n  --pf-c-dropdown__toggle--Color: var(--pf-c-nav__link--m-current--Color);\n  --pf-c-dropdown__toggle--BackgroundColor: var(\n    --pf-global--BackgroundColor--dark-100\n  );\n  --pf-c-dropdown__toggle--before--BorderTopColor: var(\n    --pf-global--BorderColor--200\n  );\n  --pf-c-dropdown__toggle--before--BorderRightColor: var(\n    --pf-global--BorderColor--200\n  );\n  --pf-c-dropdown__toggle--before--BorderBottomColor: var(\n    --pf-global--BorderColor--100\n  );\n  --pf-c-dropdown__toggle--before--BorderLeftColor: var(\n    --pf-global--BorderColor--200\n  );\n  width: 100%;\n}\n\n.pf-c-context-selector.keycloak__realm_selector__context_selector {\n  --pf-c-context-selector__toggle--Color: var(--pf-c-nav__link--m-current--Color);\n}\n\n.keycloak__realm_selector__dropdown {\n  width: 100%;\n}\n\n.keycloak__realm_selector__list-item-split {\n  width: 100%;\n  text-align: left;\n}\n\n.pf-c-nav__item.keycloak__page_nav__nav_item__realm-selector {\n  margin-top: var(--pf-c-nav__link--PaddingTop);\n  padding-right: var(--pf-c-nav__link--PaddingRight);\n  margin-bottom: var(--pf-c-nav__link--PaddingBottom);\n  padding-left: var(--pf-c-nav__link--PaddingLeft);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}