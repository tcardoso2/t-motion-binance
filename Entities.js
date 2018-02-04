let m_cli = require('t-motion-detector-cli');
let m = m_cli._;
let ent = m.Entities;
var log = m.Log;
let ext = m.Extensions;

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
 * Creates an environment wich is able to communicate directly with the Broker API
 */
class TradingProxyEnvironment extends ent.GetExtensions().APIEnvironment{

  constructor(key, secret, endpoint, isMockMode){
    super(key, secret, endpoint, isMockMode);
  }
}

//Extending Entities Factory
const classes = { AccountEnvironment, PositionDetector, TradingProxyEnvironment };

new ent.EntitiesFactory().extend(classes);

exports.AccountEnvironment = AccountEnvironment;
exports.PositionDetector = PositionDetector;
exports.TradingProxyEnvironment = TradingProxyEnvironment;