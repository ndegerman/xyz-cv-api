'use strict';

/**
 * Module dependencies.
 */
var q = require('q');
var authenticationMiddleware = require('./authentication.middleware');
var userController = require('../chains/user/user.controller');
var errorHandler = require('../utils/error.handler');
var utils = require('../utils/utils');
var responseHandler = require('../utils/response.handler');
var NodeCache = require('node-cache');
var roleController = require('../chains/role/role.controller');
var roleToAttributeController = require('../chains/roleToAttributeConnector/roleToAttributeConnector.controller');
var attributeController = require('../chains/attribute/attribute.controller');

// Cache
var userRoleCache = new NodeCache({stdTTL: 500});
var roleAttributesCache = new NodeCache({stdTTL: 500});

// middleware
exports.authentication = function(request, response, next) {
    var email = request.headers['x-forwarded-email'];
    var name = request.headers['x-forwarded-user'];

    if (!email) {
        errorHandler.getHttpError(401)
            .then(responseHandler.sendErrorResponse(response));
    }

    if (userRoleCache.get(email)) {
        return next();
    } else {
        userController.createUserIfNonexistent(name, email)
            .then(setUserRoleCache)
            .then(responseHandler.sendToNext(next))
            .catch(responseHandler.sendErrorResponse(response));
    }
};

exports.isAllowed = function(attribute) {
    return function(request, response, next) {
        getUserRole(request, response)
            .then(getRoleAttributes)
            .then(function(attributes) {
                if (attributes !== undefined && attributes.indexOf(attribute) >= 0) {
                    return next();
                } else {
                    errorHandler.getHttpError(401)
                        .then(responseHandler.sendErrorResponse(response));
                }
            });
    };
};

function getUserRole(request, response) {
    return q.promise(function(resolve) {
        var email = request.headers['x-forwarded-email'];
        var userRoleFromCache = userRoleCache.get(email);
        if (userRoleFromCache === undefined) {
            return userController.getUserByEmail(email)
                .then(setUserRoleCache)
                .then(resolve);
        }

        return resolve(userRoleFromCache);
    });
}

function setUserRoleCache(user) {
    return q.promise(function(resolve) {
        userRoleCache.set(user.email, user.role);
        return resolve(user.role);
    });
}

function getRoleAttributes(role) {
    return q.promise(function(resolve) {
        var roleAttributes = roleAttributesCache.get(role);
        if (roleAttributes === undefined) {
            var connectors = roleController.getRoleByName(role)
                .then(roleToAttributeController.getRoleToAttributeConnectorsByRole);
            var attributes = attributeController.getAllAttributes();
            q.all([connectors, attributes])
                .then(function() {
                    utils.extractPropertiesFromConnectors('attributeId', connectors.value())
                        .then(utils.matchListAndObjectIds(attributes.value()))
                        .then(utils.extractPropertyFromList('name'))
                        .then(function(attributeNames) {
                            roleAttributesCache.set(role, attributeNames);
                            return resolve(attributeNames);
                        });
                });
        } else {
            return resolve(roleAttributes);
        }
    });
}
