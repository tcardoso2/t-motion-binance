let m_cli = require('t-motion-detector-cli');
let m = m_cli._;
let ent = m.Entities;
var log = m.Log;
let ext = m.Extensions;
const binance = require('binance');

/*
 * Manages an account environment with investments 
 */
class AccountEnvironment extends ent.Environment{
  
  constructor(amount){
    super({state: amount});
  }

/**
 * Called internally when adding Detectors to the Account Environment. It will check if the Detector is
 * of type PositionDetector, and will throw an exception if it's not.
 * @public
 */
  bindDetector(md, notifiers, force = false){
    if (!(md instanceof PositionDetector)) throw new Error("Detectors can only be of 'PositionDetector' type.");
    return super.bindDetector(md, notifiers, force);
  }

/**
 * Gets all existing open positions, their names, current and original values
 * @returns an array of dictionaries containing original, current value and position name (currency).
 * @public
 */
  getAllOpenPositions(){
    let result = [];
    for (let p in this.motionDetectors){
      result.push({
        name: this.motionDetectors[p].name,
        originalValue: this.motionDetectors[p].getOriginalIntensity(),
        value: this.motionDetectors[p].getIntensity()
      })
    }
    return result;
  }
/**
 * Calculates the sum of all the values of all the Positions opened.
 * @public
 */
  calculateBalance(){
    let result = 0;
    for (let p in this.motionDetectors){
      result += this.motionDetectors[p].getIntensity();
    }
    return result;    
  }
/**
 * Calculates the growth percentage calculating the Account original set value with the @calculateBalance value.
 * @public
 */
  calculateGrowthPerc(){
    return 100*this.calculateBalance() / this.getOriginalState() - this.getOriginalState();
  }
}

/*
 * Manages a specific position / investment maintaining current balance
 */
class PositionDetector extends ent.MotionDetector{

  constructor(name, value){
    super(name, value);
  }
}

/*
 * Detects changes directly from the TradingProxyEnvironment
 */
class TradeProxyDetector extends ent.MotionDetector{

  constructor(currencyPair){
    super(currencyPair);
  }
}

/*
 * Creates an environment wich is able to communicate directly with the Binance Broker API using a wrapper
 * of the binance module
 */
class TradingProxyEnvironment extends ent.GetExtensions().APIEnvironment{

  constructor(key, secret, endpoint, isMockMode){
    super(key, secret, endpoint, isMockMode);
    this.apiWrapper = new binance.BinanceWS(true); // Argument specifies whether the responses should be beautified, defaults to true
  }
  
  //Expects a MotionDetector entity passed as arg
  bindDetector(md, notifiers, force = false){
    super.bindDetector(md, notifiers, force);
    //Uses the name as the currency pair
    let _this = this;
    this.apiWrapper.onDepthUpdate(md.name, (data) => {
      _this.addChange(data);
    });
   
    this.apiWrapper.onAggTrade(md.name, (data) => {
      _this.addChange(data);
    });
   
    this.apiWrapper.onKline(md.name, (data) => {
      _this.addChange(data);
    });
  }
  /*
   * Gets the detectors from the Trading environment and adds proxies to it.
   * @param {Function} a callback function.
   */
  syncBalances(callback){
    let _this = this;
    this.binanceRest = new binance.BinanceRest({
      key: _this._key,
      secret: _this._secret,
      timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
      recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
      disableBeautification: false
    });
    return this.binanceRest.account((error, data)=>{
      if(!error){
        let value, asset;
        for(let i in data.balances){
          value = parseFloat(data.balances[i].free);
          asset = data.balances[i].asset;
          if(value > 0){
            log.info(`Creating detector for ${asset} with value: ${value}`);
            m.AddDetector(new TradeProxyDetector(asset, value));
          }
        }
      }
      callback(error, data);
    });
  }
}

//Extending Entities Factory
const classes = { AccountEnvironment, PositionDetector, TradingProxyEnvironment, TradeProxyDetector};

new ent.EntitiesFactory().extend(classes);

exports.AccountEnvironment = AccountEnvironment;
exports.PositionDetector = PositionDetector;
exports.TradingProxyEnvironment = TradingProxyEnvironment;
exports.TradeProxyDetector = TradeProxyDetector;