=====
njive
=====

Node.js wrapper for the `Jive <http://www.jivesoftware.com/>`_ API.

I'm implementing this on an as-needed basis for use in a Node.js webapp
which helps me administrate and use an internal instance of Jive, which
only supports HTTP Basic authentication at the time of typing.

Pull requests are welcome if you want to add support for additional calls
and authorisation methods.

Sample Usage
============

::

   var Jive = require('njive')

   var api = Jive('https://jive.example.com/api/core/v2/', 'steve', 'password')

   api.groups(function(err, groups) {
     if (err) throw err
     console.log('Retrieved %s groups:', groups.length')
     groups.forEach(function(group) {
       console.log('%j', group)
     })
   })

Implemented Calls
=================

The Jive API is documented here:

* http://docs.jivesoftware.com/apireferences/latest/core/reference/v2/

The following call wrappers are currently implemented:

* ``groups(callback)``
* ``groups(options, callback)``

MIT License
===========

Copyright (c) 2012, Jonathan Buchanan

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
