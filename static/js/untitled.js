var jsonResult = [];

var getVines = function(page) {
  if (page < 2) {
    $.getJSON('/api/', {action: 'more', page: page, vt: '1', oid: 'wdcyQsaHAFu'}, function(data) {
      console.log(data)
      for(result in data.results) {
        jsonResult.push(result);
      }

      getVines(page + 1);
    });
  }
};

getVines(0);
