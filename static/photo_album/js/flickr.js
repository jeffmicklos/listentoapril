/**
 * == flickr ==
 **/

/** section: flickr
 * Flickr
 **/
Flickr = {
  /**
   * class Flickr.Client
   * Provides a JavaScript API to methods in the Flickr web service API.
   **/

    /**
     * new Flickr.Client(key)
     * - key (String): Your site's Flickr API key
     * Clients are instantiated using a Flickr API key. If none is provided, the
     * value of `Flickr.API_KEY` is used instead.
     **/
  initialize: function(key) {
    this._key = key || Flickr.API_KEY;
    return this;
  },
  
  /**
   * Flickr.Client#call(method, params, callback, scope) -> undefined
   * - method (String)
   * - params (Object)
   * - callback (Function)
   * - scope (Object)
   * 
   * Calls the named `method` in the Flickr JSONP API, with the given set
   * of `params`. The `callback` is called in the given `scope` with the
   * response from the JSONP service.
   **/
  call: function(method, params, callback, scope) {
    method = /^flickr\./.test(method) ? method : 'flickr.' + method;

    params = $.extend({}, {
      method:   method,
      api_key:  this._key,
      //extras: 'url_l,description,media,url_o,url_n,url_z',
      jsonp: true,
      crossDomain: true,
      format: 'json',
      id: '48016199@N07',
      dataType: 'jsonp',
      jsoncallback: '__hey__'
    }, params || {});


    window.__hey__ = function(resp) {
      return callback(resp);
    };


    // http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=2edd77c4568bd540de45ae2e4c3d693a&user_id=48016199%40N07&extras=url_l&format=json&api_sig=7ef5b154707d32265e6c636e74258a80

    
    //var flickerAPI = "http://api.flickr.com/services/rest/photos_public.gne";
    
    $.ajax(Flickr.REST_ENDPOINT + '?' + $.param(params) + '&extras=url_l,description,media,url_o,url_n,url_z', params);

      /*function(data) {
      debugger;
      $.each( data.items, function( i, item ) {
        $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
        if ( i === 3 ) {
          return false;
        }
      });
    }*/



    //Flickr.JSONP.request(Flickr.REST_ENDPOINT, params, callback, scope);
  },
  
  /**
   * Flickr.Client#feed(path, params, callback, scope) -> undefined
   * - path (String)
   * - params (Object)
   * - callback (Function)
   * - scope (Object)
   * 
   * Fetches the named feed and calls `callback` in the given `scope` with
   * the response from the JSONP feed service.
   **/
  feed: function(path, params, callback, scope) {
    path = /\.gne$/.test(path) ? path : path + '.gne';
    Flickr.JSONP.request(Flickr.FEED_ENDPOINT + path, params, callback, scope);
  },
  
  /**
   * Flickr.Client#findByUsername(username, callback, scope) -> undefined
   * - username (String)
   * - callback (Function)
   * - scope (Object)
   **/
  findByUsername: function(username, callback, scope) {
    this.call('people.findByUsername', {username: username}, callback, scope);
  },
  
  /**
   * Flickr.Client#getUserId(username, callback, scope) -> undefined
   * - username (String)
   * - callback (Function)
   * - scope (Object)
   **/
  getUserId: function(username, callback, scope) {
    this.findByUsername(username, function(data) {
      callback.call(scope, data.user.id);
    });
  },
  
  /**
   * Flickr.Client#publicPhotos(id, callback, scope) -> undefined
   * - id (String)
   * - callback (Function)
   * - scope (Object)
   **/
  publicPhotos: function(id, callback, scope) {
    var extras = ['media', 'description', 'o_url'].join(',');
    this.call('people.getPublicPhotos', {user_id: id, extras: extras}, callback, scope);
  },
  
  /**
   * Flickr.Client#getPublicPhotos(id, callback, scope) -> undefined
   * - id (String)
   * - callback (Function)
   * - scope (Object)
   *
   * Feed items are wrapped as `Flickr.Photo` objects.
   **/
  getPublicPhotos: function(id, callback, scope) {
    var wrap = this._wrapPhotos;
    this.publicPhotos(id, function(data) {
      callback.call(scope, wrap(data.photos, 'photo'));
    });
  },
  
  /**
   * Flickr.Client#photosOf(id, callback, scope) -> undefined
   * - id (String)
   * - callback (Function)
   * - scope (Object)
   **/
  photosOf: function(id, callback, scope) {
    this.call('people.getPhotosOf', {user_id: id}, callback, scope);
  },
  
  /**
   * Flickr.Client#photosOf(id, callback, scope) -> undefined
   * - id (String)
   * - callback (Function)
   * - scope (Object)
   *
   * Feed items are wrapped as `Flickr.Photo` objects.
   **/
  getPhotosOf: function(id, callback, scope) {
    var wrap = this._wrapPhotos;
    this.photosOf(id, function(data) {
      callback.call(scope, wrap(data.photos, 'photo'));
    });
  },

  /**
   * Flickr.Client#getFavourites(id, callback, scope) -> undefined
   * - id (String)
   * - callback (Function)
   * - scope (Object)
   * 
   * Feed items are wrapped as `Flickr.Photo` objects.
   **/
  getFavourites: function(id, callback, scope) {
    var wrap = this._wrapPhotos;
    this.photoFavourites(id, function(data) {
      callback.call(scope, wrap(data));
    });
  },
  
  /**
   * Flickr.Client#_wrapPhotos(data) -> Array
   * - data (Array)
   * 
   * Takes a list of feed items from the Flickr API and wraps them up as
   * instances of `Flickr.Photo`.
   **/
  _wrapPhotos: function(data, name) {
    name = name || 'items';
    var photos = [];
    for (var i = 0, n = data[name].length; i < n; i++)
      photos.push(new Flickr.Photo(data[name][i]));
    return photos;
  },

  API_KEY:        null,
  REST_ENDPOINT:  'http://api.flickr.com/services/rest/',
  FEED_ENDPOINT:  'http://api.flickr.com/services/feeds/'
};