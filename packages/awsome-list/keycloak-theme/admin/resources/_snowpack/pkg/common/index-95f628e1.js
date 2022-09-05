import { c as createIcon } from './times-icon-8cdcb920.js';
import { _ as __rest, a as __awaiter, b as __generator, c as __spread } from './tslib.es6-e6488692.js';
import { r as react } from './index-7cda8b13.js';
import { c as css } from './util-badff3ce.js';
import { s as styles } from './EmptyState-25333d4a.js';
import { p as propTypes } from './index-a264b8f3.js';
import { c as createCommonjsModule, g as getDefaultExportFromCjs } from './_commonjsHelpers-4f955397.js';

const CopyIconConfig = {
  name: 'CopyIcon',
  height: 512,
  width: 448,
  svgPath: 'M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z',
  yOffset: 0,
  xOffset: 0,
};

const CopyIcon = createIcon(CopyIconConfig);

const EmptyStateBody = (_a) => {
    var { children, className = '' } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("div", Object.assign({ className: css(styles.emptyStateBody, className) }, props), children));
};
EmptyStateBody.displayName = 'EmptyStateBody';

const EmptyStateIcon = (_a) => {
    var { className = '', icon: IconComponent, component: AnyComponent, variant = 'icon' } = _a, props = __rest(_a, ["className", "icon", "component", "variant"]);
    const classNames = css(styles.emptyStateIcon, className);
    return variant === 'icon' ? (react.createElement(IconComponent, Object.assign({ className: classNames }, props, { "aria-hidden": "true" }))) : (react.createElement("div", { className: classNames },
        react.createElement(AnyComponent, null)));
};
EmptyStateIcon.displayName = 'EmptyStateIcon';

const EmptyStateSecondaryActions = (_a) => {
    var { children = null, className = '' } = _a, props = __rest(_a, ["children", "className"]);
    return (react.createElement("div", Object.assign({ className: css(styles.emptyStateSecondary, className) }, props), children));
};
EmptyStateSecondaryActions.displayName = 'EmptyStateSecondaryActions';

var COMMON_MIME_TYPES = new Map([
    ['avi', 'video/avi'],
    ['gif', 'image/gif'],
    ['ico', 'image/x-icon'],
    ['jpeg', 'image/jpeg'],
    ['jpg', 'image/jpeg'],
    ['mkv', 'video/x-matroska'],
    ['mov', 'video/quicktime'],
    ['mp4', 'video/mp4'],
    ['pdf', 'application/pdf'],
    ['png', 'image/png'],
    ['zip', 'application/zip'],
    ['doc', 'application/msword'],
    ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
]);
function toFileWithPath(file, path) {
    var f = withMimeType(file);
    if (typeof f.path !== 'string') { // on electron, path is already set to the absolute path
        var webkitRelativePath = file.webkitRelativePath;
        Object.defineProperty(f, 'path', {
            value: typeof path === 'string'
                ? path
                // If <input webkitdirectory> is set,
                // the File will have a {webkitRelativePath} property
                // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
                : typeof webkitRelativePath === 'string' && webkitRelativePath.length > 0
                    ? webkitRelativePath
                    : file.name,
            writable: false,
            configurable: false,
            enumerable: true
        });
    }
    return f;
}
function withMimeType(file) {
    var name = file.name;
    var hasExtension = name && name.lastIndexOf('.') !== -1;
    if (hasExtension && !file.type) {
        var ext = name.split('.')
            .pop().toLowerCase();
        var type = COMMON_MIME_TYPES.get(ext);
        if (type) {
            Object.defineProperty(file, 'type', {
                value: type,
                writable: false,
                configurable: false,
                enumerable: true
            });
        }
    }
    return file;
}

var FILES_TO_IGNORE = [
    // Thumbnail cache files for macOS and Windows
    '.DS_Store',
    'Thumbs.db' // Windows
];
/**
 * Convert a DragEvent's DataTrasfer object to a list of File objects
 * NOTE: If some of the items are folders,
 * everything will be flattened and placed in the same list but the paths will be kept as a {path} property.
 * @param evt
 */
