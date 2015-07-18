/*
Name:             bolcom.js
Description:      Module for node.js to access Bol.com Open API service
Author:           Franklin van de Meent (https://frankl.in)
Source:           https://github.com/fvdm/nodejs-bolcom
Bugs & feedback:  https://github.com/fvdm/nodejs-bolcom/issues
License:          Unlicense / Public Domain

Service name:     Bol.com
Service docs:     https://developers.bol.com
*/

var http = require ('httpreq');
var api_key = null;
var api_timeout = 5000;

app = {
  catalog: {},
  utils: {},
  account: {}
};


app.catalog.search = function (props, callback) {
  talk ('catalog', 'search', props, function (err, data) {
    if (!err && data.products instanceof Array) {
      for (var i = 0; i < data.products.length; i++) {
        data.products [i] = cleanProduct (data.products [i]);
      }
    }
    callback (err, data);
  });
};


app.catalog.lists = function (props, callback) {
  talk ('catalog', 'lists', props, function (err, data) {
    if (!err && data.products instanceof Array) {
      for (var i = 0; i < data.products.length; i++) {
        data.products [i] = cleanProduct (data.products [i]);
      }
    }
    callback (err, data);
  });
};


app.catalog.products = function (productId, props, callback) {
  if (typeof props === 'function') {
    var callback = props;
    var props = {};
  }
  talk ('catalog', 'products/'+ productId, props, function (err, data) {
    if (!err && data.products instanceof Array) {
      for (var i = 0; i < data.products.length; i++) {
        data.products [i] = cleanProduct (data.products [i]);
      }
    }
    callback (err, data);
  });
};


app.catalog.offers = function (productId, props, callback) {
  if (typeof props === 'function') {
    var callback = props;
    var props = {};
  }
  talk ('catalog', 'offers/'+ productId, props, function (err, data) {
    if (!err && data.offerData) {
      data = data.offerData;
    }
    callback (err, data);
  });
};


app.catalog.recommendations = function (productId, props, callback) {
  if (typeof props === 'function') {
    var callback = props;
    var props = {};
  }
  talk ('catalog', 'recommendations/'+ productId, props, function (err, data) {
    if (!err && data.products) {
      data = data.products;
      if (data instanceof Array && data.length >= 1) {
        for (var i = 0; i < data.length; i++) {
          data [i] = cleanProduct (data [i]);
        }
      }
    }
    callback (err, data);
  });
};


app.catalog.relatedproducts = function (productId, props, callback) {
  if (typeof props === 'function') {
    var callback = props;
    var props = {};
  }
  talk ('catalog', 'relatedproducts/'+ productId, props, function (err, data) {
    if (!err && data.productFamilies) {
      data = data.productFamilies;
      var tmp = {};
      if (data instanceof Array && data.length >= 1 && data [0] .key) {
        for (var i = 0; i < data.length; i++) {
          tmp [data [i] .key] = data [i];
          if (data [i] .productFamilyMembers instanceof Array) {
            var tmp2 = {};
            for (var m = 0; m < data [i] .productFamilyMembers.length; m++) {
              tmp2 [data [i] .productFamilyMembers [m] .label] = data [i] .productFamilyMembers [m];
            }
            tmp [data [i] .key] .productFamilyMembers = tmp2;
          }
        }
        data = tmp;
      }
    }
    callback (err, data);
  });
};


app.utils.ping = function (callback) {
  talk ('utils', 'ping', callback);
};

app.account.sessions = function (callback) {
  talk ('accounts', 'sessions', callback);
};


// Clean up product
function cleanProduct (product) {
  // urls
  try {
    var purls = {};
    for (var i = 0; u < product.urls.length; u++) {
      var url = product.urls [i];
      purls [url.key] = url;
    }
    product.urls = purls;
  } catch (e) {}

  // images
  try {
    var pimgs = {};
    for (var i = 0; m < product.images.length; m++) {
      var image = product.images [i];
      pimgs [image.key] = image;
    }
    product.images = pimgs;
  } catch (e) {}

  // includeattributes: true
  try {
    if (product.attributeGroups) {
      var groups = {};
      for (var i = 0; g < product.attributeGroups.length; g++) {
        var group = product.attributeGroups [i];
        groups [group.title] = {title: group.title};

        if (group.attributes) {
          groups [group.title] .attributes = {};
          for (var a = 0; a < group.attributes.length; a++) {
            var attrib = group.attributes [a];
            groups [group.title] .attributes [attrib.key] = attrib;
          }
        }
      }
      product.attributeGroups = groups;
    }
  } catch (e) {}

  return product
}


// Communicate
function talk (cat, method, params, callback) {
  if (typeof params === 'function') {
    var callback = params;
    var params = {};
  }
  params = params instanceof Object ? params : {};

  // check api key
  if (typeof api_key === 'string' && api_key.length > 0) {
    params.apikey = api_key;
  } else {
    callback (new Error ('missing apikey'));
    return;
  }

  // build request
  params.format = 'json';

  var url = 'https://api.bol.com/'+ cat +'/v4/'+ method;
  var options = {
    parameters: params,
    headers: {
      'User-Agent': 'npmjs.com/package/bolcom'
    }
  };

  // process response
  http.get (url, options, function (err, res) {
    var data = res && res.body || null;
    var error = null;

    if (err) {
      error = new Error ('request failed');
      error.err = err;
      callback (error);
      return;
    }

    if (res.statusCode !== 200) {
      error = new Error ('API error');
    }

    try {
      data = JSON.parse (data);
    } catch (e) {
      error = new Error ('invalid response');
      error.err = e;
    }

    if (error) {
      error.code = res && res.statusCode || null;
      error.headers = res && res.headers || null;
      error.api = data instanceof Object ? data : {};
      error.body = data instanceof Object ? null : data;
    }

    callback (error, data);
  });
}

module.exports = function (apikey, timeout) {
  api_key = apikey;
  api_timeout = timeout || api_timeout;
  return app;
};
