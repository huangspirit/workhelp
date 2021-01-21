(my["webpackJsonp"] = my["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-alipay/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _my$getSystemInfoSync =




  my.getSystemInfoSync(),platform = _my$getSystemInfoSync.platform,pixelRatio = _my$getSystemInfoSync.pixelRatio,windowWidth = _my$getSystemInfoSync.windowWidth; // uni=>my runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


// 不支持的 API 列表
var todos = [
'preloadPage',
'unPreloadPage',
'loadSubPackage'
// 'getRecorderManager',
// 'getBackgroundAudioManager',
// 'createInnerAudioContext',
// 'createCameraContext',
// 'createLivePlayerContext',
// 'startAccelerometer',
// 'startCompass',
// 'authorize',
// 'chooseInvoiceTitle',
// 'addTemplate',
// 'deleteTemplate',
// 'getTemplateLibraryById',
// 'getTemplateLibraryList',
// 'getTemplateList',
// 'sendTemplateMessage',
// 'setEnableDebug',
// 'getExtConfig',
// 'getExtConfigSync',
// 'onWindowResize',
// 'offWindowResize'
];

// 存在兼容性的 API 列表
var canIUses = [
'startPullDownRefresh',
'setTabBarItem',
'setTabBarStyle',
'hideTabBar',
'showTabBar',
'setTabBarBadge',
'removeTabBarBadge',
'showTabBarRedDot',
'hideTabBarRedDot',
'openSetting',
'getSetting',
'createIntersectionObserver',
'getUpdateManager',
'setBackgroundColor',
'setBackgroundTextStyle',
'checkIsSupportSoterAuthentication',
'startSoterAuthentication',
'checkIsSoterEnrolledInDevice',
'openDocument',
'createVideoContext',
'onMemoryWarning',
'addPhoneContact'];


function _handleNetworkInfo(result) {
  switch (result.networkType) {
    case 'NOTREACHABLE':
      result.networkType = 'none';
      break;
    case 'WWAN':
      // TODO ?
      result.networkType = '3g';
      break;
    default:
      result.networkType = result.networkType.toLowerCase();
      break;}

  return {};
}

function _handleSystemInfo(result) {
  var platform = result.platform ? result.platform.toLowerCase() : 'devtools';
  if (!~['android', 'ios'].indexOf(platform)) {
    platform = 'devtools';
  }
  result.platform = platform;
}

var protocols = { // 需要做转换的 API 列表
  navigateTo: navigateTo,
  redirectTo: redirectTo,
  returnValue: function returnValue(methodName) {var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; // 通用 returnValue 解析
    if (res.error || res.errorMessage) {
      res.errMsg = "".concat(methodName, ":fail ").concat(res.errorMessage || res.error);
      delete res.error;
      delete res.errorMessage;
    } else {
      res.errMsg = "".concat(methodName, ":ok");
    }
    return res;
  },
  request: {
    name: my.canIUse('request') ? 'request' : 'httpRequest',
    args: function args(fromArgs) {
      var method = fromArgs.method || 'GET';
      if (!fromArgs.header) {// 默认增加 header 参数，方便格式化 content-type
        fromArgs.header = {};
      }
      var headers = {
        'content-type': 'application/json' };

      Object.keys(fromArgs.header).forEach(function (key) {
        headers[key.toLocaleLowerCase()] = fromArgs.header[key];
      });
      return {
        header: function header() {var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var toArgs = arguments.length > 1 ? arguments[1] : undefined;
          return {
            name: 'headers',
            value: headers };

        },
        data: function data(_data) {
          // 钉钉小程序在content-type为application/json时需上传字符串形式data，使用my.dd在真机运行钉钉小程序时不能正确判断
          if (my.canIUse('saveFileToDingTalk') && method.toUpperCase() === 'POST' && headers['content-type'].indexOf(
          'application/json') === 0 && isPlainObject(_data)) {
            return {
              name: 'data',
              value: JSON.stringify(_data) };

          }
          return {
            name: 'data',
            value: _data };

        },
        method: 'method', // TODO 支付宝小程序仅支持 get,post
        responseType: false };

    },
    returnValue: {
      status: 'statusCode',
      headers: 'header' } },


  setNavigationBarColor: {
    name: 'setNavigationBar',
    args: {
      frontColor: false,
      animation: false } },


  setNavigationBarTitle: {
    name: 'setNavigationBar' },

  showModal: function showModal()

  {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$showCancel = _ref.showCancel,showCancel = _ref$showCancel === void 0 ? true : _ref$showCancel;
    if (showCancel) {
      return {
        name: 'confirm',
        args: {
          cancelColor: false,
          confirmColor: false,
          cancelText: 'cancelButtonText',
          confirmText: 'confirmButtonText' },

        returnValue: function returnValue(fromRes, toRes) {
          toRes.confirm = fromRes.confirm;
          toRes.cancel = !fromRes.confirm;
        } };

    }
    return {
      name: 'alert',
      args: {
        confirmColor: false,
        confirmText: 'buttonText' },

      returnValue: function returnValue(fromRes, toRes) {
        toRes.confirm = true;
        toRes.cancel = false;
      } };

  },
  showToast: function showToast()

  {var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref2$icon = _ref2.icon,icon = _ref2$icon === void 0 ? 'success' : _ref2$icon;
    var args = {
      title: 'content',
      icon: 'type',
      duration: false,
      image: false,
      mask: false };

    if (icon === 'loading') {
      return {
        name: 'showLoading',
        args: args };

    }
    return {
      name: 'showToast',
      args: args };

  },
  showActionSheet: {
    name: 'showActionSheet',
    args: {
      itemList: 'items',
      itemColor: false },

    returnValue: {
      index: 'tapIndex' } },


  showLoading: {
    args: {
      title: 'content',
      mask: false } },


  uploadFile: {
    args: {
      name: 'fileName' }

    // 从测试结果看，是有返回对象的，文档上没有说明。
  },
  downloadFile: {
    returnValue: {
      apFilePath: 'tempFilePath' } },


  getFileInfo: {
    args: {
      filePath: 'apFilePath' } },


  compressImage: {
    args: function args(fromArgs) {
      fromArgs.compressLevel = 4;
      if (fromArgs && fromArgs.quality) {
        fromArgs.compressLevel = Math.floor(fromArgs.quality / 26);
      }
      fromArgs.apFilePaths = [fromArgs.src];
    },
    returnValue: function returnValue(result) {
      if (result.apFilePaths && result.apFilePaths.length) {
        result.tempFilePath = result.apFilePaths[0];
      }
    } },

  chooseVideo: {
    // 支付宝小程序文档中未找到（仅在getSetting处提及），但实际可用
    returnValue: {
      apFilePath: 'tempFilePath' } },


  connectSocket: {
    args: {
      method: false,
      protocols: false }

    // TODO 有没有返回值还需要测试下
  },
  chooseImage: {
    returnValue: {
      apFilePaths: 'tempFilePaths' } },


  previewImage: {
    args: function args(fromArgs) {
      // 支付宝小程序的 current 是索引值，而非图片地址。
      var currentIndex = Number(fromArgs.current);
      if (isNaN(currentIndex)) {
        if (fromArgs.current && Array.isArray(fromArgs.urls)) {
          var index = fromArgs.urls.indexOf(fromArgs.current);
          fromArgs.current = ~index ? index : 0;
        }
      } else {
        fromArgs.current = currentIndex;
      }
      return {
        indicator: false,
        loop: false };

    } },

  saveFile: {
    args: {
      tempFilePath: 'apFilePath' },

    returnValue: {
      apFilePath: 'savedFilePath' } },


  getSavedFileInfo: {
    args: {
      filePath: 'apFilePath' } },


  getSavedFileList: {
    returnValue: function returnValue(result) {
      if (result.fileList && result.fileList.length) {
        result.fileList.forEach(function (file) {
          file.filePath = file.apFilePath;
          delete file.apFilePath;
        });
      }
      return {};
    } },

  removeSavedFile: {
    args: {
      filePath: 'apFilePath' } },


  getLocation: {
    args: {
      type: false,
      altitude: false } },


  openLocation: {
    args: {
      // TODO address 参数在阿里上是必传的
    } },

  getNetworkType: {
    returnValue: _handleNetworkInfo },

  onNetworkStatusChange: {
    returnValue: _handleNetworkInfo },

  stopAccelerometer: {
    name: 'offAccelerometerChange' },

  stopCompass: {
    name: 'offCompassChange' },

  scanCode: {
    name: 'scan',
    args: function args(fromArgs) {
      if (fromArgs.scanType) {
        switch (fromArgs.scanType[0]) {
          case 'qrCode':
            fromArgs.type = 'qr';
            break;
          case 'barCode':
            fromArgs.type = 'bar';
            break;}

      }
      return {
        onlyFromCamera: 'hideAlbum' };

    },
    returnValue: {
      code: 'result' } },


  setClipboardData: {
    name: 'setClipboard',
    args: {
      data: 'text' } },


  getClipboardData: {
    name: 'getClipboard',
    returnValue: {
      text: 'data' } },


  pageScrollTo: {
    args: {
      duration: false } },


  login: {
    name: 'getAuthCode',
    returnValue: function returnValue(result) {
      result.code = result.authCode;
    } },

  getUserInfo: {
    name: my.canIUse('getOpenUserInfo') ? 'getOpenUserInfo' : 'getAuthUserInfo',
    returnValue: function returnValue(result) {
      if (my.canIUse('getOpenUserInfo')) {
        var response = {};
        try {
          response = JSON.parse(result.response).response;
        } catch (e) {}
        result.nickName = response.nickName;
        result.avatar = response.avatar;
      }
      result.userInfo = {
        nickName: result.nickName,
        avatarUrl: result.avatar };

    } },

  requestPayment: {
    name: 'tradePay',
    args: {
      orderInfo: 'tradeNO' } },


  getBLEDeviceServices: {
    returnValue: function returnValue(result) {
      result.services.forEach(function (item) {
        item.uuid = item.serviceId;
      });
    } },

  createBLEConnection: {
    name: 'connectBLEDevice',
    args: {
      timeout: false } },


  closeBLEConnection: {
    name: 'disconnectBLEDevice' },

  onBLEConnectionStateChange: {
    name: 'onBLEConnectionStateChanged' },

  makePhoneCall: {
    args: {
      phoneNumber: 'number' } },


  stopGyroscope: {
    name: 'offGyroscopeChange' },

  getSystemInfo: {
    returnValue: _handleSystemInfo },

  getSystemInfoSync: {
    returnValue: _handleSystemInfo },

  // 文档没提到，但是实测可用。
  canvasToTempFilePath: {
    returnValue: function returnValue(result) {
      // 真机的情况下会有 tempFilePath 这个值，因此需要主动修改。
      result.tempFilePath = result.apFilePath;
    } },

  setScreenBrightness: {
    args: {
      value: 'brightness' } },


  getScreenBrightness: {
    returnValue: {
      brightness: 'value' } },


  showShareMenu: {
    name: 'showSharePanel' },

  hideHomeButton: {
    name: 'hideBackHome' },

  saveImageToPhotosAlbum: {
    name: 'saveImage',
    args: {
      filePath: 'url' } },


  saveVideoToPhotosAlbum: {
    args: {
      filePath: 'src' } },


  chooseAddress: {
    name: 'getAddress',
    returnValue: function returnValue(result) {
      var info = result.result || {};
      result.userName = info.fullname;
      result.provinceName = info.prov;
      result.cityName = info.city;
      result.detailInfo = info.address;
      result.telNumber = info.mobilePhone;
      result.errMsg = result.resultStatus;
    } } };



var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = my[methodName].apply(my, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref3)


  {var fail = _ref3.fail,complete = _ref3.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['alipay'],
  share: ['alipay'],
  payment: ['alipay'],
  push: ['alipay'] };


function getProvider(_ref4)




{var service = _ref4.service,success = _ref4.success,fail = _ref4.fail,complete = _ref4.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


function createMediaQueryObserver() {
  var mediaQueryObserver = {};var _my$getSystemInfoSync2 =



  my.getSystemInfoSync(),windowWidth = _my$getSystemInfoSync2.windowWidth,windowHeight = _my$getSystemInfoSync2.windowHeight;

  var orientation = windowWidth < windowHeight ? 'portrait' : 'landscape';

  mediaQueryObserver.observe = function (options, callback) {
    var matches = true;
    for (var item in options) {
      var itemValue = item === 'orientation' ? options[item] : Number(options[item]);
      if (options[item] !== '') {
        if (item === 'width') {
          if (itemValue === windowWidth) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'minWidth') {
          if (windowWidth >= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'maxWidth') {
          if (windowWidth <= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }

        if (item === 'height') {
          if (itemValue === windowHeight) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'minHeight') {
          if (windowHeight >= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'maxHeight') {
          if (windowHeight <= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }

        if (item === 'orientation') {
          if (options[item] === orientation) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
      }
    }
    callback(matches);

    return matches;
  };

  mediaQueryObserver.disconnect = function () {
  };

  return mediaQueryObserver;
}

function setStorageSync(key, data) {
  return my.setStorageSync({
    key: key,
    data: data });

}
function getStorageSync(key) {
  var result = my.getStorageSync({
    key: key });

  // 支付宝平台会返回一个 success 值，但是目前测试的结果这个始终是 true。当没有存储数据的时候，其它平台会返回空字符串。
  return result.data !== null ? result.data : '';
}
function removeStorageSync(key) {
  return my.removeStorageSync({
    key: key });

}

function startGyroscope(params) {
  if (hasOwn(params, 'interval')) {
    console.warn('支付宝小程序 startGyroscope暂不支持interval');
  }
  params.success && params.success({
    errMsg: 'startGyroscope:ok' });

  params.complete && params.complete({
    errMsg: 'startGyroscope:ok' });

}

function createExecCallback(execCallback) {
  return function wrapperExecCallback(res) {
    this.actions.forEach(function (action, index) {
      (action._$callbacks || []).forEach(function (callback) {
        callback(res[index]);
      });
    });
    if (isFn(execCallback)) {
      execCallback(res);
    }
  };
}

function addCallback(callback) {
  if (isFn(callback)) {
    var action = this.actions[this.actions.length - 1];
    if (action) {
      (action._$callbacks || (action._$callbacks = [])).push(callback);
    }
  }
}

function createSelectorQuery() {
  var query = my.createSelectorQuery();

  var oldExec = query.exec;
  var oldScrollOffset = query.scrollOffset;
  var oldBoundingClientRect = query.boundingClientRect;
  query.exec = function exec(callback) {
    return oldExec.call(this, createExecCallback(callback).bind(this));
  };
  query.scrollOffset = function scrollOffset(callback) {
    var ret = oldScrollOffset.call(this);
    addCallback.call(this, callback);
    return ret;
  };
  query.boundingClientRect = function boundingClientRect(callback) {
    var ret = oldBoundingClientRect.call(this);
    addCallback.call(this, callback);
    return ret;
  };

  if (!query.fields) {
    query.fields = function () {var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},rect = _ref5.rect,size = _ref5.size,scrollOffset = _ref5.scrollOffset;var callback = arguments.length > 1 ? arguments[1] : undefined;
      if (rect || size) {
        this.boundingClientRect();
      }
      if (scrollOffset) {
        this.scrollOffset();
      }
      addCallback.call(this, callback);
      return this;
    };
  }

  if (!query.in) {
    query.in = function () {
      return this;
    };
  }
  return query;
}

function createIntersectionObserver(component, options) {
  if (options && options.observeAll) {
    options.selectAll = options.observeAll;
    delete options.observeAll;
  }
  return my.createIntersectionObserver(options);
}

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setStorageSync: setStorageSync,
  getStorageSync: getStorageSync,
  removeStorageSync: removeStorageSync,
  startGyroscope: startGyroscope,
  createSelectorQuery: createSelectorQuery,
  createIntersectionObserver: createIntersectionObserver,
  createMediaQueryObserver: createMediaQueryObserver });


var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"workhelp","VUE_APP_PLATFORM":"mp-alipay","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "my".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref6)


{var mocks = _ref6.mocks,initRefs = _ref6.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-alipay";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function handleLink(event) {var _ref7 =



  event.detail || event.value,vuePid = _ref7.vuePid,vueOptions = _ref7.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

var isArray = Array.isArray;
var keyList = Object.keys;

function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    var arrA = isArray(a);
    var arrB = isArray(b);
    var i, length, key;
    if (arrA && arrB) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }
      return true;
    }
    if (arrA !== arrB) return false;

    var dateA = a instanceof Date;
    var dateB = b instanceof Date;
    if (dateA !== dateB) return false;
    if (dateA && dateB) return a.getTime() === b.getTime();

    var regexpA = a instanceof RegExp;
    var regexpB = b instanceof RegExp;
    if (regexpA !== regexpB) return false;
    if (regexpA && regexpB) return a.toString() === b.toString();

    var keys = keyList(a);
    length = keys.length;
    if (length !== keyList(b).length) {
      return false;
    }
    for (i = length; i-- !== 0;) {
      if (!hasOwn.call(b, keys[i])) return false;
    }
    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
}

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

var isComponent2 = my.canIUse('component2');

var mocks = ['$id'];

function initRefs() {

}

function initBehavior(_ref8)

{var properties = _ref8.properties;
  var props = {};

  Object.keys(properties).forEach(function (key) {
    props[key] = properties[key].value;
  });

  return {
    props: props };

}

function initRelation(detail) {
  this.props.onVueInit(detail);
}

function initSpecialMethods(mpInstance) {
  if (!mpInstance.$vm) {
    return;
  }
  var path = mpInstance.is || mpInstance.route;
  if (!path) {
    return;
  }
  if (path.indexOf('/') === 0) {
    path = path.substr(1);
  }
  var specialMethods = my.specialMethods && my.specialMethods[path];
  if (specialMethods) {
    specialMethods.forEach(function (method) {
      if (isFn(mpInstance.$vm[method])) {
        mpInstance[method] = function (event) {
          if (hasOwn(event, 'markerId')) {
            event.detail = typeof event.detail === 'object' ? event.detail : {};
            event.detail.markerId = event.markerId;
          }
          // TODO normalizeEvent
          mpInstance.$vm[method](event);
        };
      }
    });
  }
}

function initChildVues(mpInstance) {
  // 此时需保证当前 mpInstance 已经存在 $vm
  if (!mpInstance.$vm) {
    return;
  }
  mpInstance._$childVues && mpInstance._$childVues.forEach(function (_ref9)




  {var vuePid = _ref9.vuePid,vueOptions = _ref9.vueOptions,VueComponent = _ref9.VueComponent,childMPInstance = _ref9.mpInstance;
    // 父子关系
    handleLink.call(mpInstance, {
      detail: {
        vuePid: vuePid,
        vueOptions: vueOptions } });



    childMPInstance.$vm = new VueComponent(vueOptions);

    initSpecialMethods(childMPInstance);

    handleRef.call(vueOptions.parent.$scope, childMPInstance);

    childMPInstance.$vm.$mount();

    initChildVues(childMPInstance);

    childMPInstance.$vm._isMounted = true;
    childMPInstance.$vm.__call_hook('mounted');
    childMPInstance.$vm.__call_hook('onReady');
  });

  delete mpInstance._$childVues;
}

function handleRef(ref) {
  if (!ref) {
    return;
  }
  var refName = ref.props['data-ref'];
  var refInForName = ref.props['data-ref-in-for'];
  if (refName) {
    this.$vm.$refs[refName] = ref.$vm || ref;
  } else if (refInForName) {
    (this.$vm.$refs[refInForName] || (this.$vm.$refs[refInForName] = [])).push(ref.$vm || ref);
  }
}

function triggerEvent(type, detail, options) {
  var handler = this.props && this.props[customize('on-' + type)];
  if (!handler) {
    return;
  }

  var eventOpts = this.props['data-event-opts'];
  var eventParams = this.props['data-event-params'];

  var target = {
    dataset: {
      eventOpts: eventOpts,
      eventParams: eventParams } };



  handler({
    type: customize(type),
    target: target,
    currentTarget: target,
    detail: detail });

}

var IGNORES = ['$slots', '$scopedSlots'];

function createObserver$1(isDidUpdate) {
  return function observe(props) {var _this3 = this;
    var prevProps = isDidUpdate ? props : this.props;
    var nextProps = isDidUpdate ? this.props : props;
    if (equal(prevProps, nextProps)) {
      return;
    }
    Object.keys(prevProps).forEach(function (name) {
      if (IGNORES.indexOf(name) === -1) {
        var prevValue = prevProps[name];
        var nextValue = nextProps[name];
        if (!isFn(prevValue) && !isFn(nextValue) && !equal(prevValue, nextValue)) {
          _this3.$vm[name] = nextProps[name];
        }
      }
    });
  };
}

var handleLink$1 = function () {
  if (isComponent2) {
    return function handleLink$1(detail) {
      return handleLink.call(this, {
        detail: detail });

    };
  }
  return function handleLink$1(detail) {
    if (this.$vm && this.$vm._isMounted) {// 父已初始化
      return handleLink.call(this, {
        detail: {
          vuePid: detail.vuePid,
          vueOptions: detail.vueOptions } });


    }
    // 支付宝通过 didMount 来实现，先子后父，故等父 ready 之后，统一初始化
    (this._$childVues || (this._$childVues = [])).unshift(detail);
  };
}();

function parseApp(vm) {
  Object.defineProperty(_vue.default.prototype, '$slots', {
    get: function get() {
      return this.$scope && this.$scope.props.$slots;
    },
    set: function set() {

    } });

  Object.defineProperty(_vue.default.prototype, '$scopedSlots', {
    get: function get() {
      return this.$scope && this.$scope.props.$scopedSlots;
    },
    set: function set() {

    } });


  _vue.default.prototype.$onAliGetAuthorize = function onAliGetAuthorize(method, $event) {var _this4 = this;
    my.getPhoneNumber({
      success: function success(res) {
        $event.type = 'getphonenumber';
        var response = JSON.parse(res.response).response;
        if (response.code === '10000') {// success
          $event.detail.errMsg = 'getPhoneNumber:ok';
          $event.detail.encryptedData = res.response;
        } else {
          $event.detail.errMsg = 'getPhoneNumber:fail Error: ' + res.response;
        }
        _this4[method]($event);
      },
      fail: function fail(res) {
        $event.type = 'getphonenumber';
        $event.detail.errMsg = 'getPhoneNumber:fail';
        _this4[method]($event);
      } });

  };

  _vue.default.prototype.$onAliAuthError = function $onAliAuthError(method, $event) {
    $event.type = 'getphonenumber';
    $event.detail.errMsg = 'getPhoneNumber:fail Error: ' + $event.detail.errorMessage;
    this[method]($event);
  };

  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

var hooks$1 = [
'onShow',
'onHide',
// mp-alipay 特有
'onTitleClick',
'onOptionMenuClick',
'onPopMenuClick',
'onPullIntercept'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parsePage(vuePageOptions) {var _initVueComponent =
  initVueComponent(_vue.default, vuePageOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var pageOptions = {
    mixins: initBehaviors(vueOptions, initBehavior),
    data: initData(vueOptions, _vue.default.prototype),
    onLoad: function onLoad(query) {
      var properties = this.props;

      var options = {
        mpType: 'page',
        mpInstance: this,
        propsData: properties };


      // 初始化 vue 实例
      this.$vm = new VueComponent(options);

      initSpecialMethods(this);

      // 触发首次 setData
      this.$vm.$mount();

      var copyQuery = Object.assign({}, query);
      delete copyQuery.__id__;

      this.$page = {
        fullPath: '/' + this.route + stringifyQuery(copyQuery) };


      this.options = query;
      this.$vm.$mp.query = query; // 兼容 mpvue
      this.$vm.__call_hook('onLoad', query);
    },
    onReady: function onReady() {
      initChildVues(this);
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');
      this.$vm.__call_hook('onReady');
    },
    onUnload: function onUnload() {
      this.$vm.__call_hook('onUnload');
      this.$vm.$destroy();
    },
    events: {
      // 支付宝小程序有些页面事件只能放在events下
      onBack: function onBack() {
        this.$vm.__call_hook('onBackPress');
      } },

    __r: handleRef,
    __e: handleEvent,
    __l: handleLink$1,
    triggerEvent: triggerEvent };


  initHooks(pageOptions, hooks$1, vuePageOptions);

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      pageOptions[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  return pageOptions;
}

function createPage(vuePageOptions) {
  {
    return Page(parsePage(vuePageOptions));
  }
}

function initVm(VueComponent) {
  if (this.$vm) {
    return;
  }
  var properties = this.props;

  var options = {
    mpType: 'component',
    mpInstance: this,
    propsData: properties };


  initVueIds(properties.vueId, this);

  if (isComponent2) {
    // 处理父子关系
    initRelation.call(this, {
      vuePid: this._$vuePid,
      vueOptions: options });


    // 初始化 vue 实例
    this.$vm = new VueComponent(options);

    // 触发首次 setData
    this.$vm.$mount();
  } else {
    // 处理父子关系
    initRelation.call(this, {
      vuePid: this._$vuePid,
      vueOptions: options,
      VueComponent: VueComponent,
      mpInstance: this });


    if (options.parent) {// 父组件已经初始化，直接初始化子，否则放到父组件的 didMount 中处理
      // 初始化 vue 实例
      this.$vm = new VueComponent(options);
      handleRef.call(options.parent.$scope, this);
      // 触发首次 setData
      this.$vm.$mount();

      initChildVues(this);

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');
      this.$vm.__call_hook('onReady');
    }
  }
}

function parseComponent(vueComponentOptions) {var _initVueComponent3 =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent4 = _slicedToArray(_initVueComponent3, 2),VueComponent = _initVueComponent4[0],vueOptions = _initVueComponent4[1];

  var properties = initProperties(vueOptions.props, false, vueOptions.__file);

  var props = {
    onVueInit: function onVueInit() {} };


  Object.keys(properties).forEach(function (key) {
    if (key !== 'vueSlots') {
      props[key] = properties[key].value;
    }
  });

  var componentOptions = {
    mixins: initBehaviors(vueOptions, initBehavior),
    data: initData(vueOptions, _vue.default.prototype),
    props: props,
    didMount: function didMount() {var _this5 = this;
      if (my.dd) {// 钉钉小程序底层基础库有 bug,组件嵌套使用时,在 didMount 中无法及时调用 props 中的方法
        setTimeout(function () {
          initVm.call(_this5, VueComponent);
        }, 4);
      } else {
        initVm.call(this, VueComponent);
      }

      initSpecialMethods(this);

      if (isComponent2) {
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      }
    },
    didUnmount: function didUnmount() {
      this.$vm && this.$vm.$destroy();
    },
    methods: {
      __r: handleRef,
      __e: handleEvent,
      __l: handleLink$1,
      triggerEvent: triggerEvent } };



  if (isComponent2) {
    componentOptions.onInit = function onInit() {
      initVm.call(this, VueComponent);
    };
    componentOptions.deriveDataFromProps = createObserver$1();
  } else {
    componentOptions.didUpdate = createObserver$1(true);
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  return componentOptions;
}

function createComponent(vueOptions) {
  {
    return my.defineComponent(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!my.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-alipay" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(my, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, my[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(my).forEach(function (name) {
    if (hasOwn(my, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, my[name]));
    }
  });
}

my.createApp = createApp;
my.createPage = createPage;
my.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"workhelp","VUE_APP_PLATFORM":"mp-alipay","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"workhelp","VUE_APP_PLATFORM":"mp-alipay","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"workhelp","VUE_APP_PLATFORM":"mp-alipay","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"workhelp","VUE_APP_PLATFORM":"mp-alipay","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!********************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/pages.json ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/*!********************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/assets/css/public.less ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 12 */
/*!****************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/assets/js/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _http = _interopRequireDefault(__webpack_require__(/*! ./http */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 调试请求文件
_vue.default.prototype.http = _http.default;

/***/ }),
/* 13 */
/*!***************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/assets/js/http.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var root = "development";

// let devport = "http://127.0.0.1:8888"
// let appport = ""
// const deleteObjNull=(obj)=>{
// 	    for(let key in obj){
// 	        if(obj[key]==='' || obj[key]===undefined || obj[key]===null || obj[key]=='-' || obj[key]=='NaN'){
// 	            delete obj[key];
// 	        }
// 	    }
// 	}
// const port = root === 'development'?devport:appport;
module.exports = function (params) {
  var url = params.url;
  var method = params.method;

  var header = params.header;
  var token = localStorage.getItem("accessToken");
  if (header) {
    header = { "accessToken": token };
  }
  var data = params.data || {};
  //	请求方式 GET POST
  if (method) {
    method = method.toUpperCase(); //	小写转大写
    if (method == "POST") {
      header = { "content-type": "application/x-www-form-urlencoded", "accessToken": token };
    }
  }
  //	发起请求 加载动画
  if (!params.hideLoading) {
    uni.showLoading({
      title: "加载中" });

  }
  //	发起网络请求
  uni.request({
    url: url,
    method: method || "GET",
    header: header,
    data: data,
    dataType: "json",
    sslVerify: false, //	是否验证ssl证书
    success: function success(res) {
      if (res.statusCode && res.statusCode != 200) {
        //	api错误
        uni.showModal({
          content: res.msg });

        return;
      }
      if (res.statusCode == 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("");
        console.log("重新授权");
      }
      typeof params.success == "function" && params.success(res.data);
    },
    fail: function fail(err) {
      uni.showModal({
        content: err.msg });

      typeof params.fail == "function" && params.fail(err.data);
    },
    complete: function complete(e) {
      console.log("请求完成");
      uni.hideLoading();
      typeof params.complete == "function" && params.complete(e.data);
      return;
    } });

};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-alipay/dist/index.js */ 1)["default"]))

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 21);

/***/ }),
/* 21 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 22);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 22 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */
/*!*******************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/assets/img/fake/1.jpg ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/assets/img/fake/1.jpg";

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */
/*!***************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/components/uni-popup/popup.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 72));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config };

  },
  mixins: [_message.default] };exports.default = _default;

/***/ }),
/* 72 */
/*!*****************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/components/uni-popup/message.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  created: function created() {
    if (this.type === 'message') {
      // 不显示遮罩
      this.maskShow = false;
      // 获取子组件对象
      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    } } };exports.default = _default;

/***/ }),
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */
/*!***************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/components/uni-icons/icons.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */
/*!**********************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var ddWithoutApi = __webpack_require__(/*! ./entry/union */ 147),apiObj_1 = __webpack_require__(/*! ./api/apiObj */ 178),dd = Object.assign(ddWithoutApi, apiObj_1.apiObj);module.exports = dd;

