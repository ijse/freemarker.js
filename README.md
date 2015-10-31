Freemarker.js http://freemarker.js.org
==============

[![Join the chat at https://gitter.im/ijse/freemarker.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ijse/freemarker.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> FreeMarker is a "template engine". It's a Java package, a class library for Java programmers.
> ![](http://freemarker.org/images/overview.png)

*Freemarker.js* is bridge API for [fmpp](http://fmpp.sourceforge.net/) to make [Freemarker](http://freemarker.org) available with node.js.

100% language support like Freemarker on Java.


# References

- [Freemarker Manual](http://freemarker.org/docs/index.html)
- [FMPP Manual](http://fmpp.sourceforge.net/manual.html)

# Install

```shell
npm install freemarker.js
```

# How to use

```javascript
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

// Sync render
var result = fm.renderSync(tpl, dataObject);

// Use fmpp configuration file, see `http://fmpp.sourceforge.net/configfile.html`
fm.renderBulk(cfgFile, function(err) {
  //...
});

// Other
Freemarker.exec(['--version'], function(err, output) {
  //
});

```

# Configurations

Avaliable options for fmpp:

 * `sourceEncoding`: The encoding of textual sources (templates). Use the special value "host"(-E host) if the default encoding of the host machine should be used. The default is "ISO-8859-1".
 * `tagSyntax`: Sets the tag syntax for templates that doesn't start with the ftl directive. Possible values are: angleBracket, squareBracket, autoDetect.
 * `timeFormat`: The format used to show time values. The default is locale dependent.
 * `timeZone`: Sets the time zone in which date/time/date-time values are shown. The default is the time zone of the host machine. Example: GMT+02
 * `numberFormat`: The number format used to show numerical values. The default is 0.############
 * `dateFormat`: The format used to show date (year+month+day) values. The default is locale dependent.
 * `booleanFormat`: The boolean format used to show boolean values, like "Yes,No". Not "true,false"; use ${myBool?c} for that. The default is error on ${myBool}.
 * `datetimeFormat`: The format used to show date-time values. The default is locale dependent.
 * `locale`: The locale (as ar_SA). Use the special value "host" (-A host) if the default locale of the host machine should be used. The default value of the option is en_US.

# Notes
While using this module make sure you have correctly set your `JAVA_HOME` environment variable.

# License

(The MIT License)

Copyright (c) 2015 ijse

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
