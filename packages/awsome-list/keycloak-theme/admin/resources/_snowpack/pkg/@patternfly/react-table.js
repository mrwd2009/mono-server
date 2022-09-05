import { c as css, i as debounce, a as canUseDOM } from '../common/util-badff3ce.js';
import { s as styles$2 } from '../common/table-d3d3884a.js';
import { _ as __rest } from '../common/tslib.es6-e6488692.js';
import { r as react } from '../common/index-7cda8b13.js';
import { u as useOUIAProps, b as Tooltip, B as Button, P as Popover, E as EmptyState, f as getDefaultOUIAId } from '../common/EmptyState-25333d4a.js';
import { g as styles$1, n as setTabIndex, o as handleArrows, S as StarIcon, c as checkStyles, A as AngleDownIcon, l as KebabToggle, k as Dropdown, a as DropdownSeparator, h as DropdownItem, m as DropdownPosition, j as DropdownDirection, G as GripVerticalIcon, C as Checkbox, e as TextInput, f as formStyles } from '../common/grip-vertical-icon-708fff4f.js';
import { c as createIcon, T as TimesIcon } from '../common/times-icon-8cdcb920.js';
import { _ as _createAssigner, a as _baseMerge, b as _baseIsEqual } from '../common/_baseIsEqual-c84a3118.js';
import { H as HelpIcon } from '../common/help-icon-8257c29f.js';
import { P as PencilAltIcon } from '../common/pencil-alt-icon-a46efaee.js';
import { C as CheckIcon } from '../common/check-icon-2d19427f.js';
import '../common/index-916de6ed.js';
import '../common/_commonjsHelpers-4f955397.js';

const Bullseye = (_a) => {
    var { children = null, className = '', component = 'div' } = _a, props = __rest(_a, ["children", "className", "component"]);
    const Component = component;
    return (react.createElement(Component, Object.assign({ className: css(styles$1.bullseye, className) }, props), children));
};
Bullseye.displayName = 'Bullseye';

const ArrowsAltVIconConfig = {
  name: 'ArrowsAltVIcon',
  height: 512,
  width: 256,
  svgPath: 'M214.059 377.941H168V134.059h46.059c21.382 0 32.09-25.851 16.971-40.971L144.971 7.029c-9.373-9.373-24.568-9.373-33.941 0L24.971 93.088c-15.119 15.119-4.411 40.971 16.971 40.971H88v243.882H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.568 9.373 33.941 0l86.059-86.059c15.12-15.119 4.412-40.971-16.97-40.971z',
  yOffset: 0,
  xOffset: 0,
};

const ArrowsAltVIcon = createIcon(ArrowsAltVIconConfig);

const EllipsisHIconConfig = {
  name: 'EllipsisHIcon',
  height: 512,
  width: 512,
  svgPath: 'M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z',
  yOffset: 0,
  xOffset: 0,
};

const EllipsisHIcon = createIcon(EllipsisHIconConfig);

const LongArrowAltDownIconConfig = {
  name: 'LongArrowAltDownIcon',
  height: 512,
  width: 256,
  svgPath: 'M168 345.941V44c0-6.627-5.373-12-12-12h-56c-6.627 0-12 5.373-12 12v301.941H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.569 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168z',
  yOffset: 0,
  xOffset: 0,
};

const LongArrowAltDownIcon = createIcon(LongArrowAltDownIconConfig);

const LongArrowAltUpIconConfig = {
  name: 'LongArrowAltUpIcon',
  height: 512,
  width: 256,
  svgPath: 'M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z',
  yOffset: 0,
  xOffset: 0,
};

const LongArrowAltUpIcon = createIcon(LongArrowAltUpIconConfig);

import('../common/inline-edit-e58b3fea.js');
var inlineStyles = {
  button: "pf-c-button",
  inlineEdit: "pf-c-inline-edit",
  inlineEditAction: "pf-c-inline-edit__action",
  inlineEditEditableText: "pf-c-inline-edit__editable-text",
  inlineEditGroup: "pf-c-inline-edit__group",
  inlineEditInput: "pf-c-inline-edit__input",
  inlineEditLabel: "pf-c-inline-edit__label",
  inlineEditValue: "pf-c-inline-edit__value",
  modifiers: {
    iconGroup: "pf-m-icon-group",
    footer: "pf-m-footer",
    column: "pf-m-column",
    valid: "pf-m-valid",
    plain: "pf-m-plain",
    actionGroup: "pf-m-action-group",
    enableEditable: "pf-m-enable-editable",
    inlineEditable: "pf-m-inline-editable",
    enable: "pf-m-enable",
    bold: "pf-m-bold"
  }
};

import('../common/table-grid-23269c3a.js');
var stylesGrid = {
  button: "pf-c-button",
  modifiers: {
    grid: "pf-m-grid",
    compact: "pf-m-compact",
    expanded: "pf-m-expanded",
    selected: "pf-m-selected",
    noPadding: "pf-m-no-padding",
    hoverable: "pf-m-hoverable",
    nowrap: "pf-m-nowrap",
    fitContent: "pf-m-fit-content",
    truncate: "pf-m-truncate",
    gridMd: "pf-m-grid-md",
    gridLg: "pf-m-grid-lg",
    gridXl: "pf-m-grid-xl",
    grid_2xl: "pf-m-grid-2xl"
  },
  table: "pf-c-table",
  tableAction: "pf-c-table__action",
  tableButton: "pf-c-table__button",
  tableCheck: "pf-c-table__check",
  tableCompoundExpansionToggle: "pf-c-table__compound-expansion-toggle",
  tableExpandableRow: "pf-c-table__expandable-row",
  tableExpandableRowContent: "pf-c-table__expandable-row-content",
  tableFavorite: "pf-c-table__favorite",
  tableIcon: "pf-c-table__icon",
  tableInlineEditAction: "pf-c-table__inline-edit-action",
  tableText: "pf-c-table__text",
  tableToggle: "pf-c-table__toggle",
  tableToggleIcon: "pf-c-table__toggle-icon"
};

import('../common/table-tree-view-81c6133e.js');
var stylesTreeView = {
  dropdown: "pf-c-dropdown",
  modifiers: {
    treeView: "pf-m-tree-view",
    treeViewGrid: "pf-m-tree-view-grid",
    treeViewDetailsExpanded: "pf-m-tree-view-details-expanded",
    treeViewGridMd: "pf-m-tree-view-grid-md",
    treeViewGridLg: "pf-m-tree-view-grid-lg",
    treeViewGridXl: "pf-m-tree-view-grid-xl",
    treeViewGrid_2xl: "pf-m-tree-view-grid-2xl"
  },
  table: "pf-c-table",
  tableAction: "pf-c-table__action",
  tableCheck: "pf-c-table__check",
  tableToggle: "pf-c-table__toggle",
  tableToggleIcon: "pf-c-table__toggle-icon",
  tableTreeViewDetailsToggle: "pf-c-table__tree-view-details-toggle",
  tableTreeViewIcon: "pf-c-table__tree-view-icon",
  tableTreeViewMain: "pf-c-table__tree-view-main",
  tableTreeViewText: "pf-c-table__tree-view-text",
  tableTreeViewTitleCell: "pf-c-table__tree-view-title-cell",
  tableTreeViewTitleHeaderCell: "pf-c-table__tree-view-title-header-cell"
};

const hasCompoundParentsExpanded = (parentId, compoundParent, rows) => {
    // max rows.length parents
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const i of rows) {
        if (rows[parentId].hasOwnProperty('parent')) {
            parentId = rows[parentId].parent;
        }
        else {
            return rows[parentId].cells[compoundParent].props.isOpen;
        }
    }
    return false;
};
const hasParentsExpanded = (parentId, rows) => {
    // max rows.length parents
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const i of rows) {
        if (rows[parentId].hasOwnProperty('parent')) {
            parentId = rows[parentId].parent;
        }
        else {
            return rows[parentId].isOpen;
        }
    }
    return false;
};
const isRowExpanded = (row, rows) => {
    if (row.parent !== undefined) {
        if (row.hasOwnProperty('compoundParent')) {
            return hasCompoundParentsExpanded(row.parent, row.compoundParent, rows);
        }
        return hasParentsExpanded(row.parent, rows) && rows[row.parent].isOpen;
    }
    return undefined;
};
const getErrorTextByValidator = (validatorName, validators) => {
    const result = validators.filter(validator => validator.name === validatorName);
    return result[0].errorText;
};
const cancelCellEdits = (row) => {
    row.cells.forEach(cell => {
        delete cell.props.errorText;
        delete cell.props.editableValue;
        cell.props.isValid = true;
        // for editable selects, revert the selected property to its original value
        if (cell.props.selected) {
            cell.props.selected = cell.props.value;
        }
    });
    row.isEditable = !row.isEditable;
    row.isValid = true;
    return row;
};
const validateCellEdits = (row, type, validationErrors, missingPropErrorTxt = 'Validation requires unique name property for row cells') => {
    row.isValid = Object.keys(validationErrors).length ? false : true;
    row.cells.forEach(cell => {
        delete cell.props.errorText;
        const hasValue = cell.props.value !== undefined && cell.props.value !== null;
        const hasEditableValue = cell.props.editableValue !== undefined && cell.props.editableValue !== null;
        if (cell.props && hasValue && hasEditableValue) {
            if (type === 'save') {
                const errorMsg = Object.keys(validationErrors)
                    .filter(validatorName => validationErrors[validatorName].includes(cell.props.name))
                    .map(validatorName => getErrorTextByValidator(validatorName, row.rowEditValidationRules));
                if (errorMsg.length) {
                    cell.props.errorText = cell.props.name ? errorMsg.join(', ') : missingPropErrorTxt;
                    if (cell.props.name === undefined) {
                        // eslint-disable-next-line no-console
                        console.warn('Row edit validation reporting requires cell definitions to have a unique name property.');
                    }
                }
                else {
                    delete cell.props.errorText;
                    cell.props.isValid = true;
                }
            }
        }
    });
    return row;
};
const applyCellEdits = (row, type) => {
    row.cells.forEach(cell => {
        delete cell.props.errorText;
        const hasValue = cell.props.value !== undefined && cell.props.value !== null;
        const hasEditableValue = cell.props.editableValue !== undefined && cell.props.editableValue !== null;
        // sync for validation
        if (hasValue && !hasEditableValue) {
            cell.props.editableValue = cell.props.value;
        }
        if (cell.props && hasValue && hasEditableValue) {
            if (type === 'save') {
                cell.props.value = cell.props.editableValue;
                cell.props.isValid = true;
                delete cell.props.errorText;
            }
            delete cell.props.editableValue;
        }
    });
    row.isEditable = !row.isEditable;
    row.isValid = true;
    return row;
};
const camelize = (s) => s
    .toUpperCase()
    .replace('-', '')
    .replace('_', '');
const toCamel = (s) => s.replace(/([-_][a-z])/gi, camelize);
/**
 * @param {string} input - String to capitalize
 */
function capitalize(input) {
    return input[0].toUpperCase() + input.substring(1);
}

var TableGridBreakpoint;
(function (TableGridBreakpoint) {
    TableGridBreakpoint["none"] = "";
    TableGridBreakpoint["grid"] = "grid";
    TableGridBreakpoint["gridMd"] = "grid-md";
    TableGridBreakpoint["gridLg"] = "grid-lg";
    TableGridBreakpoint["gridXl"] = "grid-xl";
    TableGridBreakpoint["grid2xl"] = "grid-2xl";
})(TableGridBreakpoint || (TableGridBreakpoint = {}));
var TableVariant;
(function (TableVariant) {
    TableVariant["compact"] = "compact";
})(TableVariant || (TableVariant = {}));

