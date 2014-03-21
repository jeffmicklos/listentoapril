var inherit = function(childCtor, parentCtor) {
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  childCtor.prototype.constructor = childCtor;
};

/**
 * Library that facilitates vertical scrolling lists,
 * a la the 2013 fall preview and the NYC recruiting page.
 *
 * @param {jQuery} container ul that contains all the slides
 * @param {?Object} options
 */
 VerticalSlides = function(container, options) {

  Component.call(this, container);

  var self = this; // duh!

  var defaults = {
    nav:            false, // a jQuery `ul` that will act as container for pagination dots
    fullScreen:     true,  // makes each `li` full width/height
    title:          '',    // slug which is sent to mixpanel for tracking
    track:          true,  // whether to send events to mixpanel,
    reflowOnResize: true,
    next:           true,
    loadingScreen:  false,
    lockScroll:     false,
    fullSlideClick: false,
    loadedFunction: function() {

    }
  };

  this.settings = $.extend({}, defaults, options);

  this.index = 0;
  this.container = container;
  this.slides = this.container.find('> li');
  this.count = this.slides.length;
  this.waypointElements = $();

  // Build out DOM elements like nav container and next button
  this.buildDOM();

  // If fullscreen, we want to enforce that the `lis` are always full height
  if(this.settings.fullScreen) {
    $(window).load($.proxy(this.setSectionHeight, this));
    if(this.settings.reflowOnResize) {
      $(window).resize($.proxy(this.setSectionHeight, this));
    }
  }

  // Provides the scroll locking functionlity, a la iPhone 5s site
  if(this.settings.lockScroll) {
    var scrollWatcher = new ScrollWatcher(this);
  }

  $(window).load($.proxy(this.bindWaypoint, this));
  $.proxy(this.settings.loadedFunction, this)();

  if(this.settings.fullSlideClick) {
    this.slides.on('click', $.proxy(this.onSlideClick, this));
  }

  // On click of the next button, advance to the next one.
  if(this.settings.next) {
    this.settings.next.on('click', $.proxy(this.onNextClick, this));
  }

  // Listen for key clicks, so we can move slides on space bar hit
  $(document.body).on('keyup', $.proxy(this.onKeyUp, this));

};

inherit(VerticalSlides, Component);

VerticalSlides.prototype.Event = {
  SLIDE: 'slide',
  LOADED: 'loaded'
};

VerticalSlides.prototype.bindWaypoint = function() {

  var self = this;

  this.slides.waypoint(function(direction) {
    self.onSlidePassThrough($(this), direction);
  });

  this.waypointElements = this.waypointElements.add(this.slides);

};

/**
 * Called when user clicks on pagination dots
 * @this {VerticalSlides}
 */
VerticalSlides.prototype.onNavigate = function() {

  this.scroll(
    this.slides.eq(this.nav.index).offset().top
  );

  this.setControls(this.nav.index);

};

/**
 * Called when user clicks the next link
 * Advances to next slide, if there is one
 * @this {VerticalSlides}
 */
VerticalSlides.prototype.onNextClick = function() {

  this.next();

};

/**
 * Called when user clicks a slide
 * Advances to next slide, if there is one
 * @this {VerticalSlides}
 */
VerticalSlides.prototype.onSlideClick = function(event) {

  this.next();

};

/**
 * Call on every keyup, but only advances to the next slide
 * if the key pressed is the space bar.
 * @param {jQuery.event} event
 */
VerticalSlides.prototype.onKeyUp = function(event) {

  if(event.which === 32) {

    this.next();

  }

};

/**
 * Navigates exactly one slide forward
 */
VerticalSlides.prototype.next = function() {

  var nextIndex = this.index + 1;

  if(this.count > nextIndex) {
    this.scroll(this.slides.eq(nextIndex).offset().top);
    this.setControls(nextIndex);
  }

};

/**
 * Navigates exactly one slide back
 */
VerticalSlides.prototype.prev = function() {

  var prevIndex = this.index - 1;

  if(prevIndex > -1) {
    this.scroll(this.slides.eq(prevIndex).offset().top);
    this.setControls(prevIndex);
  }

};

/**
 * Called when you scroll to a slide
 * @this {VerticalSlides}
 * @param {jQuery} element `li` that was scrolled to
 * @param {String} direction scrolling direction, "up" or "down"
 */
VerticalSlides.prototype.onSlidePassThrough = function(element) {
  this.setControls(this.slides.index(element));
};

VerticalSlides.prototype.scroll = function(offset) {

  var self = this;

  // Don't trigger the slides waypoints when we force a scroll
  // 580, 'easeOutCirc',
  this.waypointElements.waypoint('disable');

  $('html, body').animate({
    scrollTop: offset
  }, 550, 'easeOutCirc', function() {
    self.waypointElements.waypoint('enable');
  });


};

/**
 * Called when we go to a new slide.
 *
 * @param {number} index the index of the slide to go to
 */
VerticalSlides.prototype.setControls = function(index) {

  var self = this;

  this.index = index;

  if(this.settings.nav) {
    this.nav.set(index);
  }

  // If we are at the last slide of the set, hide the "click to continue" label
  if(this.settings.next) {

    if(this.count - 1 === index) {
      this.settings.next.hide();
    } else {
      this.settings.next.show();

      // We only want to bounce the next link on the first slide
      if(index !== 0) {
        //this.settings.next.removeClass('bounce twice');
      }
    }

  }

  this.pub(this.Event.SLIDE, this.index);

};

/**
 * Sets each indivual slides height to be 100%
 * @param {jQuery.Event} event
 */
VerticalSlides.prototype.setSectionHeight = function(event) {
  this.slides.css({
    height: $(window).outerHeight()
  });
};

/**
 * Hide the loading screen, called on `window.load`
 * @param {jQuery.Event} event
 */
VerticalSlides.prototype.hideLoadingScreen = function(event) {
  this.settings.loadingScreen.fadeOut();
  this.pub(this.Event.LOADED);
};

/**
 * Build out the necessary DOM elements, if the user didn't specify any.
 * Elements may include nav, loading screen or a next button.
 */
VerticalSlides.prototype.buildDOM = function(event) {

  if(this.settings.next === true) {
    this.settings.next = $('<a href="javascript:;" class="vertical-slides-next bottom">Click to Continue</a>')
                        .appendTo(document.body);

    //$(this.settings.next).addClass('bounce twice');

  }

  if(this.settings.nav === true) {
    this.settings.nav = $('<ul />').addClass('vertical-slides-nav vertical-center').appendTo(document.body);
  }
};