/***/ }),
/* 147 */
/*!****************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/entry/union.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var dd = __webpack_require__(/*! ../core */ 148);__webpack_require__(/*! ../platform */ 164), module.exports = dd;

/***/ }),
/* 148 */
/*!*********************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/core.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var ddSdk_1 = __webpack_require__(/*! ./lib/ddSdk */ 149),otherApi = __webpack_require__(/*! ./lib/otherApi */ 163),core = Object.assign({}, otherApi, ddSdk_1.ddSdk.getExportSdk());module.exports = core;

/***/ }),
/* 149 */
/*!**************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/ddSdk.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.ddSdk = exports.ENV_ENUM_SUB = exports.ENV_ENUM = void 0;var env_1 = __webpack_require__(/*! ./env */ 150),log_1 = __webpack_require__(/*! ./log */ 157),env_2 = __webpack_require__(/*! ./env */ 150);Object.defineProperty(exports, "ENV_ENUM", { enumerable: !0, get: function get() {return env_2.ENV_ENUM;} }), Object.defineProperty(exports, "ENV_ENUM_SUB", { enumerable: !0, get: function get() {return env_2.ENV_ENUM_SUB;} });var sdk_1 = __webpack_require__(/*! ./sdk */ 151);__webpack_require__(/*! ./polyfills */ 158), exports.ddSdk = new sdk_1.Sdk(env_1.getENV(), log_1.log);

/***/ }),
/* 150 */
/*!************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/env.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getENV = exports.getUA = exports.ENV_ENUM_SUB = exports.APP_TYPE = exports.ENV_ENUM = void 0;var sdk_1 = __webpack_require__(/*! ./sdk */ 151),sdk_2 = __webpack_require__(/*! ./sdk */ 151);Object.defineProperty(exports, "ENV_ENUM", { enumerable: !0, get: function get() {return sdk_2.ENV_ENUM;} }), Object.defineProperty(exports, "APP_TYPE", { enumerable: !0, get: function get() {return sdk_2.APP_TYPE;} }), Object.defineProperty(exports, "ENV_ENUM_SUB", { enumerable: !0, get: function get() {return sdk_2.ENV_ENUM_SUB;} });var dingtalk_javascript_env_1 = __webpack_require__(/*! ./packages/dingtalk-javascript-env */ 153),EDdWeexEnv;!function (e) {e.singlePage = "singlePage", e.miniApp = "miniApp", e.miniWidget = "miniWidget";}(EDdWeexEnv || (EDdWeexEnv = {}));var getUA = function getUA() {var e = "";try {"undefined" != typeof navigator && (e = navigator && (navigator.userAgent || navigator.swuserAgent) || "");} catch (t) {e = "";}return e;};exports.getUA = getUA;var getENV = function getENV() {var e = exports.getUA(),t = /iPhone|iPad|iPod|iOS/i.test(e),i = /Android/i.test(e),n = /Nebula/i.test(e),a = /DingTalk/i.test(e),r = /dd-web/i.test(e),d = "object" == typeof nuva,s = "object" == typeof dd && "function" == typeof dd.dtBridge,_ = s && t || d && t,E = a || dingtalk_javascript_env_1.default.isDingTalk,o = t && E || dingtalk_javascript_env_1.default.isWeexiOS || _,g = i && E || dingtalk_javascript_env_1.default.isWeexAndroid,p = n && E || s,v = r,P = sdk_1.APP_TYPE.WEB;if (v) P = sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP;else if (p) P = sdk_1.APP_TYPE.MINI_APP;else if (dingtalk_javascript_env_1.default.isWeexiOS || dingtalk_javascript_env_1.default.isWeexAndroid) try {var l = weex.config.ddWeexEnv;P = l === EDdWeexEnv.miniWidget ? sdk_1.APP_TYPE.WEEX_WIDGET : sdk_1.APP_TYPE.WEEX;} catch (e) {P = sdk_1.APP_TYPE.WEEX;}var u,c = "*",N = e.match(/AliApp\(\w+\/([a-zA-Z0-9.-]+)\)/);null === N && (N = e.match(/DingTalk\/([a-zA-Z0-9.-]+)/));var f;N && N[1] && (f = N[1]);var k = "";if ("undefined" != typeof name && (k = name), k) try {var A = JSON.parse(k);A.hostVersion && (f = A.hostVersion), c = A.language || navigator.language || "*", u = A.containerId;} catch (e) {}var U = !!u;U && !f && (N = e.match(/DingTalk\(([a-zA-Z0-9\.-]+)\)/)) && N[1] && (f = N[1]);var x,V = sdk_1.ENV_ENUM_SUB.noSub;if (o) x = sdk_1.ENV_ENUM.ios;else if (g) x = sdk_1.ENV_ENUM.android;else if (U) {var W = e.indexOf("Macintosh; Intel Mac OS") > -1;V = W ? sdk_1.ENV_ENUM_SUB.mac : sdk_1.ENV_ENUM_SUB.win, x = sdk_1.ENV_ENUM.pc;} else x = sdk_1.ENV_ENUM.notInDingTalk;return { platform: x, platformSub: V, version: f, appType: P, language: c };};exports.getENV = getENV;

/***/ }),
/* 151 */
/*!******************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/sdk/index.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getTargetApiConfigVS(e, o) {var i = e && e.vs;return "object" == typeof i && (i = i[o.platformSub]), i;}Object.defineProperty(exports, "__esModule", { value: !0 }), exports.Sdk = exports.LogLevel = exports.APP_TYPE = exports.isFunction = exports.compareVersion = exports.ENV_ENUM_SUB = exports.ENV_ENUM = void 0;var sdkLib_1 = __webpack_require__(/*! ./sdkLib */ 152);Object.defineProperty(exports, "APP_TYPE", { enumerable: !0, get: function get() {return sdkLib_1.APP_TYPE;} }), Object.defineProperty(exports, "LogLevel", { enumerable: !0, get: function get() {return sdkLib_1.LogLevel;} }), Object.defineProperty(exports, "isFunction", { enumerable: !0, get: function get() {return sdkLib_1.isFunction;} }), Object.defineProperty(exports, "compareVersion", { enumerable: !0, get: function get() {return sdkLib_1.compareVersion;} }), Object.defineProperty(exports, "ENV_ENUM", { enumerable: !0, get: function get() {return sdkLib_1.ENV_ENUM;} }), Object.defineProperty(exports, "ENV_ENUM_SUB", { enumerable: !0, get: function get() {return sdkLib_1.ENV_ENUM_SUB;} });var Sdk = function () {function e(e, o) {var i = this;this.configJsApiList = [], this.hadConfig = !1, this.p = {}, this.config$ = new Promise(function (e, o) {i.p.reject = o, i.p.resolve = e;}), this.logQueue = [], this.devConfig = { debug: !1 }, this.platformConfigMap = {}, this.invokeAPIConfigMapByMethod = {}, this.isBridgeDrity = !0, this.getExportSdk = function () {return i.exportSdk;}, this.setAPI = function (e, o) {i.invokeAPIConfigMapByMethod[e] = o;}, this.setPlatform = function (e) {i.isBridgeDrity = !0, i.platformConfigMap[e.platform] = e, e.platform === i.env.platform && e.bridgeInit().catch(function (e) {i.customLog(sdkLib_1.LogLevel.WARNING, ["auto bridgeInit error", e || ""]);});}, this.getPlatformConfigMap = function () {return i.platformConfigMap;}, this.deleteApiConfig = function (e, o) {var n = i.invokeAPIConfigMapByMethod[e];n && delete n[o];}, this.invokeAPI = function (e, o, n) {void 0 === o && (o = {}), void 0 === n && (n = !0), i.customLog(sdkLib_1.LogLevel.INFO, ['==> "' + e + '" params: ', o]);var t = +new Date(),r = t + "_" + Math.floor(1e3 * Math.random());if (i.devConfig.onBeforeInvokeAPI) try {i.devConfig.onBeforeInvokeAPI({ invokeId: r, method: e, params: o, startTime: t });} catch (e) {i.customLog(sdkLib_1.LogLevel.ERROR, ["call Hook:onBeforeInvokeAPI failed, reason:", e]);}return !1 === i.devConfig.isAuthApi && (n = !1), i.bridgeInitFn().then(function (s) {var a = i.invokeAPIConfigMapByMethod[e],f = i.devConfig.forceEnableDealApiFnMap && i.devConfig.forceEnableDealApiFnMap[e] && !0 === i.devConfig.forceEnableDealApiFnMap[e](o),d = !f && (!0 === i.devConfig.isDisableDeal || i.devConfig.disbaleDealApiWhiteList && -1 !== i.devConfig.disbaleDealApiWhiteList.indexOf(e));if (a || !n) {var c;if (a && (c = a[i.env.platform]), c || !n) {var u = {};u = !d && c && c.paramsDeal && sdkLib_1.isFunction(c.paramsDeal) ? c.paramsDeal(o) : Object.assign({}, o);var g = function g(e) {return !d && c && c.resultDeal && sdkLib_1.isFunction(c.resultDeal) ? c.resultDeal(e) : e;};if (sdkLib_1.isFunction(u.onSuccess)) {var l = u.onSuccess;u.onSuccess = function (e) {l(g(e));};}return s(e, u).then(g, function (o) {var t = i.hadConfig && void 0 === i.isReady && -1 !== i.configJsApiList.indexOf(e),r = "object" == typeof o && "string" == typeof o.errorCode && o.errorCode === sdkLib_1.ERROR_CODE.no_permission,a = "object" == typeof o && "string" == typeof o.errorCode && o.errorCode === sdkLib_1.ERROR_CODE.cancel,f = getTargetApiConfigVS(c, i.env),d = f && i.env.version && sdkLib_1.compareVersion(i.env.version, f),l = (i.env.platform === sdkLib_1.ENV_ENUM.ios || i.env.platform === sdkLib_1.ENV_ENUM.android) && t && r,p = i.env.platform === sdkLib_1.ENV_ENUM.pc && t && (d && !a && n || r);return l || p ? i.config$.then(function () {return s(e, u).then(g);}) : Promise.reject(o);}).then(function (n) {if (i.devConfig.onAfterInvokeAPI) try {i.devConfig.onAfterInvokeAPI({ invokeId: r, method: e, params: o, payload: n, isSuccess: !0, startTime: t, duration: +new Date() - t });} catch (e) {i.customLog(sdkLib_1.LogLevel.ERROR, ["call Hook:onAfterInvokeAPI failed, reason:", e]);}return i.customLog(sdkLib_1.LogLevel.INFO, ['<== "' + e + '" success result: ', n]), n;}, function (n) {if (i.devConfig.onAfterInvokeAPI) try {i.devConfig.onAfterInvokeAPI({ invokeId: r, method: e, params: o, payload: n, startTime: t, duration: +new Date() - t, isSuccess: !1 });} catch (n) {i.customLog(sdkLib_1.LogLevel.ERROR, ["call Hook:onAfterInvokeAPI failed, reason:", n]);}return i.customLog(sdkLib_1.LogLevel.WARNING, ['<== "' + e + '" fail result: ', n]), Promise.reject(n);});}var p = '"' + e + '" do not support the current platform (' + i.env.platform + ")";return i.customLog(sdkLib_1.LogLevel.ERROR, [p]), Promise.reject({ errorCode: sdkLib_1.ERROR_CODE.jsapi_internal_error, errorMessage: p });}var p = "This API method is not configured for the platform (" + i.env.platform + ")";return i.customLog(sdkLib_1.LogLevel.ERROR, [p]), Promise.reject({ errorCode: sdkLib_1.ERROR_CODE.jsapi_internal_error, errorMessage: p });});}, this.customLog = function (e, o) {var n = { level: e, text: o, time: new Date() };if (!0 === i.devConfig.debug) i.customLogInstance(n);else {i.logQueue.push(n);i.logQueue.length > 10 && (i.logQueue = i.logQueue.slice(i.logQueue.length - 10));}}, this.clearLogQueue = function () {i.logQueue.forEach(function (e) {i.customLogInstance(e);}), i.logQueue = [];}, this.customLogInstance = o, this.env = e, this.bridgeInitFn = function () {if (i.bridgeInitFnPromise && !i.isBridgeDrity) return i.bridgeInitFnPromise;i.isBridgeDrity = !1;var o = i.platformConfigMap[e.platform];if (o) i.bridgeInitFnPromise = o.bridgeInit().catch(function (e) {return i.customLog(sdkLib_1.LogLevel.ERROR, ["\b\b\b\b\bJsBridge initialization fails, jsapi will not work"]), Promise.reject(e);});else {var n = "Do not support the current environment：" + e.platform;i.customLog(sdkLib_1.LogLevel.WARNING, [n]), i.bridgeInitFnPromise = Promise.reject(new Error(n));}return i.bridgeInitFnPromise;};var n = function n(e) {void 0 === e && (e = {}), i.devConfig = Object.assign(i.devConfig, e), !0 === e.debug && i.clearLogQueue(), e.extraPlatform && i.setPlatform(e.extraPlatform);};this.exportSdk = { config: function config(o) {void 0 === o && (o = {});var t = !0;Object.keys(o).forEach(function (e) {-1 === ["debug", "usePromise"].indexOf(e) && (t = !1);}), t ? (i.customLog(sdkLib_1.LogLevel.WARNING, ["This is a deprecated feature, recommend use dd.devConfig"]), n(o)) : i.hadConfig ? i.customLog(sdkLib_1.LogLevel.WARNING, ["Config has been executed"]) : (o.jsApiList && (i.configJsApiList = o.jsApiList), i.hadConfig = !0, i.bridgeInitFn().then(function (n) {var t = i.platformConfigMap[e.platform],r = o;t.authParamsDeal && (r = t.authParamsDeal(r)), n(t.authMethod, r).then(function (e) {i.isReady = !0, i.p.resolve(e);}).catch(function (e) {i.isReady = !1, i.p.reject(e);});}, function (e) {i.customLog(sdkLib_1.LogLevel.ERROR, ['\b\b\b\b\bJsBridge initialization failed and "dd.config" failed to call']), i.p.reject(e);}));}, devConfig: n, ready: function ready(e) {!1 === i.hadConfig ? (i.customLog(sdkLib_1.LogLevel.WARNING, ["You don 't use a dd.config, so you don't need to wrap dd.ready, recommend remove dd.ready"]), i.bridgeInitFn().then(function () {e();})) : i.config$.then(function (o) {e();});}, error: function error(e) {i.config$.catch(function (o) {e(o);});}, on: function on(o, n) {i.bridgeInitFn().then(function () {i.platformConfigMap[e.platform].event.on(o, n);});}, off: function off(o, n) {i.bridgeInitFn().then(function () {i.platformConfigMap[e.platform].event.off(o, n);});}, env: e, checkJsApi: function checkJsApi(o) {void 0 === o && (o = {});var n = {};return o.jsApiList && o.jsApiList.forEach(function (o) {var t = i.invokeAPIConfigMapByMethod[o];if (t) {var r = t[e.platform],s = getTargetApiConfigVS(r, e);s && e.version && sdkLib_1.compareVersion(e.version, s) && (n[o] = !0);}n[o] || (n[o] = !1);}), Promise.resolve(n);}, _invoke: function _invoke(e, o) {return void 0 === o && (o = {}), i.invokeAPI(e, o, !1);} };}return e;}();exports.Sdk = Sdk;

