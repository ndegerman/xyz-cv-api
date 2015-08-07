'use strict';

var roleDao = require('./role.dao');
var Promise = require('bluebird');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

// TODO: Make the validation more covering
function validateRole(role) {
    return new Promise(function(resolve, reject) {
        if (role && role.name) {
            role = utils.extend(getRoleTemplate(), role);
            return resolve(role);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getRoleTemplate() {
    return {
        name: null
    };
}

exports.createNewRole = function(roleObject) {
    return validateRole(roleObject)
        .then(roleDao.createNewRole);
};

exports.getRoleById = function(id) {
    return roleDao.getRoleById(id);
};

exports.getRoles = function(query) {
    return roleDao.getRoles(query);
};

exports.deleteRoleById = function(id) {
    return roleDao.deleteRoleById(id);
};
