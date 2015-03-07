
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


exports.version = require('./package.json').version;
exports.getFMPPVersion = function getFMPPVersion(cb) {
  fmpp.run(['--version'], cb);
};

/**
 * Deal single template
 * @param  {string}   tpl       template filename
 * @param  {object}   dataModel
 * @param  {Function} cb        callback
 */
exports.render = function render(tpl, dataModel, cb, settings) {
  var outFile = getTmpFileName();
  var dataTdd = JSON.stringify(dataModel);

  fmpp.run([ tpl, '-D', dataTdd, '-o', outFile ], function(err, respData) {
    if(err) {
      return cb(err);
    }

    fs.readFile(outFile, function(err, result) {
      cb(err, '' + result, respData);
      fs.unlink(outFile, nop);
    });

  });

}


