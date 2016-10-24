/*
Name:           planetos - test.js
Description:    Access Planet OS datasets (unofficial)
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-planetos
Feedback:       https://github.com/fvdm/nodejs-planetos/issues
License:        Unlicense (public domain, see LICENSE file)
*/

var doTest = require ('dotest');
var app = require ('./');

var planetos;


// Setup
// set env PLANETOS_APIKEY  (CI tests)
var config = {
  apikey: process.env.PLANETOS_APIKEY || null,
  endpoint: process.env.PLANETOS_ENDPOINT || null,
  timeout: process.env.PLANETOS_TIMEOUT || 5000
};

planetos = app (config);


// module basics
doTest.add ('Module', function (test) {
  test ()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'interface', planetos)
    .done ();
});

// method
doTest.add ('Function', function (test) {
  var params = {
    lon: -50.5,
    lat: 49.5,
    count: 1,
    context: 'reftime_time_lat_lon'
  };

  planetos ('noaa_ww3_global_1.25x1d', params, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isObject ('fail', 'data.stats', data && data.stats)
      .isArray ('fail', 'data.entries', data && data.entries)
      .isNull ('fail', 'err', err)
      .info ('Response data:')
      .info (data)
      .done ();
  });
});

// api error
doTest.add ('Error: API error', function (test) {
  planetos ('api-error-test', {}, function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isUndefined ('fail', 'data', data)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isExactly ('warn', 'err.statusCode', err && err.statusCode, 404)
      .isNotEmpty ('warn', 'err.body', err && err.body)
      .done ();
  });
});

// timeout
doTest.add ('Error: request failed', function (test) {
  var tmp = app ({
    apikey: config.apikey,
    endpoint: config.endpoint,
    timeout: 1
  });

  tmp ('api-error-test', {}, function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'request failed')
      .isError ('fail', 'err.error', err && err.error)
      .isExactly ('fail', 'err.error.code', err && err.error && err.error.code, 'TIMEOUT')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


// Start the tests
doTest.run ();
