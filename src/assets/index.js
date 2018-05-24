/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./configuration/instagram/access.ts":
/*!*******************************************!*\
  !*** ./configuration/instagram/access.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.access = void 0;\nvar access = {\n  id: '1983140883',\n  token: '1983140883.c4c213d.70716b04afc14080a94e4ccb0c35d1b2'\n};\nexports.access = access;\n\n//# sourceURL=webpack:///./configuration/instagram/access.ts?");

/***/ }),

/***/ "./node_modules/jsonp/index.js":
/*!*************************************!*\
  !*** ./node_modules/jsonp/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Module dependencies\n */\n\nvar debug = __webpack_require__(/*! debug */ \"./node_modules/jsonp/node_modules/debug/src/browser.js\")('jsonp');\n\n/**\n * Module exports.\n */\n\nmodule.exports = jsonp;\n\n/**\n * Callback index.\n */\n\nvar count = 0;\n\n/**\n * Noop function.\n */\n\nfunction noop(){}\n\n/**\n * JSONP handler\n *\n * Options:\n *  - param {String} qs parameter (`callback`)\n *  - prefix {String} qs parameter (`__jp`)\n *  - name {String} qs parameter (`prefix` + incr)\n *  - timeout {Number} how long after a timeout error is emitted (`60000`)\n *\n * @param {String} url\n * @param {Object|Function} optional options / callback\n * @param {Function} optional callback\n */\n\nfunction jsonp(url, opts, fn){\n  if ('function' == typeof opts) {\n    fn = opts;\n    opts = {};\n  }\n  if (!opts) opts = {};\n\n  var prefix = opts.prefix || '__jp';\n\n  // use the callback name that was passed if one was provided.\n  // otherwise generate a unique name by incrementing our counter.\n  var id = opts.name || (prefix + (count++));\n\n  var param = opts.param || 'callback';\n  var timeout = null != opts.timeout ? opts.timeout : 60000;\n  var enc = encodeURIComponent;\n  var target = document.getElementsByTagName('script')[0] || document.head;\n  var script;\n  var timer;\n\n\n  if (timeout) {\n    timer = setTimeout(function(){\n      cleanup();\n      if (fn) fn(new Error('Timeout'));\n    }, timeout);\n  }\n\n  function cleanup(){\n    if (script.parentNode) script.parentNode.removeChild(script);\n    window[id] = noop;\n    if (timer) clearTimeout(timer);\n  }\n\n  function cancel(){\n    if (window[id]) {\n      cleanup();\n    }\n  }\n\n  window[id] = function(data){\n    debug('jsonp got', data);\n    cleanup();\n    if (fn) fn(null, data);\n  };\n\n  // add qs component\n  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);\n  url = url.replace('?&', '?');\n\n  debug('jsonp req \"%s\"', url);\n\n  // create script\n  script = document.createElement('script');\n  script.src = url;\n  target.parentNode.insertBefore(script, target);\n\n  return cancel;\n}\n\n\n//# sourceURL=webpack:///./node_modules/jsonp/index.js?");

/***/ }),

