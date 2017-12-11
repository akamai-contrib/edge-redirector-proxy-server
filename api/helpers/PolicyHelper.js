/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
"use strict"
var EdgeGrid = require("edgegrid")
var util = require("util")
var logger = require("../log_module/logMod").getLogger()
var request = require("request")
var async = require("async")
var lodash = require("lodash")

// EdgeGrid Client
var eg = new EdgeGrid({
  path: "./.edgerc",
  section: "cloudlets",
  debug: false
})

//TODO: replace with company
var proxy = "http://$proxy_url:$proxy_port"
var proxyRequest = request.defaults({
  proxy: proxy
})

//This function is to expose edge grid object so that we can Mock it. Couldn't find a better way :(
exports.getEdgeGridClient = function() {
  return eg
}

//This function is to expose proxyRequest object so that we can Mock it. Couldn't find a better way :(
exports.getProxyRequest = function() {
  return proxyRequest
}

exports.getActivePolicy = function(req, res, id, network, next) {
  try {
    var callBackUtility = {
      req: req,
      res: res,
      network: network,
      next: next
    }
    callBackUtility.utility = callBackForGetActivePolicyForNetwork
    return getAllVersionsOfAPolicyFunc(id, callBackUtility)
  } catch (e) {
    res.status(500)
    return next(e)
  }
}
exports.getPolicyByVersion = function(req, res, policyInfo, next) {
  try {
    var callBackUtility = {
      req: req,
      res: res,
      next: next,
      utility: function(data) {
        this.res.send(data)
      }
    }
    return getPolicyByVersionFunc(policyInfo, callBackUtility)
  } catch (e) {
    res.status(500)
    return next(e)
  }
}
exports.getAllVersionsOfAPolicy = function(req, res, id, next) {
  try {
    var callBackUtility = {
      req: req,
      res: res,
      next: next,
      utility: function(data) {
        this.res.send(data)
      }
    }
    return getAllVersionsOfAPolicyFunc(id, callBackUtility)
  } catch (e) {
    res.status(500)
    next(e)
  }
}

exports.getAllActivationInfo = function(req, res, id, next) {
  try {
    var callBackUtility = {
      req: req,
      res: res,
      next: next,
      utility: function(data) {
        this.res.send(data)
      }
    }
    logger.debug("id:      " + id)
    return getAllActivationInfoFunc(id, callBackUtility)
  } catch (e) {
    res.status(500)
    return next(e)
  }
}

exports.postNewVersion = function(req, res, id, json, next) {
  try {
    var callBackUtility = {
      req: req,
      res: res,
      next: next,
      utility: function(data) {
        this.res.send(data)
      }
    }
    postNewVersionFunc(id, json, callBackUtility)
  } catch (e) {
    res.status(500)
    return next(e)
  }
}

exports.addRule = function(req, res, id, version, json, next) {
  try {
    var callBackUtility = {
      req: req,
      res: res,
      next: next,
      utility: function(data) {
        this.res.send(data)
      }
    }
    addRuleFunc(id, version, json, callBackUtility)
  } catch (e) {
    res.status(500)
    return next(e)
  }
}

exports.activateVersion = function(req, res, id, version, network, next) {
  try {
    var callBackUtility = {
      req: req,
      res: res,
      next: next,
      utility: function(data) {
        this.res.send(data)
      }
    }
    activateVersionFunc(id, version, network, callBackUtility)
  } catch (e) {
    res.status(500)
    return next(e)
  }
}

exports.deleteRule = function(req, res, id, version, json, next) {
  var callBackUtility = {
    req: req,
    res: res,
    next: next,
    utility: function(data) {
      this.res.send(data)
    }
  }
  deleteRuleFunc(id, version, json, callBackUtility)
}

exports.editRule = function(req, res, id, version, editInfo, next) {
  var callBackUtility = {
    req: req,
    res: res,
    next: next,
    utility: function(data) {
      this.res.send(data)
    }
  }

  editRuleFunc(id, version, editInfo, callBackUtility)
}

