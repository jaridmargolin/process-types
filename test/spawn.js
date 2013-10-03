/*
 * test/spawn.js:
 *
 * (C) 2013 Jarid Margolin
 * MIT LICENCE
 *
 */

// Std lib
var path = require('path');

// 3rd party
var assert = require('chai').assert;

// Module
var Spawn = require('../lib/spawn').Spawn;

//
// Check stdout stream
//
var testStdOut = function (done) {
  // Counter to make sure we get all streams
  var count = 0;
  // Define process type
  var testProcess = new Spawn({
    'streamOut': true,
    'logger': function (str) {
      assert.equal('Streaming to the console: ' + count +  '\n', str);
      count++
    }
  });
  // Run test
  testProcess.run({
    'cmd': 'node',
    'args': [
      path.join(__dirname, 'fixtures/tester.js'),
      'stdout'
    ]
  }, function (err) {
    if (err) { return assert.ok(false) }
    return (count == 6)
      ? done()
      : assert.ok(false);
  });
};

//
// Check stderr stream
//
var testStdErr = function (done) {
  // Define process type
  var testProcess = new Spawn({
    'streamErr': true,
    'logger': function (str) {
      assert.equal('I am an error' + '\n', str);
    }
  });
  // Run test
  testProcess.run({
    'cmd': 'node',
    'args': [
      path.join(__dirname, 'fixtures/tester.js'),
      'stderr'
    ]
  }, function (err) {
    return (err && err.message !== "Unsucessful exit code")
      ? assert.ok(false)
      : done();
  });
};

//
// Check err
//
var testErr = function (done) {
  // Define process type
  var testProcess = new Spawn();
  // Run test
  testProcess.run({
    'cmd': 'node',
    'args': [
      path.join(__dirname, 'fixtures/tester.js'),
      'err'
    ]
  }, function (err) {
    return (err)
      ? done()
      : assert.ok(false);
  });
};

//
// Run Tests
//
describe('spawn.js', function () {
  it('Should log stdout', testStdOut);
  it('Should log stderr', testStdErr);
  it('Should log err', testErr);
});