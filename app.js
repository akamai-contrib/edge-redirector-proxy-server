/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var swaggerUI = require('swagger-tools/middleware/swagger-ui');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['yaml'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}
var cluster = require('cluster');

var workers = process.env.WORKERS || require('os').cpus().length;

if (cluster.isMaster) {

  console.log('start cluster with %s workers', workers);

  for (var i = 0; i < workers; ++i) {
    var worker = cluster.fork().process;
    console.log('worker %s started.', worker.pid);
  }

  cluster.on('exit', function(worker) {
    console.log('worker %s died. restart...', worker.process.pid);
    cluster.fork();
  });

} else {

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  app.use("/static/definitions", express.static(__dirname + '/static/definitions'));
  app.use(swaggerUI(swaggerExpress.runner.swagger));
  swaggerExpress.register(app);

  var port = process.env.PORT || 8080;
  app.listen(port);

});

}
