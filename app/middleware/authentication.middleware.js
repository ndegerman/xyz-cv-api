'use strict';

/**
 * Module dependencies.
 */
var responseHandler = require('../utils/response.handler');
var authenticationHandler = require('../utils/authentication.handler');
var userController = require('../chains/user/user.controller');
var roleController = require('../chains/role/role.controller');
var cacheHandler = require('../utils/cache.handler');
var attributeController = require('../chains/attribute/attribute.controller');
var roleToAttributeController = require('../chains/roleToAttributeConnector/roleToAttributeConnector.controller');
var q = require('q');

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

exports.isAllowedOrSelf = function(attribute) {
    return function(request, response, next) {

        var userIsSelf = isSelf(request, request.params.id);

        return q.all(userIsSelf)
            .then(function(result) {
                if (result) {
                    return next();
                } else {
                    return exports.isAllowed(attribute)(request, response, next);
                }
            });
    };
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

function isSelf(request, id) {
    return q.promise(function(resolve) {

        var email = request.headers['x-forwarded-email'];
        var userId = cacheHandler.getFromEmailIdCache(email);

        if (!id) {
            return resolve(false);
        }

        if (!userId) {
            return userController.getUserByEmail(email)
                .then(getIdfromUser)
                .then(setEmailToIdCache(email))
                .then(checkIds(id))
                .then(resolve);
        } else {
            return checkIds(userId)(id)
                .then(resolve);
        }
    });
}

function setEmailToIdCache(email) {
    return function(id) {
        return q.promise(function(resolve) {
            cacheHandler.setToEmailIdCache(email, id);
            return resolve(id);
        });
    };
}

function getIdfromUser(user) {
    return q.promise(function(resolve) {
        return resolve(user._id);
    });
}

function checkIds(id1) {
    return function(id2) {
        return q.promise(function(resolve) {
            return resolve(id1 === id2);
        });
    };
}
