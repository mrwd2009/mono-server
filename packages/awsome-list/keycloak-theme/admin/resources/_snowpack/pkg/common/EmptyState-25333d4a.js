import { a as canUseDOM, c as css, g as getUniqueId } from './util-badff3ce.js';
import { _ as __rest } from './tslib.es6-e6488692.js';
import { r as react } from './index-7cda8b13.js';
import { T as TimesIcon } from './times-icon-8cdcb920.js';
import { r as reactDom } from './index-916de6ed.js';

const KEY_CODES = { ARROW_UP: 38, ARROW_DOWN: 40, ESCAPE_KEY: 27, TAB: 9, ENTER: 13, SPACE: 32 };
const KEYHANDLER_DIRECTION = { UP: 'up', DOWN: 'down', RIGHT: 'right', LEFT: 'left' };
var ValidatedOptions;
(function (ValidatedOptions) {
    ValidatedOptions["success"] = "success";
    ValidatedOptions["error"] = "error";
    ValidatedOptions["warning"] = "warning";
    ValidatedOptions["default"] = "default";
})(ValidatedOptions || (ValidatedOptions = {}));
const KeyTypes = {
    Tab: 'Tab',
    Space: ' ',
    Escape: 'Escape',
    Enter: 'Enter',
    ArrowUp: 'ArrowUp',
    ArrowDown: 'ArrowDown',
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight'
};

/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]:not(slot)', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var NoElement = typeof Element === 'undefined';
var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
  return element.getRootNode();
} : function (element) {
  return element.ownerDocument;
};
/**
 * @param {Element} el container to check in
 * @param {boolean} includeContainer add container to check
 * @param {(node: Element) => boolean} filter filter candidates
 * @returns {Element[]}
 */

var getCandidates = function getCandidates(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));

  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }

  candidates = candidates.filter(filter);
  return candidates;
};
/**
 * @callback GetShadowRoot
 * @param {Element} element to check for shadow root
 * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
 */

/**
 * @callback ShadowRootFilter
 * @param {Element} shadowHostNode the element which contains shadow content
 * @returns {boolean} true if a shadow root could potentially contain valid candidates.
 */

/**
 * @typedef {Object} CandidatesScope
 * @property {Element} scope contains inner candidates
 * @property {Element[]} candidates
 */

/**
 * @typedef {Object} IterativeOptions
 * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
 *  if a function, implies shadow support is enabled and either returns the shadow root of an element
 *  or a boolean stating if it has an undisclosed shadow root
 * @property {(node: Element) => boolean} filter filter candidates
 * @property {boolean} flatten if true then result will flatten any CandidatesScope into the returned list
 * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
 */

/**
 * @param {Element[]} elements list of element containers to match candidates from
 * @param {boolean} includeContainer add container list to check
 * @param {IterativeOptions} options
 * @returns {Array.<Element|CandidatesScope>}
 */


var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);

  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();

    if (element.tagName === 'SLOT') {
      // add shadow dom slot scope (slot itself cannot be focusable)
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively(content, true, options);

      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scope: element,
          candidates: nestedCandidates
        });
      }
    } else {
      // check candidate element
      var validCandidate = matches.call(element, candidateSelector);

      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      } // iterate over shadow content if possible


      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);
      var validShadowRoot = !options.shadowRootFilter || options.shadowRootFilter(element);

      if (shadowRoot && validShadowRoot) {
        // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
        //  shadow exists, so look at light dom children as fallback BUT create a scope for any
        //  child candidates found because they're likely slotted elements (elements that are
        //  children of the web component element (which has the shadow), in the light dom, but
        //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
        //  _after_ we return from this recursive call
        var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);

        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scope: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        // there's not shadow so just dig into the element's (light dom) children
        //  __without__ giving the element special scope treatment
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }

  return candidates;
};

var getTabindex = function getTabindex(node, isScope) {
  if (node.tabIndex < 0) {
    // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
    // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
    // yet they are still part of the regular tab order; in FF, they get a default
    // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
    // order, consider their tab index to be 0.
    // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
    // so if they don't have a tabindex attribute specifically set, assume it's 0.
    //
    // isScope is positive for custom element with shadow root or slot that by default
    // have tabIndex -1, but need to be sorted by document order in order for their
    // content to be inserted in the correct position
    if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute('tabindex'), 10))) {
      return 0;
    }
  }

  return node.tabIndex;
};

var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};

var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};

var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};

var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};

var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};

var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }

  var radioScope = node.form || getRootNode(node);

  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };

  var radioSet;

  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }

  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};

var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};

var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};

var isZeroArea = function isZeroArea(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
      width = _node$getBoundingClie.width,
      height = _node$getBoundingClie.height;

  return width === 0 && height === 0;
};

var isHidden = function isHidden(node, _ref) {
  var displayCheck = _ref.displayCheck,
      getShadowRoot = _ref.getShadowRoot;

  // NOTE: visibility will be `undefined` if node is detached from the document
  //  (see notes about this further down), which means we will consider it visible
  //  (this is legacy behavior from a very long way back)
  // NOTE: we check this regardless of `displayCheck="none"` because this is a
  //  _visibility_ check, not a _display_ check
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }

  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;

  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  } // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
  //  (but NOT _the_ document; see second 'If' comment below for more).
  // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
  //  is attached, and the one we need to check if it's in the document or not (because the
  //  shadow, and all nodes it contains, is never considered in the document since shadows
  //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
  //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
  //  visibility, including all the nodes it contains). The host could be any normal node,
  //  or a custom element (i.e. web component). Either way, that's the one that is considered
  //  part of the document, not the shadow root, nor any of its children (i.e. the node being
  //  tested).
  // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
  //  document (per the docs) and while it's a Document-type object, that document does not
  //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
  //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
  //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
  //  node is actually detached.


  var nodeRootHost = getRootNode(node).host;
  var nodeIsAttached = (nodeRootHost === null || nodeRootHost === void 0 ? void 0 : nodeRootHost.ownerDocument.contains(nodeRootHost)) || node.ownerDocument.contains(node);

  if (!displayCheck || displayCheck === 'full') {
    if (typeof getShadowRoot === 'function') {
      // figure out if we should consider the node to be in an undisclosed shadow and use the
      //  'non-zero-area' fallback
      var originalNode = node;

      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);

        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
        ) {
          // node has an undisclosed shadow which means we can only treat it as a black box, so we
          //  fall back to a non-zero-area test
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          // iterate up slot
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          // cross shadow boundary
          node = rootNode.host;
        } else {
          // iterate up normal dom
          node = parentElement;
        }
      }

      node = originalNode;
    } // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
    //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
    //  it might be a falsy value, which means shadow DOM support is disabled
    // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
    //  now we can just test to see if it would normally be visible or not, provided it's
    //  attached to the main document.
    // NOTE: We must consider case where node is inside a shadow DOM and given directly to
    //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.


    if (nodeIsAttached) {
      // this works wherever the node is: if there's at least one client rect, it's
      //  somehow displayed; it also covers the CSS 'display: contents' case where the
      //  node itself is hidden in place of its contents; and there's no need to search
      //  up the hierarchy either
      return !node.getClientRects().length;
    } // Else, the node isn't attached to the document, which means the `getClientRects()`
    //  API will __always__ return zero rects (this can happen, for example, if React
    //  is used to render nodes onto a detached tree, as confirmed in this thread:
    //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
    //
    // It also means that even window.getComputedStyle(node).display will return `undefined`
    //  because styles are only computed for nodes that are in the document.
    //
    // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
    //  somehow. Though it was never stated officially, anyone who has ever used tabbable
    //  APIs on nodes in detached containers has actually implicitly used tabbable in what
    //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
    //  considering __everything__ to be visible because of the innability to determine styles.

  } else if (displayCheck === 'non-zero-area') {
    // NOTE: Even though this tests that the node's client rect is non-zero to determine
    //  whether it's displayed, and that a detached node will __always__ have a zero-area
    //  client rect, we don't special-case for whether the node is attached or not. In
    //  this mode, we do want to consider nodes that have a zero area to be hidden at all
    //  times, and that includes attached or not.
    return isZeroArea(node);
  } // visible, as far as we can tell, or per current `displayCheck` mode


  return false;
}; // form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset


var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement; // check if `node` is contained in a disabled <fieldset>

    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        // look for the first <legend> among the children of the disabled <fieldset>
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i); // when the first <legend> (in document order) is found

          if (child.tagName === 'LEGEND') {
            // if its parent <fieldset> is not nested in another disabled <fieldset>,
            // return whether `node` is a descendant of its first <legend>
            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
          }
        } // the disabled <fieldset> containing `node` has no <legend>


        return true;
      }

      parentNode = parentNode.parentElement;
    }
  } // else, node's tabbable/focusable state should not be affected by a fieldset's
  //  enabled/disabled state


  return false;
};

var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }

  return true;
};

var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }

  return true;
};

var isValidShadowRootTabbable = function isValidShadowRootTabbable(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);

  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  } // If a custom element has an explicit negative tabindex,
  // browsers will not allow tab targeting said element's children.


  return false;
};
/**
 * @param {Array.<Element|CandidatesScope>} candidates
 * @returns Element[]
 */


var sortByOrder = function sortByOrder(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function (item, i) {
    var isScope = !!item.scope;
    var element = isScope ? item.scope : item;
    var candidateTabindex = getTabindex(element, isScope);
    var elements = isScope ? sortByOrder(item.candidates) : element;

    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item: item,
        isScope: isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function (acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};

var tabbable = function tabbable(el, options) {
  options = options || {};
  var candidates;

  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }

  return sortByOrder(candidates);
};

var focusable = function focusable(el, options) {
  options = options || {};
  var candidates;

  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }

  return candidates;
};

var isTabbable = function isTabbable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, candidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorTabbable(options, node);
};

var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');

var isFocusable = function isFocusable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorFocusable(options, node);
};

/*!
* focus-trap 6.9.2
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var activeFocusTraps = function () {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];

        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();

var isSelectableInput = function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};

var isEscapeEvent = function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
};

var isTabEvent = function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
};

var delay = function delay(fn) {
  return setTimeout(fn, 0);
}; // Array.find/findIndex() are not supported on IE; this replicates enough
//  of Array.findIndex() for our needs


var findIndex = function findIndex(arr, fn) {
  var idx = -1;
  arr.every(function (value, i) {
    if (fn(value)) {
      idx = i;
      return false; // break
    }

    return true; // next
  });
  return idx;
};
/**
 * Get an option's value when it could be a plain value, or a handler that provides
 *  the value.
 * @param {*} value Option's value to check.
 * @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
 * @returns {*} The `value`, or the handler's returned value.
 */


var valueOrHandler = function valueOrHandler(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return typeof value === 'function' ? value.apply(void 0, params) : value;
};

var getActualTarget = function getActualTarget(event) {
  // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
  //  shadow host. However, event.target.composedPath() will be an array of
  //  nodes "clicked" from inner-most (the actual element inside the shadow) to
  //  outer-most (the host HTML document). If we have access to composedPath(),
  //  then use its first element; otherwise, fall back to event.target (and
  //  this only works for an _open_ shadow DOM; otherwise,
  //  composedPath()[0] === event.target always).
  return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
};

