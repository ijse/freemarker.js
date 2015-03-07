
var path = require('path');
var fs = require('fs');
var uuid = require('node-uuid');
var os = require('os');

var spawn = require('child_process').spawn;

var fmppName = process.platform === 'win32' ? 'fmpp.bat' : 'fmpp';
var fmpp = path.join(__dirname, 'fmpp', fmppName);
function run(args, done) {

  var output = '';

  try {
    var s = spawn(fmpp, args, {
      cwd: path.join(__dirname, 'fmpp'),
      env: process.env
    });

    s.stdout.on('data', function(d) {
      output += d;
    });

    s.stderr.on('data', function(d) {
      output += d;
    });

    s.on('error', function(e) {
      done(e);
    });

    s.on('close', function(code) {
      done(code, output);
    });
  } catch(e) {
    done(e);
  }
}

function getTmpFileName() {
  return path.join(__dirname, uuid.v4());
}

function writeTmpFile(data, done) {
  var fileName = getTmpFileName();
  fs.writeFile(fileName, data, function(err) {
    done(err, fileName);
  });
}


exports.version = require('./package.json').version;
exports.getFMPPVersion = function getFMPPVersion(cb) {
  run(['--version'], cb);
};

exports.render = function render(tpl, dataModel, cb) {
  var outFile = getTmpFileName();

  writeTmpFile(tpl, function(err, tplFile) {

    run([ tplFile, '-D word: freemarker', '-o', outFile ], function(err, data) {
      if(err) {
        return cb(err);
      }

      fs.unlink(tplFile);
      fs.readFile(outFile, function(err, data) {
        cb(err, '' + data);
        fs.unlink(outFile);
      });


    });

  });

}


