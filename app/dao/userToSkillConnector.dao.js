'use strict';

var request = require('request');
var q = require('q');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

var url = config.API_URL_DEV + 'userToSkillConnector';

exports.createUserToSkillConnector = function(userToSkillConnector) {
    var options = {
        uri: url,
        method: 'POST',
        json: userToSkillConnector
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parsePost);
};

exports.getUserToSkillConnectorsBySkillId = function(id) {
    var options = {
        uri: url + '?skillId=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.getUserToSkillConnectorsByUserId = function(id) {
    var options = {
        uri: url + '?userId=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.getAllUserToSkillConnectors = function() {
    var options = {
        uri: url,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.deleteUserToSkillConnector = function(userToSkillConnectorId) {
    var options = {
        uri: url + '/' + userToSkillConnectorId,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseDelete);
};
