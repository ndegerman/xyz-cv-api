'use strict';

var request = require('request-promise');
var Promise = require('bluebird');
var config = require('config');
var responseHandler = require('../../utils/response.handler');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

var url = config.API_URL + 'roleToAttributeConnector';

exports.createRoleToAttributeConnector = function(roleToAttributeConnector) {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'POST',
        json: roleToAttributeConnector,
        gzip: true
    };

    return request(options)
        .then(responseHandler.parsePost)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getRoleToAttributeConnectors = function(query) {
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

exports.deleteRoleToAttributeConnector = function(roleToAttributeConnectorId) {
    var options = {
        resolveWithFullResponse: true,
        uri: url + '/' + roleToAttributeConnectorId,
        method: 'DELETE'
    };

    return request(options)
        .then(responseHandler.parseDelete)
        .catch(errorHandler.throwDREAMSHttpError);
};
