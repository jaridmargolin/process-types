/*
 * test/fixtures/tester.js:
 *
 * (C) 2013 Jarid Margolin
 * MIT LICENCE
 *
 */

// 3rd party
var program = require('commander');

//
// Send stream to stdout every 0.25s 5 times
//
var stdout = function () {
  var interval = 5;
      count = 5;
  // Recursive loop call
  function loop(i) {
    setTimeout(function () {
      console.log('Streaming to the console: ' + i)
      if (i < count) {
        i++
        loop(i);
      }
    }, interval);
  };
  // Start loop
  loop(0);
};

//
// Send stream to stderr
//
var stderr = function () {
  console.error('I am an error');
}

//
// Send err
//
var err = function () {
  throw new Error('I am an error');
}

//
// Define Program
//
program
  .command('stdout')
  .description('Call stdout method')
  .action(stdout);

program
  .command('stderr')
  .description('Call stderr method')
  .action(stderr);

program
  .command('err')
  .description('Call err method')
  .action(err);

program.parse(process.argv);
