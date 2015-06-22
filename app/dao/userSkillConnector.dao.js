'use strict';

var request = require('request');
var q = require('q');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

var url = config.API_URL_DEV + 'userSkillConnector';

exports.createUserSkillConnector = function(userSkillConnector) {
    var options = {
        uri: url,
        method: 'POST',
        json: userSkillConnector
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parsePost);
};

exports.getUserSkillConnectorsBySkillId = function(id) {
    var options = {
        uri: url + '?skillId=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.getUserSkillConnectorsByUserId = function(id) {
    var options = {
        uri: url + '?userId=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.getAllUserSkillConnectors = function() {
    var options = {
        uri: url,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.deleteUserSkillConnector = function(userSkillConnectorId) {
    var options = {
        uri: url + '/' + userSkillConnectorId,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseDelete);
};