/***/ "./node_modules/jsonp/node_modules/debug/src/browser.js":
/*!**************************************************************!*\
  !*** ./node_modules/jsonp/node_modules/debug/src/browser.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {/**\n * This is the web browser implementation of `debug()`.\n *\n * Expose `debug()` as the module.\n */\n\nexports = module.exports = __webpack_require__(/*! ./debug */ \"./node_modules/jsonp/node_modules/debug/src/debug.js\");\nexports.log = log;\nexports.formatArgs = formatArgs;\nexports.save = save;\nexports.load = load;\nexports.useColors = useColors;\nexports.storage = 'undefined' != typeof chrome\n               && 'undefined' != typeof chrome.storage\n                  ? chrome.storage.local\n                  : localstorage();\n\n/**\n * Colors.\n */\n\nexports.colors = [\n  'lightseagreen',\n  'forestgreen',\n  'goldenrod',\n  'dodgerblue',\n  'darkorchid',\n  'crimson'\n];\n\n/**\n * Currently only WebKit-based Web Inspectors, Firefox >= v31,\n * and the Firebug extension (any Firefox version) are known\n * to support \"%c\" CSS customizations.\n *\n * TODO: add a `localStorage` variable to explicitly enable/disable colors\n */\n\nfunction useColors() {\n  // NB: In an Electron preload script, document will be defined but not fully\n  // initialized. Since we know we're in Chrome, we'll just detect this case\n  // explicitly\n  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {\n    return true;\n  }\n\n  // is webkit? http://stackoverflow.com/a/16459606/376773\n  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632\n  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||\n    // is firebug? http://stackoverflow.com/a/398120/376773\n    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||\n    // is firefox >= v31?\n    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages\n    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\\/(\\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||\n    // double check webkit in userAgent just in case we are in a worker\n    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\\/(\\d+)/));\n}\n\n/**\n * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.\n */\n\nexports.formatters.j = function(v) {\n  try {\n    return JSON.stringify(v);\n  } catch (err) {\n    return '[UnexpectedJSONParseError]: ' + err.message;\n  }\n};\n\n\n/**\n * Colorize log arguments if enabled.\n *\n * @api public\n */\n\nfunction formatArgs(args) {\n  var useColors = this.useColors;\n\n  args[0] = (useColors ? '%c' : '')\n    + this.namespace\n    + (useColors ? ' %c' : ' ')\n    + args[0]\n    + (useColors ? '%c ' : ' ')\n    + '+' + exports.humanize(this.diff);\n\n  if (!useColors) return;\n\n  var c = 'color: ' + this.color;\n  args.splice(1, 0, c, 'color: inherit')\n\n  // the final \"%c\" is somewhat tricky, because there could be other\n  // arguments passed either before or after the %c, so we need to\n  // figure out the correct index to insert the CSS into\n  var index = 0;\n  var lastC = 0;\n  args[0].replace(/%[a-zA-Z%]/g, function(match) {\n    if ('%%' === match) return;\n    index++;\n    if ('%c' === match) {\n      // we only are interested in the *last* %c\n      // (the user may have provided their own)\n      lastC = index;\n    }\n  });\n\n  args.splice(lastC, 0, c);\n}\n\n/**\n * Invokes `console.log()` when available.\n * No-op when `console.log` is not a \"function\".\n *\n * @api public\n */\n\nfunction log() {\n  // this hackery is required for IE8/9, where\n  // the `console.log` function doesn't have 'apply'\n  return 'object' === typeof console\n    && console.log\n    && Function.prototype.apply.call(console.log, console, arguments);\n}\n\n/**\n * Save `namespaces`.\n *\n * @param {String} namespaces\n * @api private\n */\n\nfunction save(namespaces) {\n  try {\n    if (null == namespaces) {\n      exports.storage.removeItem('debug');\n    } else {\n      exports.storage.debug = namespaces;\n    }\n  } catch(e) {}\n}\n\n/**\n * Load `namespaces`.\n *\n * @return {String} returns the previously persisted debug modes\n * @api private\n */\n\nfunction load() {\n  var r;\n  try {\n    r = exports.storage.debug;\n  } catch(e) {}\n\n  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG\n  if (!r && typeof process !== 'undefined' && 'env' in process) {\n    r = process.env.DEBUG;\n  }\n\n  return r;\n}\n\n/**\n * Enable namespaces listed in `localStorage.debug` initially.\n */\n\nexports.enable(load());\n\n/**\n * Localstorage attempts to return the localstorage.\n *\n * This is necessary because safari throws\n * when a user disables cookies/localstorage\n * and you attempt to access it.\n *\n * @return {LocalStorage}\n * @api private\n */\n\nfunction localstorage() {\n  try {\n    return window.localStorage;\n  } catch (e) {}\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/jsonp/node_modules/debug/src/browser.js?");

/***/ }),

