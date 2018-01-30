/*****************************************************
 * Internal tests
 * What are internal tests?
 * As this is a npm package, it should be tested from
 * a package context, so I'll use "interal" preffix
 * for tests which are NOT using the npm tarball pack
 * For all others, the test should obviously include
 * something like:
 * var md = require('t-motion-detector');
 *****************************************************/

let chai = require('chai');
let chaiAsPromised = require("chai-as-promised");
let should = chai.should();
let fs = require('fs');
let ent = require('../Entities.js');
let main = require('../main.js');
let chaiHttp = require('chai-http');
let motion = main._;

//Chai will use promises for async events
chai.use(chaiAsPromised);
//Chai will use promises for async events
chai.use(chaiHttp);

function helperReset(){
  motion.Reset();
  delete require.cache[require.resolve('../main')];
  main = require('../main');
  motion = main._;
}
before(function(done) {
  done();
});

after(function(done) {
  // here you can clear fixtures, etc.
  main.Reset();
  done();
});

describe("When a new PositionNotifierProxy is Opened, ", function() {
  it('Should listen to a PositionDetector', function () {
    let e = new ent.PositionDetector(200.34);
    (e instanceof t.Entities.Detector).should.equal(true);
  });

  it('Should trigger a opening order into the real system, TradingProxyEnvironment', function () {
    let e = new ent.PositionDetector(200.34);
    (e instanceof t.Entities.Detector).should.equal(true);
  });

  it('Should listen for the confirmation of the real system, TradingProxyEnvironment via TradeDetectorProxy', function () {
    let e = new ent.PositionDetector(200.34);
    (e instanceof t.Entities.Detector).should.equal(true);
  });
});

describe("When a TradingProxyEnvironment triggers a change via TradeDetectorProxy, ", function() {
  it('Notifier should trigger/Notify the AccountEnvironment via PositionDetector', function () {
    let e = new ent.PositionDetector(200.34);
    (e instanceof t.Entities.Detector).should.equal(true);
  });
});