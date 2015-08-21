'use strict';

var request = require('request-promise');
var rs = require('request');
var config = require('config');
var Promise = require('bluebird');
var responseHandler = require('../../utils/response.handler');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');
var fs = require('fs');

var url = config.API_URL + 'file';

// FILE ENTITY
// ============================================================================

exports.createNewFile = function(file) {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'POST',
        json: file
    };

    return request(options)
        .then(responseHandler.parsePost)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getFileById = function(id) {
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

exports.getFiles = function(query) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + utils.getQueryByObject(query),
        method: 'GET'
    };

    return request(options)
        .then(responseHandler.parseGetPolyQuery)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.deleteFileById = function(id) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + id,
        method: 'DELETE'
    };

    return request(options)
        .then(responseHandler.parseDelete)
        .catch(errorHandler.throwDREAMSHttpError);
};

// FILE UPLOADS
// ============================================================================

exports.createNewUpload = function(file) {
    var filePath = config.UPLOAD_PATH + file.generatedName;
    var options = {
        resolveWithFullResponse: true,
        uri: config.API_URL + 'upload',
        method: 'POST',
        formData: {
            upload: fs.createReadStream(filePath)
        }
    };

    return request(options)
        .then(responseHandler.parsePost)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getUploadByGeneratedName = function(name) {
    var options = {
        resolveWithFullResponse: true,
        uri: config.API_URL + 'upload/' + name,
        method: 'GET',
        json: true
    };

    return rs(options);
};