/***/ "./node_modules/jsonp/node_modules/debug/src/debug.js":
/*!************************************************************!*\
  !*** ./node_modules/jsonp/node_modules/debug/src/debug.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n/**\n * This is the common logic for both the Node.js and web browser\n * implementations of `debug()`.\n *\n * Expose `debug()` as the module.\n */\n\nexports = module.exports = createDebug.debug = createDebug['default'] = createDebug;\nexports.coerce = coerce;\nexports.disable = disable;\nexports.enable = enable;\nexports.enabled = enabled;\nexports.humanize = __webpack_require__(/*! ms */ \"./node_modules/jsonp/node_modules/ms/index.js\");\n\n/**\n * The currently active debug mode names, and names to skip.\n */\n\nexports.names = [];\nexports.skips = [];\n\n/**\n * Map of special \"%n\" handling functions, for the debug \"format\" argument.\n *\n * Valid key names are a single, lower or upper-case letter, i.e. \"n\" and \"N\".\n */\n\nexports.formatters = {};\n\n/**\n * Previous log timestamp.\n */\n\nvar prevTime;\n\n/**\n * Select a color.\n * @param {String} namespace\n * @return {Number}\n * @api private\n */\n\nfunction selectColor(namespace) {\n  var hash = 0, i;\n\n  for (i in namespace) {\n    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);\n    hash |= 0; // Convert to 32bit integer\n  }\n\n  return exports.colors[Math.abs(hash) % exports.colors.length];\n}\n\n/**\n * Create a debugger with the given `namespace`.\n *\n * @param {String} namespace\n * @return {Function}\n * @api public\n */\n\nfunction createDebug(namespace) {\n\n  function debug() {\n    // disabled?\n    if (!debug.enabled) return;\n\n    var self = debug;\n\n    // set `diff` timestamp\n    var curr = +new Date();\n    var ms = curr - (prevTime || curr);\n    self.diff = ms;\n    self.prev = prevTime;\n    self.curr = curr;\n    prevTime = curr;\n\n    // turn the `arguments` into a proper Array\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n\n    args[0] = exports.coerce(args[0]);\n\n    if ('string' !== typeof args[0]) {\n      // anything else let's inspect with %O\n      args.unshift('%O');\n    }\n\n    // apply any `formatters` transformations\n    var index = 0;\n    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {\n      // if we encounter an escaped % then don't increase the array index\n      if (match === '%%') return match;\n      index++;\n      var formatter = exports.formatters[format];\n      if ('function' === typeof formatter) {\n        var val = args[index];\n        match = formatter.call(self, val);\n\n        // now we need to remove `args[index]` since it's inlined in the `format`\n        args.splice(index, 1);\n        index--;\n      }\n      return match;\n    });\n\n    // apply env-specific formatting (colors, etc.)\n    exports.formatArgs.call(self, args);\n\n    var logFn = debug.log || exports.log || console.log.bind(console);\n    logFn.apply(self, args);\n  }\n\n  debug.namespace = namespace;\n  debug.enabled = exports.enabled(namespace);\n  debug.useColors = exports.useColors();\n  debug.color = selectColor(namespace);\n\n  // env-specific initialization logic for debug instances\n  if ('function' === typeof exports.init) {\n    exports.init(debug);\n  }\n\n  return debug;\n}\n\n/**\n * Enables a debug mode by namespaces. This can include modes\n * separated by a colon and wildcards.\n *\n * @param {String} namespaces\n * @api public\n */\n\nfunction enable(namespaces) {\n  exports.save(namespaces);\n\n  exports.names = [];\n  exports.skips = [];\n\n  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\\s,]+/);\n  var len = split.length;\n\n  for (var i = 0; i < len; i++) {\n    if (!split[i]) continue; // ignore empty strings\n    namespaces = split[i].replace(/\\*/g, '.*?');\n    if (namespaces[0] === '-') {\n      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));\n    } else {\n      exports.names.push(new RegExp('^' + namespaces + '$'));\n    }\n  }\n}\n\n/**\n * Disable debug output.\n *\n * @api public\n */\n\nfunction disable() {\n  exports.enable('');\n}\n\n/**\n * Returns true if the given mode name is enabled, false otherwise.\n *\n * @param {String} name\n * @return {Boolean}\n * @api public\n */\n\nfunction enabled(name) {\n  var i, len;\n  for (i = 0, len = exports.skips.length; i < len; i++) {\n    if (exports.skips[i].test(name)) {\n      return false;\n    }\n  }\n  for (i = 0, len = exports.names.length; i < len; i++) {\n    if (exports.names[i].test(name)) {\n      return true;\n    }\n  }\n  return false;\n}\n\n/**\n * Coerce `val`.\n *\n * @param {Mixed} val\n * @return {Mixed}\n * @api private\n */\n\nfunction coerce(val) {\n  if (val instanceof Error) return val.stack || val.message;\n  return val;\n}\n\n\n//# sourceURL=webpack:///./node_modules/jsonp/node_modules/debug/src/debug.js?");

/***/ }),