exports.validatePolicyRules = function(req, res, id, version, network, next) {
  var callBackUtility = {
    req: req,
    res: res,
    next: next,
    utility: function(data) {
      this.res.send(data)
    }
  }
  validatePolicyRulesFunc(id, version, network, callBackUtility)
}

var editRuleFunc = function(id, version, editInfo, callBackUtility) {
  try {
    if (callBackUtility.req && callBackUtility.res) {
      var path = "/cloudlets/api/v2/policies/" + id + "/versions/" + version
      eg.auth({
        path: path,
        method: "GET"
      })

      eg.send(function(data, response) {
        editInfoToUpdateRule(path, editInfo, data, callBackUtility)
      })
    }
  } catch (e) {
    callBackUtility.res.status(500)
    callBackUtility.next(e)
  }
}

var editInfoToUpdateRule = function(path, editInfo, data, callBackUtility) {
  try {
    if (JSON.parse(data)["errorCode"] || JSON.parse(data)["status"] >= 400) {
      data = JSON.parse(data)
      var message = data.errorMessage || data.title
      var statusCode = data["errorCode"] || data["status"]
      logger.error(
        "ERROR: See Below for Details from Akamai status code : " +
          statusCode +
          " message : " +
          message
      )
      sendError(callBackUtility.res, data["errorCode"], data["errorMessage"])
    } else {
      data = JSON.parse(data)
      var currentMatchValue = editInfo["currentMatchValue"]
      var currentRedirect = editInfo["currentRedirect"]

      var ruleToUpdate = null
      var bool = false
      for (var i = 0; i < data["matchRules"].length; i++) {
        //if matches exist (path mathcing), get the value from path matching
        var matchURL = ""
        if (data["matchRules"][i]["matches"]) {
          matchURL = data["matchRules"][i]["matches"][0]["matchValue"]
        } else if (data["matchRules"][i]["matchURL"]) {
          matchURL = data["matchRules"][i]["matchURL"]
        } else {
          logger.error("Rule is invalid")
        }
        var redirectURL = data["matchRules"][i]["redirectURL"]

        logger.debug("matchURL in loop: " + matchURL)
        logger.debug("redirectURL in loop: " + redirectURL)
        logger.debug("currentMatchValue from input: " + currentMatchValue)
        logger.debug("currentRedirect from input: " + currentRedirect)

        if (matchURL === currentMatchValue && redirectURL === currentRedirect) {
          bool = true
          data["matchRules"][i]["matches"][0]["matchValue"] =
            editInfo["newMatchValue"]
          data["matchRules"][i]["redirectURL"] = editInfo["newRedirect"]

          delete data["revisionId"]
          delete data["policyId"]
          delete data["version"]
          delete data["createdBy"]
          delete data["createDate"]
          delete data["lastModifiedBy"]
          delete data["lastModifiedDate"]
          delete data["activations"]
          delete data["deleted"]
          delete data["rulesLocked"]
          delete data["location"]

          for (var j = 0; j < data["matchRules"].length; j++) {
            delete data["matchRules"][j]["akaRuleId"]
            delete data["matchRules"][j]["end"]
            delete data["matchRules"][j]["id"]
            delete data["matchRules"][j]["location"]
            delete data["matchRules"][j]["start"]
            delete data["matchRules"][j]["useIncomingQueryString"]
          }

          performPut(path, data, callBackUtility)
        }
      }

      if (!bool) {
        return callBackUtility.res.send({
          code: "401",
          message: "Rule chosen to edit does not match any rules."
        })
      }
    }
  } catch (e) {
    callBackUtility.res.status(500)
    return callBackUtility.next(e)
  }
}

var deleteRuleFunc = function(id, version, json, callBackUtility) {
  try {
    if (callBackUtility.req && callBackUtility.res) {
      logger.debug("Inside PolicyHelper :: deleteRule for policy : " + id)
      var path = "/cloudlets/api/v2/policies/" + id + "/versions/" + version

      eg.auth({
        path: path,
        method: "GET"
      })

      eg.send(function(data, response) {
        createDELETEJson(path, json, data, callBackUtility)
      })
    }
  } catch (e) {
    callBackUtility.res.status(500)
    return callBackUtility.next(e)
  }
}

