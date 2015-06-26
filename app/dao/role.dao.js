'use strict';

var request = require('request');
var config = require('config');
var q = require('q');
var responseHandler = require('../utils/response.handler');

var url = config.API_URL + 'role';

exports.createNewRole = function(role) {
    var options = {
        uri: url,
        method: 'POST',
        json: role
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parsePost);
};

exports.getRoleByName = function(name) {
    var options = {
        uri: url + '?name=' + name,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parseMonoQuery);
};

exports.getRoleById = function(id) {
    var options = {
        uri: url + '/' + id,
        method: 'GET',
        json: true
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet);
};

exports.getAllRoles = function() {
    var options = {
        uri: url,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.deleteRoleById = function(id) {
    var options = {
        uri: url + '/' + id,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseDelete);
};
