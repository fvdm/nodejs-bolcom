# bolcom

Access the Bol.com Partner Open API with Node.js (unofficial)

[![npm](https://img.shields.io/npm/v/bolcom.svg?maxAge=3600)](https://github.com/fvdm/nodejs-bolcom/blob/master/CHANGELOG.md)
[![Build Status](https://github.com/fvdm/nodejs-bolcom/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/fvdm/nodejs-bolcom/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-bolcom/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-bolcom?branch=master)

* [Node.js](https://nodejs.org/)
* [Bol.com](https://bol.com/)
* [API documentation](https://partnerblog.bol.com/documentatie/open-api/)


## Usage

```js
const BolAPI = require ('bolcom');
const bol = new BolAPI ({
  apikey: 'abc123',
});

bol.catalog.search ({ q: 'node.js' })
  .then (data => {
    for (let p in data.products) {
      product = data.products[p];
      console.log (`${product.title} - € ${product.offerData.offers[0].price}`);
    }
  })
  .catch (err => {
    console.log ('Search failed');
    console.log (err);
  })
;
```


## Requirements

* [node.js](https://nodejs.org)
* Bol.com API key ([read here](https://partnerblog.bol.com/documentatie/open-api/aan-de-slag-2/)) (Dutch)


## Installation

`npm install bolcom`


## Methods

Error handling is not included in the following examples.
See the [Usage](#usage) section above for an example with proper error handling.


### utils.ping
**( )**

Simple API access test. The result `data` should be an _object_ with only one
property named `message` with the exact value `Hello world!!`.


```js
bol.utils.ping().then (data => {
  if (data.message === 'Hello world!!') {
    console.log ('pong');
  }
  else {
    console.log ('ouch');
  }
});
```


### account.sessions
**( )**

Request a new anonymous session ID.


```js
bol.account.sessions()
  .then (data => data.sessionId)
  .then (console.log)
;
```


### catalog.search
**( props )**

Search products in the catalog.

The result `data` is modified to remove a few xml-style annoyances.


param    | type     | description
:--------|:---------|:-----------
props    | object   | search paramaters


```js
bol.catalog.search ({ q: 'node.js' })
  .then (data => {
    for (let i in data.products) {
      let product = data.products[p];
      console.log (`${product.title} - ${product.summary}`);
    }
  })
;
```

* [Example data](https://github.com/fvdm/nodejs-bolcom/wiki/catalog.search)
* [API documentation](https://partnerblog.bol.com/documentatie/open-api/handleiding/api-requests/catalog/get-catalogv4search/)


### catalog.lists
**( [props] )**

Product lists, based on list type and category.


param    | type     | description
:--------|:---------|:-----------
[props]  | object   | Arguments, see API documentation


* [Example data](https://github.com/fvdm/nodejs-bolcom/wiki/catalog.lists)
* [API documentation](https://partnerblog.bol.com/documentatie/open-api/handleiding/api-requests/catalog/get-catalogv4lists/)


### catalog.products
**( productId, [props] )**

Get details information for one or more products.


param     | type     | description
:---------|:---------|:-----------
productId | string   | Product ID
[props]   | object   | Arguments, see API documentation


```js
bol.catalog.products ('9200000023292527', {
  includeattributes: true,
})
  .then (data => {
    for (let p in data.products) {
      let product = data.products[p];
      console.log (product.title + ' - €' + product.offerData.offers[0].price);
    }
  })
;
```

* [Example data](https://github.com/fvdm/nodejs-bolcom/wiki/catalog.products)
* [API documentation](https://partnerblog.bol.com/documentatie/open-api/handleiding/api-requests/catalog/get-catalogv4products/)


### catalog.offers
**( productId, [props] )**

Get available offers for a given product.


param     | type     | description
:---------|:---------|:-----------
productId | string   | Product ID
[props]   | object   | Arguments, see API documentation


```js
bol.catalog.offers ('9200000023292527')
  .then (data => {
    for (let i in data.offers) {
      let offer = data.offers[i];
      console.log (offer.price + ' - ' + offer.availabilityDescription);
    }
  })
;
```

* [Example data](https://github.com/fvdm/nodejs-bolcom/wiki/catalog.offers)
* [API documentation](https://partnerblog.bol.com/documentatie/open-api/handleiding/api-requests/catalog/get-catalogv4offers/)


### catalog.recommendations
**( productId, [props] )**

Get recommended products for a given product.


param     | type     | description
:---------|:---------|:-----------
productId | string   | Product ID
[props]   | object   | Arguments, see API documentation


```js
bol.catalog.recommendations ('9200000023292527')
  .then (data => {
    for (let i in data) {
      let product = data[i];
      console.log (product.title + ' - ' + product.rating);
    }
  })
;
```

* [Example data](https://github.com/fvdm/nodejs-bolcom/wiki/catalog.recommendations)
* [API documentation](https://partnerblog.bol.com/documentatie/open-api/handleiding/api-requests/catalog/get-catalogv4recommendations/)


### catalog.relatedproducts
**( productId, [props] )**

Get related products for a given product.


param     | type   | description
:---------|:-------|:-----------
productId | string | Product ID
[props]   | object | Arguments, see API documentation


```js
bol.catalog.relatedproducts ('9200000010839998')
  .then (data => data.BINDINGCODE)
  .then (data => data.productFamilyMembers)
  .then (data => {
    for (let m in data) {
      let mem = data[m];

      console.log (mem.label + ' - ' + mem.productId);
    }
  })
;
```

* [Example data](https://github.com/fvdm/nodejs-bolcom/wiki/catalog.relatedproducts)
* [API documentation](https://partnerblog.bol.com/documentatie/open-api/handleiding/api-requests/catalog/get-catalogv4relatedproducts/)


## Errors

message          | description
:----------------|:-----------
missing apikey   | Credentials are not set


## Unlicense

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org/>


## Author

[Franklin](https://fvdm.com)
| [Buy me a coffee](https://fvdm.com/donating)
