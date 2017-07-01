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

const http = require ('httpreq');

const settings = {
  apikey: null,
  sessionId: null,
  timeout: 5000
};


/**
 * Clean up product data
 *
 * @param product {object} - Object to clean
 * @returns product {object} - Cleaned object
 */

function cleanProduct (product) {
  let purls = {};
  let pimgs = {};
  let groups = {};

  let group;
  let image;
  let attrib;
  let url;
  let i;
  let a;

  // urls
  try {
    for (i = 0; i < product.urls.length; i++) {
      url = product.urls [i];
      purls [url.key] = url;
    }
    product.urls = purls;
  } catch (e) {
    // skip
  }

  // images
  try {
    for (i = 0; i < product.images.length; i++) {
      image = product.images [i];
      pimgs [image.key] = image;
    }

    product.images = pimgs;
  } catch (e) {
    // skip
  }

  // includeattributes: true
  try {
    if (product.attributeGroups) {
      for (i = 0; i < product.attributeGroups.length; i++) {
        group = product.attributeGroups [i];
        groups [group.title] = {
          title: group.title
        };

        if (group.attributes) {
          groups [group.title] .attributes = {};

          for (a = 0; a < group.attributes.length; a++) {
            attrib = group.attributes [a];
            groups [group.title] .attributes [attrib.key] = attrib;
          }
        }
      }

      product.attributeGroups = groups;
    }
  } catch (e) {
    // skip
  }

  return product;
}


/**
 * Process HTTP response
 *
 * @callback callback
 * @param err {Error,null} - Error instance
 * @param res {object} - Response object
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function processResponse (err, res, callback) {
  let data = '';
  let error = null;

  res = res || {
    body: '',
    statusCode: null
  };

  if (err) {
    error = new Error ('request failed');
    error.err = err;
    callback (error);
    return;
  }

  if (res.statusCode >= 300) {
    error = new Error ('API error');
  }

  try {
    data = JSON.parse (res.body);
  } catch (e) {
    error = new Error ('invalid response');
    error.err = e;
  }

  if (error) {
    error.code = res.statusCode;
    error.api = data instanceof Object ? data : {};
    error.body = data instanceof Object ? null : res.body;

    callback (error);
    return;
  }

  callback (null, data);
}


/**
 * Communication with API
 *
 * @callback callback
 * @param cat {string} - api.bol.com/:CAT/v4/method
 * @param method {string} - api.bol.com/cat/v4/:METHOD
 * @param [params] {object} - Request paramaters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function talk (cat, method, params, callback) {
  const options = {
    url: 'https://api.bol.com/' + cat + '/v4/' + method,
    method: 'GET',
    timeout: settings.timeout,
    headers: {
      'User-Agent': 'bolcom.js (https://www.npmjs.com/package/bolcom)'
    }
  };

  // params is optional
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  // check api key
  if (!settings.apikey) {
    callback (new Error ('missing apikey'));
    return;
  }

  // check session ID
  if (settings.sessionId) {
    options.headers ['X-OpenAPI-Session-ID'] = settings.sessionId;
  }

  params = params instanceof Object ? params : {};
  params.apikey = settings.apikey;
  params.format = 'json';
  options.parameters = params;

  // process response
  http.doRequest (options, (err, res) => {
    processResponse (err, res, callback);
  });
}


/**
 * Method: utils.ping
 *
 * @callback callback
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function methodUtilsPing (callback) {
  talk ('utils', 'ping', callback);
}


/**
 * Method: account.sessions
 *
 * @callback callback
 * @returns {void}
 */

function methodAccountSessions (callback) {
  talk ('accounts', 'sessions', callback);
}


