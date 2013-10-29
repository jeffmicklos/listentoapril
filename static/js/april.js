April = {

  init: function() {

    this.w = $(window);
    this.video = $('video');
    this.footer = $('.footer');
    this.container = $('.container');
    this.contentContainer = $('.content');
    this.loadingScreen = $('.loading-screen');

    // A Firebase object will eventually fill this variable
    this.store = null;

    this.arrangeElements();
    this.w.on('resize', $.proxy(this.arrangeElements, this));
    $('.download-link').on('click', $.proxy(this.onDownload, this));
    $('.email').on('submit', $.proxy(this.onEmailSubmit, this));

    // Once the video is ready to play, fade out the loading screen
    if(!this.video.get(0)) {
      this.hideLoadingScreen();
    } else if(this.video.get(0).buffered.length) {
      this.hideLoadingScreen();
    } else {
      this.video.on('canplay', $.proxy(this.hideLoadingScreen, this));
    }

    this.getScript('https://cdn.firebase.com/v0/firebase.js', $.proxy(this.onFirebaseLoad, this));

  },

  arrangeElements: function() {
    this.fitVideo();
    this.verticalCenter(this.contentContainer);
    this.horizontalCenter(this.contentContainer);
    this.container.css('height', this.w.height());
    this.footer.css('top', this.w.height());
  },

  hideLoadingScreen: function() {
    var self = this;
    this.loadingScreen.animate({
      opacity: 0
    }, 1000, 'ease', function() {
      self.loadingScreen.remove();
    });
  },

  onDownload: function() {
    ga('send', 'event', 'Music', 'Download', 'I Know You Are But What Am I');

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

  },

  onEmailSubmit: function(event) {
    
    event.preventDefault();

    var button = $('.email-submit');
    var email = $('.email-value').val();
    var userRef;

    // very dumb validation for now
    if(email !== '' && email.indexOf('@') !== -1 && this.store) {
      console.log('hy')
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

    this.w.on('load', function() {
      setTimeout(function() {
        self.footer.animate({
          top: self.w.height() - self.footer.find('form').height()
        }, 400, 'ease-in');
      }, 2000);
    });

  },

  fitVideo: function() {
    var videoW = 960;
    var videoH = 544;
    var windowW = this.w.width();
    var windowH = this.w.height();

    var videoRatio = videoW / videoH;
    var windowRatio = windowW / windowH;

    if(windowRatio < videoRatio) {
      this.video.css({
        height: '100%',
        width: 'auto'
      });
    } else {
      this.video.css({
        height: 'auto',
        width: '100%',
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

};