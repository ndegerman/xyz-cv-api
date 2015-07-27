'use strict';

/**
 * Module dependencies.
 */
var responseHandler = require('../utils/response.handler');
var authenticationHandler = require('../utils/authentication.handler');

// middleware
exports.authentication = function(request, response, next) {
    var email = request.headers['x-forwarded-email'];
    var name = request.headers['x-forwarded-user'];

    if (!email) {
        return responseHandler.sendUnauthorizedResponse(response)();
    }

    authenticationHandler.authenticate(name, email)
        .then(responseHandler.sendToNext(next))
        .catch(responseHandler.sendErrorResponse(response));
};

exports.isAllowed = function(attribute) {
    return function(request, response, next) {
        authenticationHandler.getUserAttributes(request.headers['x-forwarded-email'])
            .then(function(attributes) {
                if (attributes !== undefined && attributes.indexOf(attribute) >= 0) {
                    return next();
                } else {
                    return responseHandler.sendUnauthorizedResponse(response)();
                }
            })
            .catch(responseHandler.sendUnauthorizedResponse(response));
    };
};
