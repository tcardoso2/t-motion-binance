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

describe("When a new AccountEnvironment is created, ", function() {
  it('Should inherit the Environment class', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Can take the account balance (in BTC) as first parameter (for test purposes)', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should store the account original balance', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should be possible to add PositionDetectors to the AccountEnvironment', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should be possible to get all open positions and values', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should be able to compute the current account balance', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should be able to compute percentage growth/loss', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should be able to sync with the account balance from an API Proxy (e.g. binance) - Resets the environment', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof t.Entities.Environment).should.equal(true);
  });
});