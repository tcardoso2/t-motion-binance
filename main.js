#!/usr/bin/env node

let mdc = require('t-motion-detector-cli');
let _ = mdc._;

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
exports.PreAddPlugin = PreAddPlugin;
exports.PostAddPlugin = PostAddPlugin;
exports.PreRemovePlugin = PreRemovePlugin;
exports.PostRemovePlugin = PostRemovePlugin;