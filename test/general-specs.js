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

/*TODO: Redo this later when I have a more mature set of unit tests, focus first on AccountEnvironment,
PositionDetector, TradeProxy and PositionProxyDetectors,
This one is more on the detecting the strenght of signals side*/
describe("When a TraderDetector is added, ", function() {
  it('should store a list of current investments', function () {
    //Prepare
      helperReset();
      let _config = new main._.Config("/test/config_binance_test1.js");
      main._.StartWithConfig(_config, (e,d,n,f) =>{
        n[0].on('pushedNotification', function(message, text, data){
          console.log(data.newState);
          data.newState.row.should.be.gt(5);

          done();
        });
      });
  });
  it('should get a list of how much each coin has valued/devalued since purchase', function () {
    //Prepare
    should.fail();
  });
  it('Should start a worker via socket to compare a currency pair', function () {
    //Prepare
    should.fail();
  });
  it('Should trigger a purchase when is good to buy', function () {
    //Prepare
    should.fail();
  });
  it('Should trigger a sale when is good to sell', function () {
    //Prepare
    should.fail();
  });
  it('Should set the amount to buy/sell', function () {
    //Prepare
    should.fail();
  });
});

describe("When a currency pair is set, ", function() {
  it('should be able to store the values at the start', function () {
    //Prepare
    should.fail();
  });
  it('should track the change every X amount of time', function () {
    //Prepare
    should.fail();
  });
  it('should trigger an event when value changes more than % percent', function () {
    //Prepare
    should.fail();
  });
  it('should be able to set a stop-limit', function () {
    //Prepare
    should.fail();
  });
  it('should trigger an event when value reaches a stop-limit', function () {
    //Prepare
    should.fail();
  });
  it('should be able to detect a crash', function () {
    //Prepare
    should.fail();
  });
  it('should be able to pass the currency to USDT to prevent losses', function () {
    //Prepare
    should.fail();
  });
  it('should be able to reinstate back values by re-buying positions when market is ok', function () {
    //Prepare
    should.fail();
  });
});

describe("When using a t-motion-detector-cli to visualize current investments, ", function() {
  it('Should be able to show a view of all investments', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof motion.Entities.Environment).should.equal(true);
    should.fail();
  });

  it('Should be able to show a view a detailed investment', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof motion.Entities.Environment).should.equal(true);
    should.fail();
  });

  it('Should be able to show the chart of a detailed investment', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof motion.Entities.Environment).should.equal(true);
    should.fail();
  });
});