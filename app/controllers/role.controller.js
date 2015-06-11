var request = require('request');
var config = require('../config/config');
var roleDao = require('../dao/role.dao');
var q = require('q');

// TODO: Make the validation more covering
function validateRole(role) {
    var deferred = q.defer();
    if (role && role.name) {
        deferred.resolve(role);
    } else {
        defered.reject(new Error('Not a valid role object!'));
    }
    return deferred.promise;
};

exports.getRoleTemplate = function() {
    return {
        name: null
    };
};

exports.createNewRole = function(roleObject) {
    return validateRole(roleObject)
        .then(roleDao.createNewRole);
};

exports.deleteRoleById = function(id) {
    return roleDao.deleteRoleById(id);
};

exports.getRoleByName = function(name) {
    return roleDao.getRoleByName(name);
};

exports.getRoleById = function(id) {
    return roleDao.getRoleById(id);
};

exports.getAllRoles = function() {
    return roleDao.getAllRoles();
};