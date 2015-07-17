'use strict';

var request = require('request-promise');
var config = require('config');
var q = require('q');
var responseHandler = require('../../utils/response.handler');
var errorHandler = require('../../utils/error.handler');

var url = config.API_URL + 'office';

exports.createNewOffice = function(office) {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'POST',
        json: office
    };

    return request(options)
        .then(responseHandler.parsePost)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getOfficeByName = function(name) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '?name=' + name,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetMonoQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getOfficeById = function(id) {
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

exports.getAllOffices = function() {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.deleteOfficeById = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + id,
        method: 'DELETE'
    };

    return request(options)
        .then(responseHandler.parseDelete)
        .catch(errorHandler.throwDREAMSHttpError);
};
