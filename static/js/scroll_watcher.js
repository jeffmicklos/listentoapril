window.April = window.April || {};

April.ScrollWatcher = function(slider) {

  this.slider = slider;
  this._locked = false;

  $(document).on('mousewheel DOMMouseScroll', $.proxy(this.onMouseWheel, this));

};

April.ScrollWatcher.prototype.SCROLL_DURATION = 400;

April.ScrollWatcher.prototype.onMouseWheel = function(event) {
  var self = this;
  var delta = event.wheelDeltaY || -1 * event.deltaY;

  event.preventDefault();
  event.stopPropagation();

  if(this._locked) {
    return;
  }

  this._locked = true;

  if(delta > 0) {
    $('.container').first().velocity('scroll', {
      duration: 500,
      easing: 'easeOutBack'
    });
    //this.slider.prev();
  } else {
    $('.container').last().velocity('scroll', {
      duration: 500,
      easing: 'easeOutBack'
    });
    //this.slider.next();
  }

  setTimeout(function() {
    self._locked = false;
  }, this.SCROLL_DURATION);

};
