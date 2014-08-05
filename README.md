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
var bol = require('bolcom')('apikey')
```


Methods
-------

Each method below takes a callback function like this: `function( err, [data] )`.
In case of an error `err` is an instance of `Error` and `data` is not available.


utils.ping
---------

Simple API access test.

```js
bol.utils.ping( function( err, data ) {
  if( err ) { console.error(err) } else {
    if( data.message === 'Hello world!!' ) {
      console.log('pong')
    } else {
      console.error('ouch')
    }
   }
})
```


Errors
------

```
missing apikey    Credentials are not set
api error         The API returned an error, see err.code and err.api
request failed    The request can not be build
request timeout   The request took too long to complete
request dropped   The request was cut off too early
invalid response  The API response cannot be processed
```


License
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