const TableComposableContext = react.createContext({
    registerSelectableRow: () => { }
});
const TableComposableBase = (_a) => {
    var _b, _c;
    var { children, className, variant, borders = true, isStickyHeader = false, gridBreakPoint = TableGridBreakpoint.gridMd, 'aria-label': ariaLabel, role = 'grid', innerRef, ouiaId, ouiaSafe = true, isTreeTable = false, isNested = false, isStriped = false, isExpandable = false, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nestedHeaderColumnSpans, hasSelectableRowCaption, selectableRowCaptionText } = _a, props = __rest(_a, ["children", "className", "variant", "borders", "isStickyHeader", "gridBreakPoint", 'aria-label', "role", "innerRef", "ouiaId", "ouiaSafe", "isTreeTable", "isNested", "isStriped", "isExpandable", "nestedHeaderColumnSpans", "hasSelectableRowCaption", "selectableRowCaptionText"]);
    const tableRef = innerRef || react.useRef(null);
    const [hasSelectableRows, setHasSelectableRows] = react.useState(false);
    const [tableCaption, setTableCaption] = react.useState();
    react.useEffect(() => {
        document.addEventListener('keydown', handleKeys);
        // sets up roving tab-index to tree tables only
        if (tableRef && tableRef.current && tableRef.current.classList.contains('pf-m-tree-view')) {
            const tbody = tableRef.current.querySelector('tbody');
            tbody && setTabIndex(Array.from(tbody.querySelectorAll('button, a, input')));
        }
        return function cleanup() {
            document.removeEventListener('keydown', handleKeys);
        };
    }, [tableRef, tableRef.current]);
    react.useEffect(() => {
        if (selectableRowCaptionText) {
            setTableCaption(react.createElement("caption", null,
                selectableRowCaptionText,
                react.createElement("div", { className: "pf-screen-reader" }, "This table has selectable rows. It can be navigated by row using tab, and each row can be selected using space or enter.")));
        }
        else {
            setTableCaption(react.createElement("caption", { className: "pf-screen-reader" }, "This table has selectable rows. It can be navigated by row using tab, and each row can be selected using space or enter."));
        }
    }, [selectableRowCaptionText]);
    const ouiaProps = useOUIAProps('Table', ouiaId, ouiaSafe);
    const grid = (_b = stylesGrid.modifiers) === null || _b === void 0 ? void 0 : _b[toCamel(gridBreakPoint || '').replace(/-?2xl/, '_2xl')];
    const breakPointPrefix = `treeView${gridBreakPoint.charAt(0).toUpperCase() + gridBreakPoint.slice(1)}`;
    const treeGrid = (_c = stylesTreeView.modifiers) === null || _c === void 0 ? void 0 : _c[toCamel(breakPointPrefix || '').replace(/-?2xl/, '_2xl')];
    const handleKeys = (event) => {
        if (isNested ||
            !(tableRef && tableRef.current && tableRef.current.classList.contains('pf-m-tree-view')) || // implements roving tab-index to tree tables only
            (tableRef && tableRef.current !== event.target.closest('.pf-c-table:not(.pf-m-nested)'))) {
            return;
        }
        const activeElement = document.activeElement;
        const key = event.key;
        const rows = Array.from(tableRef.current.querySelectorAll('tbody tr')).filter(el => !el.classList.contains('pf-m-disabled') && !el.hidden);
        if (key === 'Space' || key === 'Enter') {
            activeElement.click();
            event.preventDefault();
        }
        const getFocusableElement = (element) => element.querySelectorAll('button:not(:disabled), input:not(:disabled), a:not(:disabled)')[0];
        handleArrows(event, rows, (element) => element === activeElement.closest('tr'), getFocusableElement, ['button', 'input', 'a'], undefined, false, true, false);
    };
    const registerSelectableRow = () => {
        !hasSelectableRows && setHasSelectableRows(true);
    };
    return (react.createElement(TableComposableContext.Provider, { value: { registerSelectableRow } },
        react.createElement("table", Object.assign({ "aria-label": ariaLabel, role: role, className: css(className, styles$2.table, isTreeTable ? treeGrid : grid, styles$2.modifiers[variant], !borders && styles$2.modifiers.noBorderRows, isStickyHeader && styles$2.modifiers.stickyHeader, isTreeTable && stylesTreeView.modifiers.treeView, isStriped && styles$2.modifiers.striped, isExpandable && styles$2.modifiers.expandable, isNested && 'pf-m-nested'), ref: tableRef }, (isTreeTable && { role: 'treegrid' }), ouiaProps, props),
            hasSelectableRowCaption && hasSelectableRows && tableCaption,
            children)));
};
const TableComposable = react.forwardRef((props, ref) => (react.createElement(TableComposableBase, Object.assign({}, props, { innerRef: ref }))));
TableComposable.displayName = 'TableComposable';

const TheadBase = (_a) => {
    var { children, className, noWrap = false, innerRef, hasNestedHeader } = _a, props = __rest(_a, ["children", "className", "noWrap", "innerRef", "hasNestedHeader"]);
    return (react.createElement("thead", Object.assign({ className: css(className, noWrap && styles$2.modifiers.nowrap, hasNestedHeader && styles$2.modifiers.nestedColumnHeader), ref: innerRef }, props), children));
};
const Thead = react.forwardRef((props, ref) => (react.createElement(TheadBase, Object.assign({}, props, { innerRef: ref }))));
Thead.displayName = 'Thead';

const TbodyBase = (_a) => {
    var { children, className, isExpanded, innerRef, isEvenStriped = false, isOddStriped = false } = _a, props = __rest(_a, ["children", "className", "isExpanded", "innerRef", "isEvenStriped", "isOddStriped"]);
    return (react.createElement("tbody", Object.assign({ role: "rowgroup", className: css(className, isExpanded && styles$2.modifiers.expanded, isOddStriped && styles$2.modifiers.striped, isEvenStriped && styles$2.modifiers.stripedEven), ref: innerRef }, props), children));
};
const Tbody = react.forwardRef((props, ref) => (react.createElement(TbodyBase, Object.assign({}, props, { innerRef: ref }))));
Tbody.displayName = 'Tbody';

const TrBase = (_a) => {
    var { children, className, isExpanded, isEditable, isHidden = false, isHoverable = false, isRowSelected = false, isStriped = false, isBorderRow = false, innerRef, ouiaId, ouiaSafe = true, resetOffset = false, onRowClick, isSelectable, 'aria-label': passedAriaLabel } = _a, props = __rest(_a, ["children", "className", "isExpanded", "isEditable", "isHidden", "isHoverable", "isRowSelected", "isStriped", "isBorderRow", "innerRef", "ouiaId", "ouiaSafe", "resetOffset", "onRowClick", "isSelectable", 'aria-label']);
    const ouiaProps = useOUIAProps('TableRow', ouiaId, ouiaSafe);
    const [computedAriaLabel, setComputedAriaLabel] = react.useState('');
    let onKeyDown = null;
    if (onRowClick) {
        onKeyDown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                onRowClick(e);
                e.preventDefault();
            }
        };
    }
    const rowIsHidden = isHidden || (isExpanded !== undefined && !isExpanded);
    const { registerSelectableRow } = react.useContext(TableComposableContext);
    react.useEffect(() => {
        if (isSelectable && !rowIsHidden) {
            setComputedAriaLabel(`${isRowSelected ? 'Selected' : 'Unselected'}, selectable row.`);
            registerSelectableRow();
        }
        else {
            setComputedAriaLabel(undefined);
        }
    }, [isRowSelected, isSelectable, registerSelectableRow, rowIsHidden]);
    const ariaLabel = passedAriaLabel || computedAriaLabel;
    return (react.createElement(react.Fragment, null,
        isSelectable && react.createElement("output", { className: "pf-screen-reader" }, ariaLabel),
        react.createElement("tr", Object.assign({ className: css(className, isExpanded !== undefined && styles$2.tableExpandableRow, isExpanded && styles$2.modifiers.expanded, isEditable && inlineStyles.modifiers.inlineEditable, isHoverable && styles$2.modifiers.hoverable, isRowSelected && styles$2.modifiers.selected, isStriped && styles$2.modifiers.striped, isBorderRow && styles$2.modifiers.borderRow, resetOffset && styles$2.modifiers.firstCellOffsetReset), hidden: rowIsHidden }, (isHoverable && { tabIndex: 0 }), { "aria-label": ariaLabel, ref: innerRef }, (onRowClick && { onClick: onRowClick, onKeyDown }), ouiaProps, props), children)));
};
const Tr = react.forwardRef((props, ref) => (react.createElement(TrBase, Object.assign({}, props, { innerRef: ref }))));
Tr.displayName = 'Tr';

import('../common/table-scrollable-1e6cc10f.js');
var styles = {
  modifiers: {
    borderRight: "pf-m-border-right",
    borderLeft: "pf-m-border-left",
    stickyHeader: "pf-m-sticky-header"
  },
  scrollInnerWrapper: "pf-c-scroll-inner-wrapper",
  scrollOuterWrapper: "pf-c-scroll-outer-wrapper",
  table: "pf-c-table",
  tableStickyColumn: "pf-c-table__sticky-column"
};

var TableTextVariant;
(function (TableTextVariant) {
    TableTextVariant["div"] = "div";
    TableTextVariant["nav"] = "nav";
})(TableTextVariant || (TableTextVariant = {}));
var WrapModifier;
(function (WrapModifier) {
    WrapModifier["wrap"] = "wrap";
    WrapModifier["nowrap"] = "nowrap";
    WrapModifier["truncate"] = "truncate";
    WrapModifier["breakWord"] = "breakWord";
    WrapModifier["fitContent"] = "fitContent";
})(WrapModifier || (WrapModifier = {}));
const TableText = (_a) => {
    var { children = null, className = '', variant = 'span', wrapModifier = null, tooltip: tooltipProp = '', tooltipProps = {}, onMouseEnter: onMouseEnterProp = () => { } } = _a, props = __rest(_a, ["children", "className", "variant", "wrapModifier", "tooltip", "tooltipProps", "onMouseEnter"]);
    const Component = variant;
    const [tooltip, setTooltip] = react.useState('');
    const onMouseEnter = (event) => {
        if (event.target.offsetWidth < event.target.scrollWidth) {
            setTooltip(tooltipProp || event.target.innerText);
        }
        else {
            setTooltip('');
        }
        onMouseEnterProp(event);
    };
    const text = (react.createElement(Component, Object.assign({ onMouseEnter: onMouseEnter, className: css(className, wrapModifier && styles$2.modifiers[wrapModifier], styles$2.tableText) }, props), children));
    return tooltip !== '' ? (react.createElement(Tooltip, Object.assign({ content: tooltip, isVisible: true }, tooltipProps), text)) : (text);
};
TableText.displayName = 'TableText';

const HeaderCellInfoWrapper = ({ children, info, className, variant = 'tooltip', popoverProps, tooltipProps, ariaLabel }) => (react.createElement("div", { className: css(styles$2.tableColumnHelp, className) },
    typeof children === 'string' ? react.createElement(TableText, null, children) : children,
    react.createElement("span", { className: css(styles$2.tableColumnHelpAction) }, variant === 'tooltip' ? (react.createElement(Tooltip, Object.assign({ content: info }, tooltipProps),
        react.createElement(Button, { variant: "plain", "aria-label": ariaLabel || (typeof info === 'string' && info) || 'More info' },
            react.createElement(HelpIcon, { noVerticalAlign: true })))) : (react.createElement(Popover, Object.assign({ bodyContent: info }, popoverProps),
        react.createElement(Button, { variant: "plain", "aria-label": ariaLabel || (typeof info === 'string' && info) || 'More info' },
            react.createElement(HelpIcon, { noVerticalAlign: true })))))));
HeaderCellInfoWrapper.displayName = 'HeaderCellInfoWrapper';

const info = ({ tooltip, tooltipProps, popover, popoverProps, className, ariaLabel }) => {
    const infoObj = (value) => ({
        className: styles$2.modifiers.help,
        children: tooltip ? (react.createElement(HeaderCellInfoWrapper, { variant: "tooltip", info: tooltip, tooltipProps: tooltipProps, ariaLabel: ariaLabel, className: className }, value)) : (react.createElement(HeaderCellInfoWrapper, { variant: "popover", info: popover, popoverProps: popoverProps, ariaLabel: ariaLabel, className: className }, value))
    });
    return infoObj;
};