/***/ "./node_modules/jsonp/node_modules/ms/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/jsonp/node_modules/ms/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar y = d * 365.25;\n\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} [options]\n * @throws {Error} throw an error if val is not a non-empty string or a number\n * @return {String|Number}\n * @api public\n */\n\nmodule.exports = function(val, options) {\n  options = options || {};\n  var type = typeof val;\n  if (type === 'string' && val.length > 0) {\n    return parse(val);\n  } else if (type === 'number' && isNaN(val) === false) {\n    return options.long ? fmtLong(val) : fmtShort(val);\n  }\n  throw new Error(\n    'val is not a non-empty string or a valid number. val=' +\n      JSON.stringify(val)\n  );\n};\n\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */\n\nfunction parse(str) {\n  str = String(str);\n  if (str.length > 100) {\n    return;\n  }\n  var match = /^((?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(\n    str\n  );\n  if (!match) {\n    return;\n  }\n  var n = parseFloat(match[1]);\n  var type = (match[2] || 'ms').toLowerCase();\n  switch (type) {\n    case 'years':\n    case 'year':\n    case 'yrs':\n    case 'yr':\n    case 'y':\n      return n * y;\n    case 'days':\n    case 'day':\n    case 'd':\n      return n * d;\n    case 'hours':\n    case 'hour':\n    case 'hrs':\n    case 'hr':\n    case 'h':\n      return n * h;\n    case 'minutes':\n    case 'minute':\n    case 'mins':\n    case 'min':\n    case 'm':\n      return n * m;\n    case 'seconds':\n    case 'second':\n    case 'secs':\n    case 'sec':\n    case 's':\n      return n * s;\n    case 'milliseconds':\n    case 'millisecond':\n    case 'msecs':\n    case 'msec':\n    case 'ms':\n      return n;\n    default:\n      return undefined;\n  }\n}\n\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtShort(ms) {\n  if (ms >= d) {\n    return Math.round(ms / d) + 'd';\n  }\n  if (ms >= h) {\n    return Math.round(ms / h) + 'h';\n  }\n  if (ms >= m) {\n    return Math.round(ms / m) + 'm';\n  }\n  if (ms >= s) {\n    return Math.round(ms / s) + 's';\n  }\n  return ms + 'ms';\n}\n\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtLong(ms) {\n  return plural(ms, d, 'day') ||\n    plural(ms, h, 'hour') ||\n    plural(ms, m, 'minute') ||\n    plural(ms, s, 'second') ||\n    ms + ' ms';\n}\n\n/**\n * Pluralization helper.\n */\n\nfunction plural(ms, n, name) {\n  if (ms < n) {\n    return;\n  }\n  if (ms < n * 1.5) {\n    return Math.floor(ms / n) + ' ' + name;\n  }\n  return Math.ceil(ms / n) + ' ' + name + 's';\n}\n\n\n//# sourceURL=webpack:///./node_modules/jsonp/node_modules/ms/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./src/scripts/index.ts":
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ../scss/index.scss */ \"./src/scss/index.scss\");\n\nvar _cookieNotification = _interopRequireDefault(__webpack_require__(/*! ./modules/cookie-notification */ \"./src/scripts/modules/cookie-notification.ts\"));\n\nvar _fadeThrough = _interopRequireDefault(__webpack_require__(/*! ./modules/fade-through */ \"./src/scripts/modules/fade-through.ts\"));\n\nvar _instagramFeed = _interopRequireDefault(__webpack_require__(/*! ./modules/instagram-feed */ \"./src/scripts/modules/instagram-feed.ts\"));\n\nvar _trackingFacebook = _interopRequireDefault(__webpack_require__(/*! ./modules/tracking-facebook */ \"./src/scripts/modules/tracking-facebook.ts\"));\n\nvar _numberInput = _interopRequireDefault(__webpack_require__(/*! ./modules/number-input */ \"./src/scripts/modules/number-input.ts\"));\n\nvar _expander = __webpack_require__(/*! ./modules/expander */ \"./src/scripts/modules/expander.ts\");\n\nvar _smoothScrolling = __webpack_require__(/*! ./modules/smooth-scrolling */ \"./src/scripts/modules/smooth-scrolling.ts\");\n\nvar _stickyNavigation = _interopRequireDefault(__webpack_require__(/*! ./modules/sticky-navigation */ \"./src/scripts/modules/sticky-navigation.ts\"));\n\nvar _trackingProjectCece = _interopRequireDefault(__webpack_require__(/*! ./modules/tracking-project-cece */ \"./src/scripts/modules/tracking-project-cece.ts\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// tslint:disable-next-line:no-import-side-effect\n(0, _trackingFacebook.default)();\n\nvar init = function init() {\n  (0, _stickyNavigation.default)();\n  (0, _cookieNotification.default)();\n  (0, _fadeThrough.default)();\n  (0, _expander.initExpander)();\n  (0, _smoothScrolling.initSmoothScrolling)();\n  (0, _instagramFeed.default)();\n  (0, _trackingProjectCece.default)();\n  (0, _numberInput.default)();\n};\n\nwindow.addEventListener('load', init);\n\n//# sourceURL=webpack:///./src/scripts/index.ts?");

/***/ }),

