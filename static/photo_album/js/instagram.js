Instagram = {

  get: function(userId, callback) {

    window.__instagramCallback__ = function(feed) {
      callback(feed);
    };

    var params = {
      client_id: '9d1fc7a0a5a34f9ab49bf4511b7ed26d',
      crossDomain: true,
      dataType: 'script',
      jsoncallback: '__instagramCallback__',
      callback: '__instagramCallback__'
    };

    $.ajax(
      'https://api.instagram.com/v1/users/'+userId+'/media/recent/?' + $.param(params),
      params
    );

  }

};