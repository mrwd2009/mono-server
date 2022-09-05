import '../common/requiredActionProviderRepresentation-bdf0cdf4.js';
import { a as axios } from '../common/index-5b97fada.js';
import { c as createCommonjsModule } from '../common/_commonjsHelpers-4f955397.js';
import { b as basePickBy, h as hasIn, f as flatRest, o as omit, l as last } from '../common/_basePickBy-35c0abab.js';
import '../common/process-2545f00a.js';

function normalize (strArray) {
  var resultArray = [];
  if (strArray.length === 0) { return ''; }

  if (typeof strArray[0] !== 'string') {
    throw new TypeError('Url must be a string. Received ' + strArray[0]);
  }

  // If the first part is a plain protocol, we combine it with the next part.
  if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
    var first = strArray.shift();
    strArray[0] = first + strArray[0];
  }

  // There must be two or three slashes in the file protocol, two slashes in anything else.
  if (strArray[0].match(/^file:\/\/\//)) {
    strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
  } else {
    strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
  }

  for (var i = 0; i < strArray.length; i++) {
    var component = strArray[i];

    if (typeof component !== 'string') {
      throw new TypeError('Url must be a string. Received ' + component);
    }

    if (component === '') { continue; }

    if (i > 0) {
      // Removing the starting slashes for each component but the first.
      component = component.replace(/^[\/]+/, '');
    }
    if (i < strArray.length - 1) {
      // Removing the ending slashes for each component but the last.
      component = component.replace(/[\/]+$/, '');
    } else {
      // For the last component we will combine multiple slashes to a single one.
      component = component.replace(/[\/]+$/, '/');
    }

    resultArray.push(component);

  }

  var str = resultArray.join('/');
  // Each input component is now separated by a single slash except the possible first plain protocol part.

  // remove trailing slash before parameters or hash
  str = str.replace(/\/(\?|&|#[^!])/g, '$1');

  // replace ? in parameters with &
  var parts = str.split('?');
  str = parts.shift() + (parts.length > 0 ? '?': '') + parts.join('&');

  return str;
}

function urlJoin() {
  var input;

  if (typeof arguments[0] === 'object') {
    input = arguments[0];
  } else {
    input = [].slice.call(arguments);
  }

  return normalize(input);
}

function encodeReserved(str) {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
    if (!/%[0-9A-Fa-f]/.test(part)) {
      part = encodeURI(part).replace(/%5B/g, '[').replace(/%5D/g, ']');
    }
    return part;
  }).join('');
}

function encodeUnreserved(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

function encodeValue(operator, value, key) {
  value = (operator === '+' || operator === '#') ? encodeReserved(value) : encodeUnreserved(value);

  if (key) {
    return encodeUnreserved(key) + '=' + value;
  } else {
    return value;
  }
}

function isDefined(value) {
  return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
  return operator === ';' || operator === '&' || operator === '?';
}

function getValues(context, operator, key, modifier) {
  var value = context[key],
      result = [];

  if (isDefined(value) && value !== '') {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      value = value.toString();

      if (modifier && modifier !== '*') {
        value = value.substring(0, parseInt(modifier, 10));
      }

      result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
    } else {
      if (modifier === '*') {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              result.push(encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        var tmp = [];

        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            tmp.push(encodeValue(operator, value));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              tmp.push(encodeUnreserved(k));
              tmp.push(encodeValue(operator, value[k].toString()));
            }
          });
        }

        if (isKeyOperator(operator)) {
          result.push(encodeUnreserved(key) + '=' + tmp.join(','));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(','));
        }
      }
    }
  } else {
    if (operator === ';') {
      if (isDefined(value)) {
        result.push(encodeUnreserved(key));
      }
    } else if (value === '' && (operator === '&' || operator === '?')) {
      result.push(encodeUnreserved(key) + '=');
    } else if (value === '') {
      result.push('');
    }
  }
  return result;
}

function parseTemplate(template) {
  var operators = ['+', '#', '.', '/', ';', '?', '&'];

  return {
    expand: function (context) {
      return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
        if (expression) {
          var operator = null,
              values = [];

          if (operators.indexOf(expression.charAt(0)) !== -1) {
            operator = expression.charAt(0);
            expression = expression.substr(1);
          }

          expression.split(/,/g).forEach(function (variable) {
            var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
            values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
          });

          if (operator && operator !== '+') {
            var separator = ',';

            if (operator === '?') {
              separator = '&';
            } else if (operator !== '#') {
              separator = operator;
            }
            return (values.length !== 0 ? operator : '') + values.join(separator);
          } else {
            return values.join(',');
          }
        } else {
          return encodeReserved(literal);
        }
      });
    }
  };
}

var strictUriEncode = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

var decodeUriComponent = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};

var splitOnFirst = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};

var filterObj = function (obj, predicate) {
	var ret = {};
	var keys = Object.keys(obj);
	var isArr = Array.isArray(predicate);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = obj[key];

		if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
			ret[key] = val;
		}
	}

	return ret;
};

