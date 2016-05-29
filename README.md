bolcom
======

Access Bol.com Open API service with node.js

[![npm](https://img.shields.io/npm/v/bolcom.svg?maxAge=3600)](https://github.com/fvdm/nodejs-bolcom/blob/master/CHANGELOG.md)
[![Build Status](https://travis-ci.org/fvdm/nodejs-bolcom.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-bolcom)
[![Dependency Status](https://gemnasium.com/badges/github.com/fvdm/nodejs-bolcom.svg)](https://gemnasium.com/github.com/fvdm/nodejs-bolcom#runtime-dependencies)


Usage
-----

```js
var bol = require ('bolcom') ('apikey');

bol.catalog.search ({ q: 'node.js' }, function (err, data) {
  if (err) {
    console.log ('Search failed');
    console.log (err);
    return;
  }

  for (var p in data.products) {
    var product = data.products[p];
    console.log (product.title + ' - €' + product.offerData.offers[0].price);
  }
});
```


Requirements
------------

* [node.js](https://nodejs.org)
* Bol.com API key ([read here](https://developers.bol.com/documentatie/aan-de-slag/))


Installation
------------

`npm install bolcom`


Methods
-------

Each method below takes a callback function like this: `function (err, [data])`.
In case of an error `err` is an instance of `Error` and `data` is not available.

For readability error testing is not included in the following examples.
See the [Usage](#usage) section above for an example with proper error testing.


utils.ping
----------
**( callback )**

Simple API access test. The result `data` should be an _object_ with only one
property named `message` with the exact value `Hello world!!`.


param    | type     | required | description
:--------|:---------|:---------|:-----------
callback | function | yes      | `function (err, data) {}`


```js
bol.utils.ping (function (err, data) {
  if (data.message === 'Hello world!!') {
    console.log ('pong');
  } else {
    console.log ('ouch');
  }
});
```


account.sessions
----------------
**( callback )**

Request a new anonymous session ID.


param    | type     | required | description
:--------|:---------|:---------|:-----------
callback | function | yes      | `function (err, data) {}`


```js
bol.acocunt.sessions (function (err, data) {
  console.log (data.sessionId);
})
```


catalog.search
--------------
**( props, callback )**

Search products in the catalog.

The result `data` is modified to remove a few xml-style annoyances.


param    | type     | required | description
:--------|:---------|:---------|:-----------
prope    | object   | yes      | search paramaters
callback | function | yes      | `function (err, data) {}`


```js
bol.catalog.search ({ q: 'node.js' }, function (err, data) {
  for (var i in data.products) {
    var product = data.products[p];
    console.log (product.title + ' - ' + product.summary);
  }
});
```

* [Example data](https://github.com/fvdm/nodejs-bolcom/wiki/catalog.search)
* [API documentation](https://developers.bol.com/handleiding/v4/Catalog/files/GETcatalogv4search.html)


catalog.lists
-------------
**( [props], callback )**

Product lists, based on list type and category.


param     | type     | required | description
:---------|:---------|:---------|:-----------
props     | object   | no       | Arguments, see API documentation
callback  | function | yes      | `function (err, data) {}`


* [Example data](https://github.com/fvdm/nodejs-bolcom/wiki/catalog.lists)
* [API documentation](https://developers.bol.com/handleiding/v4/Catalog/files/GETcatalogv4productlists.html)


catalog.products
----------------
**( productId, [props], callback )**

Get details information for one or more products.


param     | type     | required | description
:---------|:---------|:---------|:-----------
productId | string   | yes      | Product ID
props     | object   | no       | Arguments, see API documentation
callback  | function | yes      | `function (err, data) {}`


```js
bol.catalog.products ('9200000023292527', {includeattributes: true}, function (err, data) {
  for (var p in data.products) {
    var product = data.products[p];
    console.log (product.title + ' - €' + product.offerData.offers[0].price);
  }
});
```

* [Example data](https://github.com/fvdm/nodejs-bolcom/wiki/catalog.products)
* [API documentation](https://developers.bol.com/handleiding/v4/Catalog/files/GETcatalogv4products.html)


catalog.offers
--------------
**( productId, [props], callback )**

Get available offers for a given product.


param     | type     | required | description
:---------|:---------|:---------|:-----------
productId | string   | yes      | Product ID
props     | object   | no       | Arguments, see API documentation
callback  | function | yes      | `function (err, data) {}`


```js
bol.catalog.offers ('9200000023292527', function (err, data) {
  for (var i in data.offers) {
    var offer = data.offers[i];
    console.log (offer.price + ' - ' + offer.availabilityDescription);
  }
});
```

* [Example data](https://github.com/fvdm/nodejs-bolcom/wiki/catalog.offers)
* [API documentation](https://developers.bol.com/handleiding/v4/Catalog/files/GETcatalogv4offers.html)


catalog.recommendations
-----------------------
**( productId, [props], callback )**

Get recommended products for a given product.


param     | type     | required | description
:---------|:---------|:---------|:-----------
productId | string   | yes      | Product ID
props     | object   | no       | Arguments, see API documentation
callback  | function | yes      | `function (err, data) {}`


```js
bol.catalog.recommendations ('9200000023292527', function (err, data) {
  for (var i in data) {
    var product = data[i];
    console.log (product.title + ' - ' + product.rating);
  }
});
```

* [Example data](https://github.com/fvdm/nodejs-bolcom/wiki/catalog.recommendations)
* [API documentation](https://developers.bol.com/handleiding/v4/Catalog/files/GETcatalogv4recommendations.html)


catalog.relatedproducts
-----------------------
**( productId, [props], callback )**

Get related products for a given product.


param     | type   | required | description
:---------|:-------|:---------|:-----------
productId | string | yes      | Product ID
props     | object | no       | Arguments, see API documentation


```js
bol.catalog.relatedproducts ('9200000010839998', function (err, data) {
  if (data.BINDINGCODE && data.BINDINGCODE.productFamilyMembers) {
    for (var m in data.BINDINGCODE.productFamilyMembers) {
      var mem = data.BINDINGCODE.productFamilyMembers[m];

      console.log (mem.label + ' - ' + mem.productId);
    }
  }
});
```

* [Example data](https://github.com/fvdm/nodejs-bolcom/wiki/catalog.relatedproducts)
* [API documentation](https://developers.bol.com/handleiding/v4/Catalog/files/GETcatalogv4relatedproducts.html)


Errors
------

message          | description
:----------------|:-------------------------------------------------------
missing apikey   | Credentials are not set
api error        | The API returned an error, see `err.code` and `err.api`
request failed   | The request can not be build
invalid response | The API response cannot be processed


Unlicense
---------

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

For more information, please refer to <http://unlicense.org/>


Author
------

[Franklin van de Meent](https://frankl.in)