var createFocusTrap = function createFocusTrap(elements, userOptions) {
  // SSR: a live trap shouldn't be created in this type of environment so this
  //  should be safe code to execute if the `document` option isn't specified
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;

  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);

  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   firstTabbableNode: HTMLElement|null,
    //   lastTabbableNode: HTMLElement|null,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: undefined
  };
  var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

  /**
   * Gets a configuration option value.
   * @param {Object|undefined} configOverrideOptions If true, and option is defined in this set,
   *  value will be taken from this object. Otherwise, value will be taken from base configuration.
   * @param {string} optionName Name of the option whose value is sought.
   * @param {string|undefined} [configOptionName] Name of option to use __instead of__ `optionName`
   *  IIF `configOverrideOptions` is not defined. Otherwise, `optionName` is used.
   */

  var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  /**
   * Finds the index of the container that contains the element.
   * @param {HTMLElement} element
   * @returns {number} Index of the container in either `state.containers` or
   *  `state.containerGroups` (the order/length of these lists are the same); -1
   *  if the element isn't found.
   */


  var findContainerIndex = function findContainerIndex(element) {
    // NOTE: search `containerGroups` because it's possible a group contains no tabbable
    //  nodes, but still contains focusable nodes (e.g. if they all have `tabindex=-1`)
    //  and we still need to find the element in there
    return state.containerGroups.findIndex(function (_ref) {
      var container = _ref.container,
          tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      tabbableNodes.find(function (node) {
        return node === element;
      });
    });
  };
  /**
   * Gets the node for the given option, which is expected to be an option that
   *  can be either a DOM node, a string that is a selector to get a node, `false`
   *  (if a node is explicitly NOT given), or a function that returns any of these
   *  values.
   * @param {string} optionName
   * @returns {undefined | false | HTMLElement | SVGElement} Returns
   *  `undefined` if the option is not specified; `false` if the option
   *  resolved to `false` (node explicitly not given); otherwise, the resolved
   *  DOM node.
   * @throws {Error} If the option is set, not `false`, and is not, or does not
   *  resolve to a node.
   */


  var getNodeForOption = function getNodeForOption(optionName) {
    var optionValue = config[optionName];

    if (typeof optionValue === 'function') {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      optionValue = optionValue.apply(void 0, params);
    }

    if (optionValue === true) {
      optionValue = undefined; // use default value
    }

    if (!optionValue) {
      if (optionValue === undefined || optionValue === false) {
        return optionValue;
      } // else, empty string (invalid), null (invalid), 0 (invalid)


      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }

    var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue); // resolve to node, or null if fails

      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }

    return node;
  };

  var getInitialFocusNode = function getInitialFocusNode() {
    var node = getNodeForOption('initialFocus'); // false explicitly indicates we want no initialFocus at all

    if (node === false) {
      return false;
    }

    if (node === undefined) {
      // option not specified: use fallback options
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode; // NOTE: `fallbackFocus` option function cannot return `false` (not supported)

        node = firstTabbableNode || getNodeForOption('fallbackFocus');
      }
    }

    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }

    return node;
  };

  var updateTabbableNodes = function updateTabbableNodes() {
    state.containerGroups = state.containers.map(function (container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions); // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
      //  are a superset of tabbable nodes

      var focusableNodes = focusable(container, config.tabbableOptions);
      return {
        container: container,
        tabbableNodes: tabbableNodes,
        focusableNodes: focusableNodes,
        firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : null,
        lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : null,

        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          // NOTE: If tabindex is positive (in order to manipulate the tab order separate
          //  from the DOM order), this __will not work__ because the list of focusableNodes,
          //  while it contains tabbable nodes, does not sort its nodes in any order other
          //  than DOM order, because it can't: Where would you place focusable (but not
          //  tabbable) nodes in that order? They have no order, because they aren't tabbale...
          // Support for positive tabindex is already broken and hard to manage (possibly
          //  not supportable, TBD), so this isn't going to make things worse than they
          //  already are, and at least makes things better for the majority of cases where
          //  tabindex is either 0/unset or negative.
          // FYI, positive tabindex issue: https://github.com/focus-trap/focus-trap/issues/375
          var nodeIdx = focusableNodes.findIndex(function (n) {
            return n === node;
          });

          if (nodeIdx < 0) {
            return undefined;
          }

          if (forward) {
            return focusableNodes.slice(nodeIdx + 1).find(function (n) {
              return isTabbable(n, config.tabbableOptions);
            });
          }

          return focusableNodes.slice(0, nodeIdx).reverse().find(function (n) {
            return isTabbable(n, config.tabbableOptions);
          });
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function (group) {
      return group.tabbableNodes.length > 0;
    }); // throw if no groups have tabbable nodes and we don't have a fallback focus node either

    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
    ) {
      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
    }
  };

  var tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }

    if (node === doc.activeElement) {
      return;
    }

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  };

  var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus', previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  }; // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  var checkPointerDown = function checkPointerDown(e) {
    var target = getActualTarget(e);

    if (findContainerIndex(target) >= 0) {
      // allow the click since it ocurred inside the trap
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      // immediately deactivate the trap
      trap.deactivate({
        // if, on deactivation, we should return focus to the node originally-focused
        //  when the trap was activated (or the configured `setReturnFocus` node),
        //  then assume it's also OK to return focus to the outside node that was
        //  just clicked, causing deactivation, as long as that node is focusable;
        //  if it isn't focusable, then return focus to the original node focused
        //  on activation (or the configured `setReturnFocus` node)
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked, whether it's focusable or not; by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node)
        returnFocus: config.returnFocusOnDeactivate && !isFocusable(target, config.tabbableOptions)
      });
      return;
    } // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)


    if (valueOrHandler(config.allowOutsideClick, e)) {
      // allow the click outside the trap to take place
      return;
    } // otherwise, prevent the click


    e.preventDefault();
  }; // In case focus escapes the trap for some strange reason, pull it back in.


  var checkFocusIn = function checkFocusIn(e) {
    var target = getActualTarget(e);
    var targetContained = findContainerIndex(target) >= 0; // In Firefox when you Tab out of an iframe the Document is briefly focused.

    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      // escaped! pull it back in to where it just left
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  }; // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  var checkTab = function checkTab(e) {
    var target = getActualTarget(e);
    updateTabbableNodes();
    var destinationNode = null;

    if (state.tabbableGroups.length > 0) {
      // make sure the target is actually contained in a group
      // NOTE: the target may also be the container itself if it's focusable
      //  with tabIndex='-1' and was given initial focus
      var containerIndex = findContainerIndex(target);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : undefined;

      if (containerIndex < 0) {
        // target not found in any group: quite possible focus has escaped the trap,
        //  so bring it back in to...
        if (e.shiftKey) {
          // ...the last node in the last group
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          // ...the first node in the first group
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        // REVERSE
        // is the target the first tabbable node in a group?
        var startOfGroupIndex = findIndex(state.tabbableGroups, function (_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return target === firstTabbableNode;
        });

        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          // an exception case where the target is either the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle shift+tab as if focus were on the container's
          //  first tabbable node, and go to the last tabbable node of the LAST group
          startOfGroupIndex = containerIndex;
        }

        if (startOfGroupIndex >= 0) {
          // YES: then shift+tab should go to the last tabbable node in the
          //  previous group (and wrap around to the last tabbable node of
          //  the LAST group if it's the first tabbable node of the FIRST group)
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        // FORWARD
        // is the target the last tabbable node in a group?
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function (_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return target === lastTabbableNode;
        });

        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          // an exception case where the target is the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle tab as if focus were on the container's
          //  last tabbable node, and go to the first tabbable node of the FIRST group
          lastOfGroupIndex = containerIndex;
        }

        if (lastOfGroupIndex >= 0) {
          // YES: then tab should go to the first tabbable node in the next
          //  group (and wrap around to the first tabbable node of the FIRST
          //  group if it's the last tabbable node of the LAST group)
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;

          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      // NOTE: the fallbackFocus option does not support returning false to opt-out
      destinationNode = getNodeForOption('fallbackFocus');
    }

    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    } // else, let the browser take care of [shift+]tab and move the focus

  };

  var checkKey = function checkKey(e) {
    if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates, e) !== false) {
      e.preventDefault();
      trap.deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };

  var checkClick = function checkClick(e) {
    var target = getActualTarget(e);

    if (findContainerIndex(target) >= 0) {
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }

    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }; //
  // EVENT LISTENERS
  //


  var addListeners = function addListeners() {
    if (!state.active) {
      return;
    } // There can be only one listening focus trap at a time


    activeFocusTraps.activateTrap(trap); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function () {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };

  var removeListeners = function removeListeners() {
    if (!state.active) {
      return;
    }

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  }; //
  // TRAP DEFINITION
  //


  trap = {
    get active() {
      return state.active;
    },

    get paused() {
      return state.paused;
    },

    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }

      var onActivate = getOption(activateOptions, 'onActivate');
      var onPostActivate = getOption(activateOptions, 'onPostActivate');
      var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');

      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }

      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;

      if (onActivate) {
        onActivate();
      }

      var finishActivation = function finishActivation() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }

        addListeners();

        if (onPostActivate) {
          onPostActivate();
        }
      };

      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }

      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }

      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);

      clearTimeout(state.delayInitialFocusTimer); // noop if undefined

      state.delayInitialFocusTimer = undefined;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(options, 'onDeactivate');
      var onPostDeactivate = getOption(options, 'onPostDeactivate');
      var checkCanReturnFocus = getOption(options, 'checkCanReturnFocus');
      var returnFocus = getOption(options, 'returnFocus', 'returnFocusOnDeactivate');

      if (onDeactivate) {
        onDeactivate();
      }

      var finishDeactivation = function finishDeactivation() {
        delay(function () {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }

          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };

      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }

      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }

      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }

      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function (element) {
        return typeof element === 'string' ? doc.querySelector(element) : element;
      });

      if (state.active) {
        updateTabbableNodes();
      }

      return this;
    }
  }; // initialize container elements

  trap.updateContainerElements(elements);
  return trap;
};

class FocusTrap extends react.Component {
    constructor(props) {
        super(props);
        this.divRef = react.createRef();
        if (typeof document !== 'undefined') {
            this.previouslyFocusedElement = document.activeElement;
        }
    }
    componentDidMount() {
        // We need to hijack the returnFocusOnDeactivate option,
        // because React can move focus into the element before we arrived at
        // this lifecycle hook (e.g. with autoFocus inputs). So the component
        // captures the previouslyFocusedElement in componentWillMount,
        // then (optionally) returns focus to it in componentWillUnmount.
        this.focusTrap = createFocusTrap(this.divRef.current, Object.assign(Object.assign({}, this.props.focusTrapOptions), { returnFocusOnDeactivate: false }));
        if (this.props.active) {
            this.focusTrap.activate();
        }
        if (this.props.paused) {
            this.focusTrap.pause();
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.active && !this.props.active) {
            this.focusTrap.deactivate();
        }
        else if (!prevProps.active && this.props.active) {
            this.focusTrap.activate();
        }
        if (prevProps.paused && !this.props.paused) {
            this.focusTrap.unpause();
        }
        else if (!prevProps.paused && this.props.paused) {
            this.focusTrap.pause();
        }
    }
    componentWillUnmount() {
        this.focusTrap.deactivate();
        if (this.props.focusTrapOptions.returnFocusOnDeactivate !== false &&
            this.previouslyFocusedElement &&
            this.previouslyFocusedElement.focus) {
            this.previouslyFocusedElement.focus({ preventScroll: this.props.preventScrollOnDeactivate });
        }
    }
    render() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _a = this.props, { children, className, focusTrapOptions, active, paused, preventScrollOnDeactivate } = _a, rest = __rest(_a, ["children", "className", "focusTrapOptions", "active", "paused", "preventScrollOnDeactivate"]);
        return (react.createElement("div", Object.assign({ ref: this.divRef, className: className }, rest), children));
    }
}
FocusTrap.displayName = 'FocusTrap';
FocusTrap.defaultProps = {
    active: true,
    paused: false,
    focusTrapOptions: {},
    preventScrollOnDeactivate: false
};

let uid = 0;
const ouiaPrefix = 'OUIA-Generated-';
const ouiaIdByRoute = {};
/** Get props to conform to OUIA spec
 *
 * For functional components, use the useOUIAProps function instead
 *
 * In class based components, create a state variable ouiaStateId to create a static generated ID:
 * state = {
 *  ouiaStateId: getDefaultOUIAId(Chip.displayName)
 * }
 * This generated ID should remain alive as long as the component is not unmounted.
 *
 * Then add the attributes to the component
 * {...getOUIAProps('OverflowChip', this.props.ouiaId !== undefined ? this.props.ouiaId : this.state.ouiaStateId)}
 *
 * @param {string} componentType OUIA component type
 * @param {number|string} id OUIA component id
 * @param {boolean} ouiaSafe false if in animation
 */
function getOUIAProps(componentType, id, ouiaSafe = true) {
    return {
        'data-ouia-component-type': `PF4/${componentType}`,
        'data-ouia-safe': ouiaSafe,
        'data-ouia-component-id': id
    };
}
/**
 * Hooks version of the getOUIAProps function that also memoizes the generated ID
 * Can only be used in functional components
 *
 * @param {string} componentType OUIA component type
 * @param {number|string} id OUIA component id
 * @param {boolean} ouiaSafe false if in animation
 * @param {string} variant Optional variant to add to the generated ID
 */
const useOUIAProps = (componentType, id, ouiaSafe = true, variant) => ({
    'data-ouia-component-type': `PF4/${componentType}`,
    'data-ouia-safe': ouiaSafe,
    'data-ouia-component-id': useOUIAId(componentType, id, variant)
});
/**
 * Returns the ID or the memoized generated ID
 *
 * @param {string} componentType OUIA component type
 * @param {number|string} id OUIA component id
 * @param {string} variant Optional variant to add to the generated ID
 */
const useOUIAId = (componentType, id, variant) => {
    if (id !== undefined) {
        return id;
    }
    return react.useMemo(() => getDefaultOUIAId(componentType, variant), [componentType, variant]);
};
/**
 * Returns a generated id based on the URL location
 *
 * @param {string} componentType OUIA component type
 * @param {string} variant Optional variant to add to the generated ID
 */
function getDefaultOUIAId(componentType, variant) {
    /*
    ouiaIdByRoute = {
      [route+componentType]: [number]
    }
    */
    try {
        let key;
        if (typeof window !== 'undefined') {
            // browser environments
            key = `${window.location.href}-${componentType}-${variant || ''}`;
        }
        else {
            // node/SSR environments
            key = `${componentType}-${variant || ''}`;
        }
        if (!ouiaIdByRoute[key]) {
            ouiaIdByRoute[key] = 0;
        }
        return `${ouiaPrefix}${componentType}-${variant ? `${variant}-` : ''}${++ouiaIdByRoute[key]}`;
    }
    catch (exception) {
        return `${ouiaPrefix}${componentType}-${variant ? `${variant}-` : ''}${++uid}`;
    }
}

/**
 * This component wraps any ReactNode and finds its ref
 * It has to be a class for findDOMNode to work
 * Ideally, all components used as triggers/toggles are either:
 * - class based components we can assign our own ref to
 * - functional components that have forwardRef implemented
 * However, there is no guarantee that is what will get passed in as trigger/toggle in the case of tooltips and popovers
 */
class FindRefWrapper extends react.Component {
    componentDidMount() {
        // eslint-disable-next-line react/no-find-dom-node
        const root = reactDom.findDOMNode(this);
        this.props.onFoundRef(root);
    }
    render() {
        return this.props.children || null;
    }
}
FindRefWrapper.displayName = 'FindRefWrapper';

/**
 * @param element
 */
function getBoundingClientRect(element) {
    const rect = element.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        x: rect.left,
        y: rect.top
    };
}

// @ts-nocheck
/* :: import type { Window } from '../types'; */
/* :: declare function getWindow(node: Node | Window): Window; */
/**
 * @param node
 */
function getWindow(node) {
    if (node.toString() !== '[object Window]') {
        const ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView : window;
    }
    return node;
}

// @ts-nocheck
/**
 * @param node
 */
function getWindowScroll(node) {
    const win = getWindow(node);
    const scrollLeft = win.pageXOffset;
    const scrollTop = win.pageYOffset;
    return {
        scrollLeft,
        scrollTop
    };
}

// @ts-nocheck
/* :: declare function isElement(node: mixed): boolean %checks(node instanceof
  Element); */
/**
 * @param node
 */
function isElement(node) {
    const OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
}
/* :: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
  HTMLElement); */
/**
 * @param node
 */
function isHTMLElement(node) {
    const OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
}

// @ts-nocheck
/**
 * @param element
 */
function getHTMLElementScroll(element) {
    return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
    };
}

// @ts-nocheck
/**
 * @param node
 */
function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
    }
    else {
        return getHTMLElementScroll(node);
    }
}

/**
 * @param element
 */
