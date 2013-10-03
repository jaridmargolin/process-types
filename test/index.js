/*
 * test/index.js:
 *
 * (C) 2013 Jarid Margolin
 * MIT LICENCE
 *
 */

// 3rd party
var should = require('chai').should();

// Module
var Spawn = require('../lib').Spawn,
    Exec  = require('../lib').Exec;

//
// Check existence of Spawn Class
//
var testSpawnExists = function () {
  should.exist(Spawn);
};

//
// Check existence of Exec Class
//
var testExecExists = function () {
  should.exist(Exec);
};

//
// Run Tests
//
describe('index.js', function () {
  it('Should export the Spawn Class', testSpawnExists);
  it('Should export the Exec Class', testExecExists);
});