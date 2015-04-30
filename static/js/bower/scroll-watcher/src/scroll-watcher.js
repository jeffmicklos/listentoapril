import $ from 'jquery';

export default class ScrollWatcher {
  constructor() {
    this._locked = false;
    this.squelched = false;
    this.SCROLL_DURATION = 1200;

    this.callbacks = {
      'scrollup':   $.Callbacks(),
      'scrolldown': $.Callbacks()
    };

    $(document).on('mousewheel DOMMouseScroll', $.proxy(this.onMouseWheel, this));
  }

  destroy() {
    for(var eventKey in this.callbacks) {
      this.callbacks[eventKey].empty();
    }

    $(document).off('mousewheel DOMMouseScroll', $.proxy(this.onMouseWheel, this));
  }

  on(event, callback) {
    this.callbacks[event].add(callback);
  }

  off(event, callback) {
    this.callbacks[event].empty();
  }

  trigger(event) {
    this.callbacks[event].fire(event);
  }

  onMouseWheel(event) {
    if(this._locked || this.squelched) {
      return;
    }

    var delta = event.originalEvent.wheelDeltaY || -1 * event.originalEvent.deltaY;

    event.preventDefault();
    event.stopPropagation();

    this._locked = true;

    if(delta > 0) {
      this.trigger('scrollup');
    } else {
      this.trigger('scrolldown');
    }

    setTimeout(() => {
      this._locked = false;
    }, this.SCROLL_DURATION);

  }
}