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

  var _default = (function () {
    var _class = function _default() {
      var _ref = arguments[0] === undefined ? {} : arguments[0];

      var _ref$scrollDuration = _ref.scrollDuration;
      var scrollDuration = _ref$scrollDuration === undefined ? 1200 : _ref$scrollDuration;

      _classCallCheck(this, _class);

      this._locked = false;
      this.squelched = false;
      this.scrollDuration = scrollDuration;

      this.callbacks = {
        scrollup: _$.Callbacks(),
        scrolldown: _$.Callbacks()
      };

      console.log('contrusctor')

      _$(document).on('mousewheel DOMMouseScroll', _$.proxy(this.onMouseWheel, this));
    };

    _createClass(_class, [{
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
        var delta = event.originalEvent.wheelDeltaY || -1 * event.originalEvent.deltaY;

        event.preventDefault();
        event.stopPropagation();

        if(this._locked) {
          return;
        }

        this._locked = true;

        if (delta > 0) {
          this.trigger('scrollup');
        } else {
          this.trigger('scrolldown');
        }

        setTimeout(function () {
          _this._locked = false;
        }, this.scrollDuration);
      }
    }]);

    return _class;
  })();

  module.exports = _default;
});