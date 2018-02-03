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
  motion.Reset();
  done();
});

describe("When a new AccountEnvironment is created, ", function() {
  it('Should inherit the Environment class', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof motion.Entities.Environment).should.equal(true);
  });

  it('Can take the account balance (in BTC) as first parameter (for test purposes)', function () {
    let e = new ent.AccountEnvironment(200.34);
    e.getCurrentState().should.equal(200.34);
  });

  it('Should store the account original balance', function () {
    let e = new ent.AccountEnvironment(200.34);
    e.currentBalance = 100;
    e.getOriginalState().should.equal(200.34);
  });

  it('Should be possible to add PositionDetectors to the AccountEnvironment', function () {
    let e = new ent.AccountEnvironment(200.34);
    motion.Start({
      environment: e
    });
    motion.AddDetector(new ent.PositionDetector());
    motion.GetMotionDetectors().length.should.equal(1);
  });

  it('if the detector is not a PositionDetector should return an error', function () {
    let e = new ent.AccountEnvironment(200.34);
    motion.Start({
      environment: e
    });
    try{
      motion.AddDetector(new motion.Entities.MotionDetector());
    }catch(e){
      e.message.should.equal("Detectors can only be of 'PositionDetector' type.");
      return;
    }
    should.fail();
  });

  it('Should be possible to get all open positions and values', function () {
    motion.Reset();

    let e = new ent.AccountEnvironment(200.34);
    motion.Start({
      environment: e,
    });
    motion.AddDetector(new ent.PositionDetector("Position 1", 100));
    motion.AddDetector(new ent.PositionDetector("Position 2", 200));
    e.getAllOpenPositions().should.be.eql([
    {
      name: "Position 1",
      value: 100,
      originalValue: 100
    },
    {
      name: "Position 2",
      value: 200,
      originalValue: 200
    }]);
    //TODO: originalIntentity needs to exist for t-motion-detector core module
  });

  it('Should be able to compute the current account balance', function () {
    motion.Reset();

    let e = new ent.AccountEnvironment(200.34);
    motion.Start({
      environment: e,
    });
    motion.AddDetector(new ent.PositionDetector("Position 1", 100));
    motion.AddDetector(new ent.PositionDetector("Position 2", 200));
    e.calculateBalance().should.equal(300);
  });

  it('Should be able to compute percentage growth/loss', function () {
    motion.Reset();

    let e = new ent.AccountEnvironment(100);
    motion.Start({
      environment: e,
    });
    motion.AddDetector(new ent.PositionDetector("Position 1", 50));
    motion.AddDetector(new ent.PositionDetector("Position 2", 40));
    e.calculateGrowthPerc().should.equal(-10);
  });

  it('Should be able to sync with the account balance from an API Proxy (e.g. binance) - Resets the environment', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof motion.Entities.Environment).should.equal(true);
    should.fail();
  });
});