# bolcom

Access the Bol.com Partner Open API with Node.js (unofficial)

> **[Deprecation announcement](https://github.com/fvdm/nodejs-bolcom/issues/28)**

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

bol.catalogSearch ({
  q: 'node.js',
})
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


### ping
**( )**

Simple API access test. The result `data` should be an _object_ with only one
property named `message` with the exact value `Hello world!!`.


```js
bol.ping().then (data => {
  if (data.Message === 'Hello World!') {
    console.log ('pong');
  }
  else {
    console.log ('ouch');
  }
});
```


### catalogSearch
**({ ... })**

Search products in the catalog.

The result `data` is modified to remove a few xml-style annoyances.


param  | type   | description
:------|:-------|:-----------
...    | object | search paramaters


```js
bol.catalogSearch ({
  q: 'node.js',
})
  .then (data => {
    for (let i in data.products) {
      let product = data.products[p];
      console.log (`${product.title} - ${product.summary}`);
    }
  })
;
```

[API documentation](https://partnerblog.bol.com/documentatie/open-api/handleiding/api-requests/catalog/get-catalogv4search/)


### catalogLists
**({ [...] })**

Product lists, based on list type and category.


param | type   | description
:-----|:-------|:-----------
[...] | object | Arguments, see API documentation


```js
bol.catalogLists()
  .then (data => data.products)
  .then (data => data.filter (itm => itm.rating >= 40))
  .then (data => data.forEach (itm => {
    console.log (`${itm.rating} - ${itm.title}`);
  }))
;
```

[API documentation](https://partnerblog.bol.com/documentatie/open-api/handleiding/api-requests/catalog/get-catalogv4lists/)


### catalogProducts
**({ productId, [...] })**

Get details information for one or more products.


param     | type     | description
:---------|:---------|:-----------
productId | string   | Product ID
[...]     | object   | Arguments, see API documentation


```js
bol.catalogProducts ({
  productId: '9200000023292527',
  includeattributes: true,
})
  .then (data => {
    for (let p in data.products) {
      let product = data.products[p];
      console.log (`${product.title} - € ${product.offerData.offers[0].price}`);
    }
  })
;
```

[API documentation](https://partnerblog.bol.com/documentatie/open-api/handleiding/api-requests/catalog/get-catalogv4products/)


### catalogRecommendations
**({ productId, [...] })**

Get recommended products for a given product.


param     | type   | description
:---------|:-------|:-----------
productId | string | Product ID
[...]     | object | Arguments, see API documentation


```js
bol.catalogRecommendations ({
  productId: '9200000023292527',
})
  .then (data => {
    for (let i in data) {
      let product = data[i];
      console.log (`${product.title} - ${product.rating}`);
    }
  })
;
```

[API documentation](https://partnerblog.bol.com/documentatie/open-api/handleiding/api-requests/catalog/get-catalogv4recommendations/)


### catalogRelatedproducts
**({ productId, [...] })**

Get related products for a given product.


param     | type   | description
:---------|:-------|:-----------
productId | string | Product ID
[...]     | object | Arguments, see API documentation


```js
bol.catalogRelatedProducts ({
  productId: '9200000010839998',
})
  .then (console.log)
;
```

[API documentation](https://partnerblog.bol.com/documentatie/open-api/handleiding/api-requests/catalog/get-catalogv4relatedproducts/)


## Errors

message        | description
:--------------|:-----------
missing apikey | Credentials are not set


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