var queryString = createCommonjsModule(function (module, exports) {





const isNullOrUndefined = value => value === null || value === undefined;

const encodeFragmentIdentifier = Symbol('encodeFragmentIdentifier');

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;

				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'colon-list-separator':
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), ':list='].join('')];
				}

				return [...result, [encode(key, options), ':list=', encode(value, options)].join('')];
			};

		case 'comma':
		case 'separator':
		case 'bracket-separator': {
			const keyValueSep = options.arrayFormat === 'bracket-separator' ?
				'[]=' :
				'=';

			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				// Translate null to an empty string so that it doesn't serialize as 'null'
				value = value === null ? '' : value;

				if (result.length === 0) {
					return [[encode(key, options), keyValueSep, encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
			};
		}

		default:
			return key => (result, value) => {
				if (
					value === undefined ||
					(options.skipNull && value === null) ||
					(options.skipEmptyString && value === '')
				) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'colon-list-separator':
			return (key, value, accumulator) => {
				result = /(:list)$/.exec(key);
				key = key.replace(/:list$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
		case 'separator':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
				const isEncodedArray = (typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator));
				value = isEncodedArray ? decode(value, options) : value;
				const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
				accumulator[key] = newValue;
			};

		case 'bracket-separator':
			return (key, value, accumulator) => {
				const isArray = /(\[\])$/.test(key);
				key = key.replace(/\[\]$/, '');

				if (!isArray) {
					accumulator[key] = value ? decode(value, options) : value;
					return;
				}

				const arrayValue = value === null ?
					[] :
					value.split(options.arrayFormatSeparator).map(item => decode(item, options));

				if (accumulator[key] === undefined) {
					accumulator[key] = arrayValue;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], arrayValue);
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function validateArrayFormatSeparator(value) {
	if (typeof value !== 'string' || value.length !== 1) {
		throw new TypeError('arrayFormatSeparator must be single character string');
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode(value, options) {
	if (options.decode) {
		return decodeUriComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function getHash(url) {
	let hash = '';
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		hash = url.slice(hashStart);
	}

	return hash;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(query, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof query !== 'string') {
		return ret;
	}

	query = query.trim().replace(/^[?#&]/, '');

	if (!query) {
		return ret;
	}

	for (const param of query.split('&')) {
		if (param === '') {
			continue;
		}

		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : ['comma', 'separator', 'bracket-separator'].includes(options.arrayFormat) ? value : decode(value, options);
		formatter(decode(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ','
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const shouldFilter = key => (
		(options.skipNull && isNullOrUndefined(object[key])) ||
		(options.skipEmptyString && object[key] === '')
	);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = {};

	for (const key of Object.keys(object)) {
		if (!shouldFilter(key)) {
			objectCopy[key] = object[key];
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			if (value.length === 0 && options.arrayFormat === 'bracket-separator') {
				return encode(key, options) + '[]';
			}

			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (url, options) => {
	options = Object.assign({
		decode: true
	}, options);

	const [url_, hash] = splitOnFirst(url, '#');

	return Object.assign(
		{
			url: url_.split('?')[0] || '',
			query: parse(extract(url), options)
		},
		options && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode(hash, options)} : {}
	);
};

exports.stringifyUrl = (object, options) => {
	options = Object.assign({
		encode: true,
		strict: true,
		[encodeFragmentIdentifier]: true
	}, options);

	const url = removeHash(object.url).split('?')[0] || '';
	const queryFromUrl = exports.extract(object.url);
	const parsedQueryFromUrl = exports.parse(queryFromUrl, {sort: false});

	const query = Object.assign(parsedQueryFromUrl, object.query);
	let queryString = exports.stringify(query, options);
	if (queryString) {
		queryString = `?${queryString}`;
	}

	let hash = getHash(object.url);
	if (object.fragmentIdentifier) {
		hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
	}

	return `${url}${queryString}${hash}`;
};

exports.pick = (input, filter, options) => {
	options = Object.assign({
		parseFragmentIdentifier: true,
		[encodeFragmentIdentifier]: false
	}, options);

	const {url, query, fragmentIdentifier} = exports.parseUrl(input, options);
	return exports.stringifyUrl({
		url,
		query: filterObj(query, filter),
		fragmentIdentifier
	}, options);
};

exports.exclude = (input, filter, options) => {
	const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);

	return exports.pick(input, exclusionFilter, options);
};
});

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

const SLASH = '/';
class Agent {
    constructor({ client, path = '/', getUrlParams = () => ({}), getBaseUrl = () => client.baseUrl, }) {
        this.client = client;
        this.getBaseParams = getUrlParams;
        this.getBaseUrl = getBaseUrl;
        this.basePath = path;
    }
    request({ method, path = '', urlParamKeys = [], queryParamKeys = [], catchNotFound = false, keyTransform, payloadKey, returnResourceIdInLocationHeader, ignoredKeys, headers, }) {
        return async (payload = {}, options) => {
            const baseParams = this.getBaseParams?.() ?? {};
            const queryParams = queryParamKeys ? pick(payload, queryParamKeys) : null;
            const allUrlParamKeys = [...Object.keys(baseParams), ...urlParamKeys];
            const urlParams = { ...baseParams, ...pick(payload, allUrlParamKeys) };
            const omittedKeys = ignoredKeys
                ? [...allUrlParamKeys, ...queryParamKeys].filter((key) => !ignoredKeys.includes(key))
                : [...allUrlParamKeys, ...queryParamKeys];
            payload = omit(payload, omittedKeys);
            if (keyTransform) {
                this.transformKey(payload, keyTransform);
                this.transformKey(queryParams, keyTransform);
            }
            return this.requestWithParams({
                method,
                path,
                payload,
                urlParams,
                queryParams,
                catchNotFound,
                ...(this.client.getGlobalRequestArgOptions() ?? options ?? {}),
                payloadKey,
                returnResourceIdInLocationHeader,
                headers,
            });
        };
    }
    updateRequest({ method, path = '', urlParamKeys = [], queryParamKeys = [], catchNotFound = false, keyTransform, payloadKey, returnResourceIdInLocationHeader, headers }) {
        return async (query = {}, payload = {}) => {
            const baseParams = this.getBaseParams?.() ?? {};
            const queryParams = queryParamKeys ? pick(query, queryParamKeys) : null;
            const allUrlParamKeys = [...Object.keys(baseParams), ...urlParamKeys];
            const urlParams = {
                ...baseParams,
                ...pick(query, allUrlParamKeys),
            };
            if (keyTransform) {
                this.transformKey(queryParams, keyTransform);
            }
            return this.requestWithParams({
                method,
                path,
                payload,
                urlParams,
                queryParams,
                catchNotFound,
                payloadKey,
                returnResourceIdInLocationHeader,
                headers,
            });
        };
    }
    async requestWithParams({ method, path, payload, urlParams, queryParams, catchNotFound, payloadKey, returnResourceIdInLocationHeader, headers }) {
        const newPath = urlJoin(this.basePath, path);
        const pathTemplate = parseTemplate(newPath);
        const parsedPath = pathTemplate.expand(urlParams);
        const url = `${this.getBaseUrl?.() ?? ''}${parsedPath}`;
        const requestConfig = {
            paramsSerializer: (params) => queryString.stringify(params),
            ...(this.client.getRequestConfig() || {}),
            method,
            url,
        };
        requestConfig.headers = {
            ...requestConfig.headers,
            Authorization: `bearer ${await this.client.getAccessToken()}`,
            ...headers
        };
        if (method === 'GET') {
            requestConfig.params = payload;
        }
        else {
            requestConfig.data = payloadKey ? payload[payloadKey] : payload;
        }
        if (queryParams) {
            requestConfig.params = requestConfig.params
                ? {
                    ...requestConfig.params,
                    ...queryParams,
                }
                : queryParams;
        }
        try {
            const res = await axios.default(requestConfig);
            if (returnResourceIdInLocationHeader) {
                const locationHeader = res.headers.location;
                if (typeof locationHeader !== 'string') {
                    throw new Error(`location header is not found in request: ${res.config.url}`);
                }
                const resourceId = last(locationHeader.split(SLASH));
                if (!resourceId) {
                    throw new Error(`resourceId is not found in Location header from request: ${res.config.url}`);
                }
                const { field } = returnResourceIdInLocationHeader;
                return { [field]: resourceId };
            }
            return res.data;
        }
        catch (err) {
            if (axios.default.isAxiosError(err) && err.response?.status === 404 && catchNotFound) {
                return null;
            }
            throw err;
        }
    }
    transformKey(payload, keyMapping) {
        if (!payload) {
            return;
        }
        Object.keys(keyMapping).some((key) => {
            if (isUndefined(payload[key])) {
                return false;
            }
            const newKey = keyMapping[key];
            payload[newKey] = payload[key];
            delete payload[key];
        });
    }
}

class Resource {
    constructor(client, settings = {}) {
        this.makeRequest = (args) => {
            return this.agent.request(args);
        };
        this.makeUpdateRequest = (args) => {
            return this.agent.updateRequest(args);
        };
        this.agent = new Agent({
            client,
            ...settings,
        });
    }
}

class AttackDetection extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}/attack-detection/brute-force',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.findOne = this.makeRequest({
            method: 'GET',
            path: '/users/{id}',
            urlParamKeys: ['id'],
            catchNotFound: true,
        });
        this.del = this.makeRequest({
            method: 'DELETE',
            path: '/users/{id}',
            urlParamKeys: ['id'],
        });
        this.delAll = this.makeRequest({
            method: 'DELETE',
            path: '/users',
        });
    }
}

class AuthenticationManagement extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}/authentication',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.registerRequiredAction = this.makeRequest({
            method: 'POST',
            path: '/register-required-action',
        });
        this.getRequiredActions = this.makeRequest({
            method: 'GET',
            path: '/required-actions',
        });
        this.getRequiredActionForAlias = this.makeRequest({
            method: 'GET',
            path: '/required-actions/{alias}',
            urlParamKeys: ['alias'],
            catchNotFound: true,
        });
        this.getClientAuthenticatorProviders = this.makeRequest({
            method: 'GET',
            path: '/client-authenticator-providers',
        });
        this.getAuthenticatorProviders = this.makeRequest({
            method: 'GET',
            path: '/authenticator-providers',
        });
        this.getFormActionProviders = this.makeRequest({
            method: 'GET',
            path: '/form-action-providers',
        });
        this.updateRequiredAction = this.makeUpdateRequest({
            method: 'PUT',
            path: '/required-actions/{alias}',
            urlParamKeys: ['alias'],
        });
        this.deleteRequiredAction = this.makeRequest({
            method: 'DELETE',
            path: '/required-actions/{alias}',
            urlParamKeys: ['alias'],
        });
        this.lowerRequiredActionPriority = this.makeRequest({
            method: 'POST',
            path: '/required-actions/{alias}/lower-priority',
            urlParamKeys: ['alias'],
        });
        this.raiseRequiredActionPriority = this.makeRequest({
            method: 'POST',
            path: '/required-actions/{alias}/raise-priority',
            urlParamKeys: ['alias'],
        });
        this.getUnregisteredRequiredActions = this.makeRequest({
            method: 'GET',
            path: '/unregistered-required-actions',
        });
        this.getFlows = this.makeRequest({
            method: 'GET',
            path: '/flows',
        });
        this.getFlow = this.makeRequest({
            method: 'GET',
            path: '/flows/{flowId}',
            urlParamKeys: ['flowId'],
        });
        this.getFormProviders = this.makeRequest({
            method: 'GET',
            path: '/form-providers',
        });
        this.createFlow = this.makeRequest({
            method: 'POST',
            path: '/flows',
            returnResourceIdInLocationHeader: { field: 'id' },
        });
        this.copyFlow = this.makeRequest({
            method: 'POST',
            path: '/flows/{flow}/copy',
            urlParamKeys: ['flow'],
        });
        this.deleteFlow = this.makeRequest({
            method: 'DELETE',
            path: '/flows/{flowId}',
            urlParamKeys: ['flowId'],
        });
        this.updateFlow = this.makeUpdateRequest({
            method: 'PUT',
            path: '/flows/{flowId}',
            urlParamKeys: ['flowId'],
        });
        this.getExecutions = this.makeRequest({
            method: 'GET',
            path: '/flows/{flow}/executions',
            urlParamKeys: ['flow'],
        });
        this.addExecution = this.makeUpdateRequest({
            method: 'POST',
            path: '/flows/{flow}/executions',
            urlParamKeys: ['flow'],
        });
        this.addExecutionToFlow = this.makeRequest({
            method: 'POST',
            path: '/flows/{flow}/executions/execution',
            urlParamKeys: ['flow'],
            returnResourceIdInLocationHeader: { field: 'id' },
        });
        this.addFlowToFlow = this.makeRequest({
            method: 'POST',
            path: '/flows/{flow}/executions/flow',
            urlParamKeys: ['flow'],
            returnResourceIdInLocationHeader: { field: 'id' },
        });
        this.updateExecution = this.makeUpdateRequest({
            method: 'PUT',
            path: '/flows/{flow}/executions',
            urlParamKeys: ['flow'],
        });
        this.delExecution = this.makeRequest({
            method: 'DELETE',
            path: '/executions/{id}',
            urlParamKeys: ['id'],
        });
        this.lowerPriorityExecution = this.makeRequest({
            method: 'POST',
            path: '/executions/{id}/lower-priority',
            urlParamKeys: ['id'],
        });
        this.raisePriorityExecution = this.makeRequest({
            method: 'POST',
            path: '/executions/{id}/raise-priority',
            urlParamKeys: ['id'],
        });
        this.getConfigDescription = this.makeRequest({
            method: 'GET',
            path: 'config-description/{providerId}',
            urlParamKeys: ['providerId'],
        });
        this.createConfig = this.makeRequest({
            method: 'POST',
            path: '/executions/{id}/config',
            urlParamKeys: ['id'],
            returnResourceIdInLocationHeader: { field: 'id' },
        });
        this.updateConfig = this.makeRequest({
            method: 'PUT',
            path: '/config/{id}',
            urlParamKeys: ['id'],
        });
        this.getConfig = this.makeRequest({
            method: 'GET',
            path: '/config/{id}',
            urlParamKeys: ['id'],
        });
        this.delConfig = this.makeRequest({
            method: 'DELETE',
            path: '/config/{id}',
            urlParamKeys: ['id'],
        });
    }
}

