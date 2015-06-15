var q = require('q');
var accessDao = require('../dao/access.dao');
var errorHandler = require('../utils/error.handler');

function validateAccess(access) {
    return q.promise(function(resolve) {
        if (access && access.role_id && access.attribute_id) {
            return resolve(access);
        }
        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

exports.assignAttributesToRole = function(attributes, roleId) {
    promises = [];
    attributes.forEach(function(attributeId) {
        var access = {
            role_id: roleId,
            attribute_id: attributeId
        };
        promises.push(createAccess(access));
    });
    return q.all(promises);
};

exports.createAccess = function(access) {
    return validateAccess(access)
        .then(accessDao.createAccess);
};

exports.getAccessesByRoleId = function(roleId) {
    return accessDao.getAccessesByRoleId(roleId);
};

exports.getAccessesByAttributeId = function(attributeId) {
    return accessDao.getAccessesByAttributeId(attributeId);
};

exports.getAllAccesses = function() {
    return accessDao.getAllAccesses();
};

exports.deleteAccessById = function(id) {
    return accessDao.deleteAccess(id);
};

exports.deleteAccesses = function(accesses) {
    var promises = [];
    accesses.forEach(function(access) {
        promises.push(exports.deleteAccessById(access._id));
    });
    return q.all(promises);
};

exports.deleteAccessesByRoleId = function(roleId) {
    return exports.getAccessesByRoleId(roleId)
        .then(exports.deleteAccesses);
};
