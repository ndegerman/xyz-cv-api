'use strict';

var Promise = require('bluebird');
var utils = require('../utils/utils');
var cacheHandler = require('./cache.handler');
var userController = require('../chains/user/user.controller');
var roleController = require('../chains/role/role.controller');
var attributeController = require('../chains/attribute/attribute.controller');
var roleToAttributeController = require('../chains/roleToAttributeConnector/roleToAttributeConnector.controller');
var errorHandler = require('./error.handler');

exports.getAuthenticationObject = function(email) {
    return new Promise(function(resolve, reject) {
        var attributes = exports.getUserAttributeObjects(email);
        var userId = getUserId(email);

        Promise.all([attributes, userId])
            .then(function() {
                return new Promise(function(resolve) {
                    var authenticationObject = {
                        userId: userId.value(),
                        attributes: attributes.value()
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
    return new Promise(function(resolve, reject) {
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
        return new Promise(function(resolve, reject) {
            return exports.isSelf(email, body._id)
                .then(function(result) {
                    if (result) {
                        return resolve(body);
                    } else {
                        return exports.getUserAttributeObjects(email)
                            .then(utils.extractRelevantAttributes(attributes))
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

exports.trimManyByattributes = function(email, attributes) {
    return function(bodies) {
        return exports.getUserAttributeObjects(email)
            .then(utils.extractRelevantAttributes(attributes))
            .then(findSmallestIntersectionOfHiddenFields)
            .then(function(fields) {
                return new Promise(function(resolve) {
                    if (fields.length <= 0) {
                        return resolve(bodies);
                    } else {
                        var promises = [];
                        bodies.forEach(function(body) {
                            promises.push(trimByFields(body)(fields));
                        });

                        return Promise.all(promises)
                            .then(resolve);
                    }
                });
            });
    };
};

exports.isSelf = function(email, id) {
    return getUserId(email)
        .then(checkIds(id));
};

exports.blockHidden = function(email, attributes) {
    return function(body) {
        return new Promise(function(resolve, reject) {
            return exports.isSelf(email, body._id)
                .then(function(result) {
                    if (result) {
                        return resolve(body);

                    } else if (!body.hidden) {
                        return resolve(body);

                    } else {
                        return exports.getUserAttributeObjects(email)
                            .then(utils.extractRelevantAttributes(attributes))
                            .then(utils.rejectIfEmpty(body))
                            .then(resolve)
                            .catch(function() {
                                return errorHandler.getHttpError(404)
                                    .then(reject);
                            });
                    }
                })
                .catch(reject);
        });
    };
};

exports.filterHiddenEntities = function(email, attributes) {
    return function(bodies) {
        return new Promise(function(resolve, reject) {
            return exports.getUserAttributeObjects(email)
                .then(utils.extractRelevantAttributes(attributes))
                .then(filterIfNoAccess(bodies))
                .then(resolve)
                .catch(reject);
        });
    };
};

function filterIfNoAccess(bodies) {
    return function(relevantAttributes) {
        return new Promise(function(resolve) {
            if (relevantAttributes.length > 0) {
                return resolve(bodies);
            } else {
                return Promise.filter(bodies, function(body) {
                    return !body.hidden;
                })
                .then(resolve);
            }
        });
    };
}

// ROLE
// ==============================================================================

function getUserRole(email) {
    return new Promise(function(resolve, reject) {
        var userRoleFromCache = cacheHandler.getFromUserRoleCache(email);
        if (!userRoleFromCache) {
            return userController.getUser({email: email})
                .then(setUserRoleCache)
                .then(resolve)
                .catch(reject);
        }

        return resolve(userRoleFromCache);
    });
}

function setUserRoleCache(user) {
    return new Promise(function(resolve) {
        cacheHandler.setToUserRoleCache(user[0].email, user[0].role);
        return resolve(user.role);
    });
}

// ATTRIBUTES
// ==============================================================================

function getRoleAttributeNames(role) {
    return new Promise(function(resolve) {
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
    return new Promise(function(resolve, reject) {
        var connectors = roleController.getRoles({name: role})
            .then(utils.createQueryObjectFromList('roleId', '_id'))
            .then(roleToAttributeController.getRoleToAttributeConnectors);

        var attributes = attributeController.getAttributes();

        Promise.all([connectors, attributes])
            .then(function() {
                //console.log(attributes.value());
                //console.log(connectors.value());
                return utils.extractPropertiesFromConnectors('attributeId', connectors.value())
                    .then(utils.matchListAndObjectIds(attributes.value()))
                    .then(resolve);
            })
            .catch(reject);
    });
}

function setRoleAttributesCache(role) {
    return function(attributeNames) {
        return new Promise(function(resolve) {
            cacheHandler.setToRoleAttributesCache(role, attributeNames);
            return resolve(attributeNames);
        });
    };
}

// USER ID
// ==============================================================================

function getUserId(email) {
    return new Promise(function(resolve) {
        var userId = cacheHandler.getFromEmailIdCache(email);

        if (!userId) {
            return userController.getUsers({email: email})
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
        return new Promise(function(resolve) {
            cacheHandler.setToEmailIdCache(email, id);
            return resolve(id);
        });
    };
}

function getIdfromUser(user) {
    return new Promise(function(resolve) {
        return resolve(user._id);
    });
}

function checkIds(id1) {
    return function(id2) {
        return new Promise(function(resolve) {
            return resolve(id1 === id2);
        });
    };
}

// TRIMMING
// ==============================================================================

function findSmallestIntersectionOfHiddenFields(attributes) {
    return new Promise(function(resolve, reject) {
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
    return new Promise(function(resolve) {
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
        return new Promise(function(resolve) {
            var promises = [];
            for (var field in count) {
                if (count[field] === length) {
                    promises.push(field);
                }
            }

            Promise.all(promises)
                .then(resolve);
        });
    };
}

function trimByFields(body) {
    return function(fields) {
        return new Promise(function(resolve) {
            for (var field in body) {
                if (fields.indexOf(field) >= 0) {
                    body[field] = null;
                }
            }

            return resolve(body);
        });
    };
}