function getNodeName(element) {
    return element ? (element.nodeName || '').toLowerCase() : null;
}

// @ts-nocheck
/**
 * @param element
 */
function getDocumentElement(element) {
    // $FlowFixMe: assume body is always available
    return (isElement(element) ? element.ownerDocument : element.document).documentElement;
}

// @ts-nocheck
/**
 * @param element
 */
function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    // Popper 1 is broken in this case and never had a bug report so let's assume
    // it's not an issue. I don't think anyone ever specifies width on <html>
    // anyway.
    // Browsers where the left scrollbar doesn't cause an issue report `0` for
    // this (e.g. Edge 2019, IE11, Safari)
    return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// @ts-nocheck
/**
 * @param element
 */
function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
}

// @ts-nocheck
/**
 * @param element
 */
function isScrollParent(element) {
    // Firefox wants us to check `-x` and `-y` variations as well
    const { overflow, overflowX, overflowY } = getComputedStyle$1(element);
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.
/**
 * @param elementOrVirtualElement
 * @param offsetParent
 * @param isFixed
 */
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed = false) {
    const documentElement = getDocumentElement(offsetParent);
    const rect = getBoundingClientRect(elementOrVirtualElement);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    let scroll = { scrollLeft: 0, scrollTop: 0 };
    let offsets = { x: 0, y: 0 };
    if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
        if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
            isScrollParent(documentElement)) {
            scroll = getNodeScroll(offsetParent);
        }
        if (isHTMLElement(offsetParent)) {
            offsets = getBoundingClientRect(offsetParent);
            offsets.x += offsetParent.clientLeft;
            offsets.y += offsetParent.clientTop;
        }
        else if (documentElement) {
            offsets.x = getWindowScrollBarX(documentElement);
        }
    }
    return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
    };
}

// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.
/**
 * @param element
 */
function getLayoutRect(element) {
    return {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight
    };
}

// @ts-nocheck
/**
 * @param element
 */
function getParentNode(element) {
    if (getNodeName(element) === 'html') {
        return element;
    }
    return (
    // $FlowFixMe: this is a quicker (but less type safe) way to save quite some bytes from the bundle
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || // DOM Element detected
        // $FlowFixMe: need a better way to handle this...
        element.host || // ShadowRoot detected
        // $FlowFixMe: HTMLElement is a Node
        getDocumentElement(element) // fallback
    );
}

// @ts-nocheck
/**
 * @param node
 */
function getScrollParent(node) {
    if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
        // $FlowFixMe: assume body is always available
        return node.ownerDocument.body;
    }
    if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
    }
    return getScrollParent(getParentNode(node));
}

// @ts-nocheck
/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/
/**
 * @param element
 * @param list
 */
function listScrollParents(element, list = []) {
    const scrollParent = getScrollParent(element);
    const isBody = getNodeName(scrollParent) === 'body';
    const win = getWindow(scrollParent);
    const target = isBody
        ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : [])
        : scrollParent;
    const updatedList = list.concat(target);
    return isBody
        ? updatedList // $FlowFixMe: isBody tells us target will be an HTMLElement here
        : updatedList.concat(listScrollParents(getParentNode(target)));
}

// @ts-nocheck
/**
 * @param element
 */
function isTableElement(element) {
    return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

// @ts-nocheck
/**
 * @param element
 */
function getTrueOffsetParent(element) {
    if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
        getComputedStyle$1(element).position === 'fixed') {
        return null;
    }
    const offsetParent = element.offsetParent;
    if (offsetParent) {
        const html = getDocumentElement(offsetParent);
        if (getNodeName(offsetParent) === 'body' &&
            getComputedStyle$1(offsetParent).position === 'static' &&
            getComputedStyle$1(html).position !== 'static') {
            return html;
        }
    }
    return offsetParent;
}
// `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block
/**
 * @param element
 */
function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
        const css = getComputedStyle$1(currentNode);
        // This is non-exhaustive but covers the most common CSS properties that
        // create a containing block.
        if (css.transform !== 'none' || css.perspective !== 'none' || (css.willChange && css.willChange !== 'auto')) {
            return currentNode;
        }
        else {
            currentNode = currentNode.parentNode;
        }
    }
    return null;
}
// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
/**
 * @param element
 */
function getOffsetParent(element) {
    const window = getWindow(element);
    let offsetParent = getTrueOffsetParent(element);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
        offsetParent = getTrueOffsetParent(offsetParent);
    }
    if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static') {
        return window;
    }
    return offsetParent || getContainingBlock(element) || window;
}

// @ts-nocheck
const top = 'top';
const bottom = 'bottom';
const right = 'right';
const left = 'left';
const auto = 'auto';
const basePlacements = [top, bottom, right, left];
const start = 'start';
const end = 'end';
const clippingParents = 'clippingParents';
const viewport = 'viewport';
const popper = 'popper';
const reference = 'reference';
const variationPlacements = basePlacements.reduce((acc, placement) => acc.concat([`${placement}-${start}`, `${placement}-${end}`]), []);
const placements = [...basePlacements, auto].reduce((acc, placement) => acc.concat([placement, `${placement}-${start}`, `${placement}-${end}`]), []);
// modifiers that need to read the DOM
const beforeRead = 'beforeRead';
const read = 'read';
const afterRead = 'afterRead';
// pure-logic modifiers
const beforeMain = 'beforeMain';
const main = 'main';
const afterMain = 'afterMain';
// modifier with the purpose to write to the DOM (or write into a framework state)
const beforeWrite = 'beforeWrite';
const write = 'write';
const afterWrite = 'afterWrite';
const modifierPhases = [
    beforeRead,
    read,
    afterRead,
    beforeMain,
    main,
    afterMain,
    beforeWrite,
    write,
    afterWrite
];

// source: https://stackoverflow.com/questions/49875255
/**
 * @param modifiers
 */
function order(modifiers) {
    const map = new Map();
    const visited = new Set();
    const result = [];
    modifiers.forEach(modifier => {
        map.set(modifier.name, modifier);
    });
    // On visiting object, check for its dependencies and visit them recursively
    /**
     * @param modifier
     */
    function sort(modifier) {
        visited.add(modifier.name);
        const requires = [...(modifier.requires || []), ...(modifier.requiresIfExists || [])];
        requires.forEach(dep => {
            if (!visited.has(dep)) {
                const depModifier = map.get(dep);
                if (depModifier) {
                    sort(depModifier);
                }
            }
        });
        result.push(modifier);
    }
    modifiers.forEach(modifier => {
        if (!visited.has(modifier.name)) {
            // check for visited object
            sort(modifier);
        }
    });
    return result;
}
/**
 * @param modifiers
 */
function orderModifiers(modifiers) {
    // order based on dependencies
    const orderedModifiers = order(modifiers);
    // order based on phase
    return modifierPhases.reduce((acc, phase) => acc.concat(orderedModifiers.filter(modifier => modifier.phase === phase)), []);
}

// @ts-nocheck
/**
 * @param fn
 */
function debounce(fn) {
    let pending;
    return () => {
        if (!pending) {
            pending = new Promise(resolve => {
                Promise.resolve().then(() => {
                    pending = undefined;
                    resolve(fn());
                });
            });
        }
        return pending;
    };
}

/**
 * @param placement
 */
function getBasePlacement(placement) {
    return placement.split('-')[0];
}

/**
 * @param modifiers
 */
function mergeByName(modifiers) {
    const merged = modifiers.reduce((merged, current) => {
        const existing = merged[current.name];
        merged[current.name] = existing
            ? Object.assign(Object.assign(Object.assign({}, existing), current), { options: Object.assign(Object.assign({}, existing.options), current.options), data: Object.assign(Object.assign({}, existing.data), current.data) }) : current;
        return merged;
    }, {});
    // IE11 does not support Object.values
    return Object.keys(merged).map(key => merged[key]);
}

// @ts-nocheck
/**
 * @param element
 */
function getViewportRect(element) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
    // can be obscured underneath it.
    // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
    // if it isn't open, so if this isn't available, the popper will be detected
    // to overflow the bottom of the screen too early.
    if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        // Uses Layout Viewport (like Chrome; Safari does not currently)
        // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
        // errors due to floating point numbers, so we need to check precision.
        // Safari returns a number <= 0, usually < -1 when pinch-zoomed
        // Feature detection fails in mobile emulation mode in Chrome.
        // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
        // 0.001
        // Fallback here: "Not Safari" userAgent
        if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            x = visualViewport.offsetLeft;
            y = visualViewport.offsetTop;
        }
    }
    return {
        width,
        height,
        x: x + getWindowScrollBarX(element),
        y
    };
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable
/**
 * @param element
 */
function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const winScroll = getWindowScroll(element);
    const body = element.ownerDocument.body;
    const width = Math.max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    const height = Math.max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    let x = -winScroll.scrollLeft + getWindowScrollBarX(element);
    const y = -winScroll.scrollTop;
    if (getComputedStyle$1(body || html).direction === 'rtl') {
        x += Math.max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }
    return { width, height, x, y };
}

// @ts-nocheck
/**
 * @param parent
 * @param child
 */
function contains(parent, child) {
    // $FlowFixMe: hasOwnProperty doesn't seem to work in tests
    const isShadow = Boolean(child.getRootNode && child.getRootNode().host);
    // First, attempt with faster native method
    if (parent.contains(child)) {
        return true;
    } // then fallback to custom implementation with Shadow DOM support
    else if (isShadow) {
        let next = child;
        do {
            if (next && parent.isSameNode(next)) {
                return true;
            }
            // $FlowFixMe: need a better way to handle this...
            next = next.parentNode || next.host;
        } while (next);
    }
    // Give up, the result is false
    return false;
}

/**
 * @param rect
 */
function rectToClientRect(rect) {
    return Object.assign(Object.assign({}, rect), { left: rect.x, top: rect.y, right: rect.x + rect.width, bottom: rect.y + rect.height });
}

/**
 * @param element
 */
function getInnerBoundingClientRect(element) {
    const rect = getBoundingClientRect(element);
    rect.top = rect.top + element.clientTop;
    rect.left = rect.left + element.clientLeft;
    rect.bottom = rect.top + element.clientHeight;
    rect.right = rect.left + element.clientWidth;
    rect.width = element.clientWidth;
    rect.height = element.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
}
/**
 * @param element
 * @param clippingParent
 */
