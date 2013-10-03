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
var Exec = require('../lib/exec').Exec;

//
// Check stdout stream
//
var testStdOut = function (done) {
  // Define process type
  var testProcess = new Exec({
    'bufferOut': true,
    'logger': function (str) {
      var expected = 'Streaming to the console: 0\n';
      expected += 'Streaming to the console: 1\n';
      expected += 'Streaming to the console: 2\n';
      expected += 'Streaming to the console: 3\n';
      expected += 'Streaming to the console: 4\n';
      expected += 'Streaming to the console: 5\n';
      assert.equal(expected, str);
    }
  });
  // Run test
  var filePath = path.join(__dirname, 'fixtures/tester.js');
  testProcess.run({
    'cmd': 'node ' + filePath + ' stdout'
  }, function (err) {
    return (err)
      ? assert.ok(false)
      : done();
  });
};

//
// Check stderr stream
//
var testStdErr = function (done) {
  // Define process type
  var testProcess = new Exec({
    'bufferErr': true,
    'logger': function (str) {
      assert.equal('I am an error\n', str);
    }
  });
  // Run test
  var filePath = path.join(__dirname, 'fixtures/tester.js');
  testProcess.run({
    'cmd': 'node ' + filePath + ' stderr'
  }, function (err) {
    return (err)
      ? assert.ok(false)
      : done();
  });
};

//
// Check err
//
var testErr = function (done) {
  // Define process type
  var testProcess = new Exec({});
  // Run test
  var filePath = path.join(__dirname, 'fixtures/tester.js');
  testProcess.run({
    'cmd': 'node ' + filePath + ' err'
  }, function (err) {
    return (err)
      ? done()
      : assert.ok(false);
  });
};

//
// Run Tests
//
describe('exec.js', function () {
  it('Should log stdout', testStdOut);
  it('Should log stderr', testStdErr);
  it('Should log err', testErr);
});