var SortByDirection;
(function (SortByDirection) {
    SortByDirection["asc"] = "asc";
    SortByDirection["desc"] = "desc";
})(SortByDirection || (SortByDirection = {}));
const SortColumn = (_a) => {
    var { children = null, className = '', isSortedBy = false, onSort = null, sortDirection = '', type = 'button' } = _a, props = __rest(_a, ["children", "className", "isSortedBy", "onSort", "sortDirection", "type"]);
    let SortedByIcon;
    if (isSortedBy) {
        SortedByIcon = sortDirection === SortByDirection.asc ? LongArrowAltUpIcon : LongArrowAltDownIcon;
    }
    else {
        SortedByIcon = ArrowsAltVIcon;
    }
    return (react.createElement("button", Object.assign({}, props, { type: type, className: css(className, styles$2.tableButton), onClick: event => onSort && onSort(event) }),
        react.createElement("div", { className: css(className, styles$2.tableButtonContent) },
            react.createElement(TableText, null, children),
            react.createElement("span", { className: css(styles$2.tableSortIndicator) },
                react.createElement(SortedByIcon, null)))));
};
SortColumn.displayName = 'SortColumn';

const sortableFavorites = (sort) => () => sortable(react.createElement(StarIcon, { "aria-hidden": true }), {
    columnIndex: sort.columnIndex,
    className: styles$2.modifiers.favorite,
    ariaLabel: 'Sort favorites',
    column: {
        extraParams: {
            sortBy: sort.sortBy,
            onSort: sort === null || sort === void 0 ? void 0 : sort.onSort
        }
    }
});
const sortable = (label, { columnIndex, column, property, className, ariaLabel }) => {
    const { extraParams: { sortBy, onSort } } = column;
    const extraData = {
        columnIndex,
        column,
        property
    };
    const isSortedBy = sortBy && columnIndex === sortBy.index;
    /**
     * @param {React.MouseEvent} event - React mouse event
     */
    function sortClicked(event) {
        let reversedDirection;
        if (!isSortedBy) {
            reversedDirection = sortBy.defaultDirection ? sortBy.defaultDirection : SortByDirection.asc;
        }
        else {
            reversedDirection = sortBy.direction === SortByDirection.asc ? SortByDirection.desc : SortByDirection.asc;
        }
        // tslint:disable-next-line:no-unused-expression
        onSort && onSort(event, columnIndex, reversedDirection, extraData);
    }
    return {
        className: css(styles$2.tableSort, isSortedBy && styles$2.modifiers.selected, className),
        'aria-sort': isSortedBy ? `${sortBy.direction}ending` : 'none',
        children: (react.createElement(SortColumn, { isSortedBy: isSortedBy, sortDirection: isSortedBy ? sortBy.direction : '', onSort: sortClicked, "aria-label": ariaLabel }, label))
    };
};

var RowSelectVariant;
(function (RowSelectVariant) {
    RowSelectVariant["radio"] = "radio";
    RowSelectVariant["checkbox"] = "checkbox";
})(RowSelectVariant || (RowSelectVariant = {}));
const SelectColumn = (_a) => {
    var { children = null, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className, onSelect = null, selectVariant } = _a, props = __rest(_a, ["children", "className", "onSelect", "selectVariant"]);
    return (react.createElement(react.Fragment, null,
        react.createElement("label", null,
            react.createElement("input", Object.assign({}, props, { type: selectVariant, onChange: onSelect }))),
        children));
};
SelectColumn.displayName = 'SelectColumn';

const selectable = (label, { rowIndex, columnIndex, rowData, column, property }) => {
    const { extraParams: { onSelect, selectVariant, allRowsSelected, isHeaderSelectDisabled } } = column;
    const extraData = {
        rowIndex,
        columnIndex,
        column,
        property
    };
    if (rowData && rowData.hasOwnProperty('parent') && !rowData.showSelect && !rowData.fullWidth) {
        return {
            component: 'td',
            isVisible: true
        };
    }
    const rowId = rowIndex !== undefined ? rowIndex : -1;
    /**
     * @param {React.FormEvent} event - React form event
     */
    function selectClick(event) {
        const selected = rowIndex === undefined ? event.currentTarget.checked : rowData && !rowData.selected;
        // tslint:disable-next-line:no-unused-expression
        onSelect && onSelect(event, selected, rowId, rowData, extraData);
    }
    const customProps = Object.assign(Object.assign(Object.assign({}, (rowId !== -1
        ? {
            checked: rowData && !!rowData.selected,
            'aria-label': `Select row ${rowIndex}`
        }
        : {
            checked: allRowsSelected,
            'aria-label': 'Select all rows'
        })), (rowData &&
        (rowData.disableCheckbox || rowData.disableSelection) && {
        disabled: true,
        className: checkStyles.checkInput
    })), (!rowData && isHeaderSelectDisabled && { disabled: true }));
    let selectName = 'check-all';
    if (rowId !== -1 && selectVariant === RowSelectVariant.checkbox) {
        selectName = `checkrow${rowIndex}`;
    }
    else if (rowId !== -1) {
        selectName = 'radioGroup';
    }
    return {
        className: css(styles$2.tableCheck),
        component: 'td',
        isVisible: !rowData || !rowData.fullWidth,
        children: (react.createElement(SelectColumn, Object.assign({}, customProps, { selectVariant: selectVariant, onSelect: selectClick, name: selectName }), label))
    };
};

const CollapseColumn = (_a) => {
    var { className = '', children = null, isOpen, onToggle } = _a, props = __rest(_a, ["className", "children", "isOpen", "onToggle"]);
    return (react.createElement(react.Fragment, null,
        isOpen !== undefined && (react.createElement(Button, Object.assign({ className: css(className, isOpen && styles$2.modifiers.expanded) }, props, { variant: "plain", "aria-label": props['aria-label'] || 'Details', onClick: onToggle, "aria-expanded": isOpen }),
            react.createElement("div", { className: css(styles$2.tableToggleIcon) },
                react.createElement(AngleDownIcon, null)))),
        children));
};
CollapseColumn.displayName = 'CollapseColumn';

const ExpandableRowContent = (_a) => {
    var { children = null } = _a, props = __rest(_a, ["children"]);
    return (react.createElement("div", Object.assign({}, props, { className: css(styles$2.tableExpandableRowContent) }), children));
};
ExpandableRowContent.displayName = 'ExpandableRowContent';

const collapsible = (value, { rowIndex, columnIndex, rowData, column, property }) => {
    const { extraParams: { onCollapse, rowLabeledBy = 'simple-node', expandId = 'expand-toggle', allRowsExpanded, collapseAllAriaLabel } } = column;
    const extraData = {
        rowIndex,
        columnIndex,
        column,
        property
    };
    const rowId = rowIndex !== undefined ? rowIndex : -1;
    const customProps = Object.assign({}, (rowId !== -1
        ? {
            isOpen: rowData === null || rowData === void 0 ? void 0 : rowData.isOpen,
            'aria-labelledby': `${rowLabeledBy}${rowId} ${expandId}${rowId}`
        }
        : {
            isOpen: allRowsExpanded,
            'aria-label': collapseAllAriaLabel || 'Expand all rows'
        }));
    /**
     * @param {React.MouseEvent} event - Mouse event
     */
    function onToggle(event) {
        const open = rowData ? !rowData.isOpen : !allRowsExpanded;
        // tslint:disable-next-line:no-unused-expression
        onCollapse && onCollapse(event, rowIndex, open, rowData, extraData);
    }
    return {
        className: ((rowData === null || rowData === void 0 ? void 0 : rowData.isOpen) !== undefined || rowId === -1) && css(styles$2.tableToggle),
        isVisible: !(rowData === null || rowData === void 0 ? void 0 : rowData.fullWidth),
        children: (react.createElement(CollapseColumn, Object.assign({ "aria-labelledby": `${rowLabeledBy}${rowId} ${expandId}${rowId}`, onToggle: onToggle, id: expandId + rowId }, customProps), value))
    };
};
const expandable = (value, { rowData }) => rowData && rowData.hasOwnProperty('parent') ? (react.createElement(ExpandableRowContent, null, value)) : (value);
const expandedRow = (colSpan, additionalColSpan = 0) => {
    const expandedRowFormatter = (value, { columnIndex, rowIndex, rowData, column: { extraParams: { contentId = 'expanded-content' } } }) => value &&
        rowData.hasOwnProperty('parent') && {
        colSpan: !rowData.cells || rowData.cells.length === 1 ? colSpan + (rowData.fullWidth ? additionalColSpan + 1 : 0) : 1,
        id: contentId + rowIndex + (columnIndex ? '-' + columnIndex : ''),
        className: rowData.noPadding && css(styles$2.modifiers.noPadding)
    };
    return expandedRowFormatter;
};

const cellWidth = (width) => () => ({
    className: css(styles$2.modifiers[typeof width === 'number' ? `width_${width}` : `width${capitalize(width)}`])
});

const visibilityModifiers = [
    'hidden',
    'hiddenOnSm',
    'hiddenOnMd',
    'hiddenOnLg',
    'hiddenOnXl',
    'hiddenOn_2xl',
    'visibleOnSm',
    'visibleOnMd',
    'visibleOnLg',
    'visibleOnXl',
    'visibleOn_2xl'
];
const Visibility = visibilityModifiers
    .filter(key => styles$2.modifiers[key])
    .reduce((acc, curr) => {
    const key2 = curr.replace('_2xl', '2Xl');
    acc[key2] = styles$2.modifiers[curr];
    return acc;
}, {});
const classNames = (...classes) => () => ({
    className: css(...classes)
});

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = _createAssigner(function(object, source, srcIndex, customizer) {
  _baseMerge(object, source, srcIndex, customizer);
});

var mergeWith_1 = mergeWith;

/**
 * merge-props.js
 *
 * Forked from reactabular-table version 8.14.0
 * https://github.com/reactabular/reactabular/tree/v8.14.0/packages/reactabular-table/src
 */
/**
 * @param {any} props - Props
 */
function mergeProps(...props) {
    const firstProps = props[0];
    const restProps = props.slice(1);
    if (!restProps.length) {
        return mergeWith_1({}, firstProps);
    }
    // Avoid mutating the first prop collection
    return mergeWith_1(mergeWith_1({}, firstProps), ...restProps, (a, b, key) => {
        if (key === 'children') {
            if (a && b) {
                // compose the two
                return react.cloneElement(a, {
                    children: b
                });
            }
            // Children have to be merged in reverse order for Reactabular
            // logic to work.
            return Object.assign(Object.assign({}, b), a);
        }
        if (key === 'className') {
            // Process class names through classNames to merge properly
            // as a string.
            return css(a, b);
        }
        return undefined;
    });
}

