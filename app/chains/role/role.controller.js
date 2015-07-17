'use strict';

var roleDao = require('./role.dao');
var q = require('q');
var errorHandler = require('../../utils/error.handler');

// TODO: Make the validation more covering
function validateRole(role) {
    return q.promise(function(resolve, reject) {
        if (role && role.name) {
            return resolve(role);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

exports.getRoleTemplate = function() {
    return {
        name: null
    };
};

exports.createNewRole = function(roleObject) {
    return validateRole(roleObject)
        .then(roleDao.createNewRole);
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

exports.deleteRoleById = function(id) {
    return roleDao.deleteRoleById(id);
};
