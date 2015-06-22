'use strict';

var request = require('request');
var q = require('q');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

var url = config.API_URL_DEV + 'roleAttributeConnector';

exports.createRoleAttributeConnector = function(roleAttributeConnector) {
    var options = {
        uri: url,
        method: 'POST',
        json: roleAttributeConnector
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parsePost);
};

exports.getRoleAttributeConnectorsByAttributeId = function(id) {
    var options = {
        uri: url + '?attributeId=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.getRoleAttributeConnectorsByRoleId = function(id) {
    var options = {
        uri: url + '?roleId=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.getAllRoleAttributeConnectors = function() {
    var options = {
        uri: url,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.deleteRoleAttributeConnector = function(roleAttributeConnectorId) {
    var options = {
        uri: url + '/' + roleAttributeConnectorId,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseDelete);
};