const ThBase = (_a) => {
    var { children, className, component = 'th', dataLabel, scope = 'col', textCenter = false, sort = null, modifier, select = null, expand: collapse = null, tooltip = '', onMouseEnter: onMouseEnterProp = () => { }, width, visibility, innerRef, info: infoProps, isStickyColumn = false, hasRightBorder = false, stickyMinWidth = '120px', stickyLeftOffset, isSubheader = false } = _a, props = __rest(_a, ["children", "className", "component", "dataLabel", "scope", "textCenter", "sort", "modifier", "select", "expand", "tooltip", "onMouseEnter", "width", "visibility", "innerRef", "info", "isStickyColumn", "hasRightBorder", "stickyMinWidth", "stickyLeftOffset", "isSubheader"]);
    const [showTooltip, setShowTooltip] = react.useState(false);
    const onMouseEnter = (event) => {
        if (event.target.offsetWidth < event.target.scrollWidth) {
            !showTooltip && setShowTooltip(true);
        }
        else {
            showTooltip && setShowTooltip(false);
        }
        onMouseEnterProp(event);
    };
    let sortParams = null;
    if (sort) {
        if (sort.isFavorites) {
            sortParams = sortableFavorites({
                onSort: sort === null || sort === void 0 ? void 0 : sort.onSort,
                columnIndex: sort.columnIndex,
                sortBy: sort.sortBy
            })();
        }
        else {
            sortParams = sortable(children, {
                columnIndex: sort.columnIndex,
                column: {
                    extraParams: {
                        sortBy: sort.sortBy,
                        onSort: sort === null || sort === void 0 ? void 0 : sort.onSort
                    }
                }
            });
        }
    }
    const selectParams = select
        ? selectable(children, {
            column: {
                extraParams: {
                    onSelect: select === null || select === void 0 ? void 0 : select.onSelect,
                    selectVariant: 'checkbox',
                    allRowsSelected: select.isSelected,
                    isHeaderSelectDisabled: !!select.isHeaderSelectDisabled
                }
            }
        })
        : null;
    const collapseParams = collapse
        ? collapsible(children, {
            column: {
                extraParams: {
                    onCollapse: collapse === null || collapse === void 0 ? void 0 : collapse.onToggle,
                    allRowsExpanded: !collapse.areAllExpanded,
                    collapseAllAriaLabel: ''
                }
            }
        })
        : null;
    const widthParams = width ? cellWidth(width)() : null;
    const visibilityParams = visibility
        ? classNames(...visibility.map((vis) => Visibility[vis]))()
        : null;
    let transformedChildren = (sortParams === null || sortParams === void 0 ? void 0 : sortParams.children) || (selectParams === null || selectParams === void 0 ? void 0 : selectParams.children) || (collapseParams === null || collapseParams === void 0 ? void 0 : collapseParams.children) || children;
    // info can wrap other transformedChildren
    let infoParams = null;
    if (infoProps) {
        infoParams = info(infoProps)(transformedChildren);
        transformedChildren = infoParams.children;
    }
    const merged = mergeProps(sortParams, selectParams, collapseParams, widthParams, visibilityParams, infoParams);
    const { 
    // ignore the merged children since we transform them ourselves so we can wrap it with info
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children: mergedChildren = null, 
    // selectable adds this but we don't want it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isVisible = null, className: mergedClassName = '', component: MergedComponent = component } = merged, mergedProps = __rest(merged, ["children", "isVisible", "className", "component"]);
    const cell = (react.createElement(MergedComponent, Object.assign({ "data-label": dataLabel, onMouseEnter: tooltip !== null ? onMouseEnter : onMouseEnterProp, scope: component === 'th' && children ? scope : null, ref: innerRef, className: css(className, textCenter && styles$2.modifiers.center, isSubheader && styles$2.tableSubhead, isStickyColumn && styles.tableStickyColumn, hasRightBorder && styles.modifiers.borderRight, modifier && styles$2.modifiers[modifier], mergedClassName) }, mergedProps, props, (isStickyColumn && {
        style: Object.assign({ '--pf-c-table__sticky-column--MinWidth': stickyMinWidth ? stickyMinWidth : undefined, '--pf-c-table__sticky-column--Left': stickyLeftOffset ? stickyLeftOffset : undefined }, props.style)
    })), transformedChildren));
    const canDefault = tooltip === '' ? typeof children === 'string' : true;
    return tooltip !== null && canDefault && showTooltip ? (react.createElement(Tooltip, { content: tooltip || (tooltip === '' && children), isVisible: true }, cell)) : (cell);
};
const Th = react.forwardRef((props, ref) => (react.createElement(ThBase, Object.assign({}, props, { innerRef: ref }))));
Th.displayName = 'Th';

class ActionsColumn extends react.Component {
    constructor(props) {
        super(props);
        this.toggleRef = react.createRef();
        this.onToggle = (isOpen) => {
            this.setState({
                isOpen
            });
        };
        this.onClick = (event, onClick) => {
            const { rowData, extraData } = this.props;
            // Only prevent default if onClick is provided.  This allows href support.
            if (onClick) {
                event.preventDefault();
                // tslint:disable-next-line:no-unused-expression
                onClick(event, extraData && extraData.rowIndex, rowData, extraData);
            }
        };
        this.state = {
            isOpen: false
        };
    }
    render() {
        const { isOpen } = this.state;
        const { items, children, dropdownPosition, dropdownDirection, isDisabled, rowData, actionsToggle } = this.props;
        const actionsToggleClone = actionsToggle ? (actionsToggle({ onToggle: this.onToggle, isOpen, isDisabled })) : (react.createElement(KebabToggle, { isDisabled: isDisabled, onToggle: this.onToggle }));
        return (react.createElement(react.Fragment, null,
            items
                .filter(item => item.isOutsideDropdown)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .map((_a, key) => {
                var { title, itemKey, onClick, isOutsideDropdown } = _a, props = __rest(_a, ["title", "itemKey", "onClick", "isOutsideDropdown"]);
                return typeof title === 'string' ? (react.createElement(Button, Object.assign({ onClick: event => this.onClick(event, onClick) }, props, { isDisabled: isDisabled, key: itemKey || `outside_dropdown_${key}`, "data-key": itemKey || `outside_dropdown_${key}` }), title)) : (react.cloneElement(title, Object.assign({ onClick, isDisabled }, props)));
            }),
            react.createElement(Dropdown, Object.assign({ toggle: actionsToggleClone, position: dropdownPosition, direction: dropdownDirection, isOpen: isOpen, dropdownItems: items
                    .filter(item => !item.isOutsideDropdown)
                    .map((_a, key) => {
                    var { title, itemKey, onClick, isSeparator } = _a, props = __rest(_a, ["title", "itemKey", "onClick", "isSeparator"]);
                    return isSeparator ? (react.createElement(DropdownSeparator, Object.assign({}, props, { key: itemKey || key, "data-key": itemKey || key }))) : (react.createElement(DropdownItem, Object.assign({ component: "button", onClick: event => {
                            this.onClick(event, onClick);
                            this.onToggle(!isOpen);
                        } }, props, { key: itemKey || key, "data-key": itemKey || key }), title));
                }), isPlain: true }, (rowData && rowData.actionProps))),
            children));
    }
}
ActionsColumn.displayName = 'ActionsColumn';
ActionsColumn.defaultProps = {
    children: null,
    items: [],
    dropdownPosition: DropdownPosition.right,
    dropdownDirection: DropdownDirection.down,
    rowData: {},
    extraData: {}
};

const resolveOrDefault = (resolver, defaultValue, rowData, extraData) => (typeof resolver === 'function' ? resolver(rowData, extraData) : defaultValue);
const cellActions = (actions, actionResolver, areActionsDisabled) => (label, { rowData, column, rowIndex, columnIndex, column: { extraParams: { dropdownPosition, dropdownDirection, actionsToggle } }, property }) => {
    const extraData = {
        rowIndex,
        columnIndex,
        column,
        property
    };
    const resolvedActions = resolveOrDefault(actionResolver, actions, rowData, extraData);
    const resolvedIsDisabled = resolveOrDefault(areActionsDisabled, rowData && rowData.disableActions, rowData, extraData);
    const renderProps = resolvedActions && resolvedActions.length > 0
        ? {
            children: (react.createElement(ActionsColumn, { items: resolvedActions, dropdownPosition: dropdownPosition, dropdownDirection: dropdownDirection, isDisabled: resolvedIsDisabled, rowData: rowData, extraData: extraData, actionsToggle: actionsToggle }, label))
        }
        : {};
    return Object.assign({ className: css(styles$2.tableAction), style: { paddingRight: 0 }, isVisible: true }, renderProps);
};

const compoundExpand = (value, { rowIndex, columnIndex, rowData, column, property }) => {
    if (!value) {
        return null;
    }
    const { title, props } = value;
    const { extraParams: { onExpand } } = column;
    const extraData = {
        rowIndex,
        columnIndex,
        column,
        property
    };
    /**
     * @param {React.MouseEvent} event - Mouse event
     */
    function onToggle(event) {
        // tslint:disable-next-line:no-unused-expression
        onExpand && onExpand(event, rowIndex, columnIndex, props.isOpen, rowData, extraData);
    }
    return {
        className: css(styles$2.tableCompoundExpansionToggle, props.isOpen && styles$2.modifiers.expanded),
        children: props.isOpen !== undefined && (react.createElement("button", { type: "button", className: css(styles$2.tableButton), onClick: onToggle, "aria-expanded": props.isOpen, "aria-controls": props.ariaControls },
            react.createElement(TableText, null, title)))
    };
};

const FavoritesCell = (_a) => {
    var { className = '', onFavorite, isFavorited, rowIndex } = _a, props = __rest(_a, ["className", "onFavorite", "isFavorited", "rowIndex"]);
    const ariaProps = rowIndex === undefined
        ? {}
        : {
            id: `favorites-button-${rowIndex}`,
            'aria-labelledby': `favorites-button-${rowIndex}`
        };
    return (react.createElement(Button, Object.assign({ variant: "plain", className: className, type: "button", "aria-label": isFavorited ? 'Starred' : 'Not starred', onClick: onFavorite }, ariaProps, props),
        react.createElement(StarIcon, { "aria-hidden": true })));
};
FavoritesCell.displayName = 'FavoritesCell';

const favoritable = (value, { rowIndex, columnIndex, rowData, column, property }) => {
    const { extraParams: { onFavorite } } = column;
    const extraData = {
        rowIndex,
        columnIndex,
        column,
        property
    };
    // this is a child row which should not display the favorites icon
    if (rowData && rowData.hasOwnProperty('parent') && !rowData.fullWidth) {
        return {
            component: 'td',
            isVisible: true
        };
    }
    /**
     * @param {React.MouseEvent} event - Mouse event
     */
    function favoritesClick(event) {
        // tslint:disable-next-line:no-unused-expression
        onFavorite && onFavorite(event, rowData && !rowData.favorited, rowIndex, rowData, extraData);
    }
    const additionalProps = rowData.favoritesProps || {};
    return {
        className: css(styles$2.tableFavorite, rowData && rowData.favorited && styles$2.modifiers.favorited),
        isVisible: !rowData || !rowData.fullWidth,
        children: (react.createElement(FavoritesCell, Object.assign({ rowIndex: rowIndex, onFavorite: favoritesClick, isFavorited: rowData && rowData.favorited }, additionalProps)))
    };
};

const DraggableCell = (_a) => {
    var { className, onClick, 'aria-label': ariaLabel, id } = _a, props = __rest(_a, ["className", "onClick", 'aria-label', "id"]);
    return (react.createElement(Button, Object.assign({ id: id, variant: "plain", className: className, type: "button", "aria-label": ariaLabel || `Draggable row draggable button`, onClick: onClick }, props),
        react.createElement(GripVerticalIcon, { "aria-hidden": true })));
};
DraggableCell.displayName = 'DraggableCell';

const draggable = (value, { rowData }) => {
    const { id } = rowData;
    return {
        className: '',
        children: react.createElement(DraggableCell, { id: id })
    };
};

const treeRow = (onCollapse, onCheckChange, onToggleRowDetails) => (value, { rowIndex, rowData }) => {
    const { isExpanded, isDetailsExpanded, 'aria-level': level, 'aria-setsize': setsize, toggleAriaLabel, checkAriaLabel, showDetailsAriaLabel, isChecked, checkboxId, icon } = rowData.props;
    const content = value.title || value;
    const text = (react.createElement("div", { className: css(stylesTreeView.tableTreeViewText), key: "tree-view-text" },
        icon && (react.createElement("span", { className: css(stylesTreeView.tableTreeViewIcon), key: "tree-view-text-icon" }, icon)),
        react.createElement("span", { className: "pf-c-table__text", key: "table-text" }, content)));
    const onChange = (isChecked, event) => {
        onCheckChange(event, isChecked, rowIndex, content, rowData);
    };
    return {
        component: 'th',
        className: 'pf-c-table__tree-view-title-cell',
        children: level !== undefined ? (react.createElement("div", { className: css(stylesTreeView.tableTreeViewMain) },
            setsize > 0 && (react.createElement("span", { className: css(stylesTreeView.tableToggle), key: "table-toggle" },
                react.createElement(Button, { variant: "plain", onClick: event => onCollapse && onCollapse(event, rowIndex, content, rowData), className: css(isExpanded && styles$2.modifiers.expanded), "aria-expanded": isExpanded, "aria-label": toggleAriaLabel || `${isExpanded ? 'Collapse' : 'Expand'} row ${rowIndex}` },
                    react.createElement("div", { className: css(stylesTreeView.tableToggleIcon) },
                        react.createElement(AngleDownIcon, { "aria-hidden": "true" }))))),
            !!onCheckChange && (react.createElement("span", { className: css(stylesTreeView.tableCheck), key: "table-check" },
                react.createElement("label", { htmlFor: checkboxId || `checkbox_${rowIndex}` },
                    react.createElement(Checkbox, { id: checkboxId || `checkbox_${rowIndex}`, "aria-label": checkAriaLabel || `Row ${rowIndex} checkbox`, isChecked: isChecked, onChange: onChange })))),
            text,
            !!onToggleRowDetails && (react.createElement("span", { className: css(stylesTreeView.tableTreeViewDetailsToggle), key: "view-details-toggle" },
                react.createElement(Button, { variant: "plain", "aria-expanded": isDetailsExpanded, "aria-label": showDetailsAriaLabel || 'Show row details', onClick: event => onToggleRowDetails && onToggleRowDetails(event, rowIndex, content, rowData) },
                    react.createElement("span", { className: "pf-c-table__details-toggle-icon" },
                        react.createElement(EllipsisHIcon, { "aria-hidden": true }))))))) : (text)
    };
};

const TdBase = (_a) => {
    var { children, className, isActionCell = false, component = 'td', dataLabel, textCenter = false, modifier, select = null, actions = null, expand = null, treeRow: treeRowProp = null, compoundExpand: compoundExpandProp = null, noPadding, width, visibility, innerRef, favorites = null, draggableRow: draggableRowProp = null } = _a, props = __rest(_a, ["children", "className", "isActionCell", "component", "dataLabel", "textCenter", "modifier", "select", "actions", "expand", "treeRow", "compoundExpand", "noPadding", "width", "visibility", "innerRef", "favorites", "draggableRow"]);
    const selectParams = select
        ? selectable(children, {
            rowIndex: select.rowIndex,
            rowData: {
                selected: select.isSelected,
                disableSelection: select === null || select === void 0 ? void 0 : select.disable,
                props: select === null || select === void 0 ? void 0 : select.props
            },
            column: {
                extraParams: {
                    onSelect: select === null || select === void 0 ? void 0 : select.onSelect,
                    selectVariant: select.variant || 'checkbox'
                }
            }
        })
        : null;
    const favoriteParams = favorites
        ? favoritable(null, {
            rowIndex: favorites === null || favorites === void 0 ? void 0 : favorites.rowIndex,
            rowData: {
                favorited: favorites.isFavorited,
                favoritesProps: favorites === null || favorites === void 0 ? void 0 : favorites.props
            },
            column: {
                extraParams: {
                    onFavorite: favorites === null || favorites === void 0 ? void 0 : favorites.onFavorite
                }
            }
        })
        : null;
    const draggableParams = draggableRowProp !== null
        ? draggable(null, {
            rowData: {
                id: draggableRowProp.id
            }
        })
        : null;
    const actionParamsFunc = actions ? cellActions(actions.items, null, null) : null;
    const actionParams = actionParamsFunc
        ? actionParamsFunc(null, {
            rowIndex: actions === null || actions === void 0 ? void 0 : actions.rowIndex,
            rowData: {
                disableActions: actions === null || actions === void 0 ? void 0 : actions.disable
            },
            column: {
                extraParams: {
                    dropdownPosition: actions === null || actions === void 0 ? void 0 : actions.dropdownPosition,
                    dropdownDirection: actions === null || actions === void 0 ? void 0 : actions.dropdownDirection,
                    actionsToggle: actions === null || actions === void 0 ? void 0 : actions.actionsToggle
                }
            }
        })
        : null;
    const expandableParams = expand !== null
        ? collapsible(null, {
            rowIndex: expand.rowIndex,
            columnIndex: expand === null || expand === void 0 ? void 0 : expand.columnIndex,
            rowData: {
                isOpen: expand.isExpanded
            },
            column: {
                extraParams: {
                    onCollapse: expand === null || expand === void 0 ? void 0 : expand.onToggle
                }
            }
        })
        : null;
    const compoundParams = compoundExpandProp !== null
        ? compoundExpand({
            title: children,
            props: {
                isOpen: compoundExpandProp.isExpanded
            }
        }, {
            column: {
                extraParams: {
                    onExpand: compoundExpandProp === null || compoundExpandProp === void 0 ? void 0 : compoundExpandProp.onToggle
                }
            }
        })
        : null;
    const widthParams = width ? cellWidth(width)() : null;
    const visibilityParams = visibility
        ? classNames(...visibility.map((vis) => Visibility[vis]))()
        : null;
    const treeRowParams = treeRowProp !== null
        ? treeRow(treeRowProp.onCollapse, treeRowProp.onCheckChange, treeRowProp.onToggleRowDetails)({
            title: children
        }, {
            rowIndex: treeRowProp.rowIndex,
            rowData: {
                props: treeRowProp.props
            }
        })
        : null;
    const merged = mergeProps(selectParams, actionParams, expandableParams, compoundParams, widthParams, visibilityParams, favoriteParams, treeRowParams, draggableParams);
    const { 
    // selectable adds this but we don't want it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isVisible = null, children: mergedChildren = null, className: mergedClassName = '', component: MergedComponent = component } = merged, mergedProps = __rest(merged, ["isVisible", "children", "className", "component"]);
    const treeTableTitleCell = (className && className.includes('pf-c-table__tree-view-title-cell')) ||
        (mergedClassName && mergedClassName.includes('pf-c-table__tree-view-title-cell'));
    return (react.createElement(MergedComponent, Object.assign({}, (!treeTableTitleCell && { 'data-label': dataLabel }), { className: css(className, isActionCell && styles$2.tableAction, textCenter && styles$2.modifiers.center, noPadding && styles$2.modifiers.noPadding, styles$2.modifiers[modifier], draggableParams && styles$2.tableDraggable, mergedClassName), ref: innerRef }, mergedProps, props), mergedChildren || children));
};
const Td = react.forwardRef((props, ref) => (react.createElement(TdBase, Object.assign({}, props, { innerRef: ref }))));
Td.displayName = 'Td';

/**
 * types.tsx
 *
 * Forked from reactabular-table version 8.14.0
 * https://github.com/reactabular/reactabular/tree/v8.14.0/packages/reactabular-table/src
 */
// Table Defaults
const TableDefaults = {
    renderers: {
        table: TableComposable,
        header: {
            wrapper: Thead,
            row: Tr,
            cell: Th
        },
        body: {
            wrapper: Tbody,
            row: Tr,
            cell: Td
        }
    }
};

const ProviderContext = react.createContext({
    columns: null,
    renderers: null
});
class Provider extends react.Component {
    render() {
        const _a = this.props, { columns, renderers, components, children } = _a, props = __rest(_a, ["columns", "renderers", "components", "children"]);
        let finalRenderers = renderers;
        if (components) {
            // eslint-disable-next-line no-console
            console.warn('`components` have been deprecated in favor of `renderers` and will be removed in the next major version, please rename!');
            finalRenderers = components;
        }
        const provider = react.createElement(renderers.table || TableDefaults.renderers.table, props, children);
        return (react.createElement(ProviderContext.Provider, { value: {
                columns,
                renderers: {
                    table: finalRenderers.table || TableDefaults.renderers.table,
                    header: Object.assign(Object.assign({}, TableDefaults.renderers.header), finalRenderers.header),
                    body: Object.assign(Object.assign({}, TableDefaults.renderers.body), finalRenderers.body)
                }
            } }, provider));
    }
}
Provider.displayName = 'Provider';
Provider.defaultProps = {
    renderers: TableDefaults.renderers
};

/**
 * @param {formattersType} formatters - formatters type
 */
function evaluateFormatters(formatters) {
    return (value, extra) => formatters.reduce((parameters, formatter) => ({
        value: formatter(parameters.value, parameters.extra),
        extra
    }), { value, extra }).value;
}

/**
 * evaluate-transforms.ts
 *
 * Forked from reactabular-table version 8.14.0
 * https://github.com/reactabular/reactabular/tree/v8.14.0/packages/reactabular-table/src
 */
/**
 * @param {transformsType} transforms - transforms type
 * @param {string | object} value - value
 * @param {ExtraParamsType} extraParameters - extra params type
 */
function evaluateTransforms(transforms = [], value, extraParameters = {}) {
    if (transforms.length === 0) {
        return {};
    }
    return mergeProps(...transforms.map(transform => transform(value, extraParameters)));
}

/**
 * header-row.tsx
 *
 * Forked from reactabular-table version 8.14.0
 * https://github.com/reactabular/reactabular/tree/v8.14.0/packages/reactabular-table/src
 */
const HeaderRow = ({ rowData, rowIndex, renderers, onRow = () => ({}) }) => react.createElement(renderers.row, onRow(rowData, { rowIndex }), rowData.map((column, columnIndex) => {
    const { property, header = {}, props = {} } = column;
    const evaluatedProperty = property || (header && header.property);
    const { label, transforms = [], formatters = [], info = {} } = header;
    const extraParameters = {
        columnIndex,
        property: evaluatedProperty,
        column
    };
    const transformedProps = evaluateTransforms(transforms, label, extraParameters);
    if (!transformedProps) {
        // tslint:disable-next-line:no-console
        console.warn('Table.Header - Failed to receive a transformed result'); // eslint-disable-line max-len, no-console
    }
    let cellNode;
    const { tooltip, tooltipProps, popover, popoverProps, ariaLabel, className } = info;
    // consumer can specify header cell tooltip/popover in two ways, but the transforms approach is preferred,
    // especially for sorting tables that use `transforms: [sortable]`
    // {
    //   title: 'Repositories',
    //   header: {
    //     info: {
    //       tooltip: 'More information about repositories',
    //       className: 'repositories-info-tip',
    //       tooltipProps: {
    //         isContentLeftAligned: true
    //       }
    //     }
    //   }
    // }
    //
    // {
    //   title: 'Repositories',
    //   transforms: [
    //     info({
    //       tooltip: 'More information about repositories',
    //       className: 'repositories-info-tip',
    //       tooltipProps: {
    //         isContentLeftAligned: true
    //       }
    //     }),
    //     sortable
    //   ]
    // },
    if (tooltip) {
        cellNode = (react.createElement(HeaderCellInfoWrapper, { variant: "tooltip", info: tooltip, tooltipProps: tooltipProps, ariaLabel: ariaLabel, className: className }, transformedProps.children || evaluateFormatters(formatters)(label, extraParameters)));
    }
    else if (popover) {
        cellNode = (react.createElement(HeaderCellInfoWrapper, { variant: "popover", info: popover, popoverProps: popoverProps, ariaLabel: ariaLabel, className: className }, transformedProps.children || evaluateFormatters(formatters)(label, extraParameters)));
    }
    else {
        cellNode = transformedProps.children || evaluateFormatters(formatters)(label, extraParameters);
    }
    return react.createElement(renderers.cell, Object.assign({ key: `${columnIndex}-header` }, mergeProps(props, header && header.props, transformedProps)), cellNode);
}));
HeaderRow.displayName = 'HeaderRow';

class BaseHeader extends react.Component {
    render() {
        const _a = this.props, { children, headerRows, onRow, renderers, columns } = _a, props = __rest(_a, ["children", "headerRows", "onRow", "renderers", "columns"]);
        // If headerRows aren't passed, default to bodyColumns as header rows
        return react.createElement(renderers.header.wrapper, props, [
            (headerRows || [columns]).map((rowData, rowIndex) => react.createElement(HeaderRow, {
                key: `${rowIndex}-header-row`,
                renderers: renderers.header,
                onRow,
                rowData,
                rowIndex
            }))
        ].concat(children));
    }
}
const Header = (props) => (react.createElement(ProviderContext.Consumer, null, ({ columns, renderers }) => react.createElement(BaseHeader, Object.assign({ columns: columns, renderers: renderers }, props))));

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return _baseIsEqual(value, other);
}

var isEqual_1 = isEqual;

/**
 * resolve-row-key.ts
 *
 * Forked from reactabular-table version 8.14.0
 * https://github.com/reactabular/reactabular/tree/v8.14.0/packages/reactabular-table/src
 */
/**
 * @param {{rowData: RowType, rowIndex: number, rowKey: RowKeyType}} rowData - row data
 */
function resolveRowKey({ rowData, rowIndex, rowKey }) {
    if (typeof rowKey === 'function') {
        return `${rowKey({ rowData, rowIndex })}-row`;
    }
    if (rowData[rowKey] === 0) {
        return `${rowData[rowKey]}-row`;
    }
    return `${rowData[rowKey] || rowIndex}-row`;
}

/**
 * This method is like `_.isEqual` except that it accepts `customizer` which
 * is invoked to compare values. If `customizer` returns `undefined`, comparisons
 * are handled by the method instead. The `customizer` is invoked with up to
 * six arguments: (objValue, othValue [, index|key, object, other, stack]).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value);
 * }
 *
 * function customizer(objValue, othValue) {
 *   if (isGreeting(objValue) && isGreeting(othValue)) {
 *     return true;
 *   }
 * }
 *
 * var array = ['hello', 'goodbye'];
 * var other = ['hi', 'goodbye'];
 *
 * _.isEqualWith(array, other, customizer);
 * // => true
 */
function isEqualWith(value, other, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  var result = customizer ? customizer(value, other) : undefined;
  return result === undefined ? _baseIsEqual(value, other, undefined, customizer) : !!result;
}

var isEqualWith_1 = isEqualWith;

/**
 * columns-are-equal.ts
 *
 * Forked from reactabular-table version 8.14.0
 * https://github.com/reactabular/reactabular/tree/v8.14.0/packages/reactabular-table/src
 */
/**
 * @param {ColumnsType} oldColumns - previous columns
 * @param {ColumnsType} newColumns - new columns
 */
function columnsAreEqual(oldColumns, newColumns) {
    return isEqualWith_1(oldColumns, newColumns, (a, b) => {
        if (typeof a === 'function' && typeof b === 'function') {
            return a === b;
        }
        return undefined;
    });
}

/**
 * body-row.tsx
 *
 * Forked from reactabular-table version 8.14.0
 * https://github.com/reactabular/reactabular/tree/v8.14.0/packages/reactabular-table/src
 */
class BodyRow extends react.Component {
    shouldComponentUpdate(nextProps) {
        const { columns, rowData } = this.props;
        // Check for row based override.
        const { renderers } = nextProps;
        if (renderers && renderers.row && renderers.row.shouldComponentUpdate) {
            if (typeof renderers.row.shouldComponentUpdate === 'function') {
                return renderers.row.shouldComponentUpdate.call(this, nextProps, {}, {});
            }
            return true;
        }
        return !(columnsAreEqual(columns, nextProps.columns) && isEqual_1(rowData, nextProps.rowData));
    }
    render() {
        const { columns, renderers, onRow, rowKey, rowIndex, rowData } = this.props;
        return react.createElement(renderers.row, onRow(rowData, { rowIndex, rowKey }), columns.map((column, columnIndex) => {
            const { property, cell, props } = column;
            const evaluatedProperty = (property || (cell && cell.property));
            const { transforms = [], formatters = [] } = cell || {};
            const extraParameters = {
                columnIndex,
                property: evaluatedProperty,
                column,
                rowData,
                rowIndex,
                rowKey
            };
            const transformed = evaluateTransforms(transforms, rowData[evaluatedProperty], extraParameters);
            if (!transformed) {
                // eslint-disable-next-line no-console
                console.warn('Table.Body - Failed to receive a transformed result');
            }
            let additionalFormaters = [];
            if (rowData[evaluatedProperty]) {
                additionalFormaters = rowData[evaluatedProperty].formatters;
            }
            return react.createElement(renderers.cell, Object.assign({ key: `col-${columnIndex}-row-${rowIndex}` }, mergeProps(props, cell && cell.props, transformed)), (!rowData.fullWidth && transformed.children) ||
                evaluateFormatters([...formatters, ...additionalFormaters])(rowData[`_${evaluatedProperty}`] || rowData[evaluatedProperty], extraParameters));
        }));
    }
}
BodyRow.displayName = 'BodyRow';
BodyRow.defaultProps = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRow: (...args) => ({})
};

