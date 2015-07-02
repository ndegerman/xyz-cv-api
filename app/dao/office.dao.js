'use strict';

var request = require('request');
var config = require('config');
var q = require('q');
var responseHandler = require('../utils/response.handler');

var url = config.API_URL + 'office';

exports.createNewOffice = function(office) {
    var options = {
        uri: url,
        method: 'POST',
        json: office
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parsePost);
};

exports.getOfficeByName = function(name) {
    var options = {
        uri: url + '?name=' + name,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parseMonoQuery);
};

exports.getOfficeById = function(id) {
    var options = {
        uri: url + '/' + id,
        method: 'GET',
        json: true
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet);
};

exports.getAllOffices = function() {
    var options = {
        uri: url,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.deleteOfficeById = function(id) {
    var options = {
        uri: url + '/' + id,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseDelete);
};
