var util = require('util')

// Setup
// set env BOLCOM_APIKEY (Travis CI)
// or use cli arguments: npm test --bolapikey=abc123
var bol = require('./')(
  process.env.npm_config_bolapikey || process.env.BOLCOM_APIKEY || null,
  process.env.npm_config_boltimeout || process.env.BOLCOM_TIMEOUT || null
)

// handle exits
var errors = 0
process.on( 'exit', function() {
	if( errors == 0 ) {
		console.log('\n\033[1mDONE, no errors.\033[0m\n')
		process.exit(0)
	} else {
		console.log('\n\033[1mFAIL, '+ errors +' error'+ (errors > 1 ? 's' : '') +' occurred!\033[0m\n')
		process.exit(1)
	}
})

// prevent errors from killing the process
process.on( 'uncaughtException', function( err ) {} )

// Queue to prevent flooding
var queue = []
var next = 0

function doNext() {
	next++
	if( queue[next] ) {
		queue[next]()
	}
}

// doTest( passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ])
function doTest( err, label, tests ) {
	if( err instanceof Error ) {
		console.error( label +': \033[1m\033[31mERROR\033[0m\n' )
		console.error( util.inspect(err, false, 10, true) )
		console.log()
		console.error( err.stack )
		console.log()
		errors++
	} else {
		var testErrors = []
		tests.forEach( function( test ) {
			if( test[1] !== true ) {
				testErrors.push(test[0])
				errors++
			}
		})
		
		if( testErrors.length == 0 ) {
			console.log( label +': \033[1mok\033[0m' )
		} else {
			console.error( label +': \033[1m\033[31mfailed\033[0m ('+ testErrors.join(', ') +')' )
		}
	}
	
	doNext()
}

// API ACCESS
queue.push( function() {
  bol.utils.ping( function( err, data ) {
    doTest( err, 'API access', [
      ['ping', data.message === 'Hello world!']
    ])
  })
})

// Start the tests
queue[0]()