/***/ }),
/* 152 */
/*!*******************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/sdk/sdkLib.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function isFunction(o) {return "function" == typeof o;}function compareVersion(o, e) {function r(o) {return parseInt(o, 10) || 0;}for (var n = o.split(".").map(r), t = e.split(".").map(r), E = 0; E < n.length; E++) {if (void 0 === t[E]) return !1;if (n[E] < t[E]) return !1;if (n[E] > t[E]) return !0;}return !0;}Object.defineProperty(exports, "__esModule", { value: !0 }), exports.LogLevel = exports.APP_TYPE = exports.ENV_ENUM_SUB = exports.ENV_ENUM = exports.ERROR_CODE = exports.compareVersion = exports.isFunction = void 0, exports.isFunction = isFunction, exports.compareVersion = compareVersion;var ERROR_CODE;!function (o) {o.cancel = "-1", o.not_exist = "1", o.no_permission = "7", o.jsapi_internal_error = "22";}(ERROR_CODE = exports.ERROR_CODE || (exports.ERROR_CODE = {}));var ENV_ENUM;!function (o) {o.pc = "pc", o.android = "android", o.ios = "ios", o.notInDingTalk = "notInDingTalk";}(ENV_ENUM = exports.ENV_ENUM || (exports.ENV_ENUM = {}));var ENV_ENUM_SUB;!function (o) {o.mac = "mac", o.win = "win", o.noSub = "noSub";}(ENV_ENUM_SUB = exports.ENV_ENUM_SUB || (exports.ENV_ENUM_SUB = {}));var APP_TYPE;!function (o) {o.WEB = "WEB", o.MINI_APP = "MINI_APP", o.WEEX = "WEEX", o.WEBVIEW_IN_MINIAPP = "WEBVIEW_IN_MINIAPP", o.WEEX_WIDGET = "WEEX_WIDGET";}(APP_TYPE = exports.APP_TYPE || (exports.APP_TYPE = {}));var LogLevel;!function (o) {o[o.INFO = 1] = "INFO", o[o.WARNING = 2] = "WARNING", o[o.ERROR = 3] = "ERROR";}(LogLevel = exports.LogLevel || (exports.LogLevel = {}));

/***/ }),
/* 153 */
/*!***********************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/packages/dingtalk-javascript-env/index.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getVirtualEnv() {var n = {};switch (framework) {case constants_1.FRAMEWORK.VUE:var t = weex.config,e = t.env;n.platform = e.platform, constants_1.RUNTIME.WEEX === runtime && (n.appVersion = e.appVersion, n.appName = e.appName);break;case constants_1.FRAMEWORK.RAX:constants_1.RUNTIME.WEEX === runtime && (n.platform = navigator.platform, n.appName = navigator.appName, n.appVersion = navigator.appVersion);break;case constants_1.FRAMEWORK.UNKNOWN:constants_1.RUNTIME.WEB === runtime && (n.platform = constants_1.RUNTIME.WEB), constants_1.RUNTIME.UNKNOWN === runtime && (n.platform = constants_1.RUNTIME.UNKNOWN);}return n;}Object.defineProperty(exports, "__esModule", { value: !0 });var whichOneRuntime_1 = __webpack_require__(/*! ./whichOneRuntime */ 154),environment_1 = __webpack_require__(/*! ./environment */ 155),constants_1 = __webpack_require__(/*! ./constants */ 156),_a = whichOneRuntime_1.default().split("."),runtime = _a[0],framework = _a[1],virtualEnv = getVirtualEnv(),env = environment_1.default(runtime, framework, virtualEnv);exports.default = env;

/***/ }),
/* 154 */
/*!*********************************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/packages/dingtalk-javascript-env/whichOneRuntime.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function snifferMachine(e, n) {for (var i = e.length, a = 0, f = !0; a < i; a++) {try {if (!(e[a] in n)) {f = !1;break;}} catch (e) {f = !1;break;}}return f;}function whichOneRuntime() {return maybeInWebView && maybeInWeexVueEnv ? snifferMachine(snifferWeexVueMap, weex) ? "Web.Vue" : "Web.Unknown" : !maybeInWebView && maybeInWeexVueEnv ? snifferMachine(snifferWeexVueMap, weex) ? "Weex.Vue" : "Weex.Unknown" : maybeInWebView && maybeInNative && !maybeInWeexVueEnv ? snifferMachine(snifferWeexRaxMap, window) ? "Weex.Rax" : "Weex.Unknown" : maybeInWebView && snifferMachine(snifferWebViewMap, window) ? "Web.Unknown" : "Unknown.Unknown";}Object.defineProperty(exports, "__esModule", { value: !0 });var maybeInWebView = "undefined" != typeof window,maybeInWeexVueEnv = "undefined" != typeof weex,maybeInNative = "undefined" != typeof callNative,snifferWeexRaxMap = ["__weex_config__", "__weex_options__", "__weex_require__"],snifferWebViewMap = ["localStorage", "location", "navigator", "XMLHttpRequest"],snifferWeexVueMap = ["config", "requireModule", "document"];exports.default = whichOneRuntime;

/***/ }),
/* 155 */
/*!*****************************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/packages/dingtalk-javascript-env/environment.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function environment(n, i, a) {var t = "Web" === a.platform,e = "iOS" === a.platform,r = "android" === a.platform,o = r || e,s = function () {return t ? window.navigator.userAgent.toLowerCase() : "";}(),c = function () {var n = {};if (t) {var i = window.name;try {var a = JSON.parse(i);n.containerId = a.containerId, n.version = a.hostVersion, n.language = a.language || "*";} catch (n) {}}return n;}(),d = function () {return o ? "DingTalk" === a.appName || "com.alibaba.android.rimet" === a.appName : s.indexOf("dingtalk") > -1 || !!c.containerId;}(),O = function () {if (t) {if (c.version) return c.version;var n = s.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);null === n && (n = s.match(/dingtalk\/([a-zA-Z0-9.-]+)/));return n && n[1] || "Unknown";}return a.appVersion;}(),u = !!c.containerId,l = /iphone|ipod|ios/.test(s),f = /ipad/.test(s),p = s.indexOf("android") > -1,m = s.indexOf("mac") > -1 && u,A = s.indexOf("win") > -1 && u,g = !m && !A && u,v = u,P = "";return P = d ? l || e ? constants_1.PLATFORM.IOS : p || r ? constants_1.PLATFORM.ANDROID : f ? constants_1.PLATFORM.IPAD : m ? constants_1.PLATFORM.MAC : A ? constants_1.PLATFORM.WINDOWS : g ? constants_1.PLATFORM.BROWSER : constants_1.PLATFORM.UNKNOWN : constants_1.PLATFORM.UNKNOWN, { isDingTalk: d, isWebiOS: l, isWebAndroid: p, isWeexiOS: e, isWeexAndroid: r, isDingTalkPCMac: m, isDingTalkPCWeb: g, isDingTalkPCWindows: A, isDingTalkPC: v, runtime: n, framework: i, platform: P, version: O, isWeex: o };}Object.defineProperty(exports, "__esModule", { value: !0 });var constants_1 = __webpack_require__(/*! ./constants */ 156);exports.default = environment;

/***/ }),
/* 156 */
/*!***************************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/packages/dingtalk-javascript-env/constants.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.FRAMEWORK = exports.PLATFORM = exports.RUNTIME = void 0, exports.RUNTIME = { WEB: "Web", WEEX: "Weex", UNKNOWN: "Unknown" }, exports.PLATFORM = { MAC: "Mac", WINDOWS: "Windows", IOS: "iOS", ANDROID: "Android", IPAD: "iPad", BROWSER: "Browser", UNKNOWN: "Unknown" }, exports.FRAMEWORK = { VUE: "Vue", RAX: "Rax", UNKNOWN: "Unknown" };

/***/ }),
/* 157 */
/*!************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/log.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function padNumber(e) {return e = "00" + e, e.substring(e.length - 2, e.length);}var __spreadArrays = this && this.__spreadArrays || function () {for (var e = 0, r = 0, t = arguments.length; r < t; r++) {e += arguments[r].length;}for (var o = Array(e), s = 0, r = 0; r < t; r++) {for (var n = arguments[r], a = 0, l = n.length; a < l; a++, s++) {o[s] = n[a];}}return o;};Object.defineProperty(exports, "__esModule", { value: !0 }), exports.log = void 0;var log = function log(e) {console.log.apply(console, __spreadArrays([padNumber(e.time.getHours()) + ":" + padNumber(e.time.getMinutes()) + ":" + padNumber(e.time.getSeconds())], e.text));};exports.log = log;

/***/ }),
/* 158 */
/*!************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/polyfills/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), __webpack_require__(/*! ./es6Promise */ 159), __webpack_require__(/*! ./objectAssign */ 161), __webpack_require__(/*! ./objectKeys */ 162);

/***/ }),
/* 159 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/polyfills/es6Promise.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"function" != typeof Promise && __webpack_require__(/*! promise-polyfill/dist/polyfill */ 160);

/***/ }),
/* 160 */
/*!********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/promise-polyfill/dist/polyfill.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
   true ? factory() :
  undefined;
})(this, function () {'use strict';

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}

  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
      if (
      newValue && (
      typeof newValue === 'object' || typeof newValue === 'function'))
      {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function () {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(
      function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });

    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new this.constructor(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.prototype['finally'] = function (callback) {
    var constructor = this.constructor;
    return this.then(
    function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    },
    function (reason) {
      return constructor.resolve(callback()).then(function () {
        return constructor.reject(reason);
      });
    });

  };

  Promise.all = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(
              val,
              function (val) {
                res(i, val);
              },
              reject);

              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn =
  typeof setImmediate === 'function' &&
  function (fn) {
    setImmediate(fn);
  } ||
  function (fn) {
    setTimeoutFunc(fn, 0);
  };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  var globalNS = function () {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') {
      return self;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof global !== 'undefined') {
      return global;
    }
    throw new Error('unable to locate global object');
  }();

  if (!globalNS.Promise) {
    globalNS.Promise = Promise;
  }

});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../AppData/Local/Temp/KuaiZip/0094001600f600aa00df005c00ae00b8.temp/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 3)))

/***/ }),
/* 161 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/polyfills/objectAssign.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

"function" != typeof Object.assign && Object.defineProperty(Object, "assign", { value: function value(e, t) {"use strict";if (null == e) throw new TypeError("Cannot convert undefined or null to object");for (var n = Object(e), r = 1; r < arguments.length; r++) {var o = arguments[r];if (null != o) for (var c in o) {Object.prototype.hasOwnProperty.call(o, c) && (n[c] = o[c]);}}return n;}, writable: !0, configurable: !0 });

/***/ }),
/* 162 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/polyfills/objectKeys.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Object.keys || (Object.keys = function (e) {if (e !== Object(e)) throw new TypeError("Object.keys called on a non-object");var t,r = [];for (t in e) {Object.prototype.hasOwnProperty.call(e, t) && r.push(t);}return r;});

/***/ }),
/* 163 */
/*!*****************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/otherApi.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.version = exports.language = exports.compareVersion = exports.other = exports.pc = exports.android = exports.ios = void 0;var env_1 = __webpack_require__(/*! ./env */ 150),ENV = env_1.getENV();exports.ios = ENV.platform === env_1.ENV_ENUM.ios, exports.android = ENV.platform === env_1.ENV_ENUM.android, exports.pc = ENV.platform === env_1.ENV_ENUM.pc, exports.other = ENV.platform === env_1.ENV_ENUM.notInDingTalk;var compareVersion = function compareVersion(e, r, o) {function t(e) {return parseInt(e, 10) || 0;}if ("string" != typeof e || "string" != typeof r) return !1;for (var s, p, n = e.split("-")[0].split(".").map(t), i = r.split("-")[0].split(".").map(t); s === p && i.length > 0;) {s = n.shift(), p = i.shift();}return o ? (p || 0) >= (s || 0) : (p || 0) > (s || 0);};exports.compareVersion = compareVersion, exports.language = ENV.language, exports.version = ENV.version;

/***/ }),
/* 164 */
/*!*******************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/platform/index.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), __webpack_require__(/*! ./pc */ 165), __webpack_require__(/*! ./android */ 170), __webpack_require__(/*! ./ios */ 176);

/***/ }),
/* 165 */
/*!****************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/platform/pc.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });var ddSdk_1 = __webpack_require__(/*! ../lib/ddSdk */ 149),env_1 = __webpack_require__(/*! ../lib/env */ 150),h5Pc_1 = __webpack_require__(/*! ../lib/bridge/h5Pc */ 166),eapp_1 = __webpack_require__(/*! ../lib/bridge/eapp */ 168),sdk_1 = __webpack_require__(/*! ../lib/sdk */ 151),h5PcEvent_1 = __webpack_require__(/*! ../lib/bridge/h5PcEvent */ 169);ddSdk_1.ddSdk.setPlatform({ platform: env_1.ENV_ENUM.pc, bridgeInit: function bridgeInit() {switch (env_1.getENV().appType) {case sdk_1.APP_TYPE.MINI_APP:return Promise.resolve(eapp_1.default);default:return h5Pc_1.h5PcBridgeInit().then(function () {return h5Pc_1.default;});}}, authMethod: "config", authParamsDeal: function authParamsDeal(e) {var r = Object.assign({}, e);return r.url = window.location.href.split("#")[0], r;}, event: { on: function on(e, r) {if (env_1.getENV().appType === sdk_1.APP_TYPE.WEB) return h5PcEvent_1.on(e, r);}, off: function off(e, r) {if (env_1.getENV().appType === sdk_1.APP_TYPE.WEB) return h5PcEvent_1.off(e, r);} } });

/***/ }),
/* 166 */
/*!********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/bridge/h5Pc.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.h5PcBridgeInit = void 0;var h5PcBridgeInit = function h5PcBridgeInit() {return Promise.resolve(__webpack_require__(/*! ../packages/frame-talk-client-pc/index.js */ 167));};exports.h5PcBridgeInit = h5PcBridgeInit;var h5PcBridge = function h5PcBridge(e, n) {return new Promise(function (r, t) {return __webpack_require__(/*! ../packages/frame-talk-client-pc/index.js */ 167).invokeAPI(e, n).result.then(function (e) {return "function" == typeof n.onSuccess && n.onSuccess.call(null, e), r(e);}, function (e) {return "function" == typeof n.onFail && n.onFail.call(null, e), t(e);});});};exports.default = h5PcBridge;

