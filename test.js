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
    .isString ('fail', 'data.products[0].id', item && item.id)
  ;
}


dotest.add ('ping', async test => {
  let error;
  let data;

  try {
    data = await bol.ping ();
  }
  catch (err) {
    error = err;
  }

  test (error)
    .isObject ('fail', 'data', data)
    .isExactly ('warn', 'data.Message', data && data.Message, 'Hello World!')
    .done ()
  ;
});


dotest.add ('catalogSearch', async test => {
  let error;
  let data;

  const params = {
    q: 'node.js',
    limit: 1,
    includeattributes: true,
  };

  try {
    data = await bol.catalogSearch (params);
  }
  catch (err) {
    error = err;
  }

  dataProducts (test, error, data)
    .isArray ('fail', 'data.products', data && data.products)
    .done ()
  ;
});


dotest.add ('catalogProducts', async test => {
  let error;
  let data;

  try {
    data = await bol.catalogProducts ({
      productId: '9200000023292527',
    });
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
    data = await bol.catalogProducts ({
      productId: '9200000009223738',
    });
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


dotest.add ('catalogLists', async test => {
  let error;
  let data;

  try {
    data = await bol.catalogLists ();
  }
  catch (err) {
    error = err;
  }

  dataProducts (test, error, data).done ();
});


dotest.add ('catalogOffers', async test => {
  let error;
  let data;

  try {
    data = await bol.catalogOffers ({
      productId: '9200000023292527',
    });
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


dotest.add ('catalogRecommendations', async test => {
  let error;
  let data;

  try {
    data = await bol.catalogRecommendations ({
      productId: '9200000023292527',
    });
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


dotest.add ('catalogRelatedProducts', async test => {
  let error;
  let data;

  try {
    data = await bol.catalogRelatedProducts ({
      productId: '9200000010839998',
    });
  }
  catch (err) {
    error = err;
  }

  test (error)
    .isObject ('fail', 'data', data)
    .done ()
  ;
});


dotest.add ('searchSuggestions - results', async test => {
  let error;
  let data;

  try {
    data = await bol.searchSuggestions ({
      term: 'potter',
      xcat: 'books_en',
    });
  }
  catch (err) {
    error = err;
  }

  test (error)
    .isArray ('fail', 'data', data)
    .isNotEmpty ('warn', 'data', data)
    .done()
  ;
});


dotest.add ('searchSuggestions - error', async test => {
  let error;
  let data;

  try {
    data = await bol.searchSuggestions ({
      term: '',
    });
  }
  catch (err) {
    error = err;
  }

  test ()
    .isError ('fail', 'error', error)
    .isUndefined ('fail', 'data', data)
    .done()
  ;
});


dotest.add ('API error', async test => {
  const tmp = new app ({
    apikey: '',
  });

  let error;
  let data;

  try {
    data = await tmp.ping();
  }
  catch (err) {
    error = err;
  }

  test()
    .isError ('fail', 'error', error)
    .isNumber ('fail', 'error.status', error && error.status)
    .isUndefined ('fail', 'data', data)
    .done()
  ;
});


// Start the tests
dotest.run ();
