April = $.extend(window.April || {}, {

  init: function() {
    var self = this;

    this.w = $(window);
    this.footer = $('.footer');
    this.container = $('.container');
    this.contentContainer = $('.content');
    this.loadingScreen = $('.loading-screen');
    this.index = 0;

    // A Firebase object will eventually fill this variable
    this.store = null;

    this.arrangeElements();
    this.w.on('resize', $.proxy(this.arrangeElements, this));
    $('.download-link').on('click', $.proxy(this.onDownload, this));
    $('.email').on('submit', $.proxy(this.onEmailSubmit, this));

    var pathArray = window.location.pathname.split('/');
    var songTitle = pathArray[2];
    var songElement = $('.container[data-permalink='+songTitle+']');

    if(songElement.length) {
      this.index = songElement.index();
      window.scrollTo(0, songElement.offset().top);
    } else {
      window.scrollTo(0, 1);
    }

    this.scrollWatcher = new ScrollWatcher();

    this.scrollWatcher.on('scrollup', function() {
      var peviousIndex = self.index - 1;
      var prev = self.container.eq(peviousIndex);

      if(peviousIndex >= 0) {
        $('html, body').animate({
          scrollTop: prev.offset().top
        }, 500).promise().done(function() {
          self.index = peviousIndex;

          if(history.pushState) {
            window.history.pushState({}, '', '/song/' + prev.data('permalink'));
          }
        });
      
      }
    });

    this.scrollWatcher.on('scrolldown', function() {
      var nextIndex = self.index + 1;
      var next = self.container.eq(nextIndex);

      if(self.container.length - 1 >= nextIndex) {
        $('html, body').animate({
          scrollTop: next.offset().top
        }, 500).promise().done(function(){
          self.index = nextIndex;

          if(history.pushState) {
            window.history.pushState({}, '', '/song/' + next.data('permalink'));
          }
        });
      }
    });

    this.hideLoadingScreen();

    this.getScript('https://cdn.firebase.com/v0/firebase.js', $.proxy(this.onFirebaseLoad, this));
  },

  arrangeElements: function() {
    this.verticalCenter(this.contentContainer);
    this.horizontalCenter(this.contentContainer);
    this.container.css('height', this.w.height());
  },

  hideLoadingScreen: function() {
    var self = this;

    this.loadingScreen.velocity({
      opacity: 0
    }, {
      duration: 1000,
      easing: [0.175, 0.885, 0.32, 1.275],
      complete: function() {
        self.loadingScreen.remove();
      }
    });
 
  },

  onDownload: function(event) {
    ga('send', 'event', 'Music', 'Download', $(event.currentTarget).data('song'));
    /*
    var fb_param = {};
    fb_param.pixel_id = '6009099589898';
    fb_param.value = '0.00';
    fb_param.currency = 'USD';
    (function(){
      var fpw = document.createElement('script');
      fpw.async = true;
      fpw.src = '//connect.facebook.net/en_US/fp.js';
      var ref = document.getElementsByTagName('script')[0];
      ref.parentNode.insertBefore(fpw, ref);
    })();
    */

  },

  onEmailSubmit: function(event) {

    event.preventDefault();

    var button = $('.email-submit');
    var email = $('.email-value').val();
    var userRef;

    // very dumb validation for now
    if(email !== '' && email.indexOf('@') !== -1 && this.store) {
      userRef = this.store.push();
      userRef.child('timestamp').set(Firebase.ServerValue.TIMESTAMP);
      userRef.child('data').set({
        email: email
      });

      button.val('Thank You <3');

    } else {
      button.val('Try Again');
    }

  },

  onFirebaseLoad: function() {

    var self = this;

    this.store = new Firebase('https://april.firebaseio.com/');

    if(!IS_MOBILE) {
      this.w.on('load', function() {
        setTimeout(function() {
          self.footer.velocity({
            bottom: 0
          }, {duration: 500, easing: [0.175, 0.885, 0.32, 1.275]});
        }, 2000);
      });
    }

  },

  verticalCenter: function(element) {
    var position = element.css('position') == 'relative' ? 'relative' : null;
    element.css({
      position: position || 'absolute',
      top: '50%',
      marginTop: -(element.height() / 2)
    });
  },

  horizontalCenter: function(element) {
    var position = element.css('position') == 'relative' ? 'relative' : null;
    element.css({
      position:  position || 'absolute',
      left: '50%',
      marginLeft: -(element.width() / 2)
    });
  },

  getScript: function(src, func) {
    var script = document.createElement('script');
    script.async = 'async';
    script.src = src;
    if(func) {
      script.onload = func;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
  }

});