/***/ "./src/scripts/modules/cookie-notification.ts":
/*!****************************************************!*\
  !*** ./src/scripts/modules/cookie-notification.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar notification = document.querySelector('.js-cookie-notification');\nvar closeButton = document.querySelector('.js-cookie-notification-close');\nvar localStorage = window.localStorage;\n\nvar notificationHidden = function notificationHidden() {\n  return localStorage.getItem('hideCookieNotification');\n};\n\nvar hideNotification = function hideNotification() {\n  localStorage.setItem('hideCookieNotification', 'true');\n  notification.style.display = 'none';\n};\n\nvar _default = function _default() {\n  if (notificationHidden()) {\n    return;\n  }\n\n  notification.style.display = 'block';\n  closeButton.addEventListener('click', hideNotification);\n  closeButton.removeEventListener('click', hideNotification);\n};\n\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/scripts/modules/cookie-notification.ts?");

/***/ }),

/***/ "./src/scripts/modules/expander.ts":
/*!*****************************************!*\
  !*** ./src/scripts/modules/expander.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.initExpander = exports.resetState = exports.expander = void 0;\n\nvar _smoothScrolling = __webpack_require__(/*! ./smooth-scrolling */ \"./src/scripts/modules/smooth-scrolling.ts\");\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nvar expander = function expander(contentList, paneList) {\n  if (paneList.length === 0) {\n    return;\n  }\n\n  if (contentList.length === 0) {\n    return;\n  }\n\n  var root = document.querySelector(':root');\n\n  if (root.offsetWidth > 768) {\n    return;\n  }\n\n  var heightList = _toConsumableArray(contentList).map(function (el) {\n    return el.offsetHeight;\n  });\n\n  var setCssVariables = function setCssVariables(nodeList, numbers) {\n    _toConsumableArray(nodeList).forEach(function (el, i) {\n      el.style.setProperty('--pane-height', \"\".concat(numbers[i]));\n    });\n  };\n\n  setCssVariables(paneList, heightList);\n};\n\nexports.expander = expander;\n\nvar resetState = function resetState(inputList, paneList) {\n  if (inputList.length === 0) {\n    return;\n  }\n\n  var resetPosition = function resetPosition() {\n    paneList.forEach(function (pane) {\n      pane.scrollTop = 0;\n    });\n  };\n\n  _toConsumableArray(inputList).forEach(function (input) {\n    input.addEventListener('click', resetPosition);\n  });\n};\n\nexports.resetState = resetState;\n\nvar initExpander = function initExpander() {\n  var panes = document.querySelectorAll('.js_expander');\n  resetState(document.querySelectorAll('.js_state'), panes);\n  expander(document.querySelectorAll('.js_content'), panes);\n  (0, _smoothScrolling.smoothScrolling)(document.querySelectorAll('.js_expander_lead'), panes);\n};\n\nexports.initExpander = initExpander;\n\n//# sourceURL=webpack:///./src/scripts/modules/expander.ts?");

/***/ }),

/***/ "./src/scripts/modules/fade-through.ts":
/*!*********************************************!*\
  !*** ./src/scripts/modules/fade-through.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nvar fadeThrough = function fadeThrough() {\n  var el = document.querySelector('.js_fadeThrough');\n\n  if (!el) {\n    return;\n  }\n\n  var btnList = document.querySelectorAll('.js_fadeThrough-btn');\n\n  if (!btnList) {\n    return;\n  }\n\n  var isVisible = false;\n\n  var handleClick = function handleClick(e) {\n    isVisible = !isVisible;\n    el.style.setProperty('--is-visible', \"\".concat(isVisible ? 1 : 0));\n  };\n\n  _toConsumableArray(btnList).forEach(function (btn) {\n    btn.addEventListener('click', handleClick);\n  });\n};\n\nvar _default = fadeThrough;\nexports.default = _default;\n\n//# sourceURL=webpack:///./src/scripts/modules/fade-through.ts?");

/***/ }),

