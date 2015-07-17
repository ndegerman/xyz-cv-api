'use strict';

/**
 * Module dependencies.
 */
var q = require('q');
var userController = require('../chains/user/user.controller');
var errorHandler = require('../utils/error.handler');
var responseHandler = require('../utils/response.handler');

// middleware
exports.authentication = function(request, response, next) {
    var email = request.headers['x-forwarded-email'];
    var name = request.headers['x-forwarded-user'];

    if (!email) {
        errorHandler.getHttpError(401)
            .then(responseHandler.sendErrorResponse(response));
    }

    userController.createUserIfNonexistent(name, email)
        .then(responseHandler.sendToNext(next))
        .catch(responseHandler.sendErrorResponse(response));
};
