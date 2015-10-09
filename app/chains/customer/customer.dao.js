'use strict';

var request = require('request-promise');
var config = require('config');
var Promise = require('bluebird');
var responseHandler = require('../../utils/response.handler');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

var url = config.API_URL + 'customer';

exports.createNewCustomer = function(customer) {
    var options = {
        resolveWithFullResponse: true,
        uri: url,
        method: 'POST',
        json: customer,
        gzip: true
    };

    return request(options)
        .then(responseHandler.parsePost)
        .catch(errorHandler.throwDREAMSHttpError);
};

exports.getCustomerById = function(id) {
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

exports.getCustomers = function(query) {
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

exports.deleteCustomerById = function(id) {
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
        uri: config.API_URL + '_indices/customer' + utils.getQueryByObject(query),
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
        uri: config.API_URL + '_indices/customer',
        method: 'DELETE'
    };

    return request(options)
        .then(responseHandler.parseDelete)
        .catch(errorHandler.throwDREAMSHttpError);
};
