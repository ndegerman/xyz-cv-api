'use strict';

var q = require('q');
var utils = require('../utils/utils');
var cacheHandler = require('./cache.handler');
var userController = require('../chains/user/user.controller');
var roleController = require('../chains/role/role.controller');
var attributeController = require('../chains/attribute/attribute.controller');
var roleToAttributeController = require('../chains/roleToAttributeConnector/roleToAttributeConnector.controller');

exports.getUserAttributeNames = function(email) {
    return getUserRole(email)
        .then(getRoleAttributes);
};

exports.getUserAttributeObjects = function(email) {
    return getUserRole(email)
        .then(getRoleAttributesObjects);
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
                .catch(reject);
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

function getRoleAttributesObjects(role) {
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
                        .then(resolve);
                })
                .catch(reject);
        } else {
            return resolve(roleAttributes);
        }
    });
}

exports.isSelf = function(email, id) {
    return q.promise(function(resolve) {
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
};

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

