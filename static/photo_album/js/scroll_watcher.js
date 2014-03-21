var ScrollWatcher = function(slider) {

  this.slider = slider;
  this._locked = false;

  $(document).on('mousewheel DOMMouseScroll', $.proxy(this.onMouseWheel, this));

};

ScrollWatcher.prototype.SCROLL_DURATION = 1200;

ScrollWatcher.prototype.onMouseWheel = function(event) {

  var self = this;
  var delta = event.originalEvent.wheelDeltaY || -1 * event.originalEvent.deltaY;

  event.preventDefault();
  event.stopPropagation();

  if(this._locked) {
    return;
  }

  this._locked = true;

  if(delta > 0) {
    this.slider.prev();
  } else {
    this.slider.next();
  }

  setTimeout(function() {
    self._locked = false;
  }, this.SCROLL_DURATION);

};