class BaseBody extends react.Component {
    constructor() {
        super(...arguments);
        this.omitOnRow = (props) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const ret = __rest(props, ["onRow"]);
            return ret;
        };
    }
    shouldComponentUpdate(nextProps) {
        // Skip checking props against `onRow` since that can be bound at render().
        // That's not particularly good practice but you never know how the users
        // prefer to define the handler.
        // Check for wrapper based override.
        const { renderers } = nextProps;
        if (renderers &&
            renderers.body &&
            renderers.body.wrapper &&
            renderers.body.wrapper.shouldComponentUpdate) {
            if (typeof renderers.body.wrapper.shouldComponentUpdate === 'function') {
                return renderers.body.wrapper.shouldComponentUpdate.call(this, nextProps, {}, {});
            }
            return true;
        }
        return !isEqual_1(this.omitOnRow(this.props), this.omitOnRow(nextProps));
    }
    render() {
        const _a = this.props, { onRow, rows, rowKey, columns, renderers } = _a, props = __rest(_a, ["onRow", "rows", "rowKey", "columns", "renderers"]);
        const children = rows.map((rowData, index) => {
            const key = resolveRowKey({ rowData, rowIndex: index, rowKey });
            return react.createElement(BodyRow, {
                key,
                renderers: renderers.body,
                onRow,
                rowKey: key,
                rowIndex: index,
                rowData,
                columns
            });
        });
        return react.createElement(renderers.body.wrapper, props, children);
    }
}
BaseBody.defaultProps = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRow: (...args) => ({})
};
const Body = (props) => (react.createElement(ProviderContext.Consumer, null, ({ columns, renderers }) => react.createElement(BaseBody, Object.assign({ columns: columns, renderers: renderers }, props))));

