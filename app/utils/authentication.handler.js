'use strict';

var q = require('q');
var utils = require('../utils/utils');
var cacheHandler = require('./cache.handler');
var userController = require('../chains/user/user.controller');
var roleController = require('../chains/role/role.controller');
var attributeController = require('../chains/attribute/attribute.controller');
var roleToAttributeController = require('../chains/roleToAttributeConnector/roleToAttributeConnector.controller');
var errorHandler = require('./error.handler');

exports.getAuthenticationObject = function(email) {
    return q.promise(function(resolve, reject) {
        var attributes = exports.getUserAttributeObjects(email);
        var userId = getUserId(email);

        q.all([attributes, userId])
            .then(function() {
                return q.promise(function(resolve) {
                    var authenticationObject = {
                        userId: userId.valueOf(),
                        attributes: attributes.valueOf()
                    };
                    return resolve(authenticationObject);
                });
            })
            .then(resolve)
            .catch(reject);
    });
};

exports.getUserAttributeNames = function(email) {
    return getUserRole(email)
        .then(getRoleAttributeNames);
};

exports.getUserAttributeObjects = function(email) {
    return getUserRole(email)
        .then(getRoleAttributeObjects);
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

exports.trimByAttributes = function(email, attributes) {
    return function(body) {
        return q.promise(function(resolve, reject) {
            return exports.isSelf(email, body._id)
                .then(function(result) {
                    if (result) {
                        return resolve(body);
                    } else {
                        return exports.getUserAttributeObjects(email)
                            .then(extractRelevantAttributes(attributes))
                            .then(findSmallestIntersectionOfHiddenFields)
                            .then(trimByFields(body))
                            .then(resolve);
                    }
                })
                .catch(function() {
                    return errorHandler.getHttpError(401)
                        .then(reject);
                });
        });
    };
};

exports.isSelf = function(email, id) {
    return getUserId(email)
        .then(checkIds(id));
};

// ROLE
// ==============================================================================

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

// ATTRIBUTES
// ==============================================================================

function getRoleAttributeNames(role) {
    return q.promise(function(resolve) {
        var roleAttributes = cacheHandler.getFromRoleAttributesCache(role);
        if (!roleAttributes) {
            return getRoleAttributeObjects(role)
                .then(utils.extractPropertyFromList('name'))
                .then(setRoleAttributesCache(role))
                .then(resolve);
        } else {
            return resolve(roleAttributes);
        }
    });
}

function getRoleAttributeObjects(role) {
    return q.promise(function(resolve, reject) {
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
    });
}

function setRoleAttributesCache(role) {
    return function(attributeNames) {
        return q.promise(function(resolve) {
            cacheHandler.setToRoleAttributesCache(role, attributeNames);
            return resolve(attributeNames);
        });
    };
}

// USER ID
// ==============================================================================

function getUserId(email) {
    return q.promise(function(resolve) {
        var userId = cacheHandler.getFromEmailIdCache(email);

        if (!userId) {
            return userController.getUserByEmail(email)
                .then(getIdfromUser)
                .then(setEmailToIdCache(email))
                .then(resolve);
        } else {
            return resolve(userId);
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

// TRIMMING
// ==============================================================================

function extractRelevantAttributes(relevantAttributes) {
    return function(presentAttributes) {
        return q.promise(function(resolve, reject) {
            if (presentAttributes.length <= 0) {
                return reject();
            }

            var list = [];
            presentAttributes.forEach(function(presentAttribute) {
                if (relevantAttributes.indexOf(presentAttribute.name) >= 0) {
                    list.push(presentAttribute);
                }
            });

            return q.all(list)
                .then(resolve);
        });
    };
}

function findSmallestIntersectionOfHiddenFields(attributes) {
    return q.promise(function(resolve, reject) {
        if (attributes.length <= 0) {
            return reject();
        }

        var list = [];
        var length = attributes.length;

        return getFieldCounts(attributes)
            .then(pushFieldsIfPresentInAllAttributes(length))
            .then(resolve);
    });
}

function getFieldCounts(attributes) {
    return q.promise(function(resolve) {
        var count = {};
        attributes.forEach(function(attribute) {
            if (attribute.hiddenFields) {
                attribute.hiddenFields.forEach(function(hiddenField) {
                    if (!count[hiddenField]) {
                        count[hiddenField] = 1;
                    } else {
                        count[hiddenField]++;
                    }
                });
            }
        });

        return resolve(count);
    });
}

function pushFieldsIfPresentInAllAttributes(length) {
    return function(count) {
        return q.promise(function(resolve) {
            var promises = [];
            for (var field in count) {
                if (count[field] === length) {
                    promises.push(field);
                }
            }

            q.all(promises)
                .then(resolve);
        });
    };
}

function trimByFields(body) {
    return function(fields) {
        return q.promise(function(resolve) {
            for (var field in body) {
                if (fields.indexOf(field) >= 0) {
                    body[field] = null;
                }
            }

            return resolve(body);
        });
    };
}