function getClientRectFromMixedType(element, clippingParent) {
    return clippingParent === viewport
        ? rectToClientRect(getViewportRect(element))
        : isHTMLElement(clippingParent)
            ? getInnerBoundingClientRect(clippingParent)
            : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
// A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`
/**
 * @param element
 */
function getClippingParents(element) {
    const clippingParents = listScrollParents(getParentNode(element));
    const canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
    const clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
    if (!isElement(clipperElement)) {
        return [];
    }
    // $FlowFixMe: https://github.com/facebook/flow/issues/1414
    return clippingParents.filter(clippingParent => isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body');
}
// Gets the maximum area that the element is visible in due to any number of
// clipping parents
/**
 * @param element
 * @param boundary
 * @param rootBoundary
 */
function getClippingRect(element, boundary, rootBoundary) {
    const mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
    const clippingParents = [...mainClippingParents, rootBoundary];
    const firstClippingParent = clippingParents[0];
    const clippingRect = clippingParents.reduce((accRect, clippingParent) => {
        const rect = getClientRectFromMixedType(element, clippingParent);
        accRect.top = Math.max(rect.top, accRect.top);
        accRect.right = Math.min(rect.right, accRect.right);
        accRect.bottom = Math.min(rect.bottom, accRect.bottom);
        accRect.left = Math.max(rect.left, accRect.left);
        return accRect;
    }, getClientRectFromMixedType(element, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
}

/**
 * @param placement
 */
function getVariation(placement) {
    return placement.split('-')[1];
}

/**
 * @param placement
 */
function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

// @ts-nocheck
/**
 *
 */
function computeOffsets({ reference, element, placement }) {
    const basePlacement = placement ? getBasePlacement(placement) : null;
    const variation = placement ? getVariation(placement) : null;
    const commonX = reference.x + reference.width / 2 - element.width / 2;
    const commonY = reference.y + reference.height / 2 - element.height / 2;
    let offsets;
    switch (basePlacement) {
        case top:
            offsets = {
                x: commonX,
                y: reference.y - element.height
            };
            break;
        case bottom:
            offsets = {
                x: commonX,
                y: reference.y + reference.height
            };
            break;
        case right:
            offsets = {
                x: reference.x + reference.width,
                y: commonY
            };
            break;
        case left:
            offsets = {
                x: reference.x - element.width,
                y: commonY
            };
            break;
        default:
            offsets = {
                x: reference.x,
                y: reference.y
            };
    }
    const mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
    if (mainAxis != null) {
        const len = mainAxis === 'y' ? 'height' : 'width';
        switch (variation) {
            case start:
                offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
                break;
            case end:
                offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
                break;
        }
    }
    return offsets;
}

/**
 *
 */
function getFreshSideObject() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
}

/**
 * @param paddingObject
 */
function mergePaddingObject(paddingObject) {
    return Object.assign(Object.assign({}, getFreshSideObject()), paddingObject);
}

// @ts-nocheck
/**
 * @param value
 * @param keys
 */
function expandToHashMap(value, keys) {
    return keys.reduce((hashMap, key) => {
        hashMap[key] = value;
        return hashMap;
    }, {});
}

/**
 * @param state
 * @param options
 */
function detectOverflow(state, options = {}) {
    const { placement = state.placement, boundary = clippingParents, rootBoundary = viewport, elementContext = popper, altBoundary = false, padding = 0 } = options;
    const paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
    const altContext = elementContext === popper ? reference : popper;
    const referenceElement = state.elements.reference;
    const popperRect = state.rects.popper;
    const element = state.elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
    const referenceClientRect = getBoundingClientRect(referenceElement);
    const popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement
    });
    const popperClientRect = rectToClientRect(Object.assign(Object.assign({}, popperRect), popperOffsets));
    const elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
    // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect
    const overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    const offsetData = state.modifiersData.offset;
    // Offsets can be applied only to the popper element
    if (elementContext === popper && offsetData) {
        const offset = offsetData[placement];
        Object.keys(overflowOffsets).forEach(key => {
            const multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
            const axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
            overflowOffsets[key] += offset[axis] * multiply;
        });
    }
    return overflowOffsets;
}

const DEFAULT_OPTIONS = {
    placement: 'bottom',
    modifiers: [],
    strategy: 'absolute'
};
/**
 * @param args
 */
function areValidElements(...args) {
    return !args.some(element => !(element && typeof element.getBoundingClientRect === 'function'));
}
/**
 * @param generatorOptions
 */
function popperGenerator(generatorOptions = {}) {
    const { defaultModifiers = [], defaultOptions = DEFAULT_OPTIONS } = generatorOptions;
    return function createPopper(reference, popper, options = defaultOptions) {
        let state = {
            placement: 'bottom',
            orderedModifiers: [],
            options: Object.assign(Object.assign({}, DEFAULT_OPTIONS), defaultOptions),
            modifiersData: {},
            elements: {
                reference,
                popper
            },
            attributes: {},
            styles: {}
        };
        let effectCleanupFns = [];
        let isDestroyed = false;
        const instance = {
            state,
            setOptions(options) {
                cleanupModifierEffects();
                state.options = Object.assign(Object.assign(Object.assign({}, defaultOptions), state.options), options);
                state.scrollParents = {
                    reference: isElement(reference)
                        ? listScrollParents(reference)
                        : reference.contextElement
                            ? listScrollParents(reference.contextElement)
                            : [],
                    popper: listScrollParents(popper)
                };
                // Orders the modifiers based on their dependencies and `phase`
                // properties
                const orderedModifiers = orderModifiers(mergeByName([...defaultModifiers, ...state.options.modifiers]));
                // Strip out disabled modifiers
                state.orderedModifiers = orderedModifiers.filter(m => m.enabled);
                runModifierEffects();
                return instance.update();
            },
            // Sync update – it will always be executed, even if not necessary. This
            // is useful for low frequency updates where sync behavior simplifies the
            // logic.
            // For high frequency updates (e.g. `resize` and `scroll` events), always
            // prefer the async Popper#update method
            forceUpdate() {
                if (isDestroyed) {
                    return;
                }
                const { reference, popper } = state.elements;
                // Don't proceed if `reference` or `popper` are not valid elements
                // anymore
                if (!areValidElements(reference, popper)) {
                    return;
                }
                // Store the reference and popper rects to be read by modifiers
                state.rects = {
                    reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
                    popper: getLayoutRect(popper)
                };
                // Modifiers have the ability to reset the current update cycle. The
                // most common use case for this is the `flip` modifier changing the
                // placement, which then needs to re-run all the modifiers, because the
                // logic was previously ran for the previous placement and is therefore
                // stale/incorrect
                state.reset = false;
                state.placement = state.options.placement;
                // On each update cycle, the `modifiersData` property for each modifier
                // is filled with the initial data specified by the modifier. This means
                // it doesn't persist and is fresh on each update.
                // To ensure persistent data, use `${name}#persistent`
                state.orderedModifiers.forEach(modifier => (state.modifiersData[modifier.name] = Object.assign({}, modifier.data)));
                for (let index = 0; index < state.orderedModifiers.length; index++) {
                    if (state.reset === true) {
                        state.reset = false;
                        index = -1;
                        continue;
                    }
                    const { fn, options = {}, name } = state.orderedModifiers[index];
                    if (typeof fn === 'function') {
                        state = fn({ state, options, name, instance }) || state;
                    }
                }
            },
            // Async and optimistically optimized update – it will not be executed if
            // not necessary (debounced to run at most once-per-tick)
            update: debounce(() => new Promise(resolve => {
                instance.forceUpdate();
                resolve(state);
            })),
            destroy() {
                cleanupModifierEffects();
                isDestroyed = true;
            }
        };
        if (!areValidElements(reference, popper)) {
            return instance;
        }
        instance.setOptions(options).then(state => {
            if (!isDestroyed && options.onFirstUpdate) {
                options.onFirstUpdate(state);
            }
        });
        // Modifiers have the ability to execute arbitrary code before the first
        // update cycle runs. They will be executed in the same order as the update
        // cycle. This is useful when a modifier adds some persistent data that
        // other modifiers need to use, but the modifier is run after the dependent
        // one.
        /**
         *
         */
        function runModifierEffects() {
            state.orderedModifiers.forEach(({ name, options = {}, effect }) => {
                if (typeof effect === 'function') {
                    const cleanupFn = effect({ state, name, instance, options });
                    const noopFn = () => { };
                    effectCleanupFns.push(cleanupFn || noopFn);
                }
            });
        }
        /**
         *
         */
        function cleanupModifierEffects() {
            effectCleanupFns.forEach(fn => fn());
            effectCleanupFns = [];
        }
        return instance;
    };
}

const passive = { passive: true };
/**
 *
 */
function effect({ state, instance, options }) {
    const { scroll = true, resize = true } = options;
    const window = getWindow(state.elements.popper);
    const scrollParents = [...state.scrollParents.reference, ...state.scrollParents.popper];
    if (scroll) {
        scrollParents.forEach(scrollParent => {
            scrollParent.addEventListener('scroll', instance.update, passive);
        });
    }
    if (resize) {
        window.addEventListener('resize', instance.update, passive);
    }
    return () => {
        if (scroll) {
            scrollParents.forEach(scrollParent => {
                scrollParent.removeEventListener('scroll', instance.update, passive);
            });
        }
        if (resize) {
            window.removeEventListener('resize', instance.update, passive);
        }
    };
}
var eventListeners = {
    name: 'eventListeners',
    enabled: true,
    phase: 'write',
    fn: () => { },
    effect,
    data: {}
};

/**
 *
 */
function popperOffsets({ state, name }) {
    // Offsets are the actual position the popper needs to have to be
    // properly positioned near its reference element
    // This is the most basic placement, and will be adjusted by
    // the modifiers in the next step
    state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: 'absolute',
        placement: state.placement
    });
}
var popperOffsets$1 = {
    name: 'popperOffsets',
    enabled: true,
    phase: 'read',
    fn: popperOffsets,
    data: {}
};

const unsetSides = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto'
};
// Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.
/**
 *
 */
function roundOffsets({ x, y }) {
    const win = window;
    const dpr = win.devicePixelRatio || 1;
    return {
        x: Math.round(x * dpr) / dpr || 0,
        y: Math.round(y * dpr) / dpr || 0
    };
}
/**
 *
 */
function mapToStyles({ popper, popperRect, placement, offsets, position, gpuAcceleration, adaptive }) {
    let { x, y } = roundOffsets(offsets);
    const hasX = offsets.hasOwnProperty('x');
    const hasY = offsets.hasOwnProperty('y');
    let sideX = left;
    let sideY = top;
    const win = window;
    if (adaptive) {
        let offsetParent = getOffsetParent(popper);
        if (offsetParent === getWindow(popper)) {
            offsetParent = getDocumentElement(popper);
        }
        // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it
        /* :: offsetParent = (offsetParent: Element); */
        if (placement === top) {
            sideY = bottom;
            y -= offsetParent.clientHeight - popperRect.height;
            y *= gpuAcceleration ? 1 : -1;
        }
        if (placement === left) {
            sideX = right;
            x -= offsetParent.clientWidth - popperRect.width;
            x *= gpuAcceleration ? 1 : -1;
        }
    }
    const commonStyles = Object.assign({ position }, (adaptive && unsetSides));
    if (gpuAcceleration) {
        return Object.assign(Object.assign({}, commonStyles), { [sideY]: hasY ? '0' : '', [sideX]: hasX ? '0' : '', 
            // Layer acceleration can disable subpixel rendering which causes slightly
            // blurry text on low PPI displays, so we want to use 2D transforms
            // instead
            transform: (win.devicePixelRatio || 1) < 2 ? `translate(${x}px, ${y}px)` : `translate3d(${x}px, ${y}px, 0)` });
    }
    return Object.assign(Object.assign({}, commonStyles), { [sideY]: hasY ? `${y}px` : '', [sideX]: hasX ? `${x}px` : '', transform: '' });
}
/**
 *
 */
function computeStyles({ state, options }) {
    const { gpuAcceleration = true, adaptive = true } = options;
    const commonStyles = {
        placement: getBasePlacement(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration
    };
    if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign(Object.assign({}, state.styles.popper), mapToStyles(Object.assign(Object.assign({}, commonStyles), { offsets: state.modifiersData.popperOffsets, position: state.options.strategy, adaptive })));
    }
    if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign(Object.assign({}, state.styles.arrow), mapToStyles(Object.assign(Object.assign({}, commonStyles), { offsets: state.modifiersData.arrow, position: 'absolute', adaptive: false })));
    }
    state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), { 'data-popper-placement': state.placement });
}
var computeStyles$1 = {
    name: 'computeStyles',
    enabled: true,
    phase: 'beforeWrite',
    fn: computeStyles,
    data: {}
};

// This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow
/**
 *
 */
function applyStyles({ state }) {
    Object.keys(state.elements).forEach(name => {
        const style = state.styles[name] || {};
        const attributes = state.attributes[name] || {};
        const element = state.elements[name];
        // arrow is optional + virtual elements
        if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
        }
        // Flow doesn't support to extend this property, but it's the most
        // effective way to apply styles to an HTMLElement
        // $FlowFixMe
        Object.assign(element.style, style);
        Object.keys(attributes).forEach(name => {
            const value = attributes[name];
            if (value === false) {
                element.removeAttribute(name);
            }
            else {
                element.setAttribute(name, value === true ? '' : value);
            }
        });
    });
}
/**
 *
 */
function effect$1({ state }) {
    const initialStyles = {
        popper: {
            position: state.options.strategy,
            left: '0',
            top: '0',
            margin: '0'
        },
        arrow: {
            position: 'absolute'
        },
        reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }
    return () => {
        Object.keys(state.elements).forEach(name => {
            const element = state.elements[name];
            const attributes = state.attributes[name] || {};
            const styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
            // Set all values to an empty string to unset them
            const style = styleProperties.reduce((style, property) => {
                style[property] = '';
                return style;
            }, {});
            // arrow is optional + virtual elements
            if (!isHTMLElement(element) || !getNodeName(element)) {
                return;
            }
            // Flow doesn't support to extend this property, but it's the most
            // effective way to apply styles to an HTMLElement
            // $FlowFixMe
            Object.assign(element.style, style);
            Object.keys(attributes).forEach(attribute => {
                element.removeAttribute(attribute);
            });
        });
    };
}
var applyStyles$1 = {
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    effect: effect$1,
    requires: ['computeStyles']
};

/**
 * @param placement
 * @param rects
 * @param offset
 */
function distanceAndSkiddingToXY(placement, rects, offset) {
    const basePlacement = getBasePlacement(placement);
    const invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
    let [skidding, distance] = typeof offset === 'function'
        ? offset(Object.assign(Object.assign({}, rects), { placement }))
        : offset;
    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? { x: distance, y: skidding } : { x: skidding, y: distance };
}
/**
 *
 */
function offset({ state, options, name }) {
    const { offset = [0, 0] } = options;
    const data = placements.reduce((acc, placement) => {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
        return acc;
    }, {});
    const { x, y } = data[state.placement];
    if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
    }
    state.modifiersData[name] = data;
}
var offset$1 = {
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset
};

const hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
/**
 * @param placement
 */
function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, matched => hash[matched]);
}

const hash$1 = { start: 'end', end: 'start' };
/**
 * @param placement
 */
function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, matched => hash$1[matched]);
}

/* :: type OverflowsMap = { [ComputedPlacement]: number }; */
/* ;; type OverflowsMap = { [key in ComputedPlacement]: number }; */
/**
 * @param state
 * @param options
 */
function computeAutoPlacement(state, options = {}) {
    const { placement, boundary, rootBoundary, padding, flipVariations, allowedAutoPlacements = placements } = options;
    const variation = getVariation(placement);
    const placements$1 = variation
        ? flipVariations
            ? variationPlacements
            : variationPlacements.filter(placement => getVariation(placement) === variation)
        : basePlacements;
    // $FlowFixMe
    let allowedPlacements = placements$1.filter(placement => allowedAutoPlacements.indexOf(placement) >= 0);
    if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;
    }
    // $FlowFixMe: Flow seems to have problems with two array unions...
    const overflows = allowedPlacements.reduce((acc, placement) => {
        acc[placement] = detectOverflow(state, {
            placement,
            boundary,
            rootBoundary,
            padding
        })[getBasePlacement(placement)];
        return acc;
    }, {});
    return Object.keys(overflows).sort((a, b) => overflows[a] - overflows[b]);
}

/**
 * @param placement
 */
function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
        return [];
    }
    const oppositePlacement = getOppositePlacement(placement);
    return [
        getOppositeVariationPlacement(placement),
        oppositePlacement,
        getOppositeVariationPlacement(oppositePlacement)
    ];
}
/**
 *
 */
