/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
//Deps
var fs = require("fs")
var log4js = require("log4js")

// Env Vars
var appName = process.env.appName || "edge-redirector-server"
var level =
  process.env.logLevel && process.env.logLevel != "NONE"
    ? process.env.logLevel
    : "WARN"

// Local Vars
var dir = "./logs"
var logFileNameWithPath = "./logs/app.log"
var config = {}

// Check for the logs directory, if not present, create it.
fs.exists(dir, function(exists) {
  if (exists) {
    loggerRun()
    log4js.configure(config)
  } else {
    fs.mkdir(dir, function() {
      loggerRun()
      log4js.configure(config)
    })
  }
})

function loggerRun() {
  console.log("Log level is : " + level)
  config = {
    appenders: [
      {
        category: "edge-redirector-server",
        type: "file",
        filename: logFileNameWithPath,
        layout: {
          type: "pattern",
          pattern: "%d{yyyy-MM-dd hh:mm:ss} (%x{pid}) %p %c %m%n %",
          tokens: {
            pid: function() {
              var id = process.env.instanceId || process.pid
              return id
            }
          }
        },
        maxLogSize: 2096,
        backups: 3
      },
      {
        type: "console"
      }
    ],
    replaceConsole: true,
    levels: {
      "edge-redirector-server": level
    }
  }
}

exports.getLogger = function() {
  return log4js.getLogger("edge-redirector-server")
}
