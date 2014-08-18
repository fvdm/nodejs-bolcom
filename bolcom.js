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
var querystring = require('querystring')
var api_key = null
var api_timeout = 5000

var app = {
  catalog: {},
  utils: {},
  account: {}
}


app.catalog.search = function( props, callback ) {
  talk( 'catalog', 'search', props, function( err, data ) {
    if( !err && data.products instanceof Array ) {
      for( var p=0; p < data.products.length; p++ ) {
        data.products[p] = cleanProduct( data.products[p] )
      }

app.catalog.lists = function( props, callback ) {
  talk( 'catalog', 'lists', props, function( err, data ) {
    if( !err && data.products instanceof Array ) {
      for( var p=0; p < data.products.length; p++ ) {
        data.products[p] = cleanProduct( data.products[p] )
      }
    }
    callback( err, data )
  })
}


      }
    }
    callback( err, data )
  })
}


app.utils.ping = function( callback ) {
  talk( 'utils', 'ping', callback )
}

app.account.sessions = function( callback ) {
  talk( 'accounts', 'sessions', callback )
}


// Clean up product
function cleanProduct( product ) {
  // urls
  var purls = {}
  for( var u=0; u < product.urls.length; u++ ) {
    var url = product.urls[u]
    purls[url.key] = url
  }
  product.urls = purls
  
  // images
  var pimgs = {}
  for( var m=0; m < product.images.length; m++ ) {
    var image = product.images[m]
    pimgs[image.key] = image
  }
  product.images = pimgs
  
  // includeattributes: true
  if( product.attributeGroups ) {
    var groups = {}
    for( var g=0; g < product.attributeGroups.length; g++ ) {
      var group = product.attributeGroups[g]
      groups[group.title] = {title: group.title}
  
      if( group.attributes ) {
        groups[group.title].attributes = {}
        for( var a=0; a < group.attributes.length; a++ ) {
          var attrib = group.attributes[a]
          groups[group.title].attributes[attrib.key] = attrib
        }
      }
    }
    product.attributeGroups = groups
  }
  
  return product
}

// Communicate
function talk( cat, method, params, callback ) {
  if( typeof params === 'function' ) {
    var callback = params
    var params = {}
  }
  params = params instanceof Object ? params : {}

  // check api key
  if( typeof api_key === 'string' && api_key.length > 0 ) {
    params.apikey = api_key
  } else {
    doCallback( new Error('missing apikey') )
    return
  }

  // prevent multiple callbacks
  var complete = false
  function doCallback( err, data ) {
    if( !complete ) {
      complete = true
      callback( err, data || null )
    }
  }

  // build request
  params.format = 'json'
  
  var options = {
    host: 'api.bol.com',
    path: '/'+ cat +'/v4/'+ method +'?'+ querystring.stringify(params),
    method: 'GET',
    headers: {
      'User-Agent': 'bolcom.js (https://github.com/fvdm/nodejs-bolcom)'
    }
  }

  var request = https.request(options)

  // process response
  request.on( 'response', function(response) {
    var data = ''

    response.on( 'data', function(ch) { data += ch })

    response.on( 'close', function() {
      doCallback(new Error('request dropped'))
    })

    response.on( 'end', function() {
      var error = null
      if( response.statusCode != 200 ) {
        error = new Error('API error')
      }

      try {
        data = JSON.parse( data )
      } catch(e) {
        error = new Error('invalid response')
        error.err = e
      }
      
      if( error ) {
        error.code = response.statusCode
        error.headers = response.headers
        error.api = data instanceof Object ? data : {}
        error.body = data instanceof Object ? null : data
      }

      doCallback( error, data )
    })
  })

  // timeout
  request.on( 'socket', function( socket ) {
    if( api_timeout ) {
      socket.setTimeout( api_timeout )
      socket.on( 'timeout', function() {
        request.abort()
      })
    }
  })

  // error
  request.on( 'error', function( err ) {
    if( err == 'ECONNRESET' ) {
      var error = new Error('request timeout')
    } else {
      var error = new Error('request failed')
    }
    error.err = err
    doCallback( error )
  })
  
  // do it
  request.end()
}

module.exports = function(apikey, timeout) {
  api_key = apikey
  api_timeout = timeout || api_timeout
  return app
}