/*
 * spawn.js:
 *
 * (C) 2013 Jarid Margolin
 * MIT LICENCE
 *
 */

// Core
var spawn = require('child_process').spawn;

// Module
var ProcessType = require('./process-type').ProcessType,
    extend      = require('./utils').extend;

//
// A Spawn class used for reusing sets of similiar child_process
// spawn commands
//
var Spawn = function (opts) {
  ProcessType.call(this, Cmd, extend({
    'streamOut': false,
    'streamErr': false,
    'stream'   : false,
    'logger'   : console.log
  }, opts));
};

//
// Spawn extends ProcessType
//
Spawn.prototype = Object.create(ProcessType.prototype);
Spawn.prototype.constructor = Spawn;

//
// Helper class for working with child_proccess spawn. Contains
// defaults for quick use, and options for more flexibility.
//
var Cmd = function (opts, next) {
  // Merge opts with default behavior
  this.opts = extend({
    'stdout': this.stdHandler,
    'stderr': this.stdHandler,
    'close' : this.closeHandler,
    'error'   : this.errHandler
  }, opts);
  // Add next to instance so that it can
  // be referenced by the handlers
  this.next = next;

  // Spawn child process
  if (!this.opts.args) { this.opts.args = [] }
  if (!this.opts.opts) { this.opts.opts = {} }
  this.process = spawn(this.opts.cmd, this.opts.args, this.opts.opts);
  // Add listeners
  this.addStdListener('stdout');
  this.addStdListener('stderr');
  this.addProcListener('error');
  this.addProcListener('close');
};

//
// Helper method for adding std listeners
//
Cmd.prototype.addStdListener = function (type) {
  var self = this;
  self.process[type].on('data', function () {
    self.opts[type].apply(self, arguments);
  });
}

//
// Helper method for adding process listeners
//
Cmd.prototype.addProcListener = function (type) {
  var self = this;
  self.process.on(type, function () {
    self.opts[type].apply(self, arguments)
  });
}

//
// Process general std handler
//
Cmd.prototype.stdHandler = function (data) {
  // Stream output
  if (this.opts.stream || this.opts.streamOut) {
    return this.opts.logger(data.toString('utf-8'))
  }
};

//
// Error Handler
//
Cmd.prototype.errHandler = function (err) {
  this.err = err;
};

//
// Close Handler
//
Cmd.prototype.closeHandler = function (code, signal) {
  return (code == 0)
    ? this.next()
    : this.next(this.getError());
};

//
// View err data and return the most relevant error
// data that we have
//
Cmd.prototype.getError = function () {
  return (this.err)
    ? this.err
    : new Error('Unsucessful exit code');
};


//
// Expose
//
exports.Spawn = Spawn;
