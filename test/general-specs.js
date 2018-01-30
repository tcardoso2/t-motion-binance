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

describe("When an API environment is created, ", function() {
  it('Should inherit the Environment class', function () {
    let e = new ent.APIEnvironment(2);
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should take the API key and API secret as parameters', function () {
    let e = new ent.APIEnvironment(4);
    e.countNodes().should.equal(4);
  });

  it('if no parameter is passed, results in an error', function () {
    try{
      let e = new ent.APIEnvironment();
    } catch(e){
      e.message.should.equal("ERROR: Number of nodes is mandatory and cannot equal 0.");
      return;
    }
    should.fail();
  });
});

describe("When a detector is added, ", function() {
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
  });
  it('Should start a worker via socket to compare a currency pair', function () {
    //Prepare
  });
  it('Should trigger a purchase when is good to buy', function () {
    //Prepare
  });
  it('Should trigger a sale when is good to sell', function () {
    //Prepare
  });
  it('Should set the amount to buy/sell', function () {
    //Prepare
  });
});

describe("When a currency pair is set, ", function() {
  it('should be able to store the values at the start', function () {
    //Prepare
  });
  it('should track the change every X amount of time', function () {
    //Prepare
  });
  it('should trigger an event when value changes more than % percent', function () {
    //Prepare
  });
  it('should be able to set a stop-limit', function () {
    //Prepare
  });
  it('should trigger an event when value reaches a stop-limit', function () {
    //Prepare
  });
  it('should be able to detect a crash', function () {
    //Prepare
  });
  it('should be able to pass the currency to USDT to prevent losses', function () {
    //Prepare
  });
  it('should be able to reinstate back values by re-buying positions when market is ok', function () {
    //Prepare
  });
});