function flip({ state, options, name }) {
    if (state.modifiersData[name]._skip) {
        return;
    }
    const { mainAxis: checkMainAxis = true, altAxis: checkAltAxis = true, fallbackPlacements: specifiedFallbackPlacements, padding, boundary, rootBoundary, altBoundary, flipVariations = true, allowedAutoPlacements } = options;
    const preferredPlacement = state.options.placement;
    const basePlacement = getBasePlacement(preferredPlacement);
    const isBasePlacement = basePlacement === preferredPlacement;
    const fallbackPlacements = specifiedFallbackPlacements ||
        (isBasePlacement || !flipVariations
            ? [getOppositePlacement(preferredPlacement)]
            : getExpandedFallbackPlacements(preferredPlacement));
    const placements = [preferredPlacement, ...fallbackPlacements].reduce((acc, placement) => acc.concat(getBasePlacement(placement) === auto
        ? computeAutoPlacement(state, {
            placement,
            boundary,
            rootBoundary,
            padding,
            flipVariations,
            allowedAutoPlacements
        })
        : placement), []);
    const referenceRect = state.rects.reference;
    const popperRect = state.rects.popper;
    const checksMap = new Map();
    let makeFallbackChecks = true;
    let firstFittingPlacement = placements[0];
    for (let i = 0; i < placements.length; i++) {
        const placement = placements[i];
        const basePlacement = getBasePlacement(placement);
        const isStartVariation = getVariation(placement) === start;
        const isVertical = [top, bottom].indexOf(basePlacement) >= 0;
        const len = isVertical ? 'width' : 'height';
        const overflow = detectOverflow(state, {
            placement,
            boundary,
            rootBoundary,
            altBoundary,
            padding
        });
        let mainVariationSide = isVertical ? (isStartVariation ? right : left) : isStartVariation ? bottom : top;
        if (referenceRect[len] > popperRect[len]) {
            mainVariationSide = getOppositePlacement(mainVariationSide);
        }
        const altVariationSide = getOppositePlacement(mainVariationSide);
        const checks = [];
        if (checkMainAxis) {
            checks.push(overflow[basePlacement] <= 0);
        }
        if (checkAltAxis) {
            checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
        }
        if (checks.every(check => check)) {
            firstFittingPlacement = placement;
            makeFallbackChecks = false;
            break;
        }
        checksMap.set(placement, checks);
    }
    if (makeFallbackChecks) {
        // `2` may be desired in some cases – research later
        const numberOfChecks = flipVariations ? 3 : 1;
        for (let i = numberOfChecks; i > 0; i--) {
            const fittingPlacement = placements.find(placement => {
                const checks = checksMap.get(placement);
                if (checks) {
                    return checks.slice(0, i).every(check => check);
                }
            });
            if (fittingPlacement) {
                firstFittingPlacement = fittingPlacement;
                break;
            }
        }
    }
    if (state.placement !== firstFittingPlacement) {
        state.modifiersData[name]._skip = true;
        state.placement = firstFittingPlacement;
        state.reset = true;
    }
}
var flip$1 = {
    name: 'flip',
    enabled: true,
    phase: 'main',
    fn: flip,
    requiresIfExists: ['offset'],
    data: { _skip: false }
};

// @ts-nocheck
/**
 * @param axis
 */
function getAltAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
}

// @ts-nocheck
/**
 * @param min
 * @param value
 * @param max
 */
function within(min, value, max) {
    return Math.max(min, Math.min(value, max));
}

// @ts-nocheck
/**
 *
 */
function preventOverflow({ state, options, name }) {
    const { mainAxis: checkMainAxis = true, altAxis: checkAltAxis = false, boundary, rootBoundary, altBoundary, padding, tether = true, tetherOffset = 0 } = options;
    const overflow = detectOverflow(state, {
        boundary,
        rootBoundary,
        padding,
        altBoundary
    });
    const basePlacement = getBasePlacement(state.placement);
    const variation = getVariation(state.placement);
    const isBasePlacement = !variation;
    const mainAxis = getMainAxisFromPlacement(basePlacement);
    const altAxis = getAltAxis(mainAxis);
    const popperOffsets = state.modifiersData.popperOffsets;
    const referenceRect = state.rects.reference;
    const popperRect = state.rects.popper;
    const tetherOffsetValue = typeof tetherOffset === 'function'
        ? tetherOffset(Object.assign(Object.assign({}, state.rects), { placement: state.placement }))
        : tetherOffset;
    const data = { x: 0, y: 0 };
    if (!popperOffsets) {
        return;
    }
    if (checkMainAxis) {
        const mainSide = mainAxis === 'y' ? top : left;
        const altSide = mainAxis === 'y' ? bottom : right;
        const len = mainAxis === 'y' ? 'height' : 'width';
        const offset = popperOffsets[mainAxis];
        const min = popperOffsets[mainAxis] + overflow[mainSide];
        const max = popperOffsets[mainAxis] - overflow[altSide];
        const additive = tether ? -popperRect[len] / 2 : 0;
        const minLen = variation === start ? referenceRect[len] : popperRect[len];
        const maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
        // We need to include the arrow in the calculation so the arrow doesn't go
        // outside the reference bounds
        const arrowElement = state.elements.arrow;
        const arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : { width: 0, height: 0 };
        const arrowPaddingObject = state.modifiersData['arrow#persistent']
            ? state.modifiersData['arrow#persistent'].padding
            : getFreshSideObject();
        const arrowPaddingMin = arrowPaddingObject[mainSide];
        const arrowPaddingMax = arrowPaddingObject[altSide];
        // If the reference length is smaller than the arrow length, we don't want
        // to include its full size in the calculation. If the reference is small
        // and near the edge of a boundary, the popper can overflow even if the
        // reference is not overflowing as well (e.g. virtual elements with no
        // width or height)
        const arrowLen = within(0, referenceRect[len], arrowRect[len]);
        const minOffset = isBasePlacement
            ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue
            : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
        const maxOffset = isBasePlacement
            ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue
            : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
        const arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        const clientOffset = arrowOffsetParent
            ? mainAxis === 'y'
                ? arrowOffsetParent.clientTop || 0
                : arrowOffsetParent.clientLeft || 0
            : 0;
        const offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
        const tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
        const tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
        const preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
        popperOffsets[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset;
    }
    if (checkAltAxis) {
        const mainSide = mainAxis === 'x' ? top : left;
        const altSide = mainAxis === 'x' ? bottom : right;
        const offset = popperOffsets[altAxis];
        const min = offset + overflow[mainSide];
        const max = offset - overflow[altSide];
        const preventedOffset = within(min, offset, max);
        popperOffsets[altAxis] = preventedOffset;
        data[altAxis] = preventedOffset - offset;
    }
    state.modifiersData[name] = data;
}
var preventOverflow$1 = {
    name: 'preventOverflow',
    enabled: true,
    phase: 'main',
    fn: preventOverflow,
    requiresIfExists: ['offset']
};

/**
 *
 */
function arrow({ state, name }) {
    const arrowElement = state.elements.arrow;
    const popperOffsets = state.modifiersData.popperOffsets;
    const basePlacement = getBasePlacement(state.placement);
    const axis = getMainAxisFromPlacement(basePlacement);
    const isVertical = [left, right].indexOf(basePlacement) >= 0;
    const len = isVertical ? 'height' : 'width';
    if (!arrowElement || !popperOffsets) {
        return;
    }
    const paddingObject = state.modifiersData[`${name}#persistent`].padding;
    const arrowRect = getLayoutRect(arrowElement);
    const minProp = axis === 'y' ? top : left;
    const maxProp = axis === 'y' ? bottom : right;
    const endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
    const startDiff = popperOffsets[axis] - state.rects.reference[axis];
    const arrowOffsetParent = getOffsetParent(arrowElement);
    const clientSize = arrowOffsetParent
        ? axis === 'y'
            ? arrowOffsetParent.clientHeight || 0
            : arrowOffsetParent.clientWidth || 0
        : 0;
    const centerToReference = endDiff / 2 - startDiff / 2;
    // Make sure the arrow doesn't overflow the popper if the center point is
    // outside of the popper bounds
    const min = paddingObject[minProp];
    const max = clientSize - arrowRect[len] - paddingObject[maxProp];
    const center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    const offset = within(min, center, max);
    // Prevents breaking syntax highlighting...
    const axisProp = axis;
    state.modifiersData[name] = {
        [axisProp]: offset,
        centerOffset: offset - center
    };
}
/**
 *
 */
function effect$2({ state, options, name }) {
    let { element: arrowElement = '[data-popper-arrow]', padding = 0 } = options;
    if (arrowElement == null) {
        return;
    }
    // CSS selector
    if (typeof arrowElement === 'string') {
        arrowElement = state.elements.popper.querySelector(arrowElement);
        if (!arrowElement) {
            return;
        }
    }
    if (!contains(state.elements.popper, arrowElement)) {
        return;
    }
    state.elements.arrow = arrowElement;
    state.modifiersData[`${name}#persistent`] = {
        padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
    };
}
var arrow$1 = {
    name: 'arrow',
    enabled: true,
    phase: 'main',
    fn: arrow,
    effect: effect$2,
    requires: ['popperOffsets'],
    requiresIfExists: ['preventOverflow']
};

/**
 * @param overflow
 * @param rect
 * @param preventedOffsets
 */
function getSideOffsets(overflow, rect, preventedOffsets = { x: 0, y: 0 }) {
    return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
    };
}
/**
 * @param overflow
 */
function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(side => overflow[side] >= 0);
}
/**
 *
 */
function hide({ state, name }) {
    const referenceRect = state.rects.reference;
    const popperRect = state.rects.popper;
    const preventedOffsets = state.modifiersData.preventOverflow;
    const referenceOverflow = detectOverflow(state, {
        elementContext: 'reference'
    });
    const popperAltOverflow = detectOverflow(state, {
        altBoundary: true
    });
    const referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    const popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    const isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    const hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
        referenceClippingOffsets,
        popperEscapeOffsets,
        isReferenceHidden,
        hasPopperEscaped
    };
    state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), { 'data-popper-reference-hidden': isReferenceHidden, 'data-popper-escaped': hasPopperEscaped });
}
var hide$1 = {
    name: 'hide',
    enabled: true,
    phase: 'main',
    requiresIfExists: ['preventOverflow'],
    fn: hide
};

// @ts-nocheck
const defaultModifiers = [
    eventListeners,
    popperOffsets$1,
    computeStyles$1,
    applyStyles$1,
    offset$1,
    flip$1,
    preventOverflow$1,
    arrow$1,
    hide$1
];
const createPopper = popperGenerator({ defaultModifiers });

/**
 * Small wrapper around `useLayoutEffect` to get rid of the warning on SSR envs
 */
const useIsomorphicLayoutEffect = canUseDOM ? react.useLayoutEffect : react.useEffect;

/* eslint-disable @typescript-eslint/consistent-type-definitions */
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
/**
 * Simple ponyfill for Object.fromEntries
 */
const fromEntries = (entries) => entries.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
}, {});
const EMPTY_MODIFIERS = [];
const usePopper = (referenceElement, popperElement, options = {}) => {
    const prevOptions = react.useRef(null);
    const optionsWithDefaults = {
        onFirstUpdate: options.onFirstUpdate,
        placement: options.placement || 'bottom',
        strategy: options.strategy || 'absolute',
        modifiers: options.modifiers || EMPTY_MODIFIERS
    };
    const [state, setState] = react.useState({
        styles: {
            popper: {
                position: optionsWithDefaults.strategy,
                left: '0',
                top: '0'
            }
        },
        attributes: {}
    });
    const updateStateModifier = react.useMemo(() => ({
        name: 'updateState',
        enabled: true,
        phase: 'write',
        // eslint-disable-next-line no-shadow
        fn: ({ state }) => {
            const elements = Object.keys(state.elements);
            setState({
                styles: fromEntries(elements.map(element => [element, state.styles[element] || {}])),
                attributes: fromEntries(elements.map(element => [element, state.attributes[element]]))
            });
        },
        requires: ['computeStyles']
    }), []);
    const popperOptions = react.useMemo(() => {
        const newOptions = {
            onFirstUpdate: optionsWithDefaults.onFirstUpdate,
            placement: optionsWithDefaults.placement,
            strategy: optionsWithDefaults.strategy,
            modifiers: [...optionsWithDefaults.modifiers, updateStateModifier, { name: 'applyStyles', enabled: false }]
        };
        if (isEqual(prevOptions.current, newOptions)) {
            return prevOptions.current || newOptions;
        }
        else {
            prevOptions.current = newOptions;
            return newOptions;
        }
    }, [
        optionsWithDefaults.onFirstUpdate,
        optionsWithDefaults.placement,
        optionsWithDefaults.strategy,
        optionsWithDefaults.modifiers,
        updateStateModifier
    ]);
    const popperInstanceRef = react.useRef();
    useIsomorphicLayoutEffect(() => {
        if (popperInstanceRef && popperInstanceRef.current) {
            popperInstanceRef.current.setOptions(popperOptions);
        }
    }, [popperOptions]);
    useIsomorphicLayoutEffect(() => {
        if (referenceElement == null || popperElement == null) {
            return;
        }
        const createPopper$1 = options.createPopper || createPopper;
        const popperInstance = createPopper$1(referenceElement, popperElement, popperOptions);
        popperInstanceRef.current = popperInstance;
        return () => {
            popperInstance.destroy();
            popperInstanceRef.current = null;
        };
    }, [referenceElement, popperElement, options.createPopper]);
    return {
        state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
        styles: state.styles,
        attributes: state.attributes,
        update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
        forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
    };
};