class Cache extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.clearUserCache = this.makeRequest({
            method: 'POST',
            path: '/clear-user-cache',
        });
    }
}

class ClientPolicies extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}/client-policies',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.listProfiles = this.makeRequest({
            method: 'GET',
            path: '/profiles',
            queryParamKeys: ['include-global-profiles'],
            keyTransform: {
                includeGlobalProfiles: 'include-global-profiles',
            },
        });
        this.createProfiles = this.makeRequest({
            method: 'PUT',
            path: '/profiles',
        });
        this.listPolicies = this.makeRequest({
            method: 'GET',
            path: '/policies',
        });
        this.updatePolicy = this.makeRequest({
            method: 'PUT',
            path: '/policies',
        });
    }
}

class Clients extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}/clients',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.find = this.makeRequest({
            method: 'GET',
        });
        this.create = this.makeRequest({
            method: 'POST',
            returnResourceIdInLocationHeader: { field: 'id' },
        });
        this.findOne = this.makeRequest({
            method: 'GET',
            path: '/{id}',
            urlParamKeys: ['id'],
            catchNotFound: true,
        });
        this.update = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}',
            urlParamKeys: ['id'],
        });
        this.del = this.makeRequest({
            method: 'DELETE',
            path: '/{id}',
            urlParamKeys: ['id'],
        });
        this.createRole = this.makeRequest({
            method: 'POST',
            path: '/{id}/roles',
            urlParamKeys: ['id'],
            returnResourceIdInLocationHeader: { field: 'roleName' },
        });
        this.listRoles = this.makeRequest({
            method: 'GET',
            path: '/{id}/roles',
            urlParamKeys: ['id'],
        });
        this.findRole = this.makeRequest({
            method: 'GET',
            path: '/{id}/roles/{roleName}',
            urlParamKeys: ['id', 'roleName'],
            catchNotFound: true,
        });
        this.updateRole = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}/roles/{roleName}',
            urlParamKeys: ['id', 'roleName'],
        });
        this.delRole = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/roles/{roleName}',
            urlParamKeys: ['id', 'roleName'],
        });
        this.findUsersWithRole = this.makeRequest({
            method: 'GET',
            path: '/{id}/roles/{roleName}/users',
            urlParamKeys: ['id', 'roleName'],
        });
        this.getServiceAccountUser = this.makeRequest({
            method: 'GET',
            path: '/{id}/service-account-user',
            urlParamKeys: ['id'],
        });
        this.generateNewClientSecret = this.makeRequest({
            method: 'POST',
            path: '/{id}/client-secret',
            urlParamKeys: ['id'],
        });
        this.invalidateSecret = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/client-secret/rotated',
            urlParamKeys: ['id'],
        });
        this.generateRegistrationAccessToken = this.makeRequest({
            method: 'POST',
            path: '/{id}/registration-access-token',
            urlParamKeys: ['id'],
        });
        this.getClientSecret = this.makeRequest({
            method: 'GET',
            path: '/{id}/client-secret',
            urlParamKeys: ['id'],
        });
        this.listDefaultClientScopes = this.makeRequest({
            method: 'GET',
            path: '/{id}/default-client-scopes',
            urlParamKeys: ['id'],
        });
        this.addDefaultClientScope = this.makeRequest({
            method: 'PUT',
            path: '/{id}/default-client-scopes/{clientScopeId}',
            urlParamKeys: ['id', 'clientScopeId'],
        });
        this.delDefaultClientScope = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/default-client-scopes/{clientScopeId}',
            urlParamKeys: ['id', 'clientScopeId'],
        });
        this.listOptionalClientScopes = this.makeRequest({
            method: 'GET',
            path: '/{id}/optional-client-scopes',
            urlParamKeys: ['id'],
        });
        this.addOptionalClientScope = this.makeRequest({
            method: 'PUT',
            path: '/{id}/optional-client-scopes/{clientScopeId}',
            urlParamKeys: ['id', 'clientScopeId'],
        });
        this.delOptionalClientScope = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/optional-client-scopes/{clientScopeId}',
            urlParamKeys: ['id', 'clientScopeId'],
        });
        this.addMultipleProtocolMappers = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/protocol-mappers/add-models',
            urlParamKeys: ['id'],
        });
        this.addProtocolMapper = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/protocol-mappers/models',
            urlParamKeys: ['id'],
        });
        this.listProtocolMappers = this.makeRequest({
            method: 'GET',
            path: '/{id}/protocol-mappers/models',
            urlParamKeys: ['id'],
        });
        this.findProtocolMapperById = this.makeRequest({
            method: 'GET',
            path: '/{id}/protocol-mappers/models/{mapperId}',
            urlParamKeys: ['id', 'mapperId'],
            catchNotFound: true,
        });
        this.findProtocolMappersByProtocol = this.makeRequest({
            method: 'GET',
            path: '/{id}/protocol-mappers/protocol/{protocol}',
            urlParamKeys: ['id', 'protocol'],
            catchNotFound: true,
        });
        this.updateProtocolMapper = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}/protocol-mappers/models/{mapperId}',
            urlParamKeys: ['id', 'mapperId'],
        });
        this.delProtocolMapper = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/protocol-mappers/models/{mapperId}',
            urlParamKeys: ['id', 'mapperId'],
        });
        this.listScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/scope-mappings',
            urlParamKeys: ['id'],
        });
        this.addClientScopeMappings = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/scope-mappings/clients/{client}',
            urlParamKeys: ['id', 'client'],
        });
        this.listClientScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/scope-mappings/clients/{client}',
            urlParamKeys: ['id', 'client'],
        });
        this.listAvailableClientScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/scope-mappings/clients/{client}/available',
            urlParamKeys: ['id', 'client'],
        });
        this.listCompositeClientScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/scope-mappings/clients/{client}/composite',
            urlParamKeys: ['id', 'client'],
        });
        this.delClientScopeMappings = this.makeUpdateRequest({
            method: 'DELETE',
            path: '/{id}/scope-mappings/clients/{client}',
            urlParamKeys: ['id', 'client'],
        });
        this.evaluatePermission = this.makeRequest({
            method: 'GET',
            path: '/{id}/evaluate-scopes/scope-mappings/{roleContainer}/{type}',
            urlParamKeys: ['id', 'roleContainer', 'type'],
            queryParamKeys: ['scope'],
        });
        this.evaluateListProtocolMapper = this.makeRequest({
            method: 'GET',
            path: '/{id}/evaluate-scopes/protocol-mappers',
            urlParamKeys: ['id'],
            queryParamKeys: ['scope'],
        });
        this.evaluateGenerateAccessToken = this.makeRequest({
            method: 'GET',
            path: '/{id}/evaluate-scopes/generate-example-access-token',
            urlParamKeys: ['id'],
            queryParamKeys: ['scope', 'userId'],
        });
        this.evaluateGenerateUserInfo = this.makeRequest({
            method: 'GET',
            path: '/{id}/evaluate-scopes/generate-example-userinfo',
            urlParamKeys: ['id'],
            queryParamKeys: ['scope', 'userId'],
        });
        this.evaluateGenerateIdToken = this.makeRequest({
            method: 'GET',
            path: '/{id}/evaluate-scopes/generate-example-id-token',
            urlParamKeys: ['id'],
            queryParamKeys: ['scope', 'userId'],
        });
        this.addRealmScopeMappings = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/scope-mappings/realm',
            urlParamKeys: ['id', 'client'],
        });
        this.listRealmScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/scope-mappings/realm',
            urlParamKeys: ['id'],
        });
        this.listAvailableRealmScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/scope-mappings/realm/available',
            urlParamKeys: ['id'],
        });
        this.listCompositeRealmScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/scope-mappings/realm/composite',
            urlParamKeys: ['id'],
        });
        this.delRealmScopeMappings = this.makeUpdateRequest({
            method: 'DELETE',
            path: '/{id}/scope-mappings/realm',
            urlParamKeys: ['id'],
        });
        this.listSessions = this.makeRequest({
            method: 'GET',
            path: '/{id}/user-sessions',
            urlParamKeys: ['id'],
        });
        this.listOfflineSessions = this.makeRequest({
            method: 'GET',
            path: '/{id}/offline-sessions',
            urlParamKeys: ['id'],
        });
        this.getSessionCount = this.makeRequest({
            method: 'GET',
            path: '/{id}/session-count',
            urlParamKeys: ['id'],
        });
        this.getResourceServer = this.makeRequest({
            method: 'GET',
            path: '{id}/authz/resource-server',
            urlParamKeys: ['id'],
        });
        this.updateResourceServer = this.makeUpdateRequest({
            method: 'PUT',
            path: '{id}/authz/resource-server',
            urlParamKeys: ['id'],
        });
        this.listResources = this.makeRequest({
            method: 'GET',
            path: '{id}/authz/resource-server/resource',
            urlParamKeys: ['id'],
        });
        this.createResource = this.makeUpdateRequest({
            method: 'POST',
            path: '{id}/authz/resource-server/resource',
            urlParamKeys: ['id'],
        });
        this.getResource = this.makeRequest({
            method: 'GET',
            path: '{id}/authz/resource-server/resource/{resourceId}',
            urlParamKeys: ['id', 'resourceId'],
        });
        this.updateResource = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}/authz/resource-server/resource/{resourceId}',
            urlParamKeys: ['id', 'resourceId'],
        });
        this.delResource = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/authz/resource-server/resource/{resourceId}',
            urlParamKeys: ['id', 'resourceId'],
        });
        this.importResource = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/authz/resource-server/import',
            urlParamKeys: ['id'],
        });
        this.exportResource = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/settings',
            urlParamKeys: ['id'],
        });
        this.evaluateResource = this.makeUpdateRequest({
            method: 'POST',
            path: '{id}/authz/resource-server/policy/evaluate',
            urlParamKeys: ['id'],
        });
        this.listPolicies = this.makeRequest({
            method: 'GET',
            path: '{id}/authz/resource-server/policy',
            urlParamKeys: ['id'],
        });
        this.findPolicyByName = this.makeRequest({
            method: 'GET',
            path: '{id}/authz/resource-server/policy/search',
            urlParamKeys: ['id'],
        });
        this.updatePolicy = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}/authz/resource-server/policy/{type}/{policyId}',
            urlParamKeys: ['id', 'type', 'policyId'],
        });
        this.createPolicy = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/authz/resource-server/policy/{type}',
            urlParamKeys: ['id', 'type'],
        });
        this.findOnePolicy = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/policy/{type}/{policyId}',
            urlParamKeys: ['id', 'type', 'policyId'],
            catchNotFound: true,
        });
        this.listDependentPolicies = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/policy/{policyId}/dependentPolicies',
            urlParamKeys: ['id', 'policyId'],
        });
        this.delPolicy = this.makeRequest({
            method: 'DELETE',
            path: '{id}/authz/resource-server/policy/{policyId}',
            urlParamKeys: ['id', 'policyId'],
        });
        this.listPolicyProviders = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/policy/providers',
            urlParamKeys: ['id'],
        });
        this.listAllScopes = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/scope',
            urlParamKeys: ['id'],
        });
        this.listAllResourcesByScope = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/scope/{scopeId}/resources',
            urlParamKeys: ['id', 'scopeId'],
        });
        this.listAllPermissionsByScope = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/scope/{scopeId}/permissions',
            urlParamKeys: ['id', 'scopeId'],
        });
        this.listPermissionsByResource = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/resource/{resourceId}/permissions',
            urlParamKeys: ['id', 'resourceId'],
        });
        this.listScopesByResource = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/resource/{resourceName}/scopes',
            urlParamKeys: ['id', 'resourceName'],
        });
        this.createAuthorizationScope = this.makeUpdateRequest({
            method: 'POST',
            path: '{id}/authz/resource-server/scope',
            urlParamKeys: ['id'],
        });
        this.updateAuthorizationScope = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}/authz/resource-server/scope/{scopeId}',
            urlParamKeys: ['id', 'scopeId'],
        });
        this.getAuthorizationScope = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/scope/{scopeId}',
            urlParamKeys: ['id', 'scopeId'],
        });
        this.delAuthorizationScope = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/authz/resource-server/scope/{scopeId}',
            urlParamKeys: ['id', 'scopeId'],
        });
        this.findPermissions = this.makeRequest({
            method: 'GET',
            path: '{id}/authz/resource-server/permission',
            urlParamKeys: ['id'],
        });
        this.createPermission = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/authz/resource-server/permission/{type}',
            urlParamKeys: ['id', 'type'],
        });
        this.updatePermission = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}/authz/resource-server/permission/{type}/{permissionId}',
            urlParamKeys: ['id', 'type', 'permissionId'],
        });
        this.delPermission = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/authz/resource-server/permission/{type}/{permissionId}',
            urlParamKeys: ['id', 'type', 'permissionId'],
        });
        this.findOnePermission = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/permission/{type}/{permissionId}',
            urlParamKeys: ['id', 'type', 'permissionId'],
        });
        this.getAssociatedScopes = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/policy/{permissionId}/scopes',
            urlParamKeys: ['id', 'permissionId'],
        });
        this.getAssociatedResources = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/policy/{permissionId}/resources',
            urlParamKeys: ['id', 'permissionId'],
        });
        this.getAssociatedPolicies = this.makeRequest({
            method: 'GET',
            path: '/{id}/authz/resource-server/policy/{permissionId}/associatedPolicies',
            urlParamKeys: ['id', 'permissionId'],
        });
        this.getOfflineSessionCount = this.makeRequest({
            method: 'GET',
            path: '/{id}/offline-session-count',
            urlParamKeys: ['id'],
        });
        this.getInstallationProviders = this.makeRequest({
            method: 'GET',
            path: '/{id}/installation/providers/{providerId}',
            urlParamKeys: ['id', 'providerId'],
        });
        this.pushRevocation = this.makeRequest({
            method: 'POST',
            path: '/{id}/push-revocation',
            urlParamKeys: ['id'],
        });
        this.addClusterNode = this.makeRequest({
            method: 'POST',
            path: '/{id}/nodes',
            urlParamKeys: ['id'],
        });
        this.deleteClusterNode = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/nodes/{node}',
            urlParamKeys: ['id', 'node'],
        });
        this.testNodesAvailable = this.makeRequest({
            method: 'GET',
            path: '/{id}/test-nodes-available',
            urlParamKeys: ['id'],
        });
        this.getKeyInfo = this.makeRequest({
            method: 'GET',
            path: '/{id}/certificates/{attr}',
            urlParamKeys: ['id', 'attr'],
        });
        this.generateKey = this.makeRequest({
            method: 'POST',
            path: '/{id}/certificates/{attr}/generate',
            urlParamKeys: ['id', 'attr'],
        });
        this.downloadKey = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/certificates/{attr}/download',
            urlParamKeys: ['id', 'attr'],
        });
        this.generateAndDownloadKey = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/certificates/{attr}/generate-and-download',
            urlParamKeys: ['id', 'attr'],
        });
        this.uploadKey = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/certificates/{attr}/upload',
            urlParamKeys: ['id', 'attr'],
        });
        this.uploadCertificate = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/certificates/{attr}/upload-certificate',
            urlParamKeys: ['id', 'attr'],
        });
        this.updateFineGrainPermission = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}/management/permissions',
            urlParamKeys: ['id'],
        });
        this.listFineGrainPermissions = this.makeRequest({
            method: 'GET',
            path: '/{id}/management/permissions',
            urlParamKeys: ['id'],
        });
    }
    async createOrUpdatePolicy(payload) {
        const policyFound = await this.findPolicyByName({
            id: payload.id,
            name: payload.policyName,
        });
        if (policyFound) {
            await this.updatePolicy({ id: payload.id, policyId: policyFound.id, type: payload.policy.type }, payload.policy);
            return this.findPolicyByName({ id: payload.id, name: payload.policyName });
        }
        else {
            return this.createPolicy({ id: payload.id, type: payload.policy.type }, payload.policy);
        }
    }
    async findProtocolMapperByName(payload) {
        const allProtocolMappers = await this.listProtocolMappers({
            id: payload.id,
            ...(payload.realm ? { realm: payload.realm } : {}),
        });
        return allProtocolMappers.find((mapper) => mapper.name === payload.name);
    }
}

