/*
Name:           bolcom - test.js
Description:    Module for node.js to access Bol.com Open API service
Author:         Franklin (https://fvdm.com)
Source & docs:  https://github.com/fvdm/nodejs-bolcom
License:        Unlicense (Public Domain, see LICENSE file)
*/

const dotest = require ('dotest');
const app = require ('./');

// Setup
// set env BOLCOM_APIKEY  (Travis CI)
const apikey = process.env.BOLCOM_APIKEY || null;
const timeout = process.env.BOLCOM_TIMEOUT || null;

const bol = new app ({
  apikey,
  timeout,
});


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


dotest.add ('utils.ping', async test => {
  let error;
  let data;

  try {
    data = await bol.utils.ping ();
  }
  catch (err) {
    error = err;
  }

  test (err)
    .isObject ('fail', 'data', data)
    .isExactly ('fail', 'data.messages', data && data.message, 'Hello world!')
    .done ();
  ;
});


dotest.add ('account.sessions', async test => {
  let error;
  let data;

  try {
    data = await bol.account.sessions ();
  }
  catch (err) {
    error = err;
  }

  test (error)
    .isObject ('fail', 'data', data)
    .isString ('fail', 'data.sessionId', data && data.sessionId)
    .done ()
  ;
});


dotest.add ('catalog.search', async test => {
  let error;
  let data;

  const params = {
    q: 'node.js',
    limit: 1,
    includeattributes: true,
  };

  try {
    data = await bol.catalog.search (params);
  }
  catch (err) {
    error = err;
  }

  const products = data && data.products;
  const item = products && products[0];

  dataProducts (test, error, data)
    .isObject ('fail', 'data.products[0].attributeGroups', item && item.attributeGroups)
    .done ()
  ;
});


dotest.add ('catalog.products', async test => {
  let error;
  let data;

  try {
    data = await bol.catalog.products ('9200000023292527');
  }
  catch (err) {
    error = err;
  }

  dataProducts (test, error, data).done ();
});


dotest.add ('incomplete product', async test => {
  let error;
  let data;

  try {
    data = await bol.catalog.products ('9200000009223738');
  }
  catch (err) {
    error = err;
  }

  const products = data && data.products;
  const item = products && products[0];

  dataProducts (test, error, data)
    .isUndefined ('fail', 'data.products[0].images', item && item.images)
    .done ()
  ;
});


dotest.add ('catalog.lists', async test => {
  let error;
  let data;

  try {
    data = await bol.catalog.lists ('');
  }
  catch (err) {
    error = err;
  }

  dataProducts (test, error, data).done ();
});


dotest.add ('catalog.offers', async test => {
  let error;
  let data;

  try {
    data = await bol.catalog.offers ('9200000023292527');
  }
  catch (err) {
    error = err;
  }

  const offers = data && data.offers;
  const item = offers && offers[0];

  test (error)
    .isObject ('fail', 'data', data)
    .isArray ('fail', 'data.offers', offers)
    .isObject ('fail', 'data.offers[0]', item)
    .isString ('fail', 'data.offers[0[.id', item && item.id)
    .done ()
  ;
});


dotest.add ('catalog.recommendations', async test => {
  let error;
  let data;

  try {
    data = await bol.catalog.recommendations ('9200000023292527');
  }
  catch (err) {
    error = err;
  }

  const products = data && data.products;
  const item = products && products[0];

  test (error)
    .isObject ('fail', 'data', data)
    .isArray ('fail', 'data.products', products)
    .isObject ('fail', 'data.products[0]', item)
    .isString ('fail', 'data.products[0].id', item && item.id)
    .done ()
  ;
});


dotest.add ('catalog.relatedproducts', async test => {
  let error;
  let data;

  try {
    data = await bol.catalog.relatedproducts ('9200000010839998');
  }
  catch (err) {
    error = err;
  }

  const bind = data && data.BINDINGCODE;

  test (error)
    .isObject ('fail', 'data', data)
    .isObject ('fail', 'data.BINDINGCODE', bind)
    .isObject ('fail', 'data.BINDINGCODE.productFamilyMembers', bind && bind.productFamilyMembers)
    .done ()
  ;
});


// Start the tests
dotest.run ();
