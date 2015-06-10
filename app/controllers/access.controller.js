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

exports.assignAttributesToRole = function(attributes, role) {
    promises = [];
    attributes.forEach(function(attributeId) {
        var access = {
            role_id: role.id,
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

exports.getAccessesForRole = function(role) {
    return accessDao.getAccessesbyRoleId(role.id);
};

exports.getAccessesForAttribute = function(attribute) {
    return accessDao.getAccessesbyAttributeId(attribute.id);
};

exports.deleteAccess = function(accessId) {
    return accessDao.deleteAccess(accessId);
};

exports.deleteAccesses = function(accesses) {
    var promises = [];
    accesses.forEach(function(access) {
        promises.push(deleteAccess(access.id));
    });
    return q.all(promises);
};

exports.deleteAccessForRole = function(role) {
    return getAccessesForRole(role)
        .then(deleteAccesses);
};