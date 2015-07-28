'use strict';

var q = require('q');
var errorHandler = require('./error.handler');
var msg = require('./message.handler');
var config = require('config');
var authenticationHandler = require('./authentication.handler');
var roleController = require('../chains/role/role.controller');
var attributeController = require('../chains/attribute/attribute.controller');
var roleToAttributeController = require('../chains/roleToAttributeConnector/roleToAttributeConnector.controller');
var utils = require('../utils/utils');

// PARSING
// ============================================================================

exports.parseDelete = function(response) {
    return checkResponse(response)
        .then(checkStatusCode(204))
        .then(parseBody);
};

exports.parsePost = function(response) {
    return checkResponse(response)
        .then(checkStatusCode(200))
        .then(parseBody);
};

exports.parsePut = function(response) {
    return checkResponse(response)
        .then(checkStatusCode(204))
        .then(parseBody);
};

exports.parseGet = function(response) {
    return checkResponse(response)
        .then(checkStatusCode(200))
        .then(parseBody);
};

exports.parseGetPolyQuery = function(response) {
    return checkResponse(response)
        .then(checkStatusCode(200))
        .then(parsePolyQuery);
};

exports.parseGetMonoQuery = function(response) {
    return checkResponse(response)
        .then(checkStatusCode(200))
        .then(parseMonoQuery);
};

function checkResponse(response) {
    return q.promise(function(resolve, reject) {
        if (!response) {
            return errorHandler.getHttpError(406)
                .then(reject);
        }

        return resolve(response);
    });
}

function checkStatusCode(code) {
    return function(response) {
        return q.promise(function(resolve, reject) {
            if (response.statusCode === code) {
                return resolve(response);
            }

            return errorHandler.getHttpError(response.statusCode)
                .then(reject);
        });
    };
}

function parsePolyQuery(response) {
    return q.promise(function(resolve) {
        var items = JSON.parse(response.body) || [];
        return resolve(items);
    });
}

function parseMonoQuery(response) {
    return q.promise(function(resolve, reject) {
        parsePolyQuery(response)
            .then(function(items) {
                var item = (items.length > 0) ? items[0] : null;
                if (item) {
                    return resolve(item);
                } else {
                    return errorHandler.getHttpError(404)
                        .then(reject);
                }
            });
    });
}

function parseBody(response) {
    return q.promise(function(resolve) {
        var body = response.body || {};
        if (typeof body === 'string') {
            body = JSON.parse(body) || null;
        }

        return resolve(body);
    });
}

// SENDING
// ============================================================================
exports.sendErrorResponse = function(response) {
    return function(error) {
        response.status(error.status || 500).send(error.message);
    };
};

exports.sendUnauthorizedResponse = function(response) {
    return function() {
        return errorHandler.getHttpError(401)
            .then(exports.sendErrorResponse(response));
    };
};

exports.sendToNext = function(next) {
    return function() {
        next();
    };
};

exports.sendJsonResponse = function(response) {
    return function(object) {
        return response.json(object);
    };
};

exports.sendSuccessfulDeleteJsonResponse = function(response) {
    return function() {
        return response.send(msg.SUCCESS_DELETE);
    };
};

exports.sendSuccessfulPutJsonResponse = function(response) {
    return function() {
        return response.send(msg.SUCCESS_UPDATE);
    };
};

exports.sendSuccessUploadJsonResponse = function(response) {
    return function(file) {
        return response.send(file._id);
    };
};

exports.sendFileResponse = function(response) {
    return function(file) {
        response.download(config.UPLOAD_PATH + file.generatedName);
    };
};

exports.sendThumbnailResponse = function(response) {
    return function(generatedName) {
        response.download(config.UPLOAD_PATH + generatedName);
    };
};

// TRIMMING
// ==============================================================================
// TODO: error handling

exports.trimByAttributes = function(email, attributes) {
    return function(body) {
        return q.promise(function(resolve) {
            var userIsSelf = authenticationHandler.isSelf(email, body._id);

            return q.all(userIsSelf)
                .then(function(result) {
                    if (result) {
                        return resolve(body);
                    } else {
                        return authenticationHandler.getUserAttributeObjects(email)
                            .then(extractRelevantAttributes(attributes))
                            .then(findSmallestIntersectionOfHiddenFields)
                            .then(trimByFields(body))
                            .then(resolve);
                    }
                });
        });
    };
};

function getRoleAttributes(role) {
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

function extractRelevantAttributes(relevantAttributes) {
    return function(presentAttributes) {
        return q.promise(function(resolve) {
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
    return q.promise(function(resolve) {
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
