import { r as react } from './index-7cda8b13.js';
import { a as canUseDOM, k as keyHandler, c as css, h as formatBreakpointMods, m as preventedEvents, n as trimLeft } from './util-badff3ce.js';
import { _ as __rest } from './tslib.es6-e6488692.js';
import { r as reactDom } from './index-916de6ed.js';
import { e as getOUIAProps, h as Popper, n as useOUIAId, o as KEYHANDLER_DIRECTION, b as Tooltip, u as useOUIAProps, j as KEY_CODES, f as getDefaultOUIAId, g as getResizeObserver, V as ValidatedOptions } from './EmptyState-25333d4a.js';
import { c as createIcon } from './times-icon-8cdcb920.js';

/**
 * This function is a helper for handling basic arrow keyboard interactions. If a component already has its own key handler and event start up/tear down, this function may be easier to integrate in over the full component.
 *
 * @param {event} event Event triggered by the keyboard
 * @param {element[]} navigableElements Valid traversable elements of the container
 * @param {function} isActiveElement Callback to determine if a given element from the navigable elements array is the active element of the page
 * @param {function} getFocusableElement Callback returning the focusable element of a given element from the navigable elements array
 * @param {string[]} validSiblingTags Valid sibling tags that horizontal arrow handling will focus
 * @param {boolean} noVerticalArrowHandling Flag indicating that the included vertical arrow key handling should be ignored
 * @param {boolean} noHorizontalArrowHandling Flag indicating that the included horizontal arrow key handling should be ignored
 * @param {boolean} updateTabIndex Flag indicating that the tabIndex of the currently focused element and next focused element should be updated, in the case of using a roving tabIndex
 * @param {boolean} onlyTraverseSiblings Flag indicating that next focusable element of a horizontal movement will be this element's sibling
 */
const handleArrows = (event, navigableElements, isActiveElement = element => document.activeElement.contains(element), getFocusableElement = element => element, validSiblingTags = ['A', 'BUTTON', 'INPUT'], noVerticalArrowHandling = false, noHorizontalArrowHandling = false, updateTabIndex = true, onlyTraverseSiblings = true) => {
    const activeElement = document.activeElement;
    const key = event.key;
    let moveTarget = null;
    // Handle vertical arrow keys. If noVerticalArrowHandling is passed, skip this block
    if (!noVerticalArrowHandling) {
        if (['ArrowUp', 'ArrowDown'].includes(key)) {
            event.preventDefault();
            event.stopImmediatePropagation(); // For menus in menus
            // Traverse navigableElements to find the element which is currently active
            let currentIndex = -1;
            // while (currentIndex === -1) {
            navigableElements.forEach((element, index) => {
                if (isActiveElement(element)) {
                    // Once found, move up or down the array by 1. Determined by the vertical arrow key direction
                    let increment = 0;
                    // keep increasing the increment until you've tried the whole navigableElement
                    while (!moveTarget && increment < navigableElements.length && increment * -1 < navigableElements.length) {
                        key === 'ArrowUp' ? increment-- : increment++;
                        currentIndex = index + increment;
                        if (currentIndex >= navigableElements.length) {
                            currentIndex = 0;
                        }
                        if (currentIndex < 0) {
                            currentIndex = navigableElements.length - 1;
                        }
                        // Set the next target element (undefined if none found)
                        moveTarget = getFocusableElement(navigableElements[currentIndex]);
                    }
                }
            });
            // }
        }
    }
    // Handle horizontal arrow keys. If noHorizontalArrowHandling is passed, skip this block
    if (!noHorizontalArrowHandling) {
        if (['ArrowLeft', 'ArrowRight'].includes(key)) {
            event.preventDefault();
            event.stopImmediatePropagation(); // For menus in menus
            let currentIndex = -1;
            navigableElements.forEach((element, index) => {
                if (isActiveElement(element)) {
                    const activeRow = navigableElements[index].querySelectorAll(validSiblingTags.join(',')); // all focusable elements in my row
                    if (!activeRow.length || onlyTraverseSiblings) {
                        let nextSibling = activeElement;
                        // While a sibling exists, check each sibling to determine if it should be focussed
                        while (nextSibling) {
                            // Set the next checked sibling, determined by the horizontal arrow key direction
                            nextSibling = key === 'ArrowLeft' ? nextSibling.previousElementSibling : nextSibling.nextElementSibling;
                            if (nextSibling) {
                                if (validSiblingTags.includes(nextSibling.tagName)) {
                                    // If the sibling's tag is included in validSiblingTags, set the next target element and break the loop
                                    moveTarget = nextSibling;
                                    break;
                                }
                                // If the sibling's tag is not valid, skip to the next sibling if possible
                            }
                        }
                    }
                    else {
                        activeRow.forEach((focusableElement, index) => {
                            if (event.target === focusableElement) {
                                // Once found, move up or down the array by 1. Determined by the vertical arrow key direction
                                const increment = key === 'ArrowLeft' ? -1 : 1;
                                currentIndex = index + increment;
                                if (currentIndex >= activeRow.length) {
                                    currentIndex = 0;
                                }
                                if (currentIndex < 0) {
                                    currentIndex = activeRow.length - 1;
                                }
                                // Set the next target element
                                moveTarget = activeRow[currentIndex];
                            }
                        });
                    }
                }
            });
        }
    }
    if (moveTarget) {
        // If updateTabIndex is true, set the previously focussed element's tabIndex to -1 and the next focussed element's tabIndex to 0
        // This updates the tabIndex for a roving tabIndex
        if (updateTabIndex) {
            activeElement.tabIndex = -1;
            moveTarget.tabIndex = 0;
        }
        // If a move target has been set by either arrow handler, focus that target
        moveTarget.focus();
    }
};
/**
 * This function is a helper for setting the initial tabIndexes in a roving tabIndex
 *
 * @param {HTMLElement[]} options Array of elements which should have a tabIndex of -1, except for the first element which will have a tabIndex of 0
 */