const BodyCell = (_a) => {
    var { 'data-label': dataLabel = '', className = '', colSpan, component = 'td', isVisible, parentId, textCenter = false, tooltip: tooltipProp = '', onMouseEnter: onMouseEnterProp = () => { }, children, 
    /* eslint-disable @typescript-eslint/no-unused-vars */
    errorText, isValid, isOpen, ariaControls, editableValue, editableSelectProps, options, isSelectOpen, value, name } = _a, 
    /* eslint-enable @typescript-eslint/no-unused-vars */
    props = __rest(_a, ['data-label', "className", "colSpan", "component", "isVisible", "parentId", "textCenter", "tooltip", "onMouseEnter", "children", "errorText", "isValid", "isOpen", "ariaControls", "editableValue", "editableSelectProps", "options", "isSelectOpen", "value", "name"]);
    const [tooltip, setTooltip] = react.useState('');
    const onMouseEnter = (event) => {
        if (event.target.offsetWidth < event.target.scrollWidth) {
            if (tooltipProp) {
                setTooltip(tooltipProp);
            }
            else if (typeof children === 'string') {
                setTooltip(children);
            }
        }
        else {
            setTooltip('');
        }
        onMouseEnterProp(event);
    };
    let isEmptyStateCell = false;
    if (children) {
        isEmptyStateCell =
            (children.type === Bullseye &&
                children.props.children &&
                children.props.children.type === EmptyState) ||
                children.type === EmptyState;
    }
    const cell = (react.createElement(Td, Object.assign({ className: className, component: component, dataLabel: dataLabel && parentId == null && !isEmptyStateCell ? dataLabel : null, onMouseEnter: onMouseEnter, textCenter: textCenter, colSpan: colSpan }, props), children));
    const bodyCell = tooltip !== '' ? (react.createElement(Tooltip, { content: tooltip, isVisible: true }, cell)) : (cell);
    return (parentId !== undefined && colSpan === undefined) || !isVisible ? null : bodyCell;
};
BodyCell.displayName = 'BodyCell';

const HeaderCell = (_a) => {
    var { className = '', component = 'th', scope = '', textCenter = false, tooltip = '', onMouseEnter = () => { }, children, 
    /* eslint-disable @typescript-eslint/no-unused-vars */
    isVisible, dataLabel = '' } = _a, 
    /* eslint-enable @typescript-eslint/no-unused-vars */
    props = __rest(_a, ["className", "component", "scope", "textCenter", "tooltip", "onMouseEnter", "children", "isVisible", "dataLabel"]);
    return (react.createElement(Th, Object.assign({}, props, { scope: scope, tooltip: tooltip, onMouseEnter: onMouseEnter, textCenter: textCenter, component: component, className: className }), children));
};
HeaderCell.displayName = 'HeaderCell';

class RowWrapper extends react.Component {
    constructor(props) {
        super(props);
        this.handleScroll = (event) => {
            if (!this._unmounted) {
                this.props.onScroll(event);
            }
        };
        this.handleResize = (event) => {
            if (!this._unmounted) {
                this.props.onResize(event);
            }
        };
        if (props.onScroll) {
            this.handleScroll = debounce(this.handleScroll, 100);
        }
        if (props.onResize) {
            this.handleResize = debounce(this.handleResize, 100);
        }
    }
    componentDidMount() {
        this._unmounted = false;
        if (canUseDOM) {
            if (this.props.onScroll) {
                window.addEventListener('scroll', this.handleScroll);
            }
            if (this.props.onResize) {
                window.addEventListener('resize', this.handleResize);
            }
        }
    }
    componentWillUnmount() {
        this._unmounted = true;
        if (canUseDOM) {
            if (this.props.onScroll) {
                window.removeEventListener('scroll', this.handleScroll);
            }
            if (this.props.onResize) {
                window.removeEventListener('resize', this.handleResize);
            }
        }
    }
    render() {
        const _a = this.props, { 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        onScroll, onResize, row: { isExpanded, isEditable, isHoverable, isRowSelected }, rowProps, 
        /* eslint-enable @typescript-eslint/no-unused-vars */
        trRef, className, ouiaId } = _a, props = __rest(_a, ["onScroll", "onResize", "row", "rowProps", "trRef", "className", "ouiaId"]);
        return (react.createElement(Tr, Object.assign({}, props, { ref: trRef, isExpanded: isExpanded, isEditable: isEditable, className: className, ouiaId: ouiaId, isHoverable: isHoverable, isRowSelected: isRowSelected })));
    }
}
RowWrapper.displayName = 'RowWrapper';
RowWrapper.defaultProps = {
    className: '',
    row: {
        isOpen: undefined,
        isExpanded: undefined,
        isHeightAuto: undefined,
        isEditable: undefined
    },
    rowProps: null
};

const emptyTD = () => ({
    component: 'td'
});
const scopeColTransformer = () => ({
    scope: 'col'
});
const emptyCol = (label) => (Object.assign({}, (label ? {} : { scope: '' })));
const parentId = (_value, { rowData }) => ({
    parentId: rowData.parent
});
const mapProps = (_label, { property, rowData }) => (Object.assign({}, (rowData[property] && rowData[property].props)));

const EditColumn = (_a) => {
    var { onClick = null, 
    /* eslint-disable @typescript-eslint/no-unused-vars */
    className = '', editing, valid, 
    /* eslint-enable @typescript-eslint/no-unused-vars */
    saveAriaLabel, cancelAriaLabel, editAriaLabel } = _a, props = __rest(_a, ["onClick", "className", "editing", "valid", "saveAriaLabel", "cancelAriaLabel", "editAriaLabel"]);
    return (react.createElement(react.Fragment, null,
        react.createElement("div", { className: css(inlineStyles.inlineEditGroup, inlineStyles.modifiers.iconGroup, 'pf-m-action-group') },
            react.createElement("div", { className: css(inlineStyles.inlineEditAction) },
                react.createElement(Button, Object.assign({ "aria-label": saveAriaLabel }, props, { onClick: e => onClick(e, 'save'), variant: "plain" }),
                    react.createElement(CheckIcon, null))),
            react.createElement("div", { className: css(inlineStyles.inlineEditAction) },
                react.createElement(Button, Object.assign({ "aria-label": cancelAriaLabel }, props, { onClick: e => onClick(e, 'cancel'), variant: "plain" }),
                    react.createElement(TimesIcon, null)))),
        react.createElement("div", { className: css(inlineStyles.inlineEditAction, inlineStyles.modifiers.enableEditable) },
            react.createElement(Button, Object.assign({ "aria-label": editAriaLabel }, props, { onClick: e => onClick(e, 'edit'), variant: "plain" }),
                react.createElement(PencilAltIcon, null)))));
};
EditColumn.displayName = 'EditColumn';

