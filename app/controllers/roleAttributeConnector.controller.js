'use strict';

var q = require('q');
var roleAttributeConnectorDao = require('../dao/roleAttributeConnector.dao');
var errorHandler = require('../utils/error.handler');

function validateRoleAttributeConnector(roleAttributeConnector) {
    return q.promise(function(resolve, reject) {
        if (roleAttributeConnector && roleAttributeConnector.roleId && roleAttributeConnector.attributeId) {
            return resolve(roleAttributeConnector);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

exports.assignAttributesToRole = function(attributes, roleId) {
    var promises = [];
    attributes.forEach(function(attributeId) {
        var roleAttributeConnector = {
            roleId: roleId,
            attributeId: attributeId
        };
        promises.push(exports.createRoleAttributeConnector(roleAttributeConnector));
    });

    return q.all(promises);
};

exports.createRoleAttributeConnector = function(roleAttributeConnector) {return validateRoleAttributeConnector(roleAttributeConnector)
        .then(roleAttributeConnectorDao.createRoleAttributeConnector);
};

exports.getRoleAttributeConnectorsByRoleId = function(roleId) {
    return roleAttributeConnectorDao.getRoleAttributeConnectorsByRoleId(roleId);
};

exports.getRoleAttributeConnectorsByAttributeId = function(attributeId) {
    return roleAttributeConnectorDao.getRoleAttributeConnectorsByAttributeId(attributeId);
};

exports.getAllRoleAttributeConnectors = function() {
    return roleAttributeConnectorDao.getAllRoleAttributeConnectors();
};

exports.deleteRoleAttributeConnectorById = function(id) {
    return roleAttributeConnectorDao.deleteRoleAttributeConnector(id);
};

exports.deleteRoleAttributeConnectors = function(roleAttributeConnector) {
    var promises = [];
    roleAttributeConnector.forEach(function(roleAttributeConnector) {
        promises.push(exports.deleteRoleAttributeConnectorById(roleAttributeConnector._id));
    });

    return q.all(promises);
};

exports.deleteRoleAttributeConnectorsByRoleId = function(roleId) {
    return exports.getRoleAttributeConnectorsByRoleId(roleId)
        .then(exports.deleteRoleAttributeConnectors);
};
