'use strict';

var request = require('request-promise');
var Promise = require('bluebird');
var config = require('config');
var responseHandler = require('../../utils/response.handler');
var errorHandler = require('../../utils/error.handler');

var url = config.API_URL + 'roleToAttributeConnector';

exports.createRoleToAttributeConnector = function(roleToAttributeConnector) {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'POST',
        json: roleToAttributeConnector
    };

    return request(options)
        .then(responseHandler.parsePost)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getRoleToAttributeConnectorsByAttributeId = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '?attributeId=' + id,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getRoleToAttributeConnectorsByRoleId = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '?roleId=' + id,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getAllRoleToAttributeConnectors = function() {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.deleteRoleToAttributeConnector = function(roleToAttributeConnectorId) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + roleToAttributeConnectorId,
        method: 'DELETE'
    };

    return request(options)
        .then(responseHandler.parseDelete)
        .catch(errorHandler.throwDREAMSHttpError);
};
