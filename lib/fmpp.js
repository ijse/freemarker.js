var child = require('child_process');
var spawn = child.spawn;
var exec = child.exec;
var execSync = child.execSync;

var path = require('path');
var fs = require('fs');

var fmppName = process.platform === 'win32' ? 'fmpp.bat' : 'fmpp';
var fmpp = path.join(__dirname, '../fmpp', fmppName);
function run(args, done) {

  var output = '';

  try {
    var s = spawn(fmpp, args);

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

function run(args, done) {

  var command = fmpp + ' ' + args.join(' ');

  exec(command,
    function(error, stdout, stderr) {

      done(error || stderr, stdout);

    });
}

function runSync(args) {
  var command = fmpp + ' ' + args.join(' ');

  if(execSync) {
    // On node.js v0.12, there comes execSync() method which exactly we want
    return execSync(command);
  } else {
    // Here is inefficiency and ugliness hack for older version of node.js
    exec(command + ' 2>&1 1>output && echo done! > done');
    while(!fs.existsSync('done')) {}

    var output = fs.readFileSync('output');
    fs.unlinkSync('output');
    fs.unlinkSync('done');

    return '' + output;
  }
}

exports.run = run;
exports.runSync = runSync;
