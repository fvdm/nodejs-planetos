/*
Name:           planetos - index.js
Source & docs:  https://github.com/fvdm/nodejs-planetos
Feedback:       https://github.com/fvdm/nodejs-planetos/issues
License:        Unlicense (public domain)
*/

var httpreq = require ('httpreq');
var config = {};


/**
 * Communication
 */

function talk (params, callback) {
  var options = {
    url: config.endpoint + params.path,
    method: params.method || 'GET',
    parameters: params.parameters || {},
    timeout: params.timeout || config.timeout,
    headers: {
      'Accept': 'text/plain',
      'User-Agent': 'planetos (https://github.com/fvdm/nodejs-planetos)'
    }
  };

  options.parameters.apikey = config.apikey;

  httpreq.doRequest (options, function (err, res) {
    var data = res && res.body || '';
    var error = null;

    if (err) {
      error = new Error ('request failed');
      error.error = err;
      callback (error);
      return;
    }

    try {
      data = JSON.parse (data);
    } catch (e) {
      error = new Error ('response failed');
      error.error = e;
      error.statusCode = res.statusCode;
      error.body = data;
      callback (error);
      return;
    }

    callback (null, data);
  });
}


/**
 * Get dataset endpoints
 *
 * @callback callback
 * @param dataset {string} - Dataset name
 * @param [params] {object} - Additional parameters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function getEndpoints (dataset, params, callback) {
  var options = {
    path: '/datasets/' + dataset + '/point',
    parameters: params
  };

  if (typeof params === 'function') {
    callback = params;
    options.parameters = null;
  }

  talk (options, callback);
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
 * @returns {void}
 */

module.exports = function (conf) {
  config.apikey = conf.apikey || null;
  config.timeout = conf.timeout || 5000;
  config.endpoint = conf.endpoint || 'http://api.planetos.com/v1';

  return {
    endpoints: getEndpoints
  };
};