class ClientScopes extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.find = this.makeRequest({
            method: 'GET',
            path: '/client-scopes',
        });
        this.create = this.makeRequest({
            method: 'POST',
            path: '/client-scopes',
        });
        this.findOne = this.makeRequest({
            method: 'GET',
            path: '/client-scopes/{id}',
            urlParamKeys: ['id'],
            catchNotFound: true,
        });
        this.update = this.makeUpdateRequest({
            method: 'PUT',
            path: '/client-scopes/{id}',
            urlParamKeys: ['id'],
        });
        this.del = this.makeRequest({
            method: 'DELETE',
            path: '/client-scopes/{id}',
            urlParamKeys: ['id'],
        });
        this.listDefaultClientScopes = this.makeRequest({
            method: 'GET',
            path: '/default-default-client-scopes',
        });
        this.addDefaultClientScope = this.makeRequest({
            method: 'PUT',
            path: '/default-default-client-scopes/{id}',
            urlParamKeys: ['id'],
        });
        this.delDefaultClientScope = this.makeRequest({
            method: 'DELETE',
            path: '/default-default-client-scopes/{id}',
            urlParamKeys: ['id'],
        });
        this.listDefaultOptionalClientScopes = this.makeRequest({
            method: 'GET',
            path: '/default-optional-client-scopes',
        });
        this.addDefaultOptionalClientScope = this.makeRequest({
            method: 'PUT',
            path: '/default-optional-client-scopes/{id}',
            urlParamKeys: ['id'],
        });
        this.delDefaultOptionalClientScope = this.makeRequest({
            method: 'DELETE',
            path: '/default-optional-client-scopes/{id}',
            urlParamKeys: ['id'],
        });
        this.addMultipleProtocolMappers = this.makeUpdateRequest({
            method: 'POST',
            path: '/client-scopes/{id}/protocol-mappers/add-models',
            urlParamKeys: ['id'],
        });
        this.addProtocolMapper = this.makeUpdateRequest({
            method: 'POST',
            path: '/client-scopes/{id}/protocol-mappers/models',
            urlParamKeys: ['id'],
        });
        this.listProtocolMappers = this.makeRequest({
            method: 'GET',
            path: '/client-scopes/{id}/protocol-mappers/models',
            urlParamKeys: ['id'],
        });
        this.findProtocolMapper = this.makeRequest({
            method: 'GET',
            path: '/client-scopes/{id}/protocol-mappers/models/{mapperId}',
            urlParamKeys: ['id', 'mapperId'],
            catchNotFound: true,
        });
        this.findProtocolMappersByProtocol = this.makeRequest({
            method: 'GET',
            path: '/client-scopes/{id}/protocol-mappers/protocol/{protocol}',
            urlParamKeys: ['id', 'protocol'],
            catchNotFound: true,
        });
        this.updateProtocolMapper = this.makeUpdateRequest({
            method: 'PUT',
            path: '/client-scopes/{id}/protocol-mappers/models/{mapperId}',
            urlParamKeys: ['id', 'mapperId'],
        });
        this.delProtocolMapper = this.makeRequest({
            method: 'DELETE',
            path: '/client-scopes/{id}/protocol-mappers/models/{mapperId}',
            urlParamKeys: ['id', 'mapperId'],
        });
        this.listScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/client-scopes/{id}/scope-mappings',
            urlParamKeys: ['id'],
        });
        this.addClientScopeMappings = this.makeUpdateRequest({
            method: 'POST',
            path: '/client-scopes/{id}/scope-mappings/clients/{client}',
            urlParamKeys: ['id', 'client'],
        });
        this.listClientScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/client-scopes/{id}/scope-mappings/clients/{client}',
            urlParamKeys: ['id', 'client'],
        });
        this.listAvailableClientScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/client-scopes/{id}/scope-mappings/clients/{client}/available',
            urlParamKeys: ['id', 'client'],
        });
        this.listCompositeClientScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/client-scopes/{id}/scope-mappings/clients/{client}/composite',
            urlParamKeys: ['id', 'client'],
        });
        this.delClientScopeMappings = this.makeUpdateRequest({
            method: 'DELETE',
            path: '/client-scopes/{id}/scope-mappings/clients/{client}',
            urlParamKeys: ['id', 'client'],
        });
        this.addRealmScopeMappings = this.makeUpdateRequest({
            method: 'POST',
            path: '/client-scopes/{id}/scope-mappings/realm',
            urlParamKeys: ['id'],
        });
        this.listRealmScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/client-scopes/{id}/scope-mappings/realm',
            urlParamKeys: ['id'],
        });
        this.listAvailableRealmScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/client-scopes/{id}/scope-mappings/realm/available',
            urlParamKeys: ['id'],
        });
        this.listCompositeRealmScopeMappings = this.makeRequest({
            method: 'GET',
            path: '/client-scopes/{id}/scope-mappings/realm/composite',
            urlParamKeys: ['id'],
        });
        this.delRealmScopeMappings = this.makeUpdateRequest({
            method: 'DELETE',
            path: '/client-scopes/{id}/scope-mappings/realm',
            urlParamKeys: ['id'],
        });
    }
    async findOneByName(payload) {
        const allScopes = await this.find({
            ...(payload.realm ? { realm: payload.realm } : {}),
        });
        return allScopes.find((item) => item.name === payload.name);
    }
    async delByName(payload) {
        const scope = await this.findOneByName(payload);
        if (!scope) {
            throw new Error('Scope not found.');
        }
        await this.del({
            ...(payload.realm ? { realm: payload.realm } : {}),
            id: scope.id,
        });
    }
    async findProtocolMapperByName(payload) {
        const allProtocolMappers = await this.listProtocolMappers({
            id: payload.id,
            ...(payload.realm ? { realm: payload.realm } : {}),
        });
        return allProtocolMappers.find((mapper) => mapper.name === payload.name);
    }
}