const editable = (label, { rowIndex, rowData, column }) => {
    const { extraParams: { onRowEdit } } = column;
    const toggleEditMode = (event, type) => {
        let validationErrors = {};
        if (type === 'save') {
            validationErrors =
                rowData.rowEditValidationRules &&
                    rowData.rowEditValidationRules.reduce((acc, rule) => {
                        const invalidCells = rowData.cells.filter(cellData => {
                            const testValue = cellData.props.editableValue === '' ? '' : cellData.props.editableValue || cellData.props.value;
                            let failedValidation = false;
                            if (Array.isArray(testValue) && testValue.length) {
                                // multiple values, like multiselect
                                failedValidation = testValue.reduce((hasInvalidSelection, el) => {
                                    // if one value fails validation, the entire cell is invalid
                                    if (hasInvalidSelection === true) {
                                        return true;
                                    }
                                    return !rule.validator(el);
                                }, failedValidation);
                            }
                            else if (Array.isArray(testValue) && !testValue.length) {
                                // case where all values were dismissed in multiselect
                                failedValidation = !rule.validator('');
                            }
                            else {
                                // simple text fields
                                failedValidation = !rule.validator(testValue);
                            }
                            if (failedValidation) {
                                cellData.props.isValid = false;
                            }
                            return failedValidation;
                        });
                        if (invalidCells.length) {
                            acc[rule.name] = invalidCells.map(cell => cell.props.name);
                        }
                        return acc;
                    }, {});
        }
        // tslint:disable-next-line:no-unused-expression
        onRowEdit(event, type, rowData && rowData.isEditable, rowIndex, validationErrors);
    };
    /**
     * @param {number} identifier identifier used for the row
     * @param {RowEditType} actionType the type of row edit action
     */
    function getAriaLabelTxt(identifier, actionType) {
        let result;
        switch (actionType) {
            case 'cancel':
                result = `Cancel row edits for row ${identifier}`;
                break;
            case 'save':
                result = `Save row edits for row ${identifier}`;
                break;
            default:
                result = `Place row ${identifier} in edit mode`;
        }
        return result;
    }
    return {
        className: styles$2.tableInlineEditAction,
        component: 'td',
        isVisible: true,
        children: (react.createElement(EditColumn, { saveAriaLabel: (rowData && rowData.rowSaveBtnAriaLabel && rowData.rowSaveBtnAriaLabel(rowIndex)) ||
                getAriaLabelTxt(rowIndex, 'save'), cancelAriaLabel: (rowData && rowData.rowCancelBtnAriaLabel && rowData.rowCancelBtnAriaLabel(rowIndex)) ||
                getAriaLabelTxt(rowIndex, 'cancel'), editAriaLabel: (rowData && rowData.rowEditBtnAriaLabel && rowData.rowEditBtnAriaLabel(rowIndex)) ||
                getAriaLabelTxt(rowIndex, 'edit'), valid: rowData && rowData.isValid, editing: rowData && rowData.isEditable, onClick: toggleEditMode }))
    };
};

const wrappable = () => ({
    className: styles$2.modifiers.wrap
});

const defaultTitle = (data) => data && data.hasOwnProperty('title') ? data.title : data;

/**
 * Generate header with transforms and formatters from custom header object.
 *
 * @param {*} header with transforms, formatters, columnTransforms, and rest of header object.
 * @param {*} title to be used as label in header config.
 * @returns {*} header, label, transforms: Array, formatters: Array.
 */
const generateHeader = ({ transforms: origTransforms, formatters: origFormatters, columnTransforms, header }, title) => (Object.assign(Object.assign({}, header), { label: title, transforms: [
        scopeColTransformer,
        emptyCol,
        ...(origTransforms || []),
        ...(columnTransforms || []),
        ...(header && header.hasOwnProperty('transforms') ? header.transforms : [])
    ], formatters: [...(origFormatters || []), ...(header && header.hasOwnProperty('formatters') ? header.formatters : [])] }));
/**
 * Function to generate cell for header config to change look of each cell.
 *
 * @param {*} customCell config with cellFormatters, cellTransforms, columnTransforms and rest of cell config.
 * @param {*} extra - extra
 * @returns {*} cell, transforms: Array, formatters: Array.
 */
const generateCell = ({ cellFormatters, cellTransforms, columnTransforms, cell }, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
extra) => (Object.assign(Object.assign({}, cell), { transforms: [
        ...(cellTransforms || []),
        ...(columnTransforms || []),
        ...(cell && cell.hasOwnProperty('transforms') ? cell.transforms : []),
        mapProps // This transform should be applied last so that props that are manually defined at the cell level will override all other transforms.
    ], formatters: [
        defaultTitle,
        ...(cellFormatters || []),
        ...(cell && cell.hasOwnProperty('formatters') ? cell.formatters : [])
    ] }));
/**
 * Function to map custom simple object properties to expected format with property, header, cell, extra params
 * and props.
 *
 * @param {*} column to be shown in header - either string or object with title, transformers and formatters (for cells as well).
 * @param {*} extra additional object with callbacks for specific formatters.
 * @param {*} key cell key to be shown in data-key.
 * @param {*} props additional props for each cell.
 * @returns {*} object with property, extraParams, header, cell and props.
 */
const mapHeader = (column, extra, key, ...props) => {
    const title = (column.hasOwnProperty('title') ? column.title : column);
    let dataLabel = `column-${key}`;
    if (column.hasOwnProperty('dataLabel')) {
        dataLabel = column.dataLabel;
    }
    else if (typeof title === 'string') {
        dataLabel = title;
    }
    return {
        property: (typeof title === 'string' &&
            title
                .toLowerCase()
                .trim()
                .replace(/\s/g, '-')) ||
            `column-${key}`,
        extraParams: extra,
        data: column.data,
        header: generateHeader(column, title),
        cell: generateCell(column),
        props: Object.assign(Object.assign({ 'data-label': dataLabel, 'data-key': key }, (column.hasOwnProperty('props') ? column.props : {})), props)
    };
};
/**
 * Function to define select cell in first column.
 *
 * @param {*} extraObject with onSelect callback.
 * @returns {*} object with empty title, tranforms - Array, cellTransforms - Array.
 */
const selectableTransforms = ({ onSelect, canSelectAll }) => [
    ...(onSelect
        ? [
            {
                title: '',
                transforms: (canSelectAll && [selectable]) || null,
                cellTransforms: [selectable]
            }
        ]
        : [])
];
/**
 * Function to define favorites cell in first column (or second column if rows are also selectable).
 *
 * @param {*} extraObject with onFavorite callback.
 * @returns {*} object with empty title, tranforms - Array, cellTransforms - Array.
 */
const favoritesTransforms = ({ onFavorite, onSort, sortBy, canSortFavorites, firstUserColumnIndex }) => [
    ...(onFavorite
        ? [
            {
                title: '',
                transforms: onSort && canSortFavorites
                    ? [
                        sortableFavorites({
                            onSort,
                            // favorites should be just before the first user-defined column
                            columnIndex: firstUserColumnIndex - 1,
                            sortBy
                        })
                    ]
                    : [emptyTD],
                cellTransforms: [favoritable]
            }
        ]
        : [])
];
/**
 * Function to define actions in last column.
 *
 * @param {*} extraObject with actions array.
 * @returns {*} object with empty title, tranforms - Array, cellTransforms - Array.
 */
const actionsTransforms = ({ actions, actionResolver, areActionsDisabled }) => [
    ...(actionResolver || actions
        ? [
            {
                title: '',
                transforms: [emptyTD],
                cellTransforms: [cellActions(actions, actionResolver, areActionsDisabled)]
            }
        ]
        : [])
];
/**
 * Function to define collapsible in first column.
 *
 * @param {*} header info with cellTransforms.
 * @param {*}  extraObject with onCollapse callback.
 * @returns {*} object with empty title, tranforms - Array, cellTransforms - Array.
 */
const collapsibleTransforms = (header, { onCollapse, canCollapseAll, firstUserColumnIndex }) => [
    ...(onCollapse
        ? [
            {
                title: '',
                transforms: (canCollapseAll && [collapsible]) || null,
                cellTransforms: [collapsible, expandedRow(header.length, firstUserColumnIndex)]
            }
        ]
        : [])
];
/**
 * Function to add additional cell transforms to object.
 *
 * @param {*} cell to be expanded.
 * @param {*} additional thing to be added to cellTransforms.
 * @returns {*} object with title from cell and cellTransforms with additional in.
 */
const addAdditionalCellTranforms = (cell, additional) => (Object.assign(Object.assign({}, (cell.hasOwnProperty('title') ? cell : { title: cell })), { cellTransforms: [...(cell.hasOwnProperty('cellTransforms') ? cell.cellTransforms : []), additional] }));
/**
 * Function to change expanded row with additional transforms.
 *
 * @param {*} header info with cellTransforms.
 * @param {*} extra object with onCollapse/onExpand function.
 */
const expandContent = (header, extra) => {
    if (!extra.onCollapse && !extra.onExpand) {
        return header;
    }
    return header.map((cell) => {
        const parentIdCell = addAdditionalCellTranforms(cell, parentId);
        return addAdditionalCellTranforms(parentIdCell, expandedRow(header.length));
    });
};
/**
 * Function to join parent and their children so they can be rendered in tbody.
 *
 * @param {*} rows raw data to find out if it's child or parent.
 * @param {*} children data to render (array of react children).
 */
const mapOpenedRows = (rows, children) => rows.reduce((acc, curr, key) => {
    if (curr.hasOwnProperty('parent')) {
        const parent = acc.length > 0 && acc[acc.length - 1];
        if (parent) {
            acc[acc.length - 1].rows = [...acc[acc.length - 1].rows, children[key]];
            if (curr.hasOwnProperty('compoundParent')) {
                // if this is compound expand, check for any open child cell
                acc[acc.length - 1].isOpen = acc[acc.length - 1].rows.some((oneRow) => oneRow.props.rowData.cells.some((oneCell) => oneCell.props && oneCell.props.isOpen));
            }
        }
    }
    else {
        acc = [...acc, Object.assign(Object.assign({}, curr), { rows: [children[key]] })];
    }
    return acc;
}, []);
const rowEditTransforms = ({ onRowEdit }) => [
    ...(onRowEdit
        ? [
            {
                title: '',
                cellTransforms: [editable]
            }
        ]
        : [])
];
/**
 * Function to calculate columns based on custom config.
 * It adds some custom cells for collapse, select, if expanded row and actions.
 *
 * @param {*} headerRows custom object with described table header cells.
 * @param {*} extra object with custom callbacks.
 * @returns {*} expected object for react tabular table.
 */
const calculateColumns = (headerRows, extra) => headerRows &&
    [
        ...collapsibleTransforms(headerRows, extra),
        ...selectableTransforms(extra),
        ...favoritesTransforms(extra),
        ...expandContent(headerRows, extra),
        ...rowEditTransforms(extra),
        ...actionsTransforms(extra)
    ].map((oneCol, key) => (Object.assign({}, mapHeader(oneCol, extra, key))));

const BodyWrapper = (_a) => {
    var { mappedRows, tbodyRef, 
    /* eslint-disable @typescript-eslint/no-unused-vars */
    rows = [], onCollapse, headerRows } = _a, 
    /* eslint-enable @typescript-eslint/no-unused-vars */
    props = __rest(_a, ["mappedRows", "tbodyRef", "rows", "onCollapse", "headerRows"]);
    if (mappedRows && mappedRows.some(row => row.hasOwnProperty('parent'))) {
        return (react.createElement(react.Fragment, null, mapOpenedRows(mappedRows, props.children).map((oneRow, key) => (react.createElement(Tbody, Object.assign({}, props, { isExpanded: oneRow.isOpen, key: `tbody-${key}`, ref: tbodyRef }), oneRow.rows)))));
    }
    return react.createElement(Tbody, Object.assign({}, props, { ref: tbodyRef }));
};
BodyWrapper.displayName = 'BodyWrapper';

const TableContext = react.createContext({
    headerData: null,
    headerRows: null,
    rows: []
});