const hash$2 = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
const getOppositePlacement$1 = (placement) => placement.replace(/left|right|bottom|top/g, (matched) => hash$2[matched]);
const getOpacityTransition = (animationDuration) => `opacity ${animationDuration}ms cubic-bezier(.54, 1.5, .38, 1.11)`;
const Popper = ({ trigger, popper, popperMatchesTriggerWidth = true, direction = 'down', position = 'left', placement, appendTo = () => document.body, zIndex = 9999, isVisible = true, positionModifiers, distance = 0, onMouseEnter, onMouseLeave, onFocus, onBlur, onDocumentClick, onTriggerClick, onTriggerEnter, onPopperClick, onPopperMouseEnter, onPopperMouseLeave, onDocumentKeyDown, enableFlip = true, flipBehavior = 'flip', reference }) => {
    const [triggerElement, setTriggerElement] = react.useState(null);
    const [refElement, setRefElement] = react.useState(null);
    const [popperElement, setPopperElement] = react.useState(null);
    const [ready, setReady] = react.useState(false);
    const refOrTrigger = refElement || triggerElement;
    const onDocumentClickCallback = react.useCallback((event) => onDocumentClick(event, refOrTrigger, popperElement), [isVisible, triggerElement, refElement, popperElement, onDocumentClick]);
    react.useEffect(() => {
        setReady(true);
    }, []);
    react.useEffect(() => {
        if (reference) {
            if (reference.current) {
                setRefElement(reference.current);
            }
            else if (typeof reference === 'function') {
                setRefElement(reference());
            }
        }
    }, [reference]);
    const addEventListener = (listener, element, event) => {
        if (listener && element) {
            element.addEventListener(event, listener);
        }
    };
    const removeEventListener = (listener, element, event) => {
        if (listener && element) {
            element.removeEventListener(event, listener);
        }
    };
    react.useEffect(() => {
        addEventListener(onMouseEnter, refOrTrigger, 'mouseenter');
        addEventListener(onMouseLeave, refOrTrigger, 'mouseleave');
        addEventListener(onFocus, refOrTrigger, 'focus');
        addEventListener(onBlur, refOrTrigger, 'blur');
        addEventListener(onTriggerClick, refOrTrigger, 'click');
        addEventListener(onTriggerEnter, refOrTrigger, 'keydown');
        addEventListener(onPopperClick, popperElement, 'click');
        addEventListener(onPopperMouseEnter, popperElement, 'mouseenter');
        addEventListener(onPopperMouseLeave, popperElement, 'mouseleave');
        onDocumentClick && addEventListener(onDocumentClickCallback, document, 'click');
        addEventListener(onDocumentKeyDown, document, 'keydown');
        // Trigger a Popper update when content changes.
        const observer = new MutationObserver(() => {
            update && update();
        });
        popperElement && observer.observe(popperElement, { attributes: true, childList: true, subtree: true });
        return () => {
            removeEventListener(onMouseEnter, refOrTrigger, 'mouseenter');
            removeEventListener(onMouseLeave, refOrTrigger, 'mouseleave');
            removeEventListener(onFocus, refOrTrigger, 'focus');
            removeEventListener(onBlur, refOrTrigger, 'blur');
            removeEventListener(onTriggerClick, refOrTrigger, 'click');
            removeEventListener(onTriggerEnter, refOrTrigger, 'keydown');
            removeEventListener(onPopperClick, popperElement, 'click');
            removeEventListener(onPopperMouseEnter, popperElement, 'mouseenter');
            removeEventListener(onPopperMouseLeave, popperElement, 'mouseleave');
            onDocumentClick && removeEventListener(onDocumentClickCallback, document, 'click');
            removeEventListener(onDocumentKeyDown, document, 'keydown');
            observer.disconnect();
        };
    }, [
        triggerElement,
        popperElement,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        onTriggerClick,
        onTriggerEnter,
        onPopperClick,
        onPopperMouseEnter,
        onPopperMouseLeave,
        onDocumentClick,
        onDocumentKeyDown,
        refElement
    ]);
    const getPlacement = () => {
        if (placement) {
            return placement;
        }
        let convertedPlacement = direction === 'up' ? 'top' : 'bottom';
        if (position !== 'center') {
            convertedPlacement = `${convertedPlacement}-${position === 'right' ? 'end' : 'start'}`;
        }
        return convertedPlacement;
    };
    const getPlacementMemo = react.useMemo(getPlacement, [direction, position, placement]);
    const getOppositePlacementMemo = react.useMemo(() => getOppositePlacement$1(getPlacement()), [
        direction,
        position,
        placement
    ]);
    const sameWidthMod = react.useMemo(() => ({
        name: 'sameWidth',
        enabled: popperMatchesTriggerWidth,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({ state }) => {
            state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        effect: ({ state }) => {
            state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
            return () => { };
        }
    }), [popperMatchesTriggerWidth]);
    const { styles: popperStyles, attributes, update } = usePopper(refOrTrigger, popperElement, {
        placement: getPlacementMemo,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, distance]
                }
            },
            {
                name: 'preventOverflow',
                enabled: false
            },
            {
                // adds attribute [data-popper-reference-hidden] to the popper element which can be used to hide it using CSS
                name: 'hide',
                enabled: true
            },
            {
                name: 'flip',
                enabled: getPlacementMemo.startsWith('auto') || enableFlip,
                options: {
                    fallbackPlacements: flipBehavior === 'flip' ? [getOppositePlacementMemo] : flipBehavior
                }
            },
            sameWidthMod
        ]
    });
    // Returns the CSS modifier class in order to place the Popper's arrow properly
    // Depends on the position of the Popper relative to the reference element
    const modifierFromPopperPosition = () => {
        if (attributes && attributes.popper && attributes.popper['data-popper-placement']) {
            const popperPlacement = attributes.popper['data-popper-placement'];
            return positionModifiers[popperPlacement];
        }
        return positionModifiers.top;
    };
    const menuWithPopper = react.cloneElement(popper, Object.assign({ className: css(popper.props && popper.props.className, positionModifiers && modifierFromPopperPosition()), style: Object.assign(Object.assign(Object.assign({}, ((popper.props && popper.props.style) || {})), popperStyles.popper), { zIndex }) }, attributes.popper));
    const getTarget = () => {
        if (typeof appendTo === 'function') {
            return appendTo();
        }
        return appendTo;
    };
    return (react.createElement(react.Fragment, null,
        !reference && trigger && (react.createElement(FindRefWrapper, { onFoundRef: (foundRef) => setTriggerElement(foundRef) }, trigger)),
        ready &&
            isVisible &&
            reactDom.createPortal(react.createElement(FindRefWrapper, { onFoundRef: (foundRef) => setPopperElement(foundRef) }, menuWithPopper), getTarget())));
};
Popper.displayName = 'Popper';

/**
 * This function creates a ResizeObserver used to handle resize events for the given containerRef. If ResizeObserver
 * or the given containerRef are not available, a window resize event listener is used by default.
 *
 * Example 1:
 *
 * private containerRef = React.createRef<HTMLDivElement>();
 * private observer: any = () => {};
 *
 * public componentDidMount() {
 *   this.observer = getResizeObserver(this.containerRef.current, this.handleResize);
 * }
 *
 * public componentWillUnmount() {
 *   this.observer();
 * }
 *
 * private handleResize = () => {
 *   if (this.containerRef.current && this.containerRef.current.clientWidth) {
 *     this.setState({ width: this.containerRef.current.clientWidth });
 *   }
 * };
 *
 * public render() {
 *   return (
 *     <div ref={this.containerRef} >
 *       <Chart width={this.state.width} ... />
 *     </div>
 *   );
 * }
 *
 * Example 2:
 *
 * private inputRef = React.createRef<HTMLInputElement>();
 * private observer: any = () => {};
 *
 * public componentDidMount() {
 *   this.observer = getResizeObserver(this.inputRef.current, this.handleResize);
 * }
 *
 * public componentWillUnmount() {
 *   this.observer();
 * }
 *
 * private handleResize = () => {
 *   if (this.inputRef.current) {
 *     trimLeft(inputRef.current, String(this.props.value));
 *   }
 * };
 *
 * public render() {
 *   return (
 *     <input ref={this.inputRef} ... />
 *   );
 * }
 *
 * @param {Element} containerRefElement The container reference to observe
 * @param {Function} handleResize The function to call for resize events
 * @return {Function} The function used to unobserve resize events
 */
const getResizeObserver = (containerRefElement, handleResize) => {
    let unobserve;
    if (canUseDOM) {
        const { ResizeObserver } = window;
        if (containerRefElement && ResizeObserver) {
            const resizeObserver = new ResizeObserver((entries) => {
                // Wrap resize function in requestAnimationFrame to avoid "ResizeObserver loop limit exceeded" errors
                window.requestAnimationFrame(() => {
                    if (Array.isArray(entries) && entries.length > 0) {
                        handleResize();
                    }
                });
            });
            resizeObserver.observe(containerRefElement);
            unobserve = () => resizeObserver.unobserve(containerRefElement);
        }
        else {
            window.addEventListener('resize', handleResize);
            unobserve = () => window.removeEventListener('resize', handleResize);
        }
    }
    return () => {
        if (unobserve) {
            unobserve();
        }
    };
};

import('./title-ac1d61d8.js');
var styles = {
  modifiers: {
    "4xl": "pf-m-4xl",
    "3xl": "pf-m-3xl",
    "2xl": "pf-m-2xl",
    xl: "pf-m-xl",
    lg: "pf-m-lg",
    md: "pf-m-md",
    overpassFont: "pf-m-overpass-font"
  },
  title: "pf-c-title"
};

var TitleSizes;
(function (TitleSizes) {
    TitleSizes["md"] = "md";
    TitleSizes["lg"] = "lg";
    TitleSizes["xl"] = "xl";
    TitleSizes["2xl"] = "2xl";
    TitleSizes["3xl"] = "3xl";
    TitleSizes["4xl"] = "4xl";
})(TitleSizes || (TitleSizes = {}));
var headingLevelSizeMap;
(function (headingLevelSizeMap) {
    headingLevelSizeMap["h1"] = "2xl";
    headingLevelSizeMap["h2"] = "xl";
    headingLevelSizeMap["h3"] = "lg";
    headingLevelSizeMap["h4"] = "md";
    headingLevelSizeMap["h5"] = "md";
    headingLevelSizeMap["h6"] = "md";
})(headingLevelSizeMap || (headingLevelSizeMap = {}));
const Title = (_a) => {
    var { className = '', children = '', headingLevel: HeadingLevel, size = headingLevelSizeMap[HeadingLevel], ouiaId, ouiaSafe = true } = _a, props = __rest(_a, ["className", "children", "headingLevel", "size", "ouiaId", "ouiaSafe"]);
    const ouiaProps = useOUIAProps(Title.displayName, ouiaId, ouiaSafe);
    return (react.createElement(HeadingLevel, Object.assign({}, ouiaProps, props, { className: css(styles.title, size && styles.modifiers[size], className) }), children));
};
Title.displayName = 'Title';

import('./button-90e49a69.js');
var buttonStyles = {
  button: "pf-c-button",
  buttonIcon: "pf-c-button__icon",
  buttonProgress: "pf-c-button__progress",
  modifiers: {
    active: "pf-m-active",
    block: "pf-m-block",
    small: "pf-m-small",
    primary: "pf-m-primary",
    displayLg: "pf-m-display-lg",
    secondary: "pf-m-secondary",
    tertiary: "pf-m-tertiary",
    link: "pf-m-link",
    inline: "pf-m-inline",
    danger: "pf-m-danger",
    warning: "pf-m-warning",
    control: "pf-m-control",
    expanded: "pf-m-expanded",
    plain: "pf-m-plain",
    disabled: "pf-m-disabled",
    ariaDisabled: "pf-m-aria-disabled",
    progress: "pf-m-progress",
    inProgress: "pf-m-in-progress",
    start: "pf-m-start",
    end: "pf-m-end",
    overpassFont: "pf-m-overpass-font"
  },
  spinner: "pf-c-spinner",
  themeDark: "pf-theme-dark"
};

import('./spinner-f0b69c26.js');
var styles$1 = {
  modifiers: {
    sm: "pf-m-sm",
    md: "pf-m-md",
    lg: "pf-m-lg",
    xl: "pf-m-xl"
  },
  spinner: "pf-c-spinner",
  spinnerClipper: "pf-c-spinner__clipper",
  spinnerLeadBall: "pf-c-spinner__lead-ball",
  spinnerPath: "pf-c-spinner__path",
  spinnerTailBall: "pf-c-spinner__tail-ball"
};

var spinnerSize;
(function (spinnerSize) {
    spinnerSize["sm"] = "sm";
    spinnerSize["md"] = "md";
    spinnerSize["lg"] = "lg";
    spinnerSize["xl"] = "xl";
})(spinnerSize || (spinnerSize = {}));
const Spinner = (_a) => {
    var { 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    className = '', size = 'xl', 'aria-valuetext': ariaValueText = 'Loading...', isSVG = false, diameter, 'aria-label': ariaLabel, 'aria-labelledBy': ariaLabelledBy } = _a, props = __rest(_a, ["className", "size", 'aria-valuetext', "isSVG", "diameter", 'aria-label', 'aria-labelledBy']);
    const Component = isSVG ? 'svg' : 'span';
    return (react.createElement(Component, Object.assign({ className: css(styles$1.spinner, styles$1.modifiers[size], className), role: "progressbar", "aria-valuetext": ariaValueText }, (isSVG && { viewBox: '0 0 100 100' }), (diameter && { style: { '--pf-c-spinner--diameter': diameter } }), (ariaLabel && { 'aria-label': ariaLabel }), (ariaLabelledBy && { 'aria-labelledBy': ariaLabelledBy }), (!ariaLabel && !ariaLabelledBy && { 'aria-label': 'Contents' }), props), isSVG ? (react.createElement("circle", { className: styles$1.spinnerPath, cx: "50", cy: "50", r: "45", fill: "none" })) : (react.createElement(react.Fragment, null,
        react.createElement("span", { className: css(styles$1.spinnerClipper) }),
        react.createElement("span", { className: css(styles$1.spinnerLeadBall) }),
        react.createElement("span", { className: css(styles$1.spinnerTailBall) })))));
};
Spinner.displayName = 'Spinner';

