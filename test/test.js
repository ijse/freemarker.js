
var should = require('should');

var path = require('path');
var fs = require('fs');


describe('Test', function() {

  var fm = require('../index.js');
  it('get right version data', function(done) {
    fm.version.should.be.ok;

    fm.getFMPPVersion(function(err, data) {
      (!!!err).should.be.true;
      data.should.be.ok;
      data.should.match(/FMPP version/);
      done();
    });

  });

  it('run fmpp command', function(done) {
    // run `fmpp --version` and get result
    fm.exec(['--version'], function(err, result) {
      (!!!err).should.be.true;
      result.should.be.match(/FMPP|FreeMarker version/);
      done();
    });
  });

});

describe('Test freemarker.js', function() {

  var Freemarker = require('../index.js');

  it('Create new Freemarker.js instance', function(done) {
    var fm = new Freemarker({
      viewRoot: path.join(__dirname, './template'),

      options: {
      }
    });

    fm.render('test.ftl', {
      word: 'Jack Jone'
    }, function(err, data, out) {
      (!!!err).should.be.true;
      data.should.be.match(/Jack Jone/);
      data.should.be.match(/中文/);
      data.should.be.match(/¥/);
      data.should.be.match(/child partial/);
      out.should.be.match(/DONE/);
      done();
    });
  });

  it('Param viewRoot must be set', function() {
    (function() {
      var fm = new Freemarker({});
    }).should.throw('Freemarker: Need viewRoot param.');
  });

  it('Could include another template with relative path', function(done) {
    var fm = new Freemarker({
      viewRoot: path.join(__dirname, '/template/')
    });

    fm.render('/subfolder/index.ftl', {}, function(err, data, out) {
      data.should.be.match(/child partial/);
      done(err);
    });
  })

  it('sync render', function() {
    var fm = new Freemarker({
      viewRoot: path.join(__dirname, './template/'),

      options: {
      }
    });

    var data = fm.renderSync('test.ftl', {word: 'Jack'});
    data.should.be.match(/Jack/);
    data.should.be.match(/中文/);
    data.should.be.match(/¥/);
    data.should.be.match(/child partial/);
  });

});
