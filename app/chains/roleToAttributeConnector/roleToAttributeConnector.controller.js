'use strict';

var Promise = require('bluebird');
var roleToAttributeConnectorDao = require('./roleToAttributeConnector.dao');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

function validateRoleToAttributeConnector(roleToAttributeConnector) {
    return new Promise(function(resolve, reject) {
        if (roleToAttributeConnector && roleToAttributeConnector.roleId && roleToAttributeConnector.attributeId) {
            roleToAttributeConnector = utils.extend(getRoleToAttributeConnectorTemplate(), roleToAttributeConnector);
            return resolve(roleToAttributeConnector);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getRoleToAttributeConnectorTemplate() {
    return {
        roleId: null,
        attributeId: null
    };
}

exports.assignAttributesToRole = function(attributes, roleId) {
    var promises = [];
    attributes.forEach(function(attributeId) {
        var roleToAttributeConnector = {
            roleId: roleId,
            attributeId: attributeId
        };
        promises.push(exports.createRoleToAttributeConnector(roleToAttributeConnector));
    });

    return Promise.all(promises);
};

exports.createRoleToAttributeConnector = function(roleToAttributeConnector) {return validateRoleToAttributeConnector(roleToAttributeConnector)
        .then(roleToAttributeConnectorDao.createRoleToAttributeConnector);
};

exports.getRoleToAttributeConnectorsByRoleId = function(roleId) {
    return roleToAttributeConnectorDao.getRoleToAttributeConnectorsByRoleId(roleId);
};

exports.getRoleToAttributeConnectorsByRole = function(role) {
    return roleToAttributeConnectorDao.getRoleToAttributeConnectorsByRoleId(role._id);
};

exports.getRoleToAttributeConnectorsByAttributeId = function(attributeId) {
    return roleToAttributeConnectorDao.getRoleToAttributeConnectorsByAttributeId(attributeId);
};

exports.getAllRoleToAttributeConnectors = function() {
    return roleToAttributeConnectorDao.getAllRoleToAttributeConnectors();
};

exports.deleteRoleToAttributeConnectorById = function(id) {
    return roleToAttributeConnectorDao.deleteRoleToAttributeConnector(id);
};

exports.deleteRoleToAttributeConnectors = function(roleToAttributeConnector) {
    var promises = [];
    roleToAttributeConnector.forEach(function(roleToAttributeConnector) {
        promises.push(exports.deleteRoleToAttributeConnectorById(roleToAttributeConnector._id));
    });

    return Promise.all(promises);
};

exports.deleteRoleToAttributeConnectorsByRoleId = function(roleId) {
    return exports.getRoleToAttributeConnectorsByRoleId(roleId)
        .then(exports.deleteRoleToAttributeConnectors);
};
