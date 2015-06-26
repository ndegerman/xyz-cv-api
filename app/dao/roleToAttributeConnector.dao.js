'use strict';

var request = require('request');
var q = require('q');
var config = require('config');
var responseHandler = require('../utils/response.handler');

var url = config.API_URL + 'roleToAttributeConnector';

exports.createRoleToAttributeConnector = function(roleToAttributeConnector) {
    var options = {
        uri: url,
        method: 'POST',
        json: roleToAttributeConnector
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parsePost);
};

exports.getRoleToAttributeConnectorsByAttributeId = function(id) {
    var options = {
        uri: url + '?attributeId=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.getRoleToAttributeConnectorsByRoleId = function(id) {
    var options = {
        uri: url + '?roleId=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.getAllRoleToAttributeConnectors = function() {
    var options = {
        uri: url,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.deleteRoleToAttributeConnector = function(roleToAttributeConnectorId) {
    var options = {
        uri: url + '/' + roleToAttributeConnectorId,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseDelete);
};
