/* 
   SPDX-Copyright: Copyright (c) Capital One Services, LLC
   SPDX-License-Identifier: MIT
   Copyright 2017 Capital One Services, LLC
*/
'use strict';

var logger = require("../log_module/logMod").getLogger();
var util = require('util');

module.exports = function create(fittingDef) {

    return function error_handler(context, next) {

        if (!util.isError(context.error)) {
            return next();
        }

        var err = context.error;

        logger.error('jsonErrorHandler: ' + context.error.message);

        try {
            context.headers['Content-Type'] = 'application/json';
            if (context.response._headers["access-control-allow-origin"]) {
                context.headers['Access-Control-Allow-Origin'] = context.response._headers["access-control-allow-origin"];
                context.headers['Access-Control-Allow-Methods'] = 'GET,OPTIONS';
            }


            if (!context.statusCode || context.statusCode < 400) {
                if (context.response && context.response.statusCode && context.response.statusCode >= 400) {
                    context.statusCode = context.response.statusCode;
                } else if (err.statusCode && err.statusCode >= 400) {
                    context.statusCode = err.statusCode;
                    delete(err.statusCode);
                } else {
                    context.statusCode = 500;
                }
            }

            Object.defineProperty(err, 'message', {
                enumerable: true
            }); // include message property in response
            if (context.statusCode >= 400) {
                logger.error(err.stack);
            }
            delete(context.error);
            next(null, JSON.stringify(err));
        } catch (err2) {
            logger.error(err2);
            next();
        }
    }
};