const setTabIndex = (options) => {
    if (options && options.length > 0) {
        // Iterate the options and set the tabIndex to -1 on every option
        options.forEach((option) => {
            option.tabIndex = -1;
        });
        // Manually set the tabIndex of the first option to 0
        options[0].tabIndex = 0;
    }
};
class KeyboardHandler extends react.Component {
    constructor() {
        super(...arguments);
        this.keyHandler = (event) => {
            const { isEventFromContainer } = this.props;
            // If the passed keyboard event is not from the container, ignore the event by returning
            if (isEventFromContainer ? !isEventFromContainer(event) : !this._isEventFromContainer(event)) {
                return;
            }
            const { isActiveElement, getFocusableElement, noVerticalArrowHandling, noHorizontalArrowHandling, noEnterHandling, noSpaceHandling, updateTabIndex, validSiblingTags, additionalKeyHandler, createNavigableElements, onlyTraverseSiblings } = this.props;
            // Pass the event off to be handled by any custom handler
            additionalKeyHandler && additionalKeyHandler(event);
            // Initalize navigableElements from the createNavigableElements callback
            const navigableElements = createNavigableElements();
            if (!navigableElements) {
                // eslint-disable-next-line no-console
                console.warn('No navigable elements have been passed to the KeyboardHandler. Keyboard navigation provided by this component will be ignored.');
                return;
            }
            const key = event.key;
            // Handle enter key. If noEnterHandling is passed, skip this block
            if (!noEnterHandling) {
                if (key === 'Enter') {
                    event.preventDefault();
                    event.stopImmediatePropagation(); // For menus in menus
                    document.activeElement.click();
                }
            }
            // Handle space key. If noSpaceHandling is passed, skip this block
            if (!noSpaceHandling) {
                if (key === ' ') {
                    event.preventDefault();
                    event.stopImmediatePropagation(); // For menus in menus
                    document.activeElement.click();
                }
            }
            // Inject helper handler for arrow navigation
            handleArrows(event, navigableElements, isActiveElement, getFocusableElement, validSiblingTags, noVerticalArrowHandling, noHorizontalArrowHandling, updateTabIndex, onlyTraverseSiblings);
        };
        this._isEventFromContainer = (event) => {
            const { containerRef } = this.props;
            return containerRef.current && containerRef.current.contains(event.target);
        };
    }
    componentDidMount() {
        if (canUseDOM) {
            window.addEventListener('keydown', this.keyHandler);
        }
    }
    componentWillUnmount() {
        if (canUseDOM) {
            window.removeEventListener('keydown', this.keyHandler);
        }
    }
    render() {
        return null;
    }
}
KeyboardHandler.displayName = 'KeyboardHandler';
KeyboardHandler.defaultProps = {
    containerRef: null,
    createNavigableElements: () => null,
    isActiveElement: (navigableElement) => document.activeElement === navigableElement,
    getFocusableElement: (navigableElement) => navigableElement,
    validSiblingTags: ['BUTTON', 'A'],
    onlyTraverseSiblings: true,
    updateTabIndex: true,
    noHorizontalArrowHandling: false,
    noVerticalArrowHandling: false,
    noEnterHandling: false,
    noSpaceHandling: false
};

import('./bullseye-a13bd1f6.js');
var styles = {
  bullseye: "pf-l-bullseye"
};

import('./form-control-c105f015.js');
var formStyles = {
  formControl: "pf-c-form-control",
  modifiers: {
    success: "pf-m-success",
    expanded: "pf-m-expanded",
    icon: "pf-m-icon",
    warning: "pf-m-warning",
    search: "pf-m-search",
    calendar: "pf-m-calendar",
    clock: "pf-m-clock",
    iconSprite: "pf-m-icon-sprite",
    placeholder: "pf-m-placeholder",
    resizeVertical: "pf-m-resize-vertical",
    resizeHorizontal: "pf-m-resize-horizontal"
  },
  themeDark: "pf-theme-dark"
};

import('./dropdown-8e9ededc.js');
var styles$1 = {
  badge: "pf-c-badge",
  check: "pf-c-check",
  divider: "pf-c-divider",
  dropdown: "pf-c-dropdown",
  dropdownGroup: "pf-c-dropdown__group",
  dropdownGroupTitle: "pf-c-dropdown__group-title",
  dropdownMenu: "pf-c-dropdown__menu",
  dropdownMenuItem: "pf-c-dropdown__menu-item",
  dropdownMenuItemDescription: "pf-c-dropdown__menu-item-description",
  dropdownMenuItemIcon: "pf-c-dropdown__menu-item-icon",
  dropdownMenuItemMain: "pf-c-dropdown__menu-item-main",
  dropdownToggle: "pf-c-dropdown__toggle",
  dropdownToggleButton: "pf-c-dropdown__toggle-button",
  dropdownToggleCheck: "pf-c-dropdown__toggle-check",
  dropdownToggleIcon: "pf-c-dropdown__toggle-icon",
  dropdownToggleImage: "pf-c-dropdown__toggle-image",
  dropdownToggleText: "pf-c-dropdown__toggle-text",
  menu: "pf-c-menu",
  modifiers: {
    fullHeight: "pf-m-full-height",
    expanded: "pf-m-expanded",
    action: "pf-m-action",
    disabled: "pf-m-disabled",
    plain: "pf-m-plain",
    text: "pf-m-text",
    splitButton: "pf-m-split-button",
    primary: "pf-m-primary",
    active: "pf-m-active",
    secondary: "pf-m-secondary",
    top: "pf-m-top",
    alignRight: "pf-m-align-right",
    alignLeft: "pf-m-align-left",
    alignRightOnSm: "pf-m-align-right-on-sm",
    alignLeftOnSm: "pf-m-align-left-on-sm",
    alignRightOnMd: "pf-m-align-right-on-md",
    alignLeftOnMd: "pf-m-align-left-on-md",
    alignRightOnLg: "pf-m-align-right-on-lg",
    alignLeftOnLg: "pf-m-align-left-on-lg",
    alignRightOnXl: "pf-m-align-right-on-xl",
    alignLeftOnXl: "pf-m-align-left-on-xl",
    alignRightOn_2xl: "pf-m-align-right-on-2xl",
    alignLeftOn_2xl: "pf-m-align-left-on-2xl",
    ariaDisabled: "pf-m-aria-disabled",
    icon: "pf-m-icon",
    description: "pf-m-description"
  },
  themeDark: "pf-theme-dark"
};

var DropdownPosition;
(function (DropdownPosition) {
    DropdownPosition["right"] = "right";
    DropdownPosition["left"] = "left";
})(DropdownPosition || (DropdownPosition = {}));
var DropdownDirection;
(function (DropdownDirection) {
    DropdownDirection["up"] = "up";
    DropdownDirection["down"] = "down";
})(DropdownDirection || (DropdownDirection = {}));
const DropdownContext = react.createContext({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSelect: (event) => undefined,
    id: '',
    toggleIndicatorClass: '',
    toggleIconClass: '',
    toggleTextClass: '',
    menuClass: '',
    itemClass: '',
    toggleClass: '',
    baseClass: '',
    baseComponent: 'div',
    sectionClass: '',
    sectionTitleClass: '',
    sectionComponent: 'section',
    disabledClass: '',
    plainTextClass: '',
    menuComponent: 'ul'
});
const DropdownArrowContext = react.createContext({
    keyHandler: null,
    sendRef: null
});

