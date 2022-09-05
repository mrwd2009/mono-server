/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/components/EmptyState/empty-state.css */
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
__snowpack__injectStyle(".pf-c-empty-state {\n  --pf-c-empty-state--PaddingTop: var(--pf-global--spacer--xl);\n  --pf-c-empty-state--PaddingRight: var(--pf-global--spacer--xl);\n  --pf-c-empty-state--PaddingBottom: var(--pf-global--spacer--xl);\n  --pf-c-empty-state--PaddingLeft: var(--pf-global--spacer--xl);\n  --pf-c-empty-state__content--MaxWidth: none;\n  --pf-c-empty-state__icon--MarginBottom: var(--pf-global--spacer--lg);\n  --pf-c-empty-state__icon--FontSize: var(--pf-global--icon--FontSize--xl);\n  --pf-c-empty-state__icon--Color: var(--pf-global--icon--Color--light);\n  --pf-c-empty-state__content--c-title--m-lg--FontSize: var(--pf-global--FontSize--xl);\n  --pf-c-empty-state__body--MarginTop: var(--pf-global--spacer--md);\n  --pf-c-empty-state__body--Color: var(--pf-global--Color--200);\n  --pf-c-empty-state__primary--MarginTop: var(--pf-global--spacer--xl);\n  --pf-c-empty-state__primary--secondary--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-empty-state__secondary--MarginTop: var(--pf-global--spacer--xl);\n  --pf-c-empty-state__secondary--MarginBottom: calc(var(--pf-global--spacer--xs) * -1);\n  --pf-c-empty-state__secondary--child--MarginRight: calc(var(--pf-global--spacer--xs) / 2);\n  --pf-c-empty-state__secondary--child--MarginBottom: var(--pf-global--spacer--xs);\n  --pf-c-empty-state__secondary--child--MarginLeft: calc(var(--pf-global--spacer--xs) / 2);\n  --pf-c-empty-state--m-xs__content--MaxWidth: 21.875rem;\n  --pf-c-empty-state--m-xs__body--FontSize: var(--pf-global--FontSize--sm);\n  --pf-c-empty-state--m-xs--button--FontSize: var(--pf-global--FontSize--sm);\n  --pf-c-empty-state--m-xs--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-empty-state--m-xs--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-empty-state--m-xs--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-empty-state--m-xs--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-empty-state--m-xs__icon--MarginBottom: var(--pf-global--spacer--md);\n  --pf-c-empty-state--m-xs__body--MarginTop: var(--pf-global--spacer--md);\n  --pf-c-empty-state--m-xs__primary--MarginTop: var(--pf-global--spacer--md);\n  --pf-c-empty-state--m-xs__secondary--MarginTop: var(--pf-global--spacer--md);\n  --pf-c-empty-state--m-sm__content--MaxWidth: 25rem;\n  --pf-c-empty-state--m-lg__content--MaxWidth: 37.5rem;\n  --pf-c-empty-state--m-xl__body--FontSize: var(--pf-global--FontSize--xl);\n  --pf-c-empty-state--m-xl__body--MarginTop: var(--pf-global--spacer--lg);\n  --pf-c-empty-state--m-xl__icon--MarginBottom: var(--pf-global--spacer--xl);\n  --pf-c-empty-state--m-xl__icon--FontSize: 6.25rem;\n  --pf-c-empty-state--m-xl--c-button__secondary--MarginTop: var(--pf-global--spacer--md);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--pf-c-empty-state--PaddingTop) var(--pf-c-empty-state--PaddingRight) var(--pf-c-empty-state--PaddingBottom) var(--pf-c-empty-state--PaddingLeft);\n  text-align: center;\n}\n.pf-c-empty-state.pf-m-xs {\n  --pf-c-empty-state--PaddingTop: var(--pf-c-empty-state--m-xs--PaddingTop);\n  --pf-c-empty-state--PaddingRight: var(--pf-c-empty-state--m-xs--PaddingRight);\n  --pf-c-empty-state--PaddingBottom: var(--pf-c-empty-state--m-xs--PaddingBottom);\n  --pf-c-empty-state--PaddingLeft: var(--pf-c-empty-state--m-xs--PaddingLeft);\n  --pf-c-empty-state__content--MaxWidth: var(--pf-c-empty-state--m-xs__content--MaxWidth);\n  --pf-c-empty-state__icon--MarginBottom: var(--pf-c-empty-state--m-xs__icon--MarginBottom);\n  --pf-c-empty-state__body--MarginTop: var(--pf-c-empty-state--m-xs__body--MarginTop);\n  --pf-c-empty-state__primary--MarginTop: var(--pf-c-empty-state--m-xs__primary--MarginTop);\n  --pf-c-empty-state__secondary--MarginTop: var(--pf-c-empty-state--m-xs__secondary--MarginTop);\n}\n.pf-c-empty-state.pf-m-xs .pf-c-empty-state__body {\n  font-size: var(--pf-c-empty-state--m-xs__body--FontSize);\n}\n.pf-c-empty-state.pf-m-xs .pf-c-button {\n  --pf-c-button--FontSize: var(--pf-c-empty-state--m-xs--button--FontSize);\n}\n.pf-c-empty-state.pf-m-sm {\n  --pf-c-empty-state__content--MaxWidth: var(--pf-c-empty-state--m-sm__content--MaxWidth);\n}\n.pf-c-empty-state.pf-m-lg {\n  --pf-c-empty-state__content--MaxWidth: var(--pf-c-empty-state--m-lg__content--MaxWidth);\n}\n.pf-c-empty-state.pf-m-xl {\n  --pf-c-empty-state__body--MarginTop: var(--pf-c-empty-state--m-xl__body--MarginTop);\n  --pf-c-empty-state__icon--MarginBottom: var(--pf-c-empty-state--m-xl__icon--MarginBottom);\n  --pf-c-empty-state__icon--FontSize: var(--pf-c-empty-state--m-xl__icon--FontSize);\n  --pf-c-empty-state--c-button__secondary--MarginTop: var(--pf-c-empty-state--m-xl--c-button__secondary--MarginTop);\n}\n.pf-c-empty-state.pf-m-xl .pf-c-empty-state__body {\n  font-size: var(--pf-c-empty-state--m-xl__body--FontSize);\n}\n.pf-c-empty-state.pf-m-full-height {\n  height: 100%;\n}\n\n.pf-c-empty-state__content {\n  max-width: var(--pf-c-empty-state__content--MaxWidth);\n}\n.pf-c-empty-state__content > .pf-c-title.pf-m-lg {\n  font-size: var(--pf-c-empty-state__content--c-title--m-lg--FontSize);\n}\n\n.pf-c-empty-state__icon {\n  margin-bottom: var(--pf-c-empty-state__icon--MarginBottom);\n  font-size: var(--pf-c-empty-state__icon--FontSize);\n  color: var(--pf-c-empty-state__icon--Color);\n}\n\n.pf-c-empty-state__body {\n  margin-top: var(--pf-c-empty-state__body--MarginTop);\n  color: var(--pf-c-empty-state__body--Color);\n}\n\n.pf-c-empty-state__content > .pf-c-button.pf-m-primary,\n.pf-c-empty-state__primary {\n  margin-top: var(--pf-c-empty-state__primary--MarginTop);\n}\n.pf-c-empty-state__content > .pf-c-button.pf-m-primary + .pf-c-empty-state__secondary,\n.pf-c-empty-state__primary + .pf-c-empty-state__secondary {\n  margin-top: var(--pf-c-empty-state__primary--secondary--MarginTop);\n}\n\n.pf-c-empty-state__secondary {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-top: var(--pf-c-empty-state__secondary--MarginTop);\n  margin-bottom: var(--pf-c-empty-state__secondary--MarginBottom);\n}\n.pf-c-empty-state__secondary > * {\n  margin-right: var(--pf-c-empty-state__secondary--child--MarginRight);\n  margin-bottom: var(--pf-c-empty-state__secondary--child--MarginBottom);\n  margin-left: var(--pf-c-empty-state__secondary--child--MarginLeft);\n}\n\n.pf-m-overpass-font .pf-c-empty-state .pf-c-empty-state__content > .pf-c-title.pf-m-lg {\n  font-size: var(--pf-global--FontSize--lg);\n}");
