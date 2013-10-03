/*
 * test/utils.js:
 *
 * (C) 2013 Jarid Margolin
 * MIT LICENCE
 *
 */

// 3rd party
var assert = require('chai').assert;

// Module
var extend = require('../lib/utils').extend;

//
// Check that new instance is created and that variables
// are correctly attached to instance.
//
var testExtend = function () {
  // Setup Data
  var defaults, opts, expected;
  defaults = {
    'extend'   : 'should',
    'overwrite': 'all'
  };
  opts = {
    'overwrite': 'default',
    'values'   : 'to',
    'the'      : 'destObj'
  };
  expected = {
    'extend'   : 'should',
    'overwrite': 'default',
    'values'   : 'to',
    'the'      : 'destObj'
  };

  // Run extend
  var result = extend({}, defaults, opts);
  // Check results
  assert.deepEqual(result, expected);
  // Make sure defaults & opts were not changed
  assert.deepEqual({
    'extend'   : 'should',
    'overwrite': 'all'
  }, defaults);
  assert.deepEqual({
    'overwrite': 'default',
    'values'   : 'to',
    'the'      : 'destObj'
  }, opts);
};

//
// Run Tests
//
describe('utils.js', function () {
  describe('#extend', function () {
    it('Should return an object with merged properties', testExtend);
  });
});