class DropdownMenu extends react.Component {
    constructor() {
        super(...arguments);
        this.refsCollection = [];
        this.componentWillUnmount = () => {
            document.removeEventListener('keydown', this.onKeyDown);
        };
        this.onKeyDown = (event) => {
            if (!this.props.isOpen ||
                !Array.from(document.activeElement.classList).find(className => DropdownMenu.validToggleClasses.concat(this.context.toggleClass).includes(className))) {
                return;
            }
            const refs = this.refsCollection;
            if (event.key === 'ArrowDown') {
                const firstFocusTargetCollection = refs.find(ref => ref && ref[0] && !ref[0].hasAttribute('disabled'));
                DropdownMenu.focusFirstRef(firstFocusTargetCollection);
                event.stopPropagation();
            }
            else if (event.key === 'ArrowUp') {
                const collectionLength = refs.length;
                const lastFocusTargetCollection = refs.slice(collectionLength - 1, collectionLength);
                const lastFocusTarget = lastFocusTargetCollection && lastFocusTargetCollection[0];
                DropdownMenu.focusFirstRef(lastFocusTarget);
                event.stopPropagation();
            }
        };
        this.childKeyHandler = (index, innerIndex, position, custom = false) => {
            keyHandler(index, innerIndex, position, this.refsCollection, this.props.isGrouped ? this.refsCollection : react.Children.toArray(this.props.children), custom);
        };
        this.sendRef = (index, nodes, isDisabled, isSeparator) => {
            this.refsCollection[index] = [];
            nodes.map((node, innerIndex) => {
                if (!node) {
                    this.refsCollection[index][innerIndex] = null;
                }
                else if (!node.getAttribute) {
                    // eslint-disable-next-line react/no-find-dom-node
                    this.refsCollection[index][innerIndex] = reactDom.findDOMNode(node);
                }
                else if (isSeparator) {
                    this.refsCollection[index][innerIndex] = null;
                }
                else {
                    this.refsCollection[index][innerIndex] = node;
                }
            });
        };
    }
    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown);
        const { autoFocus } = this.props;
        if (autoFocus) {
            // Focus first non-disabled element
            const focusTargetCollection = this.refsCollection.find(ref => ref && ref[0] && !ref[0].hasAttribute('disabled'));
            const focusTarget = focusTargetCollection && focusTargetCollection[0];
            if (focusTarget && focusTarget.focus) {
                setTimeout(() => focusTarget.focus());
            }
        }
    }
    shouldComponentUpdate() {
        // reset refsCollection before updating to account for child removal between mounts
        this.refsCollection = [];
        return true;
    }
    extendChildren() {
        const { children, isGrouped } = this.props;
        if (isGrouped) {
            let index = 0;
            return react.Children.map(children, groupedChildren => {
                const group = groupedChildren;
                const props = {};
                if (group.props && group.props.children) {
                    if (Array.isArray(group.props.children)) {
                        props.children = react.Children.map(group.props.children, option => react.cloneElement(option, {
                            index: index++
                        }));
                    }
                    else {
                        props.children = react.cloneElement(group.props.children, {
                            index: index++
                        });
                    }
                }
                return react.cloneElement(group, props);
            });
        }
        return react.Children.map(children, (child, index) => react.cloneElement(child, {
            index
        }));
    }
    render() {
        const _a = this.props, { className, isOpen, position, children, component, isGrouped, setMenuComponentRef, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        openedOnEnter, alignments } = _a, props = __rest(_a, ["className", "isOpen", "position", "children", "component", "isGrouped", "setMenuComponentRef", "openedOnEnter", "alignments"]);
        return (react.createElement(DropdownArrowContext.Provider, { value: {
                keyHandler: this.childKeyHandler,
                sendRef: this.sendRef
            } }, component === 'div' ? (react.createElement(DropdownContext.Consumer, null, ({ onSelect, menuClass }) => (react.createElement("div", { className: css(menuClass, position === DropdownPosition.right && styles$1.modifiers.alignRight, formatBreakpointMods(alignments, styles$1, 'align-'), className), hidden: !isOpen, onClick: event => onSelect && onSelect(event), ref: setMenuComponentRef }, children)))) : ((isGrouped && (react.createElement(DropdownContext.Consumer, null, ({ menuClass, menuComponent }) => {
            const MenuComponent = (menuComponent || 'div');
            return (react.createElement(MenuComponent, Object.assign({}, props, { className: css(menuClass, position === DropdownPosition.right && styles$1.modifiers.alignRight, formatBreakpointMods(alignments, styles$1, 'align-'), className), hidden: !isOpen, role: "menu", ref: setMenuComponentRef }), this.extendChildren()));
        }))) || (react.createElement(DropdownContext.Consumer, null, ({ menuClass, menuComponent }) => {
            const MenuComponent = (menuComponent || component);
            return (react.createElement(MenuComponent, Object.assign({}, props, { className: css(menuClass, position === DropdownPosition.right && styles$1.modifiers.alignRight, formatBreakpointMods(alignments, styles$1, 'align-'), className), hidden: !isOpen, role: "menu", ref: setMenuComponentRef }), this.extendChildren()));
        })))));
    }
}
DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.defaultProps = {
    className: '',
    isOpen: true,
    openedOnEnter: false,
    autoFocus: true,
    position: DropdownPosition.left,
    component: 'ul',
    isGrouped: false,
    setMenuComponentRef: null
};
DropdownMenu.validToggleClasses = [styles$1.dropdownToggle, styles$1.dropdownToggleButton];
DropdownMenu.focusFirstRef = (refCollection) => {
    if (refCollection && refCollection[0] && refCollection[0].focus) {
        setTimeout(() => refCollection[0].focus());
    }
};
DropdownMenu.contextType = DropdownContext;

