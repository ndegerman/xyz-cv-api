'use strict';

var request = require('request');
var config = require('../config/config');
var q = require('q');
var responseParser = require('../utils/response.parser');

var url = config.api_url_dev + 'role';

exports.createNewRole = function(role) {
    var options = {
        uri: url,
        method: 'POST',
        json: role
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parsePost);
};

exports.deleteRoleById = function(id) {
    var options = {
        uri: url + '/' + id,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parseDelete);
};

exports.getRoleByName = function(name) {
    var options = {
        uri: url + '?name=' + name,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parseGet)
        .then(responseParser.parseMonoQuery);
};

exports.getRoleById = function(id) {
    var options = {
        uri: url + '/' + id,
        method: 'GET',
        json: true
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parseGet);
};

exports.getAllRoles = function() {
    var options = {
        uri: url,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parseGet)
        .then(responseParser.parsePolyQuery);
};
