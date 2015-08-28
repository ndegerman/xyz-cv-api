'use strict';

var request = require('request-promise');
var Promise = require('bluebird');
var config = require('config');
var responseHandler = require('../../utils/response.handler');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

var url = config.API_URL + 'user';

exports.createNewUser = function(user) {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'POST',
        json: user,
        gzip: true
    };

    return request(options)
        .then(responseHandler.parsePost)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.updateUser = function(user) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + user._id,
        method: 'PUT',
        json: user,
        gzip: true
    };

    return request(options)
        .then(responseHandler.parsePut)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getUserById = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + id,
        method: 'GET',
        json: true,
        gzip: true
    };

    return request(options)
        .then(responseHandler.parseGet)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getUsers = function(query) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + utils.getQueryByObject(query),
        method: 'GET',
        gzip: true
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.deleteUserById = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + id,
        method: 'DELETE'
    };

    return request(options)
        .then(responseHandler.parseDelete)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.createIndex = function(fields, query) {
    var options = {
        resolveWithFullResponse: true,
        uri: config.API_URL + '_indices/user' + utils.getQueryByObject(query),
        method: 'POST',
        json: fields
    };

    return request(options)
        .then(responseHandler.parsePostIndex)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.purgeIndices = function() {
    var options = {
        resolveWithFullResponse: true,
        uri: config.API_URL + '_indices/user',
        method: 'DELETE'
    };

    return request(options)
        .then(responseHandler.parseDelete)
        .catch(errorHandler.throwDREAMSHttpError);
};
