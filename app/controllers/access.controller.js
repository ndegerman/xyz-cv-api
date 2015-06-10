var q = require('q');
var accessDao = require('../dao/access.dao');

function validateAccess(access) {
    return q.promise(function(resolve, reject) {
        if (!access.user_id || !access.attribute_id) {
            return reject(new Error('Not a valid access object!'));
        }
        return resolve(access);
    });
};

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
    return accessDao.getAccessesbyRoleId(roleId);
};

exports.getAccessesByAttributeId = function(attributeId) {
    return accessDao.getAccessesbyAttributeId(attributeId);
};

exports.deleteAccessById = function(id) {
    return accessDao.deleteAccess(accessId);
};

exports.deleteAccesses = function(accesses) {
    var promises = [];
    accesses.forEach(function(access) {
        promises.push(deleteAccess(access.id));
    });
    return q.all(promises);
};

exports.deleteAccessByRoleId = function(roleId) {
    return getAccessesForRole(roleId)
        .then(deleteAccesses);
};