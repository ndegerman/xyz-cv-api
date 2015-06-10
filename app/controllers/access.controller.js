var q = require('q');
var accessDao = require('../dao/access.dao');


function validateAccess(access) {
    var deferred = q.defer();
    if (!access.user_id || !access.attribute_id) {
        deferred.reject(new Error('Not a valid access object!'));
    }
    deferred.resolve(access);
    return deferred.promise;
};

exports.assignAttributes = function(attributes, user) {
    var deferred = q.defer();
    promises = [];
    attributes.forEach(function(attribute_id) {
        var access = {
            user_id: user.id,
            attribute_id: attribute_id
        };
        promises.push(createAccess(access));
    });
    q.all(promises)
        .then(function(accesses) {
            deferred.resolve(accesses);
        })
        .catch(function(error) {
            deferred.reject(error);
        });
    return deferred.promise;
};

exports.assignUser = function(user) {
    return assignAttributes(roles.user, user);
};

exports.assignAdmin = function(user) {
    return assignAttributes(roles.admin, user);
  
};

exports.createAccess = function(access) {
    return validateAccess(access)
        .then(accessDao.createAccess);
};

exports.getAccessesForUser = function(user) {
    return accessDao.getAccessesbyUserId(user.id);
};

exports.getAccessesForAttribute = function(attribute) {
    return accessDao.getAccessesbyAttributeId(attribute.id);
};

exports.deleteAccessForUser = function(user) {
    return getAccessesForUser(user)
        .then(function(accesses) {

        })
};

