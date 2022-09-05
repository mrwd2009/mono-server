/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/components/Menu/menu.css */
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
__snowpack__injectStyle(".pf-c-menu {\n  --pf-global--Color--100: var(--pf-global--Color--dark-100);\n  --pf-global--Color--200: var(--pf-global--Color--dark-200);\n  --pf-global--BorderColor--100: var(--pf-global--BorderColor--dark-100);\n  --pf-global--primary-color--100: var(--pf-global--primary-color--dark-100);\n  --pf-global--link--Color: var(--pf-global--link--Color--dark);\n  --pf-global--link--Color--hover: var(--pf-global--link--Color--dark--hover);\n  --pf-global--BackgroundColor--100: var(--pf-global--BackgroundColor--light-100);\n}\n\n.pf-c-menu__group, .pf-c-menu__list-item, .pf-c-menu__list {\n  --pf-hidden-visible--visible--Visibility: visible;\n  --pf-hidden-visible--hidden--Display: none;\n  --pf-hidden-visible--hidden--Visibility: hidden;\n  --pf-hidden-visible--Display: var(--pf-hidden-visible--visible--Display);\n  --pf-hidden-visible--Visibility: var(--pf-hidden-visible--visible--Visibility);\n  display: var(--pf-hidden-visible--Display);\n  visibility: var(--pf-hidden-visible--Visibility);\n}\n.pf-m-hidden.pf-c-menu__group, .pf-m-hidden.pf-c-menu__list-item, .pf-m-hidden.pf-c-menu__list {\n  --pf-hidden-visible--Display: var(--pf-hidden-visible--hidden--Display);\n  --pf-hidden-visible--Visibility: var(--pf-hidden-visible--hidden--Visibility);\n}\n@media screen and (min-width: 576px) {\n  .pf-m-hidden-on-sm.pf-c-menu__group, .pf-m-hidden-on-sm.pf-c-menu__list-item, .pf-m-hidden-on-sm.pf-c-menu__list {\n    --pf-hidden-visible--Display: var(--pf-hidden-visible--hidden--Display);\n    --pf-hidden-visible--Visibility: var(--pf-hidden-visible--hidden--Visibility);\n  }\n  .pf-m-visible-on-sm.pf-c-menu__group, .pf-m-visible-on-sm.pf-c-menu__list-item, .pf-m-visible-on-sm.pf-c-menu__list {\n    --pf-hidden-visible--Display: var(--pf-hidden-visible--visible--Display);\n    --pf-hidden-visible--Visibility: var(--pf-hidden-visible--visible--Visibility);\n  }\n}\n@media screen and (min-width: 768px) {\n  .pf-m-hidden-on-md.pf-c-menu__group, .pf-m-hidden-on-md.pf-c-menu__list-item, .pf-m-hidden-on-md.pf-c-menu__list {\n    --pf-hidden-visible--Display: var(--pf-hidden-visible--hidden--Display);\n    --pf-hidden-visible--Visibility: var(--pf-hidden-visible--hidden--Visibility);\n  }\n  .pf-m-visible-on-md.pf-c-menu__group, .pf-m-visible-on-md.pf-c-menu__list-item, .pf-m-visible-on-md.pf-c-menu__list {\n    --pf-hidden-visible--Display: var(--pf-hidden-visible--visible--Display);\n    --pf-hidden-visible--Visibility: var(--pf-hidden-visible--visible--Visibility);\n  }\n}\n@media screen and (min-width: 992px) {\n  .pf-m-hidden-on-lg.pf-c-menu__group, .pf-m-hidden-on-lg.pf-c-menu__list-item, .pf-m-hidden-on-lg.pf-c-menu__list {\n    --pf-hidden-visible--Display: var(--pf-hidden-visible--hidden--Display);\n    --pf-hidden-visible--Visibility: var(--pf-hidden-visible--hidden--Visibility);\n  }\n  .pf-m-visible-on-lg.pf-c-menu__group, .pf-m-visible-on-lg.pf-c-menu__list-item, .pf-m-visible-on-lg.pf-c-menu__list {\n    --pf-hidden-visible--Display: var(--pf-hidden-visible--visible--Display);\n    --pf-hidden-visible--Visibility: var(--pf-hidden-visible--visible--Visibility);\n  }\n}\n@media screen and (min-width: 1200px) {\n  .pf-m-hidden-on-xl.pf-c-menu__group, .pf-m-hidden-on-xl.pf-c-menu__list-item, .pf-m-hidden-on-xl.pf-c-menu__list {\n    --pf-hidden-visible--Display: var(--pf-hidden-visible--hidden--Display);\n    --pf-hidden-visible--Visibility: var(--pf-hidden-visible--hidden--Visibility);\n  }\n  .pf-m-visible-on-xl.pf-c-menu__group, .pf-m-visible-on-xl.pf-c-menu__list-item, .pf-m-visible-on-xl.pf-c-menu__list {\n    --pf-hidden-visible--Display: var(--pf-hidden-visible--visible--Display);\n    --pf-hidden-visible--Visibility: var(--pf-hidden-visible--visible--Visibility);\n  }\n}\n@media screen and (min-width: 1450px) {\n  .pf-m-hidden-on-2xl.pf-c-menu__group, .pf-m-hidden-on-2xl.pf-c-menu__list-item, .pf-m-hidden-on-2xl.pf-c-menu__list {\n    --pf-hidden-visible--Display: var(--pf-hidden-visible--hidden--Display);\n    --pf-hidden-visible--Visibility: var(--pf-hidden-visible--hidden--Visibility);\n  }\n  .pf-m-visible-on-2xl.pf-c-menu__group, .pf-m-visible-on-2xl.pf-c-menu__list-item, .pf-m-visible-on-2xl.pf-c-menu__list {\n    --pf-hidden-visible--Display: var(--pf-hidden-visible--visible--Display);\n    --pf-hidden-visible--Visibility: var(--pf-hidden-visible--visible--Visibility);\n  }\n}\n\n.pf-c-menu {\n  color: var(--pf-global--Color--100);\n  --pf-c-menu--BackgroundColor: var(--pf-global--BackgroundColor--100);\n  --pf-c-menu--BoxShadow: var(--pf-global--BoxShadow--md);\n  --pf-c-menu--MinWidth: auto;\n  --pf-c-menu--Width: auto;\n  --pf-c-menu--ZIndex: var(--pf-global--ZIndex--sm);\n  --pf-c-menu--Top: auto;\n  --pf-c-menu--m-flyout__menu--Top: calc(var(--pf-c-menu__list--PaddingTop) * -1 + var(--pf-c-menu--m-flyout__menu--top-offset));\n  --pf-c-menu--m-flyout__menu--Right: auto;\n  --pf-c-menu--m-flyout__menu--Bottom: auto;\n  --pf-c-menu--m-flyout__menu--Left: calc(100% + var(--pf-c-menu--m-flyout__menu--left-offset));\n  --pf-c-menu--m-flyout__menu--m-top--Bottom: calc(var(--pf-c-menu__list--PaddingTop) * -1);\n  --pf-c-menu--m-flyout__menu--m-left--Right: calc(100% + var(--pf-c-menu--m-flyout__menu--m-left--right-offset));\n  --pf-c-menu--m-plain--BoxShadow: none;\n  --pf-c-menu--m-flyout__menu--top-offset: 0px;\n  --pf-c-menu--m-flyout__menu--left-offset: 0px;\n  --pf-c-menu--m-flyout__menu--m-left--right-offset: 0px;\n  --pf-c-menu__content--Height: auto;\n  --pf-c-menu__content--MaxHeight: none;\n  --pf-c-menu--m-scrollable__content--MaxHeight: 18.75rem;\n  --pf-c-menu--c-divider--MarginTop: 0;\n  --pf-c-menu--c-divider--MarginBottom: 0;\n  --pf-c-menu__list--c-divider--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-menu__list--c-divider--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-menu__header--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-menu__header--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-menu__header--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-menu__header--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-menu__header--c-menu__item--MarginTop: calc(var(--pf-c-menu__header--PaddingTop) * -1 / 2);\n  --pf-c-menu__header--c-menu__item--MarginRight: calc(var(--pf-c-menu__header--PaddingRight) * -1 / 2);\n  --pf-c-menu__header--c-menu__item--MarginBottom: calc(var(--pf-c-menu__header--PaddingBottom) * -1 / 2);\n  --pf-c-menu__header--c-menu__item--MarginLeft: calc(var(--pf-c-menu__header--PaddingLeft) * -1 / 2);\n  --pf-c-menu__header--c-menu__item--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-menu__header--c-menu__item--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-menu__header--c-menu__item--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-menu__header--c-menu__item--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-menu__header--c-menu__item--BackgroundColor: transparent;\n  --pf-c-menu__header--c-menu__item--hover--BackgroundColor: var(--pf-global--BackgroundColor--200);\n  --pf-c-menu__header--c-menu__item--focus--BackgroundColor: var(--pf-global--BackgroundColor--200);\n  --pf-c-menu__search--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-menu__search--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-menu__search--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-menu__search--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-menu__header__search--PaddingTop: 0;\n  --pf-c-menu__list--Display: block;\n  --pf-c-menu__list--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-menu__list--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-menu__list-item--Display: flex;\n  --pf-c-menu__list-item--Color: var(--pf-global--Color--100);\n  --pf-c-menu__list-item--BackgroundColor: transparent;\n  --pf-c-menu__list-item--hover--BackgroundColor: var(--pf-global--BackgroundColor--200);\n  --pf-c-menu__list-item--focus-within--BackgroundColor: var(--pf-global--BackgroundColor--200);\n  --pf-c-menu__list-item--m-loading--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-menu__item--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-menu__item--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-menu__item--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-menu__item--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-menu__item--OutlineOffset: calc(0.125rem * -1);\n  --pf-c-menu__item--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-menu__item--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-menu__item--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-menu__list-item--m-disabled__item--Color: var(--pf-global--disabled-color--100);\n  --pf-c-menu__list-item--m-load__item--Color: var(--pf-global--link--Color);\n  --pf-c-menu__group--Display: block;\n  --pf-c-menu__group-title--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-menu__group-title--PaddingRight: var(--pf-c-menu__item--PaddingRight);\n  --pf-c-menu__group-title--PaddingLeft: var(--pf-c-menu__item--PaddingLeft);\n  --pf-c-menu__group-title--FontSize: var(--pf-global--FontSize--sm);\n  --pf-c-menu__group-title--FontWeight: var(--pf-global--FontWeight--bold);\n  --pf-c-menu__group-title--Color: var(--pf-global--Color--200);\n  --pf-c-menu__item-description--FontSize: var(--pf-global--FontSize--xs);\n  --pf-c-menu__item-description--Color: var(--pf-global--Color--200);\n  --pf-c-menu__item-icon--MarginRight: var(--pf-global--spacer--sm);\n  --pf-c-menu__item-check--MarginRight: var(--pf-global--spacer--sm);\n  --pf-c-menu__item-toggle-icon--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-menu__item-toggle-icon--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-menu__list-item--m-disabled__item-toggle-icon--Color: var(--pf-global--disabled-color--200);\n  --pf-c-menu__item-text--item-toggle-icon--MarginLeft: var(--pf-global--spacer--sm);\n  --pf-c-menu__item-toggle-icon--item-text--MarginLeft: var(--pf-global--spacer--sm);\n  --pf-c-menu__item-select-icon--MarginLeft: var(--pf-global--spacer--sm);\n  --pf-c-menu__item-select-icon--Color: var(--pf-global--active-color--100);\n  --pf-c-menu__item-select-icon--FontSize: var(--pf-global--icon--FontSize--sm);\n  --pf-c-menu__item-external-icon--MarginLeft: var(--pf-global--spacer--sm);\n  --pf-c-menu__item-external-icon--Color: var(--pf-global--link--Color);\n  --pf-c-menu__item-external-icon--FontSize: var(--pf-global--icon--FontSize--sm);\n  --pf-c-menu__item-external-icon--Opacity: 0;\n  --pf-c-menu__item-action--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-menu__item-action--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-menu__item-action--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-menu__item-action--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-menu__item-action--Color: var(--pf-global--Color--200);\n  --pf-c-menu__item-action--hover--Color: var(--pf-global--Color--100);\n  --pf-c-menu__item-action--disabled--Color: var(--pf-global--disabled-color--200);\n  --pf-c-menu__item-action--m-favorited--Color: var(--pf-global--palette--gold-400);\n  --pf-c-menu__item-action--m-favorited--hover--Color: var(--pf-global--palette--gold-500);\n  --pf-c-menu__item-action-icon--Height: calc(var(--pf-c-menu__item--FontSize) * var(--pf-c-menu__item--LineHeight));\n  --pf-c-menu__item-action--m-favorite__icon--FontSize: var(--pf-global--icon--FontSize--sm);\n  --pf-c-menu__breadcrumb--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-menu__breadcrumb--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-menu__breadcrumb--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-menu__breadcrumb--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-menu__breadcrumb--c-breadcrumb__item--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-menu__breadcrumb--c-breadcrumb__heading--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-menu--m-drilldown--c-menu--Top: 0;\n  --pf-c-menu--m-drilldown--c-menu--TransitionDuration--transform: var(--pf-global--TransitionDuration);\n  --pf-c-menu--m-drilldown--c-menu--Transition: transform var(--pf-c-menu--m-drilldown--c-menu--TransitionDuration--transform);\n  --pf-c-menu--m-drilldown__content--TransitionDuration--height: var(--pf-global--TransitionDuration);\n  --pf-c-menu--m-drilldown__content--TransitionDuration--transform: var(--pf-global--TransitionDuration);\n  --pf-c-menu--m-drilldown__content--Transition: transform var(--pf-c-menu--m-drilldown__content--TransitionDuration--transform), height var(--pf-c-menu--m-drilldown__content--TransitionDuration--height);\n  --pf-c-menu--m-drilldown__list--TransitionDuration--transform: var(--pf-global--TransitionDuration);\n  --pf-c-menu--m-drilldown__list--Transition: transform var(--pf-c-menu--m-drilldown__list--TransitionDuration--transform);\n  --pf-c-menu--m-drilled-in--c-menu__list-item--m-current-path--c-menu--ZIndex: var(--pf-global--ZIndex--xs);\n  --pf-c-menu__footer--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-menu__footer--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-menu__footer--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-menu__footer--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-menu__footer--BoxShadow: none;\n  --pf-c-menu__footer--after--BorderTopWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-menu__footer--after--BorderTopColor: var(--pf-global--BorderColor--100);\n  --pf-c-menu__footer--after--BorderBottomWidth: 0;\n  --pf-c-menu__footer--after--BorderBottomColor: var(--pf-global--BorderColor--100);\n  --pf-c-menu--m-scrollable__footer--BoxShadow: var(--pf-global--BoxShadow--sm-top);\n  --pf-c-menu--m-scrollable__footer--after--BorderTopWidth: 0;\n  --pf-c-menu--m-scrollable__footer--after--BorderBottomWidth: var(--pf-global--BorderWidth--sm);\n  top: var(--pf-c-menu--Top);\n  z-index: var(--pf-c-menu--ZIndex);\n  width: var(--pf-c-menu--Width);\n  min-width: var(--pf-c-menu--MinWidth);\n  background-color: var(--pf-c-menu--BackgroundColor);\n  box-shadow: var(--pf-c-menu--BoxShadow);\n  --pf-c-menu--m-nav--BoxShadow: var(--pf-global--BoxShadow--lg);\n  --pf-c-menu--m-nav--BackgroundColor: var(--pf-global--BackgroundColor--dark-300);\n  --pf-c-menu--m-nav__list--PaddingTop: 0;\n  --pf-c-menu--m-nav__list--PaddingBottom: 0;\n  --pf-c-menu--m-nav__list-item--hover--BackgroundColor: var(--pf-global--BackgroundColor--dark-200);\n  --pf-c-menu--m-nav__list-item--focus-within--BackgroundColor: var(--pf-global--BackgroundColor--dark-200);\n  --pf-c-menu--m-nav__list-item--active--BackgroundColor: var(--pf-global--BackgroundColor--dark-200);\n  --pf-c-menu--m-nav__item--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-menu--m-nav__item--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-menu--m-nav__item--Color: var(--pf-global--Color--light-100);\n  --pf-c-menu--m-nav__item--FontSize: var(--pf-global--FontSize--sm);\n  --pf-c-menu--m-nav__item--OutlineOffset: calc(var(--pf-global--spacer--xs) * -1);\n  --pf-c-menu--m-nav__item--before--BorderBottomColor: var(--pf-global--BackgroundColor--dark-200);\n  --pf-c-menu--m-nav__item--before--BorderBottomWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-menu--m-nav__item--hover--after--BorderLeftColor: var(--pf-global--BorderColor--200);\n  --pf-c-menu--m-nav__item--hover--after--BorderLeftWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-menu--m-nav__item--hover--after--Top: calc(var(--pf-c-menu--m-nav__item--before--BorderBottomWidth) * -1);\n  --pf-c-menu--m-nav__item__list-item--first-child__item--hover--after--Top: 0;\n  --pf-c-menu--m-nav__item-description--Color: var(--pf-global--Color--light-200);\n  --pf-c-menu--m-nav--c-menu--left-offset: 0.25rem;\n  --pf-c-menu--m-nav--c-menu--m-top--bottom-offset: 0;\n  --pf-c-menu--m-nav--c-menu--m-left--right-offset: 0.25rem;\n  --pf-c-menu--m-nav--c-menu--Top: calc(var(--pf-c-menu--m-nav__item--before--BorderBottomWidth) * -1);\n  --pf-c-menu--m-nav--c-menu--Left: calc(100% - var(--pf-c-menu--m-nav--c-menu--left-offset));\n  --pf-c-menu--m-nav--c-menu--m-left--Right: calc(100% - var(--pf-c-menu--m-nav--c-menu--m-left--right-offset));\n  --pf-c-menu--m-nav--c-menu--m-top--Bottom: calc(0 + var(--pf-c-menu--m-nav--c-menu--m-top--bottom-offset));\n  --pf-c-menu--m-nav__list-item--first-child--c-menu--Top: 0;\n}\n.pf-c-menu .pf-c-menu__content .pf-c-menu .pf-c-menu__content {\n  overflow: visible;\n}\n.pf-c-menu .pf-c-divider {\n  margin-top: var(--pf-c-menu--c-divider--MarginTop);\n  margin-bottom: var(--pf-c-menu--c-divider--MarginBottom);\n}\n.pf-c-menu .pf-c-menu.pf-m-flyout, .pf-c-menu.pf-m-flyout .pf-c-menu {\n  position: absolute;\n  top: var(--pf-c-menu--m-flyout__menu--Top);\n  right: var(--pf-c-menu--m-flyout__menu--Right);\n  bottom: var(--pf-c-menu--m-flyout__menu--Bottom);\n  left: var(--pf-c-menu--m-flyout__menu--Left);\n}\n.pf-c-menu .pf-c-menu.pf-m-flyout .pf-c-menu__content, .pf-c-menu.pf-m-flyout .pf-c-menu .pf-c-menu__content {\n  overflow-y: visible;\n}\n.pf-c-menu.pf-m-top {\n  --pf-c-menu--m-flyout__menu--Top: auto;\n  --pf-c-menu--m-flyout__menu--Bottom: var(--pf-c-menu--m-flyout__menu--m-top--Bottom);\n}\n.pf-c-menu.pf-m-left {\n  --pf-c-menu--m-flyout__menu--Right: var(--pf-c-menu--m-flyout__menu--m-left--Right);\n  --pf-c-menu--m-flyout__menu--Left: auto;\n}\n.pf-c-menu.pf-m-drilldown {\n  display: flex;\n  flex-direction: column;\n}\n.pf-c-menu.pf-m-drilldown[hidden] {\n  display: none;\n}\n.pf-c-menu.pf-m-drilldown > .pf-c-menu__content {\n  flex-grow: 1;\n  overflow: hidden;\n  transition: var(--pf-c-menu--m-drilldown__content--Transition);\n}\n.pf-c-menu.pf-m-drilldown.pf-m-drilled-in > .pf-c-menu__content > .pf-c-menu__list,\n.pf-c-menu.pf-m-drilldown.pf-m-drilled-in > .pf-c-menu__list {\n  transform: translateX(-100%);\n}\n.pf-c-menu.pf-m-drilldown > .pf-c-menu__content .pf-c-menu {\n  --pf-c-menu--BoxShadow: none;\n  position: absolute;\n  top: var(--pf-c-menu--m-drilldown--c-menu--Top);\n  left: 100%;\n  width: 100%;\n  transition: var(--pf-c-menu--m-drilldown--c-menu--Transition);\n}\n.pf-c-menu.pf-m-drilldown > .pf-c-menu__content .pf-c-menu.pf-m-drilled-in {\n  transform: translateX(-100%);\n}\n.pf-c-menu.pf-m-drilldown .pf-c-menu__list {\n  position: relative;\n  overflow: hidden;\n  transition: var(--pf-c-menu--m-drilldown__list--Transition);\n}\n.pf-c-menu.pf-m-drilldown .pf-c-menu__list .pf-c-menu__list {\n  --pf-c-menu__list--PaddingTop: 0;\n  --pf-c-menu__list--PaddingBottom: 0;\n}\n.pf-c-menu.pf-m-drilldown .pf-c-menu__list-item.pf-m-current-path .pf-c-menu {\n  z-index: var(--pf-c-menu--m-drilled-in--c-menu__list-item--m-current-path--c-menu--ZIndex);\n}\n.pf-c-menu.pf-m-drilldown .pf-c-menu__list-item.pf-m-current-path > .pf-c-menu {\n  overflow: visible;\n}\n.pf-c-menu.pf-m-drilldown .pf-c-menu__list-item.pf-m-static > .pf-c-menu {\n  position: static;\n}\n.pf-c-menu.pf-m-drilldown .pf-c-menu__list-item.pf-m-static:hover {\n  background-color: transparent;\n}\n.pf-c-menu.pf-m-drilldown .pf-c-menu__list-item:not(.pf-m-current-path) .pf-c-menu {\n  visibility: hidden;\n}\n.pf-c-menu.pf-m-drilldown .pf-c-menu__item {\n  outline-offset: var(--pf-c-menu__item--OutlineOffset);\n}\n.pf-c-menu.pf-m-drilled-in > .pf-c-menu__content > .pf-c-menu__list {\n  overflow: visible;\n}\n.pf-c-menu.pf-m-drilled-in > .pf-c-menu__content > .pf-c-menu__list > .pf-c-divider,\n.pf-c-menu.pf-m-drilled-in > .pf-c-menu__content > .pf-c-menu__list > .pf-c-menu__list-item:not(.pf-m-current-path) {\n  display: none;\n}\n.pf-c-menu.pf-m-plain {\n  --pf-c-menu--BoxShadow: var(--pf-c-menu--m-plain--BoxShadow);\n}\n.pf-c-menu.pf-m-scrollable {\n  --pf-c-menu__content--MaxHeight: var(--pf-c-menu--m-scrollable__content--MaxHeight);\n  --pf-c-menu__footer--BoxShadow: var(--pf-c-menu--m-scrollable__footer--BoxShadow);\n  --pf-c-menu__footer--after--BorderTopWidth: var(--pf-c-menu--m-scrollable__footer--after--BorderTopWidth);\n  --pf-c-menu__footer--after--BorderBottomWidth: var(--pf-c-menu--m-scrollable__footer--after--BorderBottomWidth);\n}\n.pf-c-menu.pf-m-scrollable .pf-c-menu__content {\n  overflow-y: auto;\n}\n.pf-c-menu.pf-m-nav, .pf-c-menu.pf-m-nav .pf-c-menu {\n  --pf-c-menu--BackgroundColor: var(--pf-c-menu--m-nav--BackgroundColor);\n  --pf-c-menu__list--PaddingTop: var(--pf-c-menu--m-nav__list--PaddingTop);\n  --pf-c-menu__list--PaddingBottom: var(--pf-c-menu--m-nav__list--PaddingBottom);\n  --pf-c-menu__list-item--hover--BackgroundColor: var(--pf-c-menu--m-nav__list-item--hover--BackgroundColor);\n  --pf-c-menu__list-item--focus-within--BackgroundColor: var(--pf-c-menu--m-nav__list-item--focus-within--BackgroundColor);\n  --pf-c-menu__list-item--active--BackgroundColor: var(--pf-c-menu--m-nav__list-item--active--BackgroundColor);\n  --pf-c-menu__item--Color: var(--pf-c-menu--m-nav__item--Color);\n  --pf-c-menu__item--FontSize: var(--pf-c-menu--m-nav__item--FontSize);\n  --pf-c-menu__item--OutlineOffset: var(--pf-c-menu--m-nav__item--OutlineOffset);\n  --pf-c-menu__item--PaddingRight: var(--pf-c-menu--m-nav__item--PaddingRight);\n  --pf-c-menu__item--PaddingLeft: var(--pf-c-menu--m-nav__item--PaddingLeft);\n  --pf-c-menu__item-description--Color: var(--pf-c-menu--m-nav__item-description--Color);\n  box-shadow: var(--pf-c-menu--m-nav--BoxShadow);\n}\n.pf-c-menu.pf-m-nav .pf-c-menu__item, .pf-c-menu.pf-m-nav .pf-c-menu .pf-c-menu__item {\n  position: relative;\n  outline-offset: var(--pf-c-nav__item--m-flyout--c-menu__item--OutlineOffset);\n}\n.pf-c-menu.pf-m-nav .pf-c-menu__item::before, .pf-c-menu.pf-m-nav .pf-c-menu .pf-c-menu__item::before {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  content: \"\";\n  border-bottom: var(--pf-c-menu--m-nav__item--before--BorderBottomWidth) solid var(--pf-c-menu--m-nav__item--before--BorderBottomColor);\n}\n.pf-c-menu.pf-m-nav .pf-c-menu__item:hover::after, .pf-c-menu.pf-m-nav .pf-c-menu .pf-c-menu__item:hover::after {\n  position: absolute;\n  top: var(--pf-c-menu--m-nav__item--hover--after--Top);\n  bottom: 0;\n  left: 0;\n  content: \"\";\n  border-left: var(--pf-c-menu--m-nav__item--hover--after--BorderLeftWidth) solid var(--pf-c-menu--m-nav__item--hover--after--BorderLeftColor);\n}\n.pf-c-menu.pf-m-nav .pf-c-menu {\n  width: 100%;\n}\n.pf-c-menu.pf-m-flyout.pf-m-nav, .pf-c-menu.pf-m-flyout.pf-m-nav .pf-c-menu {\n  top: var(--pf-c-menu--m-nav--c-menu--Top);\n  left: var(--pf-c-menu--m-nav--c-menu--Left);\n}\n.pf-c-menu.pf-m-flyout.pf-m-nav.pf-m-top, .pf-c-menu.pf-m-flyout.pf-m-nav .pf-c-menu.pf-m-top {\n  --pf-c-menu--m-nav--c-menu--Top: auto;\n  bottom: var(--pf-c-menu--m-nav--c-menu--m-top--Bottom);\n}\n.pf-c-menu.pf-m-flyout.pf-m-nav.pf-m-left, .pf-c-menu.pf-m-flyout.pf-m-nav .pf-c-menu.pf-m-left {\n  --pf-c-menu--m-nav--c-menu--Left: auto;\n  right: var(--pf-c-menu--m-nav--c-menu--m-left--Right);\n}\n.pf-c-menu.pf-m-flyout.pf-m-nav .pf-c-menu__list-item:first-child, .pf-c-menu.pf-m-flyout.pf-m-nav .pf-c-menu .pf-c-menu__list-item:first-child {\n  --pf-c-menu--m-nav__item--hover--after--Top: var(--pf-c-menu--m-nav__item__list-item--first-child__item--hover--after--Top);\n}\n.pf-c-menu.pf-m-flyout.pf-m-nav .pf-c-menu__list-item:first-child .pf-c-menu, .pf-c-menu.pf-m-flyout.pf-m-nav .pf-c-menu .pf-c-menu__list-item:first-child .pf-c-menu {\n  --pf-c-menu--m-nav--c-menu--Top: var(--pf-c-menu--m-nav__list-item--first-child--c-menu--Top);\n}\n\n.pf-c-menu__breadcrumb {\n  display: flex;\n  align-items: center;\n  min-height: var(--pf-c-menu__breadcrumb--MinHeight);\n  padding: var(--pf-c-menu__breadcrumb--PaddingTop) var(--pf-c-menu__breadcrumb--PaddingRight) var(--pf-c-menu__breadcrumb--PaddingBottom) var(--pf-c-menu__breadcrumb--PaddingLeft);\n}\n.pf-c-menu__breadcrumb .pf-c-breadcrumb {\n  --pf-c-breadcrumb__item--FontSize: var(--pf-c-menu__breadcrumb--c-breadcrumb__item--FontSize);\n  --pf-c-breadcrumb__heading--FontSize: var(--pf-c-menu__breadcrumb--c-breadcrumb__heading--FontSize);\n}\n\n.pf-c-menu__content {\n  height: var(--pf-c-menu__content--Height);\n  max-height: var(--pf-c-menu__content--MaxHeight);\n}\n.pf-c-menu__content .pf-c-menu__content {\n  --pf-c-menu__content--Height: auto;\n}\n\n.pf-c-menu__header {\n  --pf-c-menu__item--PaddingTop: var(--pf-c-menu__header--c-menu__item--PaddingTop);\n  --pf-c-menu__item--PaddingRight: var(--pf-c-menu__header--c-menu__item--PaddingRight);\n  --pf-c-menu__item--PaddingBottom: var(--pf-c-menu__header--c-menu__item--PaddingBottom);\n  --pf-c-menu__item--PaddingLeft: var(--pf-c-menu__header--c-menu__item--PaddingLeft);\n  padding-top: var(--pf-c-menu__header--PaddingTop);\n  padding-right: var(--pf-c-menu__header--PaddingRight);\n  padding-bottom: var(--pf-c-menu__header--PaddingBottom);\n  padding-left: var(--pf-c-menu__header--PaddingLeft);\n}\n.pf-c-menu__header > .pf-c-menu__item {\n  --pf-c-menu__item--BackgroundColor: var(--pf-c-menu__header--c-menu__item--BackgroundColor);\n  margin-top: var(--pf-c-menu__header--c-menu__item--MarginTop);\n  margin-right: var(--pf-c-menu__header--c-menu__item--MarginRight);\n  margin-bottom: var(--pf-c-menu__header--c-menu__item--MarginBottom);\n  margin-left: var(--pf-c-menu__header--c-menu__item--MarginLeft);\n}\n.pf-c-menu__header > .pf-c-menu__item:hover {\n  --pf-c-menu__item--BackgroundColor: var(--pf-c-menu__header--c-menu__item--hover--BackgroundColor);\n}\n.pf-c-menu__header > .pf-c-menu__item:focus {\n  --pf-c-menu__item--BackgroundColor: var(--pf-c-menu__header--c-menu__item--focus--BackgroundColor);\n}\n.pf-c-menu__header + .pf-c-menu__search {\n  --pf-c-menu__search--PaddingTop: var(--pf-c-menu__header__search--PaddingTop);\n}\n\n.pf-c-menu__search {\n  padding-top: var(--pf-c-menu__search--PaddingTop);\n  padding-right: var(--pf-c-menu__search--PaddingRight);\n  padding-bottom: var(--pf-c-menu__search--PaddingBottom);\n  padding-left: var(--pf-c-menu__search--PaddingLeft);\n}\n\n.pf-c-menu__list {\n  --pf-hidden-visible--visible--Display: var(--pf-c-menu__list--Display);\n  padding-top: var(--pf-c-menu__list--PaddingTop);\n  padding-bottom: var(--pf-c-menu__list--PaddingBottom);\n}\n.pf-c-menu__list > .pf-c-divider {\n  margin-top: var(--pf-c-menu__list--c-divider--MarginTop);\n  margin-bottom: var(--pf-c-menu__list--c-divider--MarginBottom);\n}\n\n.pf-c-menu__list-item {\n  --pf-hidden-visible--visible--Display: var(--pf-c-menu__list-item--Display);\n  position: relative;\n  color: var(--pf-c-menu__list-item--Color);\n  background-color: var(--pf-c-menu__list-item--BackgroundColor);\n}\n.pf-c-menu__list-item:hover {\n  --pf-c-menu__list-item--BackgroundColor: var(--pf-c-menu__list-item--hover--BackgroundColor);\n  --pf-c-menu__list-item--Color: var(--pf-c-menu__list-item--hover--Color, inherit);\n}\n.pf-c-menu__list-item:focus-within, .pf-c-menu__list-item.pf-m-focus {\n  --pf-c-menu__list-item--BackgroundColor: var(--pf-c-menu__list-item--focus-within--BackgroundColor);\n  --pf-c-menu__list-item--Color: var(--pf-c-menu__list-item--focus-within--Color, inherit);\n}\n.pf-c-menu__list-item.pf-m-disabled {\n  --pf-c-menu__list-item--hover--BackgroundColor: transparent;\n  --pf-c-menu__list-item--focus-within--BackgroundColor: transparent;\n  --pf-c-menu__item--Color: var(--pf-c-menu__list-item--m-disabled__item--Color);\n  --pf-c-menu__item-toggle-icon: var(--pf-c-menu__list-item--m-disabled__item-toggle-icon--Color);\n  pointer-events: none;\n}\n.pf-c-menu__list-item.pf-m-load {\n  --pf-c-menu__list-item--hover--BackgroundColor: transparent;\n  --pf-c-menu__list-item--focus-within--BackgroundColor: transparent;\n  --pf-c-menu__item--Color: var(--pf-c-menu__list-item--m-load__item--Color);\n}\n.pf-c-menu__list-item.pf-m-loading {\n  --pf-c-menu__list-item--hover--BackgroundColor: transparent;\n  --pf-c-menu__list-item--focus-within--BackgroundColor: transparent;\n  justify-content: center;\n  padding-top: var(--pf-c-menu__list-item--m-loading--PaddingTop);\n  overflow: hidden;\n}\n\n.pf-c-menu__item {\n  display: flex;\n  flex-basis: 100%;\n  flex-direction: column;\n  min-width: 0;\n  padding-top: var(--pf-c-menu__item--PaddingTop);\n  padding-right: var(--pf-c-menu__item--PaddingRight);\n  padding-bottom: var(--pf-c-menu__item--PaddingBottom);\n  padding-left: var(--pf-c-menu__item--PaddingLeft);\n  font-size: var(--pf-c-menu__item--FontSize);\n  font-weight: var(--pf-c-menu__item--FontWeight);\n  line-height: var(--pf-c-menu__item--LineHeight);\n  color: var(--pf-c-menu__item--Color);\n  text-align: left;\n  background-color: var(--pf-c-menu__item--BackgroundColor);\n  border: none;\n}\n.pf-c-menu__item:hover {\n  text-decoration: none;\n}\n.pf-c-menu__item:hover, .pf-c-menu__item:focus {\n  --pf-c-menu__item-external-icon--Opacity: 1;\n}\n.pf-c-menu__item.pf-m-selected .pf-c-menu__item-select-icon {\n  opacity: 1;\n}\nlabel.pf-c-menu__item:where(:not([disabled], .pf-m-disabled)) {\n  cursor: pointer;\n}\n\n.pf-c-menu__item-main {\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n\n.pf-c-menu__item-external-icon {\n  margin-left: var(--pf-c-menu__item-external-icon--MarginLeft);\n  font-size: var(--pf-c-menu__item-external-icon--FontSize);\n  color: var(--pf-c-menu__item-external-icon--Color);\n  opacity: var(--pf-c-menu__item-external-icon--Opacity);\n}\n\n.pf-c-menu__item-text {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  flex-grow: 1;\n}\n\n.pf-c-menu__group {\n  --pf-hidden-visible--visible--Display: var(--pf-c-menu__group--Display);\n}\n\n.pf-c-menu__group-title {\n  padding-top: var(--pf-c-menu__group-title--PaddingTop);\n  padding-right: var(--pf-c-menu__group-title--PaddingRight);\n  padding-left: var(--pf-c-menu__group-title--PaddingLeft);\n  font-size: var(--pf-c-menu__group-title--FontSize);\n  font-weight: var(--pf-c-menu__group-title--FontWeight);\n  color: var(--pf-c-menu__group-title--Color);\n}\n\n.pf-c-menu__item-description {\n  font-size: var(--pf-c-menu__item-description--FontSize);\n  color: var(--pf-c-menu__item-description--Color);\n  word-break: break-all;\n}\n\n.pf-c-menu__item-icon {\n  margin-right: var(--pf-c-menu__item-icon--MarginRight);\n}\n\n.pf-c-menu__item-check {\n  display: flex;\n  align-items: center;\n  margin-right: var(--pf-c-menu__item-check--MarginRight);\n}\n\n.pf-c-menu__item-toggle-icon {\n  padding-right: var(--pf-c-menu__item-toggle-icon--PaddingRight);\n  padding-left: var(--pf-c-menu__item-toggle-icon--PaddingLeft);\n  color: var(--pf-c-menu__item-toggle-icon, inherit);\n}\n\n.pf-c-menu__item-text + .pf-c-menu__item-toggle-icon {\n  margin-left: var(--pf-c-menu__item-text--item-toggle-icon--MarginLeft);\n}\n\n.pf-c-menu__item-toggle-icon + .pf-c-menu__item-text {\n  margin-left: var(--pf-c-menu__item-toggle-icon--item-text--MarginLeft);\n}\n\n.pf-c-menu__item-select-icon {\n  margin-left: var(--pf-c-menu__item-select-icon--MarginLeft);\n  font-size: var(--pf-c-menu__item-select-icon--FontSize);\n  color: var(--pf-c-menu__item-select-icon--Color);\n  opacity: 0;\n}\n\n.pf-c-menu__item-action {\n  display: flex;\n  padding-top: var(--pf-c-menu__item-action--PaddingTop);\n  padding-right: var(--pf-c-menu__item-action--PaddingRight);\n  padding-bottom: var(--pf-c-menu__item-action--PaddingBottom);\n  padding-left: var(--pf-c-menu__item-action--PaddingLeft);\n  color: var(--pf-c-menu__item-action--Color);\n  border: none;\n}\n.pf-c-menu__item-action.pf-m-favorite .pf-c-menu__item-action-icon {\n  font-size: var(--pf-c-menu__item-action--m-favorite__icon--FontSize);\n}\n.pf-c-menu__item-action.pf-m-favorited {\n  --pf-c-menu__item-action--Color: var(--pf-c-menu__item-action--m-favorited--Color);\n  --pf-c-menu__item-action--hover--Color: var(--pf-c-menu__item-action--m-favorited--hover--Color);\n}\n.pf-c-menu__item-action:hover, .pf-c-menu__item-action:focus {\n  --pf-c-menu__item-action--Color: var(--pf-c-menu__item-action--hover--Color);\n}\n.pf-c-menu__item-action:disabled {\n  --pf-c-menu__item-action--Color: var(--pf-c-menu__item-action--disabled--Color);\n}\n\n.pf-c-menu__item-action-icon {\n  display: flex;\n  align-items: center;\n  height: var(--pf-c-menu__item-action-icon--Height);\n}\n\n.pf-c-menu__footer {\n  position: relative;\n  padding: var(--pf-c-menu__footer--PaddingTop) var(--pf-c-menu__footer--PaddingRight) var(--pf-c-menu__footer--PaddingBottom) var(--pf-c-menu__footer--PaddingLeft);\n  box-shadow: var(--pf-c-menu__footer--BoxShadow);\n}\n.pf-c-menu__footer::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n  content: \"\";\n  border-top: var(--pf-c-menu__footer--after--BorderTopWidth) solid var(--pf-c-menu__footer--after--BorderTopColor);\n  border-bottom: var(--pf-c-menu__footer--after--BorderBottomWidth) solid var(--pf-c-menu__footer--after--BorderBottomColor);\n}\n\n:where(.pf-theme-dark) .pf-c-menu {\n  --pf-c-menu--BackgroundColor: var(--pf-global--BackgroundColor--300);\n  --pf-c-menu__list-item--hover--BackgroundColor: var(--pf-global--BackgroundColor--400);\n  --pf-c-menu__list-item--focus-within--BackgroundColor: var(--pf-global--BackgroundColor--400);\n  --pf-c-menu__list-item--m-disabled__item--Color: var(--pf-global--Color--200);\n  --pf-c-menu__group-title--FontWeight: var(--pf-global--FontWeight--bold);\n  --pf-c-menu__group-title--FontSize: var(--pf-global--FontSize--xs);\n}");
