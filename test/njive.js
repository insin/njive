var assert = require('assert')

var Jive = require('../lib/njive')

suite('njive')

test('Jive constructor', function() {
  var defaults = { headers: {'User-Agent': 'njive/1.0'} }
  var j = Jive('http://example.com/', 'user', 'pass', defaults)
  assert.equal(j.user, 'user', 'Username stored')
  assert.equal(j.apiURL, 'http://example.com/', 'API URL stored')
  assert.deepEqual(
    defaults.headers,
    { 'User-Agent': 'njive/1.0', authorization: 'Basic dXNlcjpwYXNz' },
    'Basic authorization header added and supplied headers retained'
  )
})

test('Jive.prototype.buildURL', function() {
  var j = Jive('http://example.com/', 'user', 'pass')

  assert.equal(j.buildURL('groups'), 'http://example.com/groups',
               'Params are optional')
  assert.equal(j.buildURL('groups', {}), 'http://example.com/groups',
               'Empty params Object has no effect')
  assert.equal(j.buildURL('groups', {foo: 42}), 'http://example.com/groups?foo=42',
               'Params appended to URL')
  assert.equal(j.buildURL('groups', {foo: 42, bar: true}),
               'http://example.com/groups?foo=42&bar=true',
               'Multiple params appended to URL')
  assert.equal(j.buildURL('groups', {foo: '4 2', 'b ar': true}),
               'http://example.com/groups?foo=4%202&b%20ar=true',
               'Params are escaped')
  assert.equal(j.buildURL('groups', {foo: [42, '4 3']}),
               'http://example.com/groups?foo=42&foo=4%203',
               'Param lists are expanded')
})

test('Jive.prototype.parseJSON', function() {
  var j = Jive('http://example.com/', 'user', 'pass')

  assert.deepEqual(j.parseJSON('{"foo": 42}'),
                  {foo: 42},
                  'Unprefixed JSON parses')
  assert.deepEqual(j.parseJSON('throw \'allowIllegalResourceCall is false.\';\n{"foo": 42}'),
                  {foo: 42},
                  'JSON prefix is stripped before parsing')
})