class DropdownWithContext extends react.Component {
    constructor(props) {
        super(props);
        this.openedOnEnter = false;
        this.baseComponentRef = react.createRef();
        this.menuComponentRef = react.createRef();
        this.onEnter = () => {
            this.openedOnEnter = true;
        };
        this.setMenuComponentRef = (element) => {
            this.menuComponentRef = element;
        };
        this.getMenuComponentRef = () => this.menuComponentRef;
        if (props.dropdownItems && props.dropdownItems.length > 0 && props.children) {
            // eslint-disable-next-line no-console
            console.error('Children and dropdownItems props have been provided. Only the dropdownItems prop items will be rendered');
        }
    }
    componentDidUpdate() {
        if (!this.props.isOpen) {
            this.openedOnEnter = false;
        }
    }
    render() {
        const _a = this.props, { children, className, direction, dropdownItems, isOpen, isPlain, isText, isGrouped, isFullHeight, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSelect, position, toggle, autoFocus, menuAppendTo, isFlipEnabled } = _a, props = __rest(_a, ["children", "className", "direction", "dropdownItems", "isOpen", "isPlain", "isText", "isGrouped", "isFullHeight", "onSelect", "position", "toggle", "autoFocus", "menuAppendTo", "isFlipEnabled"]);
        const id = toggle.props.id || `pf-dropdown-toggle-id-${DropdownWithContext.currentId++}`;
        let component;
        let renderedContent;
        let ariaHasPopup = false;
        if (dropdownItems && dropdownItems.length > 0) {
            component = 'ul';
            renderedContent = dropdownItems;
            ariaHasPopup = true;
        }
        else {
            component = 'div';
            renderedContent = react.Children.toArray(children);
        }
        const openedOnEnter = this.openedOnEnter;
        return (react.createElement(DropdownContext.Consumer, null, ({ baseClass, baseComponent, id: contextId, ouiaId, ouiaComponentType, ouiaSafe, alignments }) => {
            const BaseComponent = baseComponent;
            const menuContainer = (react.createElement(DropdownMenu
            // This removes the `position: absolute` styling from the `.pf-c-dropdown__menu`
            // allowing the menu to flip correctly
            , Object.assign({}, (isFlipEnabled && { style: { position: 'revert', minWidth: 'min-content' } }), { setMenuComponentRef: this.setMenuComponentRef, component: component, isOpen: isOpen, position: position, "aria-labelledby": contextId ? `${contextId}-toggle` : id, isGrouped: isGrouped, autoFocus: openedOnEnter && autoFocus, alignments: alignments }), renderedContent));
            const popperContainer = (react.createElement("div", { className: css(baseClass, direction === DropdownDirection.up && styles$1.modifiers.top, position === DropdownPosition.right && styles$1.modifiers.alignRight, isOpen && styles$1.modifiers.expanded, className) }, isOpen && menuContainer));
            const mainContainer = (react.createElement(BaseComponent, Object.assign({}, props, { className: css(baseClass, direction === DropdownDirection.up && styles$1.modifiers.top, position === DropdownPosition.right && styles$1.modifiers.alignRight, isOpen && styles$1.modifiers.expanded, isFullHeight && styles$1.modifiers.fullHeight, className), ref: this.baseComponentRef }, getOUIAProps(ouiaComponentType, ouiaId, ouiaSafe)),
                react.Children.map(toggle, oneToggle => react.cloneElement(oneToggle, {
                    parentRef: this.baseComponentRef,
                    getMenuRef: this.getMenuComponentRef,
                    isOpen,
                    id,
                    isPlain,
                    isText,
                    'aria-haspopup': ariaHasPopup,
                    onEnter: () => {
                        this.onEnter();
                        oneToggle.props.onEnter && oneToggle.props.onEnter();
                    }
                })),
                menuAppendTo === 'inline' && isOpen && menuContainer));
            const getParentElement = () => {
                if (this.baseComponentRef && this.baseComponentRef.current) {
                    return this.baseComponentRef.current.parentElement;
                }
                return null;
            };
            return menuAppendTo === 'inline' ? (mainContainer) : (react.createElement(Popper, { trigger: mainContainer, popper: popperContainer, direction: direction, position: position, appendTo: menuAppendTo === 'parent' ? getParentElement() : menuAppendTo, isVisible: isOpen }));
        }));
    }
}
DropdownWithContext.displayName = 'DropdownWithContext';
// seed for the aria-labelledby ID
DropdownWithContext.currentId = 0;
DropdownWithContext.defaultProps = {
    className: '',
    dropdownItems: [],
    isOpen: false,
    isPlain: false,
    isText: false,
    isGrouped: false,
    position: DropdownPosition.left,
    direction: DropdownDirection.down,
    onSelect: () => undefined,
    autoFocus: true,
    menuAppendTo: 'inline',
    isFlipEnabled: false
};

const Dropdown = (_a) => {
    var { onSelect, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref, // Types of Ref are different for React.FunctionComponent vs React.Component
    ouiaId, ouiaSafe, alignments, contextProps, menuAppendTo = 'inline', isFlipEnabled = false } = _a, props = __rest(_a, ["onSelect", "ref", "ouiaId", "ouiaSafe", "alignments", "contextProps", "menuAppendTo", "isFlipEnabled"]);
    return (react.createElement(DropdownContext.Provider, { value: Object.assign({ onSelect: event => onSelect && onSelect(event), toggleTextClass: styles$1.dropdownToggleText, toggleIconClass: styles$1.dropdownToggleImage, toggleIndicatorClass: styles$1.dropdownToggleIcon, menuClass: styles$1.dropdownMenu, itemClass: styles$1.dropdownMenuItem, toggleClass: styles$1.dropdownToggle, baseClass: styles$1.dropdown, baseComponent: 'div', sectionClass: styles$1.dropdownGroup, sectionTitleClass: styles$1.dropdownGroupTitle, sectionComponent: 'section', disabledClass: styles$1.modifiers.disabled, plainTextClass: styles$1.modifiers.text, ouiaId: useOUIAId(Dropdown.displayName, ouiaId), ouiaSafe, ouiaComponentType: Dropdown.displayName, alignments }, contextProps) },
        react.createElement(DropdownWithContext, Object.assign({ menuAppendTo: menuAppendTo, isFlipEnabled: isFlipEnabled }, props))));
};
Dropdown.displayName = 'Dropdown';

