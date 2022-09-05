import { _ as __rest, a as __awaiter } from '../common/tslib.es6-e6488692.js';
import { r as react } from '../common/index-7cda8b13.js';
import { c as css, b as capitalize, a as canUseDOM, s as setBreakpointCssVars, g as getUniqueId, f as findTabbableElements, d as fillTemplate, k as keyHandler, e as getNextIndex, h as formatBreakpointMods, i as debounce, j as getBreakpoint, l as isElementInView, p as pluralize, t as toCamel } from '../common/util-badff3ce.js';
export { b as capitalize } from '../common/util-badff3ce.js';
import { B as Button, c as ButtonVariant, u as useOUIAProps, b as Tooltip, K as KeyTypes, d as buttonStyles, e as getOUIAProps, f as getDefaultOUIAId, S as Spinner, V as ValidatedOptions, h as Popper, i as PopoverPosition, j as KEY_CODES, F as FocusTrap, P as Popover, s as styles$L, k as spinnerSize, l as useIsomorphicLayoutEffect, g as getResizeObserver, T as Title } from '../common/EmptyState-25333d4a.js';
export { B as Button, c as ButtonVariant, E as EmptyState, P as Popover, S as Spinner, T as Title, m as TitleSizes, b as Tooltip, V as ValidatedOptions } from '../common/EmptyState-25333d4a.js';
import { D as DropdownContext, T as Toggle, s as styles$J, a as DropdownSeparator, b as Divider, S as StarIcon, c as checkStyles, f as formStyles, d as formStyles$1, e as TextInput, A as AngleDownIcon, G as GripVerticalIcon, K as KeyboardHandler, C as Checkbox, g as styles$M, h as DropdownItem, i as DropdownWithContext, j as DropdownDirection } from '../common/grip-vertical-icon-708fff4f.js';
export { C as Checkbox, b as Divider, k as Dropdown, j as DropdownDirection, h as DropdownItem, m as DropdownPosition, a as DropdownSeparator, l as KebabToggle, e as TextInput } from '../common/grip-vertical-icon-708fff4f.js';
import { C as CheckCircleIcon, E as ExclamationCircleIcon, I as InfoCircleIcon, A as AngleRightIcon, a as CaretDownIcon, S as SearchIcon, b as ExternalLinkAltIcon, P as PlusIcon } from '../common/plus-icon-5492aca3.js';
import { c as createIcon, T as TimesIcon } from '../common/times-icon-8cdcb920.js';
import { r as reactDom } from '../common/index-916de6ed.js';
import { C as CheckIcon } from '../common/check-icon-2d19427f.js';
import { _ as __pika_web_default_export_for_treeshaking__ } from '../common/data-list-df22d447.js';
import { s as styles$K } from '../common/DescriptionList-b792a7da.js';
export { D as DescriptionList } from '../common/DescriptionList-b792a7da.js';
import { C as CopyIcon, D as Dropzone, f as fromEvent } from '../common/index-95f628e1.js';
export { a as EmptyStateBody, E as EmptyStateIcon, b as EmptyStateSecondaryActions } from '../common/index-95f628e1.js';
import '../common/_commonjsHelpers-4f955397.js';
import '../common/index-a264b8f3.js';

import('../common/backdrop-c5425a3e.js');
var styles = {
  backdrop: "pf-c-backdrop",
  backdropOpen: "pf-c-backdrop__open"
};

/** This Component can be used to wrap a functional component in order to generate a random ID
 * Example of how to use this component
 *
 * const Component = ({id}: {id: string}) => (
 *  <GenerateId>{randomId => (
 *     <div id={id || randomId}>
 *       div with random ID
 *     </div>
 *   )}
 *  </GenerateId>
 *  );
 */
let currentId = 0;
class GenerateId extends react.Component {
    constructor() {
        super(...arguments);
        this.id = `${this.props.prefix}${currentId++}`;
    }
    render() {
        return this.props.children(this.id);
    }
}
GenerateId.displayName = 'GenerateId';
GenerateId.defaultProps = {
    prefix: 'pf-random-id-'
};

const ASTERISK = '*';

import('../common/content-db14b33e.js');
var styles$1 = {
  content: "pf-c-content",
  modifiers: {
    visited: "pf-m-visited",
    overpassFont: "pf-m-overpass-font"
  }
};

const Backdrop = (_a) => {
    var { children = null, className = '' } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("div", Object.assign({}, props, { className: css(styles.backdrop, className) }), children));
};
Backdrop.displayName = 'Backdrop';

import('../common/action-list-5c34ec77.js');
var styles$2 = {
  actionList: "pf-c-action-list",
  actionListGroup: "pf-c-action-list__group",
  modifiers: {
    icons: "pf-m-icons"
  }
};

const ActionList = (_a) => {
    var { children, isIconList, className = '' } = _a, props = __rest(_a, ["children", "isIconList", "className"]);
    return (react.createElement("div", Object.assign({ className: css(styles$2.actionList, isIconList && styles$2.modifiers.icons, className) }, props), children));
};
ActionList.displayName = 'ActionList';

const ActionListItem = (_a) => {
    var { children, className = '' } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("div", Object.assign({ className: css('pf-c-action-list__item', className) }, props), children));
};
ActionListItem.displayName = 'ActionListItem';

import('../common/alert-fee3a586.js');
var styles$3 = {
  alert: "pf-c-alert",
  alertAction: "pf-c-alert__action",
  alertActionGroup: "pf-c-alert__action-group",
  alertDescription: "pf-c-alert__description",
  alertIcon: "pf-c-alert__icon",
  alertTitle: "pf-c-alert__title",
  alertToggle: "pf-c-alert__toggle",
  alertToggleIcon: "pf-c-alert__toggle-icon",
  button: "pf-c-button",
  modifiers: {
    success: "pf-m-success",
    danger: "pf-m-danger",
    warning: "pf-m-warning",
    info: "pf-m-info",
    inline: "pf-m-inline",
    plain: "pf-m-plain",
    expandable: "pf-m-expandable",
    expanded: "pf-m-expanded",
    truncate: "pf-m-truncate",
    overpassFont: "pf-m-overpass-font"
  },
  themeDark: "pf-theme-dark"
};

import('../common/accessibility-f16fb30b.js');
var a11yStyles = {
  hidden: "pf-u-hidden",
  hiddenOnLg: "pf-u-hidden-on-lg",
  hiddenOnMd: "pf-u-hidden-on-md",
  hiddenOnSm: "pf-u-hidden-on-sm",
  hiddenOnXl: "pf-u-hidden-on-xl",
  hiddenOn_2xl: "pf-u-hidden-on-2xl",
  screenReader: "pf-u-screen-reader",
  screenReaderOnLg: "pf-u-screen-reader-on-lg",
  screenReaderOnMd: "pf-u-screen-reader-on-md",
  screenReaderOnSm: "pf-u-screen-reader-on-sm",
  screenReaderOnXl: "pf-u-screen-reader-on-xl",
  screenReaderOn_2xl: "pf-u-screen-reader-on-2xl",
  visible: "pf-u-visible",
  visibleOnLg: "pf-u-visible-on-lg",
  visibleOnMd: "pf-u-visible-on-md",
  visibleOnSm: "pf-u-visible-on-sm",
  visibleOnXl: "pf-u-visible-on-xl",
  visibleOn_2xl: "pf-u-visible-on-2xl"
};

const ExclamationTriangleIconConfig = {
  name: 'ExclamationTriangleIcon',
  height: 512,
  width: 576,
  svgPath: 'M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z',
  yOffset: 0,
  xOffset: 0,
};

const ExclamationTriangleIcon = createIcon(ExclamationTriangleIconConfig);

const BellIconConfig = {
  name: 'BellIcon',
  height: 1024,
  width: 896,
  svgPath: 'M448,0 C465.333333,0 480.333333,6.33333333 493,19 C505.666667,31.6666667 512,46.6666667 512,64 L512,106 L514.23,106.45 C587.89,121.39 648.48,157.24 696,214 C744,271.333333 768,338.666667 768,416 C768,500 780,568.666667 804,622 C818.666667,652.666667 841.333333,684 872,716 C873.773676,718.829136 875.780658,721.505113 878,724 C890,737.333333 896,752.333333 896,769 C896,785.666667 890,800.333333 878,813 C866,825.666667 850.666667,832 832,832 L63.3,832 C44.9533333,831.84 29.8533333,825.506667 18,813 C6,800.333333 0,785.666667 0,769 C0,752.333333 6,737.333333 18,724 L24,716 L25.06,714.9 C55.1933333,683.28 77.5066667,652.313333 92,622 C116,568.666667 128,500 128,416 C128,338.666667 152,271.333333 200,214 C248,156.666667 309.333333,120.666667 384,106 L384,63.31 C384.166667,46.27 390.5,31.5 403,19 C415.666667,6.33333333 430.666667,0 448,0 Z M576,896 L576,897.08 C575.74,932.6 563.073333,962.573333 538,987 C512.666667,1011.66667 482.666667,1024 448,1024 C413.333333,1024 383.333333,1011.66667 358,987 C332.666667,962.333333 320,932 320,896 L576,896 Z',
  yOffset: 0,
  xOffset: 0,
};

const BellIcon = createIcon(BellIconConfig);

const variantIcons = {
    success: CheckCircleIcon,
    danger: ExclamationCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InfoCircleIcon,
    default: BellIcon
};
const AlertIcon = (_a) => {
    var { variant, customIcon, className = '' } = _a, props = __rest(_a, ["variant", "customIcon", "className"]);
    const Icon = variantIcons[variant];
    return (react.createElement("div", Object.assign({}, props, { className: css(styles$3.alertIcon, className) }), customIcon || react.createElement(Icon, null)));
};

const AlertContext = react.createContext(null);

const c_alert__title_max_lines = {
  "name": "--pf-c-alert__title--max-lines",
  "value": "1",
  "var": "var(--pf-c-alert__title--max-lines)"
};

const AlertToggleExpandButton = (_a) => {
    var { 'aria-label': ariaLabel, variantLabel, onToggleExpand, isExpanded } = _a, props = __rest(_a, ['aria-label', "variantLabel", "onToggleExpand", "isExpanded"]);
    const { title, variantLabel: alertVariantLabel } = react.useContext(AlertContext);
    return (react.createElement(Button, Object.assign({ variant: ButtonVariant.plain, onClick: onToggleExpand, "aria-expanded": isExpanded, "aria-label": ariaLabel === '' ? `Toggle ${variantLabel || alertVariantLabel} alert: ${title}` : ariaLabel }, props),
        react.createElement("span", { className: css(styles$3.alertToggleIcon) },
            react.createElement(AngleRightIcon, { "aria-hidden": "true" }))));
};
AlertToggleExpandButton.displayName = 'AlertToggleExpandButton';

var AlertVariant;
(function (AlertVariant) {
    AlertVariant["success"] = "success";
    AlertVariant["danger"] = "danger";
    AlertVariant["warning"] = "warning";
    AlertVariant["info"] = "info";
    AlertVariant["default"] = "default";
})(AlertVariant || (AlertVariant = {}));
const Alert = (_a) => {
    var { variant = AlertVariant.default, isInline = false, isPlain = false, isLiveRegion = false, variantLabel = `${capitalize(variant)} alert:`, 'aria-label': ariaLabel = `${capitalize(variant)} Alert`, actionClose, actionLinks, title, titleHeadingLevel: TitleHeadingLevel = 'h4', children = '', className = '', ouiaId, ouiaSafe = true, timeout = false, timeoutAnimation = 3000, onTimeout = () => { }, truncateTitle = 0, tooltipPosition, customIcon, isExpandable = false, toggleAriaLabel = `${capitalize(variant)} alert details`, onMouseEnter = () => { }, onMouseLeave = () => { } } = _a, props = __rest(_a, ["variant", "isInline", "isPlain", "isLiveRegion", "variantLabel", 'aria-label', "actionClose", "actionLinks", "title", "titleHeadingLevel", "children", "className", "ouiaId", "ouiaSafe", "timeout", "timeoutAnimation", "onTimeout", "truncateTitle", "tooltipPosition", "customIcon", "isExpandable", "toggleAriaLabel", "onMouseEnter", "onMouseLeave"]);
    const ouiaProps = useOUIAProps(Alert.displayName, ouiaId, ouiaSafe, variant);
    const getHeadingContent = (react.createElement(react.Fragment, null,
        react.createElement("span", { className: css(a11yStyles.screenReader) }, variantLabel),
        title));
    const titleRef = react.useRef(null);
    const divRef = react.useRef();
    const [isTooltipVisible, setIsTooltipVisible] = react.useState(false);
    react.useEffect(() => {
        if (!titleRef.current || !truncateTitle) {
            return;
        }
        titleRef.current.style.setProperty(c_alert__title_max_lines.name, truncateTitle.toString());
        const showTooltip = titleRef.current && titleRef.current.offsetHeight < titleRef.current.scrollHeight;
        if (isTooltipVisible !== showTooltip) {
            setIsTooltipVisible(showTooltip);
        }
    }, [titleRef, truncateTitle, isTooltipVisible]);
    const [timedOut, setTimedOut] = react.useState(false);
    const [timedOutAnimation, setTimedOutAnimation] = react.useState(true);
    const [isMouseOver, setIsMouseOver] = react.useState();
    const [containsFocus, setContainsFocus] = react.useState();
    const dismissed = timedOut && timedOutAnimation && !isMouseOver && !containsFocus;
    react.useEffect(() => {
        timeout = timeout === true ? 8000 : Number(timeout);
        if (timeout > 0) {
            const timer = setTimeout(() => setTimedOut(true), timeout);
            return () => clearTimeout(timer);
        }
    }, []);
    react.useEffect(() => {
        const onDocumentFocus = () => {
            if (divRef.current) {
                if (divRef.current.contains(document.activeElement)) {
                    setContainsFocus(true);
                    setTimedOutAnimation(false);
                }
                else if (containsFocus) {
                    setContainsFocus(false);
                }
            }
        };
        document.addEventListener('focus', onDocumentFocus, true);
        return () => document.removeEventListener('focus', onDocumentFocus, true);
    }, [containsFocus]);
    react.useEffect(() => {
        if (containsFocus === false || isMouseOver === false) {
            const timer = setTimeout(() => setTimedOutAnimation(true), timeoutAnimation);
            return () => clearTimeout(timer);
        }
    }, [containsFocus, isMouseOver]);
    react.useEffect(() => {
        dismissed && onTimeout();
    }, [dismissed]);
    const [isExpanded, setIsExpanded] = react.useState(false);
    const onToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const myOnMouseEnter = (ev) => {
        setIsMouseOver(true);
        setTimedOutAnimation(false);
        onMouseEnter(ev);
    };
    const myOnMouseLeave = (ev) => {
        setIsMouseOver(false);
        onMouseLeave(ev);
    };
    if (dismissed) {
        return null;
    }
    const Title = (react.createElement(TitleHeadingLevel, Object.assign({}, (isTooltipVisible && { tabIndex: 0 }), { ref: titleRef, className: css(styles$3.alertTitle, truncateTitle && styles$3.modifiers.truncate) }), getHeadingContent));
    return (react.createElement("div", Object.assign({ ref: divRef, className: css(styles$3.alert, isInline && styles$3.modifiers.inline, isPlain && styles$3.modifiers.plain, isExpandable && styles$3.modifiers.expandable, isExpanded && styles$3.modifiers.expanded, styles$3.modifiers[variant], className), "aria-label": ariaLabel }, ouiaProps, (isLiveRegion && {
        'aria-live': 'polite',
        'aria-atomic': 'false'
    }), { onMouseEnter: myOnMouseEnter, onMouseLeave: myOnMouseLeave }, props),
        isExpandable && (react.createElement(AlertContext.Provider, { value: { title, variantLabel } },
            react.createElement("div", { className: css(styles$3.alertToggle) },
                react.createElement(AlertToggleExpandButton, { isExpanded: isExpanded, onToggleExpand: onToggleExpand, "aria-label": toggleAriaLabel })))),
        react.createElement(AlertIcon, { variant: variant, customIcon: customIcon }),
        isTooltipVisible ? (react.createElement(Tooltip, { content: getHeadingContent, position: tooltipPosition }, Title)) : (Title),
        actionClose && (react.createElement(AlertContext.Provider, { value: { title, variantLabel } },
            react.createElement("div", { className: css(styles$3.alertAction) }, actionClose))),
        children && (!isExpandable || (isExpandable && isExpanded)) && (react.createElement("div", { className: css(styles$3.alertDescription) }, children)),
        actionLinks && react.createElement("div", { className: css(styles$3.alertActionGroup) }, actionLinks)));
};
Alert.displayName = 'Alert';

const AlertActionCloseButton = (_a) => {
    var { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className = '', onClose = () => undefined, 'aria-label': ariaLabel = '', variantLabel } = _a, props = __rest(_a, ["className", "onClose", 'aria-label', "variantLabel"]);
    return (react.createElement(AlertContext.Consumer, null, ({ title, variantLabel: alertVariantLabel }) => (react.createElement(Button, Object.assign({ variant: ButtonVariant.plain, onClick: onClose, "aria-label": ariaLabel === '' ? `Close ${variantLabel || alertVariantLabel} alert: ${title}` : ariaLabel }, props),
        react.createElement(TimesIcon, null)))));
};
AlertActionCloseButton.displayName = 'AlertActionCloseButton';

const AlertActionLink = (_a) => {
    var { className = '', children } = _a, props = __rest(_a, ["className", "children"]);
    return (react.createElement(Button, Object.assign({ variant: ButtonVariant.link, isInline: true, className: className }, props), children));
};
AlertActionLink.displayName = 'AlertActionLink';

import('../common/alert-group-8bac5c32.js');
var styles$4 = {
  alertGroup: "pf-c-alert-group",
  alertGroupOverflowButton: "pf-c-alert-group__overflow-button",
  modifiers: {
    toast: "pf-m-toast"
  }
};

const AlertGroupInline = (_a) => {
    var { className, children, isToast, isLiveRegion, onOverflowClick, overflowMessage } = _a, rest = __rest(_a, ["className", "children", "isToast", "isLiveRegion", "onOverflowClick", "overflowMessage"]);
    return (react.createElement("ul", Object.assign({ "aria-live": isLiveRegion ? 'polite' : null, "aria-atomic": isLiveRegion ? false : null, className: css(styles$4.alertGroup, className, isToast ? styles$4.modifiers.toast : '') }, rest),
        react.Children.toArray(children).map((Alert, index) => (react.createElement("li", { key: index }, Alert))),
        overflowMessage && (react.createElement("li", null,
            react.createElement("button", { onClick: onOverflowClick, className: css(styles$4.alertGroupOverflowButton) }, overflowMessage)))));
};
AlertGroupInline.displayName = 'AlertGroupInline';

class AlertGroup extends react.Component {
    constructor() {
        super(...arguments);
        this.state = {
            container: undefined
        };
    }
    componentDidMount() {
        const container = document.createElement('div');
        const target = this.getTargetElement();
        this.setState({ container });
        target.appendChild(container);
    }
    componentWillUnmount() {
        const target = this.getTargetElement();
        if (this.state.container) {
            target.removeChild(this.state.container);
        }
    }
    getTargetElement() {
        const appendTo = this.props.appendTo;
        if (typeof appendTo === 'function') {
            return appendTo();
        }
        return appendTo || document.body;
    }
    render() {
        const _a = this.props, { className, children, isToast, isLiveRegion, onOverflowClick, overflowMessage } = _a, props = __rest(_a, ["className", "children", "isToast", "isLiveRegion", "onOverflowClick", "overflowMessage"]);
        const alertGroup = (react.createElement(AlertGroupInline, Object.assign({ onOverflowClick: onOverflowClick, className: className, isToast: isToast, isLiveRegion: isLiveRegion, overflowMessage: overflowMessage }, props), children));
        if (!this.props.isToast) {
            return alertGroup;
        }
        const container = this.state.container;
        if (!canUseDOM || !container) {
            return null;
        }
        return reactDom.createPortal(alertGroup, container);
    }
}
AlertGroup.displayName = 'AlertGroup';

const DropdownGroup = (_a) => {
    var { children = null, className = '', label = '' } = _a, props = __rest(_a, ["children", "className", "label"]);
    return (react.createElement(DropdownContext.Consumer, null, ({ sectionClass, sectionTitleClass, sectionComponent }) => {
        const SectionComponent = sectionComponent;
        return (react.createElement(SectionComponent, Object.assign({ className: css(sectionClass, className) }, props),
            label && (react.createElement("h1", { className: css(sectionTitleClass), "aria-hidden": true }, label)),
            react.createElement("ul", { role: "none" }, children)));
    }));
};
DropdownGroup.displayName = 'DropdownGroup';

import('../common/badge-2e6ba236.js');
var badgeStyles = {
  badge: "pf-c-badge",
  modifiers: {
    read: "pf-m-read",
    unread: "pf-m-unread"
  },
  themeDark: "pf-theme-dark"
};

const Badge = (_a) => {
    var { isRead = false, className = '', children = '' } = _a, props = __rest(_a, ["isRead", "className", "children"]);
    return (react.createElement("span", Object.assign({}, props, { className: css(badgeStyles.badge, (isRead ? badgeStyles.modifiers.read : badgeStyles.modifiers.unread), className) }), children));
};
Badge.displayName = 'Badge';

const DropdownToggle = (_a) => {
    var { id = '', children = null, className = '', isOpen = false, parentRef = null, getMenuRef = null, isDisabled = false, isPlain = false, isText = false, isPrimary = false, toggleVariant = 'default', 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isActive = false, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onToggle = (_isOpen) => undefined, icon = null, toggleIndicator: ToggleIndicator = CaretDownIcon, splitButtonItems, splitButtonVariant = 'checkbox', 'aria-haspopup': ariaHasPopup, ouiaId, ouiaSafe, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref } = _a, // Types of Ref are different for React.FunctionComponent vs React.Component
    props = __rest(_a, ["id", "children", "className", "isOpen", "parentRef", "getMenuRef", "isDisabled", "isPlain", "isText", "isPrimary", "toggleVariant", "isActive", "onToggle", "icon", "toggleIndicator", "splitButtonItems", "splitButtonVariant", 'aria-haspopup', "ouiaId", "ouiaSafe", "ref"]);
    const ouiaProps = useOUIAProps(DropdownToggle.displayName, ouiaId, ouiaSafe);
    const toggle = (react.createElement(DropdownContext.Consumer, null, ({ toggleTextClass, toggleIndicatorClass, toggleIconClass }) => (react.createElement(Toggle, Object.assign({}, props, { id: id, className: className, isOpen: isOpen, parentRef: parentRef, getMenuRef: getMenuRef, isActive: isActive, isDisabled: isDisabled, isPlain: isPlain, isText: isText, isPrimary: isPrimary, toggleVariant: toggleVariant, onToggle: onToggle, "aria-haspopup": ariaHasPopup }, ouiaProps, (splitButtonItems && { isSplitButton: true, 'aria-label': props['aria-label'] || 'Select' })),
        icon && react.createElement("span", { className: css(toggleIconClass) }, icon),
        children && react.createElement("span", { className: ToggleIndicator && css(toggleTextClass) }, children),
        ToggleIndicator && (react.createElement("span", { className: css(!splitButtonItems && toggleIndicatorClass) },
            react.createElement(ToggleIndicator, null)))))));
    if (splitButtonItems) {
        return (react.createElement("div", { className: css(styles$J.dropdownToggle, styles$J.modifiers.splitButton, splitButtonVariant === 'action' && styles$J.modifiers.action, (toggleVariant === 'primary' || isPrimary) && splitButtonVariant === 'action' && styles$J.modifiers.primary, isDisabled && styles$J.modifiers.disabled) },
            splitButtonItems,
            toggle));
    }
    return toggle;
};
DropdownToggle.displayName = 'DropdownToggle';

const ApplicationLauncherSeparator = (_a) => {
    var props = __rest(_a, ["children"]);
    return react.createElement(DropdownSeparator, Object.assign({}, props));
};
ApplicationLauncherSeparator.displayName = 'ApplicationLauncherSeparator';

/**
 * This function is a helper for creating an array of renderable favorite items for the Application launcher or Select
 *
 * @param {object} items The items rendered in Select or Application aLauncher
 * @param {boolean} isGrouped Flag indicating if items are grouped
 * @param {any[]} favorites Array of ids of favorited items
 * @param {boolean} isEnterTriggersArrowDown Flag indicating if we should add isEnterTriggersArrowDown to favorited item
 */
const createRenderableFavorites = (items, isGrouped, favorites, isEnterTriggersArrowDown) => {
    if (isGrouped) {
        const favoriteItems = [];
        items.forEach(group => {
            if (favorites.length > 0) {
                return (group.props.children &&
                    group.props.children
                        .filter(item => favorites.includes(item.props.id))
                        .map(item => {
                        if (isEnterTriggersArrowDown) {
                            return favoriteItems.push(react.cloneElement(item, {
                                isFavorite: true,
                                enterTriggersArrowDown: isEnterTriggersArrowDown,
                                id: `favorite-${item.props.id}`
                            }));
                        }
                        else {
                            return favoriteItems.push(react.cloneElement(item, { isFavorite: true, id: `favorite-${item.props.id}` }));
                        }
                    }));
            }
        });
        return favoriteItems;
    }
    return items
        .filter(item => favorites.includes(item.props.id))
        .map(item => react.cloneElement(item, { isFavorite: true, enterTriggersArrowDown: isEnterTriggersArrowDown }));
};
/**
 * This function is a helper for extending the array of renderable favorite with the select/application launcher items to  render in the Application launcher or Select
 *
 * @param {object} items The items rendered in Select or Application aLauncher
 * @param {boolean} isGrouped Flag indicating if items are grouped
 * @param {any[]} favorites Array of ids of favorited items
 */
const extendItemsWithFavorite = (items, isGrouped, favorites) => {
    if (isGrouped) {
        return items.map(group => react.cloneElement(group, {
            children: react.Children.map(group.props.children, item => {
                if (item.type === ApplicationLauncherSeparator || item.type === Divider) {
                    return item;
                }
                return react.cloneElement(item, {
                    isFavorite: favorites.some(favoriteId => favoriteId === item.props.id || `favorite-${favoriteId}` === item.props.id)
                });
            })
        }));
    }
    return items.map(item => react.cloneElement(item, {
        isFavorite: favorites.some(favoriteId => favoriteId === item.props.id)
    }));
};

import('../common/avatar-2e9bbadd.js');
var styles$5 = {
  avatar: "pf-c-avatar",
  modifiers: {
    light: "pf-m-light",
    dark: "pf-m-dark",
    sm: "pf-m-sm",
    md: "pf-m-md",
    lg: "pf-m-lg",
    xl: "pf-m-xl"
  }
};

const Avatar = (_a) => {
    var { className = '', src = '', alt, border, size } = _a, props = __rest(_a, ["className", "src", "alt", "border", "size"]);
    return (react.createElement("img", Object.assign({ src: src, alt: alt, className: css(styles$5.avatar, styles$5.modifiers[size], border === 'light' && styles$5.modifiers.light, border === 'dark' && styles$5.modifiers.dark, className) }, props)));
};
Avatar.displayName = 'Avatar';

const AngleUpIconConfig = {
  name: 'AngleUpIcon',
  height: 512,
  width: 320,
  svgPath: 'M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z',
  yOffset: 0,
  xOffset: 0,
};

const AngleUpIcon = createIcon(AngleUpIconConfig);

import('../common/brand-c6430392.js');
var styles$6 = {
  brand: "pf-c-brand",
  modifiers: {
    picture: "pf-m-picture"
  }
};

const Brand = (_a) => {
    var { className = '', src = '', alt, children, widths, heights, style } = _a, props = __rest(_a, ["className", "src", "alt", "children", "widths", "heights", "style"]);
    if (children !== undefined && widths !== undefined) {
        style = Object.assign(Object.assign({}, style), setBreakpointCssVars(widths, '--pf-c-brand--Width'));
    }
    if (children !== undefined && heights !== undefined) {
        style = Object.assign(Object.assign({}, style), setBreakpointCssVars(heights, '--pf-c-brand--Height'));
    }
    return (
    /** the brand component currently contains no styling the 'pf-c-brand' string will be used for the className */
    children !== undefined ? (react.createElement("picture", Object.assign({ className: css(styles$6.brand, styles$6.modifiers.picture, className), style: style }, props),
        children,
        react.createElement("img", { src: src, alt: alt }))) : (react.createElement("img", Object.assign({}, props, { className: css(styles$6.brand, className), src: src, alt: alt }))));
};
Brand.displayName = 'Brand';

import('../common/breadcrumb-7f029261.js');
var styles$7 = {
  breadcrumb: "pf-c-breadcrumb",
  breadcrumbDropdown: "pf-c-breadcrumb__dropdown",
  breadcrumbHeading: "pf-c-breadcrumb__heading",
  breadcrumbItem: "pf-c-breadcrumb__item",
  breadcrumbItemDivider: "pf-c-breadcrumb__item-divider",
  breadcrumbLink: "pf-c-breadcrumb__link",
  breadcrumbList: "pf-c-breadcrumb__list",
  dropdownToggle: "pf-c-dropdown__toggle",
  modifiers: {
    current: "pf-m-current",
    overpassFont: "pf-m-overpass-font"
  },
  themeDark: "pf-theme-dark"
};

const Breadcrumb = (_a) => {
    var { children = null, className = '', 'aria-label': ariaLabel = 'Breadcrumb', ouiaId, ouiaSafe = true } = _a, props = __rest(_a, ["children", "className", 'aria-label', "ouiaId", "ouiaSafe"]);
    const ouiaProps = useOUIAProps(Breadcrumb.displayName, ouiaId, ouiaSafe);
    return (react.createElement("nav", Object.assign({}, props, { "aria-label": ariaLabel, className: css(styles$7.breadcrumb, className) }, ouiaProps),
        react.createElement("ol", { className: styles$7.breadcrumbList }, react.Children.map(children, (child, index) => {
            const showDivider = index > 0;
            if (react.isValidElement(child)) {
                return react.cloneElement(child, { showDivider });
            }
            return child;
        }))));
};
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbItem = (_a) => {
    var { children = null, className: classNameProp = '', to = undefined, isActive = false, isDropdown = false, showDivider, target = undefined, component = 'a', render = undefined } = _a, props = __rest(_a, ["children", "className", "to", "isActive", "isDropdown", "showDivider", "target", "component", "render"]);
    const Component = component;
    const ariaCurrent = isActive ? 'page' : undefined;
    const className = css(styles$7.breadcrumbLink, isActive && styles$7.modifiers.current);
    return (react.createElement("li", Object.assign({}, props, { className: css(styles$7.breadcrumbItem, classNameProp) }),
        showDivider && (react.createElement("span", { className: styles$7.breadcrumbItemDivider },
            react.createElement(AngleRightIcon, null))),
        component === 'button' && (react.createElement("button", { className: className, "aria-current": ariaCurrent, type: "button" }, children)),
        isDropdown && react.createElement("span", { className: css(styles$7.breadcrumbDropdown) }, children),
        render && render({ className, ariaCurrent }),
        to && !render && (react.createElement(Component, { href: to, target: target, className: className, "aria-current": ariaCurrent }, children)),
        !to && component !== 'button' && !isDropdown && children));
};
BreadcrumbItem.displayName = 'BreadcrumbItem';

import('../common/select-e8f94b9c.js');
var styles$8 = {
  check: "pf-c-check",
  checkLabel: "pf-c-check__label",
  chipGroup: "pf-c-chip-group",
  divider: "pf-c-divider",
  formControl: "pf-c-form-control",
  modifiers: {
    invalid: "pf-m-invalid",
    success: "pf-m-success",
    warning: "pf-m-warning",
    disabled: "pf-m-disabled",
    active: "pf-m-active",
    expanded: "pf-m-expanded",
    plain: "pf-m-plain",
    typeahead: "pf-m-typeahead",
    placeholder: "pf-m-placeholder",
    top: "pf-m-top",
    alignRight: "pf-m-align-right",
    favorite: "pf-m-favorite",
    favoriteAction: "pf-m-favorite-action",
    focus: "pf-m-focus",
    link: "pf-m-link",
    action: "pf-m-action",
    selected: "pf-m-selected",
    description: "pf-m-description",
    load: "pf-m-load",
    loading: "pf-m-loading"
  },
  select: "pf-c-select",
  selectListItem: "pf-c-select__list-item",
  selectMenu: "pf-c-select__menu",
  selectMenuFieldset: "pf-c-select__menu-fieldset",
  selectMenuFooter: "pf-c-select__menu-footer",
  selectMenuGroup: "pf-c-select__menu-group",
  selectMenuGroupTitle: "pf-c-select__menu-group-title",
  selectMenuItem: "pf-c-select__menu-item",
  selectMenuItemActionIcon: "pf-c-select__menu-item-action-icon",
  selectMenuItemCount: "pf-c-select__menu-item-count",
  selectMenuItemDescription: "pf-c-select__menu-item-description",
  selectMenuItemIcon: "pf-c-select__menu-item-icon",
  selectMenuItemMain: "pf-c-select__menu-item-main",
  selectMenuItemMatch: "pf-c-select__menu-item--match",
  selectMenuItemRow: "pf-c-select__menu-item-row",
  selectMenuItemText: "pf-c-select__menu-item-text",
  selectMenuSearch: "pf-c-select__menu-search",
  selectMenuWrapper: "pf-c-select__menu-wrapper",
  selectToggle: "pf-c-select__toggle",
  selectToggleArrow: "pf-c-select__toggle-arrow",
  selectToggleBadge: "pf-c-select__toggle-badge",
  selectToggleButton: "pf-c-select__toggle-button",
  selectToggleClear: "pf-c-select__toggle-clear",
  selectToggleIcon: "pf-c-select__toggle-icon",
  selectToggleStatusIcon: "pf-c-select__toggle-status-icon",
  selectToggleText: "pf-c-select__toggle-text",
  selectToggleTypeahead: "pf-c-select__toggle-typeahead",
  selectToggleWrapper: "pf-c-select__toggle-wrapper",
  themeDark: "pf-theme-dark"
};

const TimesCircleIconConfig = {
  name: 'TimesCircleIcon',
  height: 512,
  width: 512,
  svgPath: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z',
  yOffset: 0,
  xOffset: 0,
};

const TimesCircleIcon = createIcon(TimesCircleIconConfig);

const SelectContext = react.createContext(null);
const SelectProvider = SelectContext.Provider;
const SelectConsumer = SelectContext.Consumer;
var SelectVariant;
(function (SelectVariant) {
    SelectVariant["single"] = "single";
    SelectVariant["checkbox"] = "checkbox";
    SelectVariant["typeahead"] = "typeahead";
    SelectVariant["typeaheadMulti"] = "typeaheadmulti";
})(SelectVariant || (SelectVariant = {}));
var SelectPosition;
(function (SelectPosition) {
    SelectPosition["right"] = "right";
    SelectPosition["left"] = "left";
})(SelectPosition || (SelectPosition = {}));
var SelectDirection;
(function (SelectDirection) {
    SelectDirection["up"] = "up";
    SelectDirection["down"] = "down";
})(SelectDirection || (SelectDirection = {}));
const SelectFooterTabbableItems = 'input, button, select, textarea, a[href]';

class SelectOption extends react.Component {
    constructor() {
        super(...arguments);
        this.ref = react.createRef();
        this.liRef = react.createRef();
        this.favoriteRef = react.createRef();
        this.onKeyDown = (event, innerIndex, onEnter, isCheckbox) => {
            const { index, keyHandler, isLastOptionBeforeFooter } = this.props;
            let isLastItemBeforeFooter = false;
            if (isLastOptionBeforeFooter !== undefined) {
                isLastItemBeforeFooter = isLastOptionBeforeFooter(index);
            }
            if (event.key === KeyTypes.Tab) {
                // More modal-like experience for checkboxes
                if (isCheckbox && !isLastItemBeforeFooter) {
                    if (event.shiftKey) {
                        keyHandler(index, innerIndex, 'up');
                    }
                    else {
                        keyHandler(index, innerIndex, 'down');
                    }
                    event.stopPropagation();
                }
                else {
                    if (event.shiftKey) {
                        keyHandler(index, innerIndex, 'up');
                    }
                    else {
                        keyHandler(index, innerIndex, 'tab');
                    }
                }
            }
            event.preventDefault();
            if (event.key === KeyTypes.ArrowUp) {
                keyHandler(index, innerIndex, 'up');
            }
            else if (event.key === KeyTypes.ArrowDown) {
                keyHandler(index, innerIndex, 'down');
            }
            else if (event.key === KeyTypes.ArrowLeft) {
                keyHandler(index, innerIndex, 'left');
            }
            else if (event.key === KeyTypes.ArrowRight) {
                keyHandler(index, innerIndex, 'right');
            }
            else if (event.key === KeyTypes.Enter) {
                if (onEnter !== undefined) {
                    onEnter();
                }
                else {
                    this.ref.current.click();
                }
            }
        };
    }
    componentDidMount() {
        this.props.sendRef(this.props.isDisabled ? null : this.ref.current, this.props.isDisabled ? null : this.favoriteRef.current, this.props.isDisabled ? null : this.liRef.current, this.props.index);
    }
    componentDidUpdate() {
        this.props.sendRef(this.props.isDisabled ? null : this.ref.current, this.props.isDisabled ? null : this.favoriteRef.current, this.props.isDisabled ? null : this.liRef.current, this.props.index);
    }
    render() {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const _a = this.props, { children, className, id, description, itemCount, value, onClick, isDisabled, isPlaceholder, isNoResultsOption, isSelected, isChecked, isFocused, sendRef, keyHandler, index, component, inputId, isFavorite, ariaIsFavoriteLabel = 'starred', ariaIsNotFavoriteLabel = 'not starred', isLoad, isLoading, setViewMoreNextIndex, 
        // eslint-disable-next-line no-console
        isLastOptionBeforeFooter, isGrouped = false } = _a, props = __rest(_a, ["children", "className", "id", "description", "itemCount", "value", "onClick", "isDisabled", "isPlaceholder", "isNoResultsOption", "isSelected", "isChecked", "isFocused", "sendRef", "keyHandler", "index", "component", "inputId", "isFavorite", "ariaIsFavoriteLabel", "ariaIsNotFavoriteLabel", "isLoad", "isLoading", "setViewMoreNextIndex", "isLastOptionBeforeFooter", "isGrouped"]);
        /* eslint-enable @typescript-eslint/no-unused-vars */
        const Component = component;
        if (!id && isFavorite !== null) {
            // eslint-disable-next-line no-console
            console.error('Please provide an id to use the favorites feature.');
        }
        const generatedId = id || getUniqueId('select-option');
        const favoriteButton = (onFavorite) => (react.createElement("button", { className: css(styles$8.selectMenuItem, styles$8.modifiers.action, styles$8.modifiers.favoriteAction), "aria-label": isFavorite ? ariaIsFavoriteLabel : ariaIsNotFavoriteLabel, onClick: () => {
                onFavorite(generatedId.replace('favorite-', ''), isFavorite);
            }, onKeyDown: event => {
                this.onKeyDown(event, 1, () => onFavorite(generatedId.replace('favorite-', ''), isFavorite));
            }, ref: this.favoriteRef },
            react.createElement("span", { className: css(styles$8.selectMenuItemActionIcon) },
                react.createElement(StarIcon, null))));
        const itemDisplay = itemCount ? (react.createElement("span", { className: css(styles$8.selectMenuItemRow) },
            react.createElement("span", { className: css(styles$8.selectMenuItemText) }, children || (value && value.toString && value.toString())),
            react.createElement("span", { className: css(styles$8.selectMenuItemCount) }, itemCount))) : (children || value.toString());
        const onViewMoreClick = (event) => {
            // Set the index for the next item to focus after view more clicked, then call view more callback
            setViewMoreNextIndex();
            onClick(event);
        };
        const renderOption = (onSelect, onClose, variant, inputIdPrefix, onFavorite, shouldResetOnSelect) => {
            if (variant !== SelectVariant.checkbox && isLoading && isGrouped) {
                return (react.createElement("div", { role: "presentation", className: css(styles$8.selectListItem, isLoading && styles$8.modifiers.loading, className) }, children));
            }
            else if (variant !== SelectVariant.checkbox && isLoad && isGrouped) {
                return (react.createElement("div", null,
                    react.createElement("button", Object.assign({}, props, { role: "presentation", className: css(styles$8.selectMenuItem, styles$8.modifiers.load, className), onClick: (event) => {
                            onViewMoreClick(event);
                            event.stopPropagation();
                        }, ref: this.ref, type: "button" }), children || value.toString())));
            }
            else if (variant !== SelectVariant.checkbox) {
                return (react.createElement("li", { id: generatedId, role: "presentation", className: css(isLoading && styles$8.selectListItem, !isLoading && styles$8.selectMenuWrapper, isFavorite && styles$8.modifiers.favorite, isFocused && styles$8.modifiers.focus, isLoading && styles$8.modifiers.loading), ref: this.liRef },
                    isLoading && children,
                    isLoad && !isGrouped && (react.createElement("button", Object.assign({}, props, { className: css(styles$8.selectMenuItem, styles$8.modifiers.load, className), onClick: (event) => {
                            onViewMoreClick(event);
                            event.stopPropagation();
                        }, ref: this.ref, onKeyDown: (event) => {
                            this.onKeyDown(event, 0);
                        }, type: "button" }), itemDisplay)),
                    !isLoading && !isLoad && (react.createElement(react.Fragment, null,
                        react.createElement(Component, Object.assign({}, props, { className: css(styles$8.selectMenuItem, isLoad && styles$8.modifiers.load, isSelected && styles$8.modifiers.selected, isDisabled && styles$8.modifiers.disabled, description && styles$8.modifiers.description, isFavorite !== null && styles$8.modifiers.link, className), onClick: (event) => {
                                if (!isDisabled) {
                                    onClick(event);
                                    onSelect(event, value, isPlaceholder);
                                    shouldResetOnSelect && onClose();
                                }
                            }, role: "option", "aria-selected": isSelected || null, ref: this.ref, onKeyDown: (event) => {
                                this.onKeyDown(event, 0);
                            }, type: "button" }),
                            description && (react.createElement(react.Fragment, null,
                                react.createElement("span", { className: css(styles$8.selectMenuItemMain) },
                                    itemDisplay,
                                    isSelected && (react.createElement("span", { className: css(styles$8.selectMenuItemIcon) },
                                        react.createElement(CheckIcon, { "aria-hidden": true })))),
                                react.createElement("span", { className: css(styles$8.selectMenuItemDescription) }, description))),
                            !description && (react.createElement(react.Fragment, null,
                                itemDisplay,
                                isSelected && (react.createElement("span", { className: css(styles$8.selectMenuItemIcon) },
                                    react.createElement(CheckIcon, { "aria-hidden": true })))))),
                        isFavorite !== null && id && favoriteButton(onFavorite)))));
            }
            else if (variant === SelectVariant.checkbox && isLoad) {
                return (react.createElement("button", { className: css(styles$8.selectMenuItem, styles$8.modifiers.load, isFocused && styles$8.modifiers.focus, className), onKeyDown: (event) => {
                        this.onKeyDown(event, 0, undefined, true);
                    }, onClick: (event) => {
                        onViewMoreClick(event);
                        event.stopPropagation();
                    }, ref: this.ref }, children || (value && value.toString && value.toString())));
            }
            else if (variant === SelectVariant.checkbox && isLoading) {
                return (react.createElement("div", { className: css(styles$8.selectListItem, isLoading && styles$8.modifiers.loading, className) }, children));
            }
            else if (variant === SelectVariant.checkbox && !isNoResultsOption && !isLoading && !isLoad) {
                return (react.createElement("label", Object.assign({}, props, { className: css(checkStyles.check, styles$8.selectMenuItem, isDisabled && styles$8.modifiers.disabled, description && styles$8.modifiers.description, className), onKeyDown: (event) => {
                        this.onKeyDown(event, 0, undefined, true);
                    } }),
                    react.createElement("input", { id: inputId || `${inputIdPrefix}-${value.toString()}`, className: css(checkStyles.checkInput), type: "checkbox", onChange: event => {
                            if (!isDisabled) {
                                onClick(event);
                                onSelect(event, value);
                            }
                        }, ref: this.ref, checked: isChecked || false, disabled: isDisabled }),
                    react.createElement("span", { className: css(checkStyles.checkLabel, isDisabled && styles$8.modifiers.disabled) }, itemDisplay),
                    description && react.createElement("div", { className: css(checkStyles.checkDescription) }, description)));
            }
            else if (variant === SelectVariant.checkbox && isNoResultsOption && !isLoading && !isLoad) {
                return (react.createElement("div", null,
                    react.createElement(Component, Object.assign({}, props, { className: css(styles$8.selectMenuItem, isSelected && styles$8.modifiers.selected, isDisabled && styles$8.modifiers.disabled, className), role: "option", "aria-selected": isSelected || null, ref: this.ref, onKeyDown: (event) => {
                            this.onKeyDown(event, 0, undefined, true);
                        }, type: "button" }), itemDisplay)));
            }
        };
        return (react.createElement(SelectConsumer, null, ({ onSelect, onClose, variant, inputIdPrefix, onFavorite, shouldResetOnSelect }) => (react.createElement(react.Fragment, null, renderOption(onSelect, onClose, variant, inputIdPrefix, onFavorite, shouldResetOnSelect)))));
    }
}
SelectOption.displayName = 'SelectOption';
SelectOption.defaultProps = {
    className: '',
    value: '',
    index: 0,
    isDisabled: false,
    isPlaceholder: false,
    isSelected: false,
    isChecked: false,
    isNoResultsOption: false,
    component: 'button',
    onClick: () => { },
    sendRef: () => { },
    keyHandler: () => { },
    inputId: '',
    isFavorite: null,
    isLoad: false,
    isLoading: false,
    setViewMoreNextIndex: () => { },
    isLastOptionBeforeFooter: () => false
};

const SelectGroup = (_a) => {
    var { children = [], className = '', label = '', titleId = '' } = _a, props = __rest(_a, ["children", "className", "label", "titleId"]);
    return (react.createElement(SelectConsumer, null, ({ variant }) => (react.createElement("div", Object.assign({}, props, { className: css(styles$8.selectMenuGroup, className) }),
        react.createElement("div", { className: css(styles$8.selectMenuGroupTitle), id: titleId, "aria-hidden": true }, label),
        variant === SelectVariant.checkbox ? children : react.createElement("ul", { role: "listbox" }, children)))));
};
SelectGroup.displayName = 'SelectGroup';

class SelectMenuWithRef extends react.Component {
    extendChildren(randomId) {
        const { children, hasInlineFilter, isGrouped } = this.props;
        const childrenArray = children;
        let index = hasInlineFilter ? 1 : 0;
        if (isGrouped) {
            return react.Children.map(childrenArray, (group) => {
                if (group.type === SelectGroup) {
                    return react.cloneElement(group, {
                        titleId: group.props.label && group.props.label.replace(/\W/g, '-'),
                        children: react.Children.map(group.props.children, (option) => this.cloneOption(option, index++, randomId))
                    });
                }
                else {
                    return this.cloneOption(group, index++, randomId);
                }
            });
        }
        return react.Children.map(childrenArray, (child) => this.cloneOption(child, index++, randomId));
    }
    cloneOption(child, index, randomId) {
        const { selected, sendRef, keyHandler } = this.props;
        const isSelected = this.checkForValue(child.props.value, selected);
        if (child.type === Divider) {
            return child;
        }
        return react.cloneElement(child, {
            inputId: `${randomId}-${index}`,
            isSelected,
            sendRef,
            keyHandler,
            index
        });
    }
    checkForValue(valueToCheck, options) {
        if (!options || !valueToCheck) {
            return false;
        }
        const isSelectOptionObject = typeof valueToCheck !== 'string' &&
            valueToCheck.toString &&
            valueToCheck.compareTo;
        if (Array.isArray(options)) {
            if (isSelectOptionObject) {
                return options.some(option => option.compareTo(valueToCheck));
            }
            else {
                return options.includes(valueToCheck);
            }
        }
        else {
            if (isSelectOptionObject) {
                return options.compareTo(valueToCheck);
            }
            else {
                return options === valueToCheck;
            }
        }
    }
    extendCheckboxChildren(children) {
        const { isGrouped, checked, sendRef, keyHandler, hasInlineFilter, isLastOptionBeforeFooter } = this.props;
        let index = hasInlineFilter ? 1 : 0;
        if (isGrouped) {
            return react.Children.map(children, (group) => {
                if (group.type === Divider) {
                    return group;
                }
                else if (group.type === SelectOption) {
                    return react.cloneElement(group, {
                        isChecked: this.checkForValue(group.props.value, checked),
                        sendRef,
                        keyHandler,
                        index: index++,
                        isLastOptionBeforeFooter
                    });
                }
                return react.cloneElement(group, {
                    titleId: group.props.label && group.props.label.replace(/\W/g, '-'),
                    children: group.props.children ? (react.createElement("fieldset", { "aria-labelledby": group.props.label && group.props.label.replace(/\W/g, '-'), className: css(styles$8.selectMenuFieldset) }, react.Children.map(group.props.children, (option) => option.type === Divider
                        ? option
                        : react.cloneElement(option, {
                            isChecked: this.checkForValue(option.props.value, checked),
                            sendRef,
                            keyHandler,
                            index: index++,
                            isLastOptionBeforeFooter
                        })))) : null
                });
            });
        }
        return react.Children.map(children, (child) => child.type === Divider
            ? child
            : react.cloneElement(child, {
                isChecked: this.checkForValue(child.props.value, checked),
                sendRef,
                keyHandler,
                index: index++,
                isLastOptionBeforeFooter
            }));
    }
    renderSelectMenu({ variant, inputIdPrefix }) {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const _a = this.props, { children, isCustomContent, className, isExpanded, openedOnEnter, selected, checked, isGrouped, position, sendRef, keyHandler, maxHeight, noResultsFoundText, createText, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, hasInlineFilter, innerRef, footer, footerRef, isLastOptionBeforeFooter } = _a, props = __rest(_a, ["children", "isCustomContent", "className", "isExpanded", "openedOnEnter", "selected", "checked", "isGrouped", "position", "sendRef", "keyHandler", "maxHeight", "noResultsFoundText", "createText", 'aria-label', 'aria-labelledby', "hasInlineFilter", "innerRef", "footer", "footerRef", "isLastOptionBeforeFooter"]);
        /* eslint-enable @typescript-eslint/no-unused-vars */
        let Component = 'div';
        const variantProps = Object.assign({ ref: innerRef, className: css(!footer ? styles$8.selectMenu : 'pf-c-select__menu-list', position === SelectPosition.right && styles$8.modifiers.alignRight, className) }, (maxHeight && { style: { maxHeight, overflow: 'auto' } }));
        const extendedChildren = () => variant === SelectVariant.checkbox
            ? this.extendCheckboxChildren(children)
            : this.extendChildren(inputIdPrefix);
        if (isCustomContent) {
            variantProps.children = children;
        }
        else if (hasInlineFilter) {
            if (react.Children.count(children) === 0) {
                variantProps.children = react.createElement("fieldset", { className: css(styles$8.selectMenuFieldset) });
            }
            else {
                variantProps.children = (react.createElement("fieldset", { "aria-label": ariaLabel, "aria-labelledby": (!ariaLabel && ariaLabelledBy) || null, className: css(formStyles.formFieldset) },
                    children.shift(),
                    extendedChildren()));
            }
        }
        else {
            variantProps.children = extendedChildren();
            if (!isGrouped) {
                Component = 'ul';
                variantProps.role = 'listbox';
                variantProps['aria-label'] = ariaLabel;
                variantProps['aria-labelledby'] = (!ariaLabel && ariaLabelledBy) || null;
            }
        }
        return (react.createElement(react.Fragment, null,
            react.createElement(Component, Object.assign({}, variantProps, props)),
            footer && (react.createElement("div", { className: css(styles$8.selectMenuFooter), ref: footerRef }, footer))));
    }
    render() {
        return react.createElement(SelectConsumer, null, context => this.renderSelectMenu(context));
    }
}
SelectMenuWithRef.displayName = 'SelectMenu';
SelectMenuWithRef.defaultProps = {
    className: '',
    isExpanded: false,
    isGrouped: false,
    openedOnEnter: false,
    selected: '',
    maxHeight: '',
    position: SelectPosition.left,
    sendRef: () => { },
    keyHandler: () => { },
    isCustomContent: false,
    hasInlineFilter: false,
    isLastOptionBeforeFooter: () => { }
};
const SelectMenu = react.forwardRef((props, ref) => (react.createElement(SelectMenuWithRef, Object.assign({ innerRef: ref }, props), props.children)));

class SelectToggle extends react.Component {
    constructor(props) {
        super(props);
        this.onDocClick = (event) => {
            const { parentRef, menuRef, footerRef, isOpen, onToggle, onClose } = this.props;
            const clickedOnToggle = parentRef && parentRef.current && parentRef.current.contains(event.target);
            const clickedWithinMenu = menuRef && menuRef.current && menuRef.current.contains && menuRef.current.contains(event.target);
            const clickedWithinFooter = footerRef && footerRef.current && footerRef.current.contains && footerRef.current.contains(event.target);
            if (isOpen && !(clickedOnToggle || clickedWithinMenu || clickedWithinFooter)) {
                onToggle(false, event);
                onClose();
            }
        };
        this.handleGlobalKeys = (event) => {
            const { parentRef, menuRef, hasFooter, footerRef, isOpen, variant, onToggle, onClose, moveFocusToLastMenuItem } = this.props;
            const escFromToggle = parentRef && parentRef.current && parentRef.current.contains(event.target);
            const escFromWithinMenu = menuRef && menuRef.current && menuRef.current.contains && menuRef.current.contains(event.target);
            if (isOpen &&
                event.key === KeyTypes.Tab &&
                (variant === SelectVariant.typeahead || variant === SelectVariant.typeaheadMulti)) {
                this.props.handleTypeaheadKeys('tab', event.shiftKey);
                event.preventDefault();
                return;
            }
            if (isOpen && event.key === KeyTypes.Tab && hasFooter) {
                const tabbableItems = findTabbableElements(footerRef, SelectFooterTabbableItems);
                // If no tabbable item in footer close select
                if (tabbableItems.length <= 0) {
                    onToggle(false, event);
                    onClose();
                    this.toggle.current.focus();
                    return;
                }
                else {
                    // if current element is not in footer, tab to first tabbable element in footer, or close if shift clicked
                    const currentElementIndex = tabbableItems.findIndex((item) => item === document.activeElement);
                    if (currentElementIndex === -1) {
                        if (event.shiftKey) {
                            if (variant !== 'checkbox') {
                                // only close non checkbox variation on shift clicked
                                onToggle(false, event);
                                onClose();
                                this.toggle.current.focus();
                            }
                        }
                        else {
                            // tab to footer
                            tabbableItems[0].focus();
                            return;
                        }
                    }
                    // Current element is in footer.
                    if (event.shiftKey) {
                        // Move focus back to menu if current tab index is 0
                        if (currentElementIndex === 0) {
                            moveFocusToLastMenuItem();
                            event.preventDefault();
                        }
                        return;
                    }
                    // Tab to next element in footer or close if there are none
                    if (currentElementIndex + 1 < tabbableItems.length) {
                        tabbableItems[currentElementIndex + 1].focus();
                    }
                    else {
                        // no more footer items close menu
                        onToggle(false, event);
                        onClose();
                        this.toggle.current.focus();
                    }
                    event.preventDefault();
                    return;
                }
            }
            if (isOpen &&
                (event.key === KeyTypes.Escape || event.key === KeyTypes.Tab) &&
                (escFromToggle || escFromWithinMenu)) {
                onToggle(false, event);
                onClose();
                this.toggle.current.focus();
            }
        };
        this.onKeyDown = (event) => {
            const { isOpen, onToggle, variant, onClose, onEnter, handleTypeaheadKeys } = this.props;
            if (variant === SelectVariant.typeahead || variant === SelectVariant.typeaheadMulti) {
                if (event.key === KeyTypes.ArrowDown || event.key === KeyTypes.ArrowUp) {
                    handleTypeaheadKeys((event.key === KeyTypes.ArrowDown && 'down') || (event.key === KeyTypes.ArrowUp && 'up'));
                    event.preventDefault();
                }
                else if (event.key === KeyTypes.Enter) {
                    if (isOpen) {
                        handleTypeaheadKeys('enter');
                    }
                    else {
                        onToggle(!isOpen, event);
                    }
                }
            }
            if (variant === SelectVariant.typeahead ||
                variant === SelectVariant.typeaheadMulti ||
                (event.key === KeyTypes.Tab && !isOpen) ||
                (event.key !== KeyTypes.Enter && event.key !== KeyTypes.Space)) {
                return;
            }
            event.preventDefault();
            if ((event.key === KeyTypes.Tab || event.key === KeyTypes.Enter || event.key === KeyTypes.Space) && isOpen) {
                onToggle(!isOpen, event);
                onClose();
                this.toggle.current.focus();
            }
            else if ((event.key === KeyTypes.Enter || event.key === KeyTypes.Space) && !isOpen) {
                onToggle(!isOpen, event);
                onEnter();
            }
        };
        const { variant } = props;
        const isTypeahead = variant === SelectVariant.typeahead || variant === SelectVariant.typeaheadMulti;
        this.toggle = isTypeahead ? react.createRef() : react.createRef();
    }
    componentDidMount() {
        document.addEventListener('click', this.onDocClick, { capture: true });
        document.addEventListener('touchstart', this.onDocClick);
        document.addEventListener('keydown', this.handleGlobalKeys);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.onDocClick);
        document.removeEventListener('touchstart', this.onDocClick);
        document.removeEventListener('keydown', this.handleGlobalKeys);
    }
    render() {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const _a = this.props, { className, children, isOpen, isActive, isPlain, isDisabled, hasPlaceholderStyle, variant, onToggle, onEnter, onClose, onBlur, onClickTypeaheadToggleButton, handleTypeaheadKeys, moveFocusToLastMenuItem, parentRef, menuRef, id, type, hasClearButton, 'aria-labelledby': ariaLabelledBy, 'aria-label': ariaLabel, hasFooter, footerRef } = _a, props = __rest(_a, ["className", "children", "isOpen", "isActive", "isPlain", "isDisabled", "hasPlaceholderStyle", "variant", "onToggle", "onEnter", "onClose", "onBlur", "onClickTypeaheadToggleButton", "handleTypeaheadKeys", "moveFocusToLastMenuItem", "parentRef", "menuRef", "id", "type", "hasClearButton", 'aria-labelledby', 'aria-label', "hasFooter", "footerRef"]);
        /* eslint-enable @typescript-eslint/no-unused-vars */
        const isTypeahead = variant === SelectVariant.typeahead || variant === SelectVariant.typeaheadMulti || hasClearButton;
        const toggleProps = {
            id,
            'aria-labelledby': ariaLabelledBy,
            'aria-expanded': isOpen,
            'aria-haspopup': (variant !== SelectVariant.checkbox && 'listbox') || null
        };
        return (react.createElement(react.Fragment, null,
            !isTypeahead && (react.createElement("button", Object.assign({}, props, toggleProps, { ref: this.toggle, type: type, className: css(styles$8.selectToggle, hasPlaceholderStyle && styles$8.modifiers.placeholder, isDisabled && styles$8.modifiers.disabled, isPlain && styles$8.modifiers.plain, isActive && styles$8.modifiers.active, className), "aria-label": ariaLabel, onBlur: onBlur, 
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onClick: event => {
                    onToggle(!isOpen, event);
                    if (isOpen) {
                        onClose();
                    }
                }, onKeyDown: this.onKeyDown, disabled: isDisabled }),
                children,
                react.createElement("span", { className: css(styles$8.selectToggleArrow) },
                    react.createElement(CaretDownIcon, null)))),
            isTypeahead && (react.createElement("div", Object.assign({}, props, { ref: this.toggle, className: css(styles$8.selectToggle, hasPlaceholderStyle && styles$8.modifiers.placeholder, isDisabled && styles$8.modifiers.disabled, isPlain && styles$8.modifiers.plain, isTypeahead && styles$8.modifiers.typeahead, className), onBlur: onBlur, 
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onClick: event => {
                    if (!isDisabled) {
                        onToggle(!isOpen, event);
                        if (isOpen) {
                            onClose();
                        }
                    }
                }, onKeyDown: this.onKeyDown }),
                children,
                react.createElement("button", Object.assign({}, toggleProps, { type: type, className: css(buttonStyles.button, styles$8.selectToggleButton, styles$8.modifiers.plain), "aria-label": ariaLabel, onClick: event => {
                        onToggle(!isOpen, event);
                        if (isOpen) {
                            onClose();
                        }
                        onClickTypeaheadToggleButton();
                    } }, ((variant === SelectVariant.typeahead || variant === SelectVariant.typeaheadMulti) && {
                    tabIndex: -1
                }), { disabled: isDisabled }),
                    react.createElement(CaretDownIcon, { className: css(styles$8.selectToggleArrow) }))))));
    }
}
SelectToggle.displayName = 'SelectToggle';
SelectToggle.defaultProps = {
    className: '',
    isOpen: false,
    isActive: false,
    isPlain: false,
    isDisabled: false,
    hasPlaceholderStyle: false,
    hasClearButton: false,
    hasFooter: false,
    variant: 'single',
    'aria-labelledby': '',
    'aria-label': '',
    type: 'button',
    onToggle: () => { },
    onEnter: () => { },
    onClose: () => { },
    onClickTypeaheadToggleButton: () => { }
};

import('../common/chip-group-184f5a7b.js');
var styles$9 = {
  chipGroup: "pf-c-chip-group",
  chipGroupClose: "pf-c-chip-group__close",
  chipGroupLabel: "pf-c-chip-group__label",
  chipGroupList: "pf-c-chip-group__list",
  chipGroupListItem: "pf-c-chip-group__list-item",
  chipGroupMain: "pf-c-chip-group__main",
  modifiers: {
    category: "pf-m-category"
  }
};

import('../common/chip-651d58a9.js');
var styles$a = {
  badge: "pf-c-badge",
  button: "pf-c-button",
  chip: "pf-c-chip",
  chipIcon: "pf-c-chip__icon",
  chipText: "pf-c-chip__text",
  modifiers: {
    overflow: "pf-m-overflow",
    draggable: "pf-m-draggable"
  },
  themeDark: "pf-theme-dark"
};

class Chip extends react.Component {
    constructor(props) {
        super(props);
        this.span = react.createRef();
        this.setChipStyle = () => ({
            '--pf-c-chip__text--MaxWidth': this.props.textMaxWidth
        });
        this.renderOverflowChip = () => {
            const { children, className, onClick, ouiaId } = this.props;
            const Component = this.props.component;
            return (react.createElement(Component, Object.assign({ onClick: onClick }, (this.props.textMaxWidth && Object.assign({ style: this.setChipStyle() }, this.props.style)), { className: css(styles$a.chip, styles$a.modifiers.overflow, className) }, (this.props.component === 'button' ? { type: 'button' } : {}), getOUIAProps('OverflowChip', ouiaId !== undefined ? ouiaId : this.state.ouiaStateId)),
                react.createElement("span", { className: css(styles$a.chipText) }, children)));
        };
        this.renderChip = (randomId) => {
            const { children, tooltipPosition } = this.props;
            if (this.state.isTooltipVisible) {
                return (react.createElement(Tooltip, { position: tooltipPosition, content: children }, this.renderInnerChip(randomId)));
            }
            return this.renderInnerChip(randomId);
        };
        this.state = {
            isTooltipVisible: false,
            ouiaStateId: getDefaultOUIAId(Chip.displayName)
        };
    }
    componentDidMount() {
        this.setState({
            isTooltipVisible: Boolean(this.span.current && this.span.current.offsetWidth < this.span.current.scrollWidth)
        });
    }
    renderInnerChip(id) {
        const { children, className, onClick, closeBtnAriaLabel, isReadOnly, component, ouiaId } = this.props;
        const Component = component;
        return (react.createElement(Component, Object.assign({}, (this.props.textMaxWidth && {
            style: this.setChipStyle()
        }), { className: css(styles$a.chip, className) }, (this.state.isTooltipVisible && { tabIndex: 0 }), getOUIAProps(Chip.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId)),
            react.createElement("span", { ref: this.span, className: css(styles$a.chipText), id: id }, children),
            !isReadOnly && (react.createElement(Button, { onClick: onClick, variant: "plain", "aria-label": closeBtnAriaLabel, id: `remove_${id}`, "aria-labelledby": `remove_${id} ${id}`, ouiaId: ouiaId || closeBtnAriaLabel },
                react.createElement(TimesIcon, { "aria-hidden": "true" })))));
    }
    render() {
        const { isOverflowChip } = this.props;
        return (react.createElement(GenerateId, null, randomId => (isOverflowChip ? this.renderOverflowChip() : this.renderChip(this.props.id || randomId))));
    }
}
Chip.displayName = 'Chip';
Chip.defaultProps = {
    closeBtnAriaLabel: 'close',
    className: '',
    isOverflowChip: false,
    isReadOnly: false,
    tooltipPosition: 'top',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onClick: (_e) => undefined,
    component: 'div'
};

class ChipGroup extends react.Component {
    constructor(props) {
        super(props);
        this.headingRef = react.createRef();
        this.toggleCollapse = () => {
            this.setState(prevState => ({
                isOpen: !prevState.isOpen,
                isTooltipVisible: Boolean(this.headingRef.current && this.headingRef.current.offsetWidth < this.headingRef.current.scrollWidth)
            }));
        };
        this.state = {
            isOpen: this.props.defaultIsOpen,
            isTooltipVisible: false
        };
    }
    componentDidMount() {
        this.setState({
            isTooltipVisible: Boolean(this.headingRef.current && this.headingRef.current.offsetWidth < this.headingRef.current.scrollWidth)
        });
    }
    renderLabel(id) {
        const { categoryName, tooltipPosition } = this.props;
        const { isTooltipVisible } = this.state;
        return isTooltipVisible ? (react.createElement(Tooltip, { position: tooltipPosition, content: categoryName },
            react.createElement("span", { tabIndex: 0, ref: this.headingRef, className: css(styles$9.chipGroupLabel) },
                react.createElement("span", { id: id }, categoryName)))) : (react.createElement("span", { ref: this.headingRef, className: css(styles$9.chipGroupLabel), id: id }, categoryName));
    }
    render() {
        const _a = this.props, { categoryName, children, className, isClosable, closeBtnAriaLabel, 'aria-label': ariaLabel, onClick, onOverflowChipClick, numChips, expandedText, collapsedText, ouiaId, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        defaultIsOpen, tooltipPosition } = _a, 
        /* eslint-enable @typescript-eslint/no-unused-vars */
        rest = __rest(_a, ["categoryName", "children", "className", "isClosable", "closeBtnAriaLabel", 'aria-label', "onClick", "onOverflowChipClick", "numChips", "expandedText", "collapsedText", "ouiaId", "defaultIsOpen", "tooltipPosition"]);
        const { isOpen } = this.state;
        const numChildren = react.Children.count(children);
        const collapsedTextResult = fillTemplate(collapsedText, {
            remaining: react.Children.count(children) - numChips
        });
        const renderChipGroup = (id) => {
            const chipArray = !isOpen
                ? react.Children.toArray(children).slice(0, numChips)
                : react.Children.toArray(children);
            return (react.createElement("div", Object.assign({ className: css(styles$9.chipGroup, className, categoryName && styles$9.modifiers.category), role: "group" }, (categoryName && { 'aria-labelledby': id }), (!categoryName && { 'aria-label': ariaLabel }), getOUIAProps(ChipGroup.displayName, ouiaId)),
                react.createElement("div", { className: css(styles$9.chipGroupMain) },
                    categoryName && this.renderLabel(id),
                    react.createElement("ul", Object.assign({ className: css(styles$9.chipGroupList) }, (categoryName && { 'aria-labelledby': id }), (!categoryName && { 'aria-label': ariaLabel }), { role: "list" }, rest),
                        chipArray.map((child, i) => (react.createElement("li", { className: css(styles$9.chipGroupListItem), key: i }, child))),
                        numChildren > numChips && (react.createElement("li", { className: css(styles$9.chipGroupListItem) },
                            react.createElement(Chip, { isOverflowChip: true, onClick: event => {
                                    this.toggleCollapse();
                                    onOverflowChipClick(event);
                                }, component: "button" }, isOpen ? expandedText : collapsedTextResult))))),
                isClosable && (react.createElement("div", { className: css(styles$9.chipGroupClose) },
                    react.createElement(Button, { variant: "plain", "aria-label": closeBtnAriaLabel, onClick: onClick, id: `remove_group_${id}`, "aria-labelledby": `remove_group_${id} ${id}`, ouiaId: ouiaId || closeBtnAriaLabel },
                        react.createElement(TimesCircleIcon, { "aria-hidden": "true" }))))));
        };
        return numChildren === 0 ? null : react.createElement(GenerateId, null, randomId => renderChipGroup(this.props.id || randomId));
    }
}
ChipGroup.displayName = 'ChipGroup';
ChipGroup.defaultProps = {
    expandedText: 'Show Less',
    collapsedText: '${remaining} more',
    categoryName: '',
    defaultIsOpen: false,
    numChips: 3,
    isClosable: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onClick: (_e) => undefined,
    onOverflowChipClick: (_e) => undefined,
    closeBtnAriaLabel: 'Close chip group',
    tooltipPosition: 'top',
    'aria-label': 'Chip group category'
};

// seed for the aria-labelledby ID
let currentId$1 = 0;
class Select extends react.Component {
    constructor() {
        super(...arguments);
        this.parentRef = react.createRef();
        this.menuComponentRef = react.createRef();
        this.filterRef = react.createRef();
        this.clearRef = react.createRef();
        this.inputRef = react.createRef();
        this.refCollection = [[]];
        this.optionContainerRefCollection = [];
        this.footerRef = react.createRef();
        this.state = {
            focusFirstOption: false,
            typeaheadInputValue: null,
            typeaheadFilteredChildren: react.Children.toArray(this.props.children),
            favoritesGroup: [],
            typeaheadCurrIndex: -1,
            typeaheadStoredIndex: -1,
            creatableValue: '',
            tabbedIntoFavoritesMenu: false,
            ouiaStateId: getDefaultOUIAId(Select.displayName, this.props.variant),
            viewMoreNextIndex: -1
        };
        this.getTypeaheadActiveChild = (typeaheadCurrIndex) => this.refCollection[typeaheadCurrIndex] ? this.refCollection[typeaheadCurrIndex][0] : null;
        this.componentDidUpdate = (prevProps, prevState) => {
            if (this.props.hasInlineFilter) {
                this.refCollection[0][0] = this.filterRef.current;
            }
            // Move focus to top of the menu if state.focusFirstOption was updated to true and the menu does not have custom content
            if (!prevState.focusFirstOption && this.state.focusFirstOption && !this.props.customContent) {
                const firstRef = this.refCollection.find(ref => ref !== null);
                if (firstRef && firstRef[0]) {
                    firstRef[0].focus();
                }
            }
            else if (
            // if viewMoreNextIndex is not -1, view more was clicked, set focus on first newly loaded item
            this.state.viewMoreNextIndex !== -1 &&
                this.refCollection.length > this.state.viewMoreNextIndex &&
                this.props.loadingVariant !== 'spinner' &&
                this.refCollection[this.state.viewMoreNextIndex][0] &&
                this.props.variant !== 'typeahead' && // do not hard focus newly added items for typeahead variants
                this.props.variant !== 'typeaheadmulti') {
                this.refCollection[this.state.viewMoreNextIndex][0].focus();
                this.setState({ viewMoreNextIndex: -1 });
            }
            if (this.props.variant === 'typeahead' || this.props.variant === 'typeaheadmulti') {
                const checkUpdatedChildren = (prevChildren, currChildren) => Array.from(prevChildren).some((prevChild, index) => {
                    const prevChildProps = prevChild.props;
                    const currChild = currChildren[index];
                    const { props: currChildProps } = currChild;
                    if (prevChildProps && currChildProps) {
                        return (prevChildProps.value !== currChildProps.value ||
                            prevChildProps.label !== currChildProps.label ||
                            prevChildProps.isDisabled !== currChildProps.isDisabled ||
                            prevChildProps.isPlaceholder !== currChildProps.isPlaceholder);
                    }
                    else {
                        return prevChild !== currChild;
                    }
                });
                const hasUpdatedChildren = prevProps.children.length !== this.props.children.length ||
                    checkUpdatedChildren(prevProps.children, this.props.children) ||
                    (this.props.isGrouped &&
                        Array.from(prevProps.children).some((prevChild, index) => prevChild.type === SelectGroup &&
                            prevChild.props.children &&
                            this.props.children[index].props.children &&
                            (prevChild.props.children.length !== this.props.children[index].props.children.length ||
                                checkUpdatedChildren(prevChild.props.children, this.props.children[index].props.children))));
                if (hasUpdatedChildren) {
                    this.updateTypeAheadFilteredChildren(prevState.typeaheadInputValue || '', null);
                }
            }
            // for menus with favorites,
            // if the number of favorites or typeahead filtered children has changed, the generated
            // list of favorites needs to be updated
            if (this.props.onFavorite &&
                (this.props.favorites.length !== prevProps.favorites.length ||
                    this.state.typeaheadFilteredChildren !== prevState.typeaheadFilteredChildren)) {
                const tempRenderableChildren = this.props.variant === 'typeahead' || this.props.variant === 'typeaheadmulti'
                    ? this.state.typeaheadFilteredChildren
                    : this.props.children;
                const renderableFavorites = createRenderableFavorites(tempRenderableChildren, this.props.isGrouped, this.props.favorites);
                const favoritesGroup = renderableFavorites.length
                    ? [
                        react.createElement(SelectGroup, { key: "favorites", label: this.props.favoritesLabel }, renderableFavorites),
                        react.createElement(Divider, { key: "favorites-group-divider" })
                    ]
                    : [];
                this.setState({ favoritesGroup });
            }
        };
        this.onEnter = () => {
            this.setState({ focusFirstOption: true });
        };
        this.onToggle = (isExpanded, e) => {
            const { isInputValuePersisted, onSelect, onToggle, hasInlineFilter } = this.props;
            if (!isExpanded && isInputValuePersisted && onSelect) {
                onSelect(undefined, this.inputRef.current ? this.inputRef.current.value : '');
            }
            if (isExpanded && hasInlineFilter) {
                this.setState({
                    focusFirstOption: true
                });
            }
            onToggle(isExpanded, e);
        };
        this.onClose = () => {
            const { isInputFilterPersisted } = this.props;
            this.setState(Object.assign(Object.assign({ focusFirstOption: false, typeaheadInputValue: null }, (!isInputFilterPersisted && {
                typeaheadFilteredChildren: react.Children.toArray(this.props.children)
            })), { typeaheadCurrIndex: -1, tabbedIntoFavoritesMenu: false, viewMoreNextIndex: -1 }));
        };
        this.onChange = (e) => {
            if (e.target.value.toString() !== '' && !this.props.isOpen) {
                this.onToggle(true, e);
            }
            if (this.props.onTypeaheadInputChanged) {
                this.props.onTypeaheadInputChanged(e.target.value.toString());
            }
            this.setState({
                typeaheadCurrIndex: -1,
                typeaheadInputValue: e.target.value,
                creatableValue: e.target.value
            });
            this.updateTypeAheadFilteredChildren(e.target.value.toString(), e);
            this.refCollection = [[]];
        };
        this.updateTypeAheadFilteredChildren = (typeaheadInputValue, e) => {
            let typeaheadFilteredChildren;
            const { onFilter, isCreatable, onCreateOption, createText, noResultsFoundText, children, isGrouped, isCreateSelectOptionObject, loadingVariant } = this.props;
            if (onFilter) {
                /* The updateTypeAheadFilteredChildren callback is not only called on input changes but also when the children change.
                 * In this case the e is null but we can get the typeaheadInputValue from the state.
                 */
                typeaheadFilteredChildren = onFilter(e, e ? e.target.value : typeaheadInputValue) || children;
            }
            else {
                let input;
                try {
                    input = new RegExp(typeaheadInputValue.toString(), 'i');
                }
                catch (err) {
                    input = new RegExp(typeaheadInputValue.toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
                }
                const childrenArray = react.Children.toArray(children);
                if (isGrouped) {
                    const childFilter = (child) => child.props.value &&
                        child.props.value.toString &&
                        this.getDisplay(child.props.value.toString(), 'text').search(input) === 0;
                    typeaheadFilteredChildren =
                        typeaheadInputValue.toString() !== ''
                            ? react.Children.map(children, group => {
                                if (react.isValidElement(group) &&
                                    group.type === SelectGroup) {
                                    const filteredGroupChildren = react.Children.toArray(group.props.children).filter(childFilter);
                                    if (filteredGroupChildren.length > 0) {
                                        return react.cloneElement(group, {
                                            titleId: group.props.label && group.props.label.replace(/\W/g, '-'),
                                            children: filteredGroupChildren
                                        });
                                    }
                                }
                                else {
                                    return react.Children.toArray(group).filter(childFilter);
                                }
                            })
                            : childrenArray;
                }
                else {
                    typeaheadFilteredChildren =
                        typeaheadInputValue.toString() !== ''
                            ? childrenArray.filter(child => {
                                const valueToCheck = child.props.value;
                                // Dividers don't have value and should not be filtered
                                if (!valueToCheck) {
                                    return true;
                                }
                                const isSelectOptionObject = typeof valueToCheck !== 'string' &&
                                    valueToCheck.toString &&
                                    valueToCheck.compareTo;
                                // View more option should be returned as not a match
                                if (loadingVariant !== 'spinner' && (loadingVariant === null || loadingVariant === void 0 ? void 0 : loadingVariant.text) === valueToCheck) {
                                    return true;
                                }
                                // spinner should be returned as not a match
                                if (loadingVariant === 'spinner' && valueToCheck === 'loading') {
                                    return true;
                                }
                                if (isSelectOptionObject) {
                                    return valueToCheck.compareTo(typeaheadInputValue);
                                }
                                else {
                                    return this.getDisplay(child.props.value.toString(), 'text').search(input) === 0;
                                }
                            })
                            : childrenArray;
                }
            }
            if (!typeaheadFilteredChildren) {
                typeaheadFilteredChildren = [];
            }
            if (typeaheadFilteredChildren.length === 0) {
                !isCreatable &&
                    typeaheadFilteredChildren.push(react.createElement(SelectOption, { isDisabled: true, key: "no-results", value: noResultsFoundText, isNoResultsOption: true }));
            }
            if (isCreatable && typeaheadInputValue !== '') {
                const newValue = typeaheadInputValue;
                if (!typeaheadFilteredChildren.find((i) => i.props.value && i.props.value.toString().toLowerCase() === newValue.toString().toLowerCase())) {
                    const newOptionValue = isCreateSelectOptionObject
                        ? {
                            toString: () => newValue,
                            compareTo: value => this.toString()
                                .toLowerCase()
                                .includes(value.toString().toLowerCase())
                        }
                        : newValue;
                    typeaheadFilteredChildren.push(react.createElement(SelectOption, { key: `create ${newValue}`, value: newOptionValue, onClick: () => onCreateOption && onCreateOption(newValue) },
                        createText,
                        " \"",
                        newValue,
                        "\""));
                }
            }
            this.setState({
                typeaheadFilteredChildren
            });
        };
        this.onClick = (e) => {
            if (!this.props.isOpen) {
                this.onToggle(true, e);
            }
        };
        this.clearSelection = (_e) => {
            this.setState({
                typeaheadInputValue: null,
                typeaheadFilteredChildren: react.Children.toArray(this.props.children),
                typeaheadCurrIndex: -1
            });
        };
        this.sendRef = (optionRef, favoriteRef, optionContainerRef, index) => {
            this.refCollection[index] = [optionRef, favoriteRef];
            this.optionContainerRefCollection[index] = optionContainerRef;
        };
        this.handleMenuKeys = (index, innerIndex, position) => {
            keyHandler(index, innerIndex, position, this.refCollection, this.refCollection);
            if (this.props.variant === SelectVariant.typeahead || this.props.variant === SelectVariant.typeaheadMulti) {
                if (position !== 'tab') {
                    this.handleTypeaheadKeys(position);
                }
            }
        };
        this.moveFocus = (nextIndex, updateCurrentIndex = true) => {
            const { isCreatable, createText } = this.props;
            const hasDescriptionElm = Boolean(this.refCollection[nextIndex][0] && this.refCollection[nextIndex][0].classList.contains('pf-m-description'));
            const isLoad = Boolean(this.refCollection[nextIndex][0] && this.refCollection[nextIndex][0].classList.contains('pf-m-load'));
            const optionTextElm = hasDescriptionElm
                ? this.refCollection[nextIndex][0].firstElementChild
                : this.refCollection[nextIndex][0];
            let typeaheadInputValue = '';
            if (isCreatable && optionTextElm.innerText.includes(createText)) {
                typeaheadInputValue = this.state.creatableValue;
            }
            else if (optionTextElm && !isLoad) {
                // !isLoad prevents the view more button text from appearing the typeahead input
                typeaheadInputValue = optionTextElm.innerText;
            }
            this.setState(prevState => ({
                typeaheadCurrIndex: updateCurrentIndex ? nextIndex : prevState.typeaheadCurrIndex,
                typeaheadStoredIndex: nextIndex,
                typeaheadInputValue
            }));
        };
        this.switchFocusToFavoriteMenu = () => {
            const { typeaheadCurrIndex, typeaheadStoredIndex } = this.state;
            let indexForFocus = 0;
            if (typeaheadCurrIndex !== -1) {
                indexForFocus = typeaheadCurrIndex;
            }
            else if (typeaheadStoredIndex !== -1) {
                indexForFocus = typeaheadStoredIndex;
            }
            if (this.refCollection[indexForFocus] !== null && this.refCollection[indexForFocus][0] !== null) {
                this.refCollection[indexForFocus][0].focus();
            }
            else {
                this.clearRef.current.focus();
            }
            this.setState({
                tabbedIntoFavoritesMenu: true,
                typeaheadCurrIndex: -1
            });
        };
        this.moveFocusToLastMenuItem = () => {
            const refCollectionLen = this.refCollection.length;
            if (refCollectionLen > 0 &&
                this.refCollection[refCollectionLen - 1] !== null &&
                this.refCollection[refCollectionLen - 1][0] !== null) {
                this.refCollection[refCollectionLen - 1][0].focus();
            }
        };
        this.handleTypeaheadKeys = (position, shiftKey = false) => {
            const { isOpen, onFavorite, isCreatable } = this.props;
            const { typeaheadCurrIndex, tabbedIntoFavoritesMenu } = this.state;
            const typeaheadActiveChild = this.getTypeaheadActiveChild(typeaheadCurrIndex);
            if (isOpen) {
                if (position === 'enter') {
                    if ((typeaheadCurrIndex !== -1 || (isCreatable && this.refCollection.length === 1)) && // do not allow selection without moving to an initial option unless it is a single create option
                        (typeaheadActiveChild || (this.refCollection[0] && this.refCollection[0][0]))) {
                        if (typeaheadActiveChild) {
                            if (!typeaheadActiveChild.classList.contains('pf-m-load')) {
                                const hasDescriptionElm = typeaheadActiveChild.childElementCount > 1;
                                const typeaheadActiveChildText = hasDescriptionElm
                                    ? typeaheadActiveChild.firstChild.innerText
                                    : typeaheadActiveChild.innerText;
                                this.setState({
                                    typeaheadInputValue: typeaheadActiveChildText
                                });
                            }
                        }
                        else if (this.refCollection[0] && this.refCollection[0][0]) {
                            this.setState({
                                typeaheadInputValue: this.refCollection[0][0].innerText
                            });
                        }
                        if (typeaheadActiveChild) {
                            typeaheadActiveChild.click();
                        }
                        else {
                            this.refCollection[0][0].click();
                        }
                    }
                }
                else if (position === 'tab') {
                    if (onFavorite) {
                        // if the input has focus, tab to the first item or the last item that was previously focused.
                        if (this.inputRef.current === document.activeElement) {
                            // If shift is also clicked and there is a footer, tab to the last item in tabbable footer
                            if (this.props.footer && shiftKey) {
                                const tabbableItems = findTabbableElements(this.footerRef, SelectFooterTabbableItems);
                                if (tabbableItems.length > 0) {
                                    if (tabbableItems[tabbableItems.length - 1]) {
                                        tabbableItems[tabbableItems.length - 1].focus();
                                    }
                                }
                            }
                            else {
                                this.switchFocusToFavoriteMenu();
                            }
                        }
                        else {
                            // focus is on menu or footer
                            if (this.props.footer) {
                                let tabbedIntoMenu = false;
                                const tabbableItems = findTabbableElements(this.footerRef, SelectFooterTabbableItems);
                                if (tabbableItems.length > 0) {
                                    // if current element is not in footer, tab to first tabbable element in footer,
                                    // if shift was clicked, tab to input since focus is on menu
                                    const currentElementIndex = tabbableItems.findIndex((item) => item === document.activeElement);
                                    if (currentElementIndex === -1) {
                                        if (shiftKey) {
                                            // currently in menu, shift back to input
                                            this.inputRef.current.focus();
                                        }
                                        else {
                                            // currently in menu, tab to first tabbable item in footer
                                            tabbableItems[0].focus();
                                        }
                                    }
                                    else {
                                        // already in footer
                                        if (shiftKey) {
                                            // shift to previous item
                                            if (currentElementIndex === 0) {
                                                // on first footer item, shift back to menu
                                                this.switchFocusToFavoriteMenu();
                                                tabbedIntoMenu = true;
                                            }
                                            else {
                                                // shift to previous footer item
                                                tabbableItems[currentElementIndex - 1].focus();
                                            }
                                        }
                                        else {
                                            // tab to next tabbable item in footer or to input.
                                            if (tabbableItems[currentElementIndex + 1]) {
                                                tabbableItems[currentElementIndex + 1].focus();
                                            }
                                            else {
                                                this.inputRef.current.focus();
                                            }
                                        }
                                    }
                                }
                                else {
                                    // no tabbable items in footer, tab to input
                                    this.inputRef.current.focus();
                                    tabbedIntoMenu = false;
                                }
                                this.setState({ tabbedIntoFavoritesMenu: tabbedIntoMenu });
                            }
                            else {
                                this.inputRef.current.focus();
                                this.setState({ tabbedIntoFavoritesMenu: false });
                            }
                        }
                    }
                    else {
                        // Close if there is no footer
                        if (!this.props.footer) {
                            this.onToggle(false, null);
                            this.onClose();
                        }
                        else {
                            // has footer
                            const tabbableItems = findTabbableElements(this.footerRef, SelectFooterTabbableItems);
                            const currentElementIndex = tabbableItems.findIndex((item) => item === document.activeElement);
                            if (this.inputRef.current === document.activeElement) {
                                if (shiftKey) {
                                    // close toggle if shift key and tab on input
                                    this.onToggle(false, null);
                                    this.onClose();
                                }
                                else {
                                    // tab to first tabbable item in footer
                                    if (tabbableItems[0]) {
                                        tabbableItems[0].focus();
                                    }
                                    else {
                                        this.onToggle(false, null);
                                        this.onClose();
                                    }
                                }
                            }
                            else {
                                // focus is in footer
                                if (shiftKey) {
                                    if (currentElementIndex === 0) {
                                        // shift tab back to input
                                        this.inputRef.current.focus();
                                    }
                                    else {
                                        // shift to previous footer item
                                        tabbableItems[currentElementIndex - 1].focus();
                                    }
                                }
                                else {
                                    // tab to next footer item or close tab if last item
                                    if (tabbableItems[currentElementIndex + 1]) {
                                        tabbableItems[currentElementIndex + 1].focus();
                                    }
                                    else {
                                        // no next item, close toggle
                                        this.onToggle(false, null);
                                        this.inputRef.current.focus();
                                        this.onClose();
                                    }
                                }
                            }
                        }
                    }
                }
                else if (!tabbedIntoFavoritesMenu) {
                    if (this.refCollection[0][0] === null) {
                        return;
                    }
                    let nextIndex;
                    if (typeaheadCurrIndex === -1 && position === 'down') {
                        nextIndex = 0;
                    }
                    else if (typeaheadCurrIndex === -1 && position === 'up') {
                        nextIndex = this.refCollection.length - 1;
                    }
                    else if (position !== 'left' && position !== 'right') {
                        nextIndex = getNextIndex(typeaheadCurrIndex, position, this.refCollection);
                    }
                    else {
                        nextIndex = typeaheadCurrIndex;
                    }
                    if (this.refCollection[nextIndex] === null) {
                        return;
                    }
                    this.moveFocus(nextIndex);
                }
                else {
                    const nextIndex = this.refCollection.findIndex(ref => ref !== undefined && (ref[0] === document.activeElement || ref[1] === document.activeElement));
                    this.moveFocus(nextIndex);
                }
            }
        };
        this.onClickTypeaheadToggleButton = () => {
            if (this.inputRef && this.inputRef.current) {
                this.inputRef.current.focus();
            }
        };
        this.getDisplay = (value, type = 'node') => {
            if (!value) {
                return;
            }
            const item = this.props.isGrouped
                ? react.Children.toArray(this.props.children)
                    .reduce((acc, curr) => [...acc, ...react.Children.toArray(curr.props.children)], [])
                    .find(child => child.props.value.toString() === value.toString())
                : react.Children.toArray(this.props.children).find(child => child.props.value &&
                    child.props.value.toString() === value.toString());
            if (item) {
                if (item && item.props.children) {
                    if (type === 'node') {
                        return item.props.children;
                    }
                    return this.findText(item);
                }
                return item.props.value.toString();
            }
            return value.toString();
        };
        this.findText = (item) => {
            if (typeof item === 'string') {
                return item;
            }
            else if (!react.isValidElement(item)) {
                return '';
            }
            else {
                const multi = [];
                react.Children.toArray(item.props.children).forEach(child => multi.push(this.findText(child)));
                return multi.join('');
            }
        };
        this.generateSelectedBadge = () => {
            const { customBadgeText, selections } = this.props;
            if (customBadgeText !== null) {
                return customBadgeText;
            }
            if (Array.isArray(selections) && selections.length > 0) {
                return selections.length;
            }
            return null;
        };
        this.setVieMoreNextIndex = () => {
            this.setState({ viewMoreNextIndex: this.refCollection.length - 1 });
        };
        this.isLastOptionBeforeFooter = (index) => this.props.footer && index === this.refCollection.length - 1 ? true : false;
    }
    extendTypeaheadChildren(typeaheadCurrIndex, favoritesGroup) {
        const { isGrouped, onFavorite } = this.props;
        const typeaheadChildren = favoritesGroup
            ? favoritesGroup.concat(this.state.typeaheadFilteredChildren)
            : this.state.typeaheadFilteredChildren;
        const activeElement = this.optionContainerRefCollection[typeaheadCurrIndex];
        let typeaheadActiveChild = this.getTypeaheadActiveChild(typeaheadCurrIndex);
        if (typeaheadActiveChild && typeaheadActiveChild.classList.contains('pf-m-description')) {
            typeaheadActiveChild = typeaheadActiveChild.firstElementChild;
        }
        this.refCollection = [[]];
        this.optionContainerRefCollection = [];
        if (isGrouped) {
            return react.Children.map(typeaheadChildren, (group) => {
                if (group.type === Divider) {
                    return group;
                }
                else if (group.type === SelectGroup && onFavorite) {
                    return react.cloneElement(group, {
                        titleId: group.props.label && group.props.label.replace(/\W/g, '-'),
                        children: react.Children.map(group.props.children, (child) => child.type === Divider
                            ? child
                            : react.cloneElement(child, {
                                isFocused: activeElement &&
                                    (activeElement.id === child.props.id ||
                                        (this.props.isCreatable &&
                                            typeaheadActiveChild.innerText ===
                                                `{createText} "${group.props.value}"`))
                            }))
                    });
                }
                else if (group.type === SelectGroup) {
                    return react.cloneElement(group, {
                        titleId: group.props.label && group.props.label.replace(/\W/g, '-'),
                        children: react.Children.map(group.props.children, (child) => child.type === Divider
                            ? child
                            : react.cloneElement(child, {
                                isFocused: typeaheadActiveChild &&
                                    (typeaheadActiveChild.innerText === child.props.value.toString() ||
                                        (this.props.isCreatable &&
                                            typeaheadActiveChild.innerText ===
                                                `{createText} "${child.props.value}"`))
                            }))
                    });
                }
                else {
                    // group has been filtered down to SelectOption
                    return react.cloneElement(group, {
                        isFocused: typeaheadActiveChild &&
                            (typeaheadActiveChild.innerText === group.props.value.toString() ||
                                (this.props.isCreatable && typeaheadActiveChild.innerText === `{createText} "${group.props.value}"`))
                    });
                }
            });
        }
        return typeaheadChildren.map((child, index) => {
            const childElement = child;
            return childElement.type.displayName === 'Divider'
                ? child
                : react.cloneElement(child, {
                    isFocused: typeaheadActiveChild
                        ? typeaheadActiveChild.innerText === child.props.value.toString() ||
                            (this.props.isCreatable &&
                                typeaheadActiveChild.innerText === `{createText} "${child.props.value}"`)
                        : index === typeaheadCurrIndex // fallback for view more + typeahead use cases, when the new expanded list is loaded and refCollection hasn't be updated yet
                });
        });
    }
    render() {
        const _a = this.props, { children, chipGroupProps, chipGroupComponent, className, customContent, variant, direction, onSelect, onClear, onBlur, toggleId, isOpen, isGrouped, isPlain, isDisabled, hasPlaceholderStyle, validated, selections: selectionsProp, typeAheadAriaLabel, typeAheadAriaDescribedby, clearSelectionsAriaLabel, toggleAriaLabel, removeSelectionAriaLabel, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, 'aria-describedby': ariaDescribedby, 'aria-invalid': ariaInvalid, placeholderText, width, maxHeight, toggleIcon, ouiaId, ouiaSafe, hasInlineFilter, isCheckboxSelectionBadgeHidden, inlineFilterPlaceholderText, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        onFilter, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        onTypeaheadInputChanged, onCreateOption, isCreatable, onToggle, createText, noResultsFoundText, customBadgeText, inputIdPrefix, inputAutoComplete, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        isInputValuePersisted, isInputFilterPersisted, 
        /* eslint-enable @typescript-eslint/no-unused-vars */
        menuAppendTo, favorites, onFavorite, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        favoritesLabel, footer, loadingVariant, isCreateSelectOptionObject, shouldResetOnSelect, isFlipEnabled } = _a, props = __rest(_a, ["children", "chipGroupProps", "chipGroupComponent", "className", "customContent", "variant", "direction", "onSelect", "onClear", "onBlur", "toggleId", "isOpen", "isGrouped", "isPlain", "isDisabled", "hasPlaceholderStyle", "validated", "selections", "typeAheadAriaLabel", "typeAheadAriaDescribedby", "clearSelectionsAriaLabel", "toggleAriaLabel", "removeSelectionAriaLabel", 'aria-label', 'aria-labelledby', 'aria-describedby', 'aria-invalid', "placeholderText", "width", "maxHeight", "toggleIcon", "ouiaId", "ouiaSafe", "hasInlineFilter", "isCheckboxSelectionBadgeHidden", "inlineFilterPlaceholderText", "onFilter", "onTypeaheadInputChanged", "onCreateOption", "isCreatable", "onToggle", "createText", "noResultsFoundText", "customBadgeText", "inputIdPrefix", "inputAutoComplete", "isInputValuePersisted", "isInputFilterPersisted", "menuAppendTo", "favorites", "onFavorite", "favoritesLabel", "footer", "loadingVariant", "isCreateSelectOptionObject", "shouldResetOnSelect", "isFlipEnabled"]);
        const { focusFirstOption: openedOnEnter, typeaheadCurrIndex, typeaheadInputValue, typeaheadFilteredChildren, favoritesGroup } = this.state;
        const selectToggleId = toggleId || `pf-select-toggle-id-${currentId$1++}`;
        const selections = Array.isArray(selectionsProp) ? selectionsProp : [selectionsProp];
        // Find out if the selected option is a placeholder
        const selectedOption = react.Children.toArray(children).find((option) => option.props.value === selections[0]);
        const isSelectedPlaceholder = selectedOption && selectedOption.props.isPlaceholder;
        const hasAnySelections = Boolean(selections[0] && selections[0] !== '');
        const typeaheadActiveChild = this.getTypeaheadActiveChild(typeaheadCurrIndex);
        let childPlaceholderText = null;
        // If onFavorites is set,  add isFavorite prop to children and add a Favorites group to the SelectMenu
        let renderableItems = [];
        if (onFavorite) {
            // if variant is type-ahead call the extendTypeaheadChildren before adding favorites
            let tempExtendedChildren = children;
            if (variant === 'typeahead' || variant === 'typeaheadmulti') {
                tempExtendedChildren = this.extendTypeaheadChildren(typeaheadCurrIndex, favoritesGroup);
            }
            else if (onFavorite) {
                tempExtendedChildren = favoritesGroup.concat(children);
            }
            // mark items that are favorited with isFavorite
            renderableItems = extendItemsWithFavorite(tempExtendedChildren, isGrouped, favorites);
        }
        else {
            renderableItems = children;
        }
        if (!customContent) {
            if (!hasAnySelections && !placeholderText) {
                const childPlaceholder = react.Children.toArray(children).filter((child) => child.props.isPlaceholder === true);
                childPlaceholderText =
                    (childPlaceholder[0] && this.getDisplay(childPlaceholder[0].props.value, 'node')) ||
                        (children[0] && this.getDisplay(children[0].props.value, 'node'));
            }
        }
        if (isOpen) {
            if (renderableItems.find(item => { var _a; return ((_a = item) === null || _a === void 0 ? void 0 : _a.key) === 'loading'; }) === undefined) {
                if (loadingVariant === 'spinner') {
                    renderableItems.push(react.createElement(SelectOption, { isLoading: true, key: "loading", value: "loading" },
                        react.createElement(Spinner, { size: "lg" })));
                }
                else if (loadingVariant === null || loadingVariant === void 0 ? void 0 : loadingVariant.text) {
                    renderableItems.push(react.createElement(SelectOption, { isLoad: true, key: "loading", value: loadingVariant.text, setViewMoreNextIndex: this.setVieMoreNextIndex, onClick: loadingVariant === null || loadingVariant === void 0 ? void 0 : loadingVariant.onClick }));
                }
            }
        }
        const hasOnClear = onClear !== Select.defaultProps.onClear;
        const clearBtn = (react.createElement("button", { className: css(buttonStyles.button, buttonStyles.modifiers.plain, styles$8.selectToggleClear), onClick: e => {
                this.clearSelection(e);
                onClear(e);
                e.stopPropagation();
            }, "aria-label": clearSelectionsAriaLabel, type: "button", disabled: isDisabled, ref: this.clearRef, onKeyDown: event => {
                if (event.key === KeyTypes.Enter) {
                    this.clearRef.current.click();
                }
            } },
            react.createElement(TimesCircleIcon, { "aria-hidden": true })));
        let selectedChips = null;
        if (variant === SelectVariant.typeaheadMulti) {
            selectedChips = chipGroupComponent ? (chipGroupComponent) : (react.createElement(ChipGroup, Object.assign({}, chipGroupProps), selections &&
                selections.map(item => (react.createElement(Chip, { key: item, onClick: (e) => onSelect(e, item), closeBtnAriaLabel: removeSelectionAriaLabel }, this.getDisplay(item, 'node'))))));
        }
        if (hasInlineFilter) {
            const filterBox = (react.createElement(react.Fragment, null,
                react.createElement("div", { key: "inline-filter", className: css(styles$8.selectMenuSearch) },
                    react.createElement("input", { key: "inline-filter-input", type: "search", className: css(formStyles$1.formControl, formStyles$1.modifiers.search), onChange: this.onChange, placeholder: inlineFilterPlaceholderText, onKeyDown: event => {
                            if (event.key === KeyTypes.ArrowUp) {
                                this.handleMenuKeys(0, 0, 'up');
                                event.preventDefault();
                            }
                            else if (event.key === KeyTypes.ArrowDown) {
                                this.handleMenuKeys(0, 0, 'down');
                                event.preventDefault();
                            }
                            else if (event.key === KeyTypes.ArrowLeft) {
                                this.handleMenuKeys(0, 0, 'left');
                                event.preventDefault();
                            }
                            else if (event.key === KeyTypes.ArrowRight) {
                                this.handleMenuKeys(0, 0, 'right');
                                event.preventDefault();
                            }
                            else if (event.key === KeyTypes.Tab && variant !== SelectVariant.checkbox && this.props.footer) {
                                // tab to footer or close menu if shift key
                                if (event.shiftKey) {
                                    this.onToggle(false, event);
                                }
                                else {
                                    const tabbableItems = findTabbableElements(this.footerRef, SelectFooterTabbableItems);
                                    if (tabbableItems.length > 0) {
                                        tabbableItems[0].focus();
                                        event.stopPropagation();
                                        event.preventDefault();
                                    }
                                    else {
                                        this.onToggle(false, event);
                                    }
                                }
                            }
                            else if (event.key === KeyTypes.Tab && variant === SelectVariant.checkbox) {
                                // More modal-like experience for checkboxes
                                // Let SelectOption handle this
                                if (event.shiftKey) {
                                    this.handleMenuKeys(0, 0, 'up');
                                }
                                else {
                                    this.handleMenuKeys(0, 0, 'down');
                                }
                                event.stopPropagation();
                                event.preventDefault();
                            }
                        }, ref: this.filterRef, autoComplete: inputAutoComplete })),
                react.createElement(Divider, { key: "inline-filter-divider" })));
            renderableItems = [filterBox, ...typeaheadFilteredChildren].map((option, index) => react.cloneElement(option, { key: index }));
        }
        let variantProps;
        let variantChildren;
        if (customContent) {
            variantProps = {
                selected: selections,
                openedOnEnter,
                isCustomContent: true
            };
            variantChildren = customContent;
        }
        else {
            switch (variant) {
                case 'single':
                    variantProps = {
                        selected: selections[0],
                        hasInlineFilter,
                        openedOnEnter
                    };
                    variantChildren = renderableItems;
                    break;
                case 'checkbox':
                    variantProps = {
                        checked: selections,
                        isGrouped,
                        hasInlineFilter,
                        openedOnEnter
                    };
                    variantChildren = renderableItems;
                    break;
                case 'typeahead':
                    variantProps = {
                        selected: selections[0],
                        openedOnEnter
                    };
                    variantChildren = onFavorite ? renderableItems : this.extendTypeaheadChildren(typeaheadCurrIndex);
                    if (variantChildren.length === 0) {
                        variantChildren.push(react.createElement(SelectOption, { isDisabled: true, key: 0, value: noResultsFoundText, isNoResultsOption: true }));
                    }
                    break;
                case 'typeaheadmulti':
                    variantProps = {
                        selected: selections,
                        openedOnEnter
                    };
                    variantChildren = onFavorite ? renderableItems : this.extendTypeaheadChildren(typeaheadCurrIndex);
                    if (variantChildren.length === 0) {
                        variantChildren.push(react.createElement(SelectOption, { isDisabled: true, key: 0, value: noResultsFoundText, isNoResultsOption: true }));
                    }
                    break;
            }
        }
        const innerMenu = (react.createElement(SelectMenu
        // This removes the `position: absolute` styling from the `.pf-c-select__menu`
        // allowing the menu to flip correctly
        , Object.assign({}, (isFlipEnabled && { style: { position: 'revert' } }), props, { isGrouped: isGrouped, selected: selections }, variantProps, { openedOnEnter: openedOnEnter, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, sendRef: this.sendRef, keyHandler: this.handleMenuKeys, maxHeight: maxHeight, ref: this.menuComponentRef, footer: footer, footerRef: this.footerRef, isLastOptionBeforeFooter: this.isLastOptionBeforeFooter }), variantChildren));
        const menuContainer = footer ? react.createElement("div", { className: css(styles$8.selectMenu) },
            " ",
            innerMenu,
            " ") : innerMenu;
        const popperContainer = (react.createElement("div", Object.assign({ className: css(styles$8.select, isOpen && styles$8.modifiers.expanded, validated === ValidatedOptions.success && styles$8.modifiers.success, validated === ValidatedOptions.warning && styles$8.modifiers.warning, validated === ValidatedOptions.error && styles$8.modifiers.invalid, direction === SelectDirection.up && styles$8.modifiers.top, className) }, (width && { style: { width } }), (ariaDescribedby && { 'aria-describedby': ariaDescribedby }), (validated !== ValidatedOptions.default && { 'aria-invalid': ariaInvalid })), isOpen && menuContainer));
        const mainContainer = (react.createElement("div", Object.assign({ className: css(styles$8.select, isOpen && styles$8.modifiers.expanded, validated === ValidatedOptions.success && styles$8.modifiers.success, validated === ValidatedOptions.warning && styles$8.modifiers.warning, validated === ValidatedOptions.error && styles$8.modifiers.invalid, direction === SelectDirection.up && styles$8.modifiers.top, className), ref: this.parentRef }, getOUIAProps(Select.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe), (width && { style: { width } }), (ariaDescribedby && { 'aria-describedby': ariaDescribedby }), (validated !== ValidatedOptions.default && { 'aria-invalid': ariaInvalid })),
            react.createElement(SelectToggle, Object.assign({ id: selectToggleId, parentRef: this.parentRef, menuRef: this.menuComponentRef }, (footer && { footerRef: this.footerRef }), { isOpen: isOpen, isPlain: isPlain, hasPlaceholderStyle: hasPlaceholderStyle && (!selections.length || selections[0] === null || isSelectedPlaceholder), onToggle: this.onToggle, onEnter: this.onEnter, onClose: this.onClose, onBlur: onBlur, variant: variant, "aria-labelledby": `${ariaLabelledBy || ''} ${selectToggleId}`, "aria-label": toggleAriaLabel, handleTypeaheadKeys: this.handleTypeaheadKeys, moveFocusToLastMenuItem: this.moveFocusToLastMenuItem, isDisabled: isDisabled, hasClearButton: hasOnClear, hasFooter: footer !== undefined, onClickTypeaheadToggleButton: this.onClickTypeaheadToggleButton }),
                customContent && (react.createElement("div", { className: css(styles$8.selectToggleWrapper) },
                    toggleIcon && react.createElement("span", { className: css(styles$8.selectToggleIcon) }, toggleIcon),
                    react.createElement("span", { className: css(styles$8.selectToggleText) }, placeholderText))),
                variant === SelectVariant.single && !customContent && (react.createElement(react.Fragment, null,
                    react.createElement("div", { className: css(styles$8.selectToggleWrapper) },
                        toggleIcon && react.createElement("span", { className: css(styles$8.selectToggleIcon) }, toggleIcon),
                        react.createElement("span", { className: css(styles$8.selectToggleText) }, this.getDisplay(selections[0], 'node') || placeholderText || childPlaceholderText)),
                    hasOnClear && hasAnySelections && clearBtn)),
                variant === SelectVariant.checkbox && !customContent && (react.createElement(react.Fragment, null,
                    react.createElement("div", { className: css(styles$8.selectToggleWrapper) },
                        toggleIcon && react.createElement("span", { className: css(styles$8.selectToggleIcon) }, toggleIcon),
                        react.createElement("span", { className: css(styles$8.selectToggleText) }, placeholderText),
                        !isCheckboxSelectionBadgeHidden && hasAnySelections && (react.createElement("div", { className: css(styles$8.selectToggleBadge) },
                            react.createElement("span", { className: css(badgeStyles.badge, badgeStyles.modifiers.read) }, this.generateSelectedBadge())))),
                    hasOnClear && hasAnySelections && clearBtn)),
                variant === SelectVariant.typeahead && !customContent && (react.createElement(react.Fragment, null,
                    react.createElement("div", { className: css(styles$8.selectToggleWrapper) },
                        toggleIcon && react.createElement("span", { className: css(styles$8.selectToggleIcon) }, toggleIcon),
                        react.createElement("input", Object.assign({ className: css(formStyles$1.formControl, styles$8.selectToggleTypeahead), "aria-activedescendant": typeaheadActiveChild && typeaheadActiveChild.id, id: `${selectToggleId}-select-typeahead`, "aria-label": typeAheadAriaLabel }, (typeAheadAriaDescribedby && { 'aria-describedby': typeAheadAriaDescribedby }), { placeholder: placeholderText, value: typeaheadInputValue !== null
                                ? typeaheadInputValue
                                : this.getDisplay(selections[0], 'text') || '', type: "text", onClick: this.onClick, onChange: this.onChange, autoComplete: inputAutoComplete, disabled: isDisabled, ref: this.inputRef }))),
                    hasOnClear && (selections[0] || typeaheadInputValue) && clearBtn)),
                variant === SelectVariant.typeaheadMulti && !customContent && (react.createElement(react.Fragment, null,
                    react.createElement("div", { className: css(styles$8.selectToggleWrapper) },
                        toggleIcon && react.createElement("span", { className: css(styles$8.selectToggleIcon) }, toggleIcon),
                        selections && Array.isArray(selections) && selections.length > 0 && selectedChips,
                        react.createElement("input", Object.assign({ className: css(formStyles$1.formControl, styles$8.selectToggleTypeahead), "aria-activedescendant": typeaheadActiveChild && typeaheadActiveChild.id, id: `${selectToggleId}-select-multi-typeahead-typeahead`, "aria-label": typeAheadAriaLabel, "aria-invalid": validated === ValidatedOptions.error }, (typeAheadAriaDescribedby && { 'aria-describedby': typeAheadAriaDescribedby }), { placeholder: placeholderText, value: typeaheadInputValue !== null ? typeaheadInputValue : '', type: "text", onChange: this.onChange, onClick: this.onClick, autoComplete: inputAutoComplete, disabled: isDisabled, ref: this.inputRef }))),
                    hasOnClear && ((selections && selections.length > 0) || typeaheadInputValue) && clearBtn)),
                validated === ValidatedOptions.success && (react.createElement("span", { className: css(styles$8.selectToggleStatusIcon) },
                    react.createElement(CheckCircleIcon, { "aria-hidden": "true" }))),
                validated === ValidatedOptions.error && (react.createElement("span", { className: css(styles$8.selectToggleStatusIcon) },
                    react.createElement(ExclamationCircleIcon, { "aria-hidden": "true" }))),
                validated === ValidatedOptions.warning && (react.createElement("span", { className: css(styles$8.selectToggleStatusIcon) },
                    react.createElement(ExclamationTriangleIcon, { "aria-hidden": "true" })))),
            isOpen && menuAppendTo === 'inline' && menuContainer));
        const getParentElement = () => {
            if (this.parentRef && this.parentRef.current) {
                return this.parentRef.current.parentElement;
            }
            return null;
        };
        return (react.createElement(GenerateId, null, randomId => (react.createElement(SelectContext.Provider, { value: {
                onSelect,
                onFavorite,
                onClose: this.onClose,
                variant,
                inputIdPrefix: inputIdPrefix || randomId,
                shouldResetOnSelect
            } }, menuAppendTo === 'inline' ? (mainContainer) : (react.createElement(Popper, { trigger: mainContainer, popper: popperContainer, direction: direction, appendTo: menuAppendTo === 'parent' ? getParentElement() : menuAppendTo, isVisible: isOpen }))))));
    }
}
Select.displayName = 'Select';
Select.defaultProps = {
    children: [],
    className: '',
    position: SelectPosition.left,
    direction: SelectDirection.down,
    toggleId: null,
    isOpen: false,
    isGrouped: false,
    isPlain: false,
    isDisabled: false,
    hasPlaceholderStyle: false,
    isCreatable: false,
    validated: 'default',
    'aria-label': '',
    'aria-labelledby': '',
    'aria-describedby': '',
    'aria-invalid': false,
    typeAheadAriaLabel: '',
    typeAheadAriaDescribedby: '',
    clearSelectionsAriaLabel: 'Clear all',
    toggleAriaLabel: 'Options menu',
    removeSelectionAriaLabel: 'Remove',
    selections: [],
    createText: 'Create',
    placeholderText: '',
    noResultsFoundText: 'No results found',
    variant: SelectVariant.single,
    width: '',
    onClear: () => undefined,
    onCreateOption: () => undefined,
    toggleIcon: null,
    onFilter: null,
    onTypeaheadInputChanged: null,
    customContent: null,
    hasInlineFilter: false,
    inlineFilterPlaceholderText: null,
    customBadgeText: null,
    inputIdPrefix: '',
    inputAutoComplete: 'off',
    menuAppendTo: 'inline',
    favorites: [],
    favoritesLabel: 'Favorites',
    ouiaSafe: true,
    chipGroupComponent: null,
    isInputValuePersisted: false,
    isInputFilterPersisted: false,
    isCreateSelectOptionObject: false,
    shouldResetOnSelect: true,
    isFlipEnabled: false
};

import('../common/input-group-760713cb.js');
var styles$b = {
  formControl: "pf-c-form-control",
  inputGroup: "pf-c-input-group",
  inputGroupText: "pf-c-input-group__text",
  modifiers: {
    plain: "pf-m-plain"
  },
  themeDark: "pf-theme-dark"
};

class FormSelect extends react.Component {
    constructor(props) {
        super(props);
        this.handleChange = (event) => {
            this.props.onChange(event.currentTarget.value, event);
        };
        if (!props.id && !props['aria-label']) {
            // eslint-disable-next-line no-console
            console.error('FormSelect requires either an id or aria-label to be specified');
        }
        this.state = {
            ouiaStateId: getDefaultOUIAId(FormSelect.displayName, props.validated)
        };
    }
    render() {
        const _a = this.props, { children, className, value, validated, isDisabled, isRequired, isIconSprite, ouiaId, ouiaSafe } = _a, props = __rest(_a, ["children", "className", "value", "validated", "isDisabled", "isRequired", "isIconSprite", "ouiaId", "ouiaSafe"]);
        /* find selected option and get placeholder flag */
        const selectedOption = react.Children.toArray(children).find((option) => option.props.value === value);
        const isSelectedPlaceholder = selectedOption && selectedOption.props.isPlaceholder;
        return (react.createElement("select", Object.assign({}, props, { className: css(formStyles$1.formControl, isIconSprite && formStyles$1.modifiers.iconSprite, className, validated === ValidatedOptions.success && formStyles$1.modifiers.success, validated === ValidatedOptions.warning && formStyles$1.modifiers.warning, isSelectedPlaceholder && formStyles$1.modifiers.placeholder), "aria-invalid": validated === ValidatedOptions.error }, getOUIAProps(FormSelect.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe), { onChange: this.handleChange, disabled: isDisabled, required: isRequired, value: value }), children));
    }
}
FormSelect.displayName = 'FormSelect';
FormSelect.defaultProps = {
    className: '',
    value: '',
    validated: 'default',
    isDisabled: false,
    isRequired: false,
    isIconSprite: false,
    onBlur: () => undefined,
    onFocus: () => undefined,
    onChange: () => undefined,
    ouiaSafe: true
};

const c_form_control_textarea_Height = {
  "name": "--pf-c-form-control--textarea--Height",
  "value": "auto",
  "var": "var(--pf-c-form-control--textarea--Height)"
};

var TextAreResizeOrientation;
(function (TextAreResizeOrientation) {
    TextAreResizeOrientation["horizontal"] = "horizontal";
    TextAreResizeOrientation["vertical"] = "vertical";
    TextAreResizeOrientation["both"] = "both";
})(TextAreResizeOrientation || (TextAreResizeOrientation = {}));
class TextAreaBase extends react.Component {
    constructor(props) {
        super(props);
        this.handleChange = (event) => {
            // https://gomakethings.com/automatically-expand-a-textarea-as-the-user-types-using-vanilla-javascript/
            const field = event.currentTarget;
            if (this.props.autoResize && canUseDOM) {
                field.style.setProperty(c_form_control_textarea_Height.name, 'inherit');
                const computed = window.getComputedStyle(field);
                // Calculate the height
                const height = parseInt(computed.getPropertyValue('border-top-width')) +
                    parseInt(computed.getPropertyValue('padding-top')) +
                    field.scrollHeight +
                    parseInt(computed.getPropertyValue('padding-bottom')) +
                    parseInt(computed.getPropertyValue('border-bottom-width'));
                field.style.setProperty(c_form_control_textarea_Height.name, `${height}px`);
            }
            if (this.props.onChange) {
                this.props.onChange(field.value, event);
            }
        };
        if (!props.id && !props['aria-label']) {
            // eslint-disable-next-line no-console
            console.error('TextArea: TextArea requires either an id or aria-label to be specified');
        }
    }
    render() {
        const _a = this.props, { className, value, validated, isRequired, isDisabled, isIconSprite, isReadOnly, resizeOrientation, innerRef, readOnly, disabled, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        autoResize, onChange } = _a, 
        /* eslint-enable @typescript-eslint/no-unused-vars */
        props = __rest(_a, ["className", "value", "validated", "isRequired", "isDisabled", "isIconSprite", "isReadOnly", "resizeOrientation", "innerRef", "readOnly", "disabled", "autoResize", "onChange"]);
        const orientation = `resize${capitalize(resizeOrientation)}`;
        return (react.createElement("textarea", Object.assign({ className: css(formStyles$1.formControl, isIconSprite && formStyles$1.modifiers.iconSprite, className, resizeOrientation !== TextAreResizeOrientation.both && formStyles$1.modifiers[orientation], validated === ValidatedOptions.success && formStyles$1.modifiers.success, validated === ValidatedOptions.warning && formStyles$1.modifiers.warning), onChange: this.handleChange }, (typeof this.props.defaultValue !== 'string' && { value }), { "aria-invalid": validated === ValidatedOptions.error, required: isRequired, disabled: isDisabled || disabled, readOnly: isReadOnly || readOnly, ref: innerRef }, props)));
    }
}
TextAreaBase.displayName = 'TextArea';
TextAreaBase.defaultProps = {
    innerRef: react.createRef(),
    className: '',
    isRequired: false,
    isDisabled: false,
    isIconSprite: false,
    validated: 'default',
    resizeOrientation: 'both',
    'aria-label': null
};
const TextArea = react.forwardRef((props, ref) => (react.createElement(TextAreaBase, Object.assign({}, props, { innerRef: ref }))));
TextArea.displayName = 'TextArea';

const InputGroup = (_a) => {
    var { className = '', children, innerRef } = _a, props = __rest(_a, ["className", "children", "innerRef"]);
    const formCtrls = [FormSelect, TextArea, TextInput].map(comp => comp.displayName);
    const idItem = react.Children.toArray(children).find((child) => !formCtrls.includes(child.type.displayName) && child.props.id);
    const inputGroupRef = innerRef || react.useRef(null);
    return (react.createElement("div", Object.assign({ ref: inputGroupRef, className: css(styles$b.inputGroup, className) }, props), idItem
        ? react.Children.map(children, (child) => formCtrls.includes(child.type.displayName)
            ? react.cloneElement(child, { 'aria-describedby': idItem.props.id })
            : child)
        : children));
};
InputGroup.displayName = 'InputGroup';

const AngleLeftIconConfig = {
  name: 'AngleLeftIcon',
  height: 512,
  width: 256,
  svgPath: 'M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z',
  yOffset: 0,
  xOffset: 0,
};

const AngleLeftIcon = createIcon(AngleLeftIconConfig);

import('../common/calendar-month-76072e54.js');
var styles$c = {
  calendarMonth: "pf-c-calendar-month",
  calendarMonthCalendar: "pf-c-calendar-month__calendar",
  calendarMonthDate: "pf-c-calendar-month__date",
  calendarMonthDatesCell: "pf-c-calendar-month__dates-cell",
  calendarMonthDatesRow: "pf-c-calendar-month__dates-row",
  calendarMonthDay: "pf-c-calendar-month__day",
  calendarMonthDays: "pf-c-calendar-month__days",
  calendarMonthHeader: "pf-c-calendar-month__header",
  calendarMonthHeaderMonth: "pf-c-calendar-month__header-month",
  calendarMonthHeaderNavControl: "pf-c-calendar-month__header-nav-control",
  calendarMonthHeaderYear: "pf-c-calendar-month__header-year",
  modifiers: {
    prevMonth: "pf-m-prev-month",
    nextMonth: "pf-m-next-month",
    current: "pf-m-current",
    inRange: "pf-m-in-range",
    startRange: "pf-m-start-range",
    endRange: "pf-m-end-range",
    adjacentMonth: "pf-m-adjacent-month",
    selected: "pf-m-selected",
    disabled: "pf-m-disabled",
    hover: "pf-m-hover",
    focus: "pf-m-focus"
  },
  themeDark: "pf-theme-dark"
};

var Weekday;
(function (Weekday) {
    Weekday[Weekday["Sunday"] = 0] = "Sunday";
    Weekday[Weekday["Monday"] = 1] = "Monday";
    Weekday[Weekday["Tuesday"] = 2] = "Tuesday";
    Weekday[Weekday["Wednesday"] = 3] = "Wednesday";
    Weekday[Weekday["Thursday"] = 4] = "Thursday";
    Weekday[Weekday["Friday"] = 5] = "Friday";
    Weekday[Weekday["Saturday"] = 6] = "Saturday";
})(Weekday || (Weekday = {}));
// Must be numeric given current header design
const yearFormat = (date) => date.getFullYear();
const buildCalendar = (year, month, weekStart, validators) => {
    const defaultDate = new Date(year, month);
    const firstDayOfWeek = new Date(defaultDate);
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay() + weekStart);
    // We will show a maximum of 6 weeks like Google calendar
    // Assume we just want the numbers for now...
    const calendarWeeks = [];
    for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
            const date = new Date(firstDayOfWeek);
            week.push({
                date,
                isValid: validators.every(validator => validator(date))
            });
            firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
        }
        calendarWeeks.push(week);
        if (firstDayOfWeek.getMonth() !== defaultDate.getMonth()) {
            break;
        }
    }
    return calendarWeeks;
};
const isSameDate = (d1, d2) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
const isValidDate = (date) => Boolean(date && !isNaN(date));
const today = new Date();
const CalendarMonth = (_a) => {
    var { date: dateProp, locale = undefined, monthFormat = date => date.toLocaleDateString(locale, { month: 'long' }), weekdayFormat = date => date.toLocaleDateString(locale, { weekday: 'narrow' }), longWeekdayFormat = date => date.toLocaleDateString(locale, { weekday: 'long' }), dayFormat = date => date.getDate(), weekStart = 0, // Use the American Sunday as a default
    onChange = () => { }, validators = [() => true], className, onSelectToggle = () => { }, rangeStart, prevMonthAriaLabel = 'Previous month', nextMonthAriaLabel = 'Next month', yearInputAriaLabel = 'Select year', cellAriaLabel, isDateFocused = false } = _a, props = __rest(_a, ["date", "locale", "monthFormat", "weekdayFormat", "longWeekdayFormat", "dayFormat", "weekStart", "onChange", "validators", "className", "onSelectToggle", "rangeStart", "prevMonthAriaLabel", "nextMonthAriaLabel", "yearInputAriaLabel", "cellAriaLabel", "isDateFocused"]);
    const longMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(monthNum => new Date(1990, monthNum)).map(monthFormat);
    const [isSelectOpen, setIsSelectOpen] = react.useState(false);
    // eslint-disable-next-line prefer-const
    const [focusedDate, setFocusedDate] = react.useState(() => {
        const initDate = new Date(dateProp);
        if (isValidDate(initDate)) {
            return initDate;
        }
        else {
            if (isValidDate(rangeStart)) {
                return rangeStart;
            }
            else {
                return today;
            }
        }
    });
    const [hoveredDate, setHoveredDate] = react.useState(new Date(focusedDate));
    const focusRef = react.useRef();
    const [hiddenMonthId] = react.useState(getUniqueId('hidden-month-span'));
    const [shouldFocus, setShouldFocus] = react.useState(false);
    const isValidated = (date) => validators.every(validator => validator(date));
    const focusedDateValidated = isValidated(focusedDate);
    react.useEffect(() => {
        if (isValidDate(dateProp) && !isSameDate(focusedDate, dateProp)) {
            setFocusedDate(dateProp);
        }
        else if (!dateProp) {
            setFocusedDate(today);
        }
    }, [dateProp]);
    react.useEffect(() => {
        // Calendar month should not be focused on page load
        // Datepicker should place focus in calendar month when opened
        if ((shouldFocus || isDateFocused) && focusedDateValidated && focusRef.current) {
            focusRef.current.focus();
        }
        else {
            setShouldFocus(true);
        }
    }, [focusedDate, isDateFocused, focusedDateValidated, focusRef]);
    const onMonthClick = (newDate) => {
        setFocusedDate(newDate);
        setHoveredDate(newDate);
        setShouldFocus(false);
    };
    const onKeyDown = (ev) => {
        const newDate = new Date(focusedDate);
        if (ev.key === 'ArrowUp') {
            newDate.setDate(newDate.getDate() - 7);
        }
        else if (ev.key === 'ArrowRight') {
            newDate.setDate(newDate.getDate() + 1);
        }
        else if (ev.key === 'ArrowDown') {
            newDate.setDate(newDate.getDate() + 7);
        }
        else if (ev.key === 'ArrowLeft') {
            newDate.setDate(newDate.getDate() - 1);
        }
        if (newDate.getTime() !== focusedDate.getTime() && isValidated(newDate)) {
            ev.preventDefault();
            setFocusedDate(newDate);
            setHoveredDate(newDate);
            setShouldFocus(true);
        }
    };
    const addMonth = (toAdd) => {
        const newDate = new Date(focusedDate);
        newDate.setMonth(newDate.getMonth() + toAdd);
        return newDate;
    };
    const prevMonth = addMonth(-1);
    const nextMonth = addMonth(1);
    const focusedYear = focusedDate.getFullYear();
    const focusedMonth = focusedDate.getMonth();
    const calendar = react.useMemo(() => buildCalendar(focusedYear, focusedMonth, weekStart, validators), [
        focusedYear,
        focusedMonth,
        weekStart,
        validators
    ]);
    if (!focusedDateValidated) {
        const toFocus = calendar
            .reduce((acc, cur) => [...acc, ...cur], [])
            .filter(({ date, isValid }) => isValid && date.getMonth() === focusedMonth)
            .map(({ date }) => ({ date, days: Math.abs(focusedDate.getTime() - date.getTime()) }))
            .sort((o1, o2) => o1.days - o2.days)
            .map(({ date }) => date)[0];
        if (toFocus) {
            setFocusedDate(toFocus);
            setHoveredDate(toFocus);
        }
    }
    const isHoveredDateValid = isValidated(hoveredDate);
    const monthFormatted = monthFormat(focusedDate);
    const yearFormatted = yearFormat(focusedDate);
    return (react.createElement("div", Object.assign({ className: css(styles$c.calendarMonth, className) }, props),
        react.createElement("div", { className: styles$c.calendarMonthHeader },
            react.createElement("div", { className: css(styles$c.calendarMonthHeaderNavControl, styles$c.modifiers.prevMonth) },
                react.createElement(Button, { variant: "plain", "aria-label": prevMonthAriaLabel, onClick: () => onMonthClick(prevMonth) },
                    react.createElement(AngleLeftIcon, { "aria-hidden": true }))),
            react.createElement(InputGroup, null,
                react.createElement("div", { className: styles$c.calendarMonthHeaderMonth },
                    react.createElement("span", { id: hiddenMonthId, hidden: true }, "Month"),
                    react.createElement(Select
                    // Max width with "September"
                    , { 
                        // Max width with "September"
                        width: "140px", "aria-labelledby": hiddenMonthId, isOpen: isSelectOpen, onToggle: () => {
                            setIsSelectOpen(!isSelectOpen);
                            onSelectToggle(!isSelectOpen);
                        }, onSelect: (_ev, monthNum) => {
                            // When we put CalendarMonth in a Popover we want the Popover's onDocumentClick
                            // to see the SelectOption as a child so it doesn't close the Popover.
                            setTimeout(() => {
                                setIsSelectOpen(false);
                                onSelectToggle(false);
                                const newDate = new Date(focusedDate);
                                newDate.setMonth(Number(monthNum));
                                setFocusedDate(newDate);
                                setHoveredDate(newDate);
                                setShouldFocus(false);
                            }, 0);
                        }, variant: "single", selections: monthFormatted }, longMonths.map((longMonth, index) => (react.createElement(SelectOption, { key: index, value: index, isSelected: longMonth === monthFormatted }, longMonth))))),
                react.createElement("div", { className: styles$c.calendarMonthHeaderYear },
                    react.createElement(TextInput, { "aria-label": yearInputAriaLabel, type: "number", value: yearFormatted, onChange: year => {
                            const newDate = new Date(focusedDate);
                            newDate.setFullYear(+year);
                            setFocusedDate(newDate);
                            setHoveredDate(newDate);
                            setShouldFocus(false);
                        } }))),
            react.createElement("div", { className: css(styles$c.calendarMonthHeaderNavControl, styles$c.modifiers.nextMonth) },
                react.createElement(Button, { variant: "plain", "aria-label": nextMonthAriaLabel, onClick: () => onMonthClick(nextMonth) },
                    react.createElement(AngleRightIcon, { "aria-hidden": true })))),
        react.createElement("table", { className: styles$c.calendarMonthCalendar },
            react.createElement("thead", { className: styles$c.calendarMonthDays },
                react.createElement("tr", null, calendar[0].map(({ date }, index) => (react.createElement("th", { key: index, className: styles$c.calendarMonthDay, scope: "col" },
                    react.createElement("span", { className: "pf-screen-reader" }, longWeekdayFormat(date)),
                    react.createElement("span", { "aria-hidden": true }, weekdayFormat(date))))))),
            react.createElement("tbody", { onKeyDown: onKeyDown }, calendar.map((week, index) => (react.createElement("tr", { key: index, className: styles$c.calendarMonthDatesRow }, week.map(({ date, isValid }, index) => {
                const dayFormatted = dayFormat(date);
                const isToday = isSameDate(date, today);
                const isSelected = isValidDate(dateProp) && isSameDate(date, dateProp);
                const isFocused = isSameDate(date, focusedDate);
                const isAdjacentMonth = date.getMonth() !== focusedDate.getMonth();
                const isRangeStart = isValidDate(rangeStart) && isSameDate(date, rangeStart);
                let isInRange = false;
                let isRangeEnd = false;
                if (isValidDate(rangeStart) && isValidDate(dateProp)) {
                    isInRange = date > rangeStart && date < dateProp;
                    isRangeEnd = isSameDate(date, dateProp);
                }
                else if (isValidDate(rangeStart) && isHoveredDateValid) {
                    if (hoveredDate > rangeStart || isSameDate(hoveredDate, rangeStart)) {
                        isInRange = date > rangeStart && date < hoveredDate;
                        isRangeEnd = isSameDate(date, hoveredDate);
                    }
                    // Don't handle focused dates before start dates for now.
                    // Core would likely need new styles
                }
                return (react.createElement("td", { key: index, className: css(styles$c.calendarMonthDatesCell, isAdjacentMonth && styles$c.modifiers.adjacentMonth, isToday && styles$c.modifiers.current, (isSelected || isRangeStart) && styles$c.modifiers.selected, !isValid && styles$c.modifiers.disabled, (isInRange || isRangeStart || isRangeEnd) && styles$c.modifiers.inRange, isRangeStart && styles$c.modifiers.startRange, isRangeEnd && styles$c.modifiers.endRange) },
                    react.createElement("button", Object.assign({ className: css(styles$c.calendarMonthDate, isRangeEnd && styles$c.modifiers.hover, !isValid && styles$c.modifiers.disabled), type: "button", onClick: () => onChange(date), onMouseOver: () => setHoveredDate(date), tabIndex: isFocused ? 0 : -1, disabled: !isValid, "aria-label": cellAriaLabel ? cellAriaLabel(date) : `${dayFormatted} ${monthFormatted} ${yearFormatted}` }, (isFocused && { ref: focusRef })), dayFormatted)));
            }))))))));
};

import('../common/card-4f177426.js');
var styles$d = {
  card: "pf-c-card",
  cardActions: "pf-c-card__actions",
  cardBody: "pf-c-card__body",
  cardExpandableContent: "pf-c-card__expandable-content",
  cardFooter: "pf-c-card__footer",
  cardHeader: "pf-c-card__header",
  cardHeaderToggle: "pf-c-card__header-toggle",
  cardHeaderToggleIcon: "pf-c-card__header-toggle-icon",
  cardSrInput: "pf-c-card__sr-input",
  cardTitle: "pf-c-card__title",
  divider: "pf-c-divider",
  modifiers: {
    hoverable: "pf-m-hoverable",
    selectable: "pf-m-selectable",
    selected: "pf-m-selected",
    hoverableRaised: "pf-m-hoverable-raised",
    selectableRaised: "pf-m-selectable-raised",
    nonSelectableRaised: "pf-m-non-selectable-raised",
    selectedRaised: "pf-m-selected-raised",
    compact: "pf-m-compact",
    displayLg: "pf-m-display-lg",
    flat: "pf-m-flat",
    plain: "pf-m-plain",
    rounded: "pf-m-rounded",
    expanded: "pf-m-expanded",
    fullHeight: "pf-m-full-height",
    toggleRight: "pf-m-toggle-right",
    noOffset: "pf-m-no-offset",
    noFill: "pf-m-no-fill",
    overpassFont: "pf-m-overpass-font"
  },
  themeDark: "pf-theme-dark"
};

const CardContext = react.createContext({
    cardId: '',
    registerTitleId: () => { },
    isExpanded: false
});
const Card = (_a) => {
    var { children = null, id = '', className = '', component = 'article', isHoverable = false, isCompact = false, isSelectable = false, isSelectableRaised = false, isSelected = false, isDisabledRaised = false, isFlat = false, isExpanded = false, isRounded = false, isLarge = false, isFullHeight = false, isPlain = false, ouiaId, ouiaSafe = true, hasSelectableInput = false, selectableInputAriaLabel, onSelectableInputChange = () => { } } = _a, props = __rest(_a, ["children", "id", "className", "component", "isHoverable", "isCompact", "isSelectable", "isSelectableRaised", "isSelected", "isDisabledRaised", "isFlat", "isExpanded", "isRounded", "isLarge", "isFullHeight", "isPlain", "ouiaId", "ouiaSafe", "hasSelectableInput", "selectableInputAriaLabel", "onSelectableInputChange"]);
    const Component = component;
    const ouiaProps = useOUIAProps(Card.displayName, ouiaId, ouiaSafe);
    const [titleId, setTitleId] = react.useState('');
    const [ariaProps, setAriaProps] = react.useState();
    if (isCompact && isLarge) {
        // eslint-disable-next-line no-console
        console.warn('Card: Cannot use isCompact with isLarge. Defaulting to isCompact');
        isLarge = false;
    }
    const getSelectableModifiers = () => {
        if (isDisabledRaised) {
            return css(styles$d.modifiers.nonSelectableRaised);
        }
        if (isSelectableRaised) {
            return css(styles$d.modifiers.selectableRaised, isSelected && styles$d.modifiers.selectedRaised);
        }
        if (isSelectable || isHoverable) {
            return css(styles$d.modifiers.selectable, isSelected && styles$d.modifiers.selected);
        }
        return '';
    };
    const containsCardTitleChildRef = react.useRef(false);
    const registerTitleId = (id) => {
        setTitleId(id);
        containsCardTitleChildRef.current = !!id;
    };
    react.useEffect(() => {
        if (selectableInputAriaLabel) {
            setAriaProps({ 'aria-label': selectableInputAriaLabel });
        }
        else if (titleId) {
            setAriaProps({ 'aria-labelledby': titleId });
        }
        else if (hasSelectableInput && !containsCardTitleChildRef.current) {
            setAriaProps({});
            // eslint-disable-next-line no-console
            console.warn('If no CardTitle component is passed as a child of Card the selectableInputAriaLabel prop must be passed');
        }
    }, [hasSelectableInput, selectableInputAriaLabel, titleId]);
    return (react.createElement(CardContext.Provider, { value: {
            cardId: id,
            registerTitleId,
            isExpanded
        } },
        hasSelectableInput && (react.createElement("input", Object.assign({ className: "pf-screen-reader", id: `${id}-input` }, ariaProps, { type: "checkbox", checked: isSelected, onChange: event => onSelectableInputChange(id, event), disabled: isDisabledRaised, tabIndex: -1 }))),
        react.createElement(Component, Object.assign({ id: id, className: css(styles$d.card, isCompact && styles$d.modifiers.compact, isExpanded && styles$d.modifiers.expanded, isFlat && styles$d.modifiers.flat, isRounded && styles$d.modifiers.rounded, isLarge && styles$d.modifiers.displayLg, isFullHeight && styles$d.modifiers.fullHeight, isPlain && styles$d.modifiers.plain, getSelectableModifiers(), className), tabIndex: isSelectable || isSelectableRaised ? '0' : undefined }, props, ouiaProps), children)));
};
Card.displayName = 'Card';

const CardActions = (_a) => {
    var { children = null, className = '', hasNoOffset = false } = _a, props = __rest(_a, ["children", "className", "hasNoOffset"]);
    return (react.createElement("div", Object.assign({ className: css(styles$d.cardActions, hasNoOffset && styles$d.modifiers.noOffset, className) }, props), children));
};
CardActions.displayName = 'CardActions';

const CardBody = (_a) => {
    var { children = null, className = '', component = 'div', isFilled = true } = _a, props = __rest(_a, ["children", "className", "component", "isFilled"]);
    const Component = component;
    return (react.createElement(Component, Object.assign({ className: css(styles$d.cardBody, !isFilled && styles$d.modifiers.noFill, className) }, props), children));
};
CardBody.displayName = 'CardBody';

const CardFooter = (_a) => {
    var { children = null, className = '', component = 'div' } = _a, props = __rest(_a, ["children", "className", "component"]);
    const Component = component;
    return (react.createElement(Component, Object.assign({ className: css(styles$d.cardFooter, className) }, props), children));
};
CardFooter.displayName = 'CardFooter';

const CardTitle = (_a) => {
    var { children = null, className = '', component = 'div' } = _a, props = __rest(_a, ["children", "className", "component"]);
    const { cardId, registerTitleId } = react.useContext(CardContext);
    const Component = component;
    const titleId = cardId ? `${cardId}-title` : '';
    react.useEffect(() => {
        registerTitleId(titleId);
        return () => registerTitleId('');
    }, [registerTitleId, titleId]);
    return (react.createElement(Component, Object.assign({ className: css(styles$d.cardTitle, className), id: titleId || undefined }, props), children));
};
CardTitle.displayName = 'CardTitle';

const CardHeader = (_a) => {
    var { children = null, className = '', id, onExpand, toggleButtonProps, isToggleRightAligned } = _a, props = __rest(_a, ["children", "className", "id", "onExpand", "toggleButtonProps", "isToggleRightAligned"]);
    return (react.createElement(CardContext.Consumer, null, ({ cardId }) => {
        const cardHeaderToggle = (react.createElement("div", { className: css(styles$d.cardHeaderToggle) },
            react.createElement(Button, Object.assign({ variant: "plain", type: "button", onClick: evt => {
                    onExpand(evt, cardId);
                } }, toggleButtonProps),
                react.createElement("span", { className: css(styles$d.cardHeaderToggleIcon) },
                    react.createElement(AngleRightIcon, { "aria-hidden": "true" })))));
        return (react.createElement("div", Object.assign({ className: css(styles$d.cardHeader, isToggleRightAligned && styles$d.modifiers.toggleRight, className), id: id }, props),
            onExpand && !isToggleRightAligned && cardHeaderToggle,
            children,
            onExpand && isToggleRightAligned && cardHeaderToggle));
    }));
};
CardHeader.displayName = 'CardHeader';

import('../common/clipboard-copy-0c2a39de.js');
var styles$e = {
  button: "pf-c-button",
  clipboardCopy: "pf-c-clipboard-copy",
  clipboardCopyActions: "pf-c-clipboard-copy__actions",
  clipboardCopyActionsItem: "pf-c-clipboard-copy__actions-item",
  clipboardCopyExpandableContent: "pf-c-clipboard-copy__expandable-content",
  clipboardCopyGroup: "pf-c-clipboard-copy__group",
  clipboardCopyText: "pf-c-clipboard-copy__text",
  clipboardCopyToggleIcon: "pf-c-clipboard-copy__toggle-icon",
  modifiers: {
    expanded: "pf-m-expanded",
    inline: "pf-m-inline",
    block: "pf-m-block",
    code: "pf-m-code"
  },
  themeDark: "pf-theme-dark"
};

const ClipboardCopyButton = (_a) => {
    var { onClick, exitDelay = 0, entryDelay = 300, maxWidth = '100px', position = 'top', 'aria-label': ariaLabel = 'Copyable input', id, textId, children, variant = 'control' } = _a, props = __rest(_a, ["onClick", "exitDelay", "entryDelay", "maxWidth", "position", 'aria-label', "id", "textId", "children", "variant"]);
    return (react.createElement(Tooltip, { trigger: "mouseenter focus click", exitDelay: exitDelay, entryDelay: entryDelay, maxWidth: maxWidth, position: position, "aria-live": "polite", aria: "none", content: react.createElement("div", null, children) },
        react.createElement(Button, Object.assign({ type: "button", variant: variant, onClick: onClick, "aria-label": ariaLabel, id: id, "aria-labelledby": `${id} ${textId}` }, props),
            react.createElement(CopyIcon, null))));
};
ClipboardCopyButton.displayName = 'ClipboardCopyButton';

const ClipboardCopyToggle = (_a) => {
    var { onClick, id, textId, contentId, isExpanded = false } = _a, props = __rest(_a, ["onClick", "id", "textId", "contentId", "isExpanded"]);
    return (react.createElement(Button, Object.assign({ type: "button", variant: "control", onClick: onClick, id: id, "aria-labelledby": `${id} ${textId}`, "aria-controls": `${id} ${contentId}`, "aria-expanded": isExpanded }, props), isExpanded ? react.createElement(AngleDownIcon, { "aria-hidden": "true" }) : react.createElement(AngleRightIcon, { "aria-hidden": "true" })));
};
ClipboardCopyToggle.displayName = 'ClipboardCopyToggle';

class ClipboardCopyExpanded extends react.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const _a = this.props, { className, children, onChange, isReadOnly, isCode } = _a, props = __rest(_a, ["className", "children", "onChange", "isReadOnly", "isCode"]);
        return (react.createElement("div", Object.assign({ suppressContentEditableWarning: true, className: css(styles$e.clipboardCopyExpandableContent, className), onInput: (e) => onChange(e.target.innerText, e), contentEditable: !isReadOnly }, props), isCode ? react.createElement("pre", null, children) : children));
    }
}
ClipboardCopyExpanded.displayName = 'ClipboardCopyExpanded';
ClipboardCopyExpanded.defaultProps = {
    onChange: () => undefined,
    className: '',
    isReadOnly: false,
    isCode: false
};

const clipboardCopyFunc = (event, text) => {
    const clipboard = event.currentTarget.parentElement;
    const el = document.createElement('textarea');
    el.value = text.toString();
    clipboard.appendChild(el);
    el.select();
    document.execCommand('copy');
    clipboard.removeChild(el);
};
var ClipboardCopyVariant;
(function (ClipboardCopyVariant) {
    ClipboardCopyVariant["inline"] = "inline";
    ClipboardCopyVariant["expansion"] = "expansion";
    ClipboardCopyVariant["inlineCompact"] = "inline-compact";
})(ClipboardCopyVariant || (ClipboardCopyVariant = {}));
class ClipboardCopy extends react.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.componentDidUpdate = (prevProps, prevState) => {
            if (prevProps.children !== this.props.children) {
                this.updateText(this.props.children);
            }
        };
        this.componentWillUnmount = () => {
            if (this.timer) {
                window.clearTimeout(this.timer);
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.expandContent = (_event) => {
            this.setState(prevState => ({
                expanded: !prevState.expanded
            }));
        };
        this.updateText = (text) => {
            this.setState({ text });
            this.props.onChange(text);
        };
        this.render = () => {
            const _a = this.props, { 
            /* eslint-disable @typescript-eslint/no-unused-vars */
            isExpanded, onChange, // Don't pass to <div>
            /* eslint-enable @typescript-eslint/no-unused-vars */
            isReadOnly, isCode, isBlock, exitDelay, maxWidth, entryDelay, switchDelay, onCopy, hoverTip, clickTip, textAriaLabel, toggleAriaLabel, variant, position, className, additionalActions } = _a, divProps = __rest(_a, ["isExpanded", "onChange", "isReadOnly", "isCode", "isBlock", "exitDelay", "maxWidth", "entryDelay", "switchDelay", "onCopy", "hoverTip", "clickTip", "textAriaLabel", "toggleAriaLabel", "variant", "position", "className", "additionalActions"]);
            const textIdPrefix = 'text-input-';
            const toggleIdPrefix = 'toggle-';
            const contentIdPrefix = 'content-';
            return (react.createElement("div", Object.assign({ className: css(styles$e.clipboardCopy, variant === 'inline-compact' && styles$e.modifiers.inline, isBlock && styles$e.modifiers.block, this.state.expanded && styles$e.modifiers.expanded, className) }, divProps),
                variant === 'inline-compact' && (react.createElement(GenerateId, { prefix: "" }, id => (react.createElement(react.Fragment, null,
                    !isCode && (react.createElement("span", { className: css(styles$e.clipboardCopyText), id: `${textIdPrefix}${id}` }, this.state.text)),
                    isCode && (react.createElement("code", { className: css(styles$e.clipboardCopyText, styles$e.modifiers.code), id: `${textIdPrefix}${id}` }, this.state.text)),
                    react.createElement("span", { className: css(styles$e.clipboardCopyActions) },
                        react.createElement("span", { className: css(styles$e.clipboardCopyActionsItem) },
                            react.createElement(ClipboardCopyButton, { variant: "plain", exitDelay: exitDelay, entryDelay: entryDelay, maxWidth: maxWidth, position: position, id: `copy-button-${id}`, textId: `text-input-${id}`, "aria-label": hoverTip, onClick: (event) => {
                                    if (this.timer) {
                                        window.clearTimeout(this.timer);
                                        this.setState({ copied: false });
                                    }
                                    onCopy(event, this.state.text);
                                    this.setState({ copied: true }, () => {
                                        this.timer = window.setTimeout(() => {
                                            this.setState({ copied: false });
                                            this.timer = null;
                                        }, switchDelay);
                                    });
                                } }, this.state.copied ? clickTip : hoverTip)),
                        additionalActions && additionalActions))))),
                variant !== 'inline-compact' && (react.createElement(GenerateId, { prefix: "" }, id => (react.createElement(react.Fragment, null,
                    react.createElement("div", { className: css(styles$e.clipboardCopyGroup) },
                        variant === 'expansion' && (react.createElement(ClipboardCopyToggle, { isExpanded: this.state.expanded, onClick: this.expandContent, id: `${toggleIdPrefix}${id}`, textId: `${textIdPrefix}${id}`, contentId: `${contentIdPrefix}${id}`, "aria-label": toggleAriaLabel })),
                        react.createElement(TextInput, { isReadOnly: isReadOnly || this.state.expanded, onChange: this.updateText, value: this.state.text, id: `text-input-${id}`, "aria-label": textAriaLabel }),
                        react.createElement(ClipboardCopyButton, { exitDelay: exitDelay, entryDelay: entryDelay, maxWidth: maxWidth, position: position, id: `copy-button-${id}`, textId: `text-input-${id}`, "aria-label": hoverTip, onClick: (event) => {
                                if (this.timer) {
                                    window.clearTimeout(this.timer);
                                    this.setState({ copied: false });
                                }
                                onCopy(event, this.state.text);
                                this.setState({ copied: true }, () => {
                                    this.timer = window.setTimeout(() => {
                                        this.setState({ copied: false });
                                        this.timer = null;
                                    }, switchDelay);
                                });
                            } }, this.state.copied ? clickTip : hoverTip)),
                    this.state.expanded && (react.createElement(ClipboardCopyExpanded, { isReadOnly: isReadOnly, isCode: isCode, id: `content-${id}`, onChange: this.updateText }, this.state.text))))))));
        };
        this.state = {
            text: Array.isArray(this.props.children)
                ? this.props.children.join('')
                : this.props.children,
            expanded: this.props.isExpanded,
            copied: false
        };
    }
}
ClipboardCopy.displayName = 'ClipboardCopy';
ClipboardCopy.defaultProps = {
    hoverTip: 'Copy to clipboard',
    clickTip: 'Successfully copied to clipboard!',
    isReadOnly: false,
    isExpanded: false,
    isCode: false,
    variant: 'inline',
    position: PopoverPosition.top,
    maxWidth: '150px',
    exitDelay: 1600,
    entryDelay: 300,
    switchDelay: 2000,
    onCopy: clipboardCopyFunc,
    onChange: () => undefined,
    textAriaLabel: 'Copyable input',
    toggleAriaLabel: 'Show content',
    additionalActions: null
};

import('../common/code-block-ac0c7dba.js');
var styles$f = {
  codeBlock: "pf-c-code-block",
  codeBlockActions: "pf-c-code-block__actions",
  codeBlockCode: "pf-c-code-block__code",
  codeBlockContent: "pf-c-code-block__content",
  codeBlockHeader: "pf-c-code-block__header",
  codeBlockPre: "pf-c-code-block__pre"
};

const CodeBlock = (_a) => {
    var { children = null, className, actions = null } = _a, props = __rest(_a, ["children", "className", "actions"]);
    return (react.createElement("div", Object.assign({ className: css(styles$f.codeBlock, className) }, props),
        react.createElement("div", { className: css(styles$f.codeBlockHeader) },
            react.createElement("div", { className: css(styles$f.codeBlockActions) }, actions && actions)),
        react.createElement("div", { className: css(styles$f.codeBlockContent) }, children)));
};
CodeBlock.displayName = 'CodeBlock';

const CodeBlockAction = (_a) => {
    var { children = null, className } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("div", Object.assign({ className: css('pf-c-code-block__actions-item', className) }, props), children));
};
CodeBlockAction.displayName = 'CodeBlockAction';

import('../common/context-selector-8db4a4ae.js');
var styles$g = {
  contextSelector: "pf-c-context-selector",
  contextSelectorMenu: "pf-c-context-selector__menu",
  contextSelectorMenuFooter: "pf-c-context-selector__menu-footer",
  contextSelectorMenuList: "pf-c-context-selector__menu-list",
  contextSelectorMenuListItem: "pf-c-context-selector__menu-list-item",
  contextSelectorMenuSearch: "pf-c-context-selector__menu-search",
  contextSelectorToggle: "pf-c-context-selector__toggle",
  contextSelectorToggleIcon: "pf-c-context-selector__toggle-icon",
  contextSelectorToggleText: "pf-c-context-selector__toggle-text",
  modifiers: {
    fullHeight: "pf-m-full-height",
    large: "pf-m-large",
    pageInsets: "pf-m-page-insets",
    active: "pf-m-active",
    expanded: "pf-m-expanded",
    plain: "pf-m-plain",
    text: "pf-m-text",
    disabled: "pf-m-disabled"
  },
  themeDark: "pf-theme-dark"
};

class ContextSelectorToggle extends react.Component {
    constructor() {
        super(...arguments);
        this.toggle = react.createRef();
        this.componentDidMount = () => {
            document.addEventListener('mousedown', this.onDocClick);
            document.addEventListener('touchstart', this.onDocClick);
            document.addEventListener('keydown', this.onEscPress);
        };
        this.componentWillUnmount = () => {
            document.removeEventListener('mousedown', this.onDocClick);
            document.removeEventListener('touchstart', this.onDocClick);
            document.removeEventListener('keydown', this.onEscPress);
        };
        this.onDocClick = (event) => {
            const { isOpen, parentRef, onToggle } = this.props;
            if (isOpen && (parentRef === null || parentRef === void 0 ? void 0 : parentRef.current) && !parentRef.current.contains(event.target)) {
                onToggle(null, false);
                this.toggle.current.focus();
            }
        };
        this.onEscPress = (event) => {
            const { isOpen, onToggle } = this.props;
            const keyCode = event.keyCode || event.which;
            if (isOpen && keyCode === KEY_CODES.ESCAPE_KEY) {
                onToggle(null, false);
                this.toggle.current.focus();
            }
        };
        this.onKeyDown = (event) => {
            const { isOpen, onToggle, onEnter } = this.props;
            if ((event.keyCode === KEY_CODES.TAB && !isOpen) || event.key !== KEY_CODES.ENTER) {
                return;
            }
            event.preventDefault();
            if ((event.keyCode === KEY_CODES.TAB || event.keyCode === KEY_CODES.ENTER || event.key !== KEY_CODES.SPACE) &&
                isOpen) {
                onToggle(null, !isOpen);
            }
            else if ((event.keyCode === KEY_CODES.ENTER || event.key === ' ') && !isOpen) {
                onToggle(null, !isOpen);
                onEnter();
            }
        };
    }
    render() {
        const _a = this.props, { className, toggleText, isOpen, onToggle, id, isPlain, isText, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        isActive, onEnter, parentRef } = _a, 
        /* eslint-enable @typescript-eslint/no-unused-vars */
        props = __rest(_a, ["className", "toggleText", "isOpen", "onToggle", "id", "isPlain", "isText", "isActive", "onEnter", "parentRef"]);
        return (react.createElement("button", Object.assign({}, props, { id: id, ref: this.toggle, className: css(styles$g.contextSelectorToggle, isActive && styles$g.modifiers.active, isPlain && styles$g.modifiers.plain, isText && styles$g.modifiers.text, className), type: "button", onClick: event => onToggle(event, !isOpen), "aria-expanded": isOpen, onKeyDown: this.onKeyDown }),
            react.createElement("span", { className: css(styles$g.contextSelectorToggleText) }, toggleText),
            react.createElement("span", { className: css(styles$g.contextSelectorToggleIcon) },
                react.createElement(CaretDownIcon, { "aria-hidden": true }))));
    }
}
ContextSelectorToggle.displayName = 'ContextSelectorToggle';
ContextSelectorToggle.defaultProps = {
    className: '',
    toggleText: '',
    isOpen: false,
    onEnter: () => undefined,
    parentRef: null,
    isActive: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onToggle: (event, value) => undefined
};

class ContextSelectorMenuList extends react.Component {
    constructor() {
        super(...arguments);
        this.refsCollection = [];
        this.sendRef = (index, ref) => {
            this.refsCollection[index] = ref;
        };
        this.render = () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const _a = this.props, { className, isOpen, children } = _a, props = __rest(_a, ["className", "isOpen", "children"]);
            return (react.createElement("ul", Object.assign({ className: css(styles$g.contextSelectorMenuList, className), hidden: !isOpen, role: "menu" }, props), this.extendChildren()));
        };
    }
    extendChildren() {
        return react.Children.map(this.props.children, (child, index) => react.cloneElement(child, {
            sendRef: this.sendRef,
            index
        }));
    }
}
ContextSelectorMenuList.displayName = 'ContextSelectorMenuList';
ContextSelectorMenuList.defaultProps = {
    children: null,
    className: '',
    isOpen: true
};

const ContextSelectorContext = react.createContext({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSelect: (event, value) => undefined
});

// seed for the aria-labelledby ID
let currentId$2 = 0;
const newId = currentId$2++;
class ContextSelector extends react.Component {
    constructor(props) {
        super(props);
        this.parentRef = react.createRef();
        this.popperRef = react.createRef();
        this.onEnterPressed = (event) => {
            if (event.charCode === KEY_CODES.ENTER) {
                this.props.onSearchButtonClick();
            }
        };
        this.state = {
            ouiaStateId: getDefaultOUIAId(ContextSelector.displayName)
        };
    }
    render() {
        const toggleId = `pf-context-selector-toggle-id-${newId}`;
        const screenReaderLabelId = `pf-context-selector-label-id-${newId}`;
        const searchButtonId = `pf-context-selector-search-button-id-${newId}`;
        const _a = this.props, { children, className, isOpen, isFullHeight, onToggle, onSelect, screenReaderLabel, toggleText, searchButtonAriaLabel, searchInputValue, onSearchInputChange, searchInputPlaceholder, onSearchButtonClick, menuAppendTo, ouiaId, ouiaSafe, isPlain, isText, footer, disableFocusTrap, isFlipEnabled } = _a, props = __rest(_a, ["children", "className", "isOpen", "isFullHeight", "onToggle", "onSelect", "screenReaderLabel", "toggleText", "searchButtonAriaLabel", "searchInputValue", "onSearchInputChange", "searchInputPlaceholder", "onSearchButtonClick", "menuAppendTo", "ouiaId", "ouiaSafe", "isPlain", "isText", "footer", "disableFocusTrap", "isFlipEnabled"]);
        const menuContainer = (react.createElement("div", Object.assign({ className: css(styles$g.contextSelectorMenu) }, (isFlipEnabled && { style: { position: 'revert' } })), isOpen && (react.createElement(FocusTrap, { active: !disableFocusTrap, focusTrapOptions: { clickOutsideDeactivates: true, tabbableOptions: { displayCheck: 'none' } } },
            react.createElement("div", { className: css(styles$g.contextSelectorMenuSearch) },
                react.createElement(InputGroup, null,
                    react.createElement(TextInput, { value: searchInputValue, type: "search", placeholder: searchInputPlaceholder, onChange: onSearchInputChange, onKeyPress: this.onEnterPressed, "aria-labelledby": searchButtonId }),
                    react.createElement(Button, { variant: ButtonVariant.control, "aria-label": searchButtonAriaLabel, id: searchButtonId, onClick: onSearchButtonClick },
                        react.createElement(SearchIcon, { "aria-hidden": "true" })))),
            react.createElement(ContextSelectorContext.Provider, { value: { onSelect } },
                react.createElement(ContextSelectorMenuList, { isOpen: isOpen }, children)),
            footer))));
        const popperContainer = (react.createElement("div", Object.assign({ className: css(styles$g.contextSelector, isOpen && styles$g.modifiers.expanded, className), ref: this.popperRef }, props), isOpen && menuContainer));
        const mainContainer = (react.createElement("div", Object.assign({ className: css(styles$g.contextSelector, isOpen && styles$g.modifiers.expanded, isFullHeight && styles$g.modifiers.fullHeight, className), ref: this.parentRef }, getOUIAProps(ContextSelector.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe), props),
            screenReaderLabel && (react.createElement("span", { id: screenReaderLabelId, hidden: true }, screenReaderLabel)),
            react.createElement(ContextSelectorToggle, { onToggle: onToggle, isOpen: isOpen, toggleText: toggleText, id: toggleId, parentRef: menuAppendTo === 'inline' ? this.parentRef : this.popperRef, "aria-labelledby": `${screenReaderLabelId} ${toggleId}`, isPlain: isPlain, isText: isText }),
            isOpen && menuAppendTo === 'inline' && menuContainer));
        const getParentElement = () => {
            if (this.parentRef && this.parentRef.current) {
                return this.parentRef.current.parentElement;
            }
            return null;
        };
        return menuAppendTo === 'inline' ? (mainContainer) : (react.createElement(Popper, { trigger: mainContainer, popper: popperContainer, appendTo: menuAppendTo === 'parent' ? getParentElement() : menuAppendTo, isVisible: isOpen }));
    }
}
ContextSelector.displayName = 'ContextSelector';
ContextSelector.defaultProps = {
    children: null,
    className: '',
    isOpen: false,
    onToggle: () => undefined,
    onSelect: () => undefined,
    screenReaderLabel: '',
    toggleText: '',
    searchButtonAriaLabel: 'Search menu items',
    searchInputValue: '',
    onSearchInputChange: () => undefined,
    searchInputPlaceholder: 'Search',
    onSearchButtonClick: () => undefined,
    menuAppendTo: 'inline',
    ouiaSafe: true,
    disableFocusTrap: false,
    footer: null,
    isPlain: false,
    isText: false,
    isFlipEnabled: false
};

class ContextSelectorItem extends react.Component {
    constructor() {
        super(...arguments);
        this.ref = react.createRef();
    }
    componentDidMount() {
        /* eslint-disable-next-line */
        this.props.sendRef(this.props.index, this.ref.current);
    }
    render() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _a = this.props, { className, children, onClick, isDisabled, index, sendRef, href } = _a, props = __rest(_a, ["className", "children", "onClick", "isDisabled", "index", "sendRef", "href"]);
        const Component = href ? 'a' : 'button';
        const isDisabledLink = href && isDisabled;
        return (react.createElement(ContextSelectorContext.Consumer, null, ({ onSelect }) => (react.createElement("li", { role: "none" },
            react.createElement(Component, Object.assign({ className: css(styles$g.contextSelectorMenuListItem, isDisabledLink && styles$g.modifiers.disabled, className), ref: this.ref, onClick: event => {
                    if (!isDisabled) {
                        onClick(event);
                        onSelect(event, children);
                    }
                }, disabled: isDisabled && !href, href: href }, (isDisabledLink && { 'aria-disabled': true, tabIndex: -1 }), props), children)))));
    }
}
ContextSelectorItem.displayName = 'ContextSelectorItem';
ContextSelectorItem.defaultProps = {
    children: null,
    className: '',
    isDisabled: false,
    onClick: () => undefined,
    index: undefined,
    sendRef: () => { },
    href: null
};

import('../common/data-list-grid-bc13505c.js');
var stylesGrid = {
  dataList: "pf-c-data-list",
  dataListCell: "pf-c-data-list__cell",
  dataListExpandableContent: "pf-c-data-list__expandable-content",
  dataListItemContent: "pf-c-data-list__item-content",
  modifiers: {
    icon: "pf-m-icon",
    alignRight: "pf-m-align-right",
    noFill: "pf-m-no-fill",
    flex_2: "pf-m-flex-2",
    flex_3: "pf-m-flex-3",
    flex_4: "pf-m-flex-4",
    flex_5: "pf-m-flex-5",
    gridNone: "pf-m-grid-none",
    gridSm: "pf-m-grid-sm",
    gridMd: "pf-m-grid-md",
    gridLg: "pf-m-grid-lg",
    gridXl: "pf-m-grid-xl",
    grid_2xl: "pf-m-grid-2xl"
  }
};

const gridBreakpointClasses = {
    none: stylesGrid.modifiers.gridNone,
    always: 'pf-m-grid',
    sm: stylesGrid.modifiers.gridSm,
    md: stylesGrid.modifiers.gridMd,
    lg: stylesGrid.modifiers.gridLg,
    xl: stylesGrid.modifiers.gridXl,
    '2xl': stylesGrid.modifiers.grid_2xl
};
var DataListWrapModifier;
(function (DataListWrapModifier) {
    DataListWrapModifier["nowrap"] = "nowrap";
    DataListWrapModifier["truncate"] = "truncate";
    DataListWrapModifier["breakWord"] = "breakWord";
})(DataListWrapModifier || (DataListWrapModifier = {}));
const DataListContext = react.createContext({
    isSelectable: false
});
const moveItem = (arr, i1, toIndex) => {
    const fromIndex = arr.indexOf(i1);
    if (fromIndex === toIndex) {
        return arr;
    }
    const temp = arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, temp[0]);
    return arr;
};
class DataList extends react.Component {
    constructor(props) {
        super(props);
        this.dragFinished = false;
        this.html5DragDrop = false;
        this.arrayCopy = react.Children.toArray(this.props.children);
        this.ref = react.createRef();
        this.state = {
            tempItemOrder: [],
            draggedItemId: null,
            draggingToItemIndex: null,
            dragging: false
        };
        this.getIndex = (id) => Array.from(this.ref.current.children).findIndex(item => item.id === id);
        this.move = (itemOrder) => {
            const ulNode = this.ref.current;
            const nodes = Array.from(ulNode.children);
            if (nodes.map(node => node.id).every((id, i) => id === itemOrder[i])) {
                return;
            }
            while (ulNode.firstChild) {
                ulNode.removeChild(ulNode.lastChild);
            }
            itemOrder.forEach(id => {
                ulNode.appendChild(nodes.find(n => n.id === id));
            });
        };
        this.dragStart0 = (el) => {
            const { onDragStart } = this.props;
            const draggedItemId = el.id;
            el.classList.add(__pika_web_default_export_for_treeshaking__.modifiers.ghostRow);
            el.setAttribute('aria-pressed', 'true');
            this.setState({
                draggedItemId,
                dragging: true
            });
            onDragStart && onDragStart(draggedItemId);
        };
        this.dragStart = (evt) => {
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('text/plain', evt.currentTarget.id);
            this.dragStart0(evt.currentTarget);
        };
        this.onDragCancel = () => {
            this.move(this.props.itemOrder);
            Array.from(this.ref.current.children).forEach(el => {
                el.classList.remove(__pika_web_default_export_for_treeshaking__.modifiers.ghostRow);
                el.classList.remove(__pika_web_default_export_for_treeshaking__.modifiers.dragOver);
                el.setAttribute('aria-pressed', 'false');
            });
            this.setState({
                draggedItemId: null,
                draggingToItemIndex: null,
                dragging: false
            });
            if (this.props.onDragCancel) {
                this.props.onDragCancel();
            }
        };
        this.dragLeave = (evt) => {
            // This event false fires when we call `this.move()`, so double check we're out of zone
            if (!this.isValidDrop(evt)) {
                this.move(this.props.itemOrder);
                this.setState({
                    draggingToItemIndex: null
                });
            }
        };
        this.dragEnd0 = (el) => {
            el.classList.remove(__pika_web_default_export_for_treeshaking__.modifiers.ghostRow);
            el.classList.remove(__pika_web_default_export_for_treeshaking__.modifiers.dragOver);
            el.setAttribute('aria-pressed', 'false');
            this.setState({
                draggedItemId: null,
                draggingToItemIndex: null,
                dragging: false
            });
        };
        this.dragEnd = (evt) => {
            this.dragEnd0(evt.target);
        };
        this.isValidDrop = (evt) => {
            const ulRect = this.ref.current.getBoundingClientRect();
            return (evt.clientX > ulRect.x &&
                evt.clientX < ulRect.x + ulRect.width &&
                evt.clientY > ulRect.y &&
                evt.clientY < ulRect.y + ulRect.height);
        };
        this.drop = (evt) => {
            if (this.isValidDrop(evt)) {
                this.props.onDragFinish(this.state.tempItemOrder);
            }
            else {
                this.onDragCancel();
            }
        };
        this.dragOver0 = (id) => {
            const draggingToItemIndex = Array.from(this.ref.current.children).findIndex(item => item.id === id);
            if (draggingToItemIndex !== this.state.draggingToItemIndex) {
                const tempItemOrder = moveItem([...this.props.itemOrder], this.state.draggedItemId, draggingToItemIndex);
                this.move(tempItemOrder);
                this.setState({
                    draggingToItemIndex,
                    tempItemOrder
                });
            }
        };
        this.dragOver = (evt) => {
            evt.preventDefault();
            const curListItem = evt.target.closest('li');
            if (!curListItem || !this.ref.current.contains(curListItem) || curListItem.id === this.state.draggedItemId) {
                // We're going nowhere, don't bother calling `dragOver0`
                return null;
            }
            else {
                this.dragOver0(curListItem.id);
            }
        };
        this.handleDragButtonKeys = (evt) => {
            const { dragging } = this.state;
            if (![' ', 'Escape', 'Enter', 'ArrowUp', 'ArrowDown'].includes(evt.key) || !this.html5DragDrop) {
                if (dragging) {
                    evt.preventDefault();
                }
                return;
            }
            evt.preventDefault();
            const dragItem = evt.target.closest('li');
            if (evt.key === ' ' || (evt.key === 'Enter' && !dragging)) {
                this.dragStart0(dragItem);
            }
            else if (dragging) {
                if (evt.key === 'Escape' || evt.key === 'Enter') {
                    this.setState({
                        dragging: false
                    });
                    this.dragFinished = true;
                    if (evt.key === 'Enter') {
                        this.dragEnd0(dragItem);
                        this.props.onDragFinish(this.state.tempItemOrder);
                    }
                    else {
                        this.onDragCancel();
                    }
                }
                else if (evt.key === 'ArrowUp') {
                    const nextSelection = dragItem.previousSibling;
                    if (nextSelection) {
                        this.dragOver0(nextSelection.id);
                        dragItem.querySelector(`.${__pika_web_default_export_for_treeshaking__.dataListItemDraggableButton}`).focus();
                    }
                }
                else if (evt.key === 'ArrowDown') {
                    const nextSelection = dragItem.nextSibling;
                    if (nextSelection) {
                        this.dragOver0(nextSelection.id);
                        dragItem.querySelector(`.${__pika_web_default_export_for_treeshaking__.dataListItemDraggableButton}`).focus();
                    }
                }
            }
        };
        this.html5DragDrop = Boolean(props.onDragFinish || props.onDragStart || props.onDragMove || props.onDragCancel);
        if (this.html5DragDrop) {
            // eslint-disable-next-line no-console
            console.warn("DataList's onDrag API is deprecated. Use DragDrop instead.");
        }
    }
    componentDidUpdate(oldProps) {
        if (this.dragFinished) {
            this.dragFinished = false;
            this.setState({
                tempItemOrder: [...this.props.itemOrder],
                draggedItemId: null,
                dragging: false
            });
        }
        if (oldProps.itemOrder !== this.props.itemOrder) {
            this.move(this.props.itemOrder);
        }
    }
    render() {
        const _a = this.props, { className, children, onSelectDataListItem, selectedDataListItemId, isCompact, wrapModifier, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        onDragStart, onDragMove, onDragCancel, onDragFinish, gridBreakpoint, itemOrder, selectableRow } = _a, 
        /* eslint-enable @typescript-eslint/no-unused-vars */
        props = __rest(_a, ["className", "children", "onSelectDataListItem", "selectedDataListItemId", "isCompact", "wrapModifier", "onDragStart", "onDragMove", "onDragCancel", "onDragFinish", "gridBreakpoint", "itemOrder", "selectableRow"]);
        const { dragging } = this.state;
        const isSelectable = onSelectDataListItem !== undefined;
        const updateSelectedDataListItem = (id) => {
            onSelectDataListItem(id);
        };
        const dragProps = this.html5DragDrop && {
            onDragOver: this.dragOver,
            onDrop: this.dragOver,
            onDragLeave: this.dragLeave
        };
        return (react.createElement(DataListContext.Provider, { value: {
                isSelectable,
                selectedDataListItemId,
                updateSelectedDataListItem,
                selectableRow,
                isDraggable: this.html5DragDrop,
                dragStart: this.dragStart,
                dragEnd: this.dragEnd,
                drop: this.drop,
                dragKeyHandler: this.handleDragButtonKeys
            } },
            react.createElement("ul", Object.assign({ className: css(__pika_web_default_export_for_treeshaking__.dataList, isCompact && __pika_web_default_export_for_treeshaking__.modifiers.compact, gridBreakpointClasses[gridBreakpoint], wrapModifier && __pika_web_default_export_for_treeshaking__.modifiers[wrapModifier], dragging && __pika_web_default_export_for_treeshaking__.modifiers.dragOver, className), style: props.style }, props, dragProps, { ref: this.ref }), children)));
    }
}
DataList.displayName = 'DataList';
DataList.defaultProps = {
    children: null,
    className: '',
    selectedDataListItemId: '',
    isCompact: false,
    gridBreakpoint: 'md',
    wrapModifier: null
};

const DataListAction = (_a) => {
    var { children, className, visibility, 
    /* eslint-disable @typescript-eslint/no-unused-vars */
    id, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, isPlainButtonAction } = _a, 
    /* eslint-enable @typescript-eslint/no-unused-vars */
    props = __rest(_a, ["children", "className", "visibility", "id", 'aria-label', 'aria-labelledby', "isPlainButtonAction"]);
    return (react.createElement("div", Object.assign({ className: css(__pika_web_default_export_for_treeshaking__.dataListItemAction, formatBreakpointMods(visibility, __pika_web_default_export_for_treeshaking__), className) }, props), isPlainButtonAction ? react.createElement("div", { className: css(__pika_web_default_export_for_treeshaking__.dataListAction) }, children) : children));
};
DataListAction.displayName = 'DataListAction';

const DataListCell = (_a) => {
    var { children = null, className = '', width = 1, isFilled = true, alignRight = false, isIcon = false, wrapModifier = null } = _a, props = __rest(_a, ["children", "className", "width", "isFilled", "alignRight", "isIcon", "wrapModifier"]);
    return (react.createElement("div", Object.assign({ className: css(__pika_web_default_export_for_treeshaking__.dataListCell, width > 1 && __pika_web_default_export_for_treeshaking__.modifiers[`flex_${width}`], !isFilled && __pika_web_default_export_for_treeshaking__.modifiers.noFill, alignRight && __pika_web_default_export_for_treeshaking__.modifiers.alignRight, isIcon && __pika_web_default_export_for_treeshaking__.modifiers.icon, className, wrapModifier && __pika_web_default_export_for_treeshaking__.modifiers[wrapModifier]) }, props), children));
};
DataListCell.displayName = 'DataListCell';

const DataListCheck = (_a) => {
    var { className = '', 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange = (checked, event) => { }, isValid = true, isDisabled = false, isChecked = null, checked = null, defaultChecked, otherControls = false } = _a, props = __rest(_a, ["className", "onChange", "isValid", "isDisabled", "isChecked", "checked", "defaultChecked", "otherControls"]);
    const check = (react.createElement("div", { className: css(__pika_web_default_export_for_treeshaking__.dataListCheck) },
        react.createElement("input", Object.assign({}, props, { type: "checkbox", onChange: event => onChange(event.currentTarget.checked, event), "aria-invalid": !isValid, disabled: isDisabled }, ([true, false].includes(defaultChecked) && { defaultChecked }), (![true, false].includes(defaultChecked) && { checked: isChecked || checked })))));
    return (react.createElement(react.Fragment, null,
        !otherControls && react.createElement("div", { className: css(__pika_web_default_export_for_treeshaking__.dataListItemControl, className) }, check),
        otherControls && check));
};
DataListCheck.displayName = 'DataListCheck';

const DataListControl = (_a) => {
    var { children, className = '' } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("div", Object.assign({ className: css(__pika_web_default_export_for_treeshaking__.dataListItemControl, className) }, props), children));
};
DataListControl.displayName = 'DataListControl';

const DataListDragButton = (_a) => {
    var { className = '', isDisabled = false } = _a, props = __rest(_a, ["className", "isDisabled"]);
    return (react.createElement(DataListContext.Consumer, null, ({ dragKeyHandler }) => (react.createElement("button", Object.assign({ className: css(__pika_web_default_export_for_treeshaking__.dataListItemDraggableButton, isDisabled && __pika_web_default_export_for_treeshaking__.modifiers.disabled, className), onKeyDown: dragKeyHandler, type: "button", disabled: isDisabled }, props),
        react.createElement("span", { className: css(__pika_web_default_export_for_treeshaking__.dataListItemDraggableIcon) },
            react.createElement(GripVerticalIcon, null))))));
};
DataListDragButton.displayName = 'DataListDragButton';

function findDataListDragButton(node) {
    if (!react.isValidElement(node)) {
        return null;
    }
    if (node.type === DataListDragButton) {
        return node;
    }
    if (node.props.children) {
        for (const child of react.Children.toArray(node.props.children)) {
            const button = findDataListDragButton(child);
            if (button) {
                return button;
            }
        }
    }
    return null;
}
class DataListItem extends react.Component {
    render() {
        const _a = this.props, { children, isExpanded, className, id, 'aria-labelledby': ariaLabelledBy, selectableInputAriaLabel } = _a, props = __rest(_a, ["children", "isExpanded", "className", "id", 'aria-labelledby', "selectableInputAriaLabel"]);
        return (react.createElement(DataListContext.Consumer, null, ({ isSelectable, selectedDataListItemId, updateSelectedDataListItem, selectableRow, isDraggable, dragStart, dragEnd, drop }) => {
            const selectDataListItem = (event) => {
                let target = event.target;
                while (event.currentTarget !== target) {
                    if (('onclick' in target && target.onclick) ||
                        target.parentNode.classList.contains(__pika_web_default_export_for_treeshaking__.dataListItemAction) ||
                        target.parentNode.classList.contains(__pika_web_default_export_for_treeshaking__.dataListItemControl)) {
                        // check other event handlers are not present.
                        return;
                    }
                    else {
                        target = target.parentNode;
                    }
                }
                updateSelectedDataListItem(id);
            };
            const onKeyDown = (event) => {
                if (event.key === KeyTypes.Enter) {
                    updateSelectedDataListItem(id);
                }
            };
            // We made the DataListDragButton determine if the entire item is draggable instead of
            // DataListItem like we should have.
            // Recursively search children for the DataListDragButton and see if it's disabled...
            const dragButton = findDataListDragButton(children);
            const dragProps = isDraggable && {
                draggable: dragButton ? !dragButton.props.isDisabled : true,
                onDrop: drop,
                onDragEnd: dragEnd,
                onDragStart: dragStart
            };
            const isSelected = selectedDataListItemId === id;
            const selectableInputAriaProps = selectableInputAriaLabel
                ? { 'aria-label': selectableInputAriaLabel }
                : { 'aria-labelledby': ariaLabelledBy };
            const selectableInputType = (selectableRow === null || selectableRow === void 0 ? void 0 : selectableRow.type) === 'multiple' ? 'checkbox' : 'radio';
            return (react.createElement("li", Object.assign({ id: id, className: css(__pika_web_default_export_for_treeshaking__.dataListItem, isExpanded && __pika_web_default_export_for_treeshaking__.modifiers.expanded, isSelectable && __pika_web_default_export_for_treeshaking__.modifiers.selectable, selectedDataListItemId && isSelected && __pika_web_default_export_for_treeshaking__.modifiers.selected, className), "aria-labelledby": ariaLabelledBy }, (isSelectable && { tabIndex: 0, onClick: selectDataListItem, onKeyDown }), (isSelectable && isSelected && { 'aria-selected': true }), props, dragProps),
                selectableRow && (react.createElement("input", Object.assign({ className: "pf-screen-reader", type: selectableInputType, checked: isSelected, onChange: event => selectableRow.onChange(id, event), tabIndex: -1 }, selectableInputAriaProps))),
                react.Children.map(children, child => react.isValidElement(child) &&
                    react.cloneElement(child, {
                        rowid: ariaLabelledBy
                    }))));
        }));
    }
}
DataListItem.displayName = 'DataListItem';
DataListItem.defaultProps = {
    isExpanded: false,
    className: '',
    id: '',
    children: null,
    'aria-labelledby': ''
};

const DataListItemCells = (_a) => {
    var { className = '', dataListCells, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rowid = '' } = _a, props = __rest(_a, ["className", "dataListCells", "rowid"]);
    return (react.createElement("div", Object.assign({ className: css(__pika_web_default_export_for_treeshaking__.dataListItemContent, className) }, props), dataListCells));
};
DataListItemCells.displayName = 'DataListItemCells';

const DataListItemRow = (_a) => {
    var { children, className = '', rowid = '', wrapModifier = null } = _a, props = __rest(_a, ["children", "className", "rowid", "wrapModifier"]);
    return (react.createElement("div", Object.assign({ className: css(__pika_web_default_export_for_treeshaking__.dataListItemRow, className, wrapModifier && __pika_web_default_export_for_treeshaking__.modifiers[wrapModifier]) }, props), react.Children.map(children, child => react.isValidElement(child) &&
        react.cloneElement(child, {
            rowid
        }))));
};
DataListItemRow.displayName = 'DataListItemRow';

const DataListToggle = (_a) => {
    var { className = '', isExpanded = false, 'aria-controls': ariaControls = '', 'aria-label': ariaLabel = 'Details', rowid = '', id } = _a, props = __rest(_a, ["className", "isExpanded", 'aria-controls', 'aria-label', "rowid", "id"]);
    return (react.createElement("div", Object.assign({ className: css(__pika_web_default_export_for_treeshaking__.dataListItemControl, className) }, props),
        react.createElement("div", { className: css(__pika_web_default_export_for_treeshaking__.dataListToggle) },
            react.createElement(Button, { id: id, variant: ButtonVariant.plain, "aria-controls": ariaControls !== '' && ariaControls, "aria-label": ariaLabel, "aria-labelledby": ariaLabel !== 'Details' ? null : `${rowid} ${id}`, "aria-expanded": isExpanded },
                react.createElement("div", { className: css(__pika_web_default_export_for_treeshaking__.dataListToggleIcon) },
                    react.createElement(AngleRightIcon, null))))));
};
DataListToggle.displayName = 'DataListToggle';

import('../common/date-picker-7e1c2764.js');
var datePickerStyles = {
  datePicker: "pf-c-date-picker",
  datePickerCalendar: "pf-c-date-picker__calendar",
  datePickerHelperText: "pf-c-date-picker__helper-text",
  datePickerInput: "pf-c-date-picker__input",
  formControl: "pf-c-form-control",
  modifiers: {
    error: "pf-m-error",
    alignRight: "pf-m-align-right",
    top: "pf-m-top"
  },
  themeDark: "pf-theme-dark"
};

const OutlinedCalendarAltIconConfig = {
  name: 'OutlinedCalendarAltIcon',
  height: 512,
  width: 448,
  svgPath: 'M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z',
  yOffset: 0,
  xOffset: 0,
};

const OutlinedCalendarAltIcon = createIcon(OutlinedCalendarAltIconConfig);

const yyyyMMddFormat = (date) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;
const DatePickerBase = (_a, ref) => {
    var { className, locale = undefined, dateFormat = yyyyMMddFormat, dateParse = (val) => val.split('-').length === 3 && new Date(`${val}T00:00:00`), isDisabled = false, placeholder = 'YYYY-MM-DD', value: valueProp = '', 'aria-label': ariaLabel = 'Date picker', buttonAriaLabel = 'Toggle date picker', onChange = () => undefined, onBlur = () => undefined, invalidFormatText = 'Invalid date', helperText, appendTo = 'parent', popoverProps, monthFormat, weekdayFormat, longWeekdayFormat, dayFormat, weekStart, validators = [], rangeStart, style: styleProps = {}, inputProps = {} } = _a, props = __rest(_a, ["className", "locale", "dateFormat", "dateParse", "isDisabled", "placeholder", "value", 'aria-label', "buttonAriaLabel", "onChange", "onBlur", "invalidFormatText", "helperText", "appendTo", "popoverProps", "monthFormat", "weekdayFormat", "longWeekdayFormat", "dayFormat", "weekStart", "validators", "rangeStart", "style", "inputProps"]);
    const [value, setValue] = react.useState(valueProp);
    const [valueDate, setValueDate] = react.useState(dateParse(value));
    const [errorText, setErrorText] = react.useState('');
    const [popoverOpen, setPopoverOpen] = react.useState(false);
    const [selectOpen, setSelectOpen] = react.useState(false);
    const [pristine, setPristine] = react.useState(true);
    const widthChars = react.useMemo(() => Math.max(dateFormat(new Date()).length, placeholder.length), [dateFormat]);
    const style = Object.assign({ '--pf-c-date-picker__input--c-form-control--width-chars': widthChars }, styleProps);
    const buttonRef = react.useRef();
    const datePickerWrapperRef = react.useRef();
    react.useEffect(() => {
        setValue(valueProp);
        setValueDate(dateParse(valueProp));
    }, [valueProp]);
    react.useEffect(() => {
        setPristine(!value);
    }, [value]);
    const setError = (date) => setErrorText(validators.map(validator => validator(date)).join('\n') || '');
    const onTextInput = (value) => {
        setValue(value);
        setErrorText('');
        const newValueDate = dateParse(value);
        setValueDate(newValueDate);
        if (isValidDate(newValueDate)) {
            onChange(value, new Date(newValueDate));
        }
        else {
            onChange(value);
        }
    };
    const onInputBlur = () => {
        if (pristine) {
            return;
        }
        const newValueDate = dateParse(value);
        if (isValidDate(newValueDate)) {
            onBlur(value, new Date(newValueDate));
            setError(newValueDate);
        }
        else {
            onBlur(value);
            setErrorText(invalidFormatText);
        }
    };
    const onDateClick = (newValueDate) => {
        const newValue = dateFormat(newValueDate);
        setValue(newValue);
        setValueDate(newValueDate);
        setError(newValueDate);
        setPopoverOpen(false);
        onChange(newValue, new Date(newValueDate));
    };
    const onKeyPress = (ev) => {
        if (ev.key === 'Enter' && value) {
            if (isValidDate(valueDate)) {
                setError(valueDate);
            }
            else {
                setErrorText(invalidFormatText);
            }
        }
    };
    react.useImperativeHandle(ref, () => ({
        setCalendarOpen: (isOpen) => setPopoverOpen(isOpen),
        toggleCalendar: (setOpen, eventKey) => {
            if (eventKey === KeyTypes.Escape && popoverOpen && !selectOpen) {
                setPopoverOpen(prev => (setOpen !== undefined ? setOpen : !prev));
            }
        },
        isCalendarOpen: popoverOpen
    }), [setPopoverOpen, popoverOpen, selectOpen]);
    const getParentElement = () => datePickerWrapperRef && datePickerWrapperRef.current ? datePickerWrapperRef.current : null;
    return (react.createElement("div", Object.assign({ className: css(datePickerStyles.datePicker, className), ref: datePickerWrapperRef, style: style }, props),
        react.createElement(Popover, Object.assign({ position: "bottom", bodyContent: react.createElement(CalendarMonth, { date: valueDate, onChange: onDateClick, locale: locale, 
                // Use truthy values of strings
                validators: validators.map(validator => (date) => !validator(date)), onSelectToggle: open => setSelectOpen(open), monthFormat: monthFormat, weekdayFormat: weekdayFormat, longWeekdayFormat: longWeekdayFormat, dayFormat: dayFormat, weekStart: weekStart, rangeStart: rangeStart, isDateFocused: true }), showClose: false, isVisible: popoverOpen, shouldClose: (_1, _2, event) => {
                event = event;
                if (event.key === KeyTypes.Escape && selectOpen) {
                    event.stopPropagation();
                    setSelectOpen(false);
                    return false;
                }
                // Let our button handle toggling
                if (buttonRef.current && buttonRef.current.contains(event.target)) {
                    return false;
                }
                setPopoverOpen(false);
                if (event.key === KeyTypes.Escape && popoverOpen) {
                    event.stopPropagation();
                }
                return true;
            }, withFocusTrap: true, hasNoPadding: true, hasAutoWidth: true, appendTo: appendTo === 'parent' ? getParentElement() : appendTo }, popoverProps),
            react.createElement("div", { className: datePickerStyles.datePickerInput },
                react.createElement(InputGroup, null,
                    react.createElement(TextInput, Object.assign({ isDisabled: isDisabled, "aria-label": ariaLabel, placeholder: placeholder, validated: errorText ? 'error' : 'default', value: value, onChange: onTextInput, onBlur: onInputBlur, onKeyPress: onKeyPress }, inputProps)),
                    react.createElement("button", { ref: buttonRef, className: css(buttonStyles.button, buttonStyles.modifiers.control), "aria-label": buttonAriaLabel, type: "button", onClick: () => setPopoverOpen(!popoverOpen), disabled: isDisabled },
                        react.createElement(OutlinedCalendarAltIcon, null))))),
        helperText && react.createElement("div", { className: datePickerStyles.datePickerHelperText }, helperText),
        errorText.trim() && react.createElement("div", { className: css(datePickerStyles.datePickerHelperText, datePickerStyles.modifiers.error) }, errorText)));
};
const DatePicker = react.forwardRef(DatePickerBase);
DatePicker.displayName = 'DatePicker';

const DescriptionListDescription = (_a) => {
    var { children = null, className } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("dd", Object.assign({ className: css(styles$K.descriptionListDescription, className) }, props),
        react.createElement("div", { className: 'pf-c-description-list__text' }, children)));
};
DescriptionListDescription.displayName = 'DescriptionListDescription';

const DescriptionListGroup = (_a) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (react.createElement("div", Object.assign({ className: css(styles$K.descriptionListGroup, className) }, props), children));
};
DescriptionListGroup.displayName = 'DescriptionListGroup';

const DescriptionListTerm = (_a) => {
    var { children, className, icon } = _a, props = __rest(_a, ["children", "className", "icon"]);
    return (react.createElement("dt", Object.assign({ className: css(styles$K.descriptionListTerm, className) }, props),
        icon ? react.createElement("span", { className: css(styles$K.descriptionListTermIcon) }, icon) : null,
        react.createElement("span", { className: css(styles$K.descriptionListText) }, children)));
};
DescriptionListTerm.displayName = 'DescriptionListTerm';

import('../common/drawer-006fa84b.js');
var styles$h = {
  drawer: "pf-c-drawer",
  drawerActions: "pf-c-drawer__actions",
  drawerBody: "pf-c-drawer__body",
  drawerClose: "pf-c-drawer__close",
  drawerContent: "pf-c-drawer__content",
  drawerHead: "pf-c-drawer__head",
  drawerMain: "pf-c-drawer__main",
  drawerPanel: "pf-c-drawer__panel",
  drawerPanelMain: "pf-c-drawer__panel-main",
  drawerSection: "pf-c-drawer__section",
  drawerSplitter: "pf-c-drawer__splitter",
  drawerSplitterHandle: "pf-c-drawer__splitter-handle",
  modifiers: {
    panelBottom: "pf-m-panel-bottom",
    inline: "pf-m-inline",
    noBorder: "pf-m-no-border",
    resizable: "pf-m-resizable",
    static: "pf-m-static",
    panelLeft: "pf-m-panel-left",
    expanded: "pf-m-expanded",
    resizing: "pf-m-resizing",
    noBackground: "pf-m-no-background",
    light_200: "pf-m-light-200",
    noPadding: "pf-m-no-padding",
    padding: "pf-m-padding",
    vertical: "pf-m-vertical",
    width_25: "pf-m-width-25",
    width_33: "pf-m-width-33",
    width_50: "pf-m-width-50",
    width_66: "pf-m-width-66",
    width_75: "pf-m-width-75",
    width_100: "pf-m-width-100",
    width_25OnLg: "pf-m-width-25-on-lg",
    width_33OnLg: "pf-m-width-33-on-lg",
    width_50OnLg: "pf-m-width-50-on-lg",
    width_66OnLg: "pf-m-width-66-on-lg",
    width_75OnLg: "pf-m-width-75-on-lg",
    width_100OnLg: "pf-m-width-100-on-lg",
    width_25OnXl: "pf-m-width-25-on-xl",
    width_33OnXl: "pf-m-width-33-on-xl",
    width_50OnXl: "pf-m-width-50-on-xl",
    width_66OnXl: "pf-m-width-66-on-xl",
    width_75OnXl: "pf-m-width-75-on-xl",
    width_100OnXl: "pf-m-width-100-on-xl",
    width_25On_2xl: "pf-m-width-25-on-2xl",
    width_33On_2xl: "pf-m-width-33-on-2xl",
    width_50On_2xl: "pf-m-width-50-on-2xl",
    width_66On_2xl: "pf-m-width-66-on-2xl",
    width_75On_2xl: "pf-m-width-75-on-2xl",
    width_100On_2xl: "pf-m-width-100-on-2xl",
    inlineOnLg: "pf-m-inline-on-lg",
    staticOnLg: "pf-m-static-on-lg",
    inlineOnXl: "pf-m-inline-on-xl",
    staticOnXl: "pf-m-static-on-xl",
    inlineOn_2xl: "pf-m-inline-on-2xl",
    staticOn_2xl: "pf-m-static-on-2xl"
  },
  pageMain: "pf-c-page__main",
  themeDark: "pf-theme-dark"
};

var DrawerColorVariant;
(function (DrawerColorVariant) {
    DrawerColorVariant["default"] = "default";
    DrawerColorVariant["light200"] = "light-200";
})(DrawerColorVariant || (DrawerColorVariant = {}));
const DrawerContext = react.createContext({
    isExpanded: false,
    isStatic: false,
    onExpand: () => { },
    position: 'right',
    drawerRef: null,
    drawerContentRef: null,
    isInline: false
});
const Drawer = (_a) => {
    var { className = '', children, isExpanded = false, isInline = false, isStatic = false, position = 'right', onExpand = () => { } } = _a, props = __rest(_a, ["className", "children", "isExpanded", "isInline", "isStatic", "position", "onExpand"]);
    const drawerRef = react.useRef();
    const drawerContentRef = react.useRef();
    return (react.createElement(DrawerContext.Provider, { value: { isExpanded, isStatic, onExpand, position, drawerRef, drawerContentRef, isInline } },
        react.createElement("div", Object.assign({ className: css(styles$h.drawer, isExpanded && styles$h.modifiers.expanded, isInline && styles$h.modifiers.inline, isStatic && styles$h.modifiers.static, position === 'left' && styles$h.modifiers.panelLeft, position === 'bottom' && styles$h.modifiers.panelBottom, className), ref: drawerRef }, props), children)));
};
Drawer.displayName = 'Drawer';

const DrawerActions = (_a) => {
    var { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className = '', children } = _a, props = __rest(_a, ["className", "children"]);
    return (react.createElement("div", Object.assign({ className: css(styles$h.drawerActions, className) }, props), children));
};
DrawerActions.displayName = 'DrawerActions';

const DrawerCloseButton = (_a) => {
    var { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className = '', onClose = () => undefined, 'aria-label': ariaLabel = 'Close drawer panel' } = _a, props = __rest(_a, ["className", "onClose", 'aria-label']);
    return (react.createElement("div", Object.assign({ className: css(styles$h.drawerClose, className) }, props),
        react.createElement(Button, { variant: "plain", onClick: onClose, "aria-label": ariaLabel },
            react.createElement(TimesIcon, null))));
};
DrawerCloseButton.displayName = 'DrawerCloseButton';

const DrawerMain = (_a) => {
    var { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className = '', children } = _a, props = __rest(_a, ["className", "children"]);
    return (react.createElement("div", Object.assign({ className: css(styles$h.drawerMain, className) }, props), children));
};
DrawerMain.displayName = 'DrawerMain';

const DrawerContent = (_a) => {
    var { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className = '', children, panelContent, colorVariant = DrawerColorVariant.default } = _a, props = __rest(_a, ["className", "children", "panelContent", "colorVariant"]);
    const { drawerContentRef } = react.useContext(DrawerContext);
    return (react.createElement(DrawerMain, null,
        react.createElement("div", Object.assign({ className: css(styles$h.drawerContent, colorVariant === DrawerColorVariant.light200 && styles$h.modifiers.light_200, className), ref: drawerContentRef }, props), children),
        panelContent));
};
DrawerContent.displayName = 'DrawerContent';

const DrawerContentBody = (_a) => {
    var { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className = '', children, hasPadding = false } = _a, props = __rest(_a, ["className", "children", "hasPadding"]);
    return (react.createElement("div", Object.assign({ className: css(styles$h.drawerBody, hasPadding && styles$h.modifiers.padding, className) }, props), children));
};
DrawerContentBody.displayName = 'DrawerContentBody';

const DrawerPanelBody = (_a) => {
    var { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className = '', children, hasNoPadding = false } = _a, props = __rest(_a, ["className", "children", "hasNoPadding"]);
    return (react.createElement("div", Object.assign({ className: css(styles$h.drawerBody, hasNoPadding && styles$h.modifiers.noPadding, className) }, props), children));
};
DrawerPanelBody.displayName = 'DrawerPanelBody';

const DrawerHead = (_a) => {
    var { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className = '', children, hasNoPadding = false } = _a, props = __rest(_a, ["className", "children", "hasNoPadding"]);
    return (react.createElement(DrawerPanelBody, { hasNoPadding: hasNoPadding },
        react.createElement("div", Object.assign({ className: css(styles$h.drawerHead, className) }, props), children)));
};
DrawerHead.displayName = 'DrawerHead';

let isResizing = null;
let newSize = 0;
const DrawerPanelContent = (_a) => {
    var { className = '', id, children, hasNoBorder = false, isResizable = false, onResize, minSize, defaultSize, maxSize, increment = 5, resizeAriaLabel = 'Resize', widths, colorVariant = DrawerColorVariant.default } = _a, props = __rest(_a, ["className", "id", "children", "hasNoBorder", "isResizable", "onResize", "minSize", "defaultSize", "maxSize", "increment", "resizeAriaLabel", "widths", "colorVariant"]);
    const panel = react.useRef();
    const splitterRef = react.useRef();
    const [separatorValue, setSeparatorValue] = react.useState(0);
    const { position, isExpanded, isStatic, onExpand, drawerRef, drawerContentRef, isInline } = react.useContext(DrawerContext);
    const hidden = isStatic ? false : !isExpanded;
    const [isExpandedInternal, setIsExpandedInternal] = react.useState(!hidden);
    let currWidth = 0;
    let panelRect;
    let right;
    let left;
    let bottom;
    let setInitialVals = true;
    react.useEffect(() => {
        if (!isStatic && isExpanded) {
            setIsExpandedInternal(isExpanded);
        }
    }, [isStatic, isExpanded]);
    const calcValueNow = () => {
        let splitterPos;
        let drawerSize;
        if (isInline && position === 'right') {
            splitterPos = panel.current.getBoundingClientRect().right - splitterRef.current.getBoundingClientRect().left;
            drawerSize = drawerRef.current.getBoundingClientRect().right - drawerRef.current.getBoundingClientRect().left;
        }
        else if (isInline && position === 'left') {
            splitterPos = splitterRef.current.getBoundingClientRect().right - panel.current.getBoundingClientRect().left;
            drawerSize = drawerRef.current.getBoundingClientRect().right - drawerRef.current.getBoundingClientRect().left;
        }
        else if (position === 'right') {
            splitterPos =
                drawerContentRef.current.getBoundingClientRect().right - splitterRef.current.getBoundingClientRect().left;
            drawerSize =
                drawerContentRef.current.getBoundingClientRect().right - drawerContentRef.current.getBoundingClientRect().left;
        }
        else if (position === 'left') {
            splitterPos =
                splitterRef.current.getBoundingClientRect().right - drawerContentRef.current.getBoundingClientRect().left;
            drawerSize =
                drawerContentRef.current.getBoundingClientRect().right - drawerContentRef.current.getBoundingClientRect().left;
        }
        else if (position === 'bottom') {
            splitterPos =
                drawerContentRef.current.getBoundingClientRect().bottom - splitterRef.current.getBoundingClientRect().top;
            drawerSize =
                drawerContentRef.current.getBoundingClientRect().bottom - drawerContentRef.current.getBoundingClientRect().top;
        }
        const newSplitterPos = (splitterPos / drawerSize) * 100;
        return Math.round((newSplitterPos + Number.EPSILON) * 100) / 100;
    };
    const handleTouchStart = (e) => {
        e.stopPropagation();
        document.addEventListener('touchmove', callbackTouchMove, { passive: false });
        document.addEventListener('touchend', callbackTouchEnd);
        isResizing = true;
    };
    const handleMousedown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        document.addEventListener('mousemove', callbackMouseMove);
        document.addEventListener('mouseup', callbackMouseUp);
        drawerRef.current.classList.add(css(styles$h.modifiers.resizing));
        isResizing = true;
        setInitialVals = true;
    };
    const handleMouseMove = (e) => {
        const mousePos = position === 'bottom' ? e.clientY : e.clientX;
        handleControlMove(e, mousePos);
    };
    const handleTouchMove = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const touchPos = position === 'bottom' ? e.touches[0].clientY : e.touches[0].clientX;
        handleControlMove(e, touchPos);
    };
    const handleControlMove = (e, controlPosition) => {
        e.stopPropagation();
        if (!isResizing) {
            return;
        }
        if (setInitialVals) {
            panelRect = panel.current.getBoundingClientRect();
            right = panelRect.right;
            left = panelRect.left;
            bottom = panelRect.bottom;
            setInitialVals = false;
        }
        const mousePos = controlPosition;
        let newSize = 0;
        if (position === 'right') {
            newSize = right - mousePos;
        }
        else if (position === 'left') {
            newSize = mousePos - left;
        }
        else {
            newSize = bottom - mousePos;
        }
        if (position === 'bottom') {
            panel.current.style.overflowAnchor = 'none';
        }
        panel.current.style.setProperty('--pf-c-drawer__panel--md--FlexBasis', newSize + 'px');
        currWidth = newSize;
        setSeparatorValue(calcValueNow());
    };
    const handleMouseup = () => {
        if (!isResizing) {
            return;
        }
        drawerRef.current.classList.remove(css(styles$h.modifiers.resizing));
        isResizing = false;
        onResize && onResize(currWidth, id);
        setInitialVals = true;
        document.removeEventListener('mousemove', callbackMouseMove);
        document.removeEventListener('mouseup', callbackMouseUp);
    };
    const handleTouchEnd = (e) => {
        e.stopPropagation();
        if (!isResizing) {
            return;
        }
        isResizing = false;
        onResize && onResize(currWidth, id);
        document.removeEventListener('touchmove', callbackTouchMove);
        document.removeEventListener('touchend', callbackTouchEnd);
    };
    const callbackMouseMove = react.useCallback(handleMouseMove, []);
    const callbackTouchEnd = react.useCallback(handleTouchEnd, []);
    const callbackTouchMove = react.useCallback(handleTouchMove, []);
    const callbackMouseUp = react.useCallback(handleMouseup, []);
    const handleKeys = (e) => {
        const key = e.key;
        if (key !== 'Escape' &&
            key !== 'Enter' &&
            key !== 'ArrowUp' &&
            key !== 'ArrowDown' &&
            key !== 'ArrowLeft' &&
            key !== 'ArrowRight') {
            if (isResizing) {
                e.preventDefault();
            }
            return;
        }
        e.preventDefault();
        if (key === 'Escape' || key === 'Enter') {
            onResize && onResize(currWidth, id);
        }
        const panelRect = panel.current.getBoundingClientRect();
        newSize = position === 'bottom' ? panelRect.height : panelRect.width;
        let delta = 0;
        if (key === 'ArrowRight') {
            delta = position === 'left' ? increment : -increment;
        }
        else if (key === 'ArrowLeft') {
            delta = position === 'left' ? -increment : increment;
        }
        else if (key === 'ArrowUp') {
            delta = increment;
        }
        else if (key === 'ArrowDown') {
            delta = -increment;
        }
        newSize = newSize + delta;
        if (position === 'bottom') {
            panel.current.style.overflowAnchor = 'none';
        }
        panel.current.style.setProperty('--pf-c-drawer__panel--md--FlexBasis', newSize + 'px');
        currWidth = newSize;
        setSeparatorValue(calcValueNow());
    };
    const boundaryCssVars = {};
    if (defaultSize) {
        boundaryCssVars['--pf-c-drawer__panel--md--FlexBasis'] = defaultSize;
    }
    if (minSize) {
        boundaryCssVars['--pf-c-drawer__panel--md--FlexBasis--min'] = minSize;
    }
    if (maxSize) {
        boundaryCssVars['--pf-c-drawer__panel--md--FlexBasis--max'] = maxSize;
    }
    return (react.createElement(GenerateId, { prefix: "pf-drawer-panel-" }, panelId => (react.createElement("div", Object.assign({ id: id || panelId, className: css(styles$h.drawerPanel, isResizable && styles$h.modifiers.resizable, hasNoBorder && styles$h.modifiers.noBorder, formatBreakpointMods(widths, styles$h), colorVariant === DrawerColorVariant.light200 && styles$h.modifiers.light_200, className), ref: panel, onTransitionEnd: ev => {
            if (!hidden && ev.nativeEvent.propertyName === 'transform') {
                onExpand();
            }
            setIsExpandedInternal(!hidden);
        }, hidden: hidden }, ((defaultSize || minSize || maxSize) && {
        style: boundaryCssVars
    }), props), isExpandedInternal && (react.createElement(react.Fragment, null,
        isResizable && (react.createElement(react.Fragment, null,
            react.createElement("div", { className: css(styles$h.drawerSplitter, position !== 'bottom' && styles$h.modifiers.vertical), role: "separator", tabIndex: 0, "aria-orientation": position === 'bottom' ? 'horizontal' : 'vertical', "aria-label": resizeAriaLabel, "aria-valuenow": separatorValue, "aria-valuemin": 0, "aria-valuemax": 100, "aria-controls": id || panelId, onMouseDown: handleMousedown, onKeyDown: handleKeys, onTouchStart: handleTouchStart, ref: splitterRef },
                react.createElement("div", { className: css(styles$h.drawerSplitterHandle), "aria-hidden": true })),
            react.createElement("div", { className: css(styles$h.drawerPanelMain) }, children))),
        !isResizable && children))))));
};
DrawerPanelContent.displayName = 'DrawerPanelContent';

const AngleDoubleLeftIconConfig = {
  name: 'AngleDoubleLeftIcon',
  height: 512,
  width: 448,
  svgPath: 'M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z',
  yOffset: 0,
  xOffset: 0,
};

const AngleDoubleLeftIcon = createIcon(AngleDoubleLeftIconConfig);

const AngleDoubleRightIconConfig = {
  name: 'AngleDoubleRightIcon',
  height: 512,
  width: 448,
  svgPath: 'M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z',
  yOffset: 0,
  xOffset: 0,
};

const AngleDoubleRightIcon = createIcon(AngleDoubleRightIconConfig);

const EmptyStatePrimary = (_a) => {
    var { children, className = '' } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("div", Object.assign({ className: css(styles$L.emptyStatePrimary, className) }, props), children));
};
EmptyStatePrimary.displayName = 'EmptyStatePrimary';

import('../common/expandable-section-92955fee.js');
var styles$i = {
  expandableSection: "pf-c-expandable-section",
  expandableSectionContent: "pf-c-expandable-section__content",
  expandableSectionToggle: "pf-c-expandable-section__toggle",
  expandableSectionToggleIcon: "pf-c-expandable-section__toggle-icon",
  expandableSectionToggleText: "pf-c-expandable-section__toggle-text",
  modifiers: {
    expanded: "pf-m-expanded",
    detached: "pf-m-detached",
    limitWidth: "pf-m-limit-width",
    displayLg: "pf-m-display-lg",
    indented: "pf-m-indented",
    active: "pf-m-active",
    expandTop: "pf-m-expand-top",
    overpassFont: "pf-m-overpass-font"
  }
};

class ExpandableSection extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: props.isExpanded
        };
    }
    calculateToggleText(toggleText, toggleTextExpanded, toggleTextCollapsed, propOrStateIsExpanded) {
        if (propOrStateIsExpanded && toggleTextExpanded !== '') {
            return toggleTextExpanded;
        }
        if (!propOrStateIsExpanded && toggleTextCollapsed !== '') {
            return toggleTextCollapsed;
        }
        return toggleText;
    }
    render() {
        const _a = this.props, { onToggle: onToggleProp, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isActive, className, toggleText, toggleTextExpanded, toggleTextCollapsed, toggleContent, children, isExpanded, isDetached, displaySize, isWidthLimited, isIndented, contentId } = _a, props = __rest(_a, ["onToggle", "isActive", "className", "toggleText", "toggleTextExpanded", "toggleTextCollapsed", "toggleContent", "children", "isExpanded", "isDetached", "displaySize", "isWidthLimited", "isIndented", "contentId"]);
        let onToggle = onToggleProp;
        let propOrStateIsExpanded = isExpanded;
        // uncontrolled
        if (isExpanded === undefined) {
            propOrStateIsExpanded = this.state.isExpanded;
            onToggle = isOpen => {
                this.setState({ isExpanded: isOpen }, () => onToggleProp(this.state.isExpanded));
            };
        }
        const computedToggleText = this.calculateToggleText(toggleText, toggleTextExpanded, toggleTextCollapsed, propOrStateIsExpanded);
        return (react.createElement("div", Object.assign({}, props, { className: css(styles$i.expandableSection, propOrStateIsExpanded && styles$i.modifiers.expanded, isActive && styles$i.modifiers.active, isDetached && styles$i.modifiers.detached, displaySize === 'large' && styles$i.modifiers.displayLg, isWidthLimited && styles$i.modifiers.limitWidth, isIndented && styles$i.modifiers.indented, className) }),
            !isDetached && (react.createElement("button", { className: css(styles$i.expandableSectionToggle), type: "button", "aria-expanded": propOrStateIsExpanded, onClick: () => onToggle(!propOrStateIsExpanded) },
                react.createElement("span", { className: css(styles$i.expandableSectionToggleIcon) },
                    react.createElement(AngleRightIcon, { "aria-hidden": true })),
                react.createElement("span", { className: css(styles$i.expandableSectionToggleText) }, toggleContent || computedToggleText))),
            react.createElement("div", { className: css(styles$i.expandableSectionContent), hidden: !propOrStateIsExpanded, id: contentId }, children)));
    }
}
ExpandableSection.displayName = 'ExpandableSection';
ExpandableSection.defaultProps = {
    className: '',
    toggleText: '',
    toggleTextExpanded: '',
    toggleTextCollapsed: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onToggle: (isExpanded) => undefined,
    isActive: false,
    isDetached: false,
    displaySize: 'default',
    isWidthLimited: false,
    isIndented: false,
    contentId: ''
};

import('../common/file-upload-19dfd40f.js');
var styles$j = {
  button: "pf-c-button",
  fileUpload: "pf-c-file-upload",
  fileUploadFileDetails: "pf-c-file-upload__file-details",
  fileUploadFileDetailsSpinner: "pf-c-file-upload__file-details-spinner",
  fileUploadFileSelect: "pf-c-file-upload__file-select",
  formControl: "pf-c-form-control",
  modifiers: {
    dragHover: "pf-m-drag-hover",
    loading: "pf-m-loading",
    control: "pf-m-control"
  }
};

var fileReaderType;
(function (fileReaderType) {
    fileReaderType["text"] = "text";
    fileReaderType["dataURL"] = "dataURL";
})(fileReaderType || (fileReaderType = {}));
/**
 * Read a file using the FileReader API, either as a plain text string or as a DataURL string.
 * Returns a promise which will resolve with the file contents as a string or reject with a DOMException.
 *
 * @param {File} fileHandle - File object to read
 * @param {fileReaderType} type - How to read it
 */
function readFile(fileHandle, type) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        if (type === fileReaderType.text) {
            reader.readAsText(fileHandle);
        }
        else if (type === fileReaderType.dataURL) {
            reader.readAsDataURL(fileHandle);
        }
        else {
            reject('unknown type');
        }
    });
}

const FileUploadField = (_a) => {
    var { id, type, value = '', filename = '', onChange = () => { }, onBrowseButtonClick = () => { }, onClearButtonClick = () => { }, onTextAreaClick, onTextChange, onTextAreaBlur, textAreaPlaceholder = '', className = '', isDisabled = false, isReadOnly = false, isLoading = false, spinnerAriaValueText, isRequired = false, isDragActive = false, validated = 'default', 'aria-label': ariaLabel = 'File upload', filenamePlaceholder = 'Drag a file here or browse to upload', filenameAriaLabel = filename ? 'Read only filename' : filenamePlaceholder, browseButtonText = 'Browse...', clearButtonText = 'Clear', isClearButtonDisabled = !filename && !value, containerRef = null, allowEditingUploadedText = false, hideDefaultPreview = false, children = null } = _a, props = __rest(_a, ["id", "type", "value", "filename", "onChange", "onBrowseButtonClick", "onClearButtonClick", "onTextAreaClick", "onTextChange", "onTextAreaBlur", "textAreaPlaceholder", "className", "isDisabled", "isReadOnly", "isLoading", "spinnerAriaValueText", "isRequired", "isDragActive", "validated", 'aria-label', "filenamePlaceholder", "filenameAriaLabel", "browseButtonText", "clearButtonText", "isClearButtonDisabled", "containerRef", "allowEditingUploadedText", "hideDefaultPreview", "children"]);
    const onTextAreaChange = (newValue, event) => {
        onChange(newValue, filename, event);
        onTextChange === null || onTextChange === void 0 ? void 0 : onTextChange(newValue);
    };
    return (react.createElement("div", Object.assign({ className: css(styles$j.fileUpload, isDragActive && styles$j.modifiers.dragHover, isLoading && styles$j.modifiers.loading, className), ref: containerRef }, props),
        react.createElement("div", { className: styles$j.fileUploadFileSelect },
            react.createElement(InputGroup, null,
                react.createElement(TextInput, { isReadOnly // Always read-only regardless of isReadOnly prop (which is just for the TextArea)
                    : true, isDisabled: isDisabled, id: `${id}-filename`, name: `${id}-filename`, "aria-label": filenameAriaLabel, placeholder: filenamePlaceholder, "aria-describedby": `${id}-browse-button`, value: filename }),
                react.createElement(Button, { id: `${id}-browse-button`, variant: ButtonVariant.control, onClick: onBrowseButtonClick, isDisabled: isDisabled }, browseButtonText),
                react.createElement(Button, { variant: ButtonVariant.control, isDisabled: isDisabled || isClearButtonDisabled, onClick: onClearButtonClick }, clearButtonText))),
        react.createElement("div", { className: styles$j.fileUploadFileDetails },
            !hideDefaultPreview && type === fileReaderType.text && (react.createElement(TextArea, { readOnly: isReadOnly || (!!filename && !allowEditingUploadedText), disabled: isDisabled, isRequired: isRequired, resizeOrientation: TextAreResizeOrientation.vertical, validated: validated, id: id, name: id, "aria-label": ariaLabel, value: value, onChange: onTextAreaChange, onClick: onTextAreaClick, onBlur: onTextAreaBlur, placeholder: textAreaPlaceholder })),
            isLoading && (react.createElement("div", { className: styles$j.fileUploadFileDetailsSpinner },
                react.createElement(Spinner, { size: spinnerSize.lg, "aria-valuetext": spinnerAriaValueText })))),
        children));
};
FileUploadField.displayName = 'FileUploadField';

const FileUpload = (_a) => {
    var { id, type, value = type === fileReaderType.text || type === fileReaderType.dataURL ? '' : null, filename = '', children = null, onChange = () => { }, onFileInputChange = null, onReadStarted = () => { }, onReadFinished = () => { }, onReadFailed = () => { }, onClearClick, onClick = event => event.preventDefault(), onTextChange, onDataChange, dropzoneProps = {} } = _a, props = __rest(_a, ["id", "type", "value", "filename", "children", "onChange", "onFileInputChange", "onReadStarted", "onReadFinished", "onReadFailed", "onClearClick", "onClick", "onTextChange", "onDataChange", "dropzoneProps"]);
    const onDropAccepted = (acceptedFiles, event) => {
        if (acceptedFiles.length > 0) {
            const fileHandle = acceptedFiles[0];
            if (event.type === 'drop') {
                onFileInputChange === null || onFileInputChange === void 0 ? void 0 : onFileInputChange(event, fileHandle);
            }
            if (type === fileReaderType.text || type === fileReaderType.dataURL) {
                onChange('', fileHandle.name, event); // Show the filename while reading
                onReadStarted(fileHandle);
                readFile(fileHandle, type)
                    .then(data => {
                    onReadFinished(fileHandle);
                    onChange(data, fileHandle.name, event);
                    onDataChange === null || onDataChange === void 0 ? void 0 : onDataChange(data);
                })
                    .catch((error) => {
                    onReadFailed(error, fileHandle);
                    onReadFinished(fileHandle);
                    onChange('', '', event); // Clear the filename field on a failure
                    onDataChange === null || onDataChange === void 0 ? void 0 : onDataChange('');
                });
            }
            else {
                onChange(fileHandle, fileHandle.name, event);
            }
        }
        dropzoneProps.onDropAccepted && dropzoneProps.onDropAccepted(acceptedFiles, event);
    };
    const onDropRejected = (rejectedFiles, event) => {
        if (rejectedFiles.length > 0) {
            onChange('', rejectedFiles[0].name, event);
        }
        dropzoneProps.onDropRejected && dropzoneProps.onDropRejected(rejectedFiles, event);
    };
    const fileInputRef = react.useRef();
    const setFileValue = (filename) => {
        fileInputRef.current.value = filename;
    };
    const onClearButtonClick = (event) => {
        onChange('', '', event);
        onClearClick === null || onClearClick === void 0 ? void 0 : onClearClick(event);
        setFileValue(null);
    };
    return (react.createElement(Dropzone, Object.assign({ multiple: false }, dropzoneProps, { onDropAccepted: onDropAccepted, onDropRejected: onDropRejected }), ({ getRootProps, getInputProps, isDragActive, open }) => {
        const oldInputProps = getInputProps();
        const inputProps = Object.assign(Object.assign({}, oldInputProps), { onChange: (e) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                (_a = oldInputProps.onChange) === null || _a === void 0 ? void 0 : _a.call(oldInputProps, e);
                const files = yield fromEvent(e.nativeEvent);
                if (files.length === 1) {
                    onFileInputChange === null || onFileInputChange === void 0 ? void 0 : onFileInputChange(e, files[0]);
                }
            }) });
        return (react.createElement(FileUploadField, Object.assign({}, getRootProps(Object.assign(Object.assign({}, props), { refKey: 'containerRef', onClick: event => event.preventDefault() })), { tabIndex: null, id: id, type: type, filename: filename, value: value, onChange: onChange, isDragActive: isDragActive, onBrowseButtonClick: open, onClearButtonClick: onClearButtonClick, onTextAreaClick: onClick, onTextChange: onTextChange }),
            react.createElement("input", Object.assign({}, inputProps, { ref: input => {
                    fileInputRef.current = input;
                    inputProps.ref(input);
                } })),
            children));
    }));
};
FileUpload.displayName = 'FileUpload';

const ActionGroup = (_a) => {
    var { children = null, className = '' } = _a, props = __rest(_a, ["children", "className"]);
    const customClassName = css(formStyles.formGroup, formStyles.modifiers.action, className);
    const formActionsComponent = react.createElement("div", { className: css(formStyles.formActions) }, children);
    return (react.createElement("div", Object.assign({}, props, { className: customClassName }),
        react.createElement("div", { className: css(formStyles.formGroupControl) }, formActionsComponent)));
};
ActionGroup.displayName = 'ActionGroup';

const Form = (_a) => {
    var { children = null, className = '', isHorizontal = false, isWidthLimited = false, maxWidth = '' } = _a, props = __rest(_a, ["children", "className", "isHorizontal", "isWidthLimited", "maxWidth"]);
    return (react.createElement("form", Object.assign({ noValidate: true }, (maxWidth && {
        style: Object.assign({ '--pf-c-form--m-limit-width--MaxWidth': maxWidth }, props.style)
    }), props, { className: css(formStyles.form, isHorizontal && formStyles.modifiers.horizontal, (isWidthLimited || maxWidth) && formStyles.modifiers.limitWidth, className) }), children));
};
Form.displayName = 'Form';

const FormGroup = (_a) => {
    var { children = null, className = '', label, labelInfo, labelIcon, isRequired = false, validated = 'default', isInline = false, hasNoPaddingTop = false, isStack = false, helperText, isHelperTextBeforeField = false, helperTextInvalid, helperTextIcon, helperTextInvalidIcon, fieldId, role } = _a, props = __rest(_a, ["children", "className", "label", "labelInfo", "labelIcon", "isRequired", "validated", "isInline", "hasNoPaddingTop", "isStack", "helperText", "isHelperTextBeforeField", "helperTextInvalid", "helperTextIcon", "helperTextInvalidIcon", "fieldId", "role"]);
    const validHelperText = typeof helperText !== 'string' ? (helperText) : (react.createElement("div", { className: css(formStyles.formHelperText, validated === ValidatedOptions.success && formStyles.modifiers.success, validated === ValidatedOptions.warning && formStyles.modifiers.warning), id: `${fieldId}-helper`, "aria-live": "polite" },
        helperTextIcon && react.createElement("span", { className: css(formStyles.formHelperTextIcon) }, helperTextIcon),
        helperText));
    const inValidHelperText = typeof helperTextInvalid !== 'string' ? (helperTextInvalid) : (react.createElement("div", { className: css(formStyles.formHelperText, formStyles.modifiers.error), id: `${fieldId}-helper`, "aria-live": "polite" },
        helperTextInvalidIcon && react.createElement("span", { className: css(formStyles.formHelperTextIcon) }, helperTextInvalidIcon),
        helperTextInvalid));
    const showValidHelperTxt = (validationType) => validationType !== ValidatedOptions.error && helperText ? validHelperText : '';
    const helperTextToDisplay = validated === ValidatedOptions.error && helperTextInvalid ? inValidHelperText : showValidHelperTxt(validated);
    const isGroupOrRadioGroup = role === 'group' || role === 'radiogroup';
    const LabelComponent = isGroupOrRadioGroup ? 'span' : 'label';
    const labelContent = (react.createElement(react.Fragment, null,
        react.createElement(LabelComponent, Object.assign({ className: css(formStyles.formLabel) }, (!isGroupOrRadioGroup && { htmlFor: fieldId })),
            react.createElement("span", { className: css(formStyles.formLabelText) }, label),
            isRequired && (react.createElement("span", { className: css(formStyles.formLabelRequired), "aria-hidden": "true" },
                ' ',
                ASTERISK))),
        ' ',
        react.isValidElement(labelIcon) && labelIcon));
    return (react.createElement(GenerateId, null, randomId => (react.createElement("div", Object.assign({ className: css(formStyles.formGroup, className) }, (role && { role }), (isGroupOrRadioGroup && { 'aria-labelledby': `${fieldId || randomId}-legend` }), props),
        label && (react.createElement("div", Object.assign({ className: css(formStyles.formGroupLabel, labelInfo && formStyles.modifiers.info, hasNoPaddingTop && formStyles.modifiers.noPaddingTop) }, (isGroupOrRadioGroup && { id: `${fieldId || randomId}-legend` })),
            labelInfo && (react.createElement(react.Fragment, null,
                react.createElement("div", { className: css(formStyles.formGroupLabelMain) }, labelContent),
                react.createElement("div", { className: css(formStyles.formGroupLabelInfo) }, labelInfo))),
            !labelInfo && labelContent)),
        react.createElement("div", { className: css(formStyles.formGroupControl, isInline && formStyles.modifiers.inline, isStack && formStyles.modifiers.stack) },
            isHelperTextBeforeField && helperTextToDisplay,
            children,
            !isHelperTextBeforeField && helperTextToDisplay)))));
};
FormGroup.displayName = 'FormGroup';

const MinusIconConfig = {
  name: 'MinusIcon',
  height: 512,
  width: 448,
  svgPath: 'M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z',
  yOffset: 0,
  xOffset: 0,
};

const MinusIcon = createIcon(MinusIconConfig);

import('../common/jump-links-99af784e.js');
var styles$k = {
  button: "pf-c-button",
  jumpLinks: "pf-c-jump-links",
  jumpLinksItem: "pf-c-jump-links__item",
  jumpLinksLabel: "pf-c-jump-links__label",
  jumpLinksLink: "pf-c-jump-links__link",
  jumpLinksLinkText: "pf-c-jump-links__link-text",
  jumpLinksList: "pf-c-jump-links__list",
  jumpLinksMain: "pf-c-jump-links__main",
  jumpLinksToggle: "pf-c-jump-links__toggle",
  jumpLinksToggleIcon: "pf-c-jump-links__toggle-icon",
  jumpLinksToggleText: "pf-c-jump-links__toggle-text",
  modifiers: {
    center: "pf-m-center",
    vertical: "pf-m-vertical",
    expandable: "pf-m-expandable",
    nonExpandable: "pf-m-non-expandable",
    expandableOnSm: "pf-m-expandable-on-sm",
    nonExpandableOnSm: "pf-m-non-expandable-on-sm",
    expandableOnMd: "pf-m-expandable-on-md",
    nonExpandableOnMd: "pf-m-non-expandable-on-md",
    expandableOnLg: "pf-m-expandable-on-lg",
    nonExpandableOnLg: "pf-m-non-expandable-on-lg",
    expandableOnXl: "pf-m-expandable-on-xl",
    nonExpandableOnXl: "pf-m-non-expandable-on-xl",
    expandableOn_2xl: "pf-m-expandable-on-2xl",
    nonExpandableOn_2xl: "pf-m-non-expandable-on-2xl",
    expanded: "pf-m-expanded",
    current: "pf-m-current"
  }
};

import('../common/sidebar-79479956.js');
var styles$l = {
  modifiers: {
    gutter: "pf-m-gutter",
    panelRight: "pf-m-panel-right",
    stack: "pf-m-stack",
    split: "pf-m-split",
    sticky: "pf-m-sticky",
    static: "pf-m-static",
    noBackground: "pf-m-no-background",
    widthDefault: "pf-m-width-default",
    width_25: "pf-m-width-25",
    width_33: "pf-m-width-33",
    width_50: "pf-m-width-50",
    width_66: "pf-m-width-66",
    width_75: "pf-m-width-75",
    width_100: "pf-m-width-100",
    widthDefaultOnSm: "pf-m-width-default-on-sm",
    width_25OnSm: "pf-m-width-25-on-sm",
    width_33OnSm: "pf-m-width-33-on-sm",
    width_50OnSm: "pf-m-width-50-on-sm",
    width_66OnSm: "pf-m-width-66-on-sm",
    width_75OnSm: "pf-m-width-75-on-sm",
    width_100OnSm: "pf-m-width-100-on-sm",
    widthDefaultOnMd: "pf-m-width-default-on-md",
    width_25OnMd: "pf-m-width-25-on-md",
    width_33OnMd: "pf-m-width-33-on-md",
    width_50OnMd: "pf-m-width-50-on-md",
    width_66OnMd: "pf-m-width-66-on-md",
    width_75OnMd: "pf-m-width-75-on-md",
    width_100OnMd: "pf-m-width-100-on-md",
    widthDefaultOnLg: "pf-m-width-default-on-lg",
    width_25OnLg: "pf-m-width-25-on-lg",
    width_33OnLg: "pf-m-width-33-on-lg",
    width_50OnLg: "pf-m-width-50-on-lg",
    width_66OnLg: "pf-m-width-66-on-lg",
    width_75OnLg: "pf-m-width-75-on-lg",
    width_100OnLg: "pf-m-width-100-on-lg",
    widthDefaultOnXl: "pf-m-width-default-on-xl",
    width_25OnXl: "pf-m-width-25-on-xl",
    width_33OnXl: "pf-m-width-33-on-xl",
    width_50OnXl: "pf-m-width-50-on-xl",
    width_66OnXl: "pf-m-width-66-on-xl",
    width_75OnXl: "pf-m-width-75-on-xl",
    width_100OnXl: "pf-m-width-100-on-xl",
    widthDefaultOn_2xl: "pf-m-width-default-on-2xl",
    width_25On_2xl: "pf-m-width-25-on-2xl",
    width_33On_2xl: "pf-m-width-33-on-2xl",
    width_50On_2xl: "pf-m-width-50-on-2xl",
    width_66On_2xl: "pf-m-width-66-on-2xl",
    width_75On_2xl: "pf-m-width-75-on-2xl",
    width_100On_2xl: "pf-m-width-100-on-2xl"
  },
  sidebar: "pf-c-sidebar",
  sidebarContent: "pf-c-sidebar__content",
  sidebarMain: "pf-c-sidebar__main",
  sidebarPanel: "pf-c-sidebar__panel"
};

const JumpLinksList = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("ul", Object.assign({ className: css(styles$k.jumpLinksList, className) }, props), children));
};
JumpLinksList.displayName = 'JumpLinksList';

const JumpLinksItem = (_a) => {
    var { isActive, href, 
    // eslint-disable-next-line
    node, children, onClick, className } = _a, props = __rest(_a, ["isActive", "href", "node", "children", "onClick", "className"]);
    const childrenArr = react.Children.toArray(children);
    const sublists = childrenArr.filter(child => child.type === JumpLinksList);
    children = childrenArr.filter(child => child.type !== JumpLinksList);
    return (react.createElement("li", Object.assign({ className: css(styles$k.jumpLinksItem, isActive && styles$k.modifiers.current, className) }, (isActive && { 'aria-current': 'location' }), props),
        react.createElement("a", { className: styles$k.jumpLinksLink, href: href, onClick: onClick },
            react.createElement("span", { className: styles$k.jumpLinksLinkText }, children)),
        sublists));
};
JumpLinksItem.displayName = 'JumpLinksItem';

const c_jump_links__toggle_Display = {
  "name": "--pf-c-jump-links__toggle--Display",
  "value": "none",
  "var": "var(--pf-c-jump-links__toggle--Display)"
};

// Recursively find JumpLinkItems and return an array of all their scrollNodes
const getScrollItems = (children, res) => {
    react.Children.forEach(children, (child) => {
        if (canUseDOM && document.getElementById && document.querySelector && child.type === JumpLinksItem) {
            const scrollNode = child.props.node || child.props.href;
            if (typeof scrollNode === 'string') {
                if (scrollNode.startsWith('#')) {
                    // Allow spaces and other special characters as `id`s to be nicer to consumers
                    // https://stackoverflow.com/questions/70579/what-are-valid-values-for-the-id-attribute-in-html
                    res.push(document.getElementById(scrollNode.substr(1)));
                }
                else {
                    res.push(document.querySelector(scrollNode));
                }
            }
            else if (scrollNode instanceof HTMLElement) {
                res.push(scrollNode);
            }
        }
        if ([react.Fragment, JumpLinksList, JumpLinksItem].includes(child.type)) {
            getScrollItems(child.props.children, res);
        }
    });
    return res;
};
function isResponsive(jumpLinks) {
    // https://github.com/patternfly/patternfly/blob/main/src/patternfly/components/JumpLinks/jump-links.scss#L103
    return (jumpLinks &&
        getComputedStyle(jumpLinks)
            .getPropertyValue(c_jump_links__toggle_Display.name)
            .includes('block'));
}
const JumpLinks = (_a) => {
    var { isCentered, isVertical, children, label, 'aria-label': ariaLabel = typeof label === 'string' ? label : null, scrollableSelector, activeIndex: activeIndexProp = 0, offset = 0, expandable, isExpanded: isExpandedProp = false, alwaysShowLabel = true, toggleAriaLabel = 'Toggle jump links', className } = _a, props = __rest(_a, ["isCentered", "isVertical", "children", "label", 'aria-label', "scrollableSelector", "activeIndex", "offset", "expandable", "isExpanded", "alwaysShowLabel", "toggleAriaLabel", "className"]);
    const hasScrollSpy = Boolean(scrollableSelector);
    const [scrollItems, setScrollItems] = react.useState(hasScrollSpy ? getScrollItems(children, []) : []);
    const [activeIndex, setActiveIndex] = react.useState(activeIndexProp);
    const [isExpanded, setIsExpanded] = react.useState(isExpandedProp);
    // Boolean to disable scroll listener from overriding active state of clicked jumplink
    const isLinkClicked = react.useRef(false);
    // Allow expanding to be controlled for a niche use case
    react.useEffect(() => setIsExpanded(isExpandedProp), [isExpandedProp]);
    const navRef = react.useRef();
    let scrollableElement;
    const scrollSpy = react.useCallback(() => {
        if (!canUseDOM || !hasScrollSpy || !(scrollableElement instanceof HTMLElement)) {
            return;
        }
        if (isLinkClicked.current) {
            isLinkClicked.current = false;
            return;
        }
        const scrollPosition = Math.ceil(scrollableElement.scrollTop + offset);
        window.requestAnimationFrame(() => {
            let newScrollItems = scrollItems;
            // Items might have rendered after this component. Do a quick refresh.
            if (!newScrollItems[0] || newScrollItems.includes(null)) {
                newScrollItems = getScrollItems(children, []);
                setScrollItems(newScrollItems);
            }
            const scrollElements = newScrollItems
                .map((e, index) => ({
                y: e ? e.offsetTop : null,
                index
            }))
                .filter(({ y }) => y !== null)
                .sort((e1, e2) => e2.y - e1.y);
            for (const { y, index } of scrollElements) {
                if (scrollPosition >= y) {
                    return setActiveIndex(index);
                }
            }
        });
    }, [scrollItems, hasScrollSpy, scrollableElement, offset]);
    react.useEffect(() => {
        scrollableElement = document.querySelector(scrollableSelector);
        if (!(scrollableElement instanceof HTMLElement)) {
            return;
        }
        scrollableElement.addEventListener('scroll', scrollSpy);
        return () => scrollableElement.removeEventListener('scroll', scrollSpy);
    }, [scrollableSelector, scrollSpy]);
    react.useEffect(() => {
        scrollSpy();
    }, []);
    let jumpLinkIndex = 0;
    const cloneChildren = (children) => !hasScrollSpy
        ? children
        : react.Children.map(children, (child) => {
            if (child.type === JumpLinksItem) {
                const { onClick: onClickProp, isActive: isActiveProp } = child.props;
                const itemIndex = jumpLinkIndex++;
                const scrollItem = scrollItems[itemIndex];
                return react.cloneElement(child, {
                    onClick(ev) {
                        isLinkClicked.current = true;
                        // Items might have rendered after this component. Do a quick refresh.
                        let newScrollItems;
                        if (!scrollItem) {
                            newScrollItems = getScrollItems(children, []);
                            setScrollItems(newScrollItems);
                        }
                        const newScrollItem = scrollItem || newScrollItems[itemIndex];
                        if (newScrollItem) {
                            // we have to support scrolling to an offset due to sticky sidebar
                            const scrollableElement = document.querySelector(scrollableSelector);
                            if (scrollableElement instanceof HTMLElement) {
                                if (isResponsive(navRef.current)) {
                                    // Remove class immediately so we can get collapsed height
                                    if (navRef.current) {
                                        navRef.current.classList.remove(styles$k.modifiers.expanded);
                                    }
                                    let stickyParent = navRef.current && navRef.current.parentElement;
                                    while (stickyParent && !stickyParent.classList.contains(styles$l.modifiers.sticky)) {
                                        stickyParent = stickyParent.parentElement;
                                    }
                                    setIsExpanded(false);
                                    if (stickyParent) {
                                        offset += stickyParent.scrollHeight;
                                    }
                                }
                                scrollableElement.scrollTo(0, newScrollItem.offsetTop - offset);
                            }
                            newScrollItem.focus();
                            ev.preventDefault();
                            setActiveIndex(itemIndex);
                        }
                        if (onClickProp) {
                            onClickProp(ev);
                        }
                    },
                    isActive: isActiveProp || activeIndex === itemIndex,
                    children: cloneChildren(child.props.children)
                });
            }
            else if (child.type === react.Fragment) {
                return cloneChildren(child.props.children);
            }
            else if (child.type === JumpLinksList) {
                return react.cloneElement(child, { children: cloneChildren(child.props.children) });
            }
            return child;
        });
    return (react.createElement("nav", Object.assign({ className: css(styles$k.jumpLinks, isCentered && styles$k.modifiers.center, isVertical && styles$k.modifiers.vertical, formatBreakpointMods(expandable, styles$k), isExpanded && styles$k.modifiers.expanded, className), "aria-label": ariaLabel, ref: navRef }, props),
        react.createElement("div", { className: styles$k.jumpLinksMain },
            react.createElement("div", { className: css('pf-c-jump-links__header') },
                expandable && (react.createElement("div", { className: styles$k.jumpLinksToggle },
                    react.createElement(Button, { variant: "plain", onClick: () => setIsExpanded(!isExpanded), "aria-label": toggleAriaLabel, "aria-expanded": isExpanded },
                        react.createElement("span", { className: styles$k.jumpLinksToggleIcon },
                            react.createElement(AngleRightIcon, null)),
                        label && react.createElement("span", { className: css(styles$k.jumpLinksToggleText) },
                            " ",
                            label,
                            " ")))),
                label && alwaysShowLabel && react.createElement("div", { className: css(styles$k.jumpLinksLabel) }, label)),
            react.createElement("ul", { className: styles$k.jumpLinksList }, cloneChildren(children)))));
};
JumpLinks.displayName = 'JumpLinks';

import('../common/label-512df82b.js');
var labelStyles = {
  button: "pf-c-button",
  label: "pf-c-label",
  labelContent: "pf-c-label__content",
  labelIcon: "pf-c-label__icon",
  labelText: "pf-c-label__text",
  modifiers: {
    compact: "pf-m-compact",
    blue: "pf-m-blue",
    green: "pf-m-green",
    orange: "pf-m-orange",
    red: "pf-m-red",
    purple: "pf-m-purple",
    cyan: "pf-m-cyan",
    gold: "pf-m-gold",
    outline: "pf-m-outline",
    overflow: "pf-m-overflow",
    add: "pf-m-add",
    editable: "pf-m-editable",
    editableActive: "pf-m-editable-active"
  },
  themeDark: "pf-theme-dark"
};

import('../common/label-group-2dbc3505.js');
var styles$m = {
  button: "pf-c-button",
  labelGroup: "pf-c-label-group",
  labelGroupClose: "pf-c-label-group__close",
  labelGroupLabel: "pf-c-label-group__label",
  labelGroupList: "pf-c-label-group__list",
  labelGroupListItem: "pf-c-label-group__list-item",
  labelGroupMain: "pf-c-label-group__main",
  labelGroupTextarea: "pf-c-label-group__textarea",
  modifiers: {
    category: "pf-m-category",
    vertical: "pf-m-vertical",
    editable: "pf-m-editable",
    textarea: "pf-m-textarea"
  }
};

const colorStyles = {
    blue: labelStyles.modifiers.blue,
    cyan: labelStyles.modifiers.cyan,
    green: labelStyles.modifiers.green,
    orange: labelStyles.modifiers.orange,
    purple: labelStyles.modifiers.purple,
    red: labelStyles.modifiers.red,
    gold: labelStyles.modifiers.gold,
    grey: ''
};
const Label = (_a) => {
    var { children, className = '', color = 'grey', variant = 'filled', isCompact = false, isEditable = false, editableProps, isTruncated = false, tooltipPosition, icon, onClose, onEditCancel, onEditComplete, closeBtn, closeBtnAriaLabel, closeBtnProps, href, isOverflowLabel, render } = _a, props = __rest(_a, ["children", "className", "color", "variant", "isCompact", "isEditable", "editableProps", "isTruncated", "tooltipPosition", "icon", "onClose", "onEditCancel", "onEditComplete", "closeBtn", "closeBtnAriaLabel", "closeBtnProps", "href", "isOverflowLabel", "render"]);
    const [isEditableActive, setIsEditableActive] = react.useState(false);
    const [currValue, setCurrValue] = react.useState(children);
    const editableButtonRef = react.useRef();
    const editableInputRef = react.useRef();
    react.useEffect(() => {
        document.addEventListener('mousedown', onDocMouseDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('mousedown', onDocMouseDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    });
    const onDocMouseDown = (event) => {
        if (isEditableActive &&
            editableInputRef &&
            editableInputRef.current &&
            !editableInputRef.current.contains(event.target)) {
            if (editableInputRef.current.value) {
                onEditComplete && onEditComplete(editableInputRef.current.value);
            }
            setIsEditableActive(false);
        }
    };
    const onKeyDown = (event) => {
        const key = event.key;
        if ((!isEditableActive &&
            (!editableButtonRef ||
                !editableButtonRef.current ||
                !editableButtonRef.current.contains(event.target))) ||
            (isEditableActive &&
                (!editableInputRef || !editableInputRef.current || !editableInputRef.current.contains(event.target)))) {
            return;
        }
        if (isEditableActive && (key === 'Enter' || key === 'Tab')) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (editableInputRef.current.value) {
                onEditComplete && onEditComplete(editableInputRef.current.value);
            }
            setIsEditableActive(false);
        }
        if (isEditableActive && key === 'Escape') {
            event.preventDefault();
            event.stopImmediatePropagation();
            // Reset div text to initial children prop - pre-edit
            if (editableInputRef.current.value) {
                editableInputRef.current.value = children;
                onEditCancel && onEditCancel(children);
            }
            setIsEditableActive(false);
        }
        if (!isEditableActive && key === 'Enter') {
            event.preventDefault();
            event.stopImmediatePropagation();
            setIsEditableActive(true);
            // Set cursor position to end of text
            const el = event.target;
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(el);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    };
    const LabelComponent = (isOverflowLabel ? 'button' : 'span');
    const button = closeBtn ? (closeBtn) : (react.createElement(Button, Object.assign({ type: "button", variant: "plain", onClick: onClose, "aria-label": closeBtnAriaLabel || `Close ${children}` }, closeBtnProps),
        react.createElement(TimesIcon, null)));
    const textRef = react.createRef();
    // ref to apply tooltip when rendered is used
    const componentRef = react.useRef();
    const [isTooltipVisible, setIsTooltipVisible] = react.useState(false);
    useIsomorphicLayoutEffect(() => {
        const currTextRef = isEditable ? editableButtonRef : textRef;
        if (!isEditableActive) {
            setIsTooltipVisible(currTextRef.current && currTextRef.current.offsetWidth < currTextRef.current.scrollWidth);
        }
    }, [isEditableActive]);
    const content = (react.createElement(react.Fragment, null,
        icon && react.createElement("span", { className: css(labelStyles.labelIcon) }, icon),
        isTruncated && (react.createElement("span", { ref: textRef, className: css(labelStyles.labelText) }, children)),
        !isTruncated && children));
    react.useEffect(() => {
        if (isEditableActive && editableInputRef) {
            editableInputRef.current && editableInputRef.current.focus();
        }
    }, [editableInputRef, isEditableActive]);
    const updateVal = () => {
        setCurrValue(editableInputRef.current.value);
    };
    let labelComponentChild = react.createElement("span", { className: css(labelStyles.labelContent) }, content);
    if (href) {
        labelComponentChild = (react.createElement("a", { className: css(labelStyles.labelContent), href: href }, content));
    }
    else if (isEditable) {
        labelComponentChild = (react.createElement("button", Object.assign({ ref: editableButtonRef, className: css(labelStyles.labelContent), onClick: (e) => {
                setIsEditableActive(true);
                e.stopPropagation();
            } }, editableProps), content));
    }
    if (render) {
        labelComponentChild = (react.createElement(react.Fragment, null,
            isTooltipVisible && react.createElement(Tooltip, { reference: componentRef, content: children, position: tooltipPosition }),
            render({
                className: labelStyles.labelContent,
                content,
                componentRef
            })));
    }
    else if (isTooltipVisible) {
        labelComponentChild = (react.createElement(Tooltip, { content: children, position: tooltipPosition }, labelComponentChild));
    }
    return (react.createElement(LabelComponent, Object.assign({}, props, { className: css(labelStyles.label, colorStyles[color], variant === 'outline' && labelStyles.modifiers.outline, isOverflowLabel && labelStyles.modifiers.overflow, isCompact && labelStyles.modifiers.compact, isEditable && styles$m.modifiers.editable, isEditableActive && labelStyles.modifiers.editableActive, className) }),
        !isEditableActive && labelComponentChild,
        !isEditableActive && onClose && button,
        isEditableActive && (react.createElement("input", Object.assign({ className: css(labelStyles.labelContent), type: "text", id: "editable-input", ref: editableInputRef, value: currValue, onChange: updateVal }, editableProps)))));
};
Label.displayName = 'Label';

import('../common/list-b08f1629.js');
var styles$n = {
  list: "pf-c-list",
  listItem: "pf-c-list__item",
  listItemIcon: "pf-c-list__item-icon",
  modifiers: {
    iconLg: "pf-m-icon-lg",
    plain: "pf-m-plain",
    inline: "pf-m-inline",
    bordered: "pf-m-bordered"
  }
};

var OrderType;
(function (OrderType) {
    OrderType["number"] = "1";
    OrderType["lowercaseLetter"] = "a";
    OrderType["uppercaseLetter"] = "A";
    OrderType["lowercaseRomanNumber"] = "i";
    OrderType["uppercaseRomanNumber"] = "I";
})(OrderType || (OrderType = {}));
var ListVariant;
(function (ListVariant) {
    ListVariant["inline"] = "inline";
})(ListVariant || (ListVariant = {}));
var ListComponent;
(function (ListComponent) {
    ListComponent["ol"] = "ol";
    ListComponent["ul"] = "ul";
})(ListComponent || (ListComponent = {}));
const List = (_a) => {
    var { className = '', children = null, variant = null, isBordered = false, isPlain = false, iconSize = 'default', type = OrderType.number, ref = null, component = ListComponent.ul } = _a, props = __rest(_a, ["className", "children", "variant", "isBordered", "isPlain", "iconSize", "type", "ref", "component"]);
    return component === ListComponent.ol ? (react.createElement("ol", Object.assign({ ref: ref, type: type }, props, { className: css(styles$n.list, variant && styles$n.modifiers[variant], isBordered && styles$n.modifiers.bordered, isPlain && styles$n.modifiers.plain, iconSize && iconSize === 'large' && styles$n.modifiers.iconLg, className) }), children)) : (react.createElement("ul", Object.assign({ ref: ref }, props, { className: css(styles$n.list, variant && styles$n.modifiers[variant], isBordered && styles$n.modifiers.bordered, isPlain && styles$n.modifiers.plain, iconSize && iconSize === 'large' && styles$n.modifiers.iconLg, className) }), children));
};
List.displayName = 'List';

const ListItem = (_a) => {
    var { icon = null, children = null } = _a, props = __rest(_a, ["icon", "children"]);
    return (react.createElement("li", Object.assign({ className: css(icon && styles$n.listItem) }, props),
        icon && react.createElement("span", { className: css(styles$n.listItemIcon) }, icon),
        children));
};
ListItem.displayName = 'ListItem';

import('../common/page-15c61b1e.js');
var styles$o = {
  avatar: "pf-c-avatar",
  brand: "pf-c-brand",
  button: "pf-c-button",
  card: "pf-c-card",
  contextSelector: "pf-c-context-selector",
  drawer: "pf-c-drawer",
  masthead: "pf-c-masthead",
  modifiers: {
    light: "pf-m-light",
    menu: "pf-m-menu",
    hidden: "pf-m-hidden",
    hiddenOnSm: "pf-m-hidden-on-sm",
    visibleOnSm: "pf-m-visible-on-sm",
    hiddenOnMd: "pf-m-hidden-on-md",
    visibleOnMd: "pf-m-visible-on-md",
    hiddenOnLg: "pf-m-hidden-on-lg",
    visibleOnLg: "pf-m-visible-on-lg",
    hiddenOnXl: "pf-m-hidden-on-xl",
    visibleOnXl: "pf-m-visible-on-xl",
    hiddenOn_2xl: "pf-m-hidden-on-2xl",
    visibleOn_2xl: "pf-m-visible-on-2xl",
    read: "pf-m-read",
    selected: "pf-m-selected",
    unread: "pf-m-unread",
    attention: "pf-m-attention",
    expanded: "pf-m-expanded",
    collapsed: "pf-m-collapsed",
    limitWidth: "pf-m-limit-width",
    alignCenter: "pf-m-align-center",
    overflowScroll: "pf-m-overflow-scroll",
    shadowBottom: "pf-m-shadow-bottom",
    shadowTop: "pf-m-shadow-top",
    stickyTop: "pf-m-sticky-top",
    stickyBottom: "pf-m-sticky-bottom",
    stickyTopOnSmHeight: "pf-m-sticky-top-on-sm-height",
    stickyBottomOnSmHeight: "pf-m-sticky-bottom-on-sm-height",
    stickyTopOnMdHeight: "pf-m-sticky-top-on-md-height",
    stickyBottomOnMdHeight: "pf-m-sticky-bottom-on-md-height",
    stickyTopOnLgHeight: "pf-m-sticky-top-on-lg-height",
    stickyBottomOnLgHeight: "pf-m-sticky-bottom-on-lg-height",
    stickyTopOnXlHeight: "pf-m-sticky-top-on-xl-height",
    stickyBottomOnXlHeight: "pf-m-sticky-bottom-on-xl-height",
    stickyTopOn_2xlHeight: "pf-m-sticky-top-on-2xl-height",
    stickyBottomOn_2xlHeight: "pf-m-sticky-bottom-on-2xl-height",
    fill: "pf-m-fill",
    noFill: "pf-m-no-fill",
    light_100: "pf-m-light-100",
    dark_100: "pf-m-dark-100",
    dark_200: "pf-m-dark-200",
    padding: "pf-m-padding",
    noPadding: "pf-m-no-padding",
    paddingOnSm: "pf-m-padding-on-sm",
    noPaddingOnSm: "pf-m-no-padding-on-sm",
    paddingOnMd: "pf-m-padding-on-md",
    noPaddingOnMd: "pf-m-no-padding-on-md",
    paddingOnLg: "pf-m-padding-on-lg",
    noPaddingOnLg: "pf-m-no-padding-on-lg",
    paddingOnXl: "pf-m-padding-on-xl",
    noPaddingOnXl: "pf-m-no-padding-on-xl",
    paddingOn_2xl: "pf-m-padding-on-2xl",
    noPaddingOn_2xl: "pf-m-no-padding-on-2xl",
    light_200: "pf-m-light-200"
  },
  nav: "pf-c-nav",
  notificationBadge: "pf-c-notification-badge",
  page: "pf-c-page",
  pageDrawer: "pf-c-page__drawer",
  pageHeader: "pf-c-page__header",
  pageHeaderBrand: "pf-c-page__header-brand",
  pageHeaderBrandLink: "pf-c-page__header-brand-link",
  pageHeaderBrandToggle: "pf-c-page__header-brand-toggle",
  pageHeaderNav: "pf-c-page__header-nav",
  pageHeaderTools: "pf-c-page__header-tools",
  pageHeaderToolsGroup: "pf-c-page__header-tools-group",
  pageHeaderToolsItem: "pf-c-page__header-tools-item",
  pageMain: "pf-c-page__main",
  pageMainBody: "pf-c-page__main-body",
  pageMainBreadcrumb: "pf-c-page__main-breadcrumb",
  pageMainDrawer: "pf-c-page__main-drawer",
  pageMainGroup: "pf-c-page__main-group",
  pageMainNav: "pf-c-page__main-nav",
  pageMainSection: "pf-c-page__main-section",
  pageMainSubnav: "pf-c-page__main-subnav",
  pageMainTabs: "pf-c-page__main-tabs",
  pageMainWizard: "pf-c-page__main-wizard",
  pageSidebar: "pf-c-page__sidebar",
  pageSidebarBody: "pf-c-page__sidebar-body",
  themeDark: "pf-theme-dark"
};

const global_breakpoint_xl = {
  "name": "--pf-global--breakpoint--xl",
  "value": "1200px",
  "var": "var(--pf-global--breakpoint--xl)"
};

const PageGroup = (_a) => {
    var { className = '', children, sticky, hasShadowTop = false, hasShadowBottom = false, hasOverflowScroll = false } = _a, props = __rest(_a, ["className", "children", "sticky", "hasShadowTop", "hasShadowBottom", "hasOverflowScroll"]);
    return (react.createElement("div", Object.assign({}, props, { className: css(styles$o.pageMainGroup, sticky === 'top' && styles$o.modifiers.stickyTop, sticky === 'bottom' && styles$o.modifiers.stickyBottom, hasShadowTop && styles$o.modifiers.shadowTop, hasShadowBottom && styles$o.modifiers.shadowBottom, hasOverflowScroll && styles$o.modifiers.overflowScroll, className) }, (hasOverflowScroll && { tabIndex: 0 })), children));
};
PageGroup.displayName = 'PageGroup';

var PageLayouts;
(function (PageLayouts) {
    PageLayouts["vertical"] = "vertical";
    PageLayouts["horizontal"] = "horizontal";
})(PageLayouts || (PageLayouts = {}));
const pageContextDefaults = {
    isManagedSidebar: false,
    isNavOpen: false,
    onNavToggle: () => null,
    width: null,
    getBreakpoint
};
const PageContext = react.createContext(pageContextDefaults);
const PageContextProvider = PageContext.Provider;
const PageContextConsumer = PageContext.Consumer;
class Page extends react.Component {
    constructor(props) {
        super(props);
        this.mainRef = react.createRef();
        this.pageRef = react.createRef();
        this.observer = () => { };
        this.getWindowWidth = () => {
            if (canUseDOM) {
                return this.pageRef.current ? this.pageRef.current.clientWidth : window.innerWidth;
            }
            else {
                return 1200;
            }
        };
        this.isMobile = () => 
        // eslint-disable-next-line radix
        this.getWindowWidth() < Number.parseInt(global_breakpoint_xl.value, 10);
        this.resize = () => {
            const { onPageResize } = this.props;
            const mobileView = this.isMobile();
            if (onPageResize) {
                onPageResize({ mobileView, windowSize: this.getWindowWidth() });
            }
            if (mobileView !== this.state.mobileView) {
                this.setState({ mobileView });
            }
            this.pageRef.current && this.setState({ width: this.pageRef.current.clientWidth });
        };
        this.handleResize = debounce(this.resize, 250);
        this.handleMainClick = () => {
            if (this.isMobile() && this.state.mobileIsNavOpen && this.mainRef.current) {
                this.setState({ mobileIsNavOpen: false });
            }
        };
        this.onNavToggleMobile = () => {
            this.setState(prevState => ({
                mobileIsNavOpen: !prevState.mobileIsNavOpen
            }));
        };
        this.onNavToggleDesktop = () => {
            this.setState(prevState => ({
                desktopIsNavOpen: !prevState.desktopIsNavOpen
            }));
        };
        const { isManagedSidebar, defaultManagedSidebarIsOpen } = props;
        const managedSidebarOpen = !isManagedSidebar ? true : defaultManagedSidebarIsOpen;
        this.state = {
            desktopIsNavOpen: managedSidebarOpen,
            mobileIsNavOpen: false,
            mobileView: false,
            width: null
        };
    }
    componentDidMount() {
        const { isManagedSidebar, onPageResize } = this.props;
        if (isManagedSidebar || onPageResize) {
            this.observer = getResizeObserver(this.pageRef.current, this.handleResize);
            const currentRef = this.mainRef.current;
            if (currentRef) {
                currentRef.addEventListener('mousedown', this.handleMainClick);
                currentRef.addEventListener('touchstart', this.handleMainClick);
            }
            // Initial check if should be shown
            this.resize();
        }
    }
    componentWillUnmount() {
        const { isManagedSidebar, onPageResize } = this.props;
        if (isManagedSidebar || onPageResize) {
            this.observer();
            const currentRef = this.mainRef.current;
            if (currentRef) {
                currentRef.removeEventListener('mousedown', this.handleMainClick);
                currentRef.removeEventListener('touchstart', this.handleMainClick);
            }
        }
    }
    render() {
        const _a = this.props, { breadcrumb, isBreadcrumbWidthLimited, className, children, header, sidebar, notificationDrawer, isNotificationDrawerExpanded, onNotificationDrawerExpand, isTertiaryNavWidthLimited, skipToContent, role, mainContainerId, isManagedSidebar, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        defaultManagedSidebarIsOpen, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onPageResize, getBreakpoint, mainAriaLabel, mainTabIndex, tertiaryNav, isTertiaryNavGrouped, isBreadcrumbGrouped, additionalGroupedContent, groupProps } = _a, rest = __rest(_a, ["breadcrumb", "isBreadcrumbWidthLimited", "className", "children", "header", "sidebar", "notificationDrawer", "isNotificationDrawerExpanded", "onNotificationDrawerExpand", "isTertiaryNavWidthLimited", "skipToContent", "role", "mainContainerId", "isManagedSidebar", "defaultManagedSidebarIsOpen", "onPageResize", "getBreakpoint", "mainAriaLabel", "mainTabIndex", "tertiaryNav", "isTertiaryNavGrouped", "isBreadcrumbGrouped", "additionalGroupedContent", "groupProps"]);
        const { mobileView, mobileIsNavOpen, desktopIsNavOpen, width } = this.state;
        const context = {
            isManagedSidebar,
            onNavToggle: mobileView ? this.onNavToggleMobile : this.onNavToggleDesktop,
            isNavOpen: mobileView ? mobileIsNavOpen : desktopIsNavOpen,
            width,
            getBreakpoint
        };
        let nav = null;
        if (tertiaryNav && isTertiaryNavWidthLimited) {
            nav = (react.createElement("div", { className: css(styles$o.pageMainNav, styles$o.modifiers.limitWidth) },
                react.createElement("div", { className: css(styles$o.pageMainBody) }, tertiaryNav)));
        }
        else if (tertiaryNav) {
            nav = react.createElement("div", { className: css(styles$o.pageMainNav) }, tertiaryNav);
        }
        let crumb = null;
        if (breadcrumb && isBreadcrumbWidthLimited) {
            crumb = (react.createElement("section", { className: css(styles$o.pageMainBreadcrumb, styles$o.modifiers.limitWidth) },
                react.createElement("div", { className: css(styles$o.pageMainBody) }, breadcrumb)));
        }
        else if (breadcrumb) {
            crumb = react.createElement("section", { className: css(styles$o.pageMainBreadcrumb) }, breadcrumb);
        }
        const isGrouped = isTertiaryNavGrouped || isBreadcrumbGrouped || additionalGroupedContent;
        const group = isGrouped ? (react.createElement(PageGroup, Object.assign({}, groupProps),
            isTertiaryNavGrouped && nav,
            isBreadcrumbGrouped && crumb,
            additionalGroupedContent)) : null;
        const main = (react.createElement("main", { ref: this.mainRef, role: role, id: mainContainerId, className: css(styles$o.pageMain), tabIndex: mainTabIndex, "aria-label": mainAriaLabel },
            group,
            !isTertiaryNavGrouped && nav,
            !isBreadcrumbGrouped && crumb,
            children));
        const panelContent = react.createElement(DrawerPanelContent, null, notificationDrawer);
        return (react.createElement(PageContextProvider, { value: context },
            react.createElement("div", Object.assign({ ref: this.pageRef }, rest, { className: css(styles$o.page, width !== null && 'pf-m-resize-observer', width !== null && `pf-m-breakpoint-${getBreakpoint(width)}`, className) }),
                skipToContent,
                header,
                sidebar,
                notificationDrawer && (react.createElement("div", { className: css(styles$o.pageDrawer) },
                    react.createElement(Drawer, { isExpanded: isNotificationDrawerExpanded, onExpand: onNotificationDrawerExpand },
                        react.createElement(DrawerContent, { panelContent: panelContent },
                            react.createElement(DrawerContentBody, null, main))))),
                !notificationDrawer && main)));
    }
}
Page.displayName = 'Page';
Page.defaultProps = {
    isManagedSidebar: false,
    isBreadcrumbWidthLimited: false,
    defaultManagedSidebarIsOpen: true,
    onPageResize: () => null,
    mainTabIndex: -1,
    isNotificationDrawerExpanded: false,
    onNotificationDrawerExpand: () => null,
    getBreakpoint
};

import('../common/menu-e4666cad.js');
var menuStyles = {
  breadcrumb: "pf-c-breadcrumb",
  divider: "pf-c-divider",
  menu: "pf-c-menu",
  menuBreadcrumb: "pf-c-menu__breadcrumb",
  menuContent: "pf-c-menu__content",
  menuFooter: "pf-c-menu__footer",
  menuGroup: "pf-c-menu__group",
  menuGroupTitle: "pf-c-menu__group-title",
  menuHeader: "pf-c-menu__header",
  menuItem: "pf-c-menu__item",
  menuItemAction: "pf-c-menu__item-action",
  menuItemActionIcon: "pf-c-menu__item-action-icon",
  menuItemCheck: "pf-c-menu__item-check",
  menuItemDescription: "pf-c-menu__item-description",
  menuItemExternalIcon: "pf-c-menu__item-external-icon",
  menuItemIcon: "pf-c-menu__item-icon",
  menuItemMain: "pf-c-menu__item-main",
  menuItemSelectIcon: "pf-c-menu__item-select-icon",
  menuItemText: "pf-c-menu__item-text",
  menuItemToggleIcon: "pf-c-menu__item-toggle-icon",
  menuList: "pf-c-menu__list",
  menuListItem: "pf-c-menu__list-item",
  menuSearch: "pf-c-menu__search",
  modifiers: {
    hidden: "pf-m-hidden",
    hiddenOnSm: "pf-m-hidden-on-sm",
    visibleOnSm: "pf-m-visible-on-sm",
    hiddenOnMd: "pf-m-hidden-on-md",
    visibleOnMd: "pf-m-visible-on-md",
    hiddenOnLg: "pf-m-hidden-on-lg",
    visibleOnLg: "pf-m-visible-on-lg",
    hiddenOnXl: "pf-m-hidden-on-xl",
    visibleOnXl: "pf-m-visible-on-xl",
    hiddenOn_2xl: "pf-m-hidden-on-2xl",
    visibleOn_2xl: "pf-m-visible-on-2xl",
    flyout: "pf-m-flyout",
    top: "pf-m-top",
    left: "pf-m-left",
    drilldown: "pf-m-drilldown",
    drilledIn: "pf-m-drilled-in",
    currentPath: "pf-m-current-path",
    static: "pf-m-static",
    plain: "pf-m-plain",
    scrollable: "pf-m-scrollable",
    nav: "pf-m-nav",
    focus: "pf-m-focus",
    disabled: "pf-m-disabled",
    load: "pf-m-load",
    loading: "pf-m-loading",
    selected: "pf-m-selected",
    favorite: "pf-m-favorite",
    favorited: "pf-m-favorited"
  },
  themeDark: "pf-theme-dark"
};

const MenuContext = react.createContext({
    menuId: null,
    parentMenu: null,
    onActionClick: () => null,
    onSelect: () => null,
    activeItemId: null,
    selected: null,
    drilledInMenus: [],
    drilldownItemPath: [],
    onDrillIn: null,
    onDrillOut: null,
    onGetMenuHeight: () => null,
    flyoutRef: null,
    setFlyoutRef: () => null,
    disableHover: false
});
const MenuItemContext = react.createContext({
    itemId: null,
    isDisabled: false
});

class MenuBase extends react.Component {
    constructor(props) {
        super(props);
        this.menuRef = react.createRef();
        this.activeMenu = null;
        this.state = {
            ouiaStateId: getDefaultOUIAId(Menu.displayName),
            searchInputValue: '',
            transitionMoveTarget: null,
            flyoutRef: null,
            disableHover: false
        };
        this.handleDrilldownTransition = (event) => {
            const current = this.menuRef.current;
            if (!current ||
                (current !== event.target.closest('.pf-c-menu') &&
                    !Array.from(current.getElementsByClassName('pf-c-menu')).includes(event.target.closest('.pf-c-menu')))) {
                return;
            }
            if (this.state.transitionMoveTarget) {
                this.state.transitionMoveTarget.focus();
                this.setState({ transitionMoveTarget: null });
            }
            else {
                const nextMenu = current.querySelector('#' + this.props.activeMenu) || current || null;
                const nextTarget = Array.from(nextMenu.getElementsByTagName('UL')[0].children).filter(el => !(el.classList.contains('pf-m-disabled') || el.classList.contains('pf-c-divider')))[0].firstChild;
                nextTarget.focus();
                nextTarget.tabIndex = 0;
            }
        };
        this.handleExtraKeys = (event) => {
            const isDrilldown = this.props.containsDrilldown;
            const activeElement = document.activeElement;
            if (event.target.closest('.pf-c-menu') !== this.activeMenu &&
                !event.target.classList.contains('pf-c-breadcrumb__link')) {
                this.activeMenu = event.target.closest('.pf-c-menu');
                this.setState({ disableHover: true });
            }
            if (event.target.tagName === 'INPUT') {
                return;
            }
            const parentMenu = this.activeMenu;
            const key = event.key;
            const isFromBreadcrumb = activeElement.classList.contains('pf-c-breadcrumb__link') ||
                activeElement.classList.contains('pf-c-dropdown__toggle');
            if (key === ' ' || key === 'Enter') {
                event.preventDefault();
                if (isDrilldown && !isFromBreadcrumb) {
                    const isDrillingOut = activeElement.closest('li').classList.contains('pf-m-current-path');
                    if (isDrillingOut && parentMenu.parentElement.tagName === 'LI') {
                        activeElement.tabIndex = -1;
                        parentMenu.parentElement.firstChild.tabIndex = 0;
                        this.setState({ transitionMoveTarget: parentMenu.parentElement.firstChild });
                    }
                    else {
                        if (activeElement.nextElementSibling && activeElement.nextElementSibling.classList.contains('pf-c-menu')) {
                            const childItems = Array.from(activeElement.nextElementSibling.getElementsByTagName('UL')[0].children).filter(el => !(el.classList.contains('pf-m-disabled') || el.classList.contains('pf-c-divider')));
                            activeElement.tabIndex = -1;
                            childItems[0].firstChild.tabIndex = 0;
                            this.setState({ transitionMoveTarget: childItems[0].firstChild });
                        }
                    }
                }
                document.activeElement.click();
            }
        };
        this.createNavigableElements = () => {
            const isDrilldown = this.props.containsDrilldown;
            return isDrilldown
                ? Array.from(this.activeMenu.getElementsByTagName('UL')[0].children).filter(el => !(el.classList.contains('pf-m-disabled') || el.classList.contains('pf-c-divider')))
                : Array.from(this.menuRef.current.getElementsByTagName('LI')).filter(el => !(el.classList.contains('pf-m-disabled') || el.classList.contains('pf-c-divider')));
        };
        if (props.innerRef) {
            this.menuRef = props.innerRef;
        }
    }
    allowTabFirstItem() {
        // Allow tabbing to first menu item
        const current = this.menuRef.current;
        if (current) {
            const first = current.querySelector('ul button, ul a');
            if (first) {
                first.tabIndex = 0;
            }
        }
    }
    componentDidMount() {
        if (this.context) {
            this.setState({ disableHover: this.context.disableHover });
        }
        if (canUseDOM) {
            window.addEventListener('transitionend', this.props.isRootMenu ? this.handleDrilldownTransition : null);
        }
        this.allowTabFirstItem();
    }
    componentWillUnmount() {
        if (canUseDOM) {
            window.removeEventListener('transitionend', this.handleDrilldownTransition);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.children !== this.props.children) {
            this.allowTabFirstItem();
        }
    }
    render() {
        const _a = this.props, { 'aria-label': ariaLabel, id, children, className, onSelect, selected = null, onActionClick, ouiaId, ouiaSafe, containsFlyout, isNavFlyout, containsDrilldown, isMenuDrilledIn, isPlain, isScrollable, drilldownItemPath, drilledInMenus, onDrillIn, onDrillOut, onGetMenuHeight, parentMenu = null, activeItemId = null, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        innerRef, isRootMenu, activeMenu } = _a, 
        /* eslint-enable @typescript-eslint/no-unused-vars */
        props = __rest(_a, ['aria-label', "id", "children", "className", "onSelect", "selected", "onActionClick", "ouiaId", "ouiaSafe", "containsFlyout", "isNavFlyout", "containsDrilldown", "isMenuDrilledIn", "isPlain", "isScrollable", "drilldownItemPath", "drilledInMenus", "onDrillIn", "onDrillOut", "onGetMenuHeight", "parentMenu", "activeItemId", "innerRef", "isRootMenu", "activeMenu"]);
        const _isMenuDrilledIn = isMenuDrilledIn || (drilledInMenus && drilledInMenus.includes(id)) || false;
        return (react.createElement(MenuContext.Provider, { value: {
                menuId: id,
                parentMenu: parentMenu || id,
                onSelect,
                onActionClick,
                activeItemId,
                selected,
                drilledInMenus,
                drilldownItemPath,
                onDrillIn,
                onDrillOut,
                onGetMenuHeight,
                flyoutRef: this.state.flyoutRef,
                setFlyoutRef: flyoutRef => this.setState({ flyoutRef }),
                disableHover: this.state.disableHover
            } },
            isRootMenu && (react.createElement(KeyboardHandler, { containerRef: this.menuRef || null, additionalKeyHandler: this.handleExtraKeys, createNavigableElements: this.createNavigableElements, isActiveElement: (element) => document.activeElement.parentElement === element ||
                    (document.activeElement.closest('ol') && document.activeElement.closest('ol').firstChild === element), getFocusableElement: (navigableElement) => navigableElement.firstChild, noHorizontalArrowHandling: document.activeElement &&
                    (document.activeElement.classList.contains('pf-c-breadcrumb__link') ||
                        document.activeElement.classList.contains('pf-c-dropdown__toggle')), noEnterHandling: true, noSpaceHandling: true })),
            react.createElement("div", Object.assign({ id: id, className: css(menuStyles.menu, isPlain && menuStyles.modifiers.plain, isScrollable && menuStyles.modifiers.scrollable, containsFlyout && menuStyles.modifiers.flyout, isNavFlyout && menuStyles.modifiers.nav, containsDrilldown && menuStyles.modifiers.drilldown, _isMenuDrilledIn && menuStyles.modifiers.drilledIn, className), "aria-label": ariaLabel, ref: this.menuRef }, getOUIAProps(Menu.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe), props), children)));
    }
}
MenuBase.displayName = 'Menu';
MenuBase.contextType = MenuContext;
MenuBase.defaultProps = {
    ouiaSafe: true,
    isRootMenu: true,
    isPlain: false,
    isScrollable: false
};
const Menu = react.forwardRef((props, ref) => (react.createElement(MenuBase, Object.assign({}, props, { innerRef: ref }))));
Menu.displayName = 'Menu';

const MenuContent = react.forwardRef((props, ref) => {
    const { getHeight, children, menuHeight, maxMenuHeight } = props, rest = __rest(props, ["getHeight", "children", "menuHeight", "maxMenuHeight"]);
    const menuContentRef = react.createRef();
    const refCallback = (el, menuId, onGetMenuHeight) => {
        if (el) {
            let clientHeight = el.clientHeight;
            // if this menu is a submenu, we need to account for the root menu list's padding and root menu content's border.
            let rootMenuList = null;
            let parentEl = el.closest(`.${menuStyles.menuList}`);
            while (parentEl !== null && parentEl.nodeType === 1) {
                if (parentEl.classList.contains(menuStyles.menuList)) {
                    rootMenuList = parentEl;
                }
                parentEl = parentEl.parentElement;
            }
            if (rootMenuList) {
                const rootMenuListStyles = getComputedStyle(rootMenuList);
                const rootMenuListPaddingOffset = parseFloat(rootMenuListStyles.getPropertyValue('padding-top').replace(/px/g, '')) +
                    parseFloat(rootMenuListStyles.getPropertyValue('padding-bottom').replace(/px/g, '')) +
                    parseFloat(getComputedStyle(rootMenuList.parentElement)
                        .getPropertyValue('border-bottom-width')
                        .replace(/px/g, ''));
                clientHeight = clientHeight + rootMenuListPaddingOffset;
            }
            onGetMenuHeight && onGetMenuHeight(menuId, clientHeight);
            getHeight && getHeight(clientHeight.toString());
        }
        return ref || menuContentRef;
    };
    return (react.createElement(MenuContext.Consumer, null, ({ menuId, onGetMenuHeight }) => (react.createElement("div", Object.assign({}, rest, { className: css(menuStyles.menuContent, props.className), ref: el => refCallback(el, menuId, onGetMenuHeight), style: Object.assign(Object.assign({}, (menuHeight && { '--pf-c-menu__content--Height': menuHeight })), (maxMenuHeight && { '--pf-c-menu__content--MaxHeight': maxMenuHeight })) }), children))));
});
MenuContent.displayName = 'MenuContent';

const c_menu_m_flyout__menu_top_offset = {
  "name": "--pf-c-menu--m-flyout__menu--top-offset",
  "value": "0px",
  "var": "var(--pf-c-menu--m-flyout__menu--top-offset)"
};

const c_menu_m_flyout__menu_m_left_right_offset = {
  "name": "--pf-c-menu--m-flyout__menu--m-left--right-offset",
  "value": "0px",
  "var": "var(--pf-c-menu--m-flyout__menu--m-left--right-offset)"
};

const c_menu_m_flyout__menu_left_offset = {
  "name": "--pf-c-menu--m-flyout__menu--left-offset",
  "value": "0px",
  "var": "var(--pf-c-menu--m-flyout__menu--left-offset)"
};

const MenuItemActionBase = (_a) => {
    var { className = '', icon, onClick, 'aria-label': ariaLabel, isFavorited = null, isDisabled, actionId, innerRef } = _a, props = __rest(_a, ["className", "icon", "onClick", 'aria-label', "isFavorited", "isDisabled", "actionId", "innerRef"]);
    return (react.createElement(MenuContext.Consumer, null, ({ onActionClick }) => (react.createElement(MenuItemContext.Consumer, null, ({ itemId, isDisabled: isDisabledContext }) => {
        const onClickButton = (event) => {
            // event specified on the MenuItemAction
            onClick && onClick(event);
            // event specified on the Menu
            onActionClick && onActionClick(event, itemId, actionId);
        };
        return (react.createElement("button", Object.assign({ className: css(menuStyles.menuItemAction, isFavorited !== null && menuStyles.modifiers.favorite, isFavorited && menuStyles.modifiers.favorited, className), "aria-label": ariaLabel, onClick: onClickButton }, ((isDisabled === true || isDisabledContext === true) && { disabled: true }), { ref: innerRef, tabIndex: -1 }, props),
            react.createElement("span", { className: css(menuStyles.menuItemActionIcon) }, icon === 'favorites' || isFavorited !== null ? react.createElement(StarIcon, { "aria-hidden": true }) : icon)));
    }))));
};
const MenuItemAction = react.forwardRef((props, ref) => (react.createElement(MenuItemActionBase, Object.assign({}, props, { innerRef: ref }))));
MenuItemAction.displayName = 'MenuItemAction';

const FlyoutContext = react.createContext({
    direction: 'right'
});
const MenuItemBase = (_a) => {
    var { children, className, itemId = null, to, hasCheck = false, isActive = null, isFavorited = null, isLoadButton = false, isLoading = false, flyoutMenu, direction, description = null, onClick = () => { }, component = 'button', isDisabled = false, isExternalLink = false, isSelected = null, icon, actions, onShowFlyout, drilldownMenu, isOnPath, innerRef } = _a, props = __rest(_a, ["children", "className", "itemId", "to", "hasCheck", "isActive", "isFavorited", "isLoadButton", "isLoading", "flyoutMenu", "direction", "description", "onClick", "component", "isDisabled", "isExternalLink", "isSelected", "icon", "actions", "onShowFlyout", "drilldownMenu", "isOnPath", "innerRef"]);
    const { menuId, parentMenu, onSelect, onActionClick, activeItemId, selected, drilldownItemPath, onDrillIn, onDrillOut, flyoutRef, setFlyoutRef, disableHover } = react.useContext(MenuContext);
    let Component = (to ? 'a' : component);
    if (hasCheck && !to) {
        Component = 'label';
    }
    const [flyoutTarget, setFlyoutTarget] = react.useState(null);
    const flyoutContext = react.useContext(FlyoutContext);
    const [flyoutXDirection, setFlyoutXDirection] = react.useState(flyoutContext.direction);
    const ref = react.useRef();
    const flyoutVisible = ref === flyoutRef;
    const hasFlyout = flyoutMenu !== undefined;
    const showFlyout = (show) => {
        if (!flyoutVisible && show) {
            setFlyoutRef(ref);
        }
        else if (flyoutVisible && !show) {
            setFlyoutRef(null);
        }
        onShowFlyout && show && onShowFlyout();
    };
    useIsomorphicLayoutEffect(() => {
        if (hasFlyout && ref.current && canUseDOM) {
            const flyoutMenu = ref.current.lastElementChild;
            if (flyoutMenu && flyoutMenu.classList.contains(menuStyles.menu)) {
                const origin = ref.current.getClientRects()[0];
                const rect = flyoutMenu.getClientRects()[0];
                if (origin && rect) {
                    const spaceLeftLeft = origin.x - rect.width;
                    const spaceLeftRight = window.innerWidth - origin.x - origin.width - rect.width;
                    let xDir = flyoutXDirection;
                    if (spaceLeftRight < 0 && xDir !== 'left') {
                        setFlyoutXDirection('left');
                        xDir = 'left';
                    }
                    else if (spaceLeftLeft < 0 && xDir !== 'right') {
                        setFlyoutXDirection('right');
                        xDir = 'right';
                    }
                    let xOffset = 0;
                    if (spaceLeftLeft < 0 && spaceLeftRight < 0) {
                        xOffset = xDir === 'right' ? -spaceLeftRight : -spaceLeftLeft;
                    }
                    if (xDir === 'left') {
                        flyoutMenu.classList.add(menuStyles.modifiers.left);
                        flyoutMenu.style.setProperty(c_menu_m_flyout__menu_m_left_right_offset.name, `-${xOffset}px`);
                    }
                    else {
                        flyoutMenu.style.setProperty(c_menu_m_flyout__menu_left_offset.name, `-${xOffset}px`);
                    }
                    const spaceLeftBot = window.innerHeight - origin.y - rect.height;
                    const spaceLeftTop = window.innerHeight - rect.height;
                    if (spaceLeftTop < 0 && spaceLeftBot < 0) ;
                    else if (spaceLeftBot < 0) {
                        flyoutMenu.style.setProperty(c_menu_m_flyout__menu_top_offset.name, `${spaceLeftBot}px`);
                    }
                }
            }
        }
    }, [flyoutVisible, flyoutMenu]);
    react.useEffect(() => {
        setFlyoutXDirection(flyoutContext.direction);
    }, [flyoutContext]);
    react.useEffect(() => {
        if (flyoutTarget) {
            if (flyoutVisible) {
                const flyoutMenu = flyoutTarget.nextElementSibling;
                const flyoutItems = Array.from(flyoutMenu.getElementsByTagName('UL')[0].children).filter(el => !(el.classList.contains('pf-m-disabled') || el.classList.contains('pf-c-divider')));
                flyoutItems[0].firstChild.focus();
            }
            else {
                flyoutTarget.focus();
            }
        }
    }, [flyoutVisible, flyoutTarget]);
    const handleFlyout = (event) => {
        const key = event.key;
        const target = event.target;
        if (key === ' ' || key === 'Enter' || key === 'ArrowRight') {
            event.stopPropagation();
            if (!flyoutVisible) {
                showFlyout(true);
                setFlyoutTarget(target);
            }
        }
        if (key === 'Escape' || key === 'ArrowLeft') {
            if (flyoutVisible) {
                event.stopPropagation();
                showFlyout(false);
            }
        }
    };
    const onItemSelect = (event, onSelect) => {
        // Trigger callback for Menu onSelect
        onSelect && onSelect(event, itemId);
        // Trigger callback for item onClick
        onClick && onClick(event);
    };
    const _isOnPath = (isOnPath && isOnPath) || (drilldownItemPath && drilldownItemPath.includes(itemId)) || false;
    let _drill;
    if (direction) {
        if (direction === 'down') {
            _drill = () => onDrillIn &&
                onDrillIn(menuId, typeof drilldownMenu === 'function'
                    ? drilldownMenu().props.id
                    : drilldownMenu.props.id, itemId);
        }
        else {
            _drill = () => onDrillOut && onDrillOut(parentMenu, itemId);
        }
    }
    let additionalProps = {};
    if (Component === 'a') {
        additionalProps = {
            href: to,
            'aria-disabled': isDisabled ? true : null,
            // prevent invalid 'disabled' attribute on <a> tags
            disabled: null
        };
    }
    else if (Component === 'button') {
        additionalProps = {
            type: 'button'
        };
    }
    if (isOnPath) {
        additionalProps['aria-expanded'] = true;
    }
    else if (hasFlyout) {
        additionalProps['aria-haspopup'] = true;
        additionalProps['aria-expanded'] = flyoutVisible;
    }
    const getAriaCurrent = () => {
        if (isActive !== null) {
            if (isActive) {
                return 'page';
            }
            else {
                return null;
            }
        }
        else if (itemId !== null && activeItemId !== null) {
            return itemId === activeItemId;
        }
        return null;
    };
    const getIsSelected = () => {
        if (isSelected !== null) {
            return isSelected;
        }
        else if (selected !== null && itemId !== null) {
            return (Array.isArray(selected) && selected.includes(itemId)) || itemId === selected;
        }
        return false;
    };
    const onMouseOver = () => {
        if (disableHover) {
            return;
        }
        if (hasFlyout) {
            showFlyout(true);
        }
        else {
            setFlyoutRef(null);
        }
    };
    return (react.createElement("li", Object.assign({ className: css(menuStyles.menuListItem, isDisabled && menuStyles.modifiers.disabled, _isOnPath && menuStyles.modifiers.currentPath, isLoadButton && menuStyles.modifiers.load, isLoading && menuStyles.modifiers.loading, className), onMouseOver: onMouseOver }, (flyoutMenu && { onKeyDown: handleFlyout }), { ref: ref, role: !hasCheck ? 'none' : 'menuitem' }, props),
        react.createElement(GenerateId, null, randomId => (react.createElement(Component, Object.assign({ tabIndex: -1, className: css(menuStyles.menuItem, getIsSelected() && !hasCheck && menuStyles.modifiers.selected, className), "aria-current": getAriaCurrent() }, (!hasCheck && { disabled: isDisabled }), (!hasCheck && { role: 'menuitem' }), { ref: innerRef }, (!hasCheck && {
            onClick: (event) => {
                onItemSelect(event, onSelect);
                _drill && _drill();
            }
        }), (hasCheck && { htmlFor: randomId }), additionalProps),
            react.createElement("span", { className: css(menuStyles.menuItemMain) },
                direction === 'up' && (react.createElement("span", { className: css(menuStyles.menuItemToggleIcon) },
                    react.createElement(AngleLeftIcon, { "aria-hidden": true }))),
                icon && react.createElement("span", { className: css(menuStyles.menuItemIcon) }, icon),
                hasCheck && (react.createElement("span", { className: css('pf-c-menu__item-check') },
                    react.createElement(Checkbox, { id: randomId, component: "span", isChecked: isSelected || false, onChange: event => onItemSelect(event, onSelect), isDisabled: isDisabled }))),
                react.createElement("span", { className: css(menuStyles.menuItemText) }, children),
                isExternalLink && (react.createElement("span", { className: css(menuStyles.menuItemExternalIcon) },
                    react.createElement(ExternalLinkAltIcon, { "aria-hidden": true }))),
                (flyoutMenu || direction === 'down') && (react.createElement("span", { className: css(menuStyles.menuItemToggleIcon) },
                    react.createElement(AngleRightIcon, { "aria-hidden": true }))),
                getIsSelected() && (react.createElement("span", { className: css(menuStyles.menuItemSelectIcon) },
                    react.createElement(CheckIcon, { "aria-hidden": true })))),
            description && direction !== 'up' && (react.createElement("span", { className: css(menuStyles.menuItemDescription) },
                react.createElement("span", null, description)))))),
        flyoutVisible && (react.createElement(MenuContext.Provider, { value: { disableHover } },
            react.createElement(FlyoutContext.Provider, { value: { direction: flyoutXDirection } }, flyoutMenu))),
        typeof drilldownMenu === 'function' ? drilldownMenu() : drilldownMenu,
        react.createElement(MenuItemContext.Provider, { value: { itemId, isDisabled } },
            actions,
            isFavorited !== null && (react.createElement(MenuItemAction, { icon: "favorites", isFavorited: isFavorited, "aria-label": isFavorited ? 'starred' : 'not starred', onClick: event => onActionClick(event, itemId), tabIndex: -1, actionId: "fav" })))));
};
const MenuItem = react.forwardRef((props, ref) => (react.createElement(MenuItemBase, Object.assign({}, props, { innerRef: ref }))));
MenuItem.displayName = 'MenuItem';

const MenuList = (_a) => {
    var { children = null, className } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("ul", Object.assign({ role: "menu", className: css(menuStyles.menuList, className) }, props), children));
};
MenuList.displayName = 'MenuList';

import('../common/modal-box-1aebc935.js');
var modalStyles = {
  button: "pf-c-button",
  modalBox: "pf-c-modal-box",
  modalBoxBody: "pf-c-modal-box__body",
  modalBoxDescription: "pf-c-modal-box__description",
  modalBoxFooter: "pf-c-modal-box__footer",
  modalBoxHeader: "pf-c-modal-box__header",
  modalBoxHeaderMain: "pf-c-modal-box__header-main",
  modalBoxTitle: "pf-c-modal-box__title",
  modalBoxTitleIcon: "pf-c-modal-box__title-icon",
  modalBoxTitleText: "pf-c-modal-box__title-text",
  modifiers: {
    sm: "pf-m-sm",
    md: "pf-m-md",
    lg: "pf-m-lg",
    alignTop: "pf-m-align-top",
    danger: "pf-m-danger",
    warning: "pf-m-warning",
    success: "pf-m-success",
    default: "pf-m-default",
    info: "pf-m-info",
    help: "pf-m-help",
    icon: "pf-m-icon"
  },
  themeDark: "pf-theme-dark"
};

const ModalBoxBody = (_a) => {
    var { children = null, className = '' } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("div", Object.assign({}, props, { className: css(modalStyles.modalBoxBody, className) }), children));
};
ModalBoxBody.displayName = 'ModalBoxBody';

const ModalBoxCloseButton = (_a) => {
    var { className = '', onClose = () => undefined, ouiaId } = _a, props = __rest(_a, ["className", "onClose", "ouiaId"]);
    return (react.createElement(Button, Object.assign({ className: className, variant: "plain", onClick: onClose, "aria-label": "Close" }, (ouiaId && { ouiaId: `${ouiaId}-${ModalBoxCloseButton.displayName}` }), props),
        react.createElement(TimesIcon, null)));
};
ModalBoxCloseButton.displayName = 'ModalBoxCloseButton';

const c_modal_box_m_align_top_spacer = {
  "name": "--pf-c-modal-box--m-align-top--spacer",
  "value": "0.5rem",
  "var": "var(--pf-c-modal-box--m-align-top--spacer)"
};

const ModalBox = (_a) => {
    var { children, className = '', variant = 'default', position, positionOffset, 'aria-labelledby': ariaLabelledby, 'aria-label': ariaLabel = '', 'aria-describedby': ariaDescribedby, style } = _a, props = __rest(_a, ["children", "className", "variant", "position", "positionOffset", 'aria-labelledby', 'aria-label', 'aria-describedby', "style"]);
    if (positionOffset) {
        style = style || {};
        style[c_modal_box_m_align_top_spacer.name] = positionOffset;
    }
    return (react.createElement("div", Object.assign({}, props, { role: "dialog", "aria-label": ariaLabel || null, "aria-labelledby": ariaLabelledby || null, "aria-describedby": ariaDescribedby, "aria-modal": "true", className: css(modalStyles.modalBox, className, position === 'top' && modalStyles.modifiers.alignTop, variant === 'large' && modalStyles.modifiers.lg, variant === 'small' && modalStyles.modifiers.sm, variant === 'medium' && modalStyles.modifiers.md), style: style }), children));
};
ModalBox.displayName = 'ModalBox';

const ModalBoxFooter = (_a) => {
    var { children = null, className = '' } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("footer", Object.assign({}, props, { className: css(modalStyles.modalBoxFooter, className) }), children));
};
ModalBoxFooter.displayName = 'ModalBoxFooter';

const ModalBoxDescription = (_a) => {
    var { children = null, className = '', id = '' } = _a, props = __rest(_a, ["children", "className", "id"]);
    return (react.createElement("div", Object.assign({}, props, { id: id, className: css(modalStyles.modalBoxDescription, className) }), children));
};
ModalBoxDescription.displayName = 'ModalBoxDescription';

const ModalBoxHeader = (_a) => {
    var { children = null, className = '', help = null } = _a, props = __rest(_a, ["children", "className", "help"]);
    return (react.createElement("header", Object.assign({ className: css(modalStyles.modalBoxHeader, help && modalStyles.modifiers.help, className) }, props),
        help && (react.createElement(react.Fragment, null,
            react.createElement("div", { className: css(modalStyles.modalBoxHeaderMain) }, children),
            react.createElement("div", { className: "pf-c-modal-box__header-help" }, help))),
        !help && children));
};
ModalBoxHeader.displayName = 'ModalBoxHeader';

const isVariantIcon = (icon) => ['success', 'danger', 'warning', 'info', 'default'].includes(icon);
const ModalBoxTitle = (_a) => {
    var { className = '', id, title, titleIconVariant, titleLabel = '' } = _a, props = __rest(_a, ["className", "id", "title", "titleIconVariant", "titleLabel"]);
    const [hasTooltip, setHasTooltip] = react.useState(false);
    const h1 = react.useRef();
    const label = titleLabel || (isVariantIcon(titleIconVariant) ? `${capitalize(titleIconVariant)} alert:` : titleLabel);
    const variantIcons = {
        success: react.createElement(CheckCircleIcon, null),
        danger: react.createElement(ExclamationCircleIcon, null),
        warning: react.createElement(ExclamationTriangleIcon, null),
        info: react.createElement(InfoCircleIcon, null),
        default: react.createElement(BellIcon, null)
    };
    const CustomIcon = !isVariantIcon(titleIconVariant) && titleIconVariant;
    useIsomorphicLayoutEffect(() => {
        setHasTooltip(h1.current && h1.current.offsetWidth < h1.current.scrollWidth);
    }, []);
    const content = (react.createElement("h1", Object.assign({ id: id, ref: h1, className: css(modalStyles.modalBoxTitle, titleIconVariant && modalStyles.modifiers.icon, className) }, props),
        titleIconVariant && (react.createElement("span", { className: css(modalStyles.modalBoxTitleIcon) }, isVariantIcon(titleIconVariant) ? variantIcons[titleIconVariant] : react.createElement(CustomIcon, null))),
        label && react.createElement("span", { className: css(a11yStyles.screenReader) }, label),
        react.createElement("span", { className: css(modalStyles.modalBoxTitleText) }, title)));
    return hasTooltip ? react.createElement(Tooltip, { content: title }, content) : content;
};
ModalBoxTitle.displayName = 'ModalBoxTitle';

const ModalContent = (_a) => {
    var { children, className = '', isOpen = false, header = null, help = null, description = null, title = '', titleIconVariant = null, titleLabel = '', 'aria-label': ariaLabel = '', 'aria-describedby': ariaDescribedby, 'aria-labelledby': ariaLabelledby, bodyAriaLabel, bodyAriaRole, showClose = true, footer = null, actions = [], onClose = () => undefined, variant = 'default', position, positionOffset, width = -1, boxId, labelId, descriptorId, disableFocusTrap = false, hasNoBodyWrapper = false, ouiaId, ouiaSafe = true } = _a, props = __rest(_a, ["children", "className", "isOpen", "header", "help", "description", "title", "titleIconVariant", "titleLabel", 'aria-label', 'aria-describedby', 'aria-labelledby', "bodyAriaLabel", "bodyAriaRole", "showClose", "footer", "actions", "onClose", "variant", "position", "positionOffset", "width", "boxId", "labelId", "descriptorId", "disableFocusTrap", "hasNoBodyWrapper", "ouiaId", "ouiaSafe"]);
    if (!isOpen) {
        return null;
    }
    const modalBoxHeader = header ? (react.createElement(ModalBoxHeader, { help: help }, header)) : (title && (react.createElement(ModalBoxHeader, { help: help },
        react.createElement(ModalBoxTitle, { title: title, titleIconVariant: titleIconVariant, titleLabel: titleLabel, id: labelId }),
        description && react.createElement(ModalBoxDescription, { id: descriptorId }, description))));
    const modalBoxFooter = footer ? (react.createElement(ModalBoxFooter, null, footer)) : (actions.length > 0 && react.createElement(ModalBoxFooter, null, actions));
    const defaultModalBodyAriaRole = bodyAriaLabel ? 'region' : undefined;
    const modalBody = hasNoBodyWrapper ? (children) : (react.createElement(ModalBoxBody, Object.assign({ "aria-label": bodyAriaLabel, role: bodyAriaRole || defaultModalBodyAriaRole }, props, (!description && !ariaDescribedby && { id: descriptorId })), children));
    const boxStyle = width === -1 ? {} : { width };
    const ariaLabelledbyFormatted = () => {
        if (ariaLabelledby === null) {
            return null;
        }
        const idRefList = [];
        if ((ariaLabel && boxId) !== '') {
            idRefList.push(ariaLabel && boxId);
        }
        if (ariaLabelledby) {
            idRefList.push(ariaLabelledby);
        }
        if (title) {
            idRefList.push(labelId);
        }
        return idRefList.join(' ');
    };
    const modalBox = (react.createElement(ModalBox, Object.assign({ id: boxId, style: boxStyle, className: css(className, isVariantIcon(titleIconVariant) &&
            modalStyles.modifiers[titleIconVariant]), variant: variant, position: position, positionOffset: positionOffset, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledbyFormatted(), "aria-describedby": ariaDescribedby || (hasNoBodyWrapper ? null : descriptorId) }, getOUIAProps(ModalContent.displayName, ouiaId, ouiaSafe)),
        showClose && react.createElement(ModalBoxCloseButton, { onClose: onClose, ouiaId: ouiaId }),
        modalBoxHeader,
        modalBody,
        modalBoxFooter));
    return (react.createElement(Backdrop, null,
        react.createElement(FocusTrap, { active: !disableFocusTrap, focusTrapOptions: { clickOutsideDeactivates: true, tabbableOptions: { displayCheck: 'none' } }, className: css(styles$M.bullseye) }, modalBox)));
};
ModalContent.displayName = 'ModalContent';

var ModalVariant;
(function (ModalVariant) {
    ModalVariant["small"] = "small";
    ModalVariant["medium"] = "medium";
    ModalVariant["large"] = "large";
    ModalVariant["default"] = "default";
})(ModalVariant || (ModalVariant = {}));
class Modal extends react.Component {
    constructor(props) {
        super(props);
        this.boxId = '';
        this.labelId = '';
        this.descriptorId = '';
        this.handleEscKeyClick = (event) => {
            const { onEscapePress } = this.props;
            if (event.keyCode === KEY_CODES.ESCAPE_KEY && this.props.isOpen) {
                onEscapePress ? onEscapePress(event) : this.props.onClose();
            }
        };
        this.getElement = (appendTo) => {
            if (typeof appendTo === 'function') {
                return appendTo();
            }
            return appendTo || document.body;
        };
        this.toggleSiblingsFromScreenReaders = (hide) => {
            const { appendTo } = this.props;
            const target = this.getElement(appendTo);
            const bodyChildren = target.children;
            for (const child of Array.from(bodyChildren)) {
                if (child !== this.state.container) {
                    hide ? child.setAttribute('aria-hidden', '' + hide) : child.removeAttribute('aria-hidden');
                }
            }
        };
        this.isEmpty = (value) => value === null || value === undefined || value === '';
        const boxIdNum = Modal.currentId++;
        const labelIdNum = boxIdNum + 1;
        const descriptorIdNum = boxIdNum + 2;
        this.boxId = props.id || `pf-modal-part-${boxIdNum}`;
        this.labelId = `pf-modal-part-${labelIdNum}`;
        this.descriptorId = `pf-modal-part-${descriptorIdNum}`;
        this.state = {
            container: undefined,
            ouiaStateId: getDefaultOUIAId(Modal.displayName, props.variant)
        };
    }
    componentDidMount() {
        const { appendTo, title, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, hasNoBodyWrapper, header } = this.props;
        const target = this.getElement(appendTo);
        const container = document.createElement('div');
        this.setState({ container });
        target.appendChild(container);
        target.addEventListener('keydown', this.handleEscKeyClick, false);
        if (this.props.isOpen) {
            target.classList.add(css(styles.backdropOpen));
        }
        else {
            target.classList.remove(css(styles.backdropOpen));
        }
        if (this.isEmpty(title) && this.isEmpty(ariaLabel) && this.isEmpty(ariaLabelledby)) {
            // eslint-disable-next-line no-console
            console.error('Modal: Specify at least one of: title, aria-label, aria-labelledby.');
        }
        if (this.isEmpty(ariaLabel) && this.isEmpty(ariaLabelledby) && (hasNoBodyWrapper || header)) {
            // eslint-disable-next-line no-console
            console.error('Modal: When using hasNoBodyWrapper or setting a custom header, ensure you assign an accessible name to the the modal container with aria-label or aria-labelledby.');
        }
    }
    componentDidUpdate() {
        const { appendTo } = this.props;
        const target = this.getElement(appendTo);
        if (this.props.isOpen) {
            target.classList.add(css(styles.backdropOpen));
            this.toggleSiblingsFromScreenReaders(true);
        }
        else {
            target.classList.remove(css(styles.backdropOpen));
            this.toggleSiblingsFromScreenReaders(false);
        }
    }
    componentWillUnmount() {
        const { appendTo } = this.props;
        const target = this.getElement(appendTo);
        if (this.state.container) {
            target.removeChild(this.state.container);
        }
        target.removeEventListener('keydown', this.handleEscKeyClick, false);
        target.classList.remove(css(styles.backdropOpen));
    }
    render() {
        const _a = this.props, { 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        appendTo, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onEscapePress, 'aria-labelledby': ariaLabelledby, 'aria-label': ariaLabel, 'aria-describedby': ariaDescribedby, bodyAriaLabel, bodyAriaRole, title, titleIconVariant, titleLabel, ouiaId, ouiaSafe } = _a, props = __rest(_a, ["appendTo", "onEscapePress", 'aria-labelledby', 'aria-label', 'aria-describedby', "bodyAriaLabel", "bodyAriaRole", "title", "titleIconVariant", "titleLabel", "ouiaId", "ouiaSafe"]);
        const { container } = this.state;
        if (!canUseDOM || !container) {
            return null;
        }
        return reactDom.createPortal(react.createElement(ModalContent, Object.assign({}, props, { boxId: this.boxId, labelId: this.labelId, descriptorId: this.descriptorId, title: title, titleIconVariant: titleIconVariant, titleLabel: titleLabel, "aria-label": ariaLabel, "aria-describedby": ariaDescribedby, "aria-labelledby": ariaLabelledby, bodyAriaLabel: bodyAriaLabel, bodyAriaRole: bodyAriaRole, ouiaId: ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe: ouiaSafe })), container);
    }
}
Modal.displayName = 'Modal';
Modal.currentId = 0;
Modal.defaultProps = {
    className: '',
    isOpen: false,
    title: '',
    titleIconVariant: null,
    titleLabel: '',
    'aria-label': '',
    showClose: true,
    'aria-describedby': '',
    'aria-labelledby': '',
    id: undefined,
    actions: [],
    onClose: () => undefined,
    variant: 'default',
    hasNoBodyWrapper: false,
    appendTo: () => document.body,
    ouiaSafe: true
};

import('../common/nav-9430ffeb.js');
var styles$p = {
  divider: "pf-c-divider",
  menu: "pf-c-menu",
  menuContent: "pf-c-menu__content",
  menuItem: "pf-c-menu__item",
  menuItemToggleIcon: "pf-c-menu__item-toggle-icon",
  menuListItem: "pf-c-menu__list-item",
  modifiers: {
    flyout: "pf-m-flyout",
    top: "pf-m-top",
    left: "pf-m-left",
    current: "pf-m-current",
    drillUp: "pf-m-drill-up",
    horizontal: "pf-m-horizontal",
    tertiary: "pf-m-tertiary",
    horizontalSubnav: "pf-m-horizontal-subnav",
    light: "pf-m-light",
    scrollable: "pf-m-scrollable",
    overflowHidden: "pf-m-overflow-hidden",
    expandable: "pf-m-expandable",
    expanded: "pf-m-expanded",
    drilldown: "pf-m-drilldown",
    hover: "pf-m-hover",
    start: "pf-m-start",
    noTitle: "pf-m-no-title"
  },
  nav: "pf-c-nav",
  navItem: "pf-c-nav__item",
  navLink: "pf-c-nav__link",
  navList: "pf-c-nav__list",
  navScrollButton: "pf-c-nav__scroll-button",
  navSection: "pf-c-nav__section",
  navSectionTitle: "pf-c-nav__section-title",
  navSubnav: "pf-c-nav__subnav",
  navToggle: "pf-c-nav__toggle",
  navToggleIcon: "pf-c-nav__toggle-icon",
  themeDark: "pf-theme-dark"
};

const navContextDefaults = {};
const NavContext = react.createContext(navContextDefaults);
class Nav extends react.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isScrollable: false,
            ouiaStateId: getDefaultOUIAId(Nav.displayName, this.props.variant),
            flyoutRef: null
        };
    }
    // Callback from NavItem
    onSelect(event, groupId, itemId, to, preventDefault, onClick) {
        if (preventDefault) {
            event.preventDefault();
        }
        this.props.onSelect({ groupId, itemId, event, to });
        if (onClick) {
            onClick(event, itemId, groupId, to);
        }
    }
    // Callback from NavExpandable
    onToggle(event, groupId, toggleValue) {
        this.props.onToggle({
            event,
            groupId,
            isExpanded: toggleValue
        });
    }
    render() {
        const _a = this.props, { 'aria-label': ariaLabel, children, className, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSelect, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onToggle, theme, ouiaId, ouiaSafe, variant } = _a, props = __rest(_a, ['aria-label', "children", "className", "onSelect", "onToggle", "theme", "ouiaId", "ouiaSafe", "variant"]);
        const isHorizontal = ['horizontal', 'tertiary'].includes(variant);
        return (react.createElement(NavContext.Provider, { value: {
                onSelect: (event, groupId, itemId, to, preventDefault, onClick) => this.onSelect(event, groupId, itemId, to, preventDefault, onClick),
                onToggle: (event, groupId, expanded) => this.onToggle(event, groupId, expanded),
                updateIsScrollable: (isScrollable) => this.setState({ isScrollable }),
                isHorizontal: ['horizontal', 'tertiary', 'horizontal-subnav'].includes(variant),
                flyoutRef: this.state.flyoutRef,
                setFlyoutRef: flyoutRef => this.setState({ flyoutRef })
            } },
            react.createElement("nav", Object.assign({ className: css(styles$p.nav, theme === 'light' && styles$p.modifiers.light, isHorizontal && styles$p.modifiers.horizontal, variant === 'tertiary' && styles$p.modifiers.tertiary, variant === 'horizontal-subnav' && styles$p.modifiers.horizontalSubnav, this.state.isScrollable && styles$p.modifiers.scrollable, className), "aria-label": ariaLabel || (variant === 'tertiary' ? 'Local' : 'Global') }, getOUIAProps(Nav.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe), props), children)));
    }
}
Nav.displayName = 'Nav';
Nav.defaultProps = {
    onSelect: () => undefined,
    onToggle: () => undefined,
    theme: 'dark',
    ouiaSafe: true
};

const pageSidebarContextDefaults = {
    isNavOpen: true
};
const PageSidebarContext = react.createContext(pageSidebarContextDefaults);
const PageSidebar = (_a) => {
    var { className = '', nav, isNavOpen = true, theme = 'dark' } = _a, props = __rest(_a, ["className", "nav", "isNavOpen", "theme"]);
    return (react.createElement(PageContextConsumer, null, ({ isManagedSidebar, isNavOpen: managedIsNavOpen }) => {
        const navOpen = isManagedSidebar ? managedIsNavOpen : isNavOpen;
        return (react.createElement("div", Object.assign({ id: "page-sidebar", className: css(styles$o.pageSidebar, theme === 'light' && styles$o.modifiers.light, navOpen && styles$o.modifiers.expanded, !navOpen && styles$o.modifiers.collapsed, className), "aria-hidden": !navOpen }, props),
            react.createElement("div", { className: styles$o.pageSidebarBody },
                react.createElement(PageSidebarContext.Provider, { value: { isNavOpen: navOpen } }, nav))));
    }));
};
PageSidebar.displayName = 'PageSidebar';

class NavList extends react.Component {
    constructor() {
        super(...arguments);
        this.state = {
            scrollViewAtStart: false,
            scrollViewAtEnd: false
        };
        this.navList = react.createRef();
        this.observer = () => { };
        this.handleScrollButtons = () => {
            const container = this.navList.current;
            if (container) {
                // check if it elements are in view
                const scrollViewAtStart = isElementInView(container, container.firstChild, false);
                const scrollViewAtEnd = isElementInView(container, container.lastChild, false);
                this.setState({
                    scrollViewAtStart,
                    scrollViewAtEnd
                });
                this.context.updateIsScrollable(!scrollViewAtStart || !scrollViewAtEnd);
            }
        };
        this.scrollLeft = () => {
            // find first Element that is fully in view on the left, then scroll to the element before it
            const container = this.navList.current;
            if (container) {
                const childrenArr = Array.from(container.children);
                let firstElementInView;
                let lastElementOutOfView;
                for (let i = 0; i < childrenArr.length && !firstElementInView; i++) {
                    if (isElementInView(container, childrenArr[i], false)) {
                        firstElementInView = childrenArr[i];
                        lastElementOutOfView = childrenArr[i - 1];
                    }
                }
                if (lastElementOutOfView) {
                    container.scrollLeft -= lastElementOutOfView.scrollWidth;
                }
                this.handleScrollButtons();
            }
        };
        this.scrollRight = () => {
            // find last Element that is fully in view on the right, then scroll to the element after it
            const container = this.navList.current;
            if (container) {
                const childrenArr = Array.from(container.children);
                let lastElementInView;
                let firstElementOutOfView;
                for (let i = childrenArr.length - 1; i >= 0 && !lastElementInView; i--) {
                    if (isElementInView(container, childrenArr[i], false)) {
                        lastElementInView = childrenArr[i];
                        firstElementOutOfView = childrenArr[i + 1];
                    }
                }
                if (firstElementOutOfView) {
                    container.scrollLeft += firstElementOutOfView.scrollWidth;
                }
                this.handleScrollButtons();
            }
        };
    }
    componentDidMount() {
        this.observer = getResizeObserver(this.navList.current, this.handleScrollButtons);
        this.handleScrollButtons();
    }
    componentWillUnmount() {
        this.observer();
    }
    render() {
        const _a = this.props, { children, className, ariaLeftScroll, ariaRightScroll } = _a, props = __rest(_a, ["children", "className", "ariaLeftScroll", "ariaRightScroll"]);
        const { scrollViewAtStart, scrollViewAtEnd } = this.state;
        return (react.createElement(NavContext.Consumer, null, ({ isHorizontal }) => (react.createElement(PageSidebarContext.Consumer, null, ({ isNavOpen }) => (react.createElement(react.Fragment, null,
            isHorizontal && (react.createElement("button", { className: css(styles$p.navScrollButton), "aria-label": ariaLeftScroll, onClick: this.scrollLeft, disabled: scrollViewAtStart, tabIndex: isNavOpen ? null : -1 },
                react.createElement(AngleLeftIcon, null))),
            react.createElement("ul", Object.assign({ ref: this.navList, className: css(styles$p.navList, className), onScroll: this.handleScrollButtons }, props), children),
            isHorizontal && (react.createElement("button", { className: css(styles$p.navScrollButton), "aria-label": ariaRightScroll, onClick: this.scrollRight, disabled: scrollViewAtEnd, tabIndex: isNavOpen ? null : -1 },
                react.createElement(AngleRightIcon, null)))))))));
    }
}
NavList.displayName = 'NavList';
NavList.contextType = NavContext;
NavList.defaultProps = {
    ariaLeftScroll: 'Scroll left',
    ariaRightScroll: 'Scroll right'
};

const NavGroup = (_a) => {
    var { title, children = null, className = '', id = getUniqueId() } = _a, props = __rest(_a, ["title", "children", "className", "id"]);
    if (!title && !props['aria-label']) {
        // eslint-disable-next-line no-console
        console.warn("For accessibility reasons an aria-label should be specified on nav groups if a title isn't");
    }
    const labelledBy = title ? id : undefined;
    return (react.createElement("section", Object.assign({ className: css(styles$p.navSection, className), "aria-labelledby": labelledBy }, props),
        title && (react.createElement("h2", { className: css(styles$p.navSectionTitle), id: id }, title)),
        react.createElement("ul", { className: css(styles$p.navList, className) }, children)));
};
NavGroup.displayName = 'NavGroup';

const NavItem = (_a) => {
    var { children, styleChildren = true, className, to, isActive = false, groupId = null, itemId = null, preventDefault = false, onClick = null, component = 'a', flyout, onShowFlyout, ouiaId, ouiaSafe } = _a, props = __rest(_a, ["children", "styleChildren", "className", "to", "isActive", "groupId", "itemId", "preventDefault", "onClick", "component", "flyout", "onShowFlyout", "ouiaId", "ouiaSafe"]);
    const { flyoutRef, setFlyoutRef } = react.useContext(NavContext);
    const { isNavOpen } = react.useContext(PageSidebarContext);
    const [flyoutTarget, setFlyoutTarget] = react.useState(null);
    const [isHovered, setIsHovered] = react.useState(false);
    const ref = react.useRef();
    const flyoutVisible = ref === flyoutRef;
    const popperRef = react.useRef();
    const Component = component;
    const hasFlyout = flyout !== undefined;
    const showFlyout = (show, override) => {
        if ((!flyoutVisible || override) && show) {
            setFlyoutRef(ref);
        }
        else if ((flyoutVisible || override) && !show) {
            setFlyoutRef(null);
        }
        onShowFlyout && show && onShowFlyout();
    };
    const onMouseOver = (event) => {
        const evtContainedInFlyout = event.target.closest('.pf-c-nav__item.pf-m-flyout');
        if (hasFlyout && !flyoutVisible) {
            showFlyout(true);
        }
        else if (flyoutRef !== null && !evtContainedInFlyout) {
            setFlyoutRef(null);
        }
    };
    const onFlyoutClick = (event) => {
        const target = event.target;
        const closestItem = target.closest('.pf-m-flyout');
        if (!closestItem) {
            if (hasFlyout) {
                showFlyout(false, true);
            }
            else if (flyoutRef !== null) {
                setFlyoutRef(null);
            }
        }
    };
    const handleFlyout = (event) => {
        var _a, _b;
        const key = event.key;
        const target = event.target;
        if (!(((_a = popperRef === null || popperRef === void 0 ? void 0 : popperRef.current) === null || _a === void 0 ? void 0 : _a.contains(target)) || (hasFlyout && ((_b = ref === null || ref === void 0 ? void 0 : ref.current) === null || _b === void 0 ? void 0 : _b.contains(target))))) {
            return;
        }
        if (key === ' ' || key === 'ArrowRight') {
            event.stopPropagation();
            event.preventDefault();
            if (!flyoutVisible) {
                showFlyout(true);
                setFlyoutTarget(target);
            }
        }
        if (key === 'Escape' || key === 'ArrowLeft') {
            if (flyoutVisible) {
                event.stopPropagation();
                event.preventDefault();
                showFlyout(false);
            }
        }
    };
    react.useEffect(() => {
        if (hasFlyout) {
            window.addEventListener('click', onFlyoutClick);
        }
        return () => {
            if (hasFlyout) {
                window.removeEventListener('click', onFlyoutClick);
            }
        };
    }, []);
    react.useEffect(() => {
        if (flyoutTarget) {
            if (flyoutVisible) {
                const flyoutItems = Array.from(popperRef.current.getElementsByTagName('UL')[0].children).filter(el => !(el.classList.contains('pf-m-disabled') || el.classList.contains('pf-c-divider')));
                flyoutItems[0].firstChild.focus();
            }
            else {
                flyoutTarget.focus();
            }
        }
    }, [flyoutVisible, flyoutTarget]);
    const flyoutButton = (react.createElement("span", { className: css(styles$p.navToggle) },
        react.createElement("span", { className: css(styles$p.navToggleIcon) },
            react.createElement(AngleRightIcon, { "aria-hidden": true }))));
    const renderDefaultLink = (context) => {
        const preventLinkDefault = preventDefault || !to;
        return (react.createElement(Component, Object.assign({ href: to, onClick: (e) => context.onSelect(e, groupId, itemId, to, preventLinkDefault, onClick), className: css(styles$p.navLink, isActive && styles$p.modifiers.current, isHovered && styles$p.modifiers.hover, className), "aria-current": isActive ? 'page' : null, tabIndex: isNavOpen ? null : '-1' }, props),
            children,
            flyout && flyoutButton));
    };
    const renderClonedChild = (context, child) => react.cloneElement(child, Object.assign(Object.assign({ onClick: (e) => context.onSelect(e, groupId, itemId, to, preventDefault, onClick), 'aria-current': isActive ? 'page' : null }, (styleChildren && {
        className: css(styles$p.navLink, isActive && styles$p.modifiers.current, child.props && child.props.className)
    })), { tabIndex: child.props.tabIndex || isNavOpen ? null : -1, children: hasFlyout ? (react.createElement(react.Fragment, null,
            child.props.children,
            flyoutButton)) : (child.props.children) }));
    const ouiaProps = useOUIAProps(NavItem.displayName, ouiaId, ouiaSafe);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const flyoutPopper = (react.createElement(Popper, { reference: ref, popper: react.createElement("div", { ref: popperRef, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }, flyout), placement: "right-start", isVisible: flyoutVisible, onDocumentKeyDown: handleFlyout }));
    const navItem = (react.createElement(react.Fragment, null,
        react.createElement("li", Object.assign({ onMouseOver: onMouseOver, className: css(styles$p.navItem, hasFlyout && styles$p.modifiers.flyout, className), ref: ref }, ouiaProps),
            react.createElement(NavContext.Consumer, null, context => react.isValidElement(children)
                ? renderClonedChild(context, children)
                : renderDefaultLink(context))),
        flyout && flyoutPopper));
    return navItem;
};
NavItem.displayName = 'NavItem';

const TextContent = (_a) => {
    var { children = null, className = '', isVisited = false } = _a, props = __rest(_a, ["children", "className", "isVisited"]);
    return (react.createElement("div", Object.assign({}, props, { className: css(styles$1.content, isVisited && styles$1.modifiers.visited, className) }), children));
};
TextContent.displayName = 'TextContent';

var TextVariants;
(function (TextVariants) {
    TextVariants["h1"] = "h1";
    TextVariants["h2"] = "h2";
    TextVariants["h3"] = "h3";
    TextVariants["h4"] = "h4";
    TextVariants["h5"] = "h5";
    TextVariants["h6"] = "h6";
    TextVariants["p"] = "p";
    TextVariants["a"] = "a";
    TextVariants["small"] = "small";
    TextVariants["blockquote"] = "blockquote";
    TextVariants["pre"] = "pre";
})(TextVariants || (TextVariants = {}));
const Text = (_a) => {
    var { children = null, className = '', component = TextVariants.p, isVisitedLink = false, ouiaId, ouiaSafe = true } = _a, props = __rest(_a, ["children", "className", "component", "isVisitedLink", "ouiaId", "ouiaSafe"]);
    const Component = component;
    const ouiaProps = useOUIAProps(Text.displayName, ouiaId, ouiaSafe);
    return (react.createElement(Component, Object.assign({}, ouiaProps, props, { "data-pf-content": true, className: css(isVisitedLink && component === TextVariants.a && styles$1.modifiers.visited, className) }), children));
};
Text.displayName = 'Text';

var TextListVariants;
(function (TextListVariants) {
    TextListVariants["ul"] = "ul";
    TextListVariants["ol"] = "ol";
    TextListVariants["dl"] = "dl";
})(TextListVariants || (TextListVariants = {}));
const TextList = (_a) => {
    var { children = null, className = '', component = TextListVariants.ul } = _a, props = __rest(_a, ["children", "className", "component"]);
    const Component = component;
    return (react.createElement(Component, Object.assign({}, props, { "data-pf-content": true, className: css(className) }), children));
};
TextList.displayName = 'TextList';

var TextListItemVariants;
(function (TextListItemVariants) {
    TextListItemVariants["li"] = "li";
    TextListItemVariants["dt"] = "dt";
    TextListItemVariants["dd"] = "dd";
})(TextListItemVariants || (TextListItemVariants = {}));
const TextListItem = (_a) => {
    var { children = null, className = '', component = TextListItemVariants.li } = _a, props = __rest(_a, ["children", "className", "component"]);
    const Component = component;
    return (react.createElement(Component, Object.assign({}, props, { "data-pf-content": true, className: css(className) }), children));
};
TextListItem.displayName = 'TextListItem';

import('../common/options-menu-0d88c4d1.js');
var styles$q = {
  divider: "pf-c-divider",
  modifiers: {
    plain: "pf-m-plain",
    text: "pf-m-text",
    active: "pf-m-active",
    expanded: "pf-m-expanded",
    disabled: "pf-m-disabled",
    top: "pf-m-top",
    alignRight: "pf-m-align-right"
  },
  optionsMenu: "pf-c-options-menu",
  optionsMenuGroup: "pf-c-options-menu__group",
  optionsMenuGroupTitle: "pf-c-options-menu__group-title",
  optionsMenuMenu: "pf-c-options-menu__menu",
  optionsMenuMenuItem: "pf-c-options-menu__menu-item",
  optionsMenuMenuItemIcon: "pf-c-options-menu__menu-item-icon",
  optionsMenuToggle: "pf-c-options-menu__toggle",
  optionsMenuToggleButton: "pf-c-options-menu__toggle-button",
  optionsMenuToggleButtonIcon: "pf-c-options-menu__toggle-button-icon",
  optionsMenuToggleIcon: "pf-c-options-menu__toggle-icon",
  optionsMenuToggleText: "pf-c-options-menu__toggle-text",
  themeDark: "pf-theme-dark"
};

const global_breakpoint_md = {
  "name": "--pf-global--breakpoint--md",
  "value": "768px",
  "var": "var(--pf-global--breakpoint--md)"
};

const global_breakpoint_lg = {
  "name": "--pf-global--breakpoint--lg",
  "value": "992px",
  "var": "var(--pf-global--breakpoint--lg)"
};

const global_breakpoint_2xl = {
  "name": "--pf-global--breakpoint--2xl",
  "value": "1450px",
  "var": "var(--pf-global--breakpoint--2xl)"
};

const BarsIconConfig = {
  name: 'BarsIcon',
  height: 512,
  width: 448,
  svgPath: 'M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z',
  yOffset: 0,
  xOffset: 0,
};

const BarsIcon = createIcon(BarsIconConfig);

const PageHeader = (_a) => {
    var { className = '', logo = null, logoProps = null, logoComponent = 'a', headerTools = null, topNav = null, isNavOpen = true, isManagedSidebar: deprecatedIsManagedSidebar = undefined, role = undefined, showNavToggle = false, onNavToggle = () => undefined, 'aria-label': ariaLabel = 'Global navigation', 'aria-controls': ariaControls = null } = _a, props = __rest(_a, ["className", "logo", "logoProps", "logoComponent", "headerTools", "topNav", "isNavOpen", "isManagedSidebar", "role", "showNavToggle", "onNavToggle", 'aria-label', 'aria-controls']);
    const LogoComponent = logoComponent;
    if ([false, true].includes(deprecatedIsManagedSidebar)) {
        console.warn('isManagedSidebar is deprecated in the PageHeader component. To make the sidebar toggle uncontrolled, pass this prop in the Page component');
    }
    return (react.createElement(PageContextConsumer, null, ({ isManagedSidebar, onNavToggle: managedOnNavToggle, isNavOpen: managedIsNavOpen }) => {
        const navToggle = isManagedSidebar ? managedOnNavToggle : onNavToggle;
        const navOpen = isManagedSidebar ? managedIsNavOpen : isNavOpen;
        return (react.createElement("header", Object.assign({ role: role, className: css(styles$o.pageHeader, className) }, props),
            (showNavToggle || logo) && (react.createElement("div", { className: css(styles$o.pageHeaderBrand) },
                showNavToggle && (react.createElement("div", { className: css(styles$o.pageHeaderBrandToggle) },
                    react.createElement(Button, { id: "nav-toggle", onClick: navToggle, "aria-label": ariaLabel, "aria-controls": ariaControls, "aria-expanded": navOpen ? 'true' : 'false', variant: ButtonVariant.plain },
                        react.createElement(BarsIcon, null)))),
                logo && (react.createElement(LogoComponent, Object.assign({ className: css(styles$o.pageHeaderBrandLink) }, logoProps), logo)))),
            topNav && react.createElement("div", { className: css(styles$o.pageHeaderNav) }, topNav),
            headerTools));
    }));
};
PageHeader.displayName = 'PageHeader';

var PageSectionVariants;
(function (PageSectionVariants) {
    PageSectionVariants["default"] = "default";
    PageSectionVariants["light"] = "light";
    PageSectionVariants["dark"] = "dark";
    PageSectionVariants["darker"] = "darker";
})(PageSectionVariants || (PageSectionVariants = {}));
var PageSectionTypes;
(function (PageSectionTypes) {
    PageSectionTypes["default"] = "default";
    PageSectionTypes["nav"] = "nav";
    PageSectionTypes["subNav"] = "subnav";
    PageSectionTypes["breadcrumb"] = "breadcrumb";
    PageSectionTypes["tabs"] = "tabs";
    PageSectionTypes["wizard"] = "wizard";
})(PageSectionTypes || (PageSectionTypes = {}));
const variantType = {
    [PageSectionTypes.default]: styles$o.pageMainSection,
    [PageSectionTypes.nav]: styles$o.pageMainNav,
    [PageSectionTypes.subNav]: styles$o.pageMainSubnav,
    [PageSectionTypes.breadcrumb]: styles$o.pageMainBreadcrumb,
    [PageSectionTypes.tabs]: styles$o.pageMainTabs,
    [PageSectionTypes.wizard]: styles$o.pageMainWizard
};
const variantStyle = {
    [PageSectionVariants.default]: '',
    [PageSectionVariants.light]: styles$o.modifiers.light,
    [PageSectionVariants.dark]: styles$o.modifiers.dark_200,
    [PageSectionVariants.darker]: styles$o.modifiers.dark_100
};
const PageSection = (_a) => {
    var { className = '', children, variant = 'default', type = 'default', padding, isFilled, isWidthLimited = false, isCenterAligned = false, sticky, hasShadowTop = false, hasShadowBottom = false, hasOverflowScroll = false } = _a, props = __rest(_a, ["className", "children", "variant", "type", "padding", "isFilled", "isWidthLimited", "isCenterAligned", "sticky", "hasShadowTop", "hasShadowBottom", "hasOverflowScroll"]);
    return (react.createElement("section", Object.assign({}, props, { className: css(variantType[type], formatBreakpointMods(padding, styles$o), variantStyle[variant], isFilled === false && styles$o.modifiers.noFill, isFilled === true && styles$o.modifiers.fill, isWidthLimited && styles$o.modifiers.limitWidth, isWidthLimited && isCenterAligned && type !== PageSectionTypes.subNav && styles$o.modifiers.alignCenter, sticky === 'top' && styles$o.modifiers.stickyTop, sticky === 'bottom' && styles$o.modifiers.stickyBottom, hasShadowTop && styles$o.modifiers.shadowTop, hasShadowBottom && styles$o.modifiers.shadowBottom, hasOverflowScroll && styles$o.modifiers.overflowScroll, className) }, (hasOverflowScroll && { tabIndex: 0 })),
        isWidthLimited && react.createElement("div", { className: css(styles$o.pageMainBody) }, children),
        !isWidthLimited && children));
};
PageSection.displayName = 'PageSection';

const PageHeaderTools = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("div", Object.assign({ className: css(styles$o.pageHeaderTools, className) }, props), children));
};
PageHeaderTools.displayName = 'PageHeaderTools';

const PageHeaderToolsGroup = (_a) => {
    var { children, className, visibility } = _a, props = __rest(_a, ["children", "className", "visibility"]);
    const { width, getBreakpoint } = react.useContext(PageContext);
    return (react.createElement("div", Object.assign({ className: css(styles$o.pageHeaderToolsGroup, formatBreakpointMods(visibility, styles$o, '', getBreakpoint(width)), className) }, props), children));
};
PageHeaderToolsGroup.displayName = 'PageHeaderToolsGroup';

const PageHeaderToolsItem = (_a) => {
    var { children, id, className, visibility, isSelected } = _a, props = __rest(_a, ["children", "id", "className", "visibility", "isSelected"]);
    const { width, getBreakpoint } = react.useContext(PageContext);
    return (react.createElement("div", Object.assign({ className: css(styles$o.pageHeaderToolsItem, isSelected && styles$o.modifiers.selected, formatBreakpointMods(visibility, styles$o, '', getBreakpoint(width)), className), id: id }, props), children));
};
PageHeaderToolsItem.displayName = 'PageHeaderToolsItem';

const ToggleTemplate = ({ firstIndex = 0, lastIndex = 0, itemCount = 0, itemsTitle = 'items', ofWord = 'of' }) => (react.createElement(react.Fragment, null,
    react.createElement("b", null,
        firstIndex,
        " - ",
        lastIndex),
    ' ',
    ofWord,
    " ",
    react.createElement("b", null, itemCount),
    " ",
    itemsTitle));
ToggleTemplate.displayName = 'ToggleTemplate';

import('../common/pagination-aae3c986.js');
var styles$r = {
  button: "pf-c-button",
  formControl: "pf-c-form-control",
  modifiers: {
    bottom: "pf-m-bottom",
    static: "pf-m-static",
    first: "pf-m-first",
    last: "pf-m-last",
    sticky: "pf-m-sticky",
    compact: "pf-m-compact",
    displaySummary: "pf-m-display-summary",
    displayFull: "pf-m-display-full",
    displaySummaryOnSm: "pf-m-display-summary-on-sm",
    displayFullOnSm: "pf-m-display-full-on-sm",
    displaySummaryOnMd: "pf-m-display-summary-on-md",
    displayFullOnMd: "pf-m-display-full-on-md",
    displaySummaryOnLg: "pf-m-display-summary-on-lg",
    displayFullOnLg: "pf-m-display-full-on-lg",
    displaySummaryOnXl: "pf-m-display-summary-on-xl",
    displayFullOnXl: "pf-m-display-full-on-xl",
    displaySummaryOn_2xl: "pf-m-display-summary-on-2xl",
    displayFullOn_2xl: "pf-m-display-full-on-2xl"
  },
  optionsMenu: "pf-c-options-menu",
  optionsMenuToggle: "pf-c-options-menu__toggle",
  pagination: "pf-c-pagination",
  paginationNav: "pf-c-pagination__nav",
  paginationNavControl: "pf-c-pagination__nav-control",
  paginationNavPageSelect: "pf-c-pagination__nav-page-select",
  paginationTotalItems: "pf-c-pagination__total-items",
  themeDark: "pf-theme-dark"
};

class Navigation extends react.Component {
    constructor(props) {
        super(props);
        this.handleNewPage = (_evt, newPage) => {
            const { perPage, onSetPage } = this.props;
            const startIdx = (newPage - 1) * perPage;
            const endIdx = newPage * perPage;
            return onSetPage(_evt, newPage, perPage, startIdx, endIdx);
        };
        this.state = { userInputPage: this.props.page };
    }
    static parseInteger(input, lastPage) {
        // eslint-disable-next-line radix
        let inputPage = Number.parseInt(input, 10);
        if (!Number.isNaN(inputPage)) {
            inputPage = inputPage > lastPage ? lastPage : inputPage;
            inputPage = inputPage < 1 ? 1 : inputPage;
        }
        return inputPage;
    }
    onChange(event, lastPage) {
        const inputPage = Navigation.parseInteger(event.target.value, lastPage);
        this.setState({ userInputPage: Number.isNaN(inputPage) ? event.target.value : inputPage });
    }
    onKeyDown(event, page, lastPage, onPageInput) {
        if (event.keyCode === KEY_CODES.ENTER) {
            const inputPage = Navigation.parseInteger(this.state.userInputPage, lastPage);
            onPageInput(event, Number.isNaN(inputPage) ? page : inputPage);
            this.handleNewPage(event, Number.isNaN(inputPage) ? page : inputPage);
        }
    }
    componentDidUpdate(lastState) {
        if (this.props.page !== lastState.page &&
            this.props.page <= this.props.lastPage &&
            this.state.userInputPage !== this.props.page) {
            this.setState({ userInputPage: this.props.page });
        }
    }
    render() {
        const _a = this.props, { page, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        perPage, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSetPage, isDisabled, itemCount, lastPage, firstPage, pagesTitle, pagesTitlePlural, toLastPage, toNextPage, toFirstPage, toPreviousPage, currPage, paginationTitle, ofWord, onNextClick, onPreviousClick, onFirstClick, onLastClick, onPageInput, className, isCompact } = _a, props = __rest(_a, ["page", "perPage", "onSetPage", "isDisabled", "itemCount", "lastPage", "firstPage", "pagesTitle", "pagesTitlePlural", "toLastPage", "toNextPage", "toFirstPage", "toPreviousPage", "currPage", "paginationTitle", "ofWord", "onNextClick", "onPreviousClick", "onFirstClick", "onLastClick", "onPageInput", "className", "isCompact"]);
        const { userInputPage } = this.state;
        return (react.createElement("nav", Object.assign({ className: css(styles$r.paginationNav, className), "aria-label": paginationTitle }, props),
            !isCompact && (react.createElement("div", { className: css(styles$r.paginationNavControl, styles$r.modifiers.first) },
                react.createElement(Button, { variant: ButtonVariant.plain, isDisabled: isDisabled || page === firstPage || page === 0, "aria-label": toFirstPage, "data-action": "first", onClick: event => {
                        onFirstClick(event, 1);
                        this.handleNewPage(event, 1);
                        this.setState({ userInputPage: 1 });
                    } },
                    react.createElement(AngleDoubleLeftIcon, null)))),
            react.createElement("div", { className: styles$r.paginationNavControl },
                react.createElement(Button, { variant: ButtonVariant.plain, isDisabled: isDisabled || page === firstPage || page === 0, "data-action": "previous", onClick: event => {
                        const newPage = page - 1 >= 1 ? page - 1 : 1;
                        onPreviousClick(event, newPage);
                        this.handleNewPage(event, newPage);
                        this.setState({ userInputPage: newPage });
                    }, "aria-label": toPreviousPage },
                    react.createElement(AngleLeftIcon, null))),
            !isCompact && (react.createElement("div", { className: styles$r.paginationNavPageSelect },
                react.createElement("input", { className: css(styles$r.formControl), "aria-label": currPage, type: "number", disabled: isDisabled || (itemCount && page === firstPage && page === lastPage && itemCount >= 0) || page === 0, min: lastPage <= 0 && firstPage <= 0 ? 0 : 1, max: lastPage, value: userInputPage, onKeyDown: event => this.onKeyDown(event, page, lastPage, onPageInput), onChange: event => this.onChange(event, lastPage) }),
                (itemCount || itemCount === 0) && (react.createElement("span", { "aria-hidden": "true" },
                    ofWord,
                    " ",
                    pagesTitle ? pluralize(lastPage, pagesTitle, pagesTitlePlural) : lastPage)))),
            react.createElement("div", { className: styles$r.paginationNavControl },
                react.createElement(Button, { variant: ButtonVariant.plain, isDisabled: isDisabled || page === lastPage, "aria-label": toNextPage, "data-action": "next", onClick: event => {
                        const newPage = page + 1 <= lastPage ? page + 1 : lastPage;
                        onNextClick(event, newPage);
                        this.handleNewPage(event, newPage);
                        this.setState({ userInputPage: newPage });
                    } },
                    react.createElement(AngleRightIcon, null))),
            !isCompact && (react.createElement("div", { className: css(styles$r.paginationNavControl, styles$r.modifiers.last) },
                react.createElement(Button, { variant: ButtonVariant.plain, isDisabled: isDisabled || page === lastPage, "aria-label": toLastPage, "data-action": "last", onClick: event => {
                        onLastClick(event, lastPage);
                        this.handleNewPage(event, lastPage);
                        this.setState({ userInputPage: lastPage });
                    } },
                    react.createElement(AngleDoubleRightIcon, null))))));
    }
}
Navigation.displayName = 'Navigation';
Navigation.defaultProps = {
    className: '',
    isDisabled: false,
    isCompact: false,
    lastPage: 0,
    firstPage: 0,
    pagesTitle: '',
    pagesTitlePlural: '',
    toLastPage: 'Go to last page',
    toNextPage: 'Go to next page',
    toFirstPage: 'Go to first page',
    toPreviousPage: 'Go to previous page',
    currPage: 'Current page',
    paginationTitle: 'Pagination',
    ofWord: 'of',
    onNextClick: () => undefined,
    onPreviousClick: () => undefined,
    onFirstClick: () => undefined,
    onLastClick: () => undefined,
    onPageInput: () => undefined
};

let toggleId = 0;
const OptionsToggle = ({ itemsTitle = 'items', optionsToggle, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
itemsPerPageTitle = 'Items per page', ofWord = 'of', firstIndex = 0, lastIndex = 0, itemCount, widgetId = '', showToggle = true, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
onToggle = (_isOpen) => undefined, isOpen = false, isDisabled = false, parentRef = null, toggleTemplate: ToggleTemplate, onEnter = null, perPageComponent = 'div' }) => {
    const isDiv = perPageComponent === 'div';
    const toggleClasses = css(styles$q.optionsMenuToggle, isDisabled && styles$q.modifiers.disabled, styles$q.modifiers.plain, styles$q.modifiers.text);
    const template = typeof ToggleTemplate === 'string' ? (fillTemplate(ToggleTemplate, { firstIndex, lastIndex, ofWord, itemCount, itemsTitle })) : (react.createElement(ToggleTemplate, { firstIndex: firstIndex, lastIndex: lastIndex, ofWord: ofWord, itemCount: itemCount, itemsTitle: itemsTitle }));
    const dropdown = showToggle && (react.createElement(react.Fragment, null,
        isDiv && react.createElement("span", { className: css(styles$q.optionsMenuToggleText) }, template),
        react.createElement(DropdownToggle, { onEnter: onEnter, "aria-label": isDiv ? optionsToggle || 'Items per page' : optionsToggle, onToggle: onToggle, isDisabled: isDisabled || (itemCount && itemCount <= 0), isOpen: isOpen, id: `${widgetId}-toggle-${toggleId++}`, className: isDiv ? styles$q.optionsMenuToggleButton : toggleClasses, parentRef: parentRef, "aria-haspopup": "listbox" }, !isDiv && template)));
    return isDiv ? react.createElement("div", { className: toggleClasses }, dropdown) : dropdown;
};
OptionsToggle.displayName = 'OptionsToggle';

class PaginationOptionsMenu extends react.Component {
    constructor(props) {
        super(props);
        this.parentRef = react.createRef();
        this.onToggle = (isOpen) => {
            this.setState({ isOpen });
        };
        this.onSelect = () => {
            this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
        };
        this.handleNewPerPage = (_evt, newPerPage) => {
            const { page, onPerPageSelect, itemCount, defaultToFullPage } = this.props;
            let newPage = page;
            while (Math.ceil(itemCount / newPerPage) < newPage) {
                newPage--;
            }
            if (defaultToFullPage) {
                if (itemCount / newPerPage !== newPage) {
                    while (newPage > 1 && itemCount - newPerPage * newPage < 0) {
                        newPage--;
                    }
                }
            }
            const startIdx = (newPage - 1) * newPerPage;
            const endIdx = newPage * newPerPage;
            return onPerPageSelect(_evt, newPerPage, newPage, startIdx, endIdx);
        };
        this.renderItems = () => {
            const { perPageOptions, perPage, perPageSuffix } = this.props;
            return perPageOptions.map(({ value, title }) => (react.createElement(DropdownItem, { key: value, component: "button", "data-action": `per-page-${value}`, className: css(perPage === value && 'pf-m-selected'), onClick: event => this.handleNewPerPage(event, value) },
                title,
                ` ${perPageSuffix}`,
                perPage === value && (react.createElement("div", { className: css(styles$q.optionsMenuMenuItemIcon) },
                    react.createElement(CheckIcon, null))))));
        };
        this.state = {
            isOpen: false
        };
    }
    render() {
        const { widgetId, isDisabled, itemsPerPageTitle, dropDirection, optionsToggle, perPageOptions, toggleTemplate, firstIndex, lastIndex, itemCount, itemsTitle, ofWord, perPageComponent } = this.props;
        const { isOpen } = this.state;
        return (react.createElement(DropdownContext.Provider, { value: {
                id: widgetId,
                onSelect: this.onSelect,
                toggleIndicatorClass: perPageComponent === 'div' ? styles$q.optionsMenuToggleButtonIcon : styles$q.optionsMenuToggleIcon,
                toggleTextClass: styles$q.optionsMenuToggleText,
                menuClass: styles$q.optionsMenuMenu,
                itemClass: styles$q.optionsMenuMenuItem,
                toggleClass: ' ',
                baseClass: styles$q.optionsMenu,
                disabledClass: styles$q.modifiers.disabled,
                menuComponent: 'ul',
                baseComponent: 'div',
                ouiaComponentType: PaginationOptionsMenu.displayName
            } },
            react.createElement(DropdownWithContext, { direction: dropDirection, isOpen: isOpen, toggle: react.createElement(OptionsToggle, { optionsToggle: optionsToggle, itemsPerPageTitle: itemsPerPageTitle, showToggle: perPageOptions && perPageOptions.length > 0, onToggle: this.onToggle, isOpen: isOpen, widgetId: widgetId, firstIndex: firstIndex, lastIndex: lastIndex, itemCount: itemCount, itemsTitle: itemsTitle, ofWord: ofWord, toggleTemplate: toggleTemplate, parentRef: this.parentRef.current, isDisabled: isDisabled, perPageComponent: perPageComponent }), dropdownItems: this.renderItems(), isPlain: true })));
    }
}
PaginationOptionsMenu.displayName = 'PaginationOptionsMenu';
PaginationOptionsMenu.defaultProps = {
    className: '',
    widgetId: '',
    isDisabled: false,
    dropDirection: DropdownDirection.down,
    perPageOptions: [],
    itemsPerPageTitle: 'Items per page',
    perPageSuffix: 'per page',
    optionsToggle: '',
    ofWord: 'of',
    perPage: 0,
    firstIndex: 0,
    lastIndex: 0,
    defaultToFullPage: false,
    itemsTitle: 'items',
    toggleTemplate: ToggleTemplate,
    onPerPageSelect: () => null,
    perPageComponent: 'div'
};

const c_pagination__nav_page_select_c_form_control_width_chars = {
  "name": "--pf-c-pagination__nav-page-select--c-form-control--width-chars",
  "value": "2",
  "var": "var(--pf-c-pagination__nav-page-select--c-form-control--width-chars)"
};

var PaginationVariant;
(function (PaginationVariant) {
    PaginationVariant["top"] = "top";
    PaginationVariant["bottom"] = "bottom";
})(PaginationVariant || (PaginationVariant = {}));
const defaultPerPageOptions = [
    {
        title: '10',
        value: 10
    },
    {
        title: '20',
        value: 20
    },
    {
        title: '50',
        value: 50
    },
    {
        title: '100',
        value: 100
    }
];
const handleInputWidth = (lastPage, node) => {
    if (!node) {
        return;
    }
    const len = String(lastPage).length;
    if (len >= 3) {
        node.style.setProperty(c_pagination__nav_page_select_c_form_control_width_chars.name, `${len}`);
    }
    else {
        node.style.setProperty(c_pagination__nav_page_select_c_form_control_width_chars.name, '2');
    }
};
let paginationId = 0;
class Pagination extends react.Component {
    constructor() {
        super(...arguments);
        this.paginationRef = react.createRef();
        this.state = {
            ouiaStateId: getDefaultOUIAId(Pagination.displayName, this.props.variant)
        };
    }
    getLastPage() {
        const { itemCount, perPage, page } = this.props;
        // when itemCount is not known let's set lastPage as page+1 as we don't know the total count
        return itemCount || itemCount === 0 ? Math.ceil(itemCount / perPage) || 0 : page + 1;
    }
    componentDidMount() {
        const node = this.paginationRef.current;
        handleInputWidth(this.getLastPage(), node);
    }
    componentDidUpdate(prevProps) {
        const node = this.paginationRef.current;
        if (prevProps.perPage !== this.props.perPage || prevProps.itemCount !== this.props.itemCount) {
            handleInputWidth(this.getLastPage(), node);
        }
    }
    render() {
        const _a = this.props, { children, className, variant, isDisabled, isCompact, isStatic, isSticky, perPage, titles, firstPage, page: propPage, offset, defaultToFullPage, itemCount, itemsStart, itemsEnd, perPageOptions, dropDirection: dropDirectionProp, widgetId, toggleTemplate, onSetPage, onPerPageSelect, onFirstClick, onPreviousClick, onNextClick, onPageInput, onLastClick, ouiaId, ouiaSafe, perPageComponent } = _a, props = __rest(_a, ["children", "className", "variant", "isDisabled", "isCompact", "isStatic", "isSticky", "perPage", "titles", "firstPage", "page", "offset", "defaultToFullPage", "itemCount", "itemsStart", "itemsEnd", "perPageOptions", "dropDirection", "widgetId", "toggleTemplate", "onSetPage", "onPerPageSelect", "onFirstClick", "onPreviousClick", "onNextClick", "onPageInput", "onLastClick", "ouiaId", "ouiaSafe", "perPageComponent"]);
        const dropDirection = dropDirectionProp || (variant === 'bottom' && !isStatic ? 'up' : 'down');
        let page = propPage;
        if (!page && offset) {
            page = Math.ceil(offset / perPage);
        }
        if (page === 0 && !itemCount) {
            page = 1;
        }
        const lastPage = this.getLastPage();
        let firstIndex = (page - 1) * perPage + 1;
        let lastIndex = page * perPage;
        if (itemCount || itemCount === 0) {
            firstIndex = itemCount <= 0 ? 0 : (page - 1) * perPage + 1;
            if (page < firstPage && itemCount > 0) {
                page = firstPage;
            }
            else if (page > lastPage) {
                page = lastPage;
            }
            if (itemCount >= 0) {
                lastIndex = page === lastPage || itemCount === 0 ? itemCount : page * perPage;
            }
        }
        const toggleTemplateProps = { firstIndex, lastIndex, itemCount, itemsTitle: titles.items, ofWord: titles.ofWord };
        return (react.createElement("div", Object.assign({ ref: this.paginationRef, className: css(styles$r.pagination, variant === PaginationVariant.bottom && styles$r.modifiers.bottom, isCompact && styles$r.modifiers.compact, isStatic && styles$r.modifiers.static, isSticky && styles$r.modifiers.sticky, className), id: `${widgetId}-${paginationId++}` }, getOUIAProps(Pagination.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe), props),
            variant === PaginationVariant.top && (react.createElement("div", { className: css(styles$r.paginationTotalItems) },
                toggleTemplate && typeof toggleTemplate === 'string' && fillTemplate(toggleTemplate, toggleTemplateProps),
                toggleTemplate &&
                    typeof toggleTemplate !== 'string' &&
                    toggleTemplate(toggleTemplateProps),
                !toggleTemplate && (react.createElement(ToggleTemplate, { firstIndex: firstIndex, lastIndex: lastIndex, itemCount: itemCount, itemsTitle: titles.items, ofWord: titles.ofWord })))),
            react.createElement(PaginationOptionsMenu, { itemsPerPageTitle: titles.itemsPerPage, perPageSuffix: titles.perPageSuffix, itemsTitle: isCompact ? '' : titles.items, optionsToggle: titles.optionsToggle, perPageOptions: perPageOptions, firstIndex: itemsStart !== null ? itemsStart : firstIndex, lastIndex: itemsEnd !== null ? itemsEnd : lastIndex, ofWord: titles.ofWord, defaultToFullPage: defaultToFullPage, itemCount: itemCount, page: page, perPage: perPage, lastPage: lastPage, onPerPageSelect: onPerPageSelect, dropDirection: dropDirection, widgetId: widgetId, toggleTemplate: toggleTemplate, isDisabled: isDisabled, perPageComponent: perPageComponent }),
            react.createElement(Navigation, { pagesTitle: titles.page, pagesTitlePlural: titles.pages, toLastPage: titles.toLastPage, toPreviousPage: titles.toPreviousPage, toNextPage: titles.toNextPage, toFirstPage: titles.toFirstPage, currPage: titles.currPage, paginationTitle: titles.paginationTitle, ofWord: titles.ofWord, page: itemCount && itemCount <= 0 ? 0 : page, perPage: perPage, itemCount: itemCount, firstPage: itemsStart !== null ? itemsStart : 1, lastPage: lastPage, onSetPage: onSetPage, onFirstClick: onFirstClick, onPreviousClick: onPreviousClick, onNextClick: onNextClick, onLastClick: onLastClick, onPageInput: onPageInput, isDisabled: isDisabled, isCompact: isCompact }),
            children));
    }
}
Pagination.displayName = 'Pagination';
Pagination.defaultProps = {
    children: null,
    className: '',
    variant: PaginationVariant.top,
    isDisabled: false,
    isCompact: false,
    isSticky: false,
    perPage: defaultPerPageOptions[0].value,
    titles: {
        items: '',
        page: '',
        pages: '',
        itemsPerPage: 'Items per page',
        perPageSuffix: 'per page',
        toFirstPage: 'Go to first page',
        toPreviousPage: 'Go to previous page',
        toLastPage: 'Go to last page',
        toNextPage: 'Go to next page',
        optionsToggle: '',
        currPage: 'Current page',
        paginationTitle: 'Pagination',
        ofWord: 'of'
    },
    firstPage: 1,
    page: 0,
    offset: 0,
    defaultToFullPage: false,
    itemsStart: null,
    itemsEnd: null,
    perPageOptions: defaultPerPageOptions,
    widgetId: 'pagination-options-menu',
    onSetPage: () => undefined,
    onPerPageSelect: () => undefined,
    onFirstClick: () => undefined,
    onPreviousClick: () => undefined,
    onNextClick: () => undefined,
    onPageInput: () => undefined,
    onLastClick: () => undefined,
    ouiaSafe: true,
    perPageComponent: 'div'
};

import('../common/radio-6405e2dd.js');
var styles$s = {
  modifiers: {
    standalone: "pf-m-standalone",
    disabled: "pf-m-disabled"
  },
  radio: "pf-c-radio",
  radioBody: "pf-c-radio__body",
  radioDescription: "pf-c-radio__description",
  radioInput: "pf-c-radio__input",
  radioLabel: "pf-c-radio__label"
};

class Radio extends react.Component {
    constructor(props) {
        super(props);
        this.handleChange = (event) => {
            this.props.onChange(event.currentTarget.checked, event);
        };
        if (!props.label && !props['aria-label']) {
            // eslint-disable-next-line no-console
            console.error('Radio:', 'Radio requires an aria-label to be specified');
        }
        this.state = {
            ouiaStateId: getDefaultOUIAId(Radio.displayName)
        };
    }
    render() {
        const _a = this.props, { 'aria-label': ariaLabel, checked, className, defaultChecked, isLabelWrapped, isLabelBeforeButton, isChecked, isDisabled, isValid, label, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onChange, description, body, ouiaId, ouiaSafe = true } = _a, props = __rest(_a, ['aria-label', "checked", "className", "defaultChecked", "isLabelWrapped", "isLabelBeforeButton", "isChecked", "isDisabled", "isValid", "label", "onChange", "description", "body", "ouiaId", "ouiaSafe"]);
        if (!props.id) {
            // eslint-disable-next-line no-console
            console.error('Radio:', 'id is required to make input accessible');
        }
        const inputRendered = (react.createElement("input", Object.assign({}, props, { className: css(styles$s.radioInput), type: "radio", onChange: this.handleChange, "aria-invalid": !isValid, disabled: isDisabled, checked: checked || isChecked }, (checked === undefined && { defaultChecked }), (!label && { 'aria-label': ariaLabel }), getOUIAProps(Radio.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe))));
        let labelRendered = null;
        if (label && isLabelWrapped) {
            labelRendered = react.createElement("span", { className: css(styles$s.radioLabel, isDisabled && styles$s.modifiers.disabled) }, label);
        }
        else if (label) {
            labelRendered = (react.createElement("label", { className: css(styles$s.radioLabel, isDisabled && styles$s.modifiers.disabled), htmlFor: props.id }, label));
        }
        const descRender = description ? react.createElement("span", { className: css(styles$s.radioDescription) }, description) : null;
        const bodyRender = body ? react.createElement("span", { className: css(styles$s.radioBody) }, body) : null;
        const childrenRendered = isLabelBeforeButton ? (react.createElement(react.Fragment, null,
            labelRendered,
            inputRendered,
            descRender,
            bodyRender)) : (react.createElement(react.Fragment, null,
            inputRendered,
            labelRendered,
            descRender,
            bodyRender));
        return isLabelWrapped ? (react.createElement("label", { className: css(styles$s.radio, className), htmlFor: props.id }, childrenRendered)) : (react.createElement("div", { className: css(styles$s.radio, !label && styles$s.modifiers.standalone, className) }, childrenRendered));
    }
}
Radio.displayName = 'Radio';
Radio.defaultProps = {
    className: '',
    isDisabled: false,
    isValid: true,
    onChange: () => { }
};

import('../common/search-input-c730807a.js');
var styles$t = {
  button: "pf-c-button",
  modifiers: {
    hint: "pf-m-hint",
    top: "pf-m-top"
  },
  searchInput: "pf-c-search-input",
  searchInputBar: "pf-c-search-input__bar",
  searchInputCount: "pf-c-search-input__count",
  searchInputIcon: "pf-c-search-input__icon",
  searchInputMenu: "pf-c-search-input__menu",
  searchInputMenuBody: "pf-c-search-input__menu-body",
  searchInputMenuItem: "pf-c-search-input__menu-item",
  searchInputMenuItemText: "pf-c-search-input__menu-item-text",
  searchInputMenuList: "pf-c-search-input__menu-list",
  searchInputNav: "pf-c-search-input__nav",
  searchInputText: "pf-c-search-input__text",
  searchInputTextInput: "pf-c-search-input__text-input",
  searchInputUtilities: "pf-c-search-input__utilities",
  themeDark: "pf-theme-dark"
};

const ArrowRightIconConfig = {
  name: 'ArrowRightIcon',
  height: 512,
  width: 448,
  svgPath: 'M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z',
  yOffset: 0,
  xOffset: 0,
};

const ArrowRightIcon = createIcon(ArrowRightIconConfig);

import('../common/panel-18a210b1.js');
var styles$u = {
  modifiers: {
    bordered: "pf-m-bordered",
    raised: "pf-m-raised",
    scrollable: "pf-m-scrollable"
  },
  panel: "pf-c-panel",
  panelFooter: "pf-c-panel__footer",
  panelHeader: "pf-c-panel__header",
  panelMain: "pf-c-panel__main",
  panelMainBody: "pf-c-panel__main-body"
};

const PanelBase = (_a) => {
    var { className, children, variant, isScrollable, innerRef } = _a, props = __rest(_a, ["className", "children", "variant", "isScrollable", "innerRef"]);
    return (react.createElement("div", Object.assign({ className: css(styles$u.panel, variant === 'raised' && styles$u.modifiers.raised, variant === 'bordered' && styles$u.modifiers.bordered, isScrollable && styles$u.modifiers.scrollable, className), ref: innerRef }, props), children));
};
const Panel = react.forwardRef((props, ref) => (react.createElement(PanelBase, Object.assign({ innerRef: ref }, props))));
Panel.displayName = 'Panel';

const PanelMain = (_a) => {
    var { className, children, maxHeight } = _a, props = __rest(_a, ["className", "children", "maxHeight"]);
    return (react.createElement("div", Object.assign({ className: css(styles$u.panelMain, className), style: { '--pf-c-panel__main--MaxHeight': maxHeight } }, props), children));
};
PanelMain.displayName = 'PanelMain';

const PanelMainBody = (_a) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (react.createElement("div", Object.assign({ className: css(styles$u.panelMainBody, className) }, props), children));
};
PanelMainBody.displayName = 'PanelMainBody';

const AdvancedSearchMenu = ({ className, parentRef, parentInputRef, value = '', attributes = [], formAdditionalItems, hasWordsAttrLabel = 'Has words', advancedSearchDelimiter, getAttrValueMap, onChange, onSearch, onClear, resetButtonLabel = 'Reset', submitSearchButtonLabel = 'Search', isSearchMenuOpen, onToggleAdvancedMenu }) => {
    const firstAttrRef = react.useRef(null);
    const [putFocusBackOnInput, setPutFocusBackOnInput] = react.useState(false);
    react.useEffect(() => {
        if (attributes.length > 0 && !advancedSearchDelimiter) {
            // eslint-disable-next-line no-console
            console.error('AdvancedSearchMenu: An advancedSearchDelimiter prop is required when advanced search attributes are provided using the attributes prop');
        }
    });
    react.useEffect(() => {
        if (isSearchMenuOpen && firstAttrRef && firstAttrRef.current) {
            firstAttrRef.current.focus();
            setPutFocusBackOnInput(true);
        }
        else if (!isSearchMenuOpen && putFocusBackOnInput && parentInputRef && parentInputRef.current) {
            parentInputRef.current.focus();
        }
    }, [isSearchMenuOpen]);
    react.useEffect(() => {
        document.addEventListener('mousedown', onDocClick);
        document.addEventListener('touchstart', onDocClick);
        document.addEventListener('keydown', onEscPress);
        return function cleanup() {
            document.removeEventListener('mousedown', onDocClick);
            document.removeEventListener('touchstart', onDocClick);
            document.removeEventListener('keydown', onEscPress);
        };
    });
    const onDocClick = (event) => {
        const clickedWithinSearchInput = parentRef && parentRef.current.contains(event.target);
        if (isSearchMenuOpen && !clickedWithinSearchInput) {
            onToggleAdvancedMenu(event);
        }
    };
    const onEscPress = (event) => {
        const keyCode = event.keyCode || event.which;
        if (isSearchMenuOpen &&
            keyCode === KEY_CODES.ESCAPE_KEY &&
            parentRef &&
            parentRef.current.contains(event.target)) {
            onToggleAdvancedMenu(event);
            if (parentInputRef) {
                parentInputRef.current.focus();
            }
        }
    };
    const onSearchHandler = (event) => {
        event.preventDefault();
        if (onSearch) {
            onSearch(value, event, getAttrValueMap());
        }
        if (isSearchMenuOpen) {
            onToggleAdvancedMenu(event);
        }
    };
    const handleValueChange = (attribute, newValue, event) => {
        const newMap = getAttrValueMap();
        newMap[attribute] = newValue;
        let updatedValue = '';
        Object.entries(newMap).forEach(([k, v]) => {
            if (v.trim() !== '') {
                if (k !== 'haswords') {
                    updatedValue = `${updatedValue} ${k}${advancedSearchDelimiter}${v}`;
                }
                else {
                    updatedValue = `${updatedValue} ${v}`;
                }
            }
        });
        updatedValue = updatedValue.replace(/^\s+/g, '');
        if (onChange) {
            onChange(updatedValue, event);
        }
    };
    const getValue = (attribute) => {
        const map = getAttrValueMap();
        return map.hasOwnProperty(attribute) ? map[attribute] : '';
    };
    const buildFormGroups = () => {
        const formGroups = [];
        attributes.forEach((attribute, index) => {
            const display = typeof attribute === 'string' ? attribute : attribute.display;
            const queryAttr = typeof attribute === 'string' ? attribute : attribute.attr;
            if (index === 0) {
                formGroups.push(react.createElement(FormGroup, { label: display, fieldId: `${queryAttr}_${index}`, key: `${attribute}_${index}` },
                    react.createElement(TextInput, { ref: firstAttrRef, type: "text", id: `${queryAttr}_${index}`, value: getValue(queryAttr), onChange: (value, evt) => handleValueChange(queryAttr, value, evt) })));
            }
            else {
                formGroups.push(react.createElement(FormGroup, { label: display, fieldId: `${queryAttr}_${index}`, key: `${attribute}_${index}` },
                    react.createElement(TextInput, { type: "text", id: `${queryAttr}_${index}`, value: getValue(queryAttr), onChange: (value, evt) => handleValueChange(queryAttr, value, evt) })));
            }
        });
        formGroups.push(react.createElement(GenerateId, { key: 'hasWords' }, randomId => (react.createElement(FormGroup, { label: hasWordsAttrLabel, fieldId: randomId },
            react.createElement(TextInput, { type: "text", id: randomId, value: getValue('haswords'), onChange: (value, evt) => handleValueChange('haswords', value, evt) })))));
        return formGroups;
    };
    return isSearchMenuOpen ? (react.createElement(Panel, { variant: "raised", className: css(className) },
        react.createElement(PanelMain, null,
            react.createElement(PanelMainBody, null,
                react.createElement(Form, null,
                    buildFormGroups(),
                    formAdditionalItems ? formAdditionalItems : null,
                    react.createElement(ActionGroup, null,
                        react.createElement(Button, { variant: "primary", type: "submit", onClick: onSearchHandler, isDisabled: !value }, submitSearchButtonLabel),
                        !!onClear && (react.createElement(Button, { variant: "link", type: "reset", onClick: onClear }, resetButtonLabel)))))))) : null;
};
AdvancedSearchMenu.displayName = 'SearchInput';

import('../common/text-input-group-7c98b557.js');
var styles$v = {
  button: "pf-c-button",
  chipGroup: "pf-c-chip-group",
  chipGroupList: "pf-c-chip-group__list",
  modifiers: {
    disabled: "pf-m-disabled",
    plain: "pf-m-plain",
    icon: "pf-m-icon",
    hint: "pf-m-hint"
  },
  textInputGroup: "pf-c-text-input-group",
  textInputGroupGroup: "pf-c-text-input-group__group",
  textInputGroupIcon: "pf-c-text-input-group__icon",
  textInputGroupMain: "pf-c-text-input-group__main",
  textInputGroupText: "pf-c-text-input-group__text",
  textInputGroupTextInput: "pf-c-text-input-group__text-input",
  textInputGroupUtilities: "pf-c-text-input-group__utilities"
};

const TextInputGroupContext = react.createContext({
    isDisabled: false
});
const TextInputGroup = (_a) => {
    var { children, className, isDisabled, innerRef } = _a, props = __rest(_a, ["children", "className", "isDisabled", "innerRef"]);
    const textInputGroupRef = innerRef || react.useRef(null);
    return (react.createElement(TextInputGroupContext.Provider, { value: { isDisabled } },
        react.createElement("div", Object.assign({ ref: textInputGroupRef, className: css(styles$v.textInputGroup, isDisabled && styles$v.modifiers.disabled, className) }, props), children)));
};
TextInputGroup.displayName = 'TextInputGroup';

const TextInputGroupMain = (_a) => {
    var { children, className, icon, type = 'text', hint, onChange = () => undefined, onFocus, onBlur, 'aria-label': ariaLabel = 'Type to filter', value: inputValue, placeholder: inputPlaceHolder, innerRef } = _a, props = __rest(_a, ["children", "className", "icon", "type", "hint", "onChange", "onFocus", "onBlur", 'aria-label', "value", "placeholder", "innerRef"]);
    const { isDisabled } = react.useContext(TextInputGroupContext);
    const textInputGroupInputInputRef = innerRef || react.useRef(null);
    const handleChange = (event) => {
        onChange(event.currentTarget.value, event);
    };
    return (react.createElement("div", Object.assign({ className: css(styles$v.textInputGroupMain, icon && styles$v.modifiers.icon, className) }, props),
        children,
        react.createElement("span", { className: css(styles$v.textInputGroupText) },
            hint && (react.createElement("input", { className: css(styles$v.textInputGroupTextInput, styles$v.modifiers.hint), type: "text", disabled: true, "aria-hidden": "true", value: hint })),
            icon && react.createElement("span", { className: css(styles$v.textInputGroupIcon) }, icon),
            react.createElement("input", { ref: textInputGroupInputInputRef, type: type, className: css(styles$v.textInputGroupTextInput), "aria-label": ariaLabel, disabled: isDisabled, onChange: handleChange, onFocus: onFocus, onBlur: onBlur, value: inputValue || '', placeholder: inputPlaceHolder }))));
};
TextInputGroupMain.displayName = 'TextInputGroupMain';

const TextInputGroupUtilities = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("div", Object.assign({ className: css(styles$v.textInputGroupUtilities, className) }, props), children));
};
TextInputGroupUtilities.displayName = 'TextInputGroupUtilities';

const SearchInputBase = (_a) => {
    var { className, value = '', attributes = [], formAdditionalItems, hasWordsAttrLabel = 'Has words', advancedSearchDelimiter, placeholder, hint, onChange, onSearch, onClear, onToggleAdvancedSearch, isAdvancedSearchOpen, resultsCount, onNextClick, onPreviousClick, innerRef, 'aria-label': ariaLabel = 'Search input', resetButtonLabel = 'Reset', openMenuButtonAriaLabel = 'Open advanced search', previousNavigationButtonAriaLabel = 'Previous', isPreviousNavigationButtonDisabled = false, isNextNavigationButtonDisabled = false, nextNavigationButtonAriaLabel = 'Next', submitSearchButtonLabel = 'Search', isDisabled = false } = _a, props = __rest(_a, ["className", "value", "attributes", "formAdditionalItems", "hasWordsAttrLabel", "advancedSearchDelimiter", "placeholder", "hint", "onChange", "onSearch", "onClear", "onToggleAdvancedSearch", "isAdvancedSearchOpen", "resultsCount", "onNextClick", "onPreviousClick", "innerRef", 'aria-label', "resetButtonLabel", "openMenuButtonAriaLabel", "previousNavigationButtonAriaLabel", "isPreviousNavigationButtonDisabled", "isNextNavigationButtonDisabled", "nextNavigationButtonAriaLabel", "submitSearchButtonLabel", "isDisabled"]);
    const [isSearchMenuOpen, setIsSearchMenuOpen] = react.useState(false);
    const [searchValue, setSearchValue] = react.useState(value);
    const searchInputRef = react.useRef(null);
    const searchInputInputRef = innerRef || react.useRef(null);
    react.useEffect(() => {
        setSearchValue(value);
    }, [value]);
    react.useEffect(() => {
        if (attributes.length > 0 && !advancedSearchDelimiter) {
            // eslint-disable-next-line no-console
            console.error('An advancedSearchDelimiter prop is required when advanced search attributes are provided using the attributes prop');
        }
    });
    react.useEffect(() => {
        setIsSearchMenuOpen(isAdvancedSearchOpen);
    }, [isAdvancedSearchOpen]);
    const onChangeHandler = (value, event) => {
        if (onChange) {
            onChange(value, event);
        }
        setSearchValue(value);
    };
    const onToggle = (e) => {
        const isOpen = !isSearchMenuOpen;
        setIsSearchMenuOpen(isOpen);
        if (onToggleAdvancedSearch) {
            onToggleAdvancedSearch(e, isOpen);
        }
    };
    const onSearchHandler = (event) => {
        event.preventDefault();
        if (onSearch) {
            onSearch(value, event, getAttrValueMap());
        }
        setIsSearchMenuOpen(false);
    };
    const getAttrValueMap = () => {
        const attrValue = {};
        const pairs = searchValue.split(' ');
        pairs.map(pair => {
            const splitPair = pair.split(advancedSearchDelimiter);
            if (splitPair.length === 2) {
                attrValue[splitPair[0]] = splitPair[1];
            }
            else if (splitPair.length === 1) {
                attrValue.haswords = attrValue.hasOwnProperty('haswords')
                    ? `${attrValue.haswords} ${splitPair[0]}`
                    : splitPair[0];
            }
        });
        return attrValue;
    };
    const onEnter = (event) => {
        if (event.key === 'Enter') {
            onSearchHandler(event);
        }
    };
    const onClearInput = (e) => {
        if (onClear) {
            onClear(e);
        }
        if (searchInputInputRef && searchInputInputRef.current) {
            searchInputInputRef.current.focus();
        }
    };
    const buildSearchTextInputGroup = (_a = {}) => {
        var searchInputProps = __rest(_a, []);
        return (react.createElement(TextInputGroup, Object.assign({ isDisabled: isDisabled }, searchInputProps),
            react.createElement(TextInputGroupMain, { hint: hint, icon: react.createElement(SearchIcon, null), innerRef: searchInputInputRef, value: searchValue, placeholder: placeholder, "aria-label": ariaLabel, onKeyDown: onEnter, onChange: onChangeHandler }),
            value && (react.createElement(TextInputGroupUtilities, null,
                resultsCount && react.createElement(Badge, { isRead: true }, resultsCount),
                !!onNextClick && !!onPreviousClick && (react.createElement("div", { className: "pf-c-text-input-group__group" },
                    react.createElement(Button, { variant: ButtonVariant.plain, "aria-label": previousNavigationButtonAriaLabel, isDisabled: isDisabled || isPreviousNavigationButtonDisabled, onClick: onPreviousClick },
                        react.createElement(AngleUpIcon, null)),
                    react.createElement(Button, { variant: ButtonVariant.plain, "aria-label": nextNavigationButtonAriaLabel, isDisabled: isDisabled || isNextNavigationButtonDisabled, onClick: onNextClick },
                        react.createElement(AngleDownIcon, null)))),
                !!onClear && (react.createElement(Button, { variant: ButtonVariant.plain, isDisabled: isDisabled, "aria-label": resetButtonLabel, onClick: onClearInput },
                    react.createElement(TimesIcon, null)))))));
    };
    const buildSearchTextInputGroupWithExtraButtons = (_a = {}) => {
        var searchInputProps = __rest(_a, []);
        return (react.createElement(InputGroup, Object.assign({}, searchInputProps),
            buildSearchTextInputGroup(),
            (attributes.length > 0 || onToggleAdvancedSearch) && (react.createElement(Button, { className: isSearchMenuOpen && 'pf-m-expanded', variant: ButtonVariant.control, "aria-label": openMenuButtonAriaLabel, onClick: onToggle, isDisabled: isDisabled, "aria-expanded": isSearchMenuOpen },
                react.createElement(CaretDownIcon, null))),
            !!onSearch && (react.createElement(Button, { type: "submit", variant: ButtonVariant.control, "aria-label": submitSearchButtonLabel, onClick: onSearchHandler, isDisabled: isDisabled || !searchValue },
                react.createElement(ArrowRightIcon, null)))));
    };
    const searchInputProps = Object.assign(Object.assign({}, props), { className: className && css(className), innerRef: searchInputRef });
    if (!!onSearch || attributes.length > 0 || !!onToggleAdvancedSearch) {
        if (attributes.length > 0) {
            return (react.createElement("div", Object.assign({ className: css(className, styles$t.searchInput), ref: searchInputRef }, props),
                buildSearchTextInputGroupWithExtraButtons(),
                react.createElement(AdvancedSearchMenu, { className: styles$t.searchInputMenu, value: value, parentRef: searchInputRef, parentInputRef: searchInputInputRef, onSearch: onSearch, onClear: onClear, onChange: onChange, onToggleAdvancedMenu: onToggle, resetButtonLabel: resetButtonLabel, submitSearchButtonLabel: submitSearchButtonLabel, attributes: attributes, formAdditionalItems: formAdditionalItems, hasWordsAttrLabel: hasWordsAttrLabel, advancedSearchDelimiter: advancedSearchDelimiter, getAttrValueMap: getAttrValueMap, isSearchMenuOpen: isSearchMenuOpen })));
        }
        return buildSearchTextInputGroupWithExtraButtons(Object.assign({}, searchInputProps));
    }
    return buildSearchTextInputGroup(searchInputProps);
};
SearchInputBase.displayName = 'SearchInputBase';
const SearchInput = react.forwardRef((props, ref) => (react.createElement(SearchInputBase, Object.assign({}, props, { innerRef: ref }))));
SearchInput.displayName = 'SearchInput';

import('../common/switch-348ca570.js');
var styles$w = {
  modifiers: {
    reverse: "pf-m-reverse",
    off: "pf-m-off",
    on: "pf-m-on"
  },
  switch: "pf-c-switch",
  switchInput: "pf-c-switch__input",
  switchLabel: "pf-c-switch__label",
  switchToggle: "pf-c-switch__toggle",
  switchToggleIcon: "pf-c-switch__toggle-icon",
  themeDark: "pf-theme-dark"
};

class Switch extends react.Component {
    constructor(props) {
        super(props);
        if (!props.label && !props['aria-label']) {
            // eslint-disable-next-line no-console
            console.error('Switch: Switch requires either a label or an aria-label to be specified');
        }
        this.id = props.id || getUniqueId();
        this.state = {
            ouiaStateId: getDefaultOUIAId(Switch.displayName)
        };
    }
    render() {
        const _a = this.props, { 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id, className, label, labelOff, isChecked, defaultChecked, hasCheckIcon, isDisabled, onChange, isReversed, ouiaId, ouiaSafe } = _a, props = __rest(_a, ["id", "className", "label", "labelOff", "isChecked", "defaultChecked", "hasCheckIcon", "isDisabled", "onChange", "isReversed", "ouiaId", "ouiaSafe"]);
        const isAriaLabelledBy = props['aria-label'] === '';
        return (react.createElement("label", Object.assign({ className: css(styles$w.switch, isReversed && styles$w.modifiers.reverse, className), htmlFor: this.id }, getOUIAProps(Switch.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe)),
            react.createElement("input", Object.assign({ id: this.id, className: css(styles$w.switchInput), type: "checkbox", onChange: event => onChange(event.target.checked, event) }, ([true, false].includes(defaultChecked) && { defaultChecked }), (![true, false].includes(defaultChecked) && { checked: isChecked }), { disabled: isDisabled, "aria-labelledby": isAriaLabelledBy ? `${this.id}-on` : null }, props)),
            label !== undefined ? (react.createElement(react.Fragment, null,
                react.createElement("span", { className: css(styles$w.switchToggle) }, hasCheckIcon && (react.createElement("span", { className: css(styles$w.switchToggleIcon), "aria-hidden": "true" },
                    react.createElement(CheckIcon, { noVerticalAlign: true })))),
                react.createElement("span", { className: css(styles$w.switchLabel, styles$w.modifiers.on), id: isAriaLabelledBy ? `${this.id}-on` : null, "aria-hidden": "true" }, label),
                react.createElement("span", { className: css(styles$w.switchLabel, styles$w.modifiers.off), id: isAriaLabelledBy ? `${this.id}-off` : null, "aria-hidden": "true" }, labelOff !== undefined ? labelOff : label))) : (react.createElement("span", { className: css(styles$w.switchToggle) },
                react.createElement("div", { className: css(styles$w.switchToggleIcon), "aria-hidden": "true" },
                    react.createElement(CheckIcon, { noVerticalAlign: true }))))));
    }
}
Switch.displayName = 'Switch';
Switch.defaultProps = {
    isChecked: true,
    isDisabled: false,
    isReversed: false,
    'aria-label': '',
    onChange: () => undefined
};

import('../common/tabs-10d37d49.js');
var styles$x = {
  button: "pf-c-button",
  modifiers: {
    fill: "pf-m-fill",
    scrollable: "pf-m-scrollable",
    secondary: "pf-m-secondary",
    noBorderBottom: "pf-m-no-border-bottom",
    borderBottom: "pf-m-border-bottom",
    box: "pf-m-box",
    vertical: "pf-m-vertical",
    current: "pf-m-current",
    colorSchemeLight_300: "pf-m-color-scheme--light-300",
    expandable: "pf-m-expandable",
    nonExpandable: "pf-m-non-expandable",
    expandableOnSm: "pf-m-expandable-on-sm",
    nonExpandableOnSm: "pf-m-non-expandable-on-sm",
    expandableOnMd: "pf-m-expandable-on-md",
    nonExpandableOnMd: "pf-m-non-expandable-on-md",
    expandableOnLg: "pf-m-expandable-on-lg",
    nonExpandableOnLg: "pf-m-non-expandable-on-lg",
    expandableOnXl: "pf-m-expandable-on-xl",
    nonExpandableOnXl: "pf-m-non-expandable-on-xl",
    expandableOn_2xl: "pf-m-expandable-on-2xl",
    nonExpandableOn_2xl: "pf-m-non-expandable-on-2xl",
    expanded: "pf-m-expanded",
    pageInsets: "pf-m-page-insets",
    action: "pf-m-action",
    active: "pf-m-active",
    disabled: "pf-m-disabled",
    ariaDisabled: "pf-m-aria-disabled",
    insetNone: "pf-m-inset-none",
    insetSm: "pf-m-inset-sm",
    insetMd: "pf-m-inset-md",
    insetLg: "pf-m-inset-lg",
    insetXl: "pf-m-inset-xl",
    inset_2xl: "pf-m-inset-2xl",
    insetNoneOnSm: "pf-m-inset-none-on-sm",
    insetSmOnSm: "pf-m-inset-sm-on-sm",
    insetMdOnSm: "pf-m-inset-md-on-sm",
    insetLgOnSm: "pf-m-inset-lg-on-sm",
    insetXlOnSm: "pf-m-inset-xl-on-sm",
    inset_2xlOnSm: "pf-m-inset-2xl-on-sm",
    insetNoneOnMd: "pf-m-inset-none-on-md",
    insetSmOnMd: "pf-m-inset-sm-on-md",
    insetMdOnMd: "pf-m-inset-md-on-md",
    insetLgOnMd: "pf-m-inset-lg-on-md",
    insetXlOnMd: "pf-m-inset-xl-on-md",
    inset_2xlOnMd: "pf-m-inset-2xl-on-md",
    insetNoneOnLg: "pf-m-inset-none-on-lg",
    insetSmOnLg: "pf-m-inset-sm-on-lg",
    insetMdOnLg: "pf-m-inset-md-on-lg",
    insetLgOnLg: "pf-m-inset-lg-on-lg",
    insetXlOnLg: "pf-m-inset-xl-on-lg",
    inset_2xlOnLg: "pf-m-inset-2xl-on-lg",
    insetNoneOnXl: "pf-m-inset-none-on-xl",
    insetSmOnXl: "pf-m-inset-sm-on-xl",
    insetMdOnXl: "pf-m-inset-md-on-xl",
    insetLgOnXl: "pf-m-inset-lg-on-xl",
    insetXlOnXl: "pf-m-inset-xl-on-xl",
    inset_2xlOnXl: "pf-m-inset-2xl-on-xl",
    insetNoneOn_2xl: "pf-m-inset-none-on-2xl",
    insetSmOn_2xl: "pf-m-inset-sm-on-2xl",
    insetMdOn_2xl: "pf-m-inset-md-on-2xl",
    insetLgOn_2xl: "pf-m-inset-lg-on-2xl",
    insetXlOn_2xl: "pf-m-inset-xl-on-2xl",
    inset_2xlOn_2xl: "pf-m-inset-2xl-on-2xl"
  },
  tabs: "pf-c-tabs",
  tabsAdd: "pf-c-tabs__add",
  tabsItem: "pf-c-tabs__item",
  tabsItemClose: "pf-c-tabs__item-close",
  tabsItemCloseIcon: "pf-c-tabs__item-close-icon",
  tabsItemIcon: "pf-c-tabs__item-icon",
  tabsItemText: "pf-c-tabs__item-text",
  tabsLink: "pf-c-tabs__link",
  tabsLinkToggleIcon: "pf-c-tabs__link-toggle-icon",
  tabsList: "pf-c-tabs__list",
  tabsScrollButton: "pf-c-tabs__scroll-button",
  tabsToggle: "pf-c-tabs__toggle",
  tabsToggleButton: "pf-c-tabs__toggle-button",
  tabsToggleIcon: "pf-c-tabs__toggle-icon",
  tabsToggleText: "pf-c-tabs__toggle-text",
  themeDark: "pf-theme-dark"
};

const TabButton = (_a) => {
    var { children, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tabContentRef, ouiaId, parentInnerRef, ouiaSafe } = _a, props = __rest(_a, ["children", "tabContentRef", "ouiaId", "parentInnerRef", "ouiaSafe"]);
    const Component = (props.href ? 'a' : 'button');
    return (react.createElement(Component, Object.assign({ ref: parentInnerRef }, getOUIAProps(TabButton.displayName, ouiaId, ouiaSafe), props), children));
};
TabButton.displayName = 'TabButton';

const TabsContext = react.createContext({
    variant: 'default',
    mountOnEnter: false,
    unmountOnExit: false,
    localActiveKey: '',
    uniqueId: '',
    handleTabClick: () => null,
    handleTabClose: undefined
});
const TabsContextProvider = TabsContext.Provider;
const TabsContextConsumer = TabsContext.Consumer;

const TabBase = (_a) => {
    var { title, eventKey, tabContentRef, id: childId, tabContentId, className: childClassName = '', ouiaId: childOuiaId, isDisabled, isAriaDisabled, inoperableEvents = ['onClick', 'onKeyPress'], href, innerRef, tooltip, closeButtonAriaLabel, isCloseDisabled = false } = _a, props = __rest(_a, ["title", "eventKey", "tabContentRef", "id", "tabContentId", "className", "ouiaId", "isDisabled", "isAriaDisabled", "inoperableEvents", "href", "innerRef", "tooltip", "closeButtonAriaLabel", "isCloseDisabled"]);
    const preventedEvents = inoperableEvents.reduce((handlers, eventToPrevent) => (Object.assign(Object.assign({}, handlers), { [eventToPrevent]: (event) => {
            event.preventDefault();
        } })), {});
    const { mountOnEnter, localActiveKey, unmountOnExit, uniqueId, handleTabClick, handleTabClose } = react.useContext(TabsContext);
    let ariaControls = tabContentId ? `${tabContentId}` : `pf-tab-section-${eventKey}-${childId || uniqueId}`;
    if ((mountOnEnter || unmountOnExit) && eventKey !== localActiveKey) {
        ariaControls = undefined;
    }
    const isButtonElement = Boolean(!href);
    const getDefaultTabIdx = () => {
        if (isDisabled) {
            return isButtonElement ? null : -1;
        }
        else if (isAriaDisabled) {
            return null;
        }
    };
    const tabButton = (react.createElement(TabButton, Object.assign({ parentInnerRef: innerRef, className: css(styles$x.tabsLink, isDisabled && href && styles$x.modifiers.disabled, isAriaDisabled && styles$x.modifiers.ariaDisabled), disabled: isButtonElement ? isDisabled : null, "aria-disabled": isDisabled || isAriaDisabled, tabIndex: getDefaultTabIdx(), onClick: (event) => handleTabClick(event, eventKey, tabContentRef) }, (isAriaDisabled ? preventedEvents : null), { id: `pf-tab-${eventKey}-${childId || uniqueId}`, "aria-controls": ariaControls, tabContentRef: tabContentRef, ouiaId: childOuiaId, href: href, role: "tab", "aria-selected": eventKey === localActiveKey }, props), title));
    return (react.createElement("li", { className: css(styles$x.tabsItem, eventKey === localActiveKey && styles$x.modifiers.current, handleTabClose && styles$x.modifiers.action, handleTabClose && (isDisabled || isAriaDisabled) && styles$x.modifiers.disabled, childClassName), role: "presentation" },
        tooltip ? react.createElement(Tooltip, Object.assign({}, tooltip.props), tabButton) : tabButton,
        handleTabClose !== undefined && (react.createElement("span", { className: css(styles$x.tabsItemClose) },
            react.createElement(Button, { variant: "plain", "aria-label": closeButtonAriaLabel || 'Close tab', onClick: (event) => handleTabClose(event, eventKey, tabContentRef), isDisabled: isCloseDisabled },
                react.createElement("span", { className: css(styles$x.tabsItemCloseIcon) },
                    react.createElement(TimesIcon, null)))))));
};
const Tab = react.forwardRef((props, ref) => react.createElement(TabBase, Object.assign({ innerRef: ref }, props)));
Tab.displayName = 'Tab';

import('../common/tab-content-af583868.js');
var styles$y = {
  modifiers: {
    light_300: "pf-m-light-300",
    padding: "pf-m-padding"
  },
  tabContent: "pf-c-tab-content",
  tabContentBody: "pf-c-tab-content__body"
};

const variantStyle$1 = {
    default: '',
    light300: styles$y.modifiers.light_300
};
const TabContentBase = (_a) => {
    var { id, activeKey, 'aria-label': ariaLabel, child, children, className, eventKey, innerRef, ouiaId, ouiaSafe } = _a, props = __rest(_a, ["id", "activeKey", 'aria-label', "child", "children", "className", "eventKey", "innerRef", "ouiaId", "ouiaSafe"]);
    if (children || child) {
        let labelledBy;
        if (ariaLabel) {
            labelledBy = null;
        }
        else {
            labelledBy = children ? `pf-tab-${eventKey}-${id}` : `pf-tab-${child.props.eventKey}-${id}`;
        }
        return (react.createElement(TabsContextConsumer, null, ({ variant }) => (react.createElement("section", Object.assign({ ref: innerRef, hidden: children ? null : child.props.eventKey !== activeKey, className: children
                ? css('pf-c-tab-content', className, variantStyle$1[variant])
                : css('pf-c-tab-content', child.props.className, variantStyle$1[variant]), id: children ? id : `pf-tab-section-${child.props.eventKey}-${id}`, "aria-label": ariaLabel, "aria-labelledby": labelledBy, role: "tabpanel", tabIndex: 0 }, getOUIAProps('TabContent', ouiaId, ouiaSafe), props), children || child.props.children))));
    }
    return null;
};
const TabContent = react.forwardRef((props, ref) => (react.createElement(TabContentBase, Object.assign({}, props, { innerRef: ref }))));

var TabsComponent;
(function (TabsComponent) {
    TabsComponent["div"] = "div";
    TabsComponent["nav"] = "nav";
})(TabsComponent || (TabsComponent = {}));
const variantStyle$2 = {
    default: '',
    light300: styles$x.modifiers.colorSchemeLight_300
};
class Tabs extends react.Component {
    constructor(props) {
        super(props);
        this.tabList = react.createRef();
        this.scrollTimeout = null;
        this.handleScrollButtons = () => {
            // add debounce to the scroll event
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                const container = this.tabList.current;
                let disableLeftScrollButton = true;
                let disableRightScrollButton = true;
                let showScrollButtons = false;
                if (container && !this.props.isVertical) {
                    // get first element and check if it is in view
                    const overflowOnLeft = !isElementInView(container, container.firstChild, false);
                    // get last element and check if it is in view
                    const overflowOnRight = !isElementInView(container, container.lastChild, false);
                    showScrollButtons = overflowOnLeft || overflowOnRight;
                    disableLeftScrollButton = !overflowOnLeft;
                    disableRightScrollButton = !overflowOnRight;
                }
                this.setState({
                    showScrollButtons,
                    disableLeftScrollButton,
                    disableRightScrollButton
                });
            }, 100);
        };
        this.scrollLeft = () => {
            // find first Element that is fully in view on the left, then scroll to the element before it
            if (this.tabList.current) {
                const container = this.tabList.current;
                const childrenArr = Array.from(container.children);
                let firstElementInView;
                let lastElementOutOfView;
                let i;
                for (i = 0; i < childrenArr.length && !firstElementInView; i++) {
                    if (isElementInView(container, childrenArr[i], false)) {
                        firstElementInView = childrenArr[i];
                        lastElementOutOfView = childrenArr[i - 1];
                    }
                }
                if (lastElementOutOfView) {
                    container.scrollLeft -= lastElementOutOfView.scrollWidth;
                }
            }
        };
        this.scrollRight = () => {
            // find last Element that is fully in view on the right, then scroll to the element after it
            if (this.tabList.current) {
                const container = this.tabList.current;
                const childrenArr = Array.from(container.children);
                let lastElementInView;
                let firstElementOutOfView;
                for (let i = childrenArr.length - 1; i >= 0 && !lastElementInView; i--) {
                    if (isElementInView(container, childrenArr[i], false)) {
                        lastElementInView = childrenArr[i];
                        firstElementOutOfView = childrenArr[i + 1];
                    }
                }
                if (firstElementOutOfView) {
                    container.scrollLeft += firstElementOutOfView.scrollWidth;
                }
            }
        };
        this.state = {
            showScrollButtons: false,
            disableLeftScrollButton: true,
            disableRightScrollButton: true,
            shownKeys: this.props.defaultActiveKey !== undefined ? [this.props.defaultActiveKey] : [this.props.activeKey],
            uncontrolledActiveKey: this.props.defaultActiveKey,
            uncontrolledIsExpandedLocal: this.props.defaultIsExpanded,
            ouiaStateId: getDefaultOUIAId(Tabs.displayName)
        };
        if (this.props.isVertical && this.props.expandable !== undefined) {
            if (!this.props.toggleAriaLabel && !this.props.toggleText) {
                // eslint-disable-next-line no-console
                console.error('Tabs:', 'toggleAriaLabel or the toggleText prop is required to make the toggle button accessible');
            }
        }
    }
    handleTabClick(event, eventKey, tabContentRef) {
        const { shownKeys } = this.state;
        const { onSelect, defaultActiveKey } = this.props;
        // if defaultActiveKey Tabs are uncontrolled, set new active key internally
        if (defaultActiveKey !== undefined) {
            this.setState({
                uncontrolledActiveKey: eventKey
            });
        }
        else {
            onSelect(event, eventKey);
        }
        // process any tab content sections outside of the component
        if (tabContentRef) {
            react.Children.toArray(this.props.children)
                .map(child => child)
                .filter(child => child.props && child.props.tabContentRef && child.props.tabContentRef.current)
                .forEach(child => (child.props.tabContentRef.current.hidden = true));
            // most recently selected tabContent
            if (tabContentRef.current) {
                tabContentRef.current.hidden = false;
            }
        }
        if (this.props.mountOnEnter) {
            this.setState({
                shownKeys: shownKeys.concat(eventKey)
            });
        }
    }
    componentDidMount() {
        if (!this.props.isVertical) {
            if (canUseDOM) {
                window.addEventListener('resize', this.handleScrollButtons, false);
            }
            // call the handle resize function to check if scroll buttons should be shown
            this.handleScrollButtons();
        }
    }
    componentWillUnmount() {
        if (!this.props.isVertical) {
            if (canUseDOM) {
                window.removeEventListener('resize', this.handleScrollButtons, false);
            }
        }
        clearTimeout(this.scrollTimeout);
    }
    componentDidUpdate(prevProps) {
        const { activeKey, mountOnEnter, children } = this.props;
        const { shownKeys } = this.state;
        if (prevProps.activeKey !== activeKey && mountOnEnter && shownKeys.indexOf(activeKey) < 0) {
            this.setState({
                shownKeys: shownKeys.concat(activeKey)
            });
        }
        if (prevProps.children &&
            children &&
            react.Children.toArray(prevProps.children).length !== react.Children.toArray(children).length) {
            this.handleScrollButtons();
        }
    }
    render() {
        const _a = this.props, { className, children, activeKey, defaultActiveKey, id, isFilled, isSecondary, isVertical, isBox, hasBorderBottom, hasSecondaryBorderBottom, leftScrollAriaLabel, rightScrollAriaLabel, 'aria-label': ariaLabel, component, ouiaId, ouiaSafe, mountOnEnter, unmountOnExit, usePageInsets, inset, variant, expandable, isExpanded, defaultIsExpanded, toggleText, toggleAriaLabel, addButtonAriaLabel, onToggle, onClose, onAdd } = _a, props = __rest(_a, ["className", "children", "activeKey", "defaultActiveKey", "id", "isFilled", "isSecondary", "isVertical", "isBox", "hasBorderBottom", "hasSecondaryBorderBottom", "leftScrollAriaLabel", "rightScrollAriaLabel", 'aria-label', "component", "ouiaId", "ouiaSafe", "mountOnEnter", "unmountOnExit", "usePageInsets", "inset", "variant", "expandable", "isExpanded", "defaultIsExpanded", "toggleText", "toggleAriaLabel", "addButtonAriaLabel", "onToggle", "onClose", "onAdd"]);
        const { showScrollButtons, disableLeftScrollButton, disableRightScrollButton, shownKeys, uncontrolledActiveKey, uncontrolledIsExpandedLocal } = this.state;
        const filteredChildren = react.Children.toArray(children)
            .filter(Boolean)
            .filter(child => !child.props.isHidden);
        const uniqueId = id || getUniqueId();
        const Component = component === TabsComponent.nav ? 'nav' : 'div';
        const localActiveKey = defaultActiveKey !== undefined ? uncontrolledActiveKey : activeKey;
        const isExpandedLocal = defaultIsExpanded !== undefined ? uncontrolledIsExpandedLocal : isExpanded;
        /*  Uncontrolled expandable tabs */
        const toggleTabs = (newValue) => {
            if (isExpanded === undefined) {
                this.setState({ uncontrolledIsExpandedLocal: newValue });
            }
            else {
                onToggle(newValue);
            }
        };
        return (react.createElement(TabsContextProvider, { value: {
                variant,
                mountOnEnter,
                unmountOnExit,
                localActiveKey,
                uniqueId,
                handleTabClick: (...args) => this.handleTabClick(...args),
                handleTabClose: onClose
            } },
            react.createElement(Component, Object.assign({ "aria-label": ariaLabel, className: css(styles$x.tabs, isFilled && styles$x.modifiers.fill, isSecondary && styles$x.modifiers.secondary, isVertical && styles$x.modifiers.vertical, isVertical && expandable && formatBreakpointMods(expandable, styles$x), isVertical && expandable && isExpandedLocal && styles$x.modifiers.expanded, isBox && styles$x.modifiers.box, showScrollButtons && !isVertical && styles$x.modifiers.scrollable, usePageInsets && styles$x.modifiers.pageInsets, !hasBorderBottom && styles$x.modifiers.noBorderBottom, hasSecondaryBorderBottom && styles$x.modifiers.borderBottom, formatBreakpointMods(inset, styles$x), variantStyle$2[variant], className) }, getOUIAProps(Tabs.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe), { id: id && id }, props),
                expandable && isVertical && (react.createElement(GenerateId, null, randomId => (react.createElement("div", { className: css(styles$x.tabsToggle) },
                    react.createElement("div", { className: css(styles$x.tabsToggleButton) },
                        react.createElement(Button, { onClick: () => toggleTabs(!isExpandedLocal), variant: "plain", "aria-label": toggleAriaLabel, "aria-expanded": isExpandedLocal, id: `${randomId}-button`, "aria-labelledby": `${randomId}-text ${randomId}-button` },
                            react.createElement("span", { className: css(styles$x.tabsToggleIcon) },
                                react.createElement(AngleRightIcon, { "arian-hidden": "true" })),
                            toggleText && (react.createElement("span", { className: css('pf-c-tabs__toggle-text'), id: `${randomId}-text` }, toggleText)))))))),
                react.createElement("button", { className: css(styles$x.tabsScrollButton, isSecondary && buttonStyles.modifiers.secondary), "aria-label": leftScrollAriaLabel, onClick: this.scrollLeft, disabled: disableLeftScrollButton, "aria-hidden": disableLeftScrollButton },
                    react.createElement(AngleLeftIcon, null)),
                react.createElement("ul", { className: css(styles$x.tabsList), ref: this.tabList, onScroll: this.handleScrollButtons, role: "tablist" }, filteredChildren),
                react.createElement("button", { className: css(styles$x.tabsScrollButton, isSecondary && buttonStyles.modifiers.secondary), "aria-label": rightScrollAriaLabel, onClick: this.scrollRight, disabled: disableRightScrollButton, "aria-hidden": disableRightScrollButton },
                    react.createElement(AngleRightIcon, null)),
                onAdd !== undefined && (react.createElement("span", { className: css(styles$x.tabsAdd) },
                    react.createElement(Button, { variant: "plain", "aria-label": addButtonAriaLabel || 'Add tab', onClick: onAdd },
                        react.createElement(PlusIcon, null))))),
            filteredChildren
                .filter(child => child.props.children &&
                !(unmountOnExit && child.props.eventKey !== localActiveKey) &&
                !(mountOnEnter && shownKeys.indexOf(child.props.eventKey) === -1))
                .map(child => (react.createElement(TabContent, { key: child.props.eventKey, activeKey: localActiveKey, child: child, id: child.props.id || uniqueId, ouiaId: child.props.ouiaId })))));
    }
}
Tabs.displayName = 'Tabs';
Tabs.defaultProps = {
    activeKey: 0,
    onSelect: () => undefined,
    isFilled: false,
    isSecondary: false,
    isVertical: false,
    isBox: false,
    hasBorderBottom: true,
    leftScrollAriaLabel: 'Scroll left',
    rightScrollAriaLabel: 'Scroll right',
    component: TabsComponent.div,
    mountOnEnter: false,
    unmountOnExit: false,
    ouiaSafe: true,
    variant: 'default',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onToggle: (isExpanded) => undefined
};

const TabTitleText = (_a) => {
    var { children, className = '' } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("span", Object.assign({ className: css(styles$x.tabsItemText, className) }, props), children));
};
TabTitleText.displayName = 'TabTitleText';

const amSuffix = ' AM';
const pmSuffix = ' PM';
const makeTimeOptions = (stepMinutes, hour12, delimiter, minTime, maxTime, includeSeconds) => {
    const res = [];
    const iter = new Date(new Date().setHours(0, 0, 0, 0));
    const iterDay = iter.getDay();
    while (iter.getDay() === iterDay) {
        let hour = iter.getHours();
        let suffix = amSuffix;
        if (hour12) {
            if (hour === 0) {
                hour = 12; // 12am
            }
            else if (hour >= 12) {
                suffix = pmSuffix;
            }
            if (hour > 12) {
                hour %= 12;
            }
        }
        hour = hour12 ? hour.toString() : hour.toString().padStart(2, '0');
        const minutes = iter
            .getMinutes()
            .toString()
            .padStart(2, '0');
        const timeOption = `${hour}${delimiter}${minutes}${hour12 ? suffix : ''}`;
        // time option is valid if within min/max constraints
        if (isWithinMinMax(minTime, maxTime, timeOption, delimiter, includeSeconds)) {
            res.push(timeOption);
        }
        iter.setMinutes(iter.getMinutes() + stepMinutes);
    }
    return res;
};
const parseTime = (time, timeRegex, delimiter, is12Hour, includeSeconds) => {
    const date = new Date(time);
    // if default time is a ISO 8601 formatted date string, we parse it to hh:mm(am/pm) format
    if (!isNaN(date.getDate()) && (time instanceof Date || time.includes('T'))) {
        const hours = is12Hour
            ? `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}`
            : `${date.getHours()}`.padStart(2, '0');
        const minutes = `${date.getMinutes()}`.padStart(2, '0');
        const seconds = includeSeconds ? `${date.getSeconds()}`.padStart(2, '0') : '';
        const secondsWithDelimiter = seconds ? `${delimiter}${seconds}` : '';
        let ampm = '';
        if (is12Hour && date.getHours() > 11) {
            ampm = pmSuffix;
        }
        else if (is12Hour) {
            ampm = amSuffix;
        }
        return `${hours}${delimiter}${minutes}${secondsWithDelimiter}${ampm}`;
    }
    else if (typeof time === 'string') {
        time = time.trim();
        if (time !== '' && validateTime(time, timeRegex, delimiter, is12Hour)) {
            const [, hours, minutes, seconds, suffix = ''] = timeRegex.exec(time);
            const secondsWithDelimiter = includeSeconds ? `${delimiter}${seconds !== null && seconds !== void 0 ? seconds : '00'}` : '';
            let ampm = '';
            // Format AM/PM according to design
            if (is12Hour) {
                const uppercaseSuffix = suffix.toUpperCase();
                if (uppercaseSuffix === amSuffix.toUpperCase().trim()) {
                    ampm = amSuffix;
                }
                else if (uppercaseSuffix === pmSuffix.toUpperCase().trim()) {
                    ampm = pmSuffix;
                }
                else {
                    // if this 12 hour time is missing am/pm but otherwise valid,
                    // append am/pm depending on time of day
                    ampm = new Date().getHours() > 11 ? pmSuffix : amSuffix;
                }
            }
            return `${hours}${delimiter}${minutes}${secondsWithDelimiter}${ampm}`;
        }
    }
    return time.toString();
};
const validateTime = (time, timeRegex, delimiter, is12Hour) => {
    // ISO 8601 format is valid
    const date = new Date(time);
    if (!isNaN(date.getDate()) && time.includes('T')) {
        return true;
    }
    // hours only valid if they are [0-23] or [1-12]
    const hours = parseInt(time.split(delimiter)[0]);
    const validHours = hours >= (is12Hour ? 1 : 0) && hours <= (is12Hour ? 12 : 23);
    // minutes verified by timeRegex
    // empty string is valid
    return time === '' || (timeRegex.test(time) && validHours);
};
const getHours = (time, timeRegex) => {
    const parts = time.match(timeRegex);
    if (parts && parts.length) {
        if (/pm/i.test(parts[4])) {
            return parseInt(parts[1]) === 12 ? parseInt(parts[1]) : parseInt(parts[1]) + 12;
        }
        if (/am/i.test(parts[4])) {
            return parseInt(parts[1]) === 12 ? 0 : parseInt(parts[1]);
        }
        return parseInt(parts[1]);
    }
    return null;
};
const getMinutes = (time, timeRegex) => {
    const parts = time.match(timeRegex);
    return parts && parts.length ? parseInt(parts[2]) : null;
};
const getSeconds = (time, timeRegex) => {
    var _a;
    const seconds = (_a = time.match(timeRegex)) === null || _a === void 0 ? void 0 : _a[3];
    return seconds ? parseInt(seconds) : null;
};
const isWithinMinMax = (minTime, maxTime, time, delimiter, includeSeconds) => {
    // do not throw error if empty string
    if (time.trim() === '') {
        return true;
    }
    // correctly format as 24hr times (12:30AM => 00:30, 1:15 => 01:15)
    const min24HourTime = convertTo24Hour(minTime, delimiter, includeSeconds);
    const selected24HourTime = convertTo24Hour(time, delimiter, includeSeconds);
    const max24HourTime = convertTo24Hour(maxTime, delimiter, includeSeconds);
    // simple string comparison for 24hr times
    return min24HourTime <= selected24HourTime && selected24HourTime <= max24HourTime;
};
const convertTo24Hour = (time, delimiter, includeSeconds) => {
    const timeReg = new RegExp(`^\\s*(\\d\\d?)${delimiter}([0-5]\\d)${delimiter}?([0-5]\\d)?\\s*([AaPp][Mm])?\\s*$`);
    const regMatches = timeReg.exec(time);
    if (!regMatches || !regMatches.length) {
        return;
    }
    let hours = regMatches[1].padStart(2, '0');
    const minutes = regMatches[2];
    let seconds = regMatches[3] ? `${delimiter}${regMatches[3]}` : '';
    // When seconds is empty and 'includeSeconds' is enabled, append 0 seconds.
    if (!seconds && includeSeconds) {
        seconds = `${delimiter}00`;
    }
    const suffix = regMatches[4] || '';
    if (suffix.toUpperCase() === 'PM' && hours !== '12') {
        hours = `${parseInt(hours) + 12}`;
    }
    else if (suffix.toUpperCase() === 'AM' && hours === '12') {
        hours = '00';
    }
    return `${hours}${delimiter}${minutes}${seconds}`;
};

class TimePicker extends react.Component {
    constructor(props) {
        super(props);
        this.baseComponentRef = react.createRef();
        this.toggleRef = react.createRef();
        this.inputRef = react.createRef();
        this.menuRef = react.createRef();
        this.onDocClick = (event) => {
            var _a, _b, _c, _d;
            const clickedOnToggle = (_b = (_a = this.toggleRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.contains(event.target);
            const clickedWithinMenu = (_d = (_c = this.menuRef) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.contains(event.target);
            if (this.state.isTimeOptionsOpen && !(clickedOnToggle || clickedWithinMenu)) {
                this.onToggle(false);
            }
        };
        this.handleGlobalKeys = (event) => {
            var _a, _b, _c, _d;
            const { isTimeOptionsOpen, focusedIndex, scrollIndex } = this.state;
            // keyboard pressed while focus on toggle
            if ((_b = (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.contains(event.target)) {
                if (!isTimeOptionsOpen && event.key !== KeyTypes.Tab && event.key !== KeyTypes.Escape) {
                    this.onToggle(true);
                }
                else if (isTimeOptionsOpen) {
                    if (event.key === KeyTypes.Escape || event.key === KeyTypes.Tab) {
                        this.onToggle(false);
                    }
                    else if (event.key === KeyTypes.Enter) {
                        if (focusedIndex !== null) {
                            this.focusSelection(focusedIndex);
                            event.stopPropagation();
                        }
                        else {
                            this.onToggle(false);
                        }
                    }
                    else if (event.key === KeyTypes.ArrowDown || event.key === KeyTypes.ArrowUp) {
                        this.focusSelection(scrollIndex);
                        this.updateFocusedIndex(0);
                        event.preventDefault();
                    }
                }
                // keyboard pressed while focus on menu item
            }
            else if ((_d = (_c = this.menuRef) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.contains(event.target)) {
                if (event.key === KeyTypes.ArrowDown) {
                    this.updateFocusedIndex(1);
                    event.preventDefault();
                }
                else if (event.key === KeyTypes.ArrowUp) {
                    this.updateFocusedIndex(-1);
                    event.preventDefault();
                }
                else if (event.key === KeyTypes.Escape || event.key === KeyTypes.Tab) {
                    this.inputRef.current.focus();
                    this.onToggle(false);
                }
            }
        };
        this.updateFocusedIndex = (increment) => {
            this.setState(prevState => {
                const maxIndex = this.getOptions().length - 1;
                let nextIndex = prevState.focusedIndex !== null ? prevState.focusedIndex + increment : prevState.scrollIndex + increment;
                if (nextIndex < 0) {
                    nextIndex = maxIndex;
                }
                else if (nextIndex > maxIndex) {
                    nextIndex = 0;
                }
                this.scrollToIndex(nextIndex);
                return {
                    focusedIndex: nextIndex
                };
            });
        };
        // fixes issue where menutAppendTo="inline" results in the menu item that should be scrolled to being out of view; this will select the menu item that comes before the intended one, causing that before-item to be placed out of view instead
        this.getIndexToScroll = (index) => {
            if (this.props.menuAppendTo === 'inline') {
                return index > 0 ? index - 1 : 0;
            }
            return index;
        };
        this.scrollToIndex = (index) => {
            this.getOptions()[index].closest(`.${menuStyles.menuContent}`).scrollTop = this.getOptions()[this.getIndexToScroll(index)].offsetTop;
        };
        this.focusSelection = (index) => {
            var _a;
            const indexToFocus = index !== -1 ? index : 0;
            if ((_a = this.menuRef) === null || _a === void 0 ? void 0 : _a.current) {
                this.getOptions()[indexToFocus].querySelector(`.${menuStyles.menuItem}`).focus();
            }
        };
        this.scrollToSelection = (time) => {
            const { delimiter, is24Hour } = this.props;
            let splitTime = time.split(this.props.delimiter);
            let focusedIndex = null;
            // build out the rest of the time assuming hh:00 if it's a partial time
            if (splitTime.length < 2) {
                time = `${time}${delimiter}00`;
                splitTime = time.split(delimiter);
                // due to only the input including seconds when includeSeconds=true, we need to build a temporary time here without those seconds so that an exact or close match can be scrolled to within the menu (which does not include seconds in any of the options)
            }
            else if (splitTime.length > 2) {
                time = parseTime(time, this.state.timeRegex, delimiter, !is24Hour, false);
                splitTime = time.split(delimiter);
            }
            // for 12hr variant, autoscroll to pm if it's currently the afternoon, otherwise autoscroll to am
            if (!is24Hour && splitTime.length > 1 && splitTime[1].length < 2) {
                const minutes = splitTime[1].length === 0 ? '00' : splitTime[1] + '0';
                time = `${splitTime[0]}${delimiter}${minutes}${new Date().getHours() > 11 ? pmSuffix : amSuffix}`;
            }
            else if (!is24Hour &&
                splitTime.length > 1 &&
                splitTime[1].length === 2 &&
                !time.toUpperCase().includes(amSuffix.toUpperCase().trim()) &&
                !time.toUpperCase().includes(pmSuffix.toUpperCase().trim())) {
                time = `${time}${new Date().getHours() > 11 ? pmSuffix : amSuffix}`;
            }
            let scrollIndex = this.getOptions().findIndex(option => option.innerText === time);
            // if we found an exact match, scroll to match and return index of match for focus
            if (scrollIndex !== -1) {
                this.scrollToIndex(scrollIndex);
                focusedIndex = scrollIndex;
            }
            else if (splitTime.length === 2) {
                // no exact match, scroll to closest hour but don't return index for focus
                let amPm = '';
                if (!is24Hour) {
                    if (splitTime[1].toUpperCase().includes('P')) {
                        amPm = pmSuffix;
                    }
                    else if (splitTime[1].toUpperCase().includes('A')) {
                        amPm = amSuffix;
                    }
                }
                time = `${splitTime[0]}${delimiter}00${amPm}`;
                scrollIndex = this.getOptions().findIndex(option => option.innerText === time);
                if (scrollIndex !== -1) {
                    this.scrollToIndex(scrollIndex);
                }
            }
            this.setState({
                focusedIndex,
                scrollIndex
            });
        };
        this.getRegExp = (includeSeconds = true) => {
            const { is24Hour, delimiter } = this.props;
            let baseRegex = `\\s*(\\d\\d?)${delimiter}([0-5]\\d)`;
            if (includeSeconds) {
                baseRegex += `${delimiter}?([0-5]\\d)?`;
            }
            return new RegExp(`^${baseRegex}${is24Hour ? '' : '\\s*([AaPp][Mm])?'}\\s*$`);
        };
        this.getOptions = () => {
            var _a;
            return (((_a = this.menuRef) === null || _a === void 0 ? void 0 : _a.current)
                ? Array.from(this.menuRef.current.querySelectorAll(`.${menuStyles.menuListItem}`))
                : []);
        };
        this.isValidFormat = (time) => {
            if (this.props.validateTime) {
                return this.props.validateTime(time);
            }
            const { delimiter, is24Hour, includeSeconds } = this.props;
            return validateTime(time, this.getRegExp(includeSeconds), delimiter, !is24Hour);
        };
        this.isValidTime = (time) => {
            const { delimiter, includeSeconds } = this.props;
            const { minTimeState, maxTimeState } = this.state;
            return isWithinMinMax(minTimeState, maxTimeState, time, delimiter, includeSeconds);
        };
        this.isValid = (time) => this.isValidFormat(time) && this.isValidTime(time);
        this.onToggle = (isOpen) => {
            // on close, parse and validate input
            this.setState(prevState => {
                const { timeRegex, isInvalid } = prevState;
                const { delimiter, is24Hour, includeSeconds } = this.props;
                const time = parseTime(prevState.timeState, timeRegex, delimiter, !is24Hour, includeSeconds);
                return {
                    isTimeOptionsOpen: isOpen,
                    timeState: time,
                    isInvalid: isOpen ? isInvalid : !this.isValid(time)
                };
            });
            this.props.setIsOpen(isOpen);
            if (!isOpen) {
                this.inputRef.current.focus();
            }
        };
        this.onSelect = (e) => {
            const { timeRegex, timeState } = this.state;
            const { delimiter, is24Hour, includeSeconds, setIsOpen } = this.props;
            const time = parseTime(e.target.textContent, timeRegex, delimiter, !is24Hour, includeSeconds);
            if (time !== timeState) {
                this.onInputChange(time);
            }
            this.inputRef.current.focus();
            this.setState({
                isTimeOptionsOpen: false,
                isInvalid: false
            });
            setIsOpen(false);
        };
        this.onInputClick = (e) => {
            if (!this.state.isTimeOptionsOpen) {
                this.onToggle(true);
            }
            e.stopPropagation();
        };
        this.onInputChange = (newTime) => {
            const { onChange } = this.props;
            const { timeRegex } = this.state;
            if (onChange) {
                onChange(newTime, getHours(newTime, timeRegex), getMinutes(newTime, timeRegex), getSeconds(newTime, timeRegex), this.isValid(newTime));
            }
            this.scrollToSelection(newTime);
            this.setState({
                timeState: newTime
            });
        };
        this.onBlur = (event) => {
            const { timeRegex } = this.state;
            const { delimiter, is24Hour, includeSeconds } = this.props;
            const time = parseTime(event.currentTarget.value, timeRegex, delimiter, !is24Hour, includeSeconds);
            this.setState({
                isInvalid: !this.isValid(time)
            });
        };
        const { is24Hour, delimiter, time, includeSeconds, isOpen } = this.props;
        let { minTime, maxTime } = this.props;
        if (minTime === '') {
            const minSeconds = includeSeconds ? `${delimiter}00` : '';
            minTime = is24Hour ? `00${delimiter}00${minSeconds}` : `12${delimiter}00${minSeconds} AM`;
        }
        if (maxTime === '') {
            const maxSeconds = includeSeconds ? `${delimiter}59` : '';
            maxTime = is24Hour ? `23${delimiter}59${maxSeconds}` : `11${delimiter}59${maxSeconds} PM`;
        }
        const timeRegex = this.getRegExp();
        this.state = {
            isInvalid: false,
            isTimeOptionsOpen: isOpen,
            timeState: parseTime(time, timeRegex, delimiter, !is24Hour, includeSeconds),
            focusedIndex: null,
            scrollIndex: 0,
            timeRegex,
            minTimeState: parseTime(minTime, timeRegex, delimiter, !is24Hour, includeSeconds),
            maxTimeState: parseTime(maxTime, timeRegex, delimiter, !is24Hour, includeSeconds)
        };
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.onDocClick);
        document.addEventListener('touchstart', this.onDocClick);
        document.addEventListener('keydown', this.handleGlobalKeys);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onDocClick);
        document.removeEventListener('touchstart', this.onDocClick);
        document.removeEventListener('keydown', this.handleGlobalKeys);
    }
    componentDidUpdate(prevProps, prevState) {
        const { timeState, isTimeOptionsOpen, isInvalid, timeRegex } = this.state;
        const { time, is24Hour, delimiter, includeSeconds, isOpen } = this.props;
        if (prevProps.isOpen !== isOpen) {
            this.onToggle(isOpen);
        }
        if (isTimeOptionsOpen && !prevState.isTimeOptionsOpen && timeState && !isInvalid) {
            this.scrollToSelection(timeState);
        }
        if (delimiter !== prevProps.delimiter) {
            this.setState({
                timeRegex: this.getRegExp()
            });
        }
        if (time !== '' && time !== prevProps.time) {
            this.setState({
                timeState: parseTime(time, timeRegex, delimiter, !is24Hour, includeSeconds)
            });
        }
    }
    render() {
        const _a = this.props, { 'aria-label': ariaLabel, isDisabled, className, placeholder, id, menuAppendTo, is24Hour, invalidFormatErrorMessage, invalidMinMaxErrorMessage, stepMinutes, width, delimiter, inputProps, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        onChange, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        setIsOpen, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        isOpen, time, validateTime, minTime, maxTime, includeSeconds } = _a, 
        /* eslint-enable @typescript-eslint/no-unused-vars */
        props = __rest(_a, ['aria-label', "isDisabled", "className", "placeholder", "id", "menuAppendTo", "is24Hour", "invalidFormatErrorMessage", "invalidMinMaxErrorMessage", "stepMinutes", "width", "delimiter", "inputProps", "onChange", "setIsOpen", "isOpen", "time", "validateTime", "minTime", "maxTime", "includeSeconds"]);
        const { timeState, isTimeOptionsOpen, isInvalid, minTimeState, maxTimeState } = this.state;
        const style = { '--pf-c-date-picker__input--c-form-control--Width': width };
        const options = makeTimeOptions(stepMinutes, !is24Hour, delimiter, minTimeState, maxTimeState, includeSeconds);
        const isValidFormat = this.isValidFormat(timeState);
        const randomId = id || getUniqueId('time-picker');
        const getParentElement = () => {
            if (this.baseComponentRef && this.baseComponentRef.current) {
                return this.baseComponentRef.current.parentElement;
            }
            return null;
        };
        const menuContainer = (react.createElement(Menu, { ref: this.menuRef, isScrollable: true },
            react.createElement(MenuContent, { maxMenuHeight: "200px" },
                react.createElement(MenuList, { "aria-label": ariaLabel }, options.map((option, index) => (react.createElement(MenuItem, { onClick: this.onSelect, key: option, id: `${randomId}-option-${index}` }, option)))))));
        const textInput = (react.createElement(TextInput, Object.assign({ "aria-haspopup": "menu", className: css(formStyles$1.formControl), id: `${randomId}-input`, "aria-label": ariaLabel, validated: isInvalid ? 'error' : 'default', placeholder: placeholder, value: timeState || '', type: "text", iconVariant: "clock", onClick: this.onInputClick, onChange: this.onInputChange, onBlur: this.onBlur, autoComplete: "off", isDisabled: isDisabled, ref: this.inputRef }, inputProps)));
        return (react.createElement("div", { ref: this.baseComponentRef, className: css(datePickerStyles.datePicker, className) },
            react.createElement("div", Object.assign({ className: css(datePickerStyles.datePickerInput), style: style }, props),
                react.createElement(InputGroup, null,
                    react.createElement("div", { id: randomId },
                        react.createElement("div", { ref: this.toggleRef, style: { paddingLeft: '0' } }, menuAppendTo !== 'inline' ? (react.createElement(Popper, { appendTo: menuAppendTo === 'parent' ? getParentElement() : menuAppendTo, trigger: textInput, popper: menuContainer, isVisible: isTimeOptionsOpen })) : (textInput)),
                        isTimeOptionsOpen && menuAppendTo === 'inline' && menuContainer)),
                isInvalid && (react.createElement("div", { className: css(datePickerStyles.datePickerHelperText, datePickerStyles.modifiers.error) }, !isValidFormat ? invalidFormatErrorMessage : invalidMinMaxErrorMessage)))));
    }
}
TimePicker.displayName = 'TimePicker';
TimePicker.defaultProps = {
    className: '',
    isDisabled: false,
    time: '',
    is24Hour: false,
    invalidFormatErrorMessage: 'Invalid time format',
    invalidMinMaxErrorMessage: 'Invalid time entered',
    placeholder: 'hh:mm',
    delimiter: ':',
    'aria-label': 'Time picker',
    width: '150px',
    menuAppendTo: 'inline',
    stepMinutes: 30,
    inputProps: {},
    minTime: '',
    maxTime: '',
    setIsOpen: () => { }
};

import('../common/toggle-group-7d1b4873.js');
var styles$z = {
  modifiers: {
    compact: "pf-m-compact",
    selected: "pf-m-selected",
    disabled: "pf-m-disabled"
  },
  themeDark: "pf-theme-dark",
  toggleGroup: "pf-c-toggle-group",
  toggleGroupButton: "pf-c-toggle-group__button",
  toggleGroupIcon: "pf-c-toggle-group__icon",
  toggleGroupItem: "pf-c-toggle-group__item",
  toggleGroupText: "pf-c-toggle-group__text"
};

var ToggleGroupItemVariant;
(function (ToggleGroupItemVariant) {
    ToggleGroupItemVariant["icon"] = "icon";
    ToggleGroupItemVariant["text"] = "text";
})(ToggleGroupItemVariant || (ToggleGroupItemVariant = {}));
const ToggleGroupItemElement = ({ variant, children }) => (react.createElement("span", { className: css(variant === 'icon' && styles$z.toggleGroupIcon, variant === 'text' && styles$z.toggleGroupText) }, children));
ToggleGroupItemElement.displayName = 'ToggleGroupItemElement';

const ToggleGroupItem = (_a) => {
    var { text, icon, className, isDisabled = false, isSelected = false, 'aria-label': ariaLabel = '', onChange = () => { }, buttonId = '' } = _a, props = __rest(_a, ["text", "icon", "className", "isDisabled", "isSelected", 'aria-label', "onChange", "buttonId"]);
    const handleChange = (event) => {
        onChange(!isSelected, event);
    };
    if (!ariaLabel && icon && !text) {
        /* eslint-disable no-console */
        console.warn('An accessible aria-label is required when using the toggle group item icon variant.');
    }
    return (react.createElement("div", Object.assign({ className: css(styles$z.toggleGroupItem, className) }, props),
        react.createElement("button", Object.assign({ type: "button", className: css(styles$z.toggleGroupButton, isSelected && styles$z.modifiers.selected), "aria-pressed": isSelected, onClick: handleChange }, (ariaLabel && { 'aria-label': ariaLabel }), (isDisabled && { disabled: true }), (buttonId && { id: buttonId })),
            icon ? react.createElement(ToggleGroupItemElement, { variant: ToggleGroupItemVariant.icon }, icon) : null,
            text ? react.createElement(ToggleGroupItemElement, { variant: ToggleGroupItemVariant.text }, text) : null)));
};
ToggleGroupItem.displayName = 'ToggleGroupItem';

const ToggleGroup = (_a) => {
    var { className, children, isCompact = false, areAllGroupsDisabled = false, 'aria-label': ariaLabel } = _a, props = __rest(_a, ["className", "children", "isCompact", "areAllGroupsDisabled", 'aria-label']);
    const toggleGroupItemList = react.Children.map(children, child => {
        const childCompName = child.type.name;
        return childCompName !== ToggleGroupItem.name
            ? child
            : react.cloneElement(child, areAllGroupsDisabled ? { isDisabled: true } : {});
    });
    return (react.createElement("div", Object.assign({ className: css(styles$z.toggleGroup, isCompact && styles$z.modifiers.compact, className), role: "group", "aria-label": ariaLabel }, props), toggleGroupItemList));
};
ToggleGroup.displayName = 'ToggleGroup';

import('../common/toolbar-c7c40778.js');
var styles$A = {
  button: "pf-c-button",
  chipGroup: "pf-c-chip-group",
  divider: "pf-c-divider",
  modifiers: {
    hidden: "pf-m-hidden",
    hiddenOnSm: "pf-m-hidden-on-sm",
    visibleOnSm: "pf-m-visible-on-sm",
    hiddenOnMd: "pf-m-hidden-on-md",
    visibleOnMd: "pf-m-visible-on-md",
    hiddenOnLg: "pf-m-hidden-on-lg",
    visibleOnLg: "pf-m-visible-on-lg",
    hiddenOnXl: "pf-m-hidden-on-xl",
    visibleOnXl: "pf-m-visible-on-xl",
    hiddenOn_2xl: "pf-m-hidden-on-2xl",
    visibleOn_2xl: "pf-m-visible-on-2xl",
    pageInsets: "pf-m-page-insets",
    sticky: "pf-m-sticky",
    fullHeight: "pf-m-full-height",
    static: "pf-m-static",
    vertical: "pf-m-vertical",
    buttonGroup: "pf-m-button-group",
    iconButtonGroup: "pf-m-icon-button-group",
    filterGroup: "pf-m-filter-group",
    toggleGroup: "pf-m-toggle-group",
    overflowMenu: "pf-m-overflow-menu",
    bulkSelect: "pf-m-bulk-select",
    expandAll: "pf-m-expand-all",
    expanded: "pf-m-expanded",
    searchFilter: "pf-m-search-filter",
    chipGroup: "pf-m-chip-group",
    label: "pf-m-label",
    pagination: "pf-m-pagination",
    overflowContainer: "pf-m-overflow-container",
    chipContainer: "pf-m-chip-container",
    plain: "pf-m-plain",
    show: "pf-m-show",
    showOnSm: "pf-m-show-on-sm",
    showOnMd: "pf-m-show-on-md",
    showOnLg: "pf-m-show-on-lg",
    showOnXl: "pf-m-show-on-xl",
    showOn_2xl: "pf-m-show-on-2xl",
    alignRight: "pf-m-align-right",
    alignLeft: "pf-m-align-left",
    nowrap: "pf-m-nowrap",
    wrap: "pf-m-wrap",
    alignRightOnSm: "pf-m-align-right-on-sm",
    alignLeftOnSm: "pf-m-align-left-on-sm",
    nowrapOnSm: "pf-m-nowrap-on-sm",
    wrapOnSm: "pf-m-wrap-on-sm",
    alignRightOnMd: "pf-m-align-right-on-md",
    alignLeftOnMd: "pf-m-align-left-on-md",
    nowrapOnMd: "pf-m-nowrap-on-md",
    wrapOnMd: "pf-m-wrap-on-md",
    alignRightOnLg: "pf-m-align-right-on-lg",
    alignLeftOnLg: "pf-m-align-left-on-lg",
    nowrapOnLg: "pf-m-nowrap-on-lg",
    wrapOnLg: "pf-m-wrap-on-lg",
    alignRightOnXl: "pf-m-align-right-on-xl",
    alignLeftOnXl: "pf-m-align-left-on-xl",
    nowrapOnXl: "pf-m-nowrap-on-xl",
    wrapOnXl: "pf-m-wrap-on-xl",
    alignRightOn_2xl: "pf-m-align-right-on-2xl",
    alignLeftOn_2xl: "pf-m-align-left-on-2xl",
    nowrapOn_2xl: "pf-m-nowrap-on-2xl",
    wrapOn_2xl: "pf-m-wrap-on-2xl",
    spaceItemsNone: "pf-m-space-items-none",
    spaceItemsSm: "pf-m-space-items-sm",
    spaceItemsMd: "pf-m-space-items-md",
    spaceItemsLg: "pf-m-space-items-lg",
    spaceItemsNoneOnSm: "pf-m-space-items-none-on-sm",
    spaceItemsSmOnSm: "pf-m-space-items-sm-on-sm",
    spaceItemsMdOnSm: "pf-m-space-items-md-on-sm",
    spaceItemsLgOnSm: "pf-m-space-items-lg-on-sm",
    spaceItemsNoneOnMd: "pf-m-space-items-none-on-md",
    spaceItemsSmOnMd: "pf-m-space-items-sm-on-md",
    spaceItemsMdOnMd: "pf-m-space-items-md-on-md",
    spaceItemsLgOnMd: "pf-m-space-items-lg-on-md",
    spaceItemsNoneOnLg: "pf-m-space-items-none-on-lg",
    spaceItemsSmOnLg: "pf-m-space-items-sm-on-lg",
    spaceItemsMdOnLg: "pf-m-space-items-md-on-lg",
    spaceItemsLgOnLg: "pf-m-space-items-lg-on-lg",
    spaceItemsNoneOnXl: "pf-m-space-items-none-on-xl",
    spaceItemsSmOnXl: "pf-m-space-items-sm-on-xl",
    spaceItemsMdOnXl: "pf-m-space-items-md-on-xl",
    spaceItemsLgOnXl: "pf-m-space-items-lg-on-xl",
    spaceItemsNoneOn_2xl: "pf-m-space-items-none-on-2xl",
    spaceItemsSmOn_2xl: "pf-m-space-items-sm-on-2xl",
    spaceItemsMdOn_2xl: "pf-m-space-items-md-on-2xl",
    spaceItemsLgOn_2xl: "pf-m-space-items-lg-on-2xl",
    spacerNone: "pf-m-spacer-none",
    spacerSm: "pf-m-spacer-sm",
    spacerMd: "pf-m-spacer-md",
    spacerLg: "pf-m-spacer-lg",
    spacerNoneOnSm: "pf-m-spacer-none-on-sm",
    spacerSmOnSm: "pf-m-spacer-sm-on-sm",
    spacerMdOnSm: "pf-m-spacer-md-on-sm",
    spacerLgOnSm: "pf-m-spacer-lg-on-sm",
    spacerNoneOnMd: "pf-m-spacer-none-on-md",
    spacerSmOnMd: "pf-m-spacer-sm-on-md",
    spacerMdOnMd: "pf-m-spacer-md-on-md",
    spacerLgOnMd: "pf-m-spacer-lg-on-md",
    spacerNoneOnLg: "pf-m-spacer-none-on-lg",
    spacerSmOnLg: "pf-m-spacer-sm-on-lg",
    spacerMdOnLg: "pf-m-spacer-md-on-lg",
    spacerLgOnLg: "pf-m-spacer-lg-on-lg",
    spacerNoneOnXl: "pf-m-spacer-none-on-xl",
    spacerSmOnXl: "pf-m-spacer-sm-on-xl",
    spacerMdOnXl: "pf-m-spacer-md-on-xl",
    spacerLgOnXl: "pf-m-spacer-lg-on-xl",
    spacerNoneOn_2xl: "pf-m-spacer-none-on-2xl",
    spacerSmOn_2xl: "pf-m-spacer-sm-on-2xl",
    spacerMdOn_2xl: "pf-m-spacer-md-on-2xl",
    spacerLgOn_2xl: "pf-m-spacer-lg-on-2xl",
    insetNone: "pf-m-inset-none",
    insetSm: "pf-m-inset-sm",
    insetMd: "pf-m-inset-md",
    insetLg: "pf-m-inset-lg",
    insetXl: "pf-m-inset-xl",
    inset_2xl: "pf-m-inset-2xl",
    insetNoneOnSm: "pf-m-inset-none-on-sm",
    insetSmOnSm: "pf-m-inset-sm-on-sm",
    insetMdOnSm: "pf-m-inset-md-on-sm",
    insetLgOnSm: "pf-m-inset-lg-on-sm",
    insetXlOnSm: "pf-m-inset-xl-on-sm",
    inset_2xlOnSm: "pf-m-inset-2xl-on-sm",
    insetNoneOnMd: "pf-m-inset-none-on-md",
    insetSmOnMd: "pf-m-inset-sm-on-md",
    insetMdOnMd: "pf-m-inset-md-on-md",
    insetLgOnMd: "pf-m-inset-lg-on-md",
    insetXlOnMd: "pf-m-inset-xl-on-md",
    inset_2xlOnMd: "pf-m-inset-2xl-on-md",
    insetNoneOnLg: "pf-m-inset-none-on-lg",
    insetSmOnLg: "pf-m-inset-sm-on-lg",
    insetMdOnLg: "pf-m-inset-md-on-lg",
    insetLgOnLg: "pf-m-inset-lg-on-lg",
    insetXlOnLg: "pf-m-inset-xl-on-lg",
    inset_2xlOnLg: "pf-m-inset-2xl-on-lg",
    insetNoneOnXl: "pf-m-inset-none-on-xl",
    insetSmOnXl: "pf-m-inset-sm-on-xl",
    insetMdOnXl: "pf-m-inset-md-on-xl",
    insetLgOnXl: "pf-m-inset-lg-on-xl",
    insetXlOnXl: "pf-m-inset-xl-on-xl",
    inset_2xlOnXl: "pf-m-inset-2xl-on-xl",
    insetNoneOn_2xl: "pf-m-inset-none-on-2xl",
    insetSmOn_2xl: "pf-m-inset-sm-on-2xl",
    insetMdOn_2xl: "pf-m-inset-md-on-2xl",
    insetLgOn_2xl: "pf-m-inset-lg-on-2xl",
    insetXlOn_2xl: "pf-m-inset-xl-on-2xl",
    inset_2xlOn_2xl: "pf-m-inset-2xl-on-2xl"
  },
  pagination: "pf-c-pagination",
  toolbar: "pf-c-toolbar",
  toolbarContent: "pf-c-toolbar__content",
  toolbarContentSection: "pf-c-toolbar__content-section",
  toolbarExpandAllIcon: "pf-c-toolbar__expand-all-icon",
  toolbarExpandableContent: "pf-c-toolbar__expandable-content",
  toolbarGroup: "pf-c-toolbar__group",
  toolbarItem: "pf-c-toolbar__item",
  toolbarToggle: "pf-c-toolbar__toggle"
};

const ToolbarContext = react.createContext({
    isExpanded: false,
    toggleIsExpanded: () => { },
    chipGroupContentRef: null,
    updateNumberFilters: () => { },
    numberOfFilters: 0,
    clearAllFilters: () => { }
});
const ToolbarContentContext = react.createContext({
    expandableContentRef: null,
    expandableContentId: '',
    chipContainerRef: null
});
const globalBreakpoints = {
    md: parseInt(global_breakpoint_md.value),
    lg: parseInt(global_breakpoint_lg.value),
    xl: parseInt(global_breakpoint_xl.value),
    '2xl': parseInt(global_breakpoint_2xl.value)
};

var ToolbarItemVariant;
(function (ToolbarItemVariant) {
    ToolbarItemVariant["separator"] = "separator";
    ToolbarItemVariant["bulk-select"] = "bulk-select";
    ToolbarItemVariant["overflow-menu"] = "overflow-menu";
    ToolbarItemVariant["pagination"] = "pagination";
    ToolbarItemVariant["search-filter"] = "search-filter";
    ToolbarItemVariant["label"] = "label";
    ToolbarItemVariant["chip-group"] = "chip-group";
    ToolbarItemVariant["expand-all"] = "expand-all";
})(ToolbarItemVariant || (ToolbarItemVariant = {}));
const ToolbarItem = (_a) => {
    var { className, variant, visibility, visiblity, alignment, spacer, widths, id, children, isAllExpanded } = _a, props = __rest(_a, ["className", "variant", "visibility", "visiblity", "alignment", "spacer", "widths", "id", "children", "isAllExpanded"]);
    if (variant === ToolbarItemVariant.separator) {
        return react.createElement(Divider, Object.assign({ className: css(styles$A.modifiers.vertical, className) }, props));
    }
    if (visiblity !== undefined) {
        // eslint-disable-next-line no-console
        console.warn('The ToolbarItem visiblity prop has been deprecated. ' +
            'Please use the correctly spelled visibility prop instead.');
    }
    const widthStyles = {};
    if (widths) {
        Object.entries(widths || {}).map(([breakpoint, value]) => (widthStyles[`--pf-c-toolbar__item--Width${breakpoint !== 'default' ? `-on-${breakpoint}` : ''}`] = value));
    }
    return (react.createElement(PageContext.Consumer, null, ({ width, getBreakpoint }) => (react.createElement("div", Object.assign({ className: css(styles$A.toolbarItem, variant &&
            styles$A.modifiers[toCamel(variant)], isAllExpanded && styles$A.modifiers.expanded, formatBreakpointMods(visibility || visiblity, styles$A, '', getBreakpoint(width)), formatBreakpointMods(alignment, styles$A, '', getBreakpoint(width)), formatBreakpointMods(spacer, styles$A, '', getBreakpoint(width)), className) }, (variant === 'label' && { 'aria-hidden': true }), { id: id }, props, (widths && { style: Object.assign(Object.assign({}, widthStyles), props.style) })), children))));
};
ToolbarItem.displayName = 'ToolbarItem';

var ToolbarGroupVariant;
(function (ToolbarGroupVariant) {
    ToolbarGroupVariant["filter-group"] = "filter-group";
    ToolbarGroupVariant["icon-button-group"] = "icon-button-group";
    ToolbarGroupVariant["button-group"] = "button-group";
})(ToolbarGroupVariant || (ToolbarGroupVariant = {}));
class ToolbarGroupWithRef extends react.Component {
    render() {
        const _a = this.props, { visibility, visiblity, alignment, spacer, spaceItems, className, variant, children, innerRef } = _a, props = __rest(_a, ["visibility", "visiblity", "alignment", "spacer", "spaceItems", "className", "variant", "children", "innerRef"]);
        if (visiblity !== undefined) {
            // eslint-disable-next-line no-console
            console.warn('The ToolbarGroup visiblity prop has been deprecated. ' +
                'Please use the correctly spelled visibility prop instead.');
        }
        return (react.createElement(PageContext.Consumer, null, ({ width, getBreakpoint }) => (react.createElement("div", Object.assign({ className: css(styles$A.toolbarGroup, variant && styles$A.modifiers[toCamel(variant)], formatBreakpointMods(visibility || visiblity, styles$A, '', getBreakpoint(width)), formatBreakpointMods(alignment, styles$A, '', getBreakpoint(width)), formatBreakpointMods(spacer, styles$A, '', getBreakpoint(width)), formatBreakpointMods(spaceItems, styles$A, '', getBreakpoint(width)), className) }, props, { ref: innerRef }), children))));
    }
}
const ToolbarGroup = react.forwardRef((props, ref) => (react.createElement(ToolbarGroupWithRef, Object.assign({}, props, { innerRef: ref }))));

class ToolbarChipGroupContent extends react.Component {
    render() {
        const _a = this.props, { className, isExpanded, chipGroupContentRef, clearAllFilters, showClearFiltersButton, clearFiltersButtonText, collapseListedFiltersBreakpoint, numberOfFilters, numberOfFiltersText, customChipGroupContent } = _a, props = __rest(_a, ["className", "isExpanded", "chipGroupContentRef", "clearAllFilters", "showClearFiltersButton", "clearFiltersButtonText", "collapseListedFiltersBreakpoint", "numberOfFilters", "numberOfFiltersText", "customChipGroupContent"]);
        const clearChipGroups = () => {
            clearAllFilters();
        };
        let collapseListedFilters = false;
        if (collapseListedFiltersBreakpoint === 'all') {
            collapseListedFilters = true;
        }
        else if (canUseDOM) {
            collapseListedFilters =
                (canUseDOM ? window.innerWidth : 1200) < globalBreakpoints[collapseListedFiltersBreakpoint];
        }
        return (react.createElement("div", Object.assign({ className: css(styles$A.toolbarContent, (numberOfFilters === 0 || isExpanded) && styles$A.modifiers.hidden, className) }, ((numberOfFilters === 0 || isExpanded) && { hidden: true }), { ref: chipGroupContentRef }, props),
            react.createElement(ToolbarGroup, Object.assign({ className: css(collapseListedFilters && styles$A.modifiers.hidden) }, (collapseListedFilters && { hidden: true }), (collapseListedFilters && { 'aria-hidden': true }))),
            collapseListedFilters && numberOfFilters > 0 && !isExpanded && (react.createElement(ToolbarGroup, null,
                react.createElement(ToolbarItem, null, numberOfFiltersText(numberOfFilters)))),
            showClearFiltersButton && !isExpanded && !customChipGroupContent && (react.createElement(ToolbarItem, null,
                react.createElement(Button, { variant: "link", onClick: clearChipGroups, isInline: true }, clearFiltersButtonText))),
            customChipGroupContent && customChipGroupContent));
    }
}
ToolbarChipGroupContent.displayName = 'ToolbarChipGroupContent';
ToolbarChipGroupContent.defaultProps = {
    clearFiltersButtonText: 'Clear all filters',
    collapseListedFiltersBreakpoint: 'lg',
    numberOfFiltersText: (numberOfFilters) => `${numberOfFilters} filters applied`
};

class Toolbar extends react.Component {
    constructor() {
        super(...arguments);
        this.chipGroupContentRef = react.createRef();
        this.staticFilterInfo = {};
        this.state = {
            isManagedToggleExpanded: false,
            filterInfo: {},
            windowWidth: canUseDOM ? window.innerWidth : 1200,
            ouiaStateId: getDefaultOUIAId(Toolbar.displayName)
        };
        this.isToggleManaged = () => !(this.props.isExpanded || !!this.props.toggleIsExpanded);
        this.toggleIsExpanded = () => {
            this.setState(prevState => ({
                isManagedToggleExpanded: !prevState.isManagedToggleExpanded
            }));
        };
        this.closeExpandableContent = (e) => {
            if (e.target.innerWidth !== this.state.windowWidth) {
                this.setState(() => ({
                    isManagedToggleExpanded: false,
                    windowWidth: e.target.innerWidth
                }));
            }
        };
        this.updateNumberFilters = (categoryName, numberOfFilters) => {
            const filterInfoToUpdate = Object.assign({}, this.staticFilterInfo);
            if (!filterInfoToUpdate.hasOwnProperty(categoryName) || filterInfoToUpdate[categoryName] !== numberOfFilters) {
                filterInfoToUpdate[categoryName] = numberOfFilters;
                this.staticFilterInfo = filterInfoToUpdate;
                this.setState({ filterInfo: filterInfoToUpdate });
            }
        };
        this.getNumberOfFilters = () => Object.values(this.state.filterInfo).reduce((acc, cur) => acc + cur, 0);
        this.renderToolbar = (randomId) => {
            const _a = this.props, { clearAllFilters, clearFiltersButtonText, collapseListedFiltersBreakpoint, isExpanded: isExpandedProp, toggleIsExpanded, className, children, isFullHeight, isStatic, inset, usePageInsets, isSticky, ouiaId, numberOfFiltersText, customChipGroupContent } = _a, props = __rest(_a, ["clearAllFilters", "clearFiltersButtonText", "collapseListedFiltersBreakpoint", "isExpanded", "toggleIsExpanded", "className", "children", "isFullHeight", "isStatic", "inset", "usePageInsets", "isSticky", "ouiaId", "numberOfFiltersText", "customChipGroupContent"]);
            const { isManagedToggleExpanded } = this.state;
            const isToggleManaged = this.isToggleManaged();
            const isExpanded = isToggleManaged ? isManagedToggleExpanded : isExpandedProp;
            const numberOfFilters = this.getNumberOfFilters();
            const showClearFiltersButton = numberOfFilters > 0;
            return (react.createElement(PageContext.Consumer, null, ({ width, getBreakpoint }) => (react.createElement("div", Object.assign({ className: css(styles$A.toolbar, isFullHeight && styles$A.modifiers.fullHeight, isStatic && styles$A.modifiers.static, usePageInsets && styles$A.modifiers.pageInsets, isSticky && styles$A.modifiers.sticky, formatBreakpointMods(inset, styles$A, '', getBreakpoint(width)), className), id: randomId }, getOUIAProps(Toolbar.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId), props),
                react.createElement(ToolbarContext.Provider, { value: {
                        isExpanded,
                        toggleIsExpanded: isToggleManaged ? this.toggleIsExpanded : toggleIsExpanded,
                        chipGroupContentRef: this.chipGroupContentRef,
                        updateNumberFilters: this.updateNumberFilters,
                        numberOfFilters,
                        clearAllFilters,
                        clearFiltersButtonText,
                        showClearFiltersButton,
                        toolbarId: randomId,
                        customChipGroupContent
                    } },
                    children,
                    react.createElement(ToolbarChipGroupContent, { isExpanded: isExpanded, chipGroupContentRef: this.chipGroupContentRef, clearAllFilters: clearAllFilters, showClearFiltersButton: showClearFiltersButton, clearFiltersButtonText: clearFiltersButtonText, numberOfFilters: numberOfFilters, numberOfFiltersText: numberOfFiltersText, collapseListedFiltersBreakpoint: collapseListedFiltersBreakpoint, customChipGroupContent: customChipGroupContent }))))));
        };
    }
    componentDidMount() {
        if (this.isToggleManaged() && canUseDOM) {
            window.addEventListener('resize', this.closeExpandableContent);
        }
    }
    componentWillUnmount() {
        if (this.isToggleManaged() && canUseDOM) {
            window.removeEventListener('resize', this.closeExpandableContent);
        }
    }
    render() {
        return this.props.id ? (this.renderToolbar(this.props.id)) : (react.createElement(GenerateId, null, randomId => this.renderToolbar(randomId)));
    }
}
Toolbar.displayName = 'Toolbar';

class ToolbarExpandableContent extends react.Component {
    render() {
        const _a = this.props, { className, expandableContentRef, chipContainerRef, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isExpanded, clearAllFilters, clearFiltersButtonText, showClearFiltersButton } = _a, props = __rest(_a, ["className", "expandableContentRef", "chipContainerRef", "isExpanded", "clearAllFilters", "clearFiltersButtonText", "showClearFiltersButton"]);
        const { numberOfFilters, customChipGroupContent } = this.context;
        const clearChipGroups = () => {
            clearAllFilters();
        };
        return (react.createElement("div", Object.assign({ className: css(styles$A.toolbarExpandableContent, className), ref: expandableContentRef }, props),
            react.createElement(ToolbarGroup, null),
            numberOfFilters > 0 && (react.createElement(ToolbarGroup, { className: styles$A.modifiers.chipContainer },
                react.createElement(ToolbarGroup, { ref: chipContainerRef }),
                showClearFiltersButton && !customChipGroupContent && (react.createElement(ToolbarItem, null,
                    react.createElement(Button, { variant: "link", onClick: clearChipGroups, isInline: true }, clearFiltersButtonText))),
                customChipGroupContent && customChipGroupContent))));
    }
}
ToolbarExpandableContent.displayName = 'ToolbarExpandableContent';
ToolbarExpandableContent.contextType = ToolbarContext;
ToolbarExpandableContent.defaultProps = {
    isExpanded: false,
    clearFiltersButtonText: 'Clear all filters'
};

class ToolbarContent extends react.Component {
    constructor() {
        super(...arguments);
        this.expandableContentRef = react.createRef();
        this.chipContainerRef = react.createRef();
    }
    render() {
        const _a = this.props, { className, children, isExpanded, toolbarId, visibility, visiblity, alignment, clearAllFilters, showClearFiltersButton, clearFiltersButtonText } = _a, props = __rest(_a, ["className", "children", "isExpanded", "toolbarId", "visibility", "visiblity", "alignment", "clearAllFilters", "showClearFiltersButton", "clearFiltersButtonText"]);
        if (visiblity !== undefined) {
            // eslint-disable-next-line no-console
            console.warn('The ToolbarContent visiblity prop has been deprecated. ' +
                'Please use the correctly spelled visibility prop instead.');
        }
        return (react.createElement(PageContext.Consumer, null, ({ width, getBreakpoint }) => (react.createElement("div", Object.assign({ className: css(styles$A.toolbarContent, formatBreakpointMods(visibility || visiblity, styles$A, '', getBreakpoint(width)), formatBreakpointMods(alignment, styles$A, '', getBreakpoint(width)), className) }, props),
            react.createElement(ToolbarContext.Consumer, null, ({ clearAllFilters: clearAllFiltersContext, clearFiltersButtonText: clearFiltersButtonContext, showClearFiltersButton: showClearFiltersButtonContext, toolbarId: toolbarIdContext }) => {
                const expandableContentId = `${toolbarId ||
                    toolbarIdContext}-expandable-content-${ToolbarContent.currentId++}`;
                return (react.createElement(ToolbarContentContext.Provider, { value: {
                        expandableContentRef: this.expandableContentRef,
                        expandableContentId,
                        chipContainerRef: this.chipContainerRef
                    } },
                    react.createElement("div", { className: css(styles$A.toolbarContentSection) }, children),
                    react.createElement(ToolbarExpandableContent, { id: expandableContentId, isExpanded: isExpanded, expandableContentRef: this.expandableContentRef, chipContainerRef: this.chipContainerRef, clearAllFilters: clearAllFilters || clearAllFiltersContext, showClearFiltersButton: showClearFiltersButton || showClearFiltersButtonContext, clearFiltersButtonText: clearFiltersButtonText || clearFiltersButtonContext })));
            })))));
    }
}
ToolbarContent.displayName = 'ToolbarContent';
ToolbarContent.currentId = 0;
ToolbarContent.defaultProps = {
    isExpanded: false,
    showClearFiltersButton: false
};

import('../common/number-input-edb2d778.js');
var styles$B = {
  formControl: "pf-c-form-control",
  inputGroup: "pf-c-input-group",
  numberInput: "pf-c-number-input",
  numberInputIcon: "pf-c-number-input__icon",
  numberInputUnit: "pf-c-number-input__unit"
};

const defaultKeyDownHandler = (args) => (event) => {
    if (KEY_CODES.ARROW_UP === event.keyCode && args.onPlus) {
        event.preventDefault();
        args.onPlus(null, args.inputName);
    }
    if (KEY_CODES.ARROW_DOWN === event.keyCode && args.onMinus) {
        event.preventDefault();
        args.onMinus(null, args.inputName);
    }
};
const NumberInput = (_a) => {
    var { value = 0, className, widthChars, isDisabled = false, onMinus = () => { }, onChange, onBlur, onPlus = () => { }, unit, unitPosition = 'after', min, max, inputName, inputAriaLabel = 'Input', minusBtnAriaLabel = 'Minus', plusBtnAriaLabel = 'Plus', inputProps, minusBtnProps, plusBtnProps } = _a, props = __rest(_a, ["value", "className", "widthChars", "isDisabled", "onMinus", "onChange", "onBlur", "onPlus", "unit", "unitPosition", "min", "max", "inputName", "inputAriaLabel", "minusBtnAriaLabel", "plusBtnAriaLabel", "inputProps", "minusBtnProps", "plusBtnProps"]);
    const numberInputUnit = react.createElement("div", { className: css(styles$B.numberInputUnit) }, unit);
    const keyDownHandler = inputProps && inputProps.onKeyDown ? inputProps.onKeyDown : defaultKeyDownHandler({ inputName, onMinus, onPlus });
    return (react.createElement("div", Object.assign({ className: css(styles$B.numberInput, className) }, (widthChars && {
        style: Object.assign({ '--pf-c-number-input--c-form-control--width-chars': widthChars }, props.style)
    }), props),
        unit && unitPosition === 'before' && numberInputUnit,
        react.createElement(InputGroup, null,
            react.createElement(Button, Object.assign({ variant: "control", "aria-label": minusBtnAriaLabel, isDisabled: isDisabled || value <= min, onClick: evt => onMinus(evt, inputName) }, minusBtnProps),
                react.createElement("span", { className: css(styles$B.numberInputIcon) },
                    react.createElement(MinusIcon, { "aria-hidden": "true" }))),
            react.createElement("input", Object.assign({ className: css(styles$B.formControl), type: "number", value: value, name: inputName, "aria-label": inputAriaLabel }, (isDisabled && { disabled: isDisabled }), (onChange && { onChange }), (onBlur && { onBlur }), (!onChange && { readOnly: true }), inputProps, { onKeyDown: keyDownHandler })),
            react.createElement(Button, Object.assign({ variant: "control", "aria-label": plusBtnAriaLabel, isDisabled: isDisabled || value >= max, onClick: evt => onPlus(evt, inputName) }, plusBtnProps),
                react.createElement("span", { className: css(styles$B.numberInputIcon) },
                    react.createElement(PlusIcon, { "aria-hidden": "true" })))),
        unit && unitPosition === 'after' && numberInputUnit));
};
NumberInput.displayName = 'NumberInput';

import('../common/wizard-1f80e3aa.js');
var styles$C = {
  button: "pf-c-button",
  card: "pf-c-card",
  drawer: "pf-c-drawer",
  modalBox: "pf-c-modal-box",
  modifiers: {
    finished: "pf-m-finished",
    expanded: "pf-m-expanded",
    current: "pf-m-current",
    expandable: "pf-m-expandable",
    disabled: "pf-m-disabled",
    noPadding: "pf-m-no-padding"
  },
  pageMainWizard: "pf-c-page__main-wizard",
  themeDark: "pf-theme-dark",
  wizard: "pf-c-wizard",
  wizardClose: "pf-c-wizard__close",
  wizardDescription: "pf-c-wizard__description",
  wizardFooter: "pf-c-wizard__footer",
  wizardFooterCancel: "pf-c-wizard__footer-cancel",
  wizardHeader: "pf-c-wizard__header",
  wizardInnerWrap: "pf-c-wizard__inner-wrap",
  wizardMain: "pf-c-wizard__main",
  wizardMainBody: "pf-c-wizard__main-body",
  wizardNav: "pf-c-wizard__nav",
  wizardNavItem: "pf-c-wizard__nav-item",
  wizardNavLink: "pf-c-wizard__nav-link",
  wizardNavLinkText: "pf-c-wizard__nav-link-text",
  wizardNavLinkToggle: "pf-c-wizard__nav-link-toggle",
  wizardNavLinkToggleIcon: "pf-c-wizard__nav-link-toggle-icon",
  wizardNavList: "pf-c-wizard__nav-list",
  wizardOuterWrap: "pf-c-wizard__outer-wrap",
  wizardTitle: "pf-c-wizard__title",
  wizardToggle: "pf-c-wizard__toggle",
  wizardToggleIcon: "pf-c-wizard__toggle-icon",
  wizardToggleList: "pf-c-wizard__toggle-list",
  wizardToggleListItem: "pf-c-wizard__toggle-list-item",
  wizardToggleNum: "pf-c-wizard__toggle-num",
  wizardToggleSeparator: "pf-c-wizard__toggle-separator"
};

const WizardFooterInternal = ({ onNext, onBack, onClose, isValid, firstStep, activeStep, nextButtonText, backButtonText, cancelButtonText }) => (react.createElement("footer", { className: css(styles$C.wizardFooter) },
    react.createElement(Button, { variant: ButtonVariant.primary, type: "submit", onClick: onNext, isDisabled: !isValid }, nextButtonText),
    !activeStep.hideBackButton && (react.createElement(Button, { variant: ButtonVariant.secondary, onClick: onBack, isDisabled: firstStep }, backButtonText)),
    !activeStep.hideCancelButton && (react.createElement("div", { className: styles$C.wizardFooterCancel },
        react.createElement(Button, { variant: ButtonVariant.link, onClick: onClose }, cancelButtonText)))));
WizardFooterInternal.displayName = 'WizardFooterInternal';

const WizardDrawerWrapper = ({ hasDrawer, wrapper, children }) => (hasDrawer ? wrapper(children) : children);
WizardDrawerWrapper.displayName = 'WizardDrawerWrapper';

const WizardBody = ({ children, hasNoBodyPadding = false, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, mainComponent = 'div', hasDrawer, isDrawerExpanded, activeStep }) => {
    const MainComponent = mainComponent;
    return (react.createElement(MainComponent, { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, className: css(styles$C.wizardMain) },
        react.createElement(WizardDrawerWrapper, { hasDrawer: hasDrawer && activeStep.drawerPanelContent, wrapper: (children) => (react.createElement(Drawer, { isInline: true, isExpanded: isDrawerExpanded },
                react.createElement(DrawerContent, { panelContent: activeStep.drawerPanelContent }, children))) },
            react.createElement("div", { className: css(styles$C.wizardMainBody, hasNoBodyPadding && styles$C.modifiers.noPadding) }, children))));
};
WizardBody.displayName = 'WizardBody';

const WizardToggle = ({ isNavOpen, onNavToggle, nav, steps, activeStep, children, hasNoBodyPadding = false, 'aria-label': ariaLabel = 'Wizard Toggle', mainAriaLabelledBy = null, mainAriaLabel = null, isInPage = true, hasDrawer, isDrawerExpanded }) => {
    let activeStepIndex;
    let activeStepName;
    let activeStepSubName;
    for (let i = 0; i < steps.length; i++) {
        if ((activeStep.id && steps[i].id === activeStep.id) || steps[i].name === activeStep.name) {
            activeStepIndex = i + 1;
            activeStepName = steps[i].name;
            break;
        }
        else if (steps[i].steps) {
            for (const step of steps[i].steps) {
                if ((activeStep.id && step.id === activeStep.id) || step.name === activeStep.name) {
                    activeStepIndex = i + 1;
                    activeStepName = steps[i].name;
                    activeStepSubName = step.name;
                    break;
                }
            }
        }
    }
    return (react.createElement(react.Fragment, null,
        react.createElement("button", { onClick: () => onNavToggle(!isNavOpen), className: css(styles$C.wizardToggle, isNavOpen && 'pf-m-expanded'), "aria-label": ariaLabel, "aria-expanded": isNavOpen },
            react.createElement("span", { className: css(styles$C.wizardToggleList) },
                react.createElement("span", { className: css(styles$C.wizardToggleListItem) },
                    react.createElement("span", { className: css(styles$C.wizardToggleNum) }, activeStepIndex),
                    " ",
                    activeStepName,
                    activeStepSubName && react.createElement(AngleRightIcon, { className: css(styles$C.wizardToggleSeparator), "aria-hidden": "true" })),
                activeStepSubName && react.createElement("span", { className: css(styles$C.wizardToggleListItem) }, activeStepSubName)),
            react.createElement("span", { className: css(styles$C.wizardToggleIcon) },
                react.createElement(CaretDownIcon, { "aria-hidden": "true" }))),
        react.createElement("div", { className: css(styles$C.wizardOuterWrap) },
            react.createElement("div", { className: css(styles$C.wizardInnerWrap) },
                nav(isNavOpen),
                react.createElement(WizardBody, { mainComponent: isInPage ? 'div' : 'main', "aria-label": mainAriaLabel, "aria-labelledby": mainAriaLabelledBy, hasNoBodyPadding: hasNoBodyPadding, activeStep: activeStep, isDrawerExpanded: isDrawerExpanded, hasDrawer: hasDrawer },
                    hasDrawer && !isDrawerExpanded && activeStep.drawerToggleButton,
                    activeStep.component)),
            children)));
};
WizardToggle.displayName = 'WizardToggle';

const WizardNav = ({ children, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, isOpen = false, returnList = false }) => {
    const innerList = react.createElement("ol", { className: css(styles$C.wizardNavList) }, children);
    if (returnList) {
        return innerList;
    }
    return (react.createElement("nav", { className: css(styles$C.wizardNav, isOpen && styles$C.modifiers.expanded), "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy },
        react.createElement("ol", { className: css(styles$C.wizardNavList) }, children)));
};
WizardNav.displayName = 'WizardNav';

const WizardNavItem = (_a) => {
    var { children = null, content = '', isCurrent = false, isDisabled = false, step, onNavItemClick = () => undefined, navItemComponent = 'button', href = null, isExpandable = false, id } = _a, rest = __rest(_a, ["children", "content", "isCurrent", "isDisabled", "step", "onNavItemClick", "navItemComponent", "href", "isExpandable", "id"]);
    const NavItemComponent = navItemComponent;
    const [isExpanded, setIsExpanded] = react.useState(false);
    react.useEffect(() => {
        setIsExpanded(isCurrent);
    }, [isCurrent]);
    if (navItemComponent === 'a' && !href && "production" !== 'production') {
        // eslint-disable-next-line no-console
        console.error('WizardNavItem: When using an anchor, please provide an href');
    }
    const btnProps = {
        disabled: isDisabled
    };
    const linkProps = {
        tabIndex: isDisabled ? -1 : undefined,
        href
    };
    return (react.createElement("li", { className: css(styles$C.wizardNavItem, isExpandable && styles$C.modifiers.expandable, isExpandable && isExpanded && styles$C.modifiers.expanded) },
        react.createElement(NavItemComponent, Object.assign({}, rest, (navItemComponent === 'a' ? Object.assign({}, linkProps) : Object.assign({}, btnProps)), (id && { id: id.toString() }), { onClick: () => (isExpandable ? setIsExpanded(!isExpanded || isCurrent) : onNavItemClick(step)), className: css(styles$C.wizardNavLink, isCurrent && styles$C.modifiers.current, isDisabled && styles$C.modifiers.disabled), "aria-disabled": isDisabled ? true : null, "aria-current": isCurrent && !children ? 'step' : false }, (isExpandable && { 'aria-expanded': isExpanded })), isExpandable ? (react.createElement(react.Fragment, null,
            react.createElement("span", { className: css(styles$C.wizardNavLinkText) }, content),
            react.createElement("span", { className: css(styles$C.wizardNavLinkToggle) },
                react.createElement("span", { className: css(styles$C.wizardNavLinkToggleIcon) },
                    react.createElement(AngleRightIcon, null))))) : (content)),
        children));
};
WizardNavItem.displayName = 'WizardNavItem';

const WizardContext = react.createContext({
    goToStepById: () => null,
    goToStepByName: () => null,
    onNext: () => null,
    onBack: () => null,
    onClose: () => null,
    activeStep: { name: null }
});
const WizardContextProvider = WizardContext.Provider;
const WizardContextConsumer = WizardContext.Consumer;

const WizardHeader = ({ onClose = () => undefined, title, description, hideClose, closeButtonAriaLabel, titleId, descriptionComponent: Component = 'p', descriptionId }) => (react.createElement("div", { className: css(styles$C.wizardHeader) },
    !hideClose && (react.createElement(Button, { variant: "plain", className: css(styles$C.wizardClose), "aria-label": closeButtonAriaLabel, onClick: onClose },
        react.createElement(TimesIcon, { "aria-hidden": "true" }))),
    react.createElement(Title, { headingLevel: "h2", size: "3xl", className: css(styles$C.wizardTitle), "aria-label": title, id: titleId }, title || react.createElement(react.Fragment, null, "\u00A0")),
    description && (react.createElement(Component, { className: css(styles$C.wizardDescription), id: descriptionId }, description))));
WizardHeader.displayName = 'WizardHeader';

class Wizard extends react.Component {
    constructor(props) {
        super(props);
        this.handleKeyClicks = (event) => {
            if (event.keyCode === KEY_CODES.ESCAPE_KEY) {
                if (this.state.isNavOpen) {
                    this.setState({ isNavOpen: !this.state.isNavOpen });
                }
                else if (this.props.isOpen) {
                    this.props.onClose();
                }
            }
        };
        this.onNext = () => {
            const { onNext, onClose, onSave } = this.props;
            const { currentStep } = this.state;
            const flattenedSteps = this.getFlattenedSteps();
            const maxSteps = flattenedSteps.length;
            if (currentStep >= maxSteps) {
                // Hit the save button at the end of the wizard
                if (onSave) {
                    return onSave();
                }
                return onClose();
            }
            else {
                const newStep = currentStep + 1;
                this.setState({
                    currentStep: newStep
                });
                const { id: prevId, name: prevName } = flattenedSteps[currentStep - 1];
                const { id, name } = flattenedSteps[newStep - 1];
                return onNext && onNext({ id, name }, { prevId, prevName });
            }
        };
        this.onBack = () => {
            const { onBack } = this.props;
            const { currentStep } = this.state;
            const flattenedSteps = this.getFlattenedSteps();
            if (flattenedSteps.length < currentStep) {
                // Previous step was removed, just update the currentStep state
                const adjustedStep = flattenedSteps.length;
                this.setState({
                    currentStep: adjustedStep
                });
            }
            else {
                const newStep = currentStep - 1 <= 0 ? 0 : currentStep - 1;
                this.setState({
                    currentStep: newStep
                });
                const { id: prevId, name: prevName } = flattenedSteps[newStep];
                const { id, name } = flattenedSteps[newStep - 1];
                return onBack && onBack({ id, name }, { prevId, prevName });
            }
        };
        this.goToStep = (step) => {
            const { onGoToStep } = this.props;
            const { currentStep } = this.state;
            const flattenedSteps = this.getFlattenedSteps();
            const maxSteps = flattenedSteps.length;
            if (step < 1) {
                step = 1;
            }
            else if (step > maxSteps) {
                step = maxSteps;
            }
            this.setState({ currentStep: step, isNavOpen: false });
            const { id: prevId, name: prevName } = flattenedSteps[currentStep - 1];
            const { id, name } = flattenedSteps[step - 1];
            return onGoToStep && onGoToStep({ id, name }, { prevId, prevName });
        };
        this.goToStepById = (stepId) => {
            const flattenedSteps = this.getFlattenedSteps();
            let step;
            for (let i = 0; i < flattenedSteps.length; i++) {
                if (flattenedSteps[i].id === stepId) {
                    step = i + 1;
                    break;
                }
            }
            if (step) {
                this.setState({ currentStep: step });
            }
        };
        this.goToStepByName = (stepName) => {
            const flattenedSteps = this.getFlattenedSteps();
            let step;
            for (let i = 0; i < flattenedSteps.length; i++) {
                if (flattenedSteps[i].name === stepName) {
                    step = i + 1;
                    break;
                }
            }
            if (step) {
                this.setState({ currentStep: step });
            }
        };
        this.getFlattenedSteps = () => {
            const { steps } = this.props;
            const flattenedSteps = [];
            for (const step of steps) {
                if (step.steps) {
                    for (const childStep of step.steps) {
                        flattenedSteps.push(childStep);
                    }
                }
                else {
                    flattenedSteps.push(step);
                }
            }
            return flattenedSteps;
        };
        this.getFlattenedStepsIndex = (flattenedSteps, stepName) => {
            for (let i = 0; i < flattenedSteps.length; i++) {
                if (flattenedSteps[i].name === stepName) {
                    return i + 1;
                }
            }
            return 0;
        };
        this.initSteps = (steps) => {
            // Set default Step values
            for (let i = 0; i < steps.length; i++) {
                if (steps[i].steps) {
                    for (let j = 0; j < steps[i].steps.length; j++) {
                        steps[i].steps[j] = Object.assign({ canJumpTo: true }, steps[i].steps[j]);
                    }
                }
                steps[i] = Object.assign({ canJumpTo: true }, steps[i]);
            }
            return steps;
        };
        this.getElement = (appendTo) => {
            if (typeof appendTo === 'function') {
                return appendTo();
            }
            return appendTo || document.body;
        };
        const newId = Wizard.currentId++;
        this.titleId = props.titleId || `pf-wizard-title-${newId}`;
        this.descriptionId = props.descriptionId || `pf-wizard-description-${newId}`;
        this.state = {
            currentStep: this.props.startAtStep && Number.isInteger(this.props.startAtStep) ? this.props.startAtStep : 1,
            isNavOpen: false
        };
        this.drawerRef = react.createRef();
    }
    componentDidMount() {
        const target = typeof document !== 'undefined' ? document.body : null;
        if (target) {
            target.addEventListener('keydown', this.handleKeyClicks, false);
        }
    }
    componentWillUnmount() {
        const target = (typeof document !== 'undefined' && document.body) || null;
        if (target) {
            target.removeEventListener('keydown', this.handleKeyClicks, false);
        }
    }
    render() {
        const _a = this.props, { 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        width, height, title, description, descriptionComponent, onClose, onSave, onBack, onNext, onGoToStep, className, steps, startAtStep, nextButtonText = 'Next', backButtonText = 'Back', cancelButtonText = 'Cancel', hideClose, closeButtonAriaLabel = 'Close', navAriaLabel, navAriaLabelledBy, mainAriaLabel, mainAriaLabelledBy, hasNoBodyPadding, footer, appendTo, isOpen, titleId, descriptionId, isNavExpandable, hasDrawer, isDrawerExpanded } = _a, rest = __rest(_a, ["width", "height", "title", "description", "descriptionComponent", "onClose", "onSave", "onBack", "onNext", "onGoToStep", "className", "steps", "startAtStep", "nextButtonText", "backButtonText", "cancelButtonText", "hideClose", "closeButtonAriaLabel", "navAriaLabel", "navAriaLabelledBy", "mainAriaLabel", "mainAriaLabelledBy", "hasNoBodyPadding", "footer", "appendTo", "isOpen", "titleId", "descriptionId", "isNavExpandable", "hasDrawer", "isDrawerExpanded"])
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ;
        const { currentStep } = this.state;
        const flattenedSteps = this.getFlattenedSteps();
        const adjustedStep = flattenedSteps.length < currentStep ? flattenedSteps.length : currentStep;
        const activeStep = flattenedSteps[adjustedStep - 1];
        const computedSteps = this.initSteps(steps);
        const firstStep = activeStep === flattenedSteps[0];
        const isValid = activeStep && activeStep.enableNext !== undefined ? activeStep.enableNext : true;
        const nav = (isWizardNavOpen) => {
            const wizNavAProps = {
                isOpen: isWizardNavOpen,
                'aria-label': navAriaLabel,
                'aria-labelledby': (title || navAriaLabelledBy) && (navAriaLabelledBy || this.titleId)
            };
            return (react.createElement(WizardNav, Object.assign({}, wizNavAProps), computedSteps.map((step, index) => {
                if (step.isFinishedStep) {
                    // Don't show finished step in the side nav
                    return;
                }
                let enabled;
                let navItemStep;
                if (step.steps) {
                    let hasActiveChild = false;
                    let canJumpToParent = false;
                    for (const subStep of step.steps) {
                        if (activeStep.name === subStep.name) {
                            // one of the children matches
                            hasActiveChild = true;
                        }
                        if (subStep.canJumpTo) {
                            canJumpToParent = true;
                        }
                    }
                    navItemStep = this.getFlattenedStepsIndex(flattenedSteps, step.steps[0].name);
                    return (react.createElement(WizardNavItem, { key: index, id: step.id, content: step.name, isExpandable: isNavExpandable, isCurrent: hasActiveChild, isDisabled: !canJumpToParent, step: navItemStep, onNavItemClick: this.goToStep },
                        react.createElement(WizardNav, Object.assign({}, wizNavAProps, { returnList: true }), step.steps.map((childStep, indexChild) => {
                            if (childStep.isFinishedStep) {
                                // Don't show finished step in the side nav
                                return;
                            }
                            navItemStep = this.getFlattenedStepsIndex(flattenedSteps, childStep.name);
                            enabled = childStep.canJumpTo;
                            return (react.createElement(WizardNavItem, { key: `child_${indexChild}`, id: childStep.id, content: childStep.name, isCurrent: activeStep.name === childStep.name, isDisabled: !enabled, step: navItemStep, onNavItemClick: this.goToStep }));
                        }))));
                }
                navItemStep = this.getFlattenedStepsIndex(flattenedSteps, step.name);
                enabled = step.canJumpTo;
                return (react.createElement(WizardNavItem, Object.assign({}, step.stepNavItemProps, { key: index, id: step.id, content: step.name, isCurrent: activeStep.name === step.name, isDisabled: !enabled, step: navItemStep, onNavItemClick: this.goToStep })));
            })));
        };
        const context = {
            goToStepById: this.goToStepById,
            goToStepByName: this.goToStepByName,
            onNext: this.onNext,
            onBack: this.onBack,
            onClose,
            activeStep
        };
        const divStyles = Object.assign(Object.assign({}, (height ? { height } : {})), (width ? { width } : {}));
        const wizard = (react.createElement(WizardContextProvider, { value: context },
            react.createElement("div", Object.assign({}, rest, { className: css(styles$C.wizard, activeStep && activeStep.isFinishedStep && 'pf-m-finished', className), style: Object.keys(divStyles).length ? divStyles : undefined }),
                title && (react.createElement(WizardHeader, { titleId: this.titleId, descriptionId: this.descriptionId, onClose: onClose, title: title, description: description, descriptionComponent: descriptionComponent, closeButtonAriaLabel: closeButtonAriaLabel, hideClose: hideClose })),
                react.createElement(WizardToggle, { hasDrawer: hasDrawer, isDrawerExpanded: isDrawerExpanded, mainAriaLabel: mainAriaLabel, isInPage: isOpen === undefined, mainAriaLabelledBy: (title || mainAriaLabelledBy) && (mainAriaLabelledBy || this.titleId), isNavOpen: this.state.isNavOpen, onNavToggle: isNavOpen => this.setState({ isNavOpen }), nav: nav, steps: steps, activeStep: activeStep, hasNoBodyPadding: hasNoBodyPadding }, footer || (react.createElement(WizardFooterInternal, { onNext: this.onNext, onBack: this.onBack, onClose: onClose, isValid: isValid, firstStep: firstStep, activeStep: activeStep, nextButtonText: (activeStep && activeStep.nextButtonText) || nextButtonText, backButtonText: backButtonText, cancelButtonText: cancelButtonText }))))));
        if (isOpen !== undefined) {
            return (react.createElement(Modal, { width: width !== null ? width : undefined, isOpen: isOpen, variant: ModalVariant.large, "aria-labelledby": this.titleId, "aria-describedby": this.descriptionId, showClose: false, hasNoBodyWrapper: true }, wizard));
        }
        return wizard;
    }
}
Wizard.displayName = 'Wizard';
Wizard.currentId = 0;
Wizard.defaultProps = {
    title: null,
    description: '',
    descriptionComponent: 'p',
    className: '',
    startAtStep: 1,
    nextButtonText: 'Next',
    backButtonText: 'Back',
    cancelButtonText: 'Cancel',
    hideClose: false,
    closeButtonAriaLabel: 'Close',
    navAriaLabel: null,
    navAriaLabelledBy: null,
    mainAriaLabel: null,
    mainAriaLabelledBy: null,
    hasNoBodyPadding: false,
    onBack: null,
    onNext: null,
    onGoToStep: null,
    width: null,
    height: null,
    footer: null,
    onClose: () => undefined,
    appendTo: null,
    isOpen: undefined,
    isNavExpandable: false,
    hasDrawer: false,
    isDrawerExpanded: false
};

const WizardFooter = ({ children }) => (react.createElement("footer", { className: css(styles$C.wizardFooter) }, children));
WizardFooter.displayName = 'WizardFooter';

import('../common/flex-6889d2af.js');
var styles$D = {
  flex: "pf-l-flex",
  modifiers: {
    flex: "pf-m-flex",
    inlineFlex: "pf-m-inline-flex",
    column: "pf-m-column",
    columnReverse: "pf-m-column-reverse",
    row: "pf-m-row",
    rowReverse: "pf-m-row-reverse",
    wrap: "pf-m-wrap",
    wrapReverse: "pf-m-wrap-reverse",
    nowrap: "pf-m-nowrap",
    justifyContentFlexStart: "pf-m-justify-content-flex-start",
    justifyContentFlexEnd: "pf-m-justify-content-flex-end",
    justifyContentCenter: "pf-m-justify-content-center",
    justifyContentSpaceBetween: "pf-m-justify-content-space-between",
    justifyContentSpaceAround: "pf-m-justify-content-space-around",
    justifyContentSpaceEvenly: "pf-m-justify-content-space-evenly",
    alignItemsFlexStart: "pf-m-align-items-flex-start",
    alignItemsFlexEnd: "pf-m-align-items-flex-end",
    alignItemsCenter: "pf-m-align-items-center",
    alignItemsStretch: "pf-m-align-items-stretch",
    alignItemsBaseline: "pf-m-align-items-baseline",
    alignContentFlexStart: "pf-m-align-content-flex-start",
    alignContentFlexEnd: "pf-m-align-content-flex-end",
    alignContentCenter: "pf-m-align-content-center",
    alignContentStretch: "pf-m-align-content-stretch",
    alignContentSpaceBetween: "pf-m-align-content-space-between",
    alignContentSpaceAround: "pf-m-align-content-space-around",
    alignRight: "pf-m-align-right",
    alignLeft: "pf-m-align-left",
    grow: "pf-m-grow",
    shrink: "pf-m-shrink",
    fullWidth: "pf-m-full-width",
    flex_1: "pf-m-flex-1",
    flex_2: "pf-m-flex-2",
    flex_3: "pf-m-flex-3",
    flex_4: "pf-m-flex-4",
    flexDefault: "pf-m-flex-default",
    flexNone: "pf-m-flex-none",
    alignSelfFlexStart: "pf-m-align-self-flex-start",
    alignSelfFlexEnd: "pf-m-align-self-flex-end",
    alignSelfCenter: "pf-m-align-self-center",
    alignSelfBaseline: "pf-m-align-self-baseline",
    alignSelfStretch: "pf-m-align-self-stretch",
    flexOnSm: "pf-m-flex-on-sm",
    inlineFlexOnSm: "pf-m-inline-flex-on-sm",
    columnOnSm: "pf-m-column-on-sm",
    columnReverseOnSm: "pf-m-column-reverse-on-sm",
    rowOnSm: "pf-m-row-on-sm",
    rowReverseOnSm: "pf-m-row-reverse-on-sm",
    wrapOnSm: "pf-m-wrap-on-sm",
    wrapReverseOnSm: "pf-m-wrap-reverse-on-sm",
    nowrapOnSm: "pf-m-nowrap-on-sm",
    justifyContentFlexStartOnSm: "pf-m-justify-content-flex-start-on-sm",
    justifyContentFlexEndOnSm: "pf-m-justify-content-flex-end-on-sm",
    justifyContentCenterOnSm: "pf-m-justify-content-center-on-sm",
    justifyContentSpaceBetweenOnSm: "pf-m-justify-content-space-between-on-sm",
    justifyContentSpaceAroundOnSm: "pf-m-justify-content-space-around-on-sm",
    justifyContentSpaceEvenlyOnSm: "pf-m-justify-content-space-evenly-on-sm",
    alignItemsFlexStartOnSm: "pf-m-align-items-flex-start-on-sm",
    alignItemsFlexEndOnSm: "pf-m-align-items-flex-end-on-sm",
    alignItemsCenterOnSm: "pf-m-align-items-center-on-sm",
    alignItemsStretchOnSm: "pf-m-align-items-stretch-on-sm",
    alignItemsBaselineOnSm: "pf-m-align-items-baseline-on-sm",
    alignContentFlexStartOnSm: "pf-m-align-content-flex-start-on-sm",
    alignContentFlexEndOnSm: "pf-m-align-content-flex-end-on-sm",
    alignContentCenterOnSm: "pf-m-align-content-center-on-sm",
    alignContentStretchOnSm: "pf-m-align-content-stretch-on-sm",
    alignContentSpaceBetweenOnSm: "pf-m-align-content-space-between-on-sm",
    alignContentSpaceAroundOnSm: "pf-m-align-content-space-around-on-sm",
    alignRightOnSm: "pf-m-align-right-on-sm",
    alignLeftOnSm: "pf-m-align-left-on-sm",
    growOnSm: "pf-m-grow-on-sm",
    shrinkOnSm: "pf-m-shrink-on-sm",
    fullWidthOnSm: "pf-m-full-width-on-sm",
    flex_1OnSm: "pf-m-flex-1-on-sm",
    flex_2OnSm: "pf-m-flex-2-on-sm",
    flex_3OnSm: "pf-m-flex-3-on-sm",
    flex_4OnSm: "pf-m-flex-4-on-sm",
    flexDefaultOnSm: "pf-m-flex-default-on-sm",
    flexNoneOnSm: "pf-m-flex-none-on-sm",
    alignSelfFlexStartOnSm: "pf-m-align-self-flex-start-on-sm",
    alignSelfFlexEndOnSm: "pf-m-align-self-flex-end-on-sm",
    alignSelfCenterOnSm: "pf-m-align-self-center-on-sm",
    alignSelfBaselineOnSm: "pf-m-align-self-baseline-on-sm",
    alignSelfStretchOnSm: "pf-m-align-self-stretch-on-sm",
    flexOnMd: "pf-m-flex-on-md",
    inlineFlexOnMd: "pf-m-inline-flex-on-md",
    columnOnMd: "pf-m-column-on-md",
    columnReverseOnMd: "pf-m-column-reverse-on-md",
    rowOnMd: "pf-m-row-on-md",
    rowReverseOnMd: "pf-m-row-reverse-on-md",
    wrapOnMd: "pf-m-wrap-on-md",
    wrapReverseOnMd: "pf-m-wrap-reverse-on-md",
    nowrapOnMd: "pf-m-nowrap-on-md",
    justifyContentFlexStartOnMd: "pf-m-justify-content-flex-start-on-md",
    justifyContentFlexEndOnMd: "pf-m-justify-content-flex-end-on-md",
    justifyContentCenterOnMd: "pf-m-justify-content-center-on-md",
    justifyContentSpaceBetweenOnMd: "pf-m-justify-content-space-between-on-md",
    justifyContentSpaceAroundOnMd: "pf-m-justify-content-space-around-on-md",
    justifyContentSpaceEvenlyOnMd: "pf-m-justify-content-space-evenly-on-md",
    alignItemsFlexStartOnMd: "pf-m-align-items-flex-start-on-md",
    alignItemsFlexEndOnMd: "pf-m-align-items-flex-end-on-md",
    alignItemsCenterOnMd: "pf-m-align-items-center-on-md",
    alignItemsStretchOnMd: "pf-m-align-items-stretch-on-md",
    alignItemsBaselineOnMd: "pf-m-align-items-baseline-on-md",
    alignContentFlexStartOnMd: "pf-m-align-content-flex-start-on-md",
    alignContentFlexEndOnMd: "pf-m-align-content-flex-end-on-md",
    alignContentCenterOnMd: "pf-m-align-content-center-on-md",
    alignContentStretchOnMd: "pf-m-align-content-stretch-on-md",
    alignContentSpaceBetweenOnMd: "pf-m-align-content-space-between-on-md",
    alignContentSpaceAroundOnMd: "pf-m-align-content-space-around-on-md",
    alignRightOnMd: "pf-m-align-right-on-md",
    alignLeftOnMd: "pf-m-align-left-on-md",
    growOnMd: "pf-m-grow-on-md",
    shrinkOnMd: "pf-m-shrink-on-md",
    fullWidthOnMd: "pf-m-full-width-on-md",
    flex_1OnMd: "pf-m-flex-1-on-md",
    flex_2OnMd: "pf-m-flex-2-on-md",
    flex_3OnMd: "pf-m-flex-3-on-md",
    flex_4OnMd: "pf-m-flex-4-on-md",
    flexDefaultOnMd: "pf-m-flex-default-on-md",
    flexNoneOnMd: "pf-m-flex-none-on-md",
    alignSelfFlexStartOnMd: "pf-m-align-self-flex-start-on-md",
    alignSelfFlexEndOnMd: "pf-m-align-self-flex-end-on-md",
    alignSelfCenterOnMd: "pf-m-align-self-center-on-md",
    alignSelfBaselineOnMd: "pf-m-align-self-baseline-on-md",
    alignSelfStretchOnMd: "pf-m-align-self-stretch-on-md",
    flexOnLg: "pf-m-flex-on-lg",
    inlineFlexOnLg: "pf-m-inline-flex-on-lg",
    columnOnLg: "pf-m-column-on-lg",
    columnReverseOnLg: "pf-m-column-reverse-on-lg",
    rowOnLg: "pf-m-row-on-lg",
    rowReverseOnLg: "pf-m-row-reverse-on-lg",
    wrapOnLg: "pf-m-wrap-on-lg",
    wrapReverseOnLg: "pf-m-wrap-reverse-on-lg",
    nowrapOnLg: "pf-m-nowrap-on-lg",
    justifyContentFlexStartOnLg: "pf-m-justify-content-flex-start-on-lg",
    justifyContentFlexEndOnLg: "pf-m-justify-content-flex-end-on-lg",
    justifyContentCenterOnLg: "pf-m-justify-content-center-on-lg",
    justifyContentSpaceBetweenOnLg: "pf-m-justify-content-space-between-on-lg",
    justifyContentSpaceAroundOnLg: "pf-m-justify-content-space-around-on-lg",
    justifyContentSpaceEvenlyOnLg: "pf-m-justify-content-space-evenly-on-lg",
    alignItemsFlexStartOnLg: "pf-m-align-items-flex-start-on-lg",
    alignItemsFlexEndOnLg: "pf-m-align-items-flex-end-on-lg",
    alignItemsCenterOnLg: "pf-m-align-items-center-on-lg",
    alignItemsStretchOnLg: "pf-m-align-items-stretch-on-lg",
    alignItemsBaselineOnLg: "pf-m-align-items-baseline-on-lg",
    alignContentFlexStartOnLg: "pf-m-align-content-flex-start-on-lg",
    alignContentFlexEndOnLg: "pf-m-align-content-flex-end-on-lg",
    alignContentCenterOnLg: "pf-m-align-content-center-on-lg",
    alignContentStretchOnLg: "pf-m-align-content-stretch-on-lg",
    alignContentSpaceBetweenOnLg: "pf-m-align-content-space-between-on-lg",
    alignContentSpaceAroundOnLg: "pf-m-align-content-space-around-on-lg",
    alignRightOnLg: "pf-m-align-right-on-lg",
    alignLeftOnLg: "pf-m-align-left-on-lg",
    growOnLg: "pf-m-grow-on-lg",
    shrinkOnLg: "pf-m-shrink-on-lg",
    fullWidthOnLg: "pf-m-full-width-on-lg",
    flex_1OnLg: "pf-m-flex-1-on-lg",
    flex_2OnLg: "pf-m-flex-2-on-lg",
    flex_3OnLg: "pf-m-flex-3-on-lg",
    flex_4OnLg: "pf-m-flex-4-on-lg",
    flexDefaultOnLg: "pf-m-flex-default-on-lg",
    flexNoneOnLg: "pf-m-flex-none-on-lg",
    alignSelfFlexStartOnLg: "pf-m-align-self-flex-start-on-lg",
    alignSelfFlexEndOnLg: "pf-m-align-self-flex-end-on-lg",
    alignSelfCenterOnLg: "pf-m-align-self-center-on-lg",
    alignSelfBaselineOnLg: "pf-m-align-self-baseline-on-lg",
    alignSelfStretchOnLg: "pf-m-align-self-stretch-on-lg",
    flexOnXl: "pf-m-flex-on-xl",
    inlineFlexOnXl: "pf-m-inline-flex-on-xl",
    columnOnXl: "pf-m-column-on-xl",
    columnReverseOnXl: "pf-m-column-reverse-on-xl",
    rowOnXl: "pf-m-row-on-xl",
    rowReverseOnXl: "pf-m-row-reverse-on-xl",
    wrapOnXl: "pf-m-wrap-on-xl",
    wrapReverseOnXl: "pf-m-wrap-reverse-on-xl",
    nowrapOnXl: "pf-m-nowrap-on-xl",
    justifyContentFlexStartOnXl: "pf-m-justify-content-flex-start-on-xl",
    justifyContentFlexEndOnXl: "pf-m-justify-content-flex-end-on-xl",
    justifyContentCenterOnXl: "pf-m-justify-content-center-on-xl",
    justifyContentSpaceBetweenOnXl: "pf-m-justify-content-space-between-on-xl",
    justifyContentSpaceAroundOnXl: "pf-m-justify-content-space-around-on-xl",
    justifyContentSpaceEvenlyOnXl: "pf-m-justify-content-space-evenly-on-xl",
    alignItemsFlexStartOnXl: "pf-m-align-items-flex-start-on-xl",
    alignItemsFlexEndOnXl: "pf-m-align-items-flex-end-on-xl",
    alignItemsCenterOnXl: "pf-m-align-items-center-on-xl",
    alignItemsStretchOnXl: "pf-m-align-items-stretch-on-xl",
    alignItemsBaselineOnXl: "pf-m-align-items-baseline-on-xl",
    alignContentFlexStartOnXl: "pf-m-align-content-flex-start-on-xl",
    alignContentFlexEndOnXl: "pf-m-align-content-flex-end-on-xl",
    alignContentCenterOnXl: "pf-m-align-content-center-on-xl",
    alignContentStretchOnXl: "pf-m-align-content-stretch-on-xl",
    alignContentSpaceBetweenOnXl: "pf-m-align-content-space-between-on-xl",
    alignContentSpaceAroundOnXl: "pf-m-align-content-space-around-on-xl",
    alignRightOnXl: "pf-m-align-right-on-xl",
    alignLeftOnXl: "pf-m-align-left-on-xl",
    growOnXl: "pf-m-grow-on-xl",
    shrinkOnXl: "pf-m-shrink-on-xl",
    fullWidthOnXl: "pf-m-full-width-on-xl",
    flex_1OnXl: "pf-m-flex-1-on-xl",
    flex_2OnXl: "pf-m-flex-2-on-xl",
    flex_3OnXl: "pf-m-flex-3-on-xl",
    flex_4OnXl: "pf-m-flex-4-on-xl",
    flexDefaultOnXl: "pf-m-flex-default-on-xl",
    flexNoneOnXl: "pf-m-flex-none-on-xl",
    alignSelfFlexStartOnXl: "pf-m-align-self-flex-start-on-xl",
    alignSelfFlexEndOnXl: "pf-m-align-self-flex-end-on-xl",
    alignSelfCenterOnXl: "pf-m-align-self-center-on-xl",
    alignSelfBaselineOnXl: "pf-m-align-self-baseline-on-xl",
    alignSelfStretchOnXl: "pf-m-align-self-stretch-on-xl",
    flexOn_2xl: "pf-m-flex-on-2xl",
    inlineFlexOn_2xl: "pf-m-inline-flex-on-2xl",
    columnOn_2xl: "pf-m-column-on-2xl",
    columnReverseOn_2xl: "pf-m-column-reverse-on-2xl",
    rowOn_2xl: "pf-m-row-on-2xl",
    rowReverseOn_2xl: "pf-m-row-reverse-on-2xl",
    wrapOn_2xl: "pf-m-wrap-on-2xl",
    wrapReverseOn_2xl: "pf-m-wrap-reverse-on-2xl",
    nowrapOn_2xl: "pf-m-nowrap-on-2xl",
    justifyContentFlexStartOn_2xl: "pf-m-justify-content-flex-start-on-2xl",
    justifyContentFlexEndOn_2xl: "pf-m-justify-content-flex-end-on-2xl",
    justifyContentCenterOn_2xl: "pf-m-justify-content-center-on-2xl",
    justifyContentSpaceBetweenOn_2xl: "pf-m-justify-content-space-between-on-2xl",
    justifyContentSpaceAroundOn_2xl: "pf-m-justify-content-space-around-on-2xl",
    justifyContentSpaceEvenlyOn_2xl: "pf-m-justify-content-space-evenly-on-2xl",
    alignItemsFlexStartOn_2xl: "pf-m-align-items-flex-start-on-2xl",
    alignItemsFlexEndOn_2xl: "pf-m-align-items-flex-end-on-2xl",
    alignItemsCenterOn_2xl: "pf-m-align-items-center-on-2xl",
    alignItemsStretchOn_2xl: "pf-m-align-items-stretch-on-2xl",
    alignItemsBaselineOn_2xl: "pf-m-align-items-baseline-on-2xl",
    alignContentFlexStartOn_2xl: "pf-m-align-content-flex-start-on-2xl",
    alignContentFlexEndOn_2xl: "pf-m-align-content-flex-end-on-2xl",
    alignContentCenterOn_2xl: "pf-m-align-content-center-on-2xl",
    alignContentStretchOn_2xl: "pf-m-align-content-stretch-on-2xl",
    alignContentSpaceBetweenOn_2xl: "pf-m-align-content-space-between-on-2xl",
    alignContentSpaceAroundOn_2xl: "pf-m-align-content-space-around-on-2xl",
    alignRightOn_2xl: "pf-m-align-right-on-2xl",
    alignLeftOn_2xl: "pf-m-align-left-on-2xl",
    growOn_2xl: "pf-m-grow-on-2xl",
    shrinkOn_2xl: "pf-m-shrink-on-2xl",
    fullWidthOn_2xl: "pf-m-full-width-on-2xl",
    flex_1On_2xl: "pf-m-flex-1-on-2xl",
    flex_2On_2xl: "pf-m-flex-2-on-2xl",
    flex_3On_2xl: "pf-m-flex-3-on-2xl",
    flex_4On_2xl: "pf-m-flex-4-on-2xl",
    flexDefaultOn_2xl: "pf-m-flex-default-on-2xl",
    flexNoneOn_2xl: "pf-m-flex-none-on-2xl",
    alignSelfFlexStartOn_2xl: "pf-m-align-self-flex-start-on-2xl",
    alignSelfFlexEndOn_2xl: "pf-m-align-self-flex-end-on-2xl",
    alignSelfCenterOn_2xl: "pf-m-align-self-center-on-2xl",
    alignSelfBaselineOn_2xl: "pf-m-align-self-baseline-on-2xl",
    alignSelfStretchOn_2xl: "pf-m-align-self-stretch-on-2xl",
    spaceItemsNone: "pf-m-space-items-none",
    spaceItemsXs: "pf-m-space-items-xs",
    spaceItemsSm: "pf-m-space-items-sm",
    spaceItemsMd: "pf-m-space-items-md",
    spaceItemsLg: "pf-m-space-items-lg",
    spaceItemsXl: "pf-m-space-items-xl",
    spaceItems_2xl: "pf-m-space-items-2xl",
    spaceItems_3xl: "pf-m-space-items-3xl",
    spaceItems_4xl: "pf-m-space-items-4xl",
    spaceItemsNoneOnSm: "pf-m-space-items-none-on-sm",
    spaceItemsXsOnSm: "pf-m-space-items-xs-on-sm",
    spaceItemsSmOnSm: "pf-m-space-items-sm-on-sm",
    spaceItemsMdOnSm: "pf-m-space-items-md-on-sm",
    spaceItemsLgOnSm: "pf-m-space-items-lg-on-sm",
    spaceItemsXlOnSm: "pf-m-space-items-xl-on-sm",
    spaceItems_2xlOnSm: "pf-m-space-items-2xl-on-sm",
    spaceItems_3xlOnSm: "pf-m-space-items-3xl-on-sm",
    spaceItems_4xlOnSm: "pf-m-space-items-4xl-on-sm",
    spaceItemsNoneOnMd: "pf-m-space-items-none-on-md",
    spaceItemsXsOnMd: "pf-m-space-items-xs-on-md",
    spaceItemsSmOnMd: "pf-m-space-items-sm-on-md",
    spaceItemsMdOnMd: "pf-m-space-items-md-on-md",
    spaceItemsLgOnMd: "pf-m-space-items-lg-on-md",
    spaceItemsXlOnMd: "pf-m-space-items-xl-on-md",
    spaceItems_2xlOnMd: "pf-m-space-items-2xl-on-md",
    spaceItems_3xlOnMd: "pf-m-space-items-3xl-on-md",
    spaceItems_4xlOnMd: "pf-m-space-items-4xl-on-md",
    spaceItemsNoneOnLg: "pf-m-space-items-none-on-lg",
    spaceItemsXsOnLg: "pf-m-space-items-xs-on-lg",
    spaceItemsSmOnLg: "pf-m-space-items-sm-on-lg",
    spaceItemsMdOnLg: "pf-m-space-items-md-on-lg",
    spaceItemsLgOnLg: "pf-m-space-items-lg-on-lg",
    spaceItemsXlOnLg: "pf-m-space-items-xl-on-lg",
    spaceItems_2xlOnLg: "pf-m-space-items-2xl-on-lg",
    spaceItems_3xlOnLg: "pf-m-space-items-3xl-on-lg",
    spaceItems_4xlOnLg: "pf-m-space-items-4xl-on-lg",
    spaceItemsNoneOnXl: "pf-m-space-items-none-on-xl",
    spaceItemsXsOnXl: "pf-m-space-items-xs-on-xl",
    spaceItemsSmOnXl: "pf-m-space-items-sm-on-xl",
    spaceItemsMdOnXl: "pf-m-space-items-md-on-xl",
    spaceItemsLgOnXl: "pf-m-space-items-lg-on-xl",
    spaceItemsXlOnXl: "pf-m-space-items-xl-on-xl",
    spaceItems_2xlOnXl: "pf-m-space-items-2xl-on-xl",
    spaceItems_3xlOnXl: "pf-m-space-items-3xl-on-xl",
    spaceItems_4xlOnXl: "pf-m-space-items-4xl-on-xl",
    spaceItemsNoneOn_2xl: "pf-m-space-items-none-on-2xl",
    spaceItemsXsOn_2xl: "pf-m-space-items-xs-on-2xl",
    spaceItemsSmOn_2xl: "pf-m-space-items-sm-on-2xl",
    spaceItemsMdOn_2xl: "pf-m-space-items-md-on-2xl",
    spaceItemsLgOn_2xl: "pf-m-space-items-lg-on-2xl",
    spaceItemsXlOn_2xl: "pf-m-space-items-xl-on-2xl",
    spaceItems_2xlOn_2xl: "pf-m-space-items-2xl-on-2xl",
    spaceItems_3xlOn_2xl: "pf-m-space-items-3xl-on-2xl",
    spaceItems_4xlOn_2xl: "pf-m-space-items-4xl-on-2xl",
    spacerNone: "pf-m-spacer-none",
    spacerXs: "pf-m-spacer-xs",
    spacerSm: "pf-m-spacer-sm",
    spacerMd: "pf-m-spacer-md",
    spacerLg: "pf-m-spacer-lg",
    spacerXl: "pf-m-spacer-xl",
    spacer_2xl: "pf-m-spacer-2xl",
    spacer_3xl: "pf-m-spacer-3xl",
    spacer_4xl: "pf-m-spacer-4xl",
    spacerNoneOnSm: "pf-m-spacer-none-on-sm",
    spacerXsOnSm: "pf-m-spacer-xs-on-sm",
    spacerSmOnSm: "pf-m-spacer-sm-on-sm",
    spacerMdOnSm: "pf-m-spacer-md-on-sm",
    spacerLgOnSm: "pf-m-spacer-lg-on-sm",
    spacerXlOnSm: "pf-m-spacer-xl-on-sm",
    spacer_2xlOnSm: "pf-m-spacer-2xl-on-sm",
    spacer_3xlOnSm: "pf-m-spacer-3xl-on-sm",
    spacer_4xlOnSm: "pf-m-spacer-4xl-on-sm",
    spacerNoneOnMd: "pf-m-spacer-none-on-md",
    spacerXsOnMd: "pf-m-spacer-xs-on-md",
    spacerSmOnMd: "pf-m-spacer-sm-on-md",
    spacerMdOnMd: "pf-m-spacer-md-on-md",
    spacerLgOnMd: "pf-m-spacer-lg-on-md",
    spacerXlOnMd: "pf-m-spacer-xl-on-md",
    spacer_2xlOnMd: "pf-m-spacer-2xl-on-md",
    spacer_3xlOnMd: "pf-m-spacer-3xl-on-md",
    spacer_4xlOnMd: "pf-m-spacer-4xl-on-md",
    spacerNoneOnLg: "pf-m-spacer-none-on-lg",
    spacerXsOnLg: "pf-m-spacer-xs-on-lg",
    spacerSmOnLg: "pf-m-spacer-sm-on-lg",
    spacerMdOnLg: "pf-m-spacer-md-on-lg",
    spacerLgOnLg: "pf-m-spacer-lg-on-lg",
    spacerXlOnLg: "pf-m-spacer-xl-on-lg",
    spacer_2xlOnLg: "pf-m-spacer-2xl-on-lg",
    spacer_3xlOnLg: "pf-m-spacer-3xl-on-lg",
    spacer_4xlOnLg: "pf-m-spacer-4xl-on-lg",
    spacerNoneOnXl: "pf-m-spacer-none-on-xl",
    spacerXsOnXl: "pf-m-spacer-xs-on-xl",
    spacerSmOnXl: "pf-m-spacer-sm-on-xl",
    spacerMdOnXl: "pf-m-spacer-md-on-xl",
    spacerLgOnXl: "pf-m-spacer-lg-on-xl",
    spacerXlOnXl: "pf-m-spacer-xl-on-xl",
    spacer_2xlOnXl: "pf-m-spacer-2xl-on-xl",
    spacer_3xlOnXl: "pf-m-spacer-3xl-on-xl",
    spacer_4xlOnXl: "pf-m-spacer-4xl-on-xl",
    spacerNoneOn_2xl: "pf-m-spacer-none-on-2xl",
    spacerXsOn_2xl: "pf-m-spacer-xs-on-2xl",
    spacerSmOn_2xl: "pf-m-spacer-sm-on-2xl",
    spacerMdOn_2xl: "pf-m-spacer-md-on-2xl",
    spacerLgOn_2xl: "pf-m-spacer-lg-on-2xl",
    spacerXlOn_2xl: "pf-m-spacer-xl-on-2xl",
    spacer_2xlOn_2xl: "pf-m-spacer-2xl-on-2xl",
    spacer_3xlOn_2xl: "pf-m-spacer-3xl-on-2xl",
    spacer_4xlOn_2xl: "pf-m-spacer-4xl-on-2xl"
  }
};

const l_flex_item_Order = {
  "name": "--pf-l-flex--item--Order",
  "value": "0",
  "var": "var(--pf-l-flex--item--Order)"
};

const Flex = (_a) => {
    var { children = null, className = '', component = 'div', spacer, spaceItems, grow, shrink, flex, direction, alignItems, alignContent, alignSelf, align, justifyContent, display, fullWidth, flexWrap, order, style } = _a, props = __rest(_a, ["children", "className", "component", "spacer", "spaceItems", "grow", "shrink", "flex", "direction", "alignItems", "alignContent", "alignSelf", "align", "justifyContent", "display", "fullWidth", "flexWrap", "order", "style"]);
    const Component = component;
    return (react.createElement(Component, Object.assign({ className: css(styles$D.flex, formatBreakpointMods(spacer, styles$D), formatBreakpointMods(spaceItems, styles$D), formatBreakpointMods(grow, styles$D), formatBreakpointMods(shrink, styles$D), formatBreakpointMods(flex, styles$D), formatBreakpointMods(direction, styles$D), formatBreakpointMods(alignItems, styles$D), formatBreakpointMods(alignContent, styles$D), formatBreakpointMods(alignSelf, styles$D), formatBreakpointMods(align, styles$D), formatBreakpointMods(justifyContent, styles$D), formatBreakpointMods(display, styles$D), formatBreakpointMods(fullWidth, styles$D), formatBreakpointMods(flexWrap, styles$D), className), style: style || order ? Object.assign(Object.assign({}, style), setBreakpointCssVars(order, l_flex_item_Order.name)) : undefined }, props), children));
};
Flex.displayName = 'Flex';

const FlexItem = (_a) => {
    var { children = null, className = '', component = 'div', spacer, grow, shrink, flex, alignSelf, align, fullWidth, order, style } = _a, props = __rest(_a, ["children", "className", "component", "spacer", "grow", "shrink", "flex", "alignSelf", "align", "fullWidth", "order", "style"]);
    const Component = component;
    return (react.createElement(Component, Object.assign({}, props, { className: css(formatBreakpointMods(spacer, styles$D), formatBreakpointMods(grow, styles$D), formatBreakpointMods(shrink, styles$D), formatBreakpointMods(flex, styles$D), formatBreakpointMods(alignSelf, styles$D), formatBreakpointMods(align, styles$D), formatBreakpointMods(fullWidth, styles$D), className), style: style || order ? Object.assign(Object.assign({}, style), setBreakpointCssVars(order, l_flex_item_Order.name)) : undefined }), children));
};
FlexItem.displayName = 'FlexItem';

import('../common/gallery-51304588.js');
var styles$E = {
  gallery: "pf-l-gallery",
  modifiers: {
    gutter: "pf-m-gutter"
  }
};

const Gallery = (_a) => {
    var { children = null, className = '', component = 'div', hasGutter = false, minWidths, maxWidths } = _a, props = __rest(_a, ["children", "className", "component", "hasGutter", "minWidths", "maxWidths"]);
    const minWidthStyles = {};
    const Component = component;
    if (minWidths) {
        Object.entries(minWidths || {}).map(([breakpoint, value]) => (minWidthStyles[`--pf-l-gallery--GridTemplateColumns--min${breakpoint !== 'default' ? `-on-${breakpoint}` : ''}`] = value));
    }
    const maxWidthStyles = {};
    if (maxWidths) {
        Object.entries(maxWidths || {}).map(([breakpoint, value]) => (maxWidthStyles[`--pf-l-gallery--GridTemplateColumns--max${breakpoint !== 'default' ? `-on-${breakpoint}` : ''}`] = value));
    }
    const widthStyles = Object.assign(Object.assign({}, minWidthStyles), maxWidthStyles);
    return (react.createElement(Component, Object.assign({ className: css(styles$E.gallery, hasGutter && styles$E.modifiers.gutter, className) }, props, ((minWidths || maxWidths) && { style: Object.assign(Object.assign({}, widthStyles), props.style) })), children));
};
Gallery.displayName = 'Gallery';

const GalleryItem = (_a) => {
    var { children = null, component = 'div' } = _a, props = __rest(_a, ["children", "component"]);
    const Component = component;
    return react.createElement(Component, Object.assign({}, props), children);
};
GalleryItem.displayName = 'GalleryItem';

import('../common/grid-566bee0b.js');
var styles$F = {
  grid: "pf-l-grid",
  gridItem: "pf-l-grid__item",
  modifiers: {
    all_1Col: "pf-m-all-1-col",
    all_2Col: "pf-m-all-2-col",
    all_3Col: "pf-m-all-3-col",
    all_4Col: "pf-m-all-4-col",
    all_5Col: "pf-m-all-5-col",
    all_6Col: "pf-m-all-6-col",
    all_7Col: "pf-m-all-7-col",
    all_8Col: "pf-m-all-8-col",
    all_9Col: "pf-m-all-9-col",
    all_10Col: "pf-m-all-10-col",
    all_11Col: "pf-m-all-11-col",
    all_12Col: "pf-m-all-12-col",
    all_1ColOnSm: "pf-m-all-1-col-on-sm",
    all_2ColOnSm: "pf-m-all-2-col-on-sm",
    all_3ColOnSm: "pf-m-all-3-col-on-sm",
    all_4ColOnSm: "pf-m-all-4-col-on-sm",
    all_5ColOnSm: "pf-m-all-5-col-on-sm",
    all_6ColOnSm: "pf-m-all-6-col-on-sm",
    all_7ColOnSm: "pf-m-all-7-col-on-sm",
    all_8ColOnSm: "pf-m-all-8-col-on-sm",
    all_9ColOnSm: "pf-m-all-9-col-on-sm",
    all_10ColOnSm: "pf-m-all-10-col-on-sm",
    all_11ColOnSm: "pf-m-all-11-col-on-sm",
    all_12ColOnSm: "pf-m-all-12-col-on-sm",
    all_1ColOnMd: "pf-m-all-1-col-on-md",
    all_2ColOnMd: "pf-m-all-2-col-on-md",
    all_3ColOnMd: "pf-m-all-3-col-on-md",
    all_4ColOnMd: "pf-m-all-4-col-on-md",
    all_5ColOnMd: "pf-m-all-5-col-on-md",
    all_6ColOnMd: "pf-m-all-6-col-on-md",
    all_7ColOnMd: "pf-m-all-7-col-on-md",
    all_8ColOnMd: "pf-m-all-8-col-on-md",
    all_9ColOnMd: "pf-m-all-9-col-on-md",
    all_10ColOnMd: "pf-m-all-10-col-on-md",
    all_11ColOnMd: "pf-m-all-11-col-on-md",
    all_12ColOnMd: "pf-m-all-12-col-on-md",
    all_1ColOnLg: "pf-m-all-1-col-on-lg",
    all_2ColOnLg: "pf-m-all-2-col-on-lg",
    all_3ColOnLg: "pf-m-all-3-col-on-lg",
    all_4ColOnLg: "pf-m-all-4-col-on-lg",
    all_5ColOnLg: "pf-m-all-5-col-on-lg",
    all_6ColOnLg: "pf-m-all-6-col-on-lg",
    all_7ColOnLg: "pf-m-all-7-col-on-lg",
    all_8ColOnLg: "pf-m-all-8-col-on-lg",
    all_9ColOnLg: "pf-m-all-9-col-on-lg",
    all_10ColOnLg: "pf-m-all-10-col-on-lg",
    all_11ColOnLg: "pf-m-all-11-col-on-lg",
    all_12ColOnLg: "pf-m-all-12-col-on-lg",
    all_1ColOnXl: "pf-m-all-1-col-on-xl",
    all_2ColOnXl: "pf-m-all-2-col-on-xl",
    all_3ColOnXl: "pf-m-all-3-col-on-xl",
    all_4ColOnXl: "pf-m-all-4-col-on-xl",
    all_5ColOnXl: "pf-m-all-5-col-on-xl",
    all_6ColOnXl: "pf-m-all-6-col-on-xl",
    all_7ColOnXl: "pf-m-all-7-col-on-xl",
    all_8ColOnXl: "pf-m-all-8-col-on-xl",
    all_9ColOnXl: "pf-m-all-9-col-on-xl",
    all_10ColOnXl: "pf-m-all-10-col-on-xl",
    all_11ColOnXl: "pf-m-all-11-col-on-xl",
    all_12ColOnXl: "pf-m-all-12-col-on-xl",
    all_1ColOn_2xl: "pf-m-all-1-col-on-2xl",
    all_2ColOn_2xl: "pf-m-all-2-col-on-2xl",
    all_3ColOn_2xl: "pf-m-all-3-col-on-2xl",
    all_4ColOn_2xl: "pf-m-all-4-col-on-2xl",
    all_5ColOn_2xl: "pf-m-all-5-col-on-2xl",
    all_6ColOn_2xl: "pf-m-all-6-col-on-2xl",
    all_7ColOn_2xl: "pf-m-all-7-col-on-2xl",
    all_8ColOn_2xl: "pf-m-all-8-col-on-2xl",
    all_9ColOn_2xl: "pf-m-all-9-col-on-2xl",
    all_10ColOn_2xl: "pf-m-all-10-col-on-2xl",
    all_11ColOn_2xl: "pf-m-all-11-col-on-2xl",
    all_12ColOn_2xl: "pf-m-all-12-col-on-2xl",
    "1Col": "pf-m-1-col",
    "2Col": "pf-m-2-col",
    "3Col": "pf-m-3-col",
    "4Col": "pf-m-4-col",
    "5Col": "pf-m-5-col",
    "6Col": "pf-m-6-col",
    "7Col": "pf-m-7-col",
    "8Col": "pf-m-8-col",
    "9Col": "pf-m-9-col",
    "10Col": "pf-m-10-col",
    "11Col": "pf-m-11-col",
    "12Col": "pf-m-12-col",
    offset_1Col: "pf-m-offset-1-col",
    offset_2Col: "pf-m-offset-2-col",
    offset_3Col: "pf-m-offset-3-col",
    offset_4Col: "pf-m-offset-4-col",
    offset_5Col: "pf-m-offset-5-col",
    offset_6Col: "pf-m-offset-6-col",
    offset_7Col: "pf-m-offset-7-col",
    offset_8Col: "pf-m-offset-8-col",
    offset_9Col: "pf-m-offset-9-col",
    offset_10Col: "pf-m-offset-10-col",
    offset_11Col: "pf-m-offset-11-col",
    offset_12Col: "pf-m-offset-12-col",
    "1Row": "pf-m-1-row",
    "2Row": "pf-m-2-row",
    "3Row": "pf-m-3-row",
    "4Row": "pf-m-4-row",
    "5Row": "pf-m-5-row",
    "6Row": "pf-m-6-row",
    "7Row": "pf-m-7-row",
    "8Row": "pf-m-8-row",
    "9Row": "pf-m-9-row",
    "10Row": "pf-m-10-row",
    "11Row": "pf-m-11-row",
    "12Row": "pf-m-12-row",
    "1ColOnSm": "pf-m-1-col-on-sm",
    "2ColOnSm": "pf-m-2-col-on-sm",
    "3ColOnSm": "pf-m-3-col-on-sm",
    "4ColOnSm": "pf-m-4-col-on-sm",
    "5ColOnSm": "pf-m-5-col-on-sm",
    "6ColOnSm": "pf-m-6-col-on-sm",
    "7ColOnSm": "pf-m-7-col-on-sm",
    "8ColOnSm": "pf-m-8-col-on-sm",
    "9ColOnSm": "pf-m-9-col-on-sm",
    "10ColOnSm": "pf-m-10-col-on-sm",
    "11ColOnSm": "pf-m-11-col-on-sm",
    "12ColOnSm": "pf-m-12-col-on-sm",
    offset_1ColOnSm: "pf-m-offset-1-col-on-sm",
    offset_2ColOnSm: "pf-m-offset-2-col-on-sm",
    offset_3ColOnSm: "pf-m-offset-3-col-on-sm",
    offset_4ColOnSm: "pf-m-offset-4-col-on-sm",
    offset_5ColOnSm: "pf-m-offset-5-col-on-sm",
    offset_6ColOnSm: "pf-m-offset-6-col-on-sm",
    offset_7ColOnSm: "pf-m-offset-7-col-on-sm",
    offset_8ColOnSm: "pf-m-offset-8-col-on-sm",
    offset_9ColOnSm: "pf-m-offset-9-col-on-sm",
    offset_10ColOnSm: "pf-m-offset-10-col-on-sm",
    offset_11ColOnSm: "pf-m-offset-11-col-on-sm",
    offset_12ColOnSm: "pf-m-offset-12-col-on-sm",
    "1RowOnSm": "pf-m-1-row-on-sm",
    "2RowOnSm": "pf-m-2-row-on-sm",
    "3RowOnSm": "pf-m-3-row-on-sm",
    "4RowOnSm": "pf-m-4-row-on-sm",
    "5RowOnSm": "pf-m-5-row-on-sm",
    "6RowOnSm": "pf-m-6-row-on-sm",
    "7RowOnSm": "pf-m-7-row-on-sm",
    "8RowOnSm": "pf-m-8-row-on-sm",
    "9RowOnSm": "pf-m-9-row-on-sm",
    "10RowOnSm": "pf-m-10-row-on-sm",
    "11RowOnSm": "pf-m-11-row-on-sm",
    "12RowOnSm": "pf-m-12-row-on-sm",
    "1ColOnMd": "pf-m-1-col-on-md",
    "2ColOnMd": "pf-m-2-col-on-md",
    "3ColOnMd": "pf-m-3-col-on-md",
    "4ColOnMd": "pf-m-4-col-on-md",
    "5ColOnMd": "pf-m-5-col-on-md",
    "6ColOnMd": "pf-m-6-col-on-md",
    "7ColOnMd": "pf-m-7-col-on-md",
    "8ColOnMd": "pf-m-8-col-on-md",
    "9ColOnMd": "pf-m-9-col-on-md",
    "10ColOnMd": "pf-m-10-col-on-md",
    "11ColOnMd": "pf-m-11-col-on-md",
    "12ColOnMd": "pf-m-12-col-on-md",
    offset_1ColOnMd: "pf-m-offset-1-col-on-md",
    offset_2ColOnMd: "pf-m-offset-2-col-on-md",
    offset_3ColOnMd: "pf-m-offset-3-col-on-md",
    offset_4ColOnMd: "pf-m-offset-4-col-on-md",
    offset_5ColOnMd: "pf-m-offset-5-col-on-md",
    offset_6ColOnMd: "pf-m-offset-6-col-on-md",
    offset_7ColOnMd: "pf-m-offset-7-col-on-md",
    offset_8ColOnMd: "pf-m-offset-8-col-on-md",
    offset_9ColOnMd: "pf-m-offset-9-col-on-md",
    offset_10ColOnMd: "pf-m-offset-10-col-on-md",
    offset_11ColOnMd: "pf-m-offset-11-col-on-md",
    offset_12ColOnMd: "pf-m-offset-12-col-on-md",
    "1RowOnMd": "pf-m-1-row-on-md",
    "2RowOnMd": "pf-m-2-row-on-md",
    "3RowOnMd": "pf-m-3-row-on-md",
    "4RowOnMd": "pf-m-4-row-on-md",
    "5RowOnMd": "pf-m-5-row-on-md",
    "6RowOnMd": "pf-m-6-row-on-md",
    "7RowOnMd": "pf-m-7-row-on-md",
    "8RowOnMd": "pf-m-8-row-on-md",
    "9RowOnMd": "pf-m-9-row-on-md",
    "10RowOnMd": "pf-m-10-row-on-md",
    "11RowOnMd": "pf-m-11-row-on-md",
    "12RowOnMd": "pf-m-12-row-on-md",
    "1ColOnLg": "pf-m-1-col-on-lg",
    "2ColOnLg": "pf-m-2-col-on-lg",
    "3ColOnLg": "pf-m-3-col-on-lg",
    "4ColOnLg": "pf-m-4-col-on-lg",
    "5ColOnLg": "pf-m-5-col-on-lg",
    "6ColOnLg": "pf-m-6-col-on-lg",
    "7ColOnLg": "pf-m-7-col-on-lg",
    "8ColOnLg": "pf-m-8-col-on-lg",
    "9ColOnLg": "pf-m-9-col-on-lg",
    "10ColOnLg": "pf-m-10-col-on-lg",
    "11ColOnLg": "pf-m-11-col-on-lg",
    "12ColOnLg": "pf-m-12-col-on-lg",
    offset_1ColOnLg: "pf-m-offset-1-col-on-lg",
    offset_2ColOnLg: "pf-m-offset-2-col-on-lg",
    offset_3ColOnLg: "pf-m-offset-3-col-on-lg",
    offset_4ColOnLg: "pf-m-offset-4-col-on-lg",
    offset_5ColOnLg: "pf-m-offset-5-col-on-lg",
    offset_6ColOnLg: "pf-m-offset-6-col-on-lg",
    offset_7ColOnLg: "pf-m-offset-7-col-on-lg",
    offset_8ColOnLg: "pf-m-offset-8-col-on-lg",
    offset_9ColOnLg: "pf-m-offset-9-col-on-lg",
    offset_10ColOnLg: "pf-m-offset-10-col-on-lg",
    offset_11ColOnLg: "pf-m-offset-11-col-on-lg",
    offset_12ColOnLg: "pf-m-offset-12-col-on-lg",
    "1RowOnLg": "pf-m-1-row-on-lg",
    "2RowOnLg": "pf-m-2-row-on-lg",
    "3RowOnLg": "pf-m-3-row-on-lg",
    "4RowOnLg": "pf-m-4-row-on-lg",
    "5RowOnLg": "pf-m-5-row-on-lg",
    "6RowOnLg": "pf-m-6-row-on-lg",
    "7RowOnLg": "pf-m-7-row-on-lg",
    "8RowOnLg": "pf-m-8-row-on-lg",
    "9RowOnLg": "pf-m-9-row-on-lg",
    "10RowOnLg": "pf-m-10-row-on-lg",
    "11RowOnLg": "pf-m-11-row-on-lg",
    "12RowOnLg": "pf-m-12-row-on-lg",
    "1ColOnXl": "pf-m-1-col-on-xl",
    "2ColOnXl": "pf-m-2-col-on-xl",
    "3ColOnXl": "pf-m-3-col-on-xl",
    "4ColOnXl": "pf-m-4-col-on-xl",
    "5ColOnXl": "pf-m-5-col-on-xl",
    "6ColOnXl": "pf-m-6-col-on-xl",
    "7ColOnXl": "pf-m-7-col-on-xl",
    "8ColOnXl": "pf-m-8-col-on-xl",
    "9ColOnXl": "pf-m-9-col-on-xl",
    "10ColOnXl": "pf-m-10-col-on-xl",
    "11ColOnXl": "pf-m-11-col-on-xl",
    "12ColOnXl": "pf-m-12-col-on-xl",
    offset_1ColOnXl: "pf-m-offset-1-col-on-xl",
    offset_2ColOnXl: "pf-m-offset-2-col-on-xl",
    offset_3ColOnXl: "pf-m-offset-3-col-on-xl",
    offset_4ColOnXl: "pf-m-offset-4-col-on-xl",
    offset_5ColOnXl: "pf-m-offset-5-col-on-xl",
    offset_6ColOnXl: "pf-m-offset-6-col-on-xl",
    offset_7ColOnXl: "pf-m-offset-7-col-on-xl",
    offset_8ColOnXl: "pf-m-offset-8-col-on-xl",
    offset_9ColOnXl: "pf-m-offset-9-col-on-xl",
    offset_10ColOnXl: "pf-m-offset-10-col-on-xl",
    offset_11ColOnXl: "pf-m-offset-11-col-on-xl",
    offset_12ColOnXl: "pf-m-offset-12-col-on-xl",
    "1RowOnXl": "pf-m-1-row-on-xl",
    "2RowOnXl": "pf-m-2-row-on-xl",
    "3RowOnXl": "pf-m-3-row-on-xl",
    "4RowOnXl": "pf-m-4-row-on-xl",
    "5RowOnXl": "pf-m-5-row-on-xl",
    "6RowOnXl": "pf-m-6-row-on-xl",
    "7RowOnXl": "pf-m-7-row-on-xl",
    "8RowOnXl": "pf-m-8-row-on-xl",
    "9RowOnXl": "pf-m-9-row-on-xl",
    "10RowOnXl": "pf-m-10-row-on-xl",
    "11RowOnXl": "pf-m-11-row-on-xl",
    "12RowOnXl": "pf-m-12-row-on-xl",
    "1ColOn_2xl": "pf-m-1-col-on-2xl",
    "2ColOn_2xl": "pf-m-2-col-on-2xl",
    "3ColOn_2xl": "pf-m-3-col-on-2xl",
    "4ColOn_2xl": "pf-m-4-col-on-2xl",
    "5ColOn_2xl": "pf-m-5-col-on-2xl",
    "6ColOn_2xl": "pf-m-6-col-on-2xl",
    "7ColOn_2xl": "pf-m-7-col-on-2xl",
    "8ColOn_2xl": "pf-m-8-col-on-2xl",
    "9ColOn_2xl": "pf-m-9-col-on-2xl",
    "10ColOn_2xl": "pf-m-10-col-on-2xl",
    "11ColOn_2xl": "pf-m-11-col-on-2xl",
    "12ColOn_2xl": "pf-m-12-col-on-2xl",
    offset_1ColOn_2xl: "pf-m-offset-1-col-on-2xl",
    offset_2ColOn_2xl: "pf-m-offset-2-col-on-2xl",
    offset_3ColOn_2xl: "pf-m-offset-3-col-on-2xl",
    offset_4ColOn_2xl: "pf-m-offset-4-col-on-2xl",
    offset_5ColOn_2xl: "pf-m-offset-5-col-on-2xl",
    offset_6ColOn_2xl: "pf-m-offset-6-col-on-2xl",
    offset_7ColOn_2xl: "pf-m-offset-7-col-on-2xl",
    offset_8ColOn_2xl: "pf-m-offset-8-col-on-2xl",
    offset_9ColOn_2xl: "pf-m-offset-9-col-on-2xl",
    offset_10ColOn_2xl: "pf-m-offset-10-col-on-2xl",
    offset_11ColOn_2xl: "pf-m-offset-11-col-on-2xl",
    offset_12ColOn_2xl: "pf-m-offset-12-col-on-2xl",
    "1RowOn_2xl": "pf-m-1-row-on-2xl",
    "2RowOn_2xl": "pf-m-2-row-on-2xl",
    "3RowOn_2xl": "pf-m-3-row-on-2xl",
    "4RowOn_2xl": "pf-m-4-row-on-2xl",
    "5RowOn_2xl": "pf-m-5-row-on-2xl",
    "6RowOn_2xl": "pf-m-6-row-on-2xl",
    "7RowOn_2xl": "pf-m-7-row-on-2xl",
    "8RowOn_2xl": "pf-m-8-row-on-2xl",
    "9RowOn_2xl": "pf-m-9-row-on-2xl",
    "10RowOn_2xl": "pf-m-10-row-on-2xl",
    "11RowOn_2xl": "pf-m-11-row-on-2xl",
    "12RowOn_2xl": "pf-m-12-row-on-2xl",
    gutter: "pf-m-gutter"
  }
};

var BaseSizes;
(function (BaseSizes) {
    BaseSizes["xs"] = "xs";
    BaseSizes["sm"] = "sm";
    BaseSizes["md"] = "md";
    BaseSizes["lg"] = "lg";
    BaseSizes["xl"] = "xl";
    BaseSizes["2xl"] = "2xl";
    BaseSizes["3xl"] = "3xl";
    BaseSizes["4xl"] = "4xl";
})(BaseSizes || (BaseSizes = {}));
var DeviceSizes;
(function (DeviceSizes) {
    DeviceSizes["sm"] = "Sm";
    DeviceSizes["md"] = "Md";
    DeviceSizes["lg"] = "Lg";
    DeviceSizes["xl"] = "Xl";
    DeviceSizes["xl2"] = "_2xl";
})(DeviceSizes || (DeviceSizes = {}));

const l_grid_item_Order = {
  "name": "--pf-l-grid--item--Order",
  "value": "0",
  "var": "var(--pf-l-grid--item--Order)"
};

const Grid = (_a) => {
    var { children = null, className = '', component = 'div', hasGutter, span = null, order, style } = _a, props = __rest(_a, ["children", "className", "component", "hasGutter", "span", "order", "style"]);
    const classes = [styles$F.grid, span && styles$F.modifiers[`all_${span}Col`]];
    const Component = component;
    Object.entries(DeviceSizes).forEach(([propKey, gridSpanModifier]) => {
        const key = propKey;
        const propValue = props[key];
        if (propValue) {
            classes.push(styles$F.modifiers[`all_${propValue}ColOn${gridSpanModifier}`]);
        }
        delete props[key];
    });
    return (react.createElement(Component, Object.assign({ className: css(...classes, hasGutter && styles$F.modifiers.gutter, className), style: style || order ? Object.assign(Object.assign({}, style), setBreakpointCssVars(order, l_grid_item_Order.name)) : undefined }, props), children));
};
Grid.displayName = 'Grid';

const GridItem = (_a) => {
    var { children = null, className = '', component = 'div', span = null, rowSpan = null, offset = null, order, style } = _a, props = __rest(_a, ["children", "className", "component", "span", "rowSpan", "offset", "order", "style"]);
    const classes = [
        styles$F.gridItem,
        span && styles$F.modifiers[`${span}Col`],
        rowSpan && styles$F.modifiers[`${rowSpan}Row`],
        offset && styles$F.modifiers[`offset_${offset}Col`]
    ];
    const Component = component;
    Object.entries(DeviceSizes).forEach(([propKey, classModifier]) => {
        const key = propKey;
        const rowSpanKey = `${key}RowSpan`;
        const offsetKey = `${key}Offset`;
        const spanValue = props[key];
        const rowSpanValue = props[rowSpanKey];
        const offsetValue = props[offsetKey];
        if (spanValue) {
            classes.push(styles$F.modifiers[`${spanValue}ColOn${classModifier}`]);
        }
        if (rowSpanValue) {
            classes.push(styles$F.modifiers[`${rowSpanValue}RowOn${classModifier}`]);
        }
        if (offsetValue) {
            classes.push(styles$F.modifiers[`offset_${offsetValue}ColOn${classModifier}`]);
        }
        delete props[key];
        delete props[rowSpanKey];
        delete props[offsetKey];
    });
    return (react.createElement(Component, Object.assign({ className: css(...classes, className), style: style || order ? Object.assign(Object.assign({}, style), setBreakpointCssVars(order, l_grid_item_Order.name)) : undefined }, props), children));
};
GridItem.displayName = 'GridItem';

import('../common/level-a1fd3a63.js');
var styles$G = {
  level: "pf-l-level",
  modifiers: {
    gutter: "pf-m-gutter"
  }
};

const Level = (_a) => {
    var { hasGutter, className = '', children = null } = _a, props = __rest(_a, ["hasGutter", "className", "children"]);
    return (react.createElement("div", Object.assign({}, props, { className: css(styles$G.level, hasGutter && styles$G.modifiers.gutter, className) }), children));
};
Level.displayName = 'Level';

const LevelItem = (_a) => {
    var { children = null } = _a, props = __rest(_a, ["children"]);
    return (react.createElement("div", Object.assign({}, props), children));
};
LevelItem.displayName = 'LevelItem';

import('../common/split-6c7e8529.js');
var styles$H = {
  modifiers: {
    wrap: "pf-m-wrap",
    fill: "pf-m-fill",
    gutter: "pf-m-gutter"
  },
  split: "pf-l-split",
  splitItem: "pf-l-split__item"
};

const Split = (_a) => {
    var { hasGutter = false, isWrappable = false, className = '', children = null, component = 'div' } = _a, props = __rest(_a, ["hasGutter", "isWrappable", "className", "children", "component"]);
    const Component = component;
    return (react.createElement(Component, Object.assign({}, props, { className: css(styles$H.split, hasGutter && styles$H.modifiers.gutter, isWrappable && styles$H.modifiers.wrap, className) }), children));
};
Split.displayName = 'Split';

const SplitItem = (_a) => {
    var { isFilled = false, className = '', children = null } = _a, props = __rest(_a, ["isFilled", "className", "children"]);
    return (react.createElement("div", Object.assign({}, props, { className: css(styles$H.splitItem, isFilled && styles$H.modifiers.fill, className) }), children));
};
SplitItem.displayName = 'SplitItem';

import('../common/stack-89e091c0.js');
var styles$I = {
  modifiers: {
    fill: "pf-m-fill",
    gutter: "pf-m-gutter"
  },
  stack: "pf-l-stack",
  stackItem: "pf-l-stack__item"
};

const Stack = (_a) => {
    var { hasGutter = false, className = '', children = null, component = 'div' } = _a, props = __rest(_a, ["hasGutter", "className", "children", "component"]);
    const Component = component;
    return (react.createElement(Component, Object.assign({}, props, { className: css(styles$I.stack, hasGutter && styles$I.modifiers.gutter, className) }), children));
};
Stack.displayName = 'Stack';

const StackItem = (_a) => {
    var { isFilled = false, className = '', children = null } = _a, props = __rest(_a, ["isFilled", "className", "children"]);
    return (react.createElement("div", Object.assign({}, props, { className: css(styles$I.stackItem, isFilled && styles$I.modifiers.fill, className) }), children));
};
StackItem.displayName = 'StackItem';

export { ActionGroup, ActionList, ActionListItem, Alert, AlertActionCloseButton, AlertActionLink, AlertGroup, AlertVariant, Avatar, Badge, Brand, Breadcrumb, BreadcrumbItem, Card, CardActions, CardBody, CardFooter, CardHeader, CardTitle, Chip, ChipGroup, ClipboardCopy, ClipboardCopyButton, CodeBlock, CodeBlockAction, ContextSelector, ContextSelectorItem, DataList, DataListAction, DataListCell, DataListCheck, DataListControl, DataListDragButton, DataListItem, DataListItemCells, DataListItemRow, DataListToggle, DatePicker, DescriptionListDescription, DescriptionListGroup, DescriptionListTerm, Drawer, DrawerActions, DrawerCloseButton, DrawerContent, DrawerContentBody, DrawerHead, DrawerPanelContent, DropdownGroup, DropdownToggle, EmptyStatePrimary, ExpandableSection, FileUpload, Flex, FlexItem, Form, FormGroup, Gallery, GalleryItem, GenerateId, Grid, GridItem, InputGroup, JumpLinks, JumpLinksItem, Label, Level, LevelItem, List, ListItem, ListVariant, Modal, ModalVariant, Nav, NavGroup, NavItem, NavList, NumberInput, Page, PageHeader, PageHeaderTools, PageHeaderToolsGroup, PageHeaderToolsItem, PageSection, PageSectionVariants, PageSidebar, Pagination, Radio, SearchInput, Select, SelectDirection, SelectGroup, SelectOption, SelectVariant, Split, SplitItem, Stack, StackItem, Switch, Tab, TabContent, TabTitleText, Tabs, TabsComponent, Text, TextArea, TextContent, TextList, TextListItem, TextVariants, TimePicker, ToggleGroup, ToggleGroupItem, Toolbar, ToolbarContent, ToolbarGroup, ToolbarItem, Wizard, WizardContextConsumer, WizardFooter };