/***/ "./src/scripts/modules/instagram-feed.ts":
/*!***********************************************!*\
  !*** ./src/scripts/modules/instagram-feed.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = instagramFeed;\n\nvar _access = __webpack_require__(/*! ../../../configuration/instagram/access */ \"./configuration/instagram/access.ts\");\n\nvar _jsonp = _interopRequireDefault(__webpack_require__(/*! jsonp */ \"./node_modules/jsonp/index.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction instagramFeed() {\n  var node = document.querySelector('.js_instagramFeed');\n\n  if (!node) {\n    return;\n  }\n\n  if ((typeof Promise === \"undefined\" ? \"undefined\" : _typeof(Promise)) === undefined) {\n    return;\n  }\n\n  var feedLimit = 11;\n  var instaURL = \"https://api.instagram.com/v1/users/\".concat(_access.access['id'], \"/media/recent/?access_token=\").concat(_access.access['token'], \"&callback=callback\"); // tslint:disable-next-line\n\n  var getMediaFeed = function getMediaFeed(url) {\n    return new Promise(function (resolve, reject) {\n      (0, _jsonp.default)(url, function (err, data) {\n        if (err) {\n          reject(Error(\"Couldn't get Insta JSON feed; error code: + \".concat(err)));\n          throw err;\n        }\n\n        resolve(data);\n      });\n    });\n  };\n\n  var limitArr = function limitArr(value) {\n    return value <= feedLimit;\n  };\n\n  var filteredArr = function filteredArr(arr) {\n    return arr.filter(function (el, i) {\n      return limitArr(i);\n    });\n  };\n\n  var convertUnixDate = function convertUnixDate(timestamp) {\n    var date = new Date(parseInt(\"\".concat(timestamp), 10));\n    return date.toDateString().slice(0, -4);\n  };\n\n  var generateFeedTemplate = function generateFeedTemplate(arr) {\n    var feedTemplate = arr.map(function (el, i) {\n      var thumbnail = \"\\n        <div class=\\\"Feed-thumbnail\\\">\\n          <label class=\\\"Feed-trigger\\\" for=\\\"lightbox-\".concat(i, \"\\\" style=\\\"background-image: url(\").concat(el.images.standard_resolution.url, \"), linear-gradient(35deg, #FFCA54, #FF7163 80%)\\\">\\n          </label>\\n          <img class=\\\"Feed-img\\\"\\n            src=\\\"\").concat(el.images.standard_resolution.url, \"\\\"\\n            srcset=\\\"\").concat(el.images.thumbnail.url, \" 150w,\\n            \").concat(el.images.low_resolution.url, \" 320w,\\n            \").concat(el.images.standard_resolution.url, \" 640w\\\" />\\n        </div>\\n      \");\n      var media = \"\\n        <a class=\\\"Lightbox-row Feed-media\\\"\\n          href=\\\"\".concat(el.link, \"\\\" target=\\\"_blank\\\">\\n          <h4 class=\\\"Headline Headline--5\\\">\\n            Join the journey on Instagram @wdlk\\n          </h4>\\n          <img class=\\\"Feed-img\\\"\\n            src=\\\"\").concat(el.images.standard_resolution.url, \"\\\"\\n            srcset=\\\"\").concat(el.images.thumbnail.url, \" 150w,\\n            \").concat(el.images.low_resolution.url, \" 320w,\\n            \").concat(el.images.standard_resolution.url, \" 640w\\\" />\\n        </a>\\n      \");\n      var caption = \"\\n        <figcaption class=\\\"Feed-caption Lightbox-row\\\">\\n          <strong class=\\\"Feed-highlight\\\">\".concat(el.likes.count, \" likes</strong>\\n          <time class=\\\"Feed-highlight\\\" datetime=\\\"\").concat(convertUnixDate(el.created_time), \"\\\">\").concat(convertUnixDate(el.created_time), \"</time>\\n          <p class=\\\"Feed-copy\\\">\\n            <strong>\\n              \").concat(el.user.username, \"\\n            </strong>\\n            \").concat(el.caption.text, \"\\n          </p>\\n        </figcaption>\\n      \");\n      var feed = \"\\n        <li class=\\\"Feed-item Lightbox--row\\\">\\n          \".concat(thumbnail, \"\\n          <input class=\\\"Lightbox-state\\\" type=\\\"checkbox\\\" id=\\\"lightbox-\").concat(i, \"\\\" />\\n          <div class=\\\"Lightbox-shim\\\">\\n            <label class=\\\"Lightbox-shim-close\\\" for=\\\"lightbox-\").concat(i, \"\\\"></label>\\n            <figure class=\\\"Lightbox-content\\\">\\n              <header class=\\\"Lightbox-header\\\">\\n                <h3 class=\\\"Headline Headline--6\\\">\\n                  #\").concat(el.tags[0], \"\\n                </h3>\\n                <label class=\\\"Lightbox-icon\\\" for=\\\"lightbox-\").concat(i, \"\\\"></label>\\n              </header>\\n              \").concat(media, \"\\n              \").concat(caption, \"\\n            </figure>\\n          </div>\\n        </li>\\n      \");\n      return feed;\n    });\n    node.innerHTML = feedTemplate.join('');\n  };\n\n  getMediaFeed(instaURL).then(function (value) {\n    return generateFeedTemplate(filteredArr(value.data));\n  }, function (reason) {\n    console.log(\"Couldn't get Insta JSON feed; error code: + \".concat(reason));\n  });\n}\n\n//# sourceURL=webpack:///./src/scripts/modules/instagram-feed.ts?");

/***/ }),