class InternalDropdownItem extends react.Component {
    constructor() {
        super(...arguments);
        this.ref = react.createRef();
        this.additionalRef = react.createRef();
        this.getInnerNode = (node) => (node && node.childNodes && node.childNodes.length ? node.childNodes[0] : node);
        this.onKeyDown = (event) => {
            // Detected key press on this item, notify the menu parent so that the appropriate item can be focused
            const innerIndex = event.target === this.ref.current ? 0 : 1;
            if (!this.props.customChild) {
                event.preventDefault();
            }
            if (event.key === 'ArrowUp') {
                this.props.context.keyHandler(this.props.index, innerIndex, KEYHANDLER_DIRECTION.UP);
                event.stopPropagation();
            }
            else if (event.key === 'ArrowDown') {
                this.props.context.keyHandler(this.props.index, innerIndex, KEYHANDLER_DIRECTION.DOWN);
                event.stopPropagation();
            }
            else if (event.key === 'ArrowRight') {
                this.props.context.keyHandler(this.props.index, innerIndex, KEYHANDLER_DIRECTION.RIGHT);
                event.stopPropagation();
            }
            else if (event.key === 'ArrowLeft') {
                this.props.context.keyHandler(this.props.index, innerIndex, KEYHANDLER_DIRECTION.LEFT);
                event.stopPropagation();
            }
            else if (event.key === 'Enter' || event.key === ' ') {
                event.target.click();
                this.props.enterTriggersArrowDown &&
                    this.props.context.keyHandler(this.props.index, innerIndex, KEYHANDLER_DIRECTION.DOWN);
            }
        };
        this.componentRef = (element) => {
            this.ref.current = element;
            const { component } = this.props;
            const ref = component.ref;
            if (ref) {
                if (typeof ref === 'function') {
                    ref(element);
                }
                else {
                    ref.current = element;
                }
            }
        };
    }
    componentDidMount() {
        const { context, index, isDisabled, role, customChild, autoFocus } = this.props;
        const customRef = customChild ? this.getInnerNode(this.ref.current) : this.ref.current;
        context.sendRef(index, [customRef, customChild ? customRef : this.additionalRef.current], isDisabled, role === 'separator');
        autoFocus && setTimeout(() => customRef.focus());
    }
    componentDidUpdate() {
        const { context, index, isDisabled, role, customChild } = this.props;
        const customRef = customChild ? this.getInnerNode(this.ref.current) : this.ref.current;
        context.sendRef(index, [customRef, customChild ? customRef : this.additionalRef.current], isDisabled, role === 'separator');
    }
    extendAdditionalChildRef() {
        const { additionalChild } = this.props;
        return react.cloneElement(additionalChild, {
            ref: this.additionalRef
        });
    }
    render() {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const _a = this.props, { className, children, isHovered, context, onClick, component, role, isDisabled, isAriaDisabled, isPlainText, index, href, tooltip, tooltipProps, id, componentID, listItemClassName, additionalChild, customChild, enterTriggersArrowDown, icon, autoFocus, styleChildren, description, inoperableEvents } = _a, additionalProps = __rest(_a, ["className", "children", "isHovered", "context", "onClick", "component", "role", "isDisabled", "isAriaDisabled", "isPlainText", "index", "href", "tooltip", "tooltipProps", "id", "componentID", "listItemClassName", "additionalChild", "customChild", "enterTriggersArrowDown", "icon", "autoFocus", "styleChildren", "description", "inoperableEvents"]);
        /* eslint-enable @typescript-eslint/no-unused-vars */
        let classes = css(icon && styles$1.modifiers.icon, isAriaDisabled && styles$1.modifiers.ariaDisabled, className);
        if (component === 'a') {
            additionalProps['aria-disabled'] = isDisabled || isAriaDisabled;
        }
        else if (component === 'button') {
            additionalProps['aria-disabled'] = isDisabled || isAriaDisabled;
            additionalProps.type = additionalProps.type || 'button';
        }
        const renderWithTooltip = (childNode) => tooltip ? (react.createElement(Tooltip, Object.assign({ content: tooltip }, tooltipProps), childNode)) : (childNode);
        const renderClonedComponent = (element) => react.cloneElement(element, Object.assign(Object.assign({}, (styleChildren && {
            className: css(element.props.className, classes)
        })), (this.props.role !== 'separator' && { role, ref: this.componentRef })));
        const renderDefaultComponent = (tag) => {
            const Component = tag;
            const componentContent = description ? (react.createElement(react.Fragment, null,
                react.createElement("div", { className: styles$1.dropdownMenuItemMain },
                    icon && react.createElement("span", { className: css(styles$1.dropdownMenuItemIcon) }, icon),
                    children),
                react.createElement("div", { className: styles$1.dropdownMenuItemDescription }, description))) : (react.createElement(react.Fragment, null,
                icon && react.createElement("span", { className: css(styles$1.dropdownMenuItemIcon) }, icon),
                children));
            return (react.createElement(Component, Object.assign({}, additionalProps, (isDisabled || isAriaDisabled ? preventedEvents(inoperableEvents) : null), { href: href, ref: this.ref, className: classes, id: componentID, role: role }), componentContent));
        };
        return (react.createElement(DropdownContext.Consumer, null, ({ onSelect, itemClass, disabledClass, plainTextClass }) => {
            if (this.props.role !== 'separator') {
                classes = css(classes, isDisabled && disabledClass, isPlainText && plainTextClass, itemClass, description && styles$1.modifiers.description);
            }
            if (customChild) {
                return react.cloneElement(customChild, {
                    ref: this.ref,
                    onKeyDown: this.onKeyDown
                });
            }
            return (react.createElement("li", { className: listItemClassName || null, role: "none", onKeyDown: this.onKeyDown, onClick: (event) => {
                    if (!isDisabled && !isAriaDisabled) {
                        onClick(event);
                        onSelect(event);
                    }
                }, id: id },
                renderWithTooltip(react.isValidElement(component)
                    ? renderClonedComponent(component)
                    : renderDefaultComponent(component)),
                additionalChild && this.extendAdditionalChildRef()));
        }));
    }
}
InternalDropdownItem.displayName = 'InternalDropdownItem';
InternalDropdownItem.defaultProps = {
    className: '',
    isHovered: false,
    component: 'a',
    role: 'none',
    isDisabled: false,
    isPlainText: false,
    tooltipProps: {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onClick: (event) => undefined,
    index: -1,
    context: {
        keyHandler: () => { },
        sendRef: () => { }
    },
    enterTriggersArrowDown: false,
    icon: null,
    styleChildren: true,
    description: null,
    inoperableEvents: ['onClick', 'onKeyPress']
};

const DropdownItem = (_a) => {
    var { children, className, component = 'a', isDisabled = false, isAriaDisabled = false, isPlainText = false, isHovered = false, href, tooltip, tooltipProps = {}, listItemClassName, onClick, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref, // Types of Ref are different for React.FunctionComponent vs React.Component
    additionalChild, customChild, tabIndex = -1, icon = null, autoFocus, description = null, styleChildren, ouiaId, ouiaSafe } = _a, props = __rest(_a, ["children", "className", "component", "isDisabled", "isAriaDisabled", "isPlainText", "isHovered", "href", "tooltip", "tooltipProps", "listItemClassName", "onClick", "ref", "additionalChild", "customChild", "tabIndex", "icon", "autoFocus", "description", "styleChildren", "ouiaId", "ouiaSafe"]);
    const ouiaProps = useOUIAProps(DropdownItem.displayName, ouiaId, ouiaSafe);
    return (react.createElement(DropdownArrowContext.Consumer, null, context => (react.createElement(InternalDropdownItem, Object.assign({ context: context, role: "menuitem", tabIndex: tabIndex, className: className, component: component, isDisabled: isDisabled, isAriaDisabled: isAriaDisabled, isPlainText: isPlainText, isHovered: isHovered, href: href, tooltip: tooltip, tooltipProps: tooltipProps, listItemClassName: listItemClassName, onClick: onClick, additionalChild: additionalChild, customChild: customChild, icon: icon, autoFocus: autoFocus, styleChildren: styleChildren, description: description }, ouiaProps, props), children))));
};
DropdownItem.displayName = 'DropdownItem';

import('./divider-194d1b38.js');
var styles$2 = {
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
    vertical: "pf-m-vertical",
    insetNone: "pf-m-inset-none",
    insetXs: "pf-m-inset-xs",
    insetSm: "pf-m-inset-sm",
    insetMd: "pf-m-inset-md",
    insetLg: "pf-m-inset-lg",
    insetXl: "pf-m-inset-xl",
    inset_2xl: "pf-m-inset-2xl",
    inset_3xl: "pf-m-inset-3xl",
    horizontalOnSm: "pf-m-horizontal-on-sm",
    verticalOnSm: "pf-m-vertical-on-sm",
    insetNoneOnSm: "pf-m-inset-none-on-sm",
    insetXsOnSm: "pf-m-inset-xs-on-sm",
    insetSmOnSm: "pf-m-inset-sm-on-sm",
    insetMdOnSm: "pf-m-inset-md-on-sm",
    insetLgOnSm: "pf-m-inset-lg-on-sm",
    insetXlOnSm: "pf-m-inset-xl-on-sm",
    inset_2xlOnSm: "pf-m-inset-2xl-on-sm",
    inset_3xlOnSm: "pf-m-inset-3xl-on-sm",
    horizontalOnMd: "pf-m-horizontal-on-md",
    verticalOnMd: "pf-m-vertical-on-md",
    insetNoneOnMd: "pf-m-inset-none-on-md",
    insetXsOnMd: "pf-m-inset-xs-on-md",
    insetSmOnMd: "pf-m-inset-sm-on-md",
    insetMdOnMd: "pf-m-inset-md-on-md",
    insetLgOnMd: "pf-m-inset-lg-on-md",
    insetXlOnMd: "pf-m-inset-xl-on-md",
    inset_2xlOnMd: "pf-m-inset-2xl-on-md",
    inset_3xlOnMd: "pf-m-inset-3xl-on-md",
    horizontalOnLg: "pf-m-horizontal-on-lg",
    verticalOnLg: "pf-m-vertical-on-lg",
    insetNoneOnLg: "pf-m-inset-none-on-lg",
    insetXsOnLg: "pf-m-inset-xs-on-lg",
    insetSmOnLg: "pf-m-inset-sm-on-lg",
    insetMdOnLg: "pf-m-inset-md-on-lg",
    insetLgOnLg: "pf-m-inset-lg-on-lg",
    insetXlOnLg: "pf-m-inset-xl-on-lg",
    inset_2xlOnLg: "pf-m-inset-2xl-on-lg",
    inset_3xlOnLg: "pf-m-inset-3xl-on-lg",
    horizontalOnXl: "pf-m-horizontal-on-xl",
    verticalOnXl: "pf-m-vertical-on-xl",
    insetNoneOnXl: "pf-m-inset-none-on-xl",
    insetXsOnXl: "pf-m-inset-xs-on-xl",
    insetSmOnXl: "pf-m-inset-sm-on-xl",
    insetMdOnXl: "pf-m-inset-md-on-xl",
    insetLgOnXl: "pf-m-inset-lg-on-xl",
    insetXlOnXl: "pf-m-inset-xl-on-xl",
    inset_2xlOnXl: "pf-m-inset-2xl-on-xl",
    inset_3xlOnXl: "pf-m-inset-3xl-on-xl",
    horizontalOn_2xl: "pf-m-horizontal-on-2xl",
    verticalOn_2xl: "pf-m-vertical-on-2xl",
    insetNoneOn_2xl: "pf-m-inset-none-on-2xl",
    insetXsOn_2xl: "pf-m-inset-xs-on-2xl",
    insetSmOn_2xl: "pf-m-inset-sm-on-2xl",
    insetMdOn_2xl: "pf-m-inset-md-on-2xl",
    insetLgOn_2xl: "pf-m-inset-lg-on-2xl",
    insetXlOn_2xl: "pf-m-inset-xl-on-2xl",
    inset_2xlOn_2xl: "pf-m-inset-2xl-on-2xl",
    inset_3xlOn_2xl: "pf-m-inset-3xl-on-2xl"
  }
};

