/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/components/Dropdown/dropdown.css */
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
__snowpack__injectStyle(".pf-c-dropdown {\n  --pf-c-dropdown__toggle--PaddingTop: var(--pf-global--spacer--form-element);\n  --pf-c-dropdown__toggle--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle--PaddingBottom: var(--pf-global--spacer--form-element);\n  --pf-c-dropdown__toggle--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle--MinWidth: 0;\n  --pf-c-dropdown__toggle--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-dropdown__toggle--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-dropdown__toggle--Color: var(--pf-global--Color--100);\n  --pf-c-dropdown__toggle--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-dropdown__toggle--BackgroundColor: transparent;\n  --pf-c-dropdown__toggle--before--BorderWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-dropdown__toggle--before--BorderTopColor: var(--pf-global--BorderColor--300);\n  --pf-c-dropdown__toggle--before--BorderRightColor: var(--pf-global--BorderColor--300);\n  --pf-c-dropdown__toggle--before--BorderBottomColor: var(--pf-global--BorderColor--200);\n  --pf-c-dropdown__toggle--before--BorderLeftColor: var(--pf-global--BorderColor--300);\n  --pf-c-dropdown__toggle--hover--before--BorderBottomColor: var(--pf-global--active-color--100);\n  --pf-c-dropdown__toggle--focus--before--BorderBottomWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--focus--before--BorderBottomColor: var(--pf-global--active-color--100);\n  --pf-c-dropdown__toggle--active--before--BorderBottomWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--active--before--BorderBottomColor: var(--pf-global--active-color--100);\n  --pf-c-dropdown--m-expanded__toggle--before--BorderBottomWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown--m-expanded__toggle--before--BorderBottomColor: var(--pf-global--active-color--100);\n  --pf-c-dropdown__toggle--disabled--BackgroundColor: var(--pf-global--disabled-color--300);\n  --pf-c-dropdown__toggle--m-plain--Color: var(--pf-global--Color--200);\n  --pf-c-dropdown__toggle--m-plain--hover--Color: var(--pf-global--Color--100);\n  --pf-c-dropdown__toggle--m-plain--disabled--Color: var(--pf-global--disabled-color--200);\n  --pf-c-dropdown__toggle--m-plain--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-dropdown__toggle--m-plain--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-dropdown__toggle--m-plain--child--LineHeight: normal;\n  --pf-c-dropdown__toggle--m-primary--Color: var(--pf-global--Color--light-100);\n  --pf-c-dropdown__toggle--m-primary--BorderRadius: var(--pf-global--BorderRadius--sm);\n  --pf-c-dropdown__toggle--m-primary--BackgroundColor: var(--pf-global--primary-color--100);\n  --pf-c-dropdown__toggle--m-primary--hover--BackgroundColor: var(--pf-global--primary-color--200);\n  --pf-c-dropdown__toggle--m-primary--focus--BackgroundColor: var(--pf-global--primary-color--200);\n  --pf-c-dropdown__toggle--m-primary--active--BackgroundColor: var(--pf-global--primary-color--200);\n  --pf-c-dropdown--m-expanded__toggle--m-primary--BackgroundColor: var(--pf-global--primary-color--200);\n  --pf-c-dropdown__toggle--m-primary--disabled--Color: var(--pf-global--Color--100);\n  --pf-c-dropdown__toggle--m-secondary--Color: var(--pf-global--primary-color--100);\n  --pf-c-dropdown__toggle--m-secondary--BorderRadius: var(--pf-global--BorderRadius--sm);\n  --pf-c-dropdown__toggle--m-secondary--BackgroundColor: transparent;\n  --pf-c-dropdown__toggle--m-secondary--before--BorderWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-dropdown__toggle--m-secondary--hover--before--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--m-secondary--focus--before--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--m-secondary--active--before--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--m-secondary--before--BorderColor: var(--pf-global--primary-color--100);\n  --pf-c-dropdown__toggle--m-secondary--hover--before--BorderColor: var(--pf-global--primary-color--100);\n  --pf-c-dropdown__toggle--m-secondary--focus--before--BorderColor: var(--pf-global--primary-color--100);\n  --pf-c-dropdown__toggle--m-secondary--active--before--BorderColor: var(--pf-global--primary-color--100);\n  --pf-c-dropdown--m-expanded__toggle--m-secondary--before--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown--m-expanded__toggle--m-secondary--before--BorderColor: var(--pf-global--primary-color--100);\n  --pf-c-dropdown__toggle-button--Color: var(--pf-global--Color--100);\n  --pf-c-dropdown__toggle--m-split-button--child--PaddingTop: var(--pf-global--spacer--form-element);\n  --pf-c-dropdown__toggle--m-split-button--child--PaddingRight: var(--pf-global--spacer--xs);\n  --pf-c-dropdown__toggle--m-split-button--child--PaddingBottom: var(--pf-global--spacer--form-element);\n  --pf-c-dropdown__toggle--m-split-button--child--PaddingLeft: var(--pf-global--spacer--xs);\n  --pf-c-dropdown__toggle--m-split-button--child--BackgroundColor: transparent;\n  --pf-c-dropdown__toggle--m-split-button--first-child--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle--m-split-button--last-child--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle--m-split-button--m-action--child--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle--m-split-button--m-action--child--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle--m-split-button--m-action__toggle-button--MarginRight: calc(-1 * var(--pf-global--BorderWidth--sm));\n  --pf-c-dropdown__toggle--m-split-button__toggle-check__input--TranslateY: -0.0625rem;\n  --pf-c-dropdown__toggle--m-split-button__toggle-text--MarginLeft: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle--m-split-button--child--BorderRadius: var(--pf-global--BorderRadius--sm);\n  --pf-c-dropdown__toggle--m-split-button--m-primary--child--BorderRadius: var(--pf-c-dropdown__toggle--m-split-button--child--BorderRadius);\n  --pf-c-dropdown__toggle--m-split-button--m-primary--child--BackgroundColor: var(--pf-global--primary-color--100);\n  --pf-c-dropdown__toggle--m-split-button--m-primary--child--hover--BackgroundColor: var(--pf-global--primary-color--200);\n  --pf-c-dropdown__toggle--m-split-button--m-primary--child--focus--BackgroundColor: var(--pf-global--primary-color--200);\n  --pf-c-dropdown__toggle--m-split-button--m-primary--child--active--BackgroundColor: var(--pf-global--primary-color--200);\n  --pf-c-dropdown__toggle--m-split-button--m-primary--child--m-expanded--BackgroundColor: var(--pf-global--primary-color--200);\n  --pf-c-dropdown__toggle--m-split-button--m-primary--m-action--child--BorderLeftColor: var(--pf-global--primary-color--200);\n  --pf-c-dropdown__toggle--m-split-button--m-primary--m-action--child--BorderLeftWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-dropdown--m-expanded__toggle--m-secondary--m-split-button--child--before--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--Color: var(--pf-global--primary-color--100);\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--hover--before--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--focus--before--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--active--before--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderWidth--base: var(--pf-global--BorderWidth--sm);\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderColor--base: var(--pf-global--primary-color--100);\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderColor: var(--pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderColor--base);\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderWidth: var(--pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderWidth--base);\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--hover--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--focus--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--active--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle-icon--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-dropdown__toggle-icon--MarginRight: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle-icon--MarginLeft: var(--pf-global--spacer--md);\n  --pf-c-dropdown--m-top--m-expanded__toggle-icon--Rotate: 180deg;\n  --pf-c-dropdown--m-plain__toggle-icon--Color: var(--pf-global--Color--200);\n  --pf-c-dropdown--m-plain--hover__toggle-icon--Color: var(--pf-global--Color--100);\n  --pf-c-dropdown__menu--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-dropdown__menu--BoxShadow: var(--pf-global--BoxShadow--md);\n  --pf-c-dropdown__menu--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__menu--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__menu--Top: calc(100% + var(--pf-global--spacer--xs));\n  --pf-c-dropdown__menu--ZIndex: var(--pf-global--ZIndex--sm);\n  --pf-c-dropdown--m-top__menu--Top: 0;\n  --pf-c-dropdown--m-top__menu--TranslateY: calc(-100% - var(--pf-global--spacer--xs));\n  --pf-c-dropdown__menu-item--BackgroundColor: transparent;\n  --pf-c-dropdown__menu-item--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__menu-item--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-dropdown__menu-item--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__menu-item--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-dropdown__menu-item--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-dropdown__menu-item--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-dropdown__menu-item--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-dropdown__menu-item--Color: var(--pf-global--Color--dark-100);\n  --pf-c-dropdown__menu-item--hover--Color: var(--pf-global--Color--dark-100);\n  --pf-c-dropdown__menu-item--disabled--Color: var(--pf-global--Color--dark-200);\n  --pf-c-dropdown__menu-item--hover--BackgroundColor: var(--pf-global--BackgroundColor--light-300);\n  --pf-c-dropdown__menu-item--disabled--BackgroundColor: transparent;\n  --pf-c-dropdown__menu-item--m-text--Color: var(--pf-global--Color--dark-200);\n  --pf-c-dropdown__menu-item-icon--MarginRight: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__menu-item-icon--Width: var(--pf-global--icon--FontSize--lg);\n  --pf-c-dropdown__menu-item-icon--Height: var(--pf-global--icon--FontSize--lg);\n  --pf-c-dropdown__menu-item-description--FontSize: var(--pf-global--FontSize--xs);\n  --pf-c-dropdown__menu-item-description--Color: var(--pf-global--Color--dark-200);\n  --pf-c-dropdown__group--group--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__group-title--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__group-title--PaddingRight: var(--pf-c-dropdown__menu-item--PaddingRight);\n  --pf-c-dropdown__group-title--PaddingBottom: var(--pf-c-dropdown__menu-item--PaddingBottom);\n  --pf-c-dropdown__group-title--PaddingLeft: var(--pf-c-dropdown__menu-item--PaddingLeft);\n  --pf-c-dropdown__group-title--FontSize: var(--pf-global--FontSize--sm);\n  --pf-c-dropdown__group-title--FontWeight: var(--pf-global--FontWeight--semi-bold);\n  --pf-c-dropdown__group-title--Color: var(--pf-global--Color--dark-200);\n  --pf-c-dropdown__toggle-image--MarginTop: 0;\n  --pf-c-dropdown__toggle-image--MarginBottom: 0;\n  --pf-c-dropdown__toggle-image--MarginRight: var(--pf-global--spacer--sm);\n  --pf-c-dropdown--c-divider--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-dropdown--c-divider--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle--c-badge__toggle-icon--MarginLeft: var(--pf-global--spacer--xs);\n  --pf-c-dropdown__toggle--c-badge__toggle-icon--MarginRight: 0;\n  --pf-c-dropdown--c-menu--Top: calc(100% + var(--pf-global--spacer--xs));\n  --pf-c-dropdown--c-menu--ZIndex: var(--pf-global--ZIndex--sm);\n  --pf-c-dropdown--m-top--c-menu--Top: 0;\n  --pf-c-dropdown--m-top--c-menu--TranslateY: calc(-100% - var(--pf-global--spacer--xs));\n  --pf-c-dropdown--m-full-height__toggle--before--BorderTopWidth: 0;\n  --pf-c-dropdown--m-full-height__toggle--expanded--before--BorderBottomWidth: var(--pf-global--BorderWidth--xl);\n  --pf-c-dropdown--m-full-height__toggle--hover--before--BorderBottomWidth: var(--pf-global--BorderWidth--xl);\n  --pf-c-dropdown--m-full-height__toggle--active--before--BorderBottomWidth: var(--pf-global--BorderWidth--xl);\n  --pf-c-dropdown--m-full-height__toggle--focus--before--BorderBottomWidth: var(--pf-global--BorderWidth--xl);\n  --pf-c-dropdown--m-full-height__toggle--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-dropdown--m-full-height__toggle--PaddingLeft: var(--pf-global--spacer--lg);\n  position: relative;\n  display: inline-block;\n  max-width: 100%;\n}\n.pf-c-dropdown .pf-c-divider {\n  margin-top: var(--pf-c-dropdown--c-divider--MarginTop);\n  margin-bottom: var(--pf-c-dropdown--c-divider--MarginBottom);\n}\n.pf-c-dropdown .pf-c-divider:last-child {\n  --pf-c-dropdown--c-divider--MarginBottom: 0;\n}\n.pf-c-dropdown > .pf-c-menu {\n  position: absolute;\n  top: var(--pf-c-dropdown--c-menu--Top);\n  z-index: var(--pf-c-dropdown--c-menu--ZIndex);\n}\n.pf-c-dropdown.pf-m-full-height {\n  --pf-c-dropdown__toggle--PaddingRight: var(--pf-c-dropdown--m-full-height__toggle--PaddingRight);\n  --pf-c-dropdown__toggle--PaddingLeft: var(--pf-c-dropdown--m-full-height__toggle--PaddingLeft);\n  --pf-c-dropdown__toggle--active--before--BorderBottomWidth: var(--pf-c-dropdown--m-full-height__toggle--active--before--BorderBottomWidth);\n  --pf-c-dropdown__toggle--focus--before--BorderBottomWidth: var(--pf-c-dropdown--m-full-height__toggle--focus--before--BorderBottomWidth);\n  --pf-c-dropdown--m-expanded__toggle--before--BorderBottomWidth: var(--pf-c-dropdown--m-full-height__toggle--expanded--before--BorderBottomWidth);\n  display: inline-flex;\n  align-items: center;\n  height: 100%;\n}\n.pf-c-dropdown.pf-m-full-height .pf-c-dropdown__toggle {\n  align-self: stretch;\n}\n.pf-c-dropdown.pf-m-full-height .pf-c-dropdown__toggle::before {\n  border-top-width: var(--pf-c-dropdown--m-full-height__toggle--before--BorderTopWidth);\n}\n.pf-c-dropdown.pf-m-full-height:hover .pf-c-dropdown__toggle::before {\n  border-bottom-width: var(--pf-c-dropdown--m-full-height__toggle--hover--before--BorderBottomWidth);\n}\n.pf-c-dropdown.pf-m-expanded {\n  --pf-c-dropdown__toggle--m-split-button--m-primary--child--BackgroundColor: var(--pf-c-dropdown__toggle--m-split-button--m-primary--child--m-expanded--BackgroundColor);\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderWidth: var(--pf-c-dropdown--m-expanded__toggle--m-secondary--m-split-button--child--before--BorderWidth);\n}\n\n.pf-c-dropdown__toggle {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  min-width: var(--pf-c-dropdown__toggle--MinWidth);\n  max-width: 100%;\n  padding: var(--pf-c-dropdown__toggle--PaddingTop) var(--pf-c-dropdown__toggle--PaddingRight) var(--pf-c-dropdown__toggle--PaddingBottom) var(--pf-c-dropdown__toggle--PaddingLeft);\n  font-size: var(--pf-c-dropdown__toggle--FontSize);\n  font-weight: var(--pf-c-dropdown__toggle--FontWeight);\n  line-height: var(--pf-c-dropdown__toggle--LineHeight);\n  color: var(--pf-c-dropdown__toggle--Color);\n  background-color: var(--pf-c-dropdown__toggle--BackgroundColor);\n  border: none;\n}\n.pf-c-dropdown__toggle::before, .pf-c-dropdown__toggle.pf-m-action .pf-c-dropdown__toggle-button::before {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  content: \"\";\n  border: var(--pf-c-dropdown__toggle--before--BorderWidth) solid;\n  border-color: var(--pf-c-dropdown__toggle--before--BorderTopColor) var(--pf-c-dropdown__toggle--before--BorderRightColor) var(--pf-c-dropdown__toggle--before--BorderBottomColor) var(--pf-c-dropdown__toggle--before--BorderLeftColor);\n}\n.pf-c-dropdown__toggle.pf-m-disabled, .pf-c-dropdown__toggle:disabled {\n  --pf-c-dropdown__toggle--m-primary--Color: var(--pf-c-dropdown__toggle--m-primary--disabled--Color);\n  --pf-c-dropdown__toggle--before--BorderBottomColor: transparent;\n  pointer-events: none;\n}\n.pf-c-dropdown__toggle.pf-m-disabled:not(.pf-m-plain), .pf-c-dropdown__toggle.pf-m-disabled.pf-m-plain.pf-m-text, .pf-c-dropdown__toggle:disabled:not(.pf-m-plain), .pf-c-dropdown__toggle:disabled.pf-m-plain.pf-m-text {\n  --pf-c-dropdown__toggle--BackgroundColor: var(--pf-c-dropdown__toggle--disabled--BackgroundColor);\n}\n.pf-c-dropdown__toggle.pf-m-disabled:not(.pf-m-plain)::before, .pf-c-dropdown__toggle.pf-m-disabled.pf-m-plain.pf-m-text::before, .pf-c-dropdown__toggle:disabled:not(.pf-m-plain)::before, .pf-c-dropdown__toggle:disabled.pf-m-plain.pf-m-text::before {\n  border: 0;\n}\n.pf-c-dropdown__toggle.pf-m-split-button {\n  padding: 0;\n}\n.pf-c-dropdown__toggle.pf-m-split-button:not(.pf-m-disabled) {\n  background-color: var(--pf-c-dropdown__toggle--m-split-button--child--BackgroundColor);\n}\n.pf-c-dropdown__toggle.pf-m-split-button > * {\n  position: relative;\n  padding-top: var(--pf-c-dropdown__toggle--m-split-button--child--PaddingTop);\n  padding-right: var(--pf-c-dropdown__toggle--m-split-button--child--PaddingRight);\n  padding-bottom: var(--pf-c-dropdown__toggle--m-split-button--child--PaddingBottom);\n  padding-left: var(--pf-c-dropdown__toggle--m-split-button--child--PaddingLeft);\n}\n.pf-c-dropdown__toggle.pf-m-split-button > *:first-child {\n  --pf-c-dropdown__toggle--m-split-button--child--PaddingLeft: var(--pf-c-dropdown__toggle--m-split-button--first-child--PaddingLeft);\n}\n.pf-c-dropdown__toggle.pf-m-split-button > *:last-child {\n  --pf-c-dropdown__toggle--m-split-button--child--PaddingRight: var(--pf-c-dropdown__toggle--m-split-button--last-child--PaddingRight);\n}\n.pf-c-dropdown__toggle.pf-m-split-button.pf-m-action {\n  --pf-c-dropdown__toggle--m-split-button--child--PaddingRight: var(--pf-c-dropdown__toggle--m-split-button--m-action--child--PaddingRight);\n  --pf-c-dropdown__toggle--m-split-button--child--PaddingLeft: var(--pf-c-dropdown__toggle--m-split-button--m-action--child--PaddingLeft);\n}\n.pf-c-dropdown__toggle.pf-m-split-button.pf-m-action .pf-c-dropdown__toggle-button {\n  margin-right: var(--pf-c-dropdown__toggle--m-split-button--m-action__toggle-button--MarginRight);\n}\n.pf-c-dropdown__toggle.pf-m-split-button.pf-m-action .pf-c-dropdown__toggle-button::before {\n  border-left: 0;\n}\n.pf-c-dropdown__toggle.pf-m-split-button.pf-m-action .pf-c-dropdown__toggle-button:last-child {\n  --pf-c-dropdown__toggle--m-split-button--m-action__toggle-button--MarginRight: 0;\n}\n.pf-c-dropdown__toggle.pf-m-split-button.pf-m-action.pf-m-primary > :not(:first-child) {\n  border-left: var(--pf-c-dropdown__toggle--m-split-button--m-primary--m-action--child--BorderLeftWidth) solid var(--pf-c-dropdown__toggle--m-split-button--m-primary--m-action--child--BorderLeftColor);\n}\n.pf-c-dropdown__toggle.pf-m-split-button.pf-m-action.pf-m-primary.pf-m-disabled, .pf-c-dropdown__toggle.pf-m-split-button.pf-m-action.pf-m-primary[disabled] {\n  --pf-c-dropdown__toggle--m-split-button--m-primary--m-action--child--BorderLeftWidth: 0;\n}\n.pf-c-dropdown__toggle.pf-m-split-button .pf-c-dropdown__toggle-check {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n.pf-c-dropdown__toggle.pf-m-split-button .pf-c-dropdown__toggle-check > input,\n.pf-c-dropdown__toggle.pf-m-split-button .pf-c-dropdown__toggle-check .pf-c-check {\n  cursor: pointer;\n  transform: translateY(var(--pf-c-dropdown__toggle--m-split-button__toggle-check__input--TranslateY));\n}\n.pf-c-dropdown__toggle.pf-m-split-button .pf-c-dropdown__toggle-button {\n  color: var(--pf-c-dropdown__toggle-button--Color);\n  border: 0;\n}\n.pf-c-dropdown__toggle.pf-m-split-button .pf-c-dropdown__toggle-text {\n  margin-left: var(--pf-c-dropdown__toggle--m-split-button__toggle-text--MarginLeft);\n}\n.pf-c-dropdown__toggle.pf-m-primary.pf-m-split-button:not(.pf-m-disabled) {\n  --pf-c-dropdown__toggle--before--BorderWidth: 0;\n  --pf-c-dropdown--m-expanded__toggle--before--BorderBottomWidth: 0;\n}\n.pf-c-dropdown__toggle.pf-m-primary.pf-m-split-button:not(.pf-m-disabled) > * {\n  background-color: var(--pf-c-dropdown__toggle--m-split-button--m-primary--child--BackgroundColor);\n  border: 0;\n}\n.pf-c-dropdown__toggle.pf-m-primary.pf-m-split-button:not(.pf-m-disabled) > *:hover {\n  --pf-c-dropdown__toggle--m-split-button--m-primary--child--BackgroundColor: var(--pf-c-dropdown__toggle--m-split-button--m-primary--child--hover--BackgroundColor);\n}\n.pf-c-dropdown__toggle.pf-m-primary.pf-m-split-button:not(.pf-m-disabled) > *:focus {\n  --pf-c-dropdown__toggle--m-split-button--m-primary--child--BackgroundColor: var(--pf-c-dropdown__toggle--m-split-button--m-primary--child--focus--BackgroundColor);\n}\n.pf-c-dropdown__toggle.pf-m-primary.pf-m-split-button:not(.pf-m-disabled) > *:active, .pf-c-dropdown__toggle.pf-m-primary.pf-m-split-button:not(.pf-m-disabled) > *.pf-m-active {\n  --pf-c-dropdown__toggle--m-split-button--m-primary--child--BackgroundColor: var(--pf-c-dropdown__toggle--m-split-button--m-primary--child--focus--BackgroundColor);\n}\n.pf-c-dropdown__toggle.pf-m-primary.pf-m-split-button:not(.pf-m-disabled) > :first-child {\n  border-top-left-radius: var(--pf-c-dropdown__toggle--m-split-button--m-primary--child--BorderRadius);\n  border-bottom-left-radius: var(--pf-c-dropdown__toggle--m-split-button--m-primary--child--BorderRadius);\n}\n.pf-c-dropdown__toggle.pf-m-primary.pf-m-split-button:not(.pf-m-disabled) > :last-child {\n  border-top-right-radius: var(--pf-c-dropdown__toggle--m-split-button--m-primary--child--BorderRadius);\n  border-bottom-right-radius: var(--pf-c-dropdown__toggle--m-split-button--m-primary--child--BorderRadius);\n}\n.pf-c-dropdown__toggle:not(.pf-m-action):not(.pf-m-secondary):hover::before, .pf-c-dropdown__toggle.pf-m-action .pf-c-dropdown__toggle-button:hover::before {\n  --pf-c-dropdown__toggle--before--BorderBottomColor: var(--pf-c-dropdown__toggle--hover--before--BorderBottomColor);\n}\n.pf-c-dropdown__toggle:not(.pf-m-action):not(.pf-m-secondary):focus::before, .pf-c-dropdown__toggle.pf-m-action .pf-c-dropdown__toggle-button:focus::before {\n  --pf-c-dropdown__toggle--before--BorderBottomColor: var(--pf-c-dropdown__toggle--focus--before--BorderBottomColor);\n  border-bottom-width: var(--pf-c-dropdown__toggle--focus--before--BorderBottomWidth);\n}\n.pf-c-dropdown__toggle:not(.pf-m-action):not(.pf-m-secondary):active::before, .pf-c-dropdown__toggle:not(.pf-m-action):not(.pf-m-secondary).pf-m-active::before, .pf-c-dropdown__toggle.pf-m-action .pf-c-dropdown__toggle-button:active::before {\n  --pf-c-dropdown__toggle--before--BorderBottomColor: var(--pf-c-dropdown__toggle--active--before--BorderBottomColor);\n  border-bottom-width: var(--pf-c-dropdown__toggle--active--before--BorderBottomWidth);\n}\n.pf-m-expanded > .pf-c-dropdown__toggle:not(.pf-m-action):not(.pf-m-secondary)::before, .pf-m-expanded > .pf-c-dropdown__toggle.pf-m-action .pf-c-dropdown__toggle-button::before {\n  --pf-c-dropdown__toggle--before--BorderBottomColor: var(--pf-c-dropdown--m-expanded__toggle--before--BorderBottomColor);\n  border-bottom-width: var(--pf-c-dropdown--m-expanded__toggle--before--BorderBottomWidth);\n}\n.pf-c-dropdown__toggle.pf-m-plain {\n  --pf-c-dropdown__toggle-icon--Color: var(--pf-c-dropdown--m-plain__toggle-icon--Color);\n}\n.pf-c-dropdown__toggle.pf-m-plain:not(.pf-m-text) {\n  --pf-c-dropdown__toggle--PaddingRight: var(--pf-c-dropdown__toggle--m-plain--PaddingRight);\n  --pf-c-dropdown__toggle--PaddingLeft: var(--pf-c-dropdown__toggle--m-plain--PaddingLeft);\n  display: inline-block;\n  color: var(--pf-c-dropdown__toggle--m-plain--Color);\n}\n.pf-c-dropdown__toggle.pf-m-plain:not(.pf-m-text) > * {\n  line-height: var(--pf-c-dropdown__toggle--m-plain--child--LineHeight);\n}\n.pf-c-dropdown__toggle.pf-m-plain::before {\n  border: 0;\n}\n.pf-c-dropdown__toggle.pf-m-plain:hover, .pf-c-dropdown__toggle.pf-m-plain:focus, .pf-c-dropdown__toggle.pf-m-plain:active, .pf-c-dropdown__toggle.pf-m-plain.pf-m-active, .pf-m-expanded > .pf-c-dropdown__toggle.pf-m-plain {\n  --pf-c-dropdown__toggle--m-plain--Color: var(--pf-c-dropdown__toggle--m-plain--hover--Color);\n  --pf-c-dropdown--m-plain__toggle-icon--Color: var(--pf-c-dropdown--m-plain--hover__toggle-icon--Color);\n}\n.pf-c-dropdown__toggle.pf-m-plain.pf-m-disabled, .pf-c-dropdown__toggle.pf-m-plain:disabled {\n  --pf-c-dropdown__toggle--m-plain--Color: var(--pf-c-dropdown__toggle--m-plain--disabled--Color);\n}\n.pf-c-dropdown__toggle.pf-m-primary {\n  --pf-c-dropdown__toggle--Color: var(--pf-c-dropdown__toggle--m-primary--Color);\n  --pf-c-dropdown__toggle--BackgroundColor: var(--pf-c-dropdown__toggle--m-primary--BackgroundColor);\n  --pf-c-dropdown__toggle-button--Color: var(--pf-c-dropdown__toggle--m-primary--Color);\n  border-radius: var(--pf-c-dropdown__toggle--m-primary--BorderRadius);\n}\n.pf-c-dropdown__toggle.pf-m-primary::before,\n.pf-c-dropdown__toggle.pf-m-primary .pf-c-dropdown__toggle-button::before {\n  border: 0;\n}\n.pf-c-dropdown__toggle.pf-m-primary:hover {\n  --pf-c-dropdown__toggle--BackgroundColor: var(--pf-c-dropdown__toggle--m-primary--hover--BackgroundColor);\n}\n.pf-c-dropdown__toggle.pf-m-primary:focus {\n  --pf-c-dropdown__toggle--BackgroundColor: var(--pf-c-dropdown__toggle--m-primary--focus--BackgroundColor);\n}\n.pf-c-dropdown__toggle.pf-m-primary:active, .pf-c-dropdown__toggle.pf-m-primary.pf-m-active {\n  --pf-c-dropdown__toggle--BackgroundColor: var(--pf-c-dropdown__toggle--m-primary--active--BackgroundColor);\n}\n.pf-m-expanded > .pf-c-dropdown__toggle.pf-m-primary {\n  --pf-c-dropdown__toggle--BackgroundColor: var(--pf-c-dropdown--m-expanded__toggle--m-primary--BackgroundColor);\n}\n.pf-c-dropdown__toggle.pf-m-secondary {\n  border-radius: var(--pf-c-dropdown__toggle--m-secondary--BorderRadius);\n}\n.pf-c-dropdown__toggle.pf-m-secondary:not(.pf-m-disabled):not([disabled]) {\n  --pf-c-dropdown__toggle--Color: var(--pf-c-dropdown__toggle--m-secondary--Color);\n  --pf-c-dropdown__toggle--BackgroundColor: var(--pf-c-dropdown__toggle--m-secondary--BackgroundColor);\n}\n.pf-c-dropdown__toggle.pf-m-secondary:not(.pf-m-disabled):not([disabled])::before {\n  border: var(--pf-c-dropdown__toggle--m-secondary--before--BorderWidth) solid var(--pf-c-dropdown__toggle--m-secondary--before--BorderColor);\n  border-radius: var(--pf-c-dropdown__toggle--m-secondary--BorderRadius);\n}\n.pf-c-dropdown__toggle.pf-m-secondary:hover {\n  --pf-c-dropdown__toggle--m-secondary--before--BorderWidth: var(--pf-c-dropdown__toggle--m-secondary--hover--before--BorderWidth);\n}\n.pf-c-dropdown__toggle.pf-m-secondary:focus {\n  --pf-c-dropdown__toggle--m-secondary--before--BorderWidth: var(--pf-c-dropdown__toggle--m-secondary--focus--before--BorderWidth);\n}\n.pf-c-dropdown__toggle.pf-m-secondary:active, .pf-c-dropdown__toggle.pf-m-secondary.pf-m-active {\n  --pf-c-dropdown__toggle--m-secondary--before--BorderWidth: var(--pf-c-dropdown__toggle--m-secondary--active--before--BorderWidth);\n}\n.pf-m-expanded > .pf-c-dropdown__toggle.pf-m-secondary {\n  --pf-c-dropdown__toggle--m-secondary--before--BorderWidth: var(--pf-c-dropdown--m-expanded__toggle--m-secondary--before--BorderWidth);\n  --pf-c-dropdown__toggle--m-secondary--before--BorderColor: var(--pf-c-dropdown--m-expanded__toggle--m-secondary--before--BorderColor);\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled) {\n  --pf-c-dropdown__toggle-button--Color: var(--pf-c-dropdown__toggle--m-secondary--m-split-button--Color);\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled):hover {\n  --pf-c-dropdown__toggle--m-secondary--hover--before--BorderWidth: var(--pf-c-dropdown__toggle--m-secondary--m-split-button--hover--before--BorderWidth);\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled):focus {\n  --pf-c-dropdown__toggle--m-secondary--focus--before--BorderWidth: var(--pf-c-dropdown__toggle--m-secondary--m-split-button--focus--before--BorderWidth);\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled):active {\n  --pf-c-dropdown__toggle--m-secondary--active--before--BorderWidth: var(--pf-c-dropdown__toggle--m-secondary--m-split-button--active--before--BorderWidth);\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled) > *::before {\n  border: var(--pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderWidth) solid var(--pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderColor);\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled) > *:hover {\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderWidth: var(--pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--hover--BorderWidth);\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled) > *:focus {\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderWidth: var(--pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--focus--BorderWidth);\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled) > *:active {\n  --pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderWidth: var(--pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--active--BorderWidth);\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled) > *:first-child::before {\n  border-top-left-radius: var(--pf-c-dropdown__toggle--m-split-button--child--BorderRadius);\n  border-bottom-left-radius: var(--pf-c-dropdown__toggle--m-split-button--child--BorderRadius);\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled) > *:last-child::before {\n  border-top-right-radius: var(--pf-c-dropdown__toggle--m-split-button--child--BorderRadius);\n  border-bottom-right-radius: var(--pf-c-dropdown__toggle--m-split-button--child--BorderRadius);\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled) > *:not(:first-child)::before {\n  border-left: var(--pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderWidth--base) solid var(--pf-c-dropdown__toggle--m-secondary--m-split-button--child--before--BorderColor--base);\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled) > *:not(:last-child)::before {\n  border-right: 0;\n}\n.pf-c-dropdown__toggle.pf-m-secondary.pf-m-split-button:not(.pf-m-disabled).pf-m-action::before {\n  border: 0;\n}\n.pf-c-dropdown__toggle > .pf-c-badge {\n  --pf-c-dropdown__toggle-icon--MarginLeft: var(--pf-c-dropdown__toggle--c-badge__toggle-icon--MarginLeft);\n  --pf-c-dropdown__toggle-icon--MarginRight: var(--pf-c-dropdown__toggle--c-badge__toggle-icon--MarginRight);\n}\n.pf-c-dropdown__toggle .pf-c-dropdown__toggle-text {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.pf-c-dropdown__toggle-text {\n  flex: 0 1 auto;\n}\n\n.pf-c-dropdown__toggle-icon {\n  margin-right: var(--pf-c-dropdown__toggle-icon--MarginRight);\n  margin-left: var(--pf-c-dropdown__toggle-icon--MarginLeft);\n  line-height: var(--pf-c-dropdown__toggle-icon--LineHeight);\n  color: var(--pf-c-dropdown__toggle-icon--Color, inherit);\n}\n.pf-c-dropdown.pf-m-top.pf-m-expanded .pf-c-dropdown__toggle-icon {\n  transform: rotate(var(--pf-c-dropdown--m-top--m-expanded__toggle-icon--Rotate));\n}\n\n.pf-c-dropdown__toggle-image {\n  display: inline-flex;\n  flex-shrink: 0;\n  align-self: center;\n  margin-top: var(--pf-c-dropdown__toggle-image--MarginTop);\n  margin-right: var(--pf-c-dropdown__toggle-image--MarginRight);\n  margin-bottom: var(--pf-c-dropdown__toggle-image--MarginBottom);\n  line-height: 1;\n}\n.pf-c-dropdown__toggle-image:last-child {\n  --pf-c-dropdown__toggle-image--MarginRight: 0;\n}\n\n.pf-c-dropdown__menu {\n  position: absolute;\n  top: var(--pf-c-dropdown__menu--Top);\n  z-index: var(--pf-c-dropdown__menu--ZIndex);\n  padding-top: var(--pf-c-dropdown__menu--PaddingTop);\n  padding-bottom: var(--pf-c-dropdown__menu--PaddingBottom);\n  background: var(--pf-c-dropdown__menu--BackgroundColor);\n  background-clip: padding-box;\n  box-shadow: var(--pf-c-dropdown__menu--BoxShadow);\n}\n\n.pf-c-dropdown .pf-c-menu,\n.pf-c-dropdown__menu {\n  min-width: 100%;\n}\n.pf-c-dropdown .pf-c-menu.pf-m-align-right,\n.pf-c-dropdown__menu.pf-m-align-right {\n  right: 0;\n}\n.pf-c-dropdown .pf-c-menu.pf-m-align-left,\n.pf-c-dropdown__menu.pf-m-align-left {\n  right: auto;\n}\n@media (min-width: 576px) {\n  .pf-c-dropdown .pf-c-menu.pf-m-align-right-on-sm,\n.pf-c-dropdown__menu.pf-m-align-right-on-sm {\n    right: 0;\n  }\n  .pf-c-dropdown .pf-c-menu.pf-m-align-left-on-sm,\n.pf-c-dropdown__menu.pf-m-align-left-on-sm {\n    right: auto;\n  }\n}\n@media (min-width: 768px) {\n  .pf-c-dropdown .pf-c-menu.pf-m-align-right-on-md,\n.pf-c-dropdown__menu.pf-m-align-right-on-md {\n    right: 0;\n  }\n  .pf-c-dropdown .pf-c-menu.pf-m-align-left-on-md,\n.pf-c-dropdown__menu.pf-m-align-left-on-md {\n    right: auto;\n  }\n}\n@media (min-width: 992px) {\n  .pf-c-dropdown .pf-c-menu.pf-m-align-right-on-lg,\n.pf-c-dropdown__menu.pf-m-align-right-on-lg {\n    right: 0;\n  }\n  .pf-c-dropdown .pf-c-menu.pf-m-align-left-on-lg,\n.pf-c-dropdown__menu.pf-m-align-left-on-lg {\n    right: auto;\n  }\n}\n@media (min-width: 1200px) {\n  .pf-c-dropdown .pf-c-menu.pf-m-align-right-on-xl,\n.pf-c-dropdown__menu.pf-m-align-right-on-xl {\n    right: 0;\n  }\n  .pf-c-dropdown .pf-c-menu.pf-m-align-left-on-xl,\n.pf-c-dropdown__menu.pf-m-align-left-on-xl {\n    right: auto;\n  }\n}\n@media (min-width: 1450px) {\n  .pf-c-dropdown .pf-c-menu.pf-m-align-right-on-2xl,\n.pf-c-dropdown__menu.pf-m-align-right-on-2xl {\n    right: 0;\n  }\n  .pf-c-dropdown .pf-c-menu.pf-m-align-left-on-2xl,\n.pf-c-dropdown__menu.pf-m-align-left-on-2xl {\n    right: auto;\n  }\n}\n\n.pf-c-dropdown.pf-m-top .pf-c-dropdown__menu {\n  --pf-c-dropdown__menu--Top: var(--pf-c-dropdown--m-top__menu--Top);\n  transform: translateY(var(--pf-c-dropdown--m-top__menu--TranslateY));\n}\n.pf-c-dropdown.pf-m-top > .pf-c-menu {\n  --pf-c-dropdown--c-menu--Top: var(--pf-c-dropdown--m-top--c-menu--Top);\n  transform: translateY(var(--pf-c-dropdown--m-top--c-menu--TranslateY));\n}\n\n.pf-c-dropdown__menu-item {\n  display: block;\n  width: 100%;\n  padding: var(--pf-c-dropdown__menu-item--PaddingTop) var(--pf-c-dropdown__menu-item--PaddingRight) var(--pf-c-dropdown__menu-item--PaddingBottom) var(--pf-c-dropdown__menu-item--PaddingLeft);\n  font-size: var(--pf-c-dropdown__menu-item--FontSize);\n  font-weight: var(--pf-c-dropdown__menu-item--FontWeight);\n  line-height: var(--pf-c-dropdown__menu-item--LineHeight);\n  color: var(--pf-c-dropdown__menu-item--Color);\n  text-align: left;\n  white-space: nowrap;\n  background-color: var(--pf-c-dropdown__menu-item--BackgroundColor);\n  border: none;\n}\n.pf-c-dropdown__menu-item:hover, .pf-c-dropdown__menu-item:focus {\n  --pf-c-dropdown__menu-item--Color: var(--pf-c-dropdown__menu-item--hover--Color);\n  --pf-c-dropdown__menu-item--BackgroundColor: var(--pf-c-dropdown__menu-item--hover--BackgroundColor);\n  text-decoration: none;\n}\n.pf-c-dropdown__menu-item:disabled, .pf-c-dropdown__menu-item.pf-m-disabled, .pf-c-dropdown__menu-item.pf-m-aria-disabled {\n  --pf-c-dropdown__menu-item--Color: var(--pf-c-dropdown__menu-item--disabled--Color);\n  --pf-c-dropdown__menu-item--BackgroundColor: var(--pf-c-dropdown__menu-item--disabled--BackgroundColor);\n}\n.pf-c-dropdown__menu-item:disabled, .pf-c-dropdown__menu-item.pf-m-disabled {\n  pointer-events: none;\n}\n.pf-c-dropdown__menu-item.pf-m-aria-disabled {\n  cursor: default;\n}\n.pf-c-dropdown__menu-item.pf-m-icon {\n  display: flex;\n  align-items: center;\n}\n.pf-c-dropdown__menu-item.pf-m-icon.pf-m-description {\n  flex-direction: column;\n  align-items: start;\n}\n.pf-c-dropdown__menu-item.pf-m-icon .pf-c-dropdown__menu-item-main {\n  display: flex;\n  align-items: center;\n}\n.pf-c-dropdown__menu-item.pf-m-text {\n  --pf-c-dropdown__menu-item--Color: var(--pf-c-dropdown__menu-item--m-text--Color);\n}\n.pf-c-dropdown__menu-item.pf-m-text:hover, .pf-c-dropdown__menu-item.pf-m-text:focus {\n  --pf-c-dropdown__menu-item--BackgroundColor: transparent;\n}\n\n.pf-c-dropdown__menu-item-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: var(--pf-c-dropdown__menu-item-icon--Width);\n  height: var(--pf-c-dropdown__menu-item-icon--Height);\n  margin-right: var(--pf-c-dropdown__menu-item-icon--MarginRight);\n}\n.pf-c-dropdown__menu-item-icon > * {\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.pf-c-dropdown__menu-item-description {\n  font-size: var(--pf-c-dropdown__menu-item-description--FontSize);\n  color: var(--pf-c-dropdown__menu-item-description--Color);\n}\n\n.pf-c-dropdown__group + .pf-c-dropdown__group {\n  padding-top: var(--pf-c-dropdown__group--group--PaddingTop);\n}\n\n.pf-c-dropdown__group-title {\n  padding-top: var(--pf-c-dropdown__group-title--PaddingTop);\n  padding-right: var(--pf-c-dropdown__group-title--PaddingRight);\n  padding-bottom: var(--pf-c-dropdown__group-title--PaddingBottom);\n  padding-left: var(--pf-c-dropdown__group-title--PaddingLeft);\n  font-size: var(--pf-c-dropdown__group-title--FontSize);\n  font-weight: var(--pf-c-dropdown__group-title--FontWeight);\n  color: var(--pf-c-dropdown__group-title--Color);\n}\n\n:where(.pf-theme-dark) .pf-c-dropdown {\n  --pf-c-dropdown__toggle--BackgroundColor: var(--pf-global--BackgroundColor--400);\n  --pf-c-dropdown__toggle--before--BorderTopColor: transparent;\n  --pf-c-dropdown__toggle--before--BorderRightColor: transparent;\n  --pf-c-dropdown__toggle--before--BorderBottomColor: var(--pf-global--BorderColor--400);\n  --pf-c-dropdown__toggle--before--BorderLeftColor: transparent;\n  --pf-c-dropdown__toggle--disabled--BackgroundColor: var(--pf-global--palette--black-500);\n  --pf-c-dropdown__toggle--m-primary--BackgroundColor: var(--pf-global--primary-color--300);\n  --pf-c-dropdown__menu--BackgroundColor: var(--pf-global--BackgroundColor--300);\n  --pf-c-dropdown__menu--Top: 100%;\n  --pf-c-dropdown--m-top__menu--TranslateY: -100%;\n  --pf-c-dropdown__menu-item--hover--BackgroundColor: var(--pf-global--BackgroundColor--400);\n  --pf-c-dropdown__group-title--FontSize: var(--pf-global--FontSize--xs);\n  --pf-c-dropdown__group-title--FontWeight: var(--pf-global--FontWeight--bold);\n}\n:where(.pf-theme-dark) .pf-c-dropdown__toggle:not(.pf-m-plain):disabled, :where(.pf-theme-dark) .pf-c-dropdown__toggle:not(.pf-m-plain).pf-m-disabled {\n  color: var(--pf-global--palette--black-100);\n}\n:where(.pf-theme-dark) .pf-c-dropdown__toggle.pf-m-plain {\n  background: transparent;\n}");
