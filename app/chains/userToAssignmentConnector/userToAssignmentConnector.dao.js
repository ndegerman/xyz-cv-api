'use strict';

var request = require('request-promise');
var q = require('q');
var config = require('config');
var responseHandler = require('../../utils/response.handler');
var errorHandler = require('../../utils/error.handler');

var url = config.API_URL + 'userToAssignmentConnector';

exports.createUserToAssignmentConnector = function(userToAssignmentConnector) {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'POST',
        json: userToAssignmentConnector
    };

    return request(options)
        .then(responseHandler.parsePost)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getUserToAssignmentConnectorById = function(id) {
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

exports.getUserToAssignmentConnectorsByAssignmentId = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '?assignmentId=' + id,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getUserToAssignmentConnectorsByUserId = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '?userId=' + id,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getAllUserToAssignmentConnectors = function() {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.updateUserToAssignmentConnector = function(userToAssignmentConnector) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + userToAssignmentConnector._id,
        method: 'PUT',
        json: userToAssignmentConnector
    };

    return request(options)
        .then(responseHandler.parsePut)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.deleteUserToAssignmentConnector = function(userToAssignmentConnectorId) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + userToAssignmentConnectorId,
        method: 'DELETE'
    };

    return request(options)
        .then(responseHandler.parseDelete)
        .catch(errorHandler.throwDREAMSHttpError);
};
