import { c as createCommonjsModule, g as getDefaultExportFromCjs } from './common/_commonjsHelpers-4f955397.js';
import { a as arrayLikeToArray, u as unsupportedIterableToArray } from './common/unsupportedIterableToArray-3e478519.js';
import { r as react } from './common/index-7cda8b13.js';
import { l as useLocation, m as matchPath } from './common/react-router-9cbc9355.js';
import './common/inheritsLoose-978d85dc.js';
import './common/setPrototypeOf-adc775f4.js';
import './common/index-a264b8f3.js';

var arrayWithoutHoles = createCommonjsModule(function (module) {
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var iterableToArray = createCommonjsModule(function (module) {
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var nonIterableSpread = createCommonjsModule(function (module) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var toConsumableArray = createCommonjsModule(function (module) {
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _toConsumableArray = /*@__PURE__*/getDefaultExportFromCjs(toConsumableArray);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var DEFAULT_MATCH_OPTIONS = {
  exact: true
};
var NO_BREADCRUMB = 'NO_BREADCRUMB';

var humanize = function humanize(str) {
  return str.replace(/^[\s_]+|[\s_]+$/g, '').replace(/[_\s]+/g, ' ').replace(/^[a-z]/, function (m) {
    return m.toUpperCase();
  });
};

var render = function render(_ref) {
  var Breadcrumb = _ref.breadcrumb,
      match = _ref.match,
      location = _ref.location,
      props = _ref.props;
  var componentProps = Object.assign({
    match: match,
    location: location,
    key: match.url
  }, props || {});
  return Object.assign(Object.assign({}, componentProps), {
    breadcrumb: typeof Breadcrumb === 'string' ? /*#__PURE__*/react.createElement('span', {
      key: componentProps.key
    }, Breadcrumb) : /*#__PURE__*/react.createElement(Breadcrumb, Object.assign({}, componentProps))
  });
};

var getDefaultBreadcrumb = function getDefaultBreadcrumb(_ref2) {
  var currentSection = _ref2.currentSection,
      location = _ref2.location,
      pathSection = _ref2.pathSection;
  var match = matchPath(pathSection, Object.assign(Object.assign({}, DEFAULT_MATCH_OPTIONS), {
    path: pathSection
  })) || {
    url: 'not-found'
  };
  return render({
    breadcrumb: humanize(currentSection),
    match: match,
    location: location
  });
};

var getBreadcrumbMatch = function getBreadcrumbMatch(_ref3) {
  var currentSection = _ref3.currentSection,
      disableDefaults = _ref3.disableDefaults,
      excludePaths = _ref3.excludePaths,
      location = _ref3.location,
      pathSection = _ref3.pathSection,
      routes = _ref3.routes;
  var breadcrumb;

  var getIsPathExcluded = function getIsPathExcluded(path) {
    return matchPath(pathSection, {
      path: path,
      exact: true,
      strict: false
    }) != null;
  };

  if (excludePaths && excludePaths.some(getIsPathExcluded)) {
    return NO_BREADCRUMB;
  }

  routes.some(function (_a) {
    var userProvidedBreadcrumb = _a.breadcrumb,
        matchOptions = _a.matchOptions,
        path = _a.path,
        rest = __rest(_a, ["breadcrumb", "matchOptions", "path"]);

    if (!path) {
      throw new Error('useBreadcrumbs: `path` must be provided in every route object');
    }

    var match = matchPath(pathSection, Object.assign(Object.assign({}, matchOptions || DEFAULT_MATCH_OPTIONS), {
      path: path
    }));

    if (match && userProvidedBreadcrumb === null || !match && matchOptions) {
      breadcrumb = NO_BREADCRUMB;
      return true;
    }

    if (match) {
      if (!userProvidedBreadcrumb && disableDefaults) {
        breadcrumb = NO_BREADCRUMB;
        return true;
      }

      breadcrumb = render(Object.assign({
        breadcrumb: userProvidedBreadcrumb || humanize(currentSection),
        match: match,
        location: location
      }, rest));
      return true;
    }

    return false;
  });

  if (breadcrumb) {
    return breadcrumb;
  }

  if (disableDefaults) {
    return NO_BREADCRUMB;
  }

  return getDefaultBreadcrumb({
    pathSection: pathSection,
    currentSection: pathSection === '/' ? 'Home' : currentSection,
    location: location
  });
};

var getBreadcrumbs = function getBreadcrumbs(_ref4) {
  var routes = _ref4.routes,
      location = _ref4.location,
      _ref4$options = _ref4.options,
      options = _ref4$options === void 0 ? {} : _ref4$options;
  var matches = [];
  var pathname = location.pathname;
  pathname.split('?')[0].split('/').reduce(function (previousSection, currentSection, index) {
    var pathSection = !currentSection ? '/' : "".concat(previousSection, "/").concat(currentSection);

    if (pathSection === '/' && index !== 0) {
      return '';
    }

    var breadcrumb = getBreadcrumbMatch(Object.assign({
      currentSection: currentSection,
      location: location,
      pathSection: pathSection,
      routes: routes
    }, options));

    if (breadcrumb !== NO_BREADCRUMB) {
      matches.push(breadcrumb);
    }

    return pathSection === '/' ? '' : pathSection;
  }, '');
  return matches;
};

var flattenRoutes = function flattenRoutes(routes) {
  return routes.reduce(function (arr, route) {
    if (route.routes) {
      return arr.concat([route].concat(_toConsumableArray(flattenRoutes(route.routes))));
    }

    return arr.concat(route);
  }, []);
};

var useReactRouterBreadcrumbs = function useReactRouterBreadcrumbs(routes, options) {
  return getBreadcrumbs({
    routes: flattenRoutes(routes || []),
    location: useLocation(),
    options: options
  });
};

export default useReactRouterBreadcrumbs;
