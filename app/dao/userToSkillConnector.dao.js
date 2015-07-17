'use strict';

var request = require('request-promise');
var q = require('q');
var config = require('config');
var responseHandler = require('../utils/response.handler');
var errorHandler = require('../utils/error.handler');

var url = config.API_URL + 'userToSkillConnector';

exports.createUserToSkillConnector = function(userToSkillConnector) {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'POST',
        json: userToSkillConnector
    };

    return request(options)
        .then(responseHandler.parsePost)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getUserToSkillConnectorById = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + id,
        method: 'GET',
        json: true
    };

    return request(options)
        .then(responseHandler.parseGet)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getUserToSkillConnectorsBySkillId = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '?skillId=' + id,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getUserToSkillConnectorsByUserId = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '?userId=' + id,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getAllUserToSkillConnectors = function() {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.updateUserToSkillConnector = function(userToSkillConnector) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + userToSkillConnector._id,
        method: 'PUT',
        json: userToSkillConnector
    };

    return request(options)
        .then(responseHandler.parsePut)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.deleteUserToSkillConnector = function(userToSkillConnectorId) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + userToSkillConnectorId,
        method: 'DELETE'
    };

    return request(options)
        .then(responseHandler.parseDelete)
        .catch(errorHandler.throwDREAMSHttpError);
};
