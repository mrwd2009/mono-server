/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/components/ContextSelector/context-selector.css */
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
__snowpack__injectStyle(".pf-c-context-selector__menu {\n  --pf-global--Color--100: var(--pf-global--Color--dark-100);\n  --pf-global--Color--200: var(--pf-global--Color--dark-200);\n  --pf-global--BorderColor--100: var(--pf-global--BorderColor--dark-100);\n  --pf-global--primary-color--100: var(--pf-global--primary-color--dark-100);\n  --pf-global--link--Color: var(--pf-global--link--Color--dark);\n  --pf-global--link--Color--hover: var(--pf-global--link--Color--dark--hover);\n  --pf-global--BackgroundColor--100: var(--pf-global--BackgroundColor--light-100);\n}\n\n.pf-c-context-selector {\n  --pf-c-context-selector--Width: 15.625rem;\n  --pf-c-context-selector__toggle--PaddingTop: var(--pf-global--spacer--form-element);\n  --pf-c-context-selector__toggle--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-context-selector__toggle--PaddingBottom: var(--pf-global--spacer--form-element);\n  --pf-c-context-selector__toggle--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-context-selector__toggle--BorderWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-context-selector__toggle--BorderTopColor: var(--pf-global--BorderColor--300);\n  --pf-c-context-selector__toggle--BorderRightColor: var(--pf-global--BorderColor--300);\n  --pf-c-context-selector__toggle--BorderBottomColor: var(--pf-global--BorderColor--200);\n  --pf-c-context-selector__toggle--BorderLeftColor: var(--pf-global--BorderColor--300);\n  --pf-c-context-selector__toggle--Color: var(--pf-global--Color--100);\n  --pf-c-context-selector__toggle--hover--BorderBottomWidth: var(--pf-c-context-selector__toggle--BorderWidth);\n  --pf-c-context-selector__toggle--hover--BorderBottomColor: var(--pf-global--active-color--100);\n  --pf-c-context-selector__toggle--active--BorderBottomWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-context-selector__toggle--active--BorderBottomColor: var(--pf-global--active-color--100);\n  --pf-c-context-selector__toggle--expanded--BorderBottomWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-context-selector__toggle--expanded--BorderBottomColor: var(--pf-global--active-color--100);\n  --pf-c-context-selector__toggle--m-plain--Color: var(--pf-global--Color--200);\n  --pf-c-context-selector__toggle--m-plain--hover--Color: var(--pf-global--Color--100);\n  --pf-c-context-selector__toggle--m-plain--disabled--Color: var(--pf-global--disabled-color--200);\n  --pf-c-context-selector__toggle--m-plain--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-context-selector__toggle--m-plain--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-context-selector__toggle--m-plain--m-text--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-context-selector__toggle--m-plain--m-text--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-context-selector__toggle-text--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-context-selector__toggle-text--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-context-selector__toggle-text--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-context-selector__toggle-icon--MarginRight: var(--pf-global--spacer--sm);\n  --pf-c-context-selector__toggle-icon--MarginLeft: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-plain__toggle-icon--Color: var(--pf-global--Color--200);\n  --pf-c-context-selector--m-plain--hover__toggle-icon--Color: var(--pf-global--Color--100);\n  --pf-c-context-selector__menu--Top: calc(100% + var(--pf-global--spacer--xs));\n  --pf-c-context-selector__menu--ZIndex: var(--pf-global--ZIndex--sm);\n  --pf-c-context-selector__menu--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-context-selector__menu--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-context-selector__menu--BoxShadow: var(--pf-global--BoxShadow--md);\n  --pf-c-context-selector__menu-search--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-context-selector__menu-search--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-context-selector__menu-search--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-context-selector__menu-search--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-context-selector__menu-search--BorderBottomColor: var(--pf-global--BorderColor--100);\n  --pf-c-context-selector__menu-search--BorderBottomWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-context-selector__menu-footer--BoxShadow: var(--pf-global--BoxShadow--sm-top);\n  --pf-c-context-selector__menu-footer--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-context-selector__menu-footer--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-context-selector__menu-footer--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-context-selector__menu-footer--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-context-selector__menu-list--MaxHeight: 12.5rem;\n  --pf-c-context-selector__menu-list--PaddingTop: var(--pf-c-context-selector__menu--PaddingTop);\n  --pf-c-context-selector__menu-list--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-context-selector__menu-list-item--Color: var(--pf-global--Color--dark-100);\n  --pf-c-context-selector__menu-list-item--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-context-selector__menu-list-item--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-context-selector__menu-list-item--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-context-selector__menu-list-item--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-context-selector__menu-list-item--hover--BackgroundColor: var(--pf-global--BackgroundColor--light-300);\n  --pf-c-context-selector__menu-list-item--disabled--Color: var(--pf-global--Color--dark-200);\n  --pf-c-context-selector__menu-item-icon--Color: var(--pf-global--active-color--100);\n  --pf-c-context-selector__menu-item-icon--FontSize: var(--pf-global--icon--FontSize--sm);\n  --pf-c-context-selector__menu-item-icon--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-full-height__toggle--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-full-height__toggle--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-full-height__toggle--before--BorderTopWidth: 0;\n  --pf-c-context-selector--m-full-height__toggle--hover--BorderBottomWidth: var(--pf-global--BorderWidth--xl);\n  --pf-c-context-selector--m-full-height__toggle--active--BorderBottomWidth: var(--pf-global--BorderWidth--xl);\n  --pf-c-context-selector--m-full-height__toggle--expanded--BorderBottomWidth: var(--pf-global--BorderWidth--xl);\n  --pf-c-context-selector--m-large__toggle--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-large__toggle--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-large__toggle--hover--BorderBottomWidth: var(--pf-global--BorderWidth--xl);\n  --pf-c-context-selector--m-large__toggle--active--BorderBottomWidth: var(--pf-global--BorderWidth--xl);\n  --pf-c-context-selector--m-large__toggle--expanded--BorderBottomWidth: var(--pf-global--BorderWidth--xl);\n  --pf-c-context-selector--m-page-insets__toggle--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-page-insets__toggle--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-page-insets__toggle--xl--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-page-insets__toggle--xl--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-page-insets__menu-list-item--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-page-insets__menu-list-item--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-page-insets__menu-list-item--xl--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-page-insets__menu-list-item--xl--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-page-insets__menu-search--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-page-insets__menu-search--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-page-insets__menu-search--xl--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-page-insets__menu-search--xl--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-page-insets__menu-footer--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-page-insets__menu-footer--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-page-insets__menu-footer--xl--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-page-insets__menu-footer--xl--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-page-insets__toggle--m-plain--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-page-insets__toggle--m-plain--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-page-insets__toggle--m-plain--xl--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-page-insets__toggle--m-plain--xl--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-page-insets__toggle--m-plain--m-text--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-page-insets__toggle--m-plain--m-text--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-context-selector--m-page-insets__toggle--m-plain--m-text--xl--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-context-selector--m-page-insets__toggle--m-plain--m-text--xl--PaddingLeft: var(--pf-global--spacer--lg);\n  position: relative;\n  display: inline-block;\n  width: var(--pf-c-context-selector--Width);\n  max-width: 100%;\n}\n@media screen and (min-width: 1200px) {\n  .pf-c-context-selector {\n    --pf-c-context-selector--m-page-insets__toggle--PaddingRight: var(--pf-c-context-selector--m-page-insets__toggle--xl--PaddingRight);\n    --pf-c-context-selector--m-page-insets__toggle--PaddingLeft: var(--pf-c-context-selector--m-page-insets__toggle--xl--PaddingLeft);\n    --pf-c-context-selector--m-page-insets__menu-list-item--PaddingRight: var(--pf-c-context-selector--m-page-insets__menu-list-item--xl--PaddingRight);\n    --pf-c-context-selector--m-page-insets__menu-list-item--PaddingLeft: var(--pf-c-context-selector--m-page-insets__menu-list-item--xl--PaddingLeft);\n    --pf-c-context-selector--m-page-insets__menu-search--PaddingRight: var(--pf-c-context-selector--m-page-insets__menu-search--xl--PaddingRight);\n    --pf-c-context-selector--m-page-insets__menu-search--PaddingLeft: var(--pf-c-context-selector--m-page-insets__menu-search--xl--PaddingLeft);\n    --pf-c-context-selector--m-page-insets__menu-footer--PaddingRight: var(--pf-c-context-selector--m-page-insets__menu-footer--xl--PaddingRight);\n    --pf-c-context-selector--m-page-insets__menu-footer--PaddingLeft: var(--pf-c-context-selector--m-page-insets__menu-footer--xl--PaddingLeft);\n    --pf-c-context-selector--m-page-insets__toggle--m-plain--PaddingRight: var(--pf-c-context-selector--m-page-insets__toggle--m-plain--xl--PaddingRight);\n    --pf-c-context-selector--m-page-insets__toggle--m-plain--PaddingLeft: var(--pf-c-context-selector--m-page-insets__toggle--m-plain--xl--PaddingLeft);\n    --pf-c-context-selector--m-page-insets__toggle--m-plain--m-text--PaddingRight: var(--pf-c-context-selector--m-page-insets__toggle--m-plain--m-text--xl--PaddingRight);\n    --pf-c-context-selector--m-page-insets__toggle--m-plain--m-text--PaddingLeft: var(--pf-c-context-selector--m-page-insets__toggle--m-plain--m-text--xl--PaddingLeft);\n  }\n}\n.pf-c-context-selector.pf-m-full-height {\n  --pf-c-context-selector__toggle--active--BorderBottomWidth: var(--pf-c-context-selector--m-full-height__toggle--active--BorderBottomWidth);\n  --pf-c-context-selector__toggle--expanded--BorderBottomWidth: var(--pf-c-context-selector--m-full-height__toggle--expanded--BorderBottomWidth);\n  --pf-c-context-selector__toggle--PaddingRight: var(--pf-c-context-selector--m-full-height__toggle--PaddingRight);\n  --pf-c-context-selector__toggle--PaddingLeft: var(--pf-c-context-selector--m-full-height__toggle--PaddingLeft);\n  display: inline-flex;\n  align-items: center;\n  height: 100%;\n}\n.pf-c-context-selector.pf-m-full-height .pf-c-context-selector__toggle {\n  align-self: stretch;\n}\n.pf-c-context-selector.pf-m-full-height .pf-c-context-selector__toggle::before {\n  border-top-width: var(--pf-c-context-selector--m-full-height__toggle--before--BorderTopWidth);\n}\n.pf-c-context-selector.pf-m-full-height:hover .pf-c-context-selector__toggle::before {\n  border-bottom-width: var(--pf-c-context-selector--m-full-height__toggle--hover--BorderBottomWidth);\n}\n.pf-c-context-selector.pf-m-large {\n  --pf-c-context-selector__toggle--PaddingTop: var(--pf-c-context-selector--m-large__toggle--PaddingTop);\n  --pf-c-context-selector__toggle--PaddingBottom: var(--pf-c-context-selector--m-large__toggle--PaddingBottom);\n  --pf-c-context-selector__toggle--hover--BorderBottomWidth: var(--pf-c-context-selector--m-large__toggle--hover--BorderBottomWidth);\n  --pf-c-context-selector__toggle--active--BorderBottomWidth: var(--pf-c-context-selector--m-large__toggle--active--BorderBottomWidth);\n  --pf-c-context-selector__toggle--expanded--BorderBottomWidth: var(--pf-c-context-selector--m-large__toggle--expanded--BorderBottomWidth);\n}\n.pf-c-context-selector.pf-m-page-insets {\n  --pf-c-context-selector__toggle--PaddingRight: var(--pf-c-context-selector--m-page-insets__toggle--PaddingRight);\n  --pf-c-context-selector__toggle--PaddingLeft: var(--pf-c-context-selector--m-page-insets__toggle--PaddingLeft);\n  --pf-c-context-selector__menu-list-item--PaddingRight: var(--pf-c-context-selector--m-page-insets__menu-list-item--PaddingRight);\n  --pf-c-context-selector__menu-list-item--PaddingLeft: var(--pf-c-context-selector--m-page-insets__menu-list-item--PaddingLeft);\n  --pf-c-context-selector__menu-search--PaddingRight: var(--pf-c-context-selector--m-page-insets__menu-search--PaddingRight);\n  --pf-c-context-selector__menu-search--PaddingLeft: var(--pf-c-context-selector--m-page-insets__menu-search--PaddingLeft);\n  --pf-c-context-selector__menu-footer--PaddingRight: var(--pf-c-context-selector--m-page-insets__menu-footer--PaddingRight);\n  --pf-c-context-selector__menu-footer--PaddingLeft: var(--pf-c-context-selector--m-page-insets__menu-footer--PaddingLeft);\n  --pf-c-context-selector__toggle--m-plain--PaddingRight: var(--pf-c-context-selector--m-page-insets__toggle--m-plain--PaddingRight);\n  --pf-c-context-selector__toggle--m-plain--PaddingLeft: var(--pf-c-context-selector--m-page-insets__toggle--m-plain--PaddingLeft);\n  --pf-c-context-selector__toggle--m-plain--m-text--PaddingRight: var(--pf-c-context-selector--m-page-insets__toggle--m-plain--m-text--PaddingRight);\n  --pf-c-context-selector__toggle--m-plain--m-text--PaddingLeft: var(--pf-c-context-selector--m-page-insets__toggle--m-plain--m-text--PaddingLeft);\n}\n\n.pf-c-context-selector__toggle {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  padding: var(--pf-c-context-selector__toggle--PaddingTop) var(--pf-c-context-selector__toggle--PaddingRight) var(--pf-c-context-selector__toggle--PaddingBottom) var(--pf-c-context-selector__toggle--PaddingLeft);\n  color: var(--pf-c-context-selector__toggle--Color);\n  white-space: nowrap;\n  cursor: pointer;\n  border: none;\n}\n.pf-c-context-selector__toggle::before {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  content: \"\";\n  border: var(--pf-c-context-selector__toggle--BorderWidth) solid;\n  border-color: var(--pf-c-context-selector__toggle--BorderTopColor) var(--pf-c-context-selector__toggle--BorderRightColor) var(--pf-c-context-selector__toggle--BorderBottomColor) var(--pf-c-context-selector__toggle--BorderLeftColor);\n}\n.pf-c-context-selector__toggle:hover::before {\n  --pf-c-context-selector__toggle--BorderBottomColor: var(--pf-c-context-selector__toggle--hover--BorderBottomColor);\n  border-bottom-width: var(--pf-c-context-selector__toggle--hover--BorderBottomWidth);\n}\n.pf-c-context-selector__toggle:active::before, .pf-c-context-selector__toggle.pf-m-active::before, .pf-c-context-selector__toggle:focus-within::before {\n  --pf-c-context-selector__toggle--BorderBottomColor: var(--pf-c-context-selector__toggle--active--BorderBottomColor);\n  border-bottom-width: var(--pf-c-context-selector__toggle--active--BorderBottomWidth);\n}\n.pf-m-expanded > .pf-c-context-selector__toggle::before {\n  --pf-c-context-selector__toggle--BorderBottomColor: var(--pf-c-context-selector__toggle--expanded--BorderBottomColor);\n  border-bottom-width: var(--pf-c-context-selector__toggle--expanded--BorderBottomWidth);\n}\n.pf-c-context-selector__toggle.pf-m-plain {\n  --pf-c-context-selector__toggle--PaddingRight: var(--pf-c-context-selector__toggle--m-plain--PaddingRight);\n  --pf-c-context-selector__toggle--PaddingLeft: var(--pf-c-context-selector__toggle--m-plain--PaddingLeft);\n  --pf-c-context-selector__toggle-icon--Color: var(--pf-c-context-selector--m-plain__toggle-icon--Color);\n}\n.pf-c-context-selector__toggle.pf-m-plain.pf-m-text {\n  --pf-c-context-selector__toggle--PaddingRight: var(--pf-c-context-selector__toggle--m-plain--m-text--PaddingRight);\n  --pf-c-context-selector__toggle--PaddingLeft: var(--pf-c-context-selector__toggle--m-plain--m-text--PaddingLeft);\n}\n.pf-c-context-selector__toggle.pf-m-plain:not(.pf-m-text) {\n  display: inline-block;\n  width: auto;\n  color: var(--pf-c-context-selector__toggle--m-plain--Color);\n}\n.pf-c-context-selector__toggle.pf-m-plain.pf-m-disabled, .pf-c-context-selector__toggle.pf-m-plain:disabled {\n  --pf-c-context-selector__toggle--m-plain--Color: var(--pf-c-context-selector__toggle--m-plain--disabled--Color);\n}\n.pf-c-context-selector__toggle.pf-m-plain:hover, .pf-c-context-selector__toggle.pf-m-plain:active, .pf-c-context-selector__toggle.pf-m-plain.pf-m-active, .pf-c-context-selector__toggle.pf-m-plain:focus, .pf-c-context-selector.pf-m-expanded > .pf-c-context-selector__toggle.pf-m-plain {\n  --pf-c-context-selector__toggle--m-plain--Color: var(--pf-c-context-selector__toggle--m-plain--hover--Color);\n  --pf-c-context-selector--m-plain__toggle-icon--Color: var(--pf-c-context-selector--m-plain--hover__toggle-icon--Color);\n}\n.pf-c-context-selector__toggle.pf-m-plain::before {\n  border: 0;\n}\n.pf-c-context-selector__toggle .pf-c-context-selector__toggle-text {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: var(--pf-c-context-selector__toggle-text--FontSize);\n  font-weight: var(--pf-c-context-selector__toggle-text--FontWeight);\n  line-height: var(--pf-c-context-selector__toggle-text--LineHeight);\n}\n\n.pf-c-context-selector__toggle-icon {\n  margin-right: var(--pf-c-context-selector__toggle-icon--MarginRight);\n  margin-left: var(--pf-c-context-selector__toggle-icon--MarginLeft);\n  color: var(--pf-c-context-selector__toggle-icon--Color, inherit);\n}\n\n.pf-c-context-selector__menu {\n  color: var(--pf-global--Color--100);\n  position: absolute;\n  top: var(--pf-c-context-selector__menu--Top);\n  z-index: var(--pf-c-context-selector__menu--ZIndex);\n  min-width: 100%;\n  background-color: var(--pf-c-context-selector__menu--BackgroundColor);\n  background-clip: padding-box;\n  box-shadow: var(--pf-c-context-selector__menu--BoxShadow);\n}\n\n.pf-c-context-selector__menu-search {\n  position: relative;\n  padding: var(--pf-c-context-selector__menu-search--PaddingTop) var(--pf-c-context-selector__menu-search--PaddingRight) var(--pf-c-context-selector__menu-search--PaddingBottom) var(--pf-c-context-selector__menu-search--PaddingLeft);\n  border-bottom: var(--pf-c-context-selector__menu-search--BorderBottomWidth) solid var(--pf-c-context-selector__menu-search--BorderBottomColor);\n}\n\n.pf-c-context-selector__menu-footer {\n  padding: var(--pf-c-context-selector__menu-footer--PaddingTop) var(--pf-c-context-selector__menu-footer--PaddingRight) var(--pf-c-context-selector__menu-footer--PaddingBottom) var(--pf-c-context-selector__menu-footer--PaddingLeft);\n  box-shadow: var(--pf-c-context-selector__menu-footer--BoxShadow);\n}\n\n.pf-c-context-selector__menu-list {\n  max-height: var(--pf-c-context-selector__menu-list--MaxHeight);\n  padding-top: var(--pf-c-context-selector__menu-list--PaddingTop);\n  padding-bottom: var(--pf-c-context-selector__menu-list--PaddingBottom);\n  overflow-y: auto;\n}\n\n.pf-c-context-selector__menu-list-item {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  padding: var(--pf-c-context-selector__menu-list-item--PaddingTop) var(--pf-c-context-selector__menu-list-item--PaddingRight) var(--pf-c-context-selector__menu-list-item--PaddingBottom) var(--pf-c-context-selector__menu-list-item--PaddingLeft);\n  color: var(--pf-c-context-selector__menu-list-item--Color);\n  white-space: nowrap;\n  border: none;\n}\n.pf-c-context-selector__menu-list-item:hover, .pf-c-context-selector__menu-list-item:focus {\n  text-decoration: none;\n  background-color: var(--pf-c-context-selector__menu-list-item--hover--BackgroundColor);\n}\n.pf-c-context-selector__menu-list-item.pf-m-disabled, .pf-c-context-selector__menu-list-item:disabled {\n  --pf-c-context-selector__menu-list-item--Color: var(--pf-c-context-selector__menu-list-item--disabled--Color);\n  pointer-events: none;\n}\n\n:where(.pf-theme-dark) .pf-c-context-selector {\n  --pf-c-context-selector__menu--Top: 100%;\n  --pf-c-context-selector__menu-list-item--hover--BackgroundColor: var(--pf-global--BackgroundColor--400);\n}\n:where(.pf-theme-dark) .pf-c-context-selector__toggle {\n  background: var(--pf-global--BackgroundColor--400);\n}\n:where(.pf-theme-dark) .pf-c-context-selector__toggle.pf-m-plain {\n  background: transparent;\n}\n:where(.pf-theme-dark) .pf-c-context-selector__menu {\n  background: var(--pf-global--BackgroundColor--300);\n}\n:where(.pf-theme-dark) .pf-c-context-selector__menu-footer {\n  border-top: 1px solid var(--pf-global--BorderColor--300);\n}");
