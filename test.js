/*
Name:           bolcom - test.js
Description:    Module for node.js to access Bol.com Open API service
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-bolcom
Feedback:       https://github.com/fvdm/nodejs-bolcom/issues
License:        Unlicense (Public Domain, see LICENSE file)
                (https://github.com/fvdm/nodejs-bolcom/raw/develop/LICENSE)
*/

var dotest = require ('dotest');
var app = require ('./');

// Setup
// set env BOLCOM_APIKEY  (Travis CI)
var apikey = process.env.BOLCOM_APIKEY || null;
var timeout = process.env.BOLCOM_TIMEOUT || null;

var bol = app (apikey, timeout);


// API ACCESS
if (!process.env.BOLCOM_APIKEY) {
  dotest.log ('fail', 'API access required, set BOLCOM_APIKEY');
  process.exit ();
}


/**
 * Check data and products result
 *
 * @param   {Test}        test  doTest.test() chain
 * @param   {Error|null}  err   Callback error
 * @param   {object}      data  Callback data
 * @return  {Test}              Processed doTest.test() chain
 */

function dataProducts (test, err, data) {
  var products = data && data.products;
  var item = products && products[0];

  return test (err)
    .isObject ('fail', 'data', data)
    .isCondition ('fail', 'data.totalResultSize', data && data.totalResultSize, '>=', 1)
	  .isArray ('fail', 'data.products', products)
	  .isObject ('fail', 'data.products[0]', item)
	  .isString ('fail', 'data.products[0].id', item && item.id);
}


dotest.add ('utils.ping', function (test) {
  bol.utils.ping (function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.messages', data && data.message, 'Hello world!')
      .done ();
  });
});

dotest.add ('account.sessions', function (test) {
  bol.account.sessions (function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isString ('fail', 'data.sessionId', data && data.sessionId)
      .done ();
  });
});

dotest.add ('catalog.search', function (test) {
  var params = {
    q: 'node.js',
    limit: 1,
    includeattributes: true
  };

  bol.catalog.search (params, function (err, data) {
    dataProducts (err, data)
      .isObject ('fail', 'data.products[0].attributeGroups', item && item.attributeGroups)
      .done ();
  });
});

dotest.add ('catalog.products', function (test) {
  bol.catalog.products ('9200000023292527', function (err, data) {
    dataProducts (err, data)
      .done ();
  });
});

dotest.add ('incomplete product', function (test) {
  bol.catalog.products ('9200000009223738', function (err, data) {
    dataProducts (err, data)
      .isUndefined ('fail', 'data.products[0].images', item && item.images)
      .done ();
  });
});

dotest.add ('catalog.lists', function (test) {
  bol.catalog.lists ('', function (err, data) {
    dataProducts (err, data)
      .done ();
  });
});

dotest.add ('catalog.offers', function (test) {
  bol.catalog.offers ('9200000023292527', function (err, data) {
    var offers = data && data.offers;
    var item = offers && offers[0];

    test (err)
      .isObject ('fail', 'data', data)
      .isArray ('fail', 'data.offers', offers)
      .isObject ('fail', 'data.offers[0]', item)
      .isString ('fail', 'data.offers[0[.id', item && item.id)
      .done ();
  });
});

dotest.add ('catalog.recommendations', function (test) {
  bol.catalog.recommendations ('9200000023292527', function (err, data) {
    test (err)
      .isArray ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data [0])
      .isString ('fail', 'data[0].id', data && data [0] && data [0] .id)
      .done ();
  });
});

dotest.add ('catalog.relatedproducts', function (test) {
  bol.catalog.relatedproducts ('9200000010839998', function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isObject ('fail', 'data.BINDINGCODE', data && data.BINDINGCODE)
      .isObject ('fail', 'data.BINDINGCODE.productFamilyMembers', data && data.BINDINGCODE && data.BINDINGCODE.productFamilyMembers)
      .done ();
  });
});

// Start the tests
dotest.run ();
