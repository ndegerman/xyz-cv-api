'use strict';

var q = require('q');
var utils = require('../utils/utils');
var cacheHandler = require('./cache.handler');
var userController = require('../chains/user/user.controller');
var roleController = require('../chains/role/role.controller');
var attributeController = require('../chains/attribute/attribute.controller');
var roleToAttributeController = require('../chains/roleToAttributeConnector/roleToAttributeConnector.controller');

exports.getUserAttributes = function(email) {
    return getUserRole(email)
        .then(getRoleAttributes);
};

exports.authenticate = function(name, email) {
    return q.promise(function(resolve, reject) {
        if (cacheHandler.getFromUserRoleCache(email)) {
            return resolve();
        } else {
            return userController.createUserIfNonexistent(name, email)
                .then(setUserRoleCache)
                .then(resolve)
                .catch(reject);
        }
    });
};

function getUserRole(email) {
    return q.promise(function(resolve, reject) {
        var userRoleFromCache = cacheHandler.getFromUserRoleCache(email);
        if (!userRoleFromCache) {
            return userController.getUserByEmail(email)
                .then(setUserRoleCache)
                .then(resolve)
                .catch(console.dir);
        }

        return resolve(userRoleFromCache);
    });
}

function setUserRoleCache(user) {
    return q.promise(function(resolve) {
        cacheHandler.setToUserRoleCache(user.email, user.role);
        return resolve(user.role);
    });
}

function getRoleAttributes(role) {
    return q.promise(function(resolve, reject) {
        var roleAttributes = cacheHandler.getFromRoleAttributesCache(role);
        if (!roleAttributes) {
            var connectors = roleController.getRoleByName(role)
                .then(roleToAttributeController.getRoleToAttributeConnectorsByRole);

            var attributes = attributeController.getAllAttributes();

            q.all([connectors, attributes])
                .then(function() {
                    return utils.extractPropertiesFromConnectors('attributeId', connectors.value())
                        .then(utils.matchListAndObjectIds(attributes.value()))
                        .then(utils.extractPropertyFromList('name'))
                        .then(function(attributeNames) {
                            cacheHandler.setToRoleAttributesCache(role, attributeNames);
                            return resolve(attributeNames);
                        });
                })
                .catch(reject);
        } else {
            return resolve(roleAttributes);
        }
    });
}