var DividerVariant;
(function (DividerVariant) {
    DividerVariant["hr"] = "hr";
    DividerVariant["li"] = "li";
    DividerVariant["div"] = "div";
})(DividerVariant || (DividerVariant = {}));
const Divider = (_a) => {
    var { className, component = DividerVariant.hr, isVertical = false, inset, orientation } = _a, props = __rest(_a, ["className", "component", "isVertical", "inset", "orientation"]);
    const Component = component;
    return (react.createElement(Component, Object.assign({ className: css(styles$2.divider, isVertical && styles$2.modifiers.vertical, formatBreakpointMods(inset, styles$2), formatBreakpointMods(orientation, styles$2), className) }, (component !== 'hr' && { role: 'separator' }), props)));
};
Divider.displayName = 'Divider';

const DropdownSeparator = (_a) => {
    var { className = '', 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref, // Types of Ref are different for React.FunctionComponent vs React.Component
    ouiaId, ouiaSafe } = _a, props = __rest(_a, ["className", "ref", "ouiaId", "ouiaSafe"]);
    const ouiaProps = useOUIAProps(DropdownSeparator.displayName, ouiaId, ouiaSafe);
    return (react.createElement(DropdownArrowContext.Consumer, null, context => (react.createElement(InternalDropdownItem, Object.assign({}, props, { context: context, component: react.createElement(Divider, { component: DividerVariant.div }), className: className, role: "separator" }, ouiaProps)))));
};
DropdownSeparator.displayName = 'DropdownSeparator';

const buttonVariantStyles = {
    default: '',
    primary: styles$1.modifiers.primary,
    secondary: styles$1.modifiers.secondary
};
class Toggle extends react.Component {
    constructor() {
        super(...arguments);
        this.buttonRef = react.createRef();
        this.componentDidMount = () => {
            document.addEventListener('click', this.onDocClick);
            document.addEventListener('touchstart', this.onDocClick);
            document.addEventListener('keydown', this.onEscPress);
        };
        this.componentWillUnmount = () => {
            document.removeEventListener('click', this.onDocClick);
            document.removeEventListener('touchstart', this.onDocClick);
            document.removeEventListener('keydown', this.onEscPress);
        };
        this.onDocClick = (event) => {
            const { isOpen, parentRef, onToggle, getMenuRef } = this.props;
            const menuRef = getMenuRef && getMenuRef();
            const clickedOnToggle = parentRef && parentRef.current && parentRef.current.contains(event.target);
            const clickedWithinMenu = menuRef && menuRef.contains && menuRef.contains(event.target);
            if (isOpen && !(clickedOnToggle || clickedWithinMenu)) {
                onToggle(false, event);
            }
        };
        this.onEscPress = (event) => {
            const { parentRef, getMenuRef } = this.props;
            const keyCode = event.keyCode || event.which;
            const menuRef = getMenuRef && getMenuRef();
            const escFromToggle = parentRef && parentRef.current && parentRef.current.contains(event.target);
            const escFromWithinMenu = menuRef && menuRef.contains && menuRef.contains(event.target);
            if (this.props.isOpen &&
                (keyCode === KEY_CODES.ESCAPE_KEY || event.key === 'Tab') &&
                (escFromToggle || escFromWithinMenu)) {
                this.props.onToggle(false, event);
                this.buttonRef.current.focus();
            }
        };
        this.onKeyDown = (event) => {
            if (event.key === 'Tab' && !this.props.isOpen) {
                return;
            }
            if ((event.key === 'Tab' || event.key === 'Enter' || event.key === ' ') && this.props.isOpen) {
                if (!this.props.bubbleEvent) {
                    event.stopPropagation();
                }
                event.preventDefault();
                this.props.onToggle(!this.props.isOpen, event);
            }
            else if ((event.key === 'Enter' || event.key === ' ') && !this.props.isOpen) {
                if (!this.props.bubbleEvent) {
                    event.stopPropagation();
                }
                event.preventDefault();
                this.props.onToggle(!this.props.isOpen, event);
                this.props.onEnter();
            }
        };
    }
    render() {
        const _a = this.props, { className, children, isOpen, isDisabled, isPlain, isText, isPrimary, isSplitButton, toggleVariant, onToggle, 'aria-haspopup': ariaHasPopup, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        isActive, bubbleEvent, onEnter, parentRef, getMenuRef, 
        /* eslint-enable @typescript-eslint/no-unused-vars */
        id, type } = _a, props = __rest(_a, ["className", "children", "isOpen", "isDisabled", "isPlain", "isText", "isPrimary", "isSplitButton", "toggleVariant", "onToggle", 'aria-haspopup', "isActive", "bubbleEvent", "onEnter", "parentRef", "getMenuRef", "id", "type"]);
        return (react.createElement(DropdownContext.Consumer, null, ({ toggleClass }) => (react.createElement("button", Object.assign({}, props, { id: id, ref: this.buttonRef, className: css(isSplitButton ? styles$1.dropdownToggleButton : toggleClass || styles$1.dropdownToggle, isActive && styles$1.modifiers.active, isPlain && styles$1.modifiers.plain, isText && styles$1.modifiers.text, isPrimary && styles$1.modifiers.primary, buttonVariantStyles[toggleVariant], className), type: type || 'button', onClick: event => onToggle(!isOpen, event), "aria-expanded": isOpen, "aria-haspopup": ariaHasPopup, onKeyDown: event => this.onKeyDown(event), disabled: isDisabled }), children))));
    }
}
Toggle.displayName = 'Toggle';
Toggle.defaultProps = {
    className: '',
    isOpen: false,
    isActive: false,
    isDisabled: false,
    isPlain: false,
    isText: false,
    isPrimary: false,
    isSplitButton: false,
    onToggle: () => { },
    onEnter: () => { },
    bubbleEvent: false
};