var createDELETEJson = function(path, json, data, callBackUtility) {
  try {
    var redirectURLToDelete = json["matchRules"][0]["redirectURL"]
    var matchToDelete = json["matchRules"][0]["matches"][0]["matchValue"]

    var final = []

    if (JSON.parse(data)["errorCode"] || JSON.parse(data)["status"] >= 400) {
      data = JSON.parse(data)
      var message = data.errorMessage || data.title
      logger.error("ERROR: " + message)
      path = data
    } else {
      data = JSON.parse(data)
      var matchRulesDataArray = data["matchRules"]

      for (var i = 0; i < matchRulesDataArray.length; i++) {
        var singleMatchRule = matchRulesDataArray[i]

        var matchValue = singleMatchRule["matches"][0]["matchValue"]
        var redirectURL = singleMatchRule["redirectURL"]
        if (
          matchToDelete === matchValue ||
          redirectURLToDelete === redirectURL
        ) {
          continue
        } else {
          var newjson = {
            matches: singleMatchRule["matches"],
            redirectURL: redirectURL,
            statusCode: singleMatchRule["statusCode"],
            type: singleMatchRule["type"]
          }

          final.push(newjson)
        }
      }
      json["matchRules"] = final
      performPut(path, json, callBackUtility)
    }
  } catch (e) {
    callBackUtility.res.status(500)
    return callBackUtility.next(e)
  }
}

var activateVersionFunc = function(id, version, network, callBackUtility) {
  try {
    if (callBackUtility.req && callBackUtility.res) {
      logger.debug("Inside PolicyHelper :: activate for policy : " + id)
      var path =
        "/cloudlets/api/v2/policies/" +
        id +
        "/versions/" +
        version +
        "/activations/"
      var body = {
        network: network
      }

      eg.auth({
        path: path,
        method: "POST",
        body: body
      })

      eg.send(function(data, response) {
        try {
          if (
            JSON.parse(data)["errorCode"] ||
            JSON.parse(data)["status"] >= 400
          ) {
            data = JSON.parse(data)
            var message = data.errorMessage || data.title
            var statusCode = data.errorCode || data.status
            logger.error(
              "ERROR: See Below for Details from Akamai status code : " +
                statusCode +
                " message : " +
                message
            )
            sendError(callBackUtility.res, statusCode, message)
          } else if (callBackUtility.utility) {
            callBackUtility.utility(parseDataIntoJSON(data))
          } else {
            callBackUtility.res.send(parseDataIntoJSON(data))
          }
        } catch (e) {
          callBackUtility.res.status(500)
          return callBackUtility.next(e)
        }
      })
    }
  } catch (e) {
    callBackUtility.res.status(500)
    return callBackUtility.next(e)
  }
}

var addRuleFunc = function(id, version, json, callBackUtility) {
  try {
    if (callBackUtility.req && callBackUtility.res) {
      logger.debug("Inside PolicyHelper :: addRule for policy : " + id)
      var path = "/cloudlets/api/v2/policies/" + id + "/versions/" + version

      eg.auth({
        path: path,
        method: "GET"
      })

      eg.send(function(data, response) {
        createPUTJson(path, json, data, callBackUtility)
      })
    }
  } catch (e) {
    callBackUtility.res.status(500)
    return callBackUtility.next(e)
  }
  //PUT stuff here. Will need other helper methods for GET call first.
}

