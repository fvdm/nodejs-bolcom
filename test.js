/*
Name:           bolcom - test.js
Description:    Module for node.js to access Bol.com Open API service
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-bolcom
Feedback:       https://github.com/fvdm/nodejs-bolcom/issues
License:        Unlicense (Public Domain, see LICENSE file)
                (https://github.com/fvdm/nodejs-bolcom/raw/develop/LICENSE)
*/

const dotest = require ('dotest');
const app = require ('./');

// Setup
// set env BOLCOM_APIKEY  (Travis CI)
const apikey = process.env.BOLCOM_APIKEY || null;
const timeout = process.env.BOLCOM_TIMEOUT || null;

const bol = app (apikey, timeout);


/**
 * Check data and products result
 *
 * @return  {Test}              Processed doTest.test() chain
 *
 * @param   {Test}        test  doTest.test() chain
 * @param   {Error|null}  err   Callback error
 * @param   {object}      data  Callback data
 */

function dataProducts (test, err, data) {
  const products = data && data.products;
  const item = products && products[0];

  return test (err)
    .isObject ('fail', 'data', data)
    .isArray ('fail', 'data.products', products)
    .isObject ('fail', 'data.products[0]', item)
    .isString ('fail', 'data.products[0].id', item && item.id);
}


dotest.add ('utils.ping', (test) => {
  bol.utils.ping ((err, data) => {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.messages', data && data.message, 'Hello world!')
      .done ();
  });
});


dotest.add ('account.sessions', (test) => {
  bol.account.sessions ((err, data) => {
    test (err)
      .isObject ('fail', 'data', data)
      .isString ('fail', 'data.sessionId', data && data.sessionId)
      .done ();
  });
});


dotest.add ('catalog.search', (test) => {
  const params = {
    q: 'node.js',
    limit: 1,
    includeattributes: true
  };

  bol.catalog.search (params, (err, data) => {
    const products = data && data.products;
    const item = products && products[0];

    dataProducts (test, err, data)
      .isObject ('fail', 'data.products[0].attributeGroups', item && item.attributeGroups)
      .done ();
  });
});


dotest.add ('catalog.products', (test) => {
  bol.catalog.products ('9200000023292527', (err, data) => {
    dataProducts (test, err, data)
      .done ();
  });
});


dotest.add ('incomplete product', (test) => {
  bol.catalog.products ('9200000009223738', (err, data) => {
    const products = data && data.products;
    const item = products && products[0];

    dataProducts (test, err, data)
      .isUndefined ('fail', 'data.products[0].images', item && item.images)
      .done ();
  });
});


dotest.add ('catalog.lists', (test) => {
  bol.catalog.lists ('', (err, data) => {
    dataProducts (test, err, data)
      .done ();
  });
});


dotest.add ('catalog.offers', (test) => {
  bol.catalog.offers ('9200000023292527', (err, data) => {
    const offers = data && data.offers;
    const item = offers && offers[0];

    test (err)
      .isObject ('fail', 'data', data)
      .isArray ('fail', 'data.offers', offers)
      .isObject ('fail', 'data.offers[0]', item)
      .isString ('fail', 'data.offers[0[.id', item && item.id)
      .done ();
  });
});


dotest.add ('catalog.recommendations', (test) => {
  bol.catalog.recommendations ('9200000023292527', (err, data) => {
    const products = data && data.products;
    const item = products && products[0];

    test (err)
      .isObject ('fail', 'data', data)
      .isArray ('fail', 'data.products', products)
      .isObject ('fail', 'data.products[0]', item)
      .isString ('fail', 'data.products[0].id', item && item.id)
      .done ();
  });
});


dotest.add ('catalog.relatedproducts', (test) => {
  bol.catalog.relatedproducts ('9200000010839998', (err, data) => {
    const bind = data && data.BINDINGCODE;

    test (err)
      .isObject ('fail', 'data', data)
      .isObject ('fail', 'data.BINDINGCODE', bind)
      .isObject ('fail', 'data.BINDINGCODE.productFamilyMembers', bind && bind.productFamilyMembers)
      .done ();
  });
});


// Start the tests
dotest.run ();
