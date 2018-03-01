#!/usr/bin/env node

let mdc = require('t-motion-detector-cli');
let _ = mdc._;
let log = mdc.Log;

/**
 * Called when t-motion-detector is started. Called when StartWithConfig is called.
 * Adds default detector routes needed for the t-motion-detector-cli web-app
 * @return {boolean} True the plugin was successfully added.
 */
function Start(e,m,n,f,config){
  log.info("Running 'Start' function of Plugin ${module.id}. Config exists? `${config}`");
  mdc.Start(e,m,n,f,config);
 }

//Plugin exports
function PreAddPlugin()
{
}
function PostAddPlugin(plugin)
{
  _ = plugin._;
}
function PreRemovePlugin(plugin)
{
}
function PostRemovePlugin()
{
}

/**
 * Called when t-motion-detector is reset. Called when Reset is called.
 * Emits also a "reset" event which can be used for performing additional tasks
 * @return {boolean} True the plugin was successfully added.
 */
function Reset(){
  log.info("Calling plugin Reset method...");
  //Do some reset stuff here
  this.emit("reset");
}

exports._ = _;
exports._cli = mdc;
exports.Log = log;
exports.PreAddPlugin = PreAddPlugin;
exports.PostAddPlugin = PostAddPlugin;
exports.PreRemovePlugin = PreRemovePlugin;
exports.PostRemovePlugin = PostRemovePlugin;

log.info("Adding this module as plugin...");
if(!_.AddPlugin(module)) throw new Error('There was an error adding this plug-in');