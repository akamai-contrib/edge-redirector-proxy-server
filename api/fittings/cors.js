/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
'use strict';

var CORS = require('cors');
var logger = require("../log_module/logMod").getLogger();

// config options: https://www.npmjs.com/package/cors

module.exports = function create(fittingDef) {

  // Chaging origin arry to RegExp. couldn't find a way to define regex in Yaml
  fittingDef.origin = createRegex(fittingDef.origin);
  var middleware = CORS(fittingDef);
  return function cors(context, cb) {
    middleware(context.request, context.response, cb);
  }
};

function createRegex(allowedOrigins){
  var origins = [];
  if(Array.isArray(allowedOrigins)){
    var i = 0;
    for (; i < allowedOrigins.length; ++i) {
      origins.push(new RegExp(allowedOrigins[i]));
    }
  }else{
    origins.push(new RegExp(allowedOrigins));
  }
    return origins;
}