var createPUTJson = function(path, json, data, callBackUtility) {
  try {
    if (JSON.parse(data)["errorCode"] || JSON.parse(data)["status"] >= 400) {
      data = JSON.parse(data)
      var message = data.errorMessage || data.title
      var statusCode = data.errorCode || data.status
      logger.error(
        "ERROR: See Below for Details from Akamai status code : " +
          statusCode +
          " message : " +
          message
      )
      sendError(callBackUtility.res, data["errorCode"], data["errorMessage"])
    } else {
      data = JSON.parse(data)
      var final = []
      var matchRulesDataArray = data["matchRules"]

      //for each redirects in the current version, creates new object to add to the array
      for (var i = 0; i < matchRulesDataArray.length; i++) {
        var singleMatchRule = matchRulesDataArray[i]

        var newjson = {
          matches: singleMatchRule["matches"],
          redirectURL: singleMatchRule["redirectURL"],
          statusCode: singleMatchRule["statusCode"],
          type: singleMatchRule["type"]
        }

        final.push(newjson)
      }

      //gets the match rules from the new json, adds each to the new array
      var redirectsToAdd = json["matchRules"]

      for (var j = 0; j < redirectsToAdd.length; j++) {
        var individualRedirect = redirectsToAdd[j]
        final.push(individualRedirect)
      }

      json["matchRules"] = final
      performPut(path, json, callBackUtility)
    }
  } catch (e) {
    callBackUtility.res.status(500)
    return callBackUtility.next(e)
  }
}

var performPut = function(path, json, callBackUtility) {
  eg.auth({
    path: path,
    method: "PUT",
    body: json
  })

  eg.send(function(data, response) {
    try {
      if (JSON.parse(data)["errorCode"] || JSON.parse(data)["status"] >= 400) {
        data = JSON.parse(data)
        var message = data.errorMessage || data.title
        var statusCode = data.errorCode || data.status
        logger.error(
          "ERROR: See Below for Details from Akamai status code : " +
            statusCode +
            " message : " +
            message
        )
        sendError(callBackUtility.res, statusCode, message)
      } else if (JSON.parse(data).length === 0) {
        data = {
          errorCode: -1,
          errorMessage: "No activations on this policy"
        }
        sendError(callBackUtility.res, data["errorCode"], data["errorMessage"])
      } else if (callBackUtility.utility) {
        callBackUtility.utility(parseDataIntoJSON(data))
      } else {
        callBackUtility.res.send(parseDataIntoJSON(data))
      }
    } catch (e) {
      callBackUtility.res.status(500)
      return callBackUtility.next(e)
    }
  })
}

var postNewVersionFunc = function(id, json, callBackUtility) {
  try {
    if (callBackUtility.req && callBackUtility.res) {
      logger.debug("Inside PolicyHelper :: postNewVersion for policy : " + id)
      var path = "/cloudlets/api/v2/policies/" + id + "/versions/"

      eg.auth({
        path: path,
        method: "POST",
        body: json
      })

      eg.send(function(data, response) {
        try {
          if (
            JSON.parse(data)["errorCode"] ||
            JSON.parse(data)["status"] >= 400
          ) {
            data = JSON.parse(data)
            var message = data.errorMessage || data.title
            var statusCode = data.errorCode || data.status
            logger.error(
              "ERROR: See Below for Details from Akamai status code : " +
                statusCode +
                " message : " +
                message
            )
            sendError(callBackUtility.res, statusCode, message)
          } else if (JSON.parse(data).length === 0) {
            data = {
              errorCode: -1,
              errorMessage: "No activations on this policy"
            }
            sendError(
              callBackUtility.res,
              data["errorCode"],
              data["errorMessage"]
            )
          } else if (callBackUtility.utility) {
            callBackUtility.utility(parseDataIntoJSON(data))
          } else {
            callBackUtility.res.send(parseDataIntoJSON(data))
          }
        } catch (e) {
          callBackUtility.res.status(500)
          return callBackUtility.next(e)
        }
      })
    }
  } catch (e) {
    callBackUtility.res.status(500)
    return callBackUtility.next(e)
  }
}