const EllipsisVIconConfig = {
  name: 'EllipsisVIcon',
  height: 512,
  width: 192,
  svgPath: 'M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z',
  yOffset: 0,
  xOffset: 0,
};

const EllipsisVIcon = createIcon(EllipsisVIconConfig);

const KebabToggle = (_a) => {
    var { id = '', 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children = null, className = '', isOpen = false, 'aria-label': ariaLabel = 'Actions', parentRef = null, getMenuRef = null, isActive = false, isPlain = false, isDisabled = false, bubbleEvent = false, onToggle = () => undefined, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref } = _a, // Types of Ref are different for React.FunctionComponent vs React.Component
    props = __rest(_a, ["id", "children", "className", "isOpen", 'aria-label', "parentRef", "getMenuRef", "isActive", "isPlain", "isDisabled", "bubbleEvent", "onToggle", "ref"]);
    return (react.createElement(Toggle, Object.assign({ id: id, className: className, isOpen: isOpen, "aria-label": ariaLabel, parentRef: parentRef, getMenuRef: getMenuRef, isActive: isActive, isPlain: isPlain, isDisabled: isDisabled, onToggle: onToggle, bubbleEvent: bubbleEvent }, props),
        react.createElement(EllipsisVIcon, null)));
};
KebabToggle.displayName = 'KebabToggle';

const StarIconConfig = {
  name: 'StarIcon',
  height: 512,
  width: 576,
  svgPath: 'M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z',
  yOffset: 0,
  xOffset: 0,
};

const StarIcon = createIcon(StarIconConfig);

var TextInputTypes;
(function (TextInputTypes) {
    TextInputTypes["text"] = "text";
    TextInputTypes["date"] = "date";
    TextInputTypes["datetimeLocal"] = "datetime-local";
    TextInputTypes["email"] = "email";
    TextInputTypes["month"] = "month";
    TextInputTypes["number"] = "number";
    TextInputTypes["password"] = "password";
    TextInputTypes["search"] = "search";
    TextInputTypes["tel"] = "tel";
    TextInputTypes["time"] = "time";
    TextInputTypes["url"] = "url";
})(TextInputTypes || (TextInputTypes = {}));
class TextInputBase extends react.Component {
    constructor(props) {
        super(props);
        this.inputRef = react.createRef();
        this.observer = () => { };
        this.handleChange = (event) => {
            if (this.props.onChange) {
                this.props.onChange(event.currentTarget.value, event);
            }
        };
        this.handleResize = () => {
            const inputRef = this.props.innerRef || this.inputRef;
            if (inputRef && inputRef.current) {
                trimLeft(inputRef.current, String(this.props.value));
            }
        };
        this.restoreText = () => {
            const inputRef = this.props.innerRef || this.inputRef;
            // restore the value
            inputRef.current.value = String(this.props.value);
            // make sure we still see the rightmost value to preserve cursor click position
            inputRef.current.scrollLeft = inputRef.current.scrollWidth;
        };
        this.onFocus = (event) => {
            const { isLeftTruncated, onFocus } = this.props;
            if (isLeftTruncated) {
                this.restoreText();
            }
            onFocus && onFocus(event);
        };
        this.onBlur = (event) => {
            const { isLeftTruncated, onBlur } = this.props;
            if (isLeftTruncated) {
                this.handleResize();
            }
            onBlur && onBlur(event);
        };
        this.sanitizeInputValue = (value) => typeof value === 'string' ? value.replace(/\n/g, ' ') : value;
        if (!props.id && !props['aria-label'] && !props['aria-labelledby']) {
            // eslint-disable-next-line no-console
            console.error('Text input:', 'Text input requires either an id or aria-label to be specified');
        }
        this.state = {
            ouiaStateId: getDefaultOUIAId(TextInputBase.displayName)
        };
    }
    componentDidMount() {
        if (this.props.isLeftTruncated) {
            const inputRef = this.props.innerRef || this.inputRef;
            this.observer = getResizeObserver(inputRef.current, this.handleResize);
            this.handleResize();
        }
    }
    componentWillUnmount() {
        if (this.props.isLeftTruncated) {
            this.observer();
        }
    }
    render() {
        const _a = this.props, { innerRef, className, type, value, validated, 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        onChange, onFocus, onBlur, isLeftTruncated, 
        /* eslint-enable @typescript-eslint/no-unused-vars */
        isReadOnly, isRequired, isDisabled, isIconSprite, iconVariant, customIconUrl, customIconDimensions, ouiaId, ouiaSafe } = _a, props = __rest(_a, ["innerRef", "className", "type", "value", "validated", "onChange", "onFocus", "onBlur", "isLeftTruncated", "isReadOnly", "isRequired", "isDisabled", "isIconSprite", "iconVariant", "customIconUrl", "customIconDimensions", "ouiaId", "ouiaSafe"]);
        const customIconStyle = {};
        if (customIconUrl) {
            customIconStyle.backgroundImage = `url('${customIconUrl}')`;
        }
        if (customIconDimensions) {
            customIconStyle.backgroundSize = customIconDimensions;
        }
        return (react.createElement("input", Object.assign({}, props, { onFocus: this.onFocus, onBlur: this.onBlur, className: css(formStyles.formControl, isIconSprite && formStyles.modifiers.iconSprite, validated === ValidatedOptions.success && formStyles.modifiers.success, validated === ValidatedOptions.warning && formStyles.modifiers.warning, ((iconVariant && iconVariant !== 'search') || customIconUrl) && formStyles.modifiers.icon, iconVariant && formStyles.modifiers[iconVariant], className), onChange: this.handleChange, type: type, value: this.sanitizeInputValue(value), "aria-invalid": props['aria-invalid'] ? props['aria-invalid'] : validated === ValidatedOptions.error, required: isRequired, disabled: isDisabled, readOnly: isReadOnly, ref: innerRef || this.inputRef }, ((customIconUrl || customIconDimensions) && { style: customIconStyle }), getOUIAProps(TextInput.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe))));
    }
}
TextInputBase.displayName = 'TextInputBase';
TextInputBase.defaultProps = {
    'aria-label': null,
    className: '',
    isRequired: false,
    validated: 'default',
    isDisabled: false,
    isReadOnly: false,
    isIconSprite: false,
    type: TextInputTypes.text,
    isLeftTruncated: false,
    onChange: () => undefined,
    ouiaSafe: true
};
const TextInput = react.forwardRef((props, ref) => (react.createElement(TextInputBase, Object.assign({}, props, { innerRef: ref }))));
TextInput.displayName = 'TextInput';

