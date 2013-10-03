process-types [![Build Status](https://travis-ci.org/jaridmargolin/process-types.png)](https://travis-ci.org/jaridmargolin/process-types)
=============

[![NPM](https://nodei.co/npm/process-types.png)](https://nodei.co/npm/process-types/)

Small utility classes to create reusable and configurable child_process types. Classes include basic defaults for quickly working with both spawn and exec.



Example Usage
--------------

**require base class**

	var Spawn = require('process-types').Spawn;

**download process**

	// Show std stream
	var downloadProcess = new Spawn({
	  'stream': true,
	  'logger': function (str) {
	    console.log('DOWNLOADING: ' + str);
	  }
	});

	downloadProcess.run({
	  'cmd': 'wget',
	  'args': [src, '-P', dest]
	}, next);

**install process**

	// Spawn hides std streams by default
	var installProcess = new Spawn()

	installProcess.run({
	  'cmd': 'apt-get',
	  'args': ['install', '-y', '']
	});



Test
----

	npm test



Todos
-----

* support for readline/stdin
* exit code differences between exec and spawn on stderr



License
-------
The MIT License (MIT)
Copyright (c) 2013 Jarid Margolin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.