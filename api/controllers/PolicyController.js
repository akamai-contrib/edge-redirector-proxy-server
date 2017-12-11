/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
'use strict';

module.exports = {
    ActivePolicyVersion: getActivePolicyVersion,
    GetPolicyByVersion: getPolicyByVersion,
    AllVersion: getAllVersionsOfAPolicy,
    AllActivationInfo: getAllActivationInfo,
    PostNewVersion: postNewVersion,
    AddRule: addRule,
    ActivateVersion: activateVersion,
    DeleteRule: deleteRule,
    EditRule: editRule,
    ValidatePolicyRules: validatePolicyRules
};

var helper = require("../helpers/PolicyHelper");

function getActivePolicyVersion(req, res, next) {
    try {
        helper.getActivePolicy(req, res, req.swagger.params.policyNumber.value, req.swagger.params.env.value, next);
    } catch (e) {
        res.status(500);
        next(e);
    }
}

function getPolicyByVersion(req, res, next) {
    try {
        var policyNumber = req.swagger.params.policyNumber.value;
        var version = req.swagger.params.version.value;
        var policyInfo = {
            "id": policyNumber,
            "version": version
        }
        helper.getPolicyByVersion(req, res, policyInfo, next);
    } catch (e) {
        next(e);
    }

}

function getAllVersionsOfAPolicy(req, res, next) {
    try {
        var policyNumber = req.swagger.params.policyNumber.value;
        helper.getAllVersionsOfAPolicy(req, res, policyNumber, next);
    } catch (e) {
        next(e);
    }
}

function getAllActivationInfo(req, res, next) {
    try {
        var policyNumber = req.swagger.params.policyNumber.value;
        helper.getAllActivationInfo(req, res, policyNumber, next);
    } catch (e) {
        next(e);
    }
}

function postNewVersion(req, res, next) {
    try {
        var policyNumber = req.swagger.params.policyNumber.value;
        var bodyJson = req.swagger.params.bodyJson.value;
        helper.postNewVersion(req, res, policyNumber, bodyJson, next);
    } catch (e) {
        next(e);
    }
}

function addRule(req, res, next) {
    try {
        var policyNumber = req.swagger.params.policyNumber.value;
        var versionNumber = req.swagger.params.versionNumber.value;
        var bodyJson = req.swagger.params.bodyJson.value;
        helper.addRule(req, res, policyNumber, versionNumber, bodyJson, next);
    } catch (e) {
        next(e);
    }
}

function activateVersion(req, res, next) {
    try {
        var policyNumber = req.swagger.params.policyNumber.value;
        var versionNumber = req.swagger.params.versionNumber.value;
        var network = req.swagger.params.network.value;
        helper.activateVersion(req, res, policyNumber, versionNumber, network, next);
    } catch (e) {
        next(e);
    }
}

function deleteRule(req, res, next) {
    try {
        var policyNumber = req.swagger.params.policyNumber.value;
        var versionNumber = req.swagger.params.versionNumber.value;
        var bodyJson = req.swagger.params.bodyJson.value;
        helper.deleteRule(req, res, policyNumber, versionNumber, bodyJson, next);
    } catch (e) {
        next(e);
    }
}

function editRule(req, res, next) {
    try {
        var policyNumber = req.swagger.params.policyNumber.value;
        var versionNumber = req.swagger.params.versionNumber.value;
        var editJSON = req.swagger.params.editInfo.value;
        helper.editRule(req, res, policyNumber, versionNumber, editJSON, next);
    } catch (e) {
        next(e);
    }
}

function validatePolicyRules(req, res, next) {
    try {
        req.setTimeout(5*60*1000); //Set timeout for 5 minutes (keep-alive workaround for long validation requests)
        var policyNumber = req.swagger.params.policyNumber.value;
        var versionNumber = req.swagger.params.versionNumber.value;
        var network = req.swagger.params.network.value;
        helper.validatePolicyRules(req, res, policyNumber, versionNumber, network, next);
    } catch (e) {
        next(e);
    }
}
