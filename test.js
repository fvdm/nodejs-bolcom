/*
Name:           bolcom - test.js
Description:    Module for node.js to access Bol.com Open API service
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-bolcom
Feedback:       https://github.com/fvdm/nodejs-bolcom/issues
License:        Unlicense (Public Domain, see LICENSE file)
                (https://github.com/fvdm/nodejs-bolcom/raw/develop/LICENSE)
*/

// Setup
// set env BOLCOM_APIKEY  (Travis CI)
var bol = require ('./') (
  process.env.BOLCOM_APIKEY || null,
  process.env.BOLCOM_TIMEOUT || null
);

// handle exits
var errors = 0;
process.on ('exit', function () {
  if (errors === 0) {
    console.log ('\n\033[1mDONE, no errors.\033[0m\n');
    process.exit (0);
  } else {
    console.log ('\n\033[1mFAIL, '+ errors +' error'+ (errors > 1 ? 's' : '') +' occurred!\033[0m\n');
    process.exit (1);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log ();
  console.error (err.stack);
  console.trace ();
  console.log ();
  errors++;
});

// Queue to prevent flooding
var queue = [];
var next = 0;

function doNext () {
  next++;
  if (queue [next]) {
    queue [next] ();
  }
}

// doTest( passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ])
function doTest (err, label, tests) {
  if (err instanceof Error) {
    console.error ('\033[1m\033[31mERROR\033[0m - '+ label +'\n');
    console.dir (err, { depth: null, colors: true });
    console.log ();
    console.error (err.stack);
    console.log ();
    errors++;
  } else {
    var testErrors = [];
    for (var i = 0; i < tests.length; i++) {
      if (tests [i] [1] !== true) {
        testErrors.push (tests [i] [0]);
        errors++;
      }
    }

    if(testErrors.length === 0) {
      console.log ('\033[1m\033[32mgood\033[0m - '+ label);
    } else {
      console.error ('\033[1m\033[31mFAIL\033[0m - '+ label +' ('+ testErrors.join (', ') +')');
    }
  }

  doNext ();
}


// API ACCESS
queue.push (function () {
  bol.utils.ping (function (err, data) {
    if (err) {
      console.log ('\033[1m\033[31mFAIL\033[0m - API access ('+ err.message +')');
      console.log (err.stack);
      errors++;
      process.exit (1);
    } else {
      console.log ('\033[1m\033[32mgood\033[0m - API access');
      doNext ();
    }
  });
});

queue.push (function () {
  bol.account.sessions (function (err, data) {
    doTest (err, 'account.sessions', [
      ['sessionId', typeof data.sessionId === 'string']
    ]);
  });
});

queue.push (function () {
  bol.catalog.search ({q: 'node.js', limit: 1, includeattributes:true}, function (err, data) {
    doTest (err, 'catalog.search', [
      ['totalResultSize', data.totalResultSize >= 1],
      ['products array', data.products instanceof Array],
      ['products length', data.products.length >= 1],
      ['item type', data.products [0] instanceof Object],
      ['item id', typeof data.products [0] .id === 'string'],
      ['item attributes', data.products [0] .attributeGroups instanceof Object]
    ]);
  });
});

queue.push (function () {
  bol.catalog.products ('9200000023292527', function (err, data) {
    doTest (err, 'catalog.products', [
      ['item type', data.products [0] instanceof Object],
      ['item id', typeof data.products [0] .id === 'string']
    ]);
  });
});

queue.push (function () {
  bol.catalog.products ('9200000009223738', function (err, data) {
    doTest (err, 'incomplete product', [
      ['item images', data.products [0] .images === undefined],
      ['item id', typeof data.products [0] .id === 'string']
    ]);
  });
});

queue.push (function () {
  bol.catalog.lists ('', function (err, data) {
    doTest (err, 'catalog.lists', [
      ['totalResultSize', data.totalResultSize >= 1],
      ['list type', data.products instanceof Array],
      ['item type', typeof data.products [0] .id === 'string']
    ]);
  });
});

queue.push (function () {
  bol.catalog.offers ('9200000023292527', function (err, data) {
    doTest (err, 'catalog.offers', [
      ['offers type', data.offers instanceof Array],
      ['item id', typeof data.offers [0] .id === 'string']
    ]);
  });
});

queue.push (function () {
  bol.catalog.recommendations ('9200000023292527', function (err, data) {
    doTest (err, 'catalog.recommendations', [
      ['products type', data instanceof Array],
      ['item id', typeof data [0] .id === 'string']
    ]);
  });
});

queue.push (function () {
  bol.catalog.relatedproducts ('9200000010839998', function (err, data) {
    doTest (err, 'catalog.relatedproducts', [
      ['type', data instanceof Object],
      ['group type', data.BINDINGCODE instanceof Object],
      ['items type', data.BINDINGCODE.productFamilyMembers instanceof Object],
      ['productId', typeof data.BINDINGCODE.productFamilyMembers.Ebook.productId === 'string']
    ]);
  });
});

// Start the tests
queue [0] ();
