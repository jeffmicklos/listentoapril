(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('ScrollWatcher', ['exports', 'module', 'jquery'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.$);
    global.ScrollWatcher = mod.exports;
  }
})(this, function (exports, module, _jquery) {
  'use strict';

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _$ = _interopRequire(_jquery);

  var ScrollWatcher = (function () {
    function ScrollWatcher() {
      _classCallCheck(this, ScrollWatcher);

      this._locked = false;
      this.squelched = false;
      this.SCROLL_DURATION = 1200;

      this.callbacks = {
        scrollup: _$.Callbacks(),
        scrolldown: _$.Callbacks()
      };

      _$(document).on('mousewheel DOMMouseScroll', _$.proxy(this.onMouseWheel, this));
    }

    _createClass(ScrollWatcher, [{
      key: 'destroy',
      value: function destroy() {
        for (var eventKey in this.callbacks) {
          this.callbacks[eventKey].empty();
        }

        _$(document).off('mousewheel DOMMouseScroll', _$.proxy(this.onMouseWheel, this));
      }
    }, {
      key: 'on',
      value: function on(event, callback) {
        this.callbacks[event].add(callback);
      }
    }, {
      key: 'off',
      value: function off(event, callback) {
        this.callbacks[event].empty();
      }
    }, {
      key: 'trigger',
      value: function trigger(event) {
        this.callbacks[event].fire(event);
      }
    }, {
      key: 'onMouseWheel',
      value: function onMouseWheel(event) {
        var _this = this;

        if (this._locked || this.squelched) {
          return;
        }

        var delta = event.originalEvent.wheelDeltaY || -1 * event.originalEvent.deltaY;

        event.preventDefault();
        event.stopPropagation();

        this._locked = true;

        if (delta > 0) {
          this.trigger('scrollup');
        } else {
          this.trigger('scrolldown');
        }

        setTimeout(function () {
          _this._locked = false;
        }, this.SCROLL_DURATION);
      }
    }]);

    return ScrollWatcher;
  })();

  module.exports = ScrollWatcher;
});