/***/ }),
/* 167 */
/*!********************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/packages/frame-talk-client-pc/index.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (t, e) { true ? module.exports = e() : undefined;}(this, function () {return function (t) {function e(r) {if (n[r]) return n[r].exports;var o = n[r] = { i: r, l: !1, exports: {} };return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports;}var n = {};return e.m = t, e.c = n, e.i = function (t) {return t;}, e.d = function (t, n, r) {e.o(t, n) || Object.defineProperty(t, n, { configurable: !1, enumerable: !0, get: r });}, e.n = function (t) {var n = t && t.__esModule ? function () {return t.default;} : function () {return t;};return e.d(n, "a", n), n;}, e.o = function (t, e) {return Object.prototype.hasOwnProperty.call(t, e);}, e.p = "", e(e.s = 721);}({ 199: function _(t, e, n) {"use strict";var r = n(201);t.exports = r;}, 201: function _(t, e, n) {"use strict";var r = n(203),o = n(204),i = n(202),u = n(205),c = new i(),a = !1,s = "",f = null,l = {},p = /{.*}/;try {var h = window.name.match(p);if (h && h[0]) var l = JSON.parse(h[0]);} catch (t) {l = {};}l.hostOrigin && ".dingtalk.com" === l.hostOrigin.split(":")[1].slice(0 - ".dingtalk.com".length) && l.containerId && (a = !0, s = l.hostOrigin, f = l.containerId);var d = {},v = new Promise(function (t, e) {d._resolve = t, d._reject = e;}),y = {},_ = null;window.top !== window ? (_ = window.top, d._resolve()) : "object" == typeof dingtalk && "object" == typeof dingtalk.platform && "function" == typeof dingtalk.platform.invokeAPI && (_ = window, d._resolve()), y[u.SYS_INIT] = function (t) {_ = t.frameWindow, d._resolve(), t.respond({});}, window.addEventListener("message", function (t) {var e = t.data,n = t.origin;if (n === s) if ("response" === e.type && e.msgId) {var r = e.msgId,i = c.getMsyById(r);i && i.methodName !== u.SYS_EVENT && i.receiveResponse(e.body, !e.success);} else if ("event" === e.type && e.msgId) {var r = e.msgId,i = c.getMsyById(r);i && i.receiveEvent(e.eventName, e.body);} else if ("request" === e.type && e.msgId) {var i = new o(t.source, n, e);y[i.methodName] && y[i.methodName](i);}}), e.invokeAPI = function (t, e) {var n = new r(f, t, e);return a && v.then(function () {_ && _.postMessage(n.getPayload(), s), c.addPending(n);}), n;};var b = null;e.addEventListener = function (t, n) {b || (b = e.invokeAPI(u.SYS_EVENT, {})), b.addEventListener(t, n);}, e.removeEventListener = function (t, e) {b && b.removeEventListener(t, e);};}, 202: function _(t, e, n) {"use strict";var r = function r() {this.pendingMsgs = {};};r.prototype.addPending = function (t) {this.pendingMsgs[t.id] = t;var e = function () {delete this.pendingMsgs[t.id], t.removeEventListener("_finish", e);}.bind(this);t.addEventListener("_finish", e);}, r.prototype.getMsyById = function (t) {return this.pendingMsgs[t];}, t.exports = r;}, 203: function _(t, e, n) {"use strict";var r = n(716),o = n(715),i = 0,u = Math.floor(1e3 * Math.random()),c = function c() {return 1e3 * (1e3 * u + Math.floor(1e3 * Math.random())) + ++i % 1e3;},a = { code: 408, reason: "timeout" },s = { TIMEOUT: "_timeout", FINISH: "_finish" },f = { timeout: -1 },l = function l(t, e, n, r) {this.id = c(), this.methodName = e, this.containerId = t, this.option = o({}, f, r);var n = n || {};this._p = {}, this.result = new Promise(function (t, e) {this._p._resolve = t, this._p._reject = e;}.bind(this)), this.callbacks = {}, this.plainMsg = this._handleMsg(n), this._eventsHandle = {}, this._timeoutTimer = null, this._initTimeout(), this.isFinish = !1;};l.prototype._initTimeout = function () {this._clearTimeout(), this.option.timeout > 0 && (this._timeoutTimer = setTimeout(function () {this.receiveEvent(s.TIMEOUT), this.receiveResponse(a, !0);}.bind(this), this.option.timeout));}, l.prototype._clearTimeout = function () {clearTimeout(this._timeoutTimer);}, l.prototype._handleMsg = function (t) {var e = {};return Object.keys(t).forEach(function (n) {var o = t[n];"function" == typeof o && "on" === n.slice(0, 2) ? this.callbacks[n] = o : e[n] = r(o);}.bind(this)), e;}, l.prototype.getPayload = function () {return { msgId: this.id, containerId: this.containerId, methodName: this.methodName, body: this.plainMsg, type: "request" };}, l.prototype.receiveEvent = function (t, e) {if (this.isFinish && t !== s.FINISH) return !1;t !== s.FINISH && t !== s.TIMEOUT && this._initTimeout(), Array.isArray(this._eventsHandle[t]) && this._eventsHandle[t].forEach(function (t) {try {t(e);} catch (t) {console.error(e);}});var n = "on" + t.charAt(0).toUpperCase() + t.slice(1);return this.callbacks[n] && this.callbacks[n](e), !0;}, l.prototype.addEventListener = function (t, e) {if (!t || "function" != typeof e) throw "eventName is null or handle is not a function, addEventListener fail";Array.isArray(this._eventsHandle[t]) || (this._eventsHandle[t] = []), this._eventsHandle[t].push(e);}, l.prototype.removeEventListener = function (t, e) {if (!t || !e) throw "eventName is null or handle is null, invoke removeEventListener fail";if (Array.isArray(this._eventsHandle[t])) {var n = this._eventsHandle[t].indexOf(e);-1 !== n && this._eventsHandle[t].splice(n, 1);}}, l.prototype.receiveResponse = function (t, e) {if (!0 === this.isFinish) return !1;this._clearTimeout();var e = !!e;return e ? this._p._reject(t) : this._p._resolve(t), setTimeout(function () {this.receiveEvent(s.FINISH);}.bind(this), 0), this.isFinish = !0, !0;}, t.exports = l;}, 204: function _(t, e, n) {"use strict";var r = function r(t, e, n) {if (this._msgId = n.msgId, this.frameWindow = t, this.methodName = n.methodName, this.clientOrigin = e, this.containerId = n.containerId, this.params = n.body, !this._msgId) throw "msgId not exist";if (!this.frameWindow) throw "frameWindow not exist";if (!this.methodName) throw "methodName not exits";if (!this.clientOrigin) throw "clientOrigin not exist";this.hasResponded = !1;};r.prototype.respond = function (t, e) {var e = !!e;if (!0 !== this.hasResponded) {var n = { type: "response", success: !e, body: t, msgId: this._msgId };this.frameWindow.postMessage(n, this.clientOrigin), this.hasResponded = !0;}}, r.prototype.emit = function (t, e) {var n = { type: "event", eventName: t, body: e, msgId: this._msgId };this.frameWindow.postMessage(n, this.clientOrigin);}, t.exports = r;}, 205: function _(t, e, n) {"use strict";t.exports = { SYS_EVENT: "SYS_openAPIContainerInitEvent", SYS_INIT: "SYS_openAPIContainerInit" };}, 4: function _(t, e) {var n;n = function () {return this;}();try {n = n || Function("return this")() || (0, eval)("this");} catch (t) {"object" == typeof window && (n = window);}t.exports = n;}, 714: function _(t, e, n) {(function (t, n) {function r(t, e) {return t.set(e[0], e[1]), t;}function o(t, e) {return t.add(e), t;}function i(t, e) {for (var n = -1, r = t.length; ++n < r && !1 !== e(t[n], n, t);) {;}return t;}function u(t, e) {for (var n = -1, r = e.length, o = t.length; ++n < r;) {t[o + n] = e[n];}return t;}function c(t, e, n, r) {var o = -1,i = t.length;for (r && i && (n = t[++o]); ++o < i;) {n = e(n, t[o], o, t);}return n;}function a(t, e) {for (var n = -1, r = Array(t); ++n < t;) {r[n] = e(n);}return r;}function s(t) {return t && t.Object === Object ? t : null;}function f(t) {var e = !1;if (null != t && "function" != typeof t.toString) try {e = !!(t + "");} catch (t) {}return e;}function l(t) {var e = -1,n = Array(t.size);return t.forEach(function (t, r) {n[++e] = [r, t];}), n;}function p(t) {var e = -1,n = Array(t.size);return t.forEach(function (t) {n[++e] = t;}), n;}function h(t) {var e = -1,n = t ? t.length : 0;for (this.clear(); ++e < n;) {var r = t[e];this.set(r[0], r[1]);}}function d() {this.__data__ = ke ? ke(null) : {};}function v(t) {return this.has(t) && delete this.__data__[t];}function y(t) {var e = this.__data__;if (ke) {var n = e[t];return n === St ? void 0 : n;}return ye.call(e, t) ? e[t] : void 0;}function _(t) {var e = this.__data__;return ke ? void 0 !== e[t] : ye.call(e, t);}function b(t, e) {return this.__data__[t] = ke && void 0 === e ? St : e, this;}function g(t) {var e = -1,n = t ? t.length : 0;for (this.clear(); ++e < n;) {var r = t[e];this.set(r[0], r[1]);}}function m() {this.__data__ = [];}function j(t) {var e = this.__data__,n = W(e, t);return !(n < 0 || (n == e.length - 1 ? e.pop() : xe.call(e, n, 1), 0));}function w(t) {var e = this.__data__,n = W(e, t);return n < 0 ? void 0 : e[n][1];}function I(t) {return W(this.__data__, t) > -1;}function O(t, e) {var n = this.__data__,r = W(n, t);return r < 0 ? n.push([t, e]) : n[r][1] = e, this;}function x(t) {var e = -1,n = t ? t.length : 0;for (this.clear(); ++e < n;) {var r = t[e];this.set(r[0], r[1]);}}function A() {this.__data__ = { hash: new h(), map: new (Me || g)(), string: new h() };}function E(t) {return rt(this, t).delete(t);}function S(t) {return rt(this, t).get(t);}function M(t) {return rt(this, t).has(t);}function N(t, e) {return rt(this, t).set(t, e), this;}function P(t) {this.__data__ = new g(t);}function T() {this.__data__ = new g();}function k(t) {return this.__data__.delete(t);}function F(t) {return this.__data__.get(t);}function H(t) {return this.__data__.has(t);}function L(t, e) {var n = this.__data__;return n instanceof g && n.__data__.length == Et && (n = this.__data__ = new x(n.__data__)), n.set(t, e), this;}function $(t, e, n) {var r = t[e];ye.call(t, e) && yt(r, n) && (void 0 !== n || e in t) || (t[e] = n);}function W(t, e) {for (var n = t.length; n--;) {if (yt(t[n][0], e)) return n;}return -1;}function U(t, e) {return t && tt(e, At(e), t);}function R(t, e, n, r, o, u, c) {var a;if (r && (a = u ? r(t, o, u, c) : r(t)), void 0 !== a) return a;if (!wt(t)) return t;var s = Ye(t);if (s) {if (a = at(t), !e) return Z(t, a);} else {var l = ct(t),p = l == kt || l == Ft;if (Ce(t)) return D(t, e);if (l == $t || l == Nt || p && !u) {if (f(t)) return u ? t : {};if (a = st(p ? {} : t), !e) return et(t, U(a, t));} else {if (!re[l]) return u ? t : {};a = ft(t, l, R, e);}}c || (c = new P());var h = c.get(t);if (h) return h;if (c.set(t, a), !s) var d = n ? nt(t) : At(t);return i(d || t, function (o, i) {d && (i = o, o = t[i]), $(a, i, R(o, e, n, r, i, t, c));}), a;}function B(t) {return wt(t) ? Ie(t) : {};}function Y(t, e, n) {var r = e(t);return Ye(t) ? r : u(r, n(t));}function C(t, e) {return ye.call(t, e) || "object" == typeof t && e in t && null === it(t);}function V(t) {return Ee(Object(t));}function D(t, e) {if (e) return t.slice();var n = new t.constructor(t.length);return t.copy(n), n;}function G(t) {var e = new t.constructor(t.byteLength);return new je(e).set(new je(t)), e;}function q(t, e) {var n = e ? G(t.buffer) : t.buffer;return new t.constructor(n, t.byteOffset, t.byteLength);}function z(t, e, n) {return c(e ? n(l(t), !0) : l(t), r, new t.constructor());}function J(t) {var e = new t.constructor(t.source, te.exec(t));return e.lastIndex = t.lastIndex, e;}function K(t, e, n) {return c(e ? n(p(t), !0) : p(t), o, new t.constructor());}function Q(t) {return Re ? Object(Re.call(t)) : {};}function X(t, e) {var n = e ? G(t.buffer) : t.buffer;return new t.constructor(n, t.byteOffset, t.length);}function Z(t, e) {var n = -1,r = t.length;for (e || (e = Array(r)); ++n < r;) {e[n] = t[n];}return e;}function tt(t, e, n, r) {n || (n = {});for (var o = -1, i = e.length; ++o < i;) {var u = e[o];$(n, u, r ? r(n[u], t[u], u, n, t) : t[u]);}return n;}function et(t, e) {return tt(t, ut(t), e);}function nt(t) {return Y(t, At, ut);}function rt(t, e) {var n = t.__data__;return ht(e) ? n["string" == typeof e ? "string" : "hash"] : n.map;}function ot(t, e) {var n = t[e];return Ot(n) ? n : void 0;}function it(t) {return Ae(Object(t));}function ut(t) {return we(Object(t));}function ct(t) {return _e.call(t);}function at(t) {var e = t.length,n = t.constructor(e);return e && "string" == typeof t[0] && ye.call(t, "index") && (n.index = t.index, n.input = t.input), n;}function st(t) {return "function" != typeof t.constructor || dt(t) ? {} : B(it(t));}function ft(t, e, n, r) {var o = t.constructor;switch (e) {case Yt:return G(t);case Pt:case Tt:return new o(+t);case Ct:return q(t, r);case Vt:case Dt:case Gt:case qt:case zt:case Jt:case Kt:case Qt:case Xt:return X(t, r);case Ht:return z(t, r, n);case Lt:case Rt:return new o(t);case Wt:return J(t);case Ut:return K(t, r, n);case Bt:return Q(t);}}function lt(t) {var e = t ? t.length : void 0;return jt(e) && (Ye(t) || xt(t) || _t(t)) ? a(e, String) : null;}function pt(t, e) {return !!(e = null == e ? Mt : e) && ("number" == typeof t || ne.test(t)) && t > -1 && t % 1 == 0 && t < e;}function ht(t) {var e = typeof t;return "string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t;}function dt(t) {var e = t && t.constructor;return t === ("function" == typeof e && e.prototype || de);}function vt(t) {if (null != t) {try {return ve.call(t);} catch (t) {}try {return t + "";} catch (t) {}}return "";}function yt(t, e) {return t === e || t !== t && e !== e;}function _t(t) {return gt(t) && ye.call(t, "callee") && (!Oe.call(t, "callee") || _e.call(t) == Nt);}function bt(t) {return null != t && jt(Be(t)) && !mt(t);}function gt(t) {return It(t) && bt(t);}function mt(t) {var e = wt(t) ? _e.call(t) : "";return e == kt || e == Ft;}function jt(t) {return "number" == typeof t && t > -1 && t % 1 == 0 && t <= Mt;}function wt(t) {var e = typeof t;return !!t && ("object" == e || "function" == e);}function It(t) {return !!t && "object" == typeof t;}function Ot(t) {return !!wt(t) && (mt(t) || f(t) ? be : ee).test(vt(t));}function xt(t) {return "string" == typeof t || !Ye(t) && It(t) && _e.call(t) == Rt;}function At(t) {var e = dt(t);if (!e && !bt(t)) return V(t);var n = lt(t),r = !!n,o = n || [],i = o.length;for (var u in t) {!C(t, u) || r && ("length" == u || pt(u, i)) || e && "constructor" == u || o.push(u);}return o;}var Et = 200,St = "__lodash_hash_undefined__",Mt = 9007199254740991,Nt = "[object Arguments]",Pt = "[object Boolean]",Tt = "[object Date]",kt = "[object Function]",Ft = "[object GeneratorFunction]",Ht = "[object Map]",Lt = "[object Number]",$t = "[object Object]",Wt = "[object RegExp]",Ut = "[object Set]",Rt = "[object String]",Bt = "[object Symbol]",Yt = "[object ArrayBuffer]",Ct = "[object DataView]",Vt = "[object Float32Array]",Dt = "[object Float64Array]",Gt = "[object Int8Array]",qt = "[object Int16Array]",zt = "[object Int32Array]",Jt = "[object Uint8Array]",Kt = "[object Uint8ClampedArray]",Qt = "[object Uint16Array]",Xt = "[object Uint32Array]",Zt = /[\\^$.*+?()[\]{}|]/g,te = /\w*$/,ee = /^\[object .+?Constructor\]$/,ne = /^(?:0|[1-9]\d*)$/,re = {};re[Nt] = re["[object Array]"] = re[Yt] = re[Ct] = re[Pt] = re[Tt] = re[Vt] = re[Dt] = re[Gt] = re[qt] = re[zt] = re[Ht] = re[Lt] = re[$t] = re[Wt] = re[Ut] = re[Rt] = re[Bt] = re[Jt] = re[Kt] = re[Qt] = re[Xt] = !0, re["[object Error]"] = re[kt] = re["[object WeakMap]"] = !1;var oe = { function: !0, object: !0 },ie = oe[typeof e] && e && !e.nodeType ? e : void 0,ue = oe[typeof t] && t && !t.nodeType ? t : void 0,ce = ue && ue.exports === ie ? ie : void 0,ae = s(ie && ue && "object" == typeof n && n),se = s(oe[typeof self] && self),fe = s(oe[typeof window] && window),le = s(oe[typeof this] && this),pe = ae || fe !== (le && le.window) && fe || se || le || Function("return this")(),he = Array.prototype,de = Object.prototype,ve = Function.prototype.toString,ye = de.hasOwnProperty,_e = de.toString,be = RegExp("^" + ve.call(ye).replace(Zt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),ge = ce ? pe.Buffer : void 0,me = pe.Symbol,je = pe.Uint8Array,we = Object.getOwnPropertySymbols,Ie = Object.create,Oe = de.propertyIsEnumerable,xe = he.splice,Ae = Object.getPrototypeOf,Ee = Object.keys,Se = ot(pe, "DataView"),Me = ot(pe, "Map"),Ne = ot(pe, "Promise"),Pe = ot(pe, "Set"),Te = ot(pe, "WeakMap"),ke = ot(Object, "create"),Fe = vt(Se),He = vt(Me),Le = vt(Ne),$e = vt(Pe),We = vt(Te),Ue = me ? me.prototype : void 0,Re = Ue ? Ue.valueOf : void 0;h.prototype.clear = d, h.prototype.delete = v, h.prototype.get = y, h.prototype.has = _, h.prototype.set = b, g.prototype.clear = m, g.prototype.delete = j, g.prototype.get = w, g.prototype.has = I, g.prototype.set = O, x.prototype.clear = A, x.prototype.delete = E, x.prototype.get = S, x.prototype.has = M, x.prototype.set = N, P.prototype.clear = T, P.prototype.delete = k, P.prototype.get = F, P.prototype.has = H, P.prototype.set = L;var Be = function (t) {return function (t) {return null == t ? void 0 : t.length;};}();we || (ut = function ut() {return [];}), (Se && ct(new Se(new ArrayBuffer(1))) != Ct || Me && ct(new Me()) != Ht || Ne && "[object Promise]" != ct(Ne.resolve()) || Pe && ct(new Pe()) != Ut || Te && "[object WeakMap]" != ct(new Te())) && (ct = function ct(t) {var e = _e.call(t),n = e == $t ? t.constructor : void 0,r = n ? vt(n) : void 0;if (r) switch (r) {case Fe:return Ct;case He:return Ht;case Le:return "[object Promise]";case $e:return Ut;case We:return "[object WeakMap]";}return e;});var Ye = Array.isArray,Ce = ge ? function (t) {return t instanceof ge;} : function (t) {return function () {return !1;};}();t.exports = R;}).call(e, n(719)(t), n(4));}, 715: function _(t, e, n) {function r(t, e, n) {var r = t[e];m.call(t, e) && a(r, n) && (void 0 !== n || e in t) || (t[e] = n);}function o(t, e, n, o) {n || (n = {});for (var i = -1, u = e.length; ++i < u;) {var c = e[i];r(n, c, o ? o(n[c], t[c], c, n, t) : t[c]);}return n;}function i(t, e) {return !!(e = null == e ? v : e) && ("number" == typeof t || b.test(t)) && t > -1 && t % 1 == 0 && t < e;}function u(t, e, n) {if (!p(n)) return !1;var r = typeof e;return !!("number" == r ? s(n) && i(e, n.length) : "string" == r && e in n) && a(n[e], t);}function c(t) {var e = t && t.constructor;return t === ("function" == typeof e && e.prototype || g);}function a(t, e) {return t === e || t !== t && e !== e;}function s(t) {return null != t && l(O(t)) && !f(t);}function f(t) {var e = p(t) ? j.call(t) : "";return e == y || e == _;}function l(t) {return "number" == typeof t && t > -1 && t % 1 == 0 && t <= v;}function p(t) {var e = typeof t;return !!t && ("object" == e || "function" == e);}var h = n(717),d = n(718),v = 9007199254740991,y = "[object Function]",_ = "[object GeneratorFunction]",b = /^(?:0|[1-9]\d*)$/,g = Object.prototype,m = g.hasOwnProperty,j = g.toString,w = g.propertyIsEnumerable,I = !w.call({ valueOf: 1 }, "valueOf"),O = function (t) {return function (t) {return null == t ? void 0 : t.length;};}(),x = function (t) {return d(function (e, n) {var r = -1,o = n.length,i = o > 1 ? n[o - 1] : void 0,c = o > 2 ? n[2] : void 0;for (i = t.length > 3 && "function" == typeof i ? (o--, i) : void 0, c && u(n[0], n[1], c) && (i = o < 3 ? void 0 : i, o = 1), e = Object(e); ++r < o;) {var a = n[r];a && t(e, a);}return e;});}(function (t, e) {if (I || c(e) || s(e)) return void o(e, h(e), t);for (var n in e) {m.call(e, n) && r(t, n, e[n]);}});t.exports = x;}, 716: function _(t, e, n) {function r(t) {return o(t, !0, !0);}var o = n(714);t.exports = r;}, 717: function _(t, e) {function n(t, e) {for (var n = -1, r = Array(t); ++n < t;) {r[n] = e(n);}return r;}function r(t, e) {var r = x(t) || c(t) ? n(t.length, String) : [],o = r.length,u = !!o;for (var a in t) {!e && !j.call(t, a) || u && ("length" == a || i(a, o)) || r.push(a);}return r;}function o(t) {if (!u(t)) return O(t);var e = [];for (var n in Object(t)) {j.call(t, n) && "constructor" != n && e.push(n);}return e;}function i(t, e) {return !!(e = null == e ? v : e) && ("number" == typeof t || g.test(t)) && t > -1 && t % 1 == 0 && t < e;}function u(t) {var e = t && t.constructor;return t === ("function" == typeof e && e.prototype || m);}function c(t) {return s(t) && j.call(t, "callee") && (!I.call(t, "callee") || w.call(t) == y);}function a(t) {return null != t && l(t.length) && !f(t);}function s(t) {return h(t) && a(t);}function f(t) {var e = p(t) ? w.call(t) : "";return e == _ || e == b;}function l(t) {return "number" == typeof t && t > -1 && t % 1 == 0 && t <= v;}function p(t) {var e = typeof t;return !!t && ("object" == e || "function" == e);}function h(t) {return !!t && "object" == typeof t;}function d(t) {return a(t) ? r(t) : o(t);}var v = 9007199254740991,y = "[object Arguments]",_ = "[object Function]",b = "[object GeneratorFunction]",g = /^(?:0|[1-9]\d*)$/,m = Object.prototype,j = m.hasOwnProperty,w = m.toString,I = m.propertyIsEnumerable,O = function (t, e) {return function (n) {return t(e(n));};}(Object.keys, Object),x = Array.isArray;t.exports = d;}, 718: function _(t, e) {function n(t, e, n) {switch (n.length) {case 0:return t.call(e);case 1:return t.call(e, n[0]);case 2:return t.call(e, n[0], n[1]);case 3:return t.call(e, n[0], n[1], n[2]);}return t.apply(e, n);}function r(t, e) {return e = I(void 0 === e ? t.length - 1 : e, 0), function () {for (var r = arguments, o = -1, i = I(r.length - e, 0), u = Array(i); ++o < i;) {u[o] = r[e + o];}o = -1;for (var c = Array(e + 1); ++o < e;) {c[o] = r[o];}return c[e] = u, n(t, this, c);};}function o(t, e) {if ("function" != typeof t) throw new TypeError(l);return e = void 0 === e ? e : s(e), r(t, e);}function i(t) {var e = typeof t;return !!t && ("object" == e || "function" == e);}function u(t) {return !!t && "object" == typeof t;}function c(t) {return "symbol" == typeof t || u(t) && w.call(t) == v;}function a(t) {return t ? (t = f(t)) === p || t === -p ? (t < 0 ? -1 : 1) * h : t === t ? t : 0 : 0 === t ? t : 0;}function s(t) {var e = a(t),n = e % 1;return e === e ? n ? e - n : e : 0;}function f(t) {if ("number" == typeof t) return t;if (c(t)) return d;if (i(t)) {var e = "function" == typeof t.valueOf ? t.valueOf() : t;t = i(e) ? e + "" : e;}if ("string" != typeof t) return 0 === t ? t : +t;t = t.replace(y, "");var n = b.test(t);return n || g.test(t) ? m(t.slice(2), n ? 2 : 8) : _.test(t) ? d : +t;}var l = "Expected a function",p = 1 / 0,h = 1.7976931348623157e308,d = NaN,v = "[object Symbol]",y = /^\s+|\s+$/g,_ = /^[-+]0x[0-9a-f]+$/i,b = /^0b[01]+$/i,g = /^0o[0-7]+$/i,m = parseInt,j = Object.prototype,w = j.toString,I = Math.max;t.exports = o;}, 719: function _(t, e) {t.exports = function (t) {return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", { enumerable: !0, get: function get() {return t.l;} }), Object.defineProperty(t, "id", { enumerable: !0, get: function get() {return t.i;} }), t.webpackPolyfill = 1), t;};}, 721: function _(t, e, n) {t.exports = n(199);} });});

/***/ }),
/* 168 */
/*!********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/bridge/eapp.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });var eappBridge = function eappBridge(e, n) {return new Promise(function (o, t) {dd.dtBridge({ m: e, args: n, onSuccess: function onSuccess(e) {"function" == typeof n.onSuccess && n.onSuccess(e), o(e);}, onFail: function onFail(e) {"function" == typeof n.onFail && n.onFail(e), t(e);} });});};exports.default = eappBridge;

/***/ }),
/* 169 */
/*!*************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/bridge/h5PcEvent.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.off = exports.on = void 0;var on = function on(e, o) {__webpack_require__(/*! ../packages/frame-talk-client-pc/index.js */ 167).addEventListener(e, o);};exports.on = on;var off = function off(e, o) {__webpack_require__(/*! ../packages/frame-talk-client-pc/index.js */ 167).removeEventListener(e, o);};exports.off = off;

/***/ }),
/* 170 */
/*!*********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/platform/android.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });var ddSdk_1 = __webpack_require__(/*! ../lib/ddSdk */ 149),env_1 = __webpack_require__(/*! ../lib/env */ 150),sdk_1 = __webpack_require__(/*! ../lib/sdk */ 151),eapp_1 = __webpack_require__(/*! ../lib/bridge/eapp */ 168),webviewInMiniApp_1 = __webpack_require__(/*! ../lib/bridge/webviewInMiniApp */ 171),h5Android_1 = __webpack_require__(/*! ../lib/bridge/h5Android */ 172),weex_1 = __webpack_require__(/*! ../lib/bridge/weex */ 173),h5Event_1 = __webpack_require__(/*! ../lib/bridge/h5Event */ 174),weexEvent_1 = __webpack_require__(/*! ../lib/bridge/weexEvent */ 175);ddSdk_1.ddSdk.setPlatform({ platform: env_1.ENV_ENUM.android, bridgeInit: function bridgeInit() {var e = env_1.getENV();return e.appType === sdk_1.APP_TYPE.MINI_APP ? Promise.resolve(eapp_1.default) : e.appType === sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP ? Promise.resolve(webviewInMiniApp_1.default) : e.appType === sdk_1.APP_TYPE.WEEX ? weex_1.androidWeexBridge() : h5Android_1.h5AndroidbridgeInit().then(function () {return h5Android_1.default;});}, authMethod: "runtime.permission.requestJsApis", event: { on: function on(e, r) {var i = env_1.getENV();switch (i.appType) {case sdk_1.APP_TYPE.WEB:case sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP:h5Event_1.on(e, r);break;case sdk_1.APP_TYPE.WEEX:weexEvent_1.on(e, r);break;default:throw new Error("Not support global event in the platfrom: " + i.appType);}}, off: function off(e, r) {var i = env_1.getENV();switch (i.appType) {case sdk_1.APP_TYPE.WEB:case sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP:h5Event_1.off(e, r);break;case sdk_1.APP_TYPE.WEEX:weexEvent_1.off(e, r);break;default:throw new Error("Not support global event in the platfrom: " + i.appType);}} } });