function fromEvent(evt) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, isDragEvt(evt) && evt.dataTransfer
                    ? getDataTransferFiles(evt.dataTransfer, evt.type)
                    : getInputFiles(evt)];
        });
    });
}
function isDragEvt(value) {
    return !!value.dataTransfer;
}
function getInputFiles(evt) {
    var files = isInput(evt.target)
        ? evt.target.files
            ? fromList(evt.target.files)
            : []
        : [];
    return files.map(function (file) { return toFileWithPath(file); });
}
function isInput(value) {
    return value !== null;
}
function getDataTransferFiles(dt, type) {
    return __awaiter(this, void 0, void 0, function () {
        var items, files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dt.items) return [3 /*break*/, 2];
                    items = fromList(dt.items)
                        .filter(function (item) { return item.kind === 'file'; });
                    // According to https://html.spec.whatwg.org/multipage/dnd.html#dndevents,
                    // only 'dragstart' and 'drop' has access to the data (source node)
                    if (type !== 'drop') {
                        return [2 /*return*/, items];
                    }
                    return [4 /*yield*/, Promise.all(items.map(toFilePromises))];
                case 1:
                    files = _a.sent();
                    return [2 /*return*/, noIgnoredFiles(flatten(files))];
                case 2: return [2 /*return*/, noIgnoredFiles(fromList(dt.files)
                        .map(function (file) { return toFileWithPath(file); }))];
            }
        });
    });
}
function noIgnoredFiles(files) {
    return files.filter(function (file) { return FILES_TO_IGNORE.indexOf(file.name) === -1; });
}
// IE11 does not support Array.from()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Browser_compatibility
// https://developer.mozilla.org/en-US/docs/Web/API/FileList
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList
function fromList(items) {
    var files = [];
    // tslint:disable: prefer-for-of
    for (var i = 0; i < items.length; i++) {
        var file = items[i];
        files.push(file);
    }
    return files;
}
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem
function toFilePromises(item) {
    if (typeof item.webkitGetAsEntry !== 'function') {
        return fromDataTransferItem(item);
    }
    var entry = item.webkitGetAsEntry();
    // Safari supports dropping an image node from a different window and can be retrieved using
    // the DataTransferItem.getAsFile() API
    // NOTE: FileSystemEntry.file() throws if trying to get the file
    if (entry && entry.isDirectory) {
        return fromDirEntry(entry);
    }
    return fromDataTransferItem(item);
}
function flatten(items) {
    return items.reduce(function (acc, files) { return __spread(acc, (Array.isArray(files) ? flatten(files) : [files])); }, []);
}
function fromDataTransferItem(item) {
    var file = item.getAsFile();
    if (!file) {
        return Promise.reject(item + " is not a File");
    }
    var fwp = toFileWithPath(file);
    return Promise.resolve(fwp);
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry
function fromEntry(entry) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, entry.isDirectory ? fromDirEntry(entry) : fromFileEntry(entry)];
        });
    });
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry
function fromDirEntry(entry) {
    var reader = entry.createReader();
    return new Promise(function (resolve, reject) {
        var entries = [];
        function readEntries() {
            var _this = this;
            // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry/createReader
            // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryReader/readEntries
            reader.readEntries(function (batch) { return __awaiter(_this, void 0, void 0, function () {
                var files, err_1, items;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!batch.length) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, Promise.all(entries)];
                        case 2:
                            files = _a.sent();
                            resolve(files);
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            reject(err_1);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            items = Promise.all(batch.map(fromEntry));
                            entries.push(items);
                            // Continue reading
                            readEntries();
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); }, function (err) {
                reject(err);
            });
        }
        readEntries();
    });
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileEntry
function fromFileEntry(entry) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    entry.file(function (file) {
                        var fwp = toFileWithPath(file, entry.fullPath);
                        resolve(fwp);
                    }, function (err) {
                        reject(err);
                    });
                })];
        });
    });
}