class Components extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}/components',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.find = this.makeRequest({
            method: 'GET',
        });
        this.create = this.makeRequest({
            method: 'POST',
            returnResourceIdInLocationHeader: { field: 'id' },
        });
        this.findOne = this.makeRequest({
            method: 'GET',
            path: '/{id}',
            urlParamKeys: ['id'],
            catchNotFound: true,
        });
        this.update = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}',
            urlParamKeys: ['id'],
        });
        this.del = this.makeRequest({
            method: 'DELETE',
            path: '/{id}',
            urlParamKeys: ['id'],
        });
        this.listSubComponents = this.makeRequest({
            method: 'GET',
            path: '/{id}/sub-component-types',
            urlParamKeys: ['id'],
            queryParamKeys: ['type'],
        });
    }
}

class Groups extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}/groups',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.find = this.makeRequest({
            method: 'GET',
        });
        this.create = this.makeRequest({
            method: 'POST',
            returnResourceIdInLocationHeader: { field: 'id' },
        });
        this.findOne = this.makeRequest({
            method: 'GET',
            path: '/{id}',
            urlParamKeys: ['id'],
            catchNotFound: true,
        });
        this.update = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}',
            urlParamKeys: ['id'],
        });
        this.del = this.makeRequest({
            method: 'DELETE',
            path: '/{id}',
            urlParamKeys: ['id'],
        });
        this.count = this.makeRequest({
            method: 'GET',
            path: '/count',
        });
        this.setOrCreateChild = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/children',
            urlParamKeys: ['id'],
            returnResourceIdInLocationHeader: { field: 'id' },
        });
        this.listMembers = this.makeRequest({
            method: 'GET',
            path: '/{id}/members',
            urlParamKeys: ['id'],
            catchNotFound: true,
        });
        this.listRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings',
            urlParamKeys: ['id'],
        });
        this.addRealmRoleMappings = this.makeRequest({
            method: 'POST',
            path: '/{id}/role-mappings/realm',
            urlParamKeys: ['id'],
            payloadKey: 'roles',
        });
        this.listRealmRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings/realm',
            urlParamKeys: ['id'],
        });
        this.delRealmRoleMappings = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/role-mappings/realm',
            urlParamKeys: ['id'],
            payloadKey: 'roles',
        });
        this.listAvailableRealmRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings/realm/available',
            urlParamKeys: ['id'],
        });
        this.listCompositeRealmRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings/realm/composite',
            urlParamKeys: ['id'],
        });
        this.listClientRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings/clients/{clientUniqueId}',
            urlParamKeys: ['id', 'clientUniqueId'],
        });
        this.addClientRoleMappings = this.makeRequest({
            method: 'POST',
            path: '/{id}/role-mappings/clients/{clientUniqueId}',
            urlParamKeys: ['id', 'clientUniqueId'],
            payloadKey: 'roles',
        });
        this.delClientRoleMappings = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/role-mappings/clients/{clientUniqueId}',
            urlParamKeys: ['id', 'clientUniqueId'],
            payloadKey: 'roles',
        });
        this.listAvailableClientRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings/clients/{clientUniqueId}/available',
            urlParamKeys: ['id', 'clientUniqueId'],
        });
        this.listCompositeClientRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings/clients/{clientUniqueId}/composite',
            urlParamKeys: ['id', 'clientUniqueId'],
        });
        this.updatePermission = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}/management/permissions',
            urlParamKeys: ['id'],
        });
        this.listPermissions = this.makeRequest({
            method: 'GET',
            path: '/{id}/management/permissions',
            urlParamKeys: ['id'],
        });
    }
}