/***/ }),
/* 171 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/bridge/webviewInMiniApp.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });var noop = function noop() {},webviewInMiniappBridge = function webviewInMiniappBridge(e, n) {return new Promise(function (r, i) {var o = n.onSuccess || noop,a = n.onFail || noop;if (delete n.onSuccess, delete n.onFail, AlipayJSBridge) {var p = e.split("."),l = p.pop() || "",t = p.join(".");AlipayJSBridge.call.apply(null, ["webDdExec", { serviceName: t, actionName: l, args: n }, function (e) {var n = {},p = e.content;if (p) try {n = JSON.parse(p);} catch (e) {console.error("parse dt api result error", p, e);}e.success ? (o.apply(null, [n]), r(n)) : (a.apply(null, [n]), i(n));}]);} else {var c = new Error("Fatal error, cannot find bridge ,current env is WebView in MiniApp");a(c), i(c);}});};exports.default = webviewInMiniappBridge;

/***/ }),
/* 172 */
/*!*************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/bridge/h5Android.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.h5AndroidbridgeInit = void 0;var h5BridgeReadyPromise,h5AndroidbridgeInit = function h5AndroidbridgeInit() {return h5BridgeReadyPromise || (h5BridgeReadyPromise = new Promise(function (e, i) {var n = function n() {try {window.WebViewJavascriptBridgeAndroid = window.nuva && window.nuva.require(), e({});} catch (e) {i(e);}};window.nuva && (void 0 === window.nuva.isReady || window.nuva.isReady) ? n() : (document.addEventListener("runtimeready", function () {n();}, !1), document.addEventListener("runtimefailed", function (e) {var n = e && e.detail || { errorCode: "2", errorMessage: "unknown nuvajs bootstrap error" };i(n);}, !1));})), h5BridgeReadyPromise;};exports.h5AndroidbridgeInit = h5AndroidbridgeInit;var h5AndroidBridge = function h5AndroidBridge(e, i) {return h5BridgeReadyPromise || (h5BridgeReadyPromise = exports.h5AndroidbridgeInit()), h5BridgeReadyPromise.then(function () {return new Promise(function (n, r) {var d = e.split("."),o = d.pop() || "",t = d.join("."),a = function a(e) {"function" == typeof i.onSuccess && i.onSuccess(e), n(e);},u = function u(e) {"function" == typeof i.onFail && i.onFail(e), r(e);};"function" == typeof window.WebViewJavascriptBridgeAndroid && window.WebViewJavascriptBridgeAndroid(a, u, t, o, i);});});};exports.default = h5AndroidBridge;

/***/ }),
/* 173 */
/*!********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/bridge/weex.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.androidWeexBridge = exports.iosWeexBridge = exports.requireModule = void 0;var STATUS_NO_RESULT = 0,STATUS_OK = 1,STATUS_ERROR = 2,WEEX_IOS_BIZ_SUCCESS_CODE = "0",requireModule = function requireModule(e) {return "undefined" != typeof __weex_require__ ? __weex_require__("@weex-module/" + e) : "undefined" != typeof weex ? weex.requireModule(e) : void 0;};exports.requireModule = requireModule;var iosWeexBridge = function iosWeexBridge() {return Promise.resolve(function (e, r) {return new Promise(function (o, i) {var n = exports.requireModule("nuvajs-exec"),s = e.split("."),t = s.pop(),u = s.join(".");n.exec({ plugin: u, action: t, args: r }, function (e) {e && e.errorCode === WEEX_IOS_BIZ_SUCCESS_CODE ? ("function" == typeof r.onSuccess && r.onSuccess(e.result), o(e.result)) : ("function" == typeof r.onFail && r.onFail(e.result), i(e.result));});});});};exports.iosWeexBridge = iosWeexBridge;var androidWeexBridge = function androidWeexBridge() {return Promise.resolve(function (e, r) {return new Promise(function (o, i) {var n = exports.requireModule("nuvajs-exec"),s = e.split("."),t = s.pop(),u = s.join(".");n.exec({ plugin: u, action: t, args: r }, function (e) {var n = {};try {if (e && e.__message__) if ("object" == typeof e.__message__) n = e.__message__;else try {n = JSON.parse(e.__message__);} catch (r) {"string" == typeof e.__message__ && (n = e.__message__);}} catch (e) {}e && parseInt(e.__status__ + "", 10) === STATUS_OK ? ("function" == typeof r.onSuccess && r.onSuccess(n), o(n)) : ("function" == typeof r.onFail && r.onFail(n), i(n));});});});};exports.androidWeexBridge = androidWeexBridge;

/***/ }),
/* 174 */
/*!***********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/bridge/h5Event.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.off = exports.on = void 0;var NON_BRIDGE_EVENTS = ["resume", "pause", "online", "offline", "backbutton", "goBack", "pullToRefresh", "message", "recycle", "restore", "drawer", "tab", "navHelpIcon", "navRightButton", "navMenu", "navTitle", "appLinkResponse", "internalPageLinkResponse", "networkEvent", "hostTaskEvent", "deviceOrientationChanged", "autoCheckIn", "deviceFound", "hostCheckIn", "screenshot", "becomeActive", "keepAlive", "navTitleClick", "sharePage", "wxNotify", "editNoteCommand", "updateStyle", "qrscanCommonNotify", "__message__", "dtChannelEvent", "livePlayerEventPlay", "livePlayerEventPause", "livePlayerEventEnded", "livePlayerEventError", "navActions", "attendEvents"],BizEventBridgeType = "dtBizBridgeEvent",EventTypeListKey = "__eventTypeList__",handlerProxyMap = function () {return "undefined" == typeof WeakMap ? void 0 : new WeakMap();}(),getOnHandlerProxy = function getOnHandlerProxy(e, n) {if (handlerProxyMap) {var _t = handlerProxyMap.get(n);return void 0 === _t ? (_t = function t(e) {var r = e.detail;if (r.namespace && r.eventName) {var a = r.namespace + "." + r.eventName;_t && -1 !== _t[EventTypeListKey].indexOf(a) && n(r.data);}}, _t[EventTypeListKey] = [e], handlerProxyMap.set(n, _t)) : -1 === _t[EventTypeListKey].indexOf(e) && _t[EventTypeListKey].push(e), _t;}},getOffHandlerProxy = function getOffHandlerProxy(e, n) {if (handlerProxyMap) {var t = handlerProxyMap.get(n);return t && -1 !== t[EventTypeListKey].indexOf(e) && t[EventTypeListKey].splice(t[EventTypeListKey].indexOf(e), 1), t && t[EventTypeListKey].length <= 1 ? t : void 0;}},on = function on(e, n) {if (-1 !== NON_BRIDGE_EVENTS.indexOf(e)) document.addEventListener(e, n);else {var t = getOnHandlerProxy(e, n);t ? document.addEventListener(BizEventBridgeType, t) : console.log("bind event : " + e + " need WeakMap support , current environment doesnot");}};exports.on = on;var off = function off(e, n) {if (-1 !== NON_BRIDGE_EVENTS.indexOf(e)) document.removeEventListener(e, n);else {var t = getOffHandlerProxy(e, n);t && document.removeEventListener(BizEventBridgeType, t);}};exports.off = off;

/***/ }),
/* 175 */
/*!*************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/bridge/weexEvent.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _this = this;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.off = exports.on = void 0;var weex_1 = __webpack_require__(/*! ./weex */ 173),on = function on(e, o) {weex_1.requireModule("globalEvent").addEventListener(e, function (e) {var t = { preventDefault: function preventDefault() {throw new Error("does not support preventDefault");}, detail: e };o.call(_this, t);});};exports.on = on;var off = function off(e, o) {weex_1.requireModule("globalEvent").removeEventListener(e, o);};exports.off = off;

/***/ }),
/* 176 */
/*!*****************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/platform/ios.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });var ddSdk_1 = __webpack_require__(/*! ../lib/ddSdk */ 149),env_1 = __webpack_require__(/*! ../lib/env */ 150),sdk_1 = __webpack_require__(/*! ../lib/sdk */ 151),eapp_1 = __webpack_require__(/*! ../lib/bridge/eapp */ 168),webviewInMiniApp_1 = __webpack_require__(/*! ../lib/bridge/webviewInMiniApp */ 171),h5Ios_1 = __webpack_require__(/*! ../lib/bridge/h5Ios */ 177),weex_1 = __webpack_require__(/*! ../lib/bridge/weex */ 173),h5Event_1 = __webpack_require__(/*! ../lib/bridge/h5Event */ 174),weexEvent_1 = __webpack_require__(/*! ../lib/bridge/weexEvent */ 175);ddSdk_1.ddSdk.setPlatform({ platform: env_1.ENV_ENUM.ios, bridgeInit: function bridgeInit() {var e = env_1.getENV();return e.appType === sdk_1.APP_TYPE.MINI_APP ? Promise.resolve(eapp_1.default) : e.appType === sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP ? Promise.resolve(webviewInMiniApp_1.default) : e.appType === sdk_1.APP_TYPE.WEEX ? weex_1.iosWeexBridge() : h5Ios_1.h5IosBridgeInit().then(function () {return h5Ios_1.default;});}, authMethod: "runtime.permission.requestJsApis", event: { on: function on(e, r) {var i = env_1.getENV();switch (i.appType) {case sdk_1.APP_TYPE.WEB:case sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP:h5Event_1.on(e, r);break;case sdk_1.APP_TYPE.WEEX:weexEvent_1.on(e, r);break;default:throw new Error("Not support global event in the platfrom: " + i.appType);}}, off: function off(e, r) {var i = env_1.getENV();switch (i.appType) {case sdk_1.APP_TYPE.WEB:case sdk_1.APP_TYPE.WEBVIEW_IN_MINIAPP:h5Event_1.off(e, r);break;case sdk_1.APP_TYPE.WEEX:weexEvent_1.off(e, r);break;default:throw new Error("Not support global event in the platfrom: " + i.appType);}} } });

