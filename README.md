Freemarker.js
==============

*Freemarker.js* is bridge API for [fmpp](http://fmpp.sourceforge.net/) to make [Freemarker](http://freemarker.org) available with node.js.

100% language support like Freemarker on Java.


# References

- [Freemarker Manual](http://freemarker.org/docs/index.html)
- [FMPP Manual](http://fmpp.sourceforge.net/manual.html)

# Install

```
npm install freemarker.js
```

# How to use

```
var Freemarker = require('freemarker.js');
var fm = new Freemarker({
  viewRoot: '/template',
  options: {
    /** for fmpp */
  }
});

// Single template file
fm.render(tpl, dataObject, function(err, html, output) {
  //...
});

// Use fmpp configuration file, see `http://fmpp.sourceforge.net/configfile.html`
fm.renderBulk(cfgFile, function(err) {
  //...
});

// Other
Freemarker.exec(['--version'], function(err, output) {
  //
});

```

# License

(The MIT License)

Copyright (c) 2015 ijse

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