class IdentityProviders extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}/identity-provider',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.find = this.makeRequest({
            method: 'GET',
            path: '/instances',
        });
        this.create = this.makeRequest({
            method: 'POST',
            path: '/instances',
            returnResourceIdInLocationHeader: { field: 'id' },
        });
        this.findOne = this.makeRequest({
            method: 'GET',
            path: '/instances/{alias}',
            urlParamKeys: ['alias'],
            catchNotFound: true,
        });
        this.update = this.makeUpdateRequest({
            method: 'PUT',
            path: '/instances/{alias}',
            urlParamKeys: ['alias'],
        });
        this.del = this.makeRequest({
            method: 'DELETE',
            path: '/instances/{alias}',
            urlParamKeys: ['alias'],
        });
        this.findFactory = this.makeRequest({
            method: 'GET',
            path: '/providers/{providerId}',
            urlParamKeys: ['providerId'],
        });
        this.findMappers = this.makeRequest({
            method: 'GET',
            path: '/instances/{alias}/mappers',
            urlParamKeys: ['alias'],
        });
        this.findOneMapper = this.makeRequest({
            method: 'GET',
            path: '/instances/{alias}/mappers/{id}',
            urlParamKeys: ['alias', 'id'],
            catchNotFound: true,
        });
        this.createMapper = this.makeRequest({
            method: 'POST',
            path: '/instances/{alias}/mappers',
            urlParamKeys: ['alias'],
            payloadKey: 'identityProviderMapper',
            returnResourceIdInLocationHeader: { field: 'id' },
        });
        this.updateMapper = this.makeUpdateRequest({
            method: 'PUT',
            path: '/instances/{alias}/mappers/{id}',
            urlParamKeys: ['alias', 'id'],
        });
        this.delMapper = this.makeRequest({
            method: 'DELETE',
            path: '/instances/{alias}/mappers/{id}',
            urlParamKeys: ['alias', 'id'],
        });
        this.findMapperTypes = this.makeRequest({
            method: 'GET',
            path: '/instances/{alias}/mapper-types',
            urlParamKeys: ['alias'],
        });
        this.importFromUrl = this.makeRequest({
            method: 'POST',
            path: '/import-config',
        });
        this.updatePermission = this.makeUpdateRequest({
            method: 'PUT',
            path: '/instances/{alias}/management/permissions',
            urlParamKeys: ['alias'],
        });
        this.listPermissions = this.makeRequest({
            method: 'GET',
            path: '/instances/{alias}/management/permissions',
            urlParamKeys: ['alias'],
        });
    }
}

class Realms extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms',
            getBaseUrl: () => client.baseUrl,
        });
        this.find = this.makeRequest({
            method: 'GET',
        });
        this.create = this.makeRequest({
            method: 'POST',
            returnResourceIdInLocationHeader: { field: 'realmName' },
        });
        this.findOne = this.makeRequest({
            method: 'GET',
            path: '/{realm}',
            urlParamKeys: ['realm'],
            catchNotFound: true,
        });
        this.update = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{realm}',
            urlParamKeys: ['realm'],
        });
        this.del = this.makeRequest({
            method: 'DELETE',
            path: '/{realm}',
            urlParamKeys: ['realm'],
        });
        this.partialImport = this.makeRequest({
            method: 'POST',
            path: '/{realm}/partialImport',
            urlParamKeys: ['realm'],
            payloadKey: 'rep',
        });
        this.export = this.makeRequest({
            method: 'POST',
            path: '/{realm}/partial-export',
            urlParamKeys: ['realm'],
            queryParamKeys: ['exportClients', 'exportGroupsAndRoles'],
        });
        this.getDefaultGroups = this.makeRequest({
            method: 'GET',
            path: '/{realm}/default-groups',
            urlParamKeys: ['realm'],
        });
        this.addDefaultGroup = this.makeRequest({
            method: 'PUT',
            path: '/{realm}/default-groups/{id}',
            urlParamKeys: ['realm', 'id'],
        });
        this.removeDefaultGroup = this.makeRequest({
            method: 'DELETE',
            path: '/{realm}/default-groups/{id}',
            urlParamKeys: ['realm', 'id'],
        });
        this.findEvents = this.makeRequest({
            method: 'GET',
            path: '/{realm}/events',
            urlParamKeys: ['realm'],
            queryParamKeys: [
                'client',
                'dateFrom',
                'dateTo',
                'first',
                'ipAddress',
                'max',
                'type',
                'user',
            ],
        });
        this.getConfigEvents = this.makeRequest({
            method: 'GET',
            path: '/{realm}/events/config',
            urlParamKeys: ['realm'],
        });
        this.updateConfigEvents = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{realm}/events/config',
            urlParamKeys: ['realm'],
        });
        this.clearEvents = this.makeRequest({
            method: 'DELETE',
            path: '/{realm}/events',
            urlParamKeys: ['realm'],
        });
        this.clearAdminEvents = this.makeRequest({
            method: 'DELETE',
            path: '/{realm}/admin-events',
            urlParamKeys: ['realm'],
        });
        this.getClientsInitialAccess = this.makeRequest({
            method: 'GET',
            path: '/{realm}/clients-initial-access',
            urlParamKeys: ['realm'],
        });
        this.createClientsInitialAccess = this.makeUpdateRequest({
            method: 'POST',
            path: '/{realm}/clients-initial-access',
            urlParamKeys: ['realm'],
        });
        this.delClientsInitialAccess = this.makeRequest({
            method: 'DELETE',
            path: '/{realm}/clients-initial-access/{id}',
            urlParamKeys: ['realm', 'id'],
        });
        this.removeSession = this.makeRequest({
            method: 'DELETE',
            path: '/{realm}/sessions/{session}',
            urlParamKeys: ['realm', 'session'],
            catchNotFound: true,
        });
        this.findAdminEvents = this.makeRequest({
            method: 'GET',
            path: '/{realm}/admin-events',
            urlParamKeys: ['realm'],
            queryParamKeys: [
                'authClient',
                'authIpAddress',
                'authRealm',
                'authUser',
                'dateFrom',
                'dateTo',
                'max',
                'first',
                'operationTypes',
                'resourcePath',
                'resourceTypes',
            ],
        });
        this.getUsersManagementPermissions = this.makeRequest({
            method: 'GET',
            path: '/{realm}/users-management-permissions',
            urlParamKeys: ['realm'],
        });
        this.updateUsersManagementPermissions = this.makeRequest({
            method: 'PUT',
            path: '/{realm}/users-management-permissions',
            urlParamKeys: ['realm'],
        });
        this.logoutAll = this.makeRequest({
            method: 'POST',
            path: '/{realm}/logout-all',
            urlParamKeys: ['realm'],
        });
        this.deleteSession = this.makeRequest({
            method: 'DELETE',
            path: '/{realm}/sessions/{session}',
            urlParamKeys: ['realm', 'session'],
        });
        this.pushRevocation = this.makeRequest({
            method: 'POST',
            path: '/{realm}/push-revocation',
            urlParamKeys: ['realm'],
            ignoredKeys: ['realm'],
        });
        this.getKeys = this.makeRequest({
            method: 'GET',
            path: '/{realm}/keys',
            urlParamKeys: ['realm'],
        });
        this.testLDAPConnection = this.makeUpdateRequest({
            method: 'POST',
            path: '/{realm}/testLDAPConnection',
            urlParamKeys: ['realm'],
        });
        this.testSMTPConnection = this.makeUpdateRequest({
            method: 'POST',
            path: '/{realm}/testSMTPConnection',
            urlParamKeys: ['realm'],
        });
        this.ldapServerCapabilities = this.makeUpdateRequest({
            method: 'POST',
            path: '/{realm}/ldap-server-capabilities',
            urlParamKeys: ['realm'],
        });
        this.getRealmSpecificLocales = this.makeRequest({
            method: 'GET',
            path: '/{realm}/localization',
            urlParamKeys: ['realm'],
        });
        this.getRealmLocalizationTexts = this.makeRequest({
            method: 'GET',
            path: '/{realm}/localization/{selectedLocale}',
            urlParamKeys: ['realm', 'selectedLocale'],
        });
        this.addLocalization = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{realm}/localization/{selectedLocale}/{key}',
            urlParamKeys: ['realm', 'selectedLocale', 'key'],
            headers: { 'content-type': 'text/plain' },
        });
        this.deleteRealmLocalizationTexts = this.makeRequest({
            method: 'DELETE',
            path: '/{realm}/localization/{selectedLocale}/{key}',
            urlParamKeys: ['realm', 'selectedLocale', 'key'],
        });
    }
}

