
var path = require('path');
var fs = require('fs');
var uuid = require('node-uuid');
var os = require('os');

var fmpp = require('./lib/fmpp.js');

function nop() {}
function getTmpFileName() {
  return path.join(os.tmpDir(), uuid.v4());
}

function writeTmpFile(data, done) {
  var fileName = getTmpFileName();
  fs.writeFile(fileName, data, function(err) {
    done(err, fileName);
  });
}

/**
 * Freemarker Class
 *
 * @param {Object} settings
 */
function Freemarker(settings) {
  var sName = Object.keys(settings.options);
  var args = [];
  sName.forEach(function(x) {
    var v = settings.options[x];
    args.push(stripArg(x, v));
  });

  this.viewRoot = settings.viewRoot;
  this.options = settings.options;
  this.stringifyArgs = args;
}


Freemarker.version = require('./package.json').version;
Freemarker.getFMPPVersion = function getFMPPVersion(cb) {
  fmpp.run(['--version'], cb);
};


Freemarker.prototype.render = function(tpl, data, done) {
  var dataTdd = convertDataModel(data);
  var tplFile = path.join(this.viewRoot, tpl);
  var args = [tplFile, '-D', dataTdd];
  var tmpFile;
  var _this = this;

  tmpFile = getTmpFileName();
  args.push.apply(args, ['-o', tmpFile]);
  args.push.apply(args, this.stringifyArgs);

  fmpp.run(args, function(err, respData) {
    if(err) {
      return done(err);
    }

    fs.readFile(tmpFile, function(err, result) {
      done(err, '' + result, respData);
      fs.unlink(tmpFile, nop);
    });

  });
};

/**
 * Render views in bulk mode
 * @param  {String}   cfgFile configuration file
 * @param  {Function} done    callback
 */
Freemarker.prototype.renderBulk = function(cfgFile, done) {
  fmpp.run(['-C', cfgFile], done);
};

Freemarker.exec = fmpp.run;

/**
 * Convert data object to TDD
 * @param  {Ojbect} data
 * @return {String}      [description]
 */
function convertDataModel(data) {
  return JSON.stringify(data);
}

/**
 * Strip parameter word
 * @param  {String} s
 * @return {String}   [description]
 */
function stripArg(s, v) {
  var result = '';
  var argName = '--' + s.replace(/([A-Z])/g, "-$1").toLowerCase();
  var argValue = v;
  if(typeof v !== 'boolean' && argValue) {
    result += argName + '="' + argValue + '"';
  } else {
    result += argName;
  }
  return result;
}

module.exports = Freemarker;
