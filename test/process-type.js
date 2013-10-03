/*
 * test/process-type.js:
 *
 * (C) 2013 Jarid Margolin
 * MIT LICENCE
 *
 */

// 3rd party
var assert = require('chai').assert;

// Module
var ProcessType = require('../lib/process-type').ProcessType;

//
// Check that new instance is created and that variables
// are correctly attached to instance.
//
var testClass = function () {
  // Setup
  var defaults, expected;
  defaults = {
    'default': 'values',
    'canbe'  : 'changed'
  };
  expected = {
    'default': 'values',
    'canbe'  : 'overwritten',
    'cmd'    : 'necessary'
  };
  
  // Mock Cmd Class
  var Cmd = function (opts, next) {
    next(null, opts);
  };

  // Create new type & run. Check output values to confirm
  // instantiation works as well as the run method.
  var type = new ProcessType(Cmd, defaults);
  type.run({
    'canbe': 'overwritten',
    'cmd'  : 'necessary'
  }, function (error, result) {
    assert.deepEqual(result, expected);
  });
};

//
// Run Tests
//
describe('process-type.js', function () {
  describe('#ProcessType', function () {
    it('Should create new instance with a run method that merges options', testClass);
  });
});