var dist = createCommonjsModule(function (module) {
module.exports=function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var r={};return n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:e});},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=13)}([function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r);},function(t,n){t.exports=function(t){return "object"==typeof t?null!==t:"function"==typeof t};},function(t,n){var r=t.exports={version:"2.5.0"};"number"==typeof __e&&(__e=r);},function(t,n,r){t.exports=!r(4)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a});},function(t,n){t.exports=function(t){try{return !!t()}catch(t){return !0}};},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)};},function(t,n,r){var e=r(32)("wks"),o=r(9),i=r(0).Symbol,u="function"==typeof i;(t.exports=function(t){return e[t]||(e[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=e;},function(t,n,r){var e=r(0),o=r(2),i=r(8),u=r(22),c=r(10),f=function(t,n,r){var a,s,p,l,v=t&f.F,y=t&f.G,h=t&f.S,d=t&f.P,x=t&f.B,g=y?e:h?e[n]||(e[n]={}):(e[n]||{}).prototype,m=y?o:o[n]||(o[n]={}),b=m.prototype||(m.prototype={});y&&(r=n);for(a in r)s=!v&&g&&void 0!==g[a],p=(s?g:r)[a],l=x&&s?c(p,e):d&&"function"==typeof p?c(Function.call,p):p,g&&u(g,a,p,t&f.U),m[a]!=p&&i(m,a,l),d&&b[a]!=p&&(b[a]=p);};e.core=o,f.F=1,f.G=2,f.S=4,f.P=8,f.B=16,f.W=32,f.U=64,f.R=128,t.exports=f;},function(t,n,r){var e=r(16),o=r(21);t.exports=r(3)?function(t,n,r){return e.f(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t};},function(t,n){var r=0,e=Math.random();t.exports=function(t){return "Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))};},function(t,n,r){var e=r(24);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}};},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t};},function(t,n,r){var e=r(28),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0};},function(t,n,r){n.__esModule=!0,n.default=function(t,n){if(t&&n){var r=Array.isArray(n)?n:n.split(","),e=t.name||"",o=t.type||"",i=o.replace(/\/.*$/,"");return r.some(function(t){var n=t.trim();return "."===n.charAt(0)?e.toLowerCase().endsWith(n.toLowerCase()):n.endsWith("/*")?i===n.replace(/\/.*$/,""):o===n})}return !0},r(14),r(34);},function(t,n,r){r(15),t.exports=r(2).Array.some;},function(t,n,r){var e=r(7),o=r(25)(3);e(e.P+e.F*!r(33)([].some,!0),"Array",{some:function(t){return o(this,t,arguments[1])}});},function(t,n,r){var e=r(17),o=r(18),i=r(20),u=Object.defineProperty;n.f=r(3)?Object.defineProperty:function(t,n,r){if(e(t),n=i(n,!0),e(r),o)try{return u(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return "value"in r&&(t[n]=r.value),t};},function(t,n,r){var e=r(1);t.exports=function(t){if(!e(t))throw TypeError(t+" is not an object!");return t};},function(t,n,r){t.exports=!r(3)&&!r(4)(function(){return 7!=Object.defineProperty(r(19)("div"),"a",{get:function(){return 7}}).a});},function(t,n,r){var e=r(1),o=r(0).document,i=e(o)&&e(o.createElement);t.exports=function(t){return i?o.createElement(t):{}};},function(t,n,r){var e=r(1);t.exports=function(t,n){if(!e(t))return t;var r,o;if(n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!e(o=r.call(t)))return o;if(!n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")};},function(t,n){t.exports=function(t,n){return {enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}};},function(t,n,r){var e=r(0),o=r(8),i=r(23),u=r(9)("src"),c=Function.toString,f=(""+c).split("toString");r(2).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,r,c){var a="function"==typeof r;a&&(i(r,"name")||o(r,"name",n)),t[n]!==r&&(a&&(i(r,u)||o(r,u,t[n]?""+t[n]:f.join(String(n)))),t===e?t[n]=r:c?t[n]?t[n]=r:o(t,n,r):(delete t[n],o(t,n,r)));})(Function.prototype,"toString",function(){return "function"==typeof this&&this[u]||c.call(this)});},function(t,n){var r={}.hasOwnProperty;t.exports=function(t,n){return r.call(t,n)};},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t};},function(t,n,r){var e=r(10),o=r(26),i=r(27),u=r(12),c=r(29);t.exports=function(t,n){var r=1==t,f=2==t,a=3==t,s=4==t,p=6==t,l=5==t||p,v=n||c;return function(n,c,y){for(var h,d,x=i(n),g=o(x),m=e(c,y,3),b=u(g.length),_=0,w=r?v(n,b):f?v(n,0):void 0;b>_;_++)if((l||_ in g)&&(h=g[_],d=m(h,_,x),t))if(r)w[_]=d;else if(d)switch(t){case 3:return !0;case 5:return h;case 6:return _;case 2:w.push(h);}else if(s)return !1;return p?-1:a||s?s:w}};},function(t,n,r){var e=r(5);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return "String"==e(t)?t.split(""):Object(t)};},function(t,n,r){var e=r(11);t.exports=function(t){return Object(e(t))};},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)};},function(t,n,r){var e=r(30);t.exports=function(t,n){return new(e(t))(n)};},function(t,n,r){var e=r(1),o=r(31),i=r(6)("species");t.exports=function(t){var n;return o(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)||(n=void 0),e(n)&&null===(n=n[i])&&(n=void 0)),void 0===n?Array:n};},function(t,n,r){var e=r(5);t.exports=Array.isArray||function(t){return "Array"==e(t)};},function(t,n,r){var e=r(0),o=e["__core-js_shared__"]||(e["__core-js_shared__"]={});t.exports=function(t){return o[t]||(o[t]={})};},function(t,n,r){var e=r(4);t.exports=function(t,n){return !!t&&e(function(){n?t.call(null,function(){},1):t.call(null);})};},function(t,n,r){r(35),t.exports=r(2).String.endsWith;},function(t,n,r){var e=r(7),o=r(12),i=r(36),u="".endsWith;e(e.P+e.F*r(38)("endsWith"),"String",{endsWith:function(t){var n=i(this,t,"endsWith"),r=arguments.length>1?arguments[1]:void 0,e=o(n.length),c=void 0===r?e:Math.min(o(r),e),f=String(t);return u?u.call(n,f,c):n.slice(c-f.length,c)===f}});},function(t,n,r){var e=r(37),o=r(11);t.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(o(t))};},function(t,n,r){var e=r(1),o=r(5),i=r(6)("match");t.exports=function(t){var n;return e(t)&&(void 0!==(n=t[i])?!!n:"RegExp"==o(t))};},function(t,n,r){var e=r(6)("match");t.exports=function(t){var n=/./;try{"/./"[t](n);}catch(r){try{return n[e]=!1,!"/./"[t](n)}catch(t){}}return !0};}]);
});

var accepts = /*@__PURE__*/getDefaultExportFromCjs(dist);

var supportMultiple = typeof document !== 'undefined' && document && document.createElement ? 'multiple' in document.createElement('input') : true;

// Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
// that MIME type will always be accepted
function fileAccepted(file, accept) {
  return file.type === 'application/x-moz-file' || accepts(file, accept);
}

function fileMatchSize(file, maxSize, minSize) {
  return file.size <= maxSize && file.size >= minSize;
}

function allFilesAccepted(files, accept) {
  return files.every(function (file) {
    return fileAccepted(file, accept);
  });
}

// React's synthetic events has evt.isPropagationStopped,
// but to remain compatibility with other libs (Preact) fall back
// to check evt.cancelBubble
function isPropagationStopped(evt) {
  if (typeof evt.isPropagationStopped === 'function') {
    return evt.isPropagationStopped();
  } else if (typeof evt.cancelBubble !== 'undefined') {
    return evt.cancelBubble;
  }
  return false;
}

// React's synthetic events has evt.isDefaultPrevented,
// but to remain compatibility with other libs (Preact) first
// check evt.defaultPrevented
function isDefaultPrevented(evt) {
  if (typeof evt.defaultPrevented !== 'undefined') {
    return evt.defaultPrevented;
  } else if (typeof evt.isDefaultPrevented === 'function') {
    return evt.isDefaultPrevented();
  }
  return false;
}

function isDragDataWithFiles(evt) {
  if (!evt.dataTransfer) {
    return true;
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#file
  return Array.prototype.some.call(evt.dataTransfer.types, function (type) {
    return type === 'Files' || type === 'application/x-moz-file';
  });
}

// allow the entire document to be a drag target
function onDocumentDragOver(evt) {
  evt.preventDefault();
}

function isIe(userAgent) {
  return userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1;
}

function isEdge(userAgent) {
  return userAgent.indexOf('Edge/') !== -1;
}

function isIeOrEdge() {
  var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.navigator.userAgent;

  return isIe(userAgent) || isEdge(userAgent);
}

/**
 * This is intended to be used to compose event handlers
 * They are executed in order until one of them calls `event.preventDefault()`.
 * Not sure this is the best way to do this, but it seems legit.
 * @param {Function} fns the event hanlder functions
 * @return {Function} the event handler to add to an element
 */
function composeEventHandlers() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (event) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return fns.some(function (fn) {
      fn && fn.apply(undefined, [event].concat(args));
      return event.defaultPrevented;
    });
  };
}

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropzone = function (_React$Component) {
  _inherits(Dropzone, _React$Component);

  function Dropzone() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dropzone);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      draggedFiles: [],
      acceptedFiles: [],
      rejectedFiles: []
    }, _this.isFileDialogActive = false, _this.onDocumentDrop = function (evt) {
      if (_this.node && _this.node.contains(evt.target)) {
        // if we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
        return;
      }
      evt.preventDefault();
      _this.dragTargets = [];
    }, _this.onDragStart = function (evt) {
      evt.persist();
      if (_this.props.onDragStart && isDragDataWithFiles(evt)) {
        _this.props.onDragStart.call(_this, evt);
      }
    }, _this.onDragEnter = function (evt) {
      evt.preventDefault();

      // Count the dropzone and any children that are entered.
      if (_this.dragTargets.indexOf(evt.target) === -1) {
        _this.dragTargets.push(evt.target);
      }

      evt.persist();

      if (isDragDataWithFiles(evt)) {
        Promise.resolve(_this.props.getDataTransferItems(evt)).then(function (draggedFiles) {
          if (isPropagationStopped(evt)) {
            return;
          }

          _this.setState({
            draggedFiles: draggedFiles,
            // Do not rely on files for the drag state. It doesn't work in Safari.
            isDragActive: true
          });
        });

        if (_this.props.onDragEnter) {
          _this.props.onDragEnter.call(_this, evt);
        }
      }
    }, _this.onDragOver = function (evt) {
      // eslint-disable-line class-methods-use-this
      evt.preventDefault();
      evt.persist();

      if (evt.dataTransfer) {
        evt.dataTransfer.dropEffect = 'copy';
      }

      if (_this.props.onDragOver && isDragDataWithFiles(evt)) {
        _this.props.onDragOver.call(_this, evt);
      }

      return false;
    }, _this.onDragLeave = function (evt) {
      evt.preventDefault();
      evt.persist();

      // Only deactivate once the dropzone and all children have been left.
      _this.dragTargets = _this.dragTargets.filter(function (el) {
        return el !== evt.target && _this.node.contains(el);
      });
      if (_this.dragTargets.length > 0) {
        return;
      }

      // Clear dragging files state
      _this.setState({
        isDragActive: false,
        draggedFiles: []
      });

      if (_this.props.onDragLeave && isDragDataWithFiles(evt)) {
        _this.props.onDragLeave.call(_this, evt);
      }
    }, _this.onDrop = function (evt) {
      var _this$props = _this.props,
          onDrop = _this$props.onDrop,
          onDropAccepted = _this$props.onDropAccepted,
          onDropRejected = _this$props.onDropRejected,
          multiple = _this$props.multiple,
          accept = _this$props.accept,
          getDataTransferItems = _this$props.getDataTransferItems;

      // Stop default browser behavior

      evt.preventDefault();

      // Persist event for later usage
      evt.persist();

      // Reset the counter along with the drag on a drop.
      _this.dragTargets = [];
      _this.isFileDialogActive = false;

      // Clear files value
      _this.draggedFiles = null;

      // Reset drag state
      _this.setState({
        isDragActive: false,
        draggedFiles: []
      });

      if (isDragDataWithFiles(evt)) {
        Promise.resolve(getDataTransferItems(evt)).then(function (fileList) {
          var acceptedFiles = [];
          var rejectedFiles = [];

          if (isPropagationStopped(evt)) {
            return;
          }

          fileList.forEach(function (file) {
            if (fileAccepted(file, accept) && fileMatchSize(file, _this.props.maxSize, _this.props.minSize)) {
              acceptedFiles.push(file);
            } else {
              rejectedFiles.push(file);
            }
          });

          if (!multiple && acceptedFiles.length > 1) {
            // if not in multi mode add any extra accepted files to rejected.
            // This will allow end users to easily ignore a multi file drop in "single" mode.
            rejectedFiles.push.apply(rejectedFiles, _toConsumableArray(acceptedFiles.splice(0)));
          }

          // Update `acceptedFiles` and `rejectedFiles` state
          // This will make children render functions receive the appropriate
          // values
          _this.setState({ acceptedFiles: acceptedFiles, rejectedFiles: rejectedFiles }, function () {
            if (onDrop) {
              onDrop.call(_this, acceptedFiles, rejectedFiles, evt);
            }

            if (rejectedFiles.length > 0 && onDropRejected) {
              onDropRejected.call(_this, rejectedFiles, evt);
            }

            if (acceptedFiles.length > 0 && onDropAccepted) {
              onDropAccepted.call(_this, acceptedFiles, evt);
            }
          });
        });
      }
    }, _this.onClick = function (evt) {
      var onClick = _this.props.onClick;

      // if onClick prop is given, run it first

      if (onClick) {
        onClick.call(_this, evt);
      }

      // If the event hasn't been default prevented from within
      // the onClick listener, open the file dialog
      if (!isDefaultPrevented(evt)) {
        evt.stopPropagation();

        // in IE11/Edge the file-browser dialog is blocking, ensure this is behind setTimeout
        // this is so react can handle state changes in the onClick prop above above
        // see: https://github.com/react-dropzone/react-dropzone/issues/450
        if (isIeOrEdge()) {
          setTimeout(_this.open, 0);
        } else {
          _this.open();
        }
      }
    }, _this.onInputElementClick = function (evt) {
      evt.stopPropagation();
    }, _this.onFileDialogCancel = function () {
      // timeout will not recognize context of this method
      var onFileDialogCancel = _this.props.onFileDialogCancel;
      // execute the timeout only if the FileDialog is opened in the browser

      if (_this.isFileDialogActive) {
        setTimeout(function () {
          if (_this.input != null) {
            // Returns an object as FileList
            var files = _this.input.files;


            if (!files.length) {
              _this.isFileDialogActive = false;

              if (typeof onFileDialogCancel === 'function') {
                onFileDialogCancel();
              }
            }
          }
        }, 300);
      }
    }, _this.onFocus = function (evt) {
      var onFocus = _this.props.onFocus;

      if (onFocus) {
        onFocus.call(_this, evt);
      }
      if (!isDefaultPrevented(evt)) {
        _this.setState({ isFocused: true });
      }
    }, _this.onBlur = function (evt) {
      var onBlur = _this.props.onBlur;

      if (onBlur) {
        onBlur.call(_this, evt);
      }
      if (!isDefaultPrevented(evt)) {
        _this.setState({ isFocused: false });
      }
    }, _this.onKeyDown = function (evt) {
      var onKeyDown = _this.props.onKeyDown;

      if (!_this.node.isEqualNode(evt.target)) {
        return;
      }

      if (onKeyDown) {
        onKeyDown.call(_this, evt);
      }

      if (!isDefaultPrevented(evt) && (evt.keyCode === 32 || evt.keyCode === 13)) {
        evt.preventDefault();
        _this.open();
      }
    }, _this.composeHandler = function (handler) {
      if (_this.props.disabled) {
        return null;
      }
      return handler;
    }, _this.getRootProps = function () {
      var _extends2;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _ref2$refKey = _ref2.refKey,
          refKey = _ref2$refKey === undefined ? 'ref' : _ref2$refKey,
          onKeyDown = _ref2.onKeyDown,
          onFocus = _ref2.onFocus,
          onBlur = _ref2.onBlur,
          onClick = _ref2.onClick,
          onDragStart = _ref2.onDragStart,
          onDragEnter = _ref2.onDragEnter,
          onDragOver = _ref2.onDragOver,
          onDragLeave = _ref2.onDragLeave,
          onDrop = _ref2.onDrop,
          rest = _objectWithoutProperties(_ref2, ['refKey', 'onKeyDown', 'onFocus', 'onBlur', 'onClick', 'onDragStart', 'onDragEnter', 'onDragOver', 'onDragLeave', 'onDrop']);

      return _extends((_extends2 = {
        onKeyDown: _this.composeHandler(onKeyDown ? composeEventHandlers(onKeyDown, _this.onKeyDown) : _this.onKeyDown),
        onFocus: _this.composeHandler(onFocus ? composeEventHandlers(onFocus, _this.onFocus) : _this.onFocus),
        onBlur: _this.composeHandler(onBlur ? composeEventHandlers(onBlur, _this.onBlur) : _this.onBlur),
        onClick: _this.composeHandler(onClick ? composeEventHandlers(onClick, _this.onClick) : _this.onClick),
        onDragStart: _this.composeHandler(onDragStart ? composeEventHandlers(onDragStart, _this.onDragStart) : _this.onDragStart),
        onDragEnter: _this.composeHandler(onDragEnter ? composeEventHandlers(onDragEnter, _this.onDragEnter) : _this.onDragEnter),
        onDragOver: _this.composeHandler(onDragOver ? composeEventHandlers(onDragOver, _this.onDragOver) : _this.onDragOver),
        onDragLeave: _this.composeHandler(onDragLeave ? composeEventHandlers(onDragLeave, _this.onDragLeave) : _this.onDragLeave),
        onDrop: _this.composeHandler(onDrop ? composeEventHandlers(onDrop, _this.onDrop) : _this.onDrop)
      }, _defineProperty(_extends2, refKey, _this.setNodeRef), _defineProperty(_extends2, 'tabIndex', _this.props.disabled ? -1 : 0), _extends2), rest);
    }, _this.getInputProps = function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _ref3$refKey = _ref3.refKey,
          refKey = _ref3$refKey === undefined ? 'ref' : _ref3$refKey,
          onChange = _ref3.onChange,
          onClick = _ref3.onClick,
          rest = _objectWithoutProperties(_ref3, ['refKey', 'onChange', 'onClick']);

      var _this$props2 = _this.props,
          accept = _this$props2.accept,
          multiple = _this$props2.multiple,
          name = _this$props2.name;

      var inputProps = _defineProperty({
        accept: accept,
        type: 'file',
        style: { display: 'none' },
        multiple: supportMultiple && multiple,
        onChange: composeEventHandlers(onChange, _this.onDrop),
        onClick: composeEventHandlers(onClick, _this.onInputElementClick),
        autoComplete: 'off',
        tabIndex: -1
      }, refKey, _this.setInputRef);
      if (name && name.length) {
        inputProps.name = name;
      }
      return _extends({}, inputProps, rest);
    }, _this.setNodeRef = function (node) {
      _this.node = node;
    }, _this.setInputRef = function (input) {
      _this.input = input;
    }, _this.open = function () {
      _this.isFileDialogActive = true;
      if (_this.input) {
        _this.input.value = null;
        _this.input.click();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dropzone, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var preventDropOnDocument = this.props.preventDropOnDocument;

      this.dragTargets = [];

      if (preventDropOnDocument) {
        document.addEventListener('dragover', onDocumentDragOver, false);
        document.addEventListener('drop', this.onDocumentDrop, false);
      }

      window.addEventListener('focus', this.onFileDialogCancel, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var preventDropOnDocument = this.props.preventDropOnDocument;

      if (preventDropOnDocument) {
        document.removeEventListener('dragover', onDocumentDragOver);
        document.removeEventListener('drop', this.onDocumentDrop);
      }

      window.removeEventListener('focus', this.onFileDialogCancel, false);
    }

    /**
     * Open system file upload dialog.
     *
     * @public
     */

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          multiple = _props.multiple,
          disabled = _props.disabled;
      var _state = this.state,
          isDragActive = _state.isDragActive,
          isFocused = _state.isFocused,
          draggedFiles = _state.draggedFiles,
          acceptedFiles = _state.acceptedFiles,
          rejectedFiles = _state.rejectedFiles;


      var filesCount = draggedFiles.length;
      var isMultipleAllowed = multiple || filesCount <= 1;
      var isDragAccept = filesCount > 0 && allFilesAccepted(draggedFiles, this.props.accept);
      var isDragReject = filesCount > 0 && (!isDragAccept || !isMultipleAllowed);

      return children({
        isDragActive: isDragActive,
        isDragAccept: isDragAccept,
        isDragReject: isDragReject,
        draggedFiles: draggedFiles,
        acceptedFiles: acceptedFiles,
        rejectedFiles: rejectedFiles,
        isFocused: isFocused && !disabled,
        getRootProps: this.getRootProps,
        getInputProps: this.getInputProps,
        open: this.open
      });
    }
  }]);

  return Dropzone;
}(react.Component);

Dropzone.propTypes = {
  /**
   * Allow specific types of files. See https://github.com/okonet/attr-accept for more information.
   * Keep in mind that mime type determination is not reliable across platforms. CSV files,
   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
   * Windows. In some cases there might not be a mime type set at all.
   * See: https://github.com/react-dropzone/react-dropzone/issues/276
   */
  accept: propTypes.oneOfType([propTypes.string, propTypes.arrayOf(propTypes.string)]),

  /**
   * Render function that renders the actual component
   *
   * @param {Object} props
   * @param {Function} props.getRootProps Returns the props you should apply to the root drop container you render
   * @param {Function} props.getInputProps Returns the props you should apply to hidden file input you render
   * @param {Function} props.open Open the native file selection dialog
   * @param {Boolean} props.isFocused Dropzone area is in focus
   * @param {Boolean} props.isDragActive Active drag is in progress
   * @param {Boolean} props.isDragAccept Dragged files are accepted
   * @param {Boolean} props.isDragReject Some dragged files are rejected
   * @param {Array} props.draggedFiles Files in active drag
   * @param {Array} props.acceptedFiles Accepted files
   * @param {Array} props.rejectedFiles Rejected files
   */
  children: propTypes.func,

  /**
   * Enable/disable the dropzone entirely
   */
  disabled: propTypes.bool,

  /**
   * If false, allow dropped items to take over the current browser window
   */
  preventDropOnDocument: propTypes.bool,

  /**
   * Allow dropping multiple files
   */
  multiple: propTypes.bool,

  /**
   * `name` attribute for the input tag
   */
  name: propTypes.string,

  /**
   * Maximum file size (in bytes)
   */
  maxSize: propTypes.number,

  /**
   * Minimum file size (in bytes)
   */
  minSize: propTypes.number,

  /**
   * getDataTransferItems handler
   * @param {Event} event
   * @returns {Array} array of File objects
   */
  getDataTransferItems: propTypes.func,

  /**
   * onClick callback
   * @param {Event} event
   */
  onClick: propTypes.func,

  /**
   * onFocus callback
   */
  onFocus: propTypes.func,

  /**
   * onBlur callback
   */
  onBlur: propTypes.func,

  /**
   * onKeyDown callback
   */
  onKeyDown: propTypes.func,

  /**
   * The `onDrop` method that accepts two arguments.
   * The first argument represents the accepted files and the second argument the rejected files.
   *
   * ```javascript
   * function onDrop(acceptedFiles, rejectedFiles) {
   *   // do stuff with files...
   * }
   * ```
   *
   * Files are accepted or rejected based on the `accept` prop.
   * This must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
   *
   * Note that the `onDrop` callback will always be called regardless if the dropped files were accepted or rejected.
   * You can use the `onDropAccepted`/`onDropRejected` props if you'd like to react to a specific event instead of the `onDrop` prop.
   *
   * The `onDrop` callback will provide you with an array of [Files](https://developer.mozilla.org/en-US/docs/Web/API/File) which you can then process and send to a server.
   * For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
   *
   * ```javascript
   * function onDrop(acceptedFiles) {
   *   const req = request.post('/upload')
   *   acceptedFiles.forEach(file => {
   *     req.attach(file.name, file)
   *   })
   *   req.end(callback)
   * }
   * ```
   */
  onDrop: propTypes.func,

  /**
   * onDropAccepted callback
   */
  onDropAccepted: propTypes.func,

  /**
   * onDropRejected callback
   */
  onDropRejected: propTypes.func,

  /**
   * onDragStart callback
   */
  onDragStart: propTypes.func,

  /**
   * onDragEnter callback
   */
  onDragEnter: propTypes.func,

  /**
   * onDragOver callback
   */
  onDragOver: propTypes.func,

  /**
   * onDragLeave callback
   */
  onDragLeave: propTypes.func,

  /**
   * Provide a callback on clicking the cancel button of the file dialog
   */
  onFileDialogCancel: propTypes.func
};

Dropzone.defaultProps = {
  preventDropOnDocument: true,
  disabled: false,
  multiple: true,
  maxSize: Infinity,
  minSize: 0,
  getDataTransferItems: fromEvent
};

export { CopyIcon as C, Dropzone as D, EmptyStateIcon as E, EmptyStateBody as a, EmptyStateSecondaryActions as b, fromEvent as f };
