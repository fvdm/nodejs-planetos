/*
Name:           planetos - index.js
Source & docs:  https://github.com/fvdm/nodejs-planetos
Feedback:       https://github.com/fvdm/nodejs-planetos/issues
License:        Unlicense (public domain)
*/

var httpreq = require ('httpreq');
var config = {};


/**
 * Callback an error
 *
 * @callback callback
 * @param message {string} - Error.message
 * @param err {mixed|null} - Error.error
 * @param code {number|null} - Error.statusCode
 * @param body {string|null} - Error.body
 * @param callback {function} - `function (err) {}`
 * @returns {void}
 */

function doError (message, err, code, body, callback) {
  var error = new Error (message);

  error.statusCode = code;
  error.error = err;
  error.body = body;
  callback (error);
}


/**
 * Get dataset
 *
 * @callback callback
 * @param dataset {string} - Dataset name
 * @param params {object} - Parameters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function getDataset (dataset, params, callback) {
  var options = {
    url: config.endpoint + '/datasets/' + dataset + '/point',
    method: 'GET',
    parameters: params,
    timeout: config.timeout,
    headers: {
      'Accept': 'application/json, text/plain',
      'User-Agent': 'planetos (https://github.com/fvdm/nodejs-planetos)'
    }
  };

  options.parameters.apikey = config.apikey;

  httpreq.doRequest (options, function (err, res) {
    var data = res && res.body || '';
    var error = null;

    if (err) {
      doError ('request failed', err, null, null, callback);
      return;
    }

    if (res.statusCode >= 300) {
      doError ('API error', null, res.statusCode, data, callback);
      error = new Error ('API error');
      return;
    }

    try {
      data = JSON.parse (data);
    } catch (e) {
      doError ('response failed', e, res.statusCode, data, callback);
      return;
    }

    callback (null, data);
  });

  return getDataset;
}


/**
 * Module setup
 *
 * @callback callback
 * @param conf {object}
 * @param conf.apikey {string} - Account API key
 * @param [conf.timeout] {number=5000} - Request timeout in ms
 * @param [conf.endpoint] {string} - Route API calls to another server
 * @param callback {function} - `function (err, data) {}`
 * @returns {function} - getDataset
 */

module.exports = function (conf) {
  config.apikey = conf.apikey || null;
  config.timeout = conf.timeout || 5000;
  config.endpoint = conf.endpoint || 'http://api.planetos.com/v1';

  return getDataset;
};
