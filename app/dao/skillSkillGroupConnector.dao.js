'use strict';

var request = require('request');
var q = require('q');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

var url = config.API_URL_DEV + 'skillSkillGroupConnector';

exports.createSkillSkillGroupConnector = function(skillSkillGroupConnector) {
    var options = {
        uri: url,
        method: 'POST',
        json: skillSkillGroupConnector
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parsePost);
};

exports.getSkillSkillGroupConnectorsBySkillId = function(id) {
    var options = {
        uri: url + '?skillId=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.getSkillSkillGroupConnectorsBySkillGroupId = function(id) {
    var options = {
        uri: url + '?skillGroupId=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.getAllSkillSkillGroupConnectors = function() {
    var options = {
        uri: url,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.deleteSkillSkillGroupConnector = function(skillSkillGroupConnectorId) {
    var options = {
        uri: url + '/' + skillSkillGroupConnectorId,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseDelete);
};
