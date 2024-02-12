var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// ../../shallowequal/index.js
var require_shallowequal = __commonJS({
  "../../shallowequal/index.js"(exports, module) {
    module.exports = function shallowEqual2(objA, objB, compare, compareContext) {
      var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
      if (ret !== void 0) {
        return !!ret;
      }
      if (objA === objB) {
        return true;
      }
      if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
        return false;
      }
      var keysA = Object.keys(objA);
      var keysB = Object.keys(objB);
      if (keysA.length !== keysB.length) {
        return false;
      }
      var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
      for (var idx = 0; idx < keysA.length; idx++) {
        var key = keysA[idx];
        if (!bHasOwnProperty(key)) {
          return false;
        }
        var valueA = objA[key];
        var valueB = objB[key];
        ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
        if (ret === false || ret === void 0 && valueA !== valueB) {
          return false;
        }
      }
      return true;
    };
  }
});

// ../../invariant/browser.js
var require_browser = __commonJS({
  "../../invariant/browser.js"(exports, module) {
    "use strict";
    var invariant2 = function(condition, format, a, b, c, d, e, f) {
      if (true) {
        if (format === void 0) {
          throw new Error("invariant requires an error message argument");
        }
      }
      if (!condition) {
        var error;
        if (format === void 0) {
          error = new Error(
            "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
          );
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(
            format.replace(/%s/g, function() {
              return args[argIndex++];
            })
          );
          error.name = "Invariant Violation";
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    module.exports = invariant2;
  }
});

// ../../events/events.js
var require_events = __commonJS({
  "../../events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter2() {
      EventEmitter2.init.call(this);
    }
    module.exports = EventEmitter2;
    module.exports.once = once2;
    EventEmitter2.EventEmitter = EventEmitter2;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._eventsCount = 0;
    EventEmitter2.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter2.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter2.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter2.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
      var doError = type === "error";
      var events2 = this._events;
      if (events2 !== void 0)
        doError = doError && events2.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events2[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events2;
      var existing;
      checkListener(listener);
      events2 = target._events;
      if (events2 === void 0) {
        events2 = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events2.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events2 = target._events;
        }
        existing = events2[type];
      }
      if (existing === void 0) {
        existing = events2[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events2[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter2.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter2.prototype.once = function once3(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
      var list, events2, position, i, originalListener;
      checkListener(listener);
      events2 = this._events;
      if (events2 === void 0)
        return this;
      list = events2[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events2[type];
          if (events2.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events2[type] = list[0];
        if (events2.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events2, i;
      events2 = this._events;
      if (events2 === void 0)
        return this;
      if (events2.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events2[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events2[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events2);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events2[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events2 = target._events;
      if (events2 === void 0)
        return [];
      var evlistener = events2[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter2.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter2.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter2.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter2.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events2 = this._events;
      if (events2 !== void 0) {
        var evlistener = events2[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once2(emitter, name) {
      return new Promise(function(resolve2, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve2([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// dist/index.js
var import_shallowequal = __toESM(require_shallowequal(), 1);
var import_invariant = __toESM(require_browser(), 1);
var import_events = __toESM(require_events(), 1);
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
var curry_exports = {};
__export(curry_exports, {
  _1: () => _1,
  _2: () => _2,
  _3: () => _3,
  _4: () => _4,
  _5: () => _5,
  _6: () => _6,
  _7: () => _7,
  _8: () => _8,
  __1: () => __1,
  __2: () => __2,
  __3: () => __3,
  __4: () => __4,
  __5: () => __5,
  __6: () => __6,
  __7: () => __7,
  __8: () => __8,
  app: () => app
});
function sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while (j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }
  ;
  return result;
}
function app(_f, _args) {
  while (true) {
    var args = _args;
    var f = _f;
    var init_arity = f.length;
    var arity = init_arity === 0 ? 1 : init_arity;
    var len = args.length;
    var d = arity - len | 0;
    if (d === 0) {
      return f.apply(null, args);
    }
    if (d >= 0) {
      return /* @__PURE__ */ function(f2, args2) {
        return function(x) {
          return app(f2, args2.concat([x]));
        };
      }(f, args);
    }
    _args = sub(args, arity, -d | 0);
    _f = f.apply(null, sub(args, 0, arity));
    continue;
  }
  ;
}
function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    switch (arity) {
      case 1:
        return o(a0);
      case 2:
        return function(param) {
          return o(a0, param);
        };
      case 3:
        return function(param, param$1) {
          return o(a0, param, param$1);
        };
      case 4:
        return function(param, param$1, param$2) {
          return o(a0, param, param$1, param$2);
        };
      case 5:
        return function(param, param$1, param$2, param$3) {
          return o(a0, param, param$1, param$2, param$3);
        };
      case 6:
        return function(param, param$1, param$2, param$3, param$4) {
          return o(a0, param, param$1, param$2, param$3, param$4);
        };
      case 7:
        return function(param, param$1, param$2, param$3, param$4, param$5) {
          return o(a0, param, param$1, param$2, param$3, param$4, param$5);
        };
      default:
        return app(o, [a0]);
    }
  }
}
function __1(o) {
  var arity = o.length;
  if (arity === 1) {
    return o;
  } else {
    return function(a0) {
      return _1(o, a0);
    };
  }
}
function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [a1]);
      case 2:
        return o(a0, a1);
      case 3:
        return function(param) {
          return o(a0, a1, param);
        };
      case 4:
        return function(param, param$1) {
          return o(a0, a1, param, param$1);
        };
      case 5:
        return function(param, param$1, param$2) {
          return o(a0, a1, param, param$1, param$2);
        };
      case 6:
        return function(param, param$1, param$2, param$3) {
          return o(a0, a1, param, param$1, param$2, param$3);
        };
      case 7:
        return function(param, param$1, param$2, param$3, param$4) {
          return o(a0, a1, param, param$1, param$2, param$3, param$4);
        };
      default:
        return app(o, [
          a0,
          a1
        ]);
    }
  }
}
function __2(o) {
  var arity = o.length;
  if (arity === 2) {
    return o;
  } else {
    return function(a0, a1) {
      return _2(o, a0, a1);
    };
  }
}
function _3(o, a0, a1, a2) {
  var arity = o.length;
  if (arity === 3) {
    return o(a0, a1, a2);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [
          a1,
          a2
        ]);
      case 2:
        return app(o(a0, a1), [a2]);
      case 3:
        return o(a0, a1, a2);
      case 4:
        return function(param) {
          return o(a0, a1, a2, param);
        };
      case 5:
        return function(param, param$1) {
          return o(a0, a1, a2, param, param$1);
        };
      case 6:
        return function(param, param$1, param$2) {
          return o(a0, a1, a2, param, param$1, param$2);
        };
      case 7:
        return function(param, param$1, param$2, param$3) {
          return o(a0, a1, a2, param, param$1, param$2, param$3);
        };
      default:
        return app(o, [
          a0,
          a1,
          a2
        ]);
    }
  }
}
function __3(o) {
  var arity = o.length;
  if (arity === 3) {
    return o;
  } else {
    return function(a0, a1, a2) {
      return _3(o, a0, a1, a2);
    };
  }
}
function _4(o, a0, a1, a2, a3) {
  var arity = o.length;
  if (arity === 4) {
    return o(a0, a1, a2, a3);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [
          a1,
          a2,
          a3
        ]);
      case 2:
        return app(o(a0, a1), [
          a2,
          a3
        ]);
      case 3:
        return app(o(a0, a1, a2), [a3]);
      case 4:
        return o(a0, a1, a2, a3);
      case 5:
        return function(param) {
          return o(a0, a1, a2, a3, param);
        };
      case 6:
        return function(param, param$1) {
          return o(a0, a1, a2, a3, param, param$1);
        };
      case 7:
        return function(param, param$1, param$2) {
          return o(a0, a1, a2, a3, param, param$1, param$2);
        };
      default:
        return app(o, [
          a0,
          a1,
          a2,
          a3
        ]);
    }
  }
}
function __4(o) {
  var arity = o.length;
  if (arity === 4) {
    return o;
  } else {
    return function(a0, a1, a2, a3) {
      return _4(o, a0, a1, a2, a3);
    };
  }
}
function _5(o, a0, a1, a2, a3, a4) {
  var arity = o.length;
  if (arity === 5) {
    return o(a0, a1, a2, a3, a4);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [
          a1,
          a2,
          a3,
          a4
        ]);
      case 2:
        return app(o(a0, a1), [
          a2,
          a3,
          a4
        ]);
      case 3:
        return app(o(a0, a1, a2), [
          a3,
          a4
        ]);
      case 4:
        return app(o(a0, a1, a2, a3), [a4]);
      case 5:
        return o(a0, a1, a2, a3, a4);
      case 6:
        return function(param) {
          return o(a0, a1, a2, a3, a4, param);
        };
      case 7:
        return function(param, param$1) {
          return o(a0, a1, a2, a3, a4, param, param$1);
        };
      default:
        return app(o, [
          a0,
          a1,
          a2,
          a3,
          a4
        ]);
    }
  }
}
function __5(o) {
  var arity = o.length;
  if (arity === 5) {
    return o;
  } else {
    return function(a0, a1, a2, a3, a4) {
      return _5(o, a0, a1, a2, a3, a4);
    };
  }
}
function _6(o, a0, a1, a2, a3, a4, a5) {
  var arity = o.length;
  if (arity === 6) {
    return o(a0, a1, a2, a3, a4, a5);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [
          a1,
          a2,
          a3,
          a4,
          a5
        ]);
      case 2:
        return app(o(a0, a1), [
          a2,
          a3,
          a4,
          a5
        ]);
      case 3:
        return app(o(a0, a1, a2), [
          a3,
          a4,
          a5
        ]);
      case 4:
        return app(o(a0, a1, a2, a3), [
          a4,
          a5
        ]);
      case 5:
        return app(o(a0, a1, a2, a3, a4), [a5]);
      case 6:
        return o(a0, a1, a2, a3, a4, a5);
      case 7:
        return function(param) {
          return o(a0, a1, a2, a3, a4, a5, param);
        };
      default:
        return app(o, [
          a0,
          a1,
          a2,
          a3,
          a4,
          a5
        ]);
    }
  }
}
function __6(o) {
  var arity = o.length;
  if (arity === 6) {
    return o;
  } else {
    return function(a0, a1, a2, a3, a4, a5) {
      return _6(o, a0, a1, a2, a3, a4, a5);
    };
  }
}
function _7(o, a0, a1, a2, a3, a4, a5, a6) {
  var arity = o.length;
  if (arity === 7) {
    return o(a0, a1, a2, a3, a4, a5, a6);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [
          a1,
          a2,
          a3,
          a4,
          a5,
          a6
        ]);
      case 2:
        return app(o(a0, a1), [
          a2,
          a3,
          a4,
          a5,
          a6
        ]);
      case 3:
        return app(o(a0, a1, a2), [
          a3,
          a4,
          a5,
          a6
        ]);
      case 4:
        return app(o(a0, a1, a2, a3), [
          a4,
          a5,
          a6
        ]);
      case 5:
        return app(o(a0, a1, a2, a3, a4), [
          a5,
          a6
        ]);
      case 6:
        return app(o(a0, a1, a2, a3, a4, a5), [a6]);
      case 7:
        return o(a0, a1, a2, a3, a4, a5, a6);
      default:
        return app(o, [
          a0,
          a1,
          a2,
          a3,
          a4,
          a5,
          a6
        ]);
    }
  }
}
function __7(o) {
  var arity = o.length;
  if (arity === 7) {
    return o;
  } else {
    return function(a0, a1, a2, a3, a4, a5, a6) {
      return _7(o, a0, a1, a2, a3, a4, a5, a6);
    };
  }
}
function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
  var arity = o.length;
  if (arity === 8) {
    return o(a0, a1, a2, a3, a4, a5, a6, a7);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7
        ]);
      case 2:
        return app(o(a0, a1), [
          a2,
          a3,
          a4,
          a5,
          a6,
          a7
        ]);
      case 3:
        return app(o(a0, a1, a2), [
          a3,
          a4,
          a5,
          a6,
          a7
        ]);
      case 4:
        return app(o(a0, a1, a2, a3), [
          a4,
          a5,
          a6,
          a7
        ]);
      case 5:
        return app(o(a0, a1, a2, a3, a4), [
          a5,
          a6,
          a7
        ]);
      case 6:
        return app(o(a0, a1, a2, a3, a4, a5), [
          a6,
          a7
        ]);
      case 7:
        return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
      default:
        return app(o, [
          a0,
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7
        ]);
    }
  }
}
function __8(o) {
  var arity = o.length;
  if (arity === 8) {
    return o;
  } else {
    return function(a0, a1, a2, a3, a4, a5, a6, a7) {
      return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
    };
  }
}
var Reconciler_bs_exports = {};
__export(Reconciler_bs_exports, {
  $$Map: () => $$Map,
  $$Set: () => $$Set,
  RenderDelegate: () => RenderDelegate,
  mount: () => mount,
  renderWithDelegate: () => renderWithDelegate,
  stepGarbageCollector: () => stepGarbageCollector,
  visit: () => visit
});
var NodeRepr_bs_exports = {};
__export(NodeRepr_bs_exports, {
  create: () => create,
  isNode: () => isNode,
  shallowCopy: () => shallowCopy,
  symbol: () => symbol
});
function classify(x) {
  var ty = typeof x;
  if (ty === "undefined") {
    return 3;
  } else if (x === null) {
    return 2;
  } else if (ty === "number") {
    return {
      TAG: 0,
      _0: x
    };
  } else if (ty === "bigint") {
    return {
      TAG: 5,
      _0: x
    };
  } else if (ty === "string") {
    return {
      TAG: 1,
      _0: x
    };
  } else if (ty === "boolean") {
    if (x === true) {
      return 1;
    } else {
      return 0;
    }
  } else if (ty === "symbol") {
    return {
      TAG: 4,
      _0: x
    };
  } else if (ty === "function") {
    return {
      TAG: 2,
      _0: x
    };
  } else {
    return {
      TAG: 3,
      _0: x
    };
  }
}
function test(x, v) {
  switch (v) {
    case 0:
      return typeof x === "undefined";
    case 1:
      return x === null;
    case 2:
      return typeof x === "boolean";
    case 3:
      return typeof x === "number";
    case 4:
      return typeof x === "string";
    case 5:
      return typeof x === "function";
    case 6:
      return typeof x === "object";
    case 7:
      return typeof x === "symbol";
    case 8:
      return typeof x === "bigint";
  }
}
function some(x) {
  if (x === void 0) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: 0
    };
  } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
    };
  } else {
    return x;
  }
}
function valFromOption(x) {
  if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
    return x;
  }
  var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
  if (depth === 0) {
    return;
  } else {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
    };
  }
}
function add(xs, x) {
  return {
    hd: x,
    tl: xs
  };
}
function copyAuxCont(_cellX, _prec) {
  while (true) {
    var prec = _prec;
    var cellX = _cellX;
    if (!cellX) {
      return prec;
    }
    var next = {
      hd: cellX.hd,
      tl: 0
    };
    prec.tl = next;
    _prec = next;
    _cellX = cellX.tl;
    continue;
  }
  ;
}
function copyAuxWithMap(_cellX, _prec, f) {
  while (true) {
    var prec = _prec;
    var cellX = _cellX;
    if (!cellX) {
      return;
    }
    var next = {
      hd: f(cellX.hd),
      tl: 0
    };
    prec.tl = next;
    _prec = next;
    _cellX = cellX.tl;
    continue;
  }
  ;
}
function copyAuxWithMapI(f, _i, _cellX, _prec) {
  while (true) {
    var prec = _prec;
    var cellX = _cellX;
    var i = _i;
    if (!cellX) {
      return;
    }
    var next = {
      hd: f(i, cellX.hd),
      tl: 0
    };
    prec.tl = next;
    _prec = next;
    _cellX = cellX.tl;
    _i = i + 1 | 0;
    continue;
  }
  ;
}
function concat(xs, ys) {
  if (!xs) {
    return ys;
  }
  var cell = {
    hd: xs.hd,
    tl: 0
  };
  copyAuxCont(xs.tl, cell).tl = ys;
  return cell;
}
function mapU(xs, f) {
  if (!xs) {
    return 0;
  }
  var cell = {
    hd: f(xs.hd),
    tl: 0
  };
  copyAuxWithMap(xs.tl, cell, f);
  return cell;
}
function map(xs, f) {
  return mapU(xs, __1(f));
}
function mapWithIndexU(xs, f) {
  if (!xs) {
    return 0;
  }
  var cell = {
    hd: f(0, xs.hd),
    tl: 0
  };
  copyAuxWithMapI(f, 1, xs.tl, cell);
  return cell;
}
function mapWithIndex(xs, f) {
  return mapWithIndexU(xs, __2(f));
}
function length(xs) {
  var _x = xs;
  var _acc = 0;
  while (true) {
    var acc = _acc;
    var x = _x;
    if (!x) {
      return acc;
    }
    _acc = acc + 1 | 0;
    _x = x.tl;
    continue;
  }
  ;
}
function fillAux(arr, _i, _x) {
  while (true) {
    var x = _x;
    var i = _i;
    if (!x) {
      return;
    }
    arr[i] = x.hd;
    _x = x.tl;
    _i = i + 1 | 0;
    continue;
  }
  ;
}
function fromArray(a) {
  var _i = a.length - 1 | 0;
  var _res = 0;
  while (true) {
    var res = _res;
    var i = _i;
    if (i < 0) {
      return res;
    }
    _res = {
      hd: a[i],
      tl: res
    };
    _i = i - 1 | 0;
    continue;
  }
  ;
}
function toArray(x) {
  var len = length(x);
  var arr = new Array(len);
  fillAux(arr, 0, x);
  return arr;
}
function forEachU(_xs, f) {
  while (true) {
    var xs = _xs;
    if (!xs) {
      return;
    }
    f(xs.hd);
    _xs = xs.tl;
    continue;
  }
  ;
}
function forEach(xs, f) {
  forEachU(xs, __1(f));
}
function reduceU(_l, _accu, f) {
  while (true) {
    var accu = _accu;
    var l = _l;
    if (!l) {
      return accu;
    }
    _accu = f(accu, l.hd);
    _l = l.tl;
    continue;
  }
  ;
}
function updateNodeProps(renderer, hash, prevProps, nextProps) {
  for (let key in nextProps) {
    if (nextProps.hasOwnProperty(key)) {
      const value = nextProps[key];
      const shouldUpdate = !prevProps.hasOwnProperty(key) || !(0, import_shallowequal.default)(prevProps[key], value);
      if (shouldUpdate) {
        const seemsInvalid = typeof value === "undefined" || value === null || typeof value === "number" && isNaN(value) || typeof value === "number" && !isFinite(value);
        if (seemsInvalid) {
          console.warn(`Warning: applying a potentially erroneous property value. ${key}: ${value}`);
        }
        renderer.setProperty(hash, key, value);
        prevProps[key] = value;
      }
    }
  }
}
function get(dict, k) {
  if (k in dict) {
    return some(dict[k]);
  }
}
function getExn(x) {
  if (x !== void 0) {
    return valFromOption(x);
  }
  throw new Error("getExn");
}
function updateNodeProps2(prim0, prim1, prim2, prim3) {
  updateNodeProps(prim0, prim1, prim2, prim3);
}
function mixNumber(seed, n) {
  return Math.imul(seed ^ n, 16777619);
}
function hashString(seed, s) {
  var r = seed;
  for (var i = 0, i_finish = s.length; i <= i_finish; ++i) {
    r = mixNumber(r, s.charCodeAt(i) | 0);
  }
  return r;
}
function hashNode(kind, props, children) {
  var r = hashString(-2128831035, kind);
  var k = get(props, "key");
  var r2 = k !== void 0 && test(k, 4) ? hashString(r, k) : hashString(r, getExn(JSON.stringify(props)));
  return reduceU(children, r2, mixNumber) & 2147483647;
}
var symbol = "__ELEM_NODE__";
function create(kind, props, children) {
  var childrenList = fromArray(children);
  var childHashes = map(childrenList, function(n) {
    return n.hash;
  });
  return {
    symbol,
    hash: hashNode(kind, props, childHashes),
    kind,
    props,
    children: childrenList
  };
}
function isNode(a) {
  var match = classify(a);
  if (typeof match === "number") {
    return false;
  }
  if (match.TAG !== 3) {
    return false;
  }
  var s = classify(a.symbol);
  if (typeof s === "number" || s.TAG !== 1) {
    return false;
  } else {
    return s._0 === symbol;
  }
}
function shallowCopy(node) {
  return {
    symbol: node.symbol,
    hash: node.hash,
    kind: node.kind,
    props: Object.assign({}, node.props),
    generation: {
      contents: 0
    }
  };
}
function valuesArray(m) {
  return Array.from(m.values());
}
var $$Map = {
  valuesArray
};
var $$Set = {};
var RenderDelegate = {};
function mount(delegate, node) {
  var nodeMap = delegate.getNodeMap();
  if (nodeMap.has(node.hash)) {
    var existing = nodeMap.get(node.hash);
    updateNodeProps2(delegate, existing.hash, existing.props, node.props);
    existing.generation.contents = 0;
    return;
  }
  delegate.createNode(node.hash, node.kind);
  updateNodeProps2(delegate, node.hash, {}, node.props);
  forEach(node.children, function(child) {
    delegate.appendChild(node.hash, child.hash);
  });
  nodeMap.set(node.hash, shallowCopy(node));
}
function visit(delegate, visitSet, _ns) {
  while (true) {
    var ns = _ns;
    var markVisited = function(n2) {
      visitSet.add(n2.hash);
    };
    if (!ns) {
      return;
    }
    var rest = ns.tl;
    var n = ns.hd;
    if (visitSet.has(n.hash)) {
      _ns = rest;
      continue;
    }
    markVisited(n);
    mount(delegate, n);
    _ns = concat(n.children, rest);
    continue;
  }
  ;
}
function renderWithDelegate(delegate, graphs) {
  var visitSet = /* @__PURE__ */ new Set();
  var roots = mapWithIndex(fromArray(graphs), function(i, g) {
    return create("root", {
      channel: i
    }, [g]);
  });
  visit(delegate, visitSet, roots);
  delegate.activateRoots(toArray(map(roots, function(r) {
    return r.hash;
  })));
  delegate.commitUpdates();
}
function stepGarbageCollector(delegate) {
  var nodeMap = delegate.getNodeMap();
  var term = delegate.getTerminalGeneration();
  var deleted = Array.from(nodeMap.values()).reduce(function(acc, n) {
    n.generation.contents = n.generation.contents + 1 | 0;
    if (n.generation.contents >= term) {
      delegate.deleteNode(n.hash);
      return add(acc, n);
    } else {
      return acc;
    }
  }, 0);
  if (length(deleted) > 0) {
    delegate.commitUpdates();
    return forEach(deleted, function(n) {
      nodeMap.delete(n.hash);
    });
  }
}
var Curry = curry_exports;
var ReconcilerBS = Reconciler_bs_exports;
var renderWithDelegate2 = function(Arg1, Arg2) {
  const result = Curry._2(ReconcilerBS.renderWithDelegate, Arg1, Arg2);
  return result;
};
var stepGarbageCollector2 = ReconcilerBS.stepGarbageCollector;
var Curry2 = curry_exports;
var NodeReprBS = NodeRepr_bs_exports;
var create2 = function(Arg1, Arg2, Arg3) {
  const result = Curry2._3(NodeReprBS.create, Arg1, Arg2, Arg3);
  return result;
};
var isNode2 = NodeReprBS.isNode;
var shallowCopy2 = NodeReprBS.shallowCopy;
function resolve(n) {
  if (typeof n === "number")
    return create2("const", { value: n }, []);
  (0, import_invariant.default)(isNode3(n), `Whoops, expecting a Node type here! Got: ${typeof n}`);
  return n;
}
function isNode3(n) {
  return isNode2(n);
}
function createNode(kind, props, children) {
  return create2(kind, props, children.map(resolve));
}
var core_exports = {};
__export(core_exports, {
  accum: () => accum,
  biquad: () => biquad,
  capture: () => capture,
  constant: () => constant,
  convolve: () => convolve,
  counter: () => counter,
  delay: () => delay,
  env: () => env,
  fft: () => fft,
  latch: () => latch,
  maxhold: () => maxhold,
  meter: () => meter,
  metro: () => metro,
  mm1p: () => mm1p,
  once: () => once,
  phasor: () => phasor,
  pole: () => pole,
  prewarp: () => prewarp,
  rand: () => rand,
  sample: () => sample,
  sampleseq: () => sampleseq,
  scope: () => scope,
  sdelay: () => sdelay,
  seq: () => seq,
  seq2: () => seq2,
  snapshot: () => snapshot,
  sparseq: () => sparseq,
  sparseq2: () => sparseq2,
  sr: () => sr,
  svf: () => svf,
  svfshelf: () => svfshelf,
  syncphasor: () => syncphasor,
  table: () => table,
  tapIn: () => tapIn,
  tapOut: () => tapOut,
  time: () => time,
  z: () => z
});
function constant(props) {
  return createNode("const", props, []);
}
function sr() {
  return createNode("sr", {}, []);
}
function time() {
  return createNode("time", {}, []);
}
function counter(a, b) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("counter", {}, [resolve(a)]);
  }
  return createNode("counter", a, [resolve(b)]);
}
function accum(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("accum", {}, [resolve(a), resolve(b)]);
  }
  return createNode("accum", a, [resolve(b), resolve(c)]);
}
function phasor(a, b) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("phasor", {}, [resolve(a)]);
  }
  return createNode("phasor", a, [resolve(b)]);
}
function syncphasor(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("sphasor", {}, [resolve(a), resolve(b)]);
  }
  return createNode("sphasor", a, [resolve(b), resolve(c)]);
}
function latch(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("latch", {}, [resolve(a), resolve(b)]);
  }
  return createNode("latch", a, [resolve(b), resolve(c)]);
}
function maxhold(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("maxhold", {}, [resolve(a), resolve(b)]);
  }
  return createNode("maxhold", a, [resolve(b), resolve(c)]);
}
function once(a, b) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("once", {}, [resolve(a)]);
  }
  return createNode("once", a, [resolve(b)]);
}
function rand(a) {
  if (typeof a !== "undefined") {
    return createNode("rand", a, []);
  }
  return createNode("rand", {}, []);
}
function metro(a) {
  if (typeof a !== "undefined") {
    return createNode("metro", a, []);
  }
  return createNode("metro", {}, []);
}
function sample(props, trigger, rate) {
  return createNode("sample", props, [resolve(trigger), resolve(rate)]);
}
function table(props, t) {
  return createNode("table", props, [resolve(t)]);
}
function convolve(props, x) {
  return createNode("convolve", props, [resolve(x)]);
}
function seq(props, trigger, reset) {
  return createNode("seq", props, [resolve(trigger), resolve(reset)]);
}
function seq2(props, trigger, reset) {
  return createNode("seq2", props, [resolve(trigger), resolve(reset)]);
}
function sparseq(props, trigger, reset) {
  return createNode("sparseq", props, [resolve(trigger), resolve(reset)]);
}
function sparseq2(props, time2) {
  return createNode("sparseq2", props, [resolve(time2)]);
}
function sampleseq(props, time2) {
  return createNode("sampleseq", props, [resolve(time2)]);
}
function pole(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("pole", {}, [resolve(a), resolve(b)]);
  }
  return createNode("pole", a, [resolve(b), resolve(c)]);
}
function env(a, b, c, d) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("env", {}, [resolve(a), resolve(b), resolve(c)]);
  }
  return createNode("env", a, [resolve(b), resolve(c), resolve(d)]);
}
function z(a, b) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("z", {}, [resolve(a)]);
  }
  return createNode("z", a, [resolve(b)]);
}
function delay(a, b, c, d) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("delay", {}, [resolve(a), resolve(b), resolve(c)]);
  }
  return createNode("delay", a, [resolve(b), resolve(c), resolve(d)]);
}
function sdelay(props, x) {
  return createNode("sdelay", props, [resolve(x)]);
}
function prewarp(fc) {
  return createNode("prewarp", {}, [fc]);
}
function mm1p(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("mm1p", {}, [
      resolve(a),
      resolve(b)
    ]);
  }
  return createNode("mm1p", a, [
    resolve(b),
    resolve(c)
  ]);
}
function svf(a, b, c, d) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("svf", {}, [
      resolve(a),
      resolve(b),
      resolve(c)
    ]);
  }
  return createNode("svf", a, [
    resolve(b),
    resolve(c),
    resolve(d)
  ]);
}
function svfshelf(a, b, c, d, e) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("svfshelf", {}, [
      resolve(a),
      resolve(b),
      resolve(c),
      resolve(d)
    ]);
  }
  return createNode("svfshelf", a, [
    resolve(b),
    resolve(c),
    resolve(d),
    resolve(e)
  ]);
}
function biquad(a, b, c, d, e, f, g) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("biquad", {}, [
      resolve(a),
      resolve(b),
      resolve(c),
      resolve(d),
      resolve(e),
      resolve(f)
    ]);
  }
  return createNode("biquad", a, [
    resolve(b),
    resolve(c),
    resolve(d),
    resolve(e),
    resolve(f),
    resolve(g)
  ]);
}
function tapIn(props) {
  return createNode("tapIn", props, []);
}
function tapOut(props, x) {
  return createNode("tapOut", props, [resolve(x)]);
}
function meter(a, b) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("meter", {}, [resolve(a)]);
  }
  return createNode("meter", a, [resolve(b)]);
}
function snapshot(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("snapshot", {}, [resolve(a), resolve(b)]);
  }
  return createNode("snapshot", a, [resolve(b), resolve(c)]);
}
function scope(a, ...bs) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("scope", {}, [a, ...bs].map(resolve));
  }
  return createNode("scope", a, bs.map(resolve));
}
function fft(a, b) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("fft", {}, [resolve(a)]);
  }
  return createNode("fft", a, [resolve(b)]);
}
function capture(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("capture", {}, [resolve(a), resolve(b)]);
  }
  return createNode("capture", a, [resolve(b), resolve(c)]);
}
var dynamics_exports = {};
__export(dynamics_exports, {
  compress: () => compress,
  skcompress: () => skcompress
});
var math_exports = {};
__export(math_exports, {
  abs: () => abs,
  add: () => add2,
  and: () => and,
  asinh: () => asinh,
  ceil: () => ceil,
  cos: () => cos,
  div: () => div,
  eq: () => eq,
  exp: () => exp,
  floor: () => floor,
  ge: () => ge,
  geq: () => geq,
  identity: () => identity,
  le: () => le,
  leq: () => leq,
  ln: () => ln,
  log: () => log,
  log2: () => log2,
  max: () => max2,
  min: () => min2,
  mod: () => mod,
  mul: () => mul,
  or: () => or,
  pow: () => pow,
  round: () => round,
  sin: () => sin,
  sqrt: () => sqrt,
  sub: () => sub2,
  tan: () => tan,
  tanh: () => tanh
});
function identity(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("in", {}, [resolve(a)]) : typeof b === "number" || isNode3(b) ? createNode("in", a, [resolve(b)]) : createNode("in", a, []);
}
function sin(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("sin", {}, [resolve(a)]) : createNode("sin", a, [resolve(b)]);
}
function cos(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("cos", {}, [resolve(a)]) : createNode("cos", a, [resolve(b)]);
}
function tan(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("tan", {}, [resolve(a)]) : createNode("tan", a, [resolve(b)]);
}
function tanh(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("tanh", {}, [resolve(a)]) : createNode("tanh", a, [resolve(b)]);
}
function asinh(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("asinh", {}, [resolve(a)]) : createNode("asinh", a, [resolve(b)]);
}
function ln(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("ln", {}, [resolve(a)]) : createNode("ln", a, [resolve(b)]);
}
function log(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("log", {}, [resolve(a)]) : createNode("log", a, [resolve(b)]);
}
function log2(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("log2", {}, [resolve(a)]) : createNode("log2", a, [resolve(b)]);
}
function ceil(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("ceil", {}, [resolve(a)]) : createNode("ceil", a, [resolve(b)]);
}
function floor(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("floor", {}, [resolve(a)]) : createNode("floor", a, [resolve(b)]);
}
function round(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("round", {}, [resolve(a)]) : createNode("round", a, [resolve(b)]);
}
function sqrt(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("sqrt", {}, [resolve(a)]) : createNode("sqrt", a, [resolve(b)]);
}
function exp(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("exp", {}, [resolve(a)]) : createNode("exp", a, [resolve(b)]);
}
function abs(a, b) {
  return typeof a === "number" || isNode3(a) ? createNode("abs", {}, [resolve(a)]) : createNode("abs", a, [resolve(b)]);
}
function le(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("le", {}, [resolve(a), resolve(b)]);
  }
  return createNode("le", a, [resolve(b), resolve(c)]);
}
function leq(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("leq", {}, [resolve(a), resolve(b)]);
  }
  return createNode("leq", a, [resolve(b), resolve(c)]);
}
function ge(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("ge", {}, [resolve(a), resolve(b)]);
  }
  return createNode("ge", a, [resolve(b), resolve(c)]);
}
function geq(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("geq", {}, [resolve(a), resolve(b)]);
  }
  return createNode("geq", a, [resolve(b), resolve(c)]);
}
function pow(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("pow", {}, [resolve(a), resolve(b)]);
  }
  return createNode("pow", a, [resolve(b), resolve(c)]);
}
function eq(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("eq", {}, [resolve(a), resolve(b)]);
  }
  return createNode("eq", a, [resolve(b), resolve(c)]);
}
function and(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("and", {}, [resolve(a), resolve(b)]);
  }
  return createNode("and", a, [resolve(b), resolve(c)]);
}
function or(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("or", {}, [resolve(a), resolve(b)]);
  }
  return createNode("or", a, [resolve(b), resolve(c)]);
}
function add2(a, ...bs) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("add", {}, [a, ...bs].map(resolve));
  }
  return createNode("add", a, bs.map(resolve));
}
function sub2(a, ...bs) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("sub", {}, [a, ...bs].map(resolve));
  }
  return createNode("sub", a, bs.map(resolve));
}
function mul(a, ...bs) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("mul", {}, [a, ...bs].map(resolve));
  }
  return createNode("mul", a, bs.map(resolve));
}
function div(a, ...bs) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("div", {}, [a, ...bs].map(resolve));
  }
  return createNode("div", a, bs.map(resolve));
}
function mod(a, ...bs) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("mod", {}, [a, ...bs].map(resolve));
  }
  return createNode("mod", a, bs.map(resolve));
}
function min2(a, ...bs) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("min", {}, [a, ...bs].map(resolve));
  }
  return createNode("min", a, bs.map(resolve));
}
function max2(a, ...bs) {
  if (typeof a === "number" || isNode3(a)) {
    return createNode("max", {}, [a, ...bs].map(resolve));
  }
  return createNode("max", a, bs.map(resolve));
}
var signals_exports = {};
__export(signals_exports, {
  db2gain: () => db2gain,
  gain2db: () => gain2db,
  hann: () => hann,
  ms2samps: () => ms2samps,
  select: () => select,
  tau2pole: () => tau2pole
});
var el = __spreadValues(__spreadValues({}, core_exports), math_exports);
function ms2samps(t) {
  return el.mul(el.sr(), el.div(t, 1e3));
}
function tau2pole(t) {
  return el.exp(el.div(-1, el.mul(t, el.sr())));
}
function db2gain(db) {
  return el.pow(10, el.mul(db, 1 / 20));
}
function gain2db(gain) {
  return select(el.ge(gain, 0), el.max(-120, el.mul(20, el.log(gain))), -120);
}
function select(g, a, b) {
  return el.add(el.mul(g, a), el.mul(el.sub(1, g), b));
}
function hann(t) {
  return el.mul(0.5, el.sub(1, el.cos(el.mul(2 * Math.PI, t))));
}
var el2 = __spreadValues(__spreadValues(__spreadValues({}, core_exports), math_exports), signals_exports);
function compress(atkMs, relMs, threshold, ratio, sidechain, xn) {
  const env2 = el2.env(el2.tau2pole(el2.mul(1e-3, atkMs)), el2.tau2pole(el2.mul(1e-3, relMs)), sidechain);
  const envDecibels = el2.gain2db(env2);
  const adjustedRatio = el2.sub(1, el2.div(1, ratio));
  const gain = el2.mul(adjustedRatio, el2.sub(threshold, envDecibels));
  const cleanGain = el2.min(0, gain);
  const compressedGain = el2.db2gain(cleanGain);
  return el2.mul(xn, compressedGain);
}
function skcompress(atkMs, relMs, threshold, ratio, kneeWidth, sidechain, xn) {
  const env2 = el2.env(el2.tau2pole(el2.mul(1e-3, atkMs)), el2.tau2pole(el2.mul(1e-3, relMs)), sidechain);
  const envDecibels = el2.gain2db(env2);
  const lowerKneeBound = el2.sub(threshold, el2.div(kneeWidth, 2));
  const upperKneeBound = el2.add(threshold, el2.div(kneeWidth, 2));
  const isInSoftKneeRange = el2.and(el2.geq(envDecibels, lowerKneeBound), el2.leq(envDecibels, upperKneeBound));
  const adjustedRatio = el2.sub(1, el2.div(1, ratio));
  const gain = el2.select(isInSoftKneeRange, el2.mul(el2.div(adjustedRatio, 2), el2.mul(el2.div(el2.sub(envDecibels, lowerKneeBound), kneeWidth), el2.sub(lowerKneeBound, envDecibels))), el2.mul(adjustedRatio, el2.sub(threshold, envDecibels)));
  const cleanGain = el2.min(0, gain);
  const compressedGain = el2.db2gain(cleanGain);
  return el2.mul(xn, compressedGain);
}
var envelopes_exports = {};
__export(envelopes_exports, {
  adsr: () => adsr
});
var filters_exports = {};
__export(filters_exports, {
  allpass: () => allpass,
  bandpass: () => bandpass,
  dcblock: () => dcblock,
  df11: () => df11,
  highpass: () => highpass,
  highshelf: () => highshelf,
  lowpass: () => lowpass,
  lowshelf: () => lowshelf,
  notch: () => notch,
  peak: () => peak,
  pink: () => pink,
  sm: () => sm,
  smooth: () => smooth,
  zero: () => zero
});
var el3 = __spreadValues(__spreadValues(__spreadValues({}, core_exports), math_exports), signals_exports);
function smooth(a, b, c) {
  if (typeof a === "number" || isNode3(a)) {
    return el3.pole(a, el3.mul(el3.sub(1, a), b));
  }
  return el3.pole(a, b, el3.mul(el3.sub(1, b), c));
}
function sm(a, b) {
  if (typeof a === "number" || isNode3(a)) {
    return smooth(el3.tau2pole(0.02), a);
  }
  return smooth(a, el3.tau2pole(0.02), b);
}
function zero(a, b, c, d) {
  let [b0, b1, x] = typeof a === "number" || isNode3(a) ? [a, b, c] : [b, c, d];
  return el3.sub(el3.mul(b0, x), el3.mul(b1, el3.z(x)));
}
function dcblock(a, b) {
  let x = typeof a === "number" || isNode3(a) ? a : b;
  return el3.pole(0.995, zero(1, 1, x));
}
function df11(a, b, c, d, e) {
  let [b0, b1, a1, x] = typeof a === "number" || isNode3(a) ? [a, b, c, d] : [b, c, d, e];
  return el3.pole(a1, zero(b0, b1, x));
}
function lowpass(a, b, c, d) {
  if (typeof a === "number" || isNode3(a)) {
    return el3.svf({ mode: "lowpass" }, a, b, c);
  }
  return el3.svf(Object.assign({}, a, { mode: "lowpass" }), b, c, d);
}
function highpass(a, b, c, d) {
  if (typeof a === "number" || isNode3(a)) {
    return el3.svf({ mode: "highpass" }, a, b, c);
  }
  return el3.svf(Object.assign({}, a, { mode: "highpass" }), b, c, d);
}
function bandpass(a, b, c, d) {
  if (typeof a === "number" || isNode3(a)) {
    return el3.svf({ mode: "bandpass" }, a, b, c);
  }
  return el3.svf(Object.assign({}, a, { mode: "bandpass" }), b, c, d);
}
function notch(a, b, c, d) {
  if (typeof a === "number" || isNode3(a)) {
    return el3.svf({ mode: "notch" }, a, b, c);
  }
  return el3.svf(Object.assign({}, a, { mode: "notch" }), b, c, d);
}
function allpass(a, b, c, d) {
  if (typeof a === "number" || isNode3(a)) {
    return el3.svf({ mode: "allpass" }, a, b, c);
  }
  return el3.svf(Object.assign({}, a, { mode: "allpass" }), b, c, d);
}
function peak(a, b, c, d, e) {
  if (typeof a === "number" || isNode3(a)) {
    return el3.svfshelf({ mode: "peak" }, a, b, c, d);
  }
  return el3.svfshelf(Object.assign({}, a, { mode: "peak" }), b, c, d, e);
}
function lowshelf(a, b, c, d, e) {
  if (typeof a === "number" || isNode3(a)) {
    return el3.svfshelf({ mode: "lowshelf" }, a, b, c, d);
  }
  return el3.svfshelf(Object.assign({}, a, { mode: "lowshelf" }), b, c, d, e);
}
function highshelf(a, b, c, d, e) {
  if (typeof a === "number" || isNode3(a)) {
    return el3.svfshelf({ mode: "highshelf" }, a, b, c, d);
  }
  return el3.svfshelf(Object.assign({}, a, { mode: "highshelf" }), b, c, d, e);
}
function pink(a, b) {
  let x = typeof a === "number" || isNode3(a) ? a : b;
  let clip = (min3, max3, x2) => el3.min(max3, el3.max(min3, x2));
  return clip(-1, 1, el3.mul(el3.db2gain(-30), el3.add(el3.pole(0.99765, el3.mul(x, 0.099046)), el3.pole(0.963, el3.mul(x, 0.2965164)), el3.pole(0.57, el3.mul(x, 1.0526913)), el3.mul(0.1848, x))));
}
var el4 = __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, core_exports), math_exports), filters_exports), signals_exports);
function adsr(a_, b_, c_, d_, e_, f_) {
  let children = typeof a_ === "number" || isNode3(a_) ? [a_, b_, c_, d_, e_] : [b_, c_, d_, e_, f_];
  let [a, d, s, r, g] = children;
  let atkSamps = el4.mul(a, el4.sr());
  let atkGate = el4.le(el4.counter(g), atkSamps);
  let target = el4.select(g, el4.select(atkGate, 1, s), 0);
  let t60 = el4.select(g, el4.select(atkGate, a, d), r);
  let p = el4.tau2pole(el4.div(t60, 6.91));
  return el4.smooth(p, target);
}
var oscillators_exports = {};
__export(oscillators_exports, {
  blepsaw: () => blepsaw,
  blepsquare: () => blepsquare,
  bleptriangle: () => bleptriangle,
  cycle: () => cycle,
  noise: () => noise,
  pinknoise: () => pinknoise,
  saw: () => saw,
  square: () => square,
  train: () => train,
  triangle: () => triangle
});
var el5 = __spreadValues(__spreadValues(__spreadValues({}, core_exports), math_exports), filters_exports);
function train(a, b) {
  if (typeof a === "number" || isNode3(a)) {
    return el5.le(el5.phasor(a, 0), 0.5);
  }
  return el5.le(el5.phasor(a, b, 0), 0.5);
}
function cycle(a, b) {
  return typeof a === "number" || isNode3(a) ? el5.sin(el5.mul(2 * Math.PI, el5.phasor(a, 0))) : el5.sin(el5.mul(2 * Math.PI, el5.phasor(a, b, 0)));
}
function saw(a, b) {
  return typeof a === "number" || isNode3(a) ? el5.sub(el5.mul(2, el5.phasor(a, 0)), 1) : el5.sub(el5.mul(2, el5.phasor(a, b, 0)), 1);
}
function square(a, b) {
  return typeof a === "number" || isNode3(a) ? el5.sub(el5.mul(2, train(a)), 1) : el5.sub(el5.mul(2, train(a, b)), 1);
}
function triangle(a, b) {
  return typeof a === "number" || isNode3(a) ? el5.mul(2, el5.sub(0.5, el5.abs(saw(a)))) : el5.mul(2, el5.sub(0.5, el5.abs(saw(a, b))));
}
function polyblep(step, phase) {
  let leftgate = el5.le(phase, step);
  let rightgate = el5.ge(phase, el5.sub(1, step));
  let lx = el5.div(phase, step);
  let rx = el5.div(el5.sub(phase, 1), step);
  return el5.add(el5.mul(leftgate, el5.sub(el5.mul(2, lx), el5.mul(lx, lx), 1)), el5.mul(rightgate, el5.add(el5.mul(2, rx), el5.mul(rx, rx), 1)));
}
function blepsaw(a, b) {
  let hasProps = !(typeof a === "number" || isNode3(a));
  let props = hasProps ? a : {};
  let rate = hasProps ? b : a;
  let phase = el5.phasor(props, rate, 0);
  let naive = el5.sub(el5.mul(2, phase), 1);
  let step = el5.div(rate, el5.sr());
  return el5.sub(naive, polyblep(step, phase));
}
function blepsquare(a, b) {
  let hasProps = !(typeof a === "number" || isNode3(a));
  let props = hasProps ? a : {};
  let rate = hasProps ? b : a;
  let phase = el5.phasor(props, rate, 0);
  let trn = el5.le(phase, 0.5);
  let naive = el5.sub(el5.mul(2, trn), 1);
  let step = el5.div(rate, el5.sr());
  let blep1 = polyblep(step, phase);
  let blep2 = polyblep(step, el5.mod(el5.add(phase, 0.5), 1));
  return el5.sub(el5.add(naive, blep1), blep2);
}
function bleptriangle(a, b) {
  let hasProps = !(typeof a === "number" || isNode3(a));
  let props = hasProps ? a : {};
  let rate = hasProps ? b : a;
  let gain = el5.div(el5.mul(4, rate), el5.sr());
  return el5.mul(gain, el5.pole(0.995, blepsquare(props, rate)));
}
function noise(a) {
  if (typeof a === "undefined") {
    return el5.sub(el5.mul(2, el5.rand()), 1);
  }
  return el5.sub(el5.mul(2, el5.rand(a)), 1);
}
function pinknoise(a) {
  if (typeof a === "undefined") {
    return el5.pink(noise());
  }
  return el5.pink(noise(a));
}
var EventEmitter = class extends import_events.default.EventEmitter {
};
var stdlib = __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, core_exports), dynamics_exports), envelopes_exports), filters_exports), math_exports), oscillators_exports), signals_exports), {
  "const": constant,
  "in": identity
});
var InstructionTypes = {
  CREATE_NODE: 0,
  DELETE_NODE: 1,
  APPEND_CHILD: 2,
  SET_PROPERTY: 3,
  ACTIVATE_ROOTS: 4,
  COMMIT_UPDATES: 5
};
var Delegate = class {
  constructor() {
    this.nodeMap = /* @__PURE__ */ new Map();
    this.currentActiveRoots = /* @__PURE__ */ new Set();
    this.clear();
  }
  clear() {
    this.nodesAdded = 0;
    this.nodesRemoved = 0;
    this.edgesAdded = 0;
    this.propsWritten = 0;
    this.batch = {
      createNode: [],
      deleteNode: [],
      appendChild: [],
      setProperty: [],
      activateRoots: [],
      commitUpdates: []
    };
  }
  getNodeMap() {
    return this.nodeMap;
  }
  getTerminalGeneration() {
    return 4;
  }
  createNode(hash, type) {
    this.nodesAdded++;
    this.batch.createNode.push([InstructionTypes.CREATE_NODE, hash, type]);
  }
  deleteNode(hash) {
    this.nodesRemoved++;
    this.batch.deleteNode.push([InstructionTypes.DELETE_NODE, hash]);
  }
  appendChild(parentHash, childHash) {
    this.edgesAdded++;
    this.batch.appendChild.push([InstructionTypes.APPEND_CHILD, parentHash, childHash]);
  }
  setProperty(hash, key, value) {
    this.propsWritten++;
    this.batch.setProperty.push([InstructionTypes.SET_PROPERTY, hash, key, value]);
  }
  activateRoots(roots) {
    let alreadyActive = roots.length === this.currentActiveRoots.size && roots.every((root) => this.currentActiveRoots.has(root));
    if (!alreadyActive) {
      this.batch.activateRoots.push([InstructionTypes.ACTIVATE_ROOTS, roots]);
      this.currentActiveRoots = new Set(roots);
    }
  }
  commitUpdates() {
    this.batch.commitUpdates.push([InstructionTypes.COMMIT_UPDATES]);
  }
  getPackedInstructions() {
    return [
      ...this.batch.createNode,
      ...this.batch.deleteNode,
      ...this.batch.appendChild,
      ...this.batch.setProperty,
      ...this.batch.activateRoots,
      ...this.batch.commitUpdates
    ];
  }
};
function now() {
  if (typeof performance === "undefined") {
    return Date.now();
  }
  return performance.now();
}
var Renderer = class {
  constructor(sendMessage) {
    this._delegate = new Delegate();
    this._sendMessage = sendMessage;
    this._nextRefId = 0;
  }
  createRef(kind, props, children) {
    let key = `__refKey:${this._nextRefId++}`;
    let node = createNode(kind, Object.assign({ key }, props), children);
    let setter = (newProps) => {
      if (!this._delegate.nodeMap.has(node.hash)) {
        throw new Error("Cannot update a ref that has not been mounted; make sure you render your node first");
      }
      const nodeMapCopy = this._delegate.nodeMap.get(node.hash);
      this._delegate.clear();
      updateNodeProps(this._delegate, node.hash, nodeMapCopy.props, newProps);
      this._delegate.commitUpdates();
      this._sendMessage(this._delegate.getPackedInstructions());
    };
    return [node, setter];
  }
  render(...args) {
    const t0 = now();
    this._delegate.clear();
    renderWithDelegate2(this._delegate, args.map(resolve));
    const t1 = now();
    this._sendMessage(this._delegate.getPackedInstructions());
    return {
      nodesAdded: this._delegate.nodesAdded,
      edgesAdded: this._delegate.edgesAdded,
      propsWritten: this._delegate.propsWritten,
      elapsedTimeMs: t1 - t0
    };
  }
};
export {
  Delegate,
  EventEmitter,
  Renderer,
  createNode,
  stdlib as el,
  isNode3 as isNode,
  renderWithDelegate2 as renderWithDelegate,
  resolve,
  stdlib,
  stepGarbageCollector2 as stepGarbageCollector
};
