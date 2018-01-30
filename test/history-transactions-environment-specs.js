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

describe("When a new HistoryTransactionsEnvironment is created, ", function() {
  it('Should inherit the Environment class', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should listen for Closing Events/notifications from the AccountEnvironment', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof t.Entities.Environment).should.equal(true);
  });

  it('Should be able to list all historical transactions', function () {
    let e = new ent.AccountEnvironment(200.34);
    (e instanceof t.Entities.Environment).should.equal(true);
  });
});