class Roles extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.find = this.makeRequest({
            method: 'GET',
            path: '/roles',
        });
        this.create = this.makeRequest({
            method: 'POST',
            path: '/roles',
            returnResourceIdInLocationHeader: { field: 'roleName' },
        });
        this.findOneByName = this.makeRequest({
            method: 'GET',
            path: '/roles/{name}',
            urlParamKeys: ['name'],
            catchNotFound: true,
        });
        this.updateByName = this.makeUpdateRequest({
            method: 'PUT',
            path: '/roles/{name}',
            urlParamKeys: ['name'],
        });
        this.delByName = this.makeRequest({
            method: 'DELETE',
            path: '/roles/{name}',
            urlParamKeys: ['name'],
        });
        this.findUsersWithRole = this.makeRequest({
            method: 'GET',
            path: '/roles/{name}/users',
            urlParamKeys: ['name'],
            catchNotFound: true,
        });
        this.findOneById = this.makeRequest({
            method: 'GET',
            path: '/roles-by-id/{id}',
            urlParamKeys: ['id'],
            catchNotFound: true,
        });
        this.createComposite = this.makeUpdateRequest({
            method: 'POST',
            path: '/roles-by-id/{roleId}/composites',
            urlParamKeys: ['roleId'],
        });
        this.getCompositeRoles = this.makeRequest({
            method: 'GET',
            path: '/roles-by-id/{id}/composites',
            urlParamKeys: ['id'],
        });
        this.getCompositeRolesForRealm = this.makeRequest({
            method: 'GET',
            path: '/roles-by-id/{id}/composites/realm',
            urlParamKeys: ['id'],
        });
        this.getCompositeRolesForClient = this.makeRequest({
            method: 'GET',
            path: '/roles-by-id/{id}/composites/clients/{clientId}',
            urlParamKeys: ['id', 'clientId'],
        });
        this.delCompositeRoles = this.makeUpdateRequest({
            method: 'DELETE',
            path: '/roles-by-id/{id}/composites',
            urlParamKeys: ['id'],
        });
        this.updateById = this.makeUpdateRequest({
            method: 'PUT',
            path: '/roles-by-id/{id}',
            urlParamKeys: ['id'],
        });
        this.delById = this.makeRequest({
            method: 'DELETE',
            path: '/roles-by-id/{id}',
            urlParamKeys: ['id'],
        });
        this.updatePermission = this.makeUpdateRequest({
            method: 'PUT',
            path: '/roles-by-id/{id}/management/permissions',
            urlParamKeys: ['id'],
        });
        this.listPermissions = this.makeRequest({
            method: 'GET',
            path: '/roles-by-id/{id}/management/permissions',
            urlParamKeys: ['id'],
        });
    }
}

class ServerInfo extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/serverinfo',
            getBaseUrl: () => client.baseUrl,
        });
        this.find = this.makeRequest({
            method: 'GET',
            path: '/',
        });
    }
}

class Sessions extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}/client-session-stats',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.find = this.makeRequest({
            method: 'GET',
        });
    }
}

class Users extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}/users',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.find = this.makeRequest({
            method: 'GET',
        });
        this.create = this.makeRequest({
            method: 'POST',
            returnResourceIdInLocationHeader: { field: 'id' },
        });
        this.findOne = this.makeRequest({
            method: 'GET',
            path: '/{id}',
            urlParamKeys: ['id'],
            catchNotFound: true,
        });
        this.update = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}',
            urlParamKeys: ['id'],
        });
        this.del = this.makeRequest({
            method: 'DELETE',
            path: '/{id}',
            urlParamKeys: ['id'],
        });
        this.count = this.makeRequest({
            method: 'GET',
            path: '/count',
        });
        this.getProfile = this.makeRequest({
            method: 'GET',
            path: '/profile',
        });
        this.updateProfile = this.makeRequest({
            method: 'PUT',
            path: '/profile',
        });
        this.listRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings',
            urlParamKeys: ['id'],
        });
        this.addRealmRoleMappings = this.makeRequest({
            method: 'POST',
            path: '/{id}/role-mappings/realm',
            urlParamKeys: ['id'],
            payloadKey: 'roles',
        });
        this.listRealmRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings/realm',
            urlParamKeys: ['id'],
        });
        this.delRealmRoleMappings = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/role-mappings/realm',
            urlParamKeys: ['id'],
            payloadKey: 'roles',
        });
        this.listAvailableRealmRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings/realm/available',
            urlParamKeys: ['id'],
        });
        this.listCompositeRealmRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings/realm/composite',
            urlParamKeys: ['id'],
        });
        this.listClientRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings/clients/{clientUniqueId}',
            urlParamKeys: ['id', 'clientUniqueId'],
        });
        this.addClientRoleMappings = this.makeRequest({
            method: 'POST',
            path: '/{id}/role-mappings/clients/{clientUniqueId}',
            urlParamKeys: ['id', 'clientUniqueId'],
            payloadKey: 'roles',
        });
        this.delClientRoleMappings = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/role-mappings/clients/{clientUniqueId}',
            urlParamKeys: ['id', 'clientUniqueId'],
            payloadKey: 'roles',
        });
        this.listAvailableClientRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings/clients/{clientUniqueId}/available',
            urlParamKeys: ['id', 'clientUniqueId'],
        });
        this.listCompositeClientRoleMappings = this.makeRequest({
            method: 'GET',
            path: '/{id}/role-mappings/clients/{clientUniqueId}/composite',
            urlParamKeys: ['id', 'clientUniqueId'],
        });
        this.executeActionsEmail = this.makeRequest({
            method: 'PUT',
            path: '/{id}/execute-actions-email',
            urlParamKeys: ['id'],
            payloadKey: 'actions',
            queryParamKeys: ['lifespan', 'redirectUri', 'clientId'],
            headers: { 'content-type': 'application/json' },
            keyTransform: {
                clientId: 'client_id',
                redirectUri: 'redirect_uri',
            },
        });
        this.listGroups = this.makeRequest({
            method: 'GET',
            path: '/{id}/groups',
            urlParamKeys: ['id'],
        });
        this.addToGroup = this.makeRequest({
            method: 'PUT',
            path: '/{id}/groups/{groupId}',
            urlParamKeys: ['id', 'groupId'],
        });
        this.delFromGroup = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/groups/{groupId}',
            urlParamKeys: ['id', 'groupId'],
        });
        this.countGroups = this.makeRequest({
            method: 'GET',
            path: '/{id}/groups/count',
            urlParamKeys: ['id'],
        });
        this.listFederatedIdentities = this.makeRequest({
            method: 'GET',
            path: '/{id}/federated-identity',
            urlParamKeys: ['id'],
        });
        this.addToFederatedIdentity = this.makeRequest({
            method: 'POST',
            path: '/{id}/federated-identity/{federatedIdentityId}',
            urlParamKeys: ['id', 'federatedIdentityId'],
            payloadKey: 'federatedIdentity',
        });
        this.delFromFederatedIdentity = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/federated-identity/{federatedIdentityId}',
            urlParamKeys: ['id', 'federatedIdentityId'],
        });
        this.removeTotp = this.makeRequest({
            method: 'PUT',
            path: '/{id}/remove-totp',
            urlParamKeys: ['id'],
        });
        this.resetPassword = this.makeRequest({
            method: 'PUT',
            path: '/{id}/reset-password',
            urlParamKeys: ['id'],
            payloadKey: 'credential',
        });
        this.getCredentials = this.makeRequest({
            method: 'GET',
            path: '/{id}/credentials',
            urlParamKeys: ['id'],
        });
        this.deleteCredential = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/credentials/{credentialId}',
            urlParamKeys: ['id', 'credentialId'],
        });
        this.updateCredentialLabel = this.makeUpdateRequest({
            method: 'PUT',
            path: '/{id}/credentials/{credentialId}/userLabel',
            urlParamKeys: ['id', 'credentialId'],
            headers: { 'content-type': 'text/plain' },
        });
        this.moveCredentialPositionDown = this.makeRequest({
            method: 'POST',
            path: '/{id}/credentials/{credentialId}/moveAfter/{newPreviousCredentialId}',
            urlParamKeys: ['id', 'credentialId', 'newPreviousCredentialId'],
        });
        this.moveCredentialPositionUp = this.makeRequest({
            method: 'POST',
            path: '/{id}/credentials/{credentialId}/moveToFirst',
            urlParamKeys: ['id', 'credentialId'],
        });
        this.sendVerifyEmail = this.makeRequest({
            method: 'PUT',
            path: '/{id}/send-verify-email',
            urlParamKeys: ['id'],
            queryParamKeys: ['clientId', 'redirectUri'],
            keyTransform: {
                clientId: 'client_id',
                redirectUri: 'redirect_uri',
            },
        });
        this.listSessions = this.makeRequest({
            method: 'GET',
            path: '/{id}/sessions',
            urlParamKeys: ['id'],
        });
        this.listOfflineSessions = this.makeRequest({
            method: 'GET',
            path: '/{id}/offline-sessions/{clientId}',
            urlParamKeys: ['id', 'clientId'],
        });
        this.logout = this.makeRequest({
            method: 'POST',
            path: '/{id}/logout',
            urlParamKeys: ['id'],
        });
        this.listConsents = this.makeRequest({
            method: 'GET',
            path: '/{id}/consents',
            urlParamKeys: ['id'],
        });
        this.impersonation = this.makeUpdateRequest({
            method: 'POST',
            path: '/{id}/impersonation',
            urlParamKeys: ['id'],
        });
        this.revokeConsent = this.makeRequest({
            method: 'DELETE',
            path: '/{id}/consents/{clientId}',
            urlParamKeys: ['id', 'clientId'],
        });
    }
}

