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
let _ = require('underscore');
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

var actualProxyEnv;

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
  
  it('Should get updates from the current environment', function (done) {
    this.timeout(8000);
    helperReset();
    let _config = new main._.Config("/test/config_trade_environment_test1.js");
    let t1, t2, t3 = false;
    let _done = false;
    main._.StartWithConfig(_config, (e,d,n,f) =>{
      (e instanceof motion.Entities.Environment).should.equal(true);
      d.length.should.equal(1);
      (d[0] instanceof ent.TradeProxyDetector).should.equal(true);
      console.log("Creating 'hasDetected' event...");
      d[0].on("hasDetected", function(currentIntensity, newState, source, detector){
        if(currentIntensity)
        {
          source.should.eql(e);
          detector.should.eql(d[0]);
          newState.symbol.should.equal("BTCUSDT");
          console.log(newState);
          if(newState.eventType === "aggTrade")
          {
            console.log("Got Aggregated Trade!");
            //newState.data);
            t1 = true;
          }
          if(newState.eventType === "depthUpdate")
          {
            console.log("Got Depth Update!");
            t2 = true;
          }
          if(newState.eventType === "kLine")
          {
            console.log("Got Kline!");
          }
          if(t1 && t2 && !_done){
            _done = true;
            done();
          }
        }
        else{
          console.log("  > Detected non-API movement:", newState);
        }
      });
    });
  });

  it('Should get updates via Motion Detectors from the exchange market', function (done) {
    helperReset();
    let _config = new main._.Config("/test/config_trade_environment_test.js");
    main._.StartWithConfig(_config, (e,d,n,f) =>{
      d[0].on("hasDetected", function(currentIntensity, newState, source, detector){
        source.apiWrapper.onDepthUpdate.should.not.equal(undefined);
        console.log(newState);
        done();
      });
    });
  });

  it('if a Motion Detector is added should be of type TradeProxyDetector', function (done) {
    helperReset();
    let _config = new main._.Config("/test/config_trade_environment_test2.js");
    try{
      main._.StartWithConfig(_config, (e,d,n,f) =>{
        d[0].on("hasDetected", function(currentIntensity, newState, source, detector){
          source.apiWrapper.onDepthUpdate.should.not.equal(undefined);
          done();
        });
      });
    } catch(e){
      e.message.should.equal("Motion Detector must be of type TradeProxyDetector");
      done();
      return;
    }
    should.fail();
  });

  it('Adding a Detector later should still allow to detect changes from the exhange market as well', function (done) {
    this.timeout(8000);
    helperReset();
    let _config = new main._.Config("local_test1.js");
    let md = new ent.TradeProxyDetector("BTCUSDT"); // Needs to have a real existing position with this pair!
    let _done = false;
    md.on("hasDetected", function(currentIntensity, newState, source, detector){
      source.apiWrapper.onDepthUpdate.should.not.equal(undefined);
      console.log("Detected movement!");
      console.log(newState);
      if(!_done){
        _done = true;
        done();
      }
    });
    (md instanceof motion.Entities.MotionDetector).should.equal(true);
    (md instanceof motion.Entities.GetExtensions().TradeProxyDetector).should.equal(true);
    main._.StartWithConfig(_config, (e,d,n,f) =>{
      console.log("Adding detector to Environment after configuration start...");
      main._.AddDetector(md);
      e.motionDetectors.length.should.equal(1);
    });
  });
  
  it('Should create automatically positions proxies based on the actual positions held', function (done) {
    this.timeout(8000);
    helperReset();

    let allTrue = (obj) =>
    {
      for(var o in obj)
      {
          if(o == "USDT") continue;
          if(!obj[o]) return false;
      }
      return true;
    }

    let _config = new main._.Config("local_test1.js");
    main._.StartWithConfig(_config, (e,d,n,f) =>{
      e.syncBalances((error, data) => {
        console.log("Testing basic checks...");
        (error == null).should.equal(true);
        data.canTrade.should.equal(true);
        data.canWithdraw.should.equal(true);
        data.canDeposit.should.equal(true);
        data.balances[0].asset.should.equal("BTC");
        console.log("Done. Testing dynamically created detectors...")
        //Should at least be a real account with one existing position
        d.length.should.be.gt(0);
        (d[1] == undefined).should.not.equal(true);
        (d[1] instanceof ent.TradeProxyDetector).should.equal(true);
        console.log(`  > Number of detectors found: ${d.length}`);
        let __done = false;
        let result = {};
        for(let ixd = 0; ixd < d.length; ixd++){
          console.log(`  > Adding 'hasDetected' listener to a dinamically generated detector ${ixd}: ${d[ixd].name}... waiting for response`)
          result[d[ixd].name] = false;
          d[ixd].on("hasDetected", function(currentIntensity, newState, source, detector){
            if(currentIntensity)
            {
              newState.symbol.should.equal(d[ixd].name);
              //console.log(`    >> Detected movement, detector: ${detector.name}.${newState.eventType}!`);
              result[d[ixd].name] = true;
              //check if all detectors detected movement except USDT
              if(!__done && allTrue(result)){
                __done = true;
                console.log("      >>> testing:", result);
                done();
              }
            }
          });
        }
      })
    });
  });
});

describe("When a new PositionProxyNotifier is Opened, ", function() {
  it('Should listen to a PositionDetector', function () {
    helperReset();
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

describe("When a TradingProxyEnvironment triggers a change via TradeDetectorProxy,", function() {
  it('Should get the current balance from the trading environment', function (done) {
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