/***/ }),
/* 177 */
/*!*********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/bridge/h5Ios.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.h5IosBridgeInit = void 0;var h5BridgeReadyPromise,h5IosBridgeInit = function h5IosBridgeInit() {return h5BridgeReadyPromise || (h5BridgeReadyPromise = new Promise(function (e, r) {if ("undefined" != typeof WebViewJavascriptBridge) {try {WebViewJavascriptBridge.init(function (e, r) {});} catch (e) {return r();}return e({});}document.addEventListener("WebViewJavascriptBridgeReady", function () {if ("undefined" == typeof WebViewJavascriptBridge) return r();try {WebViewJavascriptBridge.init(function (e, r) {});} catch (e) {return r();}return e({});}, !1);})), h5BridgeReadyPromise;};exports.h5IosBridgeInit = h5IosBridgeInit;var h5IosBridge = function h5IosBridge(e, r) {return h5BridgeReadyPromise || (h5BridgeReadyPromise = exports.h5IosBridgeInit()), h5BridgeReadyPromise.then(function () {var i = Object.assign({}, r);return new Promise(function (r, n) {if (!0 === i.watch) {var t = i.onSuccess;delete i.onSuccess, "undefined" != typeof WebViewJavascriptBridge && WebViewJavascriptBridge.registerHandler(e, function (e, r) {"function" == typeof t && t.call(null, e), r && r({ errorCode: "0", errorMessage: "success" });});}void 0 !== window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.callHandler(e, Object.assign({}, i), function (e) {var t = e || {};"0" === t.errorCode ? ("function" == typeof i.onSuccess && i.onSuccess.call(null, t.result), r(t.result)) : ("-1" === t.errorCode && "function" == typeof i.onCancel ? i.onCancel.call(null, t.result, t.errorCode) : "function" == typeof i.onFail && i.onFail.call(null, t.result, t.errorCode), n(t.result));});});});};exports.default = h5IosBridge;

/***/ }),
/* 178 */
/*!***************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/apiObj.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.apiObj = void 0;var beaconPicker_1 = __webpack_require__(/*! ./biz/ATMBle/beaconPicker */ 179),detectFace_1 = __webpack_require__(/*! ./biz/ATMBle/detectFace */ 180),detectFaceFullScreen_1 = __webpack_require__(/*! ./biz/ATMBle/detectFaceFullScreen */ 181),faceManager_1 = __webpack_require__(/*! ./biz/ATMBle/faceManager */ 182),punchModePicker_1 = __webpack_require__(/*! ./biz/ATMBle/punchModePicker */ 183),openAuth_1 = __webpack_require__(/*! ./biz/alipay/openAuth */ 184),pay_1 = __webpack_require__(/*! ./biz/alipay/pay */ 185),requestAuthInfo_1 = __webpack_require__(/*! ./biz/auth/requestAuthInfo */ 186),chooseDateTime_1 = __webpack_require__(/*! ./biz/calendar/chooseDateTime */ 187),chooseHalfDay_1 = __webpack_require__(/*! ./biz/calendar/chooseHalfDay */ 189),chooseInterval_1 = __webpack_require__(/*! ./biz/calendar/chooseInterval */ 190),chooseOneDay_1 = __webpack_require__(/*! ./biz/calendar/chooseOneDay */ 191),chooseConversationByCorpId_1 = __webpack_require__(/*! ./biz/chat/chooseConversationByCorpId */ 192),collectSticker_1 = __webpack_require__(/*! ./biz/chat/collectSticker */ 193),createSceneGroup_1 = __webpack_require__(/*! ./biz/chat/createSceneGroup */ 194),getRealmCid_1 = __webpack_require__(/*! ./biz/chat/getRealmCid */ 195),locationChatMessage_1 = __webpack_require__(/*! ./biz/chat/locationChatMessage */ 196),openSingleChat_1 = __webpack_require__(/*! ./biz/chat/openSingleChat */ 197),pickConversation_1 = __webpack_require__(/*! ./biz/chat/pickConversation */ 198),sendEmotion_1 = __webpack_require__(/*! ./biz/chat/sendEmotion */ 199),toConversation_1 = __webpack_require__(/*! ./biz/chat/toConversation */ 200),toConversationByOpenConversationId_1 = __webpack_require__(/*! ./biz/chat/toConversationByOpenConversationId */ 201),setData_1 = __webpack_require__(/*! ./biz/clipboardData/setData */ 202),createCloudCall_1 = __webpack_require__(/*! ./biz/conference/createCloudCall */ 203),getCloudCallInfo_1 = __webpack_require__(/*! ./biz/conference/getCloudCallInfo */ 204),getCloudCallList_1 = __webpack_require__(/*! ./biz/conference/getCloudCallList */ 205),videoConfCall_1 = __webpack_require__(/*! ./biz/conference/videoConfCall */ 206),choose_1 = __webpack_require__(/*! ./biz/contact/choose */ 207),chooseMobileContacts_1 = __webpack_require__(/*! ./biz/contact/chooseMobileContacts */ 208),complexPicker_1 = __webpack_require__(/*! ./biz/contact/complexPicker */ 209),createGroup_1 = __webpack_require__(/*! ./biz/contact/createGroup */ 210),departmentsPicker_1 = __webpack_require__(/*! ./biz/contact/departmentsPicker */ 211),externalComplexPicker_1 = __webpack_require__(/*! ./biz/contact/externalComplexPicker */ 212),externalEditForm_1 = __webpack_require__(/*! ./biz/contact/externalEditForm */ 213),setRule_1 = __webpack_require__(/*! ./biz/contact/setRule */ 214),chooseSpaceDir_1 = __webpack_require__(/*! ./biz/cspace/chooseSpaceDir */ 215),delete_1 = __webpack_require__(/*! ./biz/cspace/delete */ 216),preview_1 = __webpack_require__(/*! ./biz/cspace/preview */ 217),saveFile_1 = __webpack_require__(/*! ./biz/cspace/saveFile */ 218),choose_2 = __webpack_require__(/*! ./biz/customContact/choose */ 219),multipleChoose_1 = __webpack_require__(/*! ./biz/customContact/multipleChoose */ 220),create_1 = __webpack_require__(/*! ./biz/ding/create */ 221),post_1 = __webpack_require__(/*! ./biz/ding/post */ 222),notifyWeex_1 = __webpack_require__(/*! ./biz/event/notifyWeex */ 223),fetchData_1 = __webpack_require__(/*! ./biz/intent/fetchData */ 224),bind_1 = __webpack_require__(/*! ./biz/iot/bind */ 225),bindMeetingRoom_1 = __webpack_require__(/*! ./biz/iot/bindMeetingRoom */ 226),getDeviceProperties_1 = __webpack_require__(/*! ./biz/iot/getDeviceProperties */ 227),invokeThingService_1 = __webpack_require__(/*! ./biz/iot/invokeThingService */ 228),queryMeetingRoomList_1 = __webpack_require__(/*! ./biz/iot/queryMeetingRoomList */ 229),setDeviceProperties_1 = __webpack_require__(/*! ./biz/iot/setDeviceProperties */ 230),unbind_1 = __webpack_require__(/*! ./biz/iot/unbind */ 231),startClassRoom_1 = __webpack_require__(/*! ./biz/live/startClassRoom */ 232),startUnifiedLive_1 = __webpack_require__(/*! ./biz/live/startUnifiedLive */ 233),locate_1 = __webpack_require__(/*! ./biz/map/locate */ 234),search_1 = __webpack_require__(/*! ./biz/map/search */ 235),view_1 = __webpack_require__(/*! ./biz/map/view */ 236),compressVideo_1 = __webpack_require__(/*! ./biz/media/compressVideo */ 237),openApp_1 = __webpack_require__(/*! ./biz/microApp/openApp */ 238),close_1 = __webpack_require__(/*! ./biz/navigation/close */ 239),goBack_1 = __webpack_require__(/*! ./biz/navigation/goBack */ 240),hideBar_1 = __webpack_require__(/*! ./biz/navigation/hideBar */ 241),navigateToMiniProgram_1 = __webpack_require__(/*! ./biz/navigation/navigateToMiniProgram */ 242),quit_1 = __webpack_require__(/*! ./biz/navigation/quit */ 243),replace_1 = __webpack_require__(/*! ./biz/navigation/replace */ 244),setIcon_1 = __webpack_require__(/*! ./biz/navigation/setIcon */ 245),setLeft_1 = __webpack_require__(/*! ./biz/navigation/setLeft */ 246),setMenu_1 = __webpack_require__(/*! ./biz/navigation/setMenu */ 247),setRight_1 = __webpack_require__(/*! ./biz/navigation/setRight */ 248),setTitle_1 = __webpack_require__(/*! ./biz/navigation/setTitle */ 249),componentPunchFromPartner_1 = __webpack_require__(/*! ./biz/pbp/componentPunchFromPartner */ 250),startMatchRuleFromPartner_1 = __webpack_require__(/*! ./biz/pbp/startMatchRuleFromPartner */ 251),stopMatchRuleFromPartner_1 = __webpack_require__(/*! ./biz/pbp/stopMatchRuleFromPartner */ 252),subscribe_1 = __webpack_require__(/*! ./biz/realm/subscribe */ 253),unsubscribe_1 = __webpack_require__(/*! ./biz/realm/unsubscribe */ 254),addShortCut_1 = __webpack_require__(/*! ./biz/shortCut/addShortCut */ 255),closeUnpayOrder_1 = __webpack_require__(/*! ./biz/store/closeUnpayOrder */ 256),createOrder_1 = __webpack_require__(/*! ./biz/store/createOrder */ 257),getPayUrl_1 = __webpack_require__(/*! ./biz/store/getPayUrl */ 258),inquiry_1 = __webpack_require__(/*! ./biz/store/inquiry */ 259),call_1 = __webpack_require__(/*! ./biz/telephone/call */ 260),checkBizCall_1 = __webpack_require__(/*! ./biz/telephone/checkBizCall */ 261),quickCallList_1 = __webpack_require__(/*! ./biz/telephone/quickCallList */ 262),showCallMenu_1 = __webpack_require__(/*! ./biz/telephone/showCallMenu */ 263),checkPassword_1 = __webpack_require__(/*! ./biz/user/checkPassword */ 264),get_1 = __webpack_require__(/*! ./biz/user/get */ 265),chooseImage_1 = __webpack_require__(/*! ./biz/util/chooseImage */ 266),chosen_1 = __webpack_require__(/*! ./biz/util/chosen */ 267),datepicker_1 = __webpack_require__(/*! ./biz/util/datepicker */ 268),datetimepicker_1 = __webpack_require__(/*! ./biz/util/datetimepicker */ 269),decrypt_1 = __webpack_require__(/*! ./biz/util/decrypt */ 270),downloadFile_1 = __webpack_require__(/*! ./biz/util/downloadFile */ 271),encrypt_1 = __webpack_require__(/*! ./biz/util/encrypt */ 272),getPerfInfo_1 = __webpack_require__(/*! ./biz/util/getPerfInfo */ 273),isLocalFileExist_1 = __webpack_require__(/*! ./biz/util/isLocalFileExist */ 274),multiSelect_1 = __webpack_require__(/*! ./biz/util/multiSelect */ 275),open_1 = __webpack_require__(/*! ./biz/util/open */ 276),openLink_1 = __webpack_require__(/*! ./biz/util/openLink */ 277),openLocalFile_1 = __webpack_require__(/*! ./biz/util/openLocalFile */ 278),openModal_1 = __webpack_require__(/*! ./biz/util/openModal */ 279),openSlidePanel_1 = __webpack_require__(/*! ./biz/util/openSlidePanel */ 280),presentWindow_1 = __webpack_require__(/*! ./biz/util/presentWindow */ 281),previewImage_1 = __webpack_require__(/*! ./biz/util/previewImage */ 282),previewVideo_1 = __webpack_require__(/*! ./biz/util/previewVideo */ 283),saveImage_1 = __webpack_require__(/*! ./biz/util/saveImage */ 284),scan_1 = __webpack_require__(/*! ./biz/util/scan */ 285),scanCard_1 = __webpack_require__(/*! ./biz/util/scanCard */ 286),setScreenBrightnessAndKeepOn_1 = __webpack_require__(/*! ./biz/util/setScreenBrightnessAndKeepOn */ 287),share_1 = __webpack_require__(/*! ./biz/util/share */ 288),shareImage_1 = __webpack_require__(/*! ./biz/util/shareImage */ 289),startDocSign_1 = __webpack_require__(/*! ./biz/util/startDocSign */ 290),systemShare_1 = __webpack_require__(/*! ./biz/util/systemShare */ 291),timepicker_1 = __webpack_require__(/*! ./biz/util/timepicker */ 292),uploadAttachment_1 = __webpack_require__(/*! ./biz/util/uploadAttachment */ 293),uploadImage_1 = __webpack_require__(/*! ./biz/util/uploadImage */ 294),uploadImageFromCamera_1 = __webpack_require__(/*! ./biz/util/uploadImageFromCamera */ 295),ut_1 = __webpack_require__(/*! ./biz/util/ut */ 296),openBindIDCard_1 = __webpack_require__(/*! ./biz/verify/openBindIDCard */ 297),startAuth_1 = __webpack_require__(/*! ./biz/verify/startAuth */ 298),requestAuthCode_1 = __webpack_require__(/*! ./channel/permission/requestAuthCode */ 299),clearShake_1 = __webpack_require__(/*! ./device/accelerometer/clearShake */ 300),watchShake_1 = __webpack_require__(/*! ./device/accelerometer/watchShake */ 301),download_1 = __webpack_require__(/*! ./device/audio/download */ 302),onPlayEnd_1 = __webpack_require__(/*! ./device/audio/onPlayEnd */ 303),onRecordEnd_1 = __webpack_require__(/*! ./device/audio/onRecordEnd */ 304),pause_1 = __webpack_require__(/*! ./device/audio/pause */ 305),play_1 = __webpack_require__(/*! ./device/audio/play */ 306),resume_1 = __webpack_require__(/*! ./device/audio/resume */ 307),startRecord_1 = __webpack_require__(/*! ./device/audio/startRecord */ 308),stop_1 = __webpack_require__(/*! ./device/audio/stop */ 309),stopRecord_1 = __webpack_require__(/*! ./device/audio/stopRecord */ 310),translateVoice_1 = __webpack_require__(/*! ./device/audio/translateVoice */ 311),getInterface_1 = __webpack_require__(/*! ./device/base/getInterface */ 312),getPhoneInfo_1 = __webpack_require__(/*! ./device/base/getPhoneInfo */ 313),getUUID_1 = __webpack_require__(/*! ./device/base/getUUID */ 314),getWifiStatus_1 = __webpack_require__(/*! ./device/base/getWifiStatus */ 315),getNetworkType_1 = __webpack_require__(/*! ./device/connection/getNetworkType */ 316),checkPermission_1 = __webpack_require__(/*! ./device/geolocation/checkPermission */ 317),get_2 = __webpack_require__(/*! ./device/geolocation/get */ 318),start_1 = __webpack_require__(/*! ./device/geolocation/start */ 319),status_1 = __webpack_require__(/*! ./device/geolocation/status */ 320),stop_2 = __webpack_require__(/*! ./device/geolocation/stop */ 321),checkInstalledApps_1 = __webpack_require__(/*! ./device/launcher/checkInstalledApps */ 322),launchApp_1 = __webpack_require__(/*! ./device/launcher/launchApp */ 323),nfcRead_1 = __webpack_require__(/*! ./device/nfc/nfcRead */ 324),nfcStop_1 = __webpack_require__(/*! ./device/nfc/nfcStop */ 325),nfcWrite_1 = __webpack_require__(/*! ./device/nfc/nfcWrite */ 326),actionSheet_1 = __webpack_require__(/*! ./device/notification/actionSheet */ 327),alert_1 = __webpack_require__(/*! ./device/notification/alert */ 328),confirm_1 = __webpack_require__(/*! ./device/notification/confirm */ 329),extendModal_1 = __webpack_require__(/*! ./device/notification/extendModal */ 330),hidePreloader_1 = __webpack_require__(/*! ./device/notification/hidePreloader */ 331),modal_1 = __webpack_require__(/*! ./device/notification/modal */ 332),prompt_1 = __webpack_require__(/*! ./device/notification/prompt */ 333),showPreloader_1 = __webpack_require__(/*! ./device/notification/showPreloader */ 334),toast_1 = __webpack_require__(/*! ./device/notification/toast */ 335),vibrate_1 = __webpack_require__(/*! ./device/notification/vibrate */ 336),insetAdjust_1 = __webpack_require__(/*! ./device/screen/insetAdjust */ 337),resetView_1 = __webpack_require__(/*! ./device/screen/resetView */ 338),rotateView_1 = __webpack_require__(/*! ./device/screen/rotateView */ 339),keepAlive_1 = __webpack_require__(/*! ./media/voiceRecorder/keepAlive */ 340),pause_2 = __webpack_require__(/*! ./media/voiceRecorder/pause */ 341),resume_2 = __webpack_require__(/*! ./media/voiceRecorder/resume */ 342),start_2 = __webpack_require__(/*! ./media/voiceRecorder/start */ 343),stop_3 = __webpack_require__(/*! ./media/voiceRecorder/stop */ 344),loginGovNet_1 = __webpack_require__(/*! ./net/bjGovApn/loginGovNet */ 345),fetch_1 = __webpack_require__(/*! ./runtime/message/fetch */ 346),post_2 = __webpack_require__(/*! ./runtime/message/post */ 347),requestAuthCode_2 = __webpack_require__(/*! ./runtime/permission/requestAuthCode */ 348),requestOperateAuthCode_1 = __webpack_require__(/*! ./runtime/permission/requestOperateAuthCode */ 349),plain_1 = __webpack_require__(/*! ./ui/input/plain */ 350),close_2 = __webpack_require__(/*! ./ui/nav/close */ 351),getCurrentId_1 = __webpack_require__(/*! ./ui/nav/getCurrentId */ 352),go_1 = __webpack_require__(/*! ./ui/nav/go */ 353),preload_1 = __webpack_require__(/*! ./ui/nav/preload */ 354),recycle_1 = __webpack_require__(/*! ./ui/nav/recycle */ 355),setColors_1 = __webpack_require__(/*! ./ui/progressBar/setColors */ 356),disable_1 = __webpack_require__(/*! ./ui/pullToRefresh/disable */ 357),enable_1 = __webpack_require__(/*! ./ui/pullToRefresh/enable */ 358),stop_4 = __webpack_require__(/*! ./ui/pullToRefresh/stop */ 359),disable_2 = __webpack_require__(/*! ./ui/webViewBounce/disable */ 360),enable_2 = __webpack_require__(/*! ./ui/webViewBounce/enable */ 361),getItem_1 = __webpack_require__(/*! ./util/domainStorage/getItem */ 362),removeItem_1 = __webpack_require__(/*! ./util/domainStorage/removeItem */ 363),setItem_1 = __webpack_require__(/*! ./util/domainStorage/setItem */ 364);exports.apiObj = { biz: { ATMBle: { beaconPicker: beaconPicker_1.beaconPicker$, detectFace: detectFace_1.detectFace$, detectFaceFullScreen: detectFaceFullScreen_1.detectFaceFullScreen$, faceManager: faceManager_1.faceManager$, punchModePicker: punchModePicker_1.punchModePicker$ }, alipay: { openAuth: openAuth_1.openAuth$, pay: pay_1.pay$ }, auth: { requestAuthInfo: requestAuthInfo_1.requestAuthInfo$ }, calendar: { chooseDateTime: chooseDateTime_1.chooseDateTime$, chooseHalfDay: chooseHalfDay_1.chooseHalfDay$, chooseInterval: chooseInterval_1.chooseInterval$, chooseOneDay: chooseOneDay_1.chooseOneDay$ }, chat: { chooseConversationByCorpId: chooseConversationByCorpId_1.chooseConversationByCorpId$, collectSticker: collectSticker_1.collectSticker$, createSceneGroup: createSceneGroup_1.createSceneGroup$, getRealmCid: getRealmCid_1.getRealmCid$, locationChatMessage: locationChatMessage_1.locationChatMessage$, openSingleChat: openSingleChat_1.openSingleChat$, pickConversation: pickConversation_1.pickConversation$, sendEmotion: sendEmotion_1.sendEmotion$, toConversation: toConversation_1.toConversation$, toConversationByOpenConversationId: toConversationByOpenConversationId_1.toConversationByOpenConversationId$ }, clipboardData: { setData: setData_1.setData$ }, conference: { createCloudCall: createCloudCall_1.createCloudCall$, getCloudCallInfo: getCloudCallInfo_1.getCloudCallInfo$, getCloudCallList: getCloudCallList_1.getCloudCallList$, videoConfCall: videoConfCall_1.videoConfCall$ }, contact: { choose: choose_1.choose$, chooseMobileContacts: chooseMobileContacts_1.chooseMobileContacts$, complexPicker: complexPicker_1.complexPicker$, createGroup: createGroup_1.createGroup$, departmentsPicker: departmentsPicker_1.departmentsPicker$, externalComplexPicker: externalComplexPicker_1.externalComplexPicker$, externalEditForm: externalEditForm_1.externalEditForm$, setRule: setRule_1.setRule$ }, cspace: { chooseSpaceDir: chooseSpaceDir_1.chooseSpaceDir$, delete: delete_1.delete$, preview: preview_1.preview$, saveFile: saveFile_1.saveFile$ }, customContact: { choose: choose_2.choose$, multipleChoose: multipleChoose_1.multipleChoose$ }, ding: { create: create_1.create$, post: post_1.post$ }, event: { notifyWeex: notifyWeex_1.notifyWeex$ }, intent: { fetchData: fetchData_1.fetchData$ }, iot: { bind: bind_1.bind$, bindMeetingRoom: bindMeetingRoom_1.bindMeetingRoom$, getDeviceProperties: getDeviceProperties_1.getDeviceProperties$, invokeThingService: invokeThingService_1.invokeThingService$, queryMeetingRoomList: queryMeetingRoomList_1.queryMeetingRoomList$, setDeviceProperties: setDeviceProperties_1.setDeviceProperties$, unbind: unbind_1.unbind$ }, live: { startClassRoom: startClassRoom_1.startClassRoom$, startUnifiedLive: startUnifiedLive_1.startUnifiedLive$ }, map: { locate: locate_1.locate$, search: search_1.search$, view: view_1.view$ }, media: { compressVideo: compressVideo_1.compressVideo$ }, microApp: { openApp: openApp_1.openApp$ }, navigation: { close: close_1.close$, goBack: goBack_1.goBack$, hideBar: hideBar_1.hideBar$, navigateToMiniProgram: navigateToMiniProgram_1.navigateToMiniProgram$, quit: quit_1.quit$, replace: replace_1.replace$, setIcon: setIcon_1.setIcon$, setLeft: setLeft_1.setLeft$, setMenu: setMenu_1.setMenu$, setRight: setRight_1.setRight$, setTitle: setTitle_1.setTitle$ }, pbp: { componentPunchFromPartner: componentPunchFromPartner_1.componentPunchFromPartner$, startMatchRuleFromPartner: startMatchRuleFromPartner_1.startMatchRuleFromPartner$, stopMatchRuleFromPartner: stopMatchRuleFromPartner_1.stopMatchRuleFromPartner$ }, realm: { subscribe: subscribe_1.subscribe$, unsubscribe: unsubscribe_1.unsubscribe$ }, shortCut: { addShortCut: addShortCut_1.addShortCut$ }, store: { closeUnpayOrder: closeUnpayOrder_1.closeUnpayOrder$, createOrder: createOrder_1.createOrder$, getPayUrl: getPayUrl_1.getPayUrl$, inquiry: inquiry_1.inquiry$ }, telephone: { call: call_1.call$, checkBizCall: checkBizCall_1.checkBizCall$, quickCallList: quickCallList_1.quickCallList$, showCallMenu: showCallMenu_1.showCallMenu$ }, user: { checkPassword: checkPassword_1.checkPassword$, get: get_1.get$ }, util: { chooseImage: chooseImage_1.chooseImage$, chosen: chosen_1.chosen$, datepicker: datepicker_1.datepicker$, datetimepicker: datetimepicker_1.datetimepicker$, decrypt: decrypt_1.decrypt$, downloadFile: downloadFile_1.downloadFile$, encrypt: encrypt_1.encrypt$, getPerfInfo: getPerfInfo_1.getPerfInfo$, isLocalFileExist: isLocalFileExist_1.isLocalFileExist$, multiSelect: multiSelect_1.multiSelect$, open: open_1.open$, openLink: openLink_1.openLink$, openLocalFile: openLocalFile_1.openLocalFile$, openModal: openModal_1.openModal$, openSlidePanel: openSlidePanel_1.openSlidePanel$, presentWindow: presentWindow_1.presentWindow$, previewImage: previewImage_1.previewImage$, previewVideo: previewVideo_1.previewVideo$, saveImage: saveImage_1.saveImage$, scan: scan_1.scan$, scanCard: scanCard_1.scanCard$, setScreenBrightnessAndKeepOn: setScreenBrightnessAndKeepOn_1.setScreenBrightnessAndKeepOn$, share: share_1.share$, shareImage: shareImage_1.shareImage$, startDocSign: startDocSign_1.startDocSign$, systemShare: systemShare_1.systemShare$, timepicker: timepicker_1.timepicker$, uploadAttachment: uploadAttachment_1.uploadAttachment$, uploadImage: uploadImage_1.uploadImage$, uploadImageFromCamera: uploadImageFromCamera_1.uploadImageFromCamera$, ut: ut_1.ut$ }, verify: { openBindIDCard: openBindIDCard_1.openBindIDCard$, startAuth: startAuth_1.startAuth$ } }, channel: { permission: { requestAuthCode: requestAuthCode_1.requestAuthCode$ } }, device: { accelerometer: { clearShake: clearShake_1.clearShake$, watchShake: watchShake_1.watchShake$ }, audio: { download: download_1.download$, onPlayEnd: onPlayEnd_1.onPlayEnd$, onRecordEnd: onRecordEnd_1.onRecordEnd$, pause: pause_1.pause$, play: play_1.play$, resume: resume_1.resume$, startRecord: startRecord_1.startRecord$, stop: stop_1.stop$, stopRecord: stopRecord_1.stopRecord$, translateVoice: translateVoice_1.translateVoice$ }, base: { getInterface: getInterface_1.getInterface$, getPhoneInfo: getPhoneInfo_1.getPhoneInfo$, getUUID: getUUID_1.getUUID$, getWifiStatus: getWifiStatus_1.getWifiStatus$ }, connection: { getNetworkType: getNetworkType_1.getNetworkType$ }, geolocation: { checkPermission: checkPermission_1.checkPermission$, get: get_2.get$, start: start_1.start$, status: status_1.status$, stop: stop_2.stop$ }, launcher: { checkInstalledApps: checkInstalledApps_1.checkInstalledApps$, launchApp: launchApp_1.launchApp$ }, nfc: { nfcRead: nfcRead_1.nfcRead$, nfcStop: nfcStop_1.nfcStop$, nfcWrite: nfcWrite_1.nfcWrite$ }, notification: { actionSheet: actionSheet_1.actionSheet$, alert: alert_1.alert$, confirm: confirm_1.confirm$, extendModal: extendModal_1.extendModal$, hidePreloader: hidePreloader_1.hidePreloader$, modal: modal_1.modal$, prompt: prompt_1.prompt$, showPreloader: showPreloader_1.showPreloader$, toast: toast_1.toast$, vibrate: vibrate_1.vibrate$ }, screen: { insetAdjust: insetAdjust_1.insetAdjust$, resetView: resetView_1.resetView$, rotateView: rotateView_1.rotateView$ } }, media: { voiceRecorder: { keepAlive: keepAlive_1.keepAlive$, pause: pause_2.pause$, resume: resume_2.resume$, start: start_2.start$, stop: stop_3.stop$ } }, net: { bjGovApn: { loginGovNet: loginGovNet_1.loginGovNet$ } }, runtime: { message: { fetch: fetch_1.fetch$, post: post_2.post$ }, permission: { requestAuthCode: requestAuthCode_2.requestAuthCode$, requestOperateAuthCode: requestOperateAuthCode_1.requestOperateAuthCode$ } }, ui: { input: { plain: plain_1.plain$ }, nav: { close: close_2.close$, getCurrentId: getCurrentId_1.getCurrentId$, go: go_1.go$, preload: preload_1.preload$, recycle: recycle_1.recycle$ }, progressBar: { setColors: setColors_1.setColors$ }, pullToRefresh: { disable: disable_1.disable$, enable: enable_1.enable$, stop: stop_4.stop$ }, webViewBounce: { disable: disable_2.disable$, enable: enable_2.enable$ } }, util: { domainStorage: { getItem: getItem_1.getItem$, removeItem: removeItem_1.removeItem$, setItem: setItem_1.setItem$ } } };

