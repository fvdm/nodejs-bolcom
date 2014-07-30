bolcom.js
=========

Unofficial module for node.js to access Bol.com Open API service.


Requirements
------------

* [node.js](https://nodejs.org)
* Bol.com API key ([read here](https://developers.bol.com/documentatie/aan-de-slag/))


Installation
------------

Latest stable release:

```bash
npm install bolcom
```

Most recent code, can be unstable:

```bash
npm install git+https://github.com/fvdm/nodejs-bolcom
```


Example
-------

```js
var bol = require('bolcom')('your_apikey')
```