/**
 * Method: catalog.search
 *
 * @callback callback
 * @param props {object} - Method parameters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function methodCatalogSearch (props, callback) {
  talk ('catalog', 'search', props, (err, data) => {
    let i;

    if (err) {
      callback (err);
      return;
    }

    if (data.products instanceof Array) {
      for (i = 0; i < data.products.length; i++) {
        data.products [i] = cleanProduct (data.products [i]);
      }
    }

    callback (err, data);
  });
}


/**
 * Method: catalog.lists
 *
 * @callback callback
 * @param props {object} - Method parameters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function methodCatalogLists (props, callback) {
  talk ('catalog', 'lists', props, (err, data) => {
    let i;

    if (err) {
      callback (err);
      return;
    }

    if (data.products instanceof Array) {
      for (i = 0; i < data.products.length; i++) {
        data.products [i] = cleanProduct (data.products [i]);
      }
    }

    callback (err, data);
  });
}


/**
 * Method: catalog.products
 *
 * @callback callback
 * @param productId {string} - Product ID
 * @param [props] {object} - Method parameters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function methodCatalogProducts (productId, props, callback) {
  if (typeof props === 'function') {
    callback = props;
    props = {};
  }

  talk ('catalog', 'products/' + productId, props, (err, data) => {
    let i;

    if (err) {
      callback (err);
      return;
    }

    if (data.products instanceof Array) {
      for (i = 0; i < data.products.length; i++) {
        data.products [i] = cleanProduct (data.products [i]);
      }
    }

    callback (err, data);
  });
}


/**
 * Method: catalog.offers
 *
 * @callback callback
 * @param productId {string} - Product ID
 * @param [props] {object} - Method parameters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function methodCatalogOffers (productId, props, callback) {
  if (typeof props === 'function') {
    callback = props;
    props = {};
  }

  talk ('catalog', 'offers/' + productId, props, (err, data) => {
    if (err) {
      callback (err);
      return;
    }

    if (data.offerData) {
      data = data.offerData;
    }

    callback (err, data);
  });
}


/**
 * Method: catalog.recommendations
 *
 * @callback callback
 * @param productId {string} - Product ID
 * @param [props] {object} - Method parameters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function methodCatalogRecommendations (productId, props, callback) {
  if (typeof props === 'function') {
    callback = props;
    props = {};
  }

  talk ('catalog', 'recommendations/' + productId, props, (err, data) => {
    let i;

    if (err) {
      callback (err);
      return;
    }

    if (data.products) {
      data = data.products;

      if (data instanceof Array && data.length >= 1) {
        for (i = 0; i < data.length; i++) {
          data [i] = cleanProduct (data [i]);
        }
      }
    }

    callback (err, data);
  });
}


/**
 * Method: catalog.relatedproducts
 *
 * @callback callback
 * @param productId {string} - Product ID
 * @param [props] {object} - Method parameters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function methodCatalogRelatedProducts (productId, props, callback) {
  if (typeof props === 'function') {
    callback = props;
    props = {};
  }

  talk ('catalog', 'relatedproducts/' + productId, props, (err, data) => {
    let tmp = {};
    let tmp2 = {};
    let i;
    let m;

    if (err) {
      callback (err);
      return;
    }

    if (data.productFamilies) {
      data = data.productFamilies;

      if (data instanceof Array && data.length >= 1 && data [0] .key) {
        for (i = 0; i < data.length; i++) {
          tmp [data [i] .key] = data [i];

          if (data [i] .productFamilyMembers instanceof Array) {
            tmp2 = {};

            for (m = 0; m < data [i] .productFamilyMembers.length; m++) {
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
}


/**
 * Method: account.wishlists
 *
 * @callback callback
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function methodAccountWishlists (callback) {
  talk ('accounts', 'wishlists', callback);
}


/**
 * Module setup
 *
 * @param apikey {string} - Your Bol.com API key
 * @param [timeout] {number=5000} - Request time out in ms
 * @returns {object} - Module interface
 */

module.exports = (apikey, sessionId, timeout) => {
  if (typeof sessionId === 'number') {
    timeout = sessionId;
    sessionId = null;
  }

  settings.apikey = apikey;
  settings.sessionId = sessionId;
  settings.timeout = timeout || settings.timeout;

  return {
    catalog: {
      search: methodCatalogSearch,
      lists: methodCatalogLists,
      products: methodCatalogProducts,
      offers: methodCatalogOffers,
      recommendations: methodCatalogRecommendations,
      relatedproducts: methodCatalogRelatedProducts
    },
    utils: {
      ping: methodUtilsPing
    },
    account: {
      sessions: methodAccountSessions,
      wishlists: methodAccountWishlists
    }
  };
};
