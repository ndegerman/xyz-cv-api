'use strict';

var q = require('q');
var roleToAttributeConnectorDao = require('./roleToAttributeConnector.dao');
var errorHandler = require('../../utils/error.handler');

function validateRoleToAttributeConnector(roleToAttributeConnector) {
    return q.promise(function(resolve, reject) {
        if (roleToAttributeConnector && roleToAttributeConnector.roleId && roleToAttributeConnector.attributeId) {
            return resolve(roleToAttributeConnector);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
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

    return q.all(promises);
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

    return q.all(promises);
};

exports.deleteRoleToAttributeConnectorsByRoleId = function(roleId) {
    return exports.getRoleToAttributeConnectorsByRoleId(roleId)
        .then(exports.deleteRoleToAttributeConnectors);
};