/***/ }),
/* 179 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/ATMBle/beaconPicker.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function beaconPicker$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.beaconPicker$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.ATMBle.beaconPicker";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.0.7" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.0.7" }, _a)), exports.beaconPicker$ = beaconPicker$, exports.default = beaconPicker$;

/***/ }),
/* 180 */
/*!******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/ATMBle/detectFace.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function detectFace$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.detectFace$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.ATMBle.detectFace";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.18" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.18" }, _a)), exports.detectFace$ = detectFace$, exports.default = detectFace$;

/***/ }),
/* 181 */
/*!****************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/ATMBle/detectFaceFullScreen.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function detectFaceFullScreen$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.detectFaceFullScreen$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.ATMBle.detectFaceFullScreen";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.18" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.18" }, _a)), exports.detectFaceFullScreen$ = detectFaceFullScreen$, exports.default = detectFaceFullScreen$;

/***/ }),
/* 182 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/ATMBle/faceManager.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function faceManager$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.faceManager$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.ATMBle.faceManager";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.0.7" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.0.7" }, _a)), exports.faceManager$ = faceManager$, exports.default = faceManager$;

/***/ }),
/* 183 */
/*!***********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/ATMBle/punchModePicker.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function punchModePicker$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.punchModePicker$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.ATMBle.punchModePicker";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.0.7" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.0.7" }, _a)), exports.punchModePicker$ = punchModePicker$, exports.default = punchModePicker$;

/***/ }),
/* 184 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/alipay/openAuth.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function openAuth$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.openAuth$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.alipay.openAuth";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.8" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.8" }, _a)), exports.openAuth$ = openAuth$, exports.default = openAuth$;

/***/ }),
/* 185 */
/*!***********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/alipay/pay.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function pay$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.pay$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.alipay.pay";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.pay$ = pay$, exports.default = pay$;

/***/ }),
/* 186 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/auth/requestAuthInfo.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function requestAuthInfo$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.requestAuthInfo$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.auth.requestAuthInfo";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.19" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.19" }, _a)), exports.requestAuthInfo$ = requestAuthInfo$, exports.default = requestAuthInfo$;

/***/ }),
/* 187 */
/*!************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/calendar/chooseDateTime.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function chooseDateTime$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.chooseDateTime$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.calendar.chooseDateTime";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.5.0", paramsDeal: apiHelper_1.addDefaultCorpIdParamsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.5.0", paramsDeal: apiHelper_1.addDefaultCorpIdParamsDeal }, _a)), exports.chooseDateTime$ = chooseDateTime$, exports.default = chooseDateTime$;

/***/ }),
/* 188 */
/*!******************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/lib/apiHelper.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.genBizStoreParamsDealFn = exports.genBoolResultDealFn = exports.forceChangeParamsDealFn = exports.genDefaultParamsDealFn = exports.addDefaultCorpIdParamsDeal = exports.addWatchParamsDeal = void 0;var addWatchParamsDeal = function addWatchParamsDeal(a) {var e = Object.assign({}, a);return e.watch = !0, e;};exports.addWatchParamsDeal = addWatchParamsDeal;var addDefaultCorpIdParamsDeal = function addDefaultCorpIdParamsDeal(a) {var e = Object.assign({}, a);return e.corpId = "corpId", e;};exports.addDefaultCorpIdParamsDeal = addDefaultCorpIdParamsDeal;var genDefaultParamsDealFn = function genDefaultParamsDealFn(a) {var e = Object.assign({}, a);return function (a) {return Object.assign({}, e, a);};};exports.genDefaultParamsDealFn = genDefaultParamsDealFn;var forceChangeParamsDealFn = function forceChangeParamsDealFn(a) {var e = Object.assign({}, a);return function (a) {return Object.assign(a, e);};};exports.forceChangeParamsDealFn = forceChangeParamsDealFn;var genBoolResultDealFn = function genBoolResultDealFn(a) {return function (e) {var r = Object.assign({}, e);return a.forEach(function (a) {void 0 !== r[a] && (r[a] = !!r[a]);}), r;};};exports.genBoolResultDealFn = genBoolResultDealFn;var genBizStoreParamsDealFn = function genBizStoreParamsDealFn(a) {var e = Object.assign({}, a);return "string" != typeof e.params ? (e.params = JSON.stringify(e), e) : e;};exports.genBizStoreParamsDealFn = genBizStoreParamsDealFn;

/***/ }),
/* 189 */
/*!***********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/calendar/chooseHalfDay.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function chooseHalfDay$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.chooseHalfDay$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.calendar.chooseHalfDay";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.5.0", paramsDeal: apiHelper_1.addDefaultCorpIdParamsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.5.0", paramsDeal: apiHelper_1.addDefaultCorpIdParamsDeal }, _a)), exports.chooseHalfDay$ = chooseHalfDay$, exports.default = chooseHalfDay$;

/***/ }),
/* 190 */
/*!************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/calendar/chooseInterval.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function chooseInterval$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.chooseInterval$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.calendar.chooseInterval";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.5.0", paramsDeal: apiHelper_1.addDefaultCorpIdParamsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.5.0", paramsDeal: apiHelper_1.addDefaultCorpIdParamsDeal }, _a)), exports.chooseInterval$ = chooseInterval$, exports.default = chooseInterval$;

/***/ }),
/* 191 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/calendar/chooseOneDay.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function chooseOneDay$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.chooseOneDay$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.calendar.chooseOneDay";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.5.0", paramsDeal: apiHelper_1.addDefaultCorpIdParamsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.5.0", paramsDeal: apiHelper_1.addDefaultCorpIdParamsDeal }, _a)), exports.chooseOneDay$ = chooseOneDay$, exports.default = chooseOneDay$;

/***/ }),
/* 192 */
/*!********************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/chat/chooseConversationByCorpId.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function chooseConversationByCorpId$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.chooseConversationByCorpId$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.chat.chooseConversationByCorpId",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ max: 50 });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.6.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.6.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.7.11", paramsDeal: paramsDeal }, _a)), exports.chooseConversationByCorpId$ = chooseConversationByCorpId$, exports.default = chooseConversationByCorpId$;

/***/ }),
/* 193 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/chat/collectSticker.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function collectSticker$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.collectSticker$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.chat.collectSticker";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.6.25" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.6.25" }, _a)), exports.collectSticker$ = collectSticker$, exports.default = collectSticker$;

/***/ }),
/* 194 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/chat/createSceneGroup.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function createSceneGroup$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.createSceneGroup$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.chat.createSceneGroup";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.7.17" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.7.17" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.7.17" }, _a)), exports.createSceneGroup$ = createSceneGroup$, exports.default = createSceneGroup$;

/***/ }),
/* 195 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/chat/getRealmCid.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getRealmCid$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getRealmCid$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.chat.getRealmCid";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.7.12" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.7.12" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.7.12" }, _a)), exports.getRealmCid$ = getRealmCid$, exports.default = getRealmCid$;

/***/ }),
/* 196 */
/*!*************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/chat/locationChatMessage.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function locationChatMessage$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.locationChatMessage$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.chat.locationChatMessage";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.7.6" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.7.6" }, _a)), exports.locationChatMessage$ = locationChatMessage$, exports.default = locationChatMessage$;

/***/ }),
/* 197 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/chat/openSingleChat.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function openSingleChat$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.openSingleChat$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.chat.openSingleChat";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.4.10" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.4.10" }, _a)), exports.openSingleChat$ = openSingleChat$, exports.default = openSingleChat$;

/***/ }),
/* 198 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/chat/pickConversation.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function pickConversation$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.pickConversation$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.chat.pickConversation";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.2" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.2" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.7.9" }, _a)), exports.pickConversation$ = pickConversation$, exports.default = pickConversation$;

/***/ }),
/* 199 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/chat/sendEmotion.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function sendEmotion$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.sendEmotion$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.chat.sendEmotion";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.6.12" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.6.12" }, _a)), exports.sendEmotion$ = sendEmotion$, exports.default = sendEmotion$;

/***/ }),
/* 200 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/chat/toConversation.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function toConversation$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.toConversation$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.chat.toConversation";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.6.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.6.0" }, _a)), exports.toConversation$ = toConversation$, exports.default = toConversation$;

/***/ }),
/* 201 */
/*!****************************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/chat/toConversationByOpenConversationId.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function toConversationByOpenConversationId$(o) {return ddSdk_1.ddSdk.invokeAPI(apiName, o);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.toConversationByOpenConversationId$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.chat.toConversationByOpenConversationId";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.30" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.30" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "5.1.33" }, _a)), exports.toConversationByOpenConversationId$ = toConversationByOpenConversationId$, exports.default = toConversationByOpenConversationId$;

/***/ }),
/* 202 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/clipboardData/setData.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function setData$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setData$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.clipboardData.setData";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.7.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.7.0" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.6.1" }, _a)), exports.setData$ = setData$, exports.default = setData$;

/***/ }),
/* 203 */
/*!***************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/conference/createCloudCall.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function createCloudCall$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.createCloudCall$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.conference.createCloudCall";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "6.0.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "6.0.0" }, _a)), exports.createCloudCall$ = createCloudCall$, exports.default = createCloudCall$;

/***/ }),
/* 204 */
/*!****************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/conference/getCloudCallInfo.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getCloudCallInfo$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getCloudCallInfo$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.conference.getCloudCallInfo";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "6.0.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "6.0.0" }, _a)), exports.getCloudCallInfo$ = getCloudCallInfo$, exports.default = getCloudCallInfo$;

/***/ }),
/* 205 */
/*!****************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/conference/getCloudCallList.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getCloudCallList$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getCloudCallList$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.conference.getCloudCallList";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "6.0.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "6.0.0" }, _a)), exports.getCloudCallList$ = getCloudCallList$, exports.default = getCloudCallList$;

/***/ }),
/* 206 */
/*!*************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/conference/videoConfCall.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function videoConfCall$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.videoConfCall$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.conference.videoConfCall";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.0.8" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.0.8" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "5.1.28" }, _a)), exports.videoConfCall$ = videoConfCall$, exports.default = videoConfCall$;

/***/ }),
/* 207 */
/*!***************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/contact/choose.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function choose$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.choose$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.contact.choose",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ multiple: !0, startWithDepartmentId: 0, users: [] });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.choose$ = choose$, exports.default = choose$;

/***/ }),
/* 208 */
/*!*****************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/contact/chooseMobileContacts.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function chooseMobileContacts$(o) {return ddSdk_1.ddSdk.invokeAPI(apiName, o);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.chooseMobileContacts$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.contact.chooseMobileContacts";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.1" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.1" }, _a)), exports.chooseMobileContacts$ = chooseMobileContacts$, exports.default = chooseMobileContacts$;

/***/ }),
/* 209 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/contact/complexPicker.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function complexPicker$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.complexPicker$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.contact.complexPicker";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.9.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.9.0" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.3.5" }, _a)), exports.complexPicker$ = complexPicker$, exports.default = complexPicker$;

/***/ }),
/* 210 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/contact/createGroup.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function createGroup$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.createGroup$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.contact.createGroup";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.6.1" }, _a)), exports.createGroup$ = createGroup$, exports.default = createGroup$;

/***/ }),
/* 211 */
/*!**************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/contact/departmentsPicker.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function departmentsPicker$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.departmentsPicker$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.contact.departmentsPicker";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.2.5" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.0" }, _a)), exports.departmentsPicker$ = departmentsPicker$, exports.default = departmentsPicker$;

/***/ }),
/* 212 */
/*!******************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/contact/externalComplexPicker.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function externalComplexPicker$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.externalComplexPicker$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.contact.externalComplexPicker";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.0" }, _a)), exports.externalComplexPicker$ = externalComplexPicker$, exports.default = externalComplexPicker$;

/***/ }),
/* 213 */
/*!*************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/contact/externalEditForm.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function externalEditForm$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.externalEditForm$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.contact.externalEditForm";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.0" }, _a)), exports.externalEditForm$ = externalEditForm$, exports.default = externalEditForm$;

/***/ }),
/* 214 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/contact/setRule.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function setRule$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setRule$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.contact.setRule";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.15" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.15" }, _a)), exports.setRule$ = setRule$, exports.default = setRule$;

/***/ }),
/* 215 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/cspace/chooseSpaceDir.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function chooseSpaceDir$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.chooseSpaceDir$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.cspace.chooseSpaceDir";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.5.6" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.5.6" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "5.1.27" }, _a)), exports.chooseSpaceDir$ = chooseSpaceDir$, exports.default = chooseSpaceDir$;

/***/ }),
/* 216 */
/*!**************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/cspace/delete.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function delete$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.delete$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.cspace.delete";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.5.21" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.5.21" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.5.21" }, _a)), exports.delete$ = delete$, exports.default = delete$;

/***/ }),
/* 217 */
/*!***************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/cspace/preview.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function preview$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.preview$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.cspace.preview";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.7.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.7.0" }, _a)), exports.preview$ = preview$, exports.default = preview$;

/***/ }),
/* 218 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/cspace/saveFile.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function saveFile$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.saveFile$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.cspace.saveFile";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.7.6" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.7.6" }, _a)), exports.saveFile$ = saveFile$, exports.default = saveFile$;

/***/ }),
/* 219 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/customContact/choose.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function choose$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.choose$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.customContact.choose",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ isShowCompanyName: !1, max: 50 });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.5.2", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.5.2", paramsDeal: paramsDeal }, _a)), exports.choose$ = choose$, exports.default = choose$;

/***/ }),
/* 220 */
/*!*****************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/customContact/multipleChoose.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function multipleChoose$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.multipleChoose$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.customContact.multipleChoose",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ isShowCompanyName: !1, max: 50 });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.multipleChoose$ = multipleChoose$, exports.default = multipleChoose$;

/***/ }),
/* 221 */
/*!************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/ding/create.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function create$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.create$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.ding.create";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.5.1", resultDeal: function resultDeal(e) {return "" === e ? e = { dingCreateResult: !1 } : "object" == typeof e && (e.dingCreateResult = !!e.dingCreateResult), e;} }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.5.1" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.5.9" }, _a)), exports.create$ = create$, exports.default = create$;

/***/ }),
/* 222 */
/*!**********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/ding/post.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function post$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.post$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.ding.post";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.post$ = post$, exports.default = post$;

/***/ }),
/* 223 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/event/notifyWeex.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function notifyWeex$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.notifyWeex$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.event.notifyWeex";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.5.0" }, _a)), exports.notifyWeex$ = notifyWeex$, exports.default = notifyWeex$;

/***/ }),
/* 224 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/intent/fetchData.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function fetchData$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.fetchData$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.intent.fetchData";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.7.6" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.7.6" }, _a)), exports.fetchData$ = fetchData$, exports.default = fetchData$;

/***/ }),
/* 225 */
/*!*********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/iot/bind.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function bind$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.bind$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.iot.bind";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.6.34" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.6.34" }, _a)), exports.bind$ = bind$, exports.default = bind$;

/***/ }),
/* 226 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/iot/bindMeetingRoom.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function bindMeetingRoom$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.bindMeetingRoom$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.iot.bindMeetingRoom";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.6.34" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.6.34" }, _a)), exports.bindMeetingRoom$ = bindMeetingRoom$, exports.default = bindMeetingRoom$;

/***/ }),
/* 227 */
/*!************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/iot/getDeviceProperties.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getDeviceProperties$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getDeviceProperties$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.iot.getDeviceProperties";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.6.42" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.6.42" }, _a)), exports.getDeviceProperties$ = getDeviceProperties$, exports.default = getDeviceProperties$;

/***/ }),
/* 228 */
/*!***********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/iot/invokeThingService.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function invokeThingService$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.invokeThingService$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.iot.invokeThingService";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.6.42" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.6.42" }, _a)), exports.invokeThingService$ = invokeThingService$, exports.default = invokeThingService$;

/***/ }),
/* 229 */
/*!*************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/iot/queryMeetingRoomList.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function queryMeetingRoomList$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.queryMeetingRoomList$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.iot.queryMeetingRoomList";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.6.34" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.6.34" }, _a)), exports.queryMeetingRoomList$ = queryMeetingRoomList$, exports.default = queryMeetingRoomList$;

/***/ }),
/* 230 */
/*!************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/iot/setDeviceProperties.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function setDeviceProperties$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setDeviceProperties$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.iot.setDeviceProperties";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.6.42" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.6.42" }, _a)), exports.setDeviceProperties$ = setDeviceProperties$, exports.default = setDeviceProperties$;

/***/ }),
/* 231 */
/*!***********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/iot/unbind.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function unbind$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.unbind$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.iot.unbind";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.6.34" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.6.34" }, _a)), exports.unbind$ = unbind$, exports.default = unbind$;

/***/ }),
/* 232 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/live/startClassRoom.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function startClassRoom$(s) {return ddSdk_1.ddSdk.invokeAPI(apiName, s);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.startClassRoom$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.live.startClassRoom";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "5.1.19" }, _a)), exports.startClassRoom$ = startClassRoom$, exports.default = startClassRoom$;

/***/ }),
/* 233 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/live/startUnifiedLive.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function startUnifiedLive$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.startUnifiedLive$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.live.startUnifiedLive";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "5.1.18" }, _a)), exports.startUnifiedLive$ = startUnifiedLive$, exports.default = startUnifiedLive$;

/***/ }),
/* 234 */
/*!***********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/map/locate.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function locate$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.locate$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.map.locate";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.locate$ = locate$, exports.default = locate$;

/***/ }),
/* 235 */
/*!***********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/map/search.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function search$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.search$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.map.search",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ scope: 500 });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.search$ = search$, exports.default = search$;

/***/ }),
/* 236 */
/*!*********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/map/view.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function view$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.view$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.map.view";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.view$ = view$, exports.default = view$;

/***/ }),
/* 237 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/media/compressVideo.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function compressVideo$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.compressVideo$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.media.compressVideo";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.6.37" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.6.37" }, _a)), exports.compressVideo$ = compressVideo$, exports.default = compressVideo$;

/***/ }),
/* 238 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/microApp/openApp.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function openApp$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.openApp$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.microApp.openApp";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.5.6" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.5.6" }, _a)), exports.openApp$ = openApp$, exports.default = openApp$;

/***/ }),
/* 239 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/navigation/close.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function close$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.close$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.navigation.close";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.3.5" }, _a)), exports.close$ = close$, exports.default = close$;

/***/ }),
/* 240 */
/*!******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/navigation/goBack.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function goBack$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.goBack$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.navigation.goBack";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.6.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.6.0" }, _a)), exports.goBack$ = goBack$, exports.default = goBack$;

/***/ }),
/* 241 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/navigation/hideBar.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function hideBar$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.hideBar$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.navigation.hideBar";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.5.6" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.5.6" }, _a)), exports.hideBar$ = hideBar$, exports.default = hideBar$;

/***/ }),
/* 242 */
/*!*********************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/navigation/navigateToMiniProgram.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function navigateToMiniProgram$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.navigateToMiniProgram$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.navigation.navigateToMiniProgram";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.31" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.31" }, _a)), exports.navigateToMiniProgram$ = navigateToMiniProgram$, exports.default = navigateToMiniProgram$;

/***/ }),
/* 243 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/navigation/quit.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function quit$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.quit$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.navigation.quit";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0" }, _a)), exports.quit$ = quit$, exports.default = quit$;

/***/ }),
/* 244 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/navigation/replace.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function replace$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.replace$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.navigation.replace";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.4.6" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.4.6" }, _a)), exports.replace$ = replace$, exports.default = replace$;

/***/ }),
/* 245 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/navigation/setIcon.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function setIcon$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setIcon$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.navigation.setIcon",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ watch: !0, showIcon: !0, iconIndex: 1 });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.setIcon$ = setIcon$, exports.default = setIcon$;

/***/ }),
/* 246 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/navigation/setLeft.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function setLeft$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setLeft$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.navigation.setLeft",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ watch: !0, show: !0, control: !1, showIcon: !0, text: "" });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.setLeft$ = setLeft$, exports.default = setLeft$;

/***/ }),
/* 247 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/navigation/setMenu.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function setMenu$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setMenu$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.navigation.setMenu";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.6.0", paramsDeal: apiHelper_1.addWatchParamsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.6.0", paramsDeal: apiHelper_1.addWatchParamsDeal }, _a)), exports.setMenu$ = setMenu$, exports.default = setMenu$;

/***/ }),
/* 248 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/navigation/setRight.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function setRight$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setRight$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.navigation.setRight",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ watch: !0, show: !0, control: !1, showIcon: !0, text: "" });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.setRight$ = setRight$, exports.default = setRight$;

/***/ }),
/* 249 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/navigation/setTitle.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function setTitle$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setTitle$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.navigation.setTitle";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.setTitle$ = setTitle$, exports.default = setTitle$;

/***/ }),
/* 250 */
/*!******************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/pbp/componentPunchFromPartner.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function componentPunchFromPartner$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.componentPunchFromPartner$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.pbp.componentPunchFromPartner";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.10" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.10" }, _a)), exports.componentPunchFromPartner$ = componentPunchFromPartner$, exports.default = componentPunchFromPartner$;

/***/ }),
/* 251 */
/*!******************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/pbp/startMatchRuleFromPartner.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function startMatchRuleFromPartner$(r) {return ddSdk_1.ddSdk.invokeAPI(apiName, r);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.startMatchRuleFromPartner$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.pbp.startMatchRuleFromPartner";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.10" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.10" }, _a)), exports.startMatchRuleFromPartner$ = startMatchRuleFromPartner$, exports.default = startMatchRuleFromPartner$;

/***/ }),
/* 252 */
/*!*****************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/pbp/stopMatchRuleFromPartner.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function stopMatchRuleFromPartner$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.stopMatchRuleFromPartner$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.pbp.stopMatchRuleFromPartner";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.10" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.10" }, _a)), exports.stopMatchRuleFromPartner$ = stopMatchRuleFromPartner$, exports.default = stopMatchRuleFromPartner$;

/***/ }),
/* 253 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/realm/subscribe.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function subscribe$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.subscribe$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.realm.subscribe";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.7.18" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.7.18" }, _a)), exports.subscribe$ = subscribe$, exports.default = subscribe$;

/***/ }),
/* 254 */
/*!******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/realm/unsubscribe.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function unsubscribe$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.unsubscribe$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.realm.unsubscribe";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.7.18" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.7.18" }, _a)), exports.unsubscribe$ = unsubscribe$, exports.default = unsubscribe$;

/***/ }),
/* 255 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/shortCut/addShortCut.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function addShortCut$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.addShortCut$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.shortCut.addShortCut";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.7.32" }, _a)), exports.addShortCut$ = addShortCut$, exports.default = addShortCut$;

/***/ }),
/* 256 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/store/closeUnpayOrder.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function closeUnpayOrder$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.closeUnpayOrder$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.store.closeUnpayOrder";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.3.7", paramsDeal: apiHelper_1.genBizStoreParamsDealFn }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.3.7", paramsDeal: apiHelper_1.genBizStoreParamsDealFn }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.5.3", paramsDeal: apiHelper_1.genBizStoreParamsDealFn }, _a)), exports.closeUnpayOrder$ = closeUnpayOrder$, exports.default = closeUnpayOrder$;

/***/ }),
/* 257 */
/*!******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/store/createOrder.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function createOrder$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.createOrder$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.store.createOrder";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.3.7", paramsDeal: apiHelper_1.genBizStoreParamsDealFn }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.3.7", paramsDeal: apiHelper_1.genBizStoreParamsDealFn }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.5.3", paramsDeal: apiHelper_1.genBizStoreParamsDealFn }, _a)), exports.createOrder$ = createOrder$, exports.default = createOrder$;

/***/ }),
/* 258 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/store/getPayUrl.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getPayUrl$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getPayUrl$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.store.getPayUrl";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.3.7", paramsDeal: apiHelper_1.genBizStoreParamsDealFn }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.3.7", paramsDeal: apiHelper_1.genBizStoreParamsDealFn }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.5.3", paramsDeal: apiHelper_1.genBizStoreParamsDealFn }, _a)), exports.getPayUrl$ = getPayUrl$, exports.default = getPayUrl$;

/***/ }),
/* 259 */
/*!**************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/store/inquiry.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function inquiry$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.inquiry$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.store.inquiry";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.3.7", paramsDeal: apiHelper_1.genBizStoreParamsDealFn }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.3.7", paramsDeal: apiHelper_1.genBizStoreParamsDealFn }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.5.3", paramsDeal: apiHelper_1.genBizStoreParamsDealFn }, _a)), exports.inquiry$ = inquiry$, exports.default = inquiry$;

/***/ }),
/* 260 */
/*!***************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/telephone/call.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function call$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.call$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.telephone.call";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.call$ = call$, exports.default = call$;

/***/ }),
/* 261 */
/*!***********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/telephone/checkBizCall.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function checkBizCall$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.checkBizCall$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.telephone.checkBizCall";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.5.6" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.5.6" }, _a)), exports.checkBizCall$ = checkBizCall$, exports.default = checkBizCall$;

/***/ }),
/* 262 */
/*!************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/telephone/quickCallList.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function quickCallList$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.quickCallList$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.telephone.quickCallList";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.5.6" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.5.6" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.5.6" }, _a)), exports.quickCallList$ = quickCallList$, exports.default = quickCallList$;

/***/ }),
/* 263 */
/*!***********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/telephone/showCallMenu.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function showCallMenu$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.showCallMenu$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.telephone.showCallMenu";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.showCallMenu$ = showCallMenu$, exports.default = showCallMenu$;

/***/ }),
/* 264 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/user/checkPassword.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function checkPassword$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.checkPassword$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.user.checkPassword";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.5.8" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.5.8" }, _a)), exports.checkPassword$ = checkPassword$, exports.default = checkPassword$;

/***/ }),
/* 265 */
/*!*********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/user/get.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function get$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.get$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.user.get";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.get$ = get$, exports.default = get$;

/***/ }),
/* 266 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/chooseImage.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function chooseImage$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.chooseImage$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.chooseImage";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.1" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.1" }, _a)), exports.chooseImage$ = chooseImage$, exports.default = chooseImage$;

/***/ }),
/* 267 */
/*!************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/chosen.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function chosen$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.chosen$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.chosen";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.chosen$ = chosen$, exports.default = chosen$;

/***/ }),
/* 268 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/datepicker.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function datepicker$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.datepicker$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.datepicker";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.datepicker$ = datepicker$, exports.default = datepicker$;

/***/ }),
/* 269 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/datetimepicker.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function datetimepicker$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.datetimepicker$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.datetimepicker";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.datetimepicker$ = datetimepicker$, exports.default = datetimepicker$;

/***/ }),
/* 270 */
/*!*************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/decrypt.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function decrypt$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.decrypt$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.decrypt";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.9.1" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.9.1" }, _a)), exports.decrypt$ = decrypt$, exports.default = decrypt$;

/***/ }),
/* 271 */
/*!******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/downloadFile.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function downloadFile$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.downloadFile$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.downloadFile";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0" }, _a)), exports.downloadFile$ = downloadFile$, exports.default = downloadFile$;

/***/ }),
/* 272 */
/*!*************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/encrypt.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function encrypt$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.encrypt$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.encrypt";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.9.1" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.9.1" }, _a)), exports.encrypt$ = encrypt$, exports.default = encrypt$;

/***/ }),
/* 273 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/getPerfInfo.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getPerfInfo$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getPerfInfo$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.getPerfInfo";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.14" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.14" }, _a)), exports.getPerfInfo$ = getPerfInfo$, exports.default = getPerfInfo$;

/***/ }),
/* 274 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/isLocalFileExist.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function isLocalFileExist$(i) {return ddSdk_1.ddSdk.invokeAPI(apiName, i);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.isLocalFileExist$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.isLocalFileExist";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0" }, _a)), exports.isLocalFileExist$ = isLocalFileExist$, exports.default = isLocalFileExist$;

/***/ }),
/* 275 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/multiSelect.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function multiSelect$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.multiSelect$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.multiSelect";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.0.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.0.0" }, _a)), exports.multiSelect$ = multiSelect$, exports.default = multiSelect$;

/***/ }),
/* 276 */
/*!**********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/open.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function open$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.open$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.open";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.7.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.open$ = open$, exports.default = open$;

/***/ }),
/* 277 */
/*!**************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/openLink.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function openLink$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.openLink$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.util.openLink",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ credible: !0, showMenuBar: !0 });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.7.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.openLink$ = openLink$, exports.default = openLink$;

/***/ }),
/* 278 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/openLocalFile.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function openLocalFile$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.openLocalFile$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.openLocalFile";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0" }, _a)), exports.openLocalFile$ = openLocalFile$, exports.default = openLocalFile$;

/***/ }),
/* 279 */
/*!***************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/openModal.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function openModal$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.openModal$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.openModal";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0" }, _a)), exports.openModal$ = openModal$, exports.default = openModal$;

/***/ }),
/* 280 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/openSlidePanel.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function openSlidePanel$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.openSlidePanel$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.openSlidePanel";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0" }, _a)), exports.openSlidePanel$ = openSlidePanel$, exports.default = openSlidePanel$;

/***/ }),
/* 281 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/presentWindow.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function presentWindow$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.presentWindow$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.presentWindow";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.presentWindow$ = presentWindow$, exports.default = presentWindow$;

/***/ }),
/* 282 */
/*!******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/previewImage.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function previewImage$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.previewImage$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.previewImage";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.7.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.previewImage$ = previewImage$, exports.default = previewImage$;

/***/ }),
/* 283 */
/*!******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/previewVideo.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function previewVideo$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.previewVideo$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.previewVideo";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.3.7" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.3.7" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.6.33" }, _a)), exports.previewVideo$ = previewVideo$, exports.default = previewVideo$;

/***/ }),
/* 284 */
/*!***************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/saveImage.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function saveImage$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.saveImage$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.saveImage";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.1" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.1" }, _a)), exports.saveImage$ = saveImage$, exports.default = saveImage$;

/***/ }),
/* 285 */
/*!**********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/scan.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function scan$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.scan$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.util.scan",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ type: "qrCode" });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.scan$ = scan$, exports.default = scan$;

/***/ }),
/* 286 */
/*!**************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/scanCard.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function scanCard$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.scanCard$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.scanCard";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.scanCard$ = scanCard$, exports.default = scanCard$;

/***/ }),
/* 287 */
/*!**********************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/setScreenBrightnessAndKeepOn.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function setScreenBrightnessAndKeepOn$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setScreenBrightnessAndKeepOn$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.setScreenBrightnessAndKeepOn";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.6.37" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.3.3" }, _a)), exports.setScreenBrightnessAndKeepOn$ = setScreenBrightnessAndKeepOn$, exports.default = setScreenBrightnessAndKeepOn$;

/***/ }),
/* 288 */
/*!***********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/share.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function share$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.share$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.util.share",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ title: "", buttonName: "确定" });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.6.37", paramsDeal: paramsDeal }, _a)), exports.share$ = share$, exports.default = share$;

/***/ }),
/* 289 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/shareImage.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function shareImage$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.shareImage$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.shareImage";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.1" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.1" }, _a)), exports.shareImage$ = shareImage$, exports.default = shareImage$;

/***/ }),
/* 290 */
/*!******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/startDocSign.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function startDocSign$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.startDocSign$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.startDocSign";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.6.33" }, _a)), exports.startDocSign$ = startDocSign$, exports.default = startDocSign$;

/***/ }),
/* 291 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/systemShare.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function systemShare$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.systemShare$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.systemShare";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.5.11" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.5.11" }, _a)), exports.systemShare$ = systemShare$, exports.default = systemShare$;

/***/ }),
/* 292 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/timepicker.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function timepicker$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.timepicker$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.timepicker";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.timepicker$ = timepicker$, exports.default = timepicker$;

/***/ }),
/* 293 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/uploadAttachment.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function uploadAttachment$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.uploadAttachment$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.uploadAttachment";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.7.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.7.0" }, _a)), exports.uploadAttachment$ = uploadAttachment$, exports.default = uploadAttachment$;

/***/ }),
/* 294 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/uploadImage.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function uploadImage$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.uploadImage$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "biz.util.uploadImage",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ multiple: !1 });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.uploadImage$ = uploadImage$, exports.default = uploadImage$;

/***/ }),
/* 295 */
/*!***************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/uploadImageFromCamera.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function uploadImageFromCamera$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.uploadImageFromCamera$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.uploadImageFromCamera";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.uploadImageFromCamera$ = uploadImageFromCamera$, exports.default = uploadImageFromCamera$;

/***/ }),
/* 296 */
/*!********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/util/ut.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function ut$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.ut$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.util.ut",utParamsObj2Str = function utParamsObj2Str(a) {var e = Object.assign({}, a),t = e.value,d = [];if (t && "object" == typeof t) {for (var r in t) {void 0 !== t[r] && d.push(r + "=" + t[r]);}t = d.join(",");}return e.value = t || "", e;};ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.5.0", paramsDeal: utParamsObj2Str }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: function paramsDeal(a) {var e = Object.assign({}, a),t = e.value;return t && "object" == typeof t && (t = JSON.stringify(t)), e.value = t, e;} }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: utParamsObj2Str }, _a)), exports.ut$ = ut$, exports.default = ut$;

/***/ }),
/* 297 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/verify/openBindIDCard.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function openBindIDCard$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.openBindIDCard$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.verify.openBindIDCard";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.5.21" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.5.21" }, _a)), exports.openBindIDCard$ = openBindIDCard$, exports.default = openBindIDCard$;

/***/ }),
/* 298 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/biz/verify/startAuth.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function startAuth$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.startAuth$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "biz.verify.startAuth";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.5.21" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.5.21" }, _a)), exports.startAuth$ = startAuth$, exports.default = startAuth$;

/***/ }),
/* 299 */
/*!*******************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/channel/permission/requestAuthCode.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function requestAuthCode$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.requestAuthCode$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "channel.permission.requestAuthCode";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.0.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.0.0" }, _a)), exports.requestAuthCode$ = requestAuthCode$, exports.default = requestAuthCode$;

/***/ }),
/* 300 */
/*!****************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/accelerometer/clearShake.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function clearShake$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.clearShake$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.accelerometer.clearShake";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.clearShake$ = clearShake$, exports.default = clearShake$;

/***/ }),
/* 301 */
/*!****************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/accelerometer/watchShake.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function watchShake$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.watchShake$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "device.accelerometer.watchShake";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: function paramsDeal(a) {return apiHelper_1.forceChangeParamsDealFn({ sensitivity: 3.2 })(apiHelper_1.addWatchParamsDeal(a));} }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: apiHelper_1.addWatchParamsDeal }, _a)), exports.watchShake$ = watchShake$, exports.default = watchShake$;

/***/ }),
/* 302 */
/*!******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/audio/download.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function download$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.download$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.audio.download";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.download$ = download$, exports.default = download$;

/***/ }),
/* 303 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/audio/onPlayEnd.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function onPlayEnd$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.onPlayEnd$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.audio.onPlayEnd";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.onPlayEnd$ = onPlayEnd$, exports.default = onPlayEnd$;

/***/ }),
/* 304 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/audio/onRecordEnd.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function onRecordEnd$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.onRecordEnd$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.audio.onRecordEnd";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.onRecordEnd$ = onRecordEnd$, exports.default = onRecordEnd$;

/***/ }),
/* 305 */
/*!***************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/audio/pause.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function pause$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.pause$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.audio.pause";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.pause$ = pause$, exports.default = pause$;

/***/ }),
/* 306 */
/*!**************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/audio/play.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function play$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.play$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.audio.play";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.play$ = play$, exports.default = play$;

/***/ }),
/* 307 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/audio/resume.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function resume$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.resume$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.audio.resume";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.resume$ = resume$, exports.default = resume$;

/***/ }),
/* 308 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/audio/startRecord.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function startRecord$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.startRecord$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.audio.startRecord";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.startRecord$ = startRecord$, exports.default = startRecord$;

/***/ }),
/* 309 */
/*!**************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/audio/stop.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function stop$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.stop$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.audio.stop";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.stop$ = stop$, exports.default = stop$;

/***/ }),
/* 310 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/audio/stopRecord.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function stopRecord$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.stopRecord$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.audio.stopRecord";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.stopRecord$ = stopRecord$, exports.default = stopRecord$;

/***/ }),
/* 311 */
/*!************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/audio/translateVoice.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function translateVoice$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.translateVoice$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.audio.translateVoice";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.8.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.8.0" }, _a)), exports.translateVoice$ = translateVoice$, exports.default = translateVoice$;

/***/ }),
/* 312 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/base/getInterface.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getInterface$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getInterface$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.base.getInterface";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.getInterface$ = getInterface$, exports.default = getInterface$;

/***/ }),
/* 313 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/base/getPhoneInfo.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getPhoneInfo$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getPhoneInfo$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.base.getPhoneInfo";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.5.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.5.0" }, _a)), exports.getPhoneInfo$ = getPhoneInfo$, exports.default = getPhoneInfo$;

/***/ }),
/* 314 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/base/getUUID.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getUUID$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getUUID$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.base.getUUID";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.7.6" }, _a)), exports.getUUID$ = getUUID$, exports.default = getUUID$;

/***/ }),
/* 315 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/base/getWifiStatus.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getWifiStatus$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getWifiStatus$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.base.getWifiStatus";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.11.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.11.0" }, _a)), exports.getWifiStatus$ = getWifiStatus$, exports.default = getWifiStatus$;

/***/ }),
/* 316 */
/*!*****************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/connection/getNetworkType.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getNetworkType$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getNetworkType$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.connection.getNetworkType";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.getNetworkType$ = getNetworkType$, exports.default = getNetworkType$;

/***/ }),
/* 317 */
/*!*******************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/geolocation/checkPermission.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function checkPermission$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.checkPermission$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.geolocation.checkPermission";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.5.0" }, _a)), exports.checkPermission$ = checkPermission$, exports.default = checkPermission$;

/***/ }),
/* 318 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/geolocation/get.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function get$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.get$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.geolocation.get";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.get$ = get$, exports.default = get$;

/***/ }),
/* 319 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/geolocation/start.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function start$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.start$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.geolocation.start";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.4.7" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.4.7" }, _a)), exports.start$ = start$, exports.default = start$;

/***/ }),
/* 320 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/geolocation/status.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function status$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.status$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.geolocation.status";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.4.8" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.4.8" }, _a)), exports.status$ = status$, exports.default = status$;

/***/ }),
/* 321 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/geolocation/stop.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function stop$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.stop$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.geolocation.stop";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.4.7" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.4.7" }, _a)), exports.stop$ = stop$, exports.default = stop$;

/***/ }),
/* 322 */
/*!*******************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/launcher/checkInstalledApps.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function checkInstalledApps$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.checkInstalledApps$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.launcher.checkInstalledApps";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.checkInstalledApps$ = checkInstalledApps$, exports.default = checkInstalledApps$;

/***/ }),
/* 323 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/launcher/launchApp.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function launchApp$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.launchApp$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.launcher.launchApp";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.launchApp$ = launchApp$, exports.default = launchApp$;

/***/ }),
/* 324 */
/*!***************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/nfc/nfcRead.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function nfcRead$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.nfcRead$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.nfc.nfcRead";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.11.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.11.0" }, _a)), exports.nfcRead$ = nfcRead$, exports.default = nfcRead$;

/***/ }),
/* 325 */
/*!***************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/nfc/nfcStop.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function nfcStop$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.nfcStop$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.nfc.nfcStop";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.3.9" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.3.9" }, _a)), exports.nfcStop$ = nfcStop$, exports.default = nfcStop$;

/***/ }),
/* 326 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/nfc/nfcWrite.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function nfcWrite$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.nfcWrite$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.nfc.nfcWrite";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.11.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.11.0" }, _a)), exports.nfcWrite$ = nfcWrite$, exports.default = nfcWrite$;

/***/ }),
/* 327 */
/*!****************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/notification/actionSheet.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function actionSheet$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.actionSheet$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.notification.actionSheet";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.actionSheet$ = actionSheet$, exports.default = actionSheet$;

/***/ }),
/* 328 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/notification/alert.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function alert$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.alert$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "device.notification.alert",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ title: "", buttonName: "确定" });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.alert$ = alert$, exports.default = alert$;

/***/ }),
/* 329 */
/*!************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/notification/confirm.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function confirm$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.confirm$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "device.notification.confirm",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ title: "", buttonLabels: ["确定", "取消"] });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.confirm$ = confirm$, exports.default = confirm$;

/***/ }),
/* 330 */
/*!****************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/notification/extendModal.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function extendModal$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.extendModal$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.notification.extendModal";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.5.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.5.0" }, _a)), exports.extendModal$ = extendModal$, exports.default = extendModal$;

/***/ }),
/* 331 */
/*!******************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/notification/hidePreloader.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function hidePreloader$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.hidePreloader$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.notification.hidePreloader";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.hidePreloader$ = hidePreloader$, exports.default = hidePreloader$;

/***/ }),
/* 332 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/notification/modal.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function modal$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.modal$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.notification.modal";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.2.5" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.modal$ = modal$, exports.default = modal$;

/***/ }),
/* 333 */
/*!***********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/notification/prompt.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function prompt$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.prompt$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "device.notification.prompt",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ title: "", buttonLabels: ["确定", "取消"] });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.7.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.prompt$ = prompt$, exports.default = prompt$;

/***/ }),
/* 334 */
/*!******************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/notification/showPreloader.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function showPreloader$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.showPreloader$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "device.notification.showPreloader",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ text: "加载中...", showIcon: !0 });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.showPreloader$ = showPreloader$, exports.default = showPreloader$;

/***/ }),
/* 335 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/notification/toast.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function toast$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.toast$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "device.notification.toast",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ text: "toast", duration: 3, delay: 0 });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "2.5.0", paramsDeal: function paramsDeal(a) {return a.icon && !a.type && ("success" === a.icon ? a.type = "success" : "error" === a.icon && (a.type = "error")), a;} }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.toast$ = toast$, exports.default = toast$;

/***/ }),
/* 336 */
/*!************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/notification/vibrate.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function vibrate$(a) {return ddSdk_1.ddSdk.invokeAPI(apiName, a);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.vibrate$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "device.notification.vibrate",paramsDeal = apiHelper_1.genDefaultParamsDealFn({ duration: 300 });ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: paramsDeal }, _a)), exports.vibrate$ = vibrate$, exports.default = vibrate$;

/***/ }),
/* 337 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/screen/insetAdjust.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function insetAdjust$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.insetAdjust$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.screen.insetAdjust";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.6.18" }, _a)), exports.insetAdjust$ = insetAdjust$, exports.default = insetAdjust$;

/***/ }),
/* 338 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/screen/resetView.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function resetView$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.resetView$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.screen.resetView";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.0.0" }, _a)), exports.resetView$ = resetView$, exports.default = resetView$;

/***/ }),
/* 339 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/device/screen/rotateView.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function rotateView$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.rotateView$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "device.screen.rotateView";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.0.0" }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "4.0.0" }, _a)), exports.rotateView$ = rotateView$, exports.default = rotateView$;

/***/ }),
/* 340 */
/*!**************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/media/voiceRecorder/keepAlive.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function keepAlive$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.keepAlive$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "media.voiceRecorder.keepAlive";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.12" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.12" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "5.1.12" }, _a)), exports.keepAlive$ = keepAlive$, exports.default = keepAlive$;

/***/ }),
/* 341 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/media/voiceRecorder/pause.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function pause$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.pause$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "media.voiceRecorder.pause";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.12" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.12" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "5.1.12" }, _a)), exports.pause$ = pause$, exports.default = pause$;

/***/ }),
/* 342 */
/*!***********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/media/voiceRecorder/resume.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function resume$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.resume$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "media.voiceRecorder.resume";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.12" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.12" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "5.1.12" }, _a)), exports.resume$ = resume$, exports.default = resume$;

/***/ }),
/* 343 */
/*!**********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/media/voiceRecorder/start.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function start$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.start$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "media.voiceRecorder.start";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.12" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.12" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "5.1.12" }, _a)), exports.start$ = start$, exports.default = start$;

/***/ }),
/* 344 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/media/voiceRecorder/stop.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function stop$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.stop$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "media.voiceRecorder.stop";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "5.1.12" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "5.1.12" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "5.1.12" }, _a)), exports.stop$ = stop$, exports.default = stop$;

/***/ }),
/* 345 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/net/bjGovApn/loginGovNet.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function loginGovNet$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.loginGovNet$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "net.bjGovApn.loginGovNet";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.android] = { vs: "4.5.16" }, _a)), exports.loginGovNet$ = loginGovNet$, exports.default = loginGovNet$;

/***/ }),
/* 346 */
/*!******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/runtime/message/fetch.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function fetch$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.fetch$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "runtime.message.fetch";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.6.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.6.0" }, _a)), exports.fetch$ = fetch$, exports.default = fetch$;

/***/ }),
/* 347 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/runtime/message/post.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function post$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.post$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "runtime.message.post";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.6.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.6.0" }, _a)), exports.post$ = post$, exports.default = post$;

/***/ }),
/* 348 */
/*!*******************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/runtime/permission/requestAuthCode.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function requestAuthCode$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.requestAuthCode$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "runtime.permission.requestAuthCode",paramsDeal = function paramsDeal(e) {return Object.assign(e, { url: location.href.split("#")[0] });};ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.0.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.requestAuthCode$ = requestAuthCode$, exports.default = requestAuthCode$;

/***/ }),
/* 349 */
/*!**************************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/runtime/permission/requestOperateAuthCode.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function requestOperateAuthCode$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.requestOperateAuthCode$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "runtime.permission.requestOperateAuthCode",paramsDeal = function paramsDeal(e) {return Object.assign(e, { url: location.href.split("#")[0] });};ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "3.3.0", paramsDeal: paramsDeal }, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "3.3.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "3.3.0" }, _a)), exports.requestOperateAuthCode$ = requestOperateAuthCode$, exports.default = requestOperateAuthCode$;

/***/ }),
/* 350 */
/*!***********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/ui/input/plain.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function plain$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.plain$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "ui.input.plain";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.plain$ = plain$, exports.default = plain$;

/***/ }),
/* 351 */
/*!*********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/ui/nav/close.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function close$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.close$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "ui.nav.close";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.6.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.6.0" }, _a)), exports.close$ = close$, exports.default = close$;

/***/ }),
/* 352 */
/*!****************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/ui/nav/getCurrentId.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getCurrentId$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getCurrentId$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "ui.nav.getCurrentId";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.6.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.6.0" }, _a)), exports.getCurrentId$ = getCurrentId$, exports.default = getCurrentId$;

/***/ }),
/* 353 */
/*!******************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/ui/nav/go.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function go$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.go$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "ui.nav.go";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.6.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.6.0" }, _a)), exports.go$ = go$, exports.default = go$;

/***/ }),
/* 354 */
/*!***********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/ui/nav/preload.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function preload$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.preload$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "ui.nav.preload";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.6.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.6.0" }, _a)), exports.preload$ = preload$, exports.default = preload$;

/***/ }),
/* 355 */
/*!***********************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/ui/nav/recycle.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function recycle$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.recycle$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "ui.nav.recycle";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.6.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.6.0" }, _a)), exports.recycle$ = recycle$, exports.default = recycle$;

/***/ }),
/* 356 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/ui/progressBar/setColors.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function setColors$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setColors$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "ui.progressBar.setColors";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.setColors$ = setColors$, exports.default = setColors$;

/***/ }),
/* 357 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/ui/pullToRefresh/disable.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function disable$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.disable$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "ui.pullToRefresh.disable";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.disable$ = disable$, exports.default = disable$;

/***/ }),
/* 358 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/ui/pullToRefresh/enable.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function enable$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.enable$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiHelper_1 = __webpack_require__(/*! ../../../lib/apiHelper */ 188),apiName = "ui.pullToRefresh.enable";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0", paramsDeal: apiHelper_1.addWatchParamsDeal }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0", paramsDeal: apiHelper_1.addWatchParamsDeal }, _a)), exports.enable$ = enable$, exports.default = enable$;