/***/ "./src/scripts/modules/number-input.ts":
/*!*********************************************!*\
  !*** ./src/scripts/modules/number-input.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = numberInput;\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction numberInput() {\n  var nodeList = document.getElementsByClassName('js_numberInput');\n\n  if (!nodeList) {\n    return;\n  }\n\n  var increase = function increase(n) {\n    return parseInt(\"\".concat(n), 10) + 1;\n  };\n\n  var decrease = function decrease(n) {\n    return parseInt(\"\".concat(n), 10) - 1;\n  };\n\n  _toConsumableArray(nodeList).forEach(function (node) {\n    var inputValue = 1;\n    var min = 0;\n    var inputEl = node.querySelector('.js_value');\n\n    if (!inputEl) {\n      return;\n    }\n\n    inputValue = parseInt(inputEl.getAttribute('value'), 10);\n    min = parseInt(inputEl.getAttribute('min'), 10);\n    node.addEventListener('click', function (e) {\n      if (event.target.classList.contains('js_add')) {\n        inputValue = increase(inputValue);\n        inputEl.setAttribute('value', inputValue.toString());\n      }\n\n      if (event.target.classList.contains('js_remove')) {\n        if (inputValue <= min) {\n          return;\n        }\n\n        inputValue = decrease(inputValue);\n        inputEl.setAttribute('value', inputValue.toString());\n      }\n    });\n  });\n}\n\n//# sourceURL=webpack:///./src/scripts/modules/number-input.ts?");

/***/ }),

/***/ "./src/scripts/modules/smooth-scrolling.ts":
/*!*************************************************!*\
  !*** ./src/scripts/modules/smooth-scrolling.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.initSmoothScrolling = exports.smoothScrolling = void 0;\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n/*\n* @param {node list} triggerList -\n* node list of elements that trigger the scroll event\n* @param {node list} scrollLayers -\n* node list of elements that define the scrollable area\n*/\nvar smoothScrolling = function smoothScrolling(triggerList) {\n  var scrollLayers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.querySelectorAll(':root');\n\n  if (triggerList.length === 0) {\n    return;\n  }\n  /*\n  /* Exponential Ease in and out\n  /* http://gizma.com/easing/#expo3\n  */\n\n\n  Math.easeInOutExpo = function (t, b, c, d) {\n    t /= d / 2;\n\n    if (t < 1) {\n      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;\n    }\n\n    t--;\n    return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;\n  };\n\n  var scrollTo = function scrollTo(scrollLayer, el, duration, cb) {\n    var startPosition = scrollLayer.scrollTop;\n    var positionDelta = el.offsetTop - startPosition;\n    var startTime = null; // tslint:disable-next-line\n\n    cb = cb || function () {};\n\n    var animateScroll = function animateScroll(timeStamp) {\n      startTime = startTime !== null ? startTime : timeStamp;\n      var timeDelta = timeStamp - startTime;\n\n      if (timeDelta >= duration) {\n        // tslint:disable-next-line\n        return cb();\n      }\n\n      scrollLayer.scrollTop = Math.easeInOutExpo(timeDelta, startPosition, positionDelta, duration);\n      window.requestAnimationFrame(animateScroll);\n    };\n\n    window.requestAnimationFrame(animateScroll);\n  };\n\n  _toConsumableArray(triggerList).filter(function (el) {\n    return el.getAttribute('href');\n  }).forEach(function (el) {\n    var id = el.getAttribute('href').substr(1) || '';\n    var targetEl = document.getElementById(\"\".concat(id));\n\n    var scroll = function scroll(e) {\n      e.preventDefault();\n      scrollLayers.forEach(function (layer) {\n        scrollTo(layer, targetEl, 1618, function () {\n          window.location.hash = \"#\".concat(targetEl.id);\n        });\n      });\n    };\n\n    el.addEventListener('click', scroll, false);\n  });\n};\n\nexports.smoothScrolling = smoothScrolling;\n\nvar initSmoothScrolling = function initSmoothScrolling() {\n  smoothScrolling(document.querySelectorAll('.js_scroll'));\n};\n\nexports.initSmoothScrolling = initSmoothScrolling;\n\n//# sourceURL=webpack:///./src/scripts/modules/smooth-scrolling.ts?");

/***/ }),

