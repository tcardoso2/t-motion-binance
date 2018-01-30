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

describe("When a new PositionDetector is created, ", function() {
  it('Should inherit the Detector class', function () {
    let e = new ent.PositionDetector(200.34);
    (e instanceof t.Entities.Detector).should.equal(true);
  });

  it('Should take the CurrencyPair as argument (e.g. BTCXMR) and the quantity to buy', function () {
    let e = new ent.PositionDetector("BTCXMR", 0.0002);
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should be able to set the expiry date', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should be able to open a position and add it to the AccountEnvironment', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should save the price which the position was bought', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should notify the Opening of the position to the TradingProxyEnvironment via PositionNotifierProxy', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should keep a state of the position wether is new, pending or confirmed by the TradingProxyEnvironment', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should be able to close a position', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should be able to set a max limit loss', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should be able to set a max limit gain', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should be able to track loss/gain/current value and notify every 10 seconds', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });
});

describe("When a max limit is reached, ", function() {
  it('should trigger a notification', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('should close the position', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });
});

describe("When the expiry date/time is reached, ", function() {
  it('should trigger a notification', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('should close the position', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });
});

describe("When a new PositionDetector is closed, ", function() {
  it('Should notify the Closing of the position to the HistoryTransactionsEnvironment', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should add the record to the HistoryTransactionsEnvironment', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should remove the Detector from the AccountEnvironment', function () {
    let e = new ent.PositionDetector("BTCXMR");
    (e instanceof t.Entities.Environment).should.equal(true);
  });
});

describe("When a new SmartPositionDetector is created, ", function() {
  it('Should inherit the PositionDetector class', function () {
    let e = new ent.PositionDetector(200.34);
    (e instanceof t.Entities.Detector).should.equal(true);
  });

  it('Should be able to query the HistoryTransactionsEnvironment about a given pair', function () {
    let e = new ent.PositionDetector(200.34);
    (e instanceof t.Entities.Detector).should.equal(true);
  });

  it('Should be able to make a call when to sell depending on history (this is vague, break it down)', function () {
    let e = new ent.PositionDetector(200.34);
    (e instanceof t.Entities.Detector).should.equal(true);
  });
});
