var qs = require('querystring')
  , util = require('util')

var is = require('isomorph').is
  , object = require('isomorph').object
  , request = require('request')

function toBase64 (s) {
  return (new Buffer(s || '', 'ascii')).toString('base64')
}

/**
 * Wrapper for the Jive API:
 *
 *     http://docs.jivesoftware.com/apireferences/latest/core/reference/v2/
 *
 * @param apiURL API root url, including trailing slash, for example:
 *     https://jive.example.com/api/core/v2/
 * @param user username for HTTP Basic auth
 * @param pass password for HTTP Basic auth
 * @param requestDefaults additional default configuration for HTTP requests
 */
var Jive = module.exports = function(apiURL, user, pass, requestDefaults) {
  if (!(this instanceof Jive)) return new Jive(apiURL, user, pass, requestDefaults)
  this.apiURL = apiURL
  this.user = user

  // Don't overwrite any custom headers which are provided as request defaults
  requestDefaults = requestDefaults || {}
  if (!requestDefaults.headers) {
    requestDefaults.headers = {}
  }
  object.extend(requestDefaults.headers, {
    authorization: 'Basic ' + toBase64(qs.unescape(user) + ':' + qs.unescape(pass))
  })
  this.request = request.defaults(requestDefaults)
}

/**
 * Builds a Jive API URL, with query parameters if given.
 */
Jive.prototype.buildURL = function(url, params) {
  params = (params ? '?' + qs.stringify(params) : '')
  return this.apiURL + url + params
}

/**
 * Parses JSON from Jive, which is always prefixed with a throw statement.
 */
Jive.prototype.parseJSON = function(json) {
  return JSON.parse(
    json.replace("throw 'allowIllegalResourceCall is false.';\n", '')
  )
}

/**
 * Performs a GET request.
 */
Jive.prototype.get = function(url, params, cb) {
  if (is.Function(params)) {
    cb = params
    params = null
  }
  this.request.get({uri: this.buildURL(url, params)}, cb)
}

/**
 * Retrieves visible groups.
 *
 * Default options: {offset: 0, limit: 25}
 */
Jive.prototype.groups = function(options, cb) {
  if (is.Function(options)) {
    cb = options
    options = null
  }
  this.get('groups', options, function(err, res, body) {
    if (err) return cb(err)
    if (res.statusCode != 200) return cb(new Error('Status code was ' + res.statusCode))
    cb(null, this.parseJSON(body).data)
  }.bind(this))
}