/***/ "./src/scripts/modules/sticky-navigation.ts":
/*!**************************************************!*\
  !*** ./src/scripts/modules/sticky-navigation.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = stickyNavigation;\n\nfunction stickyNavigation() {\n  /*\n  /* Read Values Only !!!!!\n  /* First keep track of the scroll value\n  /* without triggering unnecessary draw calls\n  */\n  var navigation = document.querySelector('.js_sticky-nav');\n\n  if (!navigation) {\n    return;\n  }\n\n  var notificationTeaser = document.querySelector('.js_notification');\n  var options = {\n    height: navigation.offsetHeight,\n    scrollPosition: 0,\n    ticking: false\n  };\n\n  var init = function init() {\n    navigation.classList.toggle('is-undocked', window.scrollY >= options.height);\n  };\n\n  init();\n\n  var getTeaserHeight = function getTeaserHeight() {\n    if (!notificationTeaser) {\n      return 0;\n    }\n\n    return notificationTeaser.offsetHeight;\n  };\n  /* Visual Updates Callback\n  /* Use rAf to handle visual updates and write values\n  */\n\n\n  var update = function update() {\n    /*\n    /* Pull the latest value when we need it\n    */\n    var currentScrollPositionY = options.scrollPosition;\n\n    if (notificationTeaser) {\n      navigation.classList.toggle('is-sticky', currentScrollPositionY >= getTeaserHeight());\n      navigation.classList.toggle('is-undocked', currentScrollPositionY >= getTeaserHeight() - 1);\n    } else {\n      navigation.classList.toggle('is-undocked', currentScrollPositionY >= options.height);\n    }\n\n    options.ticking = false;\n  };\n  /*\n  /* Triggers requestAnimationFrame when it's necessary only\n  */\n\n\n  var requestTick = function requestTick() {\n    if (!options.ticking) {\n      requestAnimationFrame(update);\n    }\n\n    options.ticking = true;\n  };\n\n  var onScroll = function onScroll() {\n    options.scrollPosition = window.scrollY;\n    requestTick();\n  };\n\n  window.addEventListener('scroll', onScroll, {\n    capture: false,\n    passive: true\n  });\n}\n\n//# sourceURL=webpack:///./src/scripts/modules/sticky-navigation.ts?");

/***/ }),

/***/ "./src/scripts/modules/tracking-facebook.ts":
/*!**************************************************!*\
  !*** ./src/scripts/modules/tracking-facebook.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = fbqTracking;\n\nfunction fbqTracking() {\n  // document.addEventListener('DOMContentLoaded', event => {\n  //   const dontTrackObject = document.querySelectorAll('[data-fbpixel]')[0];\n  //   if (dontTrackObject != null) {\n  //     dontTrackObject.addEventListener('click', () => {\n  //       localStorage.setItem('DontTrackMe', true);\n  //     });\n  //   }\n  //   if (localStorage.getItem('DontTrackMe') == null) {\n  //     document.body.appendChild(tag);\n  //   }\n  // });\n  var addToCart = document.querySelector('.js_fbqAddToCart');\n  var signUpBtn = document.querySelector('.js_fbqNewsLead');\n\n  if (addToCart) {\n    var btn = addToCart.querySelector('.js_fbqBtn');\n    var select = addToCart.querySelector('.js_fbqSelect');\n\n    if (btn && select) {\n      var productId = parseFloat(select.options[select.selectedIndex].value);\n      btn.addEventListener('click', function () {\n        fbq('track', 'AddToCart', {\n          content_name: btn.dataset.name,\n          content_ids: [\"\".concat(productId)],\n          content_type: 'product',\n          value: parseFloat(btn.dataset.value),\n          currency: 'EUR'\n        });\n      });\n    }\n  }\n\n  if (signUpBtn) {\n    signUpBtn.addEventListener('click', function () {\n      fbq('track', 'Lead');\n    });\n  }\n}\n\n//# sourceURL=webpack:///./src/scripts/modules/tracking-facebook.ts?");

/***/ }),

/***/ "./src/scripts/modules/tracking-project-cece.ts":
/*!******************************************************!*\
  !*** ./src/scripts/modules/tracking-project-cece.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = trackingCece;\n\nfunction trackingCece() {\n  var x = document.referrer;\n\n  function set_cece_cookie() {\n    var expiration = new Date();\n    expiration.setTime(expiration.getTime() + 30 * 24 * 60 * 60 * 1000);\n    document.cookie = \"refpartner=projce; expires=\".concat(expiration.toUTCString(), \"; path=/\");\n  }\n\n  if (x.indexOf('projectcece.') > -1) {\n    set_cece_cookie();\n\n    if (window.sessionStorage) {\n      sessionStorage.setItem('refpartner', 'projce');\n    }\n  }\n\n  if (window.sessionStorage) {\n    if (sessionStorage.getItem('refpartner')) {\n      if (document.cookie.indexOf('refpartner=projce') < 0) {\n        set_cece_cookie();\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/scripts/modules/tracking-project-cece.ts?");

/***/ }),

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/scss/index.scss?");

/***/ })

/******/ });