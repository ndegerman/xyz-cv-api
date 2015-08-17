'use strict';

/**
 * Module dependencies.
 */
var responseHandler = require('../utils/response.handler');
var authenticationHandler = require('../utils/authentication.handler');
var userController = require('../chains/user/user.controller');
var utils = require('../utils/utils');
var Promise = require('bluebird');

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

exports.isAllowedOrSelf = function(attribute, firstField, secondField) {
    return function(request, response, next) {
        return authenticationHandler.isSelf(request.headers['x-forwarded-email'], request[firstField][secondField])
            .then(function(result) {
                if (result) {
                    return next();
                } else {
                    return exports.isAllowed(attribute)(request, response, next);
                }
            })
            .catch(responseHandler.sendUnauthorizedResponse(response));
    };
};

exports.isAllowed = function(attribute) {
    return function(request, response, next) {
        return authenticationHandler.getUserAttributeNames(request.headers['x-forwarded-email'])
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

exports.isAllowedOrOwnConnector = function(attribute, getFunction) {
    return function(request, response, next) {
        var connector = getFunction(request.params.id);
        var user = userController.getUsers({email: request.headers['x-forwarded-email']});

        return Promise.all([connector, user])
            .then(function() {
                var connectorUserId = connector.value().userId;
                var userId = user.value()[0]._id;
                if ((userId && connectorUserId === userId) && ((request.body.userId === userId) || (!request.body.userId))) {
                    return next();
                } else {
                    return exports.isAllowed(attribute)(request, response, next);
                }
            });
    };
};

exports.checkForForbiddenFields = function(forbiddenFields, requiredAttributes) {
    return function(request, response, next) {
        return utils.objectContainsOneOfFields(request.body, forbiddenFields)
            .then(function(result) {
                if (!result) {
                    return next();
                } else {
                    return authenticationHandler.getUserAttributeObjects(request.headers['x-forwarded-email'])
                        .then(utils.extractRelevantAttributes(requiredAttributes))
                        .then(function(relevantAttributes) {
                            if (relevantAttributes.length > 0) {
                                return next();
                            } else {
                                forbiddenFields.forEach(function(forbiddenField) {
                                    delete request.body[forbiddenField];
                                });

                                return next();
                            }
                        });
                }
            });
    };
};

exports.hasAllowedEmail = function(allowedEmails) {
    return function(request, response, next) {
        return new Promise(function(resolve) {
            if (allowedEmails.indexOf(request.headers['x-forwarded-email'].toLowerCase()) >= 0) {
                return next();
            } else {
                return responseHandler.sendUnauthorizedResponse(response)();
            }
        });
    };
};
