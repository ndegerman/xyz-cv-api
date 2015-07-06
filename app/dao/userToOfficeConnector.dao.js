'use strict';

var request = require('request');
var q = require('q');
var config = require('config');
var responseHandler = require('../utils/response.handler');

var url = config.API_URL + 'userToOfficeConnector';

exports.createUserToOfficeConnector = function(userToOfficeConnector) {
    var options = {
        uri: url,
        method: 'POST',
        json: userToOfficeConnector
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parsePost);
};

exports.getUserToOfficeConnectorsByOfficeId = function(id) {
    var options = {
        uri: url + '?officeId=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.getUserToOfficeConnectorsByUserId = function(id) {
    var options = {
        uri: url + '?userId=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.getAllUserToOfficeConnectors = function() {
    var options = {
        uri: url,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.deleteUserToOfficeConnector = function(userToOfficeConnectorId) {
    var options = {
        uri: url + '/' + userToOfficeConnectorId,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseDelete);
};
