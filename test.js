/*
Name:           planetos - test.js
Source & docs:  https://github.com/fvdm/nodejs-planetos
Feedback:       https://github.com/fvdm/nodejs-planetos/issues
License:        Unlicense (public domain)
*/

var path = require ('path');
var dir = path.dirname (module.filename);

var pkg = require (path.join (dir, 'package.json'));
var app = require (path.join (dir));

var planetos;
var errors = 0;
var warnings = 0;
var queue = [];
var next = -1;


// Setup
// set env PLANETOS_APIKEY  (CI tests)
var config = {
  apikey: process.env.PLANETOS_APIKEY || null,
  endpoint: process.env.PLANETOS_ENDPOINT || null,
  timeout: process.env.PLANETOS_TIMEOUT || 5000
};

if (!config.apikey) {
  config.endpoint = 'https://frankl.in/u/ci_test.php?a=planetos&b=';
}

planetos = app (config);


/**
 * ANSI colorize a string
 *
 * @param color {String} - The color to add
 * @param str {String} - The string to alter
 * @returns {String}
 */

function colorStr (color, str) {
  var colors = {
    red: '\u001b[31m',
    green: '\u001b[32m',
    yellow: '\u001b[33m',
    blue: '\u001b[34m',
    magenta: '\u001b[35m',
    cyan: '\u001b[36m',
    gray: '\u001b[37m',
    bold: '\u001b[1m',
    plain: '\u001b[0m'
  };

  return colors [color] + str + colors.plain;
}


/**
 * console.log with style
 *
 * @param [type] {String=plain} - Formatting style
 * @param str {String} - The string to alter
 * @returns {void}
 */

function log (type, str) {
  var types = {
    fail: ['red', 'FAIL'],
    good: ['green', 'good'],
    warn: ['yellow', 'warn'],
    info: ['cyan', 'info']
  };

  if (!str) {
    str = type;
    type = 'plain';
  }

  switch (type) {
    case 'error': console.log (colorStr ('red', colorStr ('bold', 'ERROR   ')) + str + '\n'); break;
    case 'note': console.log (colorStr ('bold', str)); break;
    case 'plain': console.log (str); break;
    default:
      console.log (colorStr (types[type][0], types[type][1]) + '    ' + str);
      break;
  }
}


/**
 * Detect and wrap string type
 *
 * @param str {String} - The string
 * @returns {String}
 */

function typeStr (str) {
  if (typeof str === 'string') {
    str = '"' + str + '"';
  } else if (str instanceof Object) {
    str = 'Object';
  } else if (str instanceof Array) {
    str = 'Array';
  } else if (str instanceof Error) {
    str = 'Error';
  }

  return colorStr ('magenta', str);
}

// handle exits
process.on ('exit', function processExit () {
  console.log ();
  log ('info', errors + ' errors');
  log ('info', warnings + ' warnings');
  console.log ();

  if (errors) {
    process.exit (1);
  } else {
    process.exit (0);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function uncaughtException (err) {
  console.log (err);
  console.log ();
  console.log (err.stack);
  console.log ();
  errors++;
});


/**
 * Queue to prevent flooding
 *
 * @returns {void}
 */

function doNext () {
  next++;
  if (queue [next]) {
    console.log ();
    queue [next] ();
  }
}


/**
 * doTest checks for error
 * else runs specified tests
 *
 * @param {Error} err
 * @param {String} label
 * @param {Array} tests
 * @returns {void}
 *
 * doTest(err, 'label text', [
 *   ['fail', 'feeds', typeof feeds, 'object'],
 *   ['warn', 'music', music instanceof Array, true],
 *   ['info', 'tracks', music.length]
 * ]);
 */

function doTest (err, label, tests) {
  var level = 'good';
  var test;
  var i;

  if (err instanceof Error) {
    log ('error', label);
    console.dir (err, { depth: null, colors: true });
    console.log ();
    console.log (err.stack);
    console.log ();
    errors++;

    doNext ();
    return;
  }

  console.log (colorStr ('blue', '(' + (next + 1) + '/' + queue.length + ') ') + colorStr ('bold', label));

  for (i = 0; i < tests.length; i++) {
    test = {
      level: tests [i] [0],
      label: tests [i] [1],
      result: tests [i] [2],
      expect: tests [i] [3]
    };

    if (test.result === test.expect) {
      log ('good', colorStr ('blue', test.label) + ': ' + typeStr (test.result) + ' is exactly ' + typeStr (test.expect));
    }

    if (test.level === 'fail' && test.result !== test.expect) {
      errors++;
      level = 'fail';
      log ('fail', colorStr ('blue', test.label) + ': ' + typeStr (test.result) + ' is not ' + typeStr (test.expect));
    }

    if (test.level === 'warn' && test.result !== test.expect) {
      warnings++;
      level = level !== 'fail' && 'warn';
      log ('warn', colorStr ('blue', test.label) + ': ' + typeStr (test.result) + ' is not ' + typeStr (test.expect));
    }

    if (test.level === 'info') {
      log ('info', colorStr ('blue', test.label) + ': ' + typeStr (test.result));
    }
  }

  doNext ();
}


// module basics
queue.push (function () {
  doTest (null, 'Module', [
    ['fail', 'exports', typeof app, 'function'],
    ['fail', 'interface', typeof planetos, 'function']
  ]);
});

// method
queue.push (function () {
  var params = {
    lon: -50.5,
    lat: 49.5,
    count: 1,
    context: 'reftime_time_lat_lon'
  };

  planetos ('noaa_ww3_global_1.25x1d', params, function (err, data) {
    doTest (err, 'NOAA example', [
      ['fail', 'type', data instanceof Object, true],
      ['warn', '.stats', data && data.stats instanceof Object, true],
      ['warn', '.entries', data && data.entries instanceof Array, true]
    ]);

    if (data) {
      console.log ();
      log ('note', 'JSON data:');
      console.dir (data, {
        depth: null,
        colors: true
      });
    }
  });
});


// Start the tests
log ('note', 'Running tests...\n');
log ('note', 'API endpoint:  ' + config.endpoint);
log ('note', 'Node.js:       ' + process.versions.node);
log ('note', 'Module:        ' + pkg.version);

doNext ();