var getAllActivationInfoFunc = function(id, callBackUtility) {
  try {
    if (callBackUtility.req && callBackUtility.res) {
      logger.debug(
        "Inside PolicyHelper :: getAllActivationInfo for policy : " + id
      )
      var path = "/cloudlets/api/v2/policies/" + id + "/activations/"

      eg.auth({
        path: path,
        method: "GET"
      })

      eg.send(function(data, response) {
        try {
          logger.debug("data:     " + JSON.parse(data).length)
          if (
            JSON.parse(data)["errorCode"] ||
            JSON.parse(data)["status"] >= 400
          ) {
            data = JSON.parse(data)
            var message = data.errorMessage || data.title
            var statusCode = data.errorCode || data.status
            logger.error(
              "ERROR: See Below for Details from Akamai status code : " +
                statusCode +
                " message : " +
                message
            )
            sendError(callBackUtility.res, statusCode, message)
          } else if (JSON.parse(data).length === 0) {
            logger.warn("No activations on this policy")
            return sendError(
              callBackUtility.res,
              404,
              "No activations on this policy"
            )
          } else if (callBackUtility.utility) {
            return callBackUtility.utility(parseDataIntoJSON(data))
          } else {
            return callBackUtility.res.send(parseDataIntoJSON(data))
          }
        } catch (e) {
          callBackUtility.res.status(500)
          return callBackUtility.next(e)
        }
      })
    }
  } catch (e) {
    callBackUtility.res.status(500)
    return callBackUtility.next(e)
  }
}

var getPolicyByVersionFunc = function(policyInfo, callBackUtility) {
  try {
    if (callBackUtility.req && callBackUtility.res) {
      logger.debug(
        "Inside PolicyHelper :: getPolicyByVersionFunc for policy : " +
          policyInfo.id +
          " and version : " +
          policyInfo.version
      )
      var path =
        "/cloudlets/api/v2/policies/" +
        policyInfo.id +
        "/versions/" +
        policyInfo.version

      eg.auth({
        path: path,
        method: "GET"
      })

      eg.send(function(data, response) {
        try {
          if (
            JSON.parse(data)["errorCode"] ||
            JSON.parse(data)["status"] >= 400
          ) {
            data = JSON.parse(data)
            var message = data.errorMessage || data.title
            var statusCode = data.errorCode || data.status
            logger.error(
              "ERROR: See Below for Details from Akamai status code : " +
                statusCode +
                " message : " +
                message
            )
            sendError(callBackUtility.res, statusCode, message)
          } else if (callBackUtility.utility) {
            return callBackUtility.utility(parseDataIntoJSON(data))
          } else {
            return callBackUtility.res.send(parseDataIntoJSON(data))
          }
        } catch (e) {
          callBackUtility.res.status(500)
          return callBackUtility.next(e)
        }
      })
    }
  } catch (e) {
    callBackUtility.res.status(500)
    return callBackUtility.next(e)
  }
}
var getAllVersionsOfAPolicyFunc = function(id, callBackUtility) {
  try {
    if (callBackUtility.req && callBackUtility.res) {
      logger.debug("inside getAllVersionsOfAPolicyFunc ")
      var path = "/cloudlets/api/v2/policies/" + id + "/versions/"

      eg.auth({
        path: path,
        method: "GET"
      })

      eg.send(function(data, response) {
        try {
          if (
            JSON.parse(data)["errorCode"] ||
            JSON.parse(data)["status"] >= 400
          ) {
            data = JSON.parse(data)
            var message = data.errorMessage || data.title
            var statusCode = data.errorCode || data.status
            logger.error(
              "ERROR: See Below for Details from Akamai status code : " +
                statusCode +
                " message : " +
                message
            )
            sendError(callBackUtility.res, statusCode, message)
          } else if (callBackUtility.utility) {
            return callBackUtility.utility(parseDataIntoJSON(data))
          } else {
            //send back the response
            return callBackUtility.res.send(parseDataIntoJSON(data))
          }
        } catch (e) {
          callBackUtility.res.status(500)
          return callBackUtility.next(e)
        }
      })
    }
  } catch (e) {
    callBackUtility.res.status(500)
    return callBackUtility.next(e)
  }
}

