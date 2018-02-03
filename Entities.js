let m = require('t-motion-detector');
let ent = m.Entities;
var log = m.Log;
let ext = m.Extensions;

class AccountEnvironment extends ent.Environment{
  
  constructor(amount){
    super({state: amount});
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
        originalValue: this.motionDetectors[p].originalIntensity,
        value: this.motionDetectors[p].currentIntensity
      })
    }
    return result;
  }
}

class PositionDetector extends ent.MotionDetector{

  constructor(){
    super();
  }
}

exports.AccountEnvironment = AccountEnvironment;
exports.PositionDetector = PositionDetector;