const TreeRowWrapper = (_a) => {
    var { className, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rowProps, row } = _a, props = __rest(_a, ["className", "rowProps", "row"]);
    const { 'aria-level': level, 'aria-posinset': posinset, 'aria-setsize': setsize, isExpanded, isDetailsExpanded, isHidden } = row.props;
    return (react.createElement(Tr, Object.assign({ "aria-level": level, "aria-posinset": posinset, "aria-setsize": setsize, "aria-expanded": !!isExpanded, isHidden: isHidden, className: css(className, isExpanded && styles$2.modifiers.expanded, isDetailsExpanded && stylesTreeView.modifiers.treeViewDetailsExpanded) }, props)));
};
TreeRowWrapper.displayName = 'TreeRowWrapper';

class Table extends react.Component {
    constructor() {
        super(...arguments);
        this.state = {
            ouiaStateId: getDefaultOUIAId(Table.displayName)
        };
        this.isSelected = (row) => row.selected === true;
        this.areAllRowsSelected = (rows) => {
            if (rows === undefined || rows.length === 0) {
                return false;
            }
            return rows.every(row => this.isSelected(row) || row.disableSelection || (row.hasOwnProperty('parent') && !row.showSelect));
        };
        this.areAllExpanded = (rows) => {
            if (rows === undefined || rows.length === 0) {
                return false;
            }
            return rows.every(row => row.isOpen === undefined || row.isOpen);
        };
    }
    render() {
        const _a = this.props, { 'aria-label': ariaLabel, caption, header, onSort, onSelect, canSelectAll, canCollapseAll, isHeaderSelectDisabled, selectVariant, collapseAllAriaLabel, sortBy, children, actions, actionResolver, areActionsDisabled, onCollapse, onExpand, onRowEdit, rowLabeledBy, dropdownPosition, dropdownDirection, actionsToggle, contentId, expandId, variant, rows, cells, bodyWrapper, rowWrapper, role, borders, onFavorite, canSortFavorites } = _a, props = __rest(_a, ['aria-label', "caption", "header", "onSort", "onSelect", "canSelectAll", "canCollapseAll", "isHeaderSelectDisabled", "selectVariant", "collapseAllAriaLabel", "sortBy", "children", "actions", "actionResolver", "areActionsDisabled", "onCollapse", "onExpand", "onRowEdit", "rowLabeledBy", "dropdownPosition", "dropdownDirection", "actionsToggle", "contentId", "expandId", "variant", "rows", "cells", "bodyWrapper", "rowWrapper", "role", "borders", "onFavorite", "canSortFavorites"]);
        if (!ariaLabel && !caption && !header && role !== 'presentation') {
            // eslint-disable-next-line no-console
            console.error('Table: Specify at least one of: header, caption, aria-label');
        }
        const headerData = calculateColumns(cells, {
            sortBy,
            onSort,
            onSelect,
            canSelectAll: selectVariant === RowSelectVariant.radio ? false : canSelectAll,
            canCollapseAll,
            isHeaderSelectDisabled,
            selectVariant,
            collapseAllAriaLabel,
            allRowsSelected: onSelect ? this.areAllRowsSelected(rows) : false,
            allRowsExpanded: onCollapse ? this.areAllExpanded(rows) : false,
            actions,
            actionResolver,
            areActionsDisabled,
            onCollapse,
            onRowEdit,
            onExpand,
            rowLabeledBy,
            expandId,
            contentId,
            dropdownPosition,
            dropdownDirection,
            actionsToggle,
            onFavorite,
            canSortFavorites,
            // order of columns: Collapsible | Selectable | Favoritable
            firstUserColumnIndex: [onCollapse, onSelect, onFavorite].filter(callback => callback).length
        });
        const table = (react.createElement(TableContext.Provider, { value: {
                headerData,
                headerRows: null,
                rows
            } },
            header,
            react.createElement(Provider, Object.assign({}, props, { "aria-label": ariaLabel, renderers: {
                    body: {
                        wrapper: bodyWrapper || BodyWrapper,
                        row: rowWrapper || (this.props.isTreeTable ? TreeRowWrapper : RowWrapper),
                        cell: BodyCell
                    },
                    header: {
                        cell: HeaderCell
                    }
                }, columns: headerData, role: role, variant: variant, borders: borders }),
                caption && react.createElement("caption", null, caption),
                children)));
        if (onRowEdit) {
            return react.createElement("form", { className: css(inlineStyles.inlineEdit) }, table);
        }
        return table;
    }
}
Table.displayName = 'Table';
Table.hasWarnBeta = false;
Table.defaultProps = {
    children: null,
    className: '',
    variant: null,
    borders: true,
    rowLabeledBy: 'simple-node',
    expandId: 'expandable-toggle',
    contentId: 'expanded-content',
    dropdownPosition: DropdownPosition.right,
    dropdownDirection: DropdownDirection.down,
    header: undefined,
    caption: undefined,
    'aria-label': undefined,
    gridBreakPoint: TableGridBreakpoint.gridMd,
    role: 'grid',
    canSelectAll: true,
    canCollapseAll: false,
    isHeaderSelectDisabled: false,
    selectVariant: 'checkbox',
    collapseAllAriaLabel: '',
    ouiaSafe: true,
    isStickyHeader: false,
    canSortFavorites: true,
    isTreeTable: false,
    isNested: false
};

const flagVisibility = (rows) => {
    const visibleRows = rows.filter((oneRow) => !oneRow.parent || oneRow.isExpanded);
    if (visibleRows.length > 0) {
        visibleRows[0].isFirstVisible = true;
        visibleRows[visibleRows.length - 1].isLastVisible = true;
    }
};
class ContextBody extends react.Component {
    constructor() {
        super(...arguments);
        this.onRow = (row, rowProps) => {
            const { onRowClick, onRow } = this.props;
            const extendedRowProps = Object.assign(Object.assign({}, rowProps), (onRow ? onRow(row, rowProps) : {}));
            return {
                row,
                rowProps: extendedRowProps,
                onClick: (event) => {
                    const tagName = event.target.tagName;
                    const computedData = {
                        isInput: tagName === 'INPUT',
                        isButton: tagName === 'BUTTON'
                    };
                    onRowClick(event, row, rowProps, computedData);
                },
                onKeyDown: (event) => {
                    const targetElement = event.target;
                    const tagName = targetElement.tagName;
                    const computedData = {
                        isInput: tagName === 'INPUT',
                        isButton: tagName === 'BUTTON'
                    };
                    if (event.key === 'Enter' || event.key === ' ') {
                        onRowClick(event, row, rowProps, computedData);
                        // prevent event default if space is typed while focusing on a hoverable row
                        // so that the page does not scroll when trying to use spacebar to select a row
                        if (event.key === ' ' && !!targetElement.closest('.pf-m-hoverable')) {
                            event.preventDefault();
                        }
                    }
                }
            };
        };
        this.mapCells = (headerData, row, rowKey) => {
            // column indexes start after generated optional columns like collapsible or select column(s)
            const { firstUserColumnIndex } = headerData[0].extraParams;
            const isFullWidth = row && row.fullWidth;
            // typically you'd want to map each cell to its column header, but in the case of fullWidth
            // the first column could be the Select and/or Expandable column
            let additionalColsIndexShift = isFullWidth ? 0 : firstUserColumnIndex;
            return Object.assign({}, (row &&
                (row.cells || row).reduce((acc, cell, cellIndex) => {
                    const isCellObject = cell === Object(cell);
                    const isCellFunction = cell && typeof cell.title === 'function';
                    let formatters = [];
                    if (isCellObject && cell.formatters) {
                        // give priority to formatters specified on the cell object
                        // expandable example:
                        // rows: [{ parent: 0, fullWidth: true, cells: [{ title: 'fullWidth, child - a', formatters: [expandable]}] }]
                        formatters = cell.formatters;
                    }
                    else if (isFullWidth && cellIndex < firstUserColumnIndex) {
                        // for backwards compatibility, map the cells that are not under user columns (like Select/Expandable)
                        // to the first user column's header formatters
                        formatters = headerData[firstUserColumnIndex].cell.formatters;
                    }
                    let mappedCellTitle = cell;
                    if (isCellObject && isCellFunction) {
                        mappedCellTitle = cell.title(cell.props.value, rowKey, cellIndex, cell.props);
                    }
                    else if (isCellObject) {
                        mappedCellTitle = cell.title;
                    }
                    const mappedCell = {
                        [headerData[cellIndex + additionalColsIndexShift].property]: {
                            title: mappedCellTitle,
                            formatters,
                            props: Object.assign({ isVisible: true }, (isCellObject ? cell.props : null))
                        }
                    };
                    // increment the shift index when a cell spans multiple columns
                    if (isCellObject && cell.props && cell.props.colSpan) {
                        additionalColsIndexShift += cell.props.colSpan - 1;
                    }
                    return Object.assign(Object.assign({}, acc), mappedCell);
                }, { secretTableRowKeyId: row.id !== undefined ? row.id : rowKey })));
        };
    }
    render() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _a = this.props, { className, headerData, rows, rowKey, children, onRowClick } = _a, props = __rest(_a, ["className", "headerData", "rows", "rowKey", "children", "onRowClick"]);
        let mappedRows;
        if (headerData.length > 0) {
            mappedRows = rows.map((oneRow, oneRowKey) => (Object.assign(Object.assign(Object.assign({}, oneRow), this.mapCells(headerData, oneRow, oneRowKey)), { isExpanded: isRowExpanded(oneRow, rows), isHeightAuto: oneRow.heightAuto || false, isFirst: oneRowKey === 0, isLast: oneRowKey === rows.length - 1, isFirstVisible: false, isLastVisible: false })));
            flagVisibility(mappedRows);
        }
        return (react.createElement(react.Fragment, null, mappedRows && (react.createElement(Body, Object.assign({}, props, { mappedRows: mappedRows, rows: mappedRows, onRow: this.onRow, rowKey: rowKey, className: className })))));
    }
}
const TableBody = (_a) => {
    var { className = '', children = null, rowKey = 'secretTableRowKeyId', 
    /* eslint-disable @typescript-eslint/no-unused-vars */
    onRow = (...args) => ({}), onRowClick = (event, row, rowProps, computedData) => 
    /* eslint-enable @typescript-eslint/no-unused-vars */
    undefined } = _a, props = __rest(_a, ["className", "children", "rowKey", "onRow", "onRowClick"]);
    return (react.createElement(TableContext.Consumer, null, (_a) => {
        var { headerData = [], rows = [] } = _a, rest = __rest(_a, ["headerData", "rows"]);
        return (react.createElement(ContextBody, Object.assign({ headerData: headerData, rows: rows, onRow: onRow, className: className, rowKey: rowKey, onRowClick: onRowClick }, props, rest), children));
    }));
};

const EditableTextCell = ({ value, rowIndex, cellIndex, props, handleTextInputChange, inputAriaLabel, isDisabled = false }) => (react.createElement(react.Fragment, null,
    react.createElement("div", { className: inlineStyles.inlineEditValue }, value),
    react.createElement("div", { className: inlineStyles.inlineEditInput },
        react.createElement(TextInput, { isDisabled: isDisabled, value: props.editableValue !== undefined ? props.editableValue : value, validated: props.isValid !== false ? 'default' : 'error', type: "text", onChange: (newValue, event) => {
                handleTextInputChange(newValue, event, rowIndex, cellIndex);
            }, "aria-label": inputAriaLabel }),
        react.createElement("div", { className: css(formStyles.formHelperText, formStyles.modifiers.error), "aria-live": "polite" }, props.errorText))));
EditableTextCell.displayName = 'EditableTextCell';

const ContextHeader = (_a) => {
    var { className = '', headerRows = undefined } = _a, props = __rest(_a, ["className", "headerRows"]);
    return react.createElement(Header, Object.assign({}, props, { headerRows: headerRows, className: className }));
};
const TableHeader = (_a) => {
    var props = __rest(_a, []);
    return (react.createElement(TableContext.Consumer, null, ({ headerRows }) => react.createElement(ContextHeader, Object.assign({}, props, { headerRows: headerRows }))));
};
TableHeader.displayName = 'TableHeader';

export { ActionsColumn, EditableTextCell, ExpandableRowContent, Table, TableBody, TableComposable, TableHeader, TableText, TableVariant, Tbody, Td, Th, Thead, Tr, applyCellEdits, cancelCellEdits, cellWidth, expandable, validateCellEdits, wrappable };