var ButtonVariant;
(function (ButtonVariant) {
    ButtonVariant["primary"] = "primary";
    ButtonVariant["secondary"] = "secondary";
    ButtonVariant["tertiary"] = "tertiary";
    ButtonVariant["danger"] = "danger";
    ButtonVariant["warning"] = "warning";
    ButtonVariant["link"] = "link";
    ButtonVariant["plain"] = "plain";
    ButtonVariant["control"] = "control";
})(ButtonVariant || (ButtonVariant = {}));
var ButtonType;
(function (ButtonType) {
    ButtonType["button"] = "button";
    ButtonType["submit"] = "submit";
    ButtonType["reset"] = "reset";
})(ButtonType || (ButtonType = {}));
const ButtonBase = (_a) => {
    var { children = null, className = '', component = 'button', isActive = false, isBlock = false, isDisabled = false, isAriaDisabled = false, isLoading = null, isDanger = false, spinnerAriaValueText, spinnerAriaLabelledBy, spinnerAriaLabel, isSmall = false, isLarge = false, inoperableEvents = ['onClick', 'onKeyPress'], isInline = false, type = ButtonType.button, variant = ButtonVariant.primary, iconPosition = 'left', 'aria-label': ariaLabel = null, icon = null, ouiaId, ouiaSafe = true, tabIndex = null, innerRef } = _a, props = __rest(_a, ["children", "className", "component", "isActive", "isBlock", "isDisabled", "isAriaDisabled", "isLoading", "isDanger", "spinnerAriaValueText", "spinnerAriaLabelledBy", "spinnerAriaLabel", "isSmall", "isLarge", "inoperableEvents", "isInline", "type", "variant", "iconPosition", 'aria-label', "icon", "ouiaId", "ouiaSafe", "tabIndex", "innerRef"]);
    const ouiaProps = useOUIAProps(Button.displayName, ouiaId, ouiaSafe, variant);
    const Component = component;
    const isButtonElement = Component === 'button';
    const isInlineSpan = isInline && Component === 'span';
    const preventedEvents = inoperableEvents.reduce((handlers, eventToPrevent) => (Object.assign(Object.assign({}, handlers), { [eventToPrevent]: (event) => {
            event.preventDefault();
        } })), {});
    const getDefaultTabIdx = () => {
        if (isDisabled) {
            return isButtonElement ? null : -1;
        }
        else if (isAriaDisabled) {
            return null;
        }
        else if (isInlineSpan) {
            return 0;
        }
    };
    return (react.createElement(Component, Object.assign({}, props, (isAriaDisabled ? preventedEvents : null), { "aria-disabled": isDisabled || isAriaDisabled, "aria-label": ariaLabel, className: css(buttonStyles.button, buttonStyles.modifiers[variant], isBlock && buttonStyles.modifiers.block, isDisabled && buttonStyles.modifiers.disabled, isAriaDisabled && buttonStyles.modifiers.ariaDisabled, isActive && buttonStyles.modifiers.active, isInline && variant === ButtonVariant.link && buttonStyles.modifiers.inline, isDanger && (variant === ButtonVariant.secondary || variant === ButtonVariant.link) && buttonStyles.modifiers.danger, isLoading !== null && children !== null && buttonStyles.modifiers.progress, isLoading && buttonStyles.modifiers.inProgress, isSmall && buttonStyles.modifiers.small, isLarge && buttonStyles.modifiers.displayLg, className), disabled: isButtonElement ? isDisabled : null, tabIndex: tabIndex !== null ? tabIndex : getDefaultTabIdx(), type: isButtonElement || isInlineSpan ? type : null, role: isInlineSpan ? 'button' : null, ref: innerRef }, ouiaProps),
        isLoading && (react.createElement("span", { className: css(buttonStyles.buttonProgress) },
            react.createElement(Spinner, { size: spinnerSize.md, "aria-valuetext": spinnerAriaValueText, "aria-label": spinnerAriaLabel, "aria-labelledby": spinnerAriaLabelledBy }))),
        variant === ButtonVariant.plain && children === null && icon ? icon : null,
        variant !== ButtonVariant.plain && icon && iconPosition === 'left' && (react.createElement("span", { className: css(buttonStyles.buttonIcon, buttonStyles.modifiers.start) }, icon)),
        children,
        variant !== ButtonVariant.plain && icon && iconPosition === 'right' && (react.createElement("span", { className: css(buttonStyles.buttonIcon, buttonStyles.modifiers.end) }, icon))));
};
const Button = react.forwardRef((props, ref) => (react.createElement(ButtonBase, Object.assign({ innerRef: ref }, props))));
Button.displayName = 'Button';

import('./tooltip-2707f1ef.js');
var styles$2 = {
  modifiers: {
    top: "pf-m-top",
    topLeft: "pf-m-top-left",
    topRight: "pf-m-top-right",
    bottom: "pf-m-bottom",
    bottomLeft: "pf-m-bottom-left",
    bottomRight: "pf-m-bottom-right",
    left: "pf-m-left",
    leftTop: "pf-m-left-top",
    leftBottom: "pf-m-left-bottom",
    right: "pf-m-right",
    rightTop: "pf-m-right-top",
    rightBottom: "pf-m-right-bottom",
    textAlignLeft: "pf-m-text-align-left"
  },
  themeDark: "pf-theme-dark",
  tooltip: "pf-c-tooltip",
  tooltipArrow: "pf-c-tooltip__arrow",
  tooltipContent: "pf-c-tooltip__content"
};

const TooltipContent = (_a) => {
    var { className, children, isLeftAligned } = _a, props = __rest(_a, ["className", "children", "isLeftAligned"]);
    return (react.createElement("div", Object.assign({ className: css(styles$2.tooltipContent, isLeftAligned && styles$2.modifiers.textAlignLeft, className) }, props), children));
};
TooltipContent.displayName = 'TooltipContent';

const TooltipArrow = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return react.createElement("div", Object.assign({ className: css(styles$2.tooltipArrow, className) }, props));
};
TooltipArrow.displayName = 'TooltipArrow';

const c_tooltip_MaxWidth = {
  "name": "--pf-c-tooltip--MaxWidth",
  "value": "18.75rem",
  "var": "var(--pf-c-tooltip--MaxWidth)"
};

var TooltipPosition;
(function (TooltipPosition) {
    TooltipPosition["auto"] = "auto";
    TooltipPosition["top"] = "top";
    TooltipPosition["bottom"] = "bottom";
    TooltipPosition["left"] = "left";
    TooltipPosition["right"] = "right";
    TooltipPosition["topStart"] = "top-start";
    TooltipPosition["topEnd"] = "top-end";
    TooltipPosition["bottomStart"] = "bottom-start";
    TooltipPosition["bottomEnd"] = "bottom-end";
    TooltipPosition["leftStart"] = "left-start";
    TooltipPosition["leftEnd"] = "left-end";
    TooltipPosition["rightStart"] = "right-start";
    TooltipPosition["rightEnd"] = "right-end";
})(TooltipPosition || (TooltipPosition = {}));
// id for associating trigger with the content aria-describedby or aria-labelledby
let pfTooltipIdCounter = 1;
const Tooltip = (_a) => {
    var { content: bodyContent, position = 'top', trigger = 'mouseenter focus', isVisible = false, isContentLeftAligned = false, enableFlip = true, className = '', entryDelay = 300, exitDelay = 300, appendTo = () => document.body, zIndex = 9999, maxWidth = c_tooltip_MaxWidth.value, distance = 15, aria = 'describedby', 
    // For every initial starting position, there are 3 escape positions
    flipBehavior = ['top', 'right', 'bottom', 'left', 'top', 'right', 'bottom'], id = `pf-tooltip-${pfTooltipIdCounter++}`, children, animationDuration = 300, reference, 'aria-live': ariaLive = reference ? 'polite' : 'off', boundary, isAppLauncher, tippyProps } = _a, rest = __rest(_a, ["content", "position", "trigger", "isVisible", "isContentLeftAligned", "enableFlip", "className", "entryDelay", "exitDelay", "appendTo", "zIndex", "maxWidth", "distance", "aria", "flipBehavior", "id", "children", "animationDuration", "reference", 'aria-live', "boundary", "isAppLauncher", "tippyProps"]);
    const triggerOnMouseenter = trigger.includes('mouseenter');
    const triggerOnFocus = trigger.includes('focus');
    const triggerOnClick = trigger.includes('click');
    const triggerManually = trigger === 'manual';
    const [visible, setVisible] = react.useState(false);
    const [opacity, setOpacity] = react.useState(0);
    const transitionTimerRef = react.useRef(null);
    const showTimerRef = react.useRef(null);
    const hideTimerRef = react.useRef(null);
    const clearTimeouts = (timeoutRefs) => {
        timeoutRefs.forEach(ref => {
            if (ref.current) {
                clearTimeout(ref.current);
            }
        });
    };
    // Cancel all timers on unmount
    react.useEffect(() => () => {
        clearTimeouts([transitionTimerRef, hideTimerRef, showTimerRef]);
    }, []);
    const onDocumentKeyDown = (event) => {
        if (!triggerManually) {
            if (event.keyCode === KEY_CODES.ESCAPE_KEY && visible) {
                hide();
            }
        }
    };
    const onTriggerEnter = (event) => {
        if (event.keyCode === KEY_CODES.ENTER) {
            if (!visible) {
                show();
            }
            else {
                hide();
            }
        }
    };
    react.useEffect(() => {
        if (isVisible) {
            show();
        }
        else {
            hide();
        }
    }, [isVisible]);
    const show = () => {
        clearTimeouts([transitionTimerRef, hideTimerRef]);
        showTimerRef.current = setTimeout(() => {
            setVisible(true);
            setOpacity(1);
        }, entryDelay);
    };
    const hide = () => {
        clearTimeouts([showTimerRef]);
        hideTimerRef.current = setTimeout(() => {
            setOpacity(0);
            transitionTimerRef.current = setTimeout(() => setVisible(false), animationDuration);
        }, exitDelay);
    };
    const positionModifiers = {
        top: styles$2.modifiers.top,
        bottom: styles$2.modifiers.bottom,
        left: styles$2.modifiers.left,
        right: styles$2.modifiers.right,
        'top-start': styles$2.modifiers.topLeft,
        'top-end': styles$2.modifiers.topRight,
        'bottom-start': styles$2.modifiers.bottomLeft,
        'bottom-end': styles$2.modifiers.bottomRight,
        'left-start': styles$2.modifiers.leftTop,
        'left-end': styles$2.modifiers.leftBottom,
        'right-start': styles$2.modifiers.rightTop,
        'right-end': styles$2.modifiers.rightBottom
    };
    const hasCustomMaxWidth = maxWidth !== c_tooltip_MaxWidth.value;
    const content = (react.createElement("div", Object.assign({ "aria-live": ariaLive, className: css(styles$2.tooltip, className), role: "tooltip", id: id, style: {
            maxWidth: hasCustomMaxWidth ? maxWidth : null,
            opacity,
            transition: getOpacityTransition(animationDuration)
        } }, rest),
        react.createElement(TooltipArrow, null),
        react.createElement(TooltipContent, { isLeftAligned: isContentLeftAligned }, bodyContent)));
    const onDocumentClick = (event, triggerElement) => {
        // event.currentTarget = document
        // event.target could be triggerElement or something else
        {
            // hide on inside the toggle as well as on outside clicks
            if (visible) {
                hide();
            }
            else if (event.target === triggerElement) {
                show();
            }
        }
    };
    const addAriaToTrigger = () => {
        if (aria === 'describedby' && children && children.props && !children.props['aria-describedby']) {
            return react.cloneElement(children, { 'aria-describedby': id });
        }
        else if (aria === 'labelledby' && children.props && !children.props['aria-labelledby']) {
            return react.cloneElement(children, { 'aria-labelledby': id });
        }
        return children;
    };
    return (react.createElement(Popper, { trigger: aria !== 'none' && visible ? addAriaToTrigger() : children, reference: reference, popper: content, popperMatchesTriggerWidth: false, appendTo: appendTo, isVisible: visible, positionModifiers: positionModifiers, distance: distance, placement: position, onMouseEnter: triggerOnMouseenter && show, onMouseLeave: triggerOnMouseenter && hide, onPopperMouseEnter: triggerOnMouseenter && show, onPopperMouseLeave: triggerOnMouseenter && hide, onFocus: triggerOnFocus && show, onBlur: triggerOnFocus && hide, onDocumentClick: triggerOnClick && onDocumentClick, onDocumentKeyDown: triggerManually ? null : onDocumentKeyDown, onTriggerEnter: triggerManually ? null : onTriggerEnter, enableFlip: enableFlip, zIndex: zIndex, flipBehavior: flipBehavior }));
};
Tooltip.displayName = 'Tooltip';

import('./popover-80bf7f2b.js');
var styles$3 = {
  button: "pf-c-button",
  modifiers: {
    noPadding: "pf-m-no-padding",
    widthAuto: "pf-m-width-auto",
    top: "pf-m-top",
    topLeft: "pf-m-top-left",
    topRight: "pf-m-top-right",
    bottom: "pf-m-bottom",
    bottomLeft: "pf-m-bottom-left",
    bottomRight: "pf-m-bottom-right",
    left: "pf-m-left",
    leftTop: "pf-m-left-top",
    leftBottom: "pf-m-left-bottom",
    right: "pf-m-right",
    rightTop: "pf-m-right-top",
    rightBottom: "pf-m-right-bottom",
    danger: "pf-m-danger",
    warning: "pf-m-warning",
    success: "pf-m-success",
    default: "pf-m-default",
    info: "pf-m-info",
    icon: "pf-m-icon"
  },
  popover: "pf-c-popover",
  popoverArrow: "pf-c-popover__arrow",
  popoverBody: "pf-c-popover__body",
  popoverContent: "pf-c-popover__content",
  popoverFooter: "pf-c-popover__footer",
  popoverTitle: "pf-c-popover__title",
  popoverTitleIcon: "pf-c-popover__title-icon",
  popoverTitleText: "pf-c-popover__title-text",
  themeDark: "pf-theme-dark",
  title: "pf-c-title"
};

const PopoverContext = react.createContext({});

const PopoverContent = (_a) => {
    var { className = null, children } = _a, props = __rest(_a, ["className", "children"]);
    return (react.createElement("div", Object.assign({ className: css(styles$3.popoverContent, className) }, props), children));
};
PopoverContent.displayName = 'PopoverContent';

const PopoverBody = (_a) => {
    var { children, id, className } = _a, props = __rest(_a, ["children", "id", "className"]);
    return (react.createElement("div", Object.assign({ className: css(styles$3.popoverBody, className), id: id }, props), children));
};
PopoverBody.displayName = 'PopoverBody';

const PopoverHeaderIcon = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("span", Object.assign({ className: css(styles$3.popoverTitleIcon, className) }, props), children));
};
PopoverHeaderIcon.displayName = 'PopoverHeaderIcon';

const PopoverHeaderText = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("span", Object.assign({ className: css(styles$3.popoverTitleText, className) }, props), children));
};
PopoverHeaderText.displayName = 'PopoverHeaderText';

