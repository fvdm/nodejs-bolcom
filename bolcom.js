/*
Name:             bolcom.js
Description:      Module for node.js to access Bol.com Open API service.
Author:           Franklin van de Meent (https://frankl.in)
Source:           https://github.com/fvdm/nodejs-bolcom
Bugs & feedback:  https://github.com/fvdm/nodejs-bolcom/issues
License:          Unlicense / Public Domain

Service name:     Bol.com
Service docs:     https://developers.bol.com
*/

var https = require('https')
var api_key = null
var api_timeout = 5000

var app = {
  catalog: {},
  utils: {},
  account: {}
}
