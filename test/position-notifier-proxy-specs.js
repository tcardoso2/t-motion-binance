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

describe("When a TradingProxyEnvironment is created, ", function() {
  it('Should inherit the APIEnvironment class', function () {
    let e = new ent.TradingProxyEnvironment();
    (e instanceof motion.Entities.GetExtensions().APIEnvironment).should.equal(true);
  });

  it('Should be able to get the key and secret from a local configuration file', function () {
    helperReset();
    let _config = new main._.Config("/test/config_api_test.js");
    main._.StartWithConfig(_config, (e,d,n,f) =>{
      (e instanceof ent.TradingProxyEnvironment).should.equal(true);
      e._key.should.equal("key1");
      e._secret.should.equal("secret1");
      e._endpoint.should.equal("endpoint1");
      e._isMockMode.should.equal(true);
    });
  });
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
  it('Should get the current balance from the trading environment', function () {
    let e = new ent.PositionDetector(200.34);
    (e instanceof t.Entities.Detector).should.equal(true);
  });

  it('Should get the existing positions of the trading environment', function () {
    let e = new ent.PositionDetector(200.34);
    (e instanceof t.Entities.Detector).should.equal(true);
  });

  it('Notifier should trigger/Notify the AccountEnvironment via PositionDetector', function () {
    let e = new ent.PositionDetector(200.34);
    (e instanceof t.Entities.Detector).should.equal(true);
  });
});