import { _ as __rest } from './tslib.es6-e6488692.js';
import { r as react } from './index-7cda8b13.js';
import { c as css, h as formatBreakpointMods } from './util-badff3ce.js';

import('./description-list-b75c5c47.js');
var styles = {
  card: "pf-c-card",
  descriptionList: "pf-c-description-list",
  descriptionListDescription: "pf-c-description-list__description",
  descriptionListGroup: "pf-c-description-list__group",
  descriptionListTerm: "pf-c-description-list__term",
  descriptionListTermIcon: "pf-c-description-list__term-icon",
  descriptionListText: "pf-c-description-list__text",
  modifiers: {
    inlineGrid: "pf-m-inline-grid",
    autoColumnWidths: "pf-m-auto-column-widths",
    autoFit: "pf-m-auto-fit",
    compact: "pf-m-compact",
    fluid: "pf-m-fluid",
    fillColumns: "pf-m-fill-columns",
    displayLg: "pf-m-display-lg",
    display_2xl: "pf-m-display-2xl",
    helpText: "pf-m-help-text",
    "1Col": "pf-m-1-col",
    "2Col": "pf-m-2-col",
    "3Col": "pf-m-3-col",
    horizontal: "pf-m-horizontal",
    vertical: "pf-m-vertical",
    "1ColOnSm": "pf-m-1-col-on-sm",
    "2ColOnSm": "pf-m-2-col-on-sm",
    "3ColOnSm": "pf-m-3-col-on-sm",
    horizontalOnSm: "pf-m-horizontal-on-sm",
    verticalOnSm: "pf-m-vertical-on-sm",
    "1ColOnMd": "pf-m-1-col-on-md",
    "2ColOnMd": "pf-m-2-col-on-md",
    "3ColOnMd": "pf-m-3-col-on-md",
    horizontalOnMd: "pf-m-horizontal-on-md",
    verticalOnMd: "pf-m-vertical-on-md",
    "1ColOnLg": "pf-m-1-col-on-lg",
    "2ColOnLg": "pf-m-2-col-on-lg",
    "3ColOnLg": "pf-m-3-col-on-lg",
    horizontalOnLg: "pf-m-horizontal-on-lg",
    verticalOnLg: "pf-m-vertical-on-lg",
    "1ColOnXl": "pf-m-1-col-on-xl",
    "2ColOnXl": "pf-m-2-col-on-xl",
    "3ColOnXl": "pf-m-3-col-on-xl",
    horizontalOnXl: "pf-m-horizontal-on-xl",
    verticalOnXl: "pf-m-vertical-on-xl",
    "1ColOn_2xl": "pf-m-1-col-on-2xl",
    "2ColOn_2xl": "pf-m-2-col-on-2xl",
    "3ColOn_2xl": "pf-m-3-col-on-2xl",
    horizontalOn_2xl: "pf-m-horizontal-on-2xl",
    verticalOn_2xl: "pf-m-vertical-on-2xl"
  }
};

const setBreakpointModifiers = (prefix, modifiers) => {
    const mods = modifiers;
    return Object.keys(mods || {}).reduce((acc, curr) => curr === 'default' ? Object.assign(Object.assign({}, acc), { [prefix]: mods[curr] }) : Object.assign(Object.assign({}, acc), { [`${prefix}-on-${curr}`]: mods[curr] }), {});
};
const DescriptionList = (_a) => {
    var { className = '', children = null, isHorizontal = false, isAutoColumnWidths, isAutoFit, isInlineGrid, isCompact, isFluid, isFillColumns, columnModifier, autoFitMinModifier, horizontalTermWidthModifier, orientation, style } = _a, props = __rest(_a, ["className", "children", "isHorizontal", "isAutoColumnWidths", "isAutoFit", "isInlineGrid", "isCompact", "isFluid", "isFillColumns", "columnModifier", "autoFitMinModifier", "horizontalTermWidthModifier", "orientation", "style"]);
    if (isAutoFit && autoFitMinModifier) {
        style = Object.assign(Object.assign({}, style), setBreakpointModifiers('--pf-c-description-list--GridTemplateColumns--min', autoFitMinModifier));
    }
    if (isHorizontal && horizontalTermWidthModifier) {
        style = Object.assign(Object.assign({}, style), setBreakpointModifiers('--pf-c-description-list--m-horizontal__term--width', horizontalTermWidthModifier));
    }
    return (react.createElement("dl", Object.assign({ className: css(styles.descriptionList, (isHorizontal || isFluid) && styles.modifiers.horizontal, isAutoColumnWidths && styles.modifiers.autoColumnWidths, isAutoFit && styles.modifiers.autoFit, formatBreakpointMods(columnModifier, styles), formatBreakpointMods(orientation, styles), isInlineGrid && styles.modifiers.inlineGrid, isCompact && styles.modifiers.compact, isFluid && styles.modifiers.fluid, isFillColumns && styles.modifiers.fillColumns, className), style: style }, props), children));
};
DescriptionList.displayName = 'DescriptionList';

export { DescriptionList as D, styles as s };
