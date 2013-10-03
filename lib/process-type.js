/*
 * process-type.js:
 *
 * (C) 2013 Jarid Margolin
 * MIT LICENCE
 *
 */

// Module
var extend = require('./utils').extend;

//
// A Spawn class used for reusing sets of similiar child_process
// spawn commands
//
var ProcessType = function (Cmd, defaults) {
  // Add Cmd to instance
  this.Cmd = Cmd;
  // Type defaults
  this.defaults = defaults;
};

//
// Helper method that wraps class instantiation
//
ProcessType.prototype.run = function (opts, next) {
  // Make sure required opts were passed
  if (!opts.cmd) {
    return next(new Error('A command must be passed'));
  }
  // Merge instance options with class opts
  var opts = extend({}, this.defaults, opts);
  // Return Cmd
  return new this.Cmd(opts, next);
};


//
// Expose
//
exports.ProcessType = ProcessType;
