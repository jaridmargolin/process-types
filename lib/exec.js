/*
 * exec.js:
 *
 * (C) 2013 Jarid Margolin
 * MIT LICENCE
 *
 */

// Core
var exec = require('child_process').exec;

// Module
var ProcessType = require('./process-type').ProcessType,
    extend      = require('./utils').extend;

//
// A Exec class used for reusing sets of similiar child_process
// exec commands
//
var Exec = function (opts) {
  ProcessType.call(this, Cmd, extend({
    'bufferOut' : false,
    'bufferErr' : false,
    'buffer'    : false,
    'logger'    : console.log
  }, opts));
};

//
// Exec extends ProcessType
//
Exec.prototype = Object.create(ProcessType.prototype);
Exec.prototype.constructor = Exec;

//
// Helper class for working with child_proccess exec. Contains
// defaults for quick use, and options for more flexibility.
//
var Cmd = function (opts, next) {
  // Merge opts with Defaults
  this.opts = extend({
    'terminated': this.terminated
  }, opts);
  // Add next to instance so that it can
  // be referenced by the handlers
  this.next = next;

  // Setup for exec call
  if (!this.opts.opts) { this.opts.opts = {} }
  // Exec
  var self = this;
  this.process = exec(this.opts.cmd, this.opts.opts, function () {
    self.opts.terminated.apply(self, arguments);
  });
};

//
// Callback after process is terminated
//
Cmd.prototype.terminated = function (err, stdout, stderr) {
  // Buffer output
  var shouldBufferOut = this.opts.buffer || this.opts.bufferOut,
      shouldBufferErr = this.opts.buffer || this.opts.bufferErr;

  // Log stdout
  if (shouldBufferOut && stdout) {
    this.opts.logger(stdout.toString('utf-8'));
  }
  // Log stderr
  if (shouldBufferErr && stderr) {
    this.opts.logger(stderr.toString('utf-8'));
  }
  // Class callback after cmd complete
  return (!err)
    ? this.next()
    : this.next(err);
}

//
// Expose
//
exports.Exec = Exec;