const PopoverHeader = (_a) => {
    var { children, icon, className, titleHeadingLevel = 'h6', alertSeverityVariant, id, alertSeverityScreenReaderText } = _a, props = __rest(_a, ["children", "icon", "className", "titleHeadingLevel", "alertSeverityVariant", "id", "alertSeverityScreenReaderText"]);
    const HeadingLevel = titleHeadingLevel;
    return icon || alertSeverityVariant ? (react.createElement("header", Object.assign({ className: css('pf-c-popover__header', className), id: id }, props),
        react.createElement(HeadingLevel, { className: css(styles$3.popoverTitle, icon && styles$3.modifiers.icon) },
            icon && react.createElement(PopoverHeaderIcon, null, icon),
            alertSeverityVariant && alertSeverityScreenReaderText && (react.createElement("span", { className: "pf-u-screen-reader" }, alertSeverityScreenReaderText)),
            react.createElement(PopoverHeaderText, null, children)))) : (react.createElement(Title, Object.assign({ headingLevel: titleHeadingLevel, size: TitleSizes.md, id: id, className: className }, props), children));
};
PopoverHeader.displayName = 'PopoverHeader';

const PopoverFooter = (_a) => {
    var { children, className = '' } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("footer", Object.assign({ className: css(styles$3.popoverFooter, className) }, props), children));
};
PopoverFooter.displayName = 'PopoverFooter';

const PopoverCloseButton = (_a) => {
    var { onClose = () => undefined } = _a, props = __rest(_a, ["onClose"]);
    const [closeButtonElement, setCloseButtonElement] = react.useState(null);
    react.useEffect(() => {
        closeButtonElement && closeButtonElement.addEventListener('click', onClose, false);
        return () => {
            closeButtonElement && closeButtonElement.removeEventListener('click', onClose, false);
        };
    }, [closeButtonElement]);
    return (react.createElement(FindRefWrapper, { onFoundRef: (foundRef) => setCloseButtonElement(foundRef) },
        react.createElement(Button, Object.assign({ variant: "plain", "aria-label": true }, props, { style: { pointerEvents: 'auto' } }),
            react.createElement(TimesIcon, null))));
};
PopoverCloseButton.displayName = 'PopoverCloseButton';

const PopoverArrow = (_a) => {
    var { className = '' } = _a, props = __rest(_a, ["className"]);
    return react.createElement("div", Object.assign({ className: css(styles$3.popoverArrow, className) }, props));
};
PopoverArrow.displayName = 'PopoverArrow';

const c_popover_MaxWidth = {
  "name": "--pf-c-popover--MaxWidth",
  "value": "none",
  "var": "var(--pf-c-popover--MaxWidth)"
};

const c_popover_MinWidth = {
  "name": "--pf-c-popover--MinWidth",
  "value": "auto",
  "var": "var(--pf-c-popover--MinWidth)"
};

var PopoverPosition;
(function (PopoverPosition) {
    PopoverPosition["auto"] = "auto";
    PopoverPosition["top"] = "top";
    PopoverPosition["bottom"] = "bottom";
    PopoverPosition["left"] = "left";
    PopoverPosition["right"] = "right";
    PopoverPosition["topStart"] = "top-start";
    PopoverPosition["topEnd"] = "top-end";
    PopoverPosition["bottomStart"] = "bottom-start";
    PopoverPosition["bottomEnd"] = "bottom-end";
    PopoverPosition["leftStart"] = "left-start";
    PopoverPosition["leftEnd"] = "left-end";
    PopoverPosition["rightStart"] = "right-start";
    PopoverPosition["rightEnd"] = "right-end";
})(PopoverPosition || (PopoverPosition = {}));
const alertStyle = {
    default: styles$3.modifiers.default,
    info: styles$3.modifiers.info,
    success: styles$3.modifiers.success,
    warning: styles$3.modifiers.warning,
    danger: styles$3.modifiers.danger
};
const Popover = (_a) => {
    var { children, position = 'top', enableFlip = true, className = '', isVisible = null, shouldClose = () => null, shouldOpen = () => null, 'aria-label': ariaLabel = '', bodyContent, headerContent = null, headerComponent = 'h6', headerIcon = null, alertSeverityVariant, alertSeverityScreenReaderText, footerContent = null, appendTo = () => document.body, hideOnOutsideClick = true, onHide = () => null, onHidden = () => null, onShow = () => null, onShown = () => null, onMount = () => null, zIndex = 9999, minWidth = c_popover_MinWidth && c_popover_MinWidth.value, maxWidth = c_popover_MaxWidth && c_popover_MaxWidth.value, closeBtnAriaLabel = 'Close', showClose = true, distance = 25, 
    // For every initial starting position, there are 3 escape positions
    flipBehavior = ['top', 'right', 'bottom', 'left', 'top', 'right', 'bottom'], animationDuration = 300, id, withFocusTrap: propWithFocusTrap, boundary, tippyProps, reference, hasNoPadding = false, hasAutoWidth = false } = _a, rest = __rest(_a, ["children", "position", "enableFlip", "className", "isVisible", "shouldClose", "shouldOpen", 'aria-label', "bodyContent", "headerContent", "headerComponent", "headerIcon", "alertSeverityVariant", "alertSeverityScreenReaderText", "footerContent", "appendTo", "hideOnOutsideClick", "onHide", "onHidden", "onShow", "onShown", "onMount", "zIndex", "minWidth", "maxWidth", "closeBtnAriaLabel", "showClose", "distance", "flipBehavior", "animationDuration", "id", "withFocusTrap", "boundary", "tippyProps", "reference", "hasNoPadding", "hasAutoWidth"]);
    // could make this a prop in the future (true | false | 'toggle')
    // const hideOnClick = true;
    const uniqueId = id || getUniqueId();
    const triggerManually = isVisible !== null;
    const [visible, setVisible] = react.useState(false);
    const [opacity, setOpacity] = react.useState(0);
    const [focusTrapActive, setFocusTrapActive] = react.useState(Boolean(propWithFocusTrap));
    const transitionTimerRef = react.useRef(null);
    const showTimerRef = react.useRef(null);
    const hideTimerRef = react.useRef(null);
    react.useEffect(() => {
        onMount();
    }, []);
    react.useEffect(() => {
        if (triggerManually) {
            if (isVisible) {
                show();
            }
            else {
                hide();
            }
        }
    }, [isVisible, triggerManually]);
    const show = (withFocusTrap) => {
        onShow();
        if (transitionTimerRef.current) {
            clearTimeout(transitionTimerRef.current);
        }
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
        }
        showTimerRef.current = setTimeout(() => {
            setVisible(true);
            setOpacity(1);
            propWithFocusTrap !== false && withFocusTrap && setFocusTrapActive(true);
            onShown();
        }, 0);
    };
    const hide = () => {
        onHide();
        if (showTimerRef.current) {
            clearTimeout(showTimerRef.current);
        }
        hideTimerRef.current = setTimeout(() => {
            setVisible(false);
            setOpacity(0);
            setFocusTrapActive(false);
            transitionTimerRef.current = setTimeout(() => {
                onHidden();
            }, animationDuration);
        }, 0);
    };
    const positionModifiers = {
        top: styles$3.modifiers.top,
        bottom: styles$3.modifiers.bottom,
        left: styles$3.modifiers.left,
        right: styles$3.modifiers.right,
        'top-start': styles$3.modifiers.topLeft,
        'top-end': styles$3.modifiers.topRight,
        'bottom-start': styles$3.modifiers.bottomLeft,
        'bottom-end': styles$3.modifiers.bottomRight,
        'left-start': styles$3.modifiers.leftTop,
        'left-end': styles$3.modifiers.leftBottom,
        'right-start': styles$3.modifiers.rightTop,
        'right-end': styles$3.modifiers.rightBottom
    };
    const hasCustomMinWidth = minWidth !== c_popover_MinWidth.value;
    const hasCustomMaxWidth = maxWidth !== c_popover_MaxWidth.value;
    const onDocumentKeyDown = (event) => {
        if (event.key === KeyTypes.Escape && visible) {
            if (triggerManually) {
                shouldClose(null, hide, event);
            }
            else {
                hide();
            }
        }
    };
    const onDocumentClick = (event, triggerElement, popperElement) => {
        if (hideOnOutsideClick && visible) {
            // check if we clicked within the popper, if so don't do anything
            const isChild = popperElement && popperElement.contains(event.target);
            if (isChild) {
                // clicked within the popper
                return;
            }
            if (triggerManually) {
                shouldClose(null, hide, event);
            }
            else {
                hide();
            }
        }
    };
    const onTriggerClick = (event) => {
        if (triggerManually) {
            if (visible) {
                shouldClose(null, hide, event);
            }
            else {
                shouldOpen(show, event);
            }
        }
        else {
            if (visible) {
                hide();
            }
            else {
                show(true);
            }
        }
    };
    const onContentMouseDown = () => {
        if (focusTrapActive) {
            setFocusTrapActive(false);
        }
    };
    const closePopover = (event) => {
        event.stopPropagation();
        if (triggerManually) {
            shouldClose(null, hide, event);
        }
        else {
            hide();
        }
    };
    const content = (react.createElement(FocusTrap, Object.assign({ active: focusTrapActive, focusTrapOptions: {
            returnFocusOnDeactivate: true,
            clickOutsideDeactivates: true,
            tabbableOptions: { displayCheck: 'none' },
            fallbackFocus: () => {
                // If the popover's trigger is focused but scrolled out of view,
                // FocusTrap will throw an error when the Enter button is used on the trigger.
                // That is because the Popover is hidden when its trigger is out of view.
                // Provide a fallback in that case.
                let node = null;
                if (document && document.activeElement) {
                    node = document.activeElement;
                }
                return node;
            }
        }, preventScrollOnDeactivate: true, className: css(styles$3.popover, alertSeverityVariant && alertStyle[alertSeverityVariant], hasNoPadding && styles$3.modifiers.noPadding, hasAutoWidth && styles$3.modifiers.widthAuto, className), role: "dialog", "aria-modal": "true", "aria-label": headerContent ? undefined : ariaLabel, "aria-labelledby": headerContent ? `popover-${uniqueId}-header` : undefined, "aria-describedby": `popover-${uniqueId}-body`, onMouseDown: onContentMouseDown, style: {
            minWidth: hasCustomMinWidth ? minWidth : null,
            maxWidth: hasCustomMaxWidth ? maxWidth : null,
            opacity,
            transition: getOpacityTransition(animationDuration)
        } }, rest),
        react.createElement(PopoverArrow, null),
        react.createElement(PopoverContent, null,
            showClose && react.createElement(PopoverCloseButton, { onClose: closePopover, "aria-label": closeBtnAriaLabel }),
            headerContent && (react.createElement(PopoverHeader, { id: `popover-${uniqueId}-header`, icon: headerIcon, alertSeverityVariant: alertSeverityVariant, alertSeverityScreenReaderText: alertSeverityScreenReaderText || `${alertSeverityVariant} alert:`, titleHeadingLevel: headerComponent }, typeof headerContent === 'function' ? headerContent(hide) : headerContent)),
            react.createElement(PopoverBody, { id: `popover-${uniqueId}-body` }, typeof bodyContent === 'function' ? bodyContent(hide) : bodyContent),
            footerContent && (react.createElement(PopoverFooter, { id: `popover-${uniqueId}-footer` }, typeof footerContent === 'function' ? footerContent(hide) : footerContent)))));
    return (react.createElement(PopoverContext.Provider, { value: { headerComponent } },
        react.createElement(Popper, { trigger: children, reference: reference, popper: content, popperMatchesTriggerWidth: false, appendTo: appendTo, isVisible: visible, positionModifiers: positionModifiers, distance: distance, placement: position, onTriggerClick: onTriggerClick, onDocumentClick: onDocumentClick, onDocumentKeyDown: onDocumentKeyDown, enableFlip: enableFlip, zIndex: zIndex, flipBehavior: flipBehavior })));
};
Popover.displayName = 'Popover';

import('./empty-state-a3435ce6.js');
var styles$4 = {
  button: "pf-c-button",
  emptyState: "pf-c-empty-state",
  emptyStateBody: "pf-c-empty-state__body",
  emptyStateContent: "pf-c-empty-state__content",
  emptyStateIcon: "pf-c-empty-state__icon",
  emptyStatePrimary: "pf-c-empty-state__primary",
  emptyStateSecondary: "pf-c-empty-state__secondary",
  modifiers: {
    xs: "pf-m-xs",
    sm: "pf-m-sm",
    lg: "pf-m-lg",
    xl: "pf-m-xl",
    fullHeight: "pf-m-full-height",
    primary: "pf-m-primary",
    overpassFont: "pf-m-overpass-font"
  },
  title: "pf-c-title"
};

var EmptyStateVariant;
(function (EmptyStateVariant) {
    EmptyStateVariant["xs"] = "xs";
    EmptyStateVariant["small"] = "small";
    EmptyStateVariant["large"] = "large";
    EmptyStateVariant["xl"] = "xl";
    EmptyStateVariant["full"] = "full";
})(EmptyStateVariant || (EmptyStateVariant = {}));
const EmptyState = (_a) => {
    var { children, className = '', variant = EmptyStateVariant.full, isFullHeight } = _a, props = __rest(_a, ["children", "className", "variant", "isFullHeight"]);
    return (react.createElement("div", Object.assign({ className: css(styles$4.emptyState, variant === 'xs' && styles$4.modifiers.xs, variant === 'small' && styles$4.modifiers.sm, variant === 'large' && styles$4.modifiers.lg, variant === 'xl' && styles$4.modifiers.xl, isFullHeight && styles$4.modifiers.fullHeight, className) }, props),
        react.createElement("div", { className: css(styles$4.emptyStateContent) }, children)));
};
EmptyState.displayName = 'EmptyState';

export { Button as B, EmptyState as E, FocusTrap as F, KeyTypes as K, Popover as P, Spinner as S, Title as T, ValidatedOptions as V, EmptyStateVariant as a, Tooltip as b, ButtonVariant as c, buttonStyles as d, getOUIAProps as e, getDefaultOUIAId as f, getResizeObserver as g, Popper as h, PopoverPosition as i, KEY_CODES as j, spinnerSize as k, useIsomorphicLayoutEffect as l, TitleSizes as m, useOUIAId as n, KEYHANDLER_DIRECTION as o, styles$4 as s, useOUIAProps as u };