class UserStorageProvider extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/realms/{realm}/user-storage',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.name = this.makeRequest({
            method: 'GET',
            path: '/{id}/name',
            urlParamKeys: ['id'],
        });
        this.removeImportedUsers = this.makeRequest({
            method: 'POST',
            path: '/{id}/remove-imported-users',
            urlParamKeys: ['id'],
        });
        this.sync = this.makeRequest({
            method: 'POST',
            path: '/{id}/sync',
            urlParamKeys: ['id'],
            queryParamKeys: ['action'],
        });
        this.unlinkUsers = this.makeRequest({
            method: 'POST',
            path: '/{id}/unlink-users',
            urlParamKeys: ['id'],
        });
        this.mappersSync = this.makeRequest({
            method: 'POST',
            path: '/{parentId}/mappers/{id}/sync',
            urlParamKeys: ['id', 'parentId'],
            queryParamKeys: ['direction'],
        });
    }
}

class WhoAmI extends Resource {
    constructor(client) {
        super(client, {
            path: '/admin/{realm}/console',
            getUrlParams: () => ({
                realm: client.realmName,
            }),
            getBaseUrl: () => client.baseUrl,
        });
        this.find = this.makeRequest({
            method: 'GET',
            path: '/whoami',
        });
    }
}

function camelCase(str) {
    return str.replace(/[_.-](\w|$)/g, function (_, x) {
        return x.toUpperCase();
    });
}
function walk(obj) {
    if (!obj || typeof obj !== "object")
        return obj;
    if (obj instanceof Date || obj instanceof RegExp)
        return obj;
    if (Array.isArray(obj))
        return obj.map(walk);
    return Object.keys(obj).reduce((res, key) => {
        const camel = camelCase(key);
        res[camel] = walk(obj[key]);
        return res;
    }, {});
}
function camelize(obj) {
    return typeof obj === "string" ? camelCase(obj) : walk(obj);
}

const defaultBaseUrl = 'http://127.0.0.1:8080/auth';
const defaultRealm = 'master';

const getToken = async (settings) => {
    const baseUrl = settings.baseUrl || defaultBaseUrl;
    const realmName = settings.realmName || defaultRealm;
    const url = `${baseUrl}/realms/${realmName}/protocol/openid-connect/token`;
    const credentials = settings.credentials || {};
    const payload = queryString.stringify({
        username: credentials.username,
        password: credentials.password,
        grant_type: credentials.grantType,
        client_id: credentials.clientId,
        totp: credentials.totp,
        ...(credentials.offlineToken ? { scope: 'offline_access' } : {}),
        ...(credentials.refreshToken ? {
            refresh_token: credentials.refreshToken,
            client_secret: credentials.clientSecret,
        } : {}),
    });
    const config = {
        ...settings.requestConfig,
    };
    if (credentials.clientSecret) {
        config.auth = {
            username: credentials.clientId,
            password: credentials.clientSecret,
        };
    }
    const { data } = await axios.default.post(url, payload, config);
    return camelize(data);
};

class KeycloakAdminClient {
    constructor(connectionConfig) {
        this.baseUrl =
            (connectionConfig && connectionConfig.baseUrl) || defaultBaseUrl;
        this.realmName =
            (connectionConfig && connectionConfig.realmName) || defaultRealm;
        this.requestConfig = connectionConfig && connectionConfig.requestConfig;
        this.globalRequestArgOptions = connectionConfig && connectionConfig.requestArgOptions;
        this.users = new Users(this);
        this.userStorageProvider = new UserStorageProvider(this);
        this.groups = new Groups(this);
        this.roles = new Roles(this);
        this.clients = new Clients(this);
        this.realms = new Realms(this);
        this.clientScopes = new ClientScopes(this);
        this.clientPolicies = new ClientPolicies(this);
        this.identityProviders = new IdentityProviders(this);
        this.components = new Components(this);
        this.authenticationManagement = new AuthenticationManagement(this);
        this.serverInfo = new ServerInfo(this);
        this.whoAmI = new WhoAmI(this);
        this.sessions = new Sessions(this);
        this.attackDetection = new AttackDetection(this);
        this.cache = new Cache(this);
    }
    async auth(credentials) {
        const { accessToken, refreshToken } = await getToken({
            baseUrl: this.baseUrl,
            realmName: this.realmName,
            credentials,
            requestConfig: this.requestConfig,
        });
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    registerTokenProvider(provider) {
        if (this.tokenProvider) {
            throw new Error('An existing token provider was already registered.');
        }
        this.tokenProvider = provider;
    }
    setAccessToken(token) {
        this.accessToken = token;
    }
    async getAccessToken() {
        if (this.tokenProvider) {
            return this.tokenProvider.getAccessToken();
        }
        return this.accessToken;
    }
    getRequestConfig() {
        return this.requestConfig;
    }
    getGlobalRequestArgOptions() {
        return this.globalRequestArgOptions;
    }
    setConfig(connectionConfig) {
        if (typeof connectionConfig.baseUrl === 'string' &&
            connectionConfig.baseUrl) {
            this.baseUrl = connectionConfig.baseUrl;
        }
        if (typeof connectionConfig.realmName === 'string' &&
            connectionConfig.realmName) {
            this.realmName = connectionConfig.realmName;
        }
        this.requestConfig = connectionConfig.requestConfig;
    }
}

export default KeycloakAdminClient;