/***/ }),
/* 359 */
/*!******************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/ui/pullToRefresh/stop.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function stop$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.stop$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "ui.pullToRefresh.stop";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.stop$ = stop$, exports.default = stop$;

/***/ }),
/* 360 */
/*!*********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/ui/webViewBounce/disable.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function disable$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.disable$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "ui.webViewBounce.disable";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.disable$ = disable$, exports.default = disable$;

/***/ }),
/* 361 */
/*!********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/ui/webViewBounce/enable.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function enable$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.enable$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "ui.webViewBounce.enable";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.4.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.4.0" }, _a)), exports.enable$ = enable$, exports.default = enable$;

/***/ }),
/* 362 */
/*!***********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/util/domainStorage/getItem.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function getItem$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.getItem$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "util.domainStorage.getItem";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.9.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.9.0" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.6.29" }, _a)), exports.getItem$ = getItem$, exports.default = getItem$;

/***/ }),
/* 363 */
/*!**************************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/util/domainStorage/removeItem.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function removeItem$(e) {return ddSdk_1.ddSdk.invokeAPI(apiName, e);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.removeItem$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "util.domainStorage.removeItem";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.9.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.9.0" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.6.29" }, _a)), exports.removeItem$ = removeItem$, exports.default = removeItem$;

/***/ }),
/* 364 */
/*!***********************************************************************************************************!*\
  !*** C:/Users/黄凤玲/Desktop/uni-app/workhelp/node_modules/dingtalk-jsapi/api/util/domainStorage/setItem.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function setItem$(d) {return ddSdk_1.ddSdk.invokeAPI(apiName, d);}var _a;Object.defineProperty(exports, "__esModule", { value: !0 }), exports.setItem$ = void 0;var ddSdk_1 = __webpack_require__(/*! ../../../lib/ddSdk */ 149),apiName = "util.domainStorage.setItem";ddSdk_1.ddSdk.setAPI(apiName, (_a = {}, _a[ddSdk_1.ENV_ENUM.ios] = { vs: "2.9.0" }, _a[ddSdk_1.ENV_ENUM.android] = { vs: "2.9.0" }, _a[ddSdk_1.ENV_ENUM.pc] = { vs: "4.6.9" }, _a)), exports.setItem$ = setItem$, exports.default = setItem$;

/***/ })
]]);