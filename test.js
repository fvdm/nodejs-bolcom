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
var bol = app (
  process.env.BOLCOM_APIKEY || null,
  process.env.BOLCOM_TIMEOUT || null
);


// API ACCESS
if (!process.env.BOLCOM_APIKEY) {
  dotest.log ('fail', 'API access required, set BOLCOM_APIKEY');
  process.exit ();
}


// TESTS
dotest.add ('utils.ping', function () {
  bol.utils.ping (function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.messages', data && data.message, 'Hello world!')
      .done ();
  });
});

dotest.add ('account.sessions', function () {
  bol.account.sessions (function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isString ('fail', 'data.sessionId', data && data.sessionId)
      .done ();
  });
});

dotest.add ('catalog.search', function () {
  var params = {
    q: 'node.js',
    limit: 1,
    includeattributes: true
  };

  bol.catalog.search (params, function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isCondition ('fail', 'data.totalResultSize', data && data.totalResultSize, '>=', 1)
      .isArray ('fail', 'data.products', data && data.products)
      .isNotEmpty ('fail', 'data.products', data && data.products)
      .isObject ('fail', 'data.products[0]', data && data.products && data.products [0])
      .isString ('fail', 'data.products[0].id', data && data.products && data.products [0] .id)
      .isObject ('fail', 'data.products[0].attributeGroups', data && data.products && data.products [0] .attributeGroups)
      .done ();
  });
});

dotest.add ('catalog.products', function () {
  bol.catalog.products ('9200000023292527', function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isArray ('fail', 'data.products', data && data.products)
      .isObject ('fail', 'data.products[0]', data && data.products && data.products [0])
      .isString ('fail', 'data.products[0].id', data && data.products && data.products [0] .id)
      .done ();
  });
});

dotest.add ('incomplete product', function () {
  bol.catalog.products ('9200000009223738', function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isArray ('fail', 'data.products', data && data.products)
      .isObject ('fail', 'data.products[0]', data && data.products && data.products [0])
      .isUndefined ('fail', 'data.products[0].images', data && data.products && data.products [0] && data.products [0] .images)
      .isString ('fail', 'data.products[0].id', data && data.products && data.products [0] && data.products [0] .id)
      .done ();
  });
});

dotest.add ('catalog.lists', function () {
  bol.catalog.lists ('', function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isCondition ('fail', 'data.totalResultSize', data && data.totalResultSize, '>=', 1)
      .isArray ('fail', 'data.products', data && data.products)
      .isNotEmpty ('fail', 'data.products', data && data.products)
      .isString ('fail', 'data.products[0].id', data && data.products && data.products [0] && data.products [0] .id)
      .done ();
  });
});

dotest.add ('catalog.offers', function () {
  bol.catalog.offers ('9200000023292527', function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isArray ('fail', 'data.offers', data && data.offers)
      .isObject ('fail', 'data.offers[0]', data && data.offers && data.offers [0])
      .isString ('fail', 'data.offers[0[.id', data && data.offers && data.offers [0] && data.offers [0] .id)
      .done ();
  });
});

dotest.add ('catalog.recommendations', function () {
  bol.catalog.recommendations ('9200000023292527', function (err, data) {
    dotest.test (err)
      .isArray ('fail', 'data', data)
      .isObject ('fail', 'data[0]', data && data [0])
      .isString ('fail', 'data[0].id', data && data [0] && data [0] .id)
      .done ();
  });
});

dotest.add ('catalog.relatedproducts', function () {
  bol.catalog.relatedproducts ('9200000010839998', function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isObject ('fail', 'data.BINDINGCODE', data && data.BINDINGCODE)
      .isObject ('fail', 'data.BINDINGCODE.productFamilyMembers', data && data.BINDINGCODE && data.BINDINGCODE.productFamilyMembers)
      .done ();
  });
});

// Start the tests
dotest.run ();
