let m = require('t-motion-detector');
let ent = m.Entities;
var log = m.Log;
let ext = m.Extensions;

class AccountEnvironment extends ent.Environment{
  
  constructor(amount){
    super();
    this.currentState = amount;
  }
}

exports.AccountEnvironment = AccountEnvironment;