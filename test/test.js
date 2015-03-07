
var should = require('should');

var path = require('path');
var fs = require('fs');


describe('Test', function() {

  var fm = require('../index.js');
  it('get right version data', function(done) {
    fm.version.should.be.ok;

    fm.getFMPPVersion(function(err, data) {
      err.should.not.be.ok;
      data.should.be.ok;
      data.should.match(/FMPP version/);
      done();
    });

  });

  it('render file', function(done) {

    var tpl = fs.readFileSync(path.join(__dirname, '../template/test.ftl'));

    fm.render(tpl, { word: 'ijse' } , function(err, data) {
      console.log(data);
      data.should.be.ok;
      done();
    });


  });
});