function validatePolicyRulesFunc(id, version, network, callBackUtility) {
  try {
    if (callBackUtility.req && callBackUtility.res) {
      var path = "/cloudlets/api/v2/policies/" + id + "/versions/" + version

      eg.auth({
        path: path,
        method: "GET"
      })

      eg.send(function(data, response) {
        try {
          data = parseDataIntoJSON(data)
          if (data.errorCode || data.status >= 400) {
            var message = data.errorMessage || data.title
            var statusCode = data.errorCode || data.status
            logger.error(
              "ERROR: See Below for Details from Akamai status code : " +
                statusCode +
                " message : " +
                message
            )
            sendError(callBackUtility.res, statusCode, message)
          } else {
            var urlDomain
            var sourceUrl
            var matchRulesData = {}

            if (network == "staging") {
              urlDomain = "https://qa.mydomain.com"
            } else if (network == "prod") {
              urlDomain = "https://prod.mydomain.com"
            }

            matchRulesData.raw = data.matchRules
            matchRulesData.asyncTasks = []
            matchRulesData.clean = []
            try {
              async.each(matchRulesData.raw, processData, function(err) {
                err ? console.log(error) : ""
                console.log(
                  "[Validation Service] Done setting up async tasks..."
                )
                async.parallel(matchRulesData.asyncTasks, function() {
                  return callBackUtility.utility(matchRulesData.clean)
                })
              })

              function processData(item, callback_a) {
                // Check for multiple paths in rules
                if (
                  item.matches &&
                  item.matches[0].matchValue.indexOf(" ") > -1
                ) {
                  // Process the multiple paths
                  var tempPaths = item.matches[0].matchValue.split(" ")
                  async.each(
                    tempPaths,
                    function(pathRule, callback_b) {
                      var tempItem = lodash.cloneDeep(item)
                      Object.assign(tempItem.matches[0], {
                        matchValue: pathRule
                      })
                      setupTasks(tempItem)
                      return callback_b(null)
                    },
                    function(err) {
                      err ? console.log(error) : ""
                      return callback_a(null)
                    }
                  )
                } else {
                  setupTasks(item)
                  return callback_a(null)
                }

                function setupTasks(item) {
                  var sourceUrl
                  matchRulesData.asyncTasks.push(function(
                    asyncItemCompleteCallBack
                  ) {
                    if (
                      item.matches &&
                      item.matches[0].matchValue.startsWith("http")
                    ) {
                      sourceUrl = item.matches[0].matchValue
                    } else if (item.matches) {
                      sourceUrl = urlDomain + item.matches[0].matchValue
                    } else if (
                      item.matchURL &&
                      item.matchURL.startsWith("http")
                    ) {
                      sourceUrl = item.matchURL
                    } else if (item.matchURL) {
                      sourceUrl = urlDomain + item.matchURL
                    } else {
                      logger.error("ERROR: Rule is invalid")
                      sourceUrl = ""
                    }

                    var options = {
                      uri: sourceUrl,
                      resolveWithFullResponse: true,
                      followAllRedirects: true
                    }

                    request
                      .get(options.uri, function(err, res, body) {
                        var temp = {} // Setup Object
                        temp.source = options.uri
                        if (
                          item.redirectURL &&
                          item.redirectURL.startsWith("http")
                        ) {
                          temp.destination = item.redirectURL
                        } else {
                          temp.destination = urlDomain + item.redirectURL
                        }

                        if (!err) {
                          var message = ""
                          // Fill the temp object
                          temp.statusCode = res.statusCode
                          temp.finalDestination = res.request.uri.href
                          temp.redirectsFollowed =
                            res.request._redirect.redirectsFollowed
                          temp.redirects = res.request._redirect.redirects

                          //Validate the results
                          if (temp.redirects.length <= 0) {
                            message = "No redirect occurred. "
                          } else if (
                            temp.redirects[0].redirectUri != temp.destination
                          ) {
                            temp.validation = false
                            message =
                              "Redirected URL does not match with the rule destination URL. "
                          }

                          if (
                            temp.finalDestination.indexOf("page-not-found") >
                              -1 ||
                            temp.statusCode != 200
                          ) {
                            message += "Final destination page error."
                          }

                          if (message.length == 0) {
                            temp.validation = true
                            temp.message = "Success"
                          } else {
                            temp.validation = false
                            temp.message = message
                          }
                        } else {
                          if (res.statusCode) {
                            temp.statusCode = res.statusCode
                          } else {
                            temp.statusCode = ""
                          }
                          temp.finalDestination = ""
                          temp.redirectsFollowed = 0
                          temp.redirects = []
                          temp.validation = false
                          temp.message =
                            "Source URL HTTP Request failed with error: " + err
                        }
                        // Send the data
                        matchRulesData.clean.push(temp)
                        asyncItemCompleteCallBack()
                      })
                      .setMaxListeners(120)
                  })
                }
              }
            } catch (e) {
              callBackUtility.res.status(500)
              return callBackUtility.next(e)
            }
          }
        } catch (e) {
          callBackUtility.res.status(500)
          return callBackUtility.next(e)
        }
      })
    }
  } catch (e) {
    callBackUtility.res.status(500)
    return callBackUtility.next(e)
  }
}