import('./form-6451e432.js');
var formStyles$1 = {
  form: "pf-c-form",
  formActions: "pf-c-form__actions",
  formFieldGroup: "pf-c-form__field-group",
  formFieldGroupBody: "pf-c-form__field-group-body",
  formFieldGroupHeader: "pf-c-form__field-group-header",
  formFieldGroupHeaderActions: "pf-c-form__field-group-header-actions",
  formFieldGroupHeaderDescription: "pf-c-form__field-group-header-description",
  formFieldGroupHeaderMain: "pf-c-form__field-group-header-main",
  formFieldGroupHeaderTitle: "pf-c-form__field-group-header-title",
  formFieldGroupHeaderTitleText: "pf-c-form__field-group-header-title-text",
  formFieldGroupToggle: "pf-c-form__field-group-toggle",
  formFieldGroupToggleButton: "pf-c-form__field-group-toggle-button",
  formFieldGroupToggleIcon: "pf-c-form__field-group-toggle-icon",
  formFieldset: "pf-c-form__fieldset",
  formGroup: "pf-c-form__group",
  formGroupControl: "pf-c-form__group-control",
  formGroupLabel: "pf-c-form__group-label",
  formGroupLabelHelp: "pf-c-form__group-label-help",
  formGroupLabelInfo: "pf-c-form__group-label-info",
  formGroupLabelMain: "pf-c-form__group-label-main",
  formHelperText: "pf-c-form__helper-text",
  formHelperTextIcon: "pf-c-form__helper-text-icon",
  formLabel: "pf-c-form__label",
  formLabelRequired: "pf-c-form__label-required",
  formLabelText: "pf-c-form__label-text",
  formSection: "pf-c-form__section",
  formSectionTitle: "pf-c-form__section-title",
  modifiers: {
    horizontal: "pf-m-horizontal",
    alignRight: "pf-m-align-right",
    noPaddingTop: "pf-m-no-padding-top",
    horizontalOnXs: "pf-m-horizontal-on-xs",
    horizontalOnSm: "pf-m-horizontal-on-sm",
    horizontalOnMd: "pf-m-horizontal-on-md",
    horizontalOnLg: "pf-m-horizontal-on-lg",
    horizontalOnXl: "pf-m-horizontal-on-xl",
    horizontalOn_2xl: "pf-m-horizontal-on-2xl",
    limitWidth: "pf-m-limit-width",
    action: "pf-m-action",
    info: "pf-m-info",
    disabled: "pf-m-disabled",
    inline: "pf-m-inline",
    stack: "pf-m-stack",
    error: "pf-m-error",
    success: "pf-m-success",
    warning: "pf-m-warning",
    inactive: "pf-m-inactive",
    hidden: "pf-m-hidden",
    expanded: "pf-m-expanded"
  },
  themeDark: "pf-theme-dark"
};

import('./check-7ec8b243.js');
var checkStyles = {
  check: "pf-c-check",
  checkBody: "pf-c-check__body",
  checkDescription: "pf-c-check__description",
  checkInput: "pf-c-check__input",
  checkLabel: "pf-c-check__label",
  modifiers: {
    standalone: "pf-m-standalone",
    disabled: "pf-m-disabled"
  }
};

// tslint:disable-next-line:no-empty
const defaultOnChange = () => { };
class Checkbox extends react.Component {
    constructor(props) {
        super(props);
        this.handleChange = (event) => {
            this.props.onChange(event.currentTarget.checked, event);
        };
        this.state = {
            ouiaStateId: getDefaultOUIAId(Checkbox.displayName)
        };
    }
    render() {
        const _a = this.props, { 'aria-label': ariaLabel, className, onChange, isValid, isDisabled, isChecked, label, checked, defaultChecked, description, body, ouiaId, ouiaSafe, component: Component } = _a, props = __rest(_a, ['aria-label', "className", "onChange", "isValid", "isDisabled", "isChecked", "label", "checked", "defaultChecked", "description", "body", "ouiaId", "ouiaSafe", "component"]);
        if (!props.id) {
            // eslint-disable-next-line no-console
            console.error('Checkbox:', 'id is required to make input accessible');
        }
        const checkedProps = {};
        if ([true, false].includes(checked) || isChecked === true) {
            checkedProps.checked = checked || isChecked;
        }
        if (onChange !== defaultOnChange) {
            checkedProps.checked = isChecked;
        }
        if ([false, true].includes(defaultChecked)) {
            checkedProps.defaultChecked = defaultChecked;
        }
        checkedProps.checked = checkedProps.checked === null ? false : checkedProps.checked;
        return (react.createElement(Component, { className: css(checkStyles.check, !label && checkStyles.modifiers.standalone, className) },
            react.createElement("input", Object.assign({}, props, { className: css(checkStyles.checkInput), type: "checkbox", onChange: this.handleChange, "aria-invalid": !isValid, "aria-label": ariaLabel, disabled: isDisabled, ref: elem => elem && (elem.indeterminate = isChecked === null) }, checkedProps, getOUIAProps(Checkbox.displayName, ouiaId !== undefined ? ouiaId : this.state.ouiaStateId, ouiaSafe))),
            label && (react.createElement("label", { className: css(checkStyles.checkLabel, isDisabled && checkStyles.modifiers.disabled), htmlFor: props.id }, label)),
            description && react.createElement("span", { className: css(checkStyles.checkDescription) }, description),
            body && react.createElement("span", { className: css(checkStyles.checkBody) }, body)));
    }
}
Checkbox.displayName = 'Checkbox';
Checkbox.defaultProps = {
    className: '',
    isValid: true,
    isDisabled: false,
    isChecked: false,
    onChange: defaultOnChange,
    ouiaSafe: true,
    component: 'div'
};

const AngleDownIconConfig = {
  name: 'AngleDownIcon',
  height: 512,
  width: 320,
  svgPath: 'M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z',
  yOffset: 0,
  xOffset: 0,
};

const AngleDownIcon = createIcon(AngleDownIconConfig);

const GripVerticalIconConfig = {
  name: 'GripVerticalIcon',
  height: 512,
  width: 320,
  svgPath: 'M96 32H32C14.33 32 0 46.33 0 64v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm0 160H32c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zm0 160H32c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zM288 32h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm0 160h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zm0 160h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32z',
  yOffset: 0,
  xOffset: 0,
};

const GripVerticalIcon = createIcon(GripVerticalIconConfig);

export { AngleDownIcon as A, Checkbox as C, DropdownContext as D, GripVerticalIcon as G, KeyboardHandler as K, StarIcon as S, Toggle as T, DropdownSeparator as a, Divider as b, checkStyles as c, formStyles as d, TextInput as e, formStyles$1 as f, styles as g, DropdownItem as h, DropdownWithContext as i, DropdownDirection as j, Dropdown as k, KebabToggle as l, DropdownPosition as m, setTabIndex as n, handleArrows as o, styles$1 as s };
