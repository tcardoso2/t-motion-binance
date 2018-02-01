#!/usr/bin/env node

let md = require('t-motion-detector');
let _ = md;
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

exports._ = _
exports.PreAddPlugin = PreAddPlugin;
exports.PostAddPlugin = PostAddPlugin;
exports.PreRemovePlugin = PreRemovePlugin;
exports.PostRemovePlugin = PostRemovePlugin;