'use strict';

var request = require('request-promise');
var q = require('q');
var config = require('config');
var responseHandler = require('../../utils/response.handler');
var errorHandler = require('../../utils/error.handler');

var url = config.API_URL + 'skillToSkillGroupConnector';

exports.createSkillToSkillGroupConnector = function(skillToSkillGroupConnector) {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'POST',
        json: skillToSkillGroupConnector
    };

    return request(options)
        .then(responseHandler.parsePost)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getSkillToSkillGroupConnectorsBySkillId = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '?skillId=' + id,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getSkillToSkillGroupConnectorsById = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '?skillGroupId=' + id,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getAllSkillToSkillGroupConnectors = function() {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.deleteSkillToSkillGroupConnector = function(skillToSkillGroupConnectorId) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + skillToSkillGroupConnectorId,
        method: 'DELETE'
    };

    return request(options)
        .then(responseHandler.parseDelete)
        .catch(errorHandler.throwDREAMSHttpError);
};