function callBackForGetActivePolicyForNetwork(data) {
  try {
    var policyVersionArr = ""
    var latestActivePolicyInfo = {
      version: -1,
      id: -1
    }
    if (data.length > 0) {
      if (this.network === "dev") {
        //assuming the latest version will always be the last one in the data array.
        var isDev = true
        var latestVersion = getLatestVersion(data)
        policyVersionArr = latestVersion.activations
        for (var j = 0; j < policyVersionArr.length; j++) {
          eachPolicyActivation = policyVersionArr[j]
          if (eachPolicyActivation.policyInfo.status === "active") {
            //if the latest policy is active for any network, then it is not for DEV
            logger.warn(
              "no dev version for policy :" + data[data.length - 1].policyId
            )
            isDev = false
            break
          }
        }
        if (isDev) {
          latestActivePolicyInfo.version = latestVersion.version
          latestActivePolicyInfo.id = latestVersion.policyId
        }
      } else {
        outer: for (var i = data.length - 1; i >= 0; i--) {
          policyVersionArr = data[i].activations
          var eachPolicyActivation = ""

          for (var j = 0; j < policyVersionArr.length; j++) {
            eachPolicyActivation = policyVersionArr[j]
            if (
              eachPolicyActivation.policyInfo.status === "active" &&
              eachPolicyActivation.network === this.network
            ) {
              latestActivePolicyInfo.version =
                eachPolicyActivation.policyInfo.version
              latestActivePolicyInfo.id = data[i].policyId
              break outer
            }
          }
        }
      }
    }

    if (latestActivePolicyInfo.version != -1) {
      //calling next function to get the specific policy version
      logger.debug(
        "calling specific version with version : " +
          JSON.stringify(latestActivePolicyInfo)
      )
      var callBackUtility = {
        req: this.req,
        res: this.res,
        next: this.next,
        utility: function(data) {
          this.res.send(data)
        }
      }
      return getPolicyByVersionFunc(latestActivePolicyInfo, callBackUtility)
    } else {
      logger.warn("version not found" + JSON.stringify(latestActivePolicyInfo))
      //throw error
      return sendError(this.res, 404, "Resource Not found")
    }
  } catch (e) {
    this.res.status(500)
    return this.next(e)
  }
}

function parseDataIntoJSON(data) {
  return JSON.parse(data, removeNullFromJSON)
}

function removeNullFromJSON(key, value) {
  if (!value) {
    return undefined
  }
  return value
}

function sendError(res, status, message) {
  status = status == -1 ? 404 : status
  res.status(status).send({
    code: status,
    message: message
  })
}

function getLatestVersion(allVersions) {
  //Assuming the data inside the array will be sorted by version
  var latestVersion = allVersions[0]
  if (allVersions.length > 1) {
    latestVersion =
      allVersions[0].version > allVersions[allVersions.length - 1].version
        ? allVersions[0]
        : allVersions[allVersions.length - 1]
  }
  return latestVersion
}
