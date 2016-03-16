/*
Name:           planetos - index.js
Source & docs:  https://github.com/fvdm/nodejs-planetos
Feedback:       https://github.com/fvdm/nodejs-planetos/issues
License:        Unlicense (public domain)
*/

var httpreq = require ('httpreq');
var config = {};


/**
 * Get dataset endpoints
 *
 * @callback callback
 * @param dataset {number} - Dataset ID
 * @param [params] {object} - Additional parameters
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function getEndpoints (dataset, params, callback) {
  
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
  config.endpoint = conf.endpoint || null;

  return {
    endpoints: getEndpoints
  };
};
