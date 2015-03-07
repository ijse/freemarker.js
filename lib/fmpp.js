var spawn = require('child_process').spawn;
var path = require('path');

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

exports.run = run;
