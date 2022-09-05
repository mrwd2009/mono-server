/** SNOWPACK INJECT STYLE: @patternfly/react-styles/css/components/Badge/badge.css */
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
__snowpack__injectStyle(".pf-c-badge {\n  --pf-c-badge--BorderRadius: var(--pf-global--BorderRadius--lg);\n  --pf-c-badge--FontSize: var(--pf-global--FontSize--xs);\n  --pf-c-badge--FontWeight: var(--pf-global--FontWeight--bold);\n  --pf-c-badge--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-badge--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-badge--Color: var(--pf-global--Color--dark-100);\n  --pf-c-badge--MinWidth: var(--pf-global--spacer--xl);\n  --pf-c-badge--m-read--BackgroundColor: var(--pf-global--BackgroundColor--200);\n  --pf-c-badge--m-read--Color: var(--pf-global--Color--dark-100);\n  --pf-c-badge--m-unread--BackgroundColor: var(--pf-global--primary-color--100);\n  --pf-c-badge--m-unread--Color: var(--pf-global--Color--light-100);\n  display: inline-block;\n  min-width: var(--pf-c-badge--MinWidth);\n  padding-right: var(--pf-c-badge--PaddingRight);\n  padding-left: var(--pf-c-badge--PaddingLeft);\n  font-size: var(--pf-c-badge--FontSize);\n  font-weight: var(--pf-c-badge--FontWeight);\n  color: var(--pf-c-badge--Color);\n  text-align: center;\n  background-color: var(--pf-c-badge--BackgroundColor);\n  border-radius: var(--pf-c-badge--BorderRadius);\n}\n.pf-c-badge.pf-m-read {\n  --pf-c-badge--Color: var(--pf-c-badge--m-read--Color);\n  --pf-c-badge--BackgroundColor: var(--pf-c-badge--m-read--BackgroundColor);\n}\n.pf-c-badge.pf-m-unread {\n  --pf-c-badge--Color: var(--pf-c-badge--m-unread--Color);\n  --pf-c-badge--BackgroundColor: var(--pf-c-badge--m-unread--BackgroundColor);\n}\n\n:where(.pf-theme-dark) .pf-c-badge {\n  --pf-c-badge--m-read--BackgroundColor: var(--pf-global--palette--black-500);\n  --pf-c-badge--m-unread--BackgroundColor: var(--pf-global--primary-